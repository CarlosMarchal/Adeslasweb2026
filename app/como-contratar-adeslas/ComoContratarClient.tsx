"use client";

import SsgShell from "@/components/ssg/SsgShell";
import ComoContratarAdeslas from "@/views/ComoContratarAdeslas";

export default function ComoContratarClient() {
  return (
    <SsgShell pathname="/como-contratar-adeslas/">
      <ComoContratarAdeslas />
    </SsgShell>
  );
}
