"use client";

import SsgShell from "@/components/ssg/SsgShell";
import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import { data } from "@/views/SeguroEmbarazadas";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/embarazo/">
      <SegmentPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
