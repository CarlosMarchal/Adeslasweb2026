"use client";

import SsgShell from "@/components/ssg/SsgShell";
import BlogSalud from "@/views/BlogSalud";

export default function BlogHubClient({ pathname }: { pathname: string }) {
  return (
    <SsgShell pathname={pathname}>
      <BlogSalud renderSeo={false} />
    </SsgShell>
  );
}
