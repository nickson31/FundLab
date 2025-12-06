# AI Backend Agent - Arquitecto Sin Discrepancias

## ⚙️ Tu Misión

Eres el **Backend Architect Supreme** de FundLab. Tu trabajo es implementar el backend con **CERO discrepancias** contra la documentación. Cada tabla, cada columna, cada algoritmo debe coincidir **EXACTAMENTE** con los specs.

**No improvises. No asumas. Sigue los specs al pie de la letra.**

---

## 📋 Contexto Completo

Lee y absorbe TODOS estos archivos antes de escribir código:

### Especificaciones Backend (Tu Biblia)
- `specs/memory.md` - Database schema completo (Supabase)
- `specs/algoritmo.md` - Matching algorithm formulas
- `specs/investors.md` - JSON data dictionary (estructura de datos)
- `specs/Messages.md` - AI message generation logic
- `specs/logic.md` - Application flow & search loop

### Referencias Críticas
- `revision.md` - JSON verification (LEÍDO Y VALIDADO)
- `FinalRevision.md` - Developer checklist
- `json/angel_investors_rows.json` - Datos reales de angels
- `json/fund_employees_rows.json` - Datos reales de employees
- `json/investment_funds_rows.json` - Datos reales de funds

---

## 🚀 Stack Tecnológico OBLIGATORIO

```typescript
// Backend Framework
Next.js 14 API Routes (TypeScript)
// O alternativamente: Node.js + Express si prefieres

// Database & Auth
Supabase (PostgreSQL + Auth + RLS)

// AI
Gemini AI API (query expansion + message generation)

// Librerías
- @supabase/supabase-js (client)
- @google/generative-ai (Gemini SDK)
- zod (validation)
```

---

## 🗄️ Tarea 1: Setup Supabase Database

### 1.1 Crear Tablas (Exactamente según memory.md)

```sql
-- IMPORTANTE: Todos los campos JSONB deben almacenar
-- el objeto completo del JSON (angel_investors_rows.json, etc.)

-- Tabla: angel_investors
CREATE TABLE public.angel_investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB NOT NULL,  -- Almacena TODO el objeto JSON del investor
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Índices para búsqueda rápida
CREATE INDEX idx_angels_categories ON public.angel_investors 
  USING GIN ((data->'categories_strong_es'));
CREATE INDEX idx_angels_stages ON public.angel_investors 
  USING GIN ((data->'stages_strong_es'));

-- Tabla: investment_funds
CREATE TABLE public.investment_funds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_funds_categories ON public.investment_funds 
  USING GIN ((data->'category_keywords'));
CREATE INDEX idx_funds_location ON public.investment_funds 
  USING GIN ((data->'location_identifiers'));

-- Tabla: fund_employees
CREATE TABLE public.fund_employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  last_updated TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_employees_fund ON public.fund_employees 
  ((LOWER(data->>'fund_name')));

-- Tabla: saved_investors
CREATE TABLE public.saved_investors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  investor_id UUID NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('angel', 'fund')),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, investor_id, type)
);

CREATE INDEX idx_seen_user ON public.seen_investors (user_id);

-- Tabla: messages
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
```

### 1.2 Row Level Security (RLS)

```sql
-- Habilitar RLS en todas las tablas de usuario
ALTER TABLE public.saved_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seen_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas: Users solo ven sus propios datos
CREATE POLICY "Users can view own saved investors"
  ON public.saved_investors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved investors"
  ON public.saved_investors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved investors"
  ON public.saved_investors FOR DELETE
  USING (auth.uid() = user_id);

-- Repetir para seen_investors y messages
CREATE POLICY "Users can view own seen investors"
  ON public.seen_investors FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own seen investors"
  ON public.seen_investors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own messages"
  ON public.messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages"
  ON public.messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own messages"
  ON public.messages FOR UPDATE
  USING (auth.uid() = user_id);

-- Tablas de investors: Lectura pública (cualquier usuario autenticado)
ALTER TABLE public.angel_investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read angels"
  ON public.angel_investors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read funds"
  ON public.investment_funds FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read employees"
  ON public.fund_employees FOR SELECT
  TO authenticated
  USING (true);
```

### 1.3 Importar Datos JSON

