/* ─── Data mock: Personal Bachillerato ─────────────────────────────────────
   Datos por sección para el módulo Personal genérico. Sin JSX. */

window.CV_PERSONAL = window.CV_PERSONAL || {};
window.CV_PERSONAL.bachillerato = (function () {
const DOCENTES = [
  // Tutores
  {
    id: "b01",
    nombre: "Mtro. Héctor Luna Bravo",
    rol: "Tutor",
    materias: ["Tutoría", "Filosofía"],
    grupos: ["1°Bach"],
    activo: true,
    iniciales: "HL",
  },
  {
    id: "b02",
    nombre: "Miss Paulina Rivas Soto",
    rol: "Tutor",
    materias: ["Tutoría", "Ética y Valores"],
    grupos: ["2°Bach"],
    activo: true,
    iniciales: "PR",
  },
  {
    id: "b03",
    nombre: "Mtro. Gerardo Peña Cisneros",
    rol: "Tutor",
    materias: ["Tutoría", "Lectura y Redacción"],
    grupos: ["3°Bach"],
    activo: true,
    iniciales: "GP",
  },
  // Docentes
  {
    id: "b04",
    nombre: "Miss Karla Ibáñez Mora",
    rol: "Docente",
    materias: ["Inglés"],
    grupos: ["1°Bach", "2°Bach", "3°Bach"],
    activo: true,
    iniciales: "KI",
  },
  {
    id: "b05",
    nombre: "Mtro. Ernesto Vázquez Ríos",
    rol: "Docente",
    materias: ["Matemáticas"],
    grupos: ["1°Bach", "2°Bach", "3°Bach"],
    activo: true,
    iniciales: "EV",
  },
  {
    id: "b06",
    nombre: "Miss Patricia Guerrero Leal",
    rol: "Docente",
    materias: ["Español y Literatura"],
    grupos: ["1°Bach", "2°Bach", "3°Bach"],
    activo: true,
    iniciales: "PG",
  },
  {
    id: "b07",
    nombre: "Mtro. Álvaro Mendoza Tapia",
    rol: "Docente",
    materias: ["Física"],
    grupos: ["2°Bach", "3°Bach"],
    activo: true,
    iniciales: "AM",
  },
  {
    id: "b08",
    nombre: "Miss Sofía Castillo Nava",
    rol: "Docente",
    materias: ["Química"],
    grupos: ["1°Bach", "2°Bach"],
    activo: true,
    iniciales: "SC",
  },
  {
    id: "b09",
    nombre: "Mtro. David Esquivel Paredes",
    rol: "Docente",
    materias: ["Historia Universal"],
    grupos: ["1°Bach", "2°Bach", "3°Bach"],
    activo: true,
    iniciales: "DE",
  },
  {
    id: "b10",
    nombre: "Miss Lorena Acuña Flores",
    rol: "Docente",
    materias: ["Biología", "TIC"],
    grupos: ["1°Bach", "3°Bach"],
    activo: true,
    iniciales: "LA",
  },
];

const PERFIL_EXTRA = {
  b01: {
    edad: 42,
    antiguedad: 11,
    email: "hluna@colegiovictoria.com",
    telefono: "778 123 0201",
    grado: "Lic. en Filosofía",
  },
  b02: {
    edad: 36,
    antiguedad: 7,
    email: "privas@colegiovictoria.com",
    telefono: "778 123 0202",
    grado: "Lic. en Psicología Educativa",
  },
  b03: {
    edad: 49,
    antiguedad: 18,
    email: "gpena@colegiovictoria.com",
    telefono: "778 123 0203",
    grado: "Mtro. en Letras Hispánicas",
  },
  b04: {
    edad: 31,
    antiguedad: 5,
    email: "kibanez@colegiovictoria.com",
    telefono: "778 123 0204",
    grado: "Lic. en Lenguas Extranjeras",
  },
  b05: {
    edad: 44,
    antiguedad: 15,
    email: "evazquez@colegiovictoria.com",
    telefono: "778 123 0205",
    grado: "Ing. en Sistemas / Mtro. en Matemáticas",
  },
  b06: {
    edad: 38,
    antiguedad: 9,
    email: "pguerrero@colegiovictoria.com",
    telefono: "778 123 0206",
    grado: "Lic. en Letras Hispánicas",
  },
  b07: {
    edad: 46,
    antiguedad: 13,
    email: "amendoza@colegiovictoria.com",
    telefono: "778 123 0207",
    grado: "Ing. Mecánico / Mtro. en Física Aplicada",
  },
  b08: {
    edad: 33,
    antiguedad: 4,
    email: "scastillo@colegiovictoria.com",
    telefono: "778 123 0208",
    grado: "Lic. en Química",
  },
  b09: {
    edad: 51,
    antiguedad: 20,
    email: "desquivel@colegiovictoria.com",
    telefono: "778 123 0209",
    grado: "Mtro. en Historia",
  },
  b10: {
    edad: 29,
    antiguedad: 3,
    email: "lacuna@colegiovictoria.com",
    telefono: "778 123 0210",
    grado: "Lic. en Biología",
  },
};

const TABS = [
  { id: "perfil", label: "Perfil" },
  { id: "asistencia", label: "Asistencia" },
];

const TIPO_FALTA = {
  enfermedad: { label: "Enfermedad", color: "#B45309", bg: "#FFFBEB" },
  justificada: { label: "Justificada", color: "#1D4ED8", bg: "#EFF6FF" },
  injustificada: { label: "Injustificada", color: "#B91C1C", bg: "#FEF2F2" },
};

const ASISTENCIA_DATA = {
  b02: [
    {
      id: "ab01",
      fecha: "2026-03-12",
      tipo: "enfermedad",
      motivo: "Fiebre y malestar general. Avisó por WhatsApp a las 6:40 am.",
      cobertura: {
        cubiertoPor: "Mtro. Gerardo Peña Cisneros",
        nota: "Aplicó lectura comentada del texto pendiente de 2°Bach.",
      },
    },
  ],
  b04: [
    {
      id: "ab02",
      fecha: "2026-04-08",
      tipo: "justificada",
      motivo: "Cita médica IMSS. Presentó justificante al día siguiente.",
      cobertura: {
        cubiertoPor: "Mtro. Héctor Luna Bravo",
        nota: "Repasó vocabulario de unidad 4 con los tres grupos.",
      },
    },
  ],
  b05: [
    {
      id: "ab03",
      fecha: "2026-02-20",
      tipo: "enfermedad",
      motivo: "Gripa con tos. Llamó al director a las 7:05 am.",
      cobertura: {
        cubiertoPor: "Miss Lorena Acuña Flores",
        nota: "Dejó ejercicios de repaso en el pizarrón para 1° y 2°.",
      },
    },
    {
      id: "ab04",
      fecha: "2026-05-06",
      tipo: "injustificada",
      motivo:
        "No se presentó y no avisó. Se intentó llamar sin respuesta hasta las 9 am.",
      cobertura: null,
    },
  ],
  b07: [
    {
      id: "ab05",
      fecha: "2026-03-25",
      tipo: "justificada",
      motivo:
        "Asistió a congreso de Física en Puebla capital. Solicitó permiso con 5 días de anticipación.",
      cobertura: {
        cubiertoPor: "Miss Sofía Castillo Nava",
        nota: "Aplicó práctica de laboratorio pendiente de Química con apoyo en conceptos de Física.",
      },
    },
    {
      id: "ab06",
      fecha: "2026-05-14",
      tipo: "enfermedad",
      motivo: "Dolor de espalda severo. Envió mensaje a las 6:50 am.",
      cobertura: null,
    },
  ],
  b09: [
    {
      id: "ab07",
      fecha: "2026-04-22",
      tipo: "injustificada",
      motivo:
        "No se presentó sin previo aviso. Avisó hasta las 10 am argumentando confusión de horario.",
      cobertura: {
        cubiertoPor: "Mtro. Héctor Luna Bravo",
        nota: "Asignó investigación individual en biblioteca sobre el tema pendiente.",
      },
    },
  ],
};

const rolColor = {
  Tutor: { color: "#1D4ED8", bg: "#EFF6FF" },
  Docente: { color: "#6D28D9", bg: "#F5F3FF" },
};


  const FILTROS = [
    { val: "todos", label: "Todos" },
    { val: "tutor", label: "Tutores" },
    { val: "docente", label: "Docentes" },
  ];

  return {
    DOCENTES,
    PERFIL_EXTRA,
    TABS,
    FILTROS,
    TIPO_FALTA,
    ASISTENCIA_DATA,
    rolColor,
  };
})();
