import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildProductSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import PlanClient from "./PlanClient";

const PATHNAME = "/seguro-salud/adeslas-plena-total/";
const FAQ_KEY = "/adeslas-plena-total";
const PRODUCT = {
  name: "Adeslas Plena Total",
  description:
    "Seguro médico completo sin copagos, hospitalización, dental (46 actos), asistencia viajes 100.000€ y cobertura de accidente.",
  category: "Seguro de Salud",
  price: "83",
  pricePeriod: "month",
};

export const dynamic = "force-static";

const meta = getPageMeta(PATHNAME);

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          buildBreadcrumbSchema(PATHNAME, meta.title),
          buildProductSchema(PRODUCT, meta.canonical, meta.ogImage),
          buildFaqSchema(FAQ_KEY),
        ]}
      />
      <PlanClient />
    </>
  );
}
