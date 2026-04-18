/**
 * Mapa de metadatos SEO para todas las rutas del SPA.
 * Usado por Next.js generateMetadata() en app/[[...slug]]/page.tsx
 * para server-render los <head> meta tags aunque el body sea client-side.
 *
 * Última actualización: 2026-04-16
 *
 * NOTA: No se incluyen referencias a intermediarios en el SEO público.
 * El site compite directamente como marca Adeslas.
 */

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
  /** URL absoluta de la imagen OG para esta página (1200×630, /public/*.jpg) */
  ogImage?: string;
  /** URL pública de la imagen hero para server-side <link rel="preload"> (mejora LCP) */
  preloadImage?: string;
}

const BASE = "https://adeslas.numero1salud.es";

/**
 * Metadatos por ruta exacta.
 * Para rutas dinámicas (blog/:slug, mi-precio/:slug) se usan defaults.
 */
export const PAGE_META: Record<string, PageMeta> = {
  // ── HOME ──────────────────────────────────────────────────────────
  "/": {
    title: "Seguros Médicos Adeslas 2026 | +51.000 Médicos · Desde 21€/mes",
    description:
      "Contrata tu seguro Adeslas directamente online. GO desde 21€, Plena Vital desde 38€, sin copagos desde 62€. +51.000 médicos. Calcula tu precio en 2 minutos.",
    canonical: `${BASE}/`,
    ogImage: `${BASE}/og-default.jpg`,
    preloadImage: "/images/hero-adeslas-seguros-medicos.webp",
  },

  // ── PRODUCTOS DE SALUD ────────────────────────────────────────────
  "/adeslas-go": {
    title: "Adeslas GO | Sin Copago · Sin Cuestionario · Desde 21€/mes",
    description:
      "Cobertura ambulatoria completa sin cuestionario de salud. Medicina general, especialistas y urgencias 24h. Sin copago. Alta online inmediata desde 21€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-go/`,
    ogImage: `${BASE}/og-go.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-go.webp",
  },
  "/adeslas-plena-vital": {
    title: "Adeslas Plena Vital | Hospitalización Completa · Copago Máx. 300€ · Desde 38€",
    description:
      "Seguro médico completo con hospitalización y copago máx. 300€/año. +51.000 médicos, sin esperas ni listas de espera. Calcula tu precio en 2 minutos.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-vital/`,
    ogImage: `${BASE}/og-vital.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-plena-vital.webp",
  },
  "/adeslas-plena-vital-total": {
    title: "Adeslas Plena Vital Total | 3 Años Sin Subida de Prima · Desde 48,50€/mes",
    description:
      "Cobertura completa con dental, psicología y prima garantizada 3 años sin subidas. Copago reducido. El plan más equilibrado precio-cobertura de Adeslas.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/`,
    ogImage: `${BASE}/og-vital-total.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-plena-vital-total.webp",
  },
  "/adeslas-plena-total": {
    title: "Adeslas Plena Total | Sin Copagos · Dental · Psicología · Desde 83€/mes",
    description:
      "El seguro médico más completo de Adeslas: sin copago, hospitalización, dental (46 actos), psicología y asistencia en viajes 100.000€. +51.000 médicos. Desde 83€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-total/`,
    ogImage: `${BASE}/og-total.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-plena-total.webp",
  },
  "/adeslas-extra-150": {
    title: "Adeslas Extra 150 | Libre Elección Médica · Reembolso 80% · Cobertura Mundial",
    description:
      "Acude a cualquier médico en España o en el mundo. Reembolso del 80% hasta 150.000€/año, sin restricción de especialista ni red médica obligatoria.",
    canonical: `${BASE}/seguro-salud/adeslas-extra-150/`,
    ogImage: `${BASE}/og-extra-150.jpg`,
  },
  "/adeslas-plena-plus": {
    title: "Adeslas Plena Plus | Sin Copagos · Cobertura Completa · Desde 62€/mes",
    description:
      "Sin copago en ningún servicio. Hospitalización, cirugía, parto y todas las especialidades con +51.000 médicos. La opción sin copagos más asequible de Adeslas.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-plus/`,
    ogImage: `${BASE}/og-plena-plus.jpg`,
  },

  // ── SENIORS ───────────────────────────────────────────────────────
  "/adeslas-seniors": {
    title: "Adeslas Seniors | Seguro Médico Mayores 55-84 Años · Desde 67,50€/mes",
    description:
      "Seguro médico Adeslas para personas de 55 a 84 años. Asesor personal, oncología, cardiología y rehabilitación. Prima garantizada sin subidas. Desde 67,50€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-seniors/`,
    ogImage: `${BASE}/og-seniors.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-seniors.webp",
  },
  "/adeslas-seniors-total": {
    title: "Adeslas Seniors Total | Mayores 63-84 Años · Dental · Viajes · Desde 101€",
    description:
      "Cobertura total Adeslas para personas de 63 a 84 años: dental, psicología y asistencia en viajes. Prima garantizada 3 años sin subidas. Asesor médico personal.",
    canonical: `${BASE}/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/`,
    ogImage: `${BASE}/og-seniors-total.jpg`,
  },

  // ── COLECTIVOS ────────────────────────────────────────────────────
  "/autonomos": {
    title: "Adeslas para Autónomos | Deducción IRPF hasta 500€ · Sin Copago",
    description:
      "Seguro médico Adeslas para autónomos con deducción hasta 500€/año por asegurado en IRPF. Sin copagos, +51.000 médicos. Contratación online inmediata.",
    canonical: `${BASE}/seguro-salud/autonomos/`,
    ogImage: `${BASE}/og-autonomos.jpg`,
  },
  "/pymes-empresas": {
    title: "Adeslas PYMES TOTAL | Empresas · Dental · 3 Años Sin Subida de Prima",
    description:
      "Adeslas para pymes y empresas: sin copago, dental incluido, 3 años sin subida de prima. Hasta 15 empleados, deducción total en IS. +51.000 médicos.",
    canonical: `${BASE}/seguro-salud/pymes/`,
    ogImage: `${BASE}/og-pymes-empresas.jpg`,
  },

  // ── ESPECIALES ────────────────────────────────────────────────────
  "/adeslas-extranjeros": {
    title: "Adeslas Extranjeros | Válido para Visado y NIE · Desde 38€/mes",
    description:
      "Seguro médico homologado para extranjeros residentes y estudiantes en España. Válido para visado, NIE y tramitación inmediata. Cobertura completa desde 38€/mes.",
    canonical: `${BASE}/adeslas-extranjeros/`,
    ogImage: `${BASE}/og-extranjeros.jpg`,
  },
  "/adeslas-body-factory": {
    title: "Adeslas Body Factory | Seguro Médico Exclusivo para Socios",
    description:
      "Seguro médico Adeslas con condiciones exclusivas para socios de Body Factory. Cobertura completa con +51.000 médicos en toda España.",
    canonical: `${BASE}/adeslas-body-factory/`,
    ogImage: `${BASE}/og-body-factory.jpg`,
  },
  "/adeslas-adif-renfe": {
    title: "Adeslas ADIF/Renfe | Seguro Médico para Trabajadores Ferroviarios",
    description:
      "Seguro médico Adeslas con condiciones especiales para trabajadores de ADIF y Renfe. Cobertura completa con +51.000 médicos y acceso prioritario.",
    canonical: `${BASE}/adeslas-adif-renfe/`,
    ogImage: `${BASE}/og-adif-renfe.jpg`,
  },

  // ── OTROS SEGUROS ─────────────────────────────────────────────────
  "/adeslas-dental": {
    title: "Seguro Dental Adeslas | Sin Carencias · Niños Gratis · Desde 9,45€/mes",
    description:
      "Limpiezas y revisiones desde el día 1 sin carencias. +1.700 dentistas. Niños hasta 8 años gratis. Implantes y ortodoncia a franquicia reducida.",
    canonical: `${BASE}/seguro-dental/`,
    ogImage: `${BASE}/og-dental.jpg`,
  },
  "/adeslas-decesos": {
    title: "Adeslas Decesos | Sepelio, Repatriación y Trámites desde 9€/mes",
    description:
      "Seguro de decesos Adeslas gestionado por Ocaso. Sepelio completo, repatriación internacional, billete acompañante y trámites incluidos. Atención 24h.",
    canonical: `${BASE}/seguro-decesos/`,
    ogImage: `${BASE}/og-decesos.jpg`,
  },
  "/adesla-decesos-prima-unica": {
    title: "Adeslas Decesos Prima Única | Cobertura Vitalicia · Un Solo Pago",
    description:
      "Seguro de decesos Adeslas con pago de prima única: cobertura vitalicia sin cuotas mensuales. Ideal para mayores de 70 años. Sepelio, repatriación y trámites incluidos.",
    canonical: `${BASE}/seguro-decesos-prima-unica/`,
    ogImage: `${BASE}/og-decesos-prima-unica.jpg`,
  },
  "/adeslas-mascotas": {
    title: "Adeslas Mascotas | Seguro para Perros y Gatos desde 5,85€/mes",
    description:
      "Seguro de mascotas Adeslas para perros y gatos. Básico desde 5,85€/mes (RC 200.000€) o Completo desde 24,74€/mes (+300 clínicas). Sin restricción de raza ni edad.",
    canonical: `${BASE}/seguro-mascotas/`,
    ogImage: `${BASE}/og-mascotas.jpg`,
  },
  "/adeslas-asistencia-viaje": {
    title: "Adeslas Asistencia en Viaje | Cobertura Mundial · Desde 8,50€/día",
    description:
      "Seguro de asistencia en viaje con cobertura mundial. Emergencias médicas, repatriación, cancelación de vuelos y equipaje. Contrata por días o meses. Desde 8,50€/día.",
    canonical: `${BASE}/adeslas-asistencia-en-viaje/`,
    ogImage: `${BASE}/og-viaje.jpg`,
  },
  "/adeslas-accidentes": {
    title: "Adeslas Accidentes | Cobertura 24h en Todo el Mundo · Desde 5,89€/mes",
    description:
      "Seguro de accidentes Adeslas con cobertura 24h en todo el mundo. Fallecimiento, invalidez, asistencia médica y hospitalización por accidente. Desde 5,89€/mes.",
    canonical: `${BASE}/seguro-accidentes/`,
    ogImage: `${BASE}/og-accidentes.jpg`,
  },

  // ── PÁGINAS DE NECESIDAD ──────────────────────────────────────────
  "/seguro-medico-individual": {
    title: "Adeslas Individual | Desde 21€/mes · Prima Fija 3 Años · Sin Esperas",
    description:
      "Seguro médico individual Adeslas desde 21€/mes. Prima fija 3 años sin subidas. Elige entre GO, Plena Vital, Plena Plus o Plena Total. +51.000 médicos. Calcula en 2 minutos.",
    canonical: `${BASE}/seguro-salud/adeslas-individual/`,
    ogImage: `${BASE}/og-individual.jpg`,
  },
  "/seguro-medico-familiar": {
    title: "Adeslas Familiar | Pediatría · Especialistas · Sin Copagos · Desde 22€",
    description:
      "Seguro médico familiar Adeslas: pediatría, especialistas y hospitalización. Descuento del 10% desde el 4º asegurado. Sin listas de espera. Desde 22,55€/mes.",
    canonical: `${BASE}/seguro-salud/seguro-familia/`,
    ogImage: `${BASE}/og-familiar.jpg`,
  },
  "/seguro-medico-infantil": {
    title: "Seguro Médico Infantil Adeslas | Pediatría 24h · Sin Esperas · Desde 21€",
    description:
      "Pediatría sin esperas para tus hijos con Adeslas. Urgencias 24h, vacunas y especialistas. Descuento familiar desde el 4º asegurado. Alta inmediata desde 21€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-infantil/`,
    ogImage: `${BASE}/og-infantil.jpg`,
  },
  "/seguro-medico-ginecologia": {
    title: "Adeslas Ginecología | Cobertura Ginecológica Completa · Sin Lista de Espera",
    description:
      "Seguro médico Adeslas con ginecólogos, ecografías, revisiones y seguimiento completo. Sin listas de espera con +51.000 médicos. Calcula tu precio en 2 minutos.",
    canonical: `${BASE}/seguro-salud/adeslas-ginecologia/`,
    ogImage: `${BASE}/og-ginecologia.jpg`,
  },
  "/seguro-medico-embarazadas": {
    title: "Adeslas Embarazo | Parto, Ecografías y Neonatología · Sin Lista de Espera",
    description:
      "Cobertura completa de embarazo en Adeslas: ginecólogos, ecografías, parto y neonatología. Sin listas de espera. Alta online inmediata.",
    canonical: `${BASE}/seguro-salud/embarazo/`,
    ogImage: `${BASE}/og-embarazadas.jpg`,
  },
  "/seguro-medico-mayores": {
    title: "Seguro Médico para Mayores de 55 Años | Adeslas Seniors · Desde 67,50€",
    description:
      "Adeslas Seniors para personas mayores de 55 años: oncología, cardiología, rehabilitación y asesor personal. Sin límite de renovación. Desde 67,50€/mes.",
    canonical: `${BASE}/seguro-salud/seguro-para-personas-mayores/`,
    ogImage: `${BASE}/og-mayores.jpg`,
  },

  // ── UTILIDADES ────────────────────────────────────────────────────
  "/cuadro-medico": {
    title: "Cuadro Médico Adeslas 2026 | +51.000 Especialistas · Busca por Provincia",
    description:
      "Encuentra tu médico Adeslas por especialidad y provincia. Más de 51.000 médicos en 1.400 centros en toda España. Sin esperas, sin listas.",
    canonical: `${BASE}/cuadro-medico/`,
    ogImage: `${BASE}/og-cuadro-medico.jpg`,
    preloadImage: "/adeslas-cuadro-medico.webp",
  },
  "/contacto": {
    title: "Contacto | Adeslas — Asesoramiento Gratuito Sin Compromiso",
    description:
      "Contacta con nuestro equipo para cualquier consulta sobre seguros Adeslas. Asesoramiento personalizado sin compromiso. Teléfono, email y formulario de contacto.",
    canonical: `${BASE}/contacto/`,
    ogImage: `${BASE}/og-contacto.jpg`,
  },
  "/blog": {
    title: "Blog de Salud Adeslas | Consejos, Noticias y Bienestar",
    description:
      "Artículos de salud, consejos de bienestar y novedades sobre seguros Adeslas. Información actualizada para cuidar tu salud y la de tu familia.",
    canonical: `${BASE}/adeslas-blog/`,
    ogImage: `${BASE}/og-blog.jpg`,
  },
  "/politica-de-privacidad": {
    title: "Política de Privacidad | adeslas.numero1salud.es",
    description: "Política de privacidad y protección de datos de adeslas.numero1salud.es.",
    canonical: `${BASE}/politica-de-privacidad`,
    noindex: true,
  },
  "/precios-ofertas": {
    title: "Precios Adeslas 2026 | Compara Planes · Ahorra · GO desde 21€/mes",
    description:
      "Consulta todos los precios y ofertas de seguros Adeslas 2026. Compara coberturas y elige el plan más económico para ti. Calcula precio en 2 minutos.",
    canonical: `${BASE}/precios-y-ofertas/`,
    ogImage: `${BASE}/og-precios.jpg`,
    preloadImage: "/adeslas-seguro-medico-ofertas.webp",
  },

  // ── LANDING / OFERTA ──────────────────────────────────────────────
  "/oferta-plena-vital": {
    title: "Oferta Adeslas Plena Vital | Consigue tu Precio Especial Ahora",
    description:
      "Oferta exclusiva Adeslas Plena Vital. Pide tu precio personalizado y empieza a disfrutar de cobertura completa con copago máximo 300€/año. +51.000 médicos.",
    canonical: `${BASE}/oferta-plena-vital/`,
    ogImage: `${BASE}/og-vital.jpg`,
    noindex: true,
  },

  // ── FORMULARIO DE ALTA ────────────────────────────────────────────
  "/seguro-salud/adeslas-formulario-de-alta": {
    title: "Formulario de Alta Adeslas | Contrata tu Seguro Médico",
    description:
      "Completa el formulario de alta y empieza a disfrutar de tu seguro Adeslas. Proceso rápido y sencillo.",
    canonical: `${BASE}/seguro-salud/adeslas-formulario-de-alta`,
    noindex: true,
  },

  // ── INTERNOS (noindex) ────────────────────────────────────────────
  "/tarificador-interno": {
    title: "Tarificador Interno | Adeslas",
    description: "Tarificador de uso interno.",
    canonical: `${BASE}/tarificador-interno`,
    noindex: true,
  },
  "/contratar": {
    title: "Contratar Seguro Adeslas | Alta Online en Minutos",
    description: "Contrata tu seguro Adeslas online en pocos pasos. Alta inmediata.",
    canonical: `${BASE}/contratar`,
    noindex: true,
  },
};

