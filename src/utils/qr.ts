export function generateProfileUrl(countryCode: string, username: string): string {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return `${baseUrl}/${countryCode}/${username}`
}

export function isValidUsername(username: string): boolean {
    // Username should be 3-30 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/
    return usernameRegex.test(username)
}

export function isValidCountryCode(countryCode: string): boolean {
    // Simple 2-letter country code validation
    const countryCodeRegex = /^[a-zA-Z]{2}$/
    return countryCodeRegex.test(countryCode)
}
