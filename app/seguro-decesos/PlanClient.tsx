"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaDecesos";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-decesos/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
