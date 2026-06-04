"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaExtra150";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-extra-150/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
