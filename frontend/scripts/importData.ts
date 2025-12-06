import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // Or SERVICE_ROLE_KEY if RLS blocks insert

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function importData() {
    try {
        // Read JSON files
        // Assuming script is run from frontend root, and json is in ../json
        const jsonDir = path.resolve(__dirname, '../../json');

        const angels = JSON.parse(fs.readFileSync(path.join(jsonDir, 'angel_investors_rows.json'), 'utf-8'));
        const funds = JSON.parse(fs.readFileSync(path.join(jsonDir, 'investment_funds_rows.json'), 'utf-8'));
        const employees = JSON.parse(fs.readFileSync(path.join(jsonDir, 'fund_employees_rows.json'), 'utf-8'));

        console.log(`Found ${angels.length} angels, ${funds.length} funds, ${employees.length} employees.`);

        // Import Angels
        const { error: angelError } = await supabase.from('angel_investors').insert(
            angels.map((a: any) => ({ data: a }))
        );
        if (angelError) console.error('Error importing angels:', angelError);
        else console.log('✅ Angels imported');

        // Import Funds
        const { error: fundError } = await supabase.from('investment_funds').insert(
            funds.map((f: any) => ({ data: f }))
        );
        if (fundError) console.error('Error importing funds:', fundError);
        else console.log('✅ Funds imported');

        // Import Employees
        const { error: empError } = await supabase.from('fund_employees').insert(
            employees.map((e: any) => ({ data: e }))
        );
        if (empError) console.error('Error importing employees:', empError);
        else console.log('✅ Employees imported');

    } catch (err) {
        console.error('Import failed:', err);
    }
}

importData();
