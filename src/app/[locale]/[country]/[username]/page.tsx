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
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('country_code', country.toLowerCase())
            .eq('username', username)
            .eq('is_active', true)
            .single()

        if (error) {
            console.error('Error fetching profile:', error)
            return null
        }

        if (!data) {
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
