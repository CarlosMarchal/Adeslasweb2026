import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import { SrOnlyHeadings } from "@/components/ssg/SrOnlyHeadings";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildProductSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import PlanClient from "./PlanClient";

const PATHNAME = "/adeslas-body-factory/";
const FAQ_KEY: string | null = "/adeslas-body-factory/";
const PRODUCT = {
  name: "Adeslas Body Factory",
  description: "Seguro de salud Adeslas con condiciones especiales para socios de Body Factory. Desde 68€/mes.",
  category: "Seguro de Salud",
  price: "68",
  pricePeriod: "month",
};

export const dynamic = "force-static";

const meta = getPageMeta(PATHNAME);

export function generateMetadata(): Metadata {
  return buildMetadata({ title: meta.title, description: meta.description, canonical: meta.canonical, ogImage: meta.ogImage });
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
          FAQ_KEY ? buildFaqSchema(FAQ_KEY) : null,
        ]}
      />
      <SrOnlyHeadings pathname={PATHNAME} />
      <PlanClient />
    </>
  );
}
