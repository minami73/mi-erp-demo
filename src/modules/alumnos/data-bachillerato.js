/* ─── Alumnos — Bachillerato (mock) ─────────────────────────────────────────
   Catálogo de materias PROVISIONAL: no hay mapa curricular real de
   bachillerato en los docs (ver docs/contexto-modulo-personal-alumnos.md
   §4.1). Se marca así para que se corrija en cuanto dirección lo confirme.
   Grupos: 3 grados × A/B mixtos (decisión de John — corrige la regla
   A=niñas/B=niños, que solo aplica a primaria y secundaria). */

const ALUMNOS_BACH = [
  // 1°A
  {
    id: "ba101",
    nombre: "Emiliano",
    apP: "Sandoval",
    apM: "Rivas",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba102",
    nombre: "Ximena",
    apP: "Beltrán",
    apM: "Ochoa",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba103",
    nombre: "Santiago",
    apP: "Quintero",
    apM: "Lara",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba104",
    nombre: "Renata",
    apP: "Escobedo",
    apM: "Nava",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba105",
    nombre: "Bruno",
    apP: "Zamudio",
    apM: "Cárdenas",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba106",
    nombre: "Camila",
    apP: "Villaseñor",
    apM: "Pineda",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba107",
    nombre: "Tadeo",
    apP: "Bautista",
    apM: "Solano",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba108",
    nombre: "Fernanda",
    apP: "Cazares",
    apM: "Vidal",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba109",
    nombre: "Joaquín",
    apP: "Rendón",
    apM: "Alcalá",
    grado: 1,
    grupo: "A",
  },
  {
    id: "ba110",
    nombre: "Melany",
    apP: "Pantoja",
    apM: "Guerra",
    grado: 1,
    grupo: "A",
  },
  // 1°B
  {
    id: "ba111",
    nombre: "Iker",
    apP: "Villanueva",
    apM: "Prado",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba112",
    nombre: "Regina",
    apP: "Ceballos",
    apM: "Fonseca",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba113",
    nombre: "Máximo",
    apP: "Trejo",
    apM: "Barajas",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba114",
    nombre: "Alondra",
    apP: "Camacho",
    apM: "Rosales",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba115",
    nombre: "Leonardo",
    apP: "Salcedo",
    apM: "Higuera",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba116",
    nombre: "Itzel",
    apP: "Barrera",
    apM: "Manzano",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba117",
    nombre: "Dario",
    apP: "Cordero",
    apM: "Villagómez",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba118",
    nombre: "Wendy",
    apP: "Talavera",
    apM: "Nájera",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba119",
    nombre: "Axel",
    apP: "Rincón",
    apM: "Bermúdez",
    grado: 1,
    grupo: "B",
  },
  {
    id: "ba120",
    nombre: "Nayeli",
    apP: "Cotorruelo",
    apM: "Segura",
    grado: 1,
    grupo: "B",
  },
  // 2°A
  {
    id: "ba201",
    nombre: "Christopher",
    apP: "Aponte",
    apM: "Miranda",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba202",
    nombre: "Perla",
    apP: "Zúñiga",
    apM: "Cabral",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba203",
    nombre: "Ulises",
    apP: "Marroquín",
    apM: "Estévez",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba204",
    nombre: "Brisa",
    apP: "Escamilla",
    apM: "Toscano",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba205",
    nombre: "Gael",
    apP: "Villalpando",
    apM: "Robledo",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba206",
    nombre: "Ashley",
    apP: "Meraz",
    apM: "Cornejo",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba207",
    nombre: "Yahir",
    apP: "Preciado",
    apM: "Duarte",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba208",
    nombre: "Naomi",
    apP: "Godínez",
    apM: "Chávez",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba209",
    nombre: "Kevin",
    apP: "Orduña",
    apM: "Basurto",
    grado: 2,
    grupo: "A",
  },
  {
    id: "ba210",
    nombre: "Dulce",
    apP: "Barreto",
    apM: "Lozoya",
    grado: 2,
    grupo: "A",
  },
  // 2°B
  {
    id: "ba211",
    nombre: "Ian",
    apP: "Covarrubias",
    apM: "Landa",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba212",
    nombre: "Mildred",
    apP: "Anaya",
    apM: "Sarmiento",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba213",
    nombre: "Osvaldo",
    apP: "Terrazas",
    apM: "Ibáñez",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba214",
    nombre: "Yaretzi",
    apP: "Ontiveros",
    apM: "Falcón",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba215",
    nombre: "Braulio",
    apP: "Ledesma",
    apM: "Quiroz",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba216",
    nombre: "Zoe",
    apP: "Carranza",
    apM: "Villaseñor",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba217",
    nombre: "Erick",
    apP: "Betancourt",
    apM: "Solórzano",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba218",
    nombre: "Mariana",
    apP: "Padilla",
    apM: "Reséndiz",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba219",
    nombre: "Cristopher",
    apP: "Vallejo",
    apM: "Montoya",
    grado: 2,
    grupo: "B",
  },
  {
    id: "ba220",
    nombre: "Karime",
    apP: "Aldana",
    apM: "Bocanegra",
    grado: 2,
    grupo: "B",
  },
  // 3°A
  {
    id: "ba301",
    nombre: "Diego",
    apP: "Marín",
    apM: "Cepeda",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba302",
    nombre: "Salma",
    apP: "Quiñones",
    apM: "Villagrán",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba303",
    nombre: "Fabián",
    apP: "Loera",
    apM: "Escutia",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba304",
    nombre: "Yolanda",
    apP: "Bravo",
    apM: "Cisneros",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba305",
    nombre: "Rodrigo",
    apP: "Peñaloza",
    apM: "Muñiz",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba306",
    nombre: "Frida",
    apP: "Salas",
    apM: "Contreras",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba307",
    nombre: "Kevin",
    apP: "Ibarra",
    apM: "Zaragoza",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba308",
    nombre: "Marysol",
    apP: "Trujillo",
    apM: "Gallardo",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba309",
    nombre: "Aldo",
    apP: "Barrientos",
    apM: "Cuevas",
    grado: 3,
    grupo: "A",
  },
  {
    id: "ba310",
    nombre: "Cecilia",
    apP: "Novoa",
    apM: "Riquelme",
    grado: 3,
    grupo: "A",
  },
  // 3°B
  {
    id: "ba311",
    nombre: "Ricardo",
    apP: "Tovar",
    apM: "Zepeda",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba312",
    nombre: "Alejandra",
    apP: "Delgadillo",
    apM: "Roa",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba313",
    nombre: "Iván",
    apP: "Guerrero",
    apM: "Villalba",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba314",
    nombre: "Montserrat",
    apP: "Chaparro",
    apM: "Alanís",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba315",
    nombre: "Sebastián",
    apP: "Amador",
    apM: "Palomares",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba316",
    nombre: "Genesis",
    apP: "Colunga",
    apM: "Marrero",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba317",
    nombre: "Uriel",
    apP: "Farías",
    apM: "Elizondo",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba318",
    nombre: "Paulina",
    apP: "Rico",
    apM: "Ovando",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba319",
    nombre: "Cristian",
    apP: "Espinal",
    apM: "Concha",
    grado: 3,
    grupo: "B",
  },
  {
    id: "ba320",
    nombre: "Dafne",
    apP: "Malagón",
    apM: "Herrejón",
    grado: 3,
    grupo: "B",
  },
];

