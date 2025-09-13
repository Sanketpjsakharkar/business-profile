export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    username: string
                    profile_type: 'individual' | 'company'
                    country_code: string
                    created_at: string
                    updated_at: string
                    // Individual fields
                    first_name?: string | null
                    last_name?: string | null
                    phone?: string | null
                    address?: string | null
                    bio?: string | null
                    // Company fields
                    company_name?: string | null
                    company_logo?: string | null
                    contact_person?: string | null
                    business_details?: string | null
                    // Common fields
                    social_links?: Json | null
                    is_active: boolean
                }
                Insert: {
                    id: string
                    email: string
                    username: string
                    profile_type: 'individual' | 'company'
                    country_code: string
                    created_at?: string
                    updated_at?: string
                    first_name?: string | null
                    last_name?: string | null
                    phone?: string | null
                    address?: string | null
                    bio?: string | null
                    company_name?: string | null
                    company_logo?: string | null
                    contact_person?: string | null
                    business_details?: string | null
                    social_links?: Json | null
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    email?: string
                    username?: string
                    profile_type?: 'individual' | 'company'
                    country_code?: string
                    created_at?: string
                    updated_at?: string
                    first_name?: string
                    last_name?: string
                    phone?: string
                    address?: string
                    bio?: string
                    company_name?: string
                    company_logo?: string
                    contact_person?: string
                    business_details?: string
                    social_links?: Json
                    is_active?: boolean
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
