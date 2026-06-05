"use client";

import SsgShell from "@/components/ssg/SsgShell";
import PreciosAdeslas from "@/views/PreciosAdeslas";

export default function PreciosAdeslasClient() {
  return (
    <SsgShell pathname="/precios-adeslas/">
      <PreciosAdeslas />
    </SsgShell>
  );
}
