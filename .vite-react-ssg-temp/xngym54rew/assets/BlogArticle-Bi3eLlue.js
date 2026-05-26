import { jsxs, jsx } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { b as useSeo, c as TarificadorProvider, H as Header, C as CtaSection, F as Footer } from '../main.mjs';
import { g as getPostBySlug, a as getRelatedPosts } from './blogPosts-n9Kte4J-.js';
import 'vite-react-ssg';
import '@tanstack/react-query';
import 'next-themes';
import 'sonner';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'lucide-react';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'react-helmet-async';
import 'react-dom';

const RenderBlock = ({ block, index }) => {
  switch (block.type) {
    case "heading":
      return /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-xl md:text-2xl font-bold mt-10 mb-4",
          style: { color: "#003087" },
          children: block.text
        }
      );
    case "paragraph":
      return /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed mb-5", style: { color: "#4A5568" }, children: block.text });
    case "list":
      return /* @__PURE__ */ jsx("ul", { className: "mb-6 space-y-2 pl-5", children: block.items?.map((item, i) => /* @__PURE__ */ jsxs(
        "li",
        {
          className: "text-base leading-relaxed relative",
          style: { color: "#4A5568" },
          children: [
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "absolute -left-4 top-[10px] w-2 h-2 rounded-full",
                style: { backgroundColor: "#009FE3" }
              }
            ),
            item
          ]
        },
        i
      )) });
    case "callout":
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: "my-8 p-6 border-l-4",
          style: {
            borderColor: "#009FE3",
            backgroundColor: "#E8F4FC",
            borderRadius: "0 12px 12px 0"
          },
          children: /* @__PURE__ */ jsx("p", { className: "text-base leading-relaxed font-medium", style: { color: "#003087" }, children: block.text })
        }
      );
    case "quote":
      return /* @__PURE__ */ jsx(
        "blockquote",
        {
          className: "my-8 pl-6 border-l-4 italic",
          style: { borderColor: "#009FE3", color: "#6B8296" },
          children: /* @__PURE__ */ jsx("p", { className: "text-lg leading-relaxed", children: block.text })
        }
      );
    default:
      return null;
  }
};
const RelatedCard = ({ post }) => /* @__PURE__ */ jsxs(
  Link,
  {
    to: `/blog/${post.slug}`,
    className: "bg-white border border-borde overflow-hidden hover:-translate-y-1 transition-all duration-[250ms] card-shadow hover:card-shadow-hover flex flex-col",
    style: { borderRadius: "16px" },
    children: [
      /* @__PURE__ */ jsxs("div", { className: "relative h-40 overflow-hidden", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: post.image,
            alt: post.title,
            className: "w-full h-full object-cover",
            loading: "lazy",
            width: "600",
            height: "400"
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute top-3 left-3 px-3 py-1 text-xs font-bold",
            style: { backgroundColor: "#E8F4FC", color: "#009FE3", borderRadius: "6px" },
            children: post.category
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold leading-snug mb-1", style: { color: "#1A202C" }, children: post.title }),
        /* @__PURE__ */ jsxs("span", { className: "text-xs", style: { color: "#6B8296" }, children: [
          post.readTime,
          " lectura"
        ] })
      ] })
    ]
  }
);
const BlogArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : void 0;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  useEffect(() => {
    if (!post && slug) {
      navigate("/adeslas-blog/", { replace: true });
    }
  }, [post, slug, navigate]);
  const _seo = useSeo({
    title: post?.seoTitle ?? "Blog Salud Adeslas",
    description: post?.seoDescription ?? "",
    canonical: `https://adeslas.numero1salud.es/blog/${slug ?? ""}`
  });
  if (!post) return null;
  const related = getRelatedPosts(post.relatedSlugs);
  return /* @__PURE__ */ jsxs(TarificadorProvider, { children: [
    _seo,
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("section", { className: "relative h-[320px] md:h-[420px] overflow-hidden", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: post.image,
          alt: post.title,
          className: "w-full h-full object-cover",
          width: "1200",
          height: "630",
          fetchPriority: "high"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute inset-0",
          style: {
            background: "linear-gradient(to top, rgba(0,48,135,0.85) 0%, rgba(0,48,135,0.35) 60%, rgba(0,0,0,0.1) 100%)"
          }
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-10", children: /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/adeslas-blog/",
                className: "inline-flex items-center gap-2 text-sm mb-4 hover:underline",
                style: { color: "rgba(255,255,255,0.8)" },
                children: "← Volver al blog"
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "inline-block px-3 py-1 text-xs font-bold mb-4 ml-4",
                style: {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,255,255,0.25)"
                },
                children: post.category
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-white text-2xl md:text-4xl lg:text-[42px] leading-tight max-w-3xl", children: post.title }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-4 mt-4 text-sm",
                style: { color: "rgba(255,255,255,0.75)" },
                children: [
                  /* @__PURE__ */ jsx("span", { children: post.date }),
                  /* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-white/40" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    post.readTime,
                    " lectura"
                  ] })
                ]
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "section-pad bg-white", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.15 },
          children: post.body.map((block, i) => /* @__PURE__ */ jsx(RenderBlock, { block, index: i }, i))
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "mt-12 pt-8 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
          style: { borderColor: "#E2E8F0" },
          children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm", style: { color: "#6B8296" }, children: "Blog de Salud Adeslas" }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: "/adeslas-blog/",
                className: "text-sm font-bold hover:underline",
                style: { color: "#009FE3" },
                children: "← Volver al blog"
              }
            )
          ]
        }
      )
    ] }) }) }),
    related.length > 0 && /* @__PURE__ */ jsx("section", { className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto max-w-5xl", children: [
      /* @__PURE__ */ jsx(
        "h2",
        {
          className: "text-2xl font-bold mb-8 text-center",
          style: { color: "#003087" },
          children: "Artículos relacionados"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6", children: related.map((rp) => /* @__PURE__ */ jsx(RelatedCard, { post: rp }, rp.slug)) })
    ] }) }),
    /* @__PURE__ */ jsx(CtaSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};

export { BlogArticle as default };
