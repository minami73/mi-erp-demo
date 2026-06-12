/* ─── Horarios constants & data ──────────────────────────────────────── */

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
const DOWS_SHORT = ["Lun", "Mar", "Mié", "Jue", "Vie"];
const DAY_DATES = ["25 may", "26 may", "27 may", "28 may", "29 may"];

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/* ─── Academic schedule ─────────────────────────────────────────────── */
const ACAD_START = 7;
const ACAD_END = 16;
const ACAD_HR_PX = 84;
const ACAD_TOP = 24;
const ACAD_TOTAL = ACAD_TOP + (ACAD_END - ACAD_START) * ACAD_HR_PX;
const acadY = (hhmm) =>
  ACAD_TOP + ((toMin(hhmm) - ACAD_START * 60) / 60) * ACAD_HR_PX;
const acadH = (s, e) => ((toMin(e) - toMin(s)) / 60) * ACAD_HR_PX;

const ACAD_CATS = {
  secundaria: {
    id: "secundaria",
    label: "Secundaria",
    sub: "Programación · Tecnología",
    color: "var(--sec-secundaria)",
    ink: "var(--ink)",
    bg: "var(--sec-secundaria-soft)",
  },
  primaria: {
    id: "primaria",
    label: "Primaria",
    sub: "Tecnología",
    color: "var(--sec-primaria)",
    ink: "var(--ink)",
    bg: "var(--sec-primaria-soft)",
  },
  robotica: {
    id: "robotica",
    label: "Robótica",
    sub: "Taller extracurricular",
    color: "var(--sec-primaria)",
    ink: "var(--ink)",
    bg: "var(--sec-primaria-soft)",
  },
  matematicas: {
    id: "matematicas",
    label: "Matemáticas",
    sub: "Álgebra · Geometría",
    color: "var(--sec-secundaria)",
    ink: "var(--ink)",
    bg: "var(--sec-secundaria-soft)",
  },
  fisica: {
    id: "fisica",
    label: "Educación Física",
    sub: "Deportes · Activación",
    color: "var(--sec-bachillerato)",
    ink: "var(--ink)",
    bg: "var(--sec-bachillerato-soft)",
  },
};

const BREAKS = [
  { start: "08:50", end: "09:10", label: "Receso Secundaria" },
  { start: "10:15", end: "10:45", label: "Receso Primaria Baja" },
  { start: "11:00", end: "11:30", label: "Receso Primaria Alta" },
  { start: "11:40", end: "12:00", label: "Receso Secundaria" },
];

const TEACHERS = [
  {
    id: "jared",
    name: "Ing. Jared Camacho",
    role: "Tecnología",
    initials: "JC",
    count: 22,
  },
  {
    id: "erika",
    name: "Miss Erika Castro",
    role: "Matemáticas",
    initials: "EC",
    count: 22,
  },
  {
    id: "eduardo",
    name: "Ing. Eduardo Torbellin",
    role: "Matemáticas",
    initials: "ET",
    count: 19,
  },
  {
    id: "lila",
    name: "Miss Lila Meza",
    role: "Titular 5B",
    initials: "LM",
    count: 22,
  },
  {
    id: "fernando",
    name: "Prof. Fernando Paulino",
    role: "Educación Física",
    initials: "FP",
    count: 20,
  },
];

