"use client";

import SsgShell from "@/components/ssg/SsgShell";
import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import { data } from "@/views/SeguroInfantil";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-infantil/">
      <SegmentPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
