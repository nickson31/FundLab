# Gemini "Backdoor" Logic - Smart Content Generation

## Objective
Transform static database rows into **unique, query-aware narratives** for each investor card. The user should feel like an intelligent analyst compiled a personalized list, not just a SQL query result.

---

## The Problem
Raw database cards display direct column data:
> "Thesis: Fintech"
> "Location: London"
> "Stage: Pre-Seed"

This looks **repetitive, generic, and robotic**. The user asked for Gemini to **never copy-paste**, but to **synthesize, rewrite, and add intelligence**.

---

## The Solution: "The Backdoor"
Gemini acts as an **intelligent middleman** between the database search results and the frontend UI.

### Workflow
1.  **Search Phase**: The system finds raw matches using Postgres similarity (e.g., "Find Pre-Seed Fintech Angels").
2.  **The Backdoor (Gemini)** (`lib/gemini/smartCardContent.ts`):
    *   **Input**: User Query + Top 3 Raw Investor Profiles (JSON dumps).
    *   **Instruction**: 
        > "You are a VC Associate. Pitch these investors to the founder. *NEVER copy raw data*. Synthesize a new narrative explaining specifically WHY this investor is a match for THIS query."
    *   **Output**: A structured JSON object per investor, containing:
        *   `oneLineSummary` (1 sentence)
        *   `expertises` (3-4 short tags, rewritten)
        *   `generalExplanation` (2-3 sentences synthesis)
        *   `goldenNuggets` (1-4 curiosities with dynamic titles)
        *   `matchLabel` (e.g., "Perfect Match")
3.  **Frontend Render** (`InvestorCard.tsx` / `FundCard.tsx`):
    *   The card's `RichLayout` detects this `smartData` object.
    *   It **HIDES** the original raw columns to avoid redundancy.
    *   It displays the synthesized content prominently.

---

## The 9-Point Card Structure (User Request)

The `RichLayout` component implements the following:

| #   | Element             | Data Source                      | UI Placement                     |
|-----|---------------------|----------------------------------|----------------------------------|
| 1   | Name                | `investor.fullName` / `name`     | Header, with Initials Avatar     |
| 2   | One-Line Summary    | `smartData.oneLineSummary`       | Below Name                       |
| 3   | Location            | `investor.addressWithCountry`    | Below Summary, with MapPin icon  |
| 4   | Score Circle        | `result.score` + `smartData.matchLabel` | Top-Right, Circular Progress |
| 5   | Expertise Chips     | `smartData.expertises[]`         | Colored Pills (Pink/Indigo/etc.) |
| 6   | General Explanation | `smartData.generalExplanation`   | "Why this match?" section        |
| 7   | Golden Nuggets      | `smartData.goldenNuggets[]`      | 2-column Grid of insight cards   |
| 8   | LinkedIn Button     | `investor.linkedinUrl`           | Action Footer                    |
| 9   | Generate Message    | Opens `MessageModal`             | Action Footer                    |

---

## API Flow

```
[User Query]
    │
    ▼
[/api/search] (route.ts)
    │
    ├── [Step 1] expandQuery() → Keywords
    ├── [Step 2] matchAngels() / matchFunds() → Raw Results
    │
    ├── [Step 2.5] generateSmartCardContent() ← "The Backdoor"
    │   └── Input: Query + Top 3 Raw Investor Profiles
    │   └── Output: SmartCardContent[] (Structured AI Rewrite)
    │
    ├── [Step 3] Attach `smartData` to each investor
    └── [Step 4] generateSearchSummary() → Final Summary

[Response to Frontend]
    │
    ▼
[ChatInterface.tsx]
    └── Renders InvestorCard / FundCard with `layout.smartData`
        └── RichLayout displays all 9 points
```

---

## Implementation Files

| File | Purpose |
|------|---------|
| `lib/gemini/smartCardContent.ts` | Defines `SmartCardContent` interface and `generateSmartCardContent()` function. |
| `app/api/search/route.ts` | Calls `generateSmartCardContent` and attaches result to each investor. |
| `lib/dynamicCardLayouts.ts` | `selectDynamicLayout()` extracts `smartData` from investor and passes to card. |
| `components/chat/InvestorCard.tsx` | `RichLayout` renders all 9 points using `smartData`. |
| `components/chat/FundCard.tsx` | `RichLayout` for Funds (same structure, different action button). |

---

## Prompt Engineering (Key Excerpts)

From `smartCardContent.ts`:

```
CRITICAL RULES:
1. **NEVER** copy raw data. Always rewrite, synthesize, and summarize.
2. **Expertise**: Extract 3-4 key strengths and rewrite them as short, punchy tags (max 2 words).
3. **Golden Nuggets**: Find 1-4 specific, high-value, or "unusual" details. Title them dynamically.
4. **Tone**: Professional, insightful, insider-y.
```

---

## De-Duplication Logic

If `smartData` exists, the `RichLayout` component:
-   **Hides**: `investment_thesis`, `category_tags`, `about` fields from `dynamicFields`.
-   **Shows**: Only the synthesized `generalExplanation`, `expertises`, and `goldenNuggets`.

This prevents the "duplicate information" feeling where both raw and AI content are visible.

---

## Status Checklist

- [x] **API**: `/api/search` calls `generateSmartCardContent`.
- [x] **Prompt**: Strict "never copy" enforcement.
- [x] **Structure**: 5+4 = All 9 points covered.
- [x] **De-duplication**: `RichLayout` hides raw fields when AI data is present.
- [x] **Funds**: `FundCard.tsx` mirrors `InvestorCard.tsx`.
