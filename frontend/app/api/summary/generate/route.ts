import { NextRequest, NextResponse } from 'next/server';
import { generateInvestorSummary } from '@/lib/gemini/generateMessage';

export async function POST(req: NextRequest) {
    try {
        const { investorData, userCompany } = await req.json();

        if (!investorData) {
            return NextResponse.json({ error: 'Missing investorData' }, { status: 400 });
        }

        const summary = await generateInvestorSummary({
            investorData,
            userCompany: userCompany || "A high-growth tech startup." // Default context if missing
        });

        return NextResponse.json({ summary });
    } catch (error) {
        console.error('Summary Gen API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
