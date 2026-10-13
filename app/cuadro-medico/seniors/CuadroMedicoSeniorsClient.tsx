"use client";

import SsgShell from "@/components/ssg/SsgShell";
import CuadroMedicoSeniors from "@/views/CuadroMedicoSeniors";

export default function CuadroMedicoSeniorsClient() {
  return (
    <SsgShell pathname="/cuadro-medico/seniors/">
      <CuadroMedicoSeniors />
    </SsgShell>
  );
}
