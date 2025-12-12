import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface SmartCardContent {
    investorId: string;
    // 2. Resumen de 1 frase corta
    oneLineSummary: string;
    // 5. 3-4 tarjetas de colores (Expertise rewritten)
    expertises: string[];
    // 6. Resumen de 2-3 frases (Query + Investor synthesis)
    generalExplanation: string;
    // 7. Curiosidades / Golden Nuggets
    goldenNuggets: { title: string; content: string }[];
    // Score label (e.g. "Perfect Match")
    matchLabel: string;
}

export async function generateSmartCardContent(query: string, results: any[]): Promise<SmartCardContent[]> {
    if (!results || results.length === 0) return [];

    // Limit to top 3 for performance/rate-limits
    const topResults = results.slice(0, 3);

    // Context: Provide RAW dumps but instruct strict rewriting
    const context = topResults.map(r => ({
        id: r.investor.id || r.investor.linkedinUrl || r.investor.website_url,
        name: r.investor.name || r.investor.fullName,
        raw_data: JSON.stringify(r.investor).slice(0, 2000) // Moderate chunk
    }));

    const prompt = `
    You are an expert VC Analyst. The user is a founder searching for: "${query}".

    Your goal is to analyze these investors and generate a **Rich Insight Card** for each.
    
    CRITICAL RULES:
    1. **NEVER** copy raw data. Always rewrite, synthesize, and summarize.
    2. **Expertise**: Extract 3-4 key strengths (e.g., sectors, stages, unique value) and rewrite them as short, punchy tags (max 2 words each).
    3. **Golden Nuggets**: Find 1-4 specific, high-value, or "unusual" details (e.g. "Board Member at Revolut", "Writes checks in 48h", "Focuses on female founders"). Title them dynamically.
    4. **Tone**: Professional, insightful, insider-y.

    Output STRICT JSON array:
    [
        {
            "investorId": "id from input",
            "oneLineSummary": "Short, punchy 1-sentence summary of who they are.",
            "expertises": ["TAG 1", "TAG 2", "TAG 3"],
            "generalExplanation": "2-3 sentences explaining exactly WHY they match the user's query ("${query}"). Connect the dots.",
            "goldenNuggets": [
                { "title": "Speed", "content": "Known for 24h term sheets." },
                { "title": "Network", "content": "Ex-Stripe mafia connections." }
            ],
            "matchLabel": "One word score label (e.g. 'Perfect', 'Strong', 'Good')"
        }
    ]

    Investors:
    ${JSON.stringify(context, null, 2)}
    `;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
        });

        const responseText = result.response.text();
        const data = JSON.parse(responseText);
        return data;
    } catch (e) {
        console.error("Smart Card Gen Error:", e);
        return [];
    }
}
