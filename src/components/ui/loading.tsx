import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl"
    className?: string
}

interface LoadingScreenProps {
    message?: string
    className?: string
}

interface LoadingDotsProps {
    className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12"
    }

    return (
        <Loader2 className={cn("animate-spin", sizeClasses[size], className)} />
    )
}

export function LoadingScreen({ message = "Loading...", className }: LoadingScreenProps) {
    return (
        <div className={cn("min-h-screen flex items-center justify-center bg-gradient-to-br from-business-50 to-white", className)}>
            <div className="text-center space-y-6">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-corporate-600/20 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-corporate-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div className="space-y-2">
                    <p className="text-business-600 font-medium text-lg">{message}</p>
                    <LoadingDots />
                </div>
            </div>
        </div>
    )
}

export function LoadingDots({ className }: LoadingDotsProps) {
    return (
        <div className={cn("flex items-center justify-center space-x-1", className)}>
            <div className="w-2 h-2 bg-corporate-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-corporate-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-corporate-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
    )
}

export function LoadingCard({ className }: { className?: string }) {
    return (
        <div className={cn("animate-pulse", className)}>
            <div className="bg-business-200 rounded-2xl h-48 w-full mb-4"></div>
            <div className="space-y-3">
                <div className="bg-business-200 rounded h-4 w-3/4"></div>
                <div className="bg-business-200 rounded h-4 w-1/2"></div>
            </div>
        </div>
    )
}

export function LoadingButton({ children, loading, ...props }: any) {
    return (
        <button {...props} disabled={loading || props.disabled}>
            {loading ? (
                <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Loading...
                </div>
            ) : (
                children
            )}
        </button>
    )
}

