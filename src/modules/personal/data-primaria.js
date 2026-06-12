/* ─── Data mock: Personal Primaria ─────────────────────────────────────────
   Datos por sección para el módulo Personal genérico. Sin JSX. */

window.CV_PERSONAL = window.CV_PERSONAL || {};
window.CV_PERSONAL.primaria = (function () {
const DOCENTES = [
  // Titulares
  {
    id: "d01",
    nombre: "Miss Lila Meza Ríos",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["1°A"],
    activo: true,
    iniciales: "LM",
  },
  {
    id: "d02",
    nombre: "Miss Caro Salinas Vega",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["1°B"],
    activo: true,
    iniciales: "CS",
  },
  {
    id: "d03",
    nombre: "Miss Paty Romero Fuentes",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["2°A"],
    activo: true,
    iniciales: "PR",
  },
  {
    id: "d04",
    nombre: "Miss Laura Ibáñez Castillo",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["2°B"],
    activo: true,
    iniciales: "LI",
  },
  {
    id: "d05",
    nombre: "Mtro. Jorge Pedraza Soto",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["3°A"],
    activo: true,
    iniciales: "JP",
  },
  {
    id: "d06",
    nombre: "Miss Diana Ruiz Campos",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["3°B"],
    activo: true,
    iniciales: "DR",
  },
  {
    id: "d07",
    nombre: "Miss Sandra Molina Herrera",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["4°A"],
    activo: true,
    iniciales: "SM",
  },
  {
    id: "d08",
    nombre: "Mtro. Rafael Torres Blanco",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["4°B"],
    activo: true,
    iniciales: "RT",
  },
  {
    id: "d09",
    nombre: "Miss Claudia Vargas Ortega",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["5°A"],
    activo: true,
    iniciales: "CV",
  },
  {
    id: "d10",
    nombre: "Miss Elena Morales Cruz",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["5°B"],
    activo: true,
    iniciales: "EM",
  },
  {
    id: "d11",
    nombre: "Mtro. Arturo Guzmán Paredes",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["6°A"],
    activo: true,
    iniciales: "AG",
  },
  {
    id: "d12",
    nombre: "Miss Verónica Espinoza Luna",
    rol: "Titular",
    materias: ["Todas"],
    grupos: ["6°B"],
    activo: true,
    iniciales: "VE",
  },
  // Hora-clase
  {
    id: "d13",
    nombre: "Miss Karen Delgado Ramos",
    rol: "Hora-clase",
    materias: ["Inglés"],
    grupos: ["1°A", "1°B", "2°A", "2°B"],
    activo: true,
    iniciales: "KD",
  },
  {
    id: "d14",
    nombre: "Mtro. Luis Ávila Medina",
    rol: "Hora-clase",
    materias: ["Inglés"],
    grupos: ["3°A", "3°B", "4°A", "4°B"],
    activo: true,
    iniciales: "LA",
  },
  {
    id: "d15",
    nombre: "Miss Gabriela Reyes Nava",
    rol: "Hora-clase",
    materias: ["Inglés"],
    grupos: ["5°A", "5°B", "6°A", "6°B"],
    activo: true,
    iniciales: "GR",
  },
  {
    id: "d16",
    nombre: "Mtro. César Ponce Alvarado",
    rol: "Hora-clase",
    materias: ["Computación"],
    grupos: ["1°A", "1°B", "2°A", "2°B", "3°A", "3°B"],
    activo: true,
    iniciales: "CP",
  },
  {
    id: "d17",
    nombre: "Miss Sofía Acosta Jiménez",
    rol: "Hora-clase",
    materias: ["Computación"],
    grupos: ["4°A", "4°B", "5°A", "5°B", "6°A", "6°B"],
    activo: true,
    iniciales: "SA",
  },
  {
    id: "d18",
    nombre: "Mtro. Iván Cervantes Robles",
    rol: "Hora-clase",
    materias: ["Educación Física"],
    grupos: ["1°A", "1°B", "2°A", "2°B", "3°A", "3°B"],
    activo: true,
    iniciales: "IC",
  },
  {
    id: "d19",
    nombre: "Miss Brenda Navarrete Paz",
    rol: "Hora-clase",
    materias: ["Educación Física"],
    grupos: ["4°A", "4°B", "5°A", "5°B", "6°A", "6°B"],
    activo: true,
    iniciales: "BN",
  },
  {
    id: "d20",
    nombre: "Miss Alma Quintero Serrano",
    rol: "Hora-clase",
    materias: ["Artes", "Música"],
    grupos: [
      "1°A",
      "1°B",
      "2°A",
      "2°B",
      "3°A",
      "3°B",
      "4°A",
      "4°B",
      "5°A",
      "5°B",
      "6°A",
      "6°B",
    ],
    activo: true,
    iniciales: "AQ",
  },
];

const PERFIL_EXTRA = {
  d01: {
    edad: 34,
    antiguedad: 7,
    email: "lmeza@colegiovictoria.com",
    telefono: "778 123 0101",
    grado: "Lic. en Educación Primaria",
  },
  d02: {
    edad: 29,
    antiguedad: 3,
    email: "csalinas@colegiovictoria.com",
    telefono: "778 123 0102",
    grado: "Lic. en Pedagogía",
  },
  d03: {
    edad: 41,
    antiguedad: 12,
    email: "promero@colegiovictoria.com",
    telefono: "778 123 0103",
    grado: "Mtra. en Educación Básica",
  },
  d04: {
    edad: 37,
    antiguedad: 9,
    email: "libanez@colegiovictoria.com",
    telefono: "778 123 0104",
    grado: "Lic. en Educación Primaria",
  },
  d05: {
    edad: 45,
    antiguedad: 16,
    email: "jpedraza@colegiovictoria.com",
    telefono: "778 123 0105",
    grado: "Mtro. en Ciencias de la Educación",
  },
  d06: {
    edad: 31,
    antiguedad: 4,
    email: "druiz@colegiovictoria.com",
    telefono: "778 123 0106",
    grado: "Lic. en Educación Primaria",
  },
  d07: {
    edad: 38,
    antiguedad: 10,
    email: "smolina@colegiovictoria.com",
    telefono: "778 123 0107",
    grado: "Lic. en Pedagogía",
  },
  d08: {
    edad: 43,
    antiguedad: 14,
    email: "rtorres@colegiovictoria.com",
    telefono: "778 123 0108",
    grado: "Mtro. en Administración Educativa",
  },
  d09: {
    edad: 36,
    antiguedad: 8,
    email: "cvargas@colegiovictoria.com",
    telefono: "778 123 0109",
    grado: "Lic. en Educación Primaria",
  },
  d10: {
    edad: 33,
    antiguedad: 5,
    email: "emorales@colegiovictoria.com",
    telefono: "778 123 0110",
    grado: "Lic. en Ciencias de la Educación",
  },
  d11: {
    edad: 48,
    antiguedad: 19,
    email: "aguzman@colegiovictoria.com",
    telefono: "778 123 0111",
    grado: "Mtro. en Educación",
  },
  d12: {
    edad: 39,
    antiguedad: 11,
    email: "vespinoza@colegiovictoria.com",
    telefono: "778 123 0112",
    grado: "Lic. en Educación Primaria",
  },
  d13: {
    edad: 27,
    antiguedad: 2,
    email: "kdelgado@colegiovictoria.com",
    telefono: "778 123 0113",
    grado: "Lic. en Lenguas Extranjeras",
  },
  d14: {
    edad: 35,
    antiguedad: 6,
    email: "lavila@colegiovictoria.com",
    telefono: "778 123 0114",
    grado: "Mtro. en Lingüística Aplicada",
  },
  d15: {
    edad: 30,
    antiguedad: 3,
    email: "greyes@colegiovictoria.com",
    telefono: "778 123 0115",
    grado: "Lic. en Idiomas",
  },
  d16: {
    edad: 32,
    antiguedad: 5,
    email: "cponce@colegiovictoria.com",
    telefono: "778 123 0116",
    grado: "Ing. en Sistemas Computacionales",
  },
  d17: {
    edad: 28,
    antiguedad: 2,
    email: "sacosta@colegiovictoria.com",
    telefono: "778 123 0117",
    grado: "Lic. en Informática Educativa",
  },
  d18: {
    edad: 40,
    antiguedad: 13,
    email: "icervantes@colegiovictoria.com",
    telefono: "778 123 0118",
    grado: "Lic. en Educación Física",
  },
  d19: {
    edad: 26,
    antiguedad: 1,
    email: "bnavarrete@colegiovictoria.com",
    telefono: "778 123 0119",
    grado: "Lic. en Educación Física",
  },
  d20: {
    edad: 44,
    antiguedad: 17,
    email: "aquintero@colegiovictoria.com",
    telefono: "778 123 0120",
    grado: "Lic. en Artes y Humanidades",
  },
};

const TABS = [
  { id: "perfil", label: "Perfil" },
  { id: "asistencia", label: "Asistencia" },
  { id: "planeaciones", label: "Planeaciones" },
  { id: "puntualidad", label: "Puntualidad" },
  { id: "observaciones", label: "Observaciones" },
  { id: "avance", label: "Avance de libro" },
  { id: "entrevistas", label: "Entrevistas" },
  { id: "incidenciasaula", label: "Incidencias" },
  { id: "actasadmin", label: "Actas Admin." },
];

// Semanas por bimestre (label, límite de entrega viernes)
const SEMANAS_BIM = {
  3: [
    { sem: "Sem 1", label: "19–23 ene", limite: "2026-01-17" },
    { sem: "Sem 2", label: "26–30 ene", limite: "2026-01-24" },
    { sem: "Sem 3", label: "2–6 feb", limite: "2026-01-31" },
    { sem: "Sem 4", label: "9–13 feb", limite: "2026-02-07" },
    { sem: "Sem 5", label: "16–20 feb", limite: "2026-02-14" },
    { sem: "Sem 6", label: "23–27 feb", limite: "2026-02-21" },
  ],
  4: [
    { sem: "Sem 1", label: "2–6 mar", limite: "2026-02-28" },
    { sem: "Sem 2", label: "9–13 mar", limite: "2026-03-07" },
    { sem: "Sem 3", label: "16–20 mar", limite: "2026-03-14" },
    { sem: "Sem 4", label: "23–27 mar", limite: "2026-03-21" },
    { sem: "Sem 5", label: "1–3 abr", limite: "2026-03-28" },
    { sem: "Sem 6", label: "13–17 abr", limite: "2026-04-11" },
    { sem: "Sem 7", label: "20–24 abr", limite: "2026-04-18" },
    { sem: "Sem 8", label: "27 abr–1 may", limite: "2026-04-25" },
  ],
  5: [
    { sem: "Sem 1", label: "4–8 may", limite: "2026-05-02" },
    { sem: "Sem 2", label: "11–15 may", limite: "2026-05-09" },
    { sem: "Sem 3", label: "18–22 may", limite: "2026-05-16" },
    { sem: "Sem 4", label: "25–29 may", limite: "2026-05-23" },
    { sem: "Sem 5", label: "1–5 jun", limite: "2026-05-30" },
  ],
};

// entrega: fecha real | "tarde:YYYY-MM-DD" | null (no entregó)
// Si no está en el objeto → entregó a tiempo (todos los demás = record limpio)
const PLANEACIONES_OVERRIDE = {
  d03: {
    "4-Sem 3": "tarde:2026-03-17",
    "4-Sem 7": null,
    "5-Sem 2": "tarde:2026-05-12",
  },
  d05: { "3-Sem 4": "tarde:2026-02-11" },
  d08: {
    "4-Sem 5": null,
    "4-Sem 6": null,
    "5-Sem 1": "tarde:2026-05-05",
    "5-Sem 2": null,
  },
  d13: {
    "4-Sem 3": null,
    "4-Sem 4": null,
    "4-Sem 5": null,
    "4-Sem 6": null,
    "4-Sem 7": null,
  },
  d16: { "3-Sem 2": "tarde:2026-01-28", "5-Sem 3": null },
  d19: { "5-Sem 4": null },
};

const buildPlaneaciones = (docenteId, bim) => {
  const semanas = SEMANAS_BIM[bim] || [];
  const overrides = PLANEACIONES_OVERRIDE[docenteId] || {};
  return semanas.map((s) => {
    const key = `${bim}-${s.sem}`;
    const ov = overrides[key];
    if (ov === null) return { ...s, entrega: null, estado: "no_entregada" };
    if (ov?.startsWith("tarde:"))
      return { ...s, entrega: ov.slice(6), estado: "tarde" };
    return { ...s, entrega: s.limite, estado: "a_tiempo" };
  });
};

const ESTADO_PLAN = {
  a_tiempo: { label: "A tiempo", color: "#15803D", bg: "#F0FDF4" },
  tarde: { label: "Con retraso", color: "#B45309", bg: "#FFFBEB" },
  no_entregada: { label: "No entregó", color: "#B91C1C", bg: "#FEF2F2" },
};

const RETARDOS_DATA = {
  d02: [
    {
      fecha: "2026-02-03",
      llegada: "07:18",
      minutos: 18,
      obs: "Tráfico en la entrada",
    },
    {
      fecha: "2026-03-10",
      llegada: "07:12",
      minutos: 12,
      obs: "Sin justificación",
    },
  ],
  d03: [
    {
      fecha: "2026-01-20",
      llegada: "07:22",
      minutos: 22,
      obs: "Problemas con transporte",
    },
    {
      fecha: "2026-02-17",
      llegada: "07:09",
      minutos: 9,
      obs: "Sin justificación",
    },
    {
      fecha: "2026-03-31",
      llegada: "07:35",
      minutos: 35,
      obs: "Accidente vial (comprobó)",
    },
    {
      fecha: "2026-04-28",
      llegada: "07:15",
      minutos: 15,
      obs: "Sin justificación",
    },
  ],
  d06: [
    {
      fecha: "2026-03-05",
      llegada: "07:08",
      minutos: 8,
      obs: "Sin justificación",
    },
  ],
  d08: [
    {
      fecha: "2026-01-27",
      llegada: "07:40",
      minutos: 40,
      obs: "Cita médica (llegó tarde del IMSS)",
    },
    {
      fecha: "2026-02-24",
      llegada: "07:20",
      minutos: 20,
      obs: "Sin justificación",
    },
    {
      fecha: "2026-03-17",
      llegada: "07:15",
      minutos: 15,
      obs: "Sin justificación",
    },
    { fecha: "2026-04-21", llegada: "07:28", minutos: 28, obs: "Tráfico" },
    {
      fecha: "2026-05-12",
      llegada: "07:18",
      minutos: 18,
      obs: "Sin justificación",
    },
  ],
  d10: [
    {
      fecha: "2026-04-08",
      llegada: "07:11",
      minutos: 11,
      obs: "Sin justificación",
    },
  ],
  d13: [
    {
      fecha: "2026-02-10",
      llegada: "07:14",
      minutos: 14,
      obs: "Sin justificación",
    },
    {
      fecha: "2026-05-19",
      llegada: "07:10",
      minutos: 10,
      obs: "Sin justificación",
    },
  ],
  d18: [
    {
      fecha: "2026-01-13",
      llegada: "07:07",
      minutos: 7,
      obs: "Sin justificación",
    },
    {
      fecha: "2026-03-24",
      llegada: "07:25",
      minutos: 25,
      obs: "Desvío por obras en calle principal",
    },
    {
      fecha: "2026-05-05",
      llegada: "07:16",
      minutos: 16,
      obs: "Sin justificación",
    },
  ],
};

const OBSERVACIONES_DATA = {
  d01: [
    {
      id: "o01",
      fecha: "2026-02-10",
      materia: "Matemáticas",
      checklist: {
        usaPlaneacion: "si",
        dinamico: "si",
        recursos: "parcial",
        explicaClaro: "si",
        manejoGrupo: "si",
        puntualidad: "si",
      },
      notas:
        "Buen manejo del grupo. Se sugiere incorporar más material visual para explicación de fracciones.",
    },
    {
      id: "o02",
      fecha: "2026-04-03",
      materia: "Español",
      checklist: {
        usaPlaneacion: "si",
        dinamico: "parcial",
        recursos: "si",
        explicaClaro: "si",
        manejoGrupo: "si",
        puntualidad: "si",
      },
      notas:
        "La dinámica de lectura en voz alta estuvo bien. Se recomienda variar actividades para mantener atención.",
    },
  ],
  d03: [
    {
      id: "o03",
      fecha: "2026-03-05",
      materia: "Ciencias Naturales",
      checklist: {
        usaPlaneacion: "si",
        dinamico: "si",
        recursos: "si",
        explicaClaro: "si",
        manejoGrupo: "parcial",
        puntualidad: "no",
      },
      notas:
        "Clase muy dinámica con experimento de germinación. Llegó 5 min tarde al aula.",
    },
  ],
  d07: [
    {
      id: "o04",
      fecha: "2026-02-25",
      materia: "Historia",
      checklist: {
        usaPlaneacion: "parcial",
        dinamico: "si",
        recursos: "no",
        explicaClaro: "si",
        manejoGrupo: "si",
        puntualidad: "si",
      },
      notas:
        "No presentó planeación impresa. La clase fue fluida pero sin apoyo de recursos digitales.",
    },
    {
      id: "o05",
      fecha: "2026-04-14",
      materia: "Matemáticas",
      checklist: {
        usaPlaneacion: "si",
        dinamico: "si",
        recursos: "si",
        explicaClaro: "si",
        manejoGrupo: "si",
        puntualidad: "si",
      },
      notas:
        "Excelente clase. Uso de proyector con ejercicios interactivos. Muy buen manejo del grupo.",
    },
  ],
  d12: [
    {
      id: "o06",
      fecha: "2026-03-18",
      materia: "Educación Física",
      checklist: {
        usaPlaneacion: "no",
        dinamico: "si",
        recursos: "parcial",
        explicaClaro: "si",
        manejoGrupo: "si",
        puntualidad: "si",
      },
      notas:
        "Actividad bien estructurada en cancha. No presentó planeación por escrito.",
    },
  ],
};

const CHECKLIST_LABELS = {
  usaPlaneacion: "Usa planeación",
  dinamico: "Dinámico / despierta el interés",
  recursos: "Usa diferentes recursos",
  explicaClaro: "Explica el tema con claridad",
  manejoGrupo: "Manejo del grupo",
  puntualidad: "Puntualidad al iniciar",
};

const MATERIAS_TITULAR = [
  { id: "esp", nombre: "Español", paginas: 240 },
  { id: "mat", nombre: "Matemáticas", paginas: 220 },
  { id: "cien", nombre: "Ciencias Naturales", paginas: 180 },
  { id: "hist", nombre: "Historia", paginas: 160 },
  { id: "geo", nombre: "Geografía", paginas: 150 },
  { id: "fcye", nombre: "Formación Cívica y Ética", paginas: 130 },
];

const AVANCE_DATA = {
  // Titulares
  d01: [
    { materiaId: "esp", actual: 210, actualizado: "2026-05-28" },
    { materiaId: "mat", actual: 185, actualizado: "2026-05-28" },
    { materiaId: "cien", actual: 162, actualizado: "2026-05-20" },
    { materiaId: "hist", actual: 140, actualizado: "2026-05-20" },
    { materiaId: "geo", actual: 120, actualizado: "2026-05-15" },
    { materiaId: "fcye", actual: 115, actualizado: "2026-05-15" },
  ],
  d02: [
    { materiaId: "esp", actual: 180, actualizado: "2026-05-27" },
    { materiaId: "mat", actual: 160, actualizado: "2026-05-27" },
    { materiaId: "cien", actual: 130, actualizado: "2026-05-18" },
    { materiaId: "hist", actual: 100, actualizado: "2026-05-18" },
    { materiaId: "geo", actual: 90, actualizado: "2026-05-10" },
    { materiaId: "fcye", actual: 75, actualizado: "2026-05-10" },
  ],
  d03: [
    { materiaId: "esp", actual: 225, actualizado: "2026-05-29" },
    { materiaId: "mat", actual: 200, actualizado: "2026-05-29" },
    { materiaId: "cien", actual: 170, actualizado: "2026-05-22" },
    { materiaId: "hist", actual: 148, actualizado: "2026-05-22" },
    { materiaId: "geo", actual: 135, actualizado: "2026-05-16" },
    { materiaId: "fcye", actual: 120, actualizado: "2026-05-16" },
  ],
  d05: [
    { materiaId: "esp", actual: 190, actualizado: "2026-05-26" },
    { materiaId: "mat", actual: 170, actualizado: "2026-05-26" },
    { materiaId: "cien", actual: 145, actualizado: "2026-05-19" },
    { materiaId: "hist", actual: 110, actualizado: "2026-05-19" },
    { materiaId: "geo", actual: 80, actualizado: "2026-05-08" },
    { materiaId: "fcye", actual: 65, actualizado: "2026-05-08" },
  ],
  d07: [
    { materiaId: "esp", actual: 215, actualizado: "2026-05-28" },
    { materiaId: "mat", actual: 195, actualizado: "2026-05-28" },
    { materiaId: "cien", actual: 155, actualizado: "2026-05-21" },
    { materiaId: "hist", actual: 130, actualizado: "2026-05-21" },
    { materiaId: "geo", actual: 110, actualizado: "2026-05-14" },
    { materiaId: "fcye", actual: 100, actualizado: "2026-05-14" },
  ],
  // Hora-clase
  d12: [
    {
      materiaId: "ef",
      nombre: "Educación Física",
      actual: 28,
      paginas: 40,
      actualizado: "2026-05-25",
    },
  ],
  d13: [
    {
      materiaId: "ing",
      nombre: "Inglés",
      actual: 95,
      paginas: 130,
      actualizado: "2026-05-27",
    },
  ],
  d14: [
    {
      materiaId: "ing",
      nombre: "Inglés",
      actual: 78,
      paginas: 130,
      actualizado: "2026-05-22",
    },
  ],
  d15: [
    {
      materiaId: "ing",
      nombre: "Inglés",
      actual: 68,
      paginas: 130,
      actualizado: "2026-05-21",
    },
  ],
  d16: [
    {
      materiaId: "comp",
      nombre: "Computación",
      actual: 22,
      paginas: 30,
      actualizado: "2026-05-19",
    },
  ],
  d17: [
    {
      materiaId: "comp",
      nombre: "Computación",
      actual: 16,
      paginas: 30,
      actualizado: "2026-05-16",
    },
  ],
  d18: [
    {
      materiaId: "ef",
      nombre: "Educación Física",
      actual: 25,
      paginas: 40,
      actualizado: "2026-05-23",
    },
  ],
  d19: [
    {
      materiaId: "ef",
      nombre: "Educación Física",
      actual: 20,
      paginas: 40,
      actualizado: "2026-05-20",
    },
  ],
  d20: [
    {
      materiaId: "art",
      nombre: "Artes Plásticas",
      actual: 18,
      paginas: 24,
      actualizado: "2026-05-16",
    },
    {
      materiaId: "musi",
      nombre: "Música",
      actual: 26,
      paginas: 36,
      actualizado: "2026-05-16",
    },
  ],
};

const ENTREVISTAS_DATA = {
  d01: [
    {
      id: "e01",
      fecha: "2026-02-14",
      alumno: "Sofía Ramírez Torres",
      grupo: "1°A",
      motivo: "Bajo rendimiento en matemáticas",
      acuerdos:
        "Papás se comprometen a repasar tablas de multiplicar en casa 15 min diarios. Docente enviará ejercicios de práctica.",
      seguimiento: "completado",
    },
    {
      id: "e02",
      fecha: "2026-04-08",
      alumno: "Emiliano Castro Vega",
      grupo: "1°A",
      motivo: "Conducta disruptiva en clase",
      acuerdos:
        "Se acuerda revisión con psicóloga escolar. Mamá se compromete a seguimiento en casa.",
      seguimiento: "pendiente",
    },
  ],
  d03: [
    {
      id: "e03",
      fecha: "2026-03-03",
      alumno: "Valeria Fuentes Mora",
      grupo: "2°A",
      motivo: "Inasistencias frecuentes",
      acuerdos:
        "Familia notifica que la alumna tuvo problemas de salud. Se acuerda plan de recuperación de contenidos.",
      seguimiento: "completado",
    },
  ],
  d05: [
    {
      id: "e04",
      fecha: "2026-02-20",
      alumno: "Diego Hernández Soto",
      grupo: "3°A",
      motivo: "Conflicto con compañero de grupo",
      acuerdos:
        "Ambas familias informadas. Se acuerda mediación con orientador y seguimiento semanal.",
      seguimiento: "completado",
    },
    {
      id: "e05",
      fecha: "2026-04-22",
      alumno: "Rodrigo Peña Lara",
      grupo: "3°A",
      motivo: "Avance académico por encima del grupo",
      acuerdos:
        "Se propone material de enriquecimiento. Papás interesados en participación en concurso de matemáticas.",
      seguimiento: "pendiente",
    },
  ],
  d08: [
    {
      id: "e06",
      fecha: "2026-03-17",
      alumno: "Isabela Gutiérrez Reyes",
      grupo: "4°B",
      motivo: "Dificultades en comprensión lectora",
      acuerdos:
        "Docente adaptará materiales. Familia se compromete a lectura diaria en casa de 20 min.",
      seguimiento: "pendiente",
    },
  ],
  d11: [
    {
      id: "e07",
      fecha: "2026-02-10",
      alumno: "Mateo Salinas Cruz",
      grupo: "6°A",
      motivo: "Orientación para ingreso a secundaria",
      acuerdos:
        "Se entrega información sobre proceso de admisión. Docente recomienda refuerzo en español.",
      seguimiento: "completado",
    },
    {
      id: "e08",
      fecha: "2026-04-29",
      alumno: "Andrea Moreno Ibáñez",
      grupo: "6°A",
      motivo: "Nerviosismo ante exámenes finales",
      acuerdos:
        "Se recomienda canalización con psicóloga. Mamá acepta apoyo. Seguimiento en 2 semanas.",
      seguimiento: "pendiente",
    },
  ],
};

const TIPO_INCIDENCIA_AULA = {
  verbal: { label: "Conflicto verbal", color: "#2563EB", bg: "#EFF6FF" },
  objeto: { label: "Problema con objetos", color: "#D97706", bg: "#FFFBEB" },
  fisico: { label: "Contacto físico", color: "#DC2626", bg: "#FEF2F2" },
  accidente: { label: "Accidente / caída", color: "#7C3AED", bg: "#F5F3FF" },
  otro: { label: "Otro", color: "#6B7280", bg: "#F9FAFB" },
};

const INCIDENCIAS_AULA_DATA = {
  d01: [
    {
      id: "ia01",
      fecha: "2026-02-18",
      alumno: "Emiliano Castro Vega",
      grupo: "1°A",
      tipo: "verbal",
      descripcion:
        "Dos alumnos se insultaron durante la actividad de lectura en parejas. Se separaron y hablaron con cada uno por separado.",
      estado: "resuelta",
      resolucion:
        "Se habló con ambos alumnos. Pidieron disculpas frente al grupo. Sin reincidencia.",
    },
    {
      id: "ia02",
      fecha: "2026-04-07",
      alumno: "Sofía Ramírez Torres",
      grupo: "1°A",
      tipo: "objeto",
      descripcion:
        "Alumna tomó el borrador de su compañera sin permiso y lo escondió en su mochila.",
      estado: "resuelta",
      resolucion:
        "Se devolvió el objeto. Se habló con la alumna sobre el respeto a las pertenencias ajenas.",
    },
    {
      id: "ia03",
      fecha: "2026-05-13",
      alumno: "Marcos Leal Fuentes",
      grupo: "1°A",
      tipo: "fisico",
      descripcion:
        "Alumno le pegó en el brazo a su compañero de banca durante el recreo dentro del salón.",
      estado: "activa",
      resolucion: null,
    },
  ],
  d03: [
    {
      id: "ia04",
      fecha: "2026-03-10",
      alumno: "Valeria Fuentes Mora",
      grupo: "2°A",
      tipo: "accidente",
      descripcion:
        "Alumna se cayó al correr en el pasillo camino al baño. Golpe leve en rodilla derecha. Se aplicó primeros auxilios.",
      estado: "resuelta",
      resolucion:
        "Atendida en enfermería. Papás notificados por WhatsApp. Sin complicaciones.",
    },
    {
      id: "ia05",
      fecha: "2026-05-06",
      alumno: "Tomás Guerrero Sosa",
      grupo: "2°A",
      tipo: "objeto",
      descripcion:
        "Escondió la lonchera de un compañero debajo del escritorio. El compañero lloró pensando que la perdió.",
      estado: "activa",
      resolucion: null,
    },
  ],
  d05: [
    {
      id: "ia06",
      fecha: "2026-02-24",
      alumno: "Diego Hernández Soto",
      grupo: "3°A",
      tipo: "verbal",
      descripcion:
        "Confrontación verbal entre dos alumnos por quién era el líder del equipo en trabajo en grupo.",
      estado: "resuelta",
      resolucion:
        "Mediación en el momento. Se acordó rotación de roles en equipos.",
    },
    {
      id: "ia07",
      fecha: "2026-04-28",
      alumno: "Rodrigo Peña Lara",
      grupo: "3°A",
      tipo: "fisico",
      descripcion:
        "Empujón en la fila de salida al recreo. Alumno dice que fue sin querer, compañero afirma que fue intencional.",
      estado: "activa",
      resolucion: null,
    },
  ],
  d07: [
    {
      id: "ia08",
      fecha: "2026-03-19",
      alumno: "Alondra Vega Paredes",
      grupo: "4°A",
      tipo: "accidente",
      descripcion:
        "Alumna chocó contra la esquina del escritorio al levantarse rápido. Golpe en cadera. No requirió enfermería.",
      estado: "resuelta",
      resolucion:
        "Se revisó el espacio del aula, se reacomodaron escritorios para evitar espacios reducidos.",
    },
  ],
  d10: [
    {
      id: "ia09",
      fecha: "2026-04-15",
      alumno: "Camila Torres Ríos",
      grupo: "5°B",
      tipo: "objeto",
      descripcion:
        "Alumna reportó que le desaparecieron $20 pesos de su mochila durante la clase de computación.",
      estado: "activa",
      resolucion: null,
    },
    {
      id: "ia10",
      fecha: "2026-05-05",
      alumno: "Iván Morales Díaz",
      grupo: "5°B",
      tipo: "otro",
      descripcion:
        "Alumno se negó a participar en actividad física del día y permaneció sentado sin justificación. Actitud pasivo-agresiva hacia la indicación.",
      estado: "activa",
      resolucion: null,
    },
  ],
  d11: [
    {
      id: "ia11",
      fecha: "2026-02-12",
      alumno: "Mateo Salinas Cruz",
      grupo: "6°A",
      tipo: "verbal",
      descripcion:
        "Discusión subida de tono entre dos alumnos por una tarea que uno copió al otro.",
      estado: "resuelta",
      resolucion:
        "Se anuló la tarea de quien copió. Se informó a ambas familias. No hubo más incidentes.",
    },
  ],
  // Hora-clase
  d14: [
    {
      id: "ia12",
      fecha: "2026-03-04",
      alumno: "Andrés Palomino Rivas",
      grupo: "3°B",
      tipo: "verbal",
      descripcion:
        "Durante actividad oral en inglés el alumno se burló de la pronunciación de su compañera, provocando que ella se negara a participar el resto de la clase.",
      estado: "resuelta",
      resolucion:
        "Se habló con el alumno al término de la clase. Ofreció disculpa a su compañera. Se reforzó respeto durante actividades orales.",
    },
    {
      id: "ia13",
      fecha: "2026-05-07",
      alumno: "Fernanda Cruz Medina",
      grupo: "4°A",
      tipo: "otro",
      descripcion:
        "Alumna usó su celular para traducir el examen parcial en lugar de responderlo con sus conocimientos. Se le retiró el dispositivo durante la evaluación.",
      estado: "activa",
      resolucion: null,
    },
  ],
  d18: [
    {
      id: "ia14",
      fecha: "2026-02-19",
      alumno: "Sebastián Lara Campos",
      grupo: "2°A",
      tipo: "accidente",
      descripcion:
        "Alumno resbaló en la cancha mojada por lluvia de la mañana durante el calentamiento. Caída de rodillas. Leve raspón en rodilla izquierda.",
      estado: "resuelta",
      resolucion:
        "Se atendió en enfermería. Papás notificados. Se suspendió actividad en cancha y se continuó en patio techado.",
    },
    {
      id: "ia15",
      fecha: "2026-04-10",
      alumno: "Emilio Vargas Ponce",
      grupo: "3°A",
      tipo: "fisico",
      descripcion:
        "Durante partido de futbol, alumno le dio un codazo a un compañero al disputar el balón. El compañero lloró del dolor. Situación se ve intencional.",
      estado: "activa",
      resolucion: null,
    },
    {
      id: "ia16",
      fecha: "2026-05-14",
      alumno: "Camila Rojo Estrada",
      grupo: "1°B",
      tipo: "accidente",
      descripcion:
        "Alumna chocó de frente con compañera al correr en actividad de relevos. Golpe leve en la frente de ambas. No perdieron el conocimiento.",
      estado: "resuelta",
      resolucion:
        "Revisión inmediata. Aplicación de hielo. Ambas familias notificadas ese mismo día. Sin complicaciones posteriores.",
    },
  ],
  d16: [
    {
      id: "ia17",
      fecha: "2026-03-25",
      alumno: "Óscar Téllez Mora",
      grupo: "2°B",
      tipo: "objeto",
      descripcion:
        "Alumno cambió el fondo de pantalla de la computadora de su compañero por una imagen inapropiada mientras él no estaba sentado.",
      estado: "resuelta",
      resolucion:
        "Se restableció la configuración. Se habló con el alumno sobre el uso responsable del equipo. Sin reincidencia.",
    },
    {
      id: "ia18",
      fecha: "2026-05-06",
      alumno: "Daniela Ríos Fuentes",
      grupo: "3°A",
      tipo: "otro",
      descripcion:
        "Alumna tomó fotos a las pantallas de sus compañeros con su celular sin permiso durante la práctica de mecanografía.",
      estado: "activa",
      resolucion: null,
    },
  ],
  d20: [
    {
      id: "ia19",
      fecha: "2026-04-22",
      alumno: "Bruno Salazar Peña",
      grupo: "5°A",
      tipo: "objeto",
      descripcion:
        "Alumno usó las pinturas de otro compañero sin pedirlas prestadas y las regresó con las tapas mal puestas, arruinando varios colores.",
      estado: "resuelta",
      resolucion:
        "Se acordó que el alumno reponga los colores dañados. Papás informados. El compañero aceptó la resolución.",
    },
    {
      id: "ia20",
      fecha: "2026-05-20",
      alumno: "Valeria Mendoza Tapia",
      grupo: "6°B",
      tipo: "verbal",
      descripcion:
        "Durante presentación de proyecto musical, grupo de alumnas hizo comentarios negativos en voz baja sobre la actuación de una compañera, quien se dio cuenta y lloró.",
      estado: "activa",
      resolucion: null,
    },
  ],
};

const TIPO_ACTA = {
  tardanza: { label: "Llegada tarde", color: "#D97706", bg: "#FFFBEB" },
  falta: { label: "Falta injustificada", color: "#DC2626", bg: "#FEF2F2" },
  planeacion: {
    label: "No entrega de planeación",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  respeto: { label: "Falta de respeto", color: "#B91C1C", bg: "#FFF1F2" },
  desempeno: { label: "Desempeño inadecuado", color: "#0369A1", bg: "#F0F9FF" },
  otro: { label: "Otro", color: "#6B7280", bg: "#F9FAFB" },
};

const ESTADO_ACTA = {
  pendiente_firma: {
    label: "Pendiente de firma",
    color: "#CA8A04",
    bg: "#FEF9C3",
  },
  firmada: { label: "Firmada", color: "#16A34A", bg: "#DCFCE7" },
  impugnada: { label: "Impugnada", color: "#DC2626", bg: "#FEE2E2" },
};

const ACTAS_DATA = {
  d03: [
    {
      id: "aa01",
      folio: "AA-2026-003",
      fecha: "2026-02-06",
      tipo: "tardanza",
      descripcion:
        "La docente se presentó al aula a las 07:22 hrs, 22 minutos después del inicio del turno escolar. Los alumnos permanecieron sin supervisión en el pasillo.",
      consecuencia:
        "Amonestación verbal. Se le recuerda que tres tardanzas consecutivas implican amonestación escrita.",
      estado: "firmada",
    },
    {
      id: "aa02",
      folio: "AA-2026-008",
      fecha: "2026-04-14",
      tipo: "planeacion",
      descripcion:
        "La docente no entregó la planeación correspondiente al Bimestre 3, semanas 2 y 3, en las fechas establecidas por la coordinación académica.",
      consecuencia:
        "Amonestación escrita. Deberá entregar planeaciones con 48 hrs de anticipación durante el resto del ciclo.",
      estado: "pendiente_firma",
    },
  ],
  d05: [
    {
      id: "aa03",
      folio: "AA-2026-005",
      fecha: "2026-03-03",
      tipo: "desempeno",
      descripcion:
        "Durante visita de observación al aula, se detectó que el docente no siguió la planeación entregada y dedicó la clase a actividades no relacionadas con el programa (videos de YouTube sin contexto educativo).",
      consecuencia:
        "Amonestación escrita. Se cita a reunión con el Director de Primaria para revisión de práctica docente.",
      estado: "firmada",
    },
  ],
  d08: [
    {
      id: "aa04",
      folio: "AA-2026-007",
      fecha: "2026-03-20",
      tipo: "respeto",
      descripcion:
        "El docente levantó la voz de forma agresiva a una madre de familia en el pasillo, frente a otros padres, durante la salida escolar. La madre presentó queja formal ante dirección.",
      consecuencia:
        "Amonestación escrita. Se requiere disculpa formal con la madre y capacitación en atención a padres de familia.",
      estado: "impugnada",
    },
  ],
  d13: [
    {
      id: "aa05",
      folio: "AA-2026-002",
      fecha: "2026-01-28",
      tipo: "falta",
      descripcion:
        "La docente no se presentó a laborar el día 27 de enero sin previo aviso ni justificante médico. Los grupos 1°A y 1°B quedaron sin clase de inglés.",
      consecuencia:
        "Descuento de un día de nómina conforme al reglamento interno. Se requiere justificante médico para abonos futuros.",
      estado: "firmada",
    },
  ],
  d18: [
    {
      id: "aa06",
      folio: "AA-2026-006",
      fecha: "2026-03-11",
      tipo: "tardanza",
      descripcion:
        "El docente se presentó 35 minutos tarde al inicio de la jornada escolar sin notificación previa. Es la segunda tardanza registrada en el ciclo.",
      consecuencia:
        "Amonestación escrita (segunda instancia). Una tardanza adicional derivará en descuento de nómina.",
      estado: "pendiente_firma",
    },
    {
      id: "aa07",
      folio: "AA-2026-011",
      fecha: "2026-05-05",
      tipo: "planeacion",
      descripcion:
        "No presentó planeación de Educación Física para el Bimestre 4. Al solicitársela, argumentó que la actividad física no requiere planeación escrita.",
      consecuencia:
        "Amonestación verbal. Se le informa que todos los docentes, sin excepción, deben entregar planeación bimestral.",
      estado: "pendiente_firma",
    },
  ],
};

const TIPO_FALTA = {
  enfermedad: { label: "Enfermedad", color: "#B45309", bg: "#FFFBEB" },
  justificada: { label: "Justificada", color: "#1D4ED8", bg: "#EFF6FF" },
  injustificada: { label: "Injustificada", color: "#B91C1C", bg: "#FEF2F2" },
};

const ASISTENCIA_DATA = {
  d01: [
    {
      fecha: "2026-02-10",
      tipo: "enfermedad",
      motivo: "Gripa con temperatura",
    },
    {
      fecha: "2026-03-18",
      tipo: "justificada",
      motivo: "Cita médica IMSS (carta presentada)",
    },
  ],
  d03: [
    { fecha: "2026-01-22", tipo: "enfermedad", motivo: "Gastroenteritis" },
    { fecha: "2026-02-05", tipo: "enfermedad", motivo: "Gripa" },
    { fecha: "2026-04-14", tipo: "injustificada", motivo: "Sin aviso" },
  ],
  d05: [
    {
      fecha: "2026-03-03",
      tipo: "justificada",
      motivo: "Fallecimiento familiar (3 días reglamentarios)",
    },
    {
      fecha: "2026-03-04",
      tipo: "justificada",
      motivo: "Fallecimiento familiar (3 días reglamentarios)",
    },
    {
      fecha: "2026-03-05",
      tipo: "justificada",
      motivo: "Fallecimiento familiar (3 días reglamentarios)",
    },
  ],
  d08: [
    {
      fecha: "2026-02-19",
      tipo: "injustificada",
      motivo: "No se presentó, no notificó",
    },
    {
      fecha: "2026-04-07",
      tipo: "enfermedad",
      motivo: "Consulta por dolor lumbar",
    },
    {
      fecha: "2026-04-08",
      tipo: "enfermedad",
      motivo: "Reposo médico (continúa)",
    },
    {
      fecha: "2026-05-02",
      tipo: "injustificada",
      motivo: "Sin justificación entregada",
    },
  ],
  d11: [
    { fecha: "2026-01-15", tipo: "justificada", motivo: "Comisión sindical" },
  ],
  d13: [
    {
      fecha: "2026-03-25",
      tipo: "enfermedad",
      motivo: "COVID-19 (prueba positiva)",
    },
    {
      fecha: "2026-03-26",
      tipo: "enfermedad",
      motivo: "COVID-19 (aislamiento)",
    },
    {
      fecha: "2026-03-27",
      tipo: "enfermedad",
      motivo: "COVID-19 (aislamiento)",
    },
    {
      fecha: "2026-03-28",
      tipo: "enfermedad",
      motivo: "COVID-19 (aislamiento)",
    },
    {
      fecha: "2026-03-29",
      tipo: "enfermedad",
      motivo: "COVID-19 (aislamiento)",
    },
  ],
  d16: [
    {
      fecha: "2026-02-27",
      tipo: "justificada",
      motivo: "Congreso de tecnología educativa",
    },
  ],
  d19: [
    { fecha: "2026-04-22", tipo: "injustificada", motivo: "Sin aviso previo" },
  ],
};

const rolColor = {
  Titular: { color: "#1D4ED8", bg: "#EFF6FF" },
  "Hora-clase": { color: "#6D28D9", bg: "#F5F3FF" },
};

  const FILTROS = [
    { val: "todos", label: "Todos" },
    { val: "titular", label: "Titulares" },
    { val: "horaclase", label: "Hora-clase" },
  ];

  return {
    DOCENTES,
    PERFIL_EXTRA,
    TABS,
    FILTROS,
    SEMANAS_BIM,
    PLANEACIONES_OVERRIDE,
    buildPlaneaciones,
    ESTADO_PLAN,
    RETARDOS_DATA,
    OBSERVACIONES_DATA,
    CHECKLIST_LABELS,
    MATERIAS_TITULAR,
    AVANCE_DATA,
    ENTREVISTAS_DATA,
    TIPO_INCIDENCIA_AULA,
    INCIDENCIAS_AULA_DATA,
    TIPO_ACTA,
    ESTADO_ACTA,
    ACTAS_DATA,
    TIPO_FALTA,
    ASISTENCIA_DATA,
    rolColor,
  };
})();
