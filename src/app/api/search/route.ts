import { supabase } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q')
        const country = searchParams.get('country')
        const type = searchParams.get('type') // 'individual' | 'company' | 'all'
        const limit = parseInt(searchParams.get('limit') || '20')
        const offset = parseInt(searchParams.get('offset') || '0')

        if (!query || query.trim().length < 2) {
            return NextResponse.json(
                { error: 'Search query must be at least 2 characters long' },
                { status: 400 }
            )
        }

        let searchQuery = supabase
            .from('profiles')
            .select(`
        id,
        username,
        profile_type,
        country_code,
        first_name,
        last_name,
        company_name,
        contact_person,
        bio,
        business_details,
        phone,
        social_links,
        avatar_url,
        created_at
      `)
            .eq('is_active', true)

        // Build search conditions
        const searchTerm = `%${query.trim()}%`

        // Search in multiple fields based on profile type
        if (type === 'individual') {
            searchQuery = searchQuery
                .eq('profile_type', 'individual')
                .or(`first_name.ilike.${searchTerm},last_name.ilike.${searchTerm},username.ilike.${searchTerm},bio.ilike.${searchTerm}`)
        } else if (type === 'company') {
            searchQuery = searchQuery
                .eq('profile_type', 'company')
                .or(`company_name.ilike.${searchTerm},contact_person.ilike.${searchTerm},username.ilike.${searchTerm},business_details.ilike.${searchTerm}`)
        } else {
            // Search all profile types
            searchQuery = searchQuery
                .or(`first_name.ilike.${searchTerm},last_name.ilike.${searchTerm},company_name.ilike.${searchTerm},contact_person.ilike.${searchTerm},username.ilike.${searchTerm},bio.ilike.${searchTerm},business_details.ilike.${searchTerm}`)
        }

        // Filter by country if specified
        if (country && country !== 'all') {
            searchQuery = searchQuery.eq('country_code', country.toLowerCase())
        }

        // Add pagination and ordering
        searchQuery = searchQuery
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        const { data, error, count } = await searchQuery

        if (error) {
            console.error('Search error:', error)
            return NextResponse.json(
                { error: 'Search failed' },
                { status: 500 }
            )
        }

        // Transform the data for frontend consumption
        const results = data?.map(profile => ({
            id: profile.id,
            username: profile.username,
            profileType: profile.profile_type,
            countryCode: profile.country_code,
            displayName: profile.profile_type === 'individual'
                ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username
                : profile.company_name || profile.username,
            subtitle: profile.profile_type === 'individual'
                ? profile.bio?.substring(0, 100) + (profile.bio?.length > 100 ? '...' : '')
                : profile.business_details?.substring(0, 100) + (profile.business_details?.length > 100 ? '...' : ''),
            contactPerson: profile.profile_type === 'company' ? profile.contact_person : null,
            phone: profile.phone,
            socialLinks: profile.social_links,
            avatarUrl: profile.avatar_url,
            profileUrl: `/${profile.country_code}/${profile.username}`,
            createdAt: profile.created_at
        })) || []

        return NextResponse.json({
            results,
            total: count || results.length,
            query,
            filters: {
                country,
                type,
                limit,
                offset
            }
        })

    } catch (error) {
        console.error('Search API error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
