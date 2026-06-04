"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/PymesEmpresas";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/pymes/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
