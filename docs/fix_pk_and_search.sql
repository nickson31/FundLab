-- MINIMAL FIX: Set Primary Keys and Create Search Results
-- This script does NOT rename columns. It only fixes the logical structure (PKs).

-- 1. Fix 'angels' table
DO $$
BEGIN
    -- Ensure 'id' is Unique/PK
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'id') THEN
        -- Check if constraint exists, if not add it
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'angels' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE public.angels ADD PRIMARY KEY (id);
        END IF;
    END IF;
END $$;

-- 2. Fix 'funds' table
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'id') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'funds' AND constraint_type = 'PRIMARY KEY') THEN
            ALTER TABLE public.funds ADD PRIMARY KEY (id);
        END IF;
    END IF;
END $$;

-- 3. Fix 'employees' table
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'id') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'employees' AND constraint_type = 'PRIMARY KEY') THEN
             ALTER TABLE public.employees ADD PRIMARY KEY (id);
        END IF;
    END IF;
END $$;

-- 4. Create 'search_results' (Linking to the tables)
CREATE TABLE IF NOT EXISTS public.search_results (
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

-- 5. Enable RLS (Security)
ALTER TABLE public.angels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable read access for authenticated users' AND tablename = 'angels') THEN
        CREATE POLICY "Enable read access for authenticated users" ON public.angels FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable read access for authenticated users' AND tablename = 'funds') THEN
        CREATE POLICY "Enable read access for authenticated users" ON public.funds FOR SELECT TO authenticated USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable read access for authenticated users' AND tablename = 'employees') THEN
        CREATE POLICY "Enable read access for authenticated users" ON public.employees FOR SELECT TO authenticated USING (true);
    END IF;
     IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable insert for authenticated users' AND tablename = 'search_results') THEN
        CREATE POLICY "Enable insert for authenticated users" ON public.search_results FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Enable read for own search results' AND tablename = 'search_results') THEN
        CREATE POLICY "Enable read for own search results" ON public.search_results FOR SELECT TO authenticated USING (auth.uid() = user_id);
    END IF;
END $$;
