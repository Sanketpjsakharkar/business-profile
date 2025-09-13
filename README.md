# BusinessProfile - Digital Business Cards

A modern, responsive web application for creating and sharing digital business profiles with QR codes. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## ✨ Features

### Core Features
- **User Authentication**: Email/password registration and login
- **Profile Types**: Support for Individual and Company profiles
- **QR Code Generation**: Instant QR codes for profile sharing
- **Public Profile Pages**: Clean, shareable profile URLs (`/country/username`)
- **Mobile Contact Integration**: Add to contacts functionality for mobile devices
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Technical Features
- **Progressive Web App (PWA)**: Installable on mobile and desktop
- **Offline Support**: Basic functionality works offline
- **Mobile-First**: Optimized for mobile devices
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, professional design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd business-profile
npm install
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. Create the profiles table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('individual', 'company')),
  country_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Individual fields
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  address TEXT,
  bio TEXT,
  
  -- Company fields
  company_name TEXT,
  company_logo TEXT,
  contact_person TEXT,
  business_details TEXT,
  
  -- Common fields
  social_links JSONB,
  is_active BOOLEAN DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (is_active = true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create indexes
CREATE INDEX profiles_username_country_idx ON profiles(username, country_code);
CREATE INDEX profiles_active_idx ON profiles(is_active);
```

### 3. Environment Setup

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=BusinessProfile
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### For Users

1. **Register**: Create an account and choose Individual or Company profile
2. **Setup Profile**: Complete your profile information during onboarding
3. **Dashboard**: Access your dashboard to view and manage your profile
4. **Generate QR**: Create QR codes for easy profile sharing
5. **Share**: Share your profile URL or QR code with others
6. **Edit**: Update your profile information anytime

### Profile URLs

Public profiles are accessible at:
```
https://yourapp.com/{country-code}/{username}
```

Example: `https://yourapp.com/us/johnsmith`

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── profile/           # Profile management
│   └── [country]/[username]/ # Public profile pages
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── auth/             # Authentication components
├── hooks/                # Custom React hooks
├── lib/                  # Library configurations
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🔧 Configuration

### PWA Configuration

The app is configured as a PWA with:
- Installable on mobile and desktop
- Offline support
- Custom app icons
- Proper manifest configuration

### Mobile Features

- **Contact Integration**: Automatically detects mobile devices
- **vCard Generation**: Creates downloadable contact cards
- **Responsive Design**: Optimized for all screen sizes
- **Touch-Friendly**: Large tap targets and smooth interactions

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Key Technologies

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **UI Components**: Custom components with Radix UI patterns
- **Icons**: Lucide React
- **QR Codes**: qrcode.react

## 🔐 Security

- Row Level Security (RLS) enabled on all database tables
- Authentication required for profile management
- Public profiles only show approved information
- Input validation and sanitization
- HTTPS enforced in production

## 📧 Contact Integration

The app supports multiple contact integration methods:

1. **Mobile Devices**: 
   - Attempts to use native contact API when available
   - Falls back to vCard download
   
2. **Desktop**: 
   - Downloads vCard (.vcf) files
   - Compatible with all major contact applications

## 🎨 Customization

### Themes
The app uses CSS custom properties for theming. Modify `globals.css` to customize colors and styling.

### Branding
Update the following files for custom branding:
- `public/manifest.json` - App name and description
- `public/icon-*.svg` - App icons
- `src/app/layout.tsx` - Meta tags and titles

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🐛 Issues

If you encounter any issues or have feature requests, please create an issue on GitHub.

---

Built with ❤️ using Next.js and Supabase
