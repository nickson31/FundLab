import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
    console.log('🔍 Checking Supabase database...\n');

    // Check angels table
    const { data: angels, error: angelsError } = await supabase
        .from('angels')
        .select('*')
        .limit(1);

    console.log('📊 ANGELS TABLE:');
    console.log('  Count:', angels?.length || 0);
    console.log('  Error:', angelsError?.message || 'None');
    if (angels && angels.length > 0) {
        console.log('  Sample structure:', Object.keys(angels[0]));
        console.log('  Sample data:', JSON.stringify(angels[0], null, 2).substring(0, 500));
    }
    console.log('');

    // Check funds table
    const { data: funds, error: fundsError } = await supabase
        .from('funds')
        .select('*')
        .limit(1);

    console.log('📊 FUNDS TABLE:');
    console.log('  Count:', funds?.length || 0);
    console.log('  Error:', fundsError?.message || 'None');
    if (funds && funds.length > 0) {
        console.log('  Sample structure:', Object.keys(funds[0]));
    }
    console.log('');

    // Check employees table
    const { data: employees, error: employeesError } = await supabase
        .from('employees')
        .select('*')
        .limit(1);

    console.log('📊 EMPLOYEES TABLE:');
    console.log('  Count:', employees?.length || 0);
    console.log('  Error:', employeesError?.message || 'None');
    console.log('');

    // Total counts
    const { count: angelCount } = await supabase
        .from('angels')
        .select('*', { count: 'exact', head: true });

    const { count: fundCount } = await supabase
        .from('funds')
        .select('*', { count: 'exact', head: true });

    console.log('📈 TOTAL COUNTS:');
    console.log('  Angels:', angelCount);
    console.log('  Funds:', fundCount);
    console.log('  Employees:', employees?.length || 0);
}

checkDatabase().catch(console.error);