```typescript
// Script para importar los 3 JSON files a Supabase
import { createClient } from '@supabase/supabase-js';
import angelsData from './json/angel_investors_rows.json';
import fundsData from './json/investment_funds_rows.json';
import employeesData from './json/fund_employees_rows.json';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

async function importData() {
  // Angels
  const angelsInsert = angelsData.map(angel => ({ data: angel }));
  await supabase.from('angel_investors').insert(angelsInsert);
  
  // Funds
  const fundsInsert = fundsData.map(fund => ({ data: fund }));
  await supabase.from('investment_funds').insert(fundsInsert);
  
  // Employees
  const employeesInsert = employeesData.map(emp => ({ data: emp }));
  await supabase.from('fund_employees').insert(employeesInsert);
  
  console.log('✅ Data imported successfully');
}

importData();
```

---

## 🧮 Tarea 2: Implementar Algoritmo de Matching

### 2.1 Angel Matching (algoritmo.md)

```typescript
// /backend/src/algorithms/matchAngels.ts

interface MatchParams {
  categoryKeywords: string[];  // Del Gemini query expansion
  stageKeywords: string[];
  locationKeywords: string[];
}

interface AngelMatch {
  angel: any;  // JSONB data
  score: number;
  breakdown: {
    categoryScore: number;
    angelScore: number;
    stageScore: number;
    locationScore: number;
  };
}

export async function matchAngels(
  params: MatchParams,
  userId: string
): Promise<AngelMatch[]> {
  const supabase = createClient(...);
  
  // 1. Fetch ALL angels (o usa query optimizada con índices)
  const { data: angels } = await supabase
    .from('angel_investors')
    .select('*');
  
  // 2. Fetch seen_investors para anti-duplication
  const { data: seen } = await supabase
    .from('seen_investors')
    .select('investor_id')
    .eq('user_id', userId)
    .eq('type', 'angel');
  
  const seenIds = new Set(seen?.map(s => s.investor_id) || []);
  
  // 3. Filter + Score cada angel
  const matches: AngelMatch[] = angels
    ?.filter(angel => !seenIds.has(angel.id))  // Anti-duplication
    .map(angel => {
      const data = angel.data;
      
      // Category Score (40%)
      const categoryScore = calculateCategoryScore(data, params.categoryKeywords);
      
      // Angel Score (30%)
      // IMPORTANTE: angel_score es String, parsear a float
      const angelScoreNormalized = parseFloat(data.angel_score) / 100.0;
      
      // Stage Score (20%)
      const stageScore = calculateStageScore(data, params.stageKeywords);
      
      // Location Score (10%)
      const locationScore = calculateLocationScore(data, params.locationKeywords);
      
      // Total weighted score
      const totalScore = (
        categoryScore * 0.4 +
        angelScoreNormalized * 0.3 +
        stageScore * 0.2 +
        locationScore * 0.1
      );
      
      return {
        angel: data,
        score: totalScore,
        breakdown: {
          categoryScore,
          angelScore: angelScoreNormalized,
          stageScore,
          locationScore,
        },
      };
    })
    .sort((a, b) => b.score - a.score)  // Descending
    .slice(0, 20);  // Top 20
  
  return matches || [];
}

// Helper: Category Score (bag-of-words matching)
function calculateCategoryScore(
  angelData: any,
  queryKeywords: string[]
): number {
  // Combinar todos los campos de categoría
  const sources = [
    angelData.categories_strong_es || '',
    angelData.categories_strong_en || '',
    angelData.categories_general_es || '',
    angelData.categories_general_en || '',
    angelData.headline || '',
    angelData.about || '',
  ].join(' ').toLowerCase();
  
  // Contar matches
  const matches = queryKeywords.filter(keyword => 
    sources.includes(keyword.toLowerCase())
  ).length;
  
  // Normalizar (0-1)
  return queryKeywords.length > 0 ? matches / queryKeywords.length : 0;
}

// Similar para Stage y Location scores
function calculateStageScore(angelData: any, queryKeywords: string[]): number {
  const sources = [
    angelData.stages_strong_es || '',
    angelData.stages_strong_en || '',
    angelData.stages_general_es || '',
    angelData.stages_general_en || '',
  ].join(' ').toLowerCase();
  
  const matches = queryKeywords.filter(k => sources.includes(k.toLowerCase())).length;
  return queryKeywords.length > 0 ? matches / queryKeywords.length : 0;
}

function calculateLocationScore(angelData: any, queryKeywords: string[]): number {
  const location = (angelData.addressWithCountry || '').toLowerCase();
  const matches = queryKeywords.filter(k => location.includes(k.toLowerCase())).length;
  return queryKeywords.length > 0 ? matches / queryKeywords.length : 0;
}
```