/**
 * Alias para URLs canónicas que no usan /seguro-salud/ pero difieren del path interno.
 */
const CANONICAL_ALIASES: Record<string, string> = {
  "/seguro-dental":                    "/adeslas-dental",
  "/seguro-decesos":                   "/adeslas-decesos",
  "/seguro-decesos-prima-unica":       "/adesla-decesos-prima-unica",
  "/seguro-adeslas-decesos-prima-unica":"/adesla-decesos-prima-unica",
  "/seguro-mascotas":                  "/adeslas-mascotas",
  "/adeslas-asistencia-en-viaje":      "/adeslas-asistencia-viaje",
  "/seguro-accidentes":                "/adeslas-accidentes",
  "/adeslas-blog":                     "/blog",
  "/precios-y-ofertas":                "/precios-ofertas",
};

const SEGURO_SALUD_ALIASES: Record<string, string> = {
  "/seguro-salud/adeslas-go/":                                                          "/adeslas-go",
  "/seguro-salud/adeslas-plena-vital/":                                                 "/adeslas-plena-vital",
  "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/": "/adeslas-plena-vital-total",
  "/seguro-salud/adeslas-plena-total/":                                                 "/adeslas-plena-total",
  "/seguro-salud/adeslas-extra-150/":                                                   "/adeslas-extra-150",
  "/seguro-salud/adeslas-plena-plus/":                                                  "/adeslas-plena-plus",
  "/seguro-salud/adeslas-seniors/":                                                     "/adeslas-seniors",
  "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/":            "/adeslas-seniors-total",
  "/seguro-salud/autonomos/":                                                           "/autonomos",
  "/seguro-salud/pymes/":                                                               "/pymes-empresas",
  "/seguro-salud/pymes":                                                                "/pymes-empresas",
  "/seguro-salud/empresas/":                                                            "/pymes-empresas",
  "/seguro-salud/adeslas-individual/":                                                  "/seguro-medico-individual",
  "/seguro-salud/seguro-familia/":                                                      "/seguro-medico-familiar",
  "/seguro-salud/adeslas-infantil/":                                                    "/seguro-medico-infantil",
  "/seguro-salud/adeslas-ginecologia/":                                                 "/seguro-medico-ginecologia",
  "/seguro-salud/embarazo/":                                                            "/seguro-medico-embarazadas",
  "/seguro-salud/seguro-para-personas-mayores/":                                        "/seguro-medico-mayores",
  "/seguro-salud/ofertas-adeslas-precios/":                                             "/precios-ofertas",
};

