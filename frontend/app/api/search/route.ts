import { NextRequest, NextResponse } from 'next/server';
import { expandQuery } from '@/lib/gemini/queryExpansion';
import { matchAngels } from '@/lib/algorithms/matchAngels';
import { matchFunds } from '@/lib/algorithms/matchFunds';
import { supabase } from '@/lib/supabase';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
    try {
        const { query, mode, userId } = await req.json();
        console.log('[Search API] Request received:', { query, mode, userId });
        // mode: 'angels' | 'funds'

        if (!query || !userId) {
            console.error('[Search API] ❌ Missing query or userId');
            return NextResponse.json({ error: 'Missing query or userId' }, { status: 400 });
        }

        // 1. Expand query with Gemini
        console.log('[Search API] Step 1: Expanding query with Gemini...');
        const keywords = await expandQuery(query);
        console.log('[Search API] ✅ Keywords expanded:', {
            categories: keywords.categoryKeywords.length,
            stages: keywords.stageKeywords.length,
            locations: keywords.locationKeywords.length
        });

        // Initialize Admin Client for RLS Bypass
        // Initialize Admin Client for RLS Bypass
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        let adminClient: any = null;

        if (serviceRoleKey) {
            adminClient = createClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                serviceRoleKey
            );
        } else {
            console.warn('[Search API] ⚠️ SUPABASE_SERVICE_ROLE_KEY missing. Search results will NOT be saved.');
        }

        // 2. Run matching algorithm
        console.log('[Search API] Step 2: Running matching algorithm for mode:', mode);
        let results;
        if (mode === 'angels') {
            results = await matchAngels(keywords, userId, adminClient);
        } else {
            results = await matchFunds(keywords, userId, adminClient);
        }

        console.log('[Search API] ✅ Matching complete:', {
            resultsCount: results.length,
            topScore: results[0]?.score || 0
        });

        // 3. Auto-save results to saved_investors (if not already saved)
        // Note: MVP simplifies this. Ideally we check if already saved.
        // For now, we just return results. The frontend or a separate call can handle explicit saves if needed,
        // but the spec says "Auto-save results to saved_investors".
        // Let's implement auto-save here.

        // 3. Auto-save is now handled within matchAngels / matchFunds
        // to ensure correct ID mapping and Atomic persistence.

        // --- NEW: Smart Card System (The "Reasoning" Layer) ---
        console.log('[Search API] Step 2.5: Generating Smart Card Content (Reasoning)...');
        // We only do this for the top 5 to save latency/tokens, but frontend handles full list
        const { generateSmartCardContent } = await import('@/lib/gemini/smartCardContent');
        const smartContent = await generateSmartCardContent(query, results);

        results = results.map(r => {
            const rAny = r.investor as any;
            const id = rAny.id || rAny.linkedinUrl || rAny.website_url;
            const smartData = smartContent.find(s => s.investorId === id);
            if (smartData) {
                return {
                    ...r,
                    investor: {
                        ...r.investor,
                        smartAbout: smartData.rewrittenAbout,
                        smartTags: smartData.smartTags
                    }
                };
            }
            return r;
        });
        console.log(`[Search API] ✅ Enhanced ${smartContent.length} cards with AI reasoning`);
        // -----------------------------------------------------

        // 4. Generate AI Summary
        let summary = '';
        try {
            const { generateSearchSummary } = await import('@/lib/gemini/generateSearchSummary');
            console.log('[Search API] Step 3: Generating AI summary...');
            summary = await generateSearchSummary({ query, results, mode });
            console.log('[Search API] ✅ Summary generated');
        } catch (err) {
            console.error('[Search API] ⚠️ Failed to generate summary:', err);
        }

        console.log('[Search API] ✅ Returning response with', results.length, 'results');
        return NextResponse.json({ results, keywords, summary });
    } catch (error) {
        console.error('[Search API] ❌ Fatal error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
