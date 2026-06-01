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
 *
 * PERFORMANCE:
 * - revalidate = 3600 → ISR: Vercel cachea el HTML en el edge 1h.
 *   TTFB baja de ~1.4 s a <200 ms en visitas cacheadas.
 * - generateStaticParams → pre-renderiza todas las rutas conocidas en build time.
 *   Primera visita también sirve desde CDN sin hit al servidor.
 */
import type { Metadata } from 'next';
import nextDynamic from 'next/dynamic';
import { getPageMeta, PAGE_META } from '@/data/pageMeta';
import { FAQ_SCHEMAS } from '@/data/faqSchemas';

// ── ISR: cachear en edge durante 1 hora; revalidar en background ─────────────
export const revalidate = 3600;

// ── Pre-renderizar en build todas las rutas del mapa de metadatos ─────────────
export async function generateStaticParams() {
  return Object.keys(PAGE_META).map((path) => {
    const clean = path.replace(/^\//, '').replace(/\/$/, '');
    return { slug: clean ? clean.split('/') : [] };
  });
}

// ── Tipos ────────────────────────────────────────────────────────────────────
interface PageProps {
  params: { slug?: string[] };
}

// ── Schema base de Organización (se server-renderiza en todas las páginas) ───
// Señales de entidad ampliadas para LLMs (ChatGPT, Perplexity, Gemini):
// knowsAbout → lista explícita de temas que entienden los modelos de IA
// description → resumen de entidad que los LLMs usan como contexto
// hasOfferCatalog → catálogo de productos estructurado
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "LocalBusiness"],
  "name": "Marchal Aseguradores — Agente Exclusivo Adeslas",
  "alternateName": ["Adeslas Seguros Médicos", "numero1salud.es", "Marchal Aseguradores"],
  "description": "Marchal Aseguradores es agente exclusivo de Adeslas en España. Ofrecemos asesoramiento personalizado y contratación online de seguros médicos, dentales, de decesos y mascotas Adeslas. Más de 51.000 médicos y 1.400 centros en toda España.",
  "url": "https://adeslas.numero1salud.es",
  "logo": {
    "@type": "ImageObject",
    "url": "https://adeslas.numero1salud.es/logo-adeslas.webp",
    "width": 200,
    "height": 60
  },
  "telephone": "+34-917-105-000",
  "email": "adeslas@numero1salud.es",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "ES",
    "addressLocality": "Madrid",
    "addressRegion": "Madrid"
  },
  "areaServed": {
    "@type": "Country",
    "name": "España"
  },
  "priceRange": "€€",
  "knowsAbout": [
    "Seguros médicos privados en España",
    "Adeslas seguros de salud",
    "Adeslas Plena Total",
    "Adeslas Plena Vital",
    "Adeslas Plena Plus",
    "Adeslas GO",
    "Seguros dentales Adeslas",
    "Seguros de decesos Adeslas",
    "Seguros para autónomos",
    "Seguros médicos para familias",
    "Seguros médicos para extranjeros en España",
    "Copagos en seguros médicos",
    "Carencias en seguros médicos",
    "Cuadro médico Adeslas",
    "Deducción IRPF seguro médico autónomos"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Seguros Médicos Adeslas 2026",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas GO", "description": "Cobertura ambulatoria con copago desde 21€/mes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas Plena Vital", "description": "Cobertura completa con hospitalización y copago máx. 300€/año desde 38€/mes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas Plena Vital Total", "description": "Cobertura completa con dental y prima garantizada 3 años desde 48,50€/mes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas Plena Plus", "description": "Cobertura completa sin copago desde 62€/mes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas Plena Total", "description": "Cobertura completa sin copago, dental, psicología y viajes desde 83€/mes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas Extra 150", "description": "Libre elección médica con reembolso 80% hasta 150.000€/año desde 90€/mes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas Dental", "description": "Seguro dental sin carencias desde 9,45€/mes" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Adeslas Seniors", "description": "Seguro médico para mayores de 55 años con asesor personal desde 67,50€/mes" } }
    ]
  },
  // sameAs — señales de entidad verificable para LLMs (GEO)
  // ─────────────────────────────────────────────────────────────────────────
  // Cada URL que añadas aquí debe apuntar a un perfil REAL y activo.
  // Los LLMs (ChatGPT, Perplexity, Gemini) cruzan estas señales para decidir
  // si la entidad es confiable y qué información es canónica sobre ella.
  //
  // TODO — rellenar antes del próximo deploy:
  //   • LinkedIn Marchal Aseguradores: "https://www.linkedin.com/company/SLUG/"
  //     (busca en linkedin.com/company/ el slug exacto de tu empresa)
  //   • Google My Business: "https://maps.app.goo.gl/TU_ID"
  //     (copia la URL corta desde el botón "Compartir" de tu ficha de GMB)
  //   • Registro DGS mediadores: construye la URL así —
  //     https://www.registromediadores.dgsfp.mineco.es/consultas/detalleMediador.aspx?cod=TU_CODIGO
  //     (tu código de mediador está en el NIF + letra de control del Registro de la DGSFP)
  //   • Wikidata Adeslas (SegurCaixa Adeslas): busca en wikidata.org el QID
  //     exacto de "SegurCaixa Adeslas" para añadir "https://www.wikidata.org/wiki/QXXXXXX"
  // ─────────────────────────────────────────────────────────────────────────
  "sameAs": [
    // Perfiles oficiales Adeslas (marca representada) — verificados
    "https://www.instagram.com/adeslasseguros/",
    "https://www.facebook.com/adeslasseguros/",
    // Añadir aquí los TODOs de arriba cuando estén verificados:
    // "https://www.linkedin.com/company/TU_SLUG/",  ← TODO: LinkedIn Marchal Aseguradores
    "https://www.registromediadores.dgsfp.mineco.es/consultas/detalleMediador.aspx?cod=28101259",
    // "https://www.wikidata.org/wiki/QXXXXXX"
  ]
};

