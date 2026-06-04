"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ProductPageTemplate from "@/components/ProductPageTemplate";
import { data } from "@/views/AdeslasSeniorsTotal";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/">
      <ProductPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
