import { Phone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { usePhonePopup } from "@/components/PhonePopupContext";
import type { HubSpotSource } from "@/lib/hubspot";
import { trackClickToCallContratacion } from "@/lib/tracking";

const pageSourceMap: Record<string, HubSpotSource> = {
  "/seguro-dental/":        308,
  "/seguro-decesos/":       309,
  "/pymes":                 310,
  "/empresas":              311,
  "/seguro-salud/autonomos/":             319,
  "/seguro-salud/pymes/":        320,
  "/seguro-salud/adeslas-seniors/":       314,
  "/seguro-salud/adeslas-seniors-total-seguro-medico-para-la-tercera-edad/": 315,
  "/adeslas-body-factory/":               321,
  "/adeslas-adif-renfe/":                 322,
  "/seguro-adeslas-decesos-prima-unica/": 323,
};

const ContactCtaCard = () => {
  const { pathname } = useLocation();
  const { openPhonePopup } = usePhonePopup();
  const source = pageSourceMap[pathname] ?? 301;

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Header con icono + título en línea */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#E8F4FC" }}
        >
          <Phone className="w-5 h-5" style={{ color: "#009FE3" }} />
        </div>
        <div>
          <h3 className="text-gris-texto text-base font-bold leading-tight">
            ¿Quieres más información?
          </h3>
          <p className="text-gris-medio text-xs mt-0.5">
            Te asesoramos gratis y sin compromiso
          </p>
        </div>
      </div>

      {/* Trust badges */}
      <div className="flex flex-col gap-1.5">
        {[
          "Asesor especializado sin compromiso",
          "Te llamamos en menos de 2 minutos",
          "Contratación fácil y sin papeleo",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-gris-texto">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#E8F4FC" }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 4" stroke="#009FE3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {item}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        <button
          onClick={() => openPhonePopup(source)}
          className="w-full py-3 rounded-xl font-bold text-sm text-primary-foreground cursor-pointer btn-cta-magenta"
          style={{ backgroundColor: "#E4097D" }}
        >
          Te llamamos ahora — gratis
        </button>
        <a
          href="tel:917105000"
          onClick={() => trackClickToCallContratacion("contact_cta_card")}
          className="w-full py-3 rounded-xl font-bold text-sm text-center border-2 btn-cta-light"
          style={{ borderColor: "#009FE3", color: "#009FE3", backgroundColor: "transparent" }}
        >
          <Phone className="w-4 h-4 inline mr-1.5 mb-0.5" />
          91 710 50 00
        </a>
      </div>

      <p className="text-center text-[10px] text-gris-medio">
        Sin compromiso · Datos protegidos · L–V 9:00–20:00
      </p>
    </div>
  );
};

export default ContactCtaCard;