// Datos del expediente que no dependen del rendimiento académico
// (docs/contexto-modulo-personal-alumnos.md §3.2). Generados
// determinísticamente para no capturar 60 fichas a mano.
const TUTORES_NOMBRE = [
  "María Elena",
  "José Luis",
  "Guadalupe",
  "Ricardo",
  "Patricia",
  "Alberto",
  "Rosa María",
  "Francisco",
  "Leticia",
  "Armando",
];
const TUTORES_APELLIDO = [
  "Vázquez",
  "Domínguez",
  "Ríos",
  "Aguilar",
  "Chávez",
  "Ponce",
  "Uribe",
  "Cárdenas",
  "Solís",
  "Mata",
];

ALUMNOS_BACH.forEach((a) => {
  const h = hashAlumnos(a.id);
  a.nombreCompleto = `${a.nombre} ${a.apP} ${a.apM}`;
  a.matricula = `CV-BA-${a.id.slice(2)}`;
  a.edad = 15 + a.grado + (h % 2); // 1°≈16, 2°≈17, 3°≈18, con variación
  a.fechaNacimiento = `20${11 - a.grado}-${String(1 + (h % 12)).padStart(2, "0")}-${String(1 + (h % 27)).padStart(2, "0")}`;
  a.tutor = `${TUTORES_NOMBRE[h % TUTORES_NOMBRE.length]} ${TUTORES_APELLIDO[(h >> 3) % TUTORES_APELLIDO.length]}`;
  a.telTutor = `221 ${100 + (h % 900)} ${1000 + (h % 9000)}`;
  a.correo = `${a.nombre.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}.${a.apP.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}@colegiovictoria.edu.mx`;
});

