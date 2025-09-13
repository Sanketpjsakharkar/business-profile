import { DesktopLandingPage } from '@/components/DesktopLandingPage'
import { MobileLandingPage } from '@/components/MobileLandingPage'

export default function HomePage() {
  return (
    <>
      {/* Desktop Layout - Hidden on mobile */}
      <div className="hidden md:block">
        <DesktopLandingPage />
      </div>

      {/* Mobile Layout - Hidden on desktop */}
      <div className="block md:hidden">
        <MobileLandingPage />
      </div>
    </>
  )
}