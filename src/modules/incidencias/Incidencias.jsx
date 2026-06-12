// ─────────────────────────────────────────────────────────────────────────────
//  INCIDENCIAS — Módulo de seguimiento disciplinario de alumnos
//  Componentes extraídos: SemaforoDot, SemaforoBadge, GravedadBadge,
//  IncidenciaItem, NuevoAlumnoModal, NuevaIncidenciaModal, SortTh
// ─────────────────────────────────────────────────────────────────────────────

const Incidencias = () => {
  const sections = window.CV_DATA.SECTIONS.filter((s) => s.id !== "general");

  const [students, setStudents] = useState(window.MOCK_STUDENTS);
  const [incidents, setIncidents] = useState(window.MOCK_INCIDENTS);
  const [seccion, setSeccion] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [alumno, setAlumno] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlumnoModal, setShowAlumnoModal] = useState(false);
  const [semaforoFilter, setSemaforoFilter] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const toggleSort = (field) => {
    setSortField((prev) => (prev === field ? prev : field));
    setSortDir((prev) =>
      sortField === field ? (prev === "asc" ? "desc" : "asc") : "asc",
    );
  };

  const toggleSemaforoFilter = (sem) => {
    setSemaforoFilter((prev) => (prev === sem ? null : sem));
    setAlumno(null);
  };

  const ordenar = (a, b) => {
    const semOrd = { rojo: 0, amarillo: 1, verde: 2 };
    if (!sortField)
      return (
        semOrd[window.calcSemaforo(a.id, incidents)] -
        semOrd[window.calcSemaforo(b.id, incidents)]
      );
    let cmp = 0;
    if (sortField === "nombre")
      cmp = `${a.apellido}, ${a.nombre}`.localeCompare(
        `${b.apellido}, ${b.nombre}`,
      );
    else if (sortField === "seccion") cmp = a.seccion.localeCompare(b.seccion);
    else if (sortField === "activas") {
      const actA = incidents.filter(
        (i) => i.alumnoId === a.id && i.estado === "activa",
      ).length;
      const actB = incidents.filter(
        (i) => i.alumnoId === b.id && i.estado === "activa",
      ).length;
      cmp = actA - actB;
    }
    return sortDir === "asc" ? cmp : -cmp;
  };

  const lista = useMemo(() => {
    let list = students;
    if (seccion) list = list.filter((s) => s.seccion === seccion);
    if (semaforoFilter)
      list = list.filter(
        (s) => window.calcSemaforo(s.id, incidents) === semaforoFilter,
      );
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      list = list.filter((s) =>
        (s.nombre + " " + s.apellido).toLowerCase().includes(q),
      );
    }
    return [...list].sort(ordenar);
  }, [
    students,
    incidents,
    seccion,
    busqueda,
    semaforoFilter,
    sortField,
    sortDir,
  ]);

  const alumnoIncs = useMemo(() => {
    if (!alumno) return [];
    return [...incidents.filter((i) => i.alumnoId === alumno.id)].sort(
      (a, b) => new Date(b.fecha) - new Date(a.fecha),
    );
  }, [alumno, incidents]);

  const stats = useMemo(
    () => ({
      rojo: students.filter(
        (s) => window.calcSemaforo(s.id, incidents) === "rojo",
      ).length,
      amarillo: students.filter(
        (s) => window.calcSemaforo(s.id, incidents) === "amarillo",
      ).length,
    }),
    [students, incidents],
  );

  const addIncident = (data) => {
    setIncidents((prev) => [
      ...prev,
      {
        id: `i${Date.now()}`,
        alumnoId: alumno.id,
        seccion: alumno.seccion,
        estado: "activa",
        resolucion: null,
        ...data,
      },
    ]);
    setShowModal(false);
  };

  const addAlumnoConIncidencia = ({ alumnoData, incData }) => {
    const newAlumno = { id: `st${Date.now()}`, ...alumnoData };
    const newInc = {
      id: `i${Date.now()}`,
      alumnoId: newAlumno.id,
      seccion: newAlumno.seccion,
      estado: "activa",
      resolucion: null,
      ...incData,
    };
    setStudents((prev) => [...prev, newAlumno]);
    setIncidents((prev) => [...prev, newInc]);
    setAlumno(newAlumno);
    setShowAlumnoModal(false);
  };

  const resolverIncidencia = (incId, texto) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === incId ? { ...i, estado: "resuelta", resolucion: texto } : i,
      ),
    );
  };

  const seccionInfo = sections.find((s) => s.id === alumno?.seccion);
  const alumnoSemaforo = alumno
    ? window.calcSemaforo(alumno.id, incidents)
    : null;
  const alumnoActivas = alumnoIncs.filter((i) => i.estado === "activa").length;

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* ── Barra de filtros ─────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 20px",
          borderBottom: "1px solid var(--line)",
          background: "var(--surface)",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setShowAlumnoModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 13px",
            borderRadius: 7,
            border: "none",
            background: "var(--brand)",
            color: "var(--brand-ink)",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <Icon name="plus" size={13} />
          Nuevo alumno
        </button>

        {stats.rojo > 0 && (
          <span
            onClick={() => toggleSemaforoFilter("rojo")}
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              background: semaforoFilter === "rojo" ? "#b91c1c" : "#fee2e2",
              color: semaforoFilter === "rojo" ? "#fff" : "#b91c1c",
              border: `1px solid ${semaforoFilter === "rojo" ? "#b91c1c" : "#fca5a5"}`,
              cursor: "pointer",
            }}
          >
            {stats.rojo} requiere{stats.rojo > 1 ? "n" : ""} atenci&oacute;n
          </span>
        )}
        {stats.amarillo > 0 && (
          <span
            onClick={() => toggleSemaforoFilter("amarillo")}
            style={{
              padding: "4px 10px",
              borderRadius: 20,
              fontSize: 12,
              fontWeight: 600,
              background: semaforoFilter === "amarillo" ? "#b45309" : "#fef9c3",
              color: semaforoFilter === "amarillo" ? "#fff" : "#b45309",
              border: `1px solid ${semaforoFilter === "amarillo" ? "#b45309" : "#fde047"}`,
              cursor: "pointer",
            }}
          >
            {stats.amarillo} en observaci&oacute;n
          </span>
        )}
        <div style={{ flex: 1 }} />
        {[{ id: null, label: "Todos" }, ...sections].map((s) => {
          const active = seccion === s.id;
          return (
            <button
              key={s.id ?? "all"}
              onClick={() => {
                setSeccion(s.id);
                setAlumno(null);
              }}
              style={{
                padding: "5px 13px",
                borderRadius: 20,
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 500,
                whiteSpace: "nowrap",
                border: active
                  ? "1.5px solid var(--brand)"
                  : "1.5px solid var(--line)",
                background: active ? "var(--brand)" : "transparent",
                color: active ? "var(--brand-ink)" : "var(--ink-2)",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* ── Contenido ────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* ── Lista de alumnos ─────────────────────────────────────────── */}
        <div
          style={{
            width: alumno ? 380 : "100%",
            minWidth: alumno ? 300 : undefined,
            display: "flex",
            flexDirection: "column",
            borderRight: alumno ? "1px solid var(--line)" : "none",
            overflow: "hidden",
            flexShrink: 0,
            transition: "width .2s",
          }}
        >
          {/* Buscador */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--ink-4)",
                  pointerEvents: "none",
                }}
              >
                <Icon name="search" size={14} />
              </span>
              <input
                type="text"
                placeholder="Buscar alumno&hellip;"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{
                  width: "100%",
                  padding: "7px 10px 7px 30px",
                  border: "1px solid var(--line)",
                  borderRadius: 7,
                  background: "var(--surface)",
                  color: "var(--ink)",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Cabecera de tabla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr 76px 52px",
              padding: "7px 16px",
              background: "var(--surface-2)",
              borderBottom: "1px solid var(--line)",
              fontSize: 10,
              fontWeight: 700,
              color: "var(--ink-4)",
              letterSpacing: ".05em",
              textTransform: "uppercase",
            }}
          >
            <div />
            <window.SortTh
              field="nombre"
              label="Alumno"
              sortField={sortField}
              sortDir={sortDir}
              onSort={toggleSort}
            />
            <window.SortTh
              field="seccion"
              label="Secci&oacute;n"
              sortField={sortField}
              sortDir={sortDir}
              onSort={toggleSort}
            />
            <window.SortTh
              field="activas"
              label="Activas"
              sortField={sortField}
              sortDir={sortDir}
              onSort={toggleSort}
              center
            />
          </div>

          {/* Filas */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {lista.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: "var(--ink-4)",
                  fontSize: 13,
                }}
              >
                Sin alumnos con esos filtros
              </div>
            ) : (
              lista.map((st) => {
                const sem = window.calcSemaforo(st.id, incidents);
                const activas = incidents.filter(
                  (i) => i.alumnoId === st.id && i.estado === "activa",
                ).length;
                const sec = sections.find((s) => s.id === st.seccion);
                const sel = alumno?.id === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => setAlumno(sel ? null : st)}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "28px 1fr 76px 52px",
                      padding: "10px 16px",
                      borderBottom: "1px solid var(--line)",
                      cursor: "pointer",
                      background: sel ? "var(--surface-2)" : "transparent",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => {
                      if (!sel)
                        e.currentTarget.style.background = "var(--surface-2)";
                    }}
                    onMouseLeave={(e) => {
                      if (!sel)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <window.SemaforoDot estado={sem} size={10} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "var(--ink)",
                        }}
                      >
                        {st.apellido}, {st.nombre}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--ink-4)" }}>
                        {st.grado} &middot; Grupo {st.grupo}
                      </div>
                    </div>
                    <div>
                      {sec && (
                        <span
                          style={{
                            fontSize: 11,
                            padding: "2px 7px",
                            borderRadius: 10,
                            background: sec.soft,
                            color: sec.color,
                            fontWeight: 500,
                          }}
                        >
                          {sec.short}
                        </span>
                      )}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      {activas > 0 ? (
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: window.SEMAFORO[sem].color,
                          }}
                        >
                          {activas}
                        </span>
                      ) : (
                        <span style={{ fontSize: 12, color: "var(--ink-5)" }}>
                          &mdash;
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Panel de detalle del alumno ───────────────────────────────── */}
        {alumno && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--line)",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "var(--ink)",
                      }}
                    >
                      {alumno.nombre} {alumno.apellido}
                    </span>
                    <window.SemaforoBadge estado={alumnoSemaforo} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      fontSize: 12,
                      color: "var(--ink-3)",
                      flexWrap: "wrap",
                    }}
                  >
                    {seccionInfo && (
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: "50%",
                            background: seccionInfo.color,
                            display: "inline-block",
                          }}
                        />
                        {seccionInfo.label}
                      </span>
                    )}
                    <span>
                      {alumno.grado} &middot; Grupo {alumno.grupo}
                    </span>
                    <span
                      style={{
                        color: alumnoActivas > 0 ? "#b91c1c" : "var(--ink-4)",
                        fontWeight: alumnoActivas > 0 ? 500 : 400,
                      }}
                    >
                      {alumnoActivas} incidencia{alumnoActivas !== 1 ? "s" : ""}{" "}
                      activa{alumnoActivas !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 7, flexShrink: 0 }}>
                  <button
                    onClick={() => setShowModal(true)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "7px 14px",
                      borderRadius: 7,
                      border: "none",
                      background: "var(--brand)",
                      color: "var(--brand-ink)",
                      cursor: "pointer",
                      fontSize: 13,
                      fontWeight: 500,
                    }}
                  >
                    <Icon name="plus" size={14} />
                    Registrar
                  </button>
                  <button
                    onClick={() => setAlumno(null)}
                    style={{
                      background: "none",
                      border: "1px solid var(--line)",
                      borderRadius: 7,
                      cursor: "pointer",
                      padding: "7px 9px",
                      color: "var(--ink-3)",
                    }}
                  >
                    <Icon name="close" size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Lista de incidencias */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
              {alumnoIncs.length === 0 ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 200,
                    gap: 8,
                    color: "var(--ink-4)",
                  }}
                >
                  <Icon name="check" size={36} style={{ color: "#15803d" }} />
                  <div
                    style={{ fontSize: 14, fontWeight: 500, color: "#15803d" }}
                  >
                    Sin incidencias registradas
                  </div>
                  <div style={{ fontSize: 12 }}>
                    Este alumno no tiene antecedentes disciplinarios
                  </div>
                </div>
              ) : (
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {alumnoIncs.filter((i) => i.estado === "activa").length >
                    0 && (
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--ink-4)",
                        letterSpacing: ".05em",
                        textTransform: "uppercase",
                        marginBottom: 2,
                      }}
                    >
                      Activas
                    </div>
                  )}
                  {alumnoIncs
                    .filter((i) => i.estado === "activa")
                    .map((inc) => (
                      <window.IncidenciaItem
                        key={inc.id}
                        inc={inc}
                        onResolver={resolverIncidencia}
                      />
                    ))}

                  {alumnoIncs.filter((i) => i.estado === "resuelta").length >
                    0 && (
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "var(--ink-4)",
                        letterSpacing: ".05em",
                        textTransform: "uppercase",
                        marginTop: 6,
                        marginBottom: 2,
                      }}
                    >
                      Resueltas
                    </div>
                  )}
                  {alumnoIncs
                    .filter((i) => i.estado === "resuelta")
                    .map((inc) => (
                      <window.IncidenciaItem
                        key={inc.id}
                        inc={inc}
                        onResolver={resolverIncidencia}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Modal nueva incidencia ───────────────────────────────────────── */}
      {showModal && alumno && (
        <window.NuevaIncidenciaModal
          alumno={alumno}
          onSave={addIncident}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* ── Modal nuevo alumno ───────────────────────────────────────────── */}
      {showAlumnoModal && (
        <window.NuevoAlumnoModal
          onSave={addAlumnoConIncidencia}
          onClose={() => setShowAlumnoModal(false)}
        />
      )}
    </div>
  );
};

window.Incidencias = Incidencias;
