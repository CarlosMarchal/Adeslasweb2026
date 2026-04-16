/**
 * Mapa de metadatos SEO para todas las rutas del SPA.
 * Usado por Next.js generateMetadata() en app/[[...slug]]/page.tsx
 * para server-render los <head> meta tags aunque el body sea client-side.
 *
 * Última actualización: 2026-04-15
 */

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  noindex?: boolean;
}

const BASE = "https://adeslas.numero1salud.es";

/**
 * Metadatos por ruta exacta.
 * Para rutas dinámicas (blog/:slug, mi-precio/:slug) se usan defaults.
 */
export const PAGE_META: Record<string, PageMeta> = {
  // ── HOME ──────────────────────────────────────────────────────────
  "/": {
    title: "Adeslas Seguros Médicos | Salud Privada · +51.000 Médicos · Sin Listas de Espera",
    description:
      "Contrata tu seguro médico Adeslas con Marchal Aseguradores, Agente Exclusivo. +51.000 médicos, 1.400 centros, sin listas de espera. GO desde 21€/mes. Calcula tu precio en 2 minutos.",
    canonical: `${BASE}/`,
  },

  // ── PRODUCTOS DE SALUD ────────────────────────────────────────────
  "/adeslas-go": {
    title: "Adeslas GO | Seguro Médico Ambulatorio con Copago — Desde 21€/mes",
    description:
      "Adeslas GO: seguro médico económico, sin cuestionario de salud y con cobertura ambulatoria completa. +51.000 médicos, urgencias 24h, copagos máx. 260€/año. Desde 21€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-go/`,
  },
  "/adeslas-plena-vital": {
    title: "Adeslas Plena Vital | Seguro Médico Completo con Tope de Copago — Desde 38€",
    description:
      "Adeslas Plena Vital — Agente Exclusivo Adeslas: hospitalización, todas las especialidades y urgencias 24h con copago máximo 300€/año. +51.000 médicos y 1.400 centros. Sin listas de espera. Desde 38€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-vital/`,
  },
  "/adeslas-plena-vital-total": {
    title: "Adeslas Plena Vital Total | Cobertura Total · 3 Años Sin Subida de Prima",
    description:
      "Adeslas Plena Vital Total: cobertura completa con dental incluido, sin carencias y prima garantizada 3 años sin subidas. Copago reducido, +51.000 médicos y urgencias 24h. Desde 48,50€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/`,
  },
  "/adeslas-plena-total": {
    title: "Adeslas Plena Total | Seguro Médico Sin Copagos · Dental y Viajes Incluidos",
    description:
      "Adeslas Plena Total: el seguro más completo sin copagos. Hospitalización ilimitada, dental (46 actos), asistencia en viajes 100.000€ y accidente. +51.000 médicos. Desde 83€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-total/`,
  },
  "/adeslas-extra-150": {
    title: "Adeslas Extra 150 | Seguro Médico Libre Elección · Reembolso 80% · Cobertura Mundial",
    description:
      "Adeslas Extra 150: seguro de libre elección médica con reembolso del 80% hasta 150.000€/año. Acude a cualquier médico, en cualquier país. Cobertura mundial sin restricciones.",
    canonical: `${BASE}/seguro-salud/adeslas-extra-150/`,
  },
  "/adeslas-plena-plus": {
    title: "Adeslas Plena Plus | Seguro Médico Sin Copagos · Cobertura Completa",
    description:
      "Adeslas Plena Plus: seguro médico sin copagos con cobertura completa. Hospitalización ilimitada, todas las especialidades y urgencias 24h. +51.000 médicos y 1.400 centros.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-plus/`,
  },

  // ── SENIORS ───────────────────────────────────────────────────────
  "/adeslas-seniors": {
    title: "Adeslas Seniors | Seguro Médico para Mayores de 55 años desde 67,50€",
    description:
      "Seguro médico Adeslas Seniors para mayores de 55 a 84 años. Asesor médico personal, oncología, cardiología, rehabilitación y cobertura completa. Copago reducido. Desde 67,50€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-seniors/`,
  },
  "/adeslas-seniors-total": {
    title: "Adeslas Seniors Total | Cobertura Completa para Mayores de 63 años desde 101€",
    description:
      "Adeslas Seniors Total: seguro médico para personas de 63 a 84 años sin subida de prima garantizada 3 años. Hospitalización, oncología, asistencia viajes 100.000€ y asesor personal. Desde 101€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/`,
  },

  // ── COLECTIVOS ────────────────────────────────────────────────────
  "/autonomos": {
    title: "Seguro Médico Adeslas para Autónomos | Deducible IRPF · Sin Copago",
    description:
      "Seguro médico Adeslas para autónomos: sin copagos, deducible en IRPF hasta 500€/asegurado/año, +51.000 médicos y 1.400 centros. El seguro que cuida tu salud y te ahorra en impuestos.",
    canonical: `${BASE}/seguro-salud/autonomos/`,
  },
  "/pymes-empresas": {
    title: "Adeslas PYMES TOTAL | Seguro Médico para Empresas · Dental · 3 Años Sin Subida",
    description:
      "Adeslas PYMES TOTAL: seguro médico para pymes hasta 15 empleados. Sin copagos, chequeo médico anual, dental incluido y 3 años sin incremento de prima. Deducible al 100% en IS. +51.000 médicos.",
    canonical: `${BASE}/seguro-salud/pymes/`,
  },

  // ── ESPECIALES ────────────────────────────────────────────────────
  "/adeslas-extranjeros": {
    title: "Adeslas Extranjeros | Seguro Médico para Estudiantes y Residentes en España desde 38€",
    description:
      "Seguro médico Adeslas para extranjeros residentes y estudiantes en España. Cumple requisitos de visado y NIE. Cobertura completa con +51.000 médicos. Desde 38€/mes.",
    canonical: `${BASE}/adeslas-extranjeros/`,
  },
  "/adeslas-body-factory": {
    title: "Adeslas Body Factory | Seguro Médico para Socios · Cobertura Completa",
    description:
      "Seguro médico Adeslas para socios de Body Factory. Cobertura completa con +51.000 médicos y condiciones exclusivas para clientes del gimnasio.",
    canonical: `${BASE}/adeslas-body-factory/`,
  },
  "/adeslas-adif-renfe": {
    title: "Adeslas ADIF/Renfe | Seguro Médico para Trabajadores Ferroviarios",
    description:
      "Seguro médico Adeslas con condiciones especiales para trabajadores de ADIF y Renfe. Cobertura completa con +51.000 médicos y acceso prioritario.",
    canonical: `${BASE}/adeslas-adif-renfe/`,
  },

  // ── OTROS SEGUROS ─────────────────────────────────────────────────
  "/adeslas-dental": {
    title: "Seguro Dental Adeslas | Sin Carencias desde Día 1 · Desde 9,45€/mes",
    description:
      "Seguro dental Adeslas desde 9,45€/mes: limpiezas y revisiones desde el día 1 sin coste. Implantes, endodoncia y ortodoncia con franquicias reducidas. Niños hasta 8 años gratis. +1.700 dentistas.",
    canonical: `${BASE}/seguro-dental/`,
  },
  "/adeslas-decesos": {
    title: "Adeslas Decesos | Sepelio, Repatriación y Trámites desde 9€/mes",
    description:
      "Seguro de decesos Adeslas gestionado por Ocaso. Sepelio completo, repatriación internacional, billete acompañante y trámites incluidos. Atención 24h: 900 14 15 16. Desde 9€/mes.",
    canonical: `${BASE}/seguro-decesos/`,
  },
  "/adesla-decesos-prima-unica": {
    title: "Adeslas Decesos Prima Única | Cobertura Vitalicia sin Cuotas Mensuales",
    description:
      "Seguro de decesos Adeslas con pago de prima única: cobertura vitalicia sin cuotas mensuales. Ideal para mayores de 70 años. Sepelio, repatriación y trámites incluidos.",
    canonical: `${BASE}/seguro-decesos-prima-unica/`,
  },
  "/adeslas-mascotas": {
    title: "Adeslas Mascotas | Seguro para Perros y Gatos desde 5,85€/mes",
    description:
      "Seguro de mascotas Adeslas para perros y gatos. Básico desde 5,85€/mes (RC 200.000€) o Completo desde 24,74€/mes (+300 clínicas veterinarias). Sin restricción de raza ni edad.",
    canonical: `${BASE}/seguro-mascotas/`,
  },
  "/adeslas-asistencia-viaje": {
    title: "Adeslas Viaje | Seguro de Asistencia en Viaje desde 8,50€/día — Cobertura Mundial",
    description:
      "Seguro de asistencia en viaje Adeslas con cobertura mundial. Emergencias médicas, repatriación, cancelación de vuelos y equipaje. Contrata por días, semanas o meses. Desde 8,50€/día.",
    canonical: `${BASE}/adeslas-asistencia-en-viaje/`,
  },
  "/adeslas-accidentes": {
    title: "Adeslas Accidentes | Seguro de Accidentes con Cobertura 24h desde 5,89€/mes",
    description:
      "Seguro de accidentes Adeslas con cobertura 24h en todo el mundo. Fallecimiento, invalidez, asistencia médica y hospitalización por accidente. Desde 5,89€/mes.",
    canonical: `${BASE}/seguro-accidentes/`,
  },

  // ── PÁGINAS DE NECESIDAD ──────────────────────────────────────────
  "/seguro-medico-individual": {
    title: "Adeslas Individual | Seguro Médico desde 21€/mes · Sin Esperas · Prima Fija 3 Años",
    description:
      "Seguro médico Adeslas individual desde 21€/mes. Prima fija 3 años sin subidas. Elige entre GO, Plena Vital, Plena Plus o Plena Total. +51.000 médicos, sin listas de espera. Calcula tu precio en 2 minutos.",
    canonical: `${BASE}/seguro-salud/adeslas-individual/`,
  },
  "/seguro-medico-familiar": {
    title: "Adeslas Seguro Médico Familiar | Pediatría, Especialistas y Sin Copagos",
    description:
      "Adeslas seguro médico familiar: pediatría, especialistas y hospitalización para toda la familia desde 22,55€/mes. Descuento 10% desde el 4º asegurado. Sin listas de espera.",
    canonical: `${BASE}/seguro-salud/seguro-familia/`,
  },
  "/seguro-medico-infantil": {
    title: "Adeslas Seguro Médico Infantil | Pediatría Sin Esperas para Niños desde 21€/mes",
    description:
      "Seguro médico infantil Adeslas: pediatría, especialistas y urgencias 24h para niños desde 21€/mes. Sin listas de espera, +51.000 médicos y 1.400 centros.",
    canonical: `${BASE}/seguro-salud/adeslas-infantil/`,
  },
  "/seguro-medico-ginecologia": {
    title: "Adeslas Ginecología | Seguro Médico con Cobertura Ginecológica Completa",
    description:
      "Seguro médico Adeslas con cobertura ginecológica completa: ginecólogos, ecografías, revisiones y más. +51.000 médicos, sin listas de espera.",
    canonical: `${BASE}/seguro-salud/adeslas-ginecologia/`,
  },
  "/seguro-medico-embarazadas": {
    title: "Adeslas Embarazo | Seguro Médico para Embarazadas con Parto y Neonatología",
    description:
      "Seguro médico Adeslas para embarazadas con cobertura de parto y neonatología. Ginecólogos, ecografías y atención completa durante el embarazo. Sin listas de espera.",
    canonical: `${BASE}/seguro-salud/embarazo/`,
  },
  "/seguro-medico-mayores": {
    title: "Adeslas Seniors | Seguro Médico para Personas Mayores de 55 años desde 67,50€/mes",
    description:
      "Seguro médico Adeslas para personas mayores de 55 años. Asesor personal, oncología, cardiología y cobertura completa. Copago reducido. Desde 67,50€/mes.",
    canonical: `${BASE}/seguro-salud/seguro-para-personas-mayores/`,
  },

  // ── UTILIDADES ────────────────────────────────────────────────────
  "/cuadro-medico": {
    title: "Cuadro Médico Adeslas | Busca tu Médico Especialista — +51.000 Médicos",
    description:
      "Busca médicos Adeslas por especialidad y provincia. Más de 51.000 médicos en 1.400 centros en toda España. Encuentra tu especialista sin listas de espera.",
    canonical: `${BASE}/cuadro-medico/`,
  },
  "/contacto": {
    title: "Contacto | Marchal Aseguradores — Agente Exclusivo Adeslas",
    description:
      "Contacta con Marchal Aseguradores, Agente Exclusivo Adeslas. Asesoramiento personalizado sin compromiso. Teléfono, email y formulario de contacto.",
    canonical: `${BASE}/contacto/`,
  },
  "/blog": {
    title: "Blog de Salud Adeslas | Consejos, Noticias y Bienestar",
    description:
      "El blog de salud de Marchal Aseguradores. Consejos de bienestar, novedades de seguros Adeslas y artículos sobre salud escritos por expertos.",
    canonical: `${BASE}/adeslas-blog/`,
  },
  "/politica-de-privacidad": {
    title: "Política de Privacidad | Marchal Aseguradores",
    description: "Política de privacidad y protección de datos de Marchal Aseguradores.",
    canonical: `${BASE}/politica-de-privacidad`,
    noindex: true,
  },
  "/precios-ofertas": {
    title: "Precios y Ofertas Adeslas 2026 | Compara y Ahorra en tu Seguro Médico",
    description:
      "Consulta todos los precios y ofertas de los seguros Adeslas 2026. Compara coberturas y encuentra el plan más económico. GO desde 21€/mes.",
    canonical: `${BASE}/precios-y-ofertas/`,
  },

  // ── LANDING / OFERTA ──────────────────────────────────────────────
  "/oferta-plena-vital": {
    title: "Oferta Adeslas Plena Vital | Consigue tu Precio Especial Ahora",
    description:
      "Oferta exclusiva Adeslas Plena Vital. Pide tu precio personalizado y empieza a disfrutar de cobertura completa con copago máximo 300€/año. +51.000 médicos.",
    canonical: `${BASE}/oferta-plena-vital/`,
    noindex: true,
  },

  // ── FORMULARIO DE ALTA ────────────────────────────────────────────
  "/seguro-salud/adeslas-formulario-de-alta": {
    title: "Formulario de Alta Adeslas | Contrata tu Seguro Médico",
    description:
      "Completa el formulario de alta y empieza a disfrutar de tu seguro Adeslas. Proceso rápido y sencillo con Marchal Aseguradores.",
    canonical: `${BASE}/seguro-salud/adeslas-formulario-de-alta`,
    noindex: true,
  },

  // ── INTERNOS (noindex) ────────────────────────────────────────────
  "/tarificador-interno": {
    title: "Tarificador Interno | Marchal Aseguradores",
    description: "Tarificador de uso interno para comerciales de Marchal Aseguradores.",
    canonical: `${BASE}/tarificador-interno`,
    noindex: true,
  },
  "/contratar": {
    title: "Contratar Seguro Adeslas | Marchal Aseguradores",
    description: "Contrata tu seguro Adeslas en pocos pasos con Marchal Aseguradores.",
    canonical: `${BASE}/contratar`,
    noindex: true,
  },
};

/**
 * Mapeo de URLs canónicas /seguro-salud/... → clave corta en PAGE_META.
 * Permite que ambas rutas (corta y larga) devuelvan los mismos metadatos.
 */
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

  // Alias /seguro-salud/... → clave corta
  const aliasKey = SEGURO_SALUD_ALIASES[pathname] || SEGURO_SALUD_ALIASES[normalized + "/"];
  if (aliasKey && PAGE_META[aliasKey]) return PAGE_META[aliasKey];

  // Rutas dinámicas de blog
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    return {
      title: `${slug.replace(/-/g, " ")} | Blog Adeslas — Marchal Aseguradores`,
      description:
        "Artículo del blog de salud de Marchal Aseguradores. Información y consejos sobre seguros Adeslas y bienestar.",
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
    title: "Adeslas Seguros Médicos | Marchal Aseguradores — Agente Exclusivo",
    description:
      "Marchal Aseguradores, Agente Exclusivo Adeslas. Seguros médicos, dentales, mascotas y más. +51.000 médicos, sin listas de espera.",
    canonical: `${BASE}${pathname}`,
  };
}
