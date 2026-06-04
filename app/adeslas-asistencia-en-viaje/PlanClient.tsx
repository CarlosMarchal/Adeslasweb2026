"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaAsistenciaViaje";

export default function PlanClient() {
  return (
    <SsgShell pathname="/adeslas-asistencia-en-viaje/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
