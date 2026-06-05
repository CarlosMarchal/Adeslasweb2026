"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaPlenaVitalTotal";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
