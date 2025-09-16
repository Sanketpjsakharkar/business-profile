import { QRCodeDisplay } from '@/components/QRCodeDisplay'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    ArrowRight,
    Building2,
    CheckCircle,
    Globe,
    QrCode,
    Shield,
    Smartphone,
    Star,
    TrendingUp,
    User,
    Users,
    Zap
} from 'lucide-react'
import Link from 'next/link'

export function DesktopLandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-business-50 to-white">
            {/* Professional Hero Section */}
            <div className="relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-corporate-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-business-500 rounded-full blur-3xl" />
                </div>

                <div className="relative container mx-auto px-8 py-20 md:py-32">
                    <div className="text-center mb-20">
                        {/* Professional Badge */}
                        <div className="inline-flex items-center space-x-2 bg-corporate-50 border border-corporate-200 rounded-full px-6 py-3 mb-8">
                            <Shield className="w-5 h-5 text-corporate-600" />
                            <span className="text-corporate-800 font-semibold">Professional Digital Business Cards</span>
                        </div>

                        {/* Hero Title - Professional Typography */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                            <span className="text-business-900">
                                Professional
                            </span>
                            <br />
                            <span className="text-corporate-600">
                                Digital Business Cards
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-business-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                            Transform your networking with secure, professional digital business cards.
                            <span className="text-corporate-700 font-semibold"> Trusted by industry leaders.</span>
                        </p>

                        {/* Professional CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                            <Button asChild size="lg" className="h-16 text-xl px-12 bg-corporate-600 hover:bg-corporate-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 button-hover">
                                <Link href="/auth/register" className="flex items-center">
                                    <Zap className="w-6 h-6 mr-3" />
                                    Get Started
                                    <ArrowRight className="w-6 h-6 ml-3" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-16 text-xl px-12 border-2 border-business-300 text-business-700 hover:bg-business-50 shadow-lg hover:shadow-xl transition-all duration-300 button-hover">
                                <Link href="/search" className="flex items-center">
                                    <Globe className="w-6 h-6 mr-3" />
                                    Search Profiles
                                </Link>
                            </Button>
                        </div>

                        {/* Professional Social Proof */}
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-business-600">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-corporate-100 rounded-full flex items-center justify-center">
                                    <Users className="w-5 h-5 text-corporate-600" />
                                </div>
                                <div>
                                    <div className="font-bold text-business-900">10,000+</div>
                                    <div className="text-sm text-business-600">Professionals</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-success-600" />
                                </div>
                                <div>
                                    <div className="font-bold text-business-900">500%</div>
                                    <div className="text-sm text-business-600">More Connections</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <Star className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <div className="font-bold text-business-900">4.9/5</div>
                                    <div className="text-sm text-business-600">Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Professional Features Section */}
            <div className="container mx-auto px-8 py-20 bg-white">
                <div className="text-center mb-16">
                    <Badge className="mb-6 px-6 py-2 text-base bg-corporate-600 text-white">
                        Enterprise Features
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold text-business-900 mb-6">
                        Why Choose Professional Digital Cards?
                    </h2>
                    <p className="text-xl text-business-600 max-w-3xl mx-auto">
                        Built for professionals who demand reliability, security, and sophisticated design.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    <Card className="border border-business-200 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white premium-card animate-stagger">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-corporate-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:bg-corporate-700 transition-colors duration-300">
                                <QrCode className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-business-900 mb-4">Instant QR Sharing</h3>
                            <p className="text-business-600 leading-relaxed">
                                Professional QR codes that instantly share your complete business profile. Secure and reliable.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border border-business-200 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white premium-card animate-stagger">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-success-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:bg-success-700 transition-colors duration-300">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-business-900 mb-4">Professional Profiles</h3>
                            <p className="text-business-600 leading-relaxed">
                                Create polished individual profiles with comprehensive contact information and credentials.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border border-business-200 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white premium-card animate-stagger">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-business-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:bg-business-700 transition-colors duration-300">
                                <Building2 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-business-900 mb-4">Enterprise Ready</h3>
                            <p className="text-business-600 leading-relaxed">
                                Corporate profiles with team management, branding controls, and enterprise security.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border border-business-200 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white premium-card animate-stagger">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-corporate-600 rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:bg-corporate-700 transition-colors duration-300">
                                <Smartphone className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-business-900 mb-4">Mobile Optimized</h3>
                            <p className="text-business-600 leading-relaxed">
                                Seamless mobile experience with one-tap contact saving and professional presentation.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Professional Benefits Section */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
                    <div>
                        <Badge className="mb-6 px-4 py-2 bg-success-100 text-success-800 border border-success-200">
                            Sustainable & Efficient
                        </Badge>
                        <h3 className="text-3xl md:text-4xl font-bold text-business-900 mb-6">
                            Professional. Reliable. Secure.
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="w-5 h-5 text-success-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-business-900 mb-2">Always Available</h4>
                                    <p className="text-business-600">Your professional profile is accessible 24/7, never needs reprinting or replacement.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="w-5 h-5 text-success-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-business-900 mb-2">Real-Time Updates</h4>
                                    <p className="text-business-600">Update your information once and it reflects everywhere instantly. No outdated cards.</p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <CheckCircle className="w-5 h-5 text-success-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-business-900 mb-2">Professional Analytics</h4>
                                    <p className="text-business-600">Track engagement and connections with detailed professional insights.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="w-full h-96 bg-gradient-to-br from-business-50 to-corporate-50 rounded-2xl flex items-center justify-center shadow-xl border border-business-200 p-8">
                            <div className="text-center">
                                <div className="w-48 h-48 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 border border-business-200 p-4">
                                    <QRCodeDisplay
                                        url={typeof window !== 'undefined' ? window.location.origin : 'https://businessprofile.app'}
                                        title=""
                                        size={160}
                                        showActions={false}
                                    />
                                </div>
                                <p className="text-business-700 font-semibold">Professional QR Code</p>
                                <p className="text-business-500 text-sm mt-2">Scan to connect instantly</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional CTA Section */}
                <div className="text-center bg-business-900 rounded-2xl p-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-business-900 to-corporate-900 opacity-90" />
                    <div className="relative">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Elevate Your Professional Network?
                        </h2>
                        <p className="text-xl text-business-200 mb-10 max-w-2xl mx-auto">
                            Join thousands of professionals who trust our platform for their business networking needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button asChild size="lg" className="h-16 text-xl px-12 bg-white text-business-900 hover:bg-business-50 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <Link href="/auth/register" className="flex items-center">
                                    <Shield className="w-6 h-6 mr-3" />
                                    Start Professional Account
                                    <ArrowRight className="w-6 h-6 ml-3" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-16 text-xl px-12 border-2 border-white text-white hover:bg-white hover:text-business-900 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <Link href="/auth/login" className="flex items-center">
                                    <Globe className="w-6 h-6 mr-3" />
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
