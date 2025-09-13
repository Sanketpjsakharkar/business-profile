'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ContactInfo, Profile } from '@/types/profile'
import { addToContacts } from '@/utils/contacts'
import {
    ArrowRight,
    Building2,
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
    Plus,
    QrCode,
    Share2,
    Shield,
    Star,
    Twitter,
    User,
    Users
} from 'lucide-react'
import { useState } from 'react'

interface MobileProfileViewProps {
    profile: Profile
}

export function MobileProfileView({ profile }: MobileProfileViewProps) {
    const [isAddingContact, setIsAddingContact] = useState(false)
    const [liked, setLiked] = useState(false)
    const [activeSection, setActiveSection] = useState('profile')

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
        }
    }

    const socialLinks = (profile.social_links as Record<string, string>) || {}

    return (
        <div className="h-screen bg-business-50 flex flex-col overflow-hidden">
            {/* Mobile App Header */}
            <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl border-b border-business-200 safe-area-top">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-corporate-600 rounded-lg flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-business-900">Profile</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setLiked(!liked)}
                            className={`mobile-tap mobile-haptic p-2 ${liked ? 'text-red-500' : 'text-business-400'}`}
                        >
                            <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleShare}
                            className="mobile-tap mobile-haptic p-2 text-business-600"
                        >
                            <Share2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile App Content */}
            <div className="flex-1 overflow-y-auto mobile-native-scroll pb-20">
                {/* Profile Section */}
                {activeSection === 'profile' && (
                    <div className="px-6 py-6 pb-8 space-y-6 animate-slide-up">
                        {/* Profile Hero Card */}
                        <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
                            <CardContent className="p-8 text-center">
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-2xl ring-4 ring-business-100">
                                        <AvatarImage src="" className="object-cover" />
                                        <AvatarFallback className="text-2xl font-bold bg-corporate-600 text-white">
                                            {profile.profile_type === 'individual'
                                                ? `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`
                                                : profile.company_name?.[0] || 'C'
                                            }
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                                        <div className="w-3 h-3 bg-white rounded-full" />
                                    </div>
                                </div>

                                {/* Name & Badge */}
                                <h1 className="text-3xl font-bold text-business-900 mb-3">{displayName}</h1>
                                <Badge className="mb-4 px-4 py-2 bg-corporate-100 text-corporate-800 border-corporate-200">
                                    {profile.profile_type === 'individual' ? (
                                        <><User className="w-4 h-4 mr-2" />Professional</>
                                    ) : (
                                        <><Building2 className="w-4 h-4 mr-2" />Company</>
                                    )}
                                </Badge>

                                {/* Bio */}
                                {profile.profile_type === 'individual' && profile.bio && (
                                    <p className="text-business-600 leading-relaxed mb-6">{profile.bio}</p>
                                )}
                                {profile.profile_type === 'company' && profile.business_details && (
                                    <p className="text-business-600 leading-relaxed mb-6">{profile.business_details}</p>
                                )}

                                {/* Primary Action */}
                                <Button
                                    onClick={handleAddToContacts}
                                    disabled={isAddingContact}
                                    className="w-full h-14 text-lg font-semibold mobile-tap mobile-haptic bg-corporate-600 hover:bg-corporate-700 text-white shadow-lg rounded-2xl"
                                >
                                    <Download className="w-5 h-5 mr-3" />
                                    {isAddingContact ? 'Adding...' : 'Add to Contacts'}
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                                <CardContent className="p-4 text-center">
                                    <div className="w-10 h-10 bg-corporate-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Users className="w-5 h-5 text-corporate-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-business-900">1.2K</div>
                                    <div className="text-xs text-business-500">Connections</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                                <CardContent className="p-4 text-center">
                                    <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Star className="w-5 h-5 text-success-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-business-900">4.9</div>
                                    <div className="text-xs text-business-500">Rating</div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                                <CardContent className="p-4 text-center">
                                    <div className="w-10 h-10 bg-business-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                                        <Shield className="w-5 h-5 text-business-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-business-900">Pro</div>
                                    <div className="text-xs text-business-500">Member</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Contact Section */}
                {activeSection === 'contact' && (
                    <div className="px-6 py-6 pb-8 space-y-4 animate-slide-up">
                        <h2 className="text-xl font-bold text-business-900 mb-4">Contact Information</h2>

                        {/* Email Card */}
                        <Card className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                            <CardContent className="p-0">
                                <a href={`mailto:${profile.email}`} className="flex items-center p-6 space-x-4">
                                    <div className="w-12 h-12 bg-corporate-600 rounded-xl flex items-center justify-center">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-business-900">Email</div>
                                        <div className="text-business-600">{profile.email}</div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-business-400" />
                                </a>
                            </CardContent>
                        </Card>

                        {/* Phone Card */}
                        {profile.phone && (
                            <Card className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                                <CardContent className="p-0">
                                    <a href={`tel:${profile.phone}`} className="flex items-center p-6 space-x-4">
                                        <div className="w-12 h-12 bg-success-600 rounded-xl flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-business-900">Phone</div>
                                            <div className="text-business-600">{profile.phone}</div>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-business-400" />
                                    </a>
                                </CardContent>
                            </Card>
                        )}

                        {/* Address Card */}
                        {profile.profile_type === 'individual' && profile.address && (
                            <Card className="border-0 shadow-lg bg-white rounded-2xl">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-business-600 rounded-xl flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-business-900 mb-1">Address</div>
                                            <div className="text-business-600">{profile.address}</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Social Section */}
                {activeSection === 'social' && (
                    <div className="px-6 py-6 pb-8 space-y-4 animate-slide-up">
                        <h2 className="text-xl font-bold text-business-900 mb-4">Social Networks</h2>

                        {Object.keys(socialLinks).filter(key => socialLinks[key]).map((platform) => (
                            <Card key={platform} className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                                <CardContent className="p-0">
                                    <a href={socialLinks[platform]} target="_blank" rel="noopener noreferrer" className="flex items-center p-6 space-x-4">
                                        <div className="w-12 h-12 bg-corporate-600 rounded-xl flex items-center justify-center">
                                            {platform === 'linkedin' && <Linkedin className="w-6 h-6 text-white" />}
                                            {platform === 'twitter' && <Twitter className="w-6 h-6 text-white" />}
                                            {platform === 'facebook' && <Facebook className="w-6 h-6 text-white" />}
                                            {platform === 'instagram' && <Instagram className="w-6 h-6 text-white" />}
                                            {platform === 'website' && <Globe className="w-6 h-6 text-white" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-semibold text-business-900 capitalize">{platform}</div>
                                            <div className="text-business-600 text-sm">Connect with me</div>
                                        </div>
                                        <ExternalLink className="w-5 h-5 text-business-400" />
                                    </a>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* QR Section */}
                {activeSection === 'qr' && (
                    <div className="px-6 py-6 pb-8 space-y-6 animate-slide-up">
                        <h2 className="text-xl font-bold text-business-900 mb-4">Share Profile</h2>

                        <Card className="border-0 shadow-xl bg-white rounded-3xl">
                            <CardContent className="p-8 text-center">
                                <div className="w-64 h-64 bg-business-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <QrCode className="w-32 h-32 text-corporate-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-business-900 mb-2">Scan to Connect</h3>
                                <p className="text-business-600 mb-6">Share this QR code to instantly connect</p>
                                <Button
                                    onClick={handleShare}
                                    className="w-full h-14 text-lg font-semibold mobile-tap mobile-haptic bg-corporate-600 hover:bg-corporate-700 text-white shadow-lg rounded-2xl"
                                >
                                    <Share2 className="w-5 h-5 mr-3" />
                                    Share Profile
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-business-200 safe-area-bottom">
                <div className="flex items-center justify-around py-2">
                    {/* Profile Tab */}
                    <button
                        onClick={() => setActiveSection('profile')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'profile' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <User className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Profile</span>
                    </button>

                    {/* Contact Tab */}
                    <button
                        onClick={() => setActiveSection('contact')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'contact' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <Mail className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Contact</span>
                    </button>

                    {/* Center Action Button */}
                    <button
                        onClick={handleAddToContacts}
                        disabled={isAddingContact}
                        className="flex flex-col items-center p-2 mobile-tap mobile-haptic"
                    >
                        <div className="w-14 h-14 bg-corporate-600 rounded-2xl flex items-center justify-center shadow-xl mb-1">
                            {isAddingContact ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Plus className="w-8 h-8 text-white" />
                            )}
                        </div>
                        <span className="text-xs font-medium text-corporate-600">Add</span>
                    </button>

                    {/* Social Tab */}
                    <button
                        onClick={() => setActiveSection('social')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'social' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <Globe className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Social</span>
                    </button>

                    {/* QR Tab */}
                    <button
                        onClick={() => setActiveSection('qr')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'qr' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <QrCode className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Share</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
