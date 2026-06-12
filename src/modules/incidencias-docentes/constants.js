const INIT_DOCENTE_INCIDENTS = [
  // EN EL AULA
  {
    id: "di1",
    tipo: "en_aula",
    titulo: "Interrupción de clase sin avisar",
    fecha: "2026-05-12",
    docente1Id: "jared",
    docente2Id: "lila",
    version1:
      "Entré al salón para recoger el proyector que necesitaba en sala de cómputo. No interrumpí la clase, solo tomé el equipo en silencio. La maestra Lila reaccionó de forma exagerada frente a los alumnos.",
    version2: null,
    estado: "pendiente",
    resolucion: null,
    registradoPor: "Ing. Jared Camacho",
    grupo: "5B Primaria",
    materia: "Tecnología",
  },
  {
    id: "di2",
    tipo: "en_aula",
    titulo: "Desacuerdo sobre criterio de evaluación",
    fecha: "2026-05-08",
    docente1Id: "eduardo",
    docente2Id: "lila",
    version1:
      "La maestra Lila modificó el criterio del parcial de matemáticas de 5B sin consultarme, siendo que yo soy el hora-clase asignado. Esto generó confusión entre los alumnos.",
    version2: null,
    estado: "pendiente",
    resolucion: null,
    registradoPor: "Ing. Eduardo Torbellin",
    grupo: "5B Primaria",
    materia: "Matemáticas",
  },
  {
    id: "di3",
    tipo: "en_aula",
    titulo: "Tono de voz elevado frente al grupo",
    fecha: "2026-04-29",
    docente1Id: "erika",
    docente2Id: "fernando",
    version1:
      "El maestro Fernando interrumpió mi clase con 3A para buscar un balón. Llegó con voz alta y alteró al grupo. Tardamos 10 minutos en retomar la dinámica.",
    version2: null,
    estado: "pendiente",
    resolucion: null,
    registradoPor: "Miss Erika Castro",
    grupo: "3A Primaria",
    materia: "Matemáticas",
  },
  {
    id: "di4",
    tipo: "en_aula",
    titulo: "Uso del aula de cómputo sin reservación",
    fecha: "2026-04-15",
    docente1Id: "fernando",
    docente2Id: "jared",
    version1:
      "Llegué al aula de cómputo con 4B y el maestro Jared estaba usando el espacio sin haberlo reservado en el cuaderno.",
    version2:
      "Sí estaba trabajando con 6A porque la dirección me autorizó verbalmente ese espacio — mi salón tenía falla en el proyector. No supe que Fernando tenía reservación ese día.",
    estado: "completo",
    resolucion: null,
    registradoPor: "Prof. Fernando Paulino",
    grupo: "4B Primaria",
    materia: "Educación Física",
  },
  {
    id: "di5",
    tipo: "en_aula",
    titulo: "Cambio de horario sin notificación previa",
    fecha: "2026-04-03",
    docente1Id: "lila",
    docente2Id: "eduardo",
    version1:
      "El maestro Eduardo no llegó a las 10:00. Tuve que cubrir el grupo y eso me sacó de mi clase titular. No se nos avisó de ningún cambio.",
    version2:
      "Hubo convocatoria de jefatura de academia ese día. Avisé a la subdirección con un día de anticipación, pero aparentemente eso no llegó al maestro de guardia.",
    estado: "completo",
    resolucion: null,
    registradoPor: "Miss Lila Meza",
    grupo: "5B Primaria",
    materia: "Matemáticas",
  },
  {
    id: "di6",
    tipo: "en_aula",
    titulo: "Reorganización de aula sin consultar al titular",
    fecha: "2026-03-18",
    docente1Id: "erika",
    docente2Id: "fernando",
    version1:
      "Llegué a dar matemáticas con 2A y encontré todas las sillas en círculo. Los alumnos tardaron mucho en acomodarlas de vuelta.",
    version2:
      "La actividad de expresión corporal requería espacio abierto. Dejé el salón casi en el orden original. En lo futuro aviso con anticipación.",
    estado: "completo",
    resolucion: null,
    registradoPor: "Miss Erika Castro",
    grupo: "2A Primaria",
    materia: "Matemáticas",
  },
  {
    id: "di7",
    tipo: "en_aula",
    titulo: "Calificaciones capturadas en sistema incorrecto",
    fecha: "2026-02-20",
    docente1Id: "jared",
    docente2Id: "erika",
    version1:
      "Encontré calificaciones de tecnología de 6A bajo el nombre de Erika Castro. Los padres se confundieron.",
    version2:
      "Fue un error al seleccionar la materia en el sistema. En cuanto me avisaron lo corregí de inmediato. No hubo mala intención.",
    estado: "resuelto",
    resolucion:
      "Se revisó el sistema con la coordinadora. Las calificaciones fueron reasignadas correctamente. Ambos docentes fueron capacitados en el flujo correcto del sistema.",
    registradoPor: "Ing. Jared Camacho",
    grupo: "6A Primaria",
    materia: "Tecnología",
  },
  {
    id: "di8",
    tipo: "en_aula",
    titulo: "Aula multiusos ocupada en horario asignado",
    fecha: "2026-01-27",
    docente1Id: "fernando",
    docente2Id: "eduardo",
    version1:
      "El aula multiusos estaba siendo usada por Eduardo para una presentación en mi horario de Ed. Física. Tuve que dar clase en el patio a pleno sol.",
    version2:
      "No había indicación de que el espacio estaba reservado. La coordinadora me lo prestó porque la sala AV estaba ocupada. No fue intencional.",
    estado: "resuelto",
    resolucion:
      "Se implementó un cuaderno de reservaciones físico en recepción. Ambos maestros firmaron de enterados. Se asignó prioridad al horario oficial de Ed. Física.",
    registradoPor: "Prof. Fernando Paulino",
    grupo: "5A Primaria",
    materia: "Educación Física",
  },
  // INTERPERSONAL
  {
    id: "di9",
    tipo: "interpersonal",
    titulo: "Cuestionamiento de método de evaluación en grupo de WhatsApp",
    fecha: "2026-05-20",
    docente1Id: "lila",
    docente2Id: "erika",
    version1:
      "La maestra Erika publicó en el grupo de docentes un mensaje donde cuestionó mi forma de evaluar frente a todos, en lugar de hablar conmigo directamente. Me pareció una falta de respeto.",
    version2: null,
    estado: "pendiente",
    resolucion: null,
    registradoPor: "Miss Lila Meza",
    medio: "whatsapp",
  },
  {
    id: "di10",
    tipo: "interpersonal",
    titulo: "Interrupciones en reunión de academia",
    fecha: "2026-05-06",
    docente1Id: "fernando",
    docente2Id: "jared",
    version1:
      "En la reunión del 6 de mayo, el maestro Jared interrumpió mi presentación de resultados tres veces con comentarios fuera de lugar. La coordinadora tuvo que intervenir.",
    version2: null,
    estado: "pendiente",
    resolucion: null,
    registradoPor: "Prof. Fernando Paulino",
    medio: "verbal",
  },
  {
    id: "di11",
    tipo: "interpersonal",
    titulo: "Correo con copia a dirección sin aviso previo",
    fecha: "2026-04-22",
    docente1Id: "erika",
    docente2Id: "lila",
    version1:
      "Recibí un correo de la maestra Erika reportando una diferencia de criterios a la dirección sin haberme notificado antes.",
    version2:
      "Ya había intentado hablar con Lila en dos ocasiones sin acuerdo. Envié el correo como registro formal, no como denuncia. Lo hice para tener respaldo documental.",
    estado: "completo",
    resolucion: null,
    registradoPor: "Miss Erika Castro",
    medio: "correo",
  },
  {
    id: "di12",
    tipo: "interpersonal",
    titulo: "Respuesta agresiva a mensaje general en WhatsApp",
    fecha: "2026-04-10",
    docente1Id: "jared",
    docente2Id: "fernando",
    version1:
      "Publiqué un mensaje sobre el uso de celulares en el trabajo y el maestro Fernando respondió agresivamente asumiendo que era para él. El intercambio fue incómodo frente a 20 compañeros.",
    version2:
      "El mensaje de Jared llegó en el contexto de una discusión del día anterior donde yo sí había tenido el celular en una actividad. Asumí que era para mí y reaccioné a la defensiva.",
    estado: "completo",
    resolucion: null,
    registradoPor: "Ing. Jared Camacho",
    medio: "whatsapp",
  },
  {
    id: "di13",
    tipo: "interpersonal",
    titulo: "Comentario sobre planeaciones en sala de maestros",
    fecha: "2026-03-05",
    docente1Id: "eduardo",
    docente2Id: "erika",
    version1:
      "La maestra Erika comentó en la sala de maestros que mis planeaciones 'no seguían el formato NEM' delante de compañeros. Sentí que socavó mi credibilidad sin hablar conmigo primero.",
    version2:
      "Mi comentario fue general, no específico sobre Eduardo. Si se sintió aludido pido disculpas, no fue mi intención señalarlo.",
    estado: "resuelto",
    resolucion:
      "Ambos tuvieron una reunión mediada por la coordinadora el 10 de marzo. Se aclararon los términos y se llegó a un acuerdo de comunicación directa antes de comentar en espacios comunes.",
    registradoPor: "Ing. Eduardo Torbellin",
    medio: "verbal",
  },
  {
    id: "di14",
    tipo: "interpersonal",
    titulo: "Información contradictoria en reunión de padres",
    fecha: "2026-02-12",
    docente1Id: "fernando",
    docente2Id: "lila",
    version1:
      "En la reunión de padres de 5B, la maestra Lila contradijo públicamente información que yo había dado sobre las actividades físicas del ciclo. Fue incómodo para mí y confuso para los padres.",
    version2:
      "No tenía intención de contradecir a Fernando. El padre preguntó sobre la carga académica y respondí desde mi perspectiva como titular. Debí coordinar con él antes.",
    estado: "resuelto",
    resolucion:
      "Se acordó que ambos docentes compartirán información antes de reuniones de padres. La coordinadora revisará el orden del día cuando haya más de un docente presente.",
    registradoPor: "Prof. Fernando Paulino",
    medio: "verbal",
  },
];

const ESTADO_ORDER = { pendiente: 0, completo: 1, resuelto: 2 };

const ESTADO_STYLE = {
  pendiente: { bg: "#fef9c3", color: "#854d0e", label: "Pendiente" },
  completo: { bg: "#dbeafe", color: "#1e40af", label: "Completo" },
  resuelto: { bg: "#dcfce7", color: "#166534", label: "Resuelto" },
};

const TIPO_LABELS = { en_aula: "En el aula", interpersonal: "Interpersonal" };

const MEDIO_LABELS = {
  whatsapp: "WhatsApp",
  verbal: "Verbal",
  correo: "Correo",
  otro: "Otro",
};

window.INIT_DOCENTE_INCIDENTS = INIT_DOCENTE_INCIDENTS;
window.ESTADO_ORDER = ESTADO_ORDER;
window.ESTADO_STYLE = ESTADO_STYLE;
window.TIPO_LABELS = TIPO_LABELS;
window.MEDIO_LABELS = MEDIO_LABELS;
