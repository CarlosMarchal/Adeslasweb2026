import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import {
  getPostBySlug,
  getRelatedPosts,
  type ContentBlock,
  type BlogPostFull,
} from "@/data/blogPosts";

/* ───────── Content block renderer ───────── */

const RenderBlock = ({ block, index }: { block: ContentBlock; index: number }) => {
  switch (block.type) {
    case "heading":
      return (
        <h2
          className="text-xl md:text-2xl font-bold mt-10 mb-4"
          style={{ color: "#003087" }}
        >
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-base leading-relaxed mb-5" style={{ color: "#4A5568" }}>
          {block.text}
        </p>
      );

    case "list":
      return (
        <ul className="mb-6 space-y-2 pl-5">
          {block.items?.map((item, i) => (
            <li
              key={i}
              className="text-base leading-relaxed relative"
              style={{ color: "#4A5568" }}
            >
              <span
                className="absolute -left-4 top-[10px] w-2 h-2 rounded-full"
                style={{ backgroundColor: "#009FE3" }}
              />
              {item}
            </li>
          ))}
        </ul>
      );

    case "callout":
      return (
        <div
          className="my-8 p-6 border-l-4"
          style={{
            borderColor: "#009FE3",
            backgroundColor: "#E8F4FC",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <p className="text-base leading-relaxed font-medium" style={{ color: "#003087" }}>
            {block.text}
          </p>
        </div>
      );

    case "quote":
      return (
        <blockquote
          className="my-8 pl-6 border-l-4 italic"
          style={{ borderColor: "#009FE3", color: "#6B8296" }}
        >
          <p className="text-lg leading-relaxed">{block.text}</p>
        </blockquote>
      );

    default:
      return null;
  }
};

/* ───────── Related post card ───────── */

const RelatedCard = ({ post }: { post: BlogPostFull }) => (
  <Link
    to={`/blog/${post.slug}`}
    className="bg-white border border-borde overflow-hidden hover:-translate-y-1 transition-all duration-[250ms] card-shadow hover:card-shadow-hover flex flex-col"
    style={{ borderRadius: "16px" }}
  >
    <div className="relative h-40 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div
        className="absolute top-3 left-3 px-3 py-1 text-xs font-bold"
        style={{ backgroundColor: "#E8F4FC", color: "#009FE3", borderRadius: "6px" }}
      >
        {post.category}
      </div>
    </div>
    <div className="p-4">
      <h4 className="text-sm font-bold leading-snug mb-1" style={{ color: "#1A202C" }}>
        {post.title}
      </h4>
      <span className="text-xs" style={{ color: "#6B8296" }}>
        {post.readTime} lectura
      </span>
    </div>
  </Link>
);

/* ───────── Main component ───────── */

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If post not found, redirect to blog listing
  useEffect(() => {
    if (!post && slug) {
      navigate("/adeslas-blog/", { replace: true });
    }
  }, [post, slug, navigate]);

  // SEO (call hook unconditionally to avoid rules-of-hooks violation)
  const _seo = useSeo({
    title: post?.seoTitle ?? "Blog Salud Adeslas",
    description: post?.seoDescription ?? "",
    canonical: `https://adeslas.numero1salud.es/blog/${slug ?? ""}`,
  });

  if (!post) return null;

  const related = getRelatedPosts(post.relatedSlugs);

  return (
    <TarificadorProvider>
      {_seo}
      <Header />

      {/* Hero image */}
      <section className="relative h-[320px] md:h-[420px] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,48,135,0.85) 0%, rgba(0,48,135,0.35) 60%, rgba(0,0,0,0.1) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/adeslas-blog/"
              className="inline-flex items-center gap-2 text-sm mb-4 hover:underline"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              ← Volver al blog
            </Link>
            <div
              className="inline-block px-3 py-1 text-xs font-bold mb-4 ml-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#fff",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              {post.category}
            </div>
            <h1 className="text-white text-2xl md:text-4xl lg:text-[42px] leading-tight max-w-3xl">
              {post.title}
            </h1>
            <div
              className="flex items-center gap-4 mt-4 text-sm"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              <span>{post.date}</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>{post.readTime} lectura</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="section-pad bg-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {post.body.map((block, i) => (
                <RenderBlock key={i} block={block} index={i} />
              ))}
            </motion.div>

            {/* Share + back */}
            <div
              className="mt-12 pt-8 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              style={{ borderColor: "#E2E8F0" }}
            >
              <p className="text-sm" style={{ color: "#6B8296" }}>
                Blog de Salud Adeslas
              </p>
              <Link
                to="/adeslas-blog/"
                className="text-sm font-bold hover:underline"
                style={{ color: "#009FE3" }}
              >
                ← Volver al blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="section-pad bg-gris-claro">
          <div className="container mx-auto max-w-5xl">
            <h2
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: "#003087" }}
            >
              Artículos relacionados
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <RelatedCard key={rp.slug} post={rp} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
      <Footer />
    </TarificadorProvider>
  );
};

export default BlogArticle;
