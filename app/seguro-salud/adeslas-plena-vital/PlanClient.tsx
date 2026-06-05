"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaPlenaVital";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-plena-vital/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
