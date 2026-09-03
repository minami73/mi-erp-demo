/* ─── MateriaRow — una fila de la tabla de Desempeño ────────────────────────
   Cada materia usa solo los rubros de su propia ponderación (varía por
   materia — ver data-bachillerato.js). Los rubros que no aplican muestran
   "—" en vez de un 0 o un vacío mudo. El chevron expande la fila con la
   barra de ponderación, el docente y el detalle de actividades/tareas. */

const {
  RUBROS,
  RUBRO_COLOR,
  estadoAcademico,
  SEMAFORO_ACADEMICO,
  promedioMateria,
} = window.CV_ALUMNOS_CONST;

const Dash = () => (
  <span style={{ fontSize: 12, color: "var(--ink-5)" }}>—</span>
);

const CeldaConteo = ({ valor }) => {
  if (!valor) return <Dash />;
  const pct =
    valor.total > 0 ? Math.round((valor.entregadas / valor.total) * 100) : 0;
  return (
    <div>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink-2)" }}>
        {valor.entregadas}/{valor.total}
      </div>
      <div
        style={{
          height: 4,
          background: "var(--line-strong)",
          borderRadius: 999,
          marginTop: 4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 999,
            background:
              pct === 100
                ? "#15803D"
                : pct >= 70
                  ? "#2563EB"
                  : pct >= 50
                    ? "#D97706"
                    : "#DC2626",
          }}
        />
      </div>
    </div>
  );
};

const CeldaProyecto = ({ valor }) => {
  if (!valor) return <Dash />;
  if (!valor.entregado)
    return (
      <span style={{ fontSize: 12, color: "var(--ink-4)" }}>Sin entregar</span>
    );
  return (
    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>
      ✓ {valor.calificacion}
    </span>
  );
};

const CeldaCalificacion = ({ valor }) => {
  if (!valor) return <Dash />;
  if (!valor.presentado)
    return (
      <span style={{ fontSize: 12, color: "var(--ink-4)" }}>Pendiente</span>
    );
  return (
    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-2)" }}>
      {valor.calificacion}
    </span>
  );
};

const ESTADO_ENTREGA = {
  entregada: { label: "Entregada", color: "#15803D", bg: "#F0FDF4" },
  tarde: { label: "Con retraso", color: "#D97706", bg: "#FFFBEB" },
  pendiente: { label: "Pendiente", color: "#8B8F9C", bg: "var(--bg-sunk)" },
};

const PonderacionBar = ({ ponderacion }) => (
  <div>
    <div
      style={{
        display: "flex",
        height: 8,
        borderRadius: 999,
        overflow: "hidden",
        border: "1px solid var(--line)",
      }}
    >
      {ponderacion.map(({ rubro, peso }) => (
        <div
          key={rubro}
          style={{ width: `${peso}%`, background: RUBRO_COLOR[rubro] }}
          title={`${RUBROS[rubro].label} · ${peso}%`}
        />
      ))}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 }}>
      {ponderacion.map(({ rubro, peso }) => (
        <span
          key={rubro}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 12,
            color: "var(--ink-3)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 2,
              background: RUBRO_COLOR[rubro],
            }}
          />
          {RUBROS[rubro].label} {peso}%
        </span>
      ))}
    </div>
  </div>
);

const DetalleEntregas = ({ detalle }) => {
  if (!detalle || detalle.length === 0)
    return (
      <div style={{ fontSize: 12.5, color: "var(--ink-4)", padding: "8px 0" }}>
        Sin actividades ni tareas registradas aún este trimestre.
      </div>
    );
  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      {detalle.map((item, i) => {
        const e = ESTADO_ENTREGA[item.estado];
        return (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "16px 1fr 100px 110px 70px",
              gap: 10,
              alignItems: "center",
              padding: "8px 12px",
              borderBottom:
                i < detalle.length - 1 ? "1px solid var(--line)" : "none",
              background: i % 2 === 0 ? "transparent" : "var(--surface-2)",
            }}
          >
            <span
              style={{
                fontSize: 9.5,
                fontWeight: 700,
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              {item.tipo === "actividades" ? "Act" : "Tar"}
            </span>
            <span style={{ fontSize: 12.5, color: "var(--ink)" }}>
              {item.titulo}
            </span>
            <span style={{ fontSize: 11.5, color: "var(--ink-4)" }}>
              {item.fechaLimite}
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: e.color,
                background: e.bg,
                borderRadius: 999,
                padding: "2px 8px",
                textAlign: "center",
                justifySelf: "start",
              }}
            >
              {e.label}
            </span>
            <span
              style={{ fontSize: 12.5, fontWeight: 600, textAlign: "right" }}
            >
              {item.calificacion ?? "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const MateriaRow = ({ materia, registro, expanded, onToggle }) => {
  const promedio = promedioMateria(registro, materia.ponderacion);
  const estado = estadoAcademico(promedio);

  return (
    <div style={{ borderBottom: "1px solid var(--line)" }}>
      <div
        onClick={onToggle}
        style={{
          display: "grid",
          gridTemplateColumns: "26px 1.4fr 1fr 1fr 1fr 1fr 1fr 90px",
          gap: 8,
          padding: "10px 20px",
          alignItems: "center",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--bg-sunk)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <Icon
          name="chevron-down"
          size={14}
          style={{
            transform: expanded ? "rotate(180deg)" : "none",
            transition: "transform .15s",
            color: "var(--ink-4)",
          }}
        />
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>
            {materia.nombre}
          </div>
          <div style={{ fontSize: 11, color: "var(--ink-4)" }}>
            {materia.docente}
          </div>
        </div>
        <CeldaConteo valor={registro.actividades} />
        <CeldaConteo valor={registro.tareas} />
        <CeldaProyecto valor={registro.proyecto} />
        <CeldaCalificacion valor={registro.examen_parcial} />
        <CeldaCalificacion valor={registro.examen_periodo} />
        <div style={{ textAlign: "right" }}>
          {promedio !== null ? (
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: SEMAFORO_ACADEMICO[estado]?.color,
              }}
            >
              {promedio}
            </span>
          ) : (
            <Dash />
          )}
        </div>
      </div>

      {expanded && (
        <div
          style={{
            padding: "16px 20px 20px 46px",
            background: "var(--surface-2)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
                marginBottom: 8,
              }}
            >
              Ponderación de {materia.nombre}
            </div>
            <PonderacionBar ponderacion={materia.ponderacion} />
          </div>

          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".06em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
              marginBottom: 8,
            }}
          >
            Actividades y tareas
          </div>
          <DetalleEntregas detalle={registro.detalle} />
        </div>
      )}
    </div>
  );
};

window.MateriaRow = MateriaRow;
