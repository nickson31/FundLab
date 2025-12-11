// Investor data types based on database schema and JSON source files

export interface AngelInvestor {
    id: string; // UUID from DB
    idx?: number;
    fullName?: string;
    // 'name' is sometimes used as a fallback or alias in legacy code, but JSON uses fullName
    name?: string;
    headline?: string;
    email?: string | null;
    linkedinUrl?: string;
    about?: string;
    addressWithCountry?: string;
    profilePic?: string | null;
    angel_score?: string | number; // JSON has it as string "41.0", DB as DECIMAL

    // Validation & Categories
    validation_reasons_spanish?: string;
    validation_reasons_english?: string;
    categories_general_es?: string;
    categories_general_en?: string;
    categories_strong_es?: string;
    categories_strong_en?: string;
    stages_general_es?: string;
    stages_general_en?: string;
    stages_strong_es?: string;
    stages_strong_en?: string;

    // Timestamps
    created_at?: string;
    last_updated?: string;
}

export interface InvestmentFund {
    id: string; // UUID from DB
    idx?: number;
    name?: string;
    description?: string;
    short_description?: string;
    contact_email?: string | null;
    phone_number?: string | null;
    website_url?: string;
    linkedin_url?: string;

    // Location (Specific to Funds JSON)
    location_city?: string;
    location_region?: string;
    location_country?: string;

    // Keywords
    category_keywords?: string; // stored as stringified array or similar in JSON/DB
    stage_keywords?: string;

    // Timestamps
    created_at?: string;
    last_updated?: string;
}

export interface FundEmployee {
    id: string;
    idx?: number;
    fund_id?: string;
    full_name?: string; // Note: employees JSON uses snake_case 'full_name' sometimes, or camcelCase. Checking JSON...
    // JSON analysis:
    // keys: idx, contact_email, description, name, phone_number, linkedin/value, location_identifiers, short_description, website/value
    // Wait, the previous file view of employees_rows.json will confirm strict keys.
    // For now, assuming similar to Angel but strictly typed.

    // Common fields found in typical employee/investor schemas
    headline?: string;
    email?: string;
    linkedin_url?: string;
    about?: string;
    profile_pic?: string;

    created_at?: string;
    last_updated?: string;
}

// Unified Union Type
export type Investor = AngelInvestor | InvestmentFund | FundEmployee;

export interface MatchBreakdown {
    category_match: number;
    stage_match: number;
    location_match: number;
    overall_score: number;
    reason_summary?: string;
    reasoning?: string;
    matched_keywords?: string[];
}

export interface SearchResult {
    id?: string; // ID of the search_result row in DB
    investor: Investor;
    type: 'angel' | 'fund' | 'employee';
    score: number;
    breakdown: MatchBreakdown;
    status?: 'saved' | 'contacted' | 'replied';
}

