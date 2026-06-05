import type { Metadata } from "next";
import { JsonLd } from "@/components/ssg/JsonLd";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import { HUB_TITLE, HUB_DESCRIPTION, HUB_CANONICAL, HUB_OG_IMAGE } from "./hubSeo";
import BlogHubClient from "./BlogHubClient";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: HUB_TITLE,
    description: HUB_DESCRIPTION,
    canonical: HUB_CANONICAL,
    ogImage: HUB_OG_IMAGE,
  });
}

export default function Page() {
  return (
    <>
      <JsonLd
        schemas={[
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          buildBreadcrumbSchema("/adeslas-blog/", "Blog Salud"),
        ]}
      />
      <BlogHubClient pathname="/blog/" />
    </>
  );
}
