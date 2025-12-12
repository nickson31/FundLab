import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface SmartCardContent {
    investorId: string;
    rewrittenAbout: string; // "Reasoning" + "Custom Pitch" style
    smartTags: string[]; // 3 tags relevant to the query
}

export async function generateSmartCardContent(query: string, results: any[]): Promise<SmartCardContent[]> {
    if (!results || results.length === 0) return [];

    // Limit to top 3 for performance/rate-limits
    const topResults = results.slice(0, 3);

    // Prepare Minimal Context for Gemini
    // We intentionally provide RAW dumps to encourage synthesis, not copying
    const context = topResults.map(r => ({
        id: r.investor.id || r.investor.linkedinUrl || r.investor.website_url,
        name: r.investor.name || r.investor.fullName,
        raw_data: JSON.stringify(r.investor).slice(0, 1500) // Give it a chunk of data
    }));

    const prompt = `
    You are an expert VC Investment Banker pitching these investors to a founder.
    The founder is looking for: "${query}"

    For each investor, write a COMPLETELY UNIQUE, narrative-style pitch paragraph (40-60 words).
    
    RULES:
    1. DO NOT simply list facts like "Location: London" or "Thesis: Fintech".
    2. COMPLETELY REWRITE the information into a persuasive story.
    3. Example: "With a strong foothold in European Fintech, this fund is the perfect partner for your seed round. Their history of backing B2B marketplaces like X and Y demonstrates their conviction in your model."
    4. Ignore empty fields. Synthesize what is there.
    5. Pick 3 "Smart Tags" that bridge the gap between the query and the investor (e.g. "Fintech Match", "London Native", "Seed Specialist").

    Output STRICT JSON array:
    [
        {
            "investorId": "id from input",
            "rewrittenAbout": "Your narrative pitch here...",
            "smartTags": ["Tag1", "Tag2", "Tag3"]
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
