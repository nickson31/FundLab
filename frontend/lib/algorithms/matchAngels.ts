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
}

export async function matchAngels(
    params: MatchParams,
    userId: string
): Promise<AngelMatch[]> {
    console.log('[MatchAngels] 🔍 Starting');
    console.log('[MatchAngels] Keywords:', {
        categories: params.categoryKeywords.length,
        stages: params.stageKeywords.length,
        locations: params.locationKeywords.length
    });

    const { data: angels, error } = await supabase
        .from('angels')
        .select('*')
        .limit(1);

    console.log('[MatchAngels] 📊 DB Response:', {
        hasError: !!error,
        errorMsg: error?.message,
        hasData: !!angels,
        count: angels?.length || 0
    });

    if (error) {
        console.error('[MatchAngels] ❌ DB Error:', JSON.stringify(error));
        return [];
    }

    if (!angels || angels.length === 0) {
        console.error('[MatchAngels] ❌ No data returned');
        return [];
    }

    // Log the structure of the first angel
    const firstAngel = angels[0];
    console.log('[MatchAngels] 📋 First angel keys:', Object.keys(firstAngel).slice(0, 10));
    console.log('[MatchAngels] 📋 Sample fields:', {
        hasFullName: 'fullName' in firstAngel,
        hasCategoriesStrong: 'categories_strong_es' in firstAngel,
        hasAngelScore: 'angel_score' in firstAngel,
        hasData: 'data' in firstAngel
    });

    // Fetch all angels for matching
    const { data: allAngels } = await supabase
        .from('angels')
        .select('*');

    if (!allAngels || allAngels.length === 0) {
        console.error('[MatchAngels] ❌ No angels for matching');
        return [];
    }

    console.log('[MatchAngels] ✅ Processing', allAngels.length, 'angels');

    const matches: AngelMatch[] = allAngels
        .map(angel => {
            const categoryScore = calculateCategoryScore(angel, params.categoryKeywords);
            const angelScoreNormalized = parseFloat(angel.angel_score || '0') / 100.0;
            const stageScore = calculateStageScore(angel, params.stageKeywords);
            const locationScore = calculateLocationScore(angel, params.locationKeywords);

            const totalScore = (
                categoryScore * 0.4 +
                angelScoreNormalized * 0.3 +
                stageScore * 0.2 +
                locationScore * 0.1
            );

            return {
                angel: { ...angel },
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

    console.log('[MatchAngels] ✅ Results:', {
        processed: allAngels.length,
        returned: matches.length,
        topScore: matches[0]?.score.toFixed(3) || 0
    });

    return matches;
}

function calculateCategoryScore(angel: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;

    const sources = [
        angel.categories_strong_es || '',
        angel.categories_strong_en || '',
        angel.categories_general_es || '',
        angel.categories_general_en || '',
        angel.headline || '',
        angel.about || '',
    ].join(' ').toLowerCase();

    const matches = queryKeywords.filter(keyword =>
        sources.includes(keyword.toLowerCase())
    ).length;

    return Math.min(matches / queryKeywords.length, 1);
}

function calculateStageScore(angel: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;

    const sources = [
        angel.stages_strong_es || '',
        angel.stages_strong_en || '',
        angel.stages_general_es || '',
        angel.stages_general_en || '',
    ].join(' ').toLowerCase();

    const matches = queryKeywords.filter(k => sources.includes(k.toLowerCase())).length;
    return Math.min(matches / queryKeywords.length, 1);
}

function calculateLocationScore(angel: any, queryKeywords: string[]): number {
    if (!queryKeywords.length) return 0;

    const location = (angel.addressWithCountry || '').toLowerCase();
    const matches = queryKeywords.filter(k => location.includes(k.toLowerCase())).length;
    return Math.min(matches / queryKeywords.length, 1);
}
