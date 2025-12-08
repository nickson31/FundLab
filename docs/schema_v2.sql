-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 0. cleanup: Remove potentially "messy" auto-imported tables to ensure a clean schema
DROP TABLE IF EXISTS public.search_results CASCADE;
DROP TABLE IF EXISTS public.angels CASCADE;
DROP TABLE IF EXISTS public.funds CASCADE;
DROP TABLE IF EXISTS public.employees CASCADE;

-- 1. Table: angels
CREATE TABLE public.angels (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idx BIGINT,
    full_name TEXT,
    headline TEXT,
    email TEXT,
    linkedin_url TEXT,
    about TEXT,
    address_with_country TEXT,
    profile_pic TEXT,
    angel_score NUMERIC,
    validation_reasons_spanish TEXT,
    validation_reasons_english TEXT,
    categories_general_es TEXT,
    categories_general_en TEXT,
    categories_strong_es TEXT,
    categories_strong_en TEXT,
    stages_general_es TEXT,
    stages_general_en TEXT,
    stages_strong_es TEXT,
    stages_strong_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: funds
CREATE TABLE public.funds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idx BIGINT,
    name TEXT,
    description TEXT,
    short_description TEXT,
    contact_email TEXT,
    phone_number TEXT,
    website_url TEXT, -- Mapped from website/value
    linkedin_url TEXT, -- Mapped from linkedin/value
    location_city TEXT, -- Mapped from location_identifiers/0
    location_region TEXT, -- Mapped from location_identifiers/1
    location_country TEXT, -- Mapped from location_identifiers/2
    category_keywords TEXT,
    stage_keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table: employees
CREATE TABLE public.employees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    idx BIGINT,
    full_name TEXT,
    headline TEXT,
    job_title TEXT,
    about TEXT,
    email TEXT,
    linkedin_url TEXT,
    profile_pic TEXT,
    address_with_country TEXT,
    company_linkedin TEXT,
    company_name TEXT,
    company_website TEXT,
    fund_name TEXT,
    relevancia_dentro_del_fondo INT,
    mira_pitch_decks INT,
    probabilidad_respuesta INT,
    score_combinado NUMERIC,
    razonamiento TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table: search_results (For History/Caching)
CREATE TABLE public.search_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID DEFAULT auth.uid(),
    query TEXT,
    summary TEXT,
    status TEXT DEFAULT 'completed',
    matched_angel_id UUID REFERENCES public.angels(id),
    matched_fund_id UUID REFERENCES public.funds(id),
    matched_employee_id UUID REFERENCES public.employees(id),
    relevance_score FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Enable RLS
ALTER TABLE public.angels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies (Public Read Access for App)
-- Allow authenticated users (and service role) to read data
CREATE POLICY "Enable read access for authenticated users" ON public.angels FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable read access for authenticated users" ON public.funds FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable read access for authenticated users" ON public.employees FOR SELECT TO authenticated USING (true);

-- Allow inserting search results
CREATE POLICY "Enable insert for authenticated users" ON public.search_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable read for own search results" ON public.search_results FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- If using Service Key (seed script), it bypasses RLS automatically.
