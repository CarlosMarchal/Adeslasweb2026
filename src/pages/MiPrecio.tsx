import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, CheckCircle2, ArrowLeft, Shield, Star, Award, X, Clock } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import logoAzul from "@/assets/Logo-adeslas-Marchal-color.webp";

/* ─── Product data ─── */
const productData: Record<string, {
  name: string;
  tagline: string;
  badge: string;
  badgeColor: string;
  highlight: string;
  features: string[];
  ideal: string;
}> = {
  "adeslas-go": {
    name: "Adeslas GO",
    tagline: "El seguro médico más accesible de Adeslas",
    badge: "Más económico",
    badgeColor: "#10B981",
    highlight: "Cobertura ambulatoria completa desde el primer día",
    features: [
      "Medicina general y urgencias 24h",
      "+51.000 médicos médicos en España",
      "Diagnósticos y pruebas médicas básicas",
      "Pediatría y ginecología incluidas",
      "Doctor Virtual disponible 24h",
      "Sin periodo de carencia para urgencias",
      "App Adeslas para gestionar tu seguro",
    ],
    ideal: "Ideal si buscas cobertura esencial al menor precio.",
  },
  "adeslas-plena-vital": {
    name: "Adeslas Plena Vital",
    tagline: "Ambulatoria completa con hospitalización por accidente",
    badge: "Cobertura ambulatoria",
    badgeColor: "#009FE3",
    highlight: "Todo lo ambulatorio más hospitalización por accidente",
    features: [
      "Medicina general y todos los especialistas",
      "Hospitalización por accidente incluida",
      "Diagnósticos completos: analíticas, radiología, ecografías",
      "Pediatría y ginecología completas",
      "Urgencias presenciales y Doctor Virtual 24h",
      "Fisioterapia y rehabilitación",
      "App Adeslas para gestionar tu seguro",
    ],
    ideal: "Ideal si quieres más cobertura que el básico con un precio muy competitivo.",
  },
  "adeslas-plena-total": {
    name: "Adeslas Plena Total",
    tagline: "El seguro más vendido. Sin copagos. Sin sorpresas.",
    badge: "Más vendido",
    badgeColor: "#003087",
    highlight: "Cobertura total sin copago en consultas, urgencias y hospitalización",
    features: [
      "Sin copago en consultas y urgencias",
      "Hospitalización y cirugía completas",
      "+51.000 médicos en toda España",
      "Diagnósticos de alta tecnología (TAC, resonancias…)",
      "Rehabilitación y fisioterapia incluidas",
      "Cobertura internacional hasta 14.000€",
      "Doctor Virtual 24h incluido",
      "Adeslas Dental opcional",
    ],
    ideal: "La opción más equilibrada: cobertura total sin pagar por cada consulta.",
  },
  "adeslas-plena-vital-total": {
    name: "Adeslas Plena Vital Total",
    tagline: "Todo lo de Completa, con ampliaciones en hospitalización",
    badge: "Copago reducido",
    badgeColor: "#8B5CF6",
    highlight: "Prestaciones ampliadas y copagos más bajos que en Completa",
    features: [
      "Todo lo incluido en Adeslas Plena Total",
      "Copagos reducidos en todas las consultas",
      "Mayor cobertura en prótesis e implantes",
      "Habitación individual garantizada en hospitalización",
      "Cobertura dental ampliada",
      "Cobertura internacional hasta 18.000€",
      "Servicio de segunda opinión médica",
    ],
    ideal: "Ideal si quieres un plus de cobertura y mayor confort sin llegar al tope.",
  },
  "adeslas-plena-plus": {
    name: "Adeslas Plena Plus",
    tagline: "La cobertura máxima con tope de gasto garantizado",
    badge: "Copago máx. 300€/año",
    badgeColor: "#6366F1",
    highlight: "Nunca pagarás más de 300€ en copagos al año, sin importar cuánto uses el seguro",
    features: [
      "Todo lo incluido en Adeslas Plena Total+",
      "Tope de copago de 300€/año garantizado",
      "Prótesis dentales completas incluidas",
      "Ortodoncia incluida",
      "Cobertura internacional premium",
      "Servicio de medicina preventiva",
      "Asistencia en viaje completa",
    ],
    ideal: "La tranquilidad de saber exactamente cuánto gastarás al año, como máximo.",
  },
  "adeslas-extra-150": {
    name: "Adeslas Plena Extra",
    tagline: "Libertad total. Cualquier médico. En cualquier parte del mundo.",
    badge: "Libre elección",
    badgeColor: "#D97706",
    highlight: "Elige cualquier médico de España o del mundo y Adeslas te reembolsa el gasto",
    features: [
      "Cualquier médico, sin red cerrada",
      "Reembolso del gasto médico hasta el límite contratado",
      "Cobertura en todo el mundo",
      "Sin necesidad de autorización previa",
      "Historial médico unificado",
      "Servicio de segunda opinión médica internacional",
      "Hospitalización en cualquier clínica privada",
    ],
    ideal: "Para quienes valoran la libertad absoluta de elección médica.",
  },
};

