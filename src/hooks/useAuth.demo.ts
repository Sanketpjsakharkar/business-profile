'use client'

import { Profile } from '@/types/profile'
import { useState } from 'react'

// Demo mode - works without Supabase
export function useAuth() {
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(false) // Set to false for demo
    const [session, setSession] = useState<any>(null)

    const signUp = async (email: string, password: string) => {
        // Simulate signup
        const mockUser = {
            id: 'demo-user-id',
            email,
            created_at: new Date().toISOString()
        }
        setUser(mockUser)
        setSession({ user: mockUser })
        return { data: { user: mockUser }, error: null }
    }

    const signIn = async (email: string, password: string) => {
        // Simulate login
        const mockUser = {
            id: 'demo-user-id',
            email,
            created_at: new Date().toISOString()
        }
        setUser(mockUser)
        setSession({ user: mockUser })

        // Set a demo profile
        const demoProfile: Profile = {
            id: 'demo-user-id',
            email,
            username: 'demo-user',
            profile_type: 'individual',
            country_code: 'us',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            first_name: 'Demo',
            last_name: 'User',
            phone: '+1 (555) 123-4567',
            address: '123 Demo Street, Demo City, DC 12345',
            bio: 'This is a demo profile for testing the BusinessProfile app.',
            social_links: {
                website: 'https://example.com',
                linkedin: 'https://linkedin.com/in/demo-user'
            },
            is_active: true
        }
        setProfile(demoProfile)

        return { data: { user: mockUser }, error: null }
    }

    const signOut = async () => {
        setUser(null)
        setProfile(null)
        setSession(null)
        return { error: null }
    }

    const createProfile = async (profileData: Partial<Profile>) => {
        if (!user) return { error: new Error('No user found') }

        const newProfile: Profile = {
            id: user.id,
            email: user.email,
            username: profileData.username || 'demo-user',
            profile_type: profileData.profile_type || 'individual',
            country_code: profileData.country_code || 'us',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            is_active: true,
            ...profileData
        } as Profile

        setProfile(newProfile)
        return { data: newProfile, error: null }
    }

    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user || !profile) return { error: new Error('No user or profile found') }

        const updatedProfile = {
            ...profile,
            ...updates,
            updated_at: new Date().toISOString(),
        }

        setProfile(updatedProfile)
        return { data: updatedProfile, error: null }
    }

    return {
        user,
        profile,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        createProfile,
        updateProfile,
        refreshProfile: () => Promise.resolve(),
    }
}
