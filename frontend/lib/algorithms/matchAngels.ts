import { supabase } from '@/lib/supabase';
import { AngelInvestor, SearchResult, MatchBreakdown } from '@/types/investor';

interface MatchParams {
    categoryKeywords: string[];
    stageKeywords: string[];
    locationKeywords: string[];
    queryText?: string; // Original query for logging
}

interface AngelMatchRaw {
    angel: AngelInvestor;
    score: number;
    breakdown: MatchBreakdown;
}

export async function matchAngels(
    params: MatchParams,
    userId: string,
    injectedClient?: any
): Promise<SearchResult[]> {
    console.log('[MatchAngels] 🔍 Starting match for user:', userId);

    // Use injected client (admin) if available, otherwise anon client
    const client = injectedClient || supabase;
    const queryForLog = params.queryText || (params.categoryKeywords ? params.categoryKeywords.join(', ') : 'Unknown Query');

    // 1. Fetch Angels
    const { data: angels, error } = await client
        .from('angels') // Using 'angels' as per user setup
        .select('*');

    if (error) {
        console.error('[MatchAngels] ❌ DB Error fetching angels:', error);
        return [];
    }

    if (!angels || angels.length === 0) {
        console.warn('[MatchAngels] ⚠️ No angels found in DB');
        return [];
    }

    // 2. Score Angels
    const scoredAngels: AngelMatchRaw[] = angels.map((angel: any) => {
        // Use linkedinUrl as the stable ID since 'id' (UUID) is missing
        const stableId = angel.linkedinUrl || angel.linkedin_url || `temp_${Math.random()}`;

        // Cast to strictly typed AngelInvestor for safer access, assuming DB schema aligns
        // And ensure the 'id' property is set from the stableId
        const typedAngel = { ...angel, id: stableId } as AngelInvestor;

        const categoryScore = calculateCategoryScore(typedAngel, params.categoryKeywords);
        const angelScoreNormalized = parseFloat(String(typedAngel.angel_score || 0)) / 100.0;
        const stageScore = calculateStageScore(typedAngel, params.stageKeywords);
        const locationScore = calculateLocationScore(typedAngel, params.locationKeywords);

        const totalScore = (
            categoryScore * 0.45 +
            (isNaN(angelScoreNormalized) ? 0 : angelScoreNormalized) * 0.25 +
            stageScore * 0.20 +
            locationScore * 0.10
        );

        return {
            angel: typedAngel,
            score: totalScore,
            breakdown: {
                category_match: categoryScore,
                stage_match: stageScore,
                location_match: locationScore,
                overall_score: totalScore,
                reason_summary: generateReason(typedAngel, params)
            }
        };
    });

    // 3. Sort and Filter
    const topMatches = scoredAngels
        .sort((a, b) => b.score - a.score)
        .slice(0, 15); // Return top 15

    // 4. Persist Results (Batch Insert)
    if (topMatches.length > 0) {
        console.log('[MatchAngels] Top match object:', JSON.stringify(topMatches[0], null, 2));
        console.log('[MatchAngels] Top match angel ID:', topMatches[0].angel?.id);
    }
    // Only persist if we have a service role client (injectedClient is defined)
    // Or if we are sure we have permissions. For now, strictly require injectedClient.
    if (injectedClient) {
        const searchResultsToInsert = topMatches.map(match => ({
            user_id: userId,
            query: params.queryText || params.categoryKeywords.join(', '),
            matched_angel_id: match.angel.id,
            relevance_score: match.score,
            summary: match.breakdown.reason_summary,
            status: 'saved'
        }));

        if (searchResultsToInsert.length > 0) {
            console.log('[MatchAngels] Attempting insert with payload sample:', JSON.stringify(searchResultsToInsert[0], null, 2));

            const { data: insertedRows, error: insertError } = await client
                .from('search_results')
                .insert(searchResultsToInsert)
                .select();

            if (insertError) {
                console.warn('[MatchAngels] ⚠️ Could not persist results (likely RLS):', insertError.code);
            } else {
                console.log('[MatchAngels] ✅ Persisted', insertedRows?.length, 'matches to search_results');
            }

            // ALSO Save to saved_investors for user visibility
            const savedInvestorsToInsert = searchResultsToInsert.map(r => ({
                user_id: userId,
                investor_id: r.matched_angel_id,
                type: 'angel',
                notes: r.summary,
                created_at: new Date().toISOString()
            }));

            // We use upsert to avoid duplicates if user searches again
            const { error: savedError } = await client.from('saved_investors').upsert(savedInvestorsToInsert, { onConflict: 'user_id, investor_id', ignoreDuplicates: true });
            if (savedError) console.warn('[MatchAngels] ⚠️ Could not populate saved_investors:', savedError.code, savedError.message);
            else console.log('[MatchAngels] ✅ Populated saved_investors');
        }
    } else {
        console.log('[MatchAngels] ℹ️ Skipping persistence (No Service Role Key)');
    }

    // 5. Return formatted SearchResults
    return topMatches.map(match => ({
        investor: match.angel,
        type: 'angel',
        score: match.score,
        breakdown: match.breakdown
    }));
}

// Helpers

function calculateCategoryScore(angel: AngelInvestor, keywords: string[]): number {
    if (!keywords.length) return 0;
    const sources = [
        angel.categories_strong_es,
        angel.categories_strong_en,
        angel.categories_general_es,
        angel.categories_general_en,
        angel.headline,
        angel.about
    ].map(s => (s || '').toLowerCase()).join(' ');

    const hits = keywords.filter(k => sources.includes(k.toLowerCase())).length;
    return Math.min(hits / (keywords.length || 1), 1.0);
}

function calculateStageScore(angel: AngelInvestor, keywords: string[]): number {
    if (!keywords.length) return 0;
    const sources = [
        angel.stages_strong_es,
        angel.stages_strong_en,
        angel.stages_general_es,
        angel.stages_general_en
    ].map(s => (s || '').toLowerCase()).join(' ');

    const hits = keywords.filter(k => sources.includes(k.toLowerCase())).length;
    return Math.min(hits / (keywords.length || 1), 1.0);
}

function calculateLocationScore(angel: AngelInvestor, keywords: string[]): number {
    if (!keywords.length) return 0;
    const loc = (angel.addressWithCountry || '').toLowerCase();
    const hits = keywords.filter(k => loc.includes(k.toLowerCase())).length;
    return hits > 0 ? 1 : 0;
}

function generateReason(angel: AngelInvestor, params: MatchParams): string {
    const cats = params.categoryKeywords.filter(k =>
        (angel.categories_strong_en || '').toLowerCase().includes(k.toLowerCase())
    );
    if (cats.length > 0) return `Strong match for ${cats.join(', ')}.`;
    return 'Matched based on general investment profile.';
}