### 2.2 Fund Matching (Similar pero 50%/30%/20% weights)

```typescript
// Fund matching usa category_keywords (stringified arrays)
// IMPORTANTE: Parsear con JSON.parse()

function extractFundCategories(fundData: any): string {
  try {
    // category_keywords es un string que contiene un array JSON
    const keywords = JSON.parse(fundData.category_keywords || '[]');
    return keywords.join(' ').toLowerCase();
  } catch {
    return '';
  }
}

// Formula: (CategoryScore * 0.5) + (StageScore * 0.3) + (LocationScore * 0.2)
```

### 2.3 Employee Ranking (score_combinado desc)

```typescript
// Después de match funds, fetch employees
async function getEmployeesForFund(fundName: string): Promise<any[]> {
  const { data } = await supabase
    .from('fund_employees')
    .select('*')
    .ilike('data->>fund_name', fundName);  // Case-insensitive
  
  if (!data) return [];
  
  // Ordenar por score_combinado descendente
  return data
    .map(emp => emp.data)
    .sort((a, b) => b.score_combinado - a.score_combinado);
    // NO filtrar por threshold. Mostrar TODOS.
}
```

---

## 🤖 Tarea 3: Integración con Gemini AI

### 3.1 Query Expansion

```typescript
// /backend/src/gemini/queryExpansion.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function expandQuery(userQuery: string): Promise<{
  categoryKeywords: string[];
  stageKeywords: string[];
  locationKeywords: string[];
}> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `
You are an investor search query expander. Given a founder's search query, generate related keywords.

User Query: "${userQuery}"

Return a JSON object with 3 arrays:
{
  "categoryKeywords": ["keyword1", "keyword2", ...],  // Sector/industry terms
  "stageKeywords": ["pre-seed", "seed", ...],        // Funding stages
  "locationKeywords": ["Madrid", "Spain", ...]       // Geographic terms
}

Generate 10-20 keywords per category. Include synonyms, related terms, and broader/narrower concepts.
For "fintech", include: payments, neobank, DeFi, open banking, insurtech, wealthtech, regtech, etc.
Return ONLY valid JSON, no markdown.
`;
  
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  // Parse JSON response
  const parsed = JSON.parse(text);
  return parsed;
}
```

### 3.2 Message Generation

```typescript
// /backend/src/gemini/generateMessage.ts

interface MessageInput {
  investorData: any;       // Full JSON object (angel or employee)
  companyContext: string;  // User's inline company description
}

export async function generateMessage(input: MessageInput): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  // Construir prompt según Messages.md
  const prompt = `
You are drafting a cold outreach message from a startup founder to an investor.

INVESTOR PROFILE:
Name: ${input.investorData.fullName}
Headline: ${input.investorData.headline}
About: ${input.investorData.about || 'N/A'}
LinkedIn: ${input.investorData.linkedinUrl}

COMPANY CONTEXT:
${input.companyContext}

INSTRUCTIONS:
1. Deep Dive: Find "gold nuggets" in their profile (specific hobbies, exits, alma maters, phrases)
2. Personalize: Reference specific details (e.g., if headline says "Fatherhood x5", mention it tastefully)
3. Tone: Professional, concise, respectful of their time
4. Hook: Start with hyper-specific observation
5. Length: 4-6 sentences max
6. Call to Action: Ask for 15-min call or feedback

Return ONLY the message body (no subject line, no "Dear X", just the message).
`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

---

## 🌐 Tarea 4: API Routes (Next.js)

### 4.1 POST /api/search

```typescript
// /app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { expandQuery } from '@/lib/gemini/queryExpansion';
import { matchAngels } from '@/lib/algorithms/matchAngels';
import { matchFunds } from '@/lib/algorithms/matchFunds';

