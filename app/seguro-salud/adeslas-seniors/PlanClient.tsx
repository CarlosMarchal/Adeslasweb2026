"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslasSeniors";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-seniors/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
