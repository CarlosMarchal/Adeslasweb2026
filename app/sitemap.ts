/**
 * app/sitemap.ts — Sitemap dinámico de Next.js
 *
 * Se genera automáticamente en cada build y en cada revalidación ISR (1 h).
 * Sustituye al sitemap.xml estático de /public/sitemap.xml, que queda
 * como fallback para rastreadores que no ejecuten JS.
 *
 * Fuentes de URLs:
 *  1. PAGE_META: todas las rutas del SPA con sus canonicals y fechas
 *  2. blogPosts: artículos del blog en /blog/:slug
 *
 * Google da prioridad al sitemap servido dinámicamente desde /sitemap.xml
 * (este archivo) sobre el estático si ambos tienen la misma URL.
 */

import { MetadataRoute } from 'next';
import { PAGE_META } from '@/data/pageMeta';
import { blogPosts } from '@/data/blogPosts';

const BASE = 'https://adeslas.numero1salud.es';

// Fecha de última modificación para páginas estáticas — se actualiza con cada deploy
const LAST_BUILD = new Date().toISOString().split('T')[0];

// Parseo seguro de fechas en formato "DD Mon YYYY" (ej: "14 May 2026").
// new Date("14 May 2026") funciona en V8 pero no está garantizado en todos los
// entornos de Node.js de Vercel — convertimos a ISO "YYYY-MM-DD" manualmente.
const MONTHS: Record<string, string> = {
  Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
  Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12',
};

function toSafeDate(dateStr: string): string {
  try {
    // Intenta parseo "DD Mon YYYY"
    const parts = dateStr.trim().split(' ');
    if (parts.length === 3) {
      const [day, mon, year] = parts;
      const month = MONTHS[mon];
      if (month) return `${year}-${month}-${day.padStart(2, '0')}`;
    }
    // Fallback: parseo nativo con guardia de validez
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toISOString().split('T')[0];
  } catch { /* noop */ }
  return LAST_BUILD;
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Rutas del SPA desde PAGE_META ────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = Object.entries(PAGE_META)
    // Excluir entradas individuales de /blog/:slug — ya se generan en blogRoutes.
    // Sin este filtro los artículos del blog aparecen dos veces en el sitemap,
    // lo que Google puede interpretar como señal de baja calidad del sitemap.
    .filter(([path, meta]) => !meta.noindex && !path.startsWith('/blog/'))
    .map(([, meta]) => ({
      url: meta.canonical.endsWith('/')
        ? meta.canonical
        : `${meta.canonical}/`,
      lastModified: LAST_BUILD,
      changeFrequency: meta.canonical === BASE + '/'
        ? 'weekly'
        : meta.canonical.includes('/blog/')
        ? 'monthly'
        : meta.canonical.includes('precios')
        ? 'weekly'
        : 'monthly',
      priority: meta.canonical === BASE + '/'
        ? 1.0
        : meta.canonical.includes('precios')
        ? 0.95
        : meta.canonical.includes('/seguro-salud/')
        ? 0.9
        : 0.7,
    }));

  // ── 2. Artículos del blog en /blog/:slug ────────────────────────────────────
  // Trailing slash obligatorio: next.config.js tiene trailingSlash: true, por lo
  // que la URL canónica de cada artículo es /blog/slug/ (con barra final).
  // Sin esta barra el sitemap enviaba a Google la URL incorrecta, que redirigía
  // con 308 añadiendo confusión al proceso de re-indexación.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}/`,
    lastModified: post.date ? toSafeDate(post.date) : LAST_BUILD,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
