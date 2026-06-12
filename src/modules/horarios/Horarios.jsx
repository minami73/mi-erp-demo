/* ─── Horarios — Académico + Talleres ────────────────────────────────── */

const Horarios = () => {
  const [tab, setTab] = useState("academico");
  const [teacher, setTeacher] = useState("jared");
  const [showBreaks, setShowBreaks] = useState(false);
  const [acadView, setAcadView] = useState("docente");
  const [workGroupBy, setWorkGroupBy] = useState("taller");
  const [typeFilter, setTypeFilter] = useState("todos");
  const [modal, setModal] = useState(null);

  const teacherObj = window.TEACHERS.find((t) => t.id === teacher);
  const classes = window.CLASSES.filter((c) => c.teacherId === teacher);

  const filteredWorkshops = useMemo(
    () =>
      window.WORKSHOPS.filter((w) => typeFilter === "todos" || w.cat === typeFilter),
    [typeFilter],
  );

  const openClass = (c) => setModal({ type: "class", data: c, isNew: false });
  const openNewClass = () =>
    setModal({
      type: "class",
      data: {
        id: Date.now(),
        day: 0,
        start: "09:00",
        end: "10:00",
        cat: "secundaria",
        title: "",
        room: "",
      },
      isNew: true,
    });
  const openWorkshop = (w) =>
    setModal({ type: "workshop", data: w, isNew: false });
  const openNewWorkshop = () =>
    setModal({
      type: "workshop",
      data: {
        id: Date.now(),
        day: 0,
        start: "16:00",
        end: "17:00",
        cat: "basquet",
        group: "Primaria Alta",
        teacher: "",
        place: "",
      },
      isNew: true,
    });

  const breakBtnStyle = showBreaks
    ? {
        background: "var(--brand)",
        color: "var(--brand-ink)",
        borderColor: "var(--brand)",
      }
    : {};

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          padding: "14px 28px 0",
          background: "var(--surface)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
          {[
            { id: "academico", label: "Académico", sub: "Clases regulares" },
            {
              id: "talleres",
              label: "Talleres",
              sub: "Vespertinos extraescolares",
            },
          ].map((t) => {
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  padding: "10px 16px 12px",
                  background: "transparent",
                  border: 0,
                  cursor: "pointer",
                  borderBottom:
                    "2px solid " + (active ? "var(--brand)" : "transparent"),
                  marginBottom: -1,
                  color: active ? "var(--ink)" : "var(--ink-4)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 1,
                  transition: "color .12s, border-color .12s",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--ink-2)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--ink-4)";
                }}
              >
                <span
                  style={{ fontSize: 13.5, fontWeight: active ? 600 : 500 }}
                >
                  {t.label}
                </span>
                <span style={{ fontSize: 11, color: "var(--ink-4)" }}>
                  {t.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls bar */}
      <div
        style={{
          padding: "14px 28px",
          borderBottom: "1px solid var(--line)",
          background: "var(--surface)",
        }}
      >
        {tab === "academico" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <window.TeacherPicker value={teacher} onChange={setTeacher} />
            <Segmented
              value={acadView}
              onChange={setAcadView}
              options={[
                { value: "docente", label: "Por docente" },
                { value: "grupo", label: "Por grupo" },
                { value: "aula", label: "Por aula" },
              ]}
            />
            <div style={{ flex: 1 }} />
            <Button
              variant="secondary"
              icon="coffee"
              style={breakBtnStyle}
              onClick={() => setShowBreaks((b) => !b)}
            >
              Receso
            </Button>
            <Button variant="secondary" icon="download">
              Exportar PDF
            </Button>
            <Button variant="primary" icon="plus" onClick={openNewClass}>
              Nueva clase
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink-4)",
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                }}
              >
                Agrupar por
              </span>
              <Segmented
                value={workGroupBy}
                onChange={setWorkGroupBy}
                options={[
                  { value: "taller", label: "Por taller" },
                  { value: "profesor", label: "Por profesor" },
                  { value: "grupo", label: "Por grupo" },
                ]}
              />
            </div>
            <div style={{ width: 1, height: 22, background: "var(--line)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "var(--ink-4)",
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                }}
              >
                Tipo
              </span>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                style={{ height: 32, fontSize: 12.5, width: 180 }}
              >
                <option value="todos">Todos los talleres</option>
                {Object.values(window.WORK_CATS).map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </Select>
            </div>
            <div style={{ flex: 1 }} />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12.5,
                color: "var(--ink-3)",
              }}
            >
              <Icon name="clock" size={14} />
              <span>
                <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                  {filteredWorkshops.length}
                </strong>{" "}
                talleres en la semana
              </span>
            </div>
            <div style={{ width: 1, height: 22, background: "var(--line)" }} />
            <Button variant="secondary" icon="download">
              Exportar PDF
            </Button>
            <Button variant="primary" icon="plus" onClick={openNewWorkshop}>
              Nuevo taller
            </Button>
          </div>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) 300px",
        }}
      >
        <div
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {tab === "academico" ? (
            classes.length > 0 ? (
              <window.AcadGrid
                classes={classes}
                showBreaks={showBreaks}
                onClassClick={openClass}
              />
            ) : (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--surface)",
                  border: "1px dashed var(--line-strong)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--ink-4)",
                  gap: 8,
                }}
              >
                <Icon name="clock" size={28} />
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "var(--ink-2)",
                  }}
                >
                  Sin horario cargado
                </div>
                <div style={{ fontSize: 12.5 }}>
                  Selecciona otro docente o crea una nueva clase.
                </div>
              </div>
            )
          ) : (
            <window.WorkGrid items={filteredWorkshops} onClick={openWorkshop} />
          )}
        </div>
        {tab === "academico" ? (
          <window.AcadSideRail
            classes={classes}
            teacher={teacherObj}
            showBreaks={showBreaks}
          />
        ) : (
          <window.WorkSideRail
            items={filteredWorkshops}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />
        )}
      </div>

      {modal?.type === "class" && (
        <window.ClassModal
          data={modal.data}
          isNew={modal.isNew}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "workshop" && (
        <window.WorkshopModal
          data={modal.data}
          isNew={modal.isNew}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
};

window.Horarios = Horarios;
