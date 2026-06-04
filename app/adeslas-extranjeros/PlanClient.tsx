"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaExtranjeros";

export default function PlanClient() {
  return (
    <SsgShell pathname="/adeslas-extranjeros/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
