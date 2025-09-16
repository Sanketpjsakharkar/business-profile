'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Building2, Globe, User, Users } from 'lucide-react'

interface SearchFiltersProps {
    country: string
    type: string
    onFilterChange: (country: string, type: string) => void
}

const countries = [
    { code: 'all', name: 'All Countries', flag: '🌍' },
    { code: 'us', name: 'United States', flag: '🇺🇸' },
    { code: 'ca', name: 'Canada', flag: '🇨🇦' },
    { code: 'uk', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'au', name: 'Australia', flag: '🇦🇺' },
    { code: 'in', name: 'India', flag: '🇮🇳' },
    { code: 'de', name: 'Germany', flag: '🇩🇪' },
    { code: 'fr', name: 'France', flag: '🇫🇷' },
    { code: 'jp', name: 'Japan', flag: '🇯🇵' },
]

const profileTypes = [
    { value: 'all', label: 'All Types', icon: Users, description: 'Individuals & Companies' },
    { value: 'individual', label: 'Individuals', icon: User, description: 'Professionals & Freelancers' },
    { value: 'company', label: 'Companies', icon: Building2, description: 'Organizations & Businesses' },
]

export function SearchFilters({ country, type, onFilterChange }: SearchFiltersProps) {
    const handleCountryChange = (newCountry: string) => {
        onFilterChange(newCountry, type)
    }

    const handleTypeChange = (newType: string) => {
        onFilterChange(country, newType)
    }

    const hasActiveFilters = country !== 'all' || type !== 'all'

    const clearFilters = () => {
        onFilterChange('all', 'all')
    }

    return (
        <Card className="border-business-200 bg-white shadow-lg">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                        <Globe className="w-5 h-5 text-corporate-600" />
                        <h3 className="font-semibold text-business-900">Filters</h3>
                        {hasActiveFilters && (
                            <Badge variant="outline" className="text-corporate-600 border-corporate-300">
                                {(country !== 'all' ? 1 : 0) + (type !== 'all' ? 1 : 0)} active
                            </Badge>
                        )}
                    </div>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearFilters}
                            className="text-business-500 hover:text-business-700"
                        >
                            Clear all
                        </Button>
                    )}
                </div>

                <div className="space-y-6">
                    {/* Profile Type Filter */}
                    <div>
                        <h4 className="text-sm font-semibold text-business-700 mb-3 uppercase tracking-wide">
                            Profile Type
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {profileTypes.map((profileType) => {
                                const Icon = profileType.icon
                                const isActive = type === profileType.value

                                return (
                                    <button
                                        key={profileType.value}
                                        onClick={() => handleTypeChange(profileType.value)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${isActive
                                                ? 'border-corporate-500 bg-corporate-50 shadow-md'
                                                : 'border-business-200 bg-white hover:border-business-300 hover:bg-business-50'
                                            }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-corporate-600' : 'bg-business-100'
                                                }`}>
                                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-business-600'
                                                    }`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={`font-semibold ${isActive ? 'text-corporate-900' : 'text-business-900'
                                                    }`}>
                                                    {profileType.label}
                                                </div>
                                                <div className="text-sm text-business-600 mt-1">
                                                    {profileType.description}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Country Filter */}
                    <div>
                        <h4 className="text-sm font-semibold text-business-700 mb-3 uppercase tracking-wide">
                            Country
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {countries.map((countryOption) => {
                                const isActive = country === countryOption.code

                                return (
                                    <button
                                        key={countryOption.code}
                                        onClick={() => handleCountryChange(countryOption.code)}
                                        className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl border-2 transition-all duration-200 ${isActive
                                                ? 'border-corporate-500 bg-corporate-50 text-corporate-900 shadow-md'
                                                : 'border-business-200 bg-white text-business-700 hover:border-business-300 hover:bg-business-50'
                                            }`}
                                    >
                                        <span className="text-lg">{countryOption.flag}</span>
                                        <span className="font-medium text-sm">{countryOption.name}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

