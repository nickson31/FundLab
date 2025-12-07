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
Generate a 1-2 sentence summary explaining why this investor is a GOOD MATCH for the user's company.

INVESTOR DATA:
Name: ${investor.fullName || investor.name}
Focus: ${investor.industries || investor.investment_focus || investor.categories || 'N/A'}
Stage: ${investor.investment_stages || investor.stages || 'N/A'}
Location: ${investor.location || investor.addressWithCountry || investor.location_identifiers || 'N/A'}
Portfolio: ${JSON.stringify(investor.portfolio_companies?.slice(0, 3) || investor.investments?.slice(0, 3) || [])}

USER'S COMPANY:
${input.userCompany}

RULES:
- Maximum 2 sentences
- Be specific about WHY they're a match
- Reference their investment focus, portfolio, or stage preference
- Make it actionable (why the user should reach out)

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

