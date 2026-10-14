"use client";

import SsgShell from "@/components/ssg/SsgShell";
import CuadroMedicoGo from "@/views/CuadroMedicoGo";

export default function CuadroMedicoGoClient() {
  return (
    <SsgShell pathname="/cuadro-medico/go/">
      <CuadroMedicoGo />
    </SsgShell>
  );
}
