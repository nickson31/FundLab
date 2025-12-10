-- fix_saved_investors_schema.sql
-- Run this in Supabase SQL Editor to allow saving LinkedIn URLs as investor_id.

-- 1. Drop constraints that enforce UUID on investor_id
ALTER TABLE public.saved_investors DROP CONSTRAINT IF EXISTS saved_investors_investor_id_fkey;
ALTER TABLE public.saved_investors DROP CONSTRAINT IF EXISTS active_investor_id_fk;

-- 2. Change column to TEXT
ALTER TABLE public.saved_investors 
  ALTER COLUMN investor_id TYPE TEXT USING investor_id::text;

-- 3. Ensure we have a unique constraint for safely upserting (optional but good)
-- ALTER TABLE public.saved_investors ADD CONSTRAINT unique_user_investor UNIQUE (user_id, investor_id);