export async function POST(req: NextRequest) {
  const { query, mode, userId } = await req.json();
  // mode: 'angels' | 'funds'
  
  // 1. Expand query con Gemini
  const keywords = await expandQuery(query);
  
  // 2. Run matching algorithm
  let results;
  if (mode === 'angels') {
    results = await matchAngels(keywords, userId);
  } else {
    results = await matchFunds(keywords, userId);
  }
  
  // 3. Auto-save results to saved_investors
  await saveResults(results, userId, mode);
  
  // 4. Mark as seen
  await markAsSeen(results, userId, mode);
  
  return NextResponse.json({ results, keywords });
}
```

### 4.2 POST /api/message/generate

```typescript
// /app/api/message/generate/route.ts
export async function POST(req: NextRequest) {
  const { investorData, companyContext, userId } = await req.json();
  
  const message = await generateMessage({ investorData, companyContext });
  
  return NextResponse.json({ message });
}
```

### 4.3 POST /api/message/save

```typescript
// Guarda mensaje en tabla messages
export async function POST(req: NextRequest) {
  const { recipientId, recipientType, recipientName, companyContext, content, userId } = await req.json();
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      user_id: userId,
      recipient_id: recipientId,
      recipient_type: recipientType,
      recipient_name: recipientName,
      company_context: companyContext,
      content,
      status: 'draft',
    });
  
  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true, data });
}
```

---

## 📁 Estructura del Proyecto Backend

```
/backend  (o dentro de /frontend si usas Next.js API routes)
├── /src
│   ├── /algorithms
│   │   ├── matchAngels.ts
│   │   ├── matchFunds.ts
│   │   └── rankEmployees.ts
│   ├── /gemini
│   │   ├── queryExpansion.ts
│   │   └── generateMessage.ts
│   ├── /supabase
│   │   ├── client.ts
│   │   └── migrations.sql
│   └── /utils
│       ├── validation.ts
│       └── logger.ts
├── /scripts
│   └── importData.ts  (importar JSONs a Supabase)
└── package.json
```

---

## ✅ Checklist de Implementación

### Fase 1: Database Setup
- [ ] Crear tablas en Supabase (exacto schema de memory.md)
- [ ] Configurar RLS policies
- [ ] Importar 3 JSON files a tablas
- [ ] Verificar índices para performance

### Fase 2: Algoritmo de Matching
- [ ] Implementar matchAngels con formula exacta (40/30/20/10)
- [ ] Implementar matchFunds con formula exacta (50/30/20)
- [ ] Implementar rankEmployees (score_combinado desc)
- [ ] Anti-duplication logic (seen_investors)
- [ ] Auto-save logic (saved_investors)

### Fase 3: Gemini Integration
- [ ] Query expansion con Gemini
- [ ] Message generation con Gemini
- [ ] Error handling (API limits, timeouts)

### Fase 4: API Routes
- [ ] POST /api/search (con auto-save + anti-dup)
- [ ] POST /api/message/generate
- [ ] POST /api/message/save
- [ ] GET /api/angels (fetch saved angels)
- [ ] GET /api/funds (fetch saved funds)
- [ ] DELETE /api/saved/:id (remove from saved)

### Fase 5: Testing & Validation
- [ ] Test con queries reales (ej: "fintech angels Madrid")
- [ ] Verificar scores match formulas
- [ ] Verificar anti-duplication funciona
- [ ] Test message generation con different investors

---

## 🚫 Lo Que NO Debes Hacer

- ❌ Cambiar weights del algoritmo (40/30/20/10 es SAGRADO)
- ❌ Asumir estructuras de datos (leer revision.md para saber qué campos son strings vs numbers)
- ❌ Ignorar case-insensitive matching para fund_name
- ❌ Hardcodear datos o ignorar los JSON files
- ❌ Implementar features fuera de scope (ej: enviar emails - solo draft MVP)

---

## 🏁 Entrega Final

Cuando termines:
1. `/backend` folder con código
2. `README.md` con setup instructions
3. `.env.example` con todas las variables
4. SQL migration para Supabase
5. Script de importación de datos

**Ejecuta sin discrepancias. La documentación es tu ley. 🔧**
