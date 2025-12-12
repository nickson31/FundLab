import { supabase } from '@/lib/supabase';
import { SearchResult } from '@/types/investor';

interface MatchParams {
    categoryKeywords: string[];
    stageKeywords: string[];
    locationKeywords: string[];
}

interface FundMatch {
    fund: any;
    score: number;
    breakdown: {
        category_match: number;
        stage_match: number;
        location_match: number;
        overall_score: number;
    };
}

export async function matchFunds(
    params: MatchParams,
    userId: string,
    injectedClient?: any
): Promise<SearchResult[]> {
    const client = injectedClient || supabase;
    const { data: funds } = await client
        .from('funds')
        .select('*');

    if (!funds) return [];

    // ... (scoring logic same as before) ...
    const matches: FundMatch[] = funds
        .map((fund: any) => {
            const data = fund.data || fund;
            const categoryScore = calculateCategoryScore(data, params.categoryKeywords);
            const stageScore = calculateStageScore(data, params.stageKeywords);
            const locationScore = calculateLocationScore(data, params.locationKeywords);

            const descriptionScore = calculateDescriptionScore(data, params.categoryKeywords);

            const totalScore = (
                categoryScore * 0.5 +
                stageScore * 0.3 +
                locationScore * 0.1 +
                descriptionScore * 0.3 // Increased weight
            );

            // SIMULATED BOOST (User Request: 75-99 range)
            // Lifts any relevant match into the "Good" to "Excellent" range visually.
            // Maps input [0.1 ... 0.6] -> [0.75 ... 0.99]
            let boostedScore = 0.75 + (totalScore * 0.4);

            // Add slight deterministic variation based on name length to avoid identical scores if inputs are identical
            const variation = (data.name || "").length % 5 / 100; // 0.00 to 0.04
            boostedScore += variation;

            // Clamp strict to 0.75 - 0.99
            boostedScore = Math.max(0.75, Math.min(0.99, boostedScore));

            return {
                fund: { ...data, id: data.linkedinUrl || data.linkedin_url || data.website_url || `fund_${Math.random()}` },
                score: boostedScore,
                breakdown: {
                    category_match: categoryScore,
                    stage_match: stageScore,
                    location_match: locationScore,
                    overall_score: boostedScore
                },
            };
        })
        .sort((a: FundMatch, b: FundMatch) => b.score - a.score)
        .slice(0, 20);

    // Persistence Removed as per user request
    if (injectedClient) {
        console.log('[MatchFunds] ℹ️ Persistence skipped (User requested no saving)');
    }

    // Return formatted for ChatInterface
    return matches.map(match => ({
        investor: match.fund, // Unified property
        type: 'fund',
        score: match.score,
        breakdown: match.breakdown
    }));
}

function calculateCategoryScore(fundData: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;
    try {
        const keywords = JSON.parse(fundData.category_keywords || '[]');
        const sources = keywords.join(' ').toLowerCase();
        const matches = queryKeywords.filter(k => sources.includes(k.toLowerCase())).length;
        return Math.min(matches / queryKeywords.length, 1);
    } catch {
        return 0;
    }
}

function calculateStageScore(fundData: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;
    try {
        const keywords = JSON.parse(fundData.stage_keywords || '[]');
        const sources = keywords.join(' ').toLowerCase();
        const matches = queryKeywords.filter(k => sources.includes(k.toLowerCase())).length;
        return Math.min(matches / queryKeywords.length, 1);
    } catch {
        return 0;
    }
}


function calculateLocationScore(fundData: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;
    try {
        const locations = fundData.location_identifiers || []; // Already array in JSON? Check spec. Spec says Array.
        const sources = locations.join(' ').toLowerCase();
        const matches = queryKeywords.filter(k => sources.includes(k.toLowerCase())).length;
        return Math.min(matches / queryKeywords.length, 1);
    } catch {
        return 0;
    }
}

function calculateDescriptionScore(fundData: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;
    const text = (
        (fundData.description || '') + ' ' +
        (fundData.short_description || '')
    ).toLowerCase();

    if (!text.trim()) return 0;

    const matches = queryKeywords.filter(k => text.includes(k.toLowerCase())).length;
    // Lower threshold for description text as it's unstructured
    return Math.min(matches / (queryKeywords.length * 0.8), 1);
}
