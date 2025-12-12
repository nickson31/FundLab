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

export async function generateSmartCardContent(query: string, results: any[], mode: 'angels' | 'funds' = 'angels'): Promise<SmartCardContent[]> {
    if (!results || results.length === 0) return [];

    // Limit to top 10 for better coverage as requested
    const topResults = results.slice(0, 10);

    // Context: Provide RAW dumps but instruct strict rewriting
    const context = topResults.map(r => ({
        id: r.investor.id || r.investor.linkedinUrl || r.investor.website_url,
        name: r.investor.name || r.investor.fullName,
        raw_data: JSON.stringify(r.investor).slice(0, 2000) // Moderate chunk
    }));

    let prompt = '';

    if (mode === 'funds') {
        prompt = `
        You are an expert VC Fund Analyst. The user is a founder searching for: "${query}".

        Your goal is to analyze these VENTURE FUNDS and generate a **Rich Insight Card** for each.
        
        CRITICAL RULES FOR FUNDS:
        1. **Investment Logic**: Extract specific thesis details (e.g. "Only B2B SaaS", "Focus on Deeptech").
        2. **Expertise**: Deduce 3 specific tags: [Sector Focus], [Stage Focus], [Ticket Size hint if avail].
        3. **Golden Nuggets**: Dig for Portfolio Highlights, LP composition, or specialized value add (e.g. "Part of YC network", "Series A leader").
        4. **Tone**: Institutional, precise, and high-value.

        Output STRICT JSON array:
        [
            {
                "investorId": "id from input",
                "oneLineSummary": "A leading [Stage] fund specializing in [Sector].",
                "expertises": ["Fintech", "Series A", "Lead Investor"],
                "generalExplanation": "Explain why this FUND fits the user's query perfectly based on their known thesis.",
                "goldenNuggets": [
                    { "title": "Portfolio", "content": "Invested in X, Y, Z." },
                    { "title": "Thesis", "content": "Looks for strong network effects." }
                ],
                "matchLabel": "Top Tier Fund"
            }
        ]

        Funds:
        ${JSON.stringify(context, null, 2)}
        `;
    } else {
        // ANGELS PROMPT (Original but refined)
        prompt = `
        You are an expert VC Analyst. The user is a founder searching for: "${query}".

        Your goal is to analyze these ANGEL INVESTORS and generate a **Rich Insight Card** for each.
        
        CRITICAL RULES:
        1. **NEVER COPY/PASTE**: Read the data, interpret it, and write completely NEW text.
        2. **Expertise**: Deduce 3-4 specific strengths (Sector, Stage, or Unique Value). Write them as CLEAN, SHORT tags (max 2 words).
        3. **Golden Nuggets**: Dig for 1-4 specific, high-value details (e.g. "Ex-Founder of X", "24h decision speed", "Top Tier Network").
        4. **Tone**: Professional, insider-y, and high-signal.

        Output STRICT JSON array:
        [
            {
                "investorId": "id from input",
                "oneLineSummary": "A powerful 1-sentence bio emphasizing their relevance.",
                "expertises": ["Fintech", "Seed Stage", "Operator VC"],
                "generalExplanation": "2-3 sentences explaining the MATCH LOGIC. Why is this investor good for THIS user query? Be specific.",
                "goldenNuggets": [
                    { "title": "Speed", "content": "Known for same-day term sheets." },
                    { "title": "Network", "content": "Strong ties to YC alumni." }
                ],
                "matchLabel": "Perfect Match"
            }
        ]

        Investors:
        ${JSON.stringify(context, null, 2)}
        `;
    }

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
