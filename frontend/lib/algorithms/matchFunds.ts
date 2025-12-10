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

            const totalScore = (
                categoryScore * 0.5 +
                stageScore * 0.3 +
                locationScore * 0.2
            );

            return {
                fund: { ...data, id: fund.id },
                score: totalScore,
                breakdown: {
                    category_match: categoryScore,
                    stage_match: stageScore,
                    location_match: locationScore,
                    overall_score: totalScore
                },
            };
        })
        .sort((a: FundMatch, b: FundMatch) => b.score - a.score)
        .slice(0, 20);

    // Persist Results if admin client available
    if (injectedClient) {
        const searchResultsToInsert = matches.map(match => ({
            user_id: userId,
            query: params.categoryKeywords.join(', '), // Simplified query tracking
            matched_fund_id: match.fund.id,
            relevance_score: match.score,
            summary: `Matched on Keywords.`, // Simplified summary
            status: 'saved'
        }));

        if (searchResultsToInsert.length > 0) {
            const { error } = await client.from('search_results').insert(searchResultsToInsert);
            if (error) console.warn('[MatchFunds] ⚠️ Persistence skipped:', error.code);
        }
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
