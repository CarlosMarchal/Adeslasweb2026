import { useState, useEffect, useRef, useCallback } from "react";
import { submitToHubSpot } from "@/lib/hubspot";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logoAzul from "@/assets/Logo-adeslas-Marchal-color.webp";
import { useTarificador } from "@/components/TarificadorContext";
import { usePageCalc } from "@/components/PageCalcContext";
import { usePhonePopup } from "@/components/PhonePopupContext";

/* ───── data ───── */
const I = (d: string, extra?: string) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
    {extra && <path d={extra} />}
  </svg>
);
const IC = (d: string, cx: number, cy: number, r: number) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx={cx} cy={cy} r={r} /><path d={d} />
  </svg>
);

// Individual — person
const icoIndividual = IC("M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2", 12, 7, 4);
// Familia — group
const icoFamilia = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
// Infantil — smiling face (baby)
const icoInfantil = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3"/><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3"/>
  </svg>
);
// Ginecología — venus symbol
const icoGinecologia = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="9" r="6"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="9" y1="19" x2="15" y2="19"/>
  </svg>
);
// Embarazadas — heart (maternal care)
const icoEmbarazadas = I("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z");
// Personas mayores — person with cane
const icoMayores = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="4" r="2.5"/>
    <path d="M10 6.5v5l-2.5 5.5 2.5 5"/><path d="M10 11.5H7l2 5"/><path d="M14 19l2.5 3.5"/>
  </svg>
);
// Autónomos — briefcase
const icoAutonomos = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/>
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="12" strokeWidth="3"/>
  </svg>
);
// Pymes — storefront
const icoPymes = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

// Dental — tooth
const icoDental = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2c-3.5 0-6.5 2.5-6.5 6 0 1.5.4 2.7 1 3.7C7 13.6 7 14.3 7 15v6a1 1 0 0 0 2 0v-4h6v4a1 1 0 0 0 2 0v-6c0-.7 0-1.4.5-3.3.6-1 1-2.2 1-3.7C18.5 4.5 15.5 2 12 2z"/>
  </svg>
);
// Decesos — feather (peace/gentleness)
const icoDecesos = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
    <line x1="16" y1="8" x2="2" y2="22"/><line x1="17" y1="15" x2="9" y2="15"/>
  </svg>
);
// Mascotas — paw print
const icoMascotas = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="5.5" r="1.5"/><circle cx="10" cy="3.5" r="1.5"/>
    <circle cx="14.5" cy="3.5" r="1.5"/><circle cx="19" cy="5.5" r="1.5"/>
    <path d="M12 12.5c-3.5 0-6.5 2-6.5 5 0 2 1.8 3.5 4 3.5.8 0 1.5-.5 2.5-.5s1.7.5 2.5.5c2.2 0 4-1.5 4-3.5 0-3-3-5-6.5-5z"/>
  </svg>
);
// Asistencia Viaje — airplane
const icoViaje = I("M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19.5 2.5c-1.5-1.5-3.5-1.5-5 0L11 6 2.8 4.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L8 12l-1 4-2 2 2.5 2.5L9.5 18l4 6.5c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z");
// Accidentes — shield with alert
const icoAccidentes = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5"/>
  </svg>
);
// Plena Total — shield with checkmark
const icoPlenaTotal = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);
// Plena Plus — crown
const icoPlenaPlus = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 20h20M5 20 2 7l5 4 5-9 5 9 5-4-3 13"/>
  </svg>
);
// Extra 150 — expand arrows (free choice)
const icoExtra150 = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);
// Adeslas Go — lightning bolt
const icoGo = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
// Plena Vital — heartbeat/pulse
const icoPlenaVital = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);
// Plena Vital Total — heart with cross
const icoPlenaVitalTotal = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    <line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>
  </svg>
);
// Seniors — person (elder) with walking cane
const icoSeniors = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="4" r="2.5"/>
    <path d="M10 6.5v5.5l-2 4.5 2 6"/><path d="M10 12h-3l1.5 4.5"/><path d="M14.5 18l2 4"/>
  </svg>
);
// Seniors Total — person elder + checkmark badge
const icoSeniorsTotal = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="4" r="2.5"/>
    <path d="M9 6.5v5.5l-2 4.5 2 6"/><path d="M9 12h-3l1.5 4.5"/>
    <path d="M16 9l2 2 4-4"/>
  </svg>
);

