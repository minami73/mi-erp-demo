/* ─── ListaAlumnos — directorio con buscador y filtros ──────────────────────
   Recibe el catálogo ya resuelto (alumnos, materias, desempeño del
   trimestre) y arma su propio estado de filtros, igual que Reportes.jsx
   e Incidencias.jsx. `onSelect(alumno)` sube el clic a Alumnos.jsx. */

const EstadoBadge = ({ estado }) => {
  if (!estado)
    return (
      <span style={{ fontSize: 12, color: "var(--ink-4)" }}>Sin datos</span>
    );
  const m = SEMAFORO_ACADEMICO[estado];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 9px",
        borderRadius: 999,
        fontSize: 11.5,
        fontWeight: 600,
        color: m.color,
        background: m.bg,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: m.color,
        }}
      />
      {m.label}
    </span>
  );
};

const ListaAlumnos = ({ alumnos, materias, desempeno, onSelect }) => {
  const [busqueda, setBusqueda] = useState("");
  const [grado, setGrado] = useState("todos");
  const [grupo, setGrupo] = useState("todos");
  const [estado, setEstado] = useState("todos");

  const grados = Array.from(new Set(alumnos.map((a) => a.grado))).sort();
  const grupos = Array.from(new Set(alumnos.map((a) => a.grupo))).sort();

  const filas = alumnos
    .map((a) => {
      const desTrimestre = desempeno[a.id]?.["2"] || {};
      const promedio = promedioGeneral(materias, desTrimestre);
      const cumplimiento = cumplimientoEntregas(materias, desTrimestre);
      const riesgo = materiasEnRiesgo(materias, desTrimestre);
      return {
        alumno: a,
        promedio,
        cumplimiento,
        riesgo,
        estado: estadoAcademico(promedio),
      };
    })
    .filter((r) => grado === "todos" || r.alumno.grado === Number(grado))
    .filter((r) => grupo === "todos" || r.alumno.grupo === grupo)
    .filter((r) => estado === "todos" || r.estado === estado)
    .filter(
      (r) =>
        !busqueda ||
        r.alumno.nombreCompleto
          .toLowerCase()
          .includes(busqueda.toLowerCase()) ||
        r.alumno.matricula.toLowerCase().includes(busqueda.toLowerCase()),
    );

  return (
    <div>
      {/* Filtros */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}
          >
            Grado
          </span>
          <Select
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            style={{
              height: 34,
              fontSize: 13,
              paddingLeft: 10,
              paddingRight: 28,
            }}
          >
            <option value="todos">Todos</option>
            {grados.map((g) => (
              <option key={g} value={g}>
                {g}°
              </option>
            ))}
          </Select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}
          >
            Grupo
          </span>
          <Select
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            style={{
              height: 34,
              fontSize: 13,
              paddingLeft: 10,
              paddingRight: 28,
            }}
          >
            <option value="todos">Todos</option>
            {grupos.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </Select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}
          >
            Estado
          </span>
          <Select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            style={{
              height: 34,
              fontSize: 13,
              paddingLeft: 10,
              paddingRight: 28,
            }}
          >
            <option value="todos">Todos</option>
            <option value="bien">Bien</option>
            <option value="regular">Regular</option>
            <option value="riesgo">En riesgo</option>
          </Select>
        </div>

        <div style={{ position: "relative", marginLeft: "auto" }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--ink-4)",
              pointerEvents: "none",
              display: "inline-flex",
            }}
          >
            <Icon name="search" size={14} />
          </span>
          <input
            type="text"
            placeholder="Buscar alumno o matrícula…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              height: 34,
              paddingLeft: 30,
              paddingRight: busqueda ? 28 : 12,
              fontSize: 13,
              border: "1px solid var(--line)",
              borderRadius: 8,
              background: "var(--surface)",
              color: "var(--ink)",
              outline: "none",
              width: 220,
            }}
          />
          {busqueda && (
            <IconButton
              icon="close"
              size={22}
              title="Limpiar"
              onClick={() => setBusqueda("")}
              style={{
                position: "absolute",
                right: 6,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          )}
        </div>
      </div>

      {/* Tabla */}
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
            gridTemplateColumns: "1fr 110px 180px 130px 140px",
            padding: "10px 20px",
            background: "var(--surface-2)",
            borderBottom: "1px solid var(--line)",
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".06em",
            textTransform: "uppercase",
          }}
        >
          <span>Alumno</span>
          <span style={{ textAlign: "center" }}>Promedio</span>
          <span style={{ textAlign: "center" }}>Cumplimiento</span>
          <span style={{ textAlign: "center" }}>En riesgo</span>
          <span></span>
        </div>

        {filas.length === 0 && (
          <div
            style={{
              padding: "36px 20px",
              textAlign: "center",
              fontSize: 13,
              color: "var(--ink-4)",
            }}
          >
            No hay alumnos que coincidan con los filtros.
          </div>
        )}

        {filas.map((r, i) => (
          <div
            key={r.alumno.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 110px 180px 130px 140px",
              padding: "10px 20px",
              borderBottom:
                i < filas.length - 1 ? "1px solid var(--line)" : "none",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => onSelect(r.alumno)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--bg-sunk)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar
                initials={(r.alumno.nombre[0] + r.alumno.apP[0]).toUpperCase()}
                size={30}
              />
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}
                >
                  {r.alumno.nombreCompleto}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-4)" }}>
                  {r.alumno.grado}°{r.alumno.grupo} · {r.alumno.matricula}
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              {r.promedio !== null ? (
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color:
                      SEMAFORO_ACADEMICO[r.estado]?.color || "var(--ink-2)",
                  }}
                >
                  {r.promedio}
                </span>
              ) : (
                <span style={{ fontSize: 12, color: "var(--ink-4)" }}>—</span>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {r.cumplimiento !== null ? (
                <>
                  <div
                    style={{
                      flex: 1,
                      height: 6,
                      borderRadius: 999,
                      background: "var(--line-strong)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${r.cumplimiento}%`,
                        borderRadius: 999,
                        background:
                          r.cumplimiento >= 90
                            ? "#15803D"
                            : r.cumplimiento >= 70
                              ? "#2563EB"
                              : r.cumplimiento >= 50
                                ? "#D97706"
                                : "#DC2626",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      minWidth: 32,
                      textAlign: "right",
                    }}
                  >
                    {r.cumplimiento}%
                  </span>
                </>
              ) : (
                <span style={{ fontSize: 12, color: "var(--ink-4)" }}>—</span>
              )}
            </div>

            <div style={{ textAlign: "center" }}>
              <EstadoBadge estado={r.estado} />
            </div>

            <div style={{ textAlign: "right" }}>
              <Button
                variant="soft"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(r.alumno, "desempeno");
                }}
              >
                Ver desempeño
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 14,
          padding: "11px 20px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          fontSize: 13,
          color: "var(--ink-3)",
        }}
      >
        <strong style={{ color: "var(--ink)" }}>{filas.length}</strong> de{" "}
        <strong style={{ color: "var(--ink)" }}>{alumnos.length}</strong>{" "}
        alumnos
      </div>
    </div>
  );
};

window.ListaAlumnos = ListaAlumnos;
