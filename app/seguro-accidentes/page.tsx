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

const PATHNAME = "/seguro-accidentes/";
const FAQ_KEY: string | null = null;
const PRODUCT = {
  name: "Adeslas Accidentes",
  description: "Seguro de accidentes Adeslas con indemnización por invalidez y fallecimiento. Desde 5,89€/mes.",
  category: "Seguro de Accidentes",
  price: "5.89",
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
