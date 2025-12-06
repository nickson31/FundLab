import { model } from '../gemini';

export async function expandQuery(userQuery: string): Promise<{
    categoryKeywords: string[];
    stageKeywords: string[];
    locationKeywords: string[];
}> {
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
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // Clean markdown code blocks if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Gemini Query Expansion Error:", error);
        // Fallback
        return {
            categoryKeywords: [userQuery],
            stageKeywords: [],
            locationKeywords: []
        };
    }
}
