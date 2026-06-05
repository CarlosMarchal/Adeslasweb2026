"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaPlenaTotal";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-plena-total/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
