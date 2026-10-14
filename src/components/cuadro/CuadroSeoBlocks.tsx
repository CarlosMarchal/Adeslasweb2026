/**
 * Bloques de contenido compartidos por las páginas de cuadro médico por póliza
 * (/cuadro-medico/seniors/, /cuadro-medico/go/). Pensados para SEO/GEO: texto
 * citable en el HTML inicial, fecha y fuente visibles, pasos claros y enlazado
 * interno entre cuadros. Sin estado ni tracking.
 *
 * Autor: Juan Carlos Díaz — Convertiam.
 */
import type { ReactNode } from "react";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-10-14" → "14 de octubre de 2026" (sin depender del locale del runtime). */
export const fechaLarga = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};

/** Resumen "respuesta primero": datos clave + fecha, fuente y responsable. */
export function ResumenCuadro({
  titulo,
  puntos,
  modificado,
}: {
  titulo: string;
  puntos: ReactNode[];
  modificado: string;
}) {
  return (
    <section className="py-10 bg-blanco" aria-labelledby="resumen-cuadro">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="border-l-4 border-azul-medio bg-gris-claro p-6 md:p-8" style={{ borderRadius: "12px" }}>
          <h2 id="resumen-cuadro" className="text-gris-texto text-xl md:text-2xl mb-4">
            {titulo}
          </h2>
          <ul className="space-y-2 mb-5">
            {puntos.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-gris-texto leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-azul-medio flex-shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gris-medio leading-relaxed">
            <strong>Actualizado:</strong> <time dateTime={modificado}>{fechaLarga(modificado)}</time> ·{" "}
            <strong>Fuente:</strong> cuadros médicos oficiales 2026 de SegurCaixa Adeslas ·{" "}
            <strong>Elaborado por:</strong> Marchal Aseguradores, agente exclusivo de Adeslas.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Cómo usar el cuadro médico, en 4 pasos (información de los propios PDF). */
export function ComoUsarCuadro({ poliza }: { poliza: string }) {
  const pasos = [
    {
      t: "Descarga el PDF de tu provincia",
      d: `Busca la especialidad en el índice: los médicos de la capital aparecen primero y, después, los del resto de municipios en el apartado "Poblaciones".`,
    },
    {
      t: "Pide cita directamente",
      d: "Llama al teléfono de la consulta que figura en el cuadro o pide cita on-line desde la app o el Área Cliente de Adeslas, si el médico la ofrece.",
    },
    {
      t: "Identifícate con tu tarjeta",
      d: `Presenta tu tarjeta de asegurado de ${poliza}. También la tienes en formato digital en la app de Adeslas.`,
    },
    {
      t: "Pide autorización si hace falta",
      d: "Para las pruebas y tratamientos que la requieren, solicítala on-line desde el Área Cliente: la recibes por e-mail en menos de 48 horas laborables.",
    },
  ];
  return (
    <section className="section-pad bg-blanco">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-gris-texto mb-3 text-center">Cómo Usar el Cuadro Médico {poliza} en 4 Pasos</h2>
        <p className="text-gris-medio text-center max-w-2xl mx-auto mb-10">
          Del PDF a la consulta: lo que tienes que hacer para ir al médico con tu seguro.
        </p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pasos.map((p, i) => (
            <li key={p.t} className="bg-gris-claro border border-borde p-5" style={{ borderRadius: "12px" }}>
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-black mb-3"
                style={{ backgroundColor: "#003087" }}
              >
                {i + 1}
              </span>
              <h3 className="text-gris-texto text-base font-bold mb-2">{p.t}</h3>
              <p className="text-gris-medio text-sm leading-relaxed">{p.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const OTROS = [
  { href: "/cuadro-medico/", t: "Cuadro médico Adeslas 2026", d: "El cuadro general, con PDF de las 52 provincias." },
  { href: "/cuadro-medico/seniors/", t: "Cuadro médico Adeslas Seniors", d: "Para la póliza de mayores de 55 años, con hospitales de urgencias." },
  { href: "/cuadro-medico/go/", t: "Cuadro médico Adeslas GO", d: "Para el seguro ambulatorio Adeslas GO y Adeslas Básico." },
  { href: "/blog/cuadro-medico-adeslas-como-funciona/", t: "Cómo funciona el cuadro médico", d: "Guía para elegir médico, pedir cita y usar la app." },
];

/** Enlazado interno entre cuadros médicos (excluye la página actual). */
export function OtrosCuadros({ actual }: { actual: string }) {
  return (
    <section className="py-12 bg-blanco">
      <div className="container mx-auto max-w-5xl px-4">
        <h2 className="text-gris-texto text-xl md:text-2xl mb-6 text-center">Otros Cuadros Médicos Adeslas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {OTROS.filter((o) => o.href !== actual).map((o) => (
            <a
              key={o.href}
              href={o.href}
              className="group block border border-borde p-5 transition-colors duration-200 hover:border-azul-medio"
              style={{ borderRadius: "12px" }}
            >
              <span className="block text-gris-texto font-bold mb-1 group-hover:text-azul-medio">{o.t} →</span>
              <span className="block text-sm text-gris-medio">{o.d}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
