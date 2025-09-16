'use client'

import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { AnalyticsDashboard } from '@/components/dashboard/AnalyticsDashboard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { generateProfileUrl } from '@/utils/qr'
import {
    Activity,
    BarChart3,
    Bell,
    Building2,
    Check,
    Copy,
    Download,
    Edit,
    ExternalLink,
    Eye,
    Globe,
    Home,
    LogOut,
    QrCode,
    Search,
    Settings,
    Share2,
    Shield,
    Star,
    TrendingUp,
    User,
    Users,
    Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DesktopDashboard() {
    const { user, profile, signOut } = useAuth()
    const [copied, setCopied] = useState(false)
    const [activeView, setActiveView] = useState('overview')
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

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: Home },
        { id: 'search', label: 'Search Profiles', icon: Search, action: () => router.push('/search') },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'share', label: 'Share & QR', icon: Share2 },
        { id: 'settings', label: 'Settings', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-business-50 to-white flex">
            {/* Sidebar Navigation */}
            <div className="w-64 bg-white border-r border-business-200 shadow-lg flex flex-col">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-business-200">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-corporate-600 rounded-xl flex items-center justify-center">
                            <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-business-900">BusinessProfile</h1>
                            <p className="text-sm text-business-600">Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="p-6 border-b border-business-200">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12 ring-2 ring-business-200 shadow-lg">
                                <AvatarImage src={profile.avatar_url} />
                                <AvatarFallback className="text-sm font-bold bg-corporate-600 text-white">
                                    {profile.profile_type === 'individual'
                                        ? `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`
                                        : profile.company_name?.[0] || 'C'
                                    }
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-2 border-white shadow-sm" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-sm font-semibold text-business-900 truncate">{displayName}</h2>
                            <Badge variant="secondary" className="text-xs bg-corporate-100 text-corporate-800 border-corporate-200 mt-1">
                                {profile.profile_type === 'individual' ? 'Professional' : 'Company'}
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => item.action ? item.action() : setActiveView(item.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${activeView === item.id
                                            ? 'bg-corporate-600 text-white shadow-lg'
                                            : 'text-business-600 hover:bg-business-50 hover:text-corporate-600'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-business-200">
                    <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full justify-start text-business-600 hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Header */}
                <header className="bg-white border-b border-business-200 shadow-sm">
                    <div className="flex items-center justify-between px-8 py-6">
                        <div>
                            <h1 className="text-2xl font-bold text-business-900 capitalize">{activeView}</h1>
                            <p className="text-business-600 mt-1">
                                {activeView === 'overview' && 'Welcome back! Here\'s your profile overview'}
                                {activeView === 'analytics' && 'Detailed analytics and performance metrics'}
                                {activeView === 'profile' && 'Manage your profile information'}
                                {activeView === 'share' && 'Share your profile and QR code'}
                                {activeView === 'settings' && 'Account settings and preferences'}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" className="hover:bg-business-50">
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </Button>
                            <Button variant="ghost" className="hover:bg-business-50">
                                <Bell className="w-4 h-4" />
                            </Button>
                            <Button
                                onClick={() => window.open(profileUrl, '_blank')}
                                className="bg-corporate-600 hover:bg-corporate-700 text-white"
                            >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Profile
                            </Button>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-8 overflow-auto">
                    {/* Overview Section */}
                    {activeView === 'overview' && (
                        <div className="space-y-8">
                            {/* Welcome Card */}
                            <Card className="border-0 shadow-xl bg-gradient-to-r from-corporate-600 to-business-700 rounded-2xl overflow-hidden">
                                <CardContent className="p-8 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-2">Welcome back, {displayName.split(' ')[0]}!</h2>
                                            <p className="text-corporate-100 text-lg">Your profile is performing excellently with 92% completion</p>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">1.2K</div>
                                                <div className="text-corporate-100 text-sm">Views</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold">89</div>
                                                <div className="text-corporate-100 text-sm">Saves</div>
                                            </div>
                                            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
                                                <TrendingUp className="w-10 h-10 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-corporate-100 rounded-xl flex items-center justify-center group-hover:bg-corporate-600 group-hover:text-white transition-colors">
                                                <Eye className="w-6 h-6 text-corporate-600 group-hover:text-white" />
                                            </div>
                                            <Badge className="bg-success-100 text-success-800 border-success-200">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +12%
                                            </Badge>
                                        </div>
                                        <div className="text-2xl font-bold text-business-900 mb-1">1,247</div>
                                        <div className="text-sm text-business-600">Profile Views</div>
                                        <div className="text-xs text-business-500 mt-2">Last 30 days</div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-business-100 rounded-xl flex items-center justify-center group-hover:bg-business-600 group-hover:text-white transition-colors">
                                                <QrCode className="w-6 h-6 text-business-600 group-hover:text-white" />
                                            </div>
                                            <Badge className="bg-success-100 text-success-800 border-success-200">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +8%
                                            </Badge>
                                        </div>
                                        <div className="text-2xl font-bold text-business-900 mb-1">342</div>
                                        <div className="text-sm text-business-600">QR Scans</div>
                                        <div className="text-xs text-business-500 mt-2">Last 30 days</div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center group-hover:bg-success-600 group-hover:text-white transition-colors">
                                                <Users className="w-6 h-6 text-success-600 group-hover:text-white" />
                                            </div>
                                            <Badge className="bg-success-100 text-success-800 border-success-200">
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                                +23%
                                            </Badge>
                                        </div>
                                        <div className="text-2xl font-bold text-business-900 mb-1">89</div>
                                        <div className="text-sm text-business-600">Contact Saves</div>
                                        <div className="text-xs text-business-500 mt-2">Last 30 days</div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300 group">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                                                <Star className="w-6 h-6 text-yellow-600 group-hover:text-white" />
                                            </div>
                                            <Badge className="bg-success-100 text-success-800 border-success-200">
                                                Excellent
                                            </Badge>
                                        </div>
                                        <div className="text-2xl font-bold text-business-900 mb-1">92%</div>
                                        <div className="text-sm text-business-600">Profile Score</div>
                                        <div className="text-xs text-business-500 mt-2">Completion rate</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Action Cards Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Quick Actions */}
                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-corporate-600 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <Zap className="w-6 h-6 mr-3" />
                                            Quick Actions
                                        </CardTitle>
                                    </div>
                                    <CardContent className="p-6 space-y-4">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start h-12 border-2 border-business-200 hover:bg-business-50 hover:border-corporate-300 transition-all duration-300"
                                            onClick={() => router.push('/profile/edit')}
                                        >
                                            <Edit className="w-5 h-5 mr-3 text-corporate-600" />
                                            Edit Profile
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start h-12 border-2 border-business-200 hover:bg-business-50 hover:border-success-300 transition-all duration-300"
                                            onClick={handleCopyLink}
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-5 h-5 mr-3 text-success-600" />
                                                    Link Copied!
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-5 h-5 mr-3 text-success-600" />
                                                    Copy Profile Link
                                                </>
                                            )}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start h-12 border-2 border-business-200 hover:bg-business-50 hover:border-business-300 transition-all duration-300"
                                            onClick={() => setActiveView('share')}
                                        >
                                            <Share2 className="w-5 h-5 mr-3 text-business-600" />
                                            Share Profile
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Profile Status */}
                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-business-700 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <Shield className="w-6 h-6 mr-3" />
                                            Profile Status
                                        </CardTitle>
                                    </div>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-business-50 rounded-xl">
                                            <span className="text-sm font-semibold text-business-600">Status</span>
                                            <Badge className="bg-success-100 text-success-800 border-success-200">
                                                <div className="w-2 h-2 bg-success-500 rounded-full mr-2" />
                                                Active
                                            </Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-business-50 rounded-xl">
                                            <span className="text-sm font-semibold text-business-600">Completion</span>
                                            <Badge className="bg-corporate-600 text-white">92%</Badge>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-business-50 rounded-xl">
                                            <span className="text-sm font-semibold text-business-600">Type</span>
                                            <Badge variant="outline" className="border-business-300 text-business-700">{profile.profile_type}</Badge>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recent Activity */}
                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-success-600 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <Activity className="w-6 h-6 mr-3" />
                                            Recent Activity
                                        </CardTitle>
                                    </div>
                                    <CardContent className="p-6 space-y-4">
                                        <div className="flex items-center space-x-3 p-3 bg-business-50 rounded-lg">
                                            <div className="w-8 h-8 bg-corporate-100 rounded-full flex items-center justify-center">
                                                <Eye className="w-4 h-4 text-corporate-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-business-900">Profile viewed</div>
                                                <div className="text-xs text-business-500">2 minutes ago</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 bg-business-50 rounded-lg">
                                            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                                                <Download className="w-4 h-4 text-success-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-business-900">Contact saved</div>
                                                <div className="text-xs text-business-500">1 hour ago</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3 p-3 bg-business-50 rounded-lg">
                                            <div className="w-8 h-8 bg-business-100 rounded-full flex items-center justify-center">
                                                <QrCode className="w-4 h-4 text-business-600" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-business-900">QR code scanned</div>
                                                <div className="text-xs text-business-500">3 hours ago</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Analytics Section */}
                    {activeView === 'analytics' && (
                        <div className="space-y-8">
                            <AnalyticsDashboard />
                        </div>
                    )}

                    {/* Profile Section */}
                    {activeView === 'profile' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-corporate-600 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            {profile.profile_type === 'individual' ? (
                                                <><User className="w-6 h-6 mr-3" />Professional Profile</>
                                            ) : (
                                                <><Building2 className="w-6 h-6 mr-3" />Company Profile</>
                                            )}
                                        </CardTitle>
                                        <CardDescription className="text-corporate-100 mt-2">
                                            Your current profile information
                                        </CardDescription>
                                    </div>
                                    <CardContent className="p-8 space-y-6">
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
                                        <Button
                                            className="w-full h-14 text-lg font-semibold bg-corporate-600 hover:bg-corporate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                            onClick={() => router.push('/profile/edit')}
                                        >
                                            <Edit className="w-5 h-5 mr-3" />
                                            Edit Profile
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-business-700 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <Globe className="w-6 h-6 mr-3" />
                                            Public Profile
                                        </CardTitle>
                                        <CardDescription className="text-business-200 mt-2">
                                            How others see your profile
                                        </CardDescription>
                                    </div>
                                    <CardContent className="p-8 space-y-6">
                                        <div className="text-center">
                                            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-business-100 shadow-xl">
                                                <AvatarImage src="" />
                                                <AvatarFallback className="text-2xl font-bold bg-corporate-600 text-white">
                                                    {profile.profile_type === 'individual'
                                                        ? `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`
                                                        : profile.company_name?.[0] || 'C'
                                                    }
                                                </AvatarFallback>
                                            </Avatar>
                                            <h3 className="text-xl font-bold text-business-900 mb-2">{displayName}</h3>
                                            <Badge className="mb-4 px-4 py-2 bg-corporate-100 text-corporate-800 border-corporate-200">
                                                {profile.profile_type === 'individual' ? 'Professional' : 'Company'}
                                            </Badge>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full h-12 border-2 border-business-200 hover:bg-business-50 hover:border-corporate-300 transition-all duration-300"
                                            onClick={() => window.open(profileUrl, '_blank')}
                                        >
                                            <ExternalLink className="w-5 h-5 mr-3 text-corporate-600" />
                                            View Public Profile
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Share Section */}
                    {activeView === 'share' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-corporate-600 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <QrCode className="w-6 h-6 mr-3" />
                                            Professional QR Code
                                        </CardTitle>
                                        <CardDescription className="text-corporate-100 mt-2">
                                            Share your profile with a QR code
                                        </CardDescription>
                                    </div>
                                    <CardContent className="p-8 flex items-center justify-center">
                                        <div className="bg-white p-6 rounded-2xl shadow-xl border border-business-200">
                                            <QRCodeDisplay
                                                url={profileUrl}
                                                title={displayName}
                                                size={280}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-business-700 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <Share2 className="w-6 h-6 mr-3" />
                                            Share Options
                                        </CardTitle>
                                        <CardDescription className="text-business-200 mt-2">
                                            Multiple ways to share your profile
                                        </CardDescription>
                                    </div>
                                    <CardContent className="p-8 space-y-6">
                                        <div className="p-6 bg-business-50 rounded-xl border border-business-200">
                                            <p className="text-sm font-semibold text-business-600 uppercase tracking-wide mb-3">Profile URL</p>
                                            <p className="text-sm text-business-700 break-all font-mono bg-white p-3 rounded-lg border border-business-200">{profileUrl}</p>
                                        </div>

                                        <div className="space-y-3">
                                            <Button
                                                variant="outline"
                                                className="w-full h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-corporate-300 transition-all duration-300"
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
                                                        Copy Link
                                                    </>
                                                )}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-business-300 transition-all duration-300"
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: displayName,
                                                            text: `Connect with ${displayName} - Professional Digital Business Card`,
                                                            url: profileUrl,
                                                        })
                                                    }
                                                }}
                                            >
                                                <Share2 className="w-5 h-5 mr-3 text-business-600" />
                                                Share via Device
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Settings Section */}
                    {activeView === 'settings' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-corporate-600 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <Settings className="w-6 h-6 mr-3" />
                                            Account Settings
                                        </CardTitle>
                                        <CardDescription className="text-corporate-100 mt-2">
                                            Manage your account preferences
                                        </CardDescription>
                                    </div>
                                    <CardContent className="p-8 space-y-4">
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-corporate-300 transition-all duration-300"
                                            onClick={() => router.push('/profile/edit')}
                                        >
                                            <Edit className="w-5 h-5 mr-3 text-corporate-600" />
                                            Edit Profile Information
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-business-300 transition-all duration-300"
                                        >
                                            <Shield className="w-5 h-5 mr-3 text-business-600" />
                                            Privacy Settings
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start h-14 text-base font-semibold border-2 border-business-200 hover:bg-business-50 hover:border-business-300 transition-all duration-300"
                                        >
                                            <Bell className="w-5 h-5 mr-3 text-business-600" />
                                            Notification Preferences
                                        </Button>
                                    </CardContent>
                                </Card>

                                <Card className="border-0 shadow-xl bg-white">
                                    <div className="bg-business-700 p-6 rounded-t-2xl">
                                        <CardTitle className="text-xl font-bold text-white flex items-center">
                                            <User className="w-6 h-6 mr-3" />
                                            Account Information
                                        </CardTitle>
                                        <CardDescription className="text-business-200 mt-2">
                                            Your account details
                                        </CardDescription>
                                    </div>
                                    <CardContent className="p-8 space-y-4">
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
                                                <span className="text-sm font-semibold text-business-600 uppercase tracking-wide">Account Type</span>
                                                <Badge className="bg-corporate-600 hover:bg-corporate-700 text-white">{profile.profile_type}</Badge>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="w-full h-14 text-base font-semibold border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 mt-6"
                                            onClick={handleSignOut}
                                        >
                                            <LogOut className="w-5 h-5 mr-3" />
                                            Sign Out
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}