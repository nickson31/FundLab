-- migration_fix_v2.sql
-- Run this script to fix the "no unique constraint" error and complete the setup.

-- 1. Ensure keys are Primary Keys (fixes error 42830)
-- If the tables exist but lost their PK definition, this restores it.
DO $$
BEGIN
    -- For angel_investors
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'angel_investors') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'angel_investors' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE public.angel_investors ADD PRIMARY KEY (id);
        END IF;
    END IF;

    -- For investment_funds
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'investment_funds') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'investment_funds' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE public.investment_funds ADD PRIMARY KEY (id);
        END IF;
    END IF;
END $$;

-- 2. Create tables if they truly don't exist yet (Safe fallback)
CREATE TABLE IF NOT EXISTS public.angel_investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idx INTEGER,
  full_name TEXT,
  headline TEXT,
  email TEXT,
  linkedin_url TEXT,
  about TEXT,
  address_with_country TEXT,
  profile_pic TEXT,
  angel_score DECIMAL,
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

CREATE TABLE IF NOT EXISTS public.investment_funds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idx INTEGER,
  name TEXT,
  description TEXT,
  short_description TEXT,
  contact_email TEXT,
  phone_number TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  location_city TEXT,
  location_region TEXT,
  location_country TEXT,
  category_keywords TEXT,
  stage_keywords TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.fund_employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idx INTEGER,
  fund_id UUID REFERENCES public.investment_funds(id),
  full_name TEXT,
  headline TEXT,
  email TEXT,
  linkedin_url TEXT,
  about TEXT,
  profile_pic TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Now it is safe to add the Foreign Keys to search_results
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS matched_investor_id UUID;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS matched_fund_id UUID;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS relevance_score DECIMAL;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'saved';

-- Add constraints separately to avoid errors if they already exist
DO $$
BEGIN
    BEGIN
        ALTER TABLE public.search_results 
        ADD CONSTRAINT fk_search_results_angel 
        FOREIGN KEY (matched_investor_id) REFERENCES public.angel_investors(id);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;

    BEGIN
        ALTER TABLE public.search_results 
        ADD CONSTRAINT fk_search_results_fund 
        FOREIGN KEY (matched_fund_id) REFERENCES public.investment_funds(id);
    EXCEPTION WHEN duplicate_object THEN NULL;
    END;
END $$;

-- 4. Enable RLS and Policies (Safe)
ALTER TABLE public.angel_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS ( SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can view angel investors' ) THEN
        CREATE POLICY "Authenticated users can view angel investors" ON public.angel_investors FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS ( SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can view funds' ) THEN
        CREATE POLICY "Authenticated users can view funds" ON public.investment_funds FOR SELECT TO authenticated USING (true);
    END IF;
END $$;

-- 5. Update messages table
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS content TEXT;
