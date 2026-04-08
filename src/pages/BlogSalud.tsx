import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSeo } from "@/hooks/use-seo";
import { TarificadorProvider } from "@/components/TarificadorContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaSection from "@/components/CtaSection";
import heroBg from "@/assets/seguro-salud-adeslas-individual.webp";
import { blogPosts, categories } from "@/data/blogPosts";

/* ───────── Component ───────── */

const BlogSalud = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const _seo = useSeo({
    title: "Blog Salud Adeslas | Bienestar, Nutrición, Prevención y Seguros Médicos",
    description:
      "Blog de salud Adeslas: artículos sobre bienestar, nutrición, prevención, salud mental, dental y seguros médicos privados. Consejos de asesores de salud para cuidarte mejor.",
    canonical: "https://adeslas.numero1salud.es/blog",
  });

  const filtered =
    activeCategory === "Todos"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <TarificadorProvider>
      {_seo}
      <Header />

      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center"
        style={{
          background:
            "linear-gradient(135deg, #003087 0%, #009FE3 65%, #009FE3 100%)",
          minHeight: "460px",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
            opacity: 0.12,
            mixBlendMode: "luminosity",
          }}
        />
        <div className="container mx-auto px-4 py-10 lg:py-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm text-primary-foreground"
              style={{
                background: "rgba(255,255,255,0.11)",
                border: "1px solid rgba(255,255,255,0.22)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-azul-claro" />
              Salud y bienestar
            </div>
            <h1 className="text-primary-foreground mb-3 text-[26px] md:text-[36px] leading-tight md:leading-[1.15]">
              Blog de Salud <span className="text-azul-claro">Adeslas</span>
            </h1>
            <p
              className="text-lg max-w-2xl"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              Consejos de asesores de salud sobre bienestar, nutrición, prevención y cuidado de la salud para ti y tu familia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-blanco border-b border-borde sticky top-[72px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-3 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors"
                style={{
                  borderRadius: "8px",
                  backgroundColor:
                    activeCategory === cat ? "#009FE3" : "transparent",
                  color: activeCategory === cat ? "#fff" : "#6B8296",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="section-pad bg-gris-claro">
        <div className="container mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gris-medio">
              No hay artículos en esta categoría todavía.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="bg-blanco border border-borde overflow-hidden hover:-translate-y-1 transition-all duration-[250ms] card-shadow hover:card-shadow-hover flex flex-col h-full"
                    style={{ borderRadius: "16px", display: "flex" }}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div
                        className="absolute top-3 left-3 px-3 py-1 text-xs font-bold"
                        style={{
                          backgroundColor: "#E8F4FC",
                          color: "#009FE3",
                          borderRadius: "6px",
                        }}
                      >
                        {post.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-gris-medio mb-3">
                        <span>{post.date}</span>
                        <span
                          className="w-1 h-1 rounded-full"
                          style={{ backgroundColor: "#CBD5E1" }}
                        />
                        <span>{post.readTime} lectura</span>
                      </div>
                      <h3 className="text-gris-texto font-bold text-[15px] leading-snug mb-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gris-medio leading-relaxed mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <span
                        className="text-sm font-bold"
                        style={{ color: "#009FE3" }}
                      >
                        Leer artículo →
                      </span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section
        className="section-pad"
        style={{
          background: "linear-gradient(135deg, #003087 0%, #009FE3 100%)",
        }}
      >
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary-foreground text-2xl md:text-3xl mb-4">
              Recibe Consejos de Salud Adeslas en tu Email
            </h2>
            <p
              className="text-base mb-8 max-w-lg mx-auto"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Suscríbete a nuestro boletín y recibe cada semana artículos,
              consejos y novedades sobre salud y bienestar.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:border-white/50 transition-colors"
                style={{ borderRadius: "8px" }}
              />
              <button
                type="submit"
                className="px-6 py-3 font-bold text-sm transition-colors"
                style={{
                  backgroundColor: "#fff",
                  color: "#003087",
                  borderRadius: "8px",
                }}
              >
                Suscribirme
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <CtaSection />
      <Footer />
    </TarificadorProvider>
  );
};

export default BlogSalud;