// Catálogo PROVISIONAL — pendiente de confirmar con dirección
// (docs/contexto-modulo-personal-alumnos.md §4.1). Ponderación
// distinta por materia, según lo indicado por John.
const MATERIAS_BACH = [
  {
    id: "matematicas",
    nombre: "Matemáticas",
    docente: "Prof. Raúl Tovar",
    ponderacion: [
      { rubro: "actividades", peso: 40 },
      { rubro: "examen_periodo", peso: 40 },
      { rubro: "proyecto", peso: 20 },
    ],
  },
  {
    id: "quimica",
    nombre: "Química",
    docente: "Profa. Mónica Serrano",
    ponderacion: [
      { rubro: "actividades", peso: 40 },
      { rubro: "proyecto", peso: 10 },
      { rubro: "examen_parcial", peso: 25 },
      { rubro: "examen_periodo", peso: 25 },
    ],
  },
  {
    id: "literatura",
    nombre: "Literatura",
    docente: "Profa. Ana Belén Ríos",
    ponderacion: [
      { rubro: "actividades", peso: 30 },
      { rubro: "tareas", peso: 20 },
      { rubro: "examen_periodo", peso: 50 },
    ],
  },
  {
    id: "historia",
    nombre: "Historia Universal",
    docente: "Prof. Ignacio Reyna",
    ponderacion: [
      { rubro: "tareas", peso: 30 },
      { rubro: "examen_parcial", peso: 30 },
      { rubro: "examen_periodo", peso: 40 },
    ],
  },
  {
    id: "ingles",
    nombre: "Inglés",
    docente: "Prof. Kevin Marsh",
    ponderacion: [
      { rubro: "actividades", peso: 25 },
      { rubro: "tareas", peso: 25 },
      { rubro: "proyecto", peso: 20 },
      { rubro: "examen_periodo", peso: 30 },
    ],
  },
  {
    id: "fisica",
    nombre: "Física",
    docente: "Prof. Raúl Tovar",
    ponderacion: [
      { rubro: "actividades", peso: 35 },
      { rubro: "examen_parcial", peso: 30 },
      { rubro: "examen_periodo", peso: 35 },
    ],
  },
  {
    id: "filosofia",
    nombre: "Filosofía",
    docente: "Profa. Ana Belén Ríos",
    ponderacion: [
      { rubro: "actividades", peso: 30 },
      { rubro: "proyecto", peso: 30 },
      { rubro: "examen_periodo", peso: 40 },
    ],
  },
  {
    id: "ed_fisica",
    nombre: "Educación Física",
    docente: "Prof. David Coronado",
    ponderacion: [
      { rubro: "actividades", peso: 70 },
      { rubro: "examen_periodo", peso: 30 },
    ],
  },
];

// Total base por rubro y trimestre (t3 recién inicia → menos entregas aún)
const TOTAL_BASE = {
  actividades: { 1: 12, 2: 10, 3: 4 },
  tareas: { 1: 8, 2: 8, 3: 3 },
};
const MAX_PENDIENTE = { 1: 1, 2: 3, 3: 1 };

const TAREAS_MUESTRA = {
  actividades: [
    "Ejercicios de práctica",
    "Resumen de lectura",
    "Mapa conceptual",
    "Cuestionario en clase",
    "Análisis de caso",
  ],
  tareas: [
    "Investigación en casa",
    "Reporte de laboratorio",
    "Ensayo corto",
    "Ficha bibliográfica",
    "Guía de estudio",
  ],
};

// Nivel académico del alumno: un sesgo estable que se aplica a TODAS sus
// calificaciones, para que un alumno rezagado se vea rezagado en varias
// materias (no ruido puramente independiente, que promedia a la mitad y
// no deja a nadie en riesgo). Distribución aproximada: 18% bajo, 55%
// medio, 27% alto.
const nivelAlumno = (alumno) => {
  const h = hashAlumnos(`nivel-${alumno.id}`);
  const r = h % 100;
  if (r < 18) return -3.2 + (h % 10) / 10; // bajo: sesgo ≈ -3.2 a -2.3
  if (r < 73) return -0.6 + (h % 12) / 10; // medio: sesgo ≈ -0.6 a +0.5
  return 1.0 + (h % 10) / 10; // alto: sesgo ≈ +1.0 a +1.9
};

const clamp10 = (n) => Math.min(10, Math.max(4, n));

