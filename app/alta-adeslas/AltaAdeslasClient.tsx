"use client";

import SsgShell from "@/components/ssg/SsgShell";
import AltaAdeslas from "@/views/AltaAdeslas";

export default function AltaAdeslasClient() {
  return (
    <SsgShell pathname="/alta-adeslas/">
      <AltaAdeslas />
    </SsgShell>
  );
}
