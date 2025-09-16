'use client'

import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    ArrowRight,
    CheckCircle,
    Eye,
    Globe,
    Heart,
    QrCode,
    Shield,
    Smartphone,
    Sparkles,
    Star,
    TrendingUp,
    User,
    Users,
    Zap
} from 'lucide-react'
import Link from 'next/link'

export function MobileLandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-business-50 to-white">
            {/* Mobile Hero Section */}
            <div className="relative overflow-hidden safe-area-top">
                {/* Animated Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-corporate-500 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-business-500 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative px-6 py-12">
                    <div className="text-center space-y-8">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center space-x-2 bg-corporate-50 border border-corporate-200 rounded-full px-4 py-2 mb-4">
                            <Shield className="w-4 h-4 text-corporate-600" />
                            <span className="text-corporate-800 font-semibold text-sm">Professional Digital Cards</span>
                        </div>

                        {/* Hero Title */}
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                <span className="text-business-900">Your Business Card</span>
                                <br />
                                <span className="bg-gradient-to-r from-corporate-600 to-business-700 bg-clip-text text-transparent">
                                    Goes Digital
                                </span>
                            </h1>
                            <p className="text-lg text-business-600 max-w-md mx-auto leading-relaxed">
                                Transform networking with QR codes.
                                <span className="text-corporate-700 font-semibold"> Scan, Connect, Grow.</span>
                            </p>
                        </div>

                        {/* QR Code Demo */}
                        <div className="relative">
                            <div className="w-48 h-48 bg-white rounded-3xl shadow-2xl mx-auto p-6 border border-business-200">
                                <QRCodeDisplay
                                    url="https://businessprofile.app"
                                    title=""
                                    size={168}
                                    showActions={false}
                                />
                            </div>
                            <div className="absolute -top-2 -right-2 w-8 h-8 bg-success-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                        </div>

                        {/* Mobile CTAs */}
                        <div className="space-y-4 pt-4">
                            <Button asChild className="w-full h-16 text-lg font-semibold mobile-tap mobile-haptic bg-corporate-600 hover:bg-corporate-700 text-white shadow-xl rounded-2xl">
                                <Link href="/auth/register" className="flex items-center justify-center">
                                    <Zap className="w-6 h-6 mr-3" />
                                    Create Your Profile
                                    <ArrowRight className="w-6 h-6 ml-3" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full h-14 text-base font-semibold mobile-tap mobile-haptic border-2 border-business-300 text-business-700 hover:bg-business-50 shadow-lg rounded-2xl">
                                <Link href="/search" className="flex items-center justify-center">
                                    <Eye className="w-5 h-5 mr-2" />
                                    Search Profiles
                                </Link>
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center justify-center space-x-6 pt-6 text-business-600">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-business-900">10K+</div>
                                <div className="text-xs text-business-500">Users</div>
                            </div>
                            <div className="w-px h-8 bg-business-300"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-business-900">4.9</div>
                                <div className="text-xs text-business-500">Rating</div>
                            </div>
                            <div className="w-px h-8 bg-business-300"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-business-900">500%</div>
                                <div className="text-xs text-business-500">Growth</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Features Section */}
            <div className="px-6 py-16 space-y-12">
                {/* Section Header */}
                <div className="text-center space-y-4">
                    <Badge className="px-4 py-2 text-sm bg-corporate-600 text-white">
                        ✨ Why Go Digital?
                    </Badge>
                    <h2 className="text-3xl font-bold text-business-900">
                        The Future of Networking
                    </h2>
                    <p className="text-business-600 max-w-sm mx-auto">
                        Professional, sustainable, and always up-to-date
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="space-y-6">
                    <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden mobile-card-press mobile-tap">
                        <CardContent className="p-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-corporate-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <QrCode className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-business-900 mb-2">Instant QR Sharing</h3>
                                    <p className="text-business-600 leading-relaxed">
                                        Generate QR codes that instantly share your complete professional profile. No more lost cards.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden mobile-card-press mobile-tap">
                        <CardContent className="p-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-success-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <Smartphone className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-business-900 mb-2">Mobile Native</h3>
                                    <p className="text-business-600 leading-relaxed">
                                        Perfect mobile experience with one-tap contact saving and native app feel.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-xl bg-white rounded-3xl overflow-hidden mobile-card-press mobile-tap">
                        <CardContent className="p-8">
                            <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-business-600 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                                    <User className="w-8 h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-business-900 mb-2">Professional Profiles</h3>
                                    <p className="text-business-600 leading-relaxed">
                                        Create stunning profiles with photos, contact info, and social links.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Benefits Section */}
                <div className="space-y-8 pt-8">
                    <div className="text-center">
                        <Badge className="px-4 py-2 text-sm bg-success-100 text-success-800 border-success-200">
                            🌱 Smart Benefits
                        </Badge>
                        <h3 className="text-2xl font-bold text-business-900 mt-4 mb-6">
                            Why Professionals Choose Digital
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-business-100">
                            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-success-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-business-900 mb-1">Never Run Out</h4>
                                <p className="text-business-600 text-sm">Always available, never needs reprinting</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-business-100">
                            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-success-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-business-900 mb-1">Always Updated</h4>
                                <p className="text-business-600 text-sm">Change info once, updates everywhere</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-business-100">
                            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-6 h-6 text-success-600" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-business-900 mb-1">Track Analytics</h4>
                                <p className="text-business-600 text-sm">See who viewed and connected</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works */}
                <div className="space-y-8 pt-8">
                    <div className="text-center">
                        <Badge className="px-4 py-2 text-sm bg-corporate-100 text-corporate-800 border-corporate-200">
                            📱 How It Works
                        </Badge>
                        <h3 className="text-2xl font-bold text-business-900 mt-4 mb-6">
                            Simple 3-Step Process
                        </h3>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-corporate-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                1
                            </div>
                            <div>
                                <h4 className="font-semibold text-business-900 mb-1">Create Your Profile</h4>
                                <p className="text-business-600 text-sm">Add your info, photo, and social links</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-corporate-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                2
                            </div>
                            <div>
                                <h4 className="font-semibold text-business-900 mb-1">Get Your QR Code</h4>
                                <p className="text-business-600 text-sm">Download and print on your business card</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-corporate-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                                3
                            </div>
                            <div>
                                <h4 className="font-semibold text-business-900 mb-1">Start Networking</h4>
                                <p className="text-business-600 text-sm">People scan and instantly save your contact</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="text-center bg-gradient-to-r from-corporate-600 to-business-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden mt-16">
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="relative space-y-6">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto">
                            <Heart className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Ready to Go Digital?
                            </h2>
                            <p className="text-corporate-100">
                                Join thousands of professionals who made the switch
                            </p>
                        </div>
                        <div className="space-y-3">
                            <Button asChild className="w-full h-14 text-lg font-semibold mobile-tap mobile-haptic bg-white text-corporate-600 hover:bg-gray-100 shadow-xl rounded-2xl">
                                <Link href="/auth/register" className="flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 mr-3" />
                                    Start Free Today
                                    <ArrowRight className="w-5 h-5 ml-3" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="w-full h-12 text-base font-semibold mobile-tap mobile-haptic border-2 border-white text-white hover:bg-white hover:text-corporate-600 shadow-xl rounded-2xl">
                                <Link href="/search" className="flex items-center justify-center">
                                    <Globe className="w-4 h-4 mr-2" />
                                    Search Profiles
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className="text-center space-y-4 pt-8">
                    <div className="flex items-center justify-center space-x-4 text-business-500">
                        <Shield className="w-5 h-5" />
                        <span className="text-sm font-medium">Secure & Private</span>
                    </div>
                    <div className="flex items-center justify-center space-x-6 text-business-400">
                        <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs">4.9/5 Rating</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-corporate-500" />
                            <span className="text-xs">10,000+ Users</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="w-4 h-4 text-success-500" />
                            <span className="text-xs">Growing Fast</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Safe Area Bottom */}
            <div className="safe-area-bottom pb-8"></div>
        </div>
    )
}
