/* ─── Academic grid ─────────────────────────────────────────────────── */

const AcadGrid = ({ classes, showBreaks, onClassClick }) => {
  const byDay = useMemo(() => {
    const m = window.DAYS.map(() => []);
    classes.forEach((c) => m[c.day].push(c));
    return m.map((dc) =>
      window.placeLanes(
        dc,
        (c) => window.toMin(c.start),
        (c) => window.toMin(c.end),
      ),
    );
  }, [classes]);

  const TIME_COL = 70;

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <div style={{ overflowY: "auto", flex: 1, minHeight: 0 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `${TIME_COL}px repeat(5, 1fr)`,
            borderBottom: "1px solid var(--line)",
            background: "var(--surface-2)",
            position: "sticky",
            top: 0,
            zIndex: 5,
          }}
        >
          <div />
          {window.DAYS.map((day, i) => (
            <div
              key={day}
              style={{
                padding: "12px 14px",
                borderLeft: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}
              >
                {day}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `${TIME_COL}px repeat(5, 1fr)`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "relative",
              height: window.ACAD_TOTAL,
              borderRight: "1px solid var(--line)",
            }}
          >
            {Array.from({ length: window.ACAD_END - window.ACAD_START + 1 }, (_, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: window.ACAD_TOP + i * window.ACAD_HR_PX - 8,
                  right: 8,
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  color: "var(--ink-4)",
                  fontWeight: 500,
                }}
              >
                {String(window.ACAD_START + i).padStart(2, "0")}:00
              </div>
            ))}
          </div>
          {window.DAYS.map((day, di) => (
            <div
              key={day}
              style={{
                position: "relative",
                height: window.ACAD_TOTAL,
                borderLeft: "1px solid var(--line)",
                background: "var(--surface)",
              }}
            >
              {Array.from({ length: window.ACAD_END - window.ACAD_START + 1 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: window.ACAD_TOP + i * window.ACAD_HR_PX,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "var(--line)",
                  }}
                />
              ))}
              {Array.from({ length: window.ACAD_END - window.ACAD_START }, (_, i) => (
                <div
                  key={"h" + i}
                  style={{
                    position: "absolute",
                    top: window.ACAD_TOP + i * window.ACAD_HR_PX + window.ACAD_HR_PX / 2,
                    left: 0,
                    right: 0,
                    height: 1,
                    background: "var(--line)",
                    opacity: 0.5,
                  }}
                />
              ))}
              {showBreaks &&
                window.BREAKS.map((b, bi) => (
                  <div
                    key={bi}
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      top: window.acadY(b.start),
                      height: window.acadH(b.start, b.end),
                      background:
                        "repeating-linear-gradient(135deg, oklch(0.94 0.06 65) 0 6px, oklch(0.92 0.07 65) 6px 12px)",
                      borderTop: "1px dashed oklch(0.70 0.13 65)",
                      borderBottom: "1px dashed oklch(0.70 0.13 65)",
                      pointerEvents: "none",
                      zIndex: 1,
                    }}
                  >
                    {di === 0 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 10.5,
                          fontWeight: 600,
                          color: "oklch(0.42 0.10 60)",
                          letterSpacing: ".04em",
                          textTransform: "uppercase",
                          background: "oklch(0.97 0.05 65)",
                          padding: "2px 7px",
                          borderRadius: 999,
                          border: "1px solid oklch(0.85 0.09 65)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <Icon name="coffee" size={11} />
                        {b.label}
                      </div>
                    )}
                  </div>
                ))}
              {byDay[di].map(({ item: c, lane, totalLanes }) => {
                const cat = window.ACAD_CATS[c.cat];
                const top = window.acadY(c.start);
                const height = window.acadH(c.start, c.end);
                const widthPct = 100 / totalLanes;
                const leftPct = lane * widthPct;
                const overlap = totalLanes > 1 ? 4 : 0;
                return (
                  <button
                    key={c.id}
                    onClick={() => onClassClick(c)}
                    style={{
                      position: "absolute",
                      top,
                      height: Math.max(height - 2, 26),
                      left: `calc(${leftPct}% + ${lane === 0 ? 4 : -overlap}px)`,
                      width: `calc(${widthPct}% - ${lane === totalLanes - 1 ? 8 : 4 - overlap}px)`,
                      background: cat.bg,
                      color: "var(--ink-2)",
                      border: 0,
                      borderLeft: `3px solid ${cat.color}`,
                      borderRadius: 8,
                      boxShadow:
                        "0 1px 0 rgba(0,0,0,.06), 0 4px 12px -6px rgba(0,0,0,.18)",
                      padding: height < 40 ? "4px 8px" : "6px 10px",
                      textAlign: "left",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: height < 44 ? "row" : "column",
                      alignItems: height < 44 ? "center" : "flex-start",
                      gap: height < 44 ? 8 : 2,
                      overflow: "hidden",
                      zIndex: 2,
                      fontFamily: "var(--font-sans)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.zIndex = "3";
                      e.currentTarget.style.filter = "brightness(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.zIndex = "2";
                      e.currentTarget.style.filter = "none";
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10.5,
                        fontFamily: "var(--font-mono)",
                        fontWeight: 500,
                        opacity: 0.85,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.start} – {c.end}
                    </span>
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 600,
                        lineHeight: 1.2,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: height < 60 ? 1 : 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {c.title}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Academic side rail ────────────────────────────────────────────── */

const AcadSideRail = ({ classes, teacher, showBreaks }) => {
  const totalMin = classes.reduce(
    (acc, c) => acc + (window.toMin(c.end) - window.toMin(c.start)),
    0,
  );
  const hrs = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  const perCat = Object.values(window.ACAD_CATS).map((cat) => ({
    ...cat,
    n: classes.filter((c) => c.cat === cat.id).length,
  }));
  const perDay = window.DAYS.map((d, i) => classes.filter((c) => c.day === i).length);

  return (
    <aside
      style={{
        borderLeft: "1px solid var(--line)",
        background: "var(--surface)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <section
        style={{
          padding: "20px 22px 16px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          Docente seleccionado
        </h3>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Avatar initials={teacher.initials} size={44} color="var(--brand)" />
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.2 }}>
              {teacher.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 3 }}>
              {teacher.role}
            </div>
          </div>
        </div>
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          <window.HStat label="Clases / semana" value={classes.length} />
          <window.HStat label="Horas / semana" value={`${hrs}h ${mins}m`} />
        </div>
      </section>
      <section
        style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          Leyenda de clases
        </h3>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {perCat.map((cat) => (
            <div
              key={cat.id}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background: cat.color,
                  boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)",
                }}
              />
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    color: "var(--ink)",
                    fontWeight: 500,
                  }}
                >
                  {cat.label}
                </span>
                <span style={{ fontSize: 11, color: "var(--ink-4)" }}>
                  {cat.sub}
                </span>
              </div>
              <span
                style={{
                  fontSize: 11.5,
                  color: "var(--ink-4)",
                  fontFamily: "var(--font-mono)",
                  background: "var(--bg-sunk)",
                  padding: "1px 7px",
                  borderRadius: 999,
                }}
              >
                {cat.n}
              </span>
            </div>
          ))}
          {showBreaks && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                paddingTop: 8,
                borderTop: "1px dashed var(--line)",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  background:
                    "repeating-linear-gradient(135deg, oklch(0.94 0.06 65) 0 3px, oklch(0.92 0.07 65) 3px 6px)",
                  border: "1px dashed oklch(0.70 0.13 65)",
                }}
              />
              <span style={{ flex: 1, fontSize: 12.5, color: "var(--ink-2)" }}>
                Recesos
              </span>
              <span
                style={{
                  fontSize: 11.5,
                  color: "var(--ink-4)",
                  fontFamily: "var(--font-mono)",
                  background: "var(--bg-sunk)",
                  padding: "1px 7px",
                  borderRadius: 999,
                }}
              >
                {window.BREAKS.length}
              </span>
            </div>
          )}
        </div>
      </section>
      <section style={{ padding: "18px 22px", flex: 1 }}>
        <h3
          style={{
            margin: 0,
            fontSize: 11,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          Carga por día
        </h3>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {window.DAYS.map((d, i) => {
            const n = perDay[i];
            const max = Math.max(...perDay, 1);
            return (
              <div
                key={d}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div style={{ width: 32, fontSize: 12, color: "var(--ink-3)" }}>
                  {window.DOWS_SHORT[i]}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 6,
                    background: "var(--bg-sunk)",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${(n / max) * 100}%`,
                      height: "100%",
                      background: "var(--brand)",
                      borderRadius: 999,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 24,
                    fontSize: 12,
                    color: "var(--ink-4)",
                    textAlign: "right",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {n}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
};

/* ─── Class modal ───────────────────────────────────────────────────── */

const ClassModal = ({ data, isNew, onClose }) => {
  const [d, setD] = useState(data);
  const set = (k, v) => setD((x) => ({ ...x, [k]: v }));
  const cat = window.ACAD_CATS[d.cat] || window.ACAD_CATS.secundaria;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(20,22,28,.36)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "overlayIn .15s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(560px, 100%)",
          maxHeight: "calc(100vh - 48px)",
          background: "var(--surface)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          animation: "modalIn .18s ease-out",
        }}
      >
        <div style={{ height: 6, background: cat.color }} />
        <div
          style={{
            padding: "20px 24px 4px",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              {isNew ? "Nueva clase" : "Detalle de clase"}
            </div>
            <input
              autoFocus={isNew}
              value={d.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Materia y grupo"
              style={{
                width: "100%",
                border: 0,
                outline: "none",
                background: "transparent",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-.015em",
                padding: "4px 0",
                marginTop: 4,
              }}
            />
          </div>
          <IconButton icon="close" onClick={onClose} title="Cerrar" />
        </div>
        <div
          style={{
            padding: "12px 24px 20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              padding: "14px 16px",
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
            }}
          >
            <window.HInfo
              icon="user"
              label="Docente"
              value={
                (window.TEACHERS.find((t) => t.id === d.teacherId) || {}).name ||
                d.teacherId
              }
            />
            <window.HInfo icon="calendar" label="Día" value={window.DAYS[d.day]} />
            <window.HInfo
              icon="clock"
              label="Horario"
              value={`${d.start} – ${d.end}`}
            />
            <window.HInfo icon="map" label="Aula" value={d.room} />
          </div>
          <Field label="Categoría">
            <div style={{ display: "flex", gap: 8 }}>
              {Object.values(window.ACAD_CATS).map((c) => {
                const sel = d.cat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => set("cat", c.id)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 12px",
                      borderRadius: "var(--radius)",
                      border:
                        "1px solid " + (sel ? c.color : "var(--line-strong)"),
                      background: sel
                        ? `color-mix(in oklab, ${c.color}, white 92%)`
                        : "var(--surface)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 4,
                        background: c.color,
                      }}
                    />
                    <span
                      style={{ fontSize: 12.5, fontWeight: sel ? 600 : 500 }}
                    >
                      {c.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Field>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <Field label="Día">
              <Select
                value={d.day}
                onChange={(e) => set("day", +e.target.value)}
              >
                {window.DAYS.map((day, i) => (
                  <option key={day} value={i}>
                    {day}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Hora inicio">
              <input
                type="time"
                value={d.start}
                onChange={(e) => set("start", e.target.value)}
                style={inputStyle}
              />
            </Field>
            <Field label="Hora fin">
              <input
                type="time"
                value={d.end}
                onChange={(e) => set("end", e.target.value)}
                style={inputStyle}
              />
            </Field>
          </div>
          <Field label="Aula">
            <Input
              value={d.room}
              onChange={(e) => set("room", e.target.value)}
              placeholder="Lab. de Cómputo 2"
            />
          </Field>
          <Field label="Notas">
            <Textarea
              rows={3}
              placeholder="Material requerido, observaciones…"
            />
          </Field>
        </div>
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--surface-2)",
          }}
        >
          <div>
            {!isNew && (
              <Button variant="danger" icon="trash">
                Eliminar
              </Button>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              icon={isNew ? "check" : "edit"}
              onClick={onClose}
            >
              {isNew ? "Crear clase" : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.AcadGrid = AcadGrid;
window.AcadSideRail = AcadSideRail;
window.ClassModal = ClassModal;
