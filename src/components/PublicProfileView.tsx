'use client'

import { Profile } from '@/types/profile'
import { isMobileDevice } from '@/utils/contacts'
import { useEffect, useState } from 'react'
import { DesktopProfileView } from './DesktopProfileView'
import { MobileProfileView } from './MobileProfileView'

interface PublicProfileViewProps {
    profile: Profile
}

export function PublicProfileView({ profile }: PublicProfileViewProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(isMobileDevice())
    }, [])

    return (
        <>
            {/* Desktop Layout - Hidden on mobile */}
            <div className="hidden md:block">
                <DesktopProfileView profile={profile} />
            </div>

            {/* Mobile Layout - Hidden on desktop */}
            <div className="block md:hidden">
                <MobileProfileView profile={profile} />
            </div>
        </>
    )
}