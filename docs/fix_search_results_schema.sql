-- fix_search_results_schema.sql
-- Run this in the Supabase SQL Editor to allow saving LinkedIn URLs as IDs.

-- 1. Drop existing Foreign Key constraints that force UUIDs
-- We try multiple common names just in case
ALTER TABLE public.search_results DROP CONSTRAINT IF EXISTS search_results_matched_investor_id_fkey;
ALTER TABLE public.search_results DROP CONSTRAINT IF EXISTS search_results_matched_fund_id_fkey;
ALTER TABLE public.search_results DROP CONSTRAINT IF EXISTS fk_search_results_angel;
ALTER TABLE public.search_results DROP CONSTRAINT IF EXISTS fk_search_results_fund;
ALTER TABLE public.search_results DROP CONSTRAINT IF EXISTS search_results_matched_angel_id_fkey;

-- 2. Change the columns to TEXT to accept URLs
ALTER TABLE public.search_results 
  ALTER COLUMN matched_angel_id TYPE TEXT USING matched_angel_id::text,
  ALTER COLUMN matched_fund_id TYPE TEXT USING matched_fund_id::text;

-- 3. (Optional) Re-add Foreign Keys if your tables 'angels' and 'funds' also use TEXT/URL as PK
-- DO $$
-- BEGIN
--     IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'id' AND data_type = 'text') THEN
--         ALTER TABLE public.search_results ADD CONSTRAINT fk_search_results_angel FOREIGN KEY (matched_angel_id) REFERENCES public.angels(id);
--     END IF;
-- END $$;
