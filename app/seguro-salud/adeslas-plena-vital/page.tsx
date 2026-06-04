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

const PATHNAME = "/seguro-salud/adeslas-plena-vital/";
const FAQ_KEY = "/adeslas-plena-vital";
const PRODUCT = {
  name: "Adeslas Plena Vital",
  description:
    "Seguro médico completo con hospitalización, todas las especialidades y copagos limitados a 300€/año. Desde 38€/mes.",
  category: "Seguro de Salud",
  price: "38",
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
