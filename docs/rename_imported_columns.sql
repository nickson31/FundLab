-- SAFE MIGRATION V2: Fix IDs, PKs, and Rename Columns
-- This script handles:
-- 1. "ID" vs "id" capitalization issues
-- 2. Ensuring 'id' is a Primary Key (Required for relations)
-- 3. Renaming "messy" imported columns
-- 4. Creating 'search_results'

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- STEP 1: FIX 'id' columns (Case sensitivity & Type)
DO $$
BEGIN
    -- 1.1 Angels: Check for variations of 'id'
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'ID') THEN
        ALTER TABLE public.angels RENAME COLUMN "ID" TO id;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'Id') THEN
        ALTER TABLE public.angels RENAME COLUMN "Id" TO id;
    END IF;
    
    -- Ensure 'id' exists, if not, create it
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'id') THEN
        ALTER TABLE public.angels ADD COLUMN id UUID DEFAULT uuid_generate_v4();
    ELSE
        -- If it exists, ensure it is UUID (CAST IT if it was imported as text)
        BEGIN
            ALTER TABLE public.angels ALTER COLUMN id TYPE UUID USING id::uuid;
        EXCEPTION WHEN OTHERS THEN
            -- If casting fails (bad format), ignore for now or log
            NULL; 
        END;
    END IF;

    -- Set PRIMARY KEY
    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'angels' AND constraint_type = 'PRIMARY KEY') THEN
        ALTER TABLE public.angels ADD PRIMARY KEY (id);
    END IF;

    -- 1.2 Funds: Check for variations
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'ID') THEN
        ALTER TABLE public.funds RENAME COLUMN "ID" TO id;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'id') THEN
        ALTER TABLE public.funds ADD COLUMN id UUID DEFAULT uuid_generate_v4();
    ELSE
         BEGIN
            ALTER TABLE public.funds ALTER COLUMN id TYPE UUID USING id::uuid;
         EXCEPTION WHEN OTHERS THEN NULL; END;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'funds' AND constraint_type = 'PRIMARY KEY') THEN
        ALTER TABLE public.funds ADD PRIMARY KEY (id);
    END IF;

    -- 1.3 Employees: Check for variations
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'ID') THEN
        ALTER TABLE public.employees RENAME COLUMN "ID" TO id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'id') THEN
        ALTER TABLE public.employees ADD COLUMN id UUID DEFAULT uuid_generate_v4();
    ELSE
         BEGIN
            ALTER TABLE public.employees ALTER COLUMN id TYPE UUID USING id::uuid;
         EXCEPTION WHEN OTHERS THEN NULL; END;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE table_name = 'employees' AND constraint_type = 'PRIMARY KEY') THEN
        ALTER TABLE public.employees ADD PRIMARY KEY (id);
    END IF;

END $$;


-- STEP 2: RENAME "MESSY" COLUMNS (Safe)
DO $$
BEGIN
    -- Angels
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'fullName') THEN
        ALTER TABLE public.angels RENAME COLUMN "fullName" TO full_name;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'linkedinUrl') THEN
        ALTER TABLE public.angels RENAME COLUMN "linkedinUrl" TO linkedin_url;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'addressWithCountry') THEN
        ALTER TABLE public.angels RENAME COLUMN "addressWithCountry" TO address_with_country;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'angels' AND column_name = 'profilePic') THEN
        ALTER TABLE public.angels RENAME COLUMN "profilePic" TO profile_pic;
    END IF;

    -- Funds
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'website/value') THEN
        ALTER TABLE public.funds RENAME COLUMN "website/value" TO website_url;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'linkedin/value') THEN
        ALTER TABLE public.funds RENAME COLUMN "linkedin/value" TO linkedin_url;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'location_identifiers/0/value') THEN
        ALTER TABLE public.funds RENAME COLUMN "location_identifiers/0/value" TO location_city;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'location_identifiers/1/value') THEN
        ALTER TABLE public.funds RENAME COLUMN "location_identifiers/1/value" TO location_region;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'funds' AND column_name = 'location_identifiers/2/value') THEN
        ALTER TABLE public.funds RENAME COLUMN "location_identifiers/2/value" TO location_country;
    END IF;

    -- Employees
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'fullName') THEN
        ALTER TABLE public.employees RENAME COLUMN "fullName" TO full_name;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'jobTitle') THEN
        ALTER TABLE public.employees RENAME COLUMN "jobTitle" TO job_title;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'linkedinUrl') THEN
        ALTER TABLE public.employees RENAME COLUMN "linkedinUrl" TO linkedin_url;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'profilePic') THEN
        ALTER TABLE public.employees RENAME COLUMN "profilePic" TO profile_pic;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'addressWithCountry') THEN
        ALTER TABLE public.employees RENAME COLUMN "addressWithCountry" TO address_with_country;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'companyLinkedin') THEN
        ALTER TABLE public.employees RENAME COLUMN "companyLinkedin" TO company_linkedin;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'companyName') THEN
        ALTER TABLE public.employees RENAME COLUMN "companyName" TO company_name;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'employees' AND column_name = 'companyWebsite') THEN
        ALTER TABLE public.employees RENAME COLUMN "companyWebsite" TO company_website;
    END IF;
END $$;

-- STEP 3: CREATE RELATIONSHIPS
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

-- STEP 4: ENABLE RLS
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
