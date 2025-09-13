import { ContactInfo } from '@/types/profile'

export function isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false

    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    )
}

export function generateVCard(contact: ContactInfo): string {
    const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${contact.firstName || ''} ${contact.lastName || ''}`.trim(),
        contact.firstName ? `N:${contact.lastName || ''};${contact.firstName};;;` : '',
        contact.email ? `EMAIL:${contact.email}` : '',
        contact.phone ? `TEL:${contact.phone}` : '',
        contact.organization ? `ORG:${contact.organization}` : '',
        contact.url ? `URL:${contact.url}` : '',
        'END:VCARD'
    ].filter(Boolean).join('\n')

    return vcard
}

export function downloadVCard(contact: ContactInfo): void {
    const vcard = generateVCard(contact)
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = window.URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${contact.firstName || 'contact'}_${contact.lastName || 'card'}.vcf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    window.URL.revokeObjectURL(url)
}

export function addToContacts(contact: ContactInfo): void {
    if (isMobileDevice()) {
        // For mobile devices, try to use the native contact API if available
        if ('contacts' in navigator && 'ContactsManager' in window) {
            // Web Contacts API (limited browser support)
            try {
                // @ts-expect-error - Web Contacts API is experimental
                navigator.contacts.select(['name', 'email', 'tel'], { multiple: false })
            } catch {
                console.log('Web Contacts API not supported, falling back to vCard')
                downloadVCard(contact)
            }
        } else {
            // Fallback to vCard download
            downloadVCard(contact)
        }
    } else {
        // For desktop, always use vCard download
        downloadVCard(contact)
    }
}