/* ─── Call popup ─── */
const CallConfirmPopup = ({ nombre, onClose }: { nombre: string; onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[600] flex items-center justify-center bg-black/50 px-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 12 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: 12 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="bg-white rounded-2xl p-8 w-full max-w-sm relative text-center"
      style={{ boxShadow: "0 24px 64px rgba(0,48,135,0.18)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gris-medio hover:text-gris-texto transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{ backgroundColor: "#E8F4FC" }}
      >
        <Phone className="w-7 h-7" style={{ color: "#009FE3" }} />
      </div>

      {/* Message */}
      <h3 className="text-xl font-black text-[#003087] mb-2">
        ¡Gracias{nombre ? `, ${nombre}` : ""}!
      </h3>
      <p className="text-sm text-gris-medio mb-5 leading-relaxed">
        Hemos recibido tu solicitud. Uno de nuestros asesores especializados se pondrá en contacto contigo <strong className="text-gris-texto">lo antes posible</strong>.
      </p>

      {/* Hours */}
      <div
        className="rounded-xl p-4 mb-5 flex items-start gap-3 text-left"
        style={{ backgroundColor: "#F0F7FF" }}
      >
        <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#009FE3" }} />
        <div>
          <p className="text-xs font-bold text-[#003087] mb-0.5">Horario de atención</p>
          <p className="text-xs text-gris-medio">Lunes a viernes: 9:00 – 20:00 h</p>
          <p className="text-xs text-gris-medio">Sábado y domingo: cerrado</p>
        </div>
      </div>

      {/* Phone direct */}
      <p className="text-xs text-gris-medio mb-3">¿Prefieres llamar tú? Estamos en</p>
      <a
        href="tel:917105000"
        className="inline-flex items-center gap-2 font-bold text-sm px-5 py-2.5 rounded-xl text-white btn-cta-magenta"
        style={{ backgroundColor: "#E4097D" }}
      >
        <Phone className="w-4 h-4" />
        91 710 50 00
      </a>
    </motion.div>
  </motion.div>
);

/* ─── Component ─── */
const MiPrecio = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const [showCallPopup, setShowCallPopup] = useState(false);

  const nombre = searchParams.get("nombre") || "";
  const precioRaw = searchParams.get("precio") || "0";
  const edadesRaw = searchParams.get("edades") || "";
  const provincia = searchParams.get("provincia") || "";
  const descuento = searchParams.get("descuento") || "";
  const precioBaseRaw = searchParams.get("precioBase") || "";

  const precio = parseFloat(precioRaw);
  const precioBase = precioBaseRaw ? parseFloat(precioBaseRaw) : null;
  const hasDiscount = descuento === "10" && precioBase !== null;
  const edades = edadesRaw ? edadesRaw.split(",") : [];
  const producto = productData[slug || ""] || null;

  const [int, dec] = precio.toFixed(2).split(".");

  /* ── noindex: estas páginas no deben indexarse en Google ── */
  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.content = "noindex, nofollow";
    return () => { if (meta) meta.content = "index, follow"; };
  }, []);

  const _seo = useSeo({
    title: producto
      ? `Tu cotización ${producto.name}${nombre ? ` · ${nombre}` : ""} | Adeslas`
      : "Tu cotización Adeslas",
    description: `Cotización personalizada para ${producto?.name || "Adeslas"}. Precio calculado para ${provincia}.`,
    canonical: "",
  });

  if (!producto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {_seo}
        <div className="text-center">
          <p className="text-gris-medio mb-4">Producto no encontrado</p>
          <Link to="/" className="text-azul-medio hover:underline">← Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {_seo}

      {/* ── Call confirmation popup ── */}
      <AnimatePresence>
        {showCallPopup && (
          <CallConfirmPopup nombre={nombre} onClose={() => setShowCallPopup(false)} />
        )}
      </AnimatePresence>

      {/* ── Top bar ── */}
      <div className="bg-white border-b border-[#E2E8F0]" style={{ height: 64 }}>
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
          <Link to="/">
            <img src={logoAzul} alt="Adeslas Seguros Médicos" className="h-10 object-contain" />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-gris-medio hover:text-azul-medio transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── LEFT: Personalized card ── */}
          <div className="lg:col-span-1 space-y-5">

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2E8F0]"
            >
              <p className="text-sm text-gris-medio mb-1">Tu cotización personalizada</p>
              {nombre && (
                <h1 className="text-2xl font-black text-[#003087] mb-1">
                  Hola, {nombre} 👋
                </h1>
              )}
              <p className="text-sm text-gris-medio">
                Hemos calculado tu precio para{" "}
                <span className="font-semibold text-gris-texto">{producto.name}</span>
                {provincia && <> en <span className="font-semibold">{provincia}</span></>}
                {edades.length > 0 && (
                  <> ({edades.join(", ")} {edades.length === 1 && edades[0] === "1" ? "año" : "años"})</>
                )}
                .
              </p>
            </motion.div>

            {/* Price card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl p-7 text-white"
              style={{ background: "linear-gradient(145deg, #003087 0%, #009FE3 100%)" }}
            >
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span
                  className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide"
                  style={{ backgroundColor: producto.badgeColor }}
                >
                  {producto.badge}
                </span>
                {hasDiscount && (
                  <span
                    className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide"
                    style={{ backgroundColor: "#16A34A", color: "#fff" }}
                  >
                    🎉 -10% familiar
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold mb-1" style={{ color: "rgba(255,255,255,0.75)" }}>
                {producto.name}
              </p>
              {hasDiscount && precioBase && (
                <p className="text-sm line-through mb-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {precioBase.toFixed(2).replace(".", ",")}€/mes
                </p>
              )}
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black">{int}</span>
                <span className="text-2xl font-bold">,{dec}€</span>
                <span className="text-sm ml-1" style={{ color: "rgba(255,255,255,0.6)" }}>/mes</span>
              </div>
              {hasDiscount && precioBase && (
                <p className="text-xs font-bold mb-1" style={{ color: "#86EFAC" }}>
                  Ahorro: {(precioBase - precio).toFixed(2).replace(".", ",")}€/mes con descuento familiar
                </p>
              )}
              {edades.length > 1 && (
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Total para {edades.length} asegurados
                </p>
              )}
              <div
                className="mt-4 pt-4 text-xs"
                style={{ borderTop: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)" }}
              >
                {hasDiscount ? "Precio con descuento familiar (4+ asegurados) · Sin compromiso" : "Precio neto mensual · Sin compromiso"}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="space-y-3"
            >
              <button
                onClick={() => setShowCallPopup(true)}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 btn-cta-magenta active:scale-[0.98]"
                style={{ backgroundColor: "#E4097D" }}
              >
                <Phone className="w-4 h-4" />
                Quiero que me llamen
              </button>
              <p className="text-center text-[11px] text-gris-medio">
                Atención personalizada · Sin compromiso
              </p>
            </motion.div>

            {/* Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="bg-white rounded-2xl p-5 border border-[#E2E8F0] space-y-3"
            >
              <div className="flex items-center gap-2.5 text-sm text-gris-texto">
                <Shield className="w-4 h-4 flex-shrink-0 text-[#003087]" />
                <span>Más de 30 años de experiencia</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gris-texto">
                <Star className="w-4 h-4 flex-shrink-0 text-[#003087]" />
                <span>+51.000 médicos en toda España</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gris-texto">
                <Award className="w-4 h-4 flex-shrink-0 text-[#003087]" />
                <span>Sin periodo de espera para urgencias</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Product detail ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Product header */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#E2E8F0]">
              <h2 className="text-2xl font-black text-[#003087] mb-1">{producto.name}</h2>
              <p className="text-gris-medio text-sm mb-4">{producto.tagline}</p>
              <div
                className="rounded-xl p-4 text-sm font-semibold"
                style={{ backgroundColor: "#EEF4FF", color: "#003087" }}
              >
                ✦ {producto.highlight}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-[#E2E8F0]">
              <h3 className="text-[13px] font-black text-[#003087] mb-5 uppercase tracking-wide">
                ¿Qué incluye tu seguro?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {producto.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "#009FE3" }}
                    />
                    <span className="text-sm text-gris-texto">{feature}</span>
                  </motion.div>
                ))}
              </div>
              <div
                className="mt-6 pt-5 flex items-start gap-3"
                style={{ borderTop: "1px solid #E2E8F0" }}
              >
                <span className="text-xl">💡</span>
                <p className="text-sm text-gris-medio">{producto.ideal}</p>
              </div>
            </div>

            {/* Compare */}
            <div
              className="rounded-2xl p-6 flex items-center justify-between gap-4"
              style={{ backgroundColor: "#EEF4FF" }}
            >
              <div>
                <p className="font-bold text-[#003087] text-sm mb-1">¿Quieres ver otras opciones?</p>
                <p className="text-xs text-gris-medio">Compara todos los seguros Adeslas con tu precio calculado</p>
              </div>
              <Link
                to="/"
                className="flex-shrink-0 px-5 py-2.5 rounded-xl font-bold text-sm text-white btn-cta-dark"
                style={{ backgroundColor: "#003087" }}
              >
                Ver comparativa
              </Link>
            </div>

            {/* Bottom CTA repeat — mobile only */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowCallPopup(true)}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 btn-cta-magenta"
                style={{ backgroundColor: "#E4097D" }}
              >
                <Phone className="w-4 h-4" />
                Quiero que me llamen
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-[#E2E8F0] bg-white mt-10 py-5">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gris-medio">
          <span>© {new Date().getFullYear()} Marchal Mediadores S.L. · Agente Exclusivo Adeslas</span>
          <Link to="/politica-de-privacidad" className="hover:underline">Aviso Legal y Privacidad</Link>
        </div>
      </div>
    </div>
  );
};

export default MiPrecio;
