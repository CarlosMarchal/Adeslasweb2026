import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CalcButton from "@/components/CalcButton";

const CheckIcon = () => (
  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E8F4FC" }}>
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 4" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </div>
);

/* ── Featured products (top 3 cards) ─────────────────────────── */
const featuredProducts = [
  {
    icon: "💊",
    name: "Adeslas Go",
    slug: "/adeslas-go",
    href: "/adeslas-go",
    price: "21,00",
    pill: "Cobertura ambulatoria · Con copago",
    pillDark: false,
    featured: false,
    coverages: ["Consultas médicas ilimitadas", "Urgencias 24h", "Pruebas diagnósticas", "Telemedicina 24h", "Fisioterapia"],
  },
  {
    icon: "🛡",
    name: "Adeslas Plena Total",
    slug: "/adeslas-plena-total",
    href: "/adeslas-plena-total",
    price: "83,00",
    pill: "Sin copago · Cobertura total",
    pillDark: true,
    featured: true,
    badge: "El más vendido",
    promoBadge: "🎁 Promoción puntos",
    coverages: ["Hospitalización completa", "Cirugía sin límites", "Especialistas sin copago", "Urgencias nacionales", "Videoconsultas 24h"],
  },
  {
    icon: "🏆",
    name: "Adeslas Plena Vital",
    slug: "/adeslas-plena-vital",
    href: "/adeslas-plena-vital",
    price: "48,00",
    pill: "Cobertura total · Copago reducido",
    pillDark: false,
    promoBadge: "🎁 Promoción puntos",
    coverages: ["Hospitalización completa", "Cirugía sin límites", "Especialistas con copago", "Urgencias nacionales", "Videoconsultas 24h"],
  },
];

/* ── All products for the carousel ───────────────────────────── */
const allProducts = [
  { icon: "💊", name: "Adeslas Go", href: "/adeslas-go", tag: "Más económico", desc: "Cobertura ambulatoria con copago. Ideal para quienes buscan lo esencial." },
  { icon: "📋", name: "Adeslas Plena Vital", href: "/adeslas-plena-vital", tag: "Copago reducido", desc: "Cobertura total con copagos reducidos. La mejor relación calidad-precio." },
  { icon: "🛡", name: "Adeslas Plena Total", href: "/adeslas-plena-total", tag: "El más vendido", desc: "Cobertura total sin copago: hospitalización, cirugía y especialistas." },
  { icon: "💎", name: "Adeslas Extra 150", href: "/adeslas-extra-150", tag: "Cobertura ampliada", desc: "Sin copagos con coberturas ampliadas. Para quienes quieren más." },
  { icon: "🏆", name: "Adeslas Plena Plus", href: "/adeslas-plena-plus", tag: "Máxima cobertura", desc: "Lo mejor de Adeslas. Cobertura premium sin límites." },
  { icon: "🦷", name: "Adeslas Dental", href: "/adeslas-dental", tag: "Dental", desc: "Limpieza, empastes y ortodoncia para toda la familia sin esperas." },
  { icon: "🌍", name: "Adeslas Extranjeros", href: "/adeslas-extranjeros", tag: "Residentes / NIE", desc: "Seguro médico para residentes y estudiantes extranjeros en España." },
  { icon: "🕊️", name: "Adeslas Decesos", href: "/adeslas-decesos", tag: "Decesos", desc: "Gestión completa del sepelio en España y el extranjero, 24h." },
];

