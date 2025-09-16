import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BusinessProfile - Digital Business Cards",
  description: "Create and share your digital business profile with QR codes",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BusinessProfile",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "BusinessProfile",
    "application-name": "BusinessProfile",
    "msapplication-TileColor": "#3B82F6",
    "msapplication-TileImage": "/icon-144x144.svg",
    "theme-color": "#3B82F6",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Service Worker Registration
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }

              // PWA Install Prompt
              let deferredPrompt;
              const PWA_DISMISSED_KEY = 'pwa-install-dismissed';
              const PWA_INSTALLED_KEY = 'pwa-installed';
              
              window.addEventListener('beforeinstallprompt', (e) => {
                console.log('PWA install prompt available');
                e.preventDefault();
                deferredPrompt = e;
                
                // Check if user has already dismissed or installed
                const isDismissed = localStorage.getItem(PWA_DISMISSED_KEY);
                const isInstalled = localStorage.getItem(PWA_INSTALLED_KEY);
                
                // Don't show if already dismissed or installed
                if (isDismissed || isInstalled) {
                  return;
                }
                
                // Show custom install button or banner
                const installBanner = document.createElement('div');
                installBanner.id = 'install-banner';
                installBanner.style.cssText = \`
                  position: fixed;
                  top: 0;
                  left: 0;
                  right: 0;
                  background: #3B82F6;
                  color: white;
                  padding: 12px 16px;
                  text-align: center;
                  z-index: 9999;
                  font-family: system-ui, -apple-system, sans-serif;
                  font-size: 14px;
                  cursor: pointer;
                  transform: translateY(-100%);
                  transition: transform 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                \`;
                installBanner.innerHTML = \`
                  <span>📱 Install BusinessProfile app for the best experience - Tap here!</span>
                  <button id="dismiss-pwa" style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0 8px;">×</button>
                \`;
                
                document.body.appendChild(installBanner);
                
                // Show banner after a delay
                setTimeout(() => {
                  installBanner.style.transform = 'translateY(0)';
                }, 2000);
                
                // Handle dismiss button
                const dismissBtn = installBanner.querySelector('#dismiss-pwa');
                dismissBtn.addEventListener('click', (e) => {
                  e.stopPropagation();
                  localStorage.setItem(PWA_DISMISSED_KEY, 'true');
                  installBanner.style.transform = 'translateY(-100%)';
                  setTimeout(() => installBanner.remove(), 300);
                });
                
                // Handle install click
                installBanner.addEventListener('click', async () => {
                  if (deferredPrompt) {
                    deferredPrompt.prompt();
                    const { outcome } = await deferredPrompt.userChoice;
                    console.log('PWA install outcome:', outcome);
                    
                    if (outcome === 'accepted') {
                      localStorage.setItem(PWA_INSTALLED_KEY, 'true');
                    } else {
                      localStorage.setItem(PWA_DISMISSED_KEY, 'true');
                    }
                    
                    deferredPrompt = null;
                    installBanner.remove();
                  }
                });
                
                // Auto-hide banner after 15 seconds
                setTimeout(() => {
                  if (installBanner.parentNode) {
                    localStorage.setItem(PWA_DISMISSED_KEY, 'true');
                    installBanner.style.transform = 'translateY(-100%)';
                    setTimeout(() => installBanner.remove(), 300);
                  }
                }, 15000);
              });

              // Handle successful installation
              window.addEventListener('appinstalled', (evt) => {
                console.log('PWA was installed successfully');
                const banner = document.getElementById('install-banner');
                if (banner) banner.remove();
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