/**
 * Devuelve los metadatos para una ruta dada.
 * Soporta rutas dinámicas como /blog/:slug y /mi-precio/:slug.
 */
export function getPageMeta(pathname: string): PageMeta {
  // Normalizar trailing slash (excepto la raíz "/")
  const normalized = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  // Coincidencia exacta (con y sin trailing slash)
  if (PAGE_META[normalized]) return PAGE_META[normalized];
  if (PAGE_META[pathname]) return PAGE_META[pathname];

  // Alias URLs canónicas
  const canonicalKey = CANONICAL_ALIASES[normalized] || CANONICAL_ALIASES[pathname];
  if (canonicalKey && PAGE_META[canonicalKey]) return PAGE_META[canonicalKey];

  // Alias /seguro-salud/... → clave corta
  const aliasKey = SEGURO_SALUD_ALIASES[pathname] || SEGURO_SALUD_ALIASES[normalized + "/"];
  if (aliasKey && PAGE_META[aliasKey]) return PAGE_META[aliasKey];

  // Rutas dinámicas de blog
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    return {
      title: `${slug.replace(/-/g, " ")} | Blog de Salud Adeslas`,
      description:
        "Artículo del blog de salud de Adeslas. Información y consejos sobre seguros médicos y bienestar.",
      canonical: `${BASE}/blog/${slug}`,
    };
  }

  // Rutas dinámicas de mi-precio
  if (pathname.startsWith("/mi-precio/")) {
    const slug = pathname.replace("/mi-precio/", "");
    return {
      title: "Mi Precio Adeslas | Tarifa Personalizada",
      description:
        "Consulta tu precio personalizado para el seguro Adeslas. Calculado en función de tu edad y necesidades.",
      canonical: `${BASE}/mi-precio/${slug}`,
      noindex: true,
    };
  }

  // Fallback genérico
  return {
    title: "Adeslas Seguros Médicos 2026 | +51.000 Médicos · Sin Listas de Espera",
    description:
      "Seguros médicos Adeslas: salud, dental, mascotas y más. +51.000 médicos, sin listas de espera. Calcula tu precio en 2 minutos.",
    canonical: `${BASE}${pathname}`,
  };
}
