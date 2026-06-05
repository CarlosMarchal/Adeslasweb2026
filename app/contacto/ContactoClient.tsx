"use client";

import SsgShell from "@/components/ssg/SsgShell";
import Contacto from "@/views/Contacto";

export default function ContactoClient() {
  return (
    <SsgShell pathname="/contacto/">
      <Contacto renderSeo={false} />
    </SsgShell>
  );
}
