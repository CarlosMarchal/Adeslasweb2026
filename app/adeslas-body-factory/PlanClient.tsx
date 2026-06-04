"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaBodyFactory";

export default function PlanClient() {
  return (
    <SsgShell pathname="/adeslas-body-factory/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
