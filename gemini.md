# Gemini Logic: Smart Card Generation

This document explains how FundLab uses Google Gemini (via `gemini-2.0-flash`) to transform raw database rows into intelligent, synthesized investor cards.

## 1. The Problem
Traditional search just dumps database columns ("Location: Madrid", "Sector: Fintech"). This is boring and low-signal.
We want to simulate a **human analyst** who reads the profile and explains *why* it matters.

## 2. The Pipeline

### Step 1: Search & Retrieval
1. User searches (e.g., "Fintech in Madrid").
2. Query Expansion (Gemini) expands terms.
3. Vector/Keyword Search retrieves raw rows from Supabase.

### Step 2: The "Reasoning" Layer (`smartCardContent.ts`)
We take the **Top 5 Results** and pass them to Gemini.

**Input Logic:**
- We send a JSON dump of the investor's raw profile (bio, recent investments, website text).
- We send the User's original Query.

**Gemini Prompt Instructions:**
1.  **Analyze**: Read all columns.
2.  **Synthesize (No Copy-Paste)**: Do not output "Bio: ...". Instead, write a fresh `oneLineSummary` that captures the essence.
3.  **Match Logic**: Write a `generalExplanation` that explicitly connects the *User Query* to the *Investor Data*. (e.g., "This match is strong because you asked for Fintech and they led a Series A in Monzo.").
4.  **Extract Nuggets**: Find "Golden Nuggets" - unique data points (speed, network, reputation) that aren't standard columns.
5.  **Tags**: Rewrite broad categories into punchy, specific capabilities (e.g., "B2B SaaS" -> "B2B Scale-Up").

### Step 3: Architecture
- **Location**: `frontend/lib/gemini/smartCardContent.ts`
- **Model**: `gemini-2.0-flash` (Fast, low latency).
- **Output**: Strict JSON array containing `expertises`, `goldenNuggets`, etc.

### Step 4: Frontend Injection
The Backend (`route.ts`) merges this `smartData` object back into the `Investor` object.
The Frontend (`InvestorCard.tsx`) checks for `smartData`.
- **If Present**: It renders the "Rich Layout" (Diamond/Gold standard).
- **If Absent**: It falls back to standard fields (rare case, error fallback).

## Key Features

- **Dynamic**: Cards change based on the *query*. A "Fintech" search highlights fintech expertise. A "Seed" search highlights seed stage behavior for the *same* investor.
- **Visuals**: No generic gray text. Specific "Expertise Chips" and "Nugget Cards".
- **Real-time Reasoning**: The loading bar (8-12s) reflects the actual time taken to generate this depth.
