# Test Users Setup

This directory contains scripts to help you populate your Supabase database with test users for development and testing.

## Quick Setup (Recommended)

### Option 1: SQL Script (Easiest)

1. Open your Supabase Dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `test-users.sql`
4. Click "Run" to execute the script

This will create 8 test profiles:

**Individual Profiles:**
- `us/johndoe` - John Doe (Software Engineer)
- `us/sarahwilson` - Sarah Wilson (UX Designer) 
- `ca/mikechen` - Mike Chen (Digital Marketing Specialist)
- `us/lisapark` - Lisa Park (Product Manager)
- `in/davidkumar` - David Kumar (Data Scientist)

**Company Profiles:**
- `us/techstartup` - TechStartup Inc.
- `uk/designstudio` - Creative Design Studio
- `au/greenenergy` - Green Energy Solutions

### Option 2: Node.js Script

1. Install dependencies:
   ```bash
   npm install @supabase/supabase-js dotenv
   ```

2. Add your Supabase service role key to `.env`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

3. Run the script:
   ```bash
   node scripts/add-test-users.js
   ```

## Testing Your Profiles

After adding the test users, you can visit these URLs to see the profiles:

- http://localhost:3001/us/johndoe
- http://localhost:3001/us/sarahwilson
- http://localhost:3001/ca/mikechen
- http://localhost:3001/us/techstartup
- http://localhost:3001/uk/designstudio
- And more...

## Profile Structure

Each test profile includes:

### Individual Profiles
- ✅ Name, email, phone
- ✅ Professional bio
- ✅ Address
- ✅ Social media links (LinkedIn, Twitter, GitHub, etc.)
- ✅ Professional headshot placeholder

### Company Profiles  
- ✅ Company name and contact person
- ✅ Business description
- ✅ Contact information
- ✅ Social media presence
- ✅ Company logo placeholder

## Customization

Feel free to modify the test data in `test-users.sql` to match your specific testing needs. You can:

- Change names, locations, and contact info
- Update bio/business descriptions
- Modify social media links
- Add or remove profiles
- Change country codes

## Clean Up

To remove all test users, run this SQL in your Supabase dashboard:

```sql
DELETE FROM profiles WHERE email LIKE '%@example.com';
```

## Next Steps

1. **Add Real Users**: Use the authentication flow to create real user accounts
2. **Profile Setup**: Complete the profile setup flow for authenticated users
3. **QR Code Generation**: Test QR code generation and scanning
4. **Mobile Experience**: Test the mobile profile viewing experience
5. **Analytics**: Implement profile view tracking and analytics

## Notes

- All test users use `@example.com` email addresses
- UUIDs are automatically generated for each profile
- All profiles are set to `is_active: true`
- Social links are examples and may not lead to real profiles
- Phone numbers are formatted examples and not real numbers