const construirRubroConteo = (tipo, alumno, materiaId, trimestre) => {
  const h1 = hashAlumnos(`${tipo}-${trimestre}-${materiaId}-${alumno.id}`);
  const total = Math.max(3, TOTAL_BASE[tipo][trimestre] - 1 + (h1 % 3));
  const pendientes = h1 % (MAX_PENDIENTE[trimestre] + 1);
  const entregadas = Math.max(0, total - pendientes);
  const h2 = hashAlumnos(`${tipo}-cal-${trimestre}-${materiaId}-${alumno.id}`);
  const base = 7.5 + (h2 % 26) / 10; // 7.5–10.0 antes del sesgo
  const promedio = entregadas > 0 ? clamp10(base + nivelAlumno(alumno)) : null;

  const detalle = [];
  for (let i = 0; i < total; i++) {
    const nombreBase = TAREAS_MUESTRA[tipo][i % TAREAS_MUESTRA[tipo].length];
    const hi = hashAlumnos(
      `${tipo}-item-${trimestre}-${materiaId}-${alumno.id}-${i}`,
    );
    const esEntregada = i < entregadas;
    const esTarde = esEntregada && hi % 5 === 0;
    detalle.push({
      id: `${materiaId}-${tipo}-${trimestre}-${i}`,
      tipo,
      titulo: `${nombreBase} ${i + 1}`,
      fechaLimite: `2026-${String(1 + ((trimestre - 1) * 3 + (i % 3))).padStart(2, "0")}-${String(3 + ((i * 4) % 25)).padStart(2, "0")}`,
      estado: !esEntregada ? "pendiente" : esTarde ? "tarde" : "entregada",
      calificacion: esEntregada
        ? Math.round(clamp10(7 + (hi % 26) / 10 + nivelAlumno(alumno)) * 10) /
          10
        : null,
    });
  }

  return {
    total,
    entregadas,
    promedio: promedio !== null ? Math.round(promedio * 10) / 10 : null,
    detalle,
  };
};

const construirRubroEntrega = (alumno, materiaId, trimestre) => {
  const h = hashAlumnos(`proyecto-${trimestre}-${materiaId}-${alumno.id}`);
  // t3 recién arranca: casi nadie ha entregado proyecto todavía
  const probEntregado = trimestre === "3" ? 0.15 : 0.85;
  const entregado = (h % 100) / 100 < probEntregado;
  return {
    entregado,
    calificacion: entregado
      ? Math.round(clamp10(7.5 + (h % 26) / 10 + nivelAlumno(alumno)) * 10) / 10
      : null,
  };
};

const construirRubroCalificacion = (rubroId, alumno, materiaId, trimestre) => {
  const h = hashAlumnos(`${rubroId}-${trimestre}-${materiaId}-${alumno.id}`);
  // el examen de periodo cierra el trimestre: en t3 casi nunca ha ocurrido
  const probPresentado =
    rubroId === "examen_periodo" ? (trimestre === "3" ? 0.1 : 0.9) : 0.75;
  const presentado = (h % 100) / 100 < probPresentado;
  return {
    presentado,
    calificacion: presentado
      ? Math.round(clamp10(7 + (h % 26) / 10 + nivelAlumno(alumno)) * 10) / 10
      : null,
  };
};

const construirDesempeno = () => {
  const data = {};
  for (const alumno of ALUMNOS_BACH) {
    data[alumno.id] = { 1: {}, 2: {}, 3: {} };
    for (const trimestre of ["1", "2", "3"]) {
      for (const materia of MATERIAS_BACH) {
        const usaRubro = (id) =>
          materia.ponderacion.some((p) => p.rubro === id);
        const registro = {};
        if (usaRubro("actividades")) {
          const { detalle, ...resto } = construirRubroConteo(
            "actividades",
            alumno,
            materia.id,
            trimestre,
          );
          registro.actividades = resto;
          registro._detalleActividades = detalle;
        }
        if (usaRubro("tareas")) {
          const { detalle, ...resto } = construirRubroConteo(
            "tareas",
            alumno,
            materia.id,
            trimestre,
          );
          registro.tareas = resto;
          registro._detalleTareas = detalle;
        }
        if (usaRubro("proyecto")) {
          registro.proyecto = construirRubroEntrega(
            alumno,
            materia.id,
            trimestre,
          );
        }
        if (usaRubro("examen_parcial")) {
          registro.examen_parcial = construirRubroCalificacion(
            "examen_parcial",
            alumno,
            materia.id,
            trimestre,
          );
        }
        if (usaRubro("examen_periodo")) {
          registro.examen_periodo = construirRubroCalificacion(
            "examen_periodo",
            alumno,
            materia.id,
            trimestre,
          );
        }
        registro.detalle = [
          ...(registro._detalleActividades || []),
          ...(registro._detalleTareas || []),
        ].sort((a, b) => a.fechaLimite.localeCompare(b.fechaLimite));
        delete registro._detalleActividades;
        delete registro._detalleTareas;
        data[alumno.id][trimestre][materia.id] = registro;
      }
    }
  }
  return data;
};

const TABS_BACH = [
  { id: "informacion", label: "Información" },
  { id: "desempeno", label: "Desempeño" },
  { id: "entrevistas", label: "Entrevistas" },
  { id: "incidencias", label: "Incidencias" },
];

window.CV_ALUMNOS = window.CV_ALUMNOS || {};
window.CV_ALUMNOS.bachillerato = {
  ALUMNOS: ALUMNOS_BACH,
  MATERIAS: MATERIAS_BACH,
  DESEMPENO: construirDesempeno(),
  TABS: TABS_BACH,
};