const megaSeguros = {
  particulares: [
    { icon: icoIndividual,   label: "Individual",        sub: "Seguro médico para ti",                         to: "/seguro-salud/adeslas-individual/" },
    { icon: icoFamilia,      label: "Familia",           sub: "Protege a toda la familia",                     to: "/seguro-salud/seguro-familia/" },
    { icon: icoInfantil,     label: "Infantil",          sub: "Seguro para los más pequeños",                  to: "/seguro-salud/adeslas-infantil/" },
    { icon: icoGinecologia,  label: "Ginecología",       sub: "Cobertura ginecológica completa",               to: "/seguro-salud/adeslas-ginecologia/" },
    { icon: icoEmbarazadas,  label: "Embarazadas",       sub: "Seguimiento del embarazo y parto",              to: "/seguro-salud/embarazo/" },
    { icon: icoMayores,      label: "Personas mayores",  sub: "Cobertura especializada para seniors",          to: "/seguro-salud/seguro-para-personas-mayores/" },
  ],
  empresas: [
    { icon: icoAutonomos, label: "Autónomos",       sub: "Adeslas NEGOCIOS — sin copago, deducible IRPF",          to: "/seguro-salud/autonomos/" },
    { icon: icoPymes,     label: "Pymes y Empresas", sub: "Adeslas EMPRESAS y PYMES TOTAL — sin copago para empleados", to: "/seguro-salud/pymes/" },
  ],
  dental: [
    { icon: icoDental, label: "Adeslas Dental Max", sub: "Revisiones, ortodoncia, implantes", to: "/seguro-dental/" },
  ],
  otros: [
    { icon: icoDecesos,    label: "Adeslas Decesos",     sub: "Gestión completa del sepelio",      to: "/seguro-decesos/" },
    { icon: icoMascotas,   label: "Adeslas Mascotas",    sub: "Perros y gatos desde 5,85€/mes",    to: "/seguro-mascotas/" },
    { icon: icoViaje,      label: "Asistencia en Viaje", sub: "Cobertura mundial sin permanencia", to: "/adeslas-asistencia-en-viaje/" },
    { icon: icoAccidentes, label: "Seguro de Accidentes",sub: "Protección 24h en todo el mundo",   to: "/seguro-accidentes/" },
  ],
};

const megaPlanes = {
  sinCopago: [
    { icon: icoPlenaTotal, label: "Adeslas Plena Total",  sub: "La opción más vendida. Sin copagos.",         badge: "Sin subidas 3 años", to: "/seguro-salud/adeslas-plena-total/" },
    { icon: icoPlenaPlus,  label: "Adeslas Plena Plus",   sub: "Cobertura total premium. Lo mejor de Adeslas.", to: "/seguro-salud/adeslas-plena-plus/" },
    { icon: icoExtra150,   label: "Adeslas Extra 150",    sub: "Libre elección + reembolso 80%.",              to: "/seguro-salud/adeslas-extra-150/" },
  ],
  conCopago: [
    { icon: icoGo,              label: "Adeslas Go",              sub: "La más económica. Cobertura ambulatoria.",      to: "/seguro-salud/adeslas-go/" },
    { icon: icoPlenaVital,      label: "Adeslas Plena Vital",     sub: "Cobertura completa con copagos reducidos.",     to: "/seguro-salud/adeslas-plena-vital/" },
    { icon: icoPlenaVitalTotal, label: "Adeslas Plena Vital Total",sub: "Cobertura total. Copago máx. 500€/año.",  badge: "Sin subidas 3 años", to: "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/" },
    { icon: icoSeniors,         label: "Adeslas Seniors",         sub: "Para mayores de 55. Asesor personal.",          to: "/seguro-salud/adeslas-seniors/" },
    { icon: icoSeniorsTotal,    label: "Adeslas Seniors Total",   sub: "Mayores 63-84. Dental incluida.",         badge: "Sin subidas 3 años", to: "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/" },
  ],
};

