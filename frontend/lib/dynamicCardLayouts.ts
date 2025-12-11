/**
 * Dynamic Card Layout System
 * Gemini selects and combines multiple layout components based on available data
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
    | 'co_investors';

export interface DynamicField {
    component: LayoutComponent;
    label: string;
    value: string | string[];
    priority: number; // 1-5, higher = more important
    display_type: 'text' | 'list' | 'badge' | 'link';
}

export interface CardLayout {
    template: 'compact' | 'standard' | 'rich';
    components: LayoutComponent[];
    fields: DynamicField[];
}

/**
 * Intelligently select card layout based on available data
 * Combines multiple layout components to maximize information display
 */
export function selectDynamicLayout(
    investor: AngelInvestor | InvestmentFund,
    type: 'angel' | 'fund'
): CardLayout {
    const fields: DynamicField[] = [];
    const components: LayoutComponent[] = [];

    // Always show core components
    components.push('avatar', 'name', 'score_badge');

    // Extract available data intelligently
    if (type === 'angel') {
        const angel = investor as AngelInvestor;

        // Headline/Description
        if (angel.headline) {
            fields.push({
                component: 'headline',
                label: 'Role',
                value: angel.headline,
                priority: 5,
                display_type: 'text'
            });
            components.push('headline');
        }

        // Location
        const angelData = investor as any; // Cast to any for dynamic fields
        if (angelData.addressWithCountry || angelData.location_city) {
            const location = angelData.addressWithCountry || `${angelData.location_city || ''}, ${angelData.location_country || ''}`.trim();
            if (location && location !== ',') {
                fields.push({
                    component: 'location',
                    label: 'Location',
                    value: location,
                    priority: 4,
                    display_type: 'badge'
                });
                components.push('location');
            }
        }

        // Categories (English only)
        const categories = [
            ...(angel.categories_strong_en || '').split(','),
            ...(angel.categories_general_en || '').split(',')
        ].filter(Boolean).map(s => s.trim()).slice(0, 3);

        if (categories.length > 0) {
            fields.push({
                component: 'category_tags',
                label: 'Expertise',
                value: categories,
                priority: 5,
                display_type: 'list'
            });
            components.push('category_tags');
        }

        // Stages (English only)
        const stages = [
            ...(angel.stages_strong_en || '').split(','),
            ...(angel.stages_general_en || '').split(',')
        ].filter(Boolean).map(s => s.trim()).slice(0, 2);

        if (stages.length > 0) {
            fields.push({
                component: 'stage_tags',
                label: 'Investment Stage',
                value: stages,
                priority: 4,
                display_type: 'list'
            });
            components.push('stage_tags');
        }

        // Recent Investments
        const angelData2 = investor as any;
        if (angelData2.recent_investments) {
            fields.push({
                component: 'recent_investments',
                label: 'Recent Activity',
                value: angelData2.recent_investments,
                priority: 3,
                display_type: 'text'
            });
            components.push('recent_investments');
        }

        // Ticket Size
        const angelData3 = investor as any;
        if (angelData3.ticket_size) {
            fields.push({
                component: 'ticket_size',
                label: 'Ticket Size',
                value: angelData3.ticket_size,
                priority: 3,
                display_type: 'text'
            });
            components.push('ticket_size');
        }

        // About
        if (angel.about) {
            fields.push({
                component: 'about',
                label: 'About',
                value: angel.about,
                priority: 2,
                display_type: 'text'
            });
            components.push('about');
        }

        // LinkedIn
        if (angel.linkedinUrl) {
            fields.push({
                component: 'linkedin',
                label: 'LinkedIn',
                value: angel.linkedinUrl,
                priority: 2,
                display_type: 'link'
            });
            components.push('linkedin');
        }

    } else {
        // Fund logic (similar pattern)
        const fund = investor as InvestmentFund;

        if (fund.description || fund.short_description) {
            fields.push({
                component: 'headline',
                label: 'Description',
                value: fund.short_description || fund.description || '',
                priority: 5,
                display_type: 'text'
            });
            components.push('headline');
        }

        const fundData = investor as any;
        if (fundData.location_city || fundData.location_country) {
            const location = `${fundData.location_city || ''}, ${fundData.location_country || ''}`.trim();
            if (location && location !== ',') {
                fields.push({
                    component: 'location',
                    label: 'Location',
                    value: location,
                    priority: 4,
                    display_type: 'badge'
                });
                components.push('location');
            }
        }

        // Categories
        if (fund.category_keywords) {
            const categories = fund.category_keywords
                .replace(/[\[\]'"]/g, '')
                .split(',')
                .filter(Boolean)
                .map(s => s.trim())
                .slice(0, 3);

            if (categories.length > 0) {
                fields.push({
                    component: 'category_tags',
                    label: 'Focus Areas',
                    value: categories,
                    priority: 5,
                    display_type: 'list'
                });
                components.push('category_tags');
            }
        }

        const fundData2 = investor as any;
        if (fundData2.sweet_spot) {
            fields.push({
                component: 'ticket_size',
                label: 'Sweet Spot',
                value: fundData2.sweet_spot,
                priority: 4,
                display_type: 'text'
            });
            components.push('ticket_size');
        }

        const fundData3 = investor as any;
        if (fundData3.investment_thesis) {
            fields.push({
                component: 'investment_thesis',
                label: 'Investment Thesis',
                value: fundData3.investment_thesis,
                priority: 3,
                display_type: 'text'
            });
            components.push('investment_thesis');
        }

        if (fund.website_url) {
            fields.push({
                component: 'website',
                label: 'Website',
                value: fund.website_url,
                priority: 2,
                display_type: 'link'
            });
            components.push('website');
        }
    }

    // Determine template based on data richness
    const template = fields.length >= 8 ? 'rich' : fields.length >= 5 ? 'standard' : 'compact';

    return {
        template,
        components,
        fields: fields.sort((a, b) => b.priority - a.priority) // Sort by priority
    };
}
