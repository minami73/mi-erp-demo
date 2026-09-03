/* ─── Alumnos — Constantes y helpers de rendimiento académico ──────────────
   Los rubros de evaluación son de 3 tipos:
   - "conteo"       (actividades, tareas): { total, entregadas, promedio }
   - "entrega"      (proyecto): { entregado, calificacion }
   - "calificacion" (exámenes): { presentado, calificacion }
   La ponderación de cada materia (qué rubros usa y con qué peso) vive en
   MATERIAS de cada data-<seccion>.js — no aquí, porque varía por materia. */

const RUBROS = {
  actividades: { id: "actividades", label: "Actividades", tipo: "conteo" },
  tareas: { id: "tareas", label: "Tareas", tipo: "conteo" },
  proyecto: { id: "proyecto", label: "Proyecto", tipo: "entrega" },
  examen_parcial: {
    id: "examen_parcial",
    label: "Ex. parcial",
    tipo: "calificacion",
  },
  examen_periodo: {
    id: "examen_periodo",
    label: "Ex. periodo",
    tipo: "calificacion",
  },
};

const RUBRO_ORDEN = [
  "actividades",
  "tareas",
  "proyecto",
  "examen_parcial",
  "examen_periodo",
];

// Paleta neutra por rubro para la barra de ponderación — deliberadamente
// sin verde/ámbar/rojo, que ya están tomados por el semáforo académico.
const RUBRO_COLOR = {
  actividades: "#2563EB",
  tareas: "#7C3AED",
  proyecto: "#0D9488",
  examen_parcial: "#C2410C",
  examen_periodo: "#4F46E5",
};

const TRIMESTRES = [
  { value: "1", label: "1er Trimestre" },
  { value: "2", label: "2do Trimestre" },
  { value: "3", label: "3er Trimestre" },
];

// Umbrales del semáforo académico (calificación sobre 10)
const SEMAFORO_ACADEMICO = {
  bien: { min: 8, color: "#15803D", bg: "#F0FDF4", label: "Bien" },
  regular: { min: 6, color: "#D97706", bg: "#FFFBEB", label: "Regular" },
  riesgo: { min: 0, color: "#DC2626", bg: "#FEF2F2", label: "En riesgo" },
};

const estadoAcademico = (promedio) => {
  if (promedio === null) return null;
  if (promedio >= SEMAFORO_ACADEMICO.bien.min) return "bien";
  if (promedio >= SEMAFORO_ACADEMICO.regular.min) return "regular";
  return "riesgo";
};

/* ─── Cálculo de calificación por rubro ─────────────────────────────────── */

// Un rubro cuenta como "evaluado" si ya hay algo que calificar: al menos una
// entrega registrada, o el examen/proyecto ya presentado. Si no, se excluye
// del promedio en vez de contar como reprobado (un trimestre en curso no
// debe verse rojo solo porque un examen todavía no ocurre).
const rubroEvaluado = (valor, tipo) => {
  if (!valor) return false;
  if (tipo === "conteo") return valor.total > 0 && valor.entregadas > 0;
  if (tipo === "entrega") return valor.entregado === true;
  if (tipo === "calificacion") return valor.presentado === true;
  return false;
};

const calificacionRubro = (valor, tipo) => {
  if (!rubroEvaluado(valor, tipo)) return null;
  if (tipo === "conteo" || tipo === "calificacion")
    return valor.promedio ?? valor.calificacion;
  if (tipo === "entrega") return valor.calificacion;
  return null;
};

// Promedio ponderado de una materia en un trimestre, solo con los rubros
// que la materia usa Y que ya tienen calificación. Si nada se ha evaluado
// aún, regresa null (se muestra "—", no un 0).
const promedioMateria = (desempenoMateria, ponderacion) => {
  if (!desempenoMateria) return null;
  let pesoTotal = 0;
  let sumaPonderada = 0;
  for (const { rubro, peso } of ponderacion) {
    const tipo = RUBROS[rubro]?.tipo;
    const cal = calificacionRubro(desempenoMateria[rubro], tipo);
    if (cal === null) continue;
    sumaPonderada += cal * peso;
    pesoTotal += peso;
  }
  if (pesoTotal === 0) return null;
  return Math.round((sumaPonderada / pesoTotal) * 10) / 10;
};

// Promedio general del alumno en el trimestre: media simple de las
// materias que ya tienen promedio calculable.
const promedioGeneral = (materias, desempenoTrimestre) => {
  const promedios = materias
    .map((m) => promedioMateria(desempenoTrimestre[m.id], m.ponderacion))
    .filter((p) => p !== null);
  if (!promedios.length) return null;
  return (
    Math.round((promedios.reduce((a, b) => a + b, 0) / promedios.length) * 10) /
    10
  );
};

// Cumplimiento de entregas: % de actividades+tareas entregadas sobre el
// total asignado, agregado en todas las materias del trimestre.
const cumplimientoEntregas = (materias, desempenoTrimestre) => {
  let total = 0;
  let entregadas = 0;
  for (const m of materias) {
    const d = desempenoTrimestre[m.id];
    if (!d) continue;
    for (const rubroId of ["actividades", "tareas"]) {
      const r = d[rubroId];
      if (r && r.total > 0) {
        total += r.total;
        entregadas += r.entregadas;
      }
    }
  }
  if (total === 0) return null;
  return Math.round((entregadas / total) * 100);
};

// Materias con promedio ya calculable por debajo del umbral de riesgo.
const materiasEnRiesgo = (materias, desempenoTrimestre) =>
  materias.filter((m) => {
    const p = promedioMateria(desempenoTrimestre[m.id], m.ponderacion);
    return p !== null && estadoAcademico(p) === "riesgo";
  }).length;

// Cuántos rubros (de todas las materias) siguen sin calificación en el
// trimestre — lo que le falta capturar al docente, no lo que el alumno
// reprobó.
const rubrosPendientes = (materias, desempenoTrimestre) => {
  let count = 0;
  for (const m of materias) {
    const d = desempenoTrimestre[m.id];
    for (const { rubro } of m.ponderacion) {
      const tipo = RUBROS[rubro]?.tipo;
      if (!rubroEvaluado(d?.[rubro], tipo)) count++;
    }
  }
  return count;
};

// Materias con promedio ya calculable en o por encima del umbral de
// aprobación (mismo umbral que "regular" en el semáforo).
const materiasAprobadas = (materias, desempenoTrimestre) =>
  materias.filter((m) => {
    const p = promedioMateria(desempenoTrimestre[m.id], m.ponderacion);
    return p !== null && p >= SEMAFORO_ACADEMICO.regular.min;
  }).length;

/* ─── Hash determinístico (mismo patrón que Reportes.jsx) ──────────────────
   Genera datos consistentes sin hardcodear cientos de filas a mano. */
const hashAlumnos = (s) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h << 5) + h + s.charCodeAt(i);
  return Math.abs(h);
};

window.CV_ALUMNOS_CONST = {
  RUBROS,
  RUBRO_ORDEN,
  RUBRO_COLOR,
  TRIMESTRES,
  SEMAFORO_ACADEMICO,
  estadoAcademico,
  rubroEvaluado,
  calificacionRubro,
  promedioMateria,
  promedioGeneral,
  cumplimientoEntregas,
  materiasEnRiesgo,
  rubrosPendientes,
  materiasAprobadas,
  hashAlumnos,
};
