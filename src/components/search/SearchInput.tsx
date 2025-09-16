'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoadingSpinner } from '@/components/ui/loading'
import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface SearchInputProps {
    initialValue?: string
    onSearch: (query: string) => void
    loading?: boolean
    placeholder?: string
}

export function SearchInput({
    initialValue = '',
    onSearch,
    loading = false,
    placeholder = "Search for professionals, companies, or skills..."
}: SearchInputProps) {
    const [query, setQuery] = useState(initialValue)

    useEffect(() => {
        setQuery(initialValue)
    }, [initialValue])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query.trim())
        }
    }

    const handleClear = () => {
        setQuery('')
        // Optionally trigger search with empty query to show all results
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-business-400" />
                </div>

                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="pl-12 pr-24 h-14 text-lg border-2 border-business-200 rounded-2xl focus:border-corporate-500 focus:ring-corporate-500 bg-white shadow-lg"
                    disabled={loading}
                />

                <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 text-business-400 hover:text-business-600 transition-colors"
                            disabled={loading}
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}

                    <Button
                        type="submit"
                        size="sm"
                        disabled={loading || !query.trim() || query.length < 2}
                        className="h-10 px-4 bg-corporate-600 hover:bg-corporate-700 text-white rounded-xl"
                    >
                        {loading ? (
                            <LoadingSpinner size="sm" className="text-white" />
                        ) : (
                            <>
                                <Search className="w-4 h-4 mr-2" />
                                Search
                            </>
                        )}
                    </Button>
                </div>
            </div>

            {query.length > 0 && query.length < 2 && (
                <p className="text-sm text-business-500 mt-2 ml-4">
                    Enter at least 2 characters to search
                </p>
            )}
        </form>
    )
}

