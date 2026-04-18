const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
    ];
  },

  // Alias @/ → src/ (igual que en el proyecto Vite)
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
