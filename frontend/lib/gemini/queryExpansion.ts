import { model } from '../gemini';

export async function expandQuery(userQuery: string): Promise<{
    categoryKeywords: string[];
    stageKeywords: string[];
    locationKeywords: string[];
}> {
    console.log('[Gemini] Starting query expansion for:', userQuery);

    const prompt = `
You are an investor search query expander. Given a founder's search query, generate related keywords.

User Query: "${userQuery}"

Return a JSON object with 3 arrays:
{
  "categoryKeywords": ["keyword1", "keyword2", ...],  // Sector/industry terms
  "stageKeywords": ["pre-seed", "seed", ...],        // Funding stages
  "locationKeywords": ["Madrid", "Spain", ...]       // Geographic terms
}

Generate 10-20 keywords per category. Include synonyms, related terms, and broader/narrower concepts.
For "fintech", include: payments, neobank, DeFi, open banking, insurtech, wealthtech, regtech, etc.
Return ONLY valid JSON, no markdown.
`;

    try {
        console.log('[Gemini] Sending request to model...');
        const result = await model.generateContent(prompt);
        console.log('[Gemini] ✅ Response received successfully');

        const text = result.response.text();
        console.log('[Gemini] Raw response length:', text.length);

        // Clean markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(jsonStr);

        console.log('[Gemini] ✅ Parsed keywords:', {
            categories: parsed.categoryKeywords?.length || 0,
            stages: parsed.stageKeywords?.length || 0,
            locations: parsed.locationKeywords?.length || 0
        });

        return parsed;
    } catch (error) {
        console.error('[Gemini] ❌ Query Expansion Error:', error);
        console.error('[Gemini] Error details:', {
            name: (error as any)?.name,
            message: (error as any)?.message,
            status: (error as any)?.status
        });

        // Fallback
        console.log('[Gemini] Using fallback keywords');
        return {
            categoryKeywords: [userQuery],
            stageKeywords: [],
            locationKeywords: []
        };
    }
}
