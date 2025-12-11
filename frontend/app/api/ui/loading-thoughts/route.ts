import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        if (!query) {
            return NextResponse.json({
                thoughts: [
                    "Initializing neural search...",
                    "Scanning global database...",
                    "Triangulating best matches...",
                    "Filtering by relevance...",
                    "Preparing results..."
                ]
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const systemPrompt = `
            You are the "Brain" of an advanced AI Investment Banker.
            The user is searching for investors with the query: "${query}".
            Generate 5 short, technical, and precise "thoughts" or "steps" that you are taking to find the best match.
            Make them sound intelligent, active, and specific to the query.
            
            Format: Simple JSON string array.
            Example: ["Analyzing Fintech taxonomies...", "Cross-referencing London-based angels...", "Evaluating Series A ticket sizes...", "Parsing investment theses for 'Blockchain'...", "Ranking matches by relevance..."]
        `;

        const result = await model.generateContent(systemPrompt);
        const response = result.response;
        let text = response.text();

        // Extract JSON array from text
        const jsonMatch = text.match(/\[.*\]/s);
        const thoughts = jsonMatch ? JSON.parse(jsonMatch[0]) : [
            `Analyzing query: ${query}...`,
            "Scanning specialized verticals...",
            "Filtering for high-probability matches...",
            "Synthesizing investment patterns...",
            "Finalizing data visualization..."
        ];

        return NextResponse.json({ thoughts });

    } catch (error) {
        console.error("Error generating loading thoughts:", error);
        // Fallback
        return NextResponse.json({
            thoughts: [
                "Calibrating search algorithms...",
                "Accessing investor networks...",
                "Processing market data...",
                "Identifying key decision makers...",
                "Optimizing result ranking..."
            ]
        });
    }
}