/* ── Carousel component ──────────────────────────────────────── */
const ProductCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el?.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground transition-opacity"
          style={{ backgroundColor: "#009FE3", boxShadow: "0 4px 12px rgba(0,48,135,0.25)" }}
          aria-label="Anterior"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 4L6 8l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-primary-foreground transition-opacity"
          style={{ backgroundColor: "#009FE3", boxShadow: "0 4px 12px rgba(0,48,135,0.25)" }}
          aria-label="Siguiente"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {allProducts.map((p) => (
          <Link
            key={p.name}
            to={p.href}
            className="group snap-start flex-shrink-0 w-[240px] rounded-xl p-5 transition-all duration-200 hover:-translate-y-1"
            style={{
              border: "1px solid #D5E3F0",
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0,48,135,0.06)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: "#E8F4FC" }}>
                {p.icon}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold" style={{ backgroundColor: "#E8F4FC", color: "#009FE3" }}>
                {p.tag}
              </span>
            </div>
            <h4 className="text-gris-texto font-bold text-sm mb-1 group-hover:text-azul-medio transition-colors">{p.name}</h4>
            <p className="text-gris-medio text-xs leading-relaxed">{p.desc}</p>
            <span className="inline-block mt-3 text-azul-medio text-xs font-bold group-hover:underline">
              Ver seguro →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

/* ── Main section ────────────────────────────────────────────── */
const ProductsSection = () => (
  <section id="seguros" className="section-pad bg-blanco">
    <div className="container mx-auto">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-gris-texto mb-3">Seguros Médicos Adeslas — Compara y Elige tu Plan</h2>
        <p className="text-gris-medio max-w-lg mx-auto">Toda la gama Adeslas desde 21€/mes: ambulatorio, hospitalización completa, sin copagos y libre elección de médico. Encuentra el plan ideal para ti y tu familia.</p>
      </motion.div>

      {/* Featured 3 cards */}
      <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {featuredProducts.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative bg-blanco rounded-2xl p-6 card-shadow transition-all duration-[250ms] hover:-translate-y-1 hover:card-shadow-hover"
            style={{
              borderRadius: "16px",
              border: p.featured ? "2px solid #009FE3" : "1px solid #D5E3F0",
            }}
          >
            {p.badge && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-primary-foreground text-xs font-bold whitespace-nowrap"
                style={{ backgroundColor: "#009FE3" }}
              >
                {p.badge}
              </div>
            )}
            {(p as any).promoBadge && (
              <div
                className={
                  p.badge
                    ? "absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap"
                    : "absolute -top-3 right-4 px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-md whitespace-nowrap"
                }
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #F97316 100%)",
                  boxShadow: "0 3px 10px rgba(249,115,22,0.40)",
                }}
              >
                {(p as any).promoBadge}
              </div>
            )}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{ backgroundColor: p.featured ? "#003087" : "#E8F4FC" }}
            >
              {p.icon}
            </div>
            <h3 className="text-gris-texto mb-1">{p.name}</h3>
            <div className="price-style mb-2">
              desde {p.price}€<span className="text-base font-normal text-gris-medio">/mes</span>
            </div>
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-5"
              style={{
                backgroundColor: p.pillDark ? "#003087" : "#E8F4FC",
                color: p.pillDark ? "#fff" : "#009FE3",
              }}
            >
              {p.pill}
            </div>
            <div className="space-y-2.5 mb-6">
              {p.coverages.map((c) => (
                <div key={c} className="flex items-center gap-2 text-sm text-gris-texto">
                  <CheckIcon />
                  {c}
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <CalcButton
                productSlug={p.slug}
                className="block w-full text-center py-2.5 rounded-lg text-primary-foreground font-bold text-sm transition-colors cursor-pointer"
                style={{ backgroundColor: "#E4097D", borderRadius: "7px" }}
              >
                Calcular mi precio
              </CalcButton>
              <Link
                to={p.href}
                className="block w-full py-2.5 rounded-lg text-azul-medio font-bold text-sm border border-borde transition-colors hover:bg-azul-suave text-center"
                style={{ borderRadius: "7px" }}
              >
                Ver coberturas completas
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* All products carousel */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 max-w-5xl mx-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-gris-texto text-lg font-bold">Toda la gama de seguros Adeslas</h3>
            <p className="text-gris-medio text-sm mt-1">Salud, dental, decesos, mascotas, accidentes, viaje y más</p>
          </div>
        </div>
        <ProductCarousel />
      </motion.div>
    </div>
  </section>
);

export default ProductsSection;
