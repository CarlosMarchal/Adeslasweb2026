"use client";

import SsgShell from "@/components/ssg/SsgShell";
import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import { data } from "@/views/SeguroIndividual";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-individual/">
      <SegmentPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
