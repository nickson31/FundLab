import { model } from '../gemini';

interface MessageInput {
    investorData: any;
    companyContext: string;
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

    const prompt = `
CRITICAL INSTRUCTION: READ ALL COLUMNS from the investor data below. Do not skip any field.
Analyze every piece of information to create a hyper-personalized message.

=== COMPLETE INVESTOR PROFILE (READ EVERY FIELD) ===
${JSON.stringify(investor, null, 2)}

=== USER'S COMPANY CONTEXT ===
${input.companyContext}

=== MESSAGE GENERATION RULES ===
1. **Deep Analysis Required**: Find "gold nuggets" in their profile:
   - Past investments/portfolio companies
   - Specific industries they focus on
   - Their investment thesis or philosophy
   - Educational background (alma mater)
   - Personal details (hobbies, interests mentioned in bio)
   - Geographic focus
   - Stage preferences (pre-seed, seed, series A)

2. **Personalization Keys**:
   - Reference a SPECIFIC portfolio company or investment they made
   - Mention their investment focus that aligns with the user's startup
   - If they have published content/quotes, reference it
   - Find common ground (location, industry experience, mutual connections)

3. **Message Structure**:
   - Hook: Hyper-specific observation about THEM (not generic)
   - Value Prop: One sentence on why you're reaching out (aligned to their thesis)
   - Credibility: Brief traction or relevant experience
   - Ask: 15-minute call or quick feedback

4. **Constraints**:
   - 4-6 sentences MAX
   - Professional but warm tone
   - No salesy language
   - No "Dear [Name]" or "Subject:" - just the message body
   - Avoid generic phrases like "I came across your profile"

5. **Quality Check**: The message MUST reference at least 2 specific details from their profile.

Return ONLY the message body. No formatting, no labels.
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

