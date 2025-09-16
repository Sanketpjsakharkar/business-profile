'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, ExternalLink, Globe, Linkedin, Phone, Twitter, User } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
    id: string
    username: string
    profileType: 'individual' | 'company'
    countryCode: string
    displayName: string
    subtitle?: string
    contactPerson?: string
    phone?: string
    socialLinks?: Record<string, string>
    profileUrl: string
    createdAt: string
    avatarUrl?: string
}

interface SearchResultsProps {
    results: SearchResult[]
    query: string
}

export function SearchResults({ results, query }: SearchResultsProps) {
    const highlightText = (text: string, searchQuery: string) => {
        if (!searchQuery || !text) return text

        const regex = new RegExp(`(${searchQuery})`, 'gi')
        const parts = text.split(regex)

        return parts.map((part, index) =>
            regex.test(part) ? (
                <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
                    {part}
                </mark>
            ) : part
        )
    }

    const getCountryFlag = (countryCode: string) => {
        const flags: Record<string, string> = {
            us: '🇺🇸',
            ca: '🇨🇦',
            uk: '🇬🇧',
            au: '🇦🇺',
            in: '🇮🇳',
            de: '🇩🇪',
            fr: '🇫🇷',
            jp: '🇯🇵',
        }
        return flags[countryCode.toLowerCase()] || '🌍'
    }

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'linkedin':
                return <Linkedin className="w-4 h-4" />
            case 'twitter':
                return <Twitter className="w-4 h-4" />
            case 'website':
                return <Globe className="w-4 h-4" />
            default:
                return <ExternalLink className="w-4 h-4" />
        }
    }

    if (results.length === 0) {
        return null
    }

    return (
        <div className="space-y-4">
            {results.map((result) => (
                <Card key={result.id} className="border-business-200 hover:border-corporate-300 transition-all duration-200 hover:shadow-lg group">
                    <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <Avatar className="w-16 h-16 border-2 border-business-200 group-hover:border-corporate-300 transition-colors">
                                    <AvatarImage src={result.avatarUrl} className="object-cover" />
                                    <AvatarFallback className={`text-lg font-bold ${result.profileType === 'individual'
                                        ? 'bg-corporate-100 text-corporate-700'
                                        : 'bg-business-100 text-business-700'
                                        }`}>
                                        {result.profileType === 'individual'
                                            ? result.displayName.split(' ').map(n => n[0]).join('').substring(0, 2)
                                            : result.displayName.substring(0, 2)
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={result.profileUrl}
                                            className="text-xl font-bold text-business-900 hover:text-corporate-600 transition-colors group-hover:text-corporate-600"
                                        >
                                            {highlightText(result.displayName, query)}
                                        </Link>

                                        <div className="flex items-center space-x-2">
                                            <Badge
                                                variant="outline"
                                                className={`text-xs ${result.profileType === 'individual'
                                                    ? 'border-corporate-300 text-corporate-700'
                                                    : 'border-business-300 text-business-700'
                                                    }`}
                                            >
                                                {result.profileType === 'individual' ? (
                                                    <><User className="w-3 h-3 mr-1" />Individual</>
                                                ) : (
                                                    <><Building2 className="w-3 h-3 mr-1" />Company</>
                                                )}
                                            </Badge>

                                            <Badge variant="outline" className="text-xs border-business-300 text-business-600">
                                                <span className="mr-1">{getCountryFlag(result.countryCode)}</span>
                                                {result.countryCode.toUpperCase()}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Person for Companies */}
                                {result.profileType === 'company' && result.contactPerson && (
                                    <div className="text-business-600 mb-2">
                                        <span className="text-sm">Contact: </span>
                                        <span className="font-medium">{highlightText(result.contactPerson, query)}</span>
                                    </div>
                                )}

                                {/* Description */}
                                {result.subtitle && (
                                    <p className="text-business-600 mb-4 leading-relaxed">
                                        {highlightText(result.subtitle, query)}
                                    </p>
                                )}

                                {/* Contact Info & Social Links */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {/* Phone */}
                                        {result.phone && (
                                            <a
                                                href={`tel:${result.phone}`}
                                                className="flex items-center space-x-2 text-business-600 hover:text-corporate-600 transition-colors"
                                            >
                                                <Phone className="w-4 h-4" />
                                                <span className="text-sm">{result.phone}</span>
                                            </a>
                                        )}

                                        {/* Social Links */}
                                        {result.socialLinks && Object.keys(result.socialLinks).length > 0 && (
                                            <div className="flex items-center space-x-2">
                                                {Object.entries(result.socialLinks)
                                                    .filter(([_, url]) => url)
                                                    .slice(0, 3)
                                                    .map(([platform, url]) => (
                                                        <a
                                                            key={platform}
                                                            href={url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-business-400 hover:text-corporate-600 transition-colors"
                                                            title={`${platform} profile`}
                                                        >
                                                            {getSocialIcon(platform)}
                                                        </a>
                                                    ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* View Profile Link */}
                                    <Link
                                        href={result.profileUrl}
                                        className="inline-flex items-center space-x-2 text-corporate-600 hover:text-corporate-700 font-medium text-sm transition-colors"
                                    >
                                        <span>View Profile</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
