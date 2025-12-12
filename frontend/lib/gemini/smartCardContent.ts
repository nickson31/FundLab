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

    // Prepare Minimal Context for Gemini to save tokens
    const context = topResults.map(r => ({
        id: r.investor.id || r.investor.linkedinUrl || r.investor.website_url,
        name: r.investor.name || r.investor.fullName,
        about: r.investor.about || r.investor.description || r.investor.short_description, // Generic blob
        thesis: r.investor.investment_thesis,
        tags: r.investor.categories_strong_en || r.investor.category_keywords
    }));

    const prompt = `
    You are an expert VC Analyst. 
    User Query: "${query}"

    I have a list of investors. For each one, rewrite their "About" section to specifically explain WHY they are a good match for this query.
    Combine their thesis, bio, and tags into a single, compelling narrative paragraph (approx 30-40 words).
    Also pick 3 "Smart Tags" that best bridge the user's query and the investor's profile.

    Output STRICT JSON array:
    [
        {
            "investorId": "id from input",
            "rewrittenAbout": "Compelling narrative...",
            "smartTags": ["Tag1", "Tag2", "Tag3"]
        }
    ]

    Investors:
    ${JSON.stringify(context, null, 2)}
    `;

    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Use Flash for speed
        const result = await model.generateContent({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
        });

        const responseText = result.response.text();
        const data = JSON.parse(responseText);
        return data;
    } catch (e) {
        console.error("Smart Card Gen Error:", e);
        return []; // Fallback to empty, frontend will use default data
    }
}
