/**
 * Catch-all route: sirve el SPA de React Router (src/App.tsx) para todas las rutas
 * que no tienen una página explícita en /app (contratar, internal/tarificador, api).
 *
 * ESTRATEGIA SEO HÍBRIDA:
 * - El <head> (title, description, canonical, OG, JSON-LD) se server-renderiza
 *   gracias a generateMetadata → Google recibe metadatos correctos en el HTML inicial.
 * - El <body> se hidrata client-side con React Router (ssr: false).
 *
 * Esto replica la ventaja SEO del antiguo vite-react-ssg sin necesidad de
 * convertir cada componente del SPA a RSC.
 */
import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { getPageMeta } from '@/data/pageMeta';

// ── Tipos ────────────────────────────────────────────────────────────────────
interface PageProps {
  params: { slug?: string[] };
}

// ── Schema base de Organización (se server-renderiza en todas las páginas) ───
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  "name": "Marchal Aseguradores",
  "alternateName": "Adeslas Seguros Médicos — Agente Exclusivo",
  "url": "https://adeslas.numero1salud.es",
  "logo": "https://adeslas.numero1salud.es/logo-marchal-aseguradores.webp",
  "telephone": "+34-626-865-379",
  "email": "adeslas@numero1salud.es",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ES",
    "addressLocality": "Madrid"
  },
  "areaServed": "ES",
  "priceRange": "€€",
  "sameAs": [
    "https://www.instagram.com/adeslasseguros/",
    "https://www.facebook.com/adeslasseguros/"
  ]
};

// ── Schema WebSite con Sitelinks Searchbox ───────────────────────────────────
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Adeslas Seguros Médicos — Marchal Aseguradores",
  "url": "https://adeslas.numero1salud.es",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://adeslas.numero1salud.es/cuadro-medico?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// ── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug ?? [];
  const pathname = slug.length > 0 ? `/${slug.join('/')}` : '/';
  const meta = getPageMeta(pathname);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: meta.canonical,
    },
    robots: meta.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: meta.canonical,
      siteName: 'Adeslas Seguros Médicos — Marchal Aseguradores',
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

// ── Cargamos el SPA sin SSR (react-router-dom no es compatible con RSC) ──────
const AppSPA = nextDynamic(() => import('@/App'), { ssr: false });

// ── Componente de página ─────────────────────────────────────────────────────
export default function CatchAllPage() {
  return (
    <>
      {/* JSON-LD server-renderizado: garantiza que Google indexe la entidad
          aunque el resto del contenido se hidrate client-side */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
      />

      {/* SPA de React Router — se hidrata en el cliente */}
      <AppSPA />
    </>
  );
}