// ── Schema WebSite con Sitelinks Searchbox ───────────────────────────────────
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Adeslas Seguros Médicos",
  "url": "https://adeslas.numero1salud.es",
  "potentialAction": {
    "@type": "SearchAction",
    // Formato estándar de Google para Sitelinks Searchbox.
    // Se usa string directa (no objeto EntryPoint) para evitar que GSC
    // interprete la URL-template como una página real sin canonical.
    "target": "https://adeslas.numero1salud.es/cuadro-medico/?q={search_term_string}",
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
      siteName: 'Adeslas Seguros Médicos',
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

// ── HowTo schema para páginas de contratación ────────────────────────────────
const HOWTO_CONTRATAR = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Cómo contratar un seguro médico Adeslas online",
  "description": "Guía paso a paso para contratar un seguro médico Adeslas en menos de 2 minutos desde la web de Marchal Aseguradores.",
  "totalTime": "PT2M",
  "supply": [
    { "@type": "HowToSupply", "name": "DNI o NIE" },
    { "@type": "HowToSupply", "name": "IBAN de cuenta bancaria para domiciliación" }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "name": "Calcula tu precio",
      "text": "Usa el tarificador online para obtener el precio exacto de cada plan según tu edad y provincia. El proceso dura menos de 60 segundos y no requiere datos bancarios.",
      "url": "https://adeslas.numero1salud.es/"
    },
    {
      "@type": "HowToStep",
      "name": "Elige tu plan Adeslas",
      "text": "Compara los planes disponibles (GO, Plena Vital, Plena Plus, Plena Total, Extra 150) y selecciona el que mejor se adapta a tus necesidades y presupuesto.",
      "url": "https://adeslas.numero1salud.es/precios-y-ofertas/"
    },
    {
      "@type": "HowToStep",
      "name": "Completa el formulario de alta",
      "text": "Introduce los datos del titular y los asegurados, responde al breve cuestionario de salud (si aplica) e indica tu IBAN para la domiciliación de la prima.",
      "url": "https://adeslas.numero1salud.es/seguro-salud/adeslas-formulario-de-alta"
    },
    {
      "@type": "HowToStep",
      "name": "Confirma el alta y descarga la documentación",
      "text": "Una vez aprobada la solicitud, recibirás el número de póliza, las condiciones generales y el carnet de asegurado. La cobertura comienza el día 1 del mes de efecto elegido.",
      "url": "https://adeslas.numero1salud.es/seguro-salud/adeslas-formulario-de-alta"
    }
  ]
};

// ── Rutas que muestran el HowTo de contratación ───────────────────────────────
const HOWTO_ROUTES = new Set(['/como-contratar-adeslas', '/alta-adeslas', '/contratar']);

// ── Mapas de etiquetas de breadcrumb para rutas principales ──────────────────
const BREADCRUMB_LABELS: Record<string, string> = {
  'seguro-salud':        'Seguros de Salud',
  'seguro-dental':       'Seguro Dental',
  'seguro-decesos':      'Seguro Decesos',
  'seguro-mascotas':     'Seguro Mascotas',
  'seguro-accidentes':   'Seguro Accidentes',
  'adeslas-blog':        'Blog de Salud',
  'blog':                'Blog de Salud',
  'cuadro-medico':       'Cuadro Médico',
  'autonomos':           'Autónomos',
  'pymes':               'Pymes y Empresas',
  'precios-y-ofertas':   'Precios y Ofertas',
  'contacto':            'Contacto',
  'como-contratar-adeslas': 'Cómo Contratar',
  'alta-adeslas':        'Alta Adeslas',
  'precios-adeslas':     'Precios Adeslas',
};

const BASE_URL = 'https://adeslas.numero1salud.es';

/** Genera un BreadcrumbList schema a partir del pathname actual */
function buildBreadcrumbSchema(pathname: string, pageTitle: string) {
  if (pathname === '/') return null;

  const parts = pathname.replace(/^\//, '').replace(/\/$/, '').split('/');
  const items = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": BASE_URL + '/'
    }
  ];

  let accumulated = '';
  parts.forEach((part, idx) => {
    accumulated += '/' + part;
    const isLast = idx === parts.length - 1;
    const label = BREADCRUMB_LABELS[part] ?? (isLast ? pageTitle : part.replace(/-/g, ' '));
    items.push({
      "@type": "ListItem",
      "position": idx + 2,
      "name": label.length > 60 ? label.slice(0, 57) + '...' : label,
      "item": BASE_URL + accumulated + '/'
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items
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

  // BreadcrumbList — todas las páginas excepto homepage
  const breadcrumbSchema = buildBreadcrumbSchema(pathname, meta.title);
  const breadcrumbJsonLd = breadcrumbSchema ? JSON.stringify(breadcrumbSchema) : null;

  // HowTo — solo en páginas de contratación
  const showHowTo = HOWTO_ROUTES.has(pathname) || HOWTO_ROUTES.has(pathname.replace(/\/$/, ''));

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

      {/* BreadcrumbList — ayuda a Google y LLMs a entender la jerarquía del sitio */}
      {breadcrumbJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
        />
      )}

      {/* HowTo — páginas de contratación y alta */}
      {showHowTo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_CONTRATAR) }}
        />
      )}

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
