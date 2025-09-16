/**
 * Script to test profile endpoints
 * 
 * Usage: node scripts/test-profiles.js
 */

const testProfiles = [
    'us/johndoe',
    'us/sarahwilson',
    'ca/mikechen',
    'us/techstartup',
    'uk/designstudio',
    'us/lisapark',
    'in/davidkumar',
    'au/greenenergy'
]

async function testProfile(path) {
    const url = `http://localhost:3001/${path}`

    try {
        const response = await fetch(url)

        if (response.ok) {
            console.log(`✅ ${path} - Profile loaded successfully`)
            return true
        } else if (response.status === 404) {
            console.log(`❌ ${path} - Profile not found (404)`)
            return false
        } else {
            console.log(`⚠️  ${path} - Unexpected status: ${response.status}`)
            return false
        }
    } catch (error) {
        console.log(`❌ ${path} - Error: ${error.message}`)
        return false
    }
}

async function testAllProfiles() {
    console.log('🧪 Testing profile endpoints...\n')

    let successCount = 0
    let totalCount = testProfiles.length

    for (const profile of testProfiles) {
        const success = await testProfile(profile)
        if (success) successCount++

        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100))
    }

    console.log(`\n📊 Results: ${successCount}/${totalCount} profiles working`)

    if (successCount === totalCount) {
        console.log('🎉 All profiles are working correctly!')
    } else {
        console.log('⚠️  Some profiles are not working. Check your database setup.')
    }

    console.log('\n💡 Make sure your dev server is running on http://localhost:3001')
}

// Check if server is running first
async function checkServer() {
    try {
        const response = await fetch('http://localhost:3001')
        return response.ok
    } catch {
        return false
    }
}

async function main() {
    const serverRunning = await checkServer()

    if (!serverRunning) {
        console.log('❌ Development server not running on http://localhost:3001')
        console.log('💡 Start your server with: npm run dev')
        return
    }

    await testAllProfiles()
}

main().catch(console.error)

