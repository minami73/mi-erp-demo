/* ─── Workshop constants & data ──────────────────────────────────────── */

const WORK_START = 14;
const WORK_END = 19;
const WORK_HALF_PX = 60;
const WORK_TOP = 16;
const WORK_TOTAL = WORK_TOP + (WORK_END - WORK_START) * 2 * WORK_HALF_PX;
const workY = (hhmm) =>
  WORK_TOP + ((window.toMin(hhmm) - WORK_START * 60) / 60) * (WORK_HALF_PX * 2);
const workH = (s, e) => ((window.toMin(e) - window.toMin(s)) / 60) * (WORK_HALF_PX * 2);

const WORK_CATS = {
  basquet: {
    id: "basquet",
    label: "Básquet",
    color: "var(--t-basquet)",
    ink: "var(--t-basquet-ink)",
  },
  futbol: {
    id: "futbol",
    label: "Fútbol",
    color: "var(--t-futbol)",
    ink: "var(--t-futbol-ink)",
  },
  baile: {
    id: "baile",
    label: "Baile",
    color: "var(--t-baile)",
    ink: "var(--t-baile-ink)",
  },
  ajedrez: {
    id: "ajedrez",
    label: "Ajedrez",
    color: "var(--t-ajedrez)",
    ink: "var(--t-ajedrez-ink)",
  },
  taekwando: {
    id: "taekwando",
    label: "Taekwondo",
    color: "var(--t-taekwando)",
    ink: "var(--t-taekwando-ink)",
  },
  voleibol: {
    id: "voleibol",
    label: "Voleibol",
    color: "var(--t-voleibol)",
    ink: "var(--t-voleibol-ink)",
  },
  catecismo: {
    id: "catecismo",
    label: "Catecismo",
    color: "var(--t-catecismo)",
    ink: "var(--t-catecismo-ink)",
  },
};

let __wid = 0;
const W = (day, start, end, cat, group, teacher, place) => ({
  id: ++__wid,
  day,
  start,
  end,
  cat,
  group,
  teacher,
  place,
});
const WORKSHOPS = [
  W(0, "14:30", "15:30", "basquet", "Primaria Alta", "Miss Erika", "Cancha 1"),
  W(0, "16:00", "17:00", "ajedrez", "Primaria Alta", "Prof. Armando", "Salón de usos múltiples"),
  W(0, "16:00", "17:00", "futbol", "Primaria Baja", "Prof. Aldo", "Cancha 2"),
  W(0, "16:00", "17:00", "voleibol", "Primaria Alta y Sec.", "Prof. Jaime", "Cancha 3"),
  W(0, "16:00", "17:00", "baile", "Primaria Baja", "Miss Gaby", "Salón de baile"),
  W(0, "17:00", "18:00", "futbol", "Primaria Alta", "Prof. Aldo", "Cancha 2"),
  W(0, "17:00", "18:00", "ajedrez", "Secundaria", "Prof. Armando", "Salón de usos múltiples"),
  W(0, "17:00", "18:00", "baile", "Primaria Alta y Sec.", "Miss Gaby", "Salón de baile"),
  W(1, "15:30", "17:00", "futbol", "Secundaria", "Prof. Aldo", "Cancha 2"),
  W(1, "16:00", "17:00", "catecismo", "Confirmación", "Prof. Aldo", "Capilla"),
  W(1, "16:00", "17:00", "voleibol", "Primaria Baja", "Prof. Jaime", "Cancha 3"),
  W(1, "17:00", "18:00", "catecismo", "1ª Comunión", "Prof. Aldo", "Capilla"),
  W(1, "17:00", "18:00", "futbol", "Primaria Alta", "Prof. Aldo", "Cancha 2"),
  W(2, "14:30", "15:30", "basquet", "Primaria Alta", "Miss Erika", "Cancha 1"),
  W(2, "16:00", "17:00", "baile", "Primaria Baja", "Miss Gaby", "Salón de baile"),
  W(2, "16:00", "17:00", "taekwando", "Primaria Baja", "Prof. Cesar", "Dojo"),
  W(2, "16:00", "17:00", "futbol", "Primaria Baja", "Prof. Aldo", "Cancha 2"),
  W(2, "16:00", "17:00", "voleibol", "Primaria Alta y Sec.", "Prof. Jaime", "Cancha 3"),
  W(2, "17:00", "18:00", "taekwando", "Primaria Alta", "Prof. Cesar", "Dojo"),
  W(2, "17:00", "18:00", "futbol", "Primaria Alta", "Prof. Aldo", "Cancha 2"),
  W(2, "17:00", "18:00", "baile", "Primaria Alta y Sec.", "Miss Gaby", "Salón de baile"),
  W(3, "14:30", "15:30", "basquet", "Primaria Baja", "Miss Erika", "Cancha 1"),
  W(3, "15:30", "17:00", "futbol", "Secundaria", "Prof. Aldo", "Cancha 2"),
  W(3, "16:00", "17:00", "taekwando", "Primaria Baja", "Prof. Cesar", "Dojo"),
  W(3, "16:00", "17:00", "voleibol", "Primaria Baja", "Prof. Jaime", "Cancha 3"),
  W(3, "17:00", "18:00", "taekwando", "Primaria Alta", "Prof. Cesar", "Dojo"),
  W(3, "17:00", "18:00", "futbol", "Primaria Alta", "Prof. Aldo", "Cancha 2"),
  W(4, "14:00", "15:00", "basquet", "Primaria Baja", "Miss Erika", "Cancha 1"),
  W(4, "16:00", "17:00", "ajedrez", "Primaria Alta", "Prof. Armando", "Salón de usos múltiples"),
  W(4, "17:00", "18:00", "ajedrez", "Secundaria", "Prof. Armando", "Salón de usos múltiples"),
];

window.WORK_START = WORK_START;
window.WORK_END = WORK_END;
window.WORK_HALF_PX = WORK_HALF_PX;
window.WORK_TOP = WORK_TOP;
window.WORK_TOTAL = WORK_TOTAL;
window.workY = workY;
window.workH = workH;
window.WORK_CATS = WORK_CATS;
window.W = W;
window.WORKSHOPS = WORKSHOPS;
