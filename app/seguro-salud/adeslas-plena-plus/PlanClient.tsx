"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaPlenaPlus";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-plena-plus/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
