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
        {/* ── Fuentes Lato (self-hosted, sin petición externa) ─────────────── */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-300-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-400-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-700-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-900-normal.woff2" crossOrigin="anonymous" />

        {/* ── GTM / Google network hints ───────────────────────────────────── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* ── HubSpot network hints ────────────────────────────────────────── */}
        <link rel="preconnect" href="https://js.hs-scripts.com" />
        <link rel="dns-prefetch" href="https://api.hsforms.com" />
        <link rel="dns-prefetch" href="https://js.hs-analytics.net" />
        <link rel="dns-prefetch" href="https://js.hscollectedforms.net" />
        <link rel="dns-prefetch" href="https://js.hs-banner.com" />
        <link rel="dns-prefetch" href="https://js.hsadspixel.net" />

        {/* ── Google Tag Manager — dataLayer init (inline, no bloquea render) ─
            Solo inicializa el array; el script gtm.js se carga afterInteractive
            para no penalizar LCP/FCP. Los eventos previos a la carga de GTM
            se encolan en dataLayer y se procesan cuando GTM está listo. ─────── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
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

        {/* ── GTM loader — afterInteractive: no bloquea LCP/FCP ───────────── */}
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />

        {/* ── HubSpot tracking pixel — lazyOnload: carga en idle ───────────── */}
        <Script
          id="hs-script"
          src={`//js.hs-scripts.com/${HS_PORTAL}.js`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
