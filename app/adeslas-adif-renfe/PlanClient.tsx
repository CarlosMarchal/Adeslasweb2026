"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaAdifRenfe";

export default function PlanClient() {
  return (
    <SsgShell pathname="/adeslas-adif-renfe/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
