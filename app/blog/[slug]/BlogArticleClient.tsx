"use client";

import SsgShell from "@/components/ssg/SsgShell";
import BlogArticle from "@/views/BlogArticle";

export default function BlogArticleClient({ slug }: { slug: string }) {
  return (
    <SsgShell pathname={`/blog/${slug}/`}>
      <BlogArticle slug={slug} renderSeo={false} />
    </SsgShell>
  );
}
