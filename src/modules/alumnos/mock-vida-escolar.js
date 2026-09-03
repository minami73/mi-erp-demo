/* ─── Mock de entrevistas e incidencias por alumno ──────────────────────────
   Mismo patrón determinístico que construirDesempeno() en data-bachillerato.js:
   todo se deriva de hashAlumnos(seed) — nada de Math.random — para que el
   demo se vea igual en cada recarga. Se carga ANTES de data-bachillerato.js,
   que llama a estos generadores al construir CV_ALUMNOS.bachillerato.

   Entrevistas: mismo shape que el módulo Alumnos Especiales
   ({id, date, attendees, summary}), para no inventar un tercer formato.
   Incidencias: mismo shape EXACTO que el módulo Incidencias
   (constants.js de ese módulo), para poder pasarlas tal cual a
   window.IncidenciaItem y window.calcSemaforo sin adaptar nada. */

const RESUMENES_ENTREVISTA = [
  "Seguimiento de avance académico del trimestre; se acuerda refuerzo en las materias con rezago.",
  "Orientación vocacional: se revisan intereses y opciones de continuidad tras bachillerato.",
  "Reporte de inasistencias recurrentes; el tutor se compromete a justificar próximas faltas con anticipación.",
  "Plática sobre integración grupal y participación en clase.",
  "Revisión de conducta tras una incidencia registrada; se establecen acuerdos de seguimiento.",
  "Entrega de resultados de examen diagnóstico y plan de estudio personalizado.",
  "Solicitud del tutor para revisar la carga de tareas y los horarios de estudio en casa.",
];

const PLANTILLAS_INCIDENCIA = [
  {
    categoria: "conducta",
    gravedad: "media",
    titulo: "Conducta disruptiva en clase",
    descripcion:
      "Interrumpió reiteradamente la clase pese a llamadas de atención del docente.",
  },
  {
    categoria: "lenguaje",
    gravedad: "media",
    titulo: "Lenguaje ofensivo hacia un compañero",
    descripcion: "Uso de lenguaje inapropiado durante el receso.",
  },
  {
    categoria: "agresion",
    gravedad: "grave",
    titulo: "Altercado físico con un compañero",
    descripcion:
      "Empujones durante el cambio de clase; se separó a los alumnos de inmediato.",
  },
  {
    categoria: "dano",
    gravedad: "grave",
    titulo: "Daño a mobiliario del laboratorio",
    descripcion: "Rompió material de laboratorio durante la práctica.",
  },
  {
    categoria: "asistencia",
    gravedad: "leve",
    titulo: "Llegada tarde reiterada",
    descripcion: "Tercera llegada tarde a primera hora en el mes.",
  },
  {
    categoria: "uniforme",
    gravedad: "leve",
    titulo: "Incumplimiento de uniforme",
    descripcion: "Se presentó sin el uniforme reglamentario.",
  },
  {
    categoria: "otro",
    gravedad: "media",
    titulo: "Uso de celular durante examen",
    descripcion: "Se detectó uso de celular durante la aplicación de un examen parcial.",
  },
];

// Mismos umbrales/distribución que nivelAlumno() en data-bachillerato.js
// (18% bajo, 55% medio, 27% alto), pero calculado aquí de forma
// independiente con el mismo seed — no depende de que ese archivo cargue
// antes, solo de que ambos usen hashAlumnos con la misma semilla.
const nivelBucket = (alumnoId) => {
  const r = hashAlumnos(`nivel-${alumnoId}`) % 100;
  if (r < 18) return "bajo";
  if (r < 73) return "medio";
  return "alto";
};

const construirEntrevistas = (alumnos) => {
  const teachers = window.CV_DATA.TEACHERS;
  const map = {};
  alumnos.forEach((alumno) => {
    const h = hashAlumnos(`entrevistas-${alumno.id}`);
    const r = h % 100;
    // ~40% sin entrevistas, ~45% con 1-2, ~15% con 3-4
    const cantidad = r < 40 ? 0 : r < 85 ? 1 + (h % 2) : 3 + (h % 2);
    const entrevistas = [];
    for (let i = 0; i < cantidad; i++) {
      const hi = hashAlumnos(`entrevista-${alumno.id}-${i}`);
      const docente = teachers[hi % teachers.length];
      const mes = 2 + ((hi + i * 3) % 3); // trimestre 2: feb-abr aprox
      const dia = 1 + ((hi >> 2) % 27);
      entrevistas.push({
        id: `${alumno.id}-ent-${i}`,
        date: `2026-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`,
        attendees: `${alumno.tutor} y ${docente.name}`,
        summary: RESUMENES_ENTREVISTA[hi % RESUMENES_ENTREVISTA.length],
      });
    }
    entrevistas.sort((a, b) => b.date.localeCompare(a.date));
    map[alumno.id] = entrevistas;
  });
  return map;
};

const construirIncidencias = (alumnos) => {
  const teachers = window.CV_DATA.TEACHERS;
  const map = {};
  alumnos.forEach((alumno) => {
    const nivel = nivelBucket(alumno.id);
    const h = hashAlumnos(`incidencias-${alumno.id}`);
    const r = h % 100;
    // Alumno de nivel bajo: más probabilidad e historial más largo.
    const umbral = nivel === "bajo" ? 55 : nivel === "medio" ? 25 : 8;
    const cantidad = r < umbral ? 1 + (h % (nivel === "bajo" ? 3 : 2)) : 0;
    const incidencias = [];
    for (let i = 0; i < cantidad; i++) {
      const hi = hashAlumnos(`incidencia-${alumno.id}-${i}`);
      const plantilla = PLANTILLAS_INCIDENCIA[hi % PLANTILLAS_INCIDENCIA.length];
      const mes = 2 + ((hi + i * 3) % 3);
      const dia = 1 + ((hi >> 2) % 27);
      // La más reciente suele seguir activa; el resto del historial, resuelto.
      const activa = i === 0 && hi % 3 !== 0;
      incidencias.push({
        id: `${alumno.id}-inc-${i}`,
        alumnoId: alumno.id,
        titulo: plantilla.titulo,
        descripcion: plantilla.descripcion,
        categoria: plantilla.categoria,
        gravedad: plantilla.gravedad,
        fecha: `2026-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`,
        registradoPor: teachers[hi % teachers.length].name,
        seccion: "bachillerato",
        estado: activa ? "activa" : "resuelta",
        resolucion: activa
          ? null
          : "Se conversó con el alumno y el tutor; sin reincidencia.",
      });
    }
    incidencias.sort((a, b) => b.fecha.localeCompare(a.fecha));
    map[alumno.id] = incidencias;
  });
  return map;
};

window.CV_VIDA_ESCOLAR = { construirEntrevistas, construirIncidencias };
