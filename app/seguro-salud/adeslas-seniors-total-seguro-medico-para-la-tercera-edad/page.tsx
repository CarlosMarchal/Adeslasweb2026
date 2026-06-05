import type { Metadata } from "next";
import { getPageMeta } from "@/data/pageMeta";
import { JsonLd } from "@/components/ssg/JsonLd";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildProductSchema,
  buildFaqSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import PlanClient from "./PlanClient";

const PATHNAME = "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/";
const FAQ_KEY = "/adeslas-seniors-total";
const PRODUCT = {
  name: "Adeslas Seniors Total",
  description:
    "Cobertura médica completa para mayores de 63 años sin subida de prima 3 años, asistencia viajes 100.000€, dental incluida y topes de copago reducidos. Desde 101€/mes.",
  category: "Seguro de Salud",
  price: "101.00",
  pricePeriod: "month",
};

export const dynamic = "force-static";

const meta = getPageMeta(PATHNAME);

export function generateMetadata(): Metadata {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    ogImage: meta.ogImage,
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
          buildProductSchema(PRODUCT, meta.canonical, meta.ogImage),
          buildFaqSchema(FAQ_KEY),
        ]}
      />
      <PlanClient />
    </>
  );
}
