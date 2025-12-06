import { model } from '../gemini';

interface MessageInput {
    investorData: any;
    companyContext: string;
}

export async function generateMessage(input: MessageInput): Promise<string> {
    const prompt = `
You are drafting a cold outreach message from a startup founder to an investor.

INVESTOR PROFILE:
Name: ${input.investorData.fullName || input.investorData.name}
Headline: ${input.investorData.headline || input.investorData.description || 'N/A'}
About: ${input.investorData.about || input.investorData.short_description || 'N/A'}
LinkedIn: ${input.investorData.linkedinUrl || input.investorData.linkedin || 'N/A'}

COMPANY CONTEXT:
${input.companyContext}

INSTRUCTIONS:
1. Deep Dive: Find "gold nuggets" in their profile (specific hobbies, exits, alma maters, phrases)
2. Personalize: Reference specific details (e.g., if headline says "Fatherhood x5", mention it tastefully)
3. Tone: Professional, concise, respectful of their time
4. Hook: Start with hyper-specific observation
5. Length: 4-6 sentences max
6. Call to Action: Ask for 15-min call or feedback

Return ONLY the message body (no subject line, no "Dear X", just the message).
`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Message Generation Error:", error);
        return "Error generating message. Please try again.";
    }
}
