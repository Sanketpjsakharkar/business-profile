'use client'

import { useEffect, useState } from 'react'

interface ClientBodyProps {
    className: string
    children: React.ReactNode
}

export function ClientBody({ className, children }: ClientBodyProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <body className={className} suppressHydrationWarning={true}>
                {children}
            </body>
        )
    }

    return (
        <body className={className}>
            {children}
        </body>
    )
}
