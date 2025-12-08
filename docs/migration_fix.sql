-- migration_fix.sql
-- Run this script to safely update your existing database with FundLab features.

-- 1. Create NEW tables (FundLab specific) if they don't exist
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

-- 2. Enable RLS on new tables
ALTER TABLE public.angel_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_employees ENABLE ROW LEVEL SECURITY;

-- 3. Create generic policies (safe to re-run, will fail if exists but that's fine for policies usually, OR we can drop first)
-- For simplicity in SQL editor, we just try creating. If policy exists, it raises error.
-- Let's use DO block for policies to be safe/silent.
DO $$
BEGIN
    IF NOT EXISTS ( SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can view angel investors' ) THEN
        CREATE POLICY "Authenticated users can view angel investors" ON public.angel_investors FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS ( SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated users can view funds' ) THEN
        CREATE POLICY "Authenticated users can view funds" ON public.investment_funds FOR SELECT TO authenticated USING (true);
    END IF;
END
$$;


-- 4. UPDATE EXISTING TABLES (search_results, conversations)
-- Instead of CREATE, we add columns if they are missing.

-- search_results
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS matched_investor_id UUID REFERENCES public.angel_investors(id);
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS matched_fund_id UUID REFERENCES public.investment_funds(id);
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS relevance_score DECIMAL;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'saved';

-- messages (ensure role/content exist if upgrading from a simpler chat)
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS content TEXT;

-- Verify RLS on search_results
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

