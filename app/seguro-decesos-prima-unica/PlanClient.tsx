"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslaDeceosPrimaUnica";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-decesos-prima-unica/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
