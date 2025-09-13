'use client'

import { DesktopDashboard } from '@/components/DesktopDashboard'
import { MobileDashboard } from '@/components/MobileDashboard'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.push('/auth/login')
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 border-4 border-corporate-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-business-600 font-medium">Loading your professional dashboard...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <>
            {/* Desktop Layout - Hidden on mobile */}
            <div className="hidden md:block">
                <DesktopDashboard />
            </div>

            {/* Mobile Layout - Hidden on desktop */}
            <div className="block md:hidden">
                <MobileDashboard />
            </div>
        </>
    )
}