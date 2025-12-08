
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

// Load env vars from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use Service Key to bypass RLS

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Check your .env.local file. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedAngels() {
    const filePath = path.resolve(__dirname, '../../json/angels_rows.json');
    if (!fs.existsSync(filePath)) {
        console.error('Angels JSON not found:', filePath);
        return;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const investors = JSON.parse(raw);

    console.log(`Found ${investors.length} angels to seed...`);

    const rows = investors.map((inv: any) => ({
        full_name: inv.fullName,
        headline: inv.headline,
        email: inv.email,
        linkedin_url: inv.linkedinUrl,
        about: inv.about,
        address_with_country: inv.addressWithCountry,
        profile_pic: inv.profilePic,
        angel_score: parseFloat(inv.angel_score || '0'),
        validation_reasons_spanish: inv.validation_reasons_spanish,
        validation_reasons_english: inv.validation_reasons_english,
        categories_general_es: inv.categories_general_es,
        categories_general_en: inv.categories_general_en,
        categories_strong_es: inv.categories_strong_es,
        categories_strong_en: inv.categories_strong_en,
        stages_general_es: inv.stages_general_es,
        stages_general_en: inv.stages_general_en,
        stages_strong_es: inv.stages_strong_es,
        stages_strong_en: inv.stages_strong_en,
        id: inv.id // Keep original ID if present
    }));

    const { error } = await supabase.from('angels').upsert(rows, { onConflict: 'id' });

    if (error) {
        console.error('Error seeding angels:', error);
    } else {
        console.log('✅ Angels seeded successfully!');
    }
}

async function seedFunds() {
    const filePath = path.resolve(__dirname, '../../json/funds_rows.json');
    if (!fs.existsSync(filePath)) {
        console.error('Funds JSON not found');
        return;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const funds = JSON.parse(raw);

    console.log(`Found ${funds.length} funds to seed...`);

    const rows = funds.map((f: any) => ({
        name: f.name,
        description: f.description,
        short_description: f.short_description,
        contact_email: f.contact_email,
        phone_number: f.phone_number,
        website_url: f['website/value'],
        linkedin_url: f['linkedin/value'],
        // Extract location info if available in the array
        location_city: f['location_identifiers/0/value'],
        location_region: f['location_identifiers/1/value'],
        location_country: f['location_identifiers/2/value'],
        category_keywords: f.category_keywords,
        stage_keywords: f.stage_keywords,
        id: f.id
    }));

    const { error } = await supabase.from('funds').upsert(rows, { onConflict: 'id' });

    if (error) {
        console.error('Error seeding funds:', error);
    } else {
        console.log('✅ Funds seeded successfully!');
    }
}

async function seedEmployees() {
    const filePath = path.resolve(__dirname, '../../json/employees_rows.json');
    if (!fs.existsSync(filePath)) {
        console.error('Employees JSON not found');
        return;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const employees = JSON.parse(raw);

    console.log(`Found ${employees.length} employees to seed...`);

    const rows = employees.map((e: any) => ({
        full_name: e.fullName,
        headline: e.headline,
        job_title: e.jobTitle,
        about: e.about,
        email: e.email,
        linkedin_url: e.linkedinUrl,
        profile_pic: e.profilePic,
        address_with_country: e.addressWithCountry,
        company_linkedin: e.companyLinkedin,
        company_name: e.companyName,
        company_website: e.companyWebsite,
        fund_name: e.fund_name,
        relevancia_dentro_del_fondo: e.relevancia_dentro_del_fondo,
        mira_pitch_decks: e.mira_pitch_decks,
        probabilidad_respuesta: e.probabilidad_respuesta,
        score_combinado: e.score_combinado,
        razonamiento: e.razonamiento,
        id: e.id
    }));

    const { error } = await supabase.from('employees').upsert(rows, { onConflict: 'id' });

    if (error) {
        console.error('Error seeding employees:', error);
    } else {
        console.log('✅ Employees seeded successfully!');
    }
}

async function main() {
    await seedAngels();
    await seedFunds();
    await seedEmployees();
}

main();
