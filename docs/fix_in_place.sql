-- fix_in_place.sql
-- ⚠️ SAFE MODE: This script repairs your existing tables WITHOUT deleting any data.

-- 1. Ensure 'uuid-ossp' extension is available for generating IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Repair Angel Investors Table
-- First, ensure every row has an ID (fixes potential NULL issues)
UPDATE public.angel_investors SET id = uuid_generate_v4() WHERE id IS NULL;

-- Now, safely add the Primary Key constraint if it's missing
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'angel_investors' AND constraint_type = 'PRIMARY KEY') THEN
        ALTER TABLE public.angel_investors ADD PRIMARY KEY (id);
    END IF;
END $$;


-- 3. Repair Investment Funds Table
UPDATE public.investment_funds SET id = uuid_generate_v4() WHERE id IS NULL;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'investment_funds' AND constraint_type = 'PRIMARY KEY') THEN
        ALTER TABLE public.investment_funds ADD PRIMARY KEY (id);
    END IF;
END $$;


-- 4. Now that PKs are fixed, we can fix 'search_results'
-- Create search_results if it doesn't exist (unlikely, but safe)
CREATE TABLE IF NOT EXISTS public.search_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add the missing columns to search_results
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS matched_investor_id UUID;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS matched_fund_id UUID;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS relevance_score DECIMAL;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE public.search_results ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'saved';

-- 5. Finally, add the link (Foreign Key) between Search Results and Investors
-- We wrap in a block to ignore error if the link already exists
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

-- 6. Enable Security (RLS) just in case
ALTER TABLE public.angel_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;
