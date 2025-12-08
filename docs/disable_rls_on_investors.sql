-- CRITICAL FIX: Disable RLS on angels, funds, and employees tables
-- The tables have data but RLS is blocking access

-- Disable RLS on angels table
ALTER TABLE public.angels DISABLE ROW LEVEL SECURITY;

-- Disable RLS on funds table  
ALTER TABLE public.funds DISABLE ROW LEVEL SECURITY;

-- Disable RLS on employees table
ALTER TABLE public.employees DISABLE ROW LEVEL SECURITY;

-- Keep RLS enabled for search_results and saved_investors (user-specific data)
-- These tables should already have RLS from loose_search_results.sql
