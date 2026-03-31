import { useSeo } from "@/hooks/use-seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TarificadorProvider } from "@/components/TarificadorContext";

const PoliticaPrivacidad = () => {
  useSeo({
    title: "Aviso Legal y Política de Privacidad | Adeslas Seguros Médicos",
    description:
      "Aviso legal, política de privacidad y política de cookies de Marchal Mediadores S.L., Agencia Exclusiva de Adeslas.",
    canonical:
      "https://adeslas.marchalaseguradores.es/politica-de-privacidad",
  });

  const h2 =
    "text-xl font-bold mt-10 mb-4" as const;
  const h3 =
    "text-base font-bold mt-6 mb-2" as const;
  const p = "text-sm leading-relaxed text-gris-texto mb-3" as const;

  return (
    <TarificadorProvider>
      <Header />
      <main className="bg-blanco">
        {/* Hero strip */}
        <div
          className="py-12 md:py-16"
          style={{ backgroundColor: "#003087" }}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Aviso Legal y Política de Privacidad
            </h1>
            <p
              className="mt-2 text-sm max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Información sobre el tratamiento de datos personales y condiciones
              de uso del sitio web.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {/* ── AVISO LEGAL ── */}
          <h2 className={h2} style={{ color: "#003087" }}>
            1. Aviso Legal
          </h2>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            1.1 Datos identificativos
          </h3>
          <p className={p}>
            En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio,
            de Servicios de la Sociedad de la Información y del Comercio
            Electrónico, se informa que este sitio web es titularidad de:
          </p>
          <ul className="text-sm text-gris-texto mb-4 list-disc pl-5 space-y-1">
            <li>
              <strong>Razón social:</strong> Marchal Mediadores S.L.
            </li>
            <li>
              <strong>CIF:</strong> B-86390861
            </li>
            <li>
              <strong>Domicilio social:</strong> Avda. Europa, 18 · CP 28224 ·
              Pozuelo de Alarcón, Madrid
            </li>
            <li>
              <strong>Inscripción DGSFP:</strong> Agencia Exclusiva de Adeslas
              S.A. · Código DGS C0461B86390861
            </li>
            <li>
              <strong>Email de contacto:</strong>{" "}
              <a
                href="mailto:info@contrataseguromedico.com"
                className="hover:underline"
                style={{ color: "#009FE3" }}
              >
                info@contrataseguromedico.com
              </a>
            </li>
            <li>
              <strong>Teléfono:</strong>{" "}
              <a
                href="tel:917158100"
                className="hover:underline"
                style={{ color: "#009FE3" }}
              >
                91 715 81 00
              </a>
            </li>
          </ul>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            1.2 Objeto y aceptación
          </h3>
          <p className={p}>
            El presente aviso legal regula el acceso y uso de este sitio web.
            El acceso al mismo implica la aceptación plena y sin reservas de
            todas las disposiciones incluidas en este aviso, así como de
            cualesquiera otras disposiciones legales que fueren de aplicación.
          </p>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            1.3 Propiedad intelectual e industrial
          </h3>
          <p className={p}>
            Todos los contenidos de este sitio web (textos, fotografías,
            gráficos, imágenes, iconos, tecnología, software, así como su
            diseño gráfico y códigos fuente) constituyen una obra cuya
            propiedad pertenece a Marchal Mediadores S.L. y/o a Adeslas S.A., sin
            que puedan entenderse cedidos al usuario ninguno de los derechos de
            explotación sobre los mismos más allá de lo estrictamente necesario
            para el correcto uso del sitio web.
          </p>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            1.4 Exclusión de responsabilidad
          </h3>
          <p className={p}>
            Marchal Mediadores S.L. no se hace responsable de los posibles
            errores de seguridad que se puedan producir ni de los posibles daños
            que puedan causarse al sistema informático del usuario (hardware y
            software), a los ficheros o documentos almacenados en el mismo, como
            consecuencia de la presencia de virus en el ordenador del usuario, de
            un mal funcionamiento del navegador o del uso de versiones no
            actualizadas del mismo.
          </p>

          {/* ── POLÍTICA DE PRIVACIDAD ── */}
          <h2 className={h2} style={{ color: "#003087" }}>
            2. Política de Privacidad
          </h2>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            2.1 Responsable del tratamiento
          </h3>
          <p className={p}>
            El responsable del tratamiento de los datos personales recabados a
            través de este sitio web es Marchal Mediadores S.L., con CIF
            B-86390861 y domicilio en Avda. Europa, 18, 28224 Pozuelo de Alarcón
            (Madrid).
          </p>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            2.2 Finalidad del tratamiento
          </h3>
          <p className={p}>
            Los datos personales que nos facilites a través de los formularios
            de contacto, calculadora de precios u otras vías serán tratados con
            las siguientes finalidades:
          </p>
          <ul className="text-sm text-gris-texto mb-4 list-disc pl-5 space-y-1">
            <li>
              Gestionar tu solicitud de información o presupuesto de seguros
              médicos.
            </li>
            <li>
              Enviarte comunicaciones comerciales relacionadas con productos y
              servicios de Adeslas, siempre que hayas dado tu consentimiento
              expreso.
            </li>
            <li>
              Elaborar un perfil comercial para personalizar la oferta que te
              presentamos, sin toma de decisiones automatizadas.
            </li>
            <li>Dar cumplimiento a las obligaciones legales aplicables.</li>
          </ul>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            2.3 Base jurídica
          </h3>
          <p className={p}>
            El tratamiento de tus datos se basa en: (a) la ejecución de medidas
            precontractuales o contractuales cuando solicitas un presupuesto o
            contratas un seguro; (b) tu consentimiento expreso para
            comunicaciones comerciales; y (c) el interés legítimo de Marchal
            Mediadores S.L. para la mejora de sus servicios.
          </p>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            2.4 Destinatarios de los datos
          </h3>
          <p className={p}>
            Tus datos podrán ser comunicados a Adeslas S.A. en calidad de
            aseguradora, exclusivamente para la gestión de la solicitud de
            seguro. No se cederán datos a terceros salvo obligación legal.
          </p>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            2.5 Conservación de datos
          </h3>
          <p className={p}>
            Los datos personales se conservarán durante el tiempo necesario para
            cumplir con la finalidad para la que se recabaron y para determinar
            las posibles responsabilidades que se pudieran derivar de dicha
            finalidad. En cualquier caso, se aplicarán los plazos de
            prescripción legalmente establecidos.
          </p>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            2.6 Derechos del interesado
          </h3>
          <p className={p}>
            Puedes ejercer tus derechos de acceso, rectificación, supresión,
            oposición, limitación del tratamiento y portabilidad enviando un
            correo electrónico a{" "}
            <a
              href="mailto:info@contrataseguromedico.com"
              className="hover:underline"
              style={{ color: "#009FE3" }}
            >
              info@contrataseguromedico.com
            </a>{" "}
            acompañado de una copia de tu DNI o documento identificativo
            equivalente. Asimismo, tienes derecho a presentar una reclamación
            ante la Agencia Española de Protección de Datos (
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "#009FE3" }}
            >
              www.aepd.es
            </a>
            ).
          </p>

          {/* ── POLÍTICA DE COOKIES ── */}
          <h2 className={h2} style={{ color: "#003087" }}>
            3. Política de Cookies
          </h2>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            3.1 ¿Qué son las cookies?
          </h3>
          <p className={p}>
            Las cookies son pequeños archivos de texto que se almacenan en tu
            dispositivo cuando visitas un sitio web. Permiten que el sitio
            recuerde información sobre tu visita, como tus preferencias de
            idioma y otras opciones, con el fin de facilitar tu próxima visita y
            hacer que el sitio te resulte más útil.
          </p>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            3.2 Cookies utilizadas
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ backgroundColor: "#E8F4FC" }}>
                  <th className="text-left p-2.5 font-bold text-gris-texto border" style={{ borderColor: "#D5E3F0" }}>Cookie</th>
                  <th className="text-left p-2.5 font-bold text-gris-texto border" style={{ borderColor: "#D5E3F0" }}>Tipo</th>
                  <th className="text-left p-2.5 font-bold text-gris-texto border" style={{ borderColor: "#D5E3F0" }}>Finalidad</th>
                  <th className="text-left p-2.5 font-bold text-gris-texto border" style={{ borderColor: "#D5E3F0" }}>Duración</th>
                </tr>
              </thead>
              <tbody className="text-gris-texto">
                <tr>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>asisa_cookie_consent</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>Técnica</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>Almacena tu elección sobre cookies</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>1 año</td>
                </tr>
                <tr style={{ backgroundColor: "#FAFBFD" }}>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>_ga / _gid</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>Analítica</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>Google Analytics: mide el tráfico y comportamiento de los usuarios</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>2 años / 24h</td>
                </tr>
                <tr>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>_fbp</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>Marketing</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>Meta Pixel: mide la eficacia de campañas publicitarias</td>
                  <td className="p-2.5 border" style={{ borderColor: "#D5E3F0" }}>3 meses</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className={h3} style={{ color: "#009FE3" }}>
            3.3 Gestión de cookies
          </h3>
          <p className={p}>
            Puedes configurar tu navegador para rechazar la instalación de
            cookies o para que te avise cuando un sitio web intente instalar
            una. También puedes modificar tus preferencias en cualquier momento
            a través del banner de cookies de este sitio. Ten en cuenta que, si
            desactivas algunas cookies, ciertas funcionalidades del sitio web
            pueden verse afectadas.
          </p>

          {/* ── CONTACTO ── */}
          <h2 className={h2} style={{ color: "#003087" }}>
            4. Contacto
          </h2>
          <p className={p}>
            Para cualquier consulta relativa a este aviso legal o a la política
            de privacidad, puedes escribirnos a{" "}
            <a
              href="mailto:info@contrataseguromedico.com"
              className="hover:underline"
              style={{ color: "#009FE3" }}
            >
              info@contrataseguromedico.com
            </a>{" "}
            o llamarnos al{" "}
            <a
              href="tel:917158100"
              className="hover:underline"
              style={{ color: "#009FE3" }}
            >
              91 715 81 00
            </a>
            .
          </p>

          <p className="text-xs text-gris-medio mt-10">
            Última actualización: marzo 2026
          </p>
        </div>
      </main>
      <Footer />
    </TarificadorProvider>
  );
};

export default PoliticaPrivacidad;
