"use client";

import SsgShell from "@/components/ssg/SsgShell";
import MiPrecio from "@/views/MiPrecio";

export default function MiPrecioClient({ slug }: { slug: string }) {
  return (
    <SsgShell pathname={`/mi-precio/${slug}/`}>
      <MiPrecio slug={slug} renderSeo={false} />
    </SsgShell>
  );
}
