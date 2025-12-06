import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
    try {
        const { recipientId, recipientType, recipientName, companyContext, content, userId } = await req.json();

        if (!userId || !recipientId || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

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
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase Save Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('Message Save API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
