"use client";

import SsgShell from "@/components/ssg/SsgShell";
import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import { data } from "@/views/SeguroMayores";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/seguro-para-personas-mayores/">
      <SegmentPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
