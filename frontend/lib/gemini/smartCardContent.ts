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
    // New: Specific "Did you know?" highlight
    unique_highlight?: string;
    // 8. EXTRA INFO for Dropdown (4-5 items)
    extendedAnalysis: { title: string; content: string }[];
    // Score label (e.g. "Perfect Match")
    matchLabel: string;
}

export async function generateSmartCardContent(query: string, results: any[], mode: 'angels' | 'funds' = 'angels'): Promise<SmartCardContent[]> {
    if (!results || results.length === 0) return [];

    // Helper to separate batches
    const chunkArray = (array: any[], size: number) => {
        const chunked = [];
        for (let i = 0; i < array.length; i += size) {
            chunked.push(array.slice(i, i + size));
        }
        return chunked;
    };

    // Prepare full context
    const fullContext = results.map(r => ({
        id: r.investor.id || r.investor.linkedinUrl || r.investor.website_url,
        name: r.investor.name || r.investor.fullName,
        raw_data: JSON.stringify(r.investor).slice(0, 2000)
    }));

    // Process in batches of 5 to avoid token limits
    const BATCH_SIZE = 5;
    const batches = chunkArray(fullContext, BATCH_SIZE);

    console.log(`[SmartCard] Processing ${fullContext.length} items in ${batches.length} batches...`);

    const processBatch = async (batchContext: any[], batchIndex: number) => {
        const count = batchContext.length;
        let prompt = '';

        if (mode === 'funds') {
            prompt = `
            You are an expert VC Fund Analyst. The user is a founder searching for: "${query}".
            
            INPUT: A list of ${count} VENTURE FUNDS.
            TASK: JSON Response.
            
            CRITICAL INSTRUCTIONS:
            1. **PROCESS EVERY SINGLE FUND** in the input list (${count} items).
            2. **Investment Logic**: Extract specific thesis details.
            3. **Expertise**: Deduce 3 specific tags.
            4. **Golden Nuggets**: MUST BE HARD FACTS (Exits, Fund Size, Ticket). NO FLUFF.
            5. **CURIOSITY / UNIQUE HIGHLIGHT**: Find ONE extremely specific, non-obvious fact in the columns (e.g. "Only invests in B2B", "Founded by ex-Spotify VP").
            6. **Targeted Deep Dive**: Generate 4-5 EXTRA distinct insights.
            7. **Tone**: Institutional.

            Output STRICT JSON array of exactly ${count} objects:
            [
                {
                    "investorId": "id from input",
                    "oneLineSummary": "A leading [Stage] fund specializing in [Sector].",
                    "expertises": ["Fintech", "Series A", "Lead Investor"],
                    "generalExplanation": "Explain why this FUND fits the user's query perfectly based on their known thesis.",
                    "unique_highlight": "Managed by former PayPal Mafia members.",
                    "goldenNuggets": [
                        { "title": "Portfolio", "content": "Early backer of Revolut & Monzo." },
                        { "title": "Power", "content": "$1Bn AUM across 4 funds." }
                    ],
                    "extendedAnalysis": [
                        { "title": "Market Power", "content": "Dominates European Fintech seed rounds." },
                        { "title": "Reserves", "content": "Reserves 50% of follow-ons." },
                        { "title": "Board Style", "content": "Hands-on, operational support." },
                        { "title": "Network", "content": "Direct line to Tier 1 US VCs." }
                    ],
                    "matchLabel": "Top Tier Fund"
                }
            ]

            Funds to Analyze (${count}):
            ${JSON.stringify(batchContext, null, 2)}
            `;
        } else {
            prompt = `
            You are an expert VC Analyst. The user is a founder searching for: "${query}".
            
            INPUT: A list of ${count} ANGEL INVESTORS.
            TASK: JSON Response.
            
            CRITICAL INSTRUCTIONS:
            1. **PROCESS EVERY SINGLE INVESTOR** in the input list (${count} items).
            2. **Neve Copy/Paste**: Refine the text.
            3. **Expertise**: 3-4 specific strengths (Sector, Stage, Value).
            4. **Golden Nuggets**: IMPRESSIVE FACTS (Ex-Founder, Big Tech VP, Investments).
            5. **CURIOSITY / UNIQUE HIGHLIGHT**: Find ONE extremely specific, non-obvious fact (e.g. "Ex-Google Director", "Invests in 48h", "Loves deep tech").
            6. **Targeted Deep Dive**: 4-5 EXTRA distinct insights.
            7. **Tone**: Insider-y, High Signal.

            Output STRICT JSON array of exactly ${count} objects:
            [
                {
                    "investorId": "id from input",
                    "oneLineSummary": "Former VP Product at Uber turned Fintech Angel.",
                    "expertises": ["Fintech", "Seed Stage", "Product Guru"],
                    "generalExplanation": "Why is this investor good for THIS user query?",
                    "unique_highlight": "Holds a PhD in AI from Stanford.",
                    "goldenNuggets": [
                        { "title": "Speed", "content": "Known for same-day term sheets." },
                        { "title": "Track Record", "content": "Early investor in Notion." }
                    ],
                    "extendedAnalysis": [
                        { "title": "Operator Skill", "content": "Can help with B2B Sales strategy." },
                        { "title": "Deal Flow", "content": "Sees 100+ deals/mo, high signal." },
                        { "title": "References", "content": "Founders love him, very supportive." },
                        { "title": "Check Velocity", "content": "Fast mover, no complex DD." }
                    ],
                    "matchLabel": "Perfect Match"
                }
            ]

            Investors to Analyze (${count}):
            ${JSON.stringify(batchContext, null, 2)}
            `;
        }

        try {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
            const result = await model.generateContent({
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: 'application/json' }
            });

            const responseText = result.response.text();
            const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
            const data = JSON.parse(cleanedText);
            console.log(`[SmartCard] Batch ${batchIndex + 1}/${batches.length} success. Got ${data.length} cards.`);
            return data;
        } catch (e) {
            console.error(`[SmartCard] Batch ${batchIndex + 1} Error:`, e);
            return []; // Fail gracefully for this batch
        }
    };

    // Execute batches in parallel
    const allResults = await Promise.all(batches.map((batch, index) => processBatch(batch, index)));

    // Flatten result from [[cards], [cards]] -> [cards]
    const currentResults = allResults.flat();
    console.log(`[SmartCard] Total cards generated: ${currentResults.length}`);
    return currentResults;
}
