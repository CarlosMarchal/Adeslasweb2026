"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslasMascotas";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-mascotas/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
