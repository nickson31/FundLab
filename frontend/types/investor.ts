// Investor data types based on database schema

export interface AngelInvestor {
    id?: string;
    fullName?: string;
    name?: string;
    headline?: string;
    addressWithCountry?: string;
    linkedinUrl?: string;
    profilePic?: string;
    angel_score?: string | number;
    categories_strong_es?: string;
    categories_strong_en?: string;
    stages_strong_es?: string;
    stages_strong_en?: string;
    // Allow additional fields from JSONB
    [key: string]: string | number | boolean | null | undefined;
}

export interface InvestmentFund {
    id?: string;
    name?: string;
    headline?: string;
    location?: string;
    linkedinUrl?: string;
    profilePic?: string;
    category_keywords?: string;
    location_identifiers?: string;
    // Allow additional fields from JSONB
    [key: string]: string | number | boolean | null | undefined;
}

export interface FundEmployee {
    id?: string;
    fullName?: string;
    name?: string;
    headline?: string;
    addressWithCountry?: string;
    linkedinUrl?: string;
    profilePic?: string;
    fund_name?: string;
    // Allow additional fields from JSONB
    [key: string]: string | number | boolean | null | undefined;
}

export type Investor = AngelInvestor | InvestmentFund | FundEmployee;

export interface MatchBreakdown {
    category_match?: number;
    stage_match?: number;
    location_match?: number;
    overall_score?: number;
    // Allow additional breakdown fields
    [key: string]: number | string | undefined;
}

export interface SearchResult {
    investor: Investor;
    type: 'angel' | 'fund' | 'employee';
    score: number;
    breakdown: MatchBreakdown;
}
