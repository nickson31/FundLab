import { model } from '../gemini';

interface MessageInput {
    investorData: any;
    companyContext: string;
    messageType?: 'linkedin' | 'email';
}

interface SummaryInput {
    investorData: any;
    userCompany: string;
}

/**
 * Generate a personalized outreach message for an investor
 * CRITICAL: Reads ALL investor columns for maximum personalization
 */
export async function generateMessage(input: MessageInput): Promise<string> {
    const investor = input.investorData;
    const type = input.messageType || 'linkedin';

    const prompt = `
CRITICAL INSTRUCTION: READ ALL COLUMNS from the investor data below. Do not skip any field.
Analyze every piece of information to create a hyper-personalized message.

=== COMPLETE INVESTOR PROFILE (READ EVERY FIELD) ===
${JSON.stringify(investor, null, 2)}

=== USER'S COMPANY CONTEXT ===
${input.companyContext}

=== MESSAGE TYPE: ${type.toUpperCase()} ===

=== GENERATION RULES ===
1. **Format**:
   ${type === 'email' ? '- Format as a cold email.\n   - Include a catchy "Subject:" line at the very top.\n   - Use professional email spacing.' : '- Format as a LinkedIn message (Connection or InMail).\n   - NO Subject line.\n   - Keep it concise (under 200 words).\n   - Casual but professional tone.'}
   - **IMPORTANT**: Use Markdown. Ensure there are double newlines (blank lines) between paragraphs for readability.

2. **Deep Analysis & Personalization**:
   - Reference a SPECIFIC portfolio company, investment thesis, or background detail "gold nugget".
   - Explain WHY this specific investor is a good fit for the user's company context.
   - Do NOT be generic.

3. **Structure**:
   - Hook: Hyper-specific observation about THEM.
   - Value Prop: Alignment with their thesis.
   - Credibility: Brief traction.
   - Ask: Low friction (15 min call or feedback).

4. **Tone**:
   - Professional, warm, confident.
   - No salesy language.

Return ONLY the message body (and Subject for email).
`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Message Generation Error:", error);
        return "Error generating message. Please try again.";
    }
}

/**
 * Generate a 1-2 sentence summary explaining why this investor is a good match
 */
export async function generateInvestorSummary(input: SummaryInput): Promise<string> {
    const investor = input.investorData;

    const prompt = `
CRITICAL INSTRUCTION: READ ALL COLUMNS from the investor data below.
Generate a 1-2 sentence summary explaining why this investor is a GOOD MATCH for the user's company (context below).

=== COMPLETE INVESTOR PROFILE ===
${JSON.stringify(investor, null, 2)}

=== USER'S COMPANY CONTEXT ===
${input.userCompany}

RULES:
- Maximum 2 sentences.
- Be specific: Reference their actual portfolio, bio, or thesis tags from the data.
- Explain the "WHY" (e.g. "Because they invested in X and focus on Y...").
- Do not use generic phrases like "This investor matches because...". Dive straight into the reason.

Return ONLY the summary text, no labels or formatting.
`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Summary Generation Error:", error);
        return "Investor matches your search criteria.";
    }
}

