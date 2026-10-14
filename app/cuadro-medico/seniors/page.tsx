import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import { SrOnlyHeadings } from "@/components/ssg/SrOnlyHeadings";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import { PROVINCIAS_SENIORS, seniorsPdfUrl, SENIORS_FECHAS } from "@/data/cuadroMedicoSeniors";
import CuadroMedicoSeniorsClient from "./CuadroMedicoSeniorsClient";

const PATHNAME = "/cuadro-medico/seniors/";
const FAQ_KEY = "/cuadro-medico/seniors";
const BASE_URL = "https://adeslas.numero1salud.es";

export const dynamic = "force-static";

const meta = getPageMeta(PATHNAME);

export function generateMetadata(): Metadata {
  const base = buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    ogImage: meta.ogImage,
    noindex: meta.noindex,
  });
  // Título absoluto: sin el sufijo del template (" | Adeslas Seguros Médicos"),
  // que lo llevaba a ~80 caracteres y Google lo truncaba en la SERP.
  return { ...base, title: { absolute: meta.title } };
}

/** Breadcrumb con etiquetas legibles (el genérico usaría "cuadro medico"). */
const BREADCRUMB_SCHEMA = (() => {
  const b = buildBreadcrumbSchema(PATHNAME, "Cuadro Médico Adeslas Seniors 2026");
  if (b && Array.isArray(b.itemListElement) && b.itemListElement[1]) {
    (b.itemListElement[1] as Record<string, unknown>).name = "Cuadro Médico Adeslas";
  }
  return b;
})();

/** Los 12 PDF provinciales como colección descargable (señal para buscadores y LLMs). */
const COLLECTION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Cuadro Médico Adeslas Seniors 2026",
  url: meta.canonical,
  inLanguage: "es-ES",
  datePublished: SENIORS_FECHAS.publicado,
  dateModified: SENIORS_FECHAS.modificado,
  isPartOf: { "@type": "WebSite", name: "Adeslas Seguros Médicos", url: `${BASE_URL}/` },
  publisher: {
    "@type": "InsuranceAgency",
    name: "Marchal Aseguradores — Agente Exclusivo Adeslas",
    url: `${BASE_URL}/`,
  },
  citation: { "@type": "Organization", name: "SegurCaixa Adeslas", url: "https://www.segurcaixaadeslas.es/" },
  about: { "@type": "Product", name: "Adeslas Seniors", brand: { "@type": "Brand", name: "Adeslas" } },
  hasPart: PROVINCIAS_SENIORS.map((p) => ({
    "@type": "DigitalDocument",
    name: `Cuadro médico Adeslas Seniors 2026 ${p.nombre}`,
    url: `${BASE_URL}${seniorsPdfUrl(p.slug)}`,
    encodingFormat: "application/pdf",
    numberOfPages: p.paginas,
    spatialCoverage: { "@type": "Place", name: p.nombre },
  })),
};

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          BREADCRUMB_SCHEMA,
          buildFaqSchema(FAQ_KEY),
          COLLECTION_SCHEMA,
        ]}
      />
      <SrOnlyHeadings pathname={PATHNAME} />
      <CuadroMedicoSeniorsClient />
    </>
  );
}
