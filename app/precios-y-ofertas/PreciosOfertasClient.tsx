"use client";

import SsgShell from "@/components/ssg/SsgShell";
import PreciosOfertas from "@/views/PreciosOfertas";

export default function PreciosOfertasClient({ pathname }: { pathname: string }) {
  return (
    <SsgShell pathname={pathname}>
      <PreciosOfertas renderSeo={false} />
    </SsgShell>
  );
}
