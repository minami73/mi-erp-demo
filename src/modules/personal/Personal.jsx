/* ─── Personal (genérico por sección) ──────────────────────────────────────
   Un solo componente para todas las secciones. Recibe `config` con la data
   (window.CV_PERSONAL.<seccion>, ver data-*.js). Los tabs se muestran según
   el arreglo TABS de la config; los datasets ausentes simplemente no se usan. */

const Personal = ({ config }) => {
  const {
    DOCENTES,
    PERFIL_EXTRA,
    TABS,
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
    FILTROS, // opciones del filtro de rol en la lista (varían por sección)
  } = config;

  const RolChip = ({ rol }) => {
    const m = rolColor[rol] || { color: "#64748B", bg: "#F1F5F9" };
    return (
      <span
        style={{
          display: "inline-block",
          padding: "2px 9px",
          borderRadius: 6,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".04em",
          color: m.color,
          background: m.bg,
        }}
      >
        {rol}
      </span>
    );
  };

  const Initials = ({ text, size = 34 }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        background: "var(--line-strong, #E2E8F0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.32,
        fontWeight: 700,
        color: "var(--ink-3)",
      }}
    >
      {text}
    </div>
  );

  // ── Cuerpo original del módulo ──
  const [filtro, setFiltro] = React.useState("todos");
  const [busqueda, setBusqueda] = React.useState("");
  const [seleccionado, setSeleccionado] = React.useState(null);
  const [tabActivo, setTabActivo] = React.useState("perfil");

  const docentes = DOCENTES.filter((d) => {
    const pasaFiltro =
      filtro === "todos" || d.rol.toLowerCase().replace("-", "") === filtro;
    const pasaBusqueda =
      !busqueda ||
      d.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      d.materias.some((m) => m.toLowerCase().includes(busqueda.toLowerCase()));
    return pasaFiltro && pasaBusqueda;
  });

  if (seleccionado) {
    const extra = PERFIL_EXTRA[seleccionado.id] || {};
    const idx = docentes.findIndex((d) => d.id === seleccionado.id);
    const prevDocente = idx > 0 ? docentes[idx - 1] : null;
    const nextDocente = idx < docentes.length - 1 ? docentes[idx + 1] : null;

    const TabPerfil = () => (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Datos personales */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
              marginBottom: 16,
            }}
          >
            Datos personales
          </div>
          {[
            { label: "Edad", valor: extra.edad ? `${extra.edad} años` : "—" },
            { label: "Teléfono", valor: extra.telefono || "—" },
            { label: "Correo", valor: extra.email || "—" },
            { label: "Grado académico", valor: extra.grado || "—" },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid var(--line)",
                fontSize: 13,
              }}
            >
              <span style={{ color: "var(--ink-3)" }}>{f.label}</span>
              <span
                style={{
                  color: "var(--ink)",
                  fontWeight: 500,
                  textAlign: "right",
                  maxWidth: 220,
                }}
              >
                {f.valor}
              </span>
            </div>
          ))}
        </div>
        {/* Datos laborales */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
              marginBottom: 16,
            }}
          >
            Datos laborales
          </div>
          {[
            { label: "Rol", valor: seleccionado.rol },
            {
              label: "Antigüedad",
              valor: extra.antiguedad
                ? `${extra.antiguedad} año${extra.antiguedad !== 1 ? "s" : ""}`
                : "—",
            },
            { label: "Materias", valor: seleccionado.materias.join(", ") },
            { label: "Grupos", valor: seleccionado.grupos.join(", ") },
          ].map((f) => (
            <div
              key={f.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid var(--line)",
                fontSize: 13,
              }}
            >
              <span style={{ color: "var(--ink-3)" }}>{f.label}</span>
              <span
                style={{
                  color: "var(--ink)",
                  fontWeight: 500,
                  textAlign: "right",
                  maxWidth: 220,
                }}
              >
                {f.valor}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

    const TabObservaciones = () => {
      const obs = OBSERVACIONES_DATA[seleccionado.id] || [];

      const EstadoIcon = ({ val }) => {
        if (val === "si")
          return (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#DCFCE7",
                color: "#16A34A",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ✓
            </span>
          );
        if (val === "no")
          return (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#FEE2E2",
                color: "#DC2626",
                fontSize: 12,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ✗
            </span>
          );
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#FEF9C3",
              color: "#CA8A04",
              fontSize: 11,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            ~
          </span>
        );
      };

      if (obs.length === 0)
        return (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "var(--ink-4)",
              fontSize: 14,
            }}
          >
            Sin observaciones registradas
          </div>
        );

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {obs.map((o) => (
            <div
              key={o.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "18px 20px",
              }}
            >
              {/* Header de la card */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink)",
                  }}
                >
                  {o.fecha}
                </span>
                <span
                  style={{
                    background: "var(--surface-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 20,
                    padding: "2px 10px",
                    fontSize: 12,
                    color: "var(--ink-2)",
                  }}
                >
                  {o.materia}
                </span>
              </div>

              {/* Checklist */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px 16px",
                  marginBottom: 14,
                }}
              >
                {Object.entries(o.checklist).map(([key, val]) => (
                  <div
                    key={key}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <EstadoIcon val={val} />
                    <span style={{ fontSize: 13, color: "var(--ink-2)" }}>
                      {CHECKLIST_LABELS[key]}
                    </span>
                  </div>
                ))}
              </div>

              {/* Notas */}
              {o.notas && (
                <div
                  style={{
                    borderTop: "1px solid var(--line)",
                    paddingTop: 12,
                    fontSize: 13,
                    color: "var(--ink-3)",
                    lineHeight: 1.5,
                  }}
                >
                  {o.notas}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };

    const TabAvance = () => {
      const esTitular = seleccionado.rol === "Titular";
      const rawAvance = AVANCE_DATA[seleccionado.id] || [];

      const filas = esTitular
        ? MATERIAS_TITULAR.map((m) => {
            const a = rawAvance.find((x) => x.materiaId === m.id);
            return {
              nombre: m.nombre,
              actual: a ? a.actual : 0,
              paginas: m.paginas,
              actualizado: a ? a.actualizado : null,
            };
          })
        : rawAvance.map((a) => ({
            nombre: a.nombre,
            actual: a.actual,
            paginas: a.paginas,
            actualizado: a.actualizado,
          }));

      const colorBarra = (pct) => {
        if (pct >= 80) return "#16A34A";
        if (pct >= 60) return "#2563EB";
        if (pct >= 40) return "#D97706";
        return "#DC2626";
      };

      if (filas.length === 0)
        return (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "var(--ink-4)",
              fontSize: 14,
            }}
          >
            Sin datos de avance registrados
          </div>
        );

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filas.map((f) => {
            const pct = Math.round((f.actual / f.paginas) * 100);
            const color = colorBarra(pct);
            return (
              <div
                key={f.nombre}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "14px 18px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {f.nombre}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color,
                    }}
                  >
                    {pct}%
                  </span>
                </div>

                {/* Barra de progreso */}
                <div
                  style={{
                    height: 8,
                    background: "var(--surface-2)",
                    borderRadius: 99,
                    overflow: "hidden",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${pct}%`,
                      background: color,
                      borderRadius: 99,
                      transition: "width .4s ease",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "var(--ink-4)",
                  }}
                >
                  <span>
                    Pág. {f.actual} / {f.paginas}
                  </span>
                  {f.actualizado && <span>Actualizado: {f.actualizado}</span>}
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const TabEntrevistas = () => {
      const entrevistas = ENTREVISTAS_DATA[seleccionado.id] || [];

      if (entrevistas.length === 0)
        return (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "var(--ink-4)",
              fontSize: 14,
            }}
          >
            Sin entrevistas registradas
          </div>
        );

      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {entrevistas.map((e) => (
            <div
              key={e.id}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: 10,
                padding: "16px 20px",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {e.alumno}
                  </span>
                  <span
                    style={{
                      background: "var(--surface-2)",
                      border: "1px solid var(--line)",
                      borderRadius: 20,
                      padding: "2px 8px",
                      fontSize: 12,
                      color: "var(--ink-3)",
                    }}
                  >
                    {e.grupo}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: "var(--ink-4)" }}>
                    {e.fecha}
                  </span>
                  <span
                    style={{
                      borderRadius: 20,
                      padding: "2px 10px",
                      fontSize: 12,
                      fontWeight: 600,
                      background:
                        e.seguimiento === "completado" ? "#DCFCE7" : "#FEF9C3",
                      color:
                        e.seguimiento === "completado" ? "#16A34A" : "#CA8A04",
                    }}
                  >
                    {e.seguimiento === "completado"
                      ? "Completado"
                      : "Pendiente"}
                  </span>
                </div>
              </div>

              {/* Motivo */}
              <div style={{ marginBottom: 8 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--ink-4)",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    fontWeight: 600,
                  }}
                >
                  Motivo
                </span>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 13,
                    color: "var(--ink-2)",
                  }}
                >
                  {e.motivo}
                </p>
              </div>

              {/* Acuerdos */}
              <div>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--ink-4)",
                    textTransform: "uppercase",
                    letterSpacing: ".05em",
                    fontWeight: 600,
                  }}
                >
                  Acuerdos
                </span>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 13,
                    color: "var(--ink-3)",
                    lineHeight: 1.5,
                  }}
                >
                  {e.acuerdos}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    };

    const TabIncidenciasAula = () => {
      const todas = INCIDENCIAS_AULA_DATA[seleccionado.id] || [];
      const [filtroEstado, setFiltroEstado] = React.useState("todas");

      const incidencias = todas.filter((i) =>
        filtroEstado === "todas" ? true : i.estado === filtroEstado,
      );

      const cntActivas = todas.filter((i) => i.estado === "activa").length;

      if (todas.length === 0)
        return (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "var(--ink-4)",
              fontSize: 14,
            }}
          >
            Sin incidencias registradas
          </div>
        );

      return (
        <div>
          {/* Filtro */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { val: "todas", label: `Todas (${todas.length})` },
                { val: "activa", label: `Activas (${cntActivas})` },
                {
                  val: "resuelta",
                  label: `Resueltas (${todas.length - cntActivas})`,
                },
              ].map((op) => (
                <button
                  key={op.val}
                  onClick={() => setFiltroEstado(op.val)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: "1px solid",
                    fontSize: 12,
                    fontWeight: filtroEstado === op.val ? 600 : 400,
                    cursor: "pointer",
                    borderColor:
                      filtroEstado === op.val
                        ? "var(--brand, #2563EB)"
                        : "var(--line)",
                    background:
                      filtroEstado === op.val
                        ? "var(--brand, #2563EB)"
                        : "none",
                    color: filtroEstado === op.val ? "#fff" : "var(--ink-3)",
                  }}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          {incidencias.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 0",
                color: "var(--ink-4)",
                fontSize: 13,
              }}
            >
              Sin resultados
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {incidencias.map((inc) => {
                const tipo =
                  TIPO_INCIDENCIA_AULA[inc.tipo] || TIPO_INCIDENCIA_AULA.otro;
                return (
                  <div
                    key={inc.id}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 10,
                      padding: "14px 18px",
                    }}
                  >
                    {/* Fila superior */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 10,
                      }}
                    >
                      <span style={{ fontSize: 12, color: "var(--ink-4)" }}>
                        {inc.fecha}
                      </span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--ink)",
                        }}
                      >
                        {inc.alumno}
                      </span>
                      <span
                        style={{
                          background: "var(--surface-2)",
                          border: "1px solid var(--line)",
                          borderRadius: 20,
                          padding: "2px 8px",
                          fontSize: 12,
                          color: "var(--ink-3)",
                        }}
                      >
                        {inc.grupo}
                      </span>
                      <span
                        style={{
                          borderRadius: 20,
                          padding: "2px 10px",
                          fontSize: 12,
                          fontWeight: 500,
                          background: tipo.bg,
                          color: tipo.color,
                        }}
                      >
                        {tipo.label}
                      </span>
                      <span
                        style={{
                          marginLeft: "auto",
                          borderRadius: 20,
                          padding: "2px 10px",
                          fontSize: 12,
                          fontWeight: 600,
                          background:
                            inc.estado === "activa" ? "#FEF9C3" : "#DCFCE7",
                          color:
                            inc.estado === "activa" ? "#CA8A04" : "#16A34A",
                        }}
                      >
                        {inc.estado === "activa" ? "Activa" : "Resuelta"}
                      </span>
                    </div>

                    {/* Descripción */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      {inc.descripcion}
                    </p>

                    {/* Resolución */}
                    {inc.resolucion && (
                      <div
                        style={{
                          marginTop: 10,
                          paddingTop: 10,
                          borderTop: "1px solid var(--line)",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: "var(--ink-4)",
                            textTransform: "uppercase",
                            letterSpacing: ".05em",
                          }}
                        >
                          Resolución
                        </span>
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontSize: 13,
                            color: "var(--ink-3)",
                            lineHeight: 1.5,
                          }}
                        >
                          {inc.resolucion}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    };

    const TabActasAdmin = () => {
      const todas = ACTAS_DATA[seleccionado.id] || [];
      const [filtro, setFiltro] = React.useState("todas");

      const actas = todas.filter((a) =>
        filtro === "todas" ? true : a.estado === filtro,
      );

      const cnt = (est) => todas.filter((a) => a.estado === est).length;

      if (todas.length === 0)
        return (
          <div
            style={{
              textAlign: "center",
              padding: "48px 0",
              color: "var(--ink-4)",
              fontSize: 14,
            }}
          >
            Sin actas administrativas registradas
          </div>
        );

      return (
        <div>
          {/* Filtro */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 16,
              flexWrap: "wrap",
            }}
          >
            {[
              { val: "todas", label: `Todas (${todas.length})` },
              {
                val: "pendiente_firma",
                label: `Pendiente firma (${cnt("pendiente_firma")})`,
              },
              { val: "firmada", label: `Firmadas (${cnt("firmada")})` },
              { val: "impugnada", label: `Impugnadas (${cnt("impugnada")})` },
            ].map((op) => (
              <button
                key={op.val}
                onClick={() => setFiltro(op.val)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 20,
                  border: "1px solid",
                  fontSize: 12,
                  fontWeight: filtro === op.val ? 600 : 400,
                  cursor: "pointer",
                  borderColor:
                    filtro === op.val ? "var(--brand, #2563EB)" : "var(--line)",
                  background:
                    filtro === op.val ? "var(--brand, #2563EB)" : "none",
                  color: filtro === op.val ? "#fff" : "var(--ink-3)",
                }}
              >
                {op.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          {actas.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 0",
                color: "var(--ink-4)",
                fontSize: 13,
              }}
            >
              Sin resultados
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {actas.map((a) => {
                const tipo = TIPO_ACTA[a.tipo] || TIPO_ACTA.otro;
                const estado =
                  ESTADO_ACTA[a.estado] || ESTADO_ACTA.pendiente_firma;
                return (
                  <div
                    key={a.id}
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--line)",
                      borderRadius: 10,
                      padding: "14px 18px",
                    }}
                  >
                    {/* Fila superior */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 8,
                        marginBottom: 10,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 12,
                          color: "var(--ink-4)",
                          background: "var(--surface-2)",
                          border: "1px solid var(--line)",
                          borderRadius: 4,
                          padding: "1px 6px",
                        }}
                      >
                        {a.folio}
                      </span>
                      <span style={{ fontSize: 12, color: "var(--ink-4)" }}>
                        {a.fecha}
                      </span>
                      <span
                        style={{
                          borderRadius: 20,
                          padding: "2px 10px",
                          fontSize: 12,
                          fontWeight: 500,
                          background: tipo.bg,
                          color: tipo.color,
                        }}
                      >
                        {tipo.label}
                      </span>
                      <span
                        style={{
                          marginLeft: "auto",
                          borderRadius: 20,
                          padding: "2px 10px",
                          fontSize: 12,
                          fontWeight: 600,
                          background: estado.bg,
                          color: estado.color,
                        }}
                      >
                        {estado.label}
                      </span>
                    </div>

                    {/* Descripción */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}
                    >
                      {a.descripcion}
                    </p>

                    {/* Consecuencia */}
                    <div
                      style={{
                        marginTop: 10,
                        paddingTop: 10,
                        borderTop: "1px solid var(--line)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: "var(--ink-4)",
                          textTransform: "uppercase",
                          letterSpacing: ".05em",
                        }}
                      >
                        Consecuencia
                      </span>
                      <p
                        style={{
                          margin: "3px 0 0",
                          fontSize: 13,
                          color: "var(--ink-3)",
                          lineHeight: 1.5,
                        }}
                      >
                        {a.consecuencia}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    };

    const TabPuntualidad = () => {
      const retardos = RETARDOS_DATA[seleccionado.id] || [];
      const total = retardos.length;
      const promedio = total
        ? Math.round(retardos.reduce((s, r) => s + r.minutos, 0) / total)
        : 0;
      const peor = total ? Math.max(...retardos.map((r) => r.minutos)) : 0;
      const fmtF = (iso) => {
        const [y, m, d] = iso.split("-");
        const ms = [
          "ene",
          "feb",
          "mar",
          "abr",
          "may",
          "jun",
          "jul",
          "ago",
          "sep",
          "oct",
          "nov",
          "dic",
        ];
        return `${Number(d)} ${ms[Number(m) - 1]} ${y}`;
      };
      const semColor = (min) =>
        min >= 30 ? "#B91C1C" : min >= 15 ? "#B45309" : "#64748B";
      return (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {[
              {
                label: "Total retardos",
                valor: total,
                color:
                  total === 0 ? "#15803D" : total <= 2 ? "#B45309" : "#B91C1C",
              },
              {
                label: "Promedio",
                valor: total ? `${promedio} min` : "—",
                color: "var(--ink)",
              },
              {
                label: "Mayor retardo",
                valor: total ? `${peor} min` : "—",
                color:
                  peor >= 30
                    ? "#B91C1C"
                    : peor >= 15
                      ? "#B45309"
                      : "var(--ink)",
              },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 700, color: c.color }}>
                  {c.valor}
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "150px 100px 100px 1fr",
                padding: "8px 20px",
                background: "var(--bg-sunk,#F8F9FB)",
                borderBottom: "1px solid var(--line)",
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--ink-4)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              <span>Fecha</span>
              <span>Llegada</span>
              <span>Minutos</span>
              <span>Observación</span>
            </div>
            {total === 0 ? (
              <div
                style={{
                  padding: "36px",
                  textAlign: "center",
                  fontSize: 13,
                  color: "var(--ink-4)",
                }}
              >
                Sin retardos registrados este ciclo ✓
              </div>
            ) : (
              retardos.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "150px 100px 100px 1fr",
                    padding: "10px 20px",
                    borderBottom:
                      i < retardos.length - 1
                        ? "1px solid var(--line)"
                        : "none",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    {fmtF(r.fecha)}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                    }}
                  >
                    {r.llegada}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: semColor(r.minutos),
                    }}
                  >
                    +{r.minutos} min
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
                    {r.obs}
                  </span>
                </div>
              ))
            )}
          </div>
          {total > 0 && (
            <p style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 10 }}>
              Entrada oficial: 07:00 h
            </p>
          )}
        </div>
      );
    };

    const TabPlaneaciones = () => {
      const [bim, setBim] = React.useState("5");
      const rows = buildPlaneaciones(seleccionado.id, bim);
      const aTime = rows.filter((r) => r.estado === "a_tiempo").length;
      const tarde = rows.filter((r) => r.estado === "tarde").length;
      const noEnt = rows.filter((r) => r.estado === "no_entregada").length;
      const pct = rows.length ? Math.round((aTime / rows.length) * 100) : 100;
      const fmtF = (iso) => {
        if (!iso) return "—";
        const [y, m, d] = iso.split("-");
        const ms = [
          "ene",
          "feb",
          "mar",
          "abr",
          "may",
          "jun",
          "jul",
          "ago",
          "sep",
          "oct",
          "nov",
          "dic",
        ];
        return `${Number(d)} ${ms[Number(m) - 1]}`;
      };
      return (
        <div>
          {/* Selector bimestre */}
          <div
            style={{
              display: "flex",
              gap: 4,
              background: "var(--line)",
              borderRadius: 8,
              padding: 3,
              width: "fit-content",
              marginBottom: 16,
            }}
          >
            {["3", "4", "5"].map((b) => (
              <button
                key={b}
                onClick={() => setBim(b)}
                style={{
                  padding: "5px 14px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: bim === b ? 600 : 400,
                  background: bim === b ? "var(--surface)" : "transparent",
                  color: bim === b ? "var(--ink)" : "var(--ink-3)",
                  boxShadow: bim === b ? "0 1px 3px rgba(0,0,0,.08)" : "none",
                  transition: "all .15s",
                }}
              >
                {b}° Bim
              </button>
            ))}
          </div>
          {/* Cards resumen */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {[
              { label: "Semanas", valor: rows.length, color: "var(--ink)" },
              { label: "A tiempo", valor: aTime, color: "#15803D" },
              { label: "Con retraso", valor: tarde, color: "#B45309" },
              { label: "No entregadas", valor: noEnt, color: "#B91C1C" },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 700, color: c.color }}>
                  {c.valor}
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>
          {/* Barra cumplimiento */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              padding: "14px 20px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{ fontSize: 13, color: "var(--ink-3)", minWidth: 110 }}
            >
              Cumplimiento
            </span>
            <div
              style={{
                flex: 1,
                height: 8,
                borderRadius: 999,
                background: "var(--line-strong,#E2E8F0)",
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
                      : pct >= 80
                        ? "#2563EB"
                        : pct >= 60
                          ? "#D97706"
                          : "#DC2626",
                  transition: "width .3s",
                }}
              />
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                minWidth: 40,
                color:
                  pct === 100
                    ? "#15803D"
                    : pct >= 80
                      ? "#2563EB"
                      : pct >= 60
                        ? "#D97706"
                        : "#DC2626",
              }}
            >
              {pct}%
            </span>
          </div>
          {/* Tabla */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 110px 110px 130px",
                padding: "8px 20px",
                background: "var(--bg-sunk,#F8F9FB)",
                borderBottom: "1px solid var(--line)",
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--ink-4)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              <span>Semana</span>
              <span>Período</span>
              <span>Límite</span>
              <span>Entregada</span>
              <span>Estado</span>
            </div>
            {rows.map((r, i) => {
              const meta = ESTADO_PLAN[r.estado];
              return (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 110px 110px 130px",
                    padding: "10px 20px",
                    borderBottom:
                      i < rows.length - 1 ? "1px solid var(--line)" : "none",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--ink)",
                    }}
                  >
                    {r.sem}
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
                    {r.label}
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
                    {fmtF(r.limite)}
                  </span>
                  <span
                    style={{
                      fontSize: 12.5,
                      color:
                        r.estado === "a_tiempo"
                          ? "var(--ink-3)"
                          : r.estado === "tarde"
                            ? "#B45309"
                            : "var(--ink-4)",
                    }}
                  >
                    {fmtF(r.entrega)}
                  </span>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "2px 9px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 700,
                      color: meta.color,
                      background: meta.bg,
                      width: "fit-content",
                    }}
                  >
                    {meta.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const TabAsistencia = () => {
      const faltas = ASISTENCIA_DATA[seleccionado.id] || [];
      const conteo = { enfermedad: 0, justificada: 0, injustificada: 0 };
      faltas.forEach((f) => {
        if (conteo[f.tipo] !== undefined) conteo[f.tipo]++;
      });
      const fmtFecha = (iso) => {
        const [y, m, d] = iso.split("-");
        const meses = [
          "ene",
          "feb",
          "mar",
          "abr",
          "may",
          "jun",
          "jul",
          "ago",
          "sep",
          "oct",
          "nov",
          "dic",
        ];
        return `${Number(d)} ${meses[Number(m) - 1]} ${y}`;
      };
      return (
        <div>
          {/* Resumen */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
              marginBottom: 20,
            }}
          >
            {[
              {
                label: "Total faltas",
                valor: faltas.length,
                color: "var(--ink)",
              },
              {
                label: "Por enfermedad",
                valor: conteo.enfermedad,
                color: "#B45309",
              },
              {
                label: "Justificadas",
                valor: conteo.justificada,
                color: "#1D4ED8",
              },
              {
                label: "Injustificadas",
                valor: conteo.injustificada,
                color: "#B91C1C",
              },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--line)",
                  borderRadius: 10,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 26, fontWeight: 700, color: c.color }}>
                  {c.valor}
                </div>
                <div
                  style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}
                >
                  {c.label}
                </div>
              </div>
            ))}
          </div>
          {/* Historial */}
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--line)",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "130px 130px 1fr",
                padding: "8px 20px",
                background: "var(--bg-sunk, #F8F9FB)",
                borderBottom: "1px solid var(--line)",
                fontSize: 11.5,
                fontWeight: 600,
                color: "var(--ink-4)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              <span>Fecha</span>
              <span>Tipo</span>
              <span>Motivo</span>
            </div>
            {faltas.length === 0 ? (
              <div
                style={{
                  padding: "36px",
                  textAlign: "center",
                  fontSize: 13,
                  color: "var(--ink-4)",
                }}
              >
                Sin faltas registradas este ciclo ✓
              </div>
            ) : (
              faltas.map((f, i) => {
                const meta = TIPO_FALTA[f.tipo];
                return (
                  <div
                    key={i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "130px 130px 1fr",
                      padding: "11px 20px",
                      borderBottom:
                        i < faltas.length - 1
                          ? "1px solid var(--line)"
                          : "none",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                      {fmtFecha(f.fecha)}
                    </span>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 9px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 700,
                        color: meta.color,
                        background: meta.bg,
                        width: "fit-content",
                      }}
                    >
                      {meta.label}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--ink)" }}>
                      {f.motivo}
                      {/* Cobertura: solo secciones que la registran (ej. bachillerato) */}
                      {f.cobertura && (
                        <span
                          style={{
                            display: "block",
                            fontSize: 12,
                            color: "var(--ink-3)",
                            marginTop: 3,
                          }}
                        >
                          Cubrió: <strong>{f.cobertura.cubiertoPor}</strong>
                          {f.cobertura.nota ? ` — ${f.cobertura.nota}` : ""}
                        </span>
                      )}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      );
    };

    const TabPlaceholder = ({ nombre }) => (
      <div
        style={{
          padding: "48px 0",
          textAlign: "center",
          color: "var(--ink-4)",
          fontSize: 14,
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 10,
        }}
      >
        {nombre} — próxima feature
      </div>
    );

    return (
      <div style={{ padding: "28px 32px", maxWidth: 900, margin: "0 auto" }}>
        {/* Back */}
        <button
          onClick={() => {
            setSeleccionado(null);
            setTabActivo("perfil");
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            color: "var(--ink-3)",
            padding: 0,
            marginBottom: 24,
          }}
        >
          ← Regresar a la lista
        </button>

        {/* Header card */}
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            padding: "24px 28px",
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 4,
          }}
        >
          <Initials text={seleccionado.iniciales} size={60} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>
              {seleccionado.nombre}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginTop: 7,
                flexWrap: "wrap",
              }}
            >
              <RolChip rol={seleccionado.rol} />
              <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                {seleccionado.materias.join(", ")}
              </span>
              <span style={{ fontSize: 13, color: "var(--ink-4)" }}>·</span>
              <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                {seleccionado.grupos.length > 4
                  ? `${seleccionado.grupos.slice(0, 4).join(", ")} +${seleccionado.grupos.length - 4}`
                  : seleccionado.grupos.join(", ")}
              </span>
              {extra.antiguedad && (
                <>
                  <span style={{ fontSize: 13, color: "var(--ink-4)" }}>·</span>
                  <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    {extra.antiguedad} año{extra.antiguedad !== 1 ? "s" : ""} en
                    el colegio
                  </span>
                </>
              )}
            </div>
          </div>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: seleccionado.activo ? "#16A34A" : "#94A3B8",
              flexShrink: 0,
            }}
          />
          {/* Navegación prev/next */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              marginLeft: 8,
            }}
          >
            <button
              onClick={() => setSeleccionado(prevDocente)}
              disabled={!prevDocente}
              title={prevDocente ? prevDocente.nombre : ""}
              style={{
                background: "none",
                border: "1px solid var(--line)",
                borderRadius: 6,
                cursor: prevDocente ? "pointer" : "not-allowed",
                opacity: prevDocente ? 1 : 0.35,
                padding: "4px 6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon name="chevron-left" size={15} stroke={2} />
            </button>
            <span
              style={{
                fontSize: 12,
                color: "var(--ink-4)",
                minWidth: 36,
                textAlign: "center",
              }}
            >
              {idx + 1} / {docentes.length}
            </span>
            <button
              onClick={() => setSeleccionado(nextDocente)}
              disabled={!nextDocente}
              title={nextDocente ? nextDocente.nombre : ""}
              style={{
                background: "none",
                border: "1px solid var(--line)",
                borderRadius: 6,
                cursor: nextDocente ? "pointer" : "not-allowed",
                opacity: nextDocente ? 1 : 0.35,
                padding: "4px 6px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Icon name="chevron-right" size={15} stroke={2} />
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid var(--line)",
            marginBottom: 20,
            gap: 0,
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTabActivo(t.id)}
              style={{
                padding: "10px 16px",
                background: "none",
                border: "none",
                borderBottom:
                  tabActivo === t.id
                    ? "2px solid var(--brand, #2563EB)"
                    : "2px solid transparent",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: tabActivo === t.id ? 600 : 400,
                color:
                  tabActivo === t.id ? "var(--brand, #2563EB)" : "var(--ink-3)",
                marginBottom: -1,
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "color .15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tabActivo === "perfil" && <TabPerfil />}
        {tabActivo === "asistencia" && <TabAsistencia />}
        {tabActivo === "planeaciones" && <TabPlaneaciones />}
        {tabActivo === "puntualidad" && <TabPuntualidad />}
        {tabActivo === "observaciones" && <TabObservaciones />}
        {tabActivo === "avance" && <TabAvance />}
        {tabActivo === "entrevistas" && <TabEntrevistas />}
        {tabActivo === "incidenciasaula" && <TabIncidenciasAula />}
        {tabActivo === "actasadmin" && <TabActasAdmin />}
      </div>
    );
  }

  return (
    <div style={{ padding: "28px 32px", maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink-3)" }}>
          <strong style={{ color: "var(--ink)" }}>{docentes.length}</strong>{" "}
          {docentes.length === DOCENTES.length
            ? `docentes · Primaria`
            : `de ${DOCENTES.length} docentes`}
        </p>

        {/* Buscador + Filtro */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 9,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 13,
                color: "var(--ink-4)",
                pointerEvents: "none",
              }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar docente…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{
                height: 32,
                paddingLeft: 28,
                paddingRight: busqueda ? 26 : 10,
                fontSize: 13,
                border: "1px solid var(--line)",
                borderRadius: 8,
                background: "var(--surface)",
                color: "var(--ink)",
                outline: "none",
                width: 180,
              }}
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                style={{
                  position: "absolute",
                  right: 7,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  color: "var(--ink-4)",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            )}
          </div>

          <div
            style={{
              display: "flex",
              gap: 4,
              background: "var(--line)",
              borderRadius: 8,
              padding: 3,
            }}
          >
            {FILTROS.map((opt) => (
              <button
                key={opt.val}
                onClick={() => setFiltro(opt.val)}
                style={{
                  padding: "5px 14px",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: filtro === opt.val ? 600 : 400,
                  background:
                    filtro === opt.val ? "var(--surface)" : "transparent",
                  color: filtro === opt.val ? "var(--ink)" : "var(--ink-3)",
                  boxShadow:
                    filtro === opt.val ? "0 1px 3px rgba(0,0,0,.08)" : "none",
                  transition: "all .15s",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {/* Encabezado */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 110px 140px 1fr 70px",
            padding: "9px 20px",
            background: "var(--bg-sunk, #F8F9FB)",
            borderBottom: "1px solid var(--line)",
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".06em",
            textTransform: "uppercase",
          }}
        >
          <span>Docente</span>
          <span>Rol</span>
          <span>Materia(s)</span>
          <span>Grupos</span>
          <span style={{ textAlign: "center" }}>Estado</span>
        </div>

        {docentes.map((d, i) => (
          <div
            key={d.id}
            onClick={() => setSeleccionado(d)}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 110px 140px 1fr 70px",
              padding: "11px 20px",
              borderBottom:
                i < docentes.length - 1 ? "1px solid var(--line)" : "none",
              alignItems: "center",
              cursor: "pointer",
              transition: "background .12s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--bg-sunk, #F8F9FB)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Initials text={d.iniciales} size={32} />
              <span
                style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}
              >
                {d.nombre}
              </span>
            </div>

            <div>
              <RolChip rol={d.rol} />
            </div>

            <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>
              {d.materias.join(", ")}
            </div>

            <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
              {d.grupos.length > 3
                ? `${d.grupos.slice(0, 3).join(", ")} +${d.grupos.length - 3}`
                : d.grupos.join(", ")}
            </div>

            <div style={{ textAlign: "center" }}>
              <span
                style={{
                  display: "inline-block",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: d.activo ? "#16A34A" : "#94A3B8",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 10 }}>
        Clic en un docente para ver su expediente completo.
      </p>
    </div>
  );
};

window.Personal = Personal;
