/**
 * Script to add test users to Supabase database
 * 
 * Usage:
 * 1. Make sure your Supabase environment variables are set in .env
 * 2. Run: node scripts/add-test-users.js
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY // You'll need to add this to your .env

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    console.log('Make sure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const testUsers = [
    {
        // Individual Profile 1
        email: 'john.doe@example.com',
        username: 'johndoe',
        profile_type: 'individual',
        country_code: 'us',
        first_name: 'John',
        last_name: 'Doe',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street, New York, NY 10001',
        bio: 'Software Engineer passionate about building innovative web applications. I love working with React, Node.js, and modern web technologies.',
        social_links: {
            website: 'https://johndoe.dev',
            linkedin: 'https://linkedin.com/in/johndoe',
            twitter: 'https://twitter.com/johndoe',
            github: 'https://github.com/johndoe'
        },
        is_active: true
    },
    {
        // Individual Profile 2
        email: 'sarah.wilson@example.com',
        username: 'sarahwilson',
        profile_type: 'individual',
        country_code: 'us',
        first_name: 'Sarah',
        last_name: 'Wilson',
        phone: '+1 (555) 987-6543',
        address: '456 Oak Avenue, San Francisco, CA 94102',
        bio: 'UX Designer with 8+ years of experience creating beautiful and intuitive digital experiences. Specializing in mobile-first design and user research.',
        social_links: {
            website: 'https://sarahwilson.design',
            linkedin: 'https://linkedin.com/in/sarahwilson',
            instagram: 'https://instagram.com/sarahdesigns',
            dribbble: 'https://dribbble.com/sarahwilson'
        },
        is_active: true
    },
    {
        // Individual Profile 3
        email: 'mike.chen@example.com',
        username: 'mikechen',
        profile_type: 'individual',
        country_code: 'ca',
        first_name: 'Mike',
        last_name: 'Chen',
        phone: '+1 (416) 555-0123',
        address: '789 Maple Street, Toronto, ON M5V 3A8',
        bio: 'Digital Marketing Specialist helping businesses grow their online presence. Expert in SEO, content marketing, and social media strategy.',
        social_links: {
            website: 'https://mikechen.marketing',
            linkedin: 'https://linkedin.com/in/mikechen',
            twitter: 'https://twitter.com/mikechenmarketing'
        },
        is_active: true
    },
    {
        // Company Profile 1
        email: 'contact@techstartup.com',
        username: 'techstartup',
        profile_type: 'company',
        country_code: 'us',
        company_name: 'TechStartup Inc.',
        contact_person: 'Alex Rodriguez',
        phone: '+1 (555) 234-5678',
        business_details: 'Innovative technology company specializing in AI-powered solutions for small businesses. We help companies automate their workflows and increase productivity.',
        social_links: {
            website: 'https://techstartup.com',
            linkedin: 'https://linkedin.com/company/techstartup',
            twitter: 'https://twitter.com/techstartup'
        },
        is_active: true
    },
    {
        // Company Profile 2
        email: 'hello@designstudio.com',
        username: 'designstudio',
        profile_type: 'company',
        country_code: 'uk',
        company_name: 'Creative Design Studio',
        contact_person: 'Emma Thompson',
        phone: '+44 20 7123 4567',
        business_details: 'Award-winning design agency creating stunning visual identities and digital experiences for brands worldwide. From startups to Fortune 500 companies.',
        social_links: {
            website: 'https://designstudio.co.uk',
            linkedin: 'https://linkedin.com/company/creative-design-studio',
            instagram: 'https://instagram.com/designstudio',
            behance: 'https://behance.net/designstudio'
        },
        is_active: true
    }
]

async function addTestUsers() {
    console.log('🚀 Adding test users to Supabase...')

    for (const user of testUsers) {
        try {
            // Generate a UUID for the user (in real app, this would come from auth.users)
            const userId = crypto.randomUUID()

            const { data, error } = await supabase
                .from('profiles')
                .insert({
                    id: userId,
                    ...user
                })
                .select()

            if (error) {
                console.error(`❌ Error adding user ${user.username}:`, error.message)
            } else {
                console.log(`✅ Added user: ${user.username} (${user.profile_type})`)
            }
        } catch (err) {
            console.error(`❌ Unexpected error adding user ${user.username}:`, err.message)
        }
    }

    console.log('\n🎉 Test users setup complete!')
    console.log('\nYou can now access these profiles at:')
    testUsers.forEach(user => {
        console.log(`📋 ${user.country_code}/${user.username} - ${user.profile_type === 'individual' ? `${user.first_name} ${user.last_name}` : user.company_name}`)
    })

    console.log('\n💡 Example URLs:')
    console.log(`   http://localhost:3001/us/johndoe`)
    console.log(`   http://localhost:3001/us/sarahwilson`)
    console.log(`   http://localhost:3001/ca/mikechen`)
    console.log(`   http://localhost:3001/us/techstartup`)
    console.log(`   http://localhost:3001/uk/designstudio`)
}

// Run the script
addTestUsers().catch(console.error)

