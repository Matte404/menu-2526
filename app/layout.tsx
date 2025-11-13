import type { Metadata, Viewport } from "next";
import "./globals.css";

const basePath = process.env.NODE_ENV === "production" ? "/menu-2526" : "";

export const metadata: Metadata = {
  title: "Menù Scuola - Menu Settimanale 2025-2026",
  description:
    "Menu settimanale della scuola primaria per l'anno scolastico 2025-2026",
  manifest: `${basePath}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Menù Scuola",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#7DD3C0",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${basePath}/icons/icon-192x192.png`} />
        <link
          rel="apple-touch-icon"
          href={`${basePath}/icons/icon-192x192.png`}
        />
        <meta name="apple-mobile-web-app-title" content="Menù Scuola" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  const basePath = '${basePath}';
                  const swPath = basePath ? basePath + '/sw.js' : '/sw.js';
                  const swScope = basePath ? basePath + '/' : '/';
                  
                  navigator.serviceWorker.register(swPath, { scope: swScope })
                    .then(function(registration) {
                      console.log('[PWA] Service Worker registered successfully:', registration.scope);
                      
                      // Check for updates
                      registration.addEventListener('updatefound', function() {
                        const newWorker = registration.installing;
                        console.log('[PWA] New Service Worker found, installing...');
                        
                        newWorker.addEventListener('statechange', function() {
                          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('[PWA] New Service Worker installed, refresh to activate');
                          }
                        });
                      });
                    })
                    .catch(function(err) {
                      console.error('[PWA] Service Worker registration failed:', err);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
