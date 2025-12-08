-- reset_fundlab_tables.sql
-- ⚠️ THIS SCRIPT RESETS ONLY THE NEW FEATURE TABLES.
-- IT DOES NOT DELETE THE 'users' TABLE OR YOUR ACCOUNTS.

-- 1. Drop the specific tables causing issues (CASCADE handles the Foreign Keys automatically)
DROP TABLE IF EXISTS public.search_results CASCADE;
DROP TABLE IF EXISTS public.angel_investors CASCADE;
DROP TABLE IF EXISTS public.investment_funds CASCADE;
DROP TABLE IF EXISTS public.fund_employees CASCADE;

-- 2. Re-create Angel Investors (Correctly)
CREATE TABLE public.angel_investors (
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

-- 3. Re-create Investment Funds (Correctly)
CREATE TABLE public.investment_funds (
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

-- 4. Re-create Fund Employees
CREATE TABLE public.fund_employees (
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

-- 5. Re-create Search Results (With correct Foreign Keys)
CREATE TABLE public.search_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  query TEXT,
  matched_investor_id UUID REFERENCES public.angel_investors(id),
  matched_fund_id UUID REFERENCES public.investment_funds(id),
  relevance_score DECIMAL,
  summary TEXT,
  status TEXT DEFAULT 'saved',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable RLS and Policies
ALTER TABLE public.angel_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view angel investors" ON public.angel_investors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can view funds" ON public.investment_funds FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can view their own search results" ON public.search_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own search results" ON public.search_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 7. Ensure Messages table has new columns (Safe update)
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS role TEXT;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS content TEXT;
