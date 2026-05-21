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

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Rutas del SPA desde PAGE_META ────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = Object.entries(PAGE_META)
    .filter(([, meta]) => !meta.noindex)
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
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.date
      ? new Date(post.date).toISOString().split('T')[0]
      : LAST_BUILD,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
