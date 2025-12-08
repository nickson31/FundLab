-- Quick diagnostic query to check actual table structure
-- Run this in Supabase SQL Editor

-- Check angels table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'angels' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check sample data structure
SELECT * FROM angels LIMIT 1;
