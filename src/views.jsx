/* ─── Registro central de vistas ──────────────────────────────────────────
   Equivalente demo del routes/index.ts del backend: cada módulo se registra
   aquí con su título, breadcrumbs y render. App.jsx solo hace lookup.
   Agregar un módulo = su script tag en index.html + una entrada aquí. */

window.CV_VIEWS = {
  calendario: {
    title: "Calendario institucional",
    subtitle: "Mayo 2026 · Ciclo escolar 2025–2026",
    breadcrumbs: ["Módulos", "Calendario"],
    render: (ctx) => (
      <Calendar
        openEvent={ctx.openEvent}
        openNew={ctx.openNew}
        events={ctx.events}
        readOnly={ctx.isReadOnly}
      />
    ),
  },
  horarios: {
    title: "Horarios",
    subtitle: "Horario académico y talleres extraescolares · Semana 25–29 mayo",
    breadcrumbs: ["Módulos", "Horarios"],
    render: () => <Horarios />,
  },
  incidencias: {
    title: "Incidencias disciplinarias",
    subtitle: "Seguimiento de antecedentes por alumno · Ciclo 2025–2026",
    breadcrumbs: ["Módulos", "Incidencias"],
    render: () => <Incidencias />,
  },
  "incidencias-docentes": {
    title: "Incidencias entre docentes",
    subtitle: "Conflictos en el aula e interpersonales · Ciclo 2025–2026",
    breadcrumbs: ["Módulos", "Incidencias docentes"],
    render: () => <IncidenciasDocentes />,
  },
  organigrama: {
    title: "Organigrama",
    subtitle: "Estructura directiva · Ciclo escolar 2025–2026",
    breadcrumbs: ["Módulos", "Organigrama"],
    render: () => <Organigrama />,
  },
  "alumnos-especiales": {
    title: "Alumnos Especiales",
    subtitle: "Expedientes y seguimiento · Acceso restringido",
    breadcrumbs: ["Módulos", "Alumnos Especiales"],
    render: () => <AlumnosEspeciales />,
  },
  reportes: {
    title: "Reportes",
    subtitle: "Tareas y actividades por alumno, materia y trimestre",
    breadcrumbs: ["Módulos", "Reportes"],
    render: () => <Reportes />,
  },
  formatos: {
    title: "Formatos",
    subtitle: "Documentos oficiales del colegio",
    breadcrumbs: ["Módulos", "Formatos"],
    render: () => <Formatos />,
  },
  "personal-primaria": {
    title: "Personal Primaria",
    subtitle: "Docentes de la sección primaria",
    breadcrumbs: ["Personal", "Primaria"],
    render: () => <Personal config={window.CV_PERSONAL.primaria} />,
  },
  "personal-bachillerato": {
    title: "Personal Bachillerato",
    subtitle: "Docentes de la sección bachillerato",
    breadcrumbs: ["Personal", "Bachillerato"],
    render: () => <Personal config={window.CV_PERSONAL.bachillerato} />,
  },
  modulos: {
    title: "Administración de módulos",
    subtitle: "Activa, desactiva y reordena los módulos del sistema",
    breadcrumbs: ["Configuración", "Módulos"],
    render: (ctx) => (
      <ModulesAdmin modules={ctx.modules} setModules={ctx.setModules} />
    ),
  },
  usuarios: {
    title: "Usuarios y roles",
    subtitle: `${window.CV_DATA.USERS.length} cuentas registradas`,
    breadcrumbs: ["Configuración", "Usuarios"],
    render: () => <UsersAdmin />,
  },
};
