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

        const rawScore = (
            categoryScore * 0.45 +
            (isNaN(angelScoreNormalized) ? 0 : angelScoreNormalized) * 0.25 +
            stageScore * 0.20 +
            locationScore * 0.10
        );

        // SIMULATED BOOST (User Request: 75-99 range)
        // Maps input [0.1 ... 0.6] -> [0.75 ... 0.99]
        let totalScore = 0.75 + (rawScore * 0.4);

        // Deterministic variation
        const variation = (typedAngel.name || "").length % 5 / 100;
        totalScore += variation;

        // Clamp strict to 0.75 - 0.99
        totalScore = Math.max(0.75, Math.min(0.99, totalScore));

        // Find specific matching keywords for UI display
        const matchedKeywords: string[] = [];
        if (params.categoryKeywords && params.categoryKeywords.length > 0) {
            const angelCategories = [
                typedAngel.categories_general_en,
                typedAngel.categories_strong_en,
                typedAngel.categories_general_es,
                typedAngel.categories_strong_es
            ].join(' ').toLowerCase();

            params.categoryKeywords.forEach(kw => {
                if (angelCategories.includes(kw.toLowerCase())) {
                    matchedKeywords.push(kw);
                }
            });
        }

        return {
            angel: typedAngel,
            score: totalScore,
            breakdown: {
                category_match: categoryScore,
                stage_match: stageScore,
                location_match: locationScore,
                overall_score: totalScore,
                reason_summary: generateReason(typedAngel, params),
                matched_keywords: Array.from(new Set(matchedKeywords)).slice(0, 3) // dedup and limit
            }
        };
    });

    // 3. Sort and Filter
    const topMatches = scoredAngels
        .sort((a, b) => b.score - a.score)
        .slice(0, 15); // Return top 15

    // 4. Persistence Removed as per user request
    // Results are only returned to the chat interface
    if (injectedClient) {
        console.log('[MatchAngels] ℹ️ Persistence skipped (User requested no saving)');
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

