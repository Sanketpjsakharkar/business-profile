'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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

interface DesktopAuthFormProps {
    mode: 'login' | 'register'
}

export function DesktopAuthForm({ mode }: DesktopAuthFormProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileType, setProfileType] = useState<ProfileType>('individual')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)

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

    return (
        <div className="min-h-screen bg-gradient-to-br from-business-50 to-white flex items-center justify-center py-12 px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-corporate-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-business-900 mb-2">
                        {mode === 'login' ? 'Welcome Back' : 'Join BusinessProfile'}
                    </h1>
                    <p className="text-business-600">
                        {mode === 'login'
                            ? 'Sign in to your professional account'
                            : 'Create your professional digital presence'
                        }
                    </p>
                </div>

                <Card className="border-0 shadow-2xl bg-white rounded-2xl overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-corporate-600 to-business-700 text-white p-8">
                        <CardTitle className="text-2xl font-bold text-center">
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                        </CardTitle>
                        <CardDescription className="text-center text-corporate-100 mt-2">
                            {mode === 'login'
                                ? 'Access your digital business card dashboard'
                                : 'Start building your professional digital presence'
                            }
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                        className="pl-12 h-12 border-2 border-business-200 rounded-xl focus:border-corporate-500 focus:ring-corporate-500"
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
                                        className="pl-12 pr-12 h-12 border-2 border-business-200 rounded-xl focus:border-corporate-500 focus:ring-corporate-500"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-business-50 rounded-r-xl transition-colors"
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

                            {/* Profile Type Selection for Registration */}
                            {mode === 'register' && (
                                <div className="space-y-4">
                                    <label className="text-sm font-semibold text-business-700 uppercase tracking-wide">
                                        Profile Type
                                    </label>
                                    <div className="grid grid-cols-1 gap-4">
                                        {/* Individual Option */}
                                        <div
                                            onClick={() => setProfileType('individual')}
                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${profileType === 'individual'
                                                ? 'border-corporate-500 bg-corporate-50 shadow-lg'
                                                : 'border-business-200 bg-white hover:border-business-300'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${profileType === 'individual' ? 'bg-corporate-600' : 'bg-business-100'
                                                    }`}>
                                                    <User className={`w-5 h-5 ${profileType === 'individual' ? 'text-white' : 'text-business-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-business-900">Individual Professional</h4>
                                                    <p className="text-sm text-business-600">For professionals, freelancers, and entrepreneurs</p>
                                                </div>
                                                {profileType === 'individual' && (
                                                    <CheckCircle className="w-5 h-5 text-corporate-600" />
                                                )}
                                            </div>
                                        </div>

                                        {/* Company Option */}
                                        <div
                                            onClick={() => setProfileType('company')}
                                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${profileType === 'company'
                                                ? 'border-corporate-500 bg-corporate-50 shadow-lg'
                                                : 'border-business-200 bg-white hover:border-business-300'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${profileType === 'company' ? 'bg-corporate-600' : 'bg-business-100'
                                                    }`}>
                                                    <Building2 className={`w-5 h-5 ${profileType === 'company' ? 'text-white' : 'text-business-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-business-900">Company Profile</h4>
                                                    <p className="text-sm text-business-600">For companies, organizations, and teams</p>
                                                </div>
                                                {profileType === 'company' && (
                                                    <CheckCircle className="w-5 h-5 text-corporate-600" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="flex items-center space-x-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 text-lg font-semibold bg-corporate-600 hover:bg-corporate-700 text-white shadow-xl rounded-xl transition-all duration-300 disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="flex items-center">
                                        <LoadingSpinner size="sm" className="mr-3 text-white" />
                                        {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <Zap className="w-5 h-5 mr-3" />
                                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                                        <ArrowRight className="w-5 h-5 ml-3" />
                                    </div>
                                )}
                            </Button>
                        </form>

                        {/* Switch Mode */}
                        <div className="mt-8 text-center">
                            <p className="text-business-600 mb-4">
                                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                            </p>
                            <Button
                                variant="ghost"
                                onClick={() => router.push(mode === 'login' ? '/auth/register' : '/auth/login')}
                                className="text-corporate-600 hover:text-corporate-700 font-semibold hover:bg-corporate-50"
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
        </div>
    )
}
