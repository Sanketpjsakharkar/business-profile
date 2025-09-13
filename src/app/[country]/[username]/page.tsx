import { PublicProfileView } from '@/components/PublicProfileView'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types/profile'
import { notFound } from 'next/navigation'

interface PublicProfilePageProps {
    params: {
        country: string
        username: string
    }
}

async function getProfile(country: string, username: string): Promise<Profile | null> {
    try {
        // DEMO MODE - Return demo profile data
        // In production, replace this with actual Supabase query
        if (username === 'demo-user' && country.toLowerCase() === 'us') {
            const demoProfile: Profile = {
                id: 'demo-user-id',
                email: 'demo@example.com',
                username: 'demo-user',
                profile_type: 'individual',
                country_code: 'us',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                first_name: 'Demo',
                last_name: 'User',
                phone: '+1 (555) 123-4567',
                address: '123 Demo Street, Demo City, DC 12345',
                bio: 'This is a demo profile for testing the BusinessProfile app. I\'m passionate about technology and building amazing digital experiences.',
                social_links: {
                    website: 'https://example.com',
                    linkedin: 'https://linkedin.com/in/demo-user',
                    twitter: 'https://twitter.com/demouser',
                    github: 'https://github.com/demouser'
                },
                is_active: true
            }
            return demoProfile
        }

        // For production use:
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('country_code', country.toLowerCase())
            .eq('username', username)
            .eq('is_active', true)
            .single()

        if (error || !data) {
            return null
        }

        return data as Profile
    } catch (error) {
        console.error('Error fetching profile:', error)
        return null
    }
}

export async function generateMetadata({ params }: PublicProfilePageProps) {
    const resolvedParams = await params
    const profile = await getProfile(resolvedParams.country, resolvedParams.username)

    if (!profile) {
        return {
            title: 'Profile Not Found',
            description: 'The requested profile could not be found.',
        }
    }

    const displayName = profile.profile_type === 'individual'
        ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username
        : profile.company_name || profile.username

    return {
        title: `${displayName} - BusinessProfile`,
        description: profile.profile_type === 'individual'
            ? `Connect with ${displayName}`
            : `Learn more about ${displayName}`,
    }
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
    const resolvedParams = await params
    const profile = await getProfile(resolvedParams.country, resolvedParams.username)

    if (!profile) {
        notFound()
    }

    return <PublicProfileView profile={profile} />
}
