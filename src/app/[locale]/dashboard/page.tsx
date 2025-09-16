'use client'

import { DesktopDashboard } from '@/components/DesktopDashboard'
import { MobileDashboard } from '@/components/MobileDashboard'
import { LoadingScreen } from '@/components/ui/loading'
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
        return <LoadingScreen message="Loading your professional dashboard..." />
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