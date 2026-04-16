/**
 * Schemas FAQ por ruta — para server-render en app/[[...slug]]/page.tsx
 * Garantiza que Google lea las FAQ en el HTML inicial sin depender de JS.
 *
 * Fuente de verdad: las FAQs de las vistas SPA usan useSeo() con faqSchema,
 * pero como ssr:false impide que react-helmet-async las server-renderice,
 * duplicamos aquí las más importantes para el <head> del servidor.
 */

export interface FaqItem {
  q: string;
  a: string;
}

/** Mapa ruta → array de preguntas/respuestas para esa página */
export const FAQ_SCHEMAS: Record<string, FaqItem[]> = {

  // ── HOMEPAGE ────────────────────────────────────────────────────────
  "/": [
    {
      q: "¿Cuánto cuesta un seguro médico Adeslas en 2026?",
      a: "Los precios de referencia para 2026 son: Adeslas GO desde 21€/mes (ambulatorio con copago), Adeslas Plena Vital desde 38€/mes (hospitalización con copago máx. 300€/año), Adeslas Plena Vital Total desde 48,50€/mes (cobertura total, precio garantizado 3 años), Adeslas Plena Plus desde 62€/mes (sin copagos), Adeslas Plena Total desde 83€/mes (sin copagos, dental y psicología incluidos) y Adeslas Extra 150 desde 90€/mes (libre elección médica). El precio exacto depende de tu edad y provincia.",
    },
    {
      q: "¿Cuáles son los planes de seguro médico Adeslas disponibles?",
      a: "Adeslas ofrece seis planes para particulares: (1) Adeslas GO: ambulatorio con copago máx. 260€/año, desde 21€/mes. (2) Adeslas Plena Vital: hospitalización completa con copago máx. 300€/año, desde 38€/mes. (3) Adeslas Plena Vital Total: cobertura total con prima garantizada 3 años, desde 48,50€/mes. (4) Adeslas Plena Plus: sin copagos, desde 62€/mes. (5) Adeslas Plena Total: el más completo, sin copagos, dental y psicología, desde 83€/mes. (6) Adeslas Extra 150: libre elección con reembolso del 80%, desde 90€/mes.",
    },
    {
      q: "¿Qué cubre el seguro Adeslas Plena Total?",
      a: "Adeslas Plena Total incluye cobertura médica integral sin copagos: consultas de medicina general, todas las especialidades, pruebas diagnósticas, cirugía, hospitalización ilimitada, dental (46 actos incluidos), psicología (20 sesiones/año), asistencia sanitaria en viajes con cobertura hasta 100.000€ y protección por accidente. Prima garantizada 3 años sin subida.",
    },
    {
      q: "¿Adeslas tiene copagos?",
      a: "Adeslas ofrece planes con y sin copagos. Adeslas GO tiene un copago limitado a 260€/año. Adeslas Plena Vital tiene copago con tope de 300€/año. Adeslas Plena Vital Total tiene copago reducido con precio garantizado 3 años. Adeslas Plena Plus y Plena Total no tienen copago en ningún servicio.",
    },
    {
      q: "¿Cuál es el mejor seguro Adeslas?",
      a: "Depende de tu perfil. Para uso frecuente sin sorpresas: Plena Total (sin copagos) o Plena Vital Total (precio estable 3 años). Para presupuesto ajustado con cobertura completa: Plena Vital o Plena Plus. Para cobertura básica mínima: Adeslas GO. Para libertad de elección de médico: Extra 150. El plan Plena Vital Total es el más recomendado por su equilibrio precio-cobertura-estabilidad.",
    },
    {
      q: "¿Adeslas cubre embarazo y parto?",
      a: "Sí. Los planes Plena Vital, Plena Vital Total, Plena Plus y Plena Total cubren embarazo y parto: seguimiento prenatal, parto vaginal y cesárea en habitación individual, neonatología y revisión postparto. Sin período de carencia adicional si se contrata con antelación al embarazo.",
    },
    {
      q: "¿Puedo contratar Adeslas si soy autónomo?",
      a: "Sí. Los autónomos pueden deducir hasta 500€/año por asegurado (ellos, cónyuge e hijos dependientes) en el IRPF. Puedes elegir cualquier plan según tus necesidades. Marchal Aseguradores gestiona el alta en 24 horas.",
    },
    {
      q: "¿Adeslas tiene seguro dental?",
      a: "Sí. Adeslas Dental cubre limpiezas y revisiones desde el primer día sin carencias, desde 9,45€/mes. Niños hasta 8 años gratis. Endodoncia, implantes y ortodoncia con franquicia reducida. Puede contratarse solo o complementando cualquier plan médico Adeslas.",
    },
  ],

  // ── ADESLAS GO ──────────────────────────────────────────────────────
  "/adeslas-go": [
    {
      q: "¿Qué incluye el seguro Adeslas GO?",
      a: "Adeslas GO incluye cobertura ambulatoria completa: medicina general, pediatría, especialidades médicas, diagnóstico (analíticas, radiología, ecografías), urgencias 24h, chequeo médico anual y fisioterapia. El copago máximo es de 260€ por asegurado al año (LMA). No incluye hospitalización programada.",
    },
    {
      q: "¿Cuánto cuesta Adeslas GO?",
      a: "Adeslas GO cuesta desde 21€/mes para personas de hasta 30 años. El precio exacto depende de la edad y provincia. Para calcularlo exacto, usa el tarificador de Marchal Aseguradores en esta misma web.",
    },
    {
      q: "¿Adeslas GO tiene cuestionario de salud?",
      a: "No. Adeslas GO no requiere cuestionario de salud médico previo, lo que facilita la contratación a personas con condiciones preexistentes. La cobertura comienza desde el primer día.",
    },
    {
      q: "¿Qué diferencia hay entre Adeslas GO y Adeslas Plena Vital?",
      a: "La diferencia principal es la hospitalización: Adeslas GO no incluye hospitalización programada (solo urgencias), mientras que Adeslas Plena Vital incluye hospitalización, cirugía y todas las especialidades. El copago de GO tiene un tope de 260€/año y el de Plena Vital de 300€/año. Plena Vital es más cara pero ofrece cobertura completa.",
    },
  ],

  // ── ADESLAS PLENA VITAL ──────────────────────────────────────────────
  "/adeslas-plena-vital": [
    {
      q: "¿Qué incluye Adeslas Plena Vital?",
      a: "Adeslas Plena Vital incluye cobertura médica completa: medicina general, todas las especialidades, hospitalización, cirugía, urgencias 24h, diagnóstico completo, rehabilitación, salud mental (10 sesiones) y chequeo médico anual. El copago tiene un tope de 300€ por asegurado al año.",
    },
    {
      q: "¿Cuánto cuesta Adeslas Plena Vital?",
      a: "Adeslas Plena Vital cuesta desde 38€/mes para personas de hasta 30 años. El precio varía según la edad y provincia. Puedes calcular tu precio exacto en 2 minutos en el tarificador de Marchal Aseguradores.",
    },
    {
      q: "¿Cuánto es el copago máximo de Adeslas Plena Vital?",
      a: "El copago máximo de Adeslas Plena Vital es de 300€ por asegurado al año (LMA - Límite Máximo Anual). Aunque uses mucho el seguro, nunca pagarás más de 300€ anuales en copagos. A partir de esa cifra, el resto del año los servicios son sin coste adicional.",
    },
    {
      q: "¿Adeslas Plena Vital cubre el parto?",
      a: "Sí. Adeslas Plena Vital cubre el parto (vaginal y cesárea) en habitación individual, seguimiento del embarazo, neonatología y revisión postparto. No hay período de carencia adicional para el parto si se contrata con antelación suficiente.",
    },
  ],

  // ── ADESLAS PLENA TOTAL ──────────────────────────────────────────────
  "/adeslas-plena-total": [
    {
      q: "¿Qué cubre Adeslas Plena Total?",
      a: "Adeslas Plena Total cubre todo sin copago: medicina general, todas las especialidades, hospitalización ilimitada, cirugía, urgencias 24h, diagnóstico completo, dental (46 actos), psicología (20 sesiones/año), fisioterapia, salud visual, asistencia en viajes (100.000€) y protección por accidente. Prima garantizada 3 años sin subida.",
    },
    {
      q: "¿Cuánto cuesta Adeslas Plena Total?",
      a: "Adeslas Plena Total cuesta desde 83€/mes para personas de hasta 30 años. Es el plan más completo de Adeslas e incluye todas las coberturas sin copago.",
    },
    {
      q: "¿Adeslas Plena Total tiene copago?",
      a: "No. Adeslas Plena Total no tiene copago en ningún servicio médico. Puedes consultar al médico, hacerte pruebas o ser hospitalizado sin pagar nada adicional a la cuota mensual.",
    },
    {
      q: "¿Qué diferencia hay entre Plena Vital Total y Plena Total?",
      a: "Plena Vital Total tiene un copago reducido (pero con prima garantizada 3 años) y es más económico (desde 48,50€/mes). Plena Total no tiene ningún copago e incluye más coberturas adicionales (dental completo, psicología, asistencia viajes). Para quien usa mucho el seguro y no quiere preocuparse por copagos, Plena Total es la mejor opción.",
    },
  ],

  // ── CUADRO MÉDICO ────────────────────────────────────────────────────
  "/cuadro-medico": [
    {
      q: "¿Cuántos médicos tiene Adeslas en su cuadro médico?",
      a: "Adeslas cuenta con más de 51.000 médicos y especialistas en toda España, distribuidos en más de 1.400 centros médicos, clínicas y hospitales. Es el cuadro médico privado más amplio de España.",
    },
    {
      q: "¿Cómo busco un médico en el cuadro médico de Adeslas?",
      a: "Puedes buscar médicos Adeslas por especialidad y provincia directamente en esta página. El buscador te muestra los médicos disponibles, su dirección y teléfono. También puedes usar la app Adeslas con tu número de asegurado.",
    },
    {
      q: "¿Puedo elegir el médico que quiero en Adeslas?",
      a: "Sí. Con cualquier plan Adeslas (excepto Adeslas GO para hospitalización) puedes elegir libremente cualquier médico del cuadro médico sin necesidad de derivación ni autorización previa en la mayoría de especialidades.",
    },
  ],

  // ── AUTÓNOMOS ────────────────────────────────────────────────────────
  "/autonomos": [
    {
      q: "¿Pueden los autónomos deducirse el seguro médico Adeslas?",
      a: "Sí. Los autónomos en estimación directa pueden deducir hasta 500€/año por las primas de seguro de salud privado para ellos mismos, su cónyuge e hijos menores de 25 años dependientes. Esta deducción aplica en el IRPF.",
    },
    {
      q: "¿Qué plan Adeslas es mejor para autónomos?",
      a: "Para autónomos que quieren deducirse el seguro y tener cobertura completa sin sorpresas, el plan Adeslas Plena Vital Total es el más recomendado: precio estable 3 años, cobertura hospitalaria completa y copago reducido. Si el presupuesto es el factor principal, Adeslas Plena Vital desde 38€/mes es una excelente opción.",
    },
    {
      q: "¿Cómo contratan los autónomos el seguro Adeslas?",
      a: "A través de Marchal Aseguradores, Agente Exclusivo Adeslas. El proceso es 100% online o por teléfono, con alta en 24 horas y sin desplazamientos. Necesitas DNI/NIE, cuenta bancaria para la domiciliación y el IBAN.",
    },
  ],

  // ── EXTRANJEROS ──────────────────────────────────────────────────────
  "/adeslas-extranjeros": [
    {
      q: "¿El seguro Adeslas es válido para el visado de residencia en España?",
      a: "Sí. El seguro médico Adeslas es reconocido por los consulados españoles para tramitar el visado de residencia no lucrativa, visado de nómada digital y renovaciones de NIE. La póliza debe estar en vigor y cubrir el período del visado.",
    },
    {
      q: "¿Qué documentación se entrega para el visado con el seguro Adeslas?",
      a: "Marchal Aseguradores facilita la carta de cobertura en español e inglés, el certificado de seguro con todas las coberturas y el número de póliza. Toda la documentación es inmediata tras la contratación.",
    },
    {
      q: "¿Cuánto cuesta el seguro médico para extranjeros en España?",
      a: "El seguro médico Adeslas para extranjeros en España cuesta desde 38€/mes. El precio exacto depende de la edad, la provincia y el plan elegido. Puedes calcular tu precio exacto en el tarificador de Marchal Aseguradores.",
    },
  ],

  // ── EMBARAZADAS ──────────────────────────────────────────────────────
  "/seguro-medico-embarazadas": [
    {
      q: "¿Qué cubre el seguro Adeslas durante el embarazo?",
      a: "Adeslas cubre el seguimiento completo del embarazo: visitas al ginecólogo, ecografías (morfológica incluida), análisis, amniocentesis, parto vaginal y cesárea en habitación individual, neonatología, estancia hospitalaria del recién nacido y revisión postparto. Sin listas de espera.",
    },
    {
      q: "¿Tiene carencia el seguro Adeslas para el parto?",
      a: "La cobertura de parto tiene un período de carencia de 8 meses desde la contratación del seguro. Por eso es importante contratar el seguro antes de quedarse embarazada. Si procedes de otra aseguradora médica sin interrupción, Adeslas puede eliminar las carencias.",
    },
    {
      q: "¿Puedo contratar Adeslas estando ya embarazada?",
      a: "Puedes contratar Adeslas estando embarazada, pero la cobertura del parto estará sujeta al período de carencia de 8 meses. Si tu embarazo supera ese período de carencia, el parto quedará cubierto. Consulta tu caso concreto con Marchal Aseguradores para valorar la mejor solución.",
    },
  ],

  // ── INFANTIL ────────────────────────────────────────────────────────
  "/seguro-medico-infantil": [
    {
      q: "¿Qué cubre el seguro médico infantil Adeslas?",
      a: "El seguro infantil Adeslas incluye: pediatría sin esperas, revisiones del desarrollo, vacunas (en clínica privada), todas las especialidades pediátricas, urgencias 24h, diagnóstico (analíticas, radiología), rehabilitación y hospitalización pediátrica. Desde 21€/mes.",
    },
    {
      q: "¿Desde qué edad pueden contratar el seguro Adeslas los niños?",
      a: "Los niños pueden ser asegurados en Adeslas desde recién nacidos (0 años). Para los primeros 3 meses de vida, el alta puede realizarse sin cuestionario de salud. A partir de los 3 meses, el alta es inmediata.",
    },
    {
      q: "¿Hay descuento si aseguro a varios hijos con Adeslas?",
      a: "Sí. Adeslas aplica un descuento del 10% a partir del 4º asegurado en la misma póliza familiar. Esto aplica tanto a hijos como a cualquier otro miembro de la unidad familiar.",
    },
  ],

  // ── DENTAL ──────────────────────────────────────────────────────────
  "/adeslas-dental": [
    {
      q: "¿Qué cubre el seguro dental Adeslas desde el primer día?",
      a: "Desde el primer día sin carencias: revisión dental completa, limpieza bucal, radiografías y urgencias dentales. Sin esperas ni períodos mínimos.",
    },
    {
      q: "¿Cuánto cuesta el seguro dental Adeslas?",
      a: "El seguro dental Adeslas cuesta desde 9,45€/mes para adultos. Los niños hasta 8 años se incluyen gratis en la póliza del titular.",
    },
    {
      q: "¿El seguro dental Adeslas cubre implantes y ortodoncia?",
      a: "Sí. Los implantes dentales tienen una franquicia reducida (pagas solo una parte). La ortodoncia infantil y adulta también está cubierta con franquicia. Las endodoncias tienen coste reducido. Consulta la tabla de franquicias completa en la página del seguro dental.",
    },
  ],

  // ── PRECIOS Y OFERTAS ────────────────────────────────────────────────
  "/precios-ofertas": [
    {
      q: "¿Cuáles son los precios de los seguros Adeslas en 2026?",
      a: "Precios de referencia para 2026: Adeslas GO desde 21€/mes, Plena Vital desde 38€/mes, Plena Vital Total desde 48,50€/mes, Plena Plus desde 62€/mes, Plena Total desde 83€/mes, Extra 150 desde 90€/mes, Seniors desde 67,50€/mes. Los precios finales dependen de la edad y la provincia.",
    },
    {
      q: "¿Hay descuentos en los seguros Adeslas?",
      a: "Sí. Adeslas aplica un descuento del 10% a partir del 4º asegurado en pólizas familiares o de empresa. Además, puntualmente pueden existir ofertas de lanzamiento o descuentos por campaña. Consulta las ofertas actuales en Marchal Aseguradores.",
    },
    {
      q: "¿Puedo calcular el precio exacto de mi seguro Adeslas?",
      a: "Sí. En esta misma web puedes calcular el precio exacto para tu edad, provincia y el plan que te interesa en menos de 2 minutos, sin compromiso y sin facilitar datos bancarios.",
    },
  ],
};
