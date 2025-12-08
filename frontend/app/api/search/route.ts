import { NextRequest, NextResponse } from 'next/server';
import { expandQuery } from '@/lib/gemini/queryExpansion';
import { matchAngels } from '@/lib/algorithms/matchAngels';
import { matchFunds } from '@/lib/algorithms/matchFunds';
import { supabase } from '@/lib/supabase';

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

        // 2. Run matching algorithm
        console.log('[Search API] Step 2: Running matching algorithm for mode:', mode);
        let results;
        if (mode === 'angels') {
            results = await matchAngels(keywords, userId);
        } else {
            results = await matchFunds(keywords, userId);
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

        if (results.length > 0) {
            console.log('[Search API] Step 3: Saving results to database...');
            const saves = results.map((r: any) => ({
                user_id: userId,
                matched_angel_id: r.angel?.id, // Assuming angel object has id
                matched_fund_id: r.fund?.id,     // Assuming fund object has id
                relevance_score: r.score,
                query: query,
                summary: JSON.stringify(r.breakdown) // Storing breakdown as summary for now
            }));

            // Use search_results table
            // We use upsert if there IS a conflict constraint, but search_results usually tracks history.
            // If we want to avoid duplicates for the same query/investor, we'd need a constraint.
            // For now, let's just INSERT to track search history matches.
            const { error } = await supabase.from('search_results').insert(saves);

            if (error) {
                console.error('[Search API] ⚠️ Error saving results:', error.message);
            } else {
                console.log('[Search API] ✅ Results saved successfully');
            }
        }

        console.log('[Search API] ✅ Returning response with', results.length, 'results');
        return NextResponse.json({ results, keywords });
    } catch (error) {
        console.error('[Search API] ❌ Fatal error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
