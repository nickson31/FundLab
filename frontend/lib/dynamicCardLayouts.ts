/**
 * Dynamic Card Layout System (Advanced)
 * Gemini selects and combines multiple layout components based on available data AND user relevance
 */

import { AngelInvestor, InvestmentFund } from '@/types/investor';

export type LayoutComponent =
    | 'avatar'
    | 'name'
    | 'headline'
    | 'location'
    | 'score_badge'
    | 'category_tags'
    | 'stage_tags'
    | 'recent_investments'
    | 'ticket_size'
    | 'portfolio_companies'
    | 'investment_thesis'
    | 'about'
    | 'linkedin'
    | 'website'
    | 'focused_round'
    | 'co_investors';

export interface DynamicField {
    component: LayoutComponent;
    label: string;
    value: string | string[];
    priority: number; // 1-100, dynamically scored
    display_type: 'text' | 'list' | 'badge' | 'link';
}

export interface CardLayout {
    template: 'compact' | 'standard' | 'rich';
    components: LayoutComponent[];
    fields: DynamicField[];
}

/**
 * Calculates a dynamic priority score for a field based on content and query relevance
 */
function calculateFieldScore(
    component: LayoutComponent,
    value: string | string[],
    userQuery?: string
): number {
    let score = 0;
    const textValue = Array.isArray(value) ? value.join(' ') : value;
    const lowerText = textValue.toLowerCase();
    const queryTerms = userQuery ? userQuery.toLowerCase().split(' ').filter(w => w.length > 3) : [];

    // 1. Base Priority by Component Type
    switch (component) {
        case 'recent_investments': score = 50; break; // Always high value
        case 'ticket_size': score = 45; break;
        case 'investment_thesis': score = 40; break;
        case 'headline': score = 35; break;
        case 'category_tags': score = 30; break;
        case 'stage_tags': score = 25; break;
        case 'location': score = 20; break;
        case 'about': score = 15; break;
        default: score = 10;
    }

    // 2. Relevance Boost (Keyword Match)
    // If the field contains a word from the user's query, MASSIVE boost
    queryTerms.forEach(term => {
        if (lowerText.includes(term)) {
            score += 40; // Makes it #1 priority usually
        }
    });

    // 3. Richness Boost
    // "Lead Investor" is better than just "$50k"
    if (lowerText.includes('lead') || lowerText.includes('follow-on') || lowerText.includes('board')) {
        score += 10;
    }
    // Specific dollar amounts are good
    if (lowerText.includes('$') || lowerText.includes('€') || lowerText.includes('£')) {
        score += 5;
    }

    // 4. Content Quality Checks
    if (textValue.length < 3 || textValue === 'N/A' || textValue === 'Not specified') {
        score = -1; // Hide completely
    }
    // De-prioritize very long generic text unless it matches a keyword
    if (textValue.length > 500 && !queryTerms.some(t => lowerText.includes(t))) {
        score -= 20;
    }

    return score;
}

/**
 * Intelligently select card layout based on available data
 * Combines multiple layout components to maximize information display
 */
