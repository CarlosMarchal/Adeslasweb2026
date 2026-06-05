"use client";

import SsgShell from "@/components/ssg/SsgShell";
import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import { data } from "@/views/SeguroGinecologia";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/adeslas-ginecologia/">
      <SegmentPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
