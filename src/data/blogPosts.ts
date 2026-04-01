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
  "Bienestar",
  "Nutrición",
  "Prevención",
  "Familia",
  "Salud Mental",
  "Dental",
  "Seguros",
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

  /* ── 10. Seguros ── */
  {
    slug: "comparativa-seguros-medicos-adeslas-2026",
    category: "Seguros",
    title: "Comparativa de seguros médicos Adeslas 2026: cuál elegir según tu perfil",
    excerpt:
      "Adeslas Go, Plena Vital, Plena Vital Total, Plena Total, Plena Plus, Extra 150... Te ayudamos a entender las diferencias y elegir el que más te conviene.",
    date: "1 Abr 2026",
    readTime: "10 min",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    seoTitle: "Comparativa Seguros Médicos Adeslas 2026 | Cuál Elegir",
    seoDescription:
      "Comparativa completa de todos los seguros médicos Adeslas 2026: precios, coberturas, copagos y qué plan elegir según tu edad, familia y presupuesto.",
    body: [
      {
        type: "paragraph",
        text: "Elegir un seguro médico privado es una decisión que afecta a tu bolsillo y a tu tranquilidad durante años. Con tantos planes disponibles —con copago, sin copago, con hospitalización, ambulatorios— puede resultar difícil saber cuál se adapta mejor a tu situación. En esta guía comparamos los seguros médicos Adeslas disponibles en 2026 para que puedas decidir con información clara.",
      },
      {
        type: "paragraph",
        text: "La clave está en entender dos conceptos básicos antes de comparar planes: el copago (la parte que pagas tú por cada servicio) y la prima mensual (lo que pagas a la aseguradora). En general, a mayor copago, menor prima. La elección ideal depende de con qué frecuencia usas los servicios médicos.",
      },

      { type: "heading", text: "Resumen de planes Adeslas 2026" },
      {
        type: "list",
        items: [
          "Adeslas Go — desde 13,39 €/mes: ambulatorio con copago por consulta",
          "Adeslas Plena Vital — desde 32,97 €/mes: ambulatorio sin copago",
          "Adeslas Plena Vital Total — desde 48,50 €/mes: cobertura completa con copago reducido y 3 años sin subida de prima",
          "Adeslas Plena Total — desde 50,92 €/mes: cobertura completa sin copago, el más contratado",
          "Adeslas Plena Plus — desde 22,55 €/mes: hospitalización + ambulatoria con copago máximo 300 €/año",
          "Adeslas Extra 150 — desde 59,71 €/mes: libre elección de médico con reembolso hasta 150 €/consulta",
        ],
      },

      { type: "heading", text: "Adeslas Go: lo esencial al mejor precio" },
      {
        type: "paragraph",
        text: "Es el plan más económico de la gama. Cubre consultas de medicina general y especialidades, pruebas diagnósticas y farmacia, con un copago por cada servicio utilizado. Es ideal para personas jóvenes y sanas que quieren cobertura ante imprevistos sin pagar una prima alta.",
      },
      {
        type: "list",
        items: [
          "Cobertura ambulatoria completa (con copago)",
          "Acceso a más de 51.000 médicos Adeslas",
          "Sin hospitalización ni cirugías programadas",
          "Prima accesible para presupuestos ajustados",
          "Válido hasta los 85 años",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: jóvenes de 18-35 años sin patologías crónicas que buscan protección básica a coste mínimo.",
      },

      { type: "heading", text: "Adeslas Plena Vital: ambulatorio sin sorpresas" },
      {
        type: "paragraph",
        text: "Acceso a todas las especialidades ambulatorias sin pagar nada por consulta. Sin copago significa que cuando pides cita con el cardiólogo, el dermatólogo o el pediatra, no hay gasto adicional. El plan no incluye hospitalización ni cirugías de ingreso.",
      },
      {
        type: "list",
        items: [
          "Consultas de medicina general y especialidades sin copago",
          "Pruebas diagnósticas sin copago (radiología, analíticas, ecografía)",
          "Urgencias incluidas",
          "Sin hospitalización ni cirugías programadas",
          "Adecuado para personas que usan frecuentemente la consulta médica",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: personas que van a menudo al médico pero no tienen riesgo significativo de hospitalización. También muy usado por autónomos.",
      },

      { type: "heading", text: "Adeslas Plena Vital Total: la opción equilibrada con garantía de precio" },
      {
        type: "paragraph",
        text: "Este plan es el más recomendado por los asesores de salud para quienes buscan cobertura completa con buena relación calidad-precio. Incluye hospitalización, cirugías y ambulatorio con un copago reducido, y su principal diferencial es la garantía de 3 años sin subida de prima —una tranquilidad muy valorada en un entorno de inflación.",
      },
      {
        type: "list",
        items: [
          "Cobertura ambulatoria e hospitalización completa",
          "Copago reducido por consulta (inferior al de Plena Plus)",
          "Garantía de prima estable durante 3 años",
          "Urgencias 24h incluidas",
          "Acceso a más de 51.000 médicos y 1.400 centros",
        ],
      },
      {
        type: "callout",
        text: "La garantía de 3 años sin subida de prima es especialmente relevante si estás planificando un presupuesto familiar a medio plazo. Es uno de los planes con mayor valoración en satisfacción entre los asegurados que lo contratan.",
      },
      {
        type: "quote",
        text: "Ideal para: adultos de 30-55 años, familias con hijos o personas que quieren cobertura total con previsibilidad económica.",
      },

      { type: "heading", text: "Adeslas Plena Total: el más completo sin copago" },
      {
        type: "paragraph",
        text: "El plan más vendido de la gama Adeslas. Incluye cobertura ambulatoria e hospitalización sin copago en ningún servicio. Cada consulta, prueba, operación o ingreso tiene coste cero para el asegurado dentro de la red médica.",
      },
      {
        type: "list",
        items: [
          "Sin copago en ningún servicio ambulatorio ni hospitalario",
          "Incluye cirugías programadas, ingresos y partos",
          "Urgencias 24h sin copago",
          "Cobertura dental básica en muchas modalidades",
          "La prima más alta de la gama ambulatoria-hospitalaria estándar",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: familias, personas con historial médico o quienes valoran no tener ningún gasto adicional en sanidad privada.",
      },

      { type: "heading", text: "Adeslas Plena Plus: hospitalización económica" },
      {
        type: "paragraph",
        text: "Cubre tanto la parte ambulatoria como la hospitalización, con copago en consultas, pero con un tope máximo de 300 €/año. Es decir, aunque uses mucho el seguro, nunca pagarás más de 300 € en copagos al año. Permite acceder a hospitalización a una prima más baja que el Plena Total.",
      },
      {
        type: "list",
        items: [
          "Copago por consulta, con límite máximo anual de 300 €",
          "Hospitalización y cirugías cubiertas",
          "Prima más competitiva que el Plena Total sin copago",
          "Válido hasta los 70 años",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: personas de hasta 70 años que quieren cobertura completa con una prima más ajustada y no les importa un pequeño copago.",
      },

      { type: "heading", text: "Adeslas Extra 150: la libertad de elección" },
      {
        type: "paragraph",
        text: "El plan de libre elección permite ir a cualquier médico —también fuera de la red Adeslas— y recibir un reembolso de hasta 150 € por consulta. Es el plan más caro pero el que da mayor libertad al asegurado para elegir especialista sin restricciones.",
      },
      {
        type: "list",
        items: [
          "Libre elección de médico dentro y fuera de la red",
          "Reembolso de hasta 150 €/consulta",
          "Cobertura hospitalaria completa",
          "Sin copago en la red Adeslas",
          "Prima más alta de toda la gama",
        ],
      },
      {
        type: "quote",
        text: "Ideal para: personas que ya tienen médico de confianza fuera de la red Adeslas, o profesionales que quieren máxima flexibilidad.",
      },

      { type: "heading", text: "¿Cuál te conviene según tu perfil?" },
      {
        type: "list",
        items: [
          "Joven sano con presupuesto ajustado → Adeslas Go",
          "Usuario frecuente de consultas sin riesgo de hospitalización → Plena Vital",
          "Familia o adulto que quiere cobertura total sin copagos → Plena Total",
          "Quien busca total + garantía de precio 3 años → Plena Vital Total",
          "Cobertura total con prima más baja y copago acotado → Plena Plus (hasta 70 años)",
          "Quien ya tiene médico de confianza fuera de la red → Extra 150",
        ],
      },
      {
        type: "callout",
        text: "Lo más acertado es calcular tu precio personalizado según tu edad, provincia y número de personas en el seguro. Puedes usar el comparador de Marchal Aseguradores para ver tu precio exacto en segundos.",
      },
      {
        type: "paragraph",
        text: "Recuerda que todos los planes Adeslas incluyen acceso a más de 51.000 médicos y 1.400 centros médicos en España sin listas de espera. La diferencia entre planes está en la extensión de la cobertura y el copago, no en la calidad de la red médica.",
      },
    ],
    relatedSlugs: [
      "revisiones-medicas-por-edad",
      "como-mejorar-tu-energia-diaria",
      "salud-bucodental-guia-completa",
    ],
  },

];

export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (slugs: string[]) =>
  slugs.map((s) => blogPosts.find((p) => p.slug === s)).filter(Boolean) as BlogPostFull[];
