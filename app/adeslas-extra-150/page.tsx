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
import Client from "../seguro-salud/adeslas-extra-150/PlanClient";

// Alias servido en SSG (200) — canonical apunta a su canónica (getPageMeta lo resuelve).
const PATHNAME = "/adeslas-extra-150/";
const FAQ_KEY = "/adeslas-extra-150";

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
