"use client";

import SsgShell from "@/components/ssg/SsgShell";
import SegmentPageTemplate from "@/components/SegmentPageTemplate";
import { data } from "@/views/SeguroFamiliar";

export default function PlanClient() {
  return (
    <SsgShell pathname="/seguro-salud/seguro-familia/">
      <SegmentPageTemplate data={data} renderSeo={false} />
    </SsgShell>
  );
}
