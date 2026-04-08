import React from "react";
import { Helmet } from "react-helmet-async";

/* ────────────────────────────────────────────────
   Constantes del negocio (actualizadas en un solo lugar)
──────────────────────────────────────────────── */
export const SITE = {
  name: "Adeslas Seguros Médicos",
  legalName: "Marchal Mediadores S.L.U.",
  url: "https://adeslas.numero1salud.es",
  phone: "+34917105000",
  phoneDisplay: "91 710 50 00",
  email: "info@marchalconsultores.com",
  address: {
    street: "Avenida de Filipinas, 28",
    city: "Madrid",
    region: "Comunidad de Madrid",
    postalCode: "28003",
    country: "ES",
  },
  geo: { lat: 40.4386, lng: -3.7071 },
  hours: "Mo-Fr 09:00-19:00",
  logo: "https://adeslas.numero1salud.es/logo-adeslas.png",
  ogDefault: "https://adeslas.numero1salud.es/og-default.jpg",
  social: {
    facebook: "https://www.facebook.com/adeslas",
  },
} as const;

/* ────────────────────────────────────────────────
   Tipos
──────────────────────────────────────────────── */
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProductSchemaData {
  name: string;
  description: string;
  category: string;
  url: string;
  price?: string;
  pricePeriod?: string; // "year" | "month"
}

interface SeoData {
  title: string;
  description: string;
  canonical: string;
  faqSchema?: { q: string; a: string | React.ReactNode }[];
  /* Open Graph */
  ogImage?: string;
  ogType?: string; // default "website"
  /* Product schema (InsuranceProduct) */
  productSchema?: ProductSchemaData;
  /* Breadcrumbs */
  breadcrumbs?: BreadcrumbItem[];
  /* GEO: Organization / WebSite schemas en homepage */
  addOrganizationSchema?: boolean;
  addWebsiteSchema?: boolean;
  /* GEO: LocalBusiness en Contacto */
  addLocalBusinessSchema?: boolean;
  /* noindex para páginas internas/landings */
  noindex?: boolean;
  /* robots personalizado */
  robots?: string;
}

/* ────────────────────────────────────────────────
   Schemas JSON-LD reutilizables
──────────────────────────────────────────────── */

/** InsuranceAgency / Organization — para homepage */
const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "LocalBusiness"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: SITE.logo,
    width: 200,
    height: 60,
  },
  image: SITE.ogDefault,
  description:
    "Agencia Exclusiva de Adeslas en Madrid. Especialistas en seguros médicos privados: Adeslas GO, Plena Vital, Plena Total, Seniors y más. Más de 51.000 médicos en toda España.",
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "19:00",
  },
  areaServed: { "@type": "Country", name: "España" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Seguros Médicos Adeslas",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas GO" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Vital" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Vital Total" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Plus" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Plena Total" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Extra 150" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Seniors" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Adeslas Seniors Total" } },
    ],
  },
  sameAs: [
    "https://www.adeslas.es",
    SITE.social.facebook,
    `${SITE.url}/contacto/`,
  ],
});

/** WebSite con SearchAction — para homepage */
const websiteJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description:
    "Compara y contrata los seguros médicos Adeslas en España. Más de 51.000 médicos. Calcula tu precio en 2 minutos.",
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "es-ES",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/cuadro-medico/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
});

/** LocalBusiness ampliado — para página de Contacto */
const localBusinessJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#localbusiness`,
  name: SITE.name,
  legalName: SITE.legalName,
  description:
    "Agencia Exclusiva Adeslas en Madrid. Asesoramiento personalizado para contratar tu seguro médico privado. Presupuesto sin compromiso por teléfono o en oficina.",
  url: `${SITE.url}/contacto/`,
  telephone: SITE.phone,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Domiciliación bancaria, Tarjeta",
  image: SITE.ogDefault,
  logo: SITE.logo,
  hasMap: "https://maps.google.com/?q=Avenida+de+Filipinas+28+Madrid",
  areaServed: [
    { "@type": "City", name: "Madrid" },
    { "@type": "Country", name: "España" },
  ],
  sameAs: [SITE.url, SITE.social.facebook],
});

/* ────────────────────────────────────────────────
   Hook principal
──────────────────────────────────────────────── */

/**
 * SEO+GEO helper — devuelve un <Helmet> con todas las etiquetas head.
 * Compatible con SSG (vite-react-ssg + react-helmet-async).
 */
export function useSeo({
  title,
  description,
  canonical,
  faqSchema,
  ogImage,
  ogType = "website",
  productSchema,
  breadcrumbs,
  addOrganizationSchema = false,
  addWebsiteSchema = false,
  addLocalBusinessSchema = false,
  noindex = false,
  robots,
}: SeoData): React.ReactElement {
  /* ── FAQ Schema (solo items con respuestas de texto plano) ── */
  const stringFaqs = faqSchema?.filter((f) => typeof f.a === "string") as
    | { q: string; a: string }[]
    | undefined;

  const faqJsonLd =
    stringFaqs && stringFaqs.length > 0
      ? JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: stringFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        })
      : null;

  /* ── Product Schema (InsuranceProduct) ── */
  const productJsonLd = productSchema
    ? JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: productSchema.name,
        description: productSchema.description,
        category: productSchema.category,
        brand: { "@type": "Brand", name: "Adeslas" },
        offers: productSchema.price
          ? {
              "@type": "Offer",
              price: productSchema.price,
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: productSchema.price,
                priceCurrency: "EUR",
                referenceQuantity: {
                  "@type": "QuantitativeValue",
                  value: "1",
                  unitText:
                    productSchema.pricePeriod === "month" ? "month" : "year",
                },
              },
              availability: "https://schema.org/InStock",
              url: productSchema.url,
              seller: {
                "@type": "InsuranceAgency",
                name: "Marchal Mediadores · Agente Exclusivo Adeslas",
                url: SITE.url,
              },
            }
          : undefined,
        provider: {
          "@type": "InsuranceAgency",
          name: "Adeslas",
          url: "https://www.adeslas.es",
          foundingDate: "1972",
          description:
            "SegurCaixa Adeslas, aseguradora de salud líder en España con más de 40 años de experiencia y más de 51.000 especialistas.",
        },
      })
    : null;

  /* ── BreadcrumbList Schema ── */
  const breadcrumbJsonLd =
    breadcrumbs && breadcrumbs.length > 0
      ? JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: b.url,
          })),
        })
      : null;

  /* ── robots meta ── */
  const robotsContent = robots ?? (noindex ? "noindex, nofollow" : "index, follow");

  /* ── OG image final ── */
  const finalOgImage = ogImage ?? SITE.ogDefault;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:image" content={finalOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalOgImage} />

      {/* Structured data: FAQ */}
      {faqJsonLd && (
        <script type="application/ld+json">{faqJsonLd}</script>
      )}
      {/* Structured data: Producto */}
      {productJsonLd && (
        <script type="application/ld+json">{productJsonLd}</script>
      )}
      {/* Structured data: Breadcrumbs */}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">{breadcrumbJsonLd}</script>
      )}
      {/* GEO: Organization + InsuranceAgency */}
      {addOrganizationSchema && (
        <script type="application/ld+json">{organizationJsonLd}</script>
      )}
      {/* GEO: WebSite con SearchAction */}
      {addWebsiteSchema && (
        <script type="application/ld+json">{websiteJsonLd}</script>
      )}
      {/* GEO: LocalBusiness (Contacto) */}
      {addLocalBusinessSchema && (
        <script type="application/ld+json">{localBusinessJsonLd}</script>
      )}
    </Helmet>
  );
}
