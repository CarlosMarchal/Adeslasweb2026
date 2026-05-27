/* ───────── Blog posts data ─────────
   Single source of truth used by BlogSalud (listing) and BlogArticle (detail).
   Each post includes full article body as an array of content blocks.
*/

export interface BlogPostMeta {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
}

export interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "callout" | "quote";
  text?: string;
  items?: string[];
}

export interface BlogPostFull extends BlogPostMeta {
  seoTitle: string;
  seoDescription: string;
  body: ContentBlock[];
  relatedSlugs: string[];
}

export const categories = [
  "Todos",
  // ── Nivel 1: Hubs comerciales (prioridad alta) ──
  "Seguros Adeslas",
  "Comparativas",
  "Coberturas",
  "Copagos",
  "Carencias",
  "Hospitalización",
  "Precios",
  "Cuadro Médico",
  // ── Nivel 2: Médico-informativos ──
  "Prevención",
  "Salud Familiar",
  "Salud Mental",
  // ── Nivel 3: Bienestar y complementarios ──
  "Bienestar",
  "Nutrición",
  "Dental",
  // ── Nivel 4: Verticales secundarios ──
  "Mascotas",
  "Extranjeros",
  "Decesos",
];

export const blogPosts: BlogPostFull[] = [

  /* ── 1. Bienestar ── */
  {
    slug: "como-mejorar-tu-energia-diaria",
    category: "Bienestar",
    title: "Cómo mejorar tu energía a lo largo del día: hábitos que realmente funcionan",
    excerpt:
      "Si llegas agotado a media mañana o te cuesta arrancar, estos hábitos sencillos pueden marcar la diferencia en tu vitalidad diaria.",
    date: "15 Mar 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    seoTitle: "Cómo Mejorar tu Energía Diaria | Blog Salud",
    seoDescription:
      "Descubre hábitos prácticos para mantener la energía alta durante todo el día. Consejos de asesores de salud para mejorar tu vitalidad.",
    body: [
      {
        type: "paragraph",
        text: "La falta de energía es uno de los motivos de consulta más frecuentes en adultos de cualquier edad. Antes de recurrir a estimulantes o suplementos, conviene revisar los pilares básicos del estilo de vida. Pequeños ajustes en la rutina diaria pueden tener un impacto muy significativo en cómo te sientes a lo largo del día.",
      },
      {
        type: "paragraph",
        text: "Desde la perspectiva de los asesores de salud, la energía sostenida no depende de un único factor sino de la combinación de sueño reparador, nutrición adecuada, movimiento regular y gestión del estrés. A continuación encontrarás los hábitos con mayor evidencia científica.",
      },
      { type: "heading", text: "La calidad del sueño, primero" },
      {
        type: "paragraph",
        text: "Dormir entre 7 y 9 horas de calidad es irreemplazable. No se trata solo de cantidad: un sueño fragmentado o superficial deja al cuerpo igual de cansado que una noche corta. Fija un horario constante para acostarte y levantarte, incluso los fines de semana, y mantén la habitación fresca, oscura y sin pantallas.",
      },
      { type: "heading", text: "Desayuno proteico para empezar bien" },
      {
        type: "paragraph",
        text: "Los desayunos ricos en proteína (huevos, yogur griego, queso fresco, frutos secos) y fibra estabilizan la glucosa en sangre y evitan el pico-caída de energía que provoca el azúcar. Evita los ultraprocesados dulces a primera hora: aunque dan energía rápida, provocan somnolencia a los 60-90 minutos.",
      },
      { type: "heading", text: "Hidratación: el factor más infravalorado" },
      {
        type: "paragraph",
        text: "Una deshidratación de apenas el 1-2% del peso corporal reduce la concentración, la resistencia física y el estado de ánimo. Empieza el día con un vaso de agua antes del café y mantén una botella a la vista durante la jornada. El objetivo son al menos 2 litros diarios, más si hace calor o haces ejercicio.",
      },
      { type: "heading", text: "Movimiento repartido a lo largo del día" },
      {
        type: "paragraph",
        text: "Estar sentado durante horas seguidas ralentiza la circulación y agota mentalmente. Los asesores de salud recomiendan levantarse y moverse 5 minutos por cada hora de trabajo sedentario. Un paseo corto tras la comida mejora la digestión y evita el bajón de la tarde.",
      },
      { type: "heading", text: "Gestión del estrés crónico" },
      {
        type: "paragraph",
        text: "El estrés sostenido eleva el cortisol y agota las reservas energéticas del organismo. Incorporar técnicas de respiración, meditación o simplemente momentos de descanso sin estimulación digital ayuda al sistema nervioso a recuperarse. Incluso 10 minutos al día marcan diferencia.",
      },
      {
        type: "callout",
        text: "Si el cansancio persiste más de dos o tres semanas sin causa aparente, puede ser señal de una deficiencia nutricional, anemia o problema tiroideo. Una analítica básica con tu médico puede despejar esas dudas rápidamente.",
      },
      { type: "heading", text: "Cafeína: aliada con moderación" },
      {
        type: "paragraph",
        text: "El café y el té son aliados legítimos, pero su uso excesivo o tardío altera el sueño y crea dependencia. El consejo general es limitar el consumo a 2-3 tazas antes de las 14:00 h. Evita la cafeína como parche para compensar una mala noche: el efecto es temporal y empeora el descanso posterior.",
      },
      {
        type: "paragraph",
        text: "La clave está en la consistencia. No hay un único truco para tener más energía; es la suma de pequeños hábitos mantenidos en el tiempo lo que realmente transforma cómo te sientes cada día.",
      },
    ],
    relatedSlugs: [
      "caminar-beneficios-reales",
      "higiene-sueno-adultos",
      "dieta-mediterranea-en-casa",
    ],
  },

  /* ── 2. Nutrición ── */
  {
    slug: "dieta-mediterranea-en-casa",
    category: "Nutrición",
    title: "Dieta mediterránea: beneficios probados y cómo adoptarla sin complicaciones",
    excerpt:
      "La dieta mediterránea es uno de los patrones alimentarios con mayor respaldo científico. Descubre por qué y cómo incorporarla a tu vida diaria.",
    date: "10 Mar 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    seoTitle: "Dieta Mediterránea: Beneficios y Cómo Adoptarla | Blog Salud",
    seoDescription:
      "Aprende qué es la dieta mediterránea, sus beneficios para la salud cardiovascular y mental, y cómo incorporarla de forma sencilla en tu hogar.",
    body: [
      {
        type: "paragraph",
        text: "La dieta mediterránea lleva décadas siendo reconocida por la comunidad científica como uno de los patrones alimentarios más beneficiosos para la salud. Numerosos estudios la asocian con menor riesgo cardiovascular, menor incidencia de diabetes tipo 2, mejor salud mental y mayor longevidad. Lo mejor: no es restrictiva ni cara. Es, sencillamente, comer bien.",
      },
      {
        type: "paragraph",
        text: "Lejos de ser una dieta en el sentido popular del término, se trata de un estilo de alimentación rico, variado y sostenible en el tiempo. Los asesores de salud suelen recomendarla precisamente por eso: es fácil de mantener y no requiere contar calorías.",
      },
      { type: "heading", text: "Los pilares de la dieta mediterránea" },
      {
        type: "list",
        items: [
          "Aceite de oliva virgen extra como grasa principal (crudo y para cocinar)",
          "Abundancia de verduras, hortalizas y frutas frescas de temporada",
          "Legumbres 3-4 veces por semana: lentejas, garbanzos, alubias, guisantes",
          "Cereales integrales: pan, arroz y pasta en versiones de grano completo",
          "Pescado azul 2-3 veces por semana: sardinas, caballa, salmón, atún",
          "Frutos secos y semillas como snack o en ensaladas",
          "Carnes blancas moderadas; carnes rojas y procesadas de forma ocasional",
          "Lácteos fermentados: yogur natural y queso con moderación",
        ],
      },
      { type: "heading", text: "Beneficios documentados por la ciencia" },
      {
        type: "paragraph",
        text: "El estudio PREDIMED, uno de los más amplios sobre nutrición realizados en España, demostró que la dieta mediterránea enriquecida con aceite de oliva virgen extra reduce el riesgo de infarto y ACV en un 30%. Además, se ha asociado con menor inflamación sistémica, protección frente al deterioro cognitivo y mejor regulación del peso corporal.",
      },
      { type: "heading", text: "Cómo empezar sin agobiarse" },
      {
        type: "paragraph",
        text: "No es necesario cambiar todo de golpe. Los asesores de salud recomiendan empezar por un cambio a la semana. Una buena secuencia podría ser:",
      },
      {
        type: "list",
        items: [
          "Semana 1: cambia el aceite de girasol por aceite de oliva virgen extra",
          "Semana 2: añade una ración de legumbres en sustitución de la carne un día a la semana",
          "Semana 3: introduce pescado azul una vez más de lo habitual",
          "Semana 4: sustituye el pan blanco y la pasta blanca por versiones integrales",
          "Semana 5: incorpora un puñado de frutos secos como merienda o aperitivo",
        ],
      },
      { type: "heading", text: "Menú tipo de un día mediterráneo" },
      {
        type: "paragraph",
        text: "Desayuno: yogur natural con nueces y una pieza de fruta. Comida: ensalada grande con aceite de oliva, lentejas con verduras de temporada. Merienda: tostada de pan integral con aceite y tomate. Cena: merluza al horno con pisto y una naranja de postre.",
      },
      {
        type: "callout",
        text: "La dieta mediterránea no es solo lo que comes, sino también cómo comes: en compañía, sin prisas y disfrutando del proceso. El componente social del comer tiene un papel importante en la salud mental y emocional.",
      },
      {
        type: "paragraph",
        text: "Adoptar este patrón alimentario de forma progresiva es más sostenible que cualquier dieta de moda. Tu salud cardiovascular, tu peso y tu bienestar general lo notarán a largo plazo.",
      },
    ],
    relatedSlugs: [
      "superalimentos-que-incorporar",
      "como-mejorar-tu-energia-diaria",
      "revisiones-medicas-por-edad",
    ],
  },

  /* ── 3. Prevención ── */
  {
    slug: "revisiones-medicas-por-edad",
    category: "Prevención",
    title: "Qué revisiones médicas hacerse según tu edad: una guía práctica",
    excerpt:
      "Las revisiones preventivas detectan problemas de salud antes de que den síntomas. Descubre qué pruebas son recomendables en cada etapa de la vida.",
    date: "5 Mar 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop",
    seoTitle: "Revisiones Médicas por Edad: Qué Pruebas Hacerse | Blog Salud",
    seoDescription:
      "Guía completa de revisiones médicas preventivas organizadas por edad. Descubre qué análisis, pruebas y consultas son recomendables para tu etapa vital.",
    body: [
      {
        type: "paragraph",
        text: "La medicina preventiva parte de un principio sencillo: es mejor detectar un problema cuando aún no da síntomas que tratarlo cuando ya está avanzado. Las revisiones periódicas son la herramienta más eficaz para lograrlo, y sus beneficios están ampliamente documentados.",
      },
      {
        type: "paragraph",
        text: "Los asesores de salud coinciden en que muchas personas evitan las revisiones por falta de tiempo, miedo al resultado o la falsa sensación de que «si no tienes síntomas estás bien». Sin embargo, enfermedades como la hipertensión, la diabetes tipo 2 o el colesterol elevado pueden pasar completamente desapercibidas durante años.",
      },
      { type: "heading", text: "De 20 a 30 años: sentar las bases" },
      {
        type: "list",
        items: [
          "Analítica de sangre completa cada 3-5 años (glucosa, colesterol, función renal y hepática)",
          "Tensión arterial en cada visita al médico",
          "Revisión dental y limpieza cada 6-12 meses",
          "Vacunación al día (tétanos, gripe, VPH si procede)",
          "Revisión dermatológica si tienes muchos lunares o exposición solar alta",
          "Revisión ginecológica anual y citología cada 3 años (mujeres)",
          "Revisión testicular y urológica en caso de antecedentes familiares (hombres)",
        ],
      },
      { type: "heading", text: "De 30 a 45 años: ampliar la vigilancia" },
      {
        type: "paragraph",
        text: "En esta franja aumenta el riesgo cardiovascular y metabólico, especialmente con estilo de vida sedentario o antecedentes familiares. Las revisiones deben ser más frecuentes y completas.",
      },
      {
        type: "list",
        items: [
          "Analítica completa con perfil lipídico anual o bianual",
          "Medición de peso, IMC y perímetro abdominal en cada revisión",
          "Tensión arterial en cada visita (objetivo <130/80 mmHg)",
          "Mamografía inicial a los 40-45 años en mujeres con factores de riesgo",
          "Revisión ocular si hay factores de riesgo o síntomas",
          "Electrocardiograma si hay antecedentes cardíacos familiares",
        ],
      },
      { type: "heading", text: "De 45 a 60 años: detección activa" },
      {
        type: "list",
        items: [
          "Analítica completa anual con función tiroidea",
          "Mamografía cada 2 años (mujeres desde los 50 en screening público)",
          "Colonoscopia a partir de los 50 años o antes con antecedentes",
          "Densitometría ósea en mujeres posmenopáusicas",
          "PSA (antígeno prostático) a partir de los 50 años en hombres",
          "Revisión oftalmológica completa (presión ocular, fondo de ojo)",
          "Prueba de esfuerzo si hay factores de riesgo cardiovascular",
        ],
      },
      { type: "heading", text: "A partir de los 60: seguimiento continuo" },
      {
        type: "paragraph",
        text: "En esta etapa las revisiones se vuelven más frecuentes y específicas. La memoria, la audición, la visión, el equilibrio y la densidad ósea requieren atención periódica. La consulta con el médico de cabecera debe ser al menos anual, con los especialistas según indicación.",
      },
      {
        type: "callout",
        text: "Con un seguro médico privado puedes programar revisiones completas sin listas de espera y con acceso a las especialidades que necesitas cuando las necesitas, no meses después.",
      },
      {
        type: "paragraph",
        text: "La frecuencia de cada prueba puede variar según tu historial, antecedentes familiares y factores de riesgo individuales. Tu médico es quien mejor puede personalizar el plan de revisiones para tu situación concreta.",
      },
    ],
    relatedSlugs: [
      "como-mejorar-tu-energia-diaria",
      "comparativa-seguros-medicos-adeslas-2026",
      "dieta-mediterranea-en-casa",
    ],
  },

  /* ── 4. Dental ── */
  {
    slug: "salud-bucodental-guia-completa",
    category: "Dental",
    title: "Salud bucodental: la guía completa para cuidar tu boca más allá del cepillado",
    excerpt:
      "El cepillado es solo el principio. Aprende todo lo que necesitas saber para mantener una boca sana y evitar problemas que van más allá de los dientes.",
    date: "1 Mar 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop",
    seoTitle: "Salud Bucodental: Guía Completa de Higiene Oral | Blog Salud",
    seoDescription:
      "Guía completa de salud bucodental: técnica de cepillado, hilo dental, colutorio, alimentación y cuándo ir al dentista. Consejos de asesores de salud.",
    body: [
      {
        type: "paragraph",
        text: "La salud de la boca es un espejo de la salud general. Problemas como la enfermedad periodontal se han relacionado con mayor riesgo cardiovascular, diabetes mal controlada y complicaciones durante el embarazo. Sin embargo, la mayoría de las personas solo piensan en la higiene oral para evitar caries, lo que es solo una parte de la historia.",
      },
      { type: "heading", text: "La técnica de cepillado importa tanto como la frecuencia" },
      {
        type: "paragraph",
        text: "El objetivo es eliminar la placa bacteriana de todas las superficies dentales, incluido el espacio junto a la encía. Los asesores de salud bucodental recomiendan la técnica de Bass modificada: coloca el cepillo a 45 grados hacia la encía y haz movimientos suaves circulares o vibratorios durante al menos 2 minutos. Reparte ese tiempo: 30 segundos por cada cuadrante.",
      },
      { type: "heading", text: "Hilo dental o cepillos interdentales: sin excusas" },
      {
        type: "paragraph",
        text: "Hasta el 40% de la superficie dental es inaccesible para el cepillo convencional. El hilo dental o los cepillos interdentales son imprescindibles para limpiar los espacios entre dientes donde se acumula más placa. Úsalos al menos una vez al día, preferiblemente antes de la higiene nocturna.",
      },
      { type: "heading", text: "El colutorio: complemento, no sustituto" },
      {
        type: "paragraph",
        text: "El enjuague bucal con flúor o clorhexidina tiene su lugar en la higiene oral, especialmente para personas con mayor riesgo de caries o enfermedad periodontal. Sin embargo, no sustituye al cepillado ni al hilo. Úsalo después de la higiene mecánica para maximizar su efecto.",
      },
      { type: "heading", text: "Cómo afecta la alimentación a tu boca" },
      {
        type: "list",
        items: [
          "Los azúcares libres (refrescos, zumos, dulces) alimentan las bacterias que producen caries",
          "Los ácidos (cítricos, refrescos, vinagre) erosionan el esmalte dental",
          "El calcio del lácteo, las almendras y las sardinas refuerza la mineralización dental",
          "Masticar alimentos duros (zanahoria, manzana) estimula la producción de saliva",
          "Beber agua tras cada comida ayuda a limpiar los residuos ácidos y azucarados",
        ],
      },
      { type: "heading", text: "Cuándo ir al dentista y para qué" },
      {
        type: "paragraph",
        text: "La recomendación general es una revisión y limpieza profesional cada 6-12 meses. En personas con mayor riesgo (fumadores, diabéticos, embarazadas, con historial de enfermedad periodontal) puede ser necesario cada 3-4 meses. La limpieza profesional elimina el sarro acumulado que el cepillo no puede retirar.",
      },
      {
        type: "callout",
        text: "No esperes a tener dolor para ir al dentista. La caries y la periodontitis en estadios iniciales no duelen, pero son mucho más sencillas y económicas de tratar cuando se detectan a tiempo.",
      },
      { type: "heading", text: "Señales de alerta que no debes ignorar" },
      {
        type: "list",
        items: [
          "Sangrado de encías al cepillarte o espontáneamente",
          "Sensibilidad persistente al frío, calor o dulce",
          "Mal aliento crónico que no mejora con la higiene habitual",
          "Encías que retroceden o dientes que parecen más largos",
          "Úlceras bucales que no curan en 2 semanas",
          "Dolor o crujido en la articulación temporomandibular",
        ],
      },
      {
        type: "paragraph",
        text: "La salud bucodental no es un lujo ni una vanidad: es parte integral de la salud general. Invertir en ella ahorra problemas, dinero y molestias a largo plazo.",
      },
    ],
    relatedSlugs: [
      "revisiones-medicas-por-edad",
      "como-mejorar-tu-energia-diaria",
      "higiene-sueno-adultos",
    ],
  },

  /* ── 5. Salud Mental ── */
  {
    slug: "gestion-emocional-dia-a-dia",
    category: "Salud Mental",
    title: "Inteligencia emocional y gestión del estrés: herramientas para el día a día",
    excerpt:
      "Aprender a gestionar las emociones difíciles no es cosa de terapia de años. Hay técnicas concretas que puedes practicar hoy mismo para reducir el estrés.",
    date: "25 Feb 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop",
    seoTitle: "Gestión Emocional y Estrés: Técnicas Prácticas | Blog Salud",
    seoDescription:
      "Descubre técnicas de inteligencia emocional y gestión del estrés que puedes aplicar en tu vida diaria para sentirte mejor.",
    body: [
      {
        type: "paragraph",
        text: "El estrés no es el enemigo. En dosis adecuadas, es un mecanismo de adaptación que nos ayuda a rendir mejor. El problema es el estrés crónico: el que no cesa, que mantiene el sistema nervioso en alerta permanente y, con el tiempo, desgasta tanto la salud mental como la física.",
      },
      {
        type: "paragraph",
        text: "Los asesores de salud mental coinciden en que las personas con mayor resiliencia no son las que no sufren estrés, sino las que han aprendido a procesarlo. La buena noticia es que estas habilidades se pueden aprender y entrenar.",
      },
      { type: "heading", text: "Identifica tus señales de alerta" },
      {
        type: "paragraph",
        text: "El primer paso es aprender a reconocer cómo reacciona tu cuerpo y tu mente cuando el estrés empieza a acumularse. Algunas señales comunes: tensión en el cuello y hombros, irritabilidad sin motivo claro, dificultad para concentrarse, insomnio o sueño excesivo, pérdida o aumento del apetito. Identificar estos signos pronto permite actuar antes de que el problema escale.",
      },
      { type: "heading", text: "Respiración diafragmática: el freno de emergencia" },
      {
        type: "paragraph",
        text: "Cuando el sistema nervioso simpático se activa (respuesta al estrés), la respiración se vuelve superficial y rápida. Invertir ese patrón es posible de forma consciente: inspira lentamente por la nariz durante 4 segundos, llena el abdomen (no el pecho), mantén 2 segundos, exhala por la boca durante 6 segundos. Repite 5 veces. El efecto es casi inmediato.",
      },
      { type: "heading", text: "Técnica 5-4-3-2-1 para el aquí y ahora" },
      {
        type: "paragraph",
        text: "Cuando la mente se dispara hacia preocupaciones del futuro o el pasado, esta técnica ancla al presente. Nombra en voz alta o mentalmente: 5 cosas que ves, 4 que puedes tocar, 3 que escuchas, 2 que hueles, 1 que saboreas. Activa los sentidos e interrumpe el ciclo de pensamiento ansioso.",
      },
      { type: "heading", text: "El valor de poner nombre a lo que sientes" },
      {
        type: "paragraph",
        text: "La investigación en neurociencia muestra que etiquetar una emoción (\"estoy sintiendo frustración\", \"esto me produce miedo\") reduce su intensidad. Llevar un diario emocional breve, aunque sean 5 minutos al día, ayuda a procesar lo vivido y a identificar patrones que de otro modo pasan inadvertidos.",
      },
      {
        type: "callout",
        text: "Si el estrés o la ansiedad interfieren de forma persistente con tu vida diaria, el trabajo o las relaciones, consultar a un profesional de salud mental no es un signo de debilidad, sino de inteligencia emocional.",
      },
      { type: "heading", text: "El movimiento como regulador emocional" },
      {
        type: "paragraph",
        text: "El ejercicio físico es uno de los antidepresivos más eficaces que existen. 30 minutos de actividad aeróbica moderada (caminar rápido, nadar, montar en bici) producen una cascada de neurotransmisores —serotonina, dopamina, endorfinas— que mejoran el estado de ánimo de forma sostenida. No hace falta que sea intenso ni que vayas al gimnasio.",
      },
      { type: "heading", text: "Límites digitales: la desintoxicación necesaria" },
      {
        type: "paragraph",
        text: "Las notificaciones constantes, las redes sociales y las noticias en tiempo real alimentan la sensación de urgencia permanente. Establecer franjas horarias sin móvil, desactivar notificaciones no urgentes y tener al menos una hora sin pantallas antes de dormir es una de las intervenciones más sencillas y efectivas para reducir la ansiedad cotidiana.",
      },
    ],
    relatedSlugs: [
      "higiene-sueno-adultos",
      "como-mejorar-tu-energia-diaria",
      "caminar-beneficios-reales",
    ],
  },

  /* ── 6. Familia ── */
  {
    slug: "salud-familiar-estilo-de-vida",
    category: "Familia",
    title: "Salud en familia: claves para construir un estilo de vida saludable con niños",
    excerpt:
      "Los hábitos que se instauran en la infancia duran toda la vida. Descubre cómo crear un entorno familiar que favorezca la salud física y emocional de todos.",
    date: "20 Feb 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop",
    seoTitle: "Salud Familiar: Hábitos Saludables con Niños | Blog Salud",
    seoDescription:
      "Guía para familias sobre cómo crear hábitos saludables con niños: alimentación, actividad física, sueño y salud emocional.",
    body: [
      {
        type: "paragraph",
        text: "La familia es el primer y más poderoso entorno de aprendizaje para los niños. Los hábitos que se adquieren en casa durante la infancia —la forma de comer, de moverse, de dormir y de gestionar las emociones— se convierten en patrones que persisten en la edad adulta. Invertir en la salud familiar no es un gasto, es la mejor inversión a largo plazo.",
      },
      {
        type: "paragraph",
        text: "Lo más importante, según los asesores de salud infantil y familiar, es que los adultos lideren con el ejemplo. Los niños aprenden más por lo que ven que por lo que se les dice. No sirve de mucho pedir a un niño que coma verduras si el adulto de referencia no lo hace.",
      },
      { type: "heading", text: "Comidas en familia: más que nutrición" },
      {
        type: "paragraph",
        text: "Los estudios muestran que los niños que comen regularmente en familia con los adultos tienen mejor rendimiento académico, mayor autoestima, hábitos alimentarios más saludables y menor riesgo de desarrollar trastornos de la conducta alimentaria. El truco: que la comida sea un momento de conversación, no de pantallas ni discusiones.",
      },
      { type: "heading", text: "Actividad física: que sea juego, no obligación" },
      {
        type: "paragraph",
        text: "Los niños necesitan al menos 60 minutos de actividad física moderada a intensa cada día. Pero no tiene que ser deporte organizado: jugar en el parque, montar en bici, bailar en casa, ayudar en las tareas domésticas activas o salir a caminar en familia cuentan. Lo importante es moverse juntos y hacer que sea divertido.",
      },
      { type: "heading", text: "El sueño de los niños: más del que crees" },
      {
        type: "list",
        items: [
          "Niños de 3-5 años: 10-13 horas diarias (incluyendo siesta si procede)",
          "Niños de 6-12 años: 9-12 horas cada noche",
          "Adolescentes de 13-18 años: 8-10 horas cada noche",
        ],
      },
      {
        type: "paragraph",
        text: "La privación de sueño en los niños se manifiesta como irritabilidad, dificultades de concentración, bajo rendimiento escolar y problemas de conducta. Establece rutinas de sueño claras y evita pantallas al menos una hora antes de acostarse.",
      },
      { type: "heading", text: "Salud emocional: el área más olvidada" },
      {
        type: "paragraph",
        text: "Crear un espacio seguro donde los niños puedan expresar sus emociones sin ser juzgados es fundamental. Valida sus sentimientos aunque no compartas su reacción: \"Entiendo que estás enfadado\" no significa dar la razón a un comportamiento inadecuado. Enseñar el vocabulario emocional desde pequeños les da herramientas para toda la vida.",
      },
      {
        type: "callout",
        text: "Las revisiones pediátricas periódicas son clave para detectar a tiempo problemas de desarrollo, visión, audición o salud dental. No las postpongas aunque el niño parezca estar perfectamente.",
      },
      { type: "heading", text: "Límite de pantallas: encontrar el equilibrio" },
      {
        type: "paragraph",
        text: "Las recomendaciones actuales apuntan a no más de 1 hora diaria de pantallas recreativas para niños de 2-5 años, y un uso consciente y supervisado a partir de los 6 años. La clave no es prohibir sino acompañar: saber qué contenidos consume tu hijo, hablar de lo que ve y garantizar que el tiempo de pantalla no sustituya al juego libre, la lectura ni el descanso.",
      },
    ],
    relatedSlugs: [
      "revisiones-medicas-por-edad",
      "dieta-mediterranea-en-casa",
      "gestion-emocional-dia-a-dia",
    ],
  },

  /* ── 7. Bienestar ── */
  {
    slug: "caminar-beneficios-reales",
    category: "Bienestar",
    title: "Caminar 30 minutos al día: los beneficios que la ciencia confirma",
    excerpt:
      "Sin equipamiento especial ni cuota de gimnasio. Caminar es uno de los hábitos más accesibles y con mayor impacto en la salud a largo plazo.",
    date: "15 Feb 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop",
    seoTitle: "Beneficios de Caminar 30 Minutos al Día | Blog Salud",
    seoDescription:
      "Descubre los beneficios comprobados de caminar a diario: salud cardiovascular, mental, peso, sueño y longevidad. Consejos para empezar hoy.",
    body: [
      {
        type: "paragraph",
        text: "En un panorama repleto de tendencias de fitness, entrenamientos de alta intensidad y gadgets deportivos, caminar sigue siendo una de las actividades más beneficiosas para la salud. Simple, gratuita, accesible para casi todo el mundo y respaldada por décadas de investigación.",
      },
      { type: "heading", text: "Salud cardiovascular: el beneficio más documentado" },
      {
        type: "paragraph",
        text: "Caminar a paso ligero reduce el riesgo de enfermedad cardiovascular hasta un 30%. Mejora la presión arterial, reduce el colesterol LDL, aumenta el HDL y disminuye los niveles de triglicéridos. Con 30 minutos diarios a ritmo moderado (unos 5-6 km/h), el corazón ya percibe beneficios significativos.",
      },
      { type: "heading", text: "Control del peso y metabolismo" },
      {
        type: "paragraph",
        text: "Caminar 30 minutos quema entre 150 y 200 calorías dependiendo de tu peso y velocidad. Pero el impacto metabólico va más allá de las calorías inmediatas: mejora la sensibilidad a la insulina, ayuda a regular el apetito y activa el metabolismo incluso horas después del paseo.",
      },
      { type: "heading", text: "Salud mental: el antidepresivo que no requiere receta" },
      {
        type: "paragraph",
        text: "El movimiento activa la liberación de serotonina, dopamina y endorfinas. Varios estudios muestran que caminar regularmente reduce los síntomas de ansiedad y depresión leve-moderada de forma comparable a algunos tratamientos farmacológicos. Caminar en espacios naturales (parques, bosques, playa) amplifica este efecto gracias al impacto de la naturaleza en el sistema nervioso.",
      },
      {
        type: "callout",
        text: "No es necesario llegar a los famosos 10.000 pasos. La investigación más reciente indica que los beneficios más importantes se consiguen con 7.000-8.000 pasos diarios para adultos mayores de 60 años, y que el umbral para adultos más jóvenes puede ser mayor.",
      },
      { type: "heading", text: "Huesos y articulaciones" },
      {
        type: "paragraph",
        text: "Caminar es un ejercicio de impacto moderado que estimula la densidad ósea y ayuda a prevenir la osteoporosis. Al ser de bajo impacto, también es seguro para personas con artritis o problemas articulares, y se ha demostrado que reduce el dolor y la rigidez en rodillas y caderas.",
      },
      { type: "heading", text: "Longevidad" },
      {
        type: "paragraph",
        text: "Un estudio publicado en The Lancet seguía a más de 130.000 personas en 17 países. La conclusión: caminar 30 minutos al día reduce el riesgo de mortalidad prematura en un 20%. Los que daban más de 8.000 pasos diarios tenían un riesgo de muerte significativamente menor que los sedentarios.",
      },
      { type: "heading", text: "Cómo integrar los pasos en tu rutina" },
      {
        type: "list",
        items: [
          "Baja una parada antes en el transporte público y camina el resto",
          "Usa las escaleras en lugar del ascensor siempre que puedas",
          "Camina mientras hablas por teléfono",
          "Propón reuniones de trabajo caminando (walking meetings)",
          "Sal a caminar después de comer: mejora la digestión y la glucosa postprandial",
          "Sube al trabajo o al colegio caminando si la distancia lo permite",
        ],
      },
      {
        type: "paragraph",
        text: "El mejor ejercicio es el que haces. Y caminar tiene la ventaja de ser sostenible en el tiempo, de bajo riesgo de lesión y compatible con casi cualquier nivel de forma física y edad.",
      },
    ],
    relatedSlugs: [
      "como-mejorar-tu-energia-diaria",
      "gestion-emocional-dia-a-dia",
      "higiene-sueno-adultos",
    ],
  },

  /* ── 8. Nutrición ── */
  {
    slug: "superalimentos-que-incorporar",
    category: "Nutrición",
    title: "Superalimentos que deberías incorporar a tu dieta (y los que son solo marketing)",
    excerpt:
      "El término 'superalimento' se ha convertido en una herramienta de marketing. Descubre cuáles tienen respaldo científico real y cuáles son mitos.",
    date: "10 Feb 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    seoTitle: "Superalimentos: Cuáles Valen la Pena y Cuáles No | Blog Salud",
    seoDescription:
      "Guía basada en evidencia sobre qué superalimentos tienen respaldo científico real y cuáles son solo marketing. Consejos de asesores de nutrición.",
    body: [
      {
        type: "paragraph",
        text: "El término 'superalimento' no tiene ninguna definición científica ni regulación oficial. Es un concepto de marketing que se aplica a alimentos que se perciben como extraordinariamente saludables o con propiedades casi mágicas. Sin embargo, algunos de los alimentos que se etiquetan así sí tienen evidencia sólida detrás. El truco está en saber cuáles.",
      },
      {
        type: "paragraph",
        text: "Los asesores de nutrición advierten contra la visión de que un solo alimento puede compensar una dieta desequilibrada. Ningún superalimento hace eso. Pero sí hay alimentos con una densidad nutricional excepcional que merece la pena incluir en la dieta habitual.",
      },
      { type: "heading", text: "Con evidencia científica sólida" },
      {
        type: "list",
        items: [
          "Sardinas y pescado azul: omega-3 EPA y DHA con impacto cardiovascular y antiinflamatorio probado",
          "Aceite de oliva virgen extra: polifenoles y ácido oleico con beneficios en colesterol y inflamación",
          "Legumbres (lentejas, garbanzos, alubias): proteína vegetal, fibra, hierro y bajo índice glucémico",
          "Frutos secos (nueces, almendras, pistachos): grasas saludables, vitamina E, magnesio",
          "Verduras de hoja verde oscura (espinacas, kale, acelgas): folato, hierro, vitamina K, antioxidantes",
          "Arándanos y frutos rojos: antocianinas con efecto antioxidante documentado",
          "Yogur natural con probióticos: salud intestinal y microbioma",
          "Huevos: proteína completa, colina, vitaminas B12 y D",
        ],
      },
      { type: "heading", text: "Los que están más en duda" },
      {
        type: "paragraph",
        text: "La cúrcuma se vende como potente antiinflamatorio, pero su biodisponibilidad en el organismo es muy baja sin pimienta negra (piperina) y en cantidades culinarias normales. Las semillas de chía son nutritivas pero no aportan nada que no den otras semillas de precio mucho menor. El açaí es básicamente un arándano tropical caro.",
      },
      { type: "heading", text: "Los que son puro marketing" },
      {
        type: "list",
        items: [
          "Agua alcalina: tu cuerpo regula el pH de la sangre con independencia de lo que bebas",
          "Detox de zumos: el hígado y los riñones hacen esa función continuamente sin ayuda",
          "Colágeno en polvo: se degrada en aminoácidos durante la digestión como cualquier proteína",
          "Carbón activado en alimentos: no tiene beneficio documentado y puede interferir con medicamentos",
        ],
      },
      { type: "heading", text: "El verdadero 'superalimento': la variedad" },
      {
        type: "paragraph",
        text: "La ciencia de la nutrición es clara: no existe ningún alimento milagroso ni ningún defecto que no se pueda compensar con variedad y equilibrio. Una dieta rica en vegetales frescos, proteína de calidad, grasas saludables y poca cantidad de ultraprocesados supera en resultados a cualquier superalimento de moda.",
      },
      {
        type: "callout",
        text: "Antes de gastar en suplementos o ingredientes exóticos, consulta con un asesor de nutrición si tu dieta actual cubre tus necesidades básicas. A menudo la solución más eficaz es más simple y barata de lo que parece.",
      },
    ],
    relatedSlugs: [
      "dieta-mediterranea-en-casa",
      "como-mejorar-tu-energia-diaria",
      "revisiones-medicas-por-edad",
    ],
  },

  /* ── 9. Salud Mental ── */
  {
    slug: "higiene-sueno-adultos",
    category: "Salud Mental",
    title: "Higiene del sueño: cómo dormir mejor sin pastillas ni trucos complicados",
    excerpt:
      "El insomnio afecta a 1 de cada 3 adultos en España. Estas estrategias basadas en evidencia pueden ayudarte a recuperar un sueño reparador.",
    date: "5 Feb 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop",
    seoTitle: "Higiene del Sueño: Cómo Dormir Mejor | Blog Salud Mental",
    seoDescription:
      "Descubre las claves de la higiene del sueño para adultos: rutinas, entorno, alimentación y hábitos que mejoran la calidad del sueño de forma natural.",
    body: [
      {
        type: "paragraph",
        text: "El sueño es uno de los pilares de la salud que más se infravalora. Dormir mal de forma crónica aumenta el riesgo de obesidad, diabetes, enfermedades cardiovasculares, deterioro cognitivo y depresión. Sin embargo, la gran mayoría de los problemas de sueño en adultos sanos tienen solución con cambios de hábito, sin necesidad de medicación.",
      },
      {
        type: "paragraph",
        text: "Los asesores de salud del sueño trabajan con un conjunto de estrategias que se conocen como 'higiene del sueño'. No son trucos mágicos: son cambios de comportamiento y entorno que, aplicados con constancia, transforman la calidad del descanso.",
      },
      { type: "heading", text: "El horario: la clave más subestimada" },
      {
        type: "paragraph",
        text: "El cuerpo tiene un reloj biológico (ritmo circadiano) que regula cuándo tiene sueño y cuándo no. Lo que más lo desajusta es la variabilidad horaria. Acostarse y levantarse a la misma hora cada día —incluidos los fines de semana— es probablemente la única intervención que más mejora la calidad del sueño por sí sola.",
      },
      { type: "heading", text: "El entorno: oscuridad, frescor y silencio" },
      {
        type: "list",
        items: [
          "Temperatura ideal para dormir: entre 16 y 19 °C (más frío de lo que crees)",
          "Oscuridad total o antifaz: incluso pequeñas fuentes de luz afectan al sueño profundo",
          "Ruido: usa tapones o ruido blanco si el entorno es ruidoso",
          "La cama es solo para dormir: evita trabajar, ver series o usar el móvil en la cama",
        ],
      },
      { type: "heading", text: "La luz azul de pantallas: cuándo y cuánto importa" },
      {
        type: "paragraph",
        text: "La luz azul de móviles y ordenadores suprime la producción de melatonina. Evita pantallas brillantes en las dos horas previas a dormir. Si necesitas usarlas, activa el modo nocturno o usa gafas con filtro. La televisión en sala separada tiene menos impacto que el móvil en la cama.",
      },
      { type: "heading", text: "Alimentación y sueño" },
      {
        type: "paragraph",
        text: "La cafeína tiene una vida media de 5-7 horas en el organismo. Si te acuestas a las 23:00, evita el café después de las 14:00. El alcohol inicialmente ayuda a conciliar el sueño pero fragmenta las fases profundas y causa despertares nocturnos. Cenar abundantemente tarde también dificulta el descanso.",
      },
      {
        type: "callout",
        text: "Si llevas más de tres semanas durmiendo mal y los cambios de hábito no mejoran la situación, consulta a tu médico. El insomnio crónico tiene tratamientos eficaces, y conviene descartar causas como apnea del sueño, ansiedad u otras condiciones.",
      },
      { type: "heading", text: "La paradoja del esfuerzo: no intentes dormir" },
      {
        type: "paragraph",
        text: "Cuanto más te esfuerzas por dormirte, más difícil es hacerlo. Cuando lleves 20 minutos en la cama sin poder dormir, levántate, ve a otra habitación y haz algo relajante (leer en papel, escuchar música suave) hasta que sientas somnolencia. Esto evita que el cerebro asocie la cama con la frustración del insomnio.",
      },
    ],
    relatedSlugs: [
      "gestion-emocional-dia-a-dia",
      "como-mejorar-tu-energia-diaria",
      "caminar-beneficios-reales",
    ],
  },

  /* ── 10. Seguros Adeslas ── */
  {
    slug: "comparativa-seguros-medicos-adeslas-2026",
    category: "Seguros Adeslas",
    title: "Comparativa de seguros médicos Adeslas 2026: cuál elegir según tu perfil",
    excerpt:
      "Adeslas Go, Plena Vital, Plena Vital Total, Plena Total, Plena Plus, Extra 150... Descubre las diferencias reales entre cada plan y cuál se adapta mejor a tu situación.",
    date: "1 Abr 2026",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    seoTitle: "Comparativa Seguros Médicos Adeslas 2026 | Cuál Elegir",
    seoDescription:
      "Comparativa completa de los seguros médicos Adeslas 2026: coberturas, copagos, hospitalización y qué plan elegir según tu edad, familia y necesidades.",
    body: [
      {
        type: "paragraph",
        text: "Elegir un seguro médico privado es una decisión que afecta a tu tranquilidad durante años. Con varios planes disponibles —con copago, sin copago, solo ambulatorio o con hospitalización— puede resultar difícil saber cuál se adapta mejor a tu situación. En esta guía comparamos los seguros médicos Adeslas disponibles en 2026 para que puedas decidir con información clara y contrastada.",
      },
      {
        type: "paragraph",
        text: "Antes de comparar, conviene entender dos conceptos clave: el copago (la parte que paga el asegurado por cada servicio utilizado) y el Límite Máximo Anual o LMA (el tope de copago que se paga en un año; superado ese límite, el resto del año es sin coste). En general, a mayor copago individual, menor prima mensual.",
      },

      { type: "heading", text: "Resumen de los planes Adeslas 2026" },
      {
        type: "list",
        items: [
          "Adeslas Go: solo asistencia ambulatoria, con copago y LMA anual",
          "Adeslas Plena Vital: ambulatoria + hospitalización completa, con copago y LMA 300 €/año",
          "Adeslas Plena Vital Total: como Plena Vital con LMA 500 €/año, más dental, chequeo anual, viaje y 3 años sin subida de prima",
          "Adeslas Plena Plus: ambulatoria + hospitalización completa, sin copago",
          "Adeslas Plena Total: ambulatoria + hospitalización completa, sin copago, más dental, accidentes, viaje y 3 años sin subida de prima",
          "Adeslas Plena Extra 150: sin copago, libre elección de médico con reembolso del 80 %",
        ],
      },

      { type: "heading", text: "Adeslas Go: cobertura ambulatoria con copago" },
      {
        type: "paragraph",
        text: "Es el plan de entrada de la gama Adeslas. Cubre asistencia ambulatoria completa —medicina general, especialidades, diagnóstico de alta tecnología y podología (hasta 12 sesiones al año)— con un copago por cada servicio utilizado. Incluye chequeo médico anual adaptado a la edad y sexo del asegurado.",
      },
      {
        type: "list",
        items: [
          "Asistencia ambulatoria completa: medicina general, especialidades y diagnóstico",
          "Copago por servicio con Límite Máximo Anual (LMA) de 260 € para asegurados de 0 a 54 años",
          "Tres copagos gratuitos al año; desde la primera renovación, todos los copagos se reducen un 25 %",
          "Chequeo médico anual incluido",
          "No incluye hospitalización ni cirugías programadas",
          "Contratación hasta los 70 años",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: personas jóvenes sin patologías crónicas que buscan cobertura ambulatoria ante imprevistos con la prima más ajustada de la gama.",
      },

      { type: "heading", text: "Adeslas Plena Vital: ambulatoria y hospitalización con copago limitado" },
      {
        type: "paragraph",
        text: "Adeslas Plena Vital ofrece la asistencia sanitaria más completa —medicina general, todas las especialidades y los medios de diagnóstico más avanzados— con hospitalización en habitación individual con cama para acompañante. El asegurado participa en el coste mediante copago, con un Límite Máximo Anual de 300 € por asegurado: una vez alcanzado ese importe, el resto del año no hay copago.",
      },
      {
        type: "list",
        items: [
          "Cobertura ambulatoria e hospitalización completa en habitación individual con cama para acompañante",
          "Copago por servicio con LMA de 300 €/año por asegurado",
          "Urgencias 24 horas incluidas",
          "Acceso a más de 51.000 médicos y 1.400 centros en España",
          "Requiere cuestionario de salud",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: quienes quieren cobertura sanitaria completa con hospitalización y asumen una participación en el coste limitada anualmente.",
      },

      { type: "heading", text: "Adeslas Plena Vital Total: cobertura completa con prima garantizada 3 años" },
      {
        type: "paragraph",
        text: "Adeslas Plena Vital Total es el seguro de asistencia sanitaria completa con copago, cobertura dental incluida y prima garantizada durante 3 años sin incremento. Especialmente diseñado para familias y quienes buscan cobertura de valor con previsibilidad económica.",
      },
      {
        type: "list",
        items: [
          "Mismas coberturas ambulatorias y hospitalarias que Adeslas Plena Vital",
          "Copago por servicio con LMA de 500 €/año por asegurado",
          "Cobertura dental incluida",
          "Chequeo médico anual adaptado a la edad de cada asegurado",
          "Asistencia en viaje en el extranjero hasta 30.000 €",
          "Reembolso de farmacia: 50 % hasta 200 €/año por asegurado",
          "Prima garantizada sin subida durante 3 años desde la contratación",
        ],
      },
      {
        type: "callout",
        text: "La garantía de 3 años sin subida de prima es especialmente relevante para familias que planifican su presupuesto a medio plazo.",
      },
      {
        type: "quote",
        text: "Ideal para: familias con hijos y adultos que valoran cobertura completa con dental, farmacia incluida y previsibilidad de gasto garantizada.",
      },

      { type: "heading", text: "Adeslas Plena Plus: cobertura completa sin copago" },
      {
        type: "paragraph",
        text: "Adeslas Plena Plus permite el acceso a la asistencia sanitaria más completa sin copagos: medicina general, todas las especialidades y los medios de diagnóstico más avanzados, con hospitalización en habitación individual con cama para acompañante.",
      },
      {
        type: "list",
        items: [
          "Cobertura ambulatoria e hospitalización completa en habitación individual con cama para acompañante",
          "Sin copagos en ningún servicio",
          "Urgencias 24 horas incluidas",
          "Acceso a más de 51.000 médicos y 1.400 centros en España",
          "Requiere cuestionario de salud",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: quienes quieren cobertura sanitaria completa con hospitalización sin pagar ningún copago por cada consulta o servicio.",
      },

      { type: "heading", text: "Adeslas Plena Total: sin copago, con dental, accidentes y viaje" },
      {
        type: "paragraph",
        text: "Adeslas Plena Total es el seguro de asistencia sanitaria completa sin copagos, con cobertura dental, cobertura de accidentes y asistencia en viaje hasta 100.000 €. Prima garantizada durante 3 años sin incremento. Está especialmente diseñado para la protección global del asegurado durante toda su vida.",
      },
      {
        type: "list",
        items: [
          "Sin copago en ningún servicio: consultas, diagnóstico, cirugía y hospitalización",
          "Cobertura dental con 46 actos incluidos sin coste adicional",
          "Chequeo médico anual adaptado a la edad de cada asegurado",
          "Asistencia en viaje en el extranjero hasta 100.000 €",
          "Reembolso de farmacia: 50 % hasta 200 €/año por asegurado",
          "Cobertura de accidentes incluida",
          "Prima garantizada sin subida durante 3 años",
          "Contratación hasta los 62 años",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: quienes buscan el plan más completo: sin copagos, con dental, accidentes y viaje incluidos, y prima estable garantizada.",
      },

      { type: "heading", text: "Adeslas Plena Extra 150: libre elección sin copago" },
      {
        type: "paragraph",
        text: "Adeslas Plena Extra 150 permite acceder a todas las coberturas sanitarias sin copagos, combinando el cuadro médico con la libre elección de cualquier profesional o centro, tanto en España como en el extranjero. La aseguradora reembolsa el 80 % de los gastos, con un límite de 150.000 € por asegurado y año.",
      },
      {
        type: "list",
        items: [
          "Sin copago: ni en la red médica concertada ni por reembolso",
          "Libre elección de médico o centro en España y en el extranjero",
          "Reembolso del 80 % de los gastos sanitarios fuera de la red",
          "Límite de reembolso: 150.000 €/año por asegurado",
          "Cobertura ambulatoria de 40.000 €/año",
          "Contratación hasta los 64 años",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: personas con médico de confianza fuera de la red Adeslas que quieren máxima libertad de elección sin renunciar a cobertura completa.",
      },

      { type: "heading", text: "¿Cuál te conviene según tu perfil?" },
      {
        type: "list",
        items: [
          "Cobertura ambulatoria al menor coste, uso ocasional → Adeslas Go",
          "Cobertura completa (ambulatoria + hospitalización) con copago acotado → Adeslas Plena Vital",
          "Cobertura completa con dental + precio garantizado 3 años → Adeslas Plena Vital Total",
          "Cobertura completa sin copago, sin extras adicionales → Adeslas Plena Plus",
          "Sin copago + dental + accidentes + viaje + prima garantizada → Adeslas Plena Total",
          "Máxima libertad de elección de médico sin copago → Adeslas Plena Extra 150",
        ],
      },
      {
        type: "callout",
        text: "El precio de cada plan varía según la edad, la provincia y el número de asegurados. Puedes calcular tu precio exacto con el comparador de Marchal Aseguradores en segundos, sin compromiso.",
      },
      {
        type: "paragraph",
        text: "Todos los planes Adeslas dan acceso a más de 51.000 médicos y 1.400 centros médicos en España sin listas de espera. La diferencia entre planes está en la extensión de la cobertura, la existencia o no de copago y las prestaciones adicionales, no en la calidad de la red médica.",
      },
    ],
    relatedSlugs: [
      "revisiones-medicas-por-edad",
      "como-mejorar-tu-energia-diaria",
      "salud-bucodental-guia-completa",
    ],
  },


  /* ── Copagos: seguro-medico-sin-copago-2026 ── */
  {
    slug: "seguro-medico-sin-copago-2026",
    category: "Copagos",
    title: "Seguro médico sin copago: qué es, cómo funciona y cuánto cuesta en 2026",
    excerpt: "Un seguro sin copago significa que pagas la prima mensual y no abonas nada más cada vez que vas al médico. Sin sorpresas, sin tickets. Descubre si te compensa.",
    date: "23 Abr 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    seoTitle: "Seguro Médico Sin Copago 2026: Qué Es y Cuánto Cuesta | Adeslas",
    seoDescription: "Descubre qué es un seguro médico sin copago, cómo funciona, cuánto cuesta y si te compensa frente al seguro con copago. Guía completa 2026 con Adeslas.",
    body: [
        {
            "type": "paragraph",
            "text": "Un seguro médico sin copago es aquel en el que pagas únicamente la prima mensual acordada y no abonas ningún importe adicional cada vez que usas el seguro: ni en consultas de especialista, ni en urgencias, ni en pruebas diagnósticas, ni en cirugía. Lo que ves en la póliza es todo lo que pagas. Sin sorpresas al final del mes."
        },
        {
            "type": "paragraph",
            "text": "En 2026, los seguros médicos sin copago de Adeslas más destacados son Adeslas Plena Plus y Adeslas Plena Total. Si valoras la previsibilidad económica y usas el seguro con frecuencia, un plan sin copago suele compensar respecto a uno con copago. A continuación te explicamos en detalle cómo funciona el sistema de copago, cuándo sale a cuenta eliminarlo y qué opciones tienes en Adeslas."
        },
        {
            "type": "heading",
            "text": "Copago vs. sin copago: la diferencia real"
        },
        {
            "type": "paragraph",
            "text": "El copago es una cantidad fija que el asegurado paga por cada servicio que utiliza: una consulta al especialista, una radiografía, una analítica. El objetivo es que el asegurado tenga conciencia del coste sanitario y no use el seguro de forma abusiva. El resultado es una prima mensual más baja a cambio de pagar algo cada vez que acudes al médico."
        },
        {
            "type": "list",
            "items": [
                "Con copago: prima más baja + pago pequeño por cada servicio usado",
                "Sin copago: prima algo más alta + cero coste adicional por cada visita",
                "Con LMA (Límite Máximo Anual): copago hasta un tope; a partir de ahí, el resto del año es gratis",
                "La diferencia de prima entre ambas modalidades suele estar entre 15 € y 40 € al mes según edad y provincia"
            ]
        },
        {
            "type": "heading",
            "text": "¿Cuándo compensa el seguro sin copago?"
        },
        {
            "type": "paragraph",
            "text": "La respuesta depende de cuánto uses el seguro. Si eres una persona sana que acude al médico pocas veces al año, el seguro con copago suele ser más económico en cómputo anual. Pero si tienes hijos, llevas seguimiento de enfermedades crónicas, eres mayor de 45 años o simplemente valoras no pensar en cuánto cuesta cada visita, el seguro sin copago te da tranquilidad mental que tiene un valor difícil de medir en euros."
        },
        {
            "type": "callout",
            "text": "Cálculo orientativo: si vas al médico más de 12-15 veces al año entre toda la familia, un seguro sin copago suele salir más barato que uno con copago, incluso con el LMA incluido. A partir de ese uso, la prima sin copago se amortiza."
        },
        {
            "type": "heading",
            "text": "Seguros Adeslas sin copago en 2026"
        },
        {
            "type": "list",
            "items": [
                "Adeslas Plena Plus: cobertura ambulatoria + hospitalización completa, sin copago en ningún servicio. Prima más ajustada de los planes sin copago",
                "Adeslas Plena Total: igual que Plena Plus + dental (46 actos incluidos) + accidentes + asistencia en viaje hasta 100.000 € + prima garantizada 3 años",
                "Adeslas Plena Extra 150: sin copago + libre elección de cualquier médico u hospital + reembolso del 80 % fuera de la red (hasta 150.000 €/año)"
            ]
        },
        {
            "type": "heading",
            "text": "¿Qué incluye un seguro sin copago de Adeslas?"
        },
        {
            "type": "list",
            "items": [
                "Medicina general y todas las especialidades sin coste por visita",
                "Diagnóstico de alta tecnología: TAC, resonancia magnética, PET...",
                "Urgencias 24 horas en toda España",
                "Hospitalización en habitación individual con cama para acompañante",
                "Cirugía programada y de urgencia sin límite de intervenciones",
                "Acceso a más de 51.000 médicos y 1.400 centros en España",
                "Sin listas de espera"
            ]
        },
        {
            "type": "heading",
            "text": "¿Tiene carencias el seguro sin copago?"
        },
        {
            "type": "paragraph",
            "text": "Sí. Los seguros sin copago de Adeslas tienen los mismos periodos de carencia que los planes con copago: 6 meses para hospitalización, 8 meses para el parto y maternidad, y acceso inmediato a la mayoría de servicios ambulatorios. Las carencias son estándar del sector y no dependen del tipo de copago que elijas."
        },
        {
            "type": "heading",
            "text": "¿Cómo contratar un seguro sin copago con Adeslas?"
        },
        {
            "type": "paragraph",
            "text": "Puedes calcular el precio exacto de un seguro Adeslas sin copago según tu edad, provincia y número de asegurados en el comparador de Marchal Aseguradores, sin compromiso. Como agente exclusivo Adeslas, te asesoramos sin coste para encontrar el plan que mejor se adapta a tu situación real."
        },
        {
            "type": "callout",
            "text": "Como agente exclusivo Adeslas, en Marchal Aseguradores te ayudamos a comparar los planes con y sin copago para tu caso concreto. Llámanos al 91 710 50 00 o usa el comparador online sin compromiso."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","carencias-seguros-medicos-adeslas","seguro-medico-familias-2026"],
  },


  /* ── Precios: cuanto-cuesta-operacion-privada-espana-2026 ── */
  {
    slug: "cuanto-cuesta-operacion-privada-espana-2026",
    category: "Precios",
    title: "Cuánto cuesta una operación privada en España en 2026: precios reales por intervención",
    excerpt: "¿Sabes lo que cuesta operarte de apendicitis, de rodilla o de cataratas sin seguro? Los precios de la sanidad privada en España te sorprenderán. Y no para bien.",
    date: "26 Abr 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
    seoTitle: "Cuánto Cuesta una Operación Privada en España 2026 | Precios Reales",
    seoDescription: "Precios reales de operaciones privadas en España en 2026: apendicitis, rodilla, cataratas, hernia, cesárea y más. Descubre cuánto ahorras con un seguro médico Adeslas.",
    body: [
        {
            "type": "paragraph",
            "text": "Operarse en un hospital privado en España sin seguro médico puede costar desde 3.000 € para una intervención menor hasta más de 30.000 € en cirugías complejas. Estos son precios reales de 2026, no estimaciones. Y son la razón principal por la que cada vez más personas contratan un seguro médico privado antes de necesitarlo, no después."
        },
        {
            "type": "paragraph",
            "text": "A continuación encontrarás un desglose de los costes más habituales en la sanidad privada española, tanto en consultas y pruebas diagnósticas como en cirugías e ingresos hospitalarios. Los precios incluyen honorarios médicos, anestesia, quirófano y estancia hospitalaria básica."
        },
        {
            "type": "heading",
            "text": "Precio de consultas y pruebas diagnósticas privadas"
        },
        {
            "type": "list",
            "items": [
                "Consulta médico general: 50-80 €",
                "Consulta especialista (primera visita): 80-200 €",
                "Analítica de sangre completa: 80-150 €",
                "Radiografía: 80-150 €",
                "Ecografía abdominal: 150-250 €",
                "Resonancia magnética: 400-800 €",
                "TAC (tomografía axial computarizada): 350-700 €",
                "Colonoscopia: 500-1.200 €",
                "Gastroscopia: 400-900 €"
            ]
        },
        {
            "type": "heading",
            "text": "Precio de operaciones privadas más frecuentes en 2026"
        },
        {
            "type": "list",
            "items": [
                "Apendicitis (apendicectomía): 4.000-8.000 €",
                "Hernia inguinal: 3.500-7.000 €",
                "Cataratas (un ojo): 1.800-3.500 €",
                "Menisco de rodilla (artroscopia): 4.000-9.000 €",
                "Prótesis de rodilla: 12.000-22.000 €",
                "Prótesis de cadera: 12.000-20.000 €",
                "Vesícula (colecistectomía laparoscópica): 4.000-8.000 €",
                "Cesárea: 4.000-9.000 €",
                "Parto natural en clínica privada: 3.000-6.000 €",
                "Amigdalectomía (amígdalas): 2.500-5.000 €",
                "Bypass coronario: 25.000-40.000 €",
                "Discectomía lumbar (hernia de disco): 6.000-14.000 €"
            ]
        },
        {
            "type": "callout",
            "text": "Una sola intervención de rodilla puede costarte entre 4.000 y 9.000 €. La prima de un seguro médico completo con Adeslas que cubre esa misma cirugía puede estar entre 60 y 120 € al mes. La diferencia se amortiza en pocas semanas de ingreso hospitalario."
        },
        {
            "type": "heading",
            "text": "Coste de un ingreso hospitalario sin seguro"
        },
        {
            "type": "paragraph",
            "text": "La habitación individual en un hospital privado de España cuesta entre 500 y 1.500 € por noche en 2026, sin incluir médicos, pruebas ni medicación. Una estancia media de 4-5 días por una cirugía abdominal supone entre 2.000 y 7.500 € solo en habitación. Si además necesitas UCI o vigilancia intensiva, el coste puede multiplicarse por tres o cuatro."
        },
        {
            "type": "heading",
            "text": "Listas de espera en la sanidad pública: el coste invisible"
        },
        {
            "type": "paragraph",
            "text": "La espera media para una operación electiva en la sanidad pública española supera los 5 meses en 2026 según los datos del Ministerio de Sanidad. Para especialidades como traumatología, oftalmología o cirugía general, la espera puede alargarse hasta 12-18 meses en algunas comunidades autónomas. Ese tiempo tiene un coste en calidad de vida, productividad y, en ocasiones, en el empeoramiento de la condición."
        },
        {
            "type": "heading",
            "text": "Lo que cubre un seguro Adeslas frente a estos costes"
        },
        {
            "type": "list",
            "items": [
                "Todas las cirugías del cuadro médico: sin coste adicional ni límite de intervenciones",
                "Hospitalización en habitación individual: incluida sin coste extra",
                "Diagnóstico previo a la operación: resonancias, TAC, analíticas cubiertas",
                "Rehabilitación post-quirúrgica: incluida en la cobertura",
                "Sin listas de espera: cita directamente con el especialista y quirófano disponible"
            ]
        },
        {
            "type": "paragraph",
            "text": "Como agente exclusivo Adeslas, en Marchal Aseguradores te explicamos exactamente qué cubre cada plan según tu situación. Puedes consultar tu precio sin compromiso en el comparador online o llamarnos al 91 710 50 00."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","seguro-medico-sin-copago-2026","hospitalizacion-privada-vs-publica"],
  },



  /* ── Carencias: carencias-seguros-medicos-adeslas ── */
  {
    slug: "carencias-seguros-medicos-adeslas",
    category: "Carencias",
    title: "Carencias en seguros médicos Adeslas: qué son, cuánto duran y cómo afectan",
    excerpt: "Las carencias son el periodo de espera desde que contratas el seguro hasta que puedes usar ciertas coberturas. Entenderlas bien evita sorpresas desagradables.",
    date: "2 May 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=600&h=400&fit=crop",
    seoTitle: "Carencias en Seguros Médicos Adeslas: Qué Son y Cuánto Duran | 2026",
    seoDescription: "Guía completa sobre las carencias de los seguros médicos Adeslas 2026: hospitalización, maternidad, qué servicios tienen acceso inmediato y cómo evitar esperas.",
    body: [
        {
            "type": "paragraph",
            "text": "Las carencias son los periodos de espera que existen entre la fecha de contratación de un seguro médico y el momento en que puedes usar determinadas coberturas. No son un truco de las aseguradoras: son la forma en que los seguros médicos garantizan su viabilidad financiera y mantienen las primas en niveles razonables para todos los asegurados."
        },
        {
            "type": "paragraph",
            "text": "En los seguros Adeslas, la mayoría de los servicios ambulatorios tienen acceso inmediato o en muy pocos días. Las carencias más largas afectan a las coberturas de mayor coste: hospitalización, cirugía programada y maternidad. Aquí te explicamos exactamente qué puedes usar desde el primer día y qué tiene periodo de espera."
        },
        {
            "type": "heading",
            "text": "Servicios con acceso inmediato en Adeslas"
        },
        {
            "type": "list",
            "items": [
                "Urgencias: acceso desde el primer día en toda la red Adeslas",
                "Medicina general y médico de cabecera: desde el primer día",
                "Especialidades médicas: acceso inmediato en la mayoría de casos",
                "Diagnóstico ambulatorio: analíticas, ecografías, radiografías",
                "Psicología y salud mental (consulta ambulatoria)",
                "Podología",
                "Óptica (en planes que la incluyen)"
            ]
        },
        {
            "type": "heading",
            "text": "Carencias habituales en los seguros Adeslas"
        },
        {
            "type": "list",
            "items": [
                "Hospitalización y cirugía programada: 6 meses desde la fecha de efecto",
                "Maternidad y parto: 8 meses desde la fecha de efecto",
                "Psiquiatría con ingreso: 6 meses",
                "Rehabilitación con ingreso: 6 meses",
                "Diagnóstico de alta tecnología (resonancia magnética, PET, TAC): en algunos casos hasta 3-6 meses según el plan"
            ]
        },
        {
            "type": "callout",
            "text": "Si tienes una urgencia real (accidente, apendicitis, infarto), las carencias no se aplican. Las urgencias están cubiertas desde el primer día en todos los planes Adeslas."
        },
        {
            "type": "heading",
            "text": "¿Qué pasa si necesito operarme antes de que pasen los 6 meses?"
        },
        {
            "type": "paragraph",
            "text": "Si necesitas una cirugía durante el periodo de carencia y no es una urgencia, tienes dos opciones: esperar a que se cumpla el periodo de carencia (y entonces la cobertura es total), o abonar la intervención de forma privada sin usar el seguro. Adeslas, como el resto de aseguradoras, puede considerar urgente una situación que lo sea clínicamente aunque no sea evidente a primera vista, por lo que siempre es recomendable consultar antes."
        },
        {
            "type": "heading",
            "text": "¿Puedo eliminar las carencias al contratar?"
        },
        {
            "type": "paragraph",
            "text": "En determinadas circunstancias sí. Si vienes de otro seguro médico sin interrupción de cobertura, Adeslas puede reconocer el tiempo ya cumplido en la aseguradora anterior y reducir o eliminar las carencias. Esto se llama 'portabilidad de carencias' y requiere aportar documentación de la póliza anterior. Consúltalo con tu asesor de Marchal Aseguradores."
        },
        {
            "type": "heading",
            "text": "Preexistencias: diferente a las carencias"
        },
        {
            "type": "paragraph",
            "text": "Las carencias afectan a todos los asegurados por igual, independientemente de su estado de salud. Las preexistencias son enfermedades o condiciones que ya tienes en el momento de contratar. Adeslas puede excluirlas de la cobertura o incluirlas con condiciones especiales dependiendo del caso. Por eso es importante ser honesto en el cuestionario de salud: ocultar preexistencias puede derivar en la nulidad del contrato."
        },
        {
            "type": "callout",
            "text": "Como agente exclusivo Adeslas, en Marchal Aseguradores te ayudamos a entender exactamente qué carencias aplican a tu caso y si puedes aprovechar la portabilidad. Llámanos al 91 710 50 00 o consulta sin compromiso."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","seguro-medico-sin-copago-2026","seguro-medico-familias-2026"],
  },


  /* ── Salud Familiar: seguro-medico-familias-2026 ── */
  {
    slug: "seguro-medico-familias-2026",
    category: "Salud Familiar",
    title: "Seguro médico para familias en 2026: guía completa para elegir bien",
    excerpt: "Contratar un seguro médico para toda la familia es una decisión que afecta a tu tranquilidad durante años. Esta guía te ayuda a elegir el plan correcto sin dejarte nada importante.",
    date: "5 May 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop",
    seoTitle: "Seguro Médico para Familias 2026: Guía Completa | Adeslas",
    seoDescription: "Guía completa para contratar un seguro médico familiar en 2026: qué cubrir, cómo comparar, cuánto cuesta y qué plan Adeslas se adapta mejor a tu familia.",
    body: [
        {
            "type": "paragraph",
            "text": "Un seguro médico familiar bien elegido puede ser la decisión financiera más inteligente que tomes para tu hogar en 2026. No solo por lo que cubre, sino por lo que evita: esperas innecesarias, costes imprevistos y la angustia de no saber cómo acceder a atención médica cuando la necesitas. Esta guía te explica qué debes mirar, qué preguntas hacer y qué plan se adapta mejor a tu familia."
        },
        {
            "type": "heading",
            "text": "Lo primero: evalúa las necesidades reales de tu familia"
        },
        {
            "type": "list",
            "items": [
                "Número de asegurados y edades: los niños tienen necesidades muy distintas a los adultos mayores",
                "Historial médico familiar: si hay enfermedades crónicas o antecedentes, la cobertura de especialidades es clave",
                "Uso previsto: ¿tenéis médico de cabecera frecuente, o solo para urgencias?",
                "Presupuesto mensual disponible: la prima de un seguro familiar debe ser sostenible a largo plazo",
                "Provincia de residencia: la amplitud de la red médica varía significativamente por zona"
            ]
        },
        {
            "type": "heading",
            "text": "¿Copago o sin copago para una familia?"
        },
        {
            "type": "paragraph",
            "text": "Las familias con hijos suelen usar el seguro más que los adultos sin descendencia: pediatría, urgencias nocturnas, otorrinos, alergólogos, vacunas privadas... En ese escenario, el seguro sin copago o con LMA (Límite Máximo Anual) bajo suele salir más a cuenta que pagar copago en cada visita. Haz el cálculo: si una familia de 4 personas hace 20-30 consultas al año, el ahorro frente al copago puede superar la diferencia de prima."
        },
        {
            "type": "heading",
            "text": "Qué debe incluir un buen seguro médico familiar"
        },
        {
            "type": "list",
            "items": [
                "Pediatría incluida y sin restricciones de edad (hasta los 18 años mínimo)",
                "Urgencias 24 horas en toda España, sin copago o con copago bajo",
                "Hospitalización completa con habitación individual y cama para acompañante",
                "Acceso a todas las especialidades sin necesidad de derivación",
                "Diagnóstico de alta tecnología: resonancias, TAC, PET",
                "Cobertura dental (valorar incluirla desde el principio)",
                "Reembolso de farmacia si se quiere reducir el gasto en medicamentos",
                "Prima estable a medio plazo: busca garantía de precio o subidas limitadas"
            ]
        },
        {
            "type": "heading",
            "text": "Planes Adeslas más recomendados para familias"
        },
        {
            "type": "list",
            "items": [
                "Adeslas Plena Vital Total: cobertura completa con copago y LMA de 500 €/año, dental incluido, chequeo anual, asistencia en viaje hasta 30.000 € y prima garantizada 3 años. Relación calidad-precio excelente para familias",
                "Adeslas Plena Total: sin copago, dental (46 actos incluidos), accidentes, asistencia en viaje hasta 100.000 € y prima garantizada 3 años. La opción más completa para familias que no quieren pensar en costes por visita",
                "Adeslas Plena Plus: sin copago, sin extras de dental ni viaje, pero la prima más ajustada de los planes sin copago"
            ]
        },
        {
            "type": "callout",
            "text": "Añadir un niño a un seguro familiar suele costar entre 20 € y 40 € al mes dependiendo del plan y la edad. Si tienes más de 3 hijos, consulta condiciones especiales: algunos planes tienen bonificaciones para familias numerosas."
        },
        {
            "type": "heading",
            "text": "¿Cuánto cuesta un seguro médico familiar con Adeslas en 2026?"
        },
        {
            "type": "paragraph",
            "text": "El precio depende del número de asegurados, sus edades y la provincia. A modo orientativo, una familia de 4 personas (pareja de 35 años + 2 hijos menores) puede contratar un seguro completo Adeslas con cobertura sin copago por entre 180 € y 280 € al mes dependiendo del plan elegido. Una cifra que, frente al coste de una sola hospitalización privada, resulta razonable."
        },
        {
            "type": "heading",
            "text": "Preguntas frecuentes sobre seguros médicos para familias"
        },
        {
            "type": "paragraph",
            "text": "¿Se puede añadir a un miembro de la familia después de contratar? Sí, aunque se aplicarán las carencias correspondientes desde la fecha de incorporación. ¿Qué pasa si un hijo cumple 18 años? Puede continuar en la póliza familiar o pasar a una póliza individual. ¿Podemos contratar si algún miembro tiene una enfermedad preexistente? Depende de la condición: consúltalo antes de firmar para que no haya sorpresas."
        },
        {
            "type": "callout",
            "text": "Como agente exclusivo Adeslas, en Marchal Aseguradores te ayudamos a diseñar la cobertura exacta para tu familia sin pagar por coberturas que no necesitas. Llámanos al 91 710 50 00 o usa el comparador sin compromiso."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","seguro-medico-sin-copago-2026","carencias-seguros-medicos-adeslas"],
  },


  /* ── Hospitalización: hospitalizacion-privada-vs-publica ── */
  {
    slug: "hospitalizacion-privada-vs-publica",
    category: "Hospitalización",
    title: "Hospitalización privada vs. pública en España: diferencias reales en 2026",
    excerpt: "¿Qué cambia realmente entre ingresar en un hospital público o en uno privado? Tiempos, habitación, acceso al médico, pruebas, alta. Las diferencias son más grandes de lo que crees.",
    date: "8 May 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop",
    seoTitle: "Hospitalización Privada vs Pública en España 2026: Diferencias Reales",
    seoDescription: "Comparativa real entre hospitalización privada y pública en España 2026: tiempos de espera, habitación, médico asignado, pruebas y coste. Descubre qué cambia con un seguro Adeslas.",
    body: [
        {
            "type": "paragraph",
            "text": "La diferencia entre un ingreso hospitalario en la sanidad pública y en la privada va mucho más allá de la habitación individual. Afecta a cuánto tiempo esperas para ser intervenido, quién te opera, cuándo te hacen las pruebas, cómo se gestionan las urgencias y cómo es el proceso de alta. Estas son las diferencias reales que importan en 2026."
        },
        {
            "type": "heading",
            "text": "1. Tiempos de espera para cirugía programada"
        },
        {
            "type": "list",
            "items": [
                "Sanidad pública: espera media de 5 meses para cirugía electiva en 2026 (Ministerio de Sanidad). En traumatología y oftalmología puede superar los 12 meses en varias CC.AA.",
                "Sanidad privada con Adeslas: no hay lista de espera para cirugía. La cita con el especialista suele obtenerse en 24-72 horas y el quirófano en días o pocas semanas",
                "Impacto: una persona que necesita una prótesis de rodilla espera de media 18 meses en la red pública de algunas comunidades. En la privada, puede operarse en 2-3 semanas"
            ]
        },
        {
            "type": "heading",
            "text": "2. Habitación y condiciones de ingreso"
        },
        {
            "type": "list",
            "items": [
                "Sanidad pública: habitación compartida como norma general (2-4 camas). Acompañante no garantizado o con restricciones horarias",
                "Sanidad privada con Adeslas: habitación individual en todos los planes completos (Plena Vital, Plena Plus, Plena Total). Cama para acompañante incluida",
                "Para familias con niños ingresados o mayores que necesitan compañía, la habitación individual con cama de acompañante es una diferencia muy significativa"
            ]
        },
        {
            "type": "heading",
            "text": "3. Médico que te atiende"
        },
        {
            "type": "paragraph",
            "text": "En la sanidad pública, el médico que te opera es el asignado por el hospital ese día, no necesariamente el especialista que te ha seguido durante el proceso diagnóstico. En la sanidad privada con Adeslas, puedes elegir al cirujano de la red que quieres que te opere, con quién ya has consultado previamente y de cuya experiencia tienes información directa."
        },
        {
            "type": "heading",
            "text": "4. Diagnóstico previo al ingreso"
        },
        {
            "type": "list",
            "items": [
                "Sanidad pública: las pruebas preoperatorias pueden demorarse semanas o meses",
                "Sanidad privada: resonancias, TAC y analíticas preoperatorias se obtienen en días",
                "El acceso rápido al diagnóstico puede adelantar la cirugía de forma significativa y mejorar el resultado clínico"
            ]
        },
        {
            "type": "heading",
            "text": "5. Urgencias: la gran diferencia en guardia"
        },
        {
            "type": "paragraph",
            "text": "Las urgencias hospitalarias públicas en España registran esperas medias de 2 a 5 horas para ser atendido por el médico, según el nivel de triaje. En urgencias privadas, la espera se reduce drásticamente: en la mayoría de clínicas y hospitales Adeslas, el tiempo hasta ser visto por el médico es inferior a 30 minutos."
        },
        {
            "type": "callout",
            "text": "Las urgencias están cubiertas desde el primer día en todos los planes Adeslas, sin carencias y sin copago adicional en los planes sin copago. En caso de accidente o emergencia grave, también se cubre la atención en el hospital público más cercano."
        },
        {
            "type": "heading",
            "text": "6. Alta médica y seguimiento postoperatorio"
        },
        {
            "type": "paragraph",
            "text": "En la sanidad privada, el seguimiento postoperatorio es más inmediato y personalizado. Las revisiones con el cirujano se obtienen en días, no en semanas. La rehabilitación post-quirúrgica, incluida en los planes Adeslas, puede iniciarse de forma inmediata sin esperar a la derivación de fisioterapia pública."
        },
        {
            "type": "heading",
            "text": "¿Qué cubre Adeslas en hospitalización?"
        },
        {
            "type": "list",
            "items": [
                "Habitación individual con cama para acompañante",
                "Cirugía programada y de urgencia sin límite de intervenciones",
                "Anestesia y quirófano incluidos",
                "Pruebas diagnósticas preoperatorias y postoperatorias",
                "Rehabilitación post-quirúrgica ambulatoria",
                "Seguimiento con el especialista tras el alta"
            ]
        },
        {
            "type": "paragraph",
            "text": "Como agente exclusivo Adeslas, en Marchal Aseguradores podemos ayudarte a entender exactamente qué cubre tu plan en caso de hospitalización. Llámanos al 91 710 50 00."
        }
    ],
    relatedSlugs: ["cuanto-cuesta-operacion-privada-espana-2026","comparativa-seguros-medicos-adeslas-2026","carencias-seguros-medicos-adeslas"],
  },



  /* ── Seguros Adeslas: seguro-medico-autonomos-2026 ── */
  {
    slug: "seguro-medico-autonomos-2026",
    category: "Seguros Adeslas",
    title: "Seguro médico para autónomos en 2026: qué debes tener en cuenta antes de contratar",
    excerpt: "Como autónomo, tu salud es tu negocio. Un día de baja sin cobertura adecuada puede costarte más que meses de prima. Esta guía te ayuda a elegir bien.",
    date: "14 May 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    seoTitle: "Seguro Médico para Autónomos 2026: Guía Completa | Adeslas",
    seoDescription: "Guía completa para autónomos sobre cómo elegir el mejor seguro médico en 2026: cobertura, precio, deducción fiscal y qué plan Adeslas se adapta mejor.",
    body: [
        {
            "type": "paragraph",
            "text": "Para un autónomo, la salud no es solo bienestar personal: es la base de su capacidad de generar ingresos. Un periodo de baja por enfermedad o una espera de meses para ser operado puede traducirse directamente en pérdida de clientes, proyectos y facturación. Por eso, contar con un seguro médico privado de calidad es, para un autónomo, una decisión de negocio tanto como una decisión de salud."
        },
        {
            "type": "heading",
            "text": "¿Puede el autónomo deducirse el seguro médico?"
        },
        {
            "type": "paragraph",
            "text": "Sí. Los autónomos en España pueden deducirse las primas de seguro médico en el IRPF, dentro de los rendimientos de actividades económicas. El límite de deducción es de 500 € al año por persona asegurada (el propio autónomo, su cónyuge y los hijos menores de 25 años que convivan con él). Si el autónomo tiene discapacidad, el límite sube a 1.500 €. Consulta siempre con tu asesor fiscal para aplicarlo correctamente."
        },
        {
            "type": "callout",
            "text": "Una familia de autónomo con cónyuge e hijo puede deducirse hasta 1.500 € anuales en primas de seguro médico. Si la prima anual es de 2.400 €, el coste fiscal neto puede reducirse significativamente."
        },
        {
            "type": "heading",
            "text": "Qué necesita un autónomo en su seguro médico"
        },
        {
            "type": "list",
            "items": [
                "Acceso sin listas de espera: no puedes permitirte esperar 6 meses para una operación",
                "Urgencias 24 horas en toda España: imprescindible si viajas o trabajas en varias provincias",
                "Especialistas directos: sin derivación obligatoria que alarga los plazos",
                "Diagnóstico rápido: resonancias y TAC en días, no en meses",
                "Hospitalización completa: para cirugías que no pueden posponerse",
                "Precio estable: una prima que no tenga subidas sorpresa cada año"
            ]
        },
        {
            "type": "heading",
            "text": "Planes Adeslas recomendados para autónomos"
        },
        {
            "type": "list",
            "items": [
                "Adeslas Plena Plus: cobertura completa sin copago al precio más ajustado de los planes sin copago. Ideal para autónomos que valoran previsibilidad de gasto",
                "Adeslas Plena Total: sin copago + dental + accidentes + asistencia en viaje hasta 100.000 € + prima garantizada 3 años. La mejor opción si viajas frecuentemente por trabajo",
                "Adeslas Plena Vital: cobertura completa con copago y LMA de 300 €/año. Opción equilibrada si quieres cobertura total con prima más baja y aceptas el copago"
            ]
        },
        {
            "type": "heading",
            "text": "¿Merece la pena el seguro médico frente a la mutua de autónomos?"
        },
        {
            "type": "paragraph",
            "text": "La mutua de accidentes de trabajo y enfermedades profesionales es obligatoria para autónomos y cubre contingencias laborales. El seguro médico privado cubre la salud general: enfermedades comunes, especialistas, hospitalización por cualquier causa, cirugías no laborales. Son coberturas complementarias, no sustitutivas. La pregunta no es si necesitas uno u otro, sino cuánto te cuesta no tener el seguro médico cuando lo necesitas."
        },
        {
            "type": "heading",
            "text": "Cuánto cuesta un seguro médico para autónomos con Adeslas"
        },
        {
            "type": "paragraph",
            "text": "Para un autónomo de 35-45 años, un seguro médico completo sin copago con Adeslas puede estar entre 70 € y 120 € al mes según provincia y plan elegido. Con la deducción fiscal aplicada, el coste neto puede reducirse entre un 20 % y un 30 % dependiendo del tramo de IRPF. Un coste que se amortiza con una sola visita evitada a urgencias privadas."
        },
        {
            "type": "callout",
            "text": "Como agente exclusivo Adeslas, en Marchal Aseguradores te ayudamos a encontrar el plan con mejor relación cobertura-precio para tu actividad y situación. Llámanos al 91 710 50 00."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","seguro-medico-sin-copago-2026","seguro-medico-familias-2026"],
  },


  /* ── Precios: listas-de-espera-sanidad-publica-espana-2026 ── */
  {
    slug: "listas-de-espera-sanidad-publica-espana-2026",
    category: "Precios",
    title: "Listas de espera en la sanidad pública española en 2026: datos reales y alternativas",
    excerpt: "¿Cuánto se espera realmente para ver un especialista o para operarse en la sanidad pública en 2026? Los datos del Ministerio de Sanidad son más reveladores de lo que imaginas.",
    date: "17 May 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&h=400&fit=crop",
    seoTitle: "Listas de Espera Sanidad Pública España 2026: Datos y Alternativas",
    seoDescription: "Datos reales de listas de espera en la sanidad pública española 2026 por especialidad y comunidad autónoma. Cuánto se espera y qué alternativa ofrece Adeslas.",
    body: [
        {
            "type": "paragraph",
            "text": "Las listas de espera en la sanidad pública española son uno de los principales motivos por los que las familias deciden contratar un seguro médico privado. No es una percepción subjetiva: los datos oficiales del Sistema de Información sobre Listas de Espera del SNS (SISLE) confirman esperas que, en muchos casos, se miden en meses o incluso en más de un año."
        },
        {
            "type": "paragraph",
            "text": "Esta guía recoge los datos más recientes disponibles para 2026, ordenados por especialidad y tipo de espera, y explica cuál es la alternativa real que ofrece un seguro médico privado como Adeslas."
        },
        {
            "type": "heading",
            "text": "Espera media para ver al especialista en la sanidad pública"
        },
        {
            "type": "list",
            "items": [
                "Traumatología y ortopedia: 70-120 días de media nacional",
                "Dermatología: 60-100 días",
                "Oftalmología: 55-90 días",
                "Cardiología: 50-80 días",
                "Digestivo (gastroenterología): 60-90 días",
                "Neurología: 80-130 días",
                "Psiquiatría: 45-90 días",
                "Ginecología: 30-60 días",
                "Reumatología: 80-120 días"
            ]
        },
        {
            "type": "heading",
            "text": "Espera para cirugía electiva en la sanidad pública 2026"
        },
        {
            "type": "paragraph",
            "text": "La espera media para cirugía electiva (programada, no urgente) a nivel nacional supera los 5 meses. Pero la media esconde grandes diferencias entre comunidades autónomas. Cataluña, Madrid y País Vasco tienen listas más cortas que la media. Comunidades como Canarias, Murcia o algunas zonas de Castilla-La Mancha pueden superar los 12-18 meses para determinadas intervenciones."
        },
        {
            "type": "list",
            "items": [
                "Cataratas: espera media de 5-9 meses",
                "Prótesis de rodilla: 12-18 meses en muchas CC.AA.",
                "Hernia inguinal: 4-8 meses",
                "Colecistectomía (vesícula): 4-7 meses",
                "Intervenciones de columna: 8-14 meses",
                "Varices: 6-12 meses"
            ]
        },
        {
            "type": "callout",
            "text": "Una espera de 12 meses para una prótesis de rodilla significa 12 meses con dolor, movilidad reducida y, en muchos casos, sin poder trabajar con normalidad. El coste real de la espera no es solo médico: es económico y de calidad de vida."
        },
        {
            "type": "heading",
            "text": "¿Cómo afecta esto a pruebas diagnósticas?"
        },
        {
            "type": "paragraph",
            "text": "Las listas de espera no son solo para cirugía. Las pruebas diagnósticas también tienen demoras significativas en la sanidad pública. Una resonancia magnética puede tardar 2-4 meses en muchas comunidades. Una colonoscopia, entre 2 y 6 meses. En un contexto donde el diagnóstico temprano es clave —especialmente en oncología— estas demoras pueden tener consecuencias clínicas reales."
        },
        {
            "type": "heading",
            "text": "La alternativa: qué ofrece Adeslas frente a las listas de espera"
        },
        {
            "type": "list",
            "items": [
                "Cita con especialista: en 24-72 horas en la mayoría de casos",
                "Resonancia magnética o TAC: en menos de una semana",
                "Colonoscopia o gastroscopia diagnóstica: en 7-15 días",
                "Cirugía electiva: desde semanas, no meses",
                "Sin necesidad de derivación del médico de cabecera para acceder al especialista",
                "Seguimiento post-quirúrgico inmediato"
            ]
        },
        {
            "type": "paragraph",
            "text": "Un seguro médico privado no sustituye a la sanidad pública: la complementa. Muchas personas usan la pública para la medicina preventiva y de seguimiento, y la privada para el acceso rápido a especialistas y diagnóstico. Como agente exclusivo Adeslas, en Marchal Aseguradores te ayudamos a encontrar el plan que encaje con tu uso real. Llámanos al 91 710 50 00."
        }
    ],
    relatedSlugs: ["hospitalizacion-privada-vs-publica","cuanto-cuesta-operacion-privada-espana-2026","comparativa-seguros-medicos-adeslas-2026"],
  },


  /* ── Cuadro Médico: cuadro-medico-adeslas-como-funciona ── */
  {
    slug: "cuadro-medico-adeslas-como-funciona",
    category: "Cuadro Médico",
    title: "Cuadro médico Adeslas: cómo funciona, cómo consultarlo y qué especialidades incluye",
    excerpt: "El cuadro médico es uno de los factores más importantes al elegir un seguro. Adeslas cuenta con más de 51.000 médicos en España. Aquí te explicamos cómo sacarle partido.",
    date: "20 May 2026",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop",
    seoTitle: "Cuadro Médico Adeslas 2026: Cómo Funciona y Cómo Consultarlo",
    seoDescription: "Todo sobre el cuadro médico Adeslas: cómo consultarlo, qué especialidades incluye, cómo pedir cita y cómo funciona la app de Adeslas. Guía completa 2026.",
    body: [
        {
            "type": "paragraph",
            "text": "El cuadro médico de Adeslas es la red de médicos, especialistas, clínicas y hospitales concertados a los que puedes acceder como asegurado. Con más de 51.000 médicos y más de 1.400 centros en toda España, es la mayor red médica privada del país. Saber cómo utilizarla correctamente marca la diferencia entre aprovechar al máximo tu seguro y no hacerlo."
        },
        {
            "type": "heading",
            "text": "Cómo consultar el cuadro médico Adeslas"
        },
        {
            "type": "list",
            "items": [
                "Web oficial Adeslas: en la sección 'Cuadro Médico' puedes filtrar por especialidad, provincia y centro",
                "App Adeslas: disponible para iOS y Android, permite consultar y pedir cita directamente",
                "Teléfono de atención al cliente: disponible para resolver dudas sobre profesionales disponibles en tu zona",
                "Tu asesor de Marchal Aseguradores: te ayudamos a identificar los mejores profesionales para tu caso concreto"
            ]
        },
        {
            "type": "heading",
            "text": "Especialidades incluidas en el cuadro médico Adeslas"
        },
        {
            "type": "list",
            "items": [
                "Medicina general y médico de cabecera",
                "Cardiología, neumología, digestivo, nefrología, endocrinología",
                "Traumatología y cirugía ortopédica",
                "Neurología y neurocirugía",
                "Ginecología y obstetricia",
                "Pediatría y neonatología",
                "Psiquiatría y psicología",
                "Dermatología",
                "Oftalmología",
                "Otorrinolaringología (ORL)",
                "Urología",
                "Oncología médica y radioterapia",
                "Reumatología",
                "Hematología",
                "Cirugía general, plástica, vascular y torácica",
                "Anestesiología",
                "Podología (hasta 12 sesiones/año)",
                "Fisioterapia y rehabilitación"
            ]
        },
        {
            "type": "heading",
            "text": "¿Cómo pedir cita con un médico del cuadro Adeslas?"
        },
        {
            "type": "paragraph",
            "text": "Puedes pedir cita de tres formas: directamente a través de la app Adeslas, llamando al centro médico o clínica elegida, o a través de la web de Adeslas. No necesitas derivación del médico de cabecera para acceder a la mayoría de especialistas: puedes ir directamente al especialista que necesites con tu número de póliza."
        },
        {
            "type": "callout",
            "text": "Una de las ventajas más valoradas por los asegurados Adeslas es precisamente el acceso directo al especialista sin necesidad de pasar primero por el médico de cabecera. Esto reduce significativamente el tiempo hasta el diagnóstico."
        },
        {
            "type": "heading",
            "text": "¿Qué pasa si necesito un médico que no está en el cuadro?"
        },
        {
            "type": "paragraph",
            "text": "Si el especialista que quieres consultar no forma parte de la red Adeslas, tienes dos opciones según el plan que tengas: con los planes estándar, la consulta fuera de red no está cubierta. Con Adeslas Plena Extra 150, puedes acudir a cualquier médico u hospital —dentro y fuera de la red— y Adeslas te reembolsa el 80 % del gasto hasta 150.000 € al año."
        },
        {
            "type": "heading",
            "text": "La app Adeslas: gestiona todo desde el móvil"
        },
        {
            "type": "list",
            "items": [
                "Consultar y pedir cita con cualquier médico del cuadro",
                "Ver tu tarjeta de asegurado en formato digital",
                "Acceder a informes y resultados de pruebas",
                "Gestionar la póliza y datos personales",
                "Localizar el centro más cercano con mapa interactivo",
                "Contacto con el servicio de atención al asegurado"
            ]
        },
        {
            "type": "paragraph",
            "text": "Si tienes dudas sobre qué médico elegir para tu situación concreta o quieres saber si tu médico habitual forma parte del cuadro Adeslas, en Marchal Aseguradores te ayudamos a verificarlo antes de contratar. Llámanos al 91 710 50 00."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","carencias-seguros-medicos-adeslas","hospitalizacion-privada-vs-publica"],
  },

  /* ── GEO #1: ¿Merece la pena un seguro médico privado en España? ── */
  {
    slug: "merece-la-pena-seguro-medico-privado-espana-2026",
    category: "Seguros Adeslas",
    title: "¿Merece la pena un seguro médico privado en España en 2026?",
    excerpt:
      "El 39% de los españoles ya tiene seguro privado. Pero, ¿de verdad merece la pena pagarlo si ya cotizamos a la Seguridad Social? Analizamos los datos reales sin eufemismos.",
    date: "22 May 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    seoTitle: "¿Merece la Pena un Seguro Médico Privado en España en 2026?",
    seoDescription:
      "Análisis honesto con datos reales: listas de espera, costes, coberturas y para quién tiene más sentido contratar un seguro médico privado en España en 2026.",
    body: [
      {
        type: "paragraph",
        text: "La pregunta es legítima. Pagamos cotizaciones a la Seguridad Social cada mes y, sobre el papel, tenemos acceso a toda la sanidad pública. ¿Por qué gastar 40, 60 o 90 euros más al mes en un seguro privado? La respuesta honesta es: depende. Pero hay datos que hacen esa respuesta mucho más clara de lo que parece.",
      },
      {
        type: "heading",
        text: "El dato que cambia el debate: las listas de espera reales",
      },
      {
        type: "paragraph",
        text: "Según el último informe del Sistema de Información sobre Listas de Espera del SNS (Ministerio de Sanidad, diciembre 2025), la espera media para ver a un especialista en España es de 93 días. Para una intervención quirúrgica, la media supera los 120 días. En comunidades como Canarias, Cataluña o Comunidad Valenciana, los tiempos se extienden hasta los 6-8 meses para pruebas como resonancias magnéticas.",
      },
      {
        type: "callout",
        text: "93 días de media para ver a un especialista en la sanidad pública. Con un seguro médico privado Adeslas: cita en 24-48 horas en cualquier punto de España.",
      },
      {
        type: "paragraph",
        text: "Eso no significa que la sanidad pública sea mala. Es excelente en emergencias, en oncología de alta complejidad y en patologías crónicas graves. El problema son los tiempos para la atención no urgente: una rodilla que duele, un nódulo que inquieta, una mancha de piel que no desaparece. En esos casos, tres meses de espera no son un problema administrativo: son tres meses de incertidumbre y deterioro.",
      },
      {
        type: "heading",
        text: "Para quién tiene más sentido el seguro privado",
      },
      {
        type: "list",
        items: [
          "Personas activas laboralmente: cada semana de baja innecesaria tiene un coste real. Resolver una lesión o un diagnóstico en días en lugar de meses tiene valor económico directo.",
          "Familias con hijos: la pediatría privada ofrece visita el mismo día, sin esperas. En niños, no hay margen para \"a ver si en tres semanas hay hueco\".",
          "Autónomos: sin nómina, cada día sin poder trabajar es pérdida directa. La sanidad privada elimina ese riesgo.",
          "Mayores de 45 años: la probabilidad de necesitar especialistas (cardiología, traumatología, oftalmología) crece exponencialmente a partir de esa edad.",
          "Personas con patologías crónicas controladas: revisiones periódicas y acceso rápido a especialistas sin depender de derivaciones del médico de cabecera.",
          "Trabajadores en municipios pequeños: la cobertura especializada de la sanidad pública es mucho más limitada fuera de las grandes ciudades.",
        ],
      },
      {
        type: "heading",
        text: "El coste real frente al coste percibido",
      },
      {
        type: "paragraph",
        text: "Un seguro médico Adeslas cuesta desde 21€/mes para personas jóvenes. Para una persona de 40 años con cobertura completa (sin copago), el precio ronda los 80-100€/mes. Eso son 1.200€ al año. La pregunta es: ¿cuánto cuestan los servicios que vas a usar si pagas directamente en la sanidad privada sin seguro?",
      },
      {
        type: "list",
        items: [
          "Una consulta con especialista privado: entre 60€ y 150€",
          "Una resonancia magnética privada: entre 200€ y 450€",
          "Una analítica completa privada: entre 80€ y 200€",
          "Un día de hospitalización en clínica privada: entre 500€ y 1.500€",
          "Una operación de menisco: entre 3.000€ y 8.000€",
          "Un parto en clínica privada: entre 2.500€ y 6.000€",
        ],
      },
      {
        type: "paragraph",
        text: "Con dos o tres visitas al año al especialista y una prueba diagnóstica, el seguro ya se ha pagado solo. A partir de ahí, todo es beneficio: acceso ilimitado a 51.000 médicos, hospitalización sin tope, urgencias 24 horas en toda España.",
      },
      {
        type: "heading",
        text: "Lo que el seguro privado NO sustituye",
      },
      {
        type: "paragraph",
        text: "Un seguro médico privado no sustituye a la Seguridad Social: no cubre las prestaciones económicas por enfermedad, no gestiona la baja laboral (eso es competencia de la Seguridad Social o la Mutua), y en patologías de alta complejidad como ciertos tipos de cáncer, trasplantes o tratamientos experimentales, la sanidad pública puede ofrecer recursos que la privada no alcanza. El seguro privado es un complemento, no un sustituto.",
      },
      {
        type: "heading",
        text: "La conclusión práctica",
      },
      {
        type: "paragraph",
        text: "Para una persona activa de entre 25 y 65 años en España, con familia o sin ella, el seguro médico privado tiene un retorno claro si se usa aunque sea moderadamente: dos o tres visitas al especialista al año, una prueba diagnóstica, o simplemente el valor de saber que mañana por la mañana puedes pedir cita con el cardiólogo si lo necesitas. El coste de la tranquilidad, en este caso, se puede calcular: desde 21€ al mes.",
      },
      {
        type: "callout",
        text: "¿Quieres saber cuánto costaría un seguro Adeslas para ti exactamente? Calcula tu precio en menos de 2 minutos, sin compromiso y sin dar datos bancarios.",
      },
    ],
    relatedSlugs: [
      "comparativa-seguros-medicos-adeslas-2026",
      "listas-de-espera-sanidad-publica-espana-2026",
      "cuanto-cuesta-operacion-privada-espana-2026",
    ],
  },

  /* ── GEO #2: Coste real seguro médico familiar 2026 ── */
  {
    slug: "seguro-medico-familia-coste-real-2026",
    category: "Precios",
    title: "Seguro médico para familia: coste real para 2, 3 o 4 personas en 2026",
    excerpt:
      "¿Cuánto cuesta realmente asegurar a toda la familia con Adeslas? Ejemplos de precio con edades reales, el descuento del 4º asegurado y qué plan conviene según tu situación.",
    date: "23 May 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=600&h=400&fit=crop",
    seoTitle: "Seguro Médico Familiar: Coste Real para 2, 3 o 4 Personas en 2026",
    seoDescription:
      "Ejemplos de precio reales para familias de 2, 3 y 4 personas con seguro médico Adeslas 2026. Qué plan elegir, cómo funciona el descuento familiar y cuánto se ahorra.",
    body: [
      {
        type: "paragraph",
        text: "Cuando buscas seguro médico para toda la familia, el precio que ves en los comparadores es siempre para una persona. La realidad familiar es más compleja: distintas edades, distintas necesidades, y la duda de si sale más a cuenta hacer pólizas individuales o una póliza colectiva. Este artículo responde con números reales.",
      },
      {
        type: "heading",
        text: "Cómo funciona el precio en Adeslas para familias",
      },
      {
        type: "paragraph",
        text: "En Adeslas, el precio de cada asegurado se calcula individualmente en función de su edad y provincia. En una póliza familiar, todos los miembros pueden estar en el mismo contrato, lo que facilita la gestión, pero cada persona paga su prima según su tramo de edad. El gran beneficio de la póliza familiar es el descuento del 10% que se aplica a todos los asegurados a partir del cuarto miembro.",
      },
      {
        type: "heading",
        text: "Ejemplos de precio para familias reales (Plena Vital, Madrid, 2026)",
      },
      {
        type: "paragraph",
        text: "Los siguientes ejemplos son orientativos para la provincia de Madrid con el plan Adeslas Plena Vital (cobertura completa con hospitalización y copago máx. 300€/año), que es el plan más contratado por familias. Los precios pueden variar ligeramente según la edad exacta y la fecha de contratación.",
      },
      {
        type: "list",
        items: [
          "Pareja sin hijos (35 + 33 años): aproximadamente 95-110€/mes en total. Cada uno paga su prima individual, sin descuento por ser dos.",
          "Familia de 3 (pareja 38+36 años + hijo 7 años): aproximadamente 130-150€/mes. El hijo paga una prima menor que los adultos.",
          "Familia de 4 (pareja 40+38 años + dos hijos 10 y 7 años): aproximadamente 165-185€/mes con el descuento del 10% aplicado al cuarto asegurado.",
          "Familia de 5 (pareja 42+40 años + tres hijos): el descuento del 10% aplica al 4º y 5º asegurado, reduciendo el coste total respecto a cinco pólizas individuales.",
        ],
      },
      {
        type: "callout",
        text: "El plan Adeslas Plena Vital Total añade dental incluido y precio garantizado 3 años. Para familias que planifican su presupuesto, es la opción más recomendada: pagas un poco más ahora pero sabes exactamente cuánto vas a pagar en los próximos tres años.",
      },
      {
        type: "heading",
        text: "¿Qué plan Adeslas elegir para una familia con hijos?",
      },
      {
        type: "paragraph",
        text: "Para familias con hijos en edad escolar (0-18 años), la prioridad es la cobertura pediátrica sin esperas y la hospitalización. Estas son las opciones más recomendadas:",
      },
      {
        type: "list",
        items: [
          "Adeslas Plena Vital (desde 38€/mes adulto): la opción más económica con hospitalización completa. Copago máximo 300€/año por asegurado. Recomendado para familias con buen estado de salud y uso moderado del seguro.",
          "Adeslas Plena Vital Total (desde 48,50€/mes adulto): añade dental incluido, psicología y garantía de precio 3 años. El más recomendado para familias que quieren control total del gasto a medio plazo.",
          "Adeslas Plena Total (desde 83€/mes adulto): sin copago en ningún servicio, con dental y psicología. Para familias que usan mucho el seguro y no quieren pensar en copagos.",
        ],
      },
      {
        type: "heading",
        text: "El descuento del 4º asegurado: cómo funciona exactamente",
      },
      {
        type: "paragraph",
        text: "A partir del cuarto asegurado en la misma póliza, Adeslas aplica un descuento del 10% en la prima de ese asegurado y de todos los siguientes. El descuento se aplica sobre la prima base de cada persona según su edad. En familias numerosas, el ahorro es significativo: con 5 asegurados, el cuarto y el quinto tienen un 10% de descuento, lo que puede suponer 15-25€/mes de ahorro.",
      },
      {
        type: "heading",
        text: "¿Conviene hacer una póliza conjunta o pólizas individuales?",
      },
      {
        type: "paragraph",
        text: "Una sola póliza familiar simplifica la gestión (una domiciliación, un interlocutor, una renovación anual) y activa el descuento a partir del cuarto asegurado. Las pólizas individuales ofrecen más flexibilidad si cada miembro quiere un plan diferente (por ejemplo, los adultos con Plena Total y los niños con Plena Vital). No hay una respuesta única, pero para familias donde todos van a tener el mismo plan, la póliza conjunta es más eficiente.",
      },
      {
        type: "callout",
        text: "Calcula el precio exacto para tu familia en el tarificador de Marchal Aseguradores. En menos de 2 minutos tienes el desglose por persona y el total mensual, sin necesidad de dar datos bancarios.",
      },
    ],
    relatedSlugs: [
      "seguro-medico-familias-2026",
      "comparativa-seguros-medicos-adeslas-2026",
      "merece-la-pena-seguro-medico-privado-espana-2026",
    ],
  },

  /* ── GEO #3: Cambiar de seguro médico sin carencias ── */
  {
    slug: "como-cambiar-seguro-medico-sin-carencias-2026",
    category: "Carencias",
    title: "Cómo cambiar de seguro médico sin carencias ni interrupciones en 2026",
    excerpt:
      "Cambiar de aseguradora no tiene por qué suponer empezar de cero. Si sabes cómo hacerlo, puedes mantener todas tus coberturas activas desde el primer día. Guía completa.",
    date: "24 May 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    seoTitle: "Cómo Cambiar de Seguro Médico a Adeslas sin Carencias en 2026",
    seoDescription:
      "Guía paso a paso para cambiar de seguro médico a Adeslas sin períodos de carencia. Qué documentos necesitas, cómo solicitar el reconocimiento de antigüedad y cuándo hacer el cambio.",
    body: [
      {
        type: "paragraph",
        text: "El miedo a las carencias es uno de los principales frenos para cambiar de seguro médico. «Y si cambio, ¿tendré que esperar 8 meses para que me cubra el parto?», «¿Y si me diagnostican algo antes de que acaben las carencias?». Son preguntas legítimas, y la respuesta es: si el cambio se hace bien, las carencias no existen.",
      },
      {
        type: "heading",
        text: "Por qué existen las carencias y cuándo no aplican",
      },
      {
        type: "paragraph",
        text: "Las carencias protegen a la aseguradora de que alguien contrate el seguro sabiendo que va a necesitar una intervención inminente. Tienen sentido cuando contratas por primera vez. Pero cuando llevas años pagando un seguro médico y simplemente cambias de compañía, mantener esas carencias sería injusto: ya has demostrado que no eres un asegurado de alto riesgo.",
      },
      {
        type: "paragraph",
        text: "Por eso, la industria aseguradora en España tiene un mecanismo establecido: el reconocimiento de antigüedad. Si cambias de aseguradora sin interrupción —es decir, con continuidad de cobertura— la nueva compañía puede eliminar o reducir las carencias reconociendo el tiempo que llevas asegurado.",
      },
      {
        type: "heading",
        text: "Condiciones para cambiar a Adeslas sin carencias",
      },
      {
        type: "list",
        items: [
          "Debes llevar al menos 12 meses asegurado con tu aseguradora actual (algunos períodos de carencia específicos pueden requerir más tiempo).",
          "No debe haber interrupción entre el vencimiento del seguro anterior y el inicio del seguro Adeslas. Lo ideal es solapar unos días para garantizar la continuidad.",
          "Debes aportar certificado de antigüedad emitido por tu aseguradora actual (la mayoría lo genera automáticamente al tramitar la baja).",
          "El cambio debe hacerse antes del vencimiento del seguro, no después. Una vez que la póliza ha caducado y ha pasado tiempo sin seguro, las carencias vuelven a aplicar.",
        ],
      },
      {
        type: "heading",
        text: "Paso a paso: cómo hacer el cambio correctamente",
      },
      {
        type: "list",
        items: [
          "Paso 1. Calcula tu precio en Adeslas: antes de nada, confirma que el plan Adeslas que te interesa existe dentro de tu presupuesto. Hazlo en https://adeslas.numero1salud.es/precios-y-ofertas/",
          "Paso 2. Fecha de vencimiento de tu póliza actual: localiza la fecha exacta en que vence tu seguro. Los contratos de seguro se renuevan automáticamente, así que tienes que comunicar la no-renovación con al menos 30 días de antelación (revisa las condiciones de tu póliza actual, puede ser más).",
          "Paso 3. Comunica la baja a tu aseguradora: envía un escrito (normalmente por burofax, email con acuse o carta certificada) comunicando que no deseas renovar. Solicita al mismo tiempo el certificado de antigüedad.",
          "Paso 4. Contrata Adeslas con fecha de efecto solapada: la fecha de inicio de tu nuevo seguro Adeslas debe ser igual o anterior a la fecha de fin de tu seguro actual. Con esa continuidad, Adeslas puede reconocer tu antigüedad.",
          "Paso 5. Aporta el certificado de antigüedad: una vez contratado el nuevo seguro, aporta el certificado de tu aseguradora anterior. El equipo de Marchal Aseguradores gestiona este trámite contigo.",
        ],
      },
      {
        type: "callout",
        text: "Importante: no canceles el seguro anterior hasta tener el nuevo en vigor. La interrupción, aunque sea de un día, puede hacer que las carencias vuelvan a aplicar.",
      },
      {
        type: "heading",
        text: "Qué pasa si tienes una patología preexistente",
      },
      {
        type: "paragraph",
        text: "Las patologías preexistentes declaradas en el cuestionario de salud pueden generar exclusiones o sobreprimas en el nuevo seguro, independientemente del tiempo que lleves asegurado. Esto no tiene que ver con las carencias, sino con la evaluación del riesgo. Sin embargo, si tu patología preexistente estaba ya cubierta en tu seguro anterior y el cambio se hace correctamente, Adeslas puede reconocer esa cobertura sin exclusiones adicionales. Cada caso es distinto: consúltalo con nuestro equipo antes de tramitar el cambio.",
      },
      {
        type: "heading",
        text: "Cuándo es el mejor momento para cambiar de seguro",
      },
      {
        type: "paragraph",
        text: "El mejor momento es siempre antes del vencimiento de tu póliza actual, con al menos 30-45 días de margen. Así tienes tiempo de solicitar el certificado de antigüedad, contratar el nuevo seguro con la fecha de efecto correcta y resolver cualquier incidencia sin prisas. Cambiar de seguro médico bien hecho es un proceso de dos semanas, no de un día.",
      },
      {
        type: "callout",
        text: "En Marchal Aseguradores gestionamos todo el proceso de cambio contigo, incluyendo la comunicación de baja a tu aseguradora actual y el reconocimiento de antigüedad en Adeslas. Llámanos al 91 710 50 00 o solicita que te llamemos.",
      },
    ],
    relatedSlugs: [
      "carencias-seguros-medicos-adeslas",
      "comparativa-seguros-medicos-adeslas-2026",
      "merece-la-pena-seguro-medico-privado-espana-2026",
    ],
  },

  /* ── GEO #4: Sanidad privada sin seguro — costes reales ── */
  {
    slug: "sanidad-privada-sin-seguro-costes-reales-2026",
    category: "Precios",
    title: "Sanidad privada sin seguro en España: precios reales de consultas y operaciones en 2026",
    excerpt:
      "¿Cuánto cuesta ir al médico privado pagando directamente? Precios reales de consultas, pruebas diagnósticas y operaciones en España en 2026, sin pasar por ningún seguro.",
    date: "25 May 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    seoTitle: "Sanidad Privada sin Seguro: Precios Reales en España 2026",
    seoDescription:
      "Precios reales de consultas, pruebas diagnósticas, operaciones y hospitalización en la sanidad privada española en 2026. Cuánto cuesta sin seguro médico y qué ahorra tener uno.",
    body: [
      {
        type: "paragraph",
        text: "Antes de contratar un seguro médico, es natural preguntarse: ¿cuánto me costaría pagar directamente cuando lo necesite? La respuesta depende de lo que necesites, pero los números son más sorprendentes de lo que la gente espera. Este artículo recoge precios reales de clínicas privadas en España en 2026.",
      },
      {
        type: "heading",
        text: "Consultas con especialista: lo más frecuente",
      },
      {
        type: "paragraph",
        text: "La visita al especialista es el servicio más utilizado en la sanidad privada. Los precios varían según la especialidad, la ciudad y el prestigio del médico, pero los rangos habituales en clínicas privadas de nivel medio en España son:",
      },
      {
        type: "list",
        items: [
          "Médico de cabecera / médico de familia: 40-80€ por visita",
          "Dermatólogo: 80-150€ primera consulta, 60-100€ revisión",
          "Cardiólogo: 100-180€ primera consulta (sin pruebas)",
          "Traumatólogo: 80-150€ primera consulta",
          "Ginecólogo: 80-150€ revisión anual con ecografía",
          "Psicólogo o psiquiatra: 70-150€ por sesión de 50 minutos",
          "Oftalmólogo: 70-120€ primera consulta",
          "Neurólogo: 120-200€ primera consulta",
          "Digestólogo: 100-160€ primera consulta",
          "Oncólogo: 150-250€ primera consulta",
        ],
      },
      {
        type: "heading",
        text: "Pruebas diagnósticas: el coste oculto",
      },
      {
        type: "paragraph",
        text: "Las pruebas son donde el coste se dispara. Una sola consulta puede generar una cadena de pruebas que suma cientos de euros antes de llegar a un diagnóstico:",
      },
      {
        type: "list",
        items: [
          "Analítica básica (hemograma + bioquímica): 60-120€",
          "Analítica completa con hormonas y marcadores: 150-350€",
          "Radiografía simple: 40-80€",
          "Ecografía abdominal o pélvica: 80-180€",
          "Resonancia magnética (cualquier zona): 250-550€",
          "TAC (tomografía computerizada): 200-450€",
          "Colonoscopia: 400-800€",
          "Gastroscopia: 300-600€",
          "Ecocardiograma: 150-300€",
          "Mamografía: 80-150€",
        ],
      },
      {
        type: "callout",
        text: "Una resonancia magnética de rodilla, un cardiólogo y una analítica completa: 600-1.000€ de una sola vez. Con un seguro Adeslas Plena Vital (desde 38€/mes), eso queda cubierto con el copago máximo de 300€ al año, sin importar cuántas pruebas se hagan.",
      },
      {
        type: "heading",
        text: "Intervenciones quirúrgicas: donde el coste es más serio",
      },
      {
        type: "list",
        items: [
          "Apendicitis (apendicectomía laparoscópica): 3.500-7.000€ (incluye hospitalización 2-3 días)",
          "Operación de menisco: 3.000-6.000€ (incluye hospitalización 1 día)",
          "Artroscopia de hombro: 3.500-6.500€",
          "Hernia inguinal: 2.500-5.000€",
          "Cataratas (un ojo, monofocal): 1.500-3.000€",
          "Amígdalas (amigdalectomía): 2.000-4.000€",
          "Cálculos renales (litotricia): 1.500-3.500€",
          "Cesárea o parto en clínica privada: 2.500-6.000€ (incluye estancia madre y bebé)",
          "Prótesis de rodilla: 8.000-16.000€",
          "Bypass coronario: 15.000-30.000€",
        ],
      },
      {
        type: "paragraph",
        text: "Estos precios son orientativos y representan el coste total para el paciente que paga directamente, sin seguro. En algunas clínicas de alta gama de Madrid o Barcelona, los precios pueden ser notablemente superiores.",
      },
      {
        type: "heading",
        text: "La hospitalización: el componente más impredecible",
      },
      {
        type: "paragraph",
        text: "El mayor riesgo financiero de no tener seguro no son las consultas: es la hospitalización inesperada. Una hospitalización en clínica privada de nivel medio cuesta entre 500€ y 1.500€ por día solo de habitación, sin contar médicos, enfermería, análisis y medicación. Un ingreso de 5 días puede suponer fácilmente 8.000-15.000€.",
      },
      {
        type: "heading",
        text: "Cuándo el cálculo cambia claramente a favor del seguro",
      },
      {
        type: "paragraph",
        text: "Si en un año normal usas el sistema sanitario con cierta frecuencia —dos o tres visitas al especialista, una prueba diagnóstica, alguna urgencia— el coste sin seguro supera rápidamente los 600-1.000€. Un seguro Adeslas Plena Vital cuesta unos 500-700€ al año para un adulto de 35-40 años en Madrid, con copago máximo de 300€ anuales. El punto de equilibrio se alcanza antes de lo que parece, y eso sin contar la hospitalización.",
      },
      {
        type: "callout",
        text: "El seguro médico no es solo un producto financiero. Es acceso garantizado a 51.000 médicos sin esperas, sin sorpresas de precio y sin que una mala semana de salud arruine tu presupuesto anual. Calcula tu precio en Adeslas desde 21€/mes.",
      },
    ],
    relatedSlugs: [
      "cuanto-cuesta-operacion-privada-espana-2026",
      "merece-la-pena-seguro-medico-privado-espana-2026",
      "comparativa-seguros-medicos-adeslas-2026",
    ],
  },


  /* ── Coberturas: que-cubre-seguro-medico-adeslas-2026 ── */
  {
    slug: "que-cubre-seguro-medico-adeslas-2026",
    category: "Coberturas",
    title: "¿Qué cubre un seguro médico Adeslas? Coberturas completas 2026",
    excerpt: "Desde la primera consulta hasta una hospitalización compleja: esto es exactamente lo que incluye un seguro médico Adeslas en 2026, cobertura por cobertura.",
    date: "30 May 2026",
    readTime: "9 min",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
    seoTitle: "¿Qué Cubre un Seguro Médico Adeslas? Coberturas Completas 2026",
    seoDescription: "Guía completa de coberturas del seguro médico Adeslas 2026: ambulatorio, hospitalización, urgencias, diagnóstico, salud mental, dental, maternidad y más. Todo lo que incluye tu póliza.",
    body: [
        {
            "type": "paragraph",
            "text": "Un seguro médico Adeslas cubre, en función del plan elegido: toda la asistencia ambulatoria (médico general y más de 40 especialidades), diagnóstico de alta tecnología (resonancias, TAC, PET), urgencias 24 horas los 365 días del año, hospitalización en habitación individual, cirugía sin límite de intervenciones, salud mental, y servicios adicionales como telemedicina y segunda opinión médica. Es, en la práctica, una alternativa completa a la sanidad pública sin listas de espera."
        },
        {
            "type": "paragraph",
            "text": "A continuación desglosamos cada bloque de cobertura para que sepas exactamente qué tienes incluido y, tan importante como eso, qué no cubre ningún seguro médico estándar y por qué."
        },
        {
            "type": "heading",
            "text": "Asistencia ambulatoria: el núcleo del seguro"
        },
        {
            "type": "paragraph",
            "text": "La cobertura ambulatoria es la que más usan los asegurados en su día a día. Incluye todas las consultas con médico de cabecera y con especialistas sin necesidad de derivación previa, igual que funciona la medicina privada: eliges el médico, pides cita directamente y vas. Sin burocracia, sin esperas de semanas."
        },
        {
            "type": "list",
            "items": [
                "Medicina general y de familia: cita el mismo día o al día siguiente en la mayoría de centros",
                "Más de 40 especialidades médicas: cardiología, dermatología, ginecología, traumatología, urología, reumatología, neurología, endocrinología y muchas más",
                "Pediatría: para los asegurados menores de 14 años (o hasta 18 según el plan)",
                "Podología: hasta 12 sesiones al año según el plan",
                "Rehabilitación ambulatoria: fisioterapia, logopedia, terapia ocupacional",
                "Psicología clínica: sesiones con psicólogo en la red Adeslas (10 sesiones/año en Plena Vital; 20 sesiones/año en Plena Vital Total y Plena Total; con carencia de 3 meses)"
            ]
        },
        {
            "type": "heading",
            "text": "Diagnóstico de alta tecnología"
        },
        {
            "type": "paragraph",
            "text": "Una de las mayores ventajas frente a la sanidad pública es el acceso rápido a pruebas diagnósticas de alta tecnología. En la sanidad pública, una resonancia magnética puede tener una lista de espera de 3 a 6 meses. Con Adeslas, la espera media es de días."
        },
        {
            "type": "list",
            "items": [
                "Resonancia magnética (RM): sin límite de exploraciones",
                "Tomografía axial computarizada (TAC): incluida en todos los planes",
                "PET (tomografía por emisión de positrones): cubierta en los planes con hospitalización",
                "Ecografías: diagnósticas y de seguimiento",
                "Analíticas de sangre y orina: en laboratorios propios y concertados",
                "Radiografías: incluidas en todos los planes",
                "Electrocardiograma, prueba de esfuerzo, ecocardiograma: en cardiología",
                "Endoscopia, colonoscopia, gastroscopia: cubiertas por el seguro"
            ]
        },
        {
            "type": "heading",
            "text": "Urgencias: cobertura desde el primer día, sin carencia"
        },
        {
            "type": "paragraph",
            "text": "Las urgencias están cubiertas desde el mismo día en que el seguro entra en vigor, sin ningún periodo de carencia. Esto es válido para todos los planes Adeslas. Puedes acudir a cualquier centro de urgencias de la red Adeslas en toda España, 24 horas al día, 365 días al año."
        },
        {
            "type": "heading",
            "text": "Hospitalización y cirugía"
        },
        {
            "type": "paragraph",
            "text": "La cobertura de hospitalización incluye todo lo que ocurre durante un ingreso: la habitación individual con cama para un acompañante, los honorarios del cirujano y del anestesista, el uso del quirófano, las pruebas realizadas durante el ingreso, la medicación hospitalaria y la recuperación postoperatoria. No hay copago adicional por la habitación ni por las noches de ingreso."
        },
        {
            "type": "list",
            "items": [
                "Habitación individual con cama para acompañante: incluida en todos los planes con hospitalización",
                "Cirugía programada: intervenciones planificadas con el especialista, sin límite de número",
                "Cirugía urgente: cubierta desde el primer día (no tiene carencia)",
                "Cirugía ambulatoria (sin ingreso nocturno): incluida",
                "Unidad de Cuidados Intensivos (UCI): cubierta cuando es necesaria",
                "Rehabilitación hospitalaria post-quirúrgica: incluida en el ingreso",
                "Medicación durante el ingreso: cubierta al 100 %",
                "Carencia de hospitalización programada: 6 meses desde la contratación"
            ]
        },
        {
            "type": "heading",
            "text": "Salud mental: psicología y psiquiatría"
        },
        {
            "type": "paragraph",
            "text": "Los planes con hospitalización incluyen psiquiatría y psicología clínica en la red. El número de sesiones de psicología varía según el plan: 10 sesiones/año en Plena Vital y 20 sesiones/año en Plena Vital Total y Plena Total. La psicología tiene una carencia de 3 meses. Consulta las condiciones concretas de tu plan con tu asesor."
        },
        {
            "type": "heading",
            "text": "Maternidad y obstetricia"
        },
        {
            "type": "paragraph",
            "text": "El seguimiento del embarazo, el parto (natural o por cesárea) y el postparto están cubiertos en todos los planes Adeslas que incluyen hospitalización. Existe una carencia de 8 meses para la cobertura de maternidad. Los controles prenatales (ecografías, analíticas, visitas al ginecólogo) tienen acceso inmediato como cobertura ambulatoria."
        },
        {
            "type": "heading",
            "text": "Servicios adicionales según el plan"
        },
        {
            "type": "list",
            "items": [
                "Telemedicina y videoconsulta: disponible en todos los planes, sin coste adicional",
                "Segunda opinión médica: acceso a una segunda valoración especializada para diagnósticos complejos",
                "Asistencia médica en viaje: cobertura internacional en Plena Vital Total, Plena Total y Extra 150",
                "Chequeo médico anual: revisión preventiva adaptada a edad y sexo",
                "Seguro dental incluido: en Plena Vital Total y Plena Total (46 actos dentales cubiertos)",
                "Transporte sanitario: en urgencias que lo requieran"
            ]
        },
        {
            "type": "heading",
            "text": "¿Qué NO cubre un seguro médico Adeslas?"
        },
        {
            "type": "list",
            "items": [
                "Medicación ambulatoria: los medicamentos recetados para tomar en casa no están cubiertos",
                "Preexistencias no declaradas: enfermedades anteriores a la contratación pueden quedar excluidas",
                "Tratamientos estéticos sin finalidad médica: cirugía estética, tratamientos de rejuvenecimiento",
                "Implantes dentales y ortodoncia: no cubiertos en los planes sin dental explícito",
                "Fertilización in vitro (FIV): los tratamientos de reproducción asistida no están incluidos",
                "Gafas y lentes de contacto: la óptica ambulatoria solo en planes que lo mencionen",
                "Tratamientos de adicciones: desintoxicación de alcohol, drogas u otras adicciones"
            ]
        },
        {
            "type": "callout",
            "text": "Como agente exclusivo Adeslas, en Marchal Aseguradores te explicamos exactamente qué cubre cada plan para tu situación concreta. Llámanos al 91 710 50 00 o calcula tu precio sin compromiso en el comparador online."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","seguro-medico-sin-copago-2026","carencias-seguros-medicos-adeslas","hospitalizacion-privada-vs-publica"],
  },


  /* ── Seguros Adeslas: seguro-medico-mayores-60-anos-adeslas-2026 ── */
  {
    slug: "seguro-medico-mayores-60-anos-adeslas-2026",
    category: "Seguros Adeslas",
    title: "Seguro médico para mayores de 60 años: guía completa Adeslas 2026",
    excerpt: "A partir de los 60, el acceso rápido a especialistas y la ausencia de listas de espera marcan la diferencia. Te explicamos qué cubre Adeslas, cuánto cuesta y por qué conviene contratar antes de necesitarlo.",
    date: "2 Jun 2026",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop",
    seoTitle: "Seguro Médico para Mayores de 60 Años: Guía Adeslas 2026",
    seoDescription: "Todo sobre el seguro médico para mayores de 60 y 65 años con Adeslas: coberturas más usadas, precios orientativos por edad, preexistencias y por qué conviene contratar cuanto antes.",
    body: [
        {
            "type": "paragraph",
            "text": "A partir de los 60 años, la salud pasa a ser el activo más preciado y la sanidad pública empieza a mostrar sus limitaciones más visibles: listas de espera de meses para ver a un especialista, escasa continuidad asistencial y dificultad para acceder a pruebas diagnósticas de forma ágil. Un seguro médico privado con Adeslas resuelve exactamente estos tres problemas. Y cuanto antes se contrate, más económico resulta y menos condicionantes tienen las preexistencias."
        },
        {
            "type": "paragraph",
            "text": "Adeslas dispone de planes específicamente diseñados para mayores de 55 años: Adeslas Seniors (de 55 a 84 años) y Adeslas Seniors Total (de 63 a 84 años), con prima garantizada 3 años sin subidas y asesor médico personal incluido. Para quienes tienen menos de 63-70 años, los planes estándar (Go, Plena Vital, Plena Plus) también son una opción a valorar. En todos los casos, cuanto antes se contrate, más ventajosas son las condiciones: prima más baja y carencias ya cumplidas cuando más se necesiten."
        },
        {
            "type": "heading",
            "text": "Por qué el seguro médico es especialmente valioso después de los 60"
        },
        {
            "type": "list",
            "items": [
                "Mayor frecuencia de uso: a partir de los 60 años, la media de consultas médicas anuales se duplica respecto a los 40",
                "Necesidad de especialistas: cardiología, traumatología, urología, reumatología y oncología son las especialidades más demandadas",
                "Diagnóstico precoz: las pruebas diagnósticas accesibles sin espera aumentan la probabilidad de detectar enfermedades en fases iniciales y tratables",
                "Listas de espera en la pública: en 2026, la espera media para cirugía electiva supera los 5 meses y puede llegar a 18 meses en traumatología u oftalmología",
                "Riesgo económico de hospitalización: una sola noche en hospital privado cuesta entre 500 y 1.500 €; el seguro elimina ese riesgo"
            ]
        },
        {
            "type": "heading",
            "text": "Coberturas más usadas por mayores de 60 con Adeslas"
        },
        {
            "type": "list",
            "items": [
                "Cardiología: ecocardiograma, holter, prueba de esfuerzo, seguimiento de hipertensión y arritmias",
                "Traumatología: resonancias de rodilla/cadera/columna, rehabilitación, cirugía de prótesis",
                "Urología: seguimiento de próstata (PSA, ecografía), infecciones, litiasis renal",
                "Reumatología: artritis, artrosis, osteoporosis, densitometría ósea",
                "Oftalmología: cataratas, glaucoma, macular, seguimiento diabético",
                "Neurología: seguimiento de migrañas, vértigo, evaluación cognitiva",
                "Oncología: detección precoz y seguimiento de tumores",
                "Endocrinología: control de diabetes, tiroides, obesidad",
                "Urgencias 24 h: especialmente crítico ante situaciones cardiológicas y neurológicas"
            ]
        },
        {
            "type": "heading",
            "text": "¿Cuánto cuesta un seguro Adeslas a partir de los 60 años?"
        },
        {
            "type": "paragraph",
            "text": "La prima aumenta con la edad porque la probabilidad de uso también aumenta. Sin embargo, sigue siendo muy inferior al coste de una sola hospitalización privada. Precios orientativos para 2026 en Madrid (varían por provincia y plan):"
        },
        {
            "type": "list",
            "items": [
                "60-64 años: entre 90 € y 160 € al mes aproximadamente, según el plan",
                "65-69 años: entre 110 € y 200 € al mes aproximadamente",
                "Planes con copago (Go, Plena Vital): prima más baja, pequeño pago por cada servicio",
                "Planes sin copago (Plena Plus, Plena Total): prima algo más alta, cero coste adicional por visita",
                "A partir de los 70: solo renovación si ya eres asegurado; prima recalculada en cada aniversario"
            ]
        },
        {
            "type": "callout",
            "text": "Una sola cirugía de cadera puede costar más de 15.000 € en un hospital privado sin seguro. La prima anual de un seguro Adeslas completo para un asegurado de 65 años raramente supera los 2.000-2.400 €. La primera intervención amortiza años de primas."
        },
        {
            "type": "heading",
            "text": "Preexistencias a los 60: ¿qué pasa con las enfermedades que ya tengo?"
        },
        {
            "type": "paragraph",
            "text": "Las preexistencias son enfermedades o condiciones médicas que ya tienes en el momento de contratar. Adeslas puede, dependiendo del caso: incluirlas con normalidad, incluirlas con un sobreprecio, excluirlas específicamente, o denegar en casos de riesgo muy elevado. Muchas condiciones habituales como hipertensión controlada, diabetes tipo 2 o artrosis son aceptadas con normalidad. La clave es ser completamente honesto en el cuestionario de salud: ocultar una preexistencia puede invalidar el contrato cuando más lo necesitas."
        },
        {
            "type": "heading",
            "text": "Planes Adeslas específicos para mayores: Seniors y Seniors Total"
        },
        {
            "type": "paragraph",
            "text": "Adeslas tiene dos planes diseñados específicamente para personas mayores de 55 años, con cobertura hasta los 84 y renovación ilimitada a partir de ahí mientras se mantenga la póliza."
        },
        {
            "type": "list",
            "items": [
                "Adeslas Seniors (55–84 años): cobertura completa con hospitalización, asesor médico personal incluido, coberturas reforzadas en oncología, cardiología, traumatología y rehabilitación. Prima desde 67,50 €/mes. Prima garantizada 3 años sin subidas.",
                "Adeslas Seniors Total (63–84 años): todo lo de Seniors más dental (46 actos), psicología (20 sesiones/año) y asistencia en viaje. Prima desde 101 €/mes. Prima garantizada 3 años sin subidas.",
                "Ambos planes: sin límite de renovación a partir de los 84 años si ya eres asegurado. Sin necesidad de cambiar de plan por cumplir años."
            ]
        },
        {
            "type": "heading",
            "text": "Límites de edad para contratar por primera vez"
        },
        {
            "type": "paragraph",
            "text": "Los límites de edad para una primera contratación varían según el plan. Los planes estándar (Go, Plena Vital, Plena Plus) aceptan nuevas contrataciones hasta los 70 años. Los planes Plena Vital Total y Plena Total tienen un límite más bajo (63 y 62 años respectivamente). Adeslas Seniors y Seniors Total están disponibles para nuevos asegurados hasta los 84 años. Si ya tienes un plan Adeslas activo, puedes renovarlo indefinidamente sin importar la edad."
        },
        {
            "type": "heading",
            "text": "¿Qué plan elegir según la edad?"
        },
        {
            "type": "paragraph",
            "text": "Para mayores de 60 que contratan por primera vez, la recomendación depende de la edad y las necesidades. Hasta los 62-63 años, los planes estándar completos (Plena Total, Plena Vital Total) siguen siendo accesibles y ofrecen la gama más amplia. A partir de los 63 años o cuando se busca un plan pensado para el uso médico más frecuente de la edad, Adeslas Seniors y Seniors Total son la opción diseñada para este perfil. En todos los casos, el asesor de Marchal Aseguradores puede ayudarte a elegir el plan más adecuado sin compromiso."
        },
        {
            "type": "callout",
            "text": "En Marchal Aseguradores somos agente exclusivo Adeslas. Te ayudamos a encontrar el plan más adecuado para tu estado de salud y presupuesto, con especial experiencia en asegurados mayores de 60. Llámanos al 91 710 50 00."
        }
    ],
    relatedSlugs: ["comparativa-seguros-medicos-adeslas-2026","merece-la-pena-seguro-medico-privado-espana-2026","carencias-seguros-medicos-adeslas","listas-de-espera-sanidad-publica-espana-2026"],
  },


  /* ── Coberturas: urgencias-seguro-medico-privado-como-funciona-2026 ── */
  {
    slug: "urgencias-seguro-medico-privado-como-funciona-2026",
    category: "Coberturas",
    title: "Urgencias con seguro médico privado: cómo funciona y qué hacer paso a paso",
    excerpt: "¿Qué haces cuando tienes una urgencia y tienes seguro médico privado? ¿Vas al hospital público o al privado? ¿Necesitas autorización? Te lo explicamos paso a paso.",
    date: "5 Jun 2026",
    readTime: "7 min",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
    seoTitle: "Urgencias con Seguro Médico Privado: Cómo Funciona en 2026 | Adeslas",
    seoDescription: "Guía completa sobre urgencias con seguro médico privado Adeslas: qué hacer, cómo acceder, copago, urgencias fuera de la red, en el extranjero y cuándo usar la pública.",
    body: [
        {
            "type": "paragraph",
            "text": "Las urgencias están cubiertas en todos los planes Adeslas desde el primer día de vigencia del seguro, sin ningún periodo de carencia. Cuando tienes una urgencia, puedes acudir directamente a cualquier centro de urgencias de la red Adeslas presentando tu tarjeta de asegurado, sin llamar antes ni pedir autorización previa. El proceso es tan simple como en la sanidad pública, pero sin colas."
        },
        {
            "type": "heading",
            "text": "Qué se considera una urgencia médica"
        },
        {
            "type": "paragraph",
            "text": "A efectos prácticos del seguro, las urgencias incluyen: fiebre alta en niños, dolor agudo intenso, traumatismos por accidente, síntomas cardiológicos (dolor en el pecho, palpitaciones irregulares), síntomas neurológicos (pérdida súbita de fuerza, habla arrastrada, confusión), crisis de ansiedad, cortes que requieren sutura, quemaduras, fracturas óseas y cualquier situación que tú percibas como urgente y que no pueda esperar a una consulta programada."
        },
        {
            "type": "heading",
            "text": "Paso a paso: cómo usar las urgencias con tu seguro Adeslas"
        },
        {
            "type": "list",
            "items": [
                "Paso 1 — Localiza el centro de urgencias más cercano de la red Adeslas: usa la app de Adeslas o llama al teléfono de atención 24 h",
                "Paso 2 — Acude al centro con tu tarjeta de asegurado (física o digital en la app): no necesitas autorización previa para urgencias",
                "Paso 3 — En recepción identifícate como asegurado Adeslas: el centro verifica tu cobertura en el sistema en segundos",
                "Paso 4 — Recibe la atención médica: consulta, pruebas diagnósticas y tratamiento están cubiertos",
                "Paso 5 — Si necesitas hospitalización urgente, el ingreso queda cubierto aunque no hayas cumplido la carencia de 6 meses para hospitalización programada"
            ]
        },
        {
            "type": "callout",
            "text": "Las urgencias no tienen carencia: están cubiertas desde el primer día del seguro, incluso si la hospitalización programada sigue en período de carencia. Un accidente de tráfico, un infarto o una apendicitis siempre están cubiertos desde el día 1."
        },
        {
            "type": "heading",
            "text": "¿Tiene copago ir a urgencias con el seguro?"
        },
        {
            "type": "paragraph",
            "text": "Depende del plan. En los planes sin copago (Plena Plus, Plena Total, Extra 150), las urgencias no tienen ningún coste adicional. En los planes con copago (Adeslas Go, Plena Vital, Plena Vital Total), las urgencias sí tienen copago, habitualmente igual al copago de una consulta especializada. Este importe se descuenta del Límite Máximo Anual (LMA), de forma que si ya has superado el LMA ese año, las urgencias son también gratuitas."
        },
        {
            "type": "heading",
            "text": "Urgencias en el extranjero"
        },
        {
            "type": "paragraph",
            "text": "Los planes Adeslas Plena Vital Total, Plena Total y Extra 150 incluyen cobertura de asistencia médica en viaje en el extranjero. Los importes máximos según el plan son: Plena Vital Total hasta 30.000 €, Plena Total hasta 100.000 €. Si tienes Go, Plena Vital o Plena Plus, estos planes no incluyen cobertura en el extranjero; para viajes internacionales se recomienda contratar un seguro de viaje complementario."
        },
        {
            "type": "heading",
            "text": "¿Cuándo es mejor ir a urgencias públicas aunque tengas seguro privado?"
        },
        {
            "type": "paragraph",
            "text": "Tener seguro médico privado no obliga a usarlo siempre. La sanidad pública sigue siendo preferible en: emergencias donde el tiempo es crítico y el hospital público está más cerca, situaciones que requieren recursos que solo tiene la pública (trasplantes, tratamientos oncológicos de alta complejidad, enfermedades raras), o cuando necesitas documentación oficial para procesos médico-legales. El seguro privado y la sanidad pública son complementarios."
        },
        {
            "type": "callout",
            "text": "Con un seguro Adeslas de Marchal Aseguradores tienes acceso a más de 1.400 centros y clínicas en toda España. Consulta el cuadro médico en tu app o llámanos al 91 710 50 00 si tienes dudas sobre tu cobertura de urgencias."
        }
    ],
    relatedSlugs: ["que-cubre-seguro-medico-adeslas-2026","hospitalizacion-privada-vs-publica","comparativa-seguros-medicos-adeslas-2026","carencias-seguros-medicos-adeslas"],
  },

];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (slugs: string[]) =>
  slugs.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean) as BlogPostFull[];
