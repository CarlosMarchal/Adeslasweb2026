import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import '../src/App.css';

export const metadata: Metadata = {
  title: 'Adeslas 2026',
  description: 'Web Adeslas - Seguros de Salud',
  robots: {
    index: true,
    follow: true,
  },
};

const GTM_ID = 'GTM-M6ZDN42';
const HS_PORTAL = '6596944';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* ── Fuentes Lato ─────────────────────────────────────────────────── */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-400-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-700-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-900-normal.woff2" crossOrigin="anonymous" />

        {/* ── HubSpot network hints ────────────────────────────────────────── */}
        <link rel="preconnect" href="https://js.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://api.hsforms.com" />
        <link rel="dns-prefetch" href="https://js.hs-analytics.net" />
        <link rel="dns-prefetch" href="https://js.hscollectedforms.net" />
        <link rel="dns-prefetch" href="https://js.hs-banner.com" />
        <link rel="dns-prefetch" href="https://js.hsadspixel.net" />

        {/* ── Google Tag Manager (dataLayer init — MUST be in <head>) ──────── */}
        <Script
          id="gtm-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>

      <body>
        {/* ── GTM noscript (fallback sin JS) ───────────────────────────────── */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {children}

        {/* ── HubSpot tracking pixel — async/defer para no bloquear LCP ───── */}
        <Script
          id="hs-script"
          src={`//js.hs-scripts.com/${HS_PORTAL}.js`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
