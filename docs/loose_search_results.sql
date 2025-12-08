-- SAFE MISSING TABLES SCRIPT
-- This creates the 'search_results' and 'saved_investors' tables WITHOUT Foreign Key constraints.
-- This is necessary because we cannot modify the 'angels'/'funds' tables to enforce Primary Keys.

-- 1. SEARCH RESULTS
DROP TABLE IF EXISTS public.search_results;

CREATE TABLE public.search_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID DEFAULT auth.uid(),
    
    -- Search Metadata
    query TEXT,
    summary TEXT,
    status TEXT DEFAULT 'completed',
    
    -- Flexible Linking (No Strict FK Constraints)
    matched_angel_id UUID, 
    matched_fund_id UUID,
    matched_employee_id UUID,
    
    relevance_score FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users" ON public.search_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable read for own search results" ON public.search_results FOR SELECT TO authenticated USING (auth.uid() = user_id);


-- 2. SAVED INVESTORS
DROP TABLE IF EXISTS public.saved_investors;

CREATE TABLE public.saved_investors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID DEFAULT auth.uid(),
    
    -- Flexible Linking
    investor_id UUID, -- Can be angel_id or fund_id
    type TEXT, -- 'angel' or 'fund'
    
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.saved_investors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for saved investors" ON public.saved_investors FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Enable read for saved investors" ON public.saved_investors FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Enable delete for saved investors" ON public.saved_investors FOR DELETE TO authenticated USING (auth.uid() = user_id);
