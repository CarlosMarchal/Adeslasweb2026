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

const PATHNAME = "/seguro-salud/adeslas-plena-plus/";
const FAQ_KEY = "/adeslas-plena-plus";
const PRODUCT = {
  name: "Adeslas Plena Plus",
  description:
    "Seguro médico sin copagos con cobertura completa: hospitalización, especialidades y cirugía. Red Adeslas +51.000 médicos.",
  category: "Seguro de Salud",
  price: "62",
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
