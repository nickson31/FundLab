import { model } from '../gemini';

interface SearchSummaryInput {
    query: string;
    results: any[];
    mode: 'angels' | 'funds';
}

/**
 * Generates an honest, concise summary of why the search results match the query.
 */
export async function generateSearchSummary(input: SearchSummaryInput): Promise<string> {
    const { query, results, mode } = input;

    if (!results || results.length === 0) return '';

    // Take top 5 results for analysis to save context window and speed
    const topResults = results.slice(0, 5).map(r => {
        const inv = r.investor || r.angel || r.fund; // Handle all potential shapes
        return {
            name: inv.name || inv.fullName || 'Unknown',
            headline: inv.headline || inv.description || '',
            tags: [
                ...(inv.categories_strong_es || inv.categories || '').split(','),
                ...(inv.stages_strong_es || inv.investment_stages || '').split(',')
            ].filter(Boolean).slice(0, 5)
        };
    });

    const prompt = `
Context: A user searched for "${query}" in a database of ${mode}.
I found ${results.length} matches. Here are the top 5:
${JSON.stringify(topResults, null, 2)}

Task: Write a helpful, honest, and concise summary (2-3 sentences max) for the chat interface.
- Explain WHY these are good matches (e.g. "I found investors specializing in X...").
- Be honest if they are only partial matches (e.g. "Most match your industry but focus on later stages...").
- Do NOT list them one by one. Synthesize the findings.
- Use a helpful, professional tone.

Summary:
`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Search Summary Generation Error:", error);
        return ""; // Fallback to client-side default message
    }
}
