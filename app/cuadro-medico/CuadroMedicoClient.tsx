"use client";

import SsgShell from "@/components/ssg/SsgShell";
import CuadroMedico from "@/views/CuadroMedico";

export default function CuadroMedicoClient() {
  return (
    <SsgShell pathname="/cuadro-medico/">
      <CuadroMedico renderSeo={false} />
    </SsgShell>
  );
}
