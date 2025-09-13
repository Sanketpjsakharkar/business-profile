'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { Profile, SocialLinks } from '@/types/profile'
import { ArrowLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function EditProfilePage() {
    const { user, profile, updateProfile, loading } = useAuth()
    const router = useRouter()

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        phone: '',
        address: '',
        bio: '',
        company_name: '',
        contact_person: '',
        business_details: '',
        social_links: {
            website: '',
            linkedin: '',
            twitter: '',
            facebook: '',
            instagram: '',
        } as SocialLinks
    })

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login')
        }
    }, [user, loading, router])

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.profile_type === 'individual' ? profile.first_name || '' : '',
                last_name: profile.profile_type === 'individual' ? profile.last_name || '' : '',
                phone: profile.phone || '',
                address: profile.profile_type === 'individual' ? profile.address || '' : '',
                bio: profile.profile_type === 'individual' ? profile.bio || '' : '',
                company_name: profile.profile_type === 'company' ? profile.company_name || '' : '',
                contact_person: profile.profile_type === 'company' ? profile.contact_person || '' : '',
                business_details: profile.profile_type === 'company' ? profile.business_details || '' : '',
                social_links: {
                    website: profile.social_links?.website || '',
                    linkedin: profile.social_links?.linkedin || '',
                    twitter: profile.social_links?.twitter || '',
                    facebook: profile.social_links?.facebook || '',
                    instagram: profile.social_links?.instagram || '',
                }
            })
        }
    }, [profile])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        setErrors({})
        setSuccess(false)

        try {
            const updates: Partial<Profile> = {
                ...(profile?.profile_type === 'individual' ? {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    phone: formData.phone || undefined,
                    address: formData.address || undefined,
                    bio: formData.bio || undefined,
                } : {
                    company_name: formData.company_name,
                    contact_person: formData.contact_person || undefined,
                    business_details: formData.business_details || undefined,
                }),
                social_links: formData.social_links
            }

            const { error } = await updateProfile(updates)

            if (error) {
                setErrors({ submit: error.message })
            } else {
                setSuccess(true)
                setTimeout(() => {
                    router.push('/dashboard')
                }, 1500)
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

    if (!user || !profile) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-6">
                        <div className="flex items-center">
                            <Button
                                variant="ghost"
                                onClick={() => router.push('/dashboard')}
                                className="mr-4"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Dashboard
                            </Button>
                            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {success && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                        Profile updated successfully! Redirecting to dashboard...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                            <CardDescription>
                                Update your {profile.profile_type} profile information
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {profile.profile_type === 'individual' ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="first_name" className="text-sm font-medium">
                                                First Name
                                            </label>
                                            <Input
                                                id="first_name"
                                                value={formData.first_name}
                                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="last_name" className="text-sm font-medium">
                                                Last Name
                                            </label>
                                            <Input
                                                id="last_name"
                                                value={formData.last_name}
                                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium">
                                            Phone Number
                                        </label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="address" className="text-sm font-medium">
                                            Address
                                        </label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="bio" className="text-sm font-medium">
                                            Bio
                                        </label>
                                        <textarea
                                            id="bio"
                                            rows={4}
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.bio}
                                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                            placeholder="Tell people about yourself..."
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <label htmlFor="company_name" className="text-sm font-medium">
                                            Company Name
                                        </label>
                                        <Input
                                            id="company_name"
                                            value={formData.company_name}
                                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="contact_person" className="text-sm font-medium">
                                            Contact Person
                                        </label>
                                        <Input
                                            id="contact_person"
                                            value={formData.contact_person}
                                            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="business_details" className="text-sm font-medium">
                                            Business Details
                                        </label>
                                        <textarea
                                            id="business_details"
                                            rows={4}
                                            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            value={formData.business_details}
                                            onChange={(e) => setFormData({ ...formData, business_details: e.target.value })}
                                            placeholder="Describe your business..."
                                        />
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Social Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Links</CardTitle>
                            <CardDescription>
                                Add your social media and website links
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="website" className="text-sm font-medium">
                                        Website
                                    </label>
                                    <Input
                                        id="website"
                                        type="url"
                                        placeholder="https://example.com"
                                        value={formData.social_links.website}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, website: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="linkedin" className="text-sm font-medium">
                                        LinkedIn
                                    </label>
                                    <Input
                                        id="linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/username"
                                        value={formData.social_links.linkedin}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, linkedin: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="twitter" className="text-sm font-medium">
                                        Twitter
                                    </label>
                                    <Input
                                        id="twitter"
                                        type="url"
                                        placeholder="https://twitter.com/username"
                                        value={formData.social_links.twitter}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, twitter: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="facebook" className="text-sm font-medium">
                                        Facebook
                                    </label>
                                    <Input
                                        id="facebook"
                                        type="url"
                                        placeholder="https://facebook.com/username"
                                        value={formData.social_links.facebook}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, facebook: e.target.value }
                                        })}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor="instagram" className="text-sm font-medium">
                                        Instagram
                                    </label>
                                    <Input
                                        id="instagram"
                                        type="url"
                                        placeholder="https://instagram.com/username"
                                        value={formData.social_links.instagram}
                                        onChange={(e) => setFormData({
                                            ...formData,
                                            social_links: { ...formData.social_links, instagram: e.target.value }
                                        })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {errors.submit && (
                        <div className="text-red-600 text-sm text-center">
                            {errors.submit}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <Button type="submit" disabled={submitting} className="min-w-[120px]">
                            {submitting ? (
                                'Saving...'
                            ) : (
                                <>
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}
