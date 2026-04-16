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
import { FAQ_SCHEMAS } from '@/data/faqSchemas';

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

const OG_DEFAULT = 'https://adeslas.numero1salud.es/og-default.jpg';

// ── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params.slug ?? [];
  const pathname = slug.length > 0 ? `/${slug.join('/')}` : '/';
  const meta = getPageMeta(pathname);
  const ogImage = meta.ogImage ?? OG_DEFAULT;

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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

// ── Cargamos el SPA sin SSR (react-router-dom no es compatible con RSC) ──────
const AppSPA = nextDynamic(() => import('@/App'), { ssr: false });

// ── Componente de página ─────────────────────────────────────────────────────
export default function CatchAllPage({ params }: PageProps) {
  const slug = params.slug ?? [];
  const pathname = slug.length > 0 ? `/${slug.join('/')}` : '/';
  const meta = getPageMeta(pathname);

  // FAQ JSON-LD para esta ruta (si existe)
  const faqs = FAQ_SCHEMAS[pathname] ?? FAQ_SCHEMAS[pathname.replace(/\/$/, '')] ?? null;
  const faqJsonLd = faqs && faqs.length > 0
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      })
    : null;

  return (
    <>
      {/* Preload imagen hero — mejora LCP en móvil (React 18 hoist to <head>) */}
      {meta.preloadImage && (
        <link
          rel="preload"
          as="image"
          href={meta.preloadImage}
          // @ts-ignore — fetchPriority es válido en React 18 / HTML spec
          fetchPriority="high"
          type="image/webp"
        />
      )}

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

      {/* FAQ Schema por página — server-rendered para que Google lo lea sin JS */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      )}

      {/* SPA de React Router — se hidrata en el cliente */}
      <AppSPA />
    </>
  );
}
