-- Test Users for BusinessProfile App
-- Run this in your Supabase SQL Editor to add sample users

-- Temporarily disable foreign key constraint for testing
-- (We'll re-enable it at the end)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

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
  gen_random_uuid(),
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
);

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
  gen_random_uuid(),
  'sarah.wilson@example.com',
  'sarahwilson',
  'individual',
  'us',
  'Sarah',
  'Wilson',
  '+1 (555) 987-6543',
  '456 Oak Avenue, San Francisco, CA 94102',
  'UX Designer with 8+ years of experience creating beautiful and intuitive digital experiences. Specializing in mobile-first design and user research.',
  '{"website": "https://sarahwilson.design", "linkedin": "https://linkedin.com/in/sarahwilson", "instagram": "https://instagram.com/sarahdesigns", "dribbble": "https://dribbble.com/sarahwilson"}',
  true
);

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
  gen_random_uuid(),
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
);

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
  gen_random_uuid(),
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
);

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
  gen_random_uuid(),
  'hello@designstudio.com',
  'designstudio',
  'company',
  'uk',
  'Creative Design Studio',
  'Emma Thompson',
  '+44 20 7123 4567',
  'Award-winning design agency creating stunning visual identities and digital experiences for brands worldwide. From startups to Fortune 500 companies.',
  '{"website": "https://designstudio.co.uk", "linkedin": "https://linkedin.com/company/creative-design-studio", "instagram": "https://instagram.com/designstudio", "behance": "https://behance.net/designstudio"}',
  true
);

-- Individual Profile 4: Lisa Park (Product Manager)
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
  gen_random_uuid(),
  'lisa.park@example.com',
  'lisapark',
  'individual',
  'us',
  'Lisa',
  'Park',
  '+1 (555) 456-7890',
  '321 Pine Street, Seattle, WA 98101',
  'Product Manager with expertise in agile development and user-centered design. Passionate about building products that solve real-world problems.',
  '{"website": "https://lisapark.pm", "linkedin": "https://linkedin.com/in/lisapark", "twitter": "https://twitter.com/lisapark_pm"}',
  true
);

-- Individual Profile 5: David Kumar (Data Scientist)
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
  gen_random_uuid(),
  'david.kumar@example.com',
  'davidkumar',
  'individual',
  'in',
  'David',
  'Kumar',
  '+91 98765 43210',
  '456 Tech Park, Bangalore, Karnataka 560001',
  'Data Scientist specializing in machine learning and AI. Experienced in Python, R, and cloud platforms. Love turning data into actionable insights.',
  '{"website": "https://davidkumar.ai", "linkedin": "https://linkedin.com/in/davidkumar", "github": "https://github.com/davidkumar", "kaggle": "https://kaggle.com/davidkumar"}',
  true
);

-- Company Profile 3: Green Energy Solutions
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
  gen_random_uuid(),
  'info@greenenergy.com',
  'greenenergy',
  'company',
  'au',
  'Green Energy Solutions',
  'James Mitchell',
  '+61 2 9876 5432',
  'Leading provider of sustainable energy solutions for residential and commercial properties. Specializing in solar panels, wind energy, and energy storage systems.',
  '{"website": "https://greenenergy.com.au", "linkedin": "https://linkedin.com/company/green-energy-solutions", "facebook": "https://facebook.com/greenenergysolutions"}',
  true
);

-- Re-enable the foreign key constraint (optional - only if you want to enforce it later)
-- ALTER TABLE profiles ADD CONSTRAINT profiles_id_fkey 
--   FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- Verify the data was inserted
SELECT 
  username,
  profile_type,
  country_code,
  CASE 
    WHEN profile_type = 'individual' THEN CONCAT(first_name, ' ', last_name)
    ELSE company_name
  END as display_name,
  is_active
FROM profiles 
ORDER BY created_at DESC;
