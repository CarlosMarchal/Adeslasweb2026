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

const PATHNAME = "/seguro-salud/adeslas-go/";
const FAQ_KEY = "/adeslas-go";
const PRODUCT = {
  name: "Adeslas GO",
  description:
    "Seguro médico ambulatorio con copagos limitados a 260€/año. Medicina general, especialidades, chequeo médico anual. Desde 21€/mes.",
  category: "Seguro de Salud",
  price: "21",
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
