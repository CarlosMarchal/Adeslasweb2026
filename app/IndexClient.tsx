"use client";

import SsgShell from "@/components/ssg/SsgShell";
import Index from "@/views/Index";

export default function IndexClient() {
  return (
    <SsgShell pathname="/">
      <Index renderSeo={false} />
    </SsgShell>
  );
}
