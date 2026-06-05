import type { Metadata } from "next";
import { JsonLd } from "@/components/ssg/JsonLd";
import { ORGANIZATION_SCHEMA, WEBSITE_SCHEMA, buildMetadata } from "@/lib/seoSchemas";
import MiPrecioClient from "./MiPrecioClient";

const BASE_URL = "https://adeslas.numero1salud.es";

// /mi-precio/<slug> — cotización personalizada (noindex; el precio llega por query
// params en cliente). 5 planes conocidos.
const SLUGS = [
  "adeslas-go",
  "adeslas-plena-vital",
  "adeslas-plena-total",
  "adeslas-plena-vital-total",
  "adeslas-plena-plus",
];

export const dynamic = "force-static";

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata({
    title: "Tu cotización Adeslas",
    description: "Cotización personalizada Adeslas.",
    canonical: `${BASE_URL}/mi-precio/${slug}/`,
    noindex: true,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <JsonLd schemas={[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]} />
      <MiPrecioClient slug={slug} />
    </>
  );
}