let __cid = 0;
const cls = (day, start, end, cat, title, room, teacherId) => ({
  id: ++__cid,
  day,
  start,
  end,
  cat,
  title,
  room,
  teacherId,
});
const CLASSES = [
  /* ── Ing. Jared Camacho (Tecnología) ── */
  cls(0, "07:00", "07:50", "secundaria", "Sec 3A · Tecnología", "Lab. Cómputo 2", "jared"),
  cls(0, "08:00", "08:50", "secundaria", "Sec 3B · Tecnología", "Lab. Cómputo 2", "jared"),
  cls(0, "09:10", "10:00", "secundaria", "Sec 1A · Tecnología", "Lab. Cómputo 1", "jared"),
  cls(0, "10:45", "11:30", "robotica", "Robótica 5A", "Taller Robótica", "jared"),
  cls(0, "11:30", "12:15", "primaria", "Primaria 6A · Tecnología", "Aula 6A", "jared"),
  cls(1, "07:00", "07:50", "secundaria", "Sec 2A · Tecnología", "Lab. Cómputo 1", "jared"),
  cls(1, "08:00", "08:50", "secundaria", "Sec 2B · Programación", "Lab. Cómputo 1", "jared"),
  cls(1, "09:10", "10:00", "secundaria", "Sec 1B · Programación", "Lab. Cómputo 1", "jared"),
  cls(1, "10:45", "11:30", "robotica", "Robótica 4A", "Taller Robótica", "jared"),
  cls(2, "07:10", "08:00", "secundaria", "Sec 3A · Tecnología", "Lab. Cómputo 2", "jared"),
  cls(2, "08:00", "08:50", "secundaria", "Sec 2B · Programación", "Lab. Cómputo 1", "jared"),
  cls(2, "09:10", "10:00", "robotica", "Robótica 5B", "Taller Robótica", "jared"),
  cls(2, "10:00", "10:50", "robotica", "Robótica 6A", "Taller Robótica", "jared"),
  cls(2, "11:30", "12:15", "primaria", "Primaria 5A · Tecnología", "Aula 5A", "jared"),
  cls(3, "07:10", "08:00", "secundaria", "Sec 2A · Programación", "Lab. Cómputo 1", "jared"),
  cls(3, "08:00", "08:50", "secundaria", "Sec 3B · Programación", "Lab. Cómputo 2", "jared"),
  cls(3, "09:10", "10:00", "secundaria", "Sec 1A · Programación", "Lab. Cómputo 1", "jared"),
  cls(3, "10:15", "11:00", "primaria", "Primaria 5B · Tecnología", "Aula 5B", "jared"),
  cls(4, "07:00", "07:50", "secundaria", "Sec 1B · Tecnología", "Lab. Cómputo 1", "jared"),
  cls(4, "08:00", "08:50", "secundaria", "Sec 2B · Tecnología", "Lab. Cómputo 1", "jared"),
  cls(4, "10:00", "10:50", "robotica", "Robótica 3B", "Taller Robótica", "jared"),
  cls(4, "10:50", "11:40", "robotica", "Robótica 4B", "Taller Robótica", "jared"),

  /* ── Miss Erika Castro (Matemáticas) ── */
  cls(0, "07:00", "07:50", "matematicas", "Sec 2A · Álgebra", "Aula 2A", "erika"),
  cls(0, "08:00", "08:50", "matematicas", "Sec 1B · Álgebra", "Aula 1B", "erika"),
  cls(0, "10:00", "10:50", "matematicas", "Sec 3A · Geometría", "Aula 3A", "erika"),
  cls(0, "11:30", "12:15", "primaria", "Primaria 6A · Matemáticas", "Aula 6A", "erika"),
  cls(0, "12:15", "13:00", "primaria", "Primaria 6B · Matemáticas", "Aula 6B", "erika"),
  cls(1, "07:00", "07:50", "matematicas", "Sec 3B · Geometría", "Aula 3B", "erika"),
  cls(1, "08:00", "08:50", "matematicas", "Sec 3A · Álgebra", "Aula 3A", "erika"),
  cls(1, "09:10", "10:00", "matematicas", "Sec 1A · Álgebra", "Aula 1A", "erika"),
  cls(1, "10:45", "11:30", "primaria", "Primaria 5A · Matemáticas", "Aula 5A", "erika"),
  cls(1, "11:30", "12:15", "primaria", "Primaria 5B · Matemáticas", "Aula 5B", "erika"),
  cls(2, "07:10", "08:00", "matematicas", "Sec 2B · Álgebra", "Aula 2B", "erika"),
  cls(2, "09:10", "10:00", "matematicas", "Sec 1B · Álgebra", "Aula 1B", "erika"),
  cls(2, "10:50", "11:40", "matematicas", "Sec 3B · Geometría", "Aula 3B", "erika"),
  cls(2, "13:00", "13:45", "primaria", "Primaria 6A · Matemáticas", "Aula 6A", "erika"),
  cls(3, "08:00", "08:50", "matematicas", "Sec 1A · Álgebra", "Aula 1A", "erika"),
  cls(3, "09:10", "10:00", "matematicas", "Sec 2A · Álgebra", "Aula 2A", "erika"),
  cls(3, "11:30", "12:15", "primaria", "Primaria 5A · Matemáticas", "Aula 5A", "erika"),
  cls(3, "12:15", "13:00", "primaria", "Primaria 5B · Matemáticas", "Aula 5B", "erika"),
  cls(4, "07:00", "07:50", "matematicas", "Sec 3A · Geometría", "Aula 3A", "erika"),
  cls(4, "08:00", "08:50", "matematicas", "Sec 2A · Álgebra", "Aula 2A", "erika"),
  cls(4, "09:10", "10:00", "matematicas", "Sec 1B · Álgebra", "Aula 1B", "erika"),
  cls(4, "10:45", "11:30", "primaria", "Primaria 6B · Matemáticas", "Aula 6B", "erika"),

  /* ── Ing. Eduardo Torbellin (Matemáticas) ── */
  cls(0, "08:00", "08:50", "matematicas", "Sec 1A · Álgebra", "Aula 1A", "eduardo"),
  cls(0, "09:10", "10:00", "matematicas", "Sec 2A · Geometría", "Aula 2A", "eduardo"),
  cls(0, "12:15", "13:00", "matematicas", "Sec 3B · Álgebra", "Aula 3B", "eduardo"),
  cls(0, "13:00", "13:45", "primaria", "Primaria 4A · Matemáticas", "Aula 4A", "eduardo"),
  cls(1, "08:00", "08:50", "matematicas", "Sec 2B · Álgebra", "Aula 2B", "eduardo"),
  cls(1, "09:10", "10:00", "matematicas", "Sec 3A · Geometría", "Aula 3A", "eduardo"),
  cls(1, "10:45", "11:30", "matematicas", "Sec 1B · Álgebra", "Aula 1B", "eduardo"),
  cls(1, "12:15", "13:00", "primaria", "Primaria 4B · Matemáticas", "Aula 4B", "eduardo"),
  cls(2, "08:00", "08:50", "matematicas", "Sec 1A · Álgebra", "Aula 1A", "eduardo"),
  cls(2, "09:10", "10:00", "matematicas", "Sec 3B · Geometría", "Aula 3B", "eduardo"),
  cls(2, "10:45", "11:30", "matematicas", "Sec 2A · Álgebra", "Aula 2A", "eduardo"),
  cls(2, "12:15", "13:00", "primaria", "Primaria 4A · Matemáticas", "Aula 4A", "eduardo"),
  cls(3, "07:10", "08:00", "matematicas", "Sec 3A · Geometría", "Aula 3A", "eduardo"),
  cls(3, "09:10", "10:00", "matematicas", "Sec 2B · Álgebra", "Aula 2B", "eduardo"),
  cls(3, "10:15", "11:00", "primaria", "Primaria 4B · Matemáticas", "Aula 4B", "eduardo"),
  cls(3, "12:15", "13:00", "matematicas", "Sec 1B · Álgebra", "Aula 1B", "eduardo"),
  cls(4, "07:00", "07:50", "matematicas", "Sec 2A · Álgebra", "Aula 2A", "eduardo"),
  cls(4, "08:00", "08:50", "matematicas", "Sec 1A · Álgebra", "Aula 1A", "eduardo"),
  cls(4, "09:10", "10:00", "matematicas", "Sec 3A · Geometría", "Aula 3A", "eduardo"),

  /* ── Miss Lila Meza (Titular 5B) ── */
  cls(0, "08:00", "08:50", "primaria", "5B · Español", "Aula 5B", "lila"),
  cls(0, "09:10", "10:00", "primaria", "5B · Ciencias Naturales", "Aula 5B", "lila"),
  cls(0, "10:45", "11:30", "primaria", "5B · Historia", "Aula 5B", "lila"),
  cls(0, "11:30", "12:15", "primaria", "5B · Geografía", "Aula 5B", "lila"),
  cls(0, "12:15", "13:00", "primaria", "5B · Formación Cívica", "Aula 5B", "lila"),
  cls(1, "08:00", "08:50", "primaria", "5B · Español", "Aula 5B", "lila"),
  cls(1, "09:10", "10:00", "primaria", "5B · Matemáticas", "Aula 5B", "lila"),
  cls(1, "10:45", "11:30", "primaria", "5B · Ciencias Naturales", "Aula 5B", "lila"),
  cls(1, "11:30", "12:15", "primaria", "5B · Geografía", "Aula 5B", "lila"),
  cls(1, "12:15", "13:00", "primaria", "5B · Historia", "Aula 5B", "lila"),
  cls(2, "08:45", "09:30", "primaria", "5B · Español", "Aula 5B", "lila"),
  cls(2, "09:30", "10:15", "primaria", "5B · Matemáticas", "Aula 5B", "lila"),
  cls(2, "10:45", "11:30", "primaria", "5B · Formación Cívica", "Aula 5B", "lila"),
  cls(2, "11:30", "12:15", "primaria", "5B · Ciencias Naturales", "Aula 5B", "lila"),
  cls(2, "12:15", "13:00", "primaria", "5B · Historia", "Aula 5B", "lila"),
  cls(3, "08:00", "08:50", "primaria", "5B · Español", "Aula 5B", "lila"),
  cls(3, "09:10", "10:00", "primaria", "5B · Geografía", "Aula 5B", "lila"),
  cls(3, "10:15", "11:00", "primaria", "5B · Matemáticas", "Aula 5B", "lila"),
  cls(3, "11:30", "12:15", "primaria", "5B · Ciencias Naturales", "Aula 5B", "lila"),
  cls(4, "08:00", "08:50", "primaria", "5B · Español", "Aula 5B", "lila"),
  cls(4, "09:10", "10:00", "primaria", "5B · Matemáticas", "Aula 5B", "lila"),
  cls(4, "10:45", "11:30", "primaria", "5B · Formación Cívica", "Aula 5B", "lila"),

  /* ── Prof. Fernando Paulino (Educación Física) ── */
  cls(0, "07:00", "07:50", "fisica", "Bach 3° · Activación", "Cancha 1", "fernando"),
  cls(0, "08:00", "08:50", "fisica", "Bach 1° · Deportes", "Cancha 1", "fernando"),
  cls(0, "09:10", "10:00", "fisica", "Bach 2° · Activación", "Cancha 2", "fernando"),
  cls(0, "10:00", "10:50", "fisica", "Bach 3° · Deportes", "Cancha 1", "fernando"),
  cls(1, "07:00", "07:50", "fisica", "Bach 2° · Activación", "Cancha 1", "fernando"),
  cls(1, "08:00", "08:50", "fisica", "Bach 1° · Deportes", "Cancha 1", "fernando"),
  cls(1, "09:10", "10:00", "fisica", "Bach 3° · Activación", "Cancha 2", "fernando"),
  cls(1, "10:45", "11:30", "fisica", "Bach 1° · Deportes", "Cancha 2", "fernando"),
  cls(2, "07:10", "08:00", "fisica", "Bach 3° · Activación", "Cancha 1", "fernando"),
  cls(2, "08:00", "08:50", "fisica", "Bach 2° · Deportes", "Cancha 1", "fernando"),
  cls(2, "10:00", "10:50", "fisica", "Bach 3° · Deportes", "Cancha 2", "fernando"),
  cls(2, "11:30", "12:15", "fisica", "Bach 1° · Activación", "Cancha 2", "fernando"),
  cls(3, "07:10", "08:00", "fisica", "Bach 2° · Deportes", "Cancha 1", "fernando"),
  cls(3, "08:00", "08:50", "fisica", "Bach 1° · Activación", "Cancha 1", "fernando"),
  cls(3, "10:15", "11:00", "fisica", "Bach 2° · Activación", "Cancha 2", "fernando"),
  cls(3, "13:00", "13:45", "fisica", "Bach 3° · Deportes", "Cancha 2", "fernando"),
  cls(4, "07:00", "07:50", "fisica", "Bach 1° · Deportes", "Cancha 1", "fernando"),
  cls(4, "08:00", "08:50", "fisica", "Bach 2° · Activación", "Cancha 1", "fernando"),
  cls(4, "09:10", "10:00", "fisica", "Bach 3° · Deportes", "Cancha 2", "fernando"),
  cls(4, "10:45", "11:30", "fisica", "Bach 1° · Activación", "Cancha 2", "fernando"),
];

window.DAYS = DAYS;
window.DOWS_SHORT = DOWS_SHORT;
window.DAY_DATES = DAY_DATES;
window.toMin = toMin;
window.ACAD_START = ACAD_START;
window.ACAD_END = ACAD_END;
window.ACAD_HR_PX = ACAD_HR_PX;
window.ACAD_TOP = ACAD_TOP;
window.ACAD_TOTAL = ACAD_TOTAL;
window.acadY = acadY;
window.acadH = acadH;
window.ACAD_CATS = ACAD_CATS;
window.BREAKS = BREAKS;
window.TEACHERS = TEACHERS;
window.cls = cls;
window.CLASSES = CLASSES;
