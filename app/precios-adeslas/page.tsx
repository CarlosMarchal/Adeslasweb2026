import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import { SrOnlyHeadings } from "@/components/ssg/SrOnlyHeadings";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import PreciosAdeslasClient from "./PreciosAdeslasClient";

const PATHNAME = "/precios-adeslas/";
const FAQ_KEY = "/precios-adeslas";

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
          buildFaqSchema(FAQ_KEY),
        ]}
      />
      <SrOnlyHeadings pathname={PATHNAME} />
      <PreciosAdeslasClient />
    </>
  );
}
