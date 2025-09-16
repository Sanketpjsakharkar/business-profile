'use client'

import { SearchFilters } from '@/components/search/SearchFilters'
import { SearchInput } from '@/components/search/SearchInput'
import { SearchResults } from '@/components/search/SearchResults'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading'
import { ArrowLeft, Building2, Globe, Search, Users } from 'lucide-react'
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

interface DesktopSearchViewProps {
    initialQuery?: string
    initialCountry?: string
    initialType?: string
}

export function DesktopSearchView({ initialQuery = '', initialCountry = 'all', initialType = 'all' }: DesktopSearchViewProps) {
    const router = useRouter()

    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [total, setTotal] = useState(0)
    const [hasSearched, setHasSearched] = useState(false)

    const [query, setQuery] = useState(initialQuery)
    const [country, setCountry] = useState(initialCountry)
    const [type, setType] = useState(initialType)

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

            // Update URL without triggering a page reload
            const newParams = new URLSearchParams({
                q: searchQuery,
                ...(searchCountry !== 'all' && { country: searchCountry }),
                ...(searchType !== 'all' && { type: searchType })
            })

            router.replace(`/search?${newParams}`, { scroll: false })

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed')
            setResults([])
            setTotal(0)
        } finally {
            setLoading(false)
        }
    }

    // Perform search on initial load if there's a query
    useEffect(() => {
        if (initialQuery) {
            performSearch(initialQuery, initialCountry, initialType)
        }
    }, []) // Only run on mount

    const handleSearch = (searchQuery: string) => {
        setQuery(searchQuery)
        performSearch(searchQuery, country, type)
    }

    const handleFilterChange = (newCountry: string, newType: string) => {
        setCountry(newCountry)
        setType(newType)
        if (query) {
            performSearch(query, newCountry, newType)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-business-50 to-white">
            {/* Header */}
            <div className="bg-white/95 backdrop-blur-xl border-b border-business-200 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center space-x-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.back()}
                            className="text-business-600 hover:bg-business-50"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-corporate-600 rounded-lg flex items-center justify-center">
                                <Search className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-business-900">Search Profiles</h1>
                                <p className="text-sm text-business-600">Find professionals and companies</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Search Input */}
                    <SearchInput
                        initialValue={query}
                        onSearch={handleSearch}
                        loading={loading}
                    />

                    {/* Search Filters */}
                    <SearchFilters
                        country={country}
                        type={type}
                        onFilterChange={handleFilterChange}
                    />

                    {/* Search Results */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="text-center space-y-4">
                                <LoadingSpinner size="lg" />
                                <p className="text-business-600">Searching profiles...</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <Card className="border-red-200 bg-red-50">
                            <CardContent className="p-6 text-center">
                                <div className="text-red-600 font-medium mb-2">Search Error</div>
                                <p className="text-red-700">{error}</p>
                            </CardContent>
                        </Card>
                    )}

                    {!loading && !error && hasSearched && (
                        <>
                            {/* Results Summary */}
                            {results.length > 0 && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Badge variant="outline" className="px-3 py-1">
                                            {total} {total === 1 ? 'result' : 'results'} found
                                        </Badge>
                                        {query && (
                                            <span className="text-business-600">
                                                for "<span className="font-medium">{query}</span>"
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2 text-sm text-business-500">
                                        <Users className="w-4 h-4" />
                                        <span>{results.filter(r => r.profileType === 'individual').length} individuals</span>
                                        <Building2 className="w-4 h-4 ml-4" />
                                        <span>{results.filter(r => r.profileType === 'company').length} companies</span>
                                    </div>
                                </div>
                            )}

                            {/* Search Results */}
                            <SearchResults results={results} query={query} />

                            {/* No Results */}
                            {results.length === 0 && (
                                <Card className="border-business-200">
                                    <CardContent className="p-12 text-center">
                                        <div className="w-16 h-16 bg-business-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                            <Search className="w-8 h-8 text-business-400" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-business-900 mb-2">No profiles found</h3>
                                        <p className="text-business-600 mb-6">
                                            We couldn't find any profiles matching your search criteria.
                                        </p>
                                        <div className="space-y-2 text-sm text-business-500">
                                            <p>Try:</p>
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Using different keywords</li>
                                                <li>Checking your spelling</li>
                                                <li>Using broader search terms</li>
                                                <li>Removing filters</li>
                                            </ul>
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </>
                    )}

                    {/* Initial State */}
                    {!hasSearched && !loading && (
                        <Card className="border-business-200">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 bg-corporate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Globe className="w-8 h-8 text-corporate-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-business-900 mb-2">Discover Professionals</h3>
                                <p className="text-business-600 mb-6">
                                    Search through thousands of professional profiles and companies worldwide.
                                </p>
                                <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto text-sm text-business-500">
                                    <div className="flex items-center space-x-2">
                                        <Users className="w-4 h-4 text-corporate-600" />
                                        <span>Individual professionals</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="w-4 h-4 text-corporate-600" />
                                        <span>Companies & organizations</span>
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

