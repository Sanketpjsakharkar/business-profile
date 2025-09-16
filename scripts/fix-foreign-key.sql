-- Fix Foreign Key Constraint Issue
-- Run this in your Supabase SQL Editor to resolve the foreign key error

-- Option 1: Remove the foreign key constraint (for testing purposes)
-- This allows profiles to exist without corresponding auth.users entries
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Option 2: If you want to keep the constraint but make it work with test data,
-- you can create dummy auth.users entries first (uncomment the lines below):

/*
-- Create dummy auth.users entries for test profiles
INSERT INTO auth.users (id, email, created_at, updated_at, email_confirmed_at)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'john.doe@example.com', NOW(), NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'sarah.wilson@example.com', NOW(), NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'mike.chen@example.com', NOW(), NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'contact@techstartup.com', NOW(), NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'hello@designstudio.com', NOW(), NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Then re-add the foreign key constraint
ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey 
  FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
*/

-- Check current constraints
SELECT 
  conname as constraint_name,
  contype as constraint_type,
  pg_get_constraintdef(oid) as definition
FROM pg_constraint 
WHERE conrelid = 'profiles'::regclass;

