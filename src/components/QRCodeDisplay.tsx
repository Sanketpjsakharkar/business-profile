'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Copy, Download, Share2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'

interface QRCodeDisplayProps {
    url: string
    title?: string
    size?: number
    showActions?: boolean
    className?: string
}

export function QRCodeDisplay({ url, title = "My Profile", size = 256, showActions = true, className = "" }: QRCodeDisplayProps) {
    const [copied, setCopied] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])
    const downloadQR = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const svg = document.querySelector('#qr-code-svg') as SVGElement

        if (!ctx || !svg) return

        const svgData = new XMLSerializer().serializeToString(svg)
        const img = new Image()

        img.onload = () => {
            canvas.width = size
            canvas.height = size
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, size, size)
            ctx.drawImage(img, 0, 0, size, size)

            const link = document.createElement('a')
            link.download = `${title.replace(/\s+/g, '_')}_QR.png`
            link.href = canvas.toDataURL()
            link.click()
        }

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    const shareQR = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out my profile: ${title}`,
                    url: url,
                })
            } catch (error) {
                console.log('Error sharing:', error)
                // Fallback to copying URL
                copyToClipboard()
            }
        } else {
            // Fallback to copying URL
            copyToClipboard()
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (!mounted) {
        return (
            <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
                <div className="animate-pulse bg-gray-200 rounded" style={{ width: size, height: size }}></div>
            </div>
        )
    }

    if (!showActions) {
        return (
            <div className={`flex items-center justify-center ${className}`}>
                <QRCodeSVG
                    id="qr-code-svg"
                    value={url}
                    size={size}
                    level="H"
                    includeMargin={false}
                    style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                    }}
                />
            </div>
        )
    }

    return (
        <Card className={`w-full max-w-sm mx-auto border-0 shadow-xl ${className}`}>
            <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg font-semibold text-business-900">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-inner border border-business-100">
                    {mounted ? (
                        <QRCodeSVG
                            id="qr-code-svg"
                            value={url}
                            size={size}
                            level="H"
                            includeMargin={true}
                            style={{
                                height: 'auto',
                                maxWidth: '100%',
                                width: '100%',
                            }}
                        />
                    ) : (
                        <div className="animate-pulse bg-gray-200 rounded" style={{ width: size, height: size }}></div>
                    )}
                </div>

                <div className="flex space-x-3 w-full">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        className="flex-1 border-business-300 text-business-700 hover:bg-business-50"
                    >
                        {copied ? (
                            <>
                                <Check className="w-4 h-4 mr-2 text-success-600" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <Copy className="w-4 h-4 mr-2" />
                                Copy Link
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadQR}
                        className="flex-1 border-business-300 text-business-700 hover:bg-business-50"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                    <Button
                        size="sm"
                        onClick={shareQR}
                        className="flex-1 bg-corporate-600 hover:bg-corporate-700 text-white"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