export function selectDynamicLayout(
    investor: AngelInvestor | InvestmentFund,
    type: 'angel' | 'fund',
    userQuery?: string // Optional context for scoring
): CardLayout {
    let fields: DynamicField[] = [];
    const components: LayoutComponent[] = [];

    // Always show core components
    components.push('avatar', 'name', 'score_badge');

    // Extract available data intelligently
    if (type === 'angel') {
        const angel = investor as AngelInvestor;

        // Helper to add field with dynamic scoring
        const addField = (comp: LayoutComponent, label: string, val: string | string[]) => {
            if (!val || (Array.isArray(val) && val.length === 0)) return;
            const score = calculateFieldScore(comp, val, userQuery);
            if (score > 0) {
                fields.push({
                    component: comp,
                    label,
                    value: val,
                    priority: score,
                    display_type: Array.isArray(val) ? 'list' : (comp === 'location' ? 'badge' : (comp === 'linkedin' || comp === 'website' ? 'link' : 'text'))
                });
                components.push(comp);
            }
        };

        addField('headline', 'Role', angel.headline || '');

        const angelData = investor as any;
        const location = angelData.addressWithCountry || `${angelData.location_city || ''}, ${angelData.location_country || ''}`.trim();
        if (location && location !== ',') addField('location', 'Location', location);

        // SMART CONTENT INJECTION (AI Reasoning Phase)
        // If Gemini provided a rewritten "About" or "Smart Tags", prioritize them above all else.
        if ((investor as any).smartAbout) {
            fields.push({
                component: 'about', // Reuse 'about' component but with smart content
                label: 'AI Reasoning', // Label it clearly so user knows it's AI
                value: (investor as any).smartAbout,
                priority: 95, // Extremely high priority, beats almost everything
                display_type: 'text'
            });
            components.push('about'); // Ensure it's in the component list
        }

        if ((investor as any).smartTags && Array.isArray((investor as any).smartTags)) {
            fields.push({
                component: 'category_tags',
                label: 'Smart Match',
                value: (investor as any).smartTags,
                priority: 90,
                display_type: 'list' // Badge list
            });
            components.push('category_tags');
        }

        const categories = [
            ...(angel.categories_strong_en || '').split(','),
            ...(angel.categories_general_en || '').split(',')
        ].filter(Boolean).map(s => s.trim()).slice(0, 3);
        // Only add standard categories if we didn't add smart tags, or add them with lower priority
        if (!(investor as any).smartTags) {
            addField('category_tags', 'Expertise', categories);
        }

        const stages = [
            ...(angel.stages_strong_en || '').split(','),
            ...(angel.stages_general_en || '').split(',')
        ].filter(Boolean).map(s => s.trim()).slice(0, 2);
        addField('stage_tags', 'Stage', stages);

        addField('recent_investments', 'Recent Activity', (investor as any).recent_investments || '');
        addField('ticket_size', 'Ticket Size', (investor as any).ticket_size || '');
        addField('about', 'About', angel.about || '');
        addField('linkedin', 'LinkedIn', angel.linkedinUrl || '');

    } else {
        // Fund logic
        const fund = investor as InvestmentFund;
        const fundData = investor as any;

        const addField = (comp: LayoutComponent, label: string, val: string | string[]) => {
            if (!val || (Array.isArray(val) && val.length === 0)) return;
            const score = calculateFieldScore(comp, val, userQuery);
            if (score > 0) {
                fields.push({
                    component: comp,
                    label,
                    value: val,
                    priority: score,
                    display_type: Array.isArray(val) ? 'list' : (comp === 'location' ? 'badge' : (comp === 'linkedin' || comp === 'website' ? 'link' : 'text'))
                });
                components.push(comp);
            }
        };

        addField('headline', 'Description', fund.short_description || fund.description || '');

        const location = `${fundData.location_city || ''}, ${fundData.location_country || ''}`.trim();
        if (location && location !== ',') addField('location', 'Location', location);

        // SMART CONTENT INJECTION (AI Reasoning Phase)
        if ((investor as any).smartAbout) {
            fields.push({
                component: 'investment_thesis', // For funds, map explanation to Thesis component
                label: 'AI Reasoning',
                value: (investor as any).smartAbout,
                priority: 95,
                display_type: 'text'
            });
            components.push('investment_thesis');
        }

        if ((investor as any).smartTags && Array.isArray((investor as any).smartTags)) {
            fields.push({
                component: 'category_tags',
                label: 'Smart Match',
                value: (investor as any).smartTags,
                priority: 90,
                display_type: 'list'
            });
            components.push('category_tags');
        }

        if (fund.category_keywords && !(investor as any).smartTags) {
            const categories = fund.category_keywords
                .replace(/[\[\]'"]/g, '')
                .split(',')
                .filter(Boolean)
                .map(s => s.trim())
                .slice(0, 3);
            addField('category_tags', 'Focus', categories);
        }

        addField('ticket_size', 'Sweet Spot', fundData.sweet_spot || '');
        addField('investment_thesis', 'Thesis', fundData.investment_thesis || '');
        addField('website', 'Website', fund.website_url || '');
    }

    // Sort by Priority (High to Low)
    fields = fields.sort((a, b) => b.priority - a.priority);

    // Filter duplicates if any
    fields = fields.filter((field, index, self) =>
        index === self.findIndex((t) => (
            t.component === field.component
        ))
    );

    // INTELLIGENT DE-DUPLICATION
    // If we have AI Reasoning (smartAbout), we hide the generic "About", "Thesis", and "Description" fields
    // to prevent user seeing the same info twice (once raw, once rewritten).
    const hasSmartAbout = fields.some(f => f.label === 'AI Reasoning');
    if (hasSmartAbout) {
        fields = fields.filter(f => !['about', 'investment_thesis', 'headline'].includes(f.component));
    }

    // If we have Smart Tags, hide generic Category Tags
    const hasSmartTags = fields.some(f => f.label === 'Smart Match');
    if (hasSmartTags) {
        fields = fields.filter(f => f.component !== 'category_tags' || f.label === 'Smart Match');
    }

    // Determine template based on rich field count (score > 20)
    const richfieldCount = fields.filter(f => f.priority > 20).length;
    const template = richfieldCount >= 4 ? 'rich' : richfieldCount >= 2 ? 'standard' : 'compact';

    return {
        template,
        components,
        fields
    };
}
