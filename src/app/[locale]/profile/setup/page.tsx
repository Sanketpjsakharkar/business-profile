'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { ProfileType } from '@/types/profile'
import { isValidCountryCode, isValidUsername } from '@/utils/qr'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function ProfileSetupContent() {
    const searchParams = useSearchParams()
    const profileType = (searchParams.get('type') as ProfileType) || 'individual'

    const { user, createProfile, loading } = useAuth()
    const router = useRouter()

    const [formData, setFormData] = useState({
        username: '',
        country_code: 'us',
        first_name: '',
        last_name: '',
        phone: '',
        company_name: '',
        contact_person: '',
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login')
        }
    }, [user, loading, router])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.username) {
            newErrors.username = 'Username is required'
        } else if (!isValidUsername(formData.username)) {
            newErrors.username = 'Username must be 3-30 characters, alphanumeric and underscores only'
        }

        if (!formData.country_code) {
            newErrors.country_code = 'Country code is required'
        } else if (!isValidCountryCode(formData.country_code)) {
            newErrors.country_code = 'Invalid country code'
        }

        if (profileType === 'individual') {
            if (!formData.first_name) {
                newErrors.first_name = 'First name is required'
            }
            if (!formData.last_name) {
                newErrors.last_name = 'Last name is required'
            }
        } else {
            if (!formData.company_name) {
                newErrors.company_name = 'Company name is required'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setSubmitting(true)

        try {
            const profileData = {
                username: formData.username,
                country_code: formData.country_code.toLowerCase(),
                profile_type: profileType,
                is_active: true,
                ...(profileType === 'individual' ? {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone: formData.phone || undefined,
                } : {
                    company_name: formData.company_name,
                    contact_person: formData.contact_person || undefined,
                })
            }

            const { error } = await createProfile(profileData)

            if (error) {
                setErrors({ submit: error.message })
            } else {
                router.push('/dashboard')
            }
        } catch {
            setErrors({ submit: 'An unexpected error occurred' })
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-2xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">
                        Complete Your Profile
                    </CardTitle>
                    <CardDescription className="text-center">
                        Set up your {profileType} profile to get started
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-sm font-medium">
                                    Username *
                                </label>
                                <Input
                                    id="username"
                                    placeholder="johndoe"
                                    value={formData.username}
                                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                />
                                {errors.username && (
                                    <p className="text-red-600 text-sm">{errors.username}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="country_code" className="text-sm font-medium">
                                    Country Code *
                                </label>
                                <Input
                                    id="country_code"
                                    placeholder="us"
                                    maxLength={2}
                                    value={formData.country_code}
                                    onChange={(e) => setFormData({ ...formData, country_code: e.target.value })}
                                />
                                {errors.country_code && (
                                    <p className="text-red-600 text-sm">{errors.country_code}</p>
                                )}
                            </div>
                        </div>

                        {/* Profile Type Specific Fields */}
                        {profileType === 'individual' ? (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="first_name" className="text-sm font-medium">
                                            First Name *
                                        </label>
                                        <Input
                                            id="first_name"
                                            placeholder="John"
                                            value={formData.first_name}
                                            onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                        />
                                        {errors.first_name && (
                                            <p className="text-red-600 text-sm">{errors.first_name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="last_name" className="text-sm font-medium">
                                            Last Name *
                                        </label>
                                        <Input
                                            id="last_name"
                                            placeholder="Doe"
                                            value={formData.last_name}
                                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                        />
                                        {errors.last_name && (
                                            <p className="text-red-600 text-sm">{errors.last_name}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium">
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Company Information</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="company_name" className="text-sm font-medium">
                                            Company Name *
                                        </label>
                                        <Input
                                            id="company_name"
                                            placeholder="Acme Corporation"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                        />
                                        {errors.company_name && (
                                            <p className="text-red-600 text-sm">{errors.company_name}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contact_person" className="text-sm font-medium">
                                            Contact Person
                                        </label>
                                        <Input
                                            id="contact_person"
                                            placeholder="John Doe"
                                            value={formData.contact_person}
                                            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {errors.submit && (
                            <div className="text-red-600 text-sm text-center">
                                {errors.submit}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={submitting}>
                            {submitting ? 'Creating Profile...' : 'Complete Setup'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default function ProfileSetupPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <ProfileSetupContent />
        </Suspense>
    )
}
