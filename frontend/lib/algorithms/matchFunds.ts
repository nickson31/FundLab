import { supabase } from '@/lib/supabase';

interface MatchParams {
    categoryKeywords: string[];
    stageKeywords: string[];
    locationKeywords: string[];
}

export interface FundMatch {
    fund: any;
    score: number;
    breakdown: {
        categoryScore: number;
        stageScore: number;
        locationScore: number;
    };
}

export async function matchFunds(
    params: MatchParams,
    userId: string
): Promise<FundMatch[]> {
    const { data: funds } = await supabase
        .from('investment_funds')
        .select('*');

    if (!funds) return [];

    const { data: seen } = await supabase
        .from('seen_investors')
        .select('investor_id')
        .eq('user_id', userId)
        .eq('type', 'fund');

    const seenIds = new Set(seen?.map(s => s.investor_id) || []);

    const matches: FundMatch[] = funds
        .filter(fund => !seenIds.has(fund.id))
        .map(fund => {
            const data = fund.data || fund;

            // Category Score (50%)
            const categoryScore = calculateCategoryScore(data, params.categoryKeywords);

            // Stage Score (30%)
            const stageScore = calculateStageScore(data, params.stageKeywords);

            // Location Score (20%)
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
                    categoryScore,
                    stageScore,
                    locationScore,
                },
            };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 20);

    return matches;
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
