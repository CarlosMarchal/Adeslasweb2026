import { Phone } from "lucide-react";

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface ContactCtaCardWhatsAppProps {
  /** WhatsApp number with country code, no +, no spaces (e.g. "34615568486") */
  waNumber: string;
  /** Pre-filled WhatsApp message */
  waMessage: string;
  /** Display phone number for the secondary tel: link (e.g. "615568486") */
  phoneDisplay: string;
  /** Human-readable phone label (e.g. "615 56 84 86") */
  phoneLabel: string;
}

const ContactCtaCardWhatsApp = ({
  waNumber,
  waMessage,
  phoneDisplay,
  phoneLabel,
}: ContactCtaCardWhatsAppProps) => {
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#E7F9EE" }}
        >
          <WhatsAppIcon />
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
          "Asesor especializado en colectivos Renfe/ADIF",
          "Respuesta inmediata por WhatsApp",
          "Contratación fácil y sin papeleo",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-gris-texto">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#E7F9EE" }}
            >
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6L5 8.5L9.5 4"
                  stroke="#25D366"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {item}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-2">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white cursor-pointer"
          style={{ backgroundColor: "#25D366" }}
        >
          <WhatsAppIcon />
          Escríbenos por WhatsApp
        </a>
        <a
          href={`tel:${phoneDisplay}`}
          className="w-full py-3 rounded-xl font-bold text-sm text-center border-2 btn-cta-light"
          style={{ borderColor: "#009FE3", color: "#009FE3", backgroundColor: "transparent" }}
        >
          <Phone className="w-4 h-4 inline mr-1.5 mb-0.5" />
          {phoneLabel}
        </a>
      </div>

      <p className="text-center text-[10px] text-gris-medio">
        Sin compromiso · Datos protegidos · L–V 9:00–20:00
      </p>
    </div>
  );
};

export default ContactCtaCardWhatsApp;
