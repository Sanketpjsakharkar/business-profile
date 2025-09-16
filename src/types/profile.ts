export type ProfileType = 'individual' | 'company'

export interface SocialLinks {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
    website?: string
}

export interface BaseProfile {
    id: string
    email: string
    username: string
    profile_type: ProfileType
    country_code: string
    created_at: string
    updated_at: string
    phone?: string
    social_links?: SocialLinks
    is_active: boolean
    avatar_url?: string
}

export interface IndividualProfile extends BaseProfile {
    profile_type: 'individual'
    first_name?: string
    last_name?: string
    address?: string
    bio?: string
}

export interface CompanyProfile extends BaseProfile {
    profile_type: 'company'
    company_name?: string
    company_logo?: string
    contact_person?: string
    business_details?: string
}

export type Profile = IndividualProfile | CompanyProfile

export interface ContactInfo {
    firstName?: string
    lastName?: string
    email: string
    phone?: string
    organization?: string
    url?: string
}
