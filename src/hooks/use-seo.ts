import { useEffect } from "react";

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
  faqSchema?: { q: string; a: string }[];
  /* Open Graph */
  ogImage?: string;
  ogType?: string; // default "website"
  /* Product schema (InsuranceProduct) */
  productSchema?: ProductSchemaData;
  /* Breadcrumbs */
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * Custom SEO hook — sets document title, meta description, canonical URL,
 * Open Graph tags, Twitter Card, robots and optionally injects:
 *   - FAQ structured data (FAQPage)
 *   - Product structured data (InsuranceProduct)
 *   - BreadcrumbList structured data
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
}: SeoData) {
  useEffect(() => {
    /* ── Helpers ── */
    function setMeta(selector: string, attr: string, value: string) {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        const [attrName, attrVal] = attr.split("=");
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.content = value;
    }

    function setLink(rel: string, href: string) {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        document.head.appendChild(el);
      }
      el.href = href;
    }

    function injectSchema(id: string, data: object) {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    }

    /* ── Title ── */
    document.title = title;

    /* ── Meta basic ── */
    setMeta('meta[name="description"]', "name=description", description);
    setMeta('meta[name="robots"]', "name=robots", "index, follow");

    /* ── Canonical ── */
    setLink("canonical", canonical);

    /* ── Open Graph ── */
    setMeta('meta[property="og:title"]', "property=og:title", title);
    setMeta('meta[property="og:description"]', "property=og:description", description);
    setMeta('meta[property="og:type"]', "property=og:type", ogType);
    setMeta('meta[property="og:url"]', "property=og:url", canonical);
    setMeta('meta[property="og:locale"]', "property=og:locale", "es_ES");
    setMeta('meta[property="og:site_name"]', "property=og:site_name", "Marchal Mediadores · Adeslas");
    if (ogImage) {
      setMeta('meta[property="og:image"]', "property=og:image", ogImage);
      setMeta('meta[property="og:image:width"]', "property=og:image:width", "1200");
      setMeta('meta[property="og:image:height"]', "property=og:image:height", "630");
    }

    /* ── Twitter Card ── */
    setMeta('meta[name="twitter:card"]', "name=twitter:card", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "name=twitter:title", title);
    setMeta('meta[name="twitter:description"]', "name=twitter:description", description);
    if (ogImage) {
      setMeta('meta[name="twitter:image"]', "name=twitter:image", ogImage);
    }

    /* ── FAQ Schema (FAQPage) ── */
    const faqId = "schema-faq";
    if (faqSchema && faqSchema.length > 0) {
      injectSchema(faqId, {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqSchema.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    } else {
      document.getElementById(faqId)?.remove();
    }

    /* ── Product Schema (InsuranceProduct) ── */
    const productId = "schema-product";
    if (productSchema) {
      injectSchema(productId, {
        "@context": "https://schema.org",
        "@type": "Product",
        name: productSchema.name,
        description: productSchema.description,
        category: productSchema.category,
        brand: {
          "@type": "Brand",
          name: "Adeslas",
        },
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
                  unitText: productSchema.pricePeriod === "month" ? "month" : "year",
                },
              },
              availability: "https://schema.org/InStock",
              url: productSchema.url,
              seller: {
                "@type": "InsuranceAgency",
                name: "Marchal Mediadores · Agente Exclusivo Adeslas",
                url: "https://adeslas.marchalaseguradores.es",
              },
            }
          : undefined,
        provider: {
          "@type": "InsuranceAgency",
          name: "Adeslas",
          url: "https://www.adeslas.es",
          foundingDate: "1972",
          description: "SegurCaixa Adeslas, aseguradora de salud líder en España con más de 40 años de experiencia y más de 42.000 especialistas.",
        },
      });
    } else {
      document.getElementById(productId)?.remove();
    }

    /* ── BreadcrumbList Schema ── */
    const breadcrumbId = "schema-breadcrumb";
    if (breadcrumbs && breadcrumbs.length > 0) {
      injectSchema(breadcrumbId, {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.url,
        })),
      });
    } else {
      document.getElementById(breadcrumbId)?.remove();
    }

    return () => {
      document.getElementById(faqId)?.remove();
      document.getElementById(productId)?.remove();
      document.getElementById(breadcrumbId)?.remove();
    };
  }, [title, description, canonical, faqSchema, ogImage, ogType, productSchema, breadcrumbs]);
}
