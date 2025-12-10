import { NextRequest, NextResponse } from 'next/server';
import { generateMessage } from '@/lib/gemini/generateMessage';

export async function POST(req: NextRequest) {
    try {
        const { investorData, companyContext, messageType } = await req.json();

        if (!investorData || !companyContext) {
            return NextResponse.json({ error: 'Missing investorData or companyContext' }, { status: 400 });
        }

        const message = await generateMessage({ investorData, companyContext, messageType });

        return NextResponse.json({ message });
    } catch (error) {
        console.error('Message Gen API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
