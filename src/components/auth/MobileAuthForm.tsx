'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading'
import { useAuth } from '@/hooks/useAuth'
import { ProfileType } from '@/types/profile'
import {
    AlertCircle,
    ArrowRight,
    Building2,
    CheckCircle,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Shield,
    User,
    Zap
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface MobileAuthFormProps {
    mode: 'login' | 'register'
}

export function MobileAuthForm({ mode }: MobileAuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileType, setProfileType] = useState<ProfileType>('individual')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [step, setStep] = useState(1) // For multi-step registration

    const { signIn, signUp } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            if (mode === 'login') {
                const { error } = await signIn(email, password)
                if (error) {
                    setError(error.message)
                } else {
                    router.push('/dashboard')
                }
            } else {
                const { error } = await signUp(email, password)
                if (error) {
                    setError(error.message)
                } else {
                    router.push(`/profile/setup?type=${profileType}`)
                }
            }
        } catch {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    const handleNextStep = () => {
        if (step === 1 && email && password) {
            setStep(2)
        }
    }

    const handleBackStep = () => {
        if (step === 2) {
            setStep(1)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-business-50 to-white safe-area-top">
            {/* Mobile Header */}
            <div className="px-6 py-8 text-center">
                <div className="w-16 h-16 bg-corporate-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-business-900 mb-2">
                    {mode === 'login' ? 'Welcome Back!' : 'Join BusinessProfile'}
                </h1>
                <p className="text-business-600 text-lg">
                    {mode === 'login'
                        ? 'Sign in to access your digital business card'
                        : 'Create your professional digital presence'
                    }
                </p>
            </div>

            {/* Mobile Form */}
            <div className="px-6 pb-8">
                <Card className="border-0 shadow-2xl bg-white rounded-3xl overflow-hidden">
                    <CardContent className="p-8">
                        {/* Progress Indicator for Registration */}
                        {mode === 'register' && (
                            <div className="mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <Badge className={`px-3 py-1 text-xs ${step >= 1 ? 'bg-corporate-600 text-white' : 'bg-business-200 text-business-600'}`}>
                                        1. Account
                                    </Badge>
                                    <div className={`w-8 h-1 rounded-full ${step >= 2 ? 'bg-corporate-600' : 'bg-business-200'}`} />
                                    <Badge className={`px-3 py-1 text-xs ${step >= 2 ? 'bg-corporate-600 text-white' : 'bg-business-200 text-business-600'}`}>
                                        2. Profile Type
                                    </Badge>
                                </div>
                                <div className="w-full bg-business-200 rounded-full h-2">
                                    <div
                                        className="bg-corporate-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${(step / 2) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Step 1: Account Details (or Login) */}
                            {(mode === 'login' || step === 1) && (
                                <div className="space-y-6 animate-slide-up">
                                    {/* Email Field */}
                                    <div className="space-y-3">
                                        <label htmlFor="email" className="text-sm font-semibold text-business-700 uppercase tracking-wide">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-business-400" />
                                            </div>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="pl-12 h-14 text-lg border-2 border-business-200 rounded-2xl focus:border-corporate-500 focus:ring-corporate-500 mobile-tap"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-3">
                                        <label htmlFor="password" className="text-sm font-semibold text-business-700 uppercase tracking-wide">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-business-400" />
                                            </div>
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="pl-12 pr-12 h-14 text-lg border-2 border-business-200 rounded-2xl focus:border-corporate-500 focus:ring-corporate-500 mobile-tap"
                                                required
                                                minLength={6}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-4 flex items-center mobile-tap mobile-haptic"
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-5 w-5 text-business-400" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-business-400" />
                                                )}
                                            </button>
                                        </div>
                                        {mode === 'register' && (
                                            <p className="text-xs text-business-500">
                                                Minimum 6 characters required
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Profile Type (Registration only) */}
                            {mode === 'register' && step === 2 && (
                                <div className="space-y-6 animate-slide-up">
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl font-bold text-business-900 mb-2">Choose Your Profile Type</h3>
                                        <p className="text-business-600">Select the type that best describes you</p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Individual Option */}
                                        <div
                                            onClick={() => setProfileType('individual')}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer mobile-tap mobile-haptic transition-all duration-300 ${profileType === 'individual'
                                                ? 'border-corporate-500 bg-corporate-50 shadow-lg'
                                                : 'border-business-200 bg-white hover:border-business-300'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${profileType === 'individual' ? 'bg-corporate-600' : 'bg-business-100'
                                                    }`}>
                                                    <User className={`w-6 h-6 ${profileType === 'individual' ? 'text-white' : 'text-business-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-business-900 mb-1">Individual Professional</h4>
                                                    <p className="text-sm text-business-600">Personal business card for professionals, freelancers, and entrepreneurs</p>
                                                </div>
                                                {profileType === 'individual' && (
                                                    <CheckCircle className="w-6 h-6 text-corporate-600" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Company Option */}
                                        <div
                                            onClick={() => setProfileType('company')}
                                            className={`p-6 rounded-2xl border-2 cursor-pointer mobile-tap mobile-haptic transition-all duration-300 ${profileType === 'company'
                                                ? 'border-corporate-500 bg-corporate-50 shadow-lg'
                                                : 'border-business-200 bg-white hover:border-business-300'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${profileType === 'company' ? 'bg-corporate-600' : 'bg-business-100'
                                                    }`}>
                                                    <Building2 className={`w-6 h-6 ${profileType === 'company' ? 'text-white' : 'text-business-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-business-900 mb-1">Company Profile</h4>
                                                    <p className="text-sm text-business-600">Business profile for companies, organizations, and teams</p>
                                                </div>
                                                {profileType === 'company' && (
                                                    <CheckCircle className="w-6 h-6 text-corporate-600" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-4 pt-4">
                                {mode === 'login' || step === 2 ? (
                                    <>
                                        {/* Submit Button */}
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-16 text-lg font-semibold mobile-tap mobile-haptic bg-corporate-600 hover:bg-corporate-700 text-white shadow-xl rounded-2xl transition-all duration-300 disabled:opacity-70"
                                        >
                                            {loading ? (
                                                <div className="flex items-center">
                                                    <LoadingSpinner size="sm" className="mr-3 text-white" />
                                                    {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center">
                                                    <Zap className="w-6 h-6 mr-3" />
                                                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                                                    <ArrowRight className="w-6 h-6 ml-3" />
                                                </div>
                                            )}
                                        </Button>

                                        {/* Back Button for Step 2 */}
                                        {mode === 'register' && step === 2 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleBackStep}
                                                className="w-full h-14 text-base font-semibold mobile-tap mobile-haptic border-2 border-business-300 text-business-700 hover:bg-business-50 rounded-2xl"
                                            >
                                                Back to Account Details
                                            </Button>
                                        )}
                                    </>
                                ) : (
                                    /* Next Button for Step 1 */
                                    <Button
                                        type="button"
                                        onClick={handleNextStep}
                                        disabled={!email || !password || password.length < 6}
                                        className="w-full h-16 text-lg font-semibold mobile-tap mobile-haptic bg-corporate-600 hover:bg-corporate-700 text-white shadow-xl rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <div className="flex items-center justify-center">
                                            Continue
                                            <ArrowRight className="w-6 h-6 ml-3" />
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </form>

                        {/* Switch Mode */}
                        <div className="mt-8 text-center">
                            <p className="text-business-600 mb-4">
                                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            </p>
                            <Button
                                variant="ghost"
                                onClick={() => router.push(mode === 'login' ? '/auth/register' : '/auth/login')}
                                className="text-corporate-600 hover:text-corporate-700 font-semibold mobile-tap mobile-haptic"
                            >
                                {mode === 'login' ? 'Create Account' : 'Sign In Instead'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Trust Indicators */}
                <div className="text-center mt-8 space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-business-500">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm font-medium">Secure & Private</span>
                    </div>
                    <p className="text-xs text-business-400 max-w-sm mx-auto">
                        Your data is encrypted and secure. We never share your information with third parties.
                    </p>
                </div>
            </div>

            {/* Safe Area Bottom */}
            <div className="safe-area-bottom pb-8"></div>
        </div>
    )
}
