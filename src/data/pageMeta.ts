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
      "Contrata tu seguro Adeslas online. GO desde 21€, Plena Vital desde 38€, sin copagos desde 62€. +51.000 médicos. Calcula tu precio en 2 minutos.",
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
    title: "Adeslas Plena Vital | Hospitalización · Copago Máx. 300€ · Desde 38€",
    description:
      "Seguro médico completo con hospitalización y copago máx. 300€/año. +51.000 médicos, sin esperas ni listas de espera. Calcula tu precio en 2 minutos.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-vital/`,
    ogImage: `${BASE}/og-vital.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-plena-vital.webp",
  },
  "/adeslas-plena-vital-total": {
    title: "Adeslas Plena Vital Total | 3 Años Sin Subidas · Desde 48,50€/mes",
    description:
      "Cobertura completa con dental, psicología y prima garantizada 3 años sin subidas. Copago reducido. El plan más equilibrado precio-cobertura de Adeslas.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/`,
    ogImage: `${BASE}/og-vital-total.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-plena-vital-total.webp",
  },
  "/adeslas-plena-total": {
    title: "Adeslas Plena Total | Sin Copagos · Dental · Desde 83€/mes",
    description:
      "Seguro Adeslas sin copago: hospitalización, dental (46 actos), psicología y asistencia en viajes 100.000€. +51.000 médicos. Desde 83€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-total/`,
    ogImage: `${BASE}/og-total.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-plena-total.webp",
  },
  "/adeslas-extra-150": {
    title: "Adeslas Extra 150 | Libre Elección · Reembolso 80% · Cobertura Mundial",
    description:
      "Acude a cualquier médico en España o en el mundo. Reembolso del 80% hasta 150.000€/año, sin restricción de especialista ni red médica obligatoria.",
    canonical: `${BASE}/seguro-salud/adeslas-extra-150/`,
    ogImage: `${BASE}/og-extra-150.jpg`,
  },
  "/adeslas-plena-plus": {
    title: "Adeslas Plena Plus | Sin Copagos · Cobertura Completa · Desde 62€/mes",
    description:
      "Sin copago en ningún servicio: hospitalización, cirugía, parto y especialidades. +51.000 médicos. La opción sin copagos más asequible de Adeslas.",
    canonical: `${BASE}/seguro-salud/adeslas-plena-plus/`,
    ogImage: `${BASE}/og-plena-plus.jpg`,
  },

  // ── SENIORS ───────────────────────────────────────────────────────
  "/adeslas-seniors": {
    title: "Adeslas Seniors | Seguro Médico Mayores 55-84 Años · Desde 67,50€/mes",
    description:
      "Adeslas Seniors 55-84 años: asesor personal, oncología, cardiología y rehabilitación. Prima garantizada sin subidas. Desde 67,50€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-seniors/`,
    ogImage: `${BASE}/og-seniors.jpg`,
    preloadImage: "/images/seguro-medico-adeslas-seniors.webp",
  },
  "/adeslas-seniors-total": {
    title: "Adeslas Seniors Total | Dental · Viajes · 63-84 Años · Desde 101€",
    description:
      "Adeslas Seniors Total 63-84 años: dental, psicología y asistencia en viajes. Prima garantizada 3 años sin subidas. Asesor médico personal.",
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
      "Seguro médico homologado para extranjeros en España. Válido para visado y NIE. Tramitación inmediata. Cobertura completa desde 38€/mes.",
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
      "Decesos Adeslas de prima única: cobertura vitalicia sin cuotas mensuales. Ideal para mayores de 70 años. Sepelio, repatriación y trámites incluidos.",
    canonical: `${BASE}/seguro-decesos-prima-unica/`,
    ogImage: `${BASE}/og-decesos-prima-unica.jpg`,
  },
  "/adeslas-mascotas": {
    title: "Adeslas Mascotas | Seguro para Perros y Gatos desde 5,85€/mes",
    description:
      "Adeslas Mascotas para perros y gatos. Básico desde 5,85€/mes (RC 200.000€) o Completo desde 24,74€/mes (+300 clínicas). Sin restricción de raza.",
    canonical: `${BASE}/seguro-mascotas/`,
    ogImage: `${BASE}/og-mascotas.jpg`,
  },
  "/adeslas-asistencia-viaje": {
    title: "Adeslas Asistencia en Viaje | Cobertura Mundial · Desde 8,50€/día",
    description:
      "Asistencia en viaje Adeslas: cobertura mundial. Emergencias médicas, repatriación y cancelación de vuelos. Por días o meses. Desde 8,50€/día.",
    canonical: `${BASE}/adeslas-asistencia-en-viaje/`,
    ogImage: `${BASE}/og-viaje.jpg`,
  },
  "/adeslas-accidentes": {
    title: "Adeslas Accidentes | Cobertura 24h en Todo el Mundo · Desde 5,89€/mes",
    description:
      "Accidentes Adeslas: cobertura 24h en todo el mundo. Fallecimiento, invalidez, asistencia médica y hospitalización por accidente. Desde 5,89€/mes.",
    canonical: `${BASE}/seguro-accidentes/`,
    ogImage: `${BASE}/og-accidentes.jpg`,
  },

  // ── PÁGINAS DE NECESIDAD ──────────────────────────────────────────
  "/seguro-medico-individual": {
    title: "Adeslas Individual | Desde 21€/mes · Prima Fija 3 Años · Sin Esperas",
    description:
      "Seguro médico individual Adeslas desde 21€/mes. Prima fija 3 años. Elige entre GO, Plena Vital, Plena Plus o Plena Total. +51.000 médicos.",
    canonical: `${BASE}/seguro-salud/adeslas-individual/`,
    ogImage: `${BASE}/og-individual.jpg`,
  },
  "/seguro-medico-familiar": {
    title: "Adeslas Familiar | Pediatría · Especialistas · Sin Copagos · Desde 22€",
    description:
      "Seguro familiar Adeslas: pediatría, especialistas y hospitalización. Descuento 10% desde el 4º asegurado. Sin listas de espera. Desde 22,55€/mes.",
    canonical: `${BASE}/seguro-salud/seguro-familia/`,
    ogImage: `${BASE}/og-familiar.jpg`,
  },
  "/seguro-medico-infantil": {
    title: "Seguro Infantil Adeslas | Pediatría 24h · Sin Esperas · Desde 21€",
    description:
      "Pediatría sin esperas para tus hijos con Adeslas. Urgencias 24h, vacunas y especialistas. 10% descuento desde el 4º asegurado. Desde 21€/mes.",
    canonical: `${BASE}/seguro-salud/adeslas-infantil/`,
    ogImage: `${BASE}/og-infantil.jpg`,
  },
  "/seguro-medico-ginecologia": {
    title: "Adeslas Ginecología | Cobertura Completa · Sin Lista de Espera",
    description:
      "Adeslas Ginecología: ginecólogos, ecografías, revisiones y seguimiento completo. Sin listas de espera. +51.000 médicos. Calcula en 2 minutos.",
    canonical: `${BASE}/seguro-salud/adeslas-ginecologia/`,
    ogImage: `${BASE}/og-ginecologia.jpg`,
  },
  "/seguro-medico-embarazadas": {
    title: "Adeslas Embarazo | Parto, Ecografías y Neonatología · Sin Esperas",
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
    title: "Cuadro Médico Adeslas 2026 | +51.000 Médicos · Por Provincia",
    description:
      "Encuentra tu médico Adeslas por especialidad y provincia. Más de 51.000 médicos en 1.400 centros en toda España. Sin esperas, sin listas.",
    canonical: `${BASE}/cuadro-medico/`,
    ogImage: `${BASE}/og-cuadro-medico.jpg`,
    preloadImage: "/adeslas-cuadro-medico.webp",
  },
  "/contacto": {
    title: "Contacto | Adeslas — Asesoramiento Gratuito Sin Compromiso",
    description:
      "Contacta con nuestro equipo para consultas sobre seguros Adeslas. Asesoramiento personalizado sin compromiso. Teléfono, email y formulario de contacto.",
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

  // ── BLOG — entradas individuales (título + descripción únicos por post) ──────
  "/blog/comparativa-seguros-medicos-adeslas-2026": {
    title: "Comparativa Seguros Adeslas 2026: Cuál Elegir Según tu Perfil",
    description:
      "Adeslas Go, Plena Vital, Plena Total o Plena Plus: diferencias reales entre todos los seguros Adeslas 2026 para elegir el que más te conviene.",
    canonical: `${BASE}/blog/comparativa-seguros-medicos-adeslas-2026/`,
  },
  "/blog/higiene-sueno-adultos": {
    title: "Higiene del Sueño: Dormir Mejor sin Pastillas | Blog Adeslas",
    description:
      "El insomnio afecta a 1 de cada 3 adultos en España. Estrategias basadas en evidencia para recuperar un sueño reparador sin medicación.",
    canonical: `${BASE}/blog/higiene-sueno-adultos/`,
  },
  "/blog/como-mejorar-tu-energia-diaria": {
    title: "Cómo Mejorar tu Energía Diaria: Hábitos que Funcionan",
    description:
      "Si llegas agotado a media mañana o te cuesta arrancar, estos hábitos sencillos pueden marcar la diferencia en tu vitalidad y rendimiento diario.",
    canonical: `${BASE}/blog/como-mejorar-tu-energia-diaria/`,
  },
  "/blog/superalimentos-que-incorporar": {
    title: "Superalimentos: Cuáles Merecen la Pena y Cuáles son Marketing",
    description:
      "Distingue qué superalimentos tienen respaldo científico real de los que son solo tendencias de marketing. Guía práctica para tomar mejores decisiones.",
    canonical: `${BASE}/blog/superalimentos-que-incorporar/`,
  },
  "/blog/gestion-emocional-dia-a-dia": {
    title: "Gestión Emocional: Herramientas para el Día a Día | Adeslas",
    description:
      "Técnicas concretas de inteligencia emocional que puedes practicar hoy mismo para gestionar el estrés y las emociones difíciles del día a día.",
    canonical: `${BASE}/blog/gestion-emocional-dia-a-dia/`,
  },
  "/blog/salud-familiar-estilo-de-vida": {
    title: "Salud en Familia: Claves para un Estilo de Vida Saludable",
    description:
      "Los hábitos saludables que se instauran en la infancia duran toda la vida. Claves para crear un entorno familiar que favorezca la salud de todos.",
    canonical: `${BASE}/blog/salud-familiar-estilo-de-vida/`,
  },
  "/blog/caminar-beneficios-reales": {
    title: "Caminar 30 Minutos al Día: Beneficios que Confirma la Ciencia",
    description:
      "Sin equipamiento ni cuota de gimnasio. Caminar es uno de los hábitos más accesibles con mayor impacto en la salud cardiovascular, mental y física.",
    canonical: `${BASE}/blog/caminar-beneficios-reales/`,
  },
  "/blog/revisiones-medicas-por-edad": {
    title: "Revisiones Médicas por Edad: Guía Práctica | Blog Adeslas",
    description:
      "Las revisiones preventivas detectan problemas antes de que den síntomas. Qué pruebas son recomendables a los 30, 40, 50 años o más.",
    canonical: `${BASE}/blog/revisiones-medicas-por-edad/`,
  },
  "/blog/dieta-mediterranea-en-casa": {
    title: "Dieta Mediterránea: Beneficios y Cómo Adoptarla en Casa",
    description:
      "Uno de los patrones alimentarios con mayor respaldo científico. Aprende sus beneficios probados y cómo incorporarlo a tu rutina sin complicaciones.",
    canonical: `${BASE}/blog/dieta-mediterranea-en-casa/`,
  },
  "/blog/salud-bucodental-guia-completa": {
    title: "Salud Bucodental: Guía Completa para Cuidar tu Boca",
    description:
      "El cepillado es solo el principio. Todo lo que necesitas para mantener una boca sana y evitar problemas que afectan a tu salud general.",
    canonical: `${BASE}/blog/salud-bucodental-guia-completa/`,
  },
  "/blog/cuanto-cuesta-operacion-privada-espana-2026": {
    title: "Cuánto Cuesta una Operación Privada en España en 2026",
    description:
      "Precios reales de operaciones privadas en España: apendicitis, rodilla, cataratas y más. Descubre cuánto cuesta la sanidad privada sin seguro médico.",
    canonical: `${BASE}/blog/cuanto-cuesta-operacion-privada-espana-2026/`,
  },
  "/blog/seguro-medico-sin-copago-2026": {
    title: "Seguro Médico sin Copago: Qué es y Cuánto Cuesta en 2026",
    description:
      "Sin copago: pagas la prima mensual y no abonas nada más en cada visita. Descubre cómo funciona y qué planes sin copago ofrece Adeslas en 2026.",
    canonical: `${BASE}/blog/seguro-medico-sin-copago-2026/`,
  },
  "/blog/carencias-seguros-medicos-adeslas": {
    title: "Carencias en Seguros Médicos Adeslas: Qué Son y Cuánto Duran",
    description:
      "Las carencias son el período de espera desde que contratas hasta que puedes usar ciertas coberturas. Guía completa sobre todos los períodos de carencia de Adeslas 2026.",
    canonical: `${BASE}/blog/carencias-seguros-medicos-adeslas/`,
  },
  "/blog/seguro-medico-familias-2026": {
    title: "Seguro Médico para Familias en 2026: Guía Completa para Elegir Bien",
    description:
      "Cómo elegir el mejor seguro médico familiar en 2026. Coberturas, precios, descuentos desde el 4º asegurado y qué plan Adeslas se adapta mejor a tu familia.",
    canonical: `${BASE}/blog/seguro-medico-familias-2026/`,
  },
  "/blog/hospitalizacion-privada-vs-publica": {
    title: "Hospitalización Privada vs Pública en España 2026: Diferencias Reales",
    description:
      "Tiempos de espera, habitación individual, acceso al médico y pruebas diagnósticas. Diferencias reales entre ingresar en la sanidad pública o privada en España en 2026.",
    canonical: `${BASE}/blog/hospitalizacion-privada-vs-publica/`,
  },
  "/blog/seguro-medico-autonomos-2026": {
    title: "Seguro Médico para Autónomos en 2026: Deducciones IRPF y Mejores Planes",
    description:
      "Autónomos: deduce hasta 500€/año en IRPF por el seguro de salud. Qué plan Adeslas elegir, cómo funciona la deducción y todo lo que necesitas saber antes de contratar.",
    canonical: `${BASE}/blog/seguro-medico-autonomos-2026/`,
  },
  "/blog/listas-de-espera-sanidad-publica-espana-2026": {
    title: "Listas de Espera Sanidad Pública España 2026: Datos Reales y Alternativas",
    description:
      "Datos del Ministerio de Sanidad: cuánto se espera para ver un especialista o para operarse en la sanidad pública española en 2026. Y qué alternativa ofrece el seguro privado.",
    canonical: `${BASE}/blog/listas-de-espera-sanidad-publica-espana-2026/`,
  },
  "/blog/cuadro-medico-adeslas-como-funciona": {
    title: "Cuadro Médico Adeslas 2026: Cómo Funciona y Qué Especialidades Incluye",
    description:
      "Más de 51.000 médicos en toda España. Cómo consultar el cuadro médico Adeslas, qué especialidades incluye y cómo pedir cita sin necesidad de derivación ni autorización previa.",
    canonical: `${BASE}/blog/cuadro-medico-adeslas-como-funciona/`,
  },
  "/blog/merece-la-pena-seguro-medico-privado-espana-2026": {
    title: "¿Merece la Pena un Seguro Médico Privado en España en 2026?",
    description:
      "Análisis honesto con datos reales del Ministerio de Sanidad: listas de espera, costes reales y para quién tiene sentido contratar un seguro médico privado en España.",
    canonical: `${BASE}/blog/merece-la-pena-seguro-medico-privado-espana-2026/`,
  },
  "/blog/seguro-medico-familia-coste-real-2026": {
    title: "Seguro Médico Familiar: Coste Real para 2, 3 o 4 Personas en 2026",
    description:
      "Ejemplos de precio reales para familias de 2, 3 y 4 personas con Adeslas en 2026. Descuento del 4º asegurado, qué plan elegir y cuánto se paga realmente al mes.",
    canonical: `${BASE}/blog/seguro-medico-familia-coste-real-2026/`,
  },
  "/blog/como-cambiar-seguro-medico-sin-carencias-2026": {
    title: "Cómo Cambiar de Seguro Médico a Adeslas sin Carencias en 2026",
    description:
      "Guía paso a paso para cambiar de aseguradora a Adeslas sin perder coberturas. Qué es el reconocimiento de antigüedad, qué documentos necesitas y cuándo hacer el cambio.",
    canonical: `${BASE}/blog/como-cambiar-seguro-medico-sin-carencias-2026/`,
  },
  "/blog/sanidad-privada-sin-seguro-costes-reales-2026": {
    title: "Sanidad Privada sin Seguro en España: Precios Reales 2026",
    description:
      "Cuánto cuesta ir al médico privado pagando directamente en España en 2026. Precios de consultas, pruebas diagnósticas, operaciones y hospitalización sin seguro médico.",
    canonical: `${BASE}/blog/sanidad-privada-sin-seguro-costes-reales-2026/`,
  },

  // ── SEO TRANSACCIONAL — alta, contratar, precios ─────────────────
  "/alta-adeslas": {
    title: "Alta en Adeslas 2026 | Cómo Darse de Alta Online · Sin Esperas",
    description:
      "Guía completa para darse de alta en Adeslas en 2026: documentación necesaria, pasos del proceso, cuándo empieza la cobertura y todos los planes disponibles. Alta online en 2 minutos.",
    canonical: `${BASE}/alta-adeslas/`,
    ogImage: `${BASE}/og-default.jpg`,
  },
  "/como-contratar-adeslas": {
    title: "Cómo Contratar Adeslas 2026 | Guía Paso a Paso · Alta Online en 2 min",
    description:
      "Guía completa para contratar un seguro Adeslas en 2026: 3 formas de contratación, paso a paso, qué plan elegir y precios actualizados. Contrata online, por teléfono o solicita que te llamemos.",
    canonical: `${BASE}/como-contratar-adeslas/`,
    ogImage: `${BASE}/og-default.jpg`,
  },
  "/precios-adeslas": {
    title: "Precios Adeslas 2026 | Tarifas Actualizadas · Desde 21€/mes",
    description:
      "Todos los precios de los seguros Adeslas en 2026: GO desde 21€, Plena Vital desde 38€, Plena Plus desde 50,92€ y Plena Total desde 83€/mes. Tabla de precios por edad y factores que afectan a tu tarifa.",
    canonical: `${BASE}/precios-adeslas/`,
    ogImage: `${BASE}/og-default.jpg`,
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
