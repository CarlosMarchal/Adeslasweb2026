import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import '../src/App.css';

export const metadata: Metadata = {
  // metadataBase es necesario para que Next.js resuelva correctamente las URLs
  // relativas de OG images, canonical y demás en todas las páginas.
  metadataBase: new URL('https://adeslas.numero1salud.es'),

  // Título fallback (rutas sin generateMetadata) y template para las que sí lo tienen.
  // El template se aplica cuando cada página devuelve solo un string en title.
  title: {
    default: 'Adeslas Seguros Médicos 2026 | Desde 21€/mes · +51.000 Médicos',
    template: '%s | Adeslas Seguros Médicos',
  },

  // Descripción fallback — visible si generateMetadata no devuelve description
  description:
    'Contrata tu seguro médico Adeslas online. Desde 21€/mes, +51.000 médicos, sin copago desde 62€. Calcula tu precio y alta inmediata.',

  robots: {
    index: true,
    follow: true,
  },

  // Datos de verificación de propiedad — no requieren modificar el <head> manualmente
  // (descomenta y añade el contenido cuando se genere la verificación en GSC/Bing)
  // verification: {
  //   google: 'TU_TOKEN_DE_VERIFICACION',
  // },
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
        {/* ── LCP hero image — preload responsivo en el layout base ────────────
            Precargar ANTES de que el SPA hidrate reduce el Resource Load Delay
            de LCP de ~1000 ms a <50 ms. Se envían dos preloads con media query:
            · mobile (≤768px): 36 KB en lugar de 85 KB → -54% en móvil
            · desktop (>768px): versión 1440px optimizada
            En otras rutas estos preloads son inofensivos (el navegador detecta
            que las imágenes no se usan y las descarta sin coste). ─────────────── */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-adeslas-seguros-medicos-mobile.webp"
          media="(max-width: 768px)"
          // @ts-ignore
          fetchPriority="high"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero-adeslas-seguros-medicos.webp"
          media="(min-width: 769px)"
          // @ts-ignore
          fetchPriority="high"
          type="image/webp"
        />

        {/* ── Fuentes Lato (self-hosted, sin petición externa) ─────────────── */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-300-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-400-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-700-normal.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/lato-latin-900-normal.woff2" crossOrigin="anonymous" />

        {/* ── GTM / Google — preconnect (GTM carga afterInteractive, tras hidratación) ─
            afterInteractive garantiza carga siempre, independientemente de interacción.
            preconnect adelanta la resolución DNS+TCP+TLS para que gtm.js cargue rápido. ── */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://stats.g.doubleclick.net" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />

        {/* ── HubSpot — dns-prefetch (carga a los 12 s o en interacción, >10 s timeout) */}
        <link rel="dns-prefetch" href="https://js.hs-scripts.com" />
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

        {/* ── GTM loader — afterInteractive: carga tras hidratación, SIEMPRE,
            independientemente de si el usuario interactúa o no.
            Los eventos encolados en window.dataLayer (generate_lead, click_to_call…)
            se procesan en cuanto GTM carga. NO usar IIFE con espera de interacción:
            ese patrón pierde eventos de usuarios que rebotan sin interactuar (ver CLAUDE.md §3.2). ─ */}
        <Script
          id="gtm-loader"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />

        {/* ── HubSpot tracking pixel — se carga en primer evento de usuario ──────
            hs-analytics genera 619 ms de TBT incluso con lazyOnload (carga en idle
            pero el idle puede coincidir con el window de medición TBT 0-5 s).
            Moviéndolo a post-interacción lo sacamos completamente del window TBT.
            Fallback a 12 s para capturar visitas que no interactúan (bots, etc.). ─ */}
        <Script
          id="hs-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var loaded=false;
  function load(){
    if(loaded)return;loaded=true;
    var s=document.createElement('script');
    s.src='//js.hs-scripts.com/${HS_PORTAL}.js';
    s.async=true;s.defer=true;
    document.body.appendChild(s);
  }
  ['scroll','click','touchstart','keydown','mousemove'].forEach(function(e){
    window.addEventListener(e,load,{once:true,passive:true});
  });
  setTimeout(load,12000);
})();
`,
          }}
        />
      </body>
    </html>
  );
}
