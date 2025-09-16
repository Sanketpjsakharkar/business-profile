'use client'

import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading'
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
            <main className="flex-1 overflow-y-auto mobile-native-scroll pb-20" role="main">
                {/* Profile Section */}
                {activeSection === 'profile' && (
                    <section className="px-6 py-6 pb-8 space-y-6 animate-slide-up" aria-label="Profile information">
                        {/* Profile Hero Card */}
                        <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden">
                            <CardContent className="p-8 text-center">
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-2xl ring-4 ring-business-100">
                                        <AvatarImage src={profile.avatar_url} className="object-cover" />
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
                    </section>
                )}

                {/* Contact Section */}
                {activeSection === 'contact' && (
                    <section className="px-6 py-6 pb-8 space-y-4 animate-slide-up" aria-label="Contact information">
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
                    </section>
                )}

                {/* Social Section */}
                {activeSection === 'social' && (
                    <section className="px-6 py-6 pb-8 space-y-4 animate-slide-up" aria-label="Social networks">
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
                    </section>
                )}

                {/* QR Section */}
                {activeSection === 'qr' && (
                    <section className="px-6 py-6 pb-8 space-y-6 animate-slide-up" aria-label="Share profile">
                        <h2 className="text-xl font-bold text-business-900 mb-4">Share Profile</h2>

                        <Card className="border-0 shadow-xl bg-white rounded-3xl">
                            <CardContent className="p-8 text-center">
                                <div className="w-64 h-64 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 border border-business-100 p-4">
                                    <QRCodeDisplay
                                        url={typeof window !== 'undefined' ? window.location.href : `http://192.168.1.7:3000/${profile.country_code}/${profile.username}`}
                                        title=""
                                        size={224}
                                        showActions={false}
                                    />
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
                    </section>
                )}
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-business-200 safe-area-bottom" role="navigation" aria-label="Profile navigation">
                <div className="flex items-center justify-around py-2 px-2">
                    {/* Profile Tab */}
                    <button
                        onClick={() => setActiveSection('profile')}
                        aria-label="View profile information"
                        aria-pressed={activeSection === 'profile'}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-all duration-300 rounded-2xl relative focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:ring-offset-2 ${activeSection === 'profile'
                            ? 'text-corporate-600 bg-corporate-50 scale-105'
                            : 'text-business-400 hover:text-business-600 hover:bg-business-50'
                            }`}
                    >
                        <User className={`w-6 h-6 mb-1 transition-transform ${activeSection === 'profile' ? 'scale-110' : ''}`} />
                        <span className="text-xs font-medium">Profile</span>
                        {activeSection === 'profile' && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-corporate-600 rounded-full animate-pulse" />
                        )}
                    </button>

                    {/* Contact Tab */}
                    <button
                        onClick={() => setActiveSection('contact')}
                        aria-label="View contact information"
                        aria-pressed={activeSection === 'contact'}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-all duration-300 rounded-2xl relative focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:ring-offset-2 ${activeSection === 'contact'
                            ? 'text-corporate-600 bg-corporate-50 scale-105'
                            : 'text-business-400 hover:text-business-600 hover:bg-business-50'
                            }`}
                    >
                        <Mail className={`w-6 h-6 mb-1 transition-transform ${activeSection === 'contact' ? 'scale-110' : ''}`} />
                        <span className="text-xs font-medium">Contact</span>
                        {activeSection === 'contact' && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-corporate-600 rounded-full animate-pulse" />
                        )}
                    </button>

                    {/* Center Action Button */}
                    <button
                        onClick={handleAddToContacts}
                        disabled={isAddingContact}
                        aria-label={isAddingContact ? "Adding to contacts..." : "Add to contacts"}
                        className="flex flex-col items-center p-2 mobile-tap mobile-haptic transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:ring-offset-2 disabled:opacity-70"
                    >
                        <div className={`w-14 h-14 bg-gradient-to-r from-corporate-600 to-corporate-700 rounded-2xl flex items-center justify-center shadow-xl mb-1 transition-all duration-300 ${isAddingContact ? 'animate-pulse' : 'hover:shadow-2xl'
                            }`}>
                            {isAddingContact ? (
                                <LoadingSpinner size="md" className="text-white" />
                            ) : (
                                <Plus className="w-8 h-8 text-white" />
                            )}
                        </div>
                        <span className="text-xs font-medium text-corporate-600">Add</span>
                    </button>

                    {/* Social Tab */}
                    <button
                        onClick={() => setActiveSection('social')}
                        aria-label="View social networks"
                        aria-pressed={activeSection === 'social'}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-all duration-300 rounded-2xl relative focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:ring-offset-2 ${activeSection === 'social'
                            ? 'text-corporate-600 bg-corporate-50 scale-105'
                            : 'text-business-400 hover:text-business-600 hover:bg-business-50'
                            }`}
                    >
                        <Globe className={`w-6 h-6 mb-1 transition-transform ${activeSection === 'social' ? 'scale-110' : ''}`} />
                        <span className="text-xs font-medium">Social</span>
                        {activeSection === 'social' && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-corporate-600 rounded-full animate-pulse" />
                        )}
                    </button>

                    {/* QR Tab */}
                    <button
                        onClick={() => setActiveSection('qr')}
                        aria-label="Share profile with QR code"
                        aria-pressed={activeSection === 'qr'}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-all duration-300 rounded-2xl relative focus:outline-none focus:ring-2 focus:ring-corporate-500 focus:ring-offset-2 ${activeSection === 'qr'
                            ? 'text-corporate-600 bg-corporate-50 scale-105'
                            : 'text-business-400 hover:text-business-600 hover:bg-business-50'
                            }`}
                    >
                        <QrCode className={`w-6 h-6 mb-1 transition-transform ${activeSection === 'qr' ? 'scale-110' : ''}`} />
                        <span className="text-xs font-medium">Share</span>
                        {activeSection === 'qr' && (
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-corporate-600 rounded-full animate-pulse" />
                        )}
                    </button>
                </div>
            </nav>
        </div>
    )
}
