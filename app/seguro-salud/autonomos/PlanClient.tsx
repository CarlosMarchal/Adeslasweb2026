"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/Autonomos";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/autonomos/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
