"use client";

import SsgShell from "@/components/ssg/SsgShell";
import LandingPlenaVitalOferta from "@/views/LandingPlenaVitalOferta";

export default function OfertaClient() {
  return (
    <SsgShell pathname="/oferta-plena-vital/">
      <LandingPlenaVitalOferta renderSeo={false} />
    </SsgShell>
  );
}
