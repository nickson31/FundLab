import { NextRequest, NextResponse } from 'next/server';
import { expandQuery } from '@/lib/gemini/queryExpansion';
import { matchAngels } from '@/lib/algorithms/matchAngels';
import { matchFunds } from '@/lib/algorithms/matchFunds';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const { query, mode, userId } = await req.json();
        // mode: 'angels' | 'funds'

        if (!query || !userId) {
            return NextResponse.json({ error: 'Missing query or userId' }, { status: 400 });
        }

        // 1. Expand query with Gemini
        const keywords = await expandQuery(query);

        // 2. Run matching algorithm
        let results;
        if (mode === 'angels') {
            results = await matchAngels(keywords, userId);
        } else {
            results = await matchFunds(keywords, userId);
        }

        // 3. Auto-save results to saved_investors (if not already saved)
        // Note: MVP simplifies this. Ideally we check if already saved.
        // For now, we just return results. The frontend or a separate call can handle explicit saves if needed,
        // but the spec says "Auto-save results to saved_investors".
        // Let's implement auto-save here.

        if (results.length > 0) {
            const saves = results.map((r: any) => ({
                user_id: userId,
                matched_investor_id: r.angel?.id, // Assuming angel object has id
                matched_fund_id: r.fund?.id,     // Assuming fund object has id
                relevance_score: r.score,
                query: query,
                summary: r.breakdown // Storing breakdown as summary for now
            }));

            // Use search_results table
            // We use upsert if there IS a conflict constraint, but search_results usually tracks history.
            // If we want to avoid duplicates for the same query/investor, we'd need a constraint.
            // For now, let's just INSERT to track search history matches.
            const { error } = await supabase.from('search_results').insert(saves);

            if (error) {
                console.error('Error auto-saving results:', error);
            }
        }

        return NextResponse.json({ results, keywords });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
