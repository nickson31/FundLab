-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile" 
  ON public.users FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.users FOR UPDATE 
  USING (auth.uid() = id);

-- Angel Investors Table
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

-- Enable RLS for Angel Investors (Read-only for authenticated users)
ALTER TABLE public.angel_investors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view angel investors" 
  ON public.angel_investors FOR SELECT 
  TO authenticated 
  USING (true);

-- Investment Funds Table
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

-- Enable RLS for Funds
ALTER TABLE public.investment_funds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view funds" 
  ON public.investment_funds FOR SELECT 
  TO authenticated 
  USING (true);

-- Fund Employees Table
CREATE TABLE IF NOT EXISTS public.fund_employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  idx INTEGER,
  fund_id UUID REFERENCES public.investment_funds(id), -- Optional relational link if data allows
  full_name TEXT,
  headline TEXT,
  email TEXT,
  linkedin_url TEXT,
  about TEXT,
  profile_pic TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: If you don't have fund_id in your json, you might need to omit the reference or fill it later.
-- For now we'll keep it loose.

-- Conversations Table (Chat History)
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  title TEXT DEFAULT 'New Conversation',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Conversations
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations" 
  ON public.conversations FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations" 
  ON public.conversations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
  ON public.conversations FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations" 
  ON public.conversations FOR DELETE 
  USING (auth.uid() = user_id);

-- Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their conversations" 
  ON public.messages FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE id = messages.conversation_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages in their conversations" 
  ON public.messages FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.conversations 
      WHERE id = messages.conversation_id 
      AND user_id = auth.uid()
    )
  );

-- Generated Messages / Search Results (To store "Matches")
CREATE TABLE IF NOT EXISTS public.search_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  query TEXT,
  matched_investor_id UUID REFERENCES public.angel_investors(id), -- Or generic reference
  matched_fund_id UUID REFERENCES public.investment_funds(id),
  relevance_score DECIMAL,
  summary TEXT, -- "Short summary (1-2 sentences)"
  status TEXT DEFAULT 'saved', -- saved, contacted, replied
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.search_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own search results" 
  ON public.search_results FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own search results" 
  ON public.search_results FOR INSERT 
  WITH CHECK (auth.uid() = user_id);
