"use client";

import SsgShell from "@/components/ssg/SsgShell";
import PoliticaPrivacidad from "@/views/PoliticaPrivacidad";

export default function PoliticaPrivacidadClient() {
  return (
    <SsgShell pathname="/politica-de-privacidad/">
      <PoliticaPrivacidad renderSeo={false} />
    </SsgShell>
  );
}
