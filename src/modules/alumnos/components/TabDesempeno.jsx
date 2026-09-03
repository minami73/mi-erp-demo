/* ─── TabDesempeno — rendimiento académico del alumno ───────────────────────
   Segmented de trimestre + 4 stat cards + tabla de materias (una fila
   expandible por materia, MateriaRow.jsx). Es el corazón del módulo. */

const {
  TRIMESTRES,
  RUBROS,
  estadoAcademico,
  SEMAFORO_ACADEMICO,
  promedioGeneral,
  cumplimientoEntregas,
  materiasAprobadas,
  rubrosPendientes,
} = window.CV_ALUMNOS_CONST;

const StatCard = ({ label, valor, sub, color }) => (
  <div
    style={{
      flex: 1,
      minWidth: 160,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      borderRadius: 10,
      padding: "14px 16px",
    }}
  >
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: ".04em",
        textTransform: "uppercase",
        color: "var(--ink-4)",
        marginBottom: 6,
      }}
    >
      {label}
    </div>
    <div
      style={{ fontSize: 22, fontWeight: 700, color: color || "var(--ink)" }}
    >
      {valor}
    </div>
    {sub && (
      <div style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 2 }}>
        {sub}
      </div>
    )}
  </div>
);

const TabDesempeno = ({ materias, desempeno }) => {
  const [trimestre, setTrimestre] = useState("2");
  const [expandidoId, setExpandidoId] = useState(null);

  const desTrimestre = desempeno[trimestre] || {};
  const promedio = promedioGeneral(materias, desTrimestre);
  const estado = estadoAcademico(promedio);
  const cumplimiento = cumplimientoEntregas(materias, desTrimestre);
  const aprobadas = materiasAprobadas(materias, desTrimestre);
  const pendientes = rubrosPendientes(materias, desTrimestre);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Segmented
          value={trimestre}
          onChange={setTrimestre}
          options={TRIMESTRES}
        />
      </div>

      {/* Stat cards */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}
      >
        <StatCard
          label="Promedio general"
          valor={promedio !== null ? promedio : "—"}
          sub={
            estado ? SEMAFORO_ACADEMICO[estado].label : "Sin calificaciones aún"
          }
          color={estado ? SEMAFORO_ACADEMICO[estado].color : undefined}
        />
        <StatCard
          label="Cumplimiento de entregas"
          valor={cumplimiento !== null ? `${cumplimiento}%` : "—"}
          sub="Actividades y tareas"
        />
        <StatCard
          label="Materias aprobadas"
          valor={`${aprobadas} / ${materias.length}`}
          sub="Con promedio ≥ 6.0"
        />
        <StatCard
          label="Rubros pendientes"
          valor={pendientes}
          sub="Sin calificar todavía"
        />
      </div>

      {/* Tabla de materias */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "26px 1.4fr 1fr 1fr 1fr 1fr 1fr 90px",
            gap: 8,
            padding: "10px 20px",
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--line)",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".05em",
            textTransform: "uppercase",
          }}
        >
          <span></span>
          <span>Materia</span>
          <span>{RUBROS.actividades.label}</span>
          <span>{RUBROS.tareas.label}</span>
          <span>{RUBROS.proyecto.label}</span>
          <span>{RUBROS.examen_parcial.label}</span>
          <span>{RUBROS.examen_periodo.label}</span>
          <span style={{ textAlign: "right" }}>Promedio</span>
        </div>

        {materias.map((materia) => (
          <MateriaRow
            key={materia.id}
            materia={materia}
            registro={desTrimestre[materia.id] || {}}
            expanded={expandidoId === materia.id}
            onToggle={() =>
              setExpandidoId((cur) => (cur === materia.id ? null : materia.id))
            }
          />
        ))}
      </div>
    </div>
  );
};

window.TabDesempeno = TabDesempeno;
