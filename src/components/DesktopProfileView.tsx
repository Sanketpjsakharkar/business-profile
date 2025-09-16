'use client'

import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ContactInfo, Profile } from '@/types/profile'
import { addToContacts } from '@/utils/contacts'
import {
    ArrowRight,
    Building2,
    Check,
    Copy,
    Download,
    ExternalLink,
    Facebook,
    Globe,
    Heart,
    Instagram,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    QrCode,
    Share2,
    Shield,
    Star,
    Twitter,
    User,
    Users
} from 'lucide-react'
import { useState } from 'react'

interface DesktopProfileViewProps {
    profile: Profile
}

export function DesktopProfileView({ profile }: DesktopProfileViewProps) {
    const [isAddingContact, setIsAddingContact] = useState(false)
    const [copied, setCopied] = useState(false)
    const [liked, setLiked] = useState(false)

    const displayName = profile.profile_type === 'individual'
        ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username
        : profile.company_name || profile.username

    const handleAddToContacts = async () => {
        setIsAddingContact(true)
        try {
            const contactInfo: ContactInfo = {
                firstName: profile.profile_type === 'individual' ? profile.first_name : undefined,
                lastName: profile.profile_type === 'individual' ? profile.last_name : undefined,
                email: profile.email,
                phone: profile.phone,
                organization: profile.profile_type === 'company' ? profile.company_name : undefined,
                url: window.location.href,
            }
            addToContacts(contactInfo)
        } catch (error) {
            console.error('Error adding to contacts:', error)
        } finally {
            setIsAddingContact(false)
        }
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: displayName,
                    text: `Connect with ${displayName}`,
                    url: window.location.href,
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const socialLinks = (profile.social_links as Record<string, string>) || {}

    return (
        <div className="min-h-screen bg-gradient-to-br from-business-50 to-white">
            {/* Desktop Header */}
            <header className="bg-white/95 backdrop-blur-xl border-b border-business-200 sticky top-0 z-50">
                <div className="container mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-corporate-600 rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-business-900">BusinessProfile</h1>
                                <p className="text-sm text-business-600">Professional Digital Business Card</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                onClick={() => setLiked(!liked)}
                                className={`hover:bg-business-50 ${liked ? 'text-red-500' : 'text-business-400'}`}
                            >
                                <Heart className={`w-5 h-5 mr-2 ${liked ? 'fill-current' : ''}`} />
                                {liked ? 'Liked' : 'Like'}
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleCopyLink}
                                className="border-business-300 text-business-700 hover:bg-business-50"
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4 mr-2 text-success-600" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4 mr-2" />
                                        Copy Link
                                    </>
                                )}
                            </Button>
                            <Button
                                onClick={handleShare}
                                className="bg-corporate-600 hover:bg-corporate-700 text-white"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                Share Profile
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Desktop Main Content */}
            <div className="container mx-auto px-8 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Profile Card */}
                        <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
                            <CardContent className="p-8 text-center">
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <Avatar className="w-40 h-40 mx-auto border-4 border-white shadow-2xl ring-4 ring-business-100">
                                        <AvatarImage src={profile.avatar_url} className="object-cover" />
                                        <AvatarFallback className="text-3xl font-bold bg-corporate-600 text-white">
                                            {profile.profile_type === 'individual'
                                                ? `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`
                                                : profile.company_name?.[0] || 'C'
                                            }
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                        <div className="w-4 h-4 bg-white rounded-full" />
                                    </div>
                                </div>

                                {/* Name & Badge */}
                                <h1 className="text-4xl font-bold text-business-900 mb-4">{displayName}</h1>
                                <Badge className="mb-6 px-6 py-2 text-base bg-corporate-100 text-corporate-800 border-corporate-200">
                                    {profile.profile_type === 'individual' ? (
                                        <><User className="w-4 h-4 mr-2" />Professional</>
                                    ) : (
                                        <><Building2 className="w-4 h-4 mr-2" />Company</>
                                    )}
                                </Badge>

                                {/* Bio */}
                                {profile.profile_type === 'individual' && profile.bio && (
                                    <p className="text-business-600 leading-relaxed mb-8 text-lg">{profile.bio}</p>
                                )}
                                {profile.profile_type === 'company' && profile.business_details && (
                                    <p className="text-business-600 leading-relaxed mb-8 text-lg">{profile.business_details}</p>
                                )}

                                {/* Primary Action */}
                                <Button
                                    onClick={handleAddToContacts}
                                    disabled={isAddingContact}
                                    className="w-full h-16 text-xl font-semibold bg-corporate-600 hover:bg-corporate-700 text-white shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl"
                                >
                                    <Download className="w-6 h-6 mr-3" />
                                    {isAddingContact ? 'Adding to Contacts...' : 'Add to Contacts'}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Stats Card */}
                        <Card className="border-0 shadow-xl bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-business-900 mb-4">Professional Stats</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-corporate-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                            <Users className="w-6 h-6 text-corporate-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-business-900">1.2K</div>
                                        <div className="text-xs text-business-500">Connections</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                            <Star className="w-6 h-6 text-success-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-business-900">4.9</div>
                                        <div className="text-xs text-business-500">Rating</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-business-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                            <Shield className="w-6 h-6 text-business-600" />
                                        </div>
                                        <div className="text-2xl font-bold text-business-900">Pro</div>
                                        <div className="text-xs text-business-500">Member</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Contact & Social */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Contact Information */}
                        <Card className="border-0 shadow-xl bg-white rounded-2xl">
                            <div className="bg-corporate-600 p-6 rounded-t-2xl">
                                <h2 className="text-2xl font-bold text-white flex items-center">
                                    <Mail className="w-7 h-7 mr-3" />
                                    Contact Information
                                </h2>
                                <p className="text-corporate-100 mt-2">Get in touch professionally</p>
                            </div>
                            <CardContent className="p-8">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Email */}
                                    <div className="group cursor-pointer">
                                        <a href={`mailto:${profile.email}`} className="block">
                                            <div className="flex items-center space-x-4 p-6 rounded-xl bg-business-50 hover:bg-business-100 transition-all duration-300 border border-business-200 group-hover:border-corporate-300 group-hover:shadow-lg">
                                                <div className="flex-shrink-0">
                                                    <div className="w-14 h-14 bg-corporate-600 rounded-xl flex items-center justify-center shadow-lg">
                                                        <Mail className="w-7 h-7 text-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-business-500 uppercase tracking-wide">Email</p>
                                                    <p className="text-lg font-bold text-business-900 truncate group-hover:text-corporate-600 transition-colors">
                                                        {profile.email}
                                                    </p>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-business-400 group-hover:text-corporate-600 transition-colors" />
                                            </div>
                                        </a>
                                    </div>

                                    {/* Phone */}
                                    {profile.phone && (
                                        <div className="group cursor-pointer">
                                            <a href={`tel:${profile.phone}`} className="block">
                                                <div className="flex items-center space-x-4 p-6 rounded-xl bg-success-50 hover:bg-success-100 transition-all duration-300 border border-success-200 group-hover:border-success-300 group-hover:shadow-lg">
                                                    <div className="flex-shrink-0">
                                                        <div className="w-14 h-14 bg-success-600 rounded-xl flex items-center justify-center shadow-lg">
                                                            <Phone className="w-7 h-7 text-white" />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-business-500 uppercase tracking-wide">Phone</p>
                                                        <p className="text-lg font-bold text-business-900 group-hover:text-success-600 transition-colors">
                                                            {profile.phone}
                                                        </p>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-business-400 group-hover:text-success-600 transition-colors" />
                                                </div>
                                            </a>
                                        </div>
                                    )}

                                    {/* Address */}
                                    {profile.profile_type === 'individual' && profile.address && (
                                        <div className="md:col-span-2">
                                            <div className="flex items-center space-x-4 p-6 rounded-xl bg-business-50 border border-business-200">
                                                <div className="flex-shrink-0">
                                                    <div className="w-14 h-14 bg-business-600 rounded-xl flex items-center justify-center shadow-lg">
                                                        <MapPin className="w-7 h-7 text-white" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-business-500 uppercase tracking-wide">Address</p>
                                                    <p className="text-lg font-bold text-business-900">{profile.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Social Networks & QR Code */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Social Networks */}
                            {Object.keys(socialLinks).filter(key => socialLinks[key]).length > 0 && (
                                <Card className="border-0 shadow-xl bg-white rounded-2xl">
                                    <div className="bg-business-700 p-6 rounded-t-2xl">
                                        <h2 className="text-xl font-bold text-white flex items-center">
                                            <Globe className="w-6 h-6 mr-3" />
                                            Social Networks
                                        </h2>
                                        <p className="text-business-200 mt-2">Connect professionally</p>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            {Object.keys(socialLinks).filter(key => socialLinks[key]).map((platform) => (
                                                <a
                                                    key={platform}
                                                    href={socialLinks[platform]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group block"
                                                >
                                                    <div className="flex items-center space-x-4 p-4 rounded-xl bg-business-50 hover:bg-business-100 transition-all duration-300 border border-business-200 group-hover:border-business-300 group-hover:shadow-lg">
                                                        {platform === 'linkedin' && <Linkedin className="w-6 h-6 text-blue-600" />}
                                                        {platform === 'twitter' && <Twitter className="w-6 h-6 text-slate-600" />}
                                                        {platform === 'facebook' && <Facebook className="w-6 h-6 text-blue-600" />}
                                                        {platform === 'instagram' && <Instagram className="w-6 h-6 text-pink-600" />}
                                                        {platform === 'website' && <Globe className="w-6 h-6 text-business-600" />}
                                                        <span className="font-semibold text-business-900 capitalize flex-1">{platform}</span>
                                                        <ExternalLink className="w-4 h-4 text-business-400 group-hover:text-business-600 transition-colors" />
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* QR Code */}
                            <Card className="border-0 shadow-xl bg-white rounded-2xl">
                                <div className="bg-corporate-600 p-6 rounded-t-2xl">
                                    <h2 className="text-xl font-bold text-white flex items-center">
                                        <QrCode className="w-6 h-6 mr-3" />
                                        QR Code
                                    </h2>
                                    <p className="text-corporate-100 mt-2">Scan to connect</p>
                                </div>
                                <CardContent className="p-8 text-center">
                                    <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-business-200 p-4">
                                        <QRCodeDisplay
                                            url={typeof window !== 'undefined' ? window.location.href : `https://businessprofile.app/${profile.country_code}/${profile.username}`}
                                            title=""
                                            size={176}
                                            showActions={false}
                                        />
                                    </div>
                                    <p className="text-business-600 text-sm">Scan with your phone to save contact</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
