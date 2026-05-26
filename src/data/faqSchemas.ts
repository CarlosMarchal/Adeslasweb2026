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
      a: "Sí. Los autónomos pueden deducir hasta 500€/año por asegurado (ellos, cónyuge e hijos dependientes) en el IRPF. Puedes elegir cualquier plan según tus necesidades. El alta se gestiona online en menos de 24 horas.",
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
      a: "Adeslas GO cuesta desde 21€/mes para personas de hasta 30 años. El precio exacto depende de la edad y provincia. Puedes calcularlo en 2 minutos con el tarificador de esta web, sin compromiso.",
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
      a: "Adeslas Plena Vital cuesta desde 38€/mes para personas de hasta 30 años. El precio varía según la edad y provincia. Puedes calcular tu precio exacto en 2 minutos en el tarificador de esta web, sin compromiso.",
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
      a: "El proceso es 100% online o por teléfono, con alta en 24 horas y sin desplazamientos. Solo necesitas DNI/NIE, cuenta bancaria para la domiciliación y el IBAN.",
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
      a: "Recibirás la carta de cobertura en español e inglés, el certificado de seguro con todas las coberturas y el número de póliza. Toda la documentación es inmediata tras la contratación.",
    },
    {
      q: "¿Cuánto cuesta el seguro médico para extranjeros en España?",
      a: "El seguro médico Adeslas para extranjeros en España cuesta desde 38€/mes. El precio exacto depende de la edad, la provincia y el plan elegido. Puedes calcular tu precio exacto en el tarificador de esta web en 2 minutos.",
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
      a: "Puedes contratar Adeslas estando embarazada, pero la cobertura del parto estará sujeta al período de carencia de 8 meses. Si tu embarazo supera ese período de carencia, el parto quedará cubierto. Consulta tu caso concreto con nuestro equipo para valorar la mejor solución.",
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
      a: "Sí. Adeslas aplica un descuento del 10% a partir del 4º asegurado en pólizas familiares o de empresa. Además, puntualmente pueden existir ofertas de lanzamiento o descuentos por campaña. Consulta las ofertas actuales en esta web.",
    },
    {
      q: "¿Puedo calcular el precio exacto de mi seguro Adeslas?",
      a: "Sí. En esta misma web puedes calcular el precio exacto para tu edad, provincia y el plan que te interesa en menos de 2 minutos, sin compromiso y sin facilitar datos bancarios.",
    },
  ],

  // ── ADESLAS PLENA VITAL TOTAL ────────────────────────────────────────
  "/adeslas-plena-vital-total": [
    {
      q: "¿Qué es Adeslas Plena Vital Total?",
      a: "Adeslas Plena Vital Total es el seguro médico de cobertura completa con copago reducido, dental incluido y prima garantizada sin subidas durante 3 años. Incluye asistencia ambulatoria, hospitalización, diagnóstico, fisioterapia, cobertura dental, chequeo médico anual y asistencia en viajes hasta 30.000€.",
    },
    {
      q: "¿Cuánto cuesta Adeslas Plena Vital Total?",
      a: "Adeslas Plena Vital Total cuesta desde 48,50€/mes para personas de hasta 30 años. Es el plan más recomendado por su equilibrio entre precio, cobertura y estabilidad: prima garantizada 3 años, dental incluido y copago con tope anual.",
    },
    {
      q: "¿Cuál es el copago de Adeslas Plena Vital Total?",
      a: "Adeslas Plena Vital Total tiene un copago por servicio con un Límite Máximo Anual (LMA) de 500€ por asegurado al año. Una vez alcanzado ese importe, el resto del año no hay ningún copago adicional, independientemente del uso que se haga del seguro.",
    },
    {
      q: "¿Por qué Plena Vital Total es mejor que Plena Vital?",
      a: "Plena Vital Total añade tres ventajas sobre Plena Vital: prima garantizada 3 años sin subidas (frente a revisión anual), cobertura dental incluida y asistencia en viaje hasta 30.000€. A cambio, el LMA anual es algo mayor (500€ vs 300€). Para familias que planifican su presupuesto a medio plazo, Plena Vital Total es la opción más recomendada.",
    },
  ],

  // ── ADESLAS PLENA PLUS ───────────────────────────────────────────────
  "/adeslas-plena-plus": [
    {
      q: "¿Qué cubre Adeslas Plena Plus?",
      a: "Adeslas Plena Plus cubre la asistencia sanitaria completa sin copagos: medicina general, todas las especialidades, hospitalización en habitación individual, cirugía, urgencias 24 horas y diagnóstico de alta tecnología. Acceso a más de 51.000 médicos y 1.400 centros en toda España.",
    },
    {
      q: "¿Cuánto cuesta Adeslas Plena Plus?",
      a: "Adeslas Plena Plus cuesta desde 62€/mes para personas de hasta 30 años. Es el plan sin copago más asequible de la gama Adeslas, con cobertura hospitalaria completa incluida.",
    },
    {
      q: "¿Cuál es la diferencia entre Adeslas Plena Plus y Plena Total?",
      a: "Ambos son sin copago, pero Plena Total añade cobertura dental (46 actos incluidos), psicología (20 sesiones/año), asistencia en viajes hasta 100.000€, reembolso de farmacia y prima garantizada 3 años. Plena Plus es más económico (desde 62€/mes vs 83€/mes) y cubre lo esencial sin ningún copago.",
    },
    {
      q: "¿Adeslas Plena Plus cubre el parto?",
      a: "Sí. Adeslas Plena Plus cubre el parto vaginal y por cesárea en habitación individual, el seguimiento del embarazo, neonatología y revisión postparto, sin copago en ninguno de estos servicios.",
    },
  ],

  // ── ADESLAS EXTRA 150 ────────────────────────────────────────────────
  "/adeslas-extra-150": [
    {
      q: "¿Qué es Adeslas Extra 150 y cómo funciona?",
      a: "Adeslas Extra 150 es el seguro de libre elección médica de Adeslas. Permite acudir a cualquier médico o clínica en España o en el extranjero, dentro o fuera de la red Adeslas. La aseguradora reembolsa el 80% de los gastos, con un límite de 150.000€ por asegurado y año. No requiere derivación ni autorización previa.",
    },
    {
      q: "¿Cuánto cubre Adeslas Extra 150 por reembolso?",
      a: "Adeslas Extra 150 reembolsa el 80% de los gastos médicos fuera de la red hasta 150.000€ al año por asegurado. La cobertura ambulatoria fuera de red tiene un sublímite de 40.000€/año. Dentro de la red Adeslas (51.000+ médicos), la cobertura es completa sin copago.",
    },
    {
      q: "¿A quién le conviene Adeslas Extra 150?",
      a: "Adeslas Extra 150 es ideal para personas que tienen un médico de confianza fuera de la red Adeslas, que viajan frecuentemente o trabajan en el extranjero, que quieren máxima libertad de elección sin renunciar a la cobertura completa, o que necesitan acceder a especialistas de referencia no disponibles en redes cerradas.",
    },
    {
      q: "¿Cuánto cuesta Adeslas Extra 150?",
      a: "Adeslas Extra 150 cuesta desde 90€/mes para personas de hasta 30 años. El precio varía según la edad y la provincia. Es el plan más premium de la gama para particulares.",
    },
  ],

  // ── ADESLAS SENIORS ──────────────────────────────────────────────────
  "/adeslas-seniors": [
    {
      q: "¿Qué es Adeslas Seniors?",
      a: "Adeslas Seniors es el seguro médico diseñado específicamente para personas de entre 55 y 84 años. Incluye un asesor médico personal, cobertura especial en oncología, cardiología y rehabilitación, hospitalización completa y prima garantizada sin subidas durante 3 años. Desde 67,50€/mes.",
    },
    {
      q: "¿Hasta qué edad se puede contratar Adeslas Seniors?",
      a: "Adeslas Seniors se puede contratar hasta los 84 años. Es accesible desde los 55 años y, una vez contratado, se renueva sin límite de edad siempre que se mantenga vigente.",
    },
    {
      q: "¿Qué especialidades cubre Adeslas Seniors?",
      a: "Adeslas Seniors cubre todas las especialidades médicas, con especial atención a las necesidades del asegurado mayor: oncología, cardiología, traumatología, rehabilitación, oftalmología y neurología. Incluye hospitalización completa, cirugía, urgencias 24h y diagnóstico avanzado.",
    },
    {
      q: "¿Tiene asesor médico personal Adeslas Seniors?",
      a: "Sí. Una de las características distintivas de Adeslas Seniors es el asesor médico personal: un profesional que orienta al asegurado en la gestión de su salud, le ayuda a coordinar especialistas, a entender diagnósticos y a optimizar el uso del seguro. Es un servicio incluido sin coste adicional.",
    },
  ],

  // ── ADESLAS SENIORS TOTAL ────────────────────────────────────────────
  "/adeslas-seniors-total": [
    {
      q: "¿Qué diferencia hay entre Adeslas Seniors y Adeslas Seniors Total?",
      a: "Adeslas Seniors Total añade tres coberturas sobre Adeslas Seniors: dental incluido, psicología y asistencia en viajes. Además, la prima está garantizada durante 3 años. Está disponible para personas de entre 63 y 84 años. Es el plan más completo para mayores que buscan cobertura integral.",
    },
    {
      q: "¿Cuánto cuesta Adeslas Seniors Total?",
      a: "Adeslas Seniors Total cuesta desde 101€/mes para personas de entre 63 y 84 años. El precio exacto depende de la edad y la provincia. Incluye dental, psicología, asistencia en viaje y prima garantizada 3 años.",
    },
    {
      q: "¿Adeslas Seniors Total cubre la hospitalización sin límite?",
      a: "Sí. Adeslas Seniors Total cubre la hospitalización de forma ilimitada en habitación individual con cama para acompañante, incluyendo cirugía, UCI, neonatología y todas las intervenciones necesarias, sin copago y sin límite de días.",
    },
  ],

  // ── ADESLAS DECESOS ──────────────────────────────────────────────────
  "/adeslas-decesos": [
    {
      q: "¿Qué cubre el seguro de decesos Adeslas?",
      a: "El seguro de decesos Adeslas, gestionado por Ocaso, cubre el sepelio completo (incluido nicho, lápida, esquela y transporte), la repatriación internacional si el fallecimiento se produce fuera de España o de la provincia de residencia, el billete de avión o tren para un acompañante, la gestión de trámites administrativos y la asistencia 24 horas.",
    },
    {
      q: "¿Cuánto cuesta el seguro de decesos Adeslas?",
      a: "El seguro de decesos Adeslas tiene primas desde 9€/mes para personas jóvenes. El precio final depende de la edad del asegurado y de si se contrata de manera individual o para toda la familia.",
    },
    {
      q: "¿Qué es la repatriación en el seguro de decesos?",
      a: "La repatriación cubre el traslado del fallecido a su localidad de residencia o al lugar de entierro si el fallecimiento se produce fuera de España o fuera de la provincia. Incluye todos los trámites, certificaciones y el transporte, sin coste adicional para la familia.",
    },
    {
      q: "¿Puede contratarse el seguro de decesos sin cuestionario de salud?",
      a: "Sí. El seguro de decesos Adeslas no requiere cuestionario de salud previo. Se puede contratar a cualquier edad, con independencia del estado de salud del asegurado.",
    },
  ],

  // ── ADESLAS MASCOTAS ─────────────────────────────────────────────────
  "/adeslas-mascotas": [
    {
      q: "¿Qué cubre el seguro de mascotas Adeslas?",
      a: "El seguro de mascotas Adeslas tiene dos modalidades: Básico (responsabilidad civil de 200.000€, defensa jurídica y asistencia en viaje) desde 5,85€/mes; y Completo (RC más cobertura veterinaria en más de 300 clínicas, sin restricción de raza) desde 24,74€/mes. Cubre perros y gatos.",
    },
    {
      q: "¿Tiene el seguro de mascotas Adeslas restricción de razas?",
      a: "No. El seguro de mascotas Adeslas Completo no tiene restricción de razas, incluyendo razas consideradas potencialmente peligrosas. El seguro cubre tanto perros como gatos sin discriminación por raza ni tamaño.",
    },
    {
      q: "¿Cuánto cuesta el seguro de mascotas Adeslas?",
      a: "El seguro básico de mascotas Adeslas cuesta desde 5,85€/mes e incluye responsabilidad civil de 200.000€. El seguro completo, que añade cobertura veterinaria en más de 300 clínicas, cuesta desde 24,74€/mes.",
    },
  ],

  // ── SEGURO FAMILIAR ──────────────────────────────────────────────────
  "/seguro-medico-familiar": [
    {
      q: "¿Cómo funciona el seguro médico familiar de Adeslas?",
      a: "El seguro familiar Adeslas permite incluir a todos los miembros de la familia en una sola póliza: titular, cónyuge o pareja de hecho, hijos y otros dependientes. Cada asegurado tiene cobertura completa independiente. A partir del 4º asegurado se aplica un descuento del 10%.",
    },
    {
      q: "¿Cuánto cuesta el seguro familiar Adeslas?",
      a: "El seguro familiar Adeslas cuesta desde 22,55€/mes por asegurado para personas de hasta 30 años. El precio total depende del número de asegurados y sus edades. Desde el 4º asegurado se aplica un 10% de descuento.",
    },
    {
      q: "¿El seguro familiar Adeslas cubre a los hijos desde recién nacidos?",
      a: "Sí. Los bebés pueden ser añadidos a la póliza familiar desde el momento del nacimiento. Para los primeros 3 meses de vida se puede dar de alta sin cuestionario de salud. Incluye pediatría, urgencias 24h y todas las especialidades pediátricas.",
    },
    {
      q: "¿Hay descuento en el seguro familiar Adeslas?",
      a: "Sí. Adeslas aplica un descuento del 10% en la prima de cada asegurado a partir del 4º miembro en la misma póliza familiar. Este descuento aplica a todos los asegurados, incluidos los que ya estaban en la póliza.",
    },
  ],

  // ── SEGURO INDIVIDUAL ────────────────────────────────────────────────
  "/seguro-medico-individual": [
    {
      q: "¿Cuál es el seguro médico individual más económico de Adeslas?",
      a: "El seguro individual más económico de Adeslas es Adeslas GO, desde 21€/mes para personas de hasta 30 años. Cubre asistencia ambulatoria completa con copago (tope 260€/año) pero no incluye hospitalización programada.",
    },
    {
      q: "¿Qué seguro médico individual de Adeslas incluye hospitalización?",
      a: "Para hospitalización individual, Adeslas ofrece: Plena Vital (desde 38€/mes, con copago tope 300€/año), Plena Vital Total (desde 48,50€/mes, sin subidas 3 años), Plena Plus (desde 62€/mes, sin copago) y Plena Total (desde 83€/mes, sin copago con dental y más coberturas).",
    },
    {
      q: "¿Se puede contratar el seguro individual Adeslas sin cuestionario?",
      a: "Adeslas GO puede contratarse sin cuestionario de salud. Los planes con hospitalización (Plena Vital, Plena Plus, Plena Total) requieren un breve cuestionario de salud. El proceso es online y el alta suele ser inmediata o en 24 horas.",
    },
  ],

  // ── SEGURO MAYORES ───────────────────────────────────────────────────
  "/seguro-medico-mayores": [
    {
      q: "¿Qué seguro médico recomienda Adeslas para mayores de 55 años?",
      a: "Para personas mayores de 55 años, Adeslas recomienda Adeslas Seniors: prima desde 67,50€/mes, asesor médico personal, cobertura especial en oncología, cardiología y rehabilitación, y prima garantizada 3 años. Para quienes además quieren dental y psicología incluidos, Adeslas Seniors Total es la opción más completa.",
    },
    {
      q: "¿Tiene Adeslas seguro médico para mayores de 70 años?",
      a: "Sí. Adeslas Seniors y Adeslas Seniors Total aceptan nuevas contrataciones hasta los 84 años de edad. Una vez contratado, el seguro se renueva sin límite de edad siempre que se mantenga en vigor.",
    },
    {
      q: "¿Cubre Adeslas Seniors la oncología?",
      a: "Sí. Adeslas Seniors tiene cobertura especial en oncología: diagnóstico precoz, tratamiento en centros de referencia, quimioterapia, radioterapia, inmunoterapia y seguimiento oncológico. Es una de las coberturas más valoradas del plan.",
    },
  ],

  // ── PYMES Y EMPRESAS ─────────────────────────────────────────────────
  "/pymes-empresas": [
    {
      q: "¿Qué es Adeslas PYMES TOTAL?",
      a: "Adeslas PYMES TOTAL es el seguro médico colectivo para empresas de hasta 15 empleados. Sin copago, dental incluido, prima garantizada 3 años sin subidas y cobertura completa (ambulatoria, hospitalización, urgencias). La prima es deducible al 100% en el Impuesto de Sociedades.",
    },
    {
      q: "¿Cuántos trabajadores necesita una empresa para contratar Adeslas?",
      a: "A partir de 2 trabajadores (incluido el autónomo titular) puede contratarse Adeslas PYMES TOTAL. El plan cubre hasta 15 empleados. Para grupos más grandes, existe una tarificación específica.",
    },
    {
      q: "¿Es deducible el seguro médico de empresa Adeslas?",
      a: "Sí. Las primas del seguro médico de empresa Adeslas son deducibles al 100% en el Impuesto de Sociedades como gasto de personal. Para los trabajadores, el seguro médico de empresa está exento de IRPF hasta 500€/año por asegurado (titular, cónyuge e hijos).",
    },
    {
      q: "¿Cuánto cuesta Adeslas para empresas?",
      a: "El precio del seguro médico para empresas Adeslas depende del número de empleados y sus edades. La modalidad sin copago con dental incluido parte desde precios competitivos con prima garantizada 3 años. Solicita un presupuesto personalizado a través del tarificador de esta web.",
    },
  ],

  // ── CÓMO CONTRATAR ADESLAS ───────────────────────────────────────────
  "/como-contratar-adeslas": [
    {
      q: "¿Cómo se contrata un seguro Adeslas?",
      a: "Hay tres formas de contratar Adeslas: (1) Online en esta web: calcula tu precio, elige tu plan y formaliza el alta en menos de 2 minutos. (2) Por teléfono: llama al 91 710 50 00 y un asesor te guía sin compromiso. (3) Solicita que te llamemos: déjanos tu número y te llamamos cuando quieras. El alta es inmediata o en 24 horas.",
    },
    {
      q: "¿Qué documentación se necesita para contratar Adeslas?",
      a: "Para contratar Adeslas necesitas: DNI o NIE del titular y de los asegurados, cuenta bancaria (IBAN) para la domiciliación de la prima y, para los planes con hospitalización, cumplimentar un breve cuestionario de salud online. No es necesario desplazarse ni aportar documentación en papel.",
    },
    {
      q: "¿Cuándo empieza la cobertura del seguro Adeslas?",
      a: "La cobertura del seguro Adeslas comienza el día 1 del mes siguiente a la contratación (o desde la fecha de efecto que elijas). Algunas coberturas tienen períodos de carencia: parto (8 meses), prótesis dentales (6 meses), psicología (3 meses). Las urgencias y las consultas ambulatorias no tienen carencia.",
    },
    {
      q: "¿Puedo contratar Adeslas si tengo enfermedades previas?",
      a: "Depende del plan y de la enfermedad. Adeslas GO no tiene cuestionario de salud y puede contratarse con cualquier condición previa. Los planes con hospitalización requieren un cuestionario y pueden incluir exclusiones o sobreprimas por patologías preexistentes declaradas. Consulta tu caso concreto con nuestro equipo.",
    },
  ],

  // ── ALTA ADESLAS ─────────────────────────────────────────────────────
  "/alta-adeslas": [
    {
      q: "¿Cómo darse de alta en Adeslas?",
      a: "Darse de alta en Adeslas es 100% online. Accede al formulario de alta, introduce los datos del titular y los asegurados, completa el cuestionario de salud (si aplica), indica tu IBAN para la domiciliación y confirma el alta. Recibirás la documentación por email y el carnet de asegurado en la app Adeslas.",
    },
    {
      q: "¿Cuánto tiempo tarda el alta en Adeslas?",
      a: "El alta en Adeslas es inmediata una vez aprobada la solicitud. Normalmente el proceso completo lleva menos de 2 minutos. Recibirás el número de póliza, las condiciones y el acceso a la app Adeslas en el mismo día.",
    },
    {
      q: "¿Cuándo puedo usar el seguro Adeslas tras el alta?",
      a: "Desde el primer día del mes de efecto de la póliza. Si el alta se formaliza en mayo, la cobertura comienza el 1 de junio (o desde la fecha de efecto elegida). Las coberturas sin carencia (urgencias, consultas ambulatorias) son accesibles desde ese día.",
    },
  ],

  // ── PRECIOS ADESLAS ──────────────────────────────────────────────────
  "/precios-adeslas": [
    {
      q: "¿Cuánto cuesta un seguro médico Adeslas en 2026?",
      a: "Precios de referencia para una persona de hasta 30 años en 2026: Adeslas GO desde 21€/mes, Plena Vital desde 38€/mes, Plena Vital Total desde 48,50€/mes, Plena Plus desde 62€/mes, Plena Total desde 83€/mes, Extra 150 desde 90€/mes, Seniors (55+) desde 67,50€/mes. El precio final depende de tu edad y provincia.",
    },
    {
      q: "¿Por qué varía el precio del seguro Adeslas según la edad?",
      a: "El precio varía con la edad porque la probabilidad de uso del seguro aumenta con los años. Las tarifas son más económicas para personas jóvenes y se incrementan progresivamente. Las subidas anuales son limitadas y, en los planes con prima garantizada (Plena Vital Total, Plena Total), no hay subida durante 3 años.",
    },
    {
      q: "¿Qué factores afectan al precio del seguro Adeslas?",
      a: "Los factores que determinan el precio final de un seguro Adeslas son: la edad del asegurado (principal factor), la provincia de residencia (Madrid, Barcelona y otras capitales tienen tarifas diferentes), el plan elegido (coberturas y copago) y el número de asegurados en la póliza (descuento del 10% desde el 4º).",
    },
  ],

  // ── GINECOLOGÍA ──────────────────────────────────────────────────────
  "/seguro-medico-ginecologia": [
    {
      q: "¿Cubre Adeslas las consultas de ginecología?",
      a: "Sí. Todos los planes Adeslas (excepto Adeslas GO para intervenciones) incluyen ginecología completa: consultas periódicas, revisiones, citologías, ecografías ginecológicas, colposcopia y todas las pruebas diagnósticas. Sin listas de espera y con libre elección de ginecólogo dentro del cuadro médico.",
    },
    {
      q: "¿Cubre Adeslas las revisiones ginecológicas preventivas?",
      a: "Sí. Las revisiones ginecológicas preventivas están incluidas en todos los planes con hospitalización. Esto incluye la revisión anual, la citología cervical (Papanicolau), la ecografía ginecológica y la mamografía a partir de los 40 años (según protocolo de la aseguradora).",
    },
    {
      q: "¿Cubre Adeslas la reproducción asistida?",
      a: "La reproducción asistida (FIV, inseminación artificial) no está incluida en las coberturas estándar de los planes Adeslas. Sí están cubiertos los estudios diagnósticos de fertilidad y las consultas con el especialista en reproducción.",
    },
  ],
};
