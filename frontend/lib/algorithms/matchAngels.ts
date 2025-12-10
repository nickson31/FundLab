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
    userId: string
): Promise<SearchResult[]> {
    console.log('[MatchAngels] 🔍 Starting match for user:', userId);

    // 1. Fetch Angels
    const { data: angels, error } = await supabase
        .from('angels') // Correct table name
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
        // Cast to strictly typed AngelInvestor for safer access, assuming DB schema aligns
        const typedAngel = angel as AngelInvestor;

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
    const searchResultsToInsert = topMatches.map(match => ({
        user_id: userId,
        query: params.queryText || params.categoryKeywords.join(', '),
        matched_angel_id: match.angel.id,
        relevance_score: match.score,
        summary: match.breakdown.reason_summary,
        status: 'saved'
    }));

    if (searchResultsToInsert.length > 0) {
        const { data: insertedRows, error: insertError } = await supabase
            .from('search_results')
            .insert(searchResultsToInsert)
            .select();

        if (insertError) {
            console.error('[MatchAngels] ❌ Error persisting results:', insertError);
        } else {
            console.log('[MatchAngels] ✅ Persisted', insertedRows?.length, 'matches');
        }
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

