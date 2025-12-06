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
            const type = mode === 'angels' ? 'angel' : 'fund';
            const saves = results.map((r: any) => ({
                user_id: userId,
                investor_id: r.angel?.id || r.fund?.id,
                type: type
            }));

            // Use upsert to avoid unique constraint errors
            await supabase.from('saved_investors').upsert(saves, { onConflict: 'user_id, investor_id, type', ignoreDuplicates: true });

            // Also mark as seen
            await supabase.from('seen_investors').upsert(saves, { onConflict: 'user_id, investor_id, type', ignoreDuplicates: true });
        }

        return NextResponse.json({ results, keywords });
    } catch (error) {
        console.error('Search API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
