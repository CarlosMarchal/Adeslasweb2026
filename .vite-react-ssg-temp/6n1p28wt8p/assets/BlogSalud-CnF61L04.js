import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { b as useSeo, c as TarificadorProvider, H as Header, i as imgSrc, C as CtaSection, F as Footer } from '../main.mjs';
import { h as heroBg } from './seguro-salud-adeslas-individual-Za9HuXEo.js';
import { b as blogPosts, c as categories } from './blogPosts-n9Kte4J-.js';
import 'vite-react-ssg/single-page';
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

const BlogSalud = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const _seo = useSeo({
    title: "Blog Salud Adeslas | Bienestar, Nutrición, Prevención y Seguros Médicos",
    description: "Blog de salud Adeslas: artículos sobre bienestar, nutrición, prevención, salud mental, dental y seguros médicos privados. Consejos de asesores de salud para cuidarte mejor.",
    canonical: "https://adeslas.numero1salud.es/adeslas-blog/",
    ogImage: "https://adeslas.numero1salud.es/og-blog.jpg",
    ogType: "website",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
      { name: "Blog Salud", url: "https://adeslas.numero1salud.es/adeslas-blog/" }
    ]
  });
  const filtered = activeCategory === "Todos" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory);
  return /* @__PURE__ */ jsxs(TarificadorProvider, { children: [
    _seo,
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative overflow-hidden flex items-center",
        style: {
          background: "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)",
          minHeight: "460px"
        },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center",
              style: {
                backgroundImage: `url(${imgSrc(heroBg)})`,
                opacity: 0.12,
                mixBlendMode: "luminosity"
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4 py-10 lg:py-12 relative z-10", children: /* @__PURE__ */ jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6 },
              className: "max-w-3xl",
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm text-primary-foreground",
                    style: {
                      background: "rgba(255,255,255,0.11)",
                      border: "1px solid rgba(255,255,255,0.22)"
                    },
                    children: [
                      /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-azul-claro" }),
                      "Salud y bienestar"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs("h1", { className: "text-primary-foreground mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15]", children: [
                  "Blog de Salud ",
                  /* @__PURE__ */ jsx("span", { className: "text-azul-claro", children: "Adeslas" })
                ] }),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "text-lg max-w-2xl",
                    style: { color: "rgba(255,255,255,0.82)" },
                    children: "Consejos de asesores de salud sobre bienestar, nutrición, prevención y cuidado de la salud para ti y tu familia."
                  }
                )
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "bg-blanco border-b border-borde sticky top-[72px] z-30", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsx("div", { className: "flex gap-1 py-3 overflow-x-auto no-scrollbar", children: categories.map((cat) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => setActiveCategory(cat),
        className: "px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors",
        style: {
          borderRadius: "8px",
          backgroundColor: activeCategory === cat ? "#009FE3" : "transparent",
          color: activeCategory === cat ? "#fff" : "#6B8296"
        },
        children: cat
      },
      cat
    )) }) }) }),
    /* @__PURE__ */ jsx("section", { className: "section-pad bg-gris-claro", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: filtered.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-center py-16 text-gris-medio", children: "No hay artículos en esta categoría todavía." }) : /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto", children: filtered.map((post, i) => /* @__PURE__ */ jsx(
      motion.article,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: i * 0.06 },
        children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: `/blog/${post.slug}`,
            className: "bg-blanco border border-borde overflow-hidden hover:-translate-y-1 transition-all duration-[250ms] card-shadow hover:card-shadow-hover flex flex-col h-full",
            style: { borderRadius: "16px", display: "flex" },
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative h-48 overflow-hidden", children: [
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
                    style: {
                      backgroundColor: "#E8F4FC",
                      color: "#009FE3",
                      borderRadius: "6px"
                    },
                    children: post.category
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col flex-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-gris-medio mb-3", children: [
                  /* @__PURE__ */ jsx("span", { children: post.date }),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "w-1 h-1 rounded-full",
                      style: { backgroundColor: "#CBD5E1" }
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { children: [
                    post.readTime,
                    " lectura"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("h3", { className: "text-gris-texto font-bold text-[15px] leading-snug mb-2", children: post.title }),
                /* @__PURE__ */ jsx("p", { className: "text-sm text-gris-medio leading-relaxed mb-4 flex-1", children: post.excerpt }),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "text-sm font-bold",
                    style: { color: "#009FE3" },
                    children: "Leer artículo →"
                  }
                )
              ] })
            ]
          }
        )
      },
      post.slug
    )) }) }) }),
    /* @__PURE__ */ jsx(
      "section",
      {
        className: "section-pad",
        style: {
          background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)"
        },
        children: /* @__PURE__ */ jsx("div", { className: "container mx-auto max-w-2xl text-center", children: /* @__PURE__ */ jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            children: [
              /* @__PURE__ */ jsx("h2", { className: "text-primary-foreground text-2xl md:text-3xl mb-4", children: "Recibe Consejos de Salud Adeslas en tu Email" }),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "text-base mb-8 max-w-lg mx-auto",
                  style: { color: "rgba(255,255,255,0.8)" },
                  children: "Suscríbete a nuestro boletín y recibe cada semana artículos, consejos y novedades sobre salud y bienestar."
                }
              ),
              /* @__PURE__ */ jsxs(
                "form",
                {
                  onSubmit: (e) => e.preventDefault(),
                  className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
                  children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "email",
                        placeholder: "Tu email",
                        className: "flex-1 px-4 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-white/50 transition-colors",
                        style: { borderRadius: "8px" }
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "submit",
                        className: "px-6 py-3 font-bold text-sm transition-colors",
                        style: {
                          backgroundColor: "#fff",
                          color: "#003087",
                          borderRadius: "8px"
                        },
                        children: "Suscribirme"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ) })
      }
    ),
    /* @__PURE__ */ jsx(CtaSection, {}),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};

export { BlogSalud as default };
