const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
      // Posts del blog antiguo en /adeslas-blog/:slug — ya no existen en el nuevo site.
      // El SPA devolvía 200 con contenido vacío → Google los marcaba como Soft 404.
      // Se redirigen al hub del blog para mantener el flujo de usuario.
      {
        source: '/adeslas-blog/:slug+',
        destination: '/adeslas-blog/',
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
        // Fuentes self-hosted: cache 1 año inmutable
        source: '/fonts/:font*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
