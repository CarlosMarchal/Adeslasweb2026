import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import Client from "../seguro-salud/embarazo/PlanClient";

// Alias servido en SSG (200) — canonical apunta a su canónica (getPageMeta lo resuelve).
const PATHNAME = "/seguro-medico-embarazadas/";

export const dynamic = "force-static";

const meta = getPageMeta(PATHNAME);

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    ogImage: meta.ogImage,
    noindex: meta.noindex,
  });
}

export default function Page() {
  return (
    <>
      <JsonLd schemas={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, buildBreadcrumbSchema(PATHNAME, meta.title)]} />
      <Client />
    </>
  );
}
