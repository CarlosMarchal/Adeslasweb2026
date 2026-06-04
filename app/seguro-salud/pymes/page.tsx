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

const PATHNAME = "/seguro-salud/pymes/";
const FAQ_KEY = "/pymes-empresas";
const PRODUCT = {
  name: "Adeslas EMPRESAS y PYMES TOTAL — Seguro Médico Colectivo",
  description: "Seguro médico colectivo para empresas y pymes con prima garantizada 3 años y dental incluido.",
  category: "Seguro de salud para empresas",
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
