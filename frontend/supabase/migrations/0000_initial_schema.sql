-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabla: angel_investors
CREATE TABLE public.angel_investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_angels_categories ON public.angel_investors USING GIN ((data->'categories_strong_es'));
CREATE INDEX idx_angels_stages ON public.angel_investors USING GIN ((data->'stages_strong_es'));

-- Tabla: investment_funds
CREATE TABLE public.investment_funds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_funds_categories ON public.investment_funds USING GIN ((data->'category_keywords'));
CREATE INDEX idx_funds_location ON public.investment_funds USING GIN ((data->'location_identifiers'));

-- Tabla: fund_employees
CREATE TABLE public.fund_employees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_employees_fund ON public.fund_employees ((LOWER(data->>'fund_name')));

-- Tabla: saved_investors
CREATE TABLE public.saved_investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('angel', 'fund', 'employee')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, investor_id, type)
);

CREATE INDEX idx_saved_user ON public.saved_investors (user_id);
CREATE INDEX idx_saved_type ON public.saved_investors (type);

-- Tabla: seen_investors
CREATE TABLE public.seen_investors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('angel', 'fund')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, investor_id, type)
);

CREATE INDEX idx_seen_user ON public.seen_investors (user_id);

-- Tabla: messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL,
  recipient_type TEXT NOT NULL CHECK (recipient_type IN ('angel', 'employee')),
  recipient_name TEXT NOT NULL,
  company_context TEXT NOT NULL,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft')),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_messages_user ON public.messages (user_id);
CREATE INDEX idx_messages_status ON public.messages (status);

-- RLS Policies
ALTER TABLE public.saved_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seen_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.angel_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_employees ENABLE ROW LEVEL SECURITY;

-- Users can view/manage their own data
CREATE POLICY "Users can view own saved investors" ON public.saved_investors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved investors" ON public.saved_investors FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved investors" ON public.saved_investors FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own seen investors" ON public.seen_investors FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own seen investors" ON public.seen_investors FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own messages" ON public.messages FOR UPDATE USING (auth.uid() = user_id);

-- Public read access for investors (authenticated users)
CREATE POLICY "Authenticated users can read angels" ON public.angel_investors FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read funds" ON public.investment_funds FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can read employees" ON public.fund_employees FOR SELECT TO authenticated USING (true);
