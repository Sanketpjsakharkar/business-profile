'use client'

import { DesktopSearchView } from '@/components/search/DesktopSearchView'
import { MobileSearchView } from '@/components/search/MobileSearchView'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SearchPage() {
    const searchParams = useSearchParams()
    const [isMobile, setIsMobile] = useState(false)

    // Get initial values from URL params
    const initialQuery = searchParams.get('q') || ''
    const initialCountry = searchParams.get('country') || 'all'
    const initialType = searchParams.get('type') || 'all'

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIsMobile()
        window.addEventListener('resize', checkIsMobile)
        return () => window.removeEventListener('resize', checkIsMobile)
    }, [])

    if (isMobile) {
        return (
            <MobileSearchView
                initialQuery={initialQuery}
                initialCountry={initialCountry}
                initialType={initialType}
            />
        )
    }

    return (
        <DesktopSearchView
            initialQuery={initialQuery}
            initialCountry={initialCountry}
            initialType={initialType}
        />
    )
}
