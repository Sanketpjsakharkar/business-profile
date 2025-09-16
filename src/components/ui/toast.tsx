'use client'

import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle, Info, X, XCircle } from 'lucide-react'
import { createContext, useContext, useEffect, useState } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface Toast {
    id: string
    type: ToastType
    title: string
    description?: string
    duration?: number
}

interface ToastContextType {
    toasts: Toast[]
    addToast: (toast: Omit<Toast, 'id'>) => void
    removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newToast = { ...toast, id }
        setToasts((prev) => [...prev, newToast])

        // Auto remove after duration
        const duration = toast.duration || 5000
        setTimeout(() => {
            removeToast(id)
        }, duration)
    }

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}

function ToastContainer() {
    const { toasts } = useToast()

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    )
}

function ToastItem({ toast }: { toast: Toast }) {
    const { removeToast } = useToast()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => removeToast(toast.id), 300)
    }

    const getIcon = () => {
        switch (toast.type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-success-600" />
            case 'error':
                return <XCircle className="w-5 h-5 text-red-600" />
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-600" />
            case 'info':
                return <Info className="w-5 h-5 text-corporate-600" />
        }
    }

    const getColors = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-success-50 border-success-200 text-success-800'
            case 'error':
                return 'bg-red-50 border-red-200 text-red-800'
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800'
            case 'info':
                return 'bg-corporate-50 border-corporate-200 text-corporate-800'
        }
    }

    return (
        <div
            className={cn(
                'flex items-start space-x-3 p-4 rounded-2xl border shadow-lg backdrop-blur-xl transition-all duration-300 transform',
                getColors(),
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            )}
        >
            <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{toast.title}</p>
                {toast.description && (
                    <p className="text-sm opacity-90 mt-1">{toast.description}</p>
                )}
            </div>
            <button
                onClick={handleClose}
                className="flex-shrink-0 ml-2 p-1 rounded-lg hover:bg-black/10 transition-colors"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

// Convenience functions
export const toast = {
    success: (title: string, description?: string, duration?: number) => {
        // This will be implemented when ToastProvider is available
        console.log('Success:', title, description)
    },
    error: (title: string, description?: string, duration?: number) => {
        console.log('Error:', title, description)
    },
    warning: (title: string, description?: string, duration?: number) => {
        console.log('Warning:', title, description)
    },
    info: (title: string, description?: string, duration?: number) => {
        console.log('Info:', title, description)
    }
}

