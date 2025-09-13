'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, Share2 } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface QRCodeDisplayProps {
    url: string
    title?: string
    size?: number
}

export function QRCodeDisplay({ url, title = "My Profile", size = 256 }: QRCodeDisplayProps) {
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
                navigator.clipboard.writeText(url)
            }
        } else {
            // Fallback to copying URL
            navigator.clipboard.writeText(url)
            alert('Profile URL copied to clipboard!')
        }
    }

    return (
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-white rounded-lg">
                    <QRCodeSVG
                        id="qr-code-svg"
                        value={url}
                        size={size}
                        level="M"
                        includeMargin={true}
                    />
                </div>

                <div className="text-xs text-gray-500 text-center break-all px-2">
                    {url}
                </div>

                <div className="flex space-x-2 w-full">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={downloadQR}
                        className="flex-1"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={shareQR}
                        className="flex-1"
                    >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
