import React from "react";
import { Helmet } from "react-helmet-async";

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
}

/**
 * SEO helper — returns a <Helmet> element with all head tags pre-rendered.
 * Compatible with SSG (vite-react-ssg + react-helmet-async):
 *   - During renderToString: Helmet collects tags into HelmetContext → injected into static HTML
 *   - During hydration / client navigation: Helmet updates document.head normally
 *
 * USAGE: render the returned element inside your component's JSX tree.
 *   const seo = useSeo({...})
 *   return <>{seo}<main>...</main></>
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
}: SeoData): React.ReactElement {
  /* ── FAQ Schema (only items with plain-string answers) ── */
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
                url: "https://adeslas.numero1salud.es",
              },
            }
          : undefined,
        provider: {
          "@type": "InsuranceAgency",
          name: "Adeslas",
          url: "https://www.adeslas.es",
          foundingDate: "1972",
          description:
            "SegurCaixa Adeslas, aseguradora de salud líder en España con más de 40 años de experiencia y más de 42.000 especialistas.",
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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:site_name" content="Adeslas Seguros Médicos" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:width" content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Structured data */}
      {faqJsonLd && (
        <script type="application/ld+json">{faqJsonLd}</script>
      )}
      {productJsonLd && (
        <script type="application/ld+json">{productJsonLd}</script>
      )}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">{breadcrumbJsonLd}</script>
      )}
    </Helmet>
  );
}
