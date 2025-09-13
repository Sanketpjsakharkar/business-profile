'use client'

import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { generateProfileUrl } from '@/utils/qr'
import {
    BarChart3,
    Bell,
    Check,
    Copy,
    Edit,
    ExternalLink,
    Eye,
    Home,
    LogOut,
    Plus,
    QrCode,
    Settings,
    Share2,
    Shield,
    Star,
    TrendingUp,
    Users
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function MobileDashboard() {
    const { user, profile, signOut } = useAuth()
    const [activeSection, setActiveSection] = useState('home')
    const [copied, setCopied] = useState(false)
    const router = useRouter()

    if (!user || !profile) return null

    const displayName = profile.profile_type === 'individual'
        ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.username
        : profile.company_name || profile.username

    const profileUrl = generateProfileUrl(profile.country_code, profile.username)

    const handleSignOut = async () => {
        await signOut()
        router.push('/')
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(profileUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-business-50 relative overflow-hidden">
            {/* Mobile App Header */}
            <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-business-200 safe-area-top">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 ring-2 ring-business-200 shadow-lg">
                            <AvatarImage src="" />
                            <AvatarFallback className="text-sm font-bold bg-corporate-600 text-white">
                                {profile.profile_type === 'individual'
                                    ? `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`
                                    : profile.company_name?.[0] || 'C'
                                }
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-lg font-bold text-business-900 leading-tight">{displayName}</h1>
                            <Badge variant="secondary" className="text-xs bg-corporate-100 text-corporate-800 border-corporate-200">
                                {profile.profile_type === 'individual' ? 'Professional' : 'Company'}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="mobile-tap mobile-haptic p-2 text-business-600"
                        >
                            <Bell className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSignOut}
                            className="mobile-tap mobile-haptic p-2 text-business-600"
                        >
                            <LogOut className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile App Content */}
            <div className="pb-24 safe-area-bottom">
                {/* Home Section */}
                {activeSection === 'home' && (
                    <div className="px-6 py-6 space-y-6 animate-slide-up">
                        {/* Welcome Card */}
                        <Card className="border-0 shadow-xl bg-gradient-to-r from-corporate-600 to-business-700 rounded-3xl overflow-hidden">
                            <CardContent className="p-8 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
                                        <p className="text-corporate-100">Your profile is performing great</p>
                                    </div>
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <TrendingUp className="w-8 h-8 text-white" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-corporate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <Eye className="w-6 h-6 text-corporate-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-business-900">1,247</div>
                                    <div className="text-sm text-business-500">Profile Views</div>
                                    <div className="text-xs text-success-600 mt-1 flex items-center justify-center">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        +12%
                                    </div>
                                </CardContent>
                            </Card>
                            <Card className="border-0 shadow-lg bg-white rounded-2xl mobile-card-press mobile-tap">
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                        <Users className="w-6 h-6 text-success-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-business-900">89</div>
                                    <div className="text-sm text-business-500">Contact Saves</div>
                                    <div className="text-xs text-success-600 mt-1 flex items-center justify-center">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        +23%
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Quick Actions */}
                        <Card className="border-0 shadow-xl bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-business-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start mobile-tap mobile-haptic h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-corporate-300 transition-all duration-300"
                                        onClick={() => window.open(profileUrl, '_blank')}
                                    >
                                        <ExternalLink className="w-5 h-5 mr-3 text-corporate-600" />
                                        View Public Profile
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start mobile-tap mobile-haptic h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-success-300 transition-all duration-300"
                                        onClick={() => router.push('/profile/edit')}
                                    >
                                        <Edit className="w-5 h-5 mr-3 text-success-600" />
                                        Edit Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Profile Status */}
                        <Card className="border-0 shadow-lg bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-success-600" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-business-900">Profile Complete</div>
                                            <div className="text-sm text-business-600">92% completion rate</div>
                                        </div>
                                    </div>
                                    <Badge className="bg-success-100 text-success-800 border-success-200">
                                        <div className="w-2 h-2 bg-success-500 rounded-full mr-2" />
                                        Active
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Analytics Section */}
                {activeSection === 'analytics' && (
                    <div className="px-6 py-6 space-y-6 animate-slide-up">
                        <h2 className="text-xl font-bold text-business-900 mb-4">Analytics Overview</h2>

                        {/* Detailed Stats */}
                        <div className="space-y-4">
                            <Card className="border-0 shadow-lg bg-white rounded-2xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-corporate-100 rounded-xl flex items-center justify-center">
                                                <Eye className="w-5 h-5 text-corporate-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-business-900">Profile Views</div>
                                                <div className="text-sm text-business-600">Last 30 days</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-business-900">1,247</div>
                                            <div className="text-xs text-success-600 flex items-center">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +12% vs last month
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-business-100 rounded-full h-2">
                                        <div className="bg-corporate-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-white rounded-2xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-business-100 rounded-xl flex items-center justify-center">
                                                <QrCode className="w-5 h-5 text-business-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-business-900">QR Scans</div>
                                                <div className="text-sm text-business-600">Last 30 days</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-business-900">342</div>
                                            <div className="text-xs text-success-600 flex items-center">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +8% vs last month
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-business-100 rounded-full h-2">
                                        <div className="bg-business-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg bg-white rounded-2xl">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 bg-success-100 rounded-xl flex items-center justify-center">
                                                <Users className="w-5 h-5 text-success-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-business-900">Contact Saves</div>
                                                <div className="text-sm text-business-600">Last 30 days</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-business-900">89</div>
                                            <div className="text-xs text-success-600 flex items-center">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +23% vs last month
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-business-100 rounded-full h-2">
                                        <div className="bg-success-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Performance Score */}
                        <Card className="border-0 shadow-xl bg-gradient-to-r from-success-500 to-success-600 rounded-2xl">
                            <CardContent className="p-6 text-white">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">Performance Score</h3>
                                        <p className="text-success-100 text-sm">Your profile is performing excellently</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold">92%</div>
                                        <div className="flex items-center text-success-100 text-sm">
                                            <Star className="w-4 h-4 mr-1" />
                                            Excellent
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Share Section */}
                {activeSection === 'share' && (
                    <div className="px-6 py-6 space-y-6 animate-slide-up">
                        <h2 className="text-xl font-bold text-business-900 mb-4">Share Your Profile</h2>

                        {/* QR Code Card */}
                        <Card className="border-0 shadow-xl bg-white rounded-3xl">
                            <CardContent className="p-8 text-center">
                                <div className="bg-business-50 p-6 rounded-2xl mb-6 border border-business-200">
                                    <QRCodeDisplay
                                        url={profileUrl}
                                        title={displayName}
                                        size={240}
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-business-900 mb-2">Scan to Connect</h3>
                                <p className="text-business-600 mb-6">Share this QR code to instantly connect</p>
                                <Button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: displayName,
                                                text: `Connect with ${displayName} - Professional Digital Business Card`,
                                                url: profileUrl,
                                            })
                                        }
                                    }}
                                    className="w-full h-14 text-lg font-semibold mobile-tap mobile-haptic bg-corporate-600 hover:bg-corporate-700 text-white shadow-lg rounded-2xl"
                                >
                                    <Share2 className="w-5 h-5 mr-3" />
                                    Share Profile
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Share Options */}
                        <Card className="border-0 shadow-lg bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-business-900 mb-4">Share Options</h3>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full h-14 text-base font-semibold mobile-tap mobile-haptic border-2 border-business-200 hover:bg-business-50 hover:border-corporate-300 transition-all duration-300"
                                        onClick={handleCopyLink}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-5 h-5 mr-3 text-success-600" />
                                                Link Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-5 h-5 mr-3 text-corporate-600" />
                                                Copy Profile Link
                                            </>
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full h-14 text-base font-semibold mobile-tap mobile-haptic border-2 border-business-200 hover:bg-business-50 hover:border-business-300 transition-all duration-300"
                                        onClick={() => window.open(profileUrl, '_blank')}
                                    >
                                        <ExternalLink className="w-5 h-5 mr-3 text-business-600" />
                                        View Public Profile
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Profile URL */}
                        <Card className="border-0 shadow-lg bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <h3 className="text-sm font-semibold text-business-600 uppercase tracking-wide mb-3">Your Profile URL</h3>
                                <div className="p-4 bg-business-50 rounded-xl border border-business-200">
                                    <p className="text-sm text-business-700 break-all font-mono">{profileUrl}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Settings Section */}
                {activeSection === 'settings' && (
                    <div className="px-6 py-6 space-y-6 animate-slide-up">
                        <h2 className="text-xl font-bold text-business-900 mb-4">Settings</h2>

                        {/* Profile Settings */}
                        <Card className="border-0 shadow-lg bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-business-900 mb-4">Profile Settings</h3>
                                <div className="space-y-3">
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start mobile-tap mobile-haptic h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-corporate-300 transition-all duration-300"
                                        onClick={() => router.push('/profile/edit')}
                                    >
                                        <Edit className="w-5 h-5 mr-3 text-corporate-600" />
                                        Edit Profile Information
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-start mobile-tap mobile-haptic h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-business-300 transition-all duration-300"
                                    >
                                        <Shield className="w-5 h-5 mr-3 text-business-600" />
                                        Privacy Settings
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Account Info */}
                        <Card className="border-0 shadow-lg bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-business-900 mb-4">Account Information</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-business-50 rounded-xl border border-business-200">
                                        <span className="text-sm font-semibold text-business-600 uppercase tracking-wide">Username</span>
                                        <Badge variant="outline" className="font-semibold border-business-300 text-business-700">{profile.username}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-business-50 rounded-xl border border-business-200">
                                        <span className="text-sm font-semibold text-business-600 uppercase tracking-wide">Country</span>
                                        <Badge variant="outline" className="font-semibold border-business-300 text-business-700">{profile.country_code.toUpperCase()}</Badge>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-business-50 rounded-xl border border-business-200">
                                        <span className="text-sm font-semibold text-business-600 uppercase tracking-wide">Type</span>
                                        <Badge className="bg-corporate-600 hover:bg-corporate-700 text-white">{profile.profile_type}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Sign Out */}
                        <Card className="border-0 shadow-lg bg-white rounded-2xl">
                            <CardContent className="p-6">
                                <Button
                                    variant="outline"
                                    className="w-full h-14 text-base font-semibold mobile-tap mobile-haptic border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    Sign Out
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-business-200 safe-area-bottom">
                <div className="flex items-center justify-around py-2">
                    {/* Home Tab */}
                    <button
                        onClick={() => setActiveSection('home')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'home' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <Home className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Home</span>
                    </button>

                    {/* Analytics Tab */}
                    <button
                        onClick={() => setActiveSection('analytics')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'analytics' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <BarChart3 className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Analytics</span>
                    </button>

                    {/* Center Action Button */}
                    <button
                        onClick={() => router.push('/profile/edit')}
                        className="flex flex-col items-center p-2 mobile-tap mobile-haptic"
                    >
                        <div className="w-14 h-14 bg-corporate-600 rounded-2xl flex items-center justify-center shadow-xl mb-1">
                            <Plus className="w-8 h-8 text-white" />
                        </div>
                        <span className="text-xs font-medium text-corporate-600">Edit</span>
                    </button>

                    {/* Share Tab */}
                    <button
                        onClick={() => setActiveSection('share')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'share' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <Share2 className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Share</span>
                    </button>

                    {/* Settings Tab */}
                    <button
                        onClick={() => setActiveSection('settings')}
                        className={`flex flex-col items-center p-3 mobile-tap mobile-haptic transition-colors ${activeSection === 'settings' ? 'text-corporate-600' : 'text-business-400'}`}
                    >
                        <Settings className="w-6 h-6 mb-1" />
                        <span className="text-xs font-medium">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
