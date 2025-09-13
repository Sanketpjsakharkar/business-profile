'use client'

import { DesktopAuthForm } from './DesktopAuthForm'
import { MobileAuthForm } from './MobileAuthForm'

interface AuthFormProps {
    mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
    return (
        <>
            {/* Desktop Layout - Hidden on mobile */}
            <div className="hidden md:block">
                <DesktopAuthForm mode={mode} />
            </div>

            {/* Mobile Layout - Hidden on desktop */}
            <div className="block md:hidden">
                <MobileAuthForm mode={mode} />
            </div>
        </>
    )
}