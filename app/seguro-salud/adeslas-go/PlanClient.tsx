"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaGo";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-go/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
