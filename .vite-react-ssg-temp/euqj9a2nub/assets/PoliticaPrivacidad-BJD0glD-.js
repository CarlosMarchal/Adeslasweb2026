import { jsxs, jsx } from 'react/jsx-runtime';
import { b as useSeo, c as TarificadorProvider, H as Header, F as Footer } from '../main.mjs';
import 'vite-react-ssg/single-page';
import 'react';
import '@tanstack/react-query';
import 'react-router-dom';
import 'next-themes';
import 'sonner';
import '@radix-ui/react-toast';
import 'class-variance-authority';
import 'lucide-react';
import 'clsx';
import 'tailwind-merge';
import '@radix-ui/react-tooltip';
import 'framer-motion';
import 'react-helmet-async';
import 'react-dom';

const PoliticaPrivacidad = () => {
  const _seo = useSeo({
    title: "Aviso Legal y Política de Privacidad | Adeslas Seguros Médicos",
    description: "Aviso legal, política de privacidad y política de cookies de Marchal Mediadores S.L.U., Agencia Exclusiva de Adeslas.",
    canonical: "https://adeslas.numero1salud.es/politica-de-privacidad",
    ogImage: "https://adeslas.numero1salud.es/og-default.jpg",
    breadcrumbs: [
      { name: "Inicio", url: "https://adeslas.numero1salud.es/" },
      { name: "Política de Privacidad", url: "https://adeslas.numero1salud.es/politica-de-privacidad" }
    ]
  });
  const h2 = "text-xl font-bold mt-10 mb-4";
  const h3 = "text-base font-bold mt-6 mb-2";
  const p = "text-sm leading-relaxed text-gris-texto mb-3";
  return /* @__PURE__ */ jsxs(TarificadorProvider, { children: [
    _seo,
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsxs("main", { className: "bg-blanco", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "py-12 md:py-16",
          style: { backgroundColor: "#003087" },
          children: /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 text-center", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-3xl font-bold text-white", children: "Aviso Legal y Política de Privacidad" }),
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "mt-2 text-sm max-w-xl mx-auto",
                style: { color: "rgba(255,255,255,0.65)" },
                children: "Información sobre el tratamiento de datos personales y condiciones de uso del sitio web."
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto px-4 py-12 max-w-3xl", children: [
        /* @__PURE__ */ jsx("h2", { className: h2, style: { color: "#003087" }, children: "1. Aviso Legal" }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "1.1 Datos identificativos" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, se informa que este sitio web es titularidad de:" }),
        /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gris-texto mb-4 list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Razón social:" }),
            " Marchal Aseguradores S.L.U."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "CIF:" }),
            " B-86792017"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Domicilio social:" }),
            " Avenida de Filipinas, 28 · CP 28003 · Madrid"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Inscripción DGSFP:" }),
            " Agencia Exclusiva de Adeslas S.A. · Clave DGS 28101259"
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Email de contacto:" }),
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "mailto:adeslas@marchalaseguradores.com",
                className: "hover:underline",
                style: { color: "#009FE3" },
                children: "adeslas@marchalaseguradores.com"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Teléfono:" }),
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "tel:917105000",
                className: "hover:underline",
                style: { color: "#009FE3" },
                children: "91 710 50 00"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "1.2 Objeto y aceptación" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "El presente aviso legal regula el acceso y uso de este sitio web. El acceso al mismo implica la aceptación plena y sin reservas de todas las disposiciones incluidas en este aviso, así como de cualesquiera otras disposiciones legales que fueren de aplicación." }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "1.3 Propiedad intelectual e industrial" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "Todos los contenidos de este sitio web (textos, fotografías, gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos fuente) constituyen una obra cuya propiedad pertenece a Marchal Aseguradores S.L.U. y/o a Adeslas S.A., sin que puedan entenderse cedidos al usuario ninguno de los derechos de explotación sobre los mismos más allá de lo estrictamente necesario para el correcto uso del sitio web." }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "1.4 Exclusión de responsabilidad" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "Marchal Aseguradores S.L.U. no se hace responsable de los posibles errores de seguridad que se puedan producir ni de los posibles daños que puedan causarse al sistema informático del usuario (hardware y software), a los ficheros o documentos almacenados en el mismo, como consecuencia de la presencia de virus en el ordenador del usuario, de un mal funcionamiento del navegador o del uso de versiones no actualizadas del mismo." }),
        /* @__PURE__ */ jsx("h2", { className: h2, style: { color: "#003087" }, children: "2. Política de Privacidad" }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "2.1 Responsable del tratamiento" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "El responsable del tratamiento de los datos personales recabados a través de este sitio web es Marchal Aseguradores S.L.U., con CIF B-86792017 y domicilio en Avenida de Filipinas, 28, CP 28003 Madrid." }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "2.2 Finalidad del tratamiento" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "Los datos personales que nos facilites a través de los formularios de contacto, calculadora de precios u otras vías serán tratados con las siguientes finalidades:" }),
        /* @__PURE__ */ jsxs("ul", { className: "text-sm text-gris-texto mb-4 list-disc pl-5 space-y-1", children: [
          /* @__PURE__ */ jsx("li", { children: "Gestionar tu solicitud de información o presupuesto de seguros médicos." }),
          /* @__PURE__ */ jsx("li", { children: "Enviarte comunicaciones comerciales relacionadas con productos y servicios de Adeslas, siempre que hayas dado tu consentimiento expreso." }),
          /* @__PURE__ */ jsx("li", { children: "Elaborar un perfil comercial para personalizar la oferta que te presentamos, sin toma de decisiones automatizadas." }),
          /* @__PURE__ */ jsx("li", { children: "Dar cumplimiento a las obligaciones legales aplicables." })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "2.3 Base jurídica" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "El tratamiento de tus datos se basa en: (a) la ejecución de medidas precontractuales o contractuales cuando solicitas un presupuesto o contratas un seguro; (b) tu consentimiento expreso para comunicaciones comerciales; y (c) el interés legítimo de Marchal Aseguradores S.L.U. para la mejora de sus servicios." }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "2.4 Destinatarios de los datos" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "Tus datos podrán ser comunicados a Adeslas S.A. en calidad de aseguradora, exclusivamente para la gestión de la solicitud de seguro. No se cederán datos a terceros salvo obligación legal." }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "2.5 Conservación de datos" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recabaron y para determinar las posibles responsabilidades que se pudieran derivar de dicha finalidad. En cualquier caso, se aplicarán los plazos de prescripción legalmente establecidos." }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "2.6 Derechos del interesado" }),
        /* @__PURE__ */ jsxs("p", { className: p, children: [
          "Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando un correo electrónico a",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:adeslas@marchalaseguradores.com",
              className: "hover:underline",
              style: { color: "#009FE3" },
              children: "adeslas@marchalaseguradores.com"
            }
          ),
          " ",
          "acompañado de una copia de tu DNI o documento identificativo equivalente. Asimismo, tienes derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "https://www.aepd.es",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:underline",
              style: { color: "#009FE3" },
              children: "www.aepd.es"
            }
          ),
          ")."
        ] }),
        /* @__PURE__ */ jsx("h2", { className: h2, style: { color: "#003087" }, children: "3. Política de Cookies" }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "3.1 ¿Qué son las cookies?" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde información sobre tu visita, como tus preferencias de idioma y otras opciones, con el fin de facilitar tu próxima visita y hacer que el sitio te resulte más útil." }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "3.2 Cookies utilizadas" }),
        /* @__PURE__ */ jsx("div", { className: "overflow-x-auto mb-4", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { style: { backgroundColor: "#E8F4FC" }, children: [
            /* @__PURE__ */ jsx("th", { className: "text-left p-2.5 font-bold text-gris-texto border", style: { borderColor: "#D5E3F0" }, children: "Cookie" }),
            /* @__PURE__ */ jsx("th", { className: "text-left p-2.5 font-bold text-gris-texto border", style: { borderColor: "#D5E3F0" }, children: "Tipo" }),
            /* @__PURE__ */ jsx("th", { className: "text-left p-2.5 font-bold text-gris-texto border", style: { borderColor: "#D5E3F0" }, children: "Finalidad" }),
            /* @__PURE__ */ jsx("th", { className: "text-left p-2.5 font-bold text-gris-texto border", style: { borderColor: "#D5E3F0" }, children: "Duración" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { className: "text-gris-texto", children: [
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "adeslas_cookie_consent" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "Técnica" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "Almacena tu elección sobre cookies" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "1 año" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { style: { backgroundColor: "#FAFBFD" }, children: [
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "_ga / _gid" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "Analítica" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "Google Analytics: mide el tráfico y comportamiento de los usuarios" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "2 años / 24h" })
            ] }),
            /* @__PURE__ */ jsxs("tr", { children: [
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "_fbp" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "Marketing" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "Meta Pixel: mide la eficacia de campañas publicitarias" }),
              /* @__PURE__ */ jsx("td", { className: "p-2.5 border", style: { borderColor: "#D5E3F0" }, children: "3 meses" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("h3", { className: h3, style: { color: "#009FE3" }, children: "3.3 Gestión de cookies" }),
        /* @__PURE__ */ jsx("p", { className: p, children: "Puedes configurar tu navegador para rechazar la instalación de cookies o para que te avise cuando un sitio web intente instalar una. También puedes modificar tus preferencias en cualquier momento a través del banner de cookies de este sitio. Ten en cuenta que, si desactivas algunas cookies, ciertas funcionalidades del sitio web pueden verse afectadas." }),
        /* @__PURE__ */ jsx("h2", { className: h2, style: { color: "#003087" }, children: "4. Contacto" }),
        /* @__PURE__ */ jsxs("p", { className: p, children: [
          "Para cualquier consulta relativa a este aviso legal o a la política de privacidad, puedes escribirnos a",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "mailto:adeslas@marchalaseguradores.com",
              className: "hover:underline",
              style: { color: "#009FE3" },
              children: "adeslas@marchalaseguradores.com"
            }
          ),
          " ",
          "o llamarnos al",
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "tel:917105000",
              className: "hover:underline",
              style: { color: "#009FE3" },
              children: "91 710 50 00"
            }
          ),
          "."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-gris-medio mt-10", children: "Última actualización: marzo 2026" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};

export { PoliticaPrivacidad as default };
