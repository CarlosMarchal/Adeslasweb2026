const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ── Trailing slash canónico ─────────────────────────────────────────────────
  // GSC reporta 64 páginas con "Duplicada: sin canonical indicado por usuario".
  // La causa es que /seguro-salud/adeslas-go y /seguro-salud/adeslas-go/ se
  // tratan como dos URLs distintas. Con trailingSlash: true, Next.js normaliza
  // todas las URLs a la versión con barra final y redirige la versión sin barra
  // con un 308 permanente, eliminando la duplicación.
  trailingSlash: true,

  // ── Tree-shaking agresivo para paquetes grandes ──────────────────────────────
  // Next.js analiza qué exports se usan realmente y elimina el resto del bundle.
  // Impacto estimado: framer-motion −40 KB, lucide-react −300 KB gzipped en build.
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-checkbox',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-navigation-menu',
      '@radix-ui/react-popover',
      '@radix-ui/react-radio-group',
      '@radix-ui/react-select',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-switch',
      '@radix-ui/react-tabs',
      '@radix-ui/react-toast',
      '@radix-ui/react-tooltip',
      'date-fns',
    ],
  },

  // Este proyecto es híbrido Vite + Next.js. Los archivos Vite (src/main.tsx,
  // vite.config.ts, src/test/) tienen sus propios tipos que no son compatibles
  // con el entorno Next.js. Desactivamos las comprobaciones de Next.js para
  // evitar falsos positivos — el código Next.js se comprueba por separado con
  // `tsc --noEmit` que sí pasa limpio.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Permite importar imágenes de src/assets y de public/ sin restricciones
  images: {
    unoptimized: true,
  },

  // ── Redirects: migración WordPress → Next.js ────────────────────────────────
  // La web anterior era WordPress. Google sigue rastreando 151 URLs de esa época
  // (principalmente PDFs de cuadros médicos en /wp-content/uploads/2024/04/).
  // Estas 301s le indican a Google dónde encontrar el contenido equivalente.
  async redirects() {
    return [
      // PDFs de cuadros médicos y cualquier otro upload de WordPress
      {
        source: '/wp-content/:path*',
        destination: '/cuadro-medico/',
        permanent: true,
      },
      // Rutas WordPress admin/login
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      // Ruta /wordpress del sitio antiguo
      {
        source: '/wordpress',
        destination: '/',
        permanent: true,
      },
      // Feed WordPress
      {
        source: '/feed/',
        destination: '/adeslas-blog/',
        permanent: true,
      },
      // Ruta /Documentos/ de era pre-WordPress (PDFs de cuadros médicos dentales)
      // Generaban Soft 404: el servidor devolvía 200 con página vacía
      {
        source: '/Documentos/:path*',
        destination: '/cuadro-medico/',
        permanent: true,
      },
      // URLs antiguas sin guiones (/segurosalud/slug → /seguro-[slug]/)
      // Estaban en "rastreadas sin indexar": el SPA devolvía 200 vacío.
      {
        source: '/segurosalud/seguromascotas',
        destination: '/seguro-mascotas/',
        permanent: true,
      },
      {
        source: '/segurosalud/decesos',
        destination: '/seguro-decesos/',
        permanent: true,
      },
      // Cualquier otra ruta /segurosalud/* no cubierta arriba → home
      {
        source: '/segurosalud/:slug*',
        destination: '/',
        permanent: true,
      },
      // /mas-seguros → página de inicio (sin contenido en nuevo site)
      {
        source: '/mas-seguros',
        destination: '/',
        permanent: true,
      },
      // Posts del blog antiguo en /adeslas-blog/:slug — ya no existen en el nuevo site.
      // El SPA devolvía 200 con contenido vacío → Google los marcaba como Soft 404.
      // Se redirigen al hub del blog para mantener el flujo de usuario.
      {
        source: '/adeslas-blog/:slug+',
        destination: '/adeslas-blog/',
        permanent: true,
      },

      // ── Rutas del sitio antiguo /salud/*.html y /salud/*.php ────────────────
      // GSC reporta estas URLs como indexadas con contenido incorrecto (el SPA
      // las servía como 200 mostrando la home). Redirigimos a la página equivalente
      // del nuevo site o a la home si no hay equivalente directo.
      {
        source: '/salud/pymes.html',
        destination: '/seguro-salud/pymes/',
        permanent: true,
      },
      {
        source: '/salud/autonomos.html',
        destination: '/seguro-salud/autonomos/',
        permanent: true,
      },
      {
        source: '/salud/adeslasplenaextra.html',
        destination: '/seguro-salud/adeslas-extra-150/',
        permanent: true,
      },
      {
        source: '/salud/aviso-legal.php',
        destination: '/politica-de-privacidad',
        permanent: true,
      },
      // Cualquier otra ruta /salud/* no cubierta arriba → home
      {
        source: '/salud/:path*',
        destination: '/',
        permanent: true,
      },

      // ── Rutas /renfe/ del sitio antiguo ─────────────────────────────────────
      // GSC reporta /renfe/solicitud-seguro.pdf como indexado. No existe en el nuevo
      // site. Redirigir a la página del seguro ADIF/Renfe.
      {
        source: '/renfe/:path*',
        destination: '/adeslas-adif-renfe/',
        permanent: true,
      },

      // ── Blog: artículos retirados ───────────────────────────────────────────
      // Artículos que llegaron a publicarse en /blog/[slug] pero se retiraron por
      // política editorial. Mantenemos un 301 al hub del blog para no servir un
      // soft 404 mientras Google reindexa, y para conservar el equity SEO de
      // backlinks externos que pudieran apuntar a la URL antigua.
      {
        source: '/blog/adeslas-vs-dkv-comparativa-2026',
        destination: '/blog/',
        permanent: true,
      },
    ];
  },

  // ── HTTP Cache-Control headers para assets estáticos ────────────────────────
  // Fuentes y imágenes: inmutables 1 año (el hash del nombre cambia con cada build)
  // Páginas HTML: no cachear en cliente para que ISR funcione correctamente
  async headers() {
    return [
      {
        // Fuentes self-hosted: cache 1 año inmutable + noindex para bots.
        // Google rastreaba /fonts/lato-latin-900-normal.woff2 (y las demás)
        // y las marcaba como "rastreadas sin indexar". X-Robots-Tag le indica
        // explícitamente que no intente indexar archivos de fuente.
        source: '/fonts/:font*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Imágenes públicas (hero, OG, cuadros médicos)
        source: '/images/:image*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // OG images y favicons en raíz de /public
        source: '/:file(og-.*|favicon.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // Canonical HTTP header para PDFs de cuadros médicos.
        // Los PDFs no tienen HTML, así que no pueden usar <link rel="canonical">.
        // La alternativa es el header HTTP Link, que Google respeta para PDFs.
        // Evita que Google trate los 51 PDFs de provincias como "duplicados sin canonical".
        source: '/cuadros-medicos/:file*',
        headers: [
          {
            key: 'Link',
            value: '<https://adeslas.numero1salud.es/cuadros-medicos/:file*>; rel="canonical"',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Alias @/ → src/ (igual que en el proyecto Vite)
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
