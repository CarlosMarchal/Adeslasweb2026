import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, buildMetadata } from "@/lib/seoSchemas";
import OfertaClient from "./OfertaClient";

// Landing de campaña noindex.
const PATHNAME = "/oferta-plena-vital/";

export const dynamic = "force-static";

const meta = getPageMeta(PATHNAME);

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    ogImage: meta.ogImage,
    noindex: true,
  });
}

export default function Page() {
  return (
    <>
      <JsonLd schemas={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]} />
      <OfertaClient />
    </>
  );
}
