import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import Client from "../seguro-salud/pymes/PlanClient";

// Alias servido en SSG (200) — canonical apunta a su canónica (getPageMeta lo resuelve).
const PATHNAME = "/pymes-empresas/";
const FAQ_KEY = "/pymes-empresas";

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
      <JsonLd
        schemas={[
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          buildBreadcrumbSchema(PATHNAME, meta.title),
          FAQ_KEY ? buildFaqSchema(FAQ_KEY) : null,
        ]}
      />
      <Client />
    </>
  );
}
