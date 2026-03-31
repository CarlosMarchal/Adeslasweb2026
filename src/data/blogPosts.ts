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
  /* ── 1. Hábitos saludables primavera ── */
  {
    slug: "habitos-saludables-primavera",
    category: "Bienestar",
    title: "10 hábitos saludables para empezar la primavera con energía",
    excerpt:
      "La primavera es el momento perfecto para renovar tu rutina. Descubre los hábitos que transformarán tu bienestar día a día.",
    date: "12 Mar 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop",
    seoTitle:
      "10 Hábitos Saludables para la Primavera | Blog Salud Adeslas",
    seoDescription:
      "Descubre los 10 hábitos saludables que transformarán tu bienestar esta primavera. Consejos prácticos de profesionales médicos de Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "Con la llegada de la primavera, nuestro cuerpo experimenta cambios naturales que afectan nuestro estado de ánimo, energía y metabolismo. Es el momento ideal para adoptar nuevos hábitos que nos acompañen durante todo el año y mejoren significativamente nuestra calidad de vida.",
      },
      {
        type: "paragraph",
        text: "Los profesionales de Adeslas recomiendan aprovechar este cambio estacional para introducir rutinas saludables de forma gradual. No se trata de cambiar todo de golpe, sino de incorporar pequeños gestos que, sumados, marcan una gran diferencia.",
      },
      { type: "heading", text: "1. Despierta con luz natural" },
      {
        type: "paragraph",
        text: "Abrir las cortinas nada más levantarte ayuda a sincronizar tu reloj biológico. La exposición a la luz solar matutina estimula la producción de serotonina y regula los ciclos de melatonina, mejorando tanto tu estado de ánimo como la calidad de tu sueño nocturno.",
      },
      { type: "heading", text: "2. Hidrátate desde primera hora" },
      {
        type: "paragraph",
        text: "Beber un vaso de agua al despertar reactiva tu metabolismo tras las horas de sueño. Durante la primavera, con el aumento de temperaturas, mantener una hidratación adecuada es aún más importante. Apunta a 2 litros diarios como mínimo.",
      },
      { type: "heading", text: "3. Incorpora frutas y verduras de temporada" },
      {
        type: "paragraph",
        text: "La primavera nos ofrece una variedad increíble de productos frescos: fresas, espárragos, guisantes, alcachofas y habas. Estos alimentos de temporada están en su punto óptimo de sabor y valor nutricional, y además son más sostenibles y económicos.",
      },
      { type: "heading", text: "4. Muévete al aire libre" },
      {
        type: "paragraph",
        text: "Los días más largos y el buen tiempo invitan a trasladar el ejercicio al exterior. Caminar, correr o practicar yoga al aire libre tiene beneficios adicionales: la vitamina D del sol, la conexión con la naturaleza y un mayor gasto calórico gracias a las superficies irregulares.",
      },
      { type: "heading", text: "5. Establece una rutina de sueño regular" },
      {
        type: "paragraph",
        text: "Con el cambio horario, es común que nuestro sueño se vea alterado. Intenta acostarte y levantarte a la misma hora cada día, incluso los fines de semana. Evita pantallas al menos 30 minutos antes de dormir y crea un ambiente fresco y oscuro en tu habitación.",
      },
      { type: "heading", text: "6. Practica la respiración consciente" },
      {
        type: "paragraph",
        text: "Dedicar 5 minutos al día a ejercicios de respiración reduce significativamente los niveles de cortisol. Prueba la técnica 4-7-8: inhala durante 4 segundos, mantén 7 y exhala durante 8. Es una herramienta simple pero poderosa contra el estrés.",
      },
      { type: "heading", text: "7. Cuida tu piel frente al sol" },
      {
        type: "paragraph",
        text: "Con la primavera aumenta la radiación UV. Incorpora protector solar SPF 30 o superior a tu rutina diaria, incluso en días nublados. Tu piel te lo agradecerá a largo plazo, previniendo manchas, envejecimiento prematuro y problemas dermatológicos más serios.",
      },
      { type: "heading", text: "8. Socializa más" },
      {
        type: "paragraph",
        text: "Las relaciones sociales son un pilar fundamental de la salud mental. El buen tiempo facilita los encuentros al aire libre, paseos con amigos o actividades en grupo. Diversos estudios asocian las conexiones sociales activas con una mayor esperanza de vida.",
      },
      { type: "heading", text: "9. Haz tu revisión médica anual" },
      {
        type: "callout",
        text: "La primavera es un buen momento para programar tu chequeo médico anual. Con Adeslas tienes acceso a más de 44.000 profesionales y centros médicos sin listas de espera.",
      },
      { type: "heading", text: "10. Desconecta digitalmente" },
      {
        type: "paragraph",
        text: "Establece momentos del día libres de pantallas: la hora de la comida, los paseos vespertinos o las primeras horas de la mañana. Esta desconexión digital reduce la fatiga visual, mejora las relaciones personales y disminuye la ansiedad.",
      },
      {
        type: "paragraph",
        text: "Recuerda que los pequeños cambios sostenidos en el tiempo son más efectivos que las transformaciones radicales. Empieza por dos o tres hábitos que te resulten sencillos y ve añadiendo los demás de forma progresiva. Tu cuerpo y tu mente lo notarán.",
      },
    ],
    relatedSlugs: [
      "beneficios-ejercicio-cardiovascular",
      "dormir-mejor-higiene-sueno",
      "alimentacion-equilibrada-familia",
    ],
  },

  /* ── 2. Alimentación equilibrada familia ── */
  {
    slug: "alimentacion-equilibrada-familia",
    category: "Nutrición",
    title: "Guía de alimentación equilibrada para toda la familia",
    excerpt:
      "Consejos prácticos para planificar menús saludables que gusten a todos los miembros de la familia, desde los más pequeños.",
    date: "8 Mar 2026",
    readTime: "7 min",
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    seoTitle:
      "Alimentación Equilibrada Familiar | Blog Salud Adeslas",
    seoDescription:
      "Planifica menús saludables para toda la familia con esta guía completa. Consejos de nutrición de profesionales médicos de Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "Conseguir que toda la familia coma de forma saludable puede parecer un reto, especialmente cuando hay niños pequeños que se resisten a probar ciertos alimentos. Sin embargo, con planificación y algunos trucos prácticos, es posible lograr menús equilibrados que gusten a todos.",
      },
      {
        type: "paragraph",
        text: "La alimentación familiar no debería ser una fuente de conflicto. Se trata de crear un entorno positivo donde la comida saludable sea la opción natural, no una imposición. Los nutricionistas de Adeslas recomiendan un enfoque gradual y participativo.",
      },
      { type: "heading", text: "El plato saludable familiar" },
      {
        type: "paragraph",
        text: "El modelo del plato saludable es la forma más visual y sencilla de planificar cada comida: la mitad del plato debería ser verduras y hortalizas, un cuarto proteínas de calidad (pescado, legumbres, huevo o carne magra) y el otro cuarto hidratos de carbono complejos (arroz integral, pasta integral, patata o pan integral).",
      },
      { type: "heading", text: "Planificación semanal de menús" },
      {
        type: "paragraph",
        text: "Dedicar 30 minutos el domingo a planificar los menús de la semana ahorra tiempo, dinero y evita recurrir a opciones menos saludables. Te proponemos una estructura base que puedes adaptar a los gustos de tu familia:",
      },
      {
        type: "list",
        items: [
          "Lunes y jueves: legumbres como plato principal (lentejas, garbanzos, alubias)",
          "Martes y viernes: pescado (alterna azul y blanco)",
          "Miércoles: pasta o arroz integral con verduras",
          "Sábado: receta libre o especial en familia",
          "Domingo: guiso o preparación más elaborada",
        ],
      },
      { type: "heading", text: "Trucos para que los niños coman verduras" },
      {
        type: "paragraph",
        text: "La clave está en la presentación y la normalización. Si los padres comen verduras con naturalidad, los niños lo imitarán progresivamente. Además, involucrar a los niños en la compra y la preparación de los alimentos aumenta su curiosidad y disposición a probar.",
      },
      {
        type: "list",
        items: [
          "Presenta las verduras de forma creativa: formas divertidas, colores variados",
          "Incorpora verduras en salsas, cremas y batidos",
          "Ofrece verduras crudas con hummus o guacamole como snack",
          "Deja que elijan en la frutería o el mercado",
          "Cultiva un pequeño huerto en macetas: tomates cherry, hierbas aromáticas",
        ],
      },
      { type: "heading", text: "Meriendas y snacks saludables" },
      {
        type: "paragraph",
        text: "Las meriendas son una oportunidad nutricional, no un momento para alimentos ultraprocesados. Prepara con antelación opciones saludables que estén siempre disponibles: fruta troceada, frutos secos (a partir de los 5 años enteros), yogur natural, palitos de zanahoria, tostadas de pan integral con aceite de oliva.",
      },
      { type: "heading", text: "Hidratación familiar" },
      {
        type: "paragraph",
        text: "El agua debe ser la bebida principal de toda la familia. Evita refrescos, zumos industriales y bebidas energéticas. Si los niños piden sabor, ofrece agua con rodajas de fruta natural (limón, naranja, fresas) o infusiones frías sin azúcar.",
      },
      {
        type: "callout",
        text: "Con Adeslas tienes acceso a consultas de nutrición y dietética para diseñar un plan personalizado para toda tu familia. Pide cita sin listas de espera.",
      },
      {
        type: "paragraph",
        text: "Recuerda: la mejor herencia que puedes dejar a tus hijos son unos buenos hábitos alimentarios. No se trata de perfección, sino de constancia y de crear un ambiente donde la comida saludable sea lo normal.",
      },
    ],
    relatedSlugs: [
      "alimentos-reforzar-defensas",
      "habitos-saludables-primavera",
      "embarazo-saludable-trimestre",
    ],
  },

  /* ── 3. Revisión médica anual ── */
  {
    slug: "revision-medica-anual",
    category: "Prevención",
    title: "¿Por qué es importante tu revisión médica anual?",
    excerpt:
      "Las revisiones periódicas son clave para detectar problemas a tiempo. Te contamos qué pruebas incluir según tu edad y perfil.",
    date: "3 Mar 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    seoTitle:
      "Revisión Médica Anual: ¿Por Qué Es Importante? | Blog Salud Adeslas",
    seoDescription:
      "Descubre por qué la revisión médica anual es esencial para tu salud. Pruebas recomendadas según tu edad y perfil con Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "Muchas personas solo acuden al médico cuando tienen un problema. Sin embargo, la medicina preventiva es la herramienta más poderosa que tenemos para mantener nuestra salud. Un chequeo anual puede detectar enfermedades en fases iniciales, cuando el tratamiento es más sencillo y efectivo.",
      },
      {
        type: "paragraph",
        text: "Los profesionales de Adeslas insisten en que la prevención es la mejor inversión en salud. Un diagnóstico precoz puede marcar la diferencia entre un tratamiento rápido y una enfermedad que se complica.",
      },
      { type: "heading", text: "¿Qué incluye un chequeo médico completo?" },
      {
        type: "paragraph",
        text: "Un chequeo básico suele incluir: analítica de sangre y orina, medición de tensión arterial, exploración física general, control de peso e índice de masa corporal, y revisión del historial familiar. A partir de ahí, tu médico puede recomendar pruebas adicionales según tu perfil.",
      },
      { type: "heading", text: "Pruebas según tu edad" },
      {
        type: "list",
        items: [
          "20-30 años: analítica básica, revisión ginecológica/urológica, control de tensión, revisión dermatológica de lunares",
          "30-40 años: todo lo anterior + perfil lipídico completo, pruebas tiroideas, revisión oftalmológica",
          "40-30 años: todo lo anterior + prueba de esfuerzo cardiológica, mamografía (mujeres), ecografía abdominal, densitometría ósea",
          "50+ años: todo lo anterior + colonoscopia, PSA (hombres), pruebas de función pulmonar, evaluación cognitiva básica",
        ],
      },
      { type: "heading", text: "Factores de riesgo que anticipan pruebas" },
      {
        type: "paragraph",
        text: "Independientemente de la edad, si tienes antecedentes familiares de cáncer, diabetes, enfermedades cardiovasculares u otras patologías, tu médico puede recomendar pruebas específicas antes de la edad estándar. Informa siempre a tu profesional sobre el historial médico de tu familia.",
      },
      {
        type: "callout",
        text: "Con Adeslas accedes a más de 44.000 profesionales médicos y centros sanitarios. Pide tu cita para chequeo sin listas de espera y con la tranquilidad de estar en las mejores manos.",
      },
      { type: "heading", text: "¿Cuándo pedir cita?" },
      {
        type: "paragraph",
        text: "El mejor momento es ahora. No esperes a tener síntomas. Programa tu revisión anual como una cita más en tu agenda, al igual que la revisión del coche o del dentista. Tu salud es tu bien más valioso y merece la misma atención.",
      },
      {
        type: "paragraph",
        text: "La prevención no es un gasto, es una inversión. Y con un seguro médico como Adeslas, el acceso a profesionales y pruebas es inmediato, sin listas de espera ni burocracia innecesaria.",
      },
    ],
    relatedSlugs: [
      "habitos-saludables-primavera",
      "beneficios-ejercicio-cardiovascular",
      "gestionar-estres-trabajo",
    ],
  },

  /* ── 4. Salud dental niños ── */
  {
    slug: "salud-dental-ninos",
    category: "Dental",
    title: "Cuidado dental infantil: cuándo empezar y qué hacer",
    excerpt:
      "La salud bucodental de los niños empieza antes de lo que crees. Guía completa sobre higiene dental desde el primer diente.",
    date: "27 Feb 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop",
    seoTitle:
      "Cuidado Dental Infantil: Guía Completa | Blog Salud Adeslas",
    seoDescription:
      "Guía completa sobre higiene dental infantil. Cuándo empezar, técnicas de cepillado y revisiones recomendadas. Blog de salud Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "La salud bucodental infantil es una de las bases del bienestar general de los niños. Sin embargo, muchos padres no saben cuándo empezar a cuidar los dientes de sus hijos ni qué rutinas establecer en cada etapa. La respuesta es clara: antes de lo que piensas.",
      },
      { type: "heading", text: "Antes del primer diente" },
      {
        type: "paragraph",
        text: "Incluso antes de que aparezca el primer diente (normalmente entre los 6 y 8 meses), se recomienda limpiar las encías del bebé con una gasa húmeda después de cada toma. Esto elimina restos de leche, previene infecciones y acostumbra al bebé a la rutina de higiene bucal.",
      },
      { type: "heading", text: "Del primer diente a los 3 años" },
      {
        type: "paragraph",
        text: "Con la aparición del primer diente, es momento de introducir un cepillo pequeño de cerdas suaves. Utiliza una cantidad mínima de pasta dental con flúor (del tamaño de un grano de arroz). El cepillado debe hacerlo siempre un adulto, dos veces al día: mañana y noche.",
      },
      { type: "heading", text: "De 3 a 6 años" },
      {
        type: "paragraph",
        text: "A esta edad, la cantidad de pasta con flúor puede aumentar al tamaño de un guisante. Los niños pueden empezar a cepillarse solos, pero siempre bajo supervisión de un adulto que repase el cepillado después. Es fundamental que aprendan la técnica correcta: movimientos circulares, cepillando todas las caras de cada diente.",
      },
      { type: "heading", text: "A partir de los 6 años" },
      {
        type: "paragraph",
        text: "Con la aparición de los dientes definitivos, la higiene dental cobra especial importancia. Se introduce el uso de enjuague bucal (sin alcohol) y, si el dentista lo recomienda, hilo dental. El niño puede ser más autónomo, pero es recomendable supervisar hasta los 8-9 años.",
      },
      { type: "heading", text: "Visitas al dentista" },
      {
        type: "list",
        items: [
          "Primera visita: al cumplir el primer año de vida",
          "Revisiones cada 6 meses a partir de los 3 años",
          "Sellado de fisuras: cuando aparecen los primeros molares definitivos (6 años)",
          "Ortodoncia: evaluación a los 7 años si hay indicios de maloclusión",
        ],
      },
      { type: "heading", text: "Hábitos que dañan los dientes infantiles" },
      {
        type: "list",
        items: [
          "Biberón nocturno con leche o zumo (caries del biberón)",
          "Chuparse el dedo más allá de los 3 años",
          "Uso prolongado de chupete después de los 2 años",
          "Exceso de azúcares y bebidas carbonatadas",
          "Morder objetos duros (bolígrafos, juguetes)",
        ],
      },
      {
        type: "callout",
        text: "Con Adeslas Dental tu familia tiene acceso a revisiones, limpiezas y tratamientos odontológicos sin carencias desde el primer día. Consulta nuestro seguro dental desde 9,45€/mes.",
      },
      {
        type: "paragraph",
        text: "Recuerda: los dientes de leche importan tanto como los definitivos. Un diente de leche con caries puede afectar al diente permanente que viene debajo. Invertir en la salud dental de tus hijos desde el inicio es invertir en su sonrisa futura.",
      },
    ],
    relatedSlugs: [
      "alimentacion-equilibrada-familia",
      "revision-medica-anual",
      "embarazo-saludable-trimestre",
    ],
  },

  /* ── 5. Gestionar estrés trabajo ── */
  {
    slug: "gestionar-estres-trabajo",
    category: "Salud Mental",
    title: "Cómo gestionar el estrés en el trabajo: técnicas efectivas",
    excerpt:
      "El estrés laboral afecta a millones de personas. Aprende estrategias respaldadas por la ciencia para manejarlo eficazmente.",
    date: "22 Feb 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    seoTitle:
      "Gestionar Estrés Laboral: Técnicas Efectivas | Blog Salud Adeslas",
    seoDescription:
      "Aprende a gestionar el estrés laboral con técnicas respaldadas por la ciencia. Consejos profesionales del Blog de Salud Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "El estrés laboral se ha convertido en una de las principales causas de baja médica en España. Según datos recientes, más del 60% de los trabajadores experimentan niveles significativos de estrés relacionado con su empleo. La buena noticia es que existen técnicas probadas para gestionarlo de forma efectiva.",
      },
      {
        type: "paragraph",
        text: "Es importante distinguir entre el estrés puntual (que puede ser incluso motivador) y el estrés crónico, que deteriora nuestra salud física y mental. Cuando el estrés se mantiene en el tiempo, puede provocar problemas cardiovasculares, trastornos digestivos, insomnio, ansiedad y depresión.",
      },
      { type: "heading", text: "Identifica tus señales de alarma" },
      {
        type: "paragraph",
        text: "El primer paso es reconocer cuándo el estrés está superando niveles saludables. Presta atención a señales como dolores de cabeza frecuentes, tensión muscular (especialmente en cuello y hombros), irritabilidad, dificultad para concentrarte, cambios en el apetito o problemas de sueño.",
      },
      { type: "heading", text: "Técnica 1: La regla de los 2 minutos" },
      {
        type: "paragraph",
        text: "Si una tarea puede completarse en menos de 2 minutos, hazla inmediatamente. Acumular pequeñas tareas pendientes genera una carga mental innecesaria. Resolver los asuntos rápidos al instante libera espacio mental para las tareas importantes.",
      },
      { type: "heading", text: "Técnica 2: Microdescansos activos" },
      {
        type: "paragraph",
        text: "Cada 50 minutos de trabajo, toma un descanso de 5-10 minutos. Levántate, estira, camina, mira por la ventana. Estos microdescansos no reducen la productividad; al contrario, la aumentan al mejorar la concentración y reducir la fatiga mental acumulada.",
      },
      { type: "heading", text: "Técnica 3: Respiración 4-7-8" },
      {
        type: "paragraph",
        text: "Esta técnica de respiración activa el sistema nervioso parasimpático y reduce la respuesta de estrés en minutos. Inhala por la nariz contando hasta 4, mantén el aire contando hasta 7, exhala por la boca contando hasta 8. Repite 4 ciclos. Puedes practicarla en tu puesto de trabajo sin que nadie lo note.",
      },
      { type: "heading", text: "Técnica 4: Establece límites saludables" },
      {
        type: "list",
        items: [
          "Define un horario de fin de jornada y respétalo",
          "Desactiva notificaciones del trabajo fuera de tu horario",
          "Aprende a decir \"no\" a tareas que exceden tu capacidad",
          "Comunica claramente tus plazos y limitaciones",
          "Separa físicamente tu espacio de trabajo de tu espacio personal",
        ],
      },
      { type: "heading", text: "Técnica 5: Ejercicio regular" },
      {
        type: "paragraph",
        text: "El ejercicio físico es uno de los antidepresivos y ansiolíticos naturales más potentes. Solo 30 minutos de actividad moderada al día reducen significativamente los niveles de cortisol. No necesitas ir al gimnasio: caminar a paso rápido, subir escaleras o hacer estiramientos ya marca diferencia.",
      },
      { type: "heading", text: "¿Cuándo buscar ayuda profesional?" },
      {
        type: "paragraph",
        text: "Si el estrés persiste durante más de dos semanas, interfiere con tu vida diaria, afecta tus relaciones o notas síntomas físicos persistentes, es momento de consultar con un profesional. No esperes a que la situación se agrave.",
      },
      {
        type: "callout",
        text: "Con Adeslas tienes acceso a psicólogos y psiquiatras sin listas de espera. La salud mental es tan importante como la física. Pide tu cita y empieza a sentirte mejor.",
      },
    ],
    relatedSlugs: [
      "dormir-mejor-higiene-sueno",
      "habitos-saludables-primavera",
      "beneficios-ejercicio-cardiovascular",
    ],
  },

  /* ── 6. Embarazo saludable ── */
  {
    slug: "embarazo-saludable-trimestre",
    category: "Familia",
    title: "Embarazo saludable: guía trimestre a trimestre",
    excerpt:
      "Acompañamos cada etapa de tu embarazo con recomendaciones médicas, consejos de alimentación y preparación al parto.",
    date: "18 Feb 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=600&h=400&fit=crop",
    seoTitle:
      "Embarazo Saludable: Guía Trimestre a Trimestre | Blog Salud Adeslas",
    seoDescription:
      "Guía completa del embarazo trimestre a trimestre. Recomendaciones médicas, alimentación y preparación al parto con Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "El embarazo es una de las etapas más emocionantes y transformadoras en la vida de una mujer y su pareja. Durante 40 semanas aproximadamente, el cuerpo experimenta cambios extraordinarios para dar la bienvenida a una nueva vida. Conocer qué esperar en cada fase ayuda a vivir el proceso con tranquilidad y seguridad.",
      },
      { type: "heading", text: "Primer trimestre (semanas 1-12)" },
      {
        type: "paragraph",
        text: "Las primeras semanas son cruciales para el desarrollo del embrión. Es cuando se forman los órganos principales, el corazón empieza a latir y se establece la conexión placentaria. Aunque externamente los cambios pueden ser sutiles, internamente está ocurriendo algo extraordinario.",
      },
      {
        type: "list",
        items: [
          "Comienza a tomar ácido fólico (400-800 mcg/día) lo antes posible",
          "Primera ecografía: entre la semana 6 y 8 para confirmar el embarazo",
          "Analítica completa del primer trimestre con screening de anomalías",
          "Es normal sentir náuseas, cansancio extremo y cambios emocionales",
          "Evita: tabaco, alcohol, embutidos crudos, quesos no pasteurizados",
        ],
      },
      { type: "heading", text: "Segundo trimestre (semanas 13-26)" },
      {
        type: "paragraph",
        text: "Considerado el trimestre más llevadero, las náuseas suelen desaparecer y la energía regresa. El bebé crece rápidamente: empieza a moverse (los primeros movimientos se sienten entre la semana 16-20), se desarrollan los sentidos y ya puede reaccionar a sonidos y luz.",
      },
      {
        type: "list",
        items: [
          "Ecografía morfológica (semana 20): revisión completa del desarrollo del bebé",
          "Test de O'Sullivan (semana 24-28): descarta diabetes gestacional",
          "Aumenta ligeramente las calorías (unas 300 kcal extra al día)",
          "Mantén actividad física moderada: caminar, nadar, yoga prenatal",
          "Empieza a planificar clases de preparación al parto",
        ],
      },
      { type: "heading", text: "Tercer trimestre (semanas 27-40)" },
      {
        type: "paragraph",
        text: "La recta final. El bebé gana peso y se coloca para el parto. Es normal sentir más cansancio, molestias lumbares y dificultad para dormir. Las contracciones de Braxton Hicks preparan el útero para el momento del parto.",
      },
      {
        type: "list",
        items: [
          "Ecografía del tercer trimestre (semana 32-34)",
          "Cultivo vagino-rectal (semana 35-37): descarta estreptococo grupo B",
          "Monitorización fetal a partir de la semana 38",
          "Prepara la bolsa del hospital y el plan de parto",
          "Descansa todo lo que puedas y practica técnicas de relajación",
        ],
      },
      { type: "heading", text: "Alimentación durante el embarazo" },
      {
        type: "paragraph",
        text: "La dieta durante el embarazo debe ser variada y nutritiva. Prioriza proteínas de calidad, hierro (carne, legumbres, espinacas), calcio (lácteos, frutos secos), omega-3 (pescado azul pequeño, nueces) y fibra para prevenir el estreñimiento. Hidrátate abundantemente: al menos 2,5 litros de agua al día.",
      },
      {
        type: "callout",
        text: "Con Adeslas tienes acceso a seguimiento completo del embarazo: ginecólogo, matrona, ecografías, analíticas y preparación al parto. Sin listas de espera para que vivas tu embarazo con total tranquilidad.",
      },
    ],
    relatedSlugs: [
      "alimentacion-equilibrada-familia",
      "revision-medica-anual",
      "salud-dental-ninos",
    ],
  },

  /* ── 7. Beneficios ejercicio cardiovascular ── */
  {
    slug: "beneficios-ejercicio-cardiovascular",
    category: "Bienestar",
    title: "Los beneficios del ejercicio cardiovascular a cualquier edad",
    excerpt:
      "Caminar, nadar o correr: cualquier actividad aeróbica mejora tu salud. Descubre los beneficios y cómo empezar de forma segura.",
    date: "14 Feb 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&h=400&fit=crop",
    seoTitle:
      "Beneficios del Ejercicio Cardiovascular | Blog Salud Adeslas",
    seoDescription:
      "Descubre los beneficios del ejercicio cardiovascular para tu salud a cualquier edad. Guía para empezar de forma segura con Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "El ejercicio cardiovascular, también llamado ejercicio aeróbico, es cualquier actividad que eleva tu frecuencia cardíaca de forma sostenida durante un período de tiempo. Caminar a paso rápido, nadar, montar en bicicleta, bailar o correr son algunos ejemplos. Y la ciencia es contundente: es una de las mejores medicinas que existen.",
      },
      { type: "heading", text: "Beneficios para el corazón" },
      {
        type: "paragraph",
        text: "El ejercicio regular fortalece el músculo cardíaco, mejora la circulación sanguínea, reduce la presión arterial y disminuye los niveles de colesterol LDL (malo) mientras aumenta el HDL (bueno). Las personas que hacen ejercicio regular tienen hasta un 50% menos de riesgo de enfermedad cardiovascular.",
      },
      { type: "heading", text: "Beneficios metabólicos" },
      {
        type: "paragraph",
        text: "La actividad aeróbica mejora la sensibilidad a la insulina, ayuda a controlar el peso corporal y reduce el riesgo de diabetes tipo 2. Además, acelera el metabolismo basal, lo que significa que tu cuerpo quema más calorías incluso en reposo.",
      },
      { type: "heading", text: "Beneficios para la salud mental" },
      {
        type: "paragraph",
        text: "El ejercicio libera endorfinas, serotonina y dopamina, neurotransmisores directamente relacionados con el bienestar y la felicidad. Estudios clínicos demuestran que 30 minutos de ejercicio moderado tienen un efecto comparable al de un antidepresivo suave, sin efectos secundarios.",
      },
      { type: "heading", text: "¿Cuánto ejercicio necesitas?" },
      {
        type: "paragraph",
        text: "La Organización Mundial de la Salud recomienda al menos 150 minutos semanales de actividad aeróbica moderada o 75 minutos de actividad intensa. Esto equivale a 30 minutos de caminata rápida, 5 días a la semana. Si nunca has hecho ejercicio, empieza con 15 minutos y ve aumentando gradualmente.",
      },
      { type: "heading", text: "Cómo empezar de forma segura" },
      {
        type: "list",
        items: [
          "Consulta con tu médico antes de iniciar un programa de ejercicio, especialmente si tienes más de 40 años o alguna patología previa",
          "Empieza suave: caminar es el ejercicio más accesible y completo",
          "Aumenta gradualmente: no más de un 10% de intensidad o duración por semana",
          "Usa calzado adecuado para prevenir lesiones",
          "Calienta 5 minutos antes y estira después",
          "Hidrátate antes, durante y después del ejercicio",
        ],
      },
      { type: "heading", text: "Ejercicio según la edad" },
      {
        type: "paragraph",
        text: "A los 20-30 años puedes permitirte actividades de alta intensidad como running o HIIT. A los 40-50, prioriza ejercicios de bajo impacto como natación o ciclismo. A partir de los 60, caminar, aquagym y tai chi son opciones ideales que combinan ejercicio cardiovascular con equilibrio y flexibilidad.",
      },
      {
        type: "callout",
        text: "Antes de empezar tu programa de ejercicio, hazte un chequeo médico deportivo con Adeslas. Incluye prueba de esfuerzo, electrocardiograma y valoración del aparato locomotor. Sin listas de espera.",
      },
    ],
    relatedSlugs: [
      "habitos-saludables-primavera",
      "gestionar-estres-trabajo",
      "revision-medica-anual",
    ],
  },

  /* ── 8. Alimentos reforzar defensas ── */
  {
    slug: "alimentos-reforzar-defensas",
    category: "Nutrición",
    title: "Alimentos que refuerzan tus defensas en invierno",
    excerpt:
      "Vitamina C, zinc y probióticos: descubre qué alimentos incorporar a tu dieta para fortalecer tu sistema inmunitario.",
    date: "10 Feb 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    seoTitle:
      "Alimentos para Reforzar Defensas | Blog Salud Adeslas",
    seoDescription:
      "Conoce los mejores alimentos para fortalecer tu sistema inmunitario. Vitamina C, zinc, probióticos y más. Blog de Salud Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "Nuestro sistema inmunitario es la defensa natural del cuerpo contra virus, bacterias y otros patógenos. Aunque funciona de forma autónoma, su eficacia depende en gran medida de lo que comemos. Una alimentación rica en ciertos nutrientes puede marcar la diferencia entre pasar el invierno saludable o caer en resfriados recurrentes.",
      },
      { type: "heading", text: "Vitamina C: más allá de la naranja" },
      {
        type: "paragraph",
        text: "La vitamina C es quizás el nutriente más asociado con las defensas. Estimula la producción de glóbulos blancos y actúa como antioxidante. Aunque la naranja es la fuente más conocida, el pimiento rojo, el kiwi, las fresas, el brócoli y las coles de Bruselas contienen incluso más vitamina C por ración.",
      },
      { type: "heading", text: "Zinc: el mineral olvidado" },
      {
        type: "paragraph",
        text: "El zinc es esencial para el funcionamiento correcto del sistema inmunitario. Su déficit está asociado con una mayor susceptibilidad a infecciones. Las mejores fuentes son las ostras, la carne de vacuno, las semillas de calabaza, las lentejas, los garbanzos y los frutos secos.",
      },
      { type: "heading", text: "Probióticos: tu segunda barrera" },
      {
        type: "paragraph",
        text: "El 70% de nuestro sistema inmunitario se encuentra en el intestino. Los probióticos son microorganismos vivos que mantienen el equilibrio de la flora intestinal y refuerzan esta barrera defensiva. Los encuentras en el yogur natural, el kéfir, el chucrut, el kimchi y el miso.",
      },
      { type: "heading", text: "Vitamina D: la vitamina del sol" },
      {
        type: "paragraph",
        text: "En invierno, con menos horas de luz, nuestros niveles de vitamina D caen significativamente. Esta vitamina modula la respuesta inmunitaria. Además de la exposición solar, puedes obtenerla del pescado azul (salmón, sardinas, caballa), huevos y setas expuestas al sol.",
      },
      { type: "heading", text: "Top 10 alimentos para tus defensas" },
      {
        type: "list",
        items: [
          "Ajo: antibacteriano y antiviral natural",
          "Jengibre: antiinflamatorio y digestivo",
          "Cúrcuma: potente antioxidante y antiinflamatorio",
          "Espinacas: ricas en vitamina C, betacarotenos y antioxidantes",
          "Almendras: vitamina E y grasas saludables",
          "Cítricos: naranja, limón, pomelo y mandarina",
          "Yogur natural: probióticos y proteínas",
          "Batata / boniato: betacarotenos y vitamina A",
          "Té verde: catequinas con propiedades antivirales",
          "Miel: propiedades antibacterianas (no apta para menores de 1 año)",
        ],
      },
      {
        type: "callout",
        text: "Si sientes que tus defensas están bajas o sufres infecciones recurrentes, consulta con tu médico de Adeslas. Una analítica puede detectar déficits nutricionales que se corrigen fácilmente.",
      },
      {
        type: "paragraph",
        text: "Recuerda que la alimentación es solo una parte del puzzle inmunitario. El sueño reparador, el ejercicio moderado y la gestión del estrés son igualmente importantes para mantener tus defensas en plena forma.",
      },
    ],
    relatedSlugs: [
      "alimentacion-equilibrada-familia",
      "habitos-saludables-primavera",
      "dormir-mejor-higiene-sueno",
    ],
  },

  /* ── 9. Dormir mejor higiene sueño ── */
  {
    slug: "dormir-mejor-higiene-sueno",
    category: "Salud Mental",
    title: "Higiene del sueño: claves para dormir mejor cada noche",
    excerpt:
      "Un buen descanso es fundamental para tu salud. Aprende las pautas que recomienda la medicina del sueño para mejorar tu descanso.",
    date: "5 Feb 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop",
    seoTitle:
      "Higiene del Sueño: Claves para Dormir Mejor | Blog Salud Adeslas",
    seoDescription:
      "Mejora tu calidad de sueño con estas claves de higiene del sueño. Técnicas y pautas recomendadas por profesionales de Adeslas.",
    body: [
      {
        type: "paragraph",
        text: "Dormir bien no es un lujo, es una necesidad biológica fundamental. Durante el sueño, nuestro cuerpo repara tejidos, consolida memorias, regula hormonas y fortalece el sistema inmunitario. Sin embargo, cada vez más personas tienen dificultades para conciliar o mantener un sueño reparador.",
      },
      {
        type: "paragraph",
        text: "La higiene del sueño es el conjunto de hábitos y condiciones ambientales que favorecen un descanso de calidad. No se trata de medicación ni de técnicas complicadas, sino de crear las condiciones óptimas para que tu cuerpo haga lo que sabe hacer naturalmente: dormir.",
      },
      { type: "heading", text: "¿Cuántas horas necesitas?" },
      {
        type: "paragraph",
        text: "La necesidad de sueño varía según la edad. Los adultos necesitan entre 7 y 9 horas por noche. Los adolescentes requieren 8-10 horas, los niños en edad escolar 9-12 horas y los bebés hasta 17 horas. Dormir menos de 6 horas de forma habitual se asocia con mayor riesgo de enfermedades cardiovasculares, diabetes, obesidad y deterioro cognitivo.",
      },
      { type: "heading", text: "Horario regular" },
      {
        type: "paragraph",
        text: "Tu cuerpo tiene un reloj biológico (ritmo circadiano) que funciona mejor con rutinas. Acuéstate y levántate a la misma hora cada día, incluyendo fines de semana. La variación no debería superar los 30 minutos. Esto es, según los especialistas del sueño, la medida más efectiva para mejorar el descanso.",
      },
      { type: "heading", text: "El entorno perfecto para dormir" },
      {
        type: "list",
        items: [
          "Temperatura: entre 18°C y 20°C es lo ideal",
          "Oscuridad total: usa cortinas opacas o antifaz",
          "Silencio: tapones de oídos o ruido blanco si hay ruido ambiental",
          "Colchón y almohada: renuévalos cada 8-10 años; busca firmeza media",
          "Sin pantallas: televisor, móvil y tablet fuera del dormitorio",
        ],
      },
      { type: "heading", text: "Rutina pre-sueño" },
      {
        type: "paragraph",
        text: "Crea un ritual de 30-60 minutos antes de acostarte que le indique a tu cerebro que es hora de descansar. Puede incluir una ducha templada, lectura en papel, estiramientos suaves o meditación. Evita actividades estimulantes como discusiones intensas, ejercicio vigoroso o trabajo.",
      },
      { type: "heading", text: "Lo que debes evitar" },
      {
        type: "list",
        items: [
          "Cafeína: no la consumas después de las 14:00 (su efecto dura 6-8 horas)",
          "Alcohol: aunque induce somnolencia, fragmenta el sueño profundo",
          "Cenas copiosas: cena al menos 2 horas antes de acostarte",
          "Pantallas: la luz azul suprime la melatonina; no las uses 1 hora antes de dormir",
          "Siestas largas: máximo 20-30 minutos y antes de las 15:00",
        ],
      },
      { type: "heading", text: "¿Cuándo consultar al médico?" },
      {
        type: "paragraph",
        text: "Si llevas más de 3 semanas con dificultades para dormir, ronquidos intensos, apneas observadas por tu pareja, piernas inquietas o somnolencia excesiva durante el día, consulta con un especialista. El insomnio crónico tiene tratamiento y no debería normalizarse.",
      },
      {
        type: "callout",
        text: "Con Adeslas puedes acceder a unidades de trastornos del sueño, neurología y psicología sin listas de espera. Un buen diagnóstico es el primer paso para volver a dormir bien.",
      },
    ],
    relatedSlugs: [
      "gestionar-estres-trabajo",
      "habitos-saludables-primavera",
      "alimentos-reforzar-defensas",
    ],
  },

  /* ── 9. Guía Completa Seguros Adeslas 2026 ── */
  {
    slug: "guia-completa-seguros-medicos-asisa-2026",
    category: "Seguros",
    title: "Guía Completa de Seguros Médicos Adeslas 2026: Precios, Coberturas y Cuál Elegir",
    excerpt:
      "Descubre todos los seguros médicos de Adeslas 2026 con sus precios, coberturas y qué plan es ideal según tu perfil. Guía completa y comparativa.",
    date: "29 Mar 2026",
    readTime: "12 min",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
    seoTitle:
      "Guía Completa Seguros Médicos Adeslas 2026 | Precios y Coberturas",
    seoDescription:
      "Guía completa de seguros médicos Adeslas 2026. Conoce todos los planes, precios, coberturas y elige el seguro médico perfecto para ti.",
    body: [
      {
        type: "paragraph",
        text: "Elegir un seguro médico es una de las decisiones más importantes para proteger tu salud y la de tu familia. Adeslas, con más de 30 años de experiencia y 1.200+ centros médicos en España, ofrece una amplia variedad de planes para adaptarse a cualquier perfil y necesidad. En esta guía completa, te presentamos todos los seguros médicos Adeslas 2026, sus precios, coberturas y cómo elegir el que mejor se ajusta a ti.",
      },
      {
        type: "paragraph",
        text: "Desde jóvenes adultos que buscan cobertura ambulatoria hasta familias que necesitan hospitalización completa, Adeslas tiene opciones competitivas y accesibles. Descubre qué plan es ideal para tu situación.",
      },

      { type: "heading", text: "¿Por qué elegir Adeslas?" },
      {
        type: "paragraph",
        text: "Adeslas es una de las aseguradoras médicas más consolidadas de España. Con más de 30 años en el mercado, cuenta con acceso a más de 44.000 profesionales médicos y centros sanitarios. Entre sus ventajas destacan: 1.200+ centros médicos, cero listas de espera, centros de diagnóstico avanzado, y cobertura nacional e internacional.",
      },
      {
        type: "paragraph",
        text: "Cada plan Adeslas está diseñado con flexibilidad y con la posibilidad de personalizar coberturas según tus necesidades.",
      },

      { type: "heading", text: "Resumen de Planes Adeslas 2026" },
      {
        type: "paragraph",
        text: "Adeslas ofrece una gama completa de seguros médicos para diferentes perfiles y presupuestos. Aquí te mostramos un resumen de los principales planes disponibles en 2026:",
      },
      {
        type: "list",
        items: [
          "Adeslas Go: desde 13,39€/mes - Cobertura ambulatoria básica",
          "Adeslas Plena Vital: desde 32,97€/mes - Ambulatoria sin copago",
          "Adeslas Plena Total: desde 50,92€/mes - Cobertura total con hospitalización (más vendido)",
          "Adeslas Plena Total+: desde 40,20€/mes - Hospitalización con copago reducido",
          "Adeslas Plena Total++: desde 22,55€/mes - Copago máximo 300€/año",
          "Adeslas Extra 150: desde 59,71€/mes - Libre elección de médico",
          "Adeslas Dental: desde 9,45€/mes - Cobertura bucodental completa",
        ],
      },

      { type: "heading", text: "Planes Ambulatorios: Adeslas Go y Adeslas Plena Vital" },
      {
        type: "paragraph",
        text: "Si buscas cobertura para consultas médicas, diagnóstico y tratamientos sin necesidad de hospitalización, los planes ambulatorios de Adeslas son tu opción.",
      },

      { type: "heading", text: "Adeslas Go: La opción más accesible" },
      {
        type: "paragraph",
        text: "Desde 13,39€/mes, Adeslas Go es el plan más económico de Adeslas. Está dirigido a personas jóvenes, autónomos o aquellos que buscan una cobertura básica. Incluye consultas de medicina general y especialidades, pruebas diagnósticas, y farmacia, con un copago por servicio.",
      },
      {
        type: "list",
        items: [
          "Consulta de médico general: copago aplicable",
          "Especialidades médicas: copago aplicable",
          "Pruebas diagnósticas: radiología, análisis, ecografía",
          "Farmacia: cobertura según copago",
          "Acceso a red de 44.000 profesionales Adeslas",
          "Válido hasta 85 años",
        ],
      },
      {
        type: "callout",
        text: "Adeslas Go es ideal para jóvenes sanos que buscan protección básica a precio muy competitivo, sin compromisos de larga duración.",
      },

      { type: "heading", text: "Adeslas Plena Vital: Ambulatoria sin copago" },
      {
        type: "paragraph",
        text: "Desde 32,97€/mes, Adeslas Plena Vital ofrece cobertura ambulatoria completa sin copago. Es el plan preferido por quienes quieren acceso inmediato a especialidades sin gastos adicionales por consulta.",
      },
      {
        type: "list",
        items: [
          "Medicina general: sin copago",
          "Especialidades: sin copago",
          "Pruebas diagnósticas: sin copago",
          "Farmacia: cobertura incluida",
          "Acceso preferente sin listas de espera",
          "Válido hasta 85 años",
        ],
      },
      {
        type: "paragraph",
        text: "Este plan es perfecto para personas que quieren tranquilidad en consultas ambulatorias sin sorpresas de gastos. Sin embargo, no incluye cobertura de hospitalización, cirugías complejas o tratamientos que requieren ingreso.",
      },

      { type: "heading", text: "Planes Completos: Hospitalización incluida" },
      {
        type: "paragraph",
        text: "Los planes Adeslas Plena Total, Completa+ y Completa++ incluyen hospitalización, cirugías, urgencias y cobertura integral de salud. Son los más demandados por familias y personas con mayor poder adquisitivo.",
      },

      { type: "heading", text: "Adeslas Plena Total: La opción más popular" },
      {
        type: "paragraph",
        text: "Desde 50,92€/mes, Adeslas Plena Pluses el plan más vendido de Adeslas. Ofrece cobertura integral sin copago en la mayoría de servicios, incluyendo hospitalización, cirugía, urgencias, y todas las especialidades médicas.",
      },
      {
        type: "list",
        items: [
          "Medicina general y especialidades: sin copago",
          "Hospitalización: cobertura completa",
          "Cirugía: sin copago",
          "Pruebas diagnósticas avanzadas: sin copago",
          "Urgencias: cobertura total",
          "Farmacia: cobertura incluida",
          "Maternidad: servicios preparto, parto y posparto",
          "Rehabilitación y fisioterapia: incluida",
        ],
      },
      {
        type: "callout",
        text: "Adeslas Plena Pluses la opción recomendada para familias. Ofrece tranquilidad total sabiendo que cualquier problema de salud está cubierto sin gastos sorpresa.",
      },

      { type: "heading", text: "Adeslas Plena Total+: Hospitalización con copago reducido" },
      {
        type: "paragraph",
        text: "Desde 40,20€/mes, Adeslas Plena Total+ es una versión más económica de Adeslas Plena Total. Mantiene la cobertura de hospitalización pero con un copago reducido en algunos servicios.",
      },
      {
        type: "list",
        items: [
          "Medicina general: sin copago",
          "Especialidades: copago reducido",
          "Hospitalización: sin copago",
          "Cirugía hospitalaria: sin copago",
          "Farmacia: copago aplicable",
          "Urgencias: cobertura total",
          "Maternidad: servicios incluidos",
        ],
      },
      {
        type: "paragraph",
        text: "Este plan es ideal si tu presupuesto es limitado pero necesitas protección de hospitalización. El copago en especialidades es bajo, normalmente entre 5€ y 15€ por consulta.",
      },

      { type: "heading", text: "Adeslas Plena Total++: Máximo ahorro con copago anual" },
      {
        type: "paragraph",
        text: "Desde 22,55€/mes, Adeslas Plena Total++ es el plan más económico con cobertura de hospitalización. En lugar de copago por servicio, tiene un copago máximo de 300€/año. Una vez alcanzado este límite, el resto del año está totalmente cubierto.",
      },
      {
        type: "list",
        items: [
          "Cobertura completa: medicina general, especialidades, hospitalización, cirugía",
          "Copago máximo: 300€/año",
          "Una vez superado, cobertura 100% restante",
          "Ideal para personas con baja utilización de servicios médicos",
          "Prima muy competitiva",
        ],
      },
      {
        type: "callout",
        text: "Adeslas Plena Total++ es perfecto para personas jóvenes y sanas que buscan protección integral a precio mínimo. Ideal para autónomos que quieren maximizar deducibilidad fiscal.",
      },

      { type: "heading", text: "Adeslas Extra 150: Libertad total de elección médica" },
      {
        type: "paragraph",
        text: "Desde 59,71€/mes, Adeslas Extra 150 ofrece libertad total para elegir cualquier médico, clínica u hospital, especialista o no, en toda España e internacionalmente. El sistema funciona por reembolso: tú pagas y Adeslas te devuelve el importe según su tarifa.",
      },
      {
        type: "list",
        items: [
          "Libre elección de profesionales médicos",
          "Sin redes restringidas",
          "Cobertura en el extranjero",
          "Cobertura de especialidades no reconocidas por la Seguridad Social",
          "Reembolso según tarifa Adeslas",
          "Ideal para profesionales que necesitan continuidad con su médico",
        ],
      },
      {
        type: "paragraph",
        text: "Este plan es preferido por ejecutivos, profesionales que cambian de ciudad frecuentemente, y personas que tienen médicos de confianza fuera de las redes de Adeslas.",
      },

      { type: "heading", text: "Adeslas Dental: Cobertura bucodental específica" },
      {
        type: "paragraph",
        text: "Desde 9,45€/mes, Adeslas Dental es un plan específico para cobertura bucodental. Cubre servicios odontológicos incluidos sin coste (revisiones, limpiezas, radiografías, extracciones simples) y franquicias reducidas en endodoncia, implantes, ortodoncia y prótesis.",
      },
      {
        type: "list",
        items: [
          "Revisión y limpieza: sin límite de sesiones",
          "Empastes y obturaciones: cobertura total",
          "Endodoncias (tratamientos de canal): cobertura incluida",
          "Extracciones dentales: cobertura total",
          "Ortodoncia: cobertura parcial",
          "Implantes y prótesis: cobertura según plan",
          "Acceso a red de más de 2.500 clínicas dentales",
        ],
      },

      { type: "heading", text: "Planes para Autónomos y Empresas" },
      {
        type: "paragraph",
        text: "Adeslas también ofrece planes especiales para autónomos y empresas, con ventajas fiscales. Los seguros para autónomos son deducibles al 100% en el IRPF, y los planes de empresa son deducibles al 100% en el Impuesto de Sociedades.",
      },
      {
        type: "list",
        items: [
          "Planes personalizables según número de empleados",
          "Deducción fiscal 100% en IRPF para autónomos",
          "Deducción 100% en Impuesto de Sociedades para empresas",
          "Flexibilidad en contratación individual o colectiva",
          "Acceso preferente a especialistas",
          "Gestión administrativa simplificada",
        ],
      },

      { type: "heading", text: "Newcomers Protection: Para Extranjeros en España" },
      {
        type: "paragraph",
        text: "Adeslas Newcomers Protection es un plan diseñado especialmente para extranjeros que llegan a España. Ofrece cobertura integral de salud durante los primeros años de estancia, con acceso inmediato sin período de espera.",
      },
      {
        type: "list",
        items: [
          "Cobertura completa desde el primer día",
          "Sin período de espera (waiting period)",
          "Cobertura de patologías preexistentes",
          "Válido en toda España",
          "Renovable anualmente",
          "Perfecto para estudiantes, trabajadores y jubilados extranjeros",
        ],
      },

      { type: "heading", text: "¿Cuál elegir según tu perfil?" },
      {
        type: "paragraph",
        text: "La decisión depende de tu edad, salud, situación laboral y presupuesto. Aquí te damos una guía rápida:",
      },

      { type: "heading", text: "Si eres joven y sano (18-30 años)" },
      {
        type: "paragraph",
        text: "Adeslas Go (13,39€/mes) o Adeslas Plena Total++ (22,55€/mes) son ideales. Ofrecen protección básica o cobertura integral a precio mínimo. Si ya tienes algún problema de salud, considera Adeslas Plena Vital (32,97€/mes) para acceso sin copago.",
      },

      { type: "heading", text: "Si eres familia con hijos" },
      {
        type: "paragraph",
        text: "Adeslas Plena Plus(50,92€/mes) es la mejor opción. Incluye maternidad, pediatría, urgencias pediátricas y todas las especialidades. La tranquilidad de no tener copagos es invaluable cuando hay niños.",
      },

      { type: "heading", text: "Si eres autónomo/a" },
      {
        type: "paragraph",
        text: "Elige según tu giro. Adeslas Plena Total++ (22,55€/mes) con deducción fiscal es muy rentable. Si necesitas continuidad con médicos específicos, Adeslas Extra 150 (59,71€/mes) te da libertad total.",
      },

      { type: "heading", text: "Si eres mayor de 30 años" },
      {
        type: "paragraph",
        text: "Adeslas Plena Plus(50,92€/mes) es recomendable. A partir de esta edad, la cobertura hospitalaria se vuelve más importante. Las revisiones preventivas anuales son prioritarias.",
      },

      { type: "heading", text: "Si eres extranjero viviendo en España" },
      {
        type: "paragraph",
        text: "Newcomers Protection ofrece acceso inmediato sin período de espera. Perfecto si llegas sin historial médico en España o necesitas continuidad de tratamientos previos.",
      },

      { type: "heading", text: "Ventajas de Adeslas frente a otros seguros" },
      {
        type: "paragraph",
        text: "Adeslas destaca en varios aspectos que la diferencian de otras aseguradoras:",
      },
      {
        type: "list",
        items: [
          "1.200+ centros médicos: garantiza calidad y disponibilidad de camas",
          "44.000+ profesionales acreditados: amplia red de cobertura",
          "Cero listas de espera: acceso inmediato a especialistas",
          "App móvil: gestión de citas y documentación desde el móvil",
          "Atención 24/7: teléfono de urgencias disponible siempre",
          "Cobertura internacional: protección en viajes al extranjero",
          "Sin período de carencia: cobertura desde el primer día (excepto algunas prestaciones)",
          "Flexibilidad: cancelación en cualquier momento",
        ],
      },

      { type: "heading", text: "Preguntas Frecuentes sobre Seguros Adeslas 2026" },

      { type: "heading", text: "¿Hay período de carencia en Adeslas?" },
      {
        type: "paragraph",
        text: "La mayoría de servicios están cubiertos desde el primer día. Sin embargo, algunas prestaciones como maternidad o tratamientos de patologías preexistentes pueden tener períodos de espera de 6-12 meses según el plan. Es importante revisar las condiciones específicas al contratar.",
      },

      { type: "heading", text: "¿Puedo cambiar de plan dentro de Adeslas?" },
      {
        type: "paragraph",
        text: "Sí. Adeslas permite cambiar de plan anualmente o por cambios de circunstancias (matrimonio, nacimiento, cambio de trabajo). Los cambios se tramitan sin penalización.",
      },

      { type: "heading", text: "¿Adeslas cubre tratamientos dentales complejos?" },
      {
        type: "paragraph",
        text: "Adeslas Dental cubre la mayoría de tratamientos: limpiezas, empastes, endodoncias, extracciones e implantes. La cobertura varía según si optas por el plan dental específico o incluyes cobertura bucodental en un plan médico general.",
      },

      { type: "heading", text: "¿Cuál es el copago máximo anual en Adeslas Plena Total++?" },
      {
        type: "paragraph",
        text: "En Adeslas Plena Total++, el copago máximo es de 300€/año. Una vez alcanzado este límite, el resto del año tienes cobertura 100%. Es un sistema de protección contra gastos catastróficos.",
      },

      { type: "heading", text: "¿Adeslas cubre psicología y salud mental?" },
      {
        type: "paragraph",
        text: "Sí. Todos los planes Adeslas incluyen cobertura de psicología, psiquiatría y servicios de salud mental. Es una cobertura cada vez más importante dado el aumento de problemas de ansiedad y depresión en la población.",
      },

      { type: "heading", text: "¿Puedo dar de baja mi seguro Adeslas cuando quiera?" },
      {
        type: "paragraph",
        text: "Sí, sin penalización. Adeslas no obliga a permanencia mínima. Puedes cancelar tu póliza cuando consideres oportuno, aunque es recomendable mantener cobertura continua.",
      },

      { type: "heading", text: "Cómo contratar un seguro Adeslas" },
      {
        type: "paragraph",
        text: "Contratar un seguro Adeslas es rápido y sencillo. Puedes hacerlo de varias formas:",
      },
      {
        type: "list",
        items: [
          "En línea: a través del web simulador de Adeslas, en 5 minutos",
          "Por teléfono: llamando a Adeslas Atención al Cliente",
          "Presencialmente: en una oficina Adeslas",
          "Con broker: a través de un agente especializado",
        ],
      },
      {
        type: "paragraph",
        text: "El proceso incluye un cuestionario de salud, cálculo de prima, y aceptación de condiciones. La cobertura comienza normalmente al día siguiente del pago de la primera prima.",
      },

      { type: "heading", text: "Conclusión: Tu mejor aliado para la salud" },
      {
        type: "paragraph",
        text: "Adeslas ofrece un abanico completo de seguros médicos para cualquier necesidad y presupuesto. Desde Adeslas Go a precio mínimo hasta Adeslas Plena Pluscon cobertura integral, existe un plan perfecto para cada persona.",
      },
      {
        type: "paragraph",
        text: "Recuerda que la salud es tu bien más valioso. Un buen seguro médico no es un gasto, es una inversión. Elige un plan Adeslas, accede sin listas de espera a 44.000 profesionales médicos, y disfruta de la tranquilidad de estar protegido.",
      },
      {
        type: "callout",
        text: "¿Listo para proteger tu salud? Contrata tu seguro Adeslas 2026 hoy sin compromiso de permanencia. En Adeslas, tu salud es nuestra prioridad.",
      },
    ],
    relatedSlugs: [
      "revision-medica-anual",
      "habitos-saludables-primavera",
      "alimentos-reforzar-defensas",
    ],
  },
];

/** Helper: find a post by slug */
export const getPostBySlug = (slug: string) =>
  blogPosts.find((p) => p.slug === slug);

/** Helper: get related posts */
export const getRelatedPosts = (slugs: string[]) =>
  slugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean) as BlogPostFull[];
