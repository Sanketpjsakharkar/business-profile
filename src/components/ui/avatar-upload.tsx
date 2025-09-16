'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading'
import { Camera, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'

interface AvatarUploadProps {
    currentAvatar?: string
    userId: string
    displayName: string
    onAvatarUpdate: (avatarUrl: string) => void
    className?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function AvatarUpload({
    currentAvatar,
    userId,
    displayName,
    onAvatarUpdate,
    className = '',
    size = 'lg'
}: AvatarUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [error, setError] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const sizeClasses = {
        sm: 'w-16 h-16',
        md: 'w-24 h-24',
        lg: 'w-32 h-32',
        xl: 'w-40 h-40'
    }

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8'
    }

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            setError('Invalid file type. Only JPEG, PNG, and WebP are allowed.')
            return
        }

        // Validate file size (5MB max)
        const maxSize = 5 * 1024 * 1024 // 5MB
        if (file.size > maxSize) {
            setError('File size too large. Maximum size is 5MB.')
            return
        }

        setError('')

        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string)
        }
        reader.readAsDataURL(file)

        // Upload file
        uploadAvatar(file)
    }

    const uploadAvatar = async (file: File) => {
        setIsUploading(true)
        setError('')

        try {
            const formData = new FormData()
            formData.append('avatar', file)
            formData.append('userId', userId)

            const response = await fetch('/api/upload/avatar', {
                method: 'POST',
                body: formData
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Upload failed')
            }

            onAvatarUpdate(data.avatarUrl)
            setPreviewUrl(null)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed')
            setPreviewUrl(null)
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemoveAvatar = async () => {
        setIsUploading(true)
        try {
            // Update profile to remove avatar
            const response = await fetch('/api/upload/avatar', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId })
            })

            if (response.ok) {
                onAvatarUpdate('')
            }
        } catch (err) {
            setError('Failed to remove avatar')
        } finally {
            setIsUploading(false)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    const avatarUrl = previewUrl || currentAvatar
    const initials = displayName
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()

    return (
        <div className={`relative inline-block ${className}`}>
            <div className={`relative ${sizeClasses[size]} rounded-full overflow-hidden group`}>
                <Avatar className={`${sizeClasses[size]} border-4 border-white shadow-lg`}>
                    <AvatarImage src={avatarUrl} alt={displayName} />
                    <AvatarFallback className="bg-corporate-100 text-corporate-700 text-lg font-bold">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                {/* Upload Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {isUploading ? (
                        <LoadingSpinner size="sm" className="text-white" />
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={triggerFileInput}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-2"
                        >
                            <Camera className={iconSizes[size]} />
                        </Button>
                    )}
                </div>

                {/* Remove Button */}
                {currentAvatar && !isUploading && (
                    <button
                        onClick={handleRemoveAvatar}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                    >
                        <X className="w-3 h-3" />
                    </button>
                )}
            </div>

            {/* Upload Button (Mobile/Alternative) */}
            <div className="mt-3 flex flex-col items-center space-y-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={triggerFileInput}
                    disabled={isUploading}
                    className="mobile-tap"
                >
                    {isUploading ? (
                        <>
                            <LoadingSpinner size="sm" className="mr-2" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload className="w-4 h-4 mr-2" />
                            {currentAvatar ? 'Change Photo' : 'Upload Photo'}
                        </>
                    )}
                </Button>

                {currentAvatar && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveAvatar}
                        disabled={isUploading}
                        className="text-red-600 hover:text-red-700 text-xs"
                    >
                        Remove Photo
                    </Button>
                )}
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFileSelect}
                className="hidden"
            />

            {/* Error Message */}
            {error && (
                <div className="mt-2 text-sm text-red-600 text-center">
                    {error}
                </div>
            )}

            {/* Upload Instructions */}
            <div className="mt-2 text-xs text-business-500 text-center">
                JPEG, PNG, WebP • Max 5MB
            </div>
        </div>
    )
}

