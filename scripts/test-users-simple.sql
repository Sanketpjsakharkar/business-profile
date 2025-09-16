-- Simple Test Users for BusinessProfile App
-- This version works without foreign key constraints
-- Run this in your Supabase SQL Editor

-- First, let's check if we need to modify the table structure
-- If you get foreign key errors, run this first:
-- ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Individual Profile 1: John Doe (Software Engineer)
INSERT INTO profiles (
  id,
  email,
  username,
  profile_type,
  country_code,
  first_name,
  last_name,
  phone,
  address,
  bio,
  social_links,
  is_active
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'john.doe@example.com',
  'johndoe',
  'individual',
  'us',
  'John',
  'Doe',
  '+1 (555) 123-4567',
  '123 Main Street, New York, NY 10001',
  'Software Engineer passionate about building innovative web applications. I love working with React, Node.js, and modern web technologies.',
  '{"website": "https://johndoe.dev", "linkedin": "https://linkedin.com/in/johndoe", "twitter": "https://twitter.com/johndoe", "github": "https://github.com/johndoe"}',
  true
) ON CONFLICT (username) DO NOTHING;

-- Individual Profile 2: Sarah Wilson (UX Designer)
INSERT INTO profiles (
  id,
  email,
  username,
  profile_type,
  country_code,
  first_name,
  last_name,
  phone,
  address,
  bio,
  social_links,
  is_active
) VALUES (
  '22222222-2222-2222-2222-222222222222',
  'sarah.wilson@example.com',
  'sarahwilson',
  'individual',
  'us',
  'Sarah',
  'Wilson',
  '+1 (555) 987-6543',
  '456 Oak Avenue, San Francisco, CA 94102',
  'UX Designer with 8+ years of experience creating beautiful and intuitive digital experiences. Specializing in mobile-first design and user research.',
  '{"website": "https://sarahwilson.design", "linkedin": "https://linkedin.com/in/sarahwilson", "instagram": "https://instagram.com/sarahdesigns"}',
  true
) ON CONFLICT (username) DO NOTHING;

-- Individual Profile 3: Mike Chen (Digital Marketing Specialist)
INSERT INTO profiles (
  id,
  email,
  username,
  profile_type,
  country_code,
  first_name,
  last_name,
  phone,
  address,
  bio,
  social_links,
  is_active
) VALUES (
  '33333333-3333-3333-3333-333333333333',
  'mike.chen@example.com',
  'mikechen',
  'individual',
  'ca',
  'Mike',
  'Chen',
  '+1 (416) 555-0123',
  '789 Maple Street, Toronto, ON M5V 3A8',
  'Digital Marketing Specialist helping businesses grow their online presence. Expert in SEO, content marketing, and social media strategy.',
  '{"website": "https://mikechen.marketing", "linkedin": "https://linkedin.com/in/mikechen", "twitter": "https://twitter.com/mikechenmarketing"}',
  true
) ON CONFLICT (username) DO NOTHING;

-- Company Profile 1: TechStartup Inc.
INSERT INTO profiles (
  id,
  email,
  username,
  profile_type,
  country_code,
  company_name,
  contact_person,
  phone,
  business_details,
  social_links,
  is_active
) VALUES (
  '44444444-4444-4444-4444-444444444444',
  'contact@techstartup.com',
  'techstartup',
  'company',
  'us',
  'TechStartup Inc.',
  'Alex Rodriguez',
  '+1 (555) 234-5678',
  'Innovative technology company specializing in AI-powered solutions for small businesses. We help companies automate their workflows and increase productivity.',
  '{"website": "https://techstartup.com", "linkedin": "https://linkedin.com/company/techstartup", "twitter": "https://twitter.com/techstartup"}',
  true
) ON CONFLICT (username) DO NOTHING;

-- Company Profile 2: Creative Design Studio
INSERT INTO profiles (
  id,
  email,
  username,
  profile_type,
  country_code,
  company_name,
  contact_person,
  phone,
  business_details,
  social_links,
  is_active
) VALUES (
  '55555555-5555-5555-5555-555555555555',
  'hello@designstudio.com',
  'designstudio',
  'company',
  'uk',
  'Creative Design Studio',
  'Emma Thompson',
  '+44 20 7123 4567',
  'Award-winning design agency creating stunning visual identities and digital experiences for brands worldwide. From startups to Fortune 500 companies.',
  '{"website": "https://designstudio.co.uk", "linkedin": "https://linkedin.com/company/creative-design-studio", "instagram": "https://instagram.com/designstudio"}',
  true
) ON CONFLICT (username) DO NOTHING;

-- Verify the data was inserted
SELECT 
  username,
  profile_type,
  country_code,
  CASE 
    WHEN profile_type = 'individual' THEN CONCAT(first_name, ' ', last_name)
    ELSE company_name
  END as display_name,
  is_active,
  created_at
FROM profiles 
WHERE email LIKE '%@example.com'
ORDER BY created_at DESC;

-- Show test URLs
SELECT 
  CONCAT('http://localhost:3001/', country_code, '/', username) as test_url,
  CASE 
    WHEN profile_type = 'individual' THEN CONCAT(first_name, ' ', last_name)
    ELSE company_name
  END as display_name
FROM profiles 
WHERE email LIKE '%@example.com'
ORDER BY country_code, username;

