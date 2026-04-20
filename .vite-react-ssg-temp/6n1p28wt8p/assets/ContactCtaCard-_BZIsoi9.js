import { jsxs, jsx } from 'react/jsx-runtime';
import { Phone } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { u as usePhonePopup, t as trackClickToCallContratacion } from '../main.mjs';

const pageSourceMap = {
  // Seguros de salud individuales
  "/seguro-salud/adeslas-go/": 303,
  "/seguro-salud/adeslas-plena-vital/": 304,
  "/seguro-salud/adeslas-plena-vital-total-cobertura-completa-con-copagos-sin-subidas/": 313,
  "/seguro-salud/adeslas-plena-total/": 305,
  "/seguro-salud/adeslas-extra-150/": 306,
  "/seguro-salud/adeslas-plena-plus/": 307,
  "/seguro-salud/adeslas-seniors/": 314,
  "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/": 315,
  // Autónomos, pymes y empresas
  "/seguro-salud/autonomos/": 319,
  "/seguro-salud/pymes/": 320,
  "/seguro-salud/empresas/": 320,
  // Otros seguros
  "/seguro-dental/": 308,
  "/seguro-decesos/": 309,
  "/seguro-adeslas-decesos-prima-unica/": 323,
  "/seguro-mascotas/": 318,
  "/adeslas-asistencia-en-viaje/": 316,
  "/seguro-accidentes/": 317,
  "/adeslas-extranjeros": 312,
  // Especiales
  "/adeslas-body-factory/": 321,
  "/adeslas-adif-renfe/": 322
};
const ContactCtaCard = () => {
  const { pathname } = useLocation();
  const { openPhonePopup } = usePhonePopup();
  const source = pageSourceMap[pathname] ?? 301;
  return /* @__PURE__ */ jsxs("div", { className: "p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
          style: { backgroundColor: "#E8F4FC" },
          children: /* @__PURE__ */ jsx(Phone, { className: "w-5 h-5", style: { color: "#009FE3" } })
        }
      ),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-gris-texto text-base font-bold leading-tight", children: "¿Quieres más información?" }),
        /* @__PURE__ */ jsx("p", { className: "text-gris-medio text-xs mt-0.5", children: "Te asesoramos gratis y sin compromiso" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1.5", children: [
      "Asesor especializado sin compromiso",
      "Te llamamos en menos de 2 minutos",
      "Contratación fácil y sin papeleo"
    ].map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-gris-texto", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
          style: { backgroundColor: "#E8F4FC" },
          children: /* @__PURE__ */ jsx("svg", { width: "10", height: "10", viewBox: "0 0 12 12", fill: "none", children: /* @__PURE__ */ jsx("path", { d: "M2.5 6L5 8.5L9.5 4", stroke: "#009FE3", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) })
        }
      ),
      item
    ] }, item)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => openPhonePopup(source),
          className: "w-full py-3 rounded-xl font-bold text-sm text-primary-foreground cursor-pointer btn-cta-magenta",
          style: { backgroundColor: "#E4097D" },
          children: "Te llamamos ahora — gratis"
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: "tel:917105000",
          onClick: () => trackClickToCallContratacion("contact_cta_card"),
          className: "w-full py-3 rounded-xl font-bold text-sm text-center border-2 btn-cta-light",
          style: { borderColor: "#009FE3", color: "#009FE3", backgroundColor: "transparent" },
          children: [
            /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4 inline mr-1.5 mb-0.5" }),
            "91 710 50 00"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-gris-medio", children: "Sin compromiso · Datos protegidos · L–V 9:00–20:00" })
  ] });
};

export { ContactCtaCard as C };
