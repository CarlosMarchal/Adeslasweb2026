const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Permite importar imágenes de src/assets y de public/ sin restricciones
  images: {
    unoptimized: true,
  },

  // Alias @/ → src/ (igual que en el proyecto Vite)
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

module.exports = nextConfig;