const MegaLink = ({ icon, label, sub, badge, to, onClick }: any) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-start gap-2.5 px-3 py-2 rounded-lg transition-colors duration-150 hover:bg-azul-suave hover:text-azul-medio text-[14px] group" style={{ color: "#374151" }}
  >
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "#E8F4FC" }}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-bold">{label}</span>
        {badge && (
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white whitespace-nowrap" style={{ backgroundColor: "#374151" }}>
            {badge}
          </span>
        )}
      </div>
      {sub && <div className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{sub}</div>}
    </div>
  </Link>
);

/* ───── Header ───── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [headerBottom, setHeaderBottom] = useState(0);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [navPhone, setNavPhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [stickyBottom, setStickyBottom] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const megaTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const { openTarificador } = useTarificador();
  const { onCalcClick, calcLabel } = usePageCalc();
  const { openPhonePopup } = usePhonePopup();
  const { pathname } = useLocation();
  const measureHeader = useCallback(() => {
    // Wrap in rAF to avoid forced reflow during scroll handler (PageSpeed fix)
    requestAnimationFrame(() => {
      if (headerRef.current) {
        setHeaderBottom(headerRef.current.getBoundingClientRect().bottom);
      }
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      measureHeader();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    measureHeader();
    window.addEventListener("resize", measureHeader);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureHeader);
    };
  }, [measureHeader]);

  /* ── Mantiene el sticky bar visible aunque la barra del browser (iOS Safari)
        aparezca al hacer scroll hacia arriba. VisualViewport da la altura real
        del viewport visible, excluyendo la chrome dinámica del navegador.    ── */
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => {
      setStickyBottom(Math.max(0, window.innerHeight - vv.offsetTop - vv.height));
    };
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    update();
    return () => {
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMegaOpen(null); setShowPhonePopup(false); setShowThankYouModal(false); }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const openMega = (key: string) => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setMegaOpen(key);
  };
  const closeMega = () => { megaTimeoutRef.current = setTimeout(() => setMegaOpen(null), 120); };

  const isPhoneValid = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 9 && digits.length <= 11;
  };

  const formatPhoneDisplay = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 9);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)} ${d.slice(3)}`;
    return `${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6)}`;
  };

  const handleNavPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNavPhone(formatPhoneDisplay(e.target.value));
  };
  const handleNavPhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (navPhone.replace(/\D/g, "").length >= 9) {
      submitToHubSpot({ phone: "+34" + navPhone.replace(/\s/g, ""), source: 300 });
      setNavPhone("");
      setShowThankYouModal(true);
    }
  };

  const handleMobilePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobilePhone(formatPhoneDisplay(e.target.value));
  };
  const handleMobilePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobilePhone.replace(/\D/g, "").length >= 9) {
      submitToHubSpot({ phone: "+34" + mobilePhone.replace(/\s/g, ""), source: 301 });
      setMobilePhone("");
      setShowPhonePopup(false);
      setShowThankYouModal(true);
    }
  };

  const navItems = [
    { key: "seguros", label: "Seguros", hasMega: true },
    { key: "planes", label: "Planes", hasMega: true },
    { key: "precios", label: "Precios y ofertas", to: "/seguro-salud/ofertas-adeslas-precios/" },
    { key: "blog", label: "Blog Salud", to: "/adeslas-blog/" },
    { key: "cuadro", label: "Cuadro médico", to: "/cuadro-medico/" },
    { key: "contacto", label: "Contacto", to: "/contacto/" },
  ];

  return (
    <>
      <header ref={headerRef} className={`sticky top-0 z-50 bg-white transition-shadow duration-200${scrolled ? " shadow-md" : ""}`}>

        {/* ══════════════════════════════════
            FILA 1 — Logo · Teléfonos · CTA
        ══════════════════════════════════ */}
        <div className="border-b" style={{ borderColor: "#E8EFF4" }}>
          <div className="max-w-[1280px] mx-auto flex items-center justify-between px-12 lg:px-20" style={{ height: 84 }}>

            {/* Logo + claim */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0">
              <img src={logoAzul} alt="Adeslas — Seguros Médicos Privados en España" className="h-10 lg:h-11 object-contain" />
              {!scrolled && (
                <div className="hidden xl:flex items-center pl-3" style={{ borderLeft: "1px solid #D5E3F0" }}>
                  <span className="text-[11px] leading-tight" style={{ color: "#C0D0DC" }}>
                    Marchal Aseguradores · Agente exclusivo Adeslas
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop: teléfonos + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Teléfono 1 */}
              <a
                href="tel:917105000"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-colors hover:border-[#009FE3] group"
                style={{ borderColor: "#D5E3F0" }}
              >
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EEF5FF" }}>
                  <Phone className="w-4 h-4" style={{ color: "#009FE3" }} />
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-medium" style={{ color: "#6B8296" }}>Nuevas contrataciones</div>
                  <div className="text-sm font-bold" style={{ color: "#003087" }}>91 710 50 00</div>
                </div>
              </a>
              {/* Teléfono 2 */}
              <a
                href="tel:919191898"
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-colors hover:border-[#009FE3] group"
                style={{ borderColor: "#D5E3F0" }}
              >
                <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#EEF5FF" }}>
                  <Phone className="w-4 h-4" style={{ color: "#009FE3" }} />
                </div>
                <div className="leading-tight">
                  <div className="text-[10px] font-medium" style={{ color: "#6B8296" }}>Atención al cliente</div>
                  <div className="text-sm font-bold" style={{ color: "#003087" }}>91 91 91 898</div>
                </div>
              </a>
              {/* CTA principal — desktop always opens tarificador modal */}
              <button
                onClick={openTarificador}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white btn-cta-magenta active:scale-[0.98] cursor-pointer ml-1"
                style={{ backgroundColor: "#E4097D" }}
              >
                Calcular mi precio
              </button>
            </div>

            {/* Mobile: hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ minWidth: 44, minHeight: 44 }}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen
                ? <X className="w-6 h-6" style={{ color: "#1A3A5C" }} />
                : <Menu className="w-6 h-6" style={{ color: "#1A3A5C" }} />
              }
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════
            FILA 2 — Nav · Input teléfono
        ══════════════════════════════════ */}
        <div className="hidden lg:block border-b" style={{ borderColor: "#E8EFF4", backgroundColor: "#FAFCFE" }}>
          <div className="max-w-[1280px] mx-auto flex items-center justify-between px-12 lg:px-20" style={{ height: 48 }}>

            {/* Nav links */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) =>
                item.hasMega ? (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => openMega(item.key)}
                    onMouseLeave={closeMega}
                  >
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 hover:bg-white hover:text-[#009FE3]"
                      style={{ color: megaOpen === item.key ? "#009FE3" : "#374151" }}
                    >
                      {item.label}
                      <ChevronDown
                        className="w-3.5 h-3.5 transition-transform duration-200"
                        style={{ transform: megaOpen === item.key ? "rotate(180deg)" : "rotate(0deg)" }}
                      />
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    to={item.to!}
                    className="px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 hover:bg-white hover:text-[#009FE3]"
                    style={{ color: "#374151" }}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            {/* Input teléfono + "Te llamamos" */}
            <form onSubmit={handleNavPhoneSubmit} className="flex items-center gap-0">
              <div
                className="flex items-center rounded-l-lg border border-r-0 overflow-hidden gap-1.5 px-2"
                style={{ borderColor: "#D5E3F0", backgroundColor: "#fff", height: 36 }}
              >
                <span className="text-base leading-none select-none">🇪🇸</span>
                <span className="text-sm font-medium select-none" style={{ color: "#374151" }}>+34</span>
                <input
                  type="tel"
                  value={navPhone}
                  onChange={handleNavPhoneChange}
                  placeholder="600 000 000"
                  autoComplete="tel"
                  inputMode="numeric"
                  className="h-8 text-sm border-0 bg-transparent outline-none w-[130px] px-1 cursor-text"
                  style={{ color: "#1A3A5C" }}
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 text-sm font-bold text-white rounded-r-lg btn-cta-dark active:scale-[0.98] cursor-pointer whitespace-nowrap"
                style={{ backgroundColor: "#003087", height: 36 }}
              >
                <Phone className="w-3.5 h-3.5" />
                Te llamamos
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ── Mega menu ── */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key={megaOpen}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="hidden lg:block fixed left-0 right-0 w-full bg-white z-[400]"
            style={{
              top: headerBottom,
              borderTop: "3px solid #E4097D",
              borderBottom: "1px solid #D5E3F0",
              boxShadow: "0 16px 48px rgba(0,48,135,0.12)",
            }}
            onMouseEnter={() => openMega(megaOpen)}
            onMouseLeave={closeMega}
          >
            <div className="max-w-[1200px] mx-auto px-8 py-9 flex items-start gap-0">
              {megaOpen === "seguros" && <MegaSegurosContent onNavigate={() => setMegaOpen(null)} />}
              {megaOpen === "planes" && <MegaPlanesContent onNavigate={() => setMegaOpen(null)} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/30 z-[299]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="lg:hidden fixed left-0 right-0 bg-white z-[300] overflow-y-auto rounded-b-2xl"
              style={{
                top: headerRef.current?.getBoundingClientRect().bottom ?? 68,
                maxHeight: "calc(100vh - 68px - 64px)",
                boxShadow: "0 16px 48px rgba(0,48,135,0.15)",
              }}
            >
              <div className="py-2">
                <MobileAccordionItem label="Seguros" isOpen={mobileExpanded === "seguros"} onToggle={() => setMobileExpanded(mobileExpanded === "seguros" ? null : "seguros")}>
                  <MobileGroup title="PARTICULARES" items={megaSeguros.particulares} onClose={() => setMobileOpen(false)} />
                  <MobileGroup title="AUTÓNOMOS Y NEGOCIOS" items={megaSeguros.empresas} onClose={() => setMobileOpen(false)} />
                  <MobileGroup title="DENTAL" items={megaSeguros.dental} onClose={() => setMobileOpen(false)} />
                  <MobileGroup title="OTROS SEGUROS" items={megaSeguros.otros} onClose={() => setMobileOpen(false)} />
                </MobileAccordionItem>
                <MobileAccordionItem label="Planes" isOpen={mobileExpanded === "planes"} onToggle={() => setMobileExpanded(mobileExpanded === "planes" ? null : "planes")}>
                  <MobileGroup title="SIN COPAGO" items={megaPlanes.sinCopago} onClose={() => setMobileOpen(false)} />
                  <MobileGroup title="CON COPAGO" items={megaPlanes.conCopago} onClose={() => setMobileOpen(false)} />
                </MobileAccordionItem>
                <Link to="/seguro-salud/ofertas-adeslas-precios/" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto border-b border-borde/50 hover:bg-gris-claro transition-colors">Precios y ofertas<ArrowRight className="w-4 h-4 text-gris-medio" /></Link>
                <Link to="/adeslas-blog/" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto border-b border-borde/50 hover:bg-gris-claro transition-colors">Blog Salud<ArrowRight className="w-4 h-4 text-gris-medio" /></Link>
                <Link to="/cuadro-medico/" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto border-b border-borde/50 hover:bg-gris-claro transition-colors">Cuadro médico<ArrowRight className="w-4 h-4 text-gris-medio" /></Link>
                <Link to="/contacto/" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-5 py-4 text-[15px] font-semibold text-gris-texto hover:bg-gris-claro transition-colors">Contacto<ArrowRight className="w-4 h-4 text-gris-medio" /></Link>
              </div>
              <div className="px-5 py-4 flex flex-col gap-3 border-t border-borde/50" style={{ backgroundColor: "#F8FAFC" }}>
                <a href="tel:917105000" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-borde text-sm" style={{ color: "#003087" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#E4097D" }}><Phone className="w-4 h-4 text-white" /></div>
                  <div><div className="text-[10px] text-gris-medio font-normal leading-none mb-0.5">Nuevas contrataciones</div><div className="font-bold">91 710 50 00</div></div>
                </a>
                <a href="tel:919191898" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-borde text-sm" style={{ color: "#003087" }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#009FE3" }}><Phone className="w-4 h-4 text-white" /></div>
                  <div><div className="text-[10px] text-gris-medio font-normal leading-none mb-0.5">Atención al cliente</div><div className="font-bold">91 91 91 898</div></div>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Mobile sticky bottom bar ── */}
      <div
        className="lg:hidden fixed left-0 right-0 z-[500] bg-white border-t border-borde flex gap-2.5 px-4 pt-2.5"
        style={{
          bottom: stickyBottom,
          boxShadow: "0 -4px 20px rgba(0,48,135,0.10)",
          paddingBottom: "max(0.625rem, env(safe-area-inset-bottom))",
        }}
      >
        <button onClick={openPhonePopup}
            className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-sm border-2 active:scale-[0.98]"
            style={{ borderColor: "#009FE3", color: "#009FE3" }}>
            <Phone className="w-4 h-4" />
            Te llamamos
          </button>
        <button onClick={onCalcClick ?? openTarificador}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl font-bold text-sm text-white active:scale-[0.98]"
          style={{ backgroundColor: "#009FE3" }}>
          {calcLabel ?? "Calcular mi precio"}
        </button>
      </div>

      {/* ── Thank-you modal ── */}
      <AnimatePresence>
        {showThankYouModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[700] flex items-center justify-center bg-black/50 px-4"
            onClick={() => setShowThankYouModal(false)}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white rounded-2xl p-7 w-full max-w-sm relative text-center"
              style={{ boxShadow: "0 32px 80px rgba(0,48,135,0.22)" }}
              onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowThankYouModal(false)} className="absolute top-3 right-3 text-gris-medio p-1 hover:text-gris-texto transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg, #E4097D 0%, #003087 100%)" }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h3 className="text-xl font-black mb-1" style={{ color: "#003087" }}>¡Ya tenemos tu número!</h3>
              <p className="text-sm text-gris-medio mb-5 leading-relaxed">Uno de nuestros asesores te llamará lo antes posible para ayudarte a encontrar el seguro que mejor se adapta a ti.</p>
              <div className="rounded-xl px-5 py-4 mb-5 text-left" style={{ backgroundColor: "#EEF5FF" }}>
                <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: "#009FE3" }}>Horario de atención</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm"><span className="text-gris-texto font-medium">Lunes – Viernes</span><span className="font-bold" style={{ color: "#003087" }}>9:00 – 20:00</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-gris-texto font-medium">Sábados</span><span className="font-bold" style={{ color: "#003087" }}>9:00 – 14:00</span></div>
                </div>
              </div>
              <a href="tel:917105000" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm border-2" style={{ borderColor: "#E4097D", color: "#E4097D" }} onClick={() => setShowThankYouModal(false)}>
                <Phone className="w-4 h-4" />O llámanos: 91 710 50 00
              </a>
              <p className="text-[10px] text-gris-medio mt-3">Sin compromiso · Datos protegidos · Respuesta en minutos</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phone popup (mobile) ── */}
      <AnimatePresence>
        {showPhonePopup && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-black/50 px-4"
            onClick={() => setShowPhonePopup(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-sm relative"
              style={{ boxShadow: "0 24px 64px rgba(0,48,135,0.2)" }}
              onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setShowPhonePopup(false)} className="absolute top-3 right-3 text-gris-medio p-1"><X className="w-5 h-5" /></button>
              <div className="text-center mb-5">
                <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: "#FCE4F0" }}>
                  <Phone className="w-6 h-6" style={{ color: "#E4097D" }} />
                </div>
                <h3 className="text-gris-texto text-lg font-bold">Te llamamos gratis</h3>
                <p className="text-sm text-gris-medio">Un asesor Adeslas te contactará en minutos</p>
              </div>
              <form onSubmit={handleMobilePhoneSubmit} className="space-y-3">
                <div className="flex items-center gap-2 w-full h-12 rounded-xl border border-borde px-3 focus-within:border-azul-medio focus-within:ring-2 focus-within:ring-azul-suave transition-all" style={{ backgroundColor: "#fff" }}>
                  <span className="text-lg leading-none select-none">🇪🇸</span>
                  <span className="text-sm font-medium select-none" style={{ color: "#374151" }}>+34</span>
                  <input
                    type="tel"
                    value={mobilePhone}
                    onChange={handleMobilePhoneChange}
                    placeholder="600 000 000"
                    autoComplete="tel"
                    inputMode="numeric"
                    className="flex-1 h-full text-base border-0 bg-transparent outline-none cursor-text"
                    style={{ color: "#1A3A5C" }}
                  />
                </div>
                <button type="submit" className="w-full py-3.5 rounded-xl text-white font-bold text-base" style={{ backgroundColor: "#E4097D" }}>
                  Te llamamos ahora
                </button>
              </form>
              <p className="text-center text-[10px] text-gris-medio mt-3">Sin compromiso · Datos protegidos</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ───── Mega Seguros ───── */
const MegaSegurosContent = ({ onNavigate }: { onNavigate: () => void }) => {
  const { openTarificador } = useTarificador();
  return (
    <>
      <div className="w-[30%] pr-6 border-r border-borde">
        <div className="label-style mb-2" style={{ color: "#374151" }}>Particulares</div>
        {megaSeguros.particulares.map((item) => <MegaLink key={item.label} {...item} onClick={onNavigate} />)}
      </div>
      <div className="w-[22%] px-6 border-r border-borde">
        <div className="label-style mb-2" style={{ color: "#374151" }}>Autónomos y negocios</div>
        {megaSeguros.empresas.map((item) => <MegaLink key={item.label} {...item} onClick={onNavigate} />)}
      </div>
      <div className="w-[22%] px-6 border-r border-borde">
        <div className="label-style mb-2" style={{ color: "#374151" }}>Dental</div>
        {megaSeguros.dental.map((item) => <MegaLink key={item.label} {...item} onClick={onNavigate} />)}
        <div className="label-style mb-2 mt-4" style={{ color: "#374151" }}>Otros seguros</div>
        {megaSeguros.otros.map((item) => <MegaLink key={item.label} {...item} onClick={onNavigate} />)}
      </div>
      <div className="w-[240px] flex-shrink-0 ml-auto p-6 rounded-[14px] text-white flex flex-col justify-between" style={{ background: "linear-gradient(145deg, #003087 0%, #009FE3 100%)" }}>
        <div>
          <div className="text-[10px] font-black uppercase tracking-[1.4px]" style={{ color: "#7DD4F8" }}>Recomendado</div>
          <div className="text-lg font-black mt-1 mb-1">Adeslas Plena Vital Total</div>
          <div className="text-[13px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.70)" }}>Hospitalización completa con copago reducido. <span className="font-bold" style={{ color: "#7DD4F8" }}>3 años sin subidas de prima.</span></div>
        </div>
        <div className="mt-4">
          <div className="font-black text-[28px]">desde 48,50€ <span className="text-[13px] font-normal" style={{ color: "rgba(255,255,255,0.60)" }}>/mes</span></div>
          <button onClick={() => openTarificador("/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/")}
            className="block w-full text-center py-2.5 rounded-[7px] font-bold text-sm mt-3 btn-cta-magenta cursor-pointer"
            style={{ backgroundColor: "#E4097D", color: "#fff" }}>
            Calcular mi precio →
          </button>
        </div>
      </div>
    </>
  );
};

/* ───── Mega Planes ───── */
const MegaPlanesContent = ({ onNavigate }: { onNavigate: () => void }) => (
  <>
    <div className="w-[30%] pr-6 border-r border-borde">
      <div className="label-style mb-2" style={{ color: "#374151" }}>Sin copago</div>
      {megaPlanes.sinCopago.map((item) => <MegaLink key={item.label} {...item} onClick={onNavigate} />)}
    </div>
    <div className="w-[30%] px-6 border-r border-borde">
      <div className="label-style mb-2" style={{ color: "#374151" }}>Con copago</div>
      {megaPlanes.conCopago.map((item) => <MegaLink key={item.label} {...item} onClick={onNavigate} />)}
    </div>
    <div className="w-[240px] flex-shrink-0 ml-auto p-6 rounded-[14px] text-white flex flex-col justify-between" style={{ background: "linear-gradient(145deg, #003087 0%, #009FE3 100%)" }}>
      <div>
        <div className="text-[10px] font-black uppercase tracking-[1.4px]" style={{ color: "#7DD4F8" }}>¿No sabes cuál elegir?</div>
        <div className="text-lg font-black mt-1 mb-1">Te lo explicamos</div>
        <div className="text-[13px] leading-[1.55]" style={{ color: "rgba(255,255,255,0.70)" }}>Un asesor personal te explica las diferencias en 2 minutos. Sin compromiso.</div>
      </div>
      <Link to="/contacto/" className="block text-center py-2.5 rounded-[7px] font-bold text-sm mt-4 btn-cta-magenta" style={{ backgroundColor: "#E4097D", color: "#fff" }}>
        Hablar con un asesor →
      </Link>
    </div>
  </>
);

/* ───── Mobile accordion ───── */
const MobileAccordionItem = ({ label, isOpen, onToggle, children }: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) => (
  <div className="border-b border-borde/50">
    <button onClick={onToggle} className="flex items-center justify-between w-full px-5 py-4 text-[15px] font-semibold text-gris-texto hover:bg-gris-claro transition-colors">
      {label}
      <ChevronDown className="w-4 h-4 text-gris-medio transition-transform duration-200" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
          <div className="bg-gris-claro rounded-b-lg mx-3 mb-3 overflow-hidden" style={{ borderRadius: "12px" }}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const MobileGroup = ({ title, items, onClose }: { title: string; items: any[]; onClose: () => void }) => (
  <div>
    <div className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[1.4px]" style={{ color: "#003087" }}>{title}</div>
    {items.map((item) => (
      <Link key={item.label} to={item.to} onClick={onClose}
        className="flex items-center gap-2 text-[13px] py-2.5 px-4 text-gris-medio hover:text-azul-medio hover:bg-white transition-colors"
        style={{ borderBottom: "1px solid rgba(213,227,240,0.5)" }}>
        <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">{item.icon}</div><span>{item.label}</span>
      </Link>
    ))}
  </div>
);

export default Header;
