'use client'

import { Avatar, AvatarFallback,AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading'
import {
    ArrowLeft,
    Building2,
    ExternalLink,
    Globe,
    Linkedin,
    Phone,
    Search,
    Twitter,
    User,
    Users,
    X
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

interface SearchResponse {
    results: SearchResult[]
    total: number
    query: string
    filters: {
        country?: string
        type?: string
        limit: number
        offset: number
    }
}

interface MobileSearchViewProps {
    initialQuery?: string
    initialCountry?: string
    initialType?: string
}

export function MobileSearchView({ initialQuery = '', initialCountry = 'all', initialType = 'all' }: MobileSearchViewProps) {
    const router = useRouter()
    const [query, setQuery] = useState(initialQuery)
    const [country, setCountry] = useState(initialCountry)
    const [type, setType] = useState(initialType)
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [total, setTotal] = useState(0)
    const [hasSearched, setHasSearched] = useState(false)
    const [showFilters, setShowFilters] = useState(false)

    const countries = [
        { code: 'all', name: 'All Countries', flag: '🌍' },
        { code: 'us', name: 'United States', flag: '🇺🇸' },
        { code: 'ca', name: 'Canada', flag: '🇨🇦' },
        { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
        { code: 'au', name: 'Australia', flag: '🇦🇺' },
        { code: 'in', name: 'India', flag: '🇮🇳' },
    ]

    const profileTypes = [
        { value: 'all', label: 'All Types', icon: Users },
        { value: 'individual', label: 'Individuals', icon: User },
        { value: 'company', label: 'Companies', icon: Building2 },
    ]

    const performSearch = async (searchQuery: string, searchCountry: string, searchType: string) => {
        if (!searchQuery.trim() || searchQuery.length < 2) {
            setError('Please enter at least 2 characters to search')
            return
        }

        setLoading(true)
        setError('')
        setHasSearched(true)

        try {
            const params = new URLSearchParams({
                q: searchQuery,
                country: searchCountry,
                type: searchType,
                limit: '20',
                offset: '0'
            })

            const response = await fetch(`/api/search?${params}`)
            const data: SearchResponse = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Search failed')
            }

            setResults(data.results)
            setTotal(data.total)

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed')
            setResults([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery, initialCountry, initialType)
        }
    }, [])

    const handleSearch = () => {
        if (query.trim()) {
            performSearch(query, country, type)
        }
    }

    const handleFilterChange = (newCountry: string, newType: string) => {
        setCountry(newCountry)
        setType(newType)
        if (query) {
            performSearch(query, newCountry, newType)
        }
    }

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
            us: '🇺🇸', ca: '🇨🇦', uk: '🇬🇧', au: '🇦🇺', in: '🇮🇳'
        }
        return flags[countryCode.toLowerCase()] || '🌍'
    }

    const getSocialIcon = (platform: string) => {
        switch (platform.toLowerCase()) {
            case 'linkedin': return <Linkedin className="w-4 h-4" />
            case 'twitter': return <Twitter className="w-4 h-4" />
            case 'website': return <Globe className="w-4 h-4" />
            default: return <ExternalLink className="w-4 h-4" />
        }
    }

    return (
        <div className="h-screen bg-business-50 flex flex-col overflow-hidden">
            {/* Mobile App Header */}
            <div className="flex-shrink-0 bg-white/95 backdrop-blur-xl border-b border-business-200 safe-area-top">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center space-x-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="p-2 text-business-600 hover:bg-business-50 mobile-tap"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div className="w-8 h-8 bg-corporate-600 rounded-lg flex items-center justify-center">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-semibold text-business-900">Search</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className={`mobile-tap mobile-haptic p-2 ${showFilters ? 'text-corporate-600' : 'text-business-400'}`}
                        >
                            <Users className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Search Input */}
                <div className="px-6 pb-4">
                    <div className="relative">
                        <Input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search professionals, companies..."
                            className="pl-12 pr-12 h-12 text-base border-2 border-business-200 rounded-2xl focus:border-corporate-500 bg-white shadow-sm"
                            disabled={loading}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-business-400" />
                        {query && (
                            <button
                                onClick={() => setQuery('')}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-business-400 mobile-tap"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                    <Button
                        onClick={handleSearch}
                        disabled={loading || !query.trim() || query.length < 2}
                        className="w-full mt-3 h-12 bg-corporate-600 hover:bg-corporate-700 text-white rounded-2xl mobile-tap mobile-haptic"
                    >
                        {loading ? <LoadingSpinner size="sm" className="text-white" /> : 'Search'}
                    </Button>
                </div>

                {/* Mobile Filters */}
                {showFilters && (
                    <div className="px-6 pb-4 border-t border-business-100">
                        <div className="space-y-4 pt-4">
                            {/* Profile Type */}
                            <div>
                                <h4 className="text-sm font-semibold text-business-700 mb-2">Profile Type</h4>
                                <div className="flex space-x-2">
                                    {profileTypes.map((profileType) => {
                                        const Icon = profileType.icon
                                        const isActive = type === profileType.value
                                        return (
                                            <button
                                                key={profileType.value}
                                                onClick={() => handleFilterChange(country, profileType.value)}
                                                className={`flex-1 p-3 rounded-xl border-2 text-center mobile-tap ${isActive
                                                    ? 'border-corporate-500 bg-corporate-50 text-corporate-700'
                                                    : 'border-business-200 bg-white text-business-600'
                                                    }`}
                                            >
                                                <Icon className="w-5 h-5 mx-auto mb-1" />
                                                <div className="text-xs font-medium">{profileType.label}</div>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Country */}
                            <div>
                                <h4 className="text-sm font-semibold text-business-700 mb-2">Country</h4>
                                <div className="flex flex-wrap gap-2">
                                    {countries.map((countryOption) => {
                                        const isActive = country === countryOption.code
                                        return (
                                            <button
                                                key={countryOption.code}
                                                onClick={() => handleFilterChange(countryOption.code, type)}
                                                className={`inline-flex items-center space-x-2 px-3 py-2 rounded-xl border-2 mobile-tap ${isActive
                                                    ? 'border-corporate-500 bg-corporate-50 text-corporate-700'
                                                    : 'border-business-200 bg-white text-business-600'
                                                    }`}
                                            >
                                                <span>{countryOption.flag}</span>
                                                <span className="text-xs font-medium">{countryOption.name}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-6 py-4 space-y-4">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center space-y-4">
                                <LoadingSpinner size="lg" />
                                <p className="text-business-600">Searching profiles...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-4 text-center">
                                <div className="text-red-600 font-medium mb-1">Search Error</div>
                                <p className="text-red-700 text-sm">{error}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Results Summary */}
                    {!loading && !error && hasSearched && results.length > 0 && (
                        <div className="flex items-center justify-between py-2">
                            <Badge variant="outline" className="px-3 py-1">
                                {total} {total === 1 ? 'result' : 'results'}
                            </Badge>
                            <div className="text-sm text-business-500">
                                {results.filter(r => r.profileType === 'individual').length} individuals, {results.filter(r => r.profileType === 'company').length} companies
                            </div>
                        </div>
                    )}

                    {/* Search Results */}
                    {!loading && !error && results.length > 0 && (
                        <div className="space-y-3">
                            {results.map((result) => (
                                <Card key={result.id} className="border-business-200 mobile-tap">
                                    <CardContent className="p-4">
                                        <Link href={result.profileUrl} className="block">
                                            <div className="flex items-start space-x-3">
                                                <Avatar className="w-12 h-12 border-2 border-business-200">
                                                    <AvatarImage src={result.avatarUrl} className="object-cover" />
                                                    <AvatarFallback className={`text-sm font-bold ${result.profileType === 'individual'
                                                        ? 'bg-corporate-100 text-corporate-700'
                                                        : 'bg-business-100 text-business-700'
                                                        }`}>
                                                        {result.profileType === 'individual'
                                                            ? result.displayName.split(' ').map(n => n[0]).join('').substring(0, 2)
                                                            : result.displayName.substring(0, 2)
                                                        }
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h3 className="font-semibold text-business-900 truncate">
                                                            {highlightText(result.displayName, query)}
                                                        </h3>
                                                        <Badge variant="outline" className="text-xs">
                                                            {result.profileType === 'individual' ? (
                                                                <><User className="w-3 h-3 mr-1" />Individual</>
                                                            ) : (
                                                                <><Building2 className="w-3 h-3 mr-1" />Company</>
                                                            )}
                                                        </Badge>
                                                    </div>

                                                    {result.profileType === 'company' && result.contactPerson && (
                                                        <div className="text-business-600 text-sm mb-1">
                                                            Contact: {highlightText(result.contactPerson, query)}
                                                        </div>
                                                    )}

                                                    {result.subtitle && (
                                                        <p className="text-business-600 text-sm mb-2 line-clamp-2">
                                                            {highlightText(result.subtitle, query)}
                                                        </p>
                                                    )}

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <span className="text-xs text-business-500">
                                                                {getCountryFlag(result.countryCode)} {result.countryCode.toUpperCase()}
                                                            </span>
                                                            {result.phone && (
                                                                <Phone className="w-3 h-3 text-business-400" />
                                                            )}
                                                        </div>
                                                        <ExternalLink className="w-4 h-4 text-corporate-600" />
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && !error && hasSearched && results.length === 0 && (
                        <Card className="border-business-200">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-business-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-business-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-business-900 mb-2">No profiles found</h3>
                                <p className="text-business-600 text-sm mb-4">
                                    We couldn't find any profiles matching your search.
                                </p>
                                <div className="text-xs text-business-500 space-y-1">
                                    <p>Try using different keywords or removing filters</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Initial State */}
                    {!hasSearched && !loading && (
                        <Card className="border-business-200">
                            <CardContent className="p-8 text-center">
                                <div className="w-16 h-16 bg-corporate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-8 h-8 text-corporate-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-business-900 mb-2">Discover Professionals</h3>
                                <p className="text-business-600 text-sm mb-4">
                                    Search through professional profiles and companies worldwide.
                                </p>
                                <div className="grid grid-cols-2 gap-3 text-xs text-business-500">
                                    <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-corporate-600" />
                                        <span>Professionals</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="w-4 h-4 text-corporate-600" />
                                        <span>Companies</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
