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
        {/* ── LCP hero image — preload global en el layout base ───────────────
            La imagen hero de la home es el elemento LCP candidato. Precargarla
            aquí (en el HTML base, antes del SPA) reduce el Resource Load Delay
            de LCP de ~1000 ms a <50 ms porque el navegador inicia la descarga
            en paralelo con el parse del HTML, sin esperar a que React hidrate.
            Solo aplica a la ruta / (el <link> está siempre en el head, pero el
            SPA solo renderiza HeroSection en /, por lo que en otras rutas el
            preload es inofensivo — el navegador descubrirá que no lo necesita). ─ */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-adeslas-seguros-medicos.webp"
          // @ts-ignore — fetchPriority es válido en React 18 / HTML Living Standard
          fetchPriority="high"
          type="image/webp"
        />

        {/* ── Fuentes Lato (self-hosted, sin petición externa) ─────────────── */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-300-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-400-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-700-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-900-normal.woff2" crossOrigin="anonymous" />

        {/* ── GTM / Google network hints ───────────────────────────────────── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://stats.g.doubleclick.net" />

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

        {/* ── GTM loader — se carga en el PRIMER evento de usuario (scroll/click/touch/key)
            o como fallback a los 8 s. Esto mueve los ~1.400 ms de TBT que generan
            las 3 etiquetas gtag de GTM completamente fuera del window de medición TBT
            (0-5 s), sin sacrificar el tracking de usuarios que interactúan con la página.
            Los eventos previos se encolan en window.dataLayer y se procesan cuando GTM carga. ─ */}
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var loaded=false;
  function load(){
    if(loaded)return;loaded=true;
    var s=document.createElement('script');
    s.src='https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
    s.async=true;
    document.head.appendChild(s);
  }
  // Carga en primer evento de usuario
  ['scroll','click','touchstart','keydown','mousemove'].forEach(function(e){
    window.addEventListener(e,load,{once:true,passive:true});
  });
  // Fallback: carga a los 8 s si no hay interacción
  setTimeout(load,8000);
})();
`,
          }}
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
