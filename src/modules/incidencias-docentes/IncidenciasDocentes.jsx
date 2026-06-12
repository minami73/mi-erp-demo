const IncidenciasDocentes = () => {
  const TEACHERS = window.CV_DATA.TEACHERS;

  const [incidents, setIncidents] = useState(window.INIT_DOCENTE_INCIDENTS);
  const [tab, setTab] = useState("en_aula");
  const [filtroDocente, setFiltroDocente] = useState("todos");
  const [selectedId, setSelectedId] = useState(null);
  const [showNueva, setShowNueva] = useState(false);
  const [showVersion2, setShowVersion2] = useState(false);
  const [showResolver, setShowResolver] = useState(false);
  const [resolucionText, setResolucionText] = useState("");

  const switchTab = (t) => {
    setTab(t);
    setSelectedId(null);
    setFiltroDocente("todos");
    setShowResolver(false);
  };

  const filtered = incidents
    .filter((i) => i.tipo === tab)
    .filter(
      (i) =>
        filtroDocente === "todos" ||
        i.docente1Id === filtroDocente ||
        i.docente2Id === filtroDocente,
    )
    .sort((a, b) => {
      if (window.ESTADO_ORDER[a.estado] !== window.ESTADO_ORDER[b.estado])
        return window.ESTADO_ORDER[a.estado] - window.ESTADO_ORDER[b.estado];
      return b.fecha.localeCompare(a.fecha);
    });

  const selected = incidents.find((i) => i.id === selectedId) || null;

  const teacherById = (id) => TEACHERS.find((t) => t.id === id);
  const teacherName = (id) => teacherById(id)?.name || id;
  const teacherInitials = (id) => teacherById(id)?.initials || "?";

  const addIncident = (data) => {
    const newInc = {
      id: `di${Date.now()}`,
      estado: "pendiente",
      version2: null,
      resolucion: null,
      ...data,
    };
    setIncidents((prev) => [newInc, ...prev]);
    setSelectedId(newInc.id);
    setShowNueva(false);
  };

  const addVersion2 = (text) => {
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === selectedId ? { ...i, version2: text, estado: "completo" } : i,
      ),
    );
    setShowVersion2(false);
  };

  const resolverIncidencia = () => {
    if (!resolucionText.trim()) return;
    setIncidents((prev) =>
      prev.map((i) =>
        i.id === selectedId
          ? { ...i, estado: "resuelto", resolucion: resolucionText.trim() }
          : i,
      ),
    );
    setShowResolver(false);
    setResolucionText("");
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg)",
      }}
    >
      {/* Barra de tabs + botón nueva */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid var(--line)",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex" }}>
          {["en_aula", "interpersonal"].map((t) => (
            <button
              key={t}
              onClick={() => switchTab(t)}
              style={{
                padding: "14px 20px",
                fontSize: 14,
                fontWeight: tab === t ? 600 : 400,
                color: tab === t ? "var(--brand)" : "var(--ink-3)",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderBottom:
                  "2px solid " + (tab === t ? "var(--brand)" : "transparent"),
                transition: "color .12s, border-color .12s",
              }}
            >
              {window.TIPO_LABELS[t]}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowNueva(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            border: "none",
            background: "var(--brand)",
            color: "var(--brand-ink)",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Icon name="plus" size={15} />
          Nueva incidencia
        </button>
      </div>

      {/* Contenido: lista + detalle */}
      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        {/* ── Panel izquierdo: lista ── */}
        <div
          style={{
            width: 420,
            flexShrink: 0,
            borderRight: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Filtro por docente */}
          <div
            style={{
              padding: "12px 16px",
              borderBottom: "1px solid var(--line)",
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              flexShrink: 0,
            }}
          >
            {["todos", ...TEACHERS.map((t) => t.id)].map((id) => {
              const active = filtroDocente === id;
              const lbl =
                id === "todos"
                  ? "Todos"
                  : TEACHERS.find((t) => t.id === id)
                      ?.name.split(" ")
                      .slice(-1)[0] || id;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setFiltroDocente(id);
                    setSelectedId(null);
                  }}
                  style={{
                    padding: "4px 11px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    border:
                      "1px solid " + (active ? "var(--brand)" : "var(--line)"),
                    background: active ? "var(--accent-soft)" : "transparent",
                    color: active ? "var(--brand)" : "var(--ink-3)",
                    cursor: "pointer",
                  }}
                >
                  {lbl}
                </button>
              );
            })}
          </div>

          {/* Lista */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
            {filtered.length === 0 ? (
              <div
                style={{
                  padding: 32,
                  textAlign: "center",
                  color: "var(--ink-4)",
                  fontSize: 13,
                }}
              >
                Sin incidencias en esta vista
              </div>
            ) : (
              filtered.map((inc) => {
                const isSelected = inc.id === selectedId;
                const s = window.ESTADO_STYLE[inc.estado];
                return (
                  <div
                    key={inc.id}
                    onClick={() => {
                      setSelectedId(inc.id);
                      setShowResolver(false);
                    }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      borderLeft:
                        "3px solid " +
                        (isSelected ? "var(--brand)" : "transparent"),
                      background: isSelected
                        ? "var(--accent-soft)"
                        : "transparent",
                      transition: "background .1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "var(--bg-sunk)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 500,
                          fontSize: 13,
                          color: "var(--ink)",
                          lineHeight: 1.3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {inc.titulo}
                      </div>
                      <EstadoPill estado={inc.estado} />
                    </div>
                    <div
                      style={{
                        marginTop: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      <span style={{ fontSize: 11, color: "var(--ink-4)" }}>
                        {inc.fecha}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--ink-5)" }}>
                        ·
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Avatar2
                          initials={teacherInitials(inc.docente1Id)}
                          size={16}
                        />
                        <span style={{ fontSize: 11, color: "var(--ink-3)" }}>
                          {
                            teacherById(inc.docente1Id)
                              ?.name.split(" ")
                              .slice(-1)[0]
                          }
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: "var(--ink-5)" }}>
                        vs
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Avatar2
                          initials={teacherInitials(inc.docente2Id)}
                          size={16}
                        />
                        <span style={{ fontSize: 11, color: "var(--ink-3)" }}>
                          {
                            teacherById(inc.docente2Id)
                              ?.name.split(" ")
                              .slice(-1)[0]
                          }
                        </span>
                      </div>
                      {inc.tipo === "en_aula" && inc.grupo && (
                        <>
                          <span style={{ fontSize: 11, color: "var(--ink-5)" }}>
                            ·
                          </span>
                          <span style={{ fontSize: 11, color: "var(--ink-4)" }}>
                            {inc.grupo}
                          </span>
                        </>
                      )}
                      {inc.tipo === "interpersonal" && inc.medio && (
                        <>
                          <span style={{ fontSize: 11, color: "var(--ink-5)" }}>
                            ·
                          </span>
                          <span style={{ fontSize: 11, color: "var(--ink-4)" }}>
                            {window.MEDIO_LABELS[inc.medio]}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Panel derecho: detalle ── */}
        <div style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
          {!selected ? (
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
                color: "var(--ink-4)",
              }}
            >
              <Icon name="shield" size={40} stroke={1.2} />
              <p style={{ margin: 0, fontSize: 14 }}>
                Selecciona una incidencia para ver el detalle
              </p>
            </div>
          ) : (
            <div style={{ padding: 28, maxWidth: 680 }}>
              {/* Header del detalle */}
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 600,
                      color: "var(--ink)",
                      lineHeight: 1.3,
                    }}
                  >
                    {selected.titulo}
                  </h2>
                  <EstadoPill estado={selected.estado} />
                </div>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                  }}
                >
                  <span style={{ fontSize: 12, color: "var(--ink-4)" }}>
                    {selected.fecha}
                  </span>
                  <span style={{ fontSize: 12, color: "var(--ink-5)" }}>·</span>
                  <span
                    style={{
                      fontSize: 12,
                      padding: "1px 8px",
                      borderRadius: 999,
                      background: "var(--bg-sunk)",
                      color: "var(--ink-3)",
                    }}
                  >
                    {window.TIPO_LABELS[selected.tipo]}
                  </span>
                  {selected.tipo === "en_aula" && (
                    <>
                      {selected.grupo && (
                        <span
                          style={{
                            fontSize: 12,
                            padding: "1px 8px",
                            borderRadius: 999,
                            background: "var(--bg-sunk)",
                            color: "var(--ink-3)",
                          }}
                        >
                          {selected.grupo}
                        </span>
                      )}
                      {selected.materia && (
                        <span
                          style={{
                            fontSize: 12,
                            padding: "1px 8px",
                            borderRadius: 999,
                            background: "var(--bg-sunk)",
                            color: "var(--ink-3)",
                          }}
                        >
                          {selected.materia}
                        </span>
                      )}
                    </>
                  )}
                  {selected.tipo === "interpersonal" && selected.medio && (
                    <span
                      style={{
                        fontSize: 12,
                        padding: "1px 8px",
                        borderRadius: 999,
                        background: "var(--bg-sunk)",
                        color: "var(--ink-3)",
                      }}
                    >
                      {window.MEDIO_LABELS[selected.medio]}
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: "var(--ink-5)" }}>·</span>
                  <span style={{ fontSize: 12, color: "var(--ink-4)" }}>
                    Registrado por {selected.registradoPor}
                  </span>
                </div>
              </div>

              <div
                style={{
                  height: 1,
                  background: "var(--line)",
                  marginBottom: 24,
                }}
              />

              {/* Versiones */}
              <VersionBlock
                label={"Versión de " + teacherName(selected.docente1Id)}
                text={selected.version1}
                author={teacherName(selected.docente1Id)}
                authorInitials={teacherInitials(selected.docente1Id)}
              />

              <VersionBlock
                label={"Versión de " + teacherName(selected.docente2Id)}
                text={selected.version2}
                author={teacherName(selected.docente2Id)}
                authorInitials={teacherInitials(selected.docente2Id)}
                missing={teacherName(selected.docente2Id)}
                onAdd={
                  selected.estado === "pendiente"
                    ? () => setShowVersion2(true)
                    : null
                }
              />

              {/* Sección de resolución */}
              {selected.estado === "resuelto" && selected.resolucion && (
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--ink-4)",
                      textTransform: "uppercase",
                      letterSpacing: ".06em",
                      marginBottom: 8,
                    }}
                  >
                    Resolución
                  </div>
                  <div
                    style={{
                      background: "#f0fdf4",
                      border: "1px solid #86efac",
                      borderRadius: 10,
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>✅</span>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: "#166534",
                        }}
                      >
                        Caso resuelto
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "#14532d",
                        lineHeight: 1.55,
                      }}
                    >
                      {selected.resolucion}
                    </p>
                  </div>
                </div>
              )}

              {selected.estado === "completo" && (
                <div style={{ marginTop: 8 }}>
                  {!showResolver ? (
                    <button
                      onClick={() => setShowResolver(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "9px 16px",
                        borderRadius: 8,
                        border: "1px solid #22c55e",
                        background: "#f0fdf4",
                        color: "#166534",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Icon name="check" size={15} />
                      Marcar como resuelto
                    </button>
                  ) : (
                    <div
                      style={{
                        border: "1px solid #86efac",
                        borderRadius: 10,
                        background: "#f0fdf4",
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#166534",
                          marginBottom: 8,
                        }}
                      >
                        Resolución del conflicto
                      </div>
                      <textarea
                        value={resolucionText}
                        onChange={(e) => setResolucionText(e.target.value)}
                        placeholder="Describe cómo se resolvió el conflicto, acuerdos tomados, acciones correctivas..."
                        rows={4}
                        style={{
                          width: "100%",
                          boxSizing: "border-box",
                          padding: "8px 10px",
                          fontSize: 13,
                          borderRadius: 8,
                          border: "1px solid #86efac",
                          background: "#fff",
                          color: "var(--ink)",
                          outline: "none",
                          resize: "vertical",
                          fontFamily: "inherit",
                        }}
                      />
                      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                        <button
                          onClick={() => {
                            setShowResolver(false);
                            setResolucionText("");
                          }}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 7,
                            border: "1px solid var(--line)",
                            background: "transparent",
                            color: "var(--ink-3)",
                            fontSize: 13,
                            cursor: "pointer",
                          }}
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={resolverIncidencia}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 7,
                            border: "none",
                            background: "#22c55e",
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            opacity: resolucionText.trim() ? 1 : 0.5,
                          }}
                        >
                          Confirmar resolución
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {showNueva && (
        <NuevaIncidenciaModal
          teachers={TEACHERS}
          onClose={() => setShowNueva(false)}
          onSave={addIncident}
        />
      )}
      {showVersion2 && selected && (
        <Version2Modal
          docente2Name={teacherName(selected.docente2Id)}
          onClose={() => setShowVersion2(false)}
          onSave={addVersion2}
        />
      )}
    </div>
  );
};

window.IncidenciasDocentes = IncidenciasDocentes;
