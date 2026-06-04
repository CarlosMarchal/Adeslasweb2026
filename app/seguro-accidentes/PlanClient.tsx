"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaAccidentes";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-accidentes/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
