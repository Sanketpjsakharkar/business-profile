'use client'

import { Profile } from '@/types/profile'
import { useEffect, useState } from 'react'

// DEMO MODE - Replace with real implementation after setting up Supabase
export function useAuth() {
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true) // Start with loading true
    const [session, setSession] = useState<any>(null)

    // Load persisted auth state on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem('demo-user')
            const savedProfile = localStorage.getItem('demo-profile')

            if (savedUser && savedProfile) {
                try {
                    const user = JSON.parse(savedUser)
                    const profile = JSON.parse(savedProfile)
                    setUser(user)
                    setProfile(profile)
                    setSession({ user })
                } catch (error) {
                    console.error('Error parsing saved auth data:', error)
                    // Clear corrupted data
                    localStorage.removeItem('demo-user')
                    localStorage.removeItem('demo-profile')
                }
            }
        }
        setLoading(false)
    }, [])

    const signUp = async (email: string, password: string) => {
        // Simulate signup
        const mockUser = {
            id: 'demo-user-id',
            email,
            created_at: new Date().toISOString()
        }
        setUser(mockUser)
        setSession({ user: mockUser })

        // Persist to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('demo-user', JSON.stringify(mockUser))
        }

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

        // Persist to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('demo-user', JSON.stringify(mockUser))
            localStorage.setItem('demo-profile', JSON.stringify(demoProfile))
        }

        return { data: { user: mockUser }, error: null }
    }

    const signOut = async () => {
        setUser(null)
        setProfile(null)
        setSession(null)

        // Clear localStorage
        if (typeof window !== 'undefined') {
            localStorage.removeItem('demo-user')
            localStorage.removeItem('demo-profile')
        }

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

        // Persist to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('demo-profile', JSON.stringify(newProfile))
        }

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

        // Persist to localStorage
        if (typeof window !== 'undefined') {
            localStorage.setItem('demo-profile', JSON.stringify(updatedProfile))
        }

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
