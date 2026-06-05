import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageMeta } from "@/data/pageMeta";
import { blogPosts, getPostBySlug } from "@/data/blogPosts";
import { JsonLd } from "@/components/ssg/JsonLd";
import {
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  buildBreadcrumbSchema,
  buildArticleSchema,
  buildBlogFaqSchema,
  buildMetadata,
} from "@/lib/seoSchemas";
import BlogArticleClient from "./BlogArticleClient";

const BASE_URL = "https://adeslas.numero1salud.es";

export const dynamic = "force-static";

// Pre-renderiza en build un page por slug único (los duplicados se deduplican).
export function generateStaticParams() {
  return Array.from(new Set(blogPosts.map((p) => p.slug))).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Fuente primaria: los datos SEO del propio post (lo que el SPA usaba vía useSeo).
  // getPageMeta solo da el fallback genérico para slugs sin entrada propia en PAGE_META.
  const post = getPostBySlug(slug);
  const meta = getPageMeta(`/blog/${slug}/`);
  return buildMetadata({
    title: post?.seoTitle ?? meta.title,
    description: post?.seoDescription ?? meta.description,
    canonical: `${BASE_URL}/blog/${slug}/`,
    ogImage: post?.image ?? meta.ogImage,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const pathname = `/blog/${slug}/`;
  const url = `${BASE_URL}/blog/${slug}/`;

  // FAQ desde los bloques faq del cuerpo (server-side, para el JSON-LD del HTML).
  const faqItems = post.body
    .filter((b) => b.type === "faq" && b.faqItems?.length)
    .flatMap((b) => (b.faqItems ?? []).map((f) => ({ q: f.q, a: f.a })));

  return (
    <>
      <JsonLd
        schemas={[
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          buildBreadcrumbSchema(pathname, post.title),
          buildArticleSchema(
            {
              title: post.title,
              seoDescription: post.seoDescription,
              image: post.image,
              date: post.date,
              category: post.category,
            },
            url,
          ),
          buildBlogFaqSchema(faqItems),
        ]}
      />
      <BlogArticleClient slug={slug} />
    </>
  );
}
