/**
 * seoSchemas.ts — JSON-LD + metadata server-side para las rutas SSG (Fase 1).
 *
 * Replica las señales que hoy emite el catch-all (app/[[...slug]]/page.tsx) +
 * el Product schema que el SPA añadía vía useSeo, para que las páginas migradas
 * tengan EXACTAMENTE los mismos datos estructurados en el HTML inicial.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import type { Metadata } from "next";
import { FAQ_SCHEMAS } from "@/data/faqSchemas";

const BASE_URL = "https://adeslas.numero1salud.es";
const OG_DEFAULT = `${BASE_URL}/og-default.jpg`;

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["InsuranceAgency", "LocalBusiness"],
  name: "Marchal Aseguradores — Agente Exclusivo Adeslas",
  alternateName: ["Adeslas Seguros Médicos", "numero1salud.es", "Marchal Aseguradores"],
  description:
    "Marchal Aseguradores es agente exclusivo de Adeslas en España. Ofrecemos asesoramiento personalizado y contratación online de seguros médicos, dentales, de decesos y mascotas Adeslas. Más de 51.000 médicos y 1.400 centros en toda España.",
  url: BASE_URL,
  logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-adeslas.webp`, width: 200, height: 60 },
  telephone: "+34-917-105-000",
  email: "adeslas@numero1salud.es",
  address: { "@type": "PostalAddress", addressCountry: "ES", addressLocality: "Madrid", addressRegion: "Madrid" },
  areaServed: { "@type": "Country", name: "España" },
  priceRange: "€€",
  sameAs: [
    "https://www.instagram.com/adeslasseguros/",
    "https://www.facebook.com/adeslasseguros/",
    "https://www.registromediadores.dgsfp.mineco.es/consultas/detalleMediador.aspx?cod=28101259",
  ],
};

export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Adeslas Seguros Médicos",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/cuadro-medico/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export interface ProductSchemaInput {
  name: string;
  description: string;
  category: string;
  price?: string;
  pricePeriod?: string;
}

export function buildBreadcrumbSchema(pathname: string, pageTitle: string) {
  if (pathname === "/") return null;
  const parts = pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
  const items: Array<Record<string, unknown>> = [
    { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL + "/" },
  ];
  let accumulated = "";
  parts.forEach((part, idx) => {
    accumulated += "/" + part;
    const isLast = idx === parts.length - 1;
    const label = isLast ? pageTitle : part.replace(/-/g, " ");
    items.push({
      "@type": "ListItem",
      position: idx + 2,
      name: label.length > 60 ? label.slice(0, 57) + "..." : label,
      item: BASE_URL + accumulated + "/",
    });
  });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

export function buildProductSchema(p: ProductSchemaInput, url: string, image?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    category: p.category,
    image: image ?? OG_DEFAULT,
    brand: { "@type": "Brand", name: "Adeslas" },
    offers: p.price
      ? {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.price,
            priceCurrency: "EUR",
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: "1",
              unitText: p.pricePeriod === "month" ? "month" : "year",
            },
          },
          availability: "https://schema.org/InStock",
          url,
          seller: { "@type": "InsuranceAgency", name: "Marchal Mediadores · Agente Exclusivo Adeslas", url: BASE_URL },
        }
      : undefined,
    provider: { "@type": "InsuranceAgency", name: "Adeslas", url: "https://www.adeslas.es" },
  };
}

export interface ArticleSchemaInput {
  title: string;
  seoDescription: string;
  image: string;
  date: string;
  category: string;
}

/**
 * Article schema server-side para los posts del blog. Equivalente al que el SPA
 * (BlogArticle.tsx) inyectaba en cliente, para que el HTML inicial lo incluya.
 */
export function buildArticleSchema(post: ArticleSchemaInput, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Marchal Aseguradores",
      url: BASE_URL,
      description:
        "Agente exclusivo Adeslas con más de 15 años de experiencia en el sector del seguro médico privado en España.",
    },
    publisher: {
      "@type": "Organization",
      name: "Marchal Aseguradores — Agente Exclusivo Adeslas",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo-adeslas.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: post.category,
    inLanguage: "es-ES",
    about: { "@type": "Thing", name: "Seguros médicos Adeslas en España" },
  };
}

/** FAQPage schema desde una lista de pares pregunta/respuesta (bloques faq del post). */
export function buildBlogFaqSchema(faqItems: Array<{ q: string; a: string }>) {
  if (!faqItems || faqItems.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** FAQPage schema desde FAQ_SCHEMAS (claves cortas, p.ej. "/adeslas-go"). */
export function buildFaqSchema(faqKey: string) {
  const faqs = FAQ_SCHEMAS[faqKey] ?? FAQ_SCHEMAS[faqKey.replace(/\/$/, "")];
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Metadata nativo de Next a partir de los campos SEO de la página. */
export function buildMetadata(opts: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noindex?: boolean;
}): Metadata {
  const ogImage = opts.ogImage ?? OG_DEFAULT;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.canonical },
    robots: opts.noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: opts.canonical,
      siteName: "Adeslas Seguros Médicos",
      locale: "es_ES",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [ogImage] },
  };
}
