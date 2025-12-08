import { supabase } from '@/lib/supabase';

interface MatchParams {
    categoryKeywords: string[];
    stageKeywords: string[];
    locationKeywords: string[];
}

export interface AngelMatch {
    angel: any;
    score: number;
    breakdown: {
        categoryScore: number;
        angelScore: number;
        stageScore: number;
        locationScore: number;
    };

            // Stage Score (20%)
            const stageScore = calculateStageScore(data, params.stageKeywords);

// Location Score (10%)
const locationScore = calculateLocationScore(data, params.locationKeywords);

const totalScore = (
    categoryScore * 0.4 +
    angelScoreNormalized * 0.3 +
    stageScore * 0.2 +
    locationScore * 0.1
);

return {
    angel: { ...data, id: angel.id }, // Include DB ID
    score: totalScore,
    breakdown: {
        categoryScore,
        angelScore: angelScoreNormalized,
        stageScore,
        locationScore,
    },
};
        })
        .sort((a, b) => b.score - a.score)
    .slice(0, 20);

return matches;
}

function calculateCategoryScore(angelData: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;
    const sources = [
        angelData.categories_strong_es || '',
        angelData.categories_strong_en || '',
        angelData.categories_general_es || '',
        angelData.categories_general_en || '',
        angelData.headline || '',
        angelData.about || '',
    ].join(' ').toLowerCase();

    const matches = queryKeywords.filter(keyword =>
        sources.includes(keyword.toLowerCase())
    ).length;

    return Math.min(matches / queryKeywords.length, 1);
}

function calculateStageScore(angelData: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;
    const sources = [
        angelData.stages_strong_es || '',
        angelData.stages_strong_en || '',
        angelData.stages_general_es || '',
        angelData.stages_general_en || '',
    ].join(' ').toLowerCase();

    const matches = queryKeywords.filter(k => sources.includes(k.toLowerCase())).length;
    return Math.min(matches / queryKeywords.length, 1);
}

function calculateLocationScore(angelData: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;
    const location = (angelData.addressWithCountry || '').toLowerCase();
    const matches = queryKeywords.filter(k => location.includes(k.toLowerCase())).length;
    return Math.min(matches / queryKeywords.length, 1);
}
