/* ─── Workshop grid ─────────────────────────────────────────────────── */

const CARD_H = 84;
const CARD_GAP = 6;
const SLOT_PAD = 8;

const WorkGrid = ({ items, onClick }) => {
  const timeSlots = useMemo(
    () => [...new Set(items.map((it) => it.start))].sort(),
    [items],
  );

  const slotDayMap = useMemo(() => {
    const map = {};
    timeSlots.forEach((t) => {
      map[t] = window.DAYS.map((_, di) =>
        items
          .filter((it) => it.day === di && it.start === t)
          .sort((a, b) => window.toMin(a.end) - window.toMin(b.end)),
      );
    });
    return map;
  }, [items, timeSlots]);

  const TIME_COL = 72;

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
          {window.DAYS.map((d) => (
            <div
              key={d}
              style={{
                padding: "12px 14px",
                borderLeft: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600 }}>{d}</div>
            </div>
          ))}
        </div>

        {timeSlots.map((time) => {
          const dayItems = slotDayMap[time];
          const maxCards = Math.max(...dayItems.map((d) => d.length), 1);
          const rowMinH =
            maxCards * CARD_H + (maxCards - 1) * CARD_GAP + SLOT_PAD * 2;
          return (
            <div
              key={time}
              style={{
                display: "grid",
                gridTemplateColumns: `${TIME_COL}px repeat(5, 1fr)`,
                minHeight: rowMinH,
                borderBottom: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  borderRight: "1px solid var(--line)",
                  padding: `${SLOT_PAD}px 8px 0`,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontFamily: "var(--font-mono)",
                    fontWeight: 600,
                    color: "var(--ink-3)",
                  }}
                >
                  {time}
                </span>
              </div>

              {dayItems.map((workshops, di) => (
                <div
                  key={di}
                  style={{
                    borderLeft: "1px solid var(--line)",
                    padding: SLOT_PAD,
                    display: "flex",
                    flexDirection: "column",
                    gap: CARD_GAP,
                  }}
                >
                  {workshops.map((item) => {
                    const cat = window.WORK_CATS[item.cat];
                    return (
                      <button
                        key={item.id}
                        onClick={() => onClick(item)}
                        style={{
                          height: CARD_H,
                          flexShrink: 0,
                          background: cat.color,
                          color: cat.ink,
                          border: 0,
                          borderRadius: 10,
                          padding: "9px 12px",
                          textAlign: "left",
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                          overflow: "hidden",
                          boxShadow:
                            "0 1px 0 rgba(0,0,0,.06), 0 4px 12px -6px rgba(0,0,0,.18)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.filter = "brightness(1.06)";
                          e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.filter = "none";
                          e.currentTarget.style.transform = "none";
                        }}
                      >
                        <span
                          style={{
                            fontSize: 10.5,
                            fontFamily: "var(--font-mono)",
                            fontWeight: 500,
                            opacity: 0.88,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.start} – {item.end}
                        </span>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            lineHeight: 1.2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {cat.label}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            opacity: 0.85,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.group}
                        </span>
                        <span
                          style={{
                            fontSize: 10.5,
                            opacity: 0.72,
                            marginTop: "auto",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.teacher}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Workshop side rail ────────────────────────────────────────────── */

const WorkSideRail = ({ items, typeFilter, setTypeFilter }) => {
  const totalMin = items.reduce(
    (a, b) => a + (window.toMin(b.end) - window.toMin(b.start)),
    0,
  );
  const hrs = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  const perCat = Object.values(window.WORK_CATS).map((cat) => ({
    ...cat,
    n: items.filter((c) => c.cat === cat.id).length,
  }));
  const teachers = [...new Set(items.map((i) => i.teacher))];
  const groups = [...new Set(items.map((i) => i.group))];

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
          Resumen del ciclo
        </h3>
        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          <window.HStat label="Talleres / sem" value={items.length} />
          <window.HStat label="Horas / sem" value={`${hrs}h ${mins}m`} />
          <window.HStat label="Profesores" value={teachers.length} />
          <window.HStat label="Grupos atendidos" value={groups.length} />
        </div>
      </section>
      <section
        style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
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
            Tipos de taller
          </h3>
          {typeFilter !== "todos" && (
            <button
              onClick={() => setTypeFilter("todos")}
              style={{
                background: "transparent",
                border: 0,
                color: "var(--brand)",
                fontSize: 11,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Limpiar
            </button>
          )}
        </div>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {perCat.map((cat) => {
            const sel = typeFilter === cat.id;
            const dim = typeFilter !== "todos" && !sel;
            return (
              <button
                key={cat.id}
                onClick={() => setTypeFilter(sel ? "todos" : cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "6px 8px",
                  borderRadius: 6,
                  background: sel ? "var(--bg-sunk)" : "transparent",
                  border: 0,
                  cursor: "pointer",
                  textAlign: "left",
                  opacity: dim ? 0.45 : 1,
                  transition: "opacity .12s, background .12s",
                }}
                onMouseEnter={(e) => {
                  if (!sel) e.currentTarget.style.background = "var(--bg-sunk)";
                }}
                onMouseLeave={(e) => {
                  if (!sel) e.currentTarget.style.background = "transparent";
                }}
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
                <span
                  style={{
                    flex: 1,
                    fontSize: 12.5,
                    color: "var(--ink)",
                    fontWeight: sel ? 600 : 500,
                  }}
                >
                  {cat.label}
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
                  {cat.n}
                </span>
              </button>
            );
          })}
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
          Profesores asignados
        </h3>
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {teachers.map((t) => {
            const initials = t
              .replace(/^(Prof\.|Miss|Mtra\.|Lic\.|Ing\.|Mtro\.)\s*/, "")
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();
            const n = items.filter((i) => i.teacher === t).length;
            return (
              <div
                key={t}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <Avatar initials={initials} size={28} color="var(--brand)" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 12.5,
                      fontWeight: 500,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t}
                  </div>
                  <div
                    style={{
                      fontSize: 10.5,
                      color: "var(--ink-4)",
                      marginTop: 1,
                    }}
                  >
                    {n} taller{n !== 1 ? "es" : ""} / semana
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
};

/* ─── Workshop modal ────────────────────────────────────────────────── */

const WorkshopModal = ({ data, isNew, onClose }) => {
  const [d, setD] = useState(data);
  const set = (k, v) => setD((x) => ({ ...x, [k]: v }));
  const cat = window.WORK_CATS[d.cat] || window.WORK_CATS.basquet;

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
          width: "min(580px, 100%)",
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
              {isNew ? "Nuevo taller" : "Detalle del taller"}
            </div>
            <div
              style={{
                marginTop: 4,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: "-.015em",
                }}
              >
                {cat.label}
              </span>
              <span
                style={{
                  padding: "2px 10px",
                  fontSize: 11.5,
                  fontWeight: 500,
                  background: `color-mix(in oklab, ${cat.color}, white 80%)`,
                  color: "var(--ink-2)",
                  borderRadius: 999,
                }}
              >
                {d.group}
              </span>
            </div>
          </div>
          <IconButton icon="close" onClick={onClose} title="Cerrar" />
        </div>
        <div
          style={{
            padding: "14px 24px 20px",
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
              gap: 14,
              padding: "14px 16px",
              background: "var(--surface-2)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
            }}
          >
            <window.HInfo icon="user" label="Profesor" value={d.teacher} />
            <window.HInfo icon="users" label="Grupo" value={d.group} />
            <window.HInfo icon="calendar" label="Día" value={window.DAYS[d.day]} />
            <window.HInfo
              icon="clock"
              label="Horario"
              value={`${d.start} – ${d.end}`}
            />
            <window.HInfo icon="map" label="Lugar" value={d.place} />
            <window.HInfo icon="tag" label="Tipo" value={cat.label} />
          </div>
          <Field label="Tipo de taller">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.values(window.WORK_CATS).map((c) => {
                const sel = d.cat === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => set("cat", c.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "6px 11px",
                      borderRadius: 999,
                      cursor: "pointer",
                      border:
                        "1px solid " +
                        (sel ? "transparent" : "var(--line-strong)"),
                      background: sel ? c.color : "var(--surface)",
                      color: sel ? c.ink : "var(--ink-2)",
                      fontSize: 12,
                      fontWeight: sel ? 600 : 500,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: sel ? "rgba(0,0,0,.25)" : c.color,
                      }}
                    />
                    {c.label}
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
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Field label="Grupo dirigido">
              <Input
                value={d.group}
                onChange={(e) => set("group", e.target.value)}
                placeholder="Primaria Alta"
              />
            </Field>
            <Field label="Profesor responsable">
              <Input
                value={d.teacher}
                onChange={(e) => set("teacher", e.target.value)}
                placeholder="Prof. Armando"
              />
            </Field>
          </div>
          <Field label="Lugar">
            <Input
              value={d.place}
              onChange={(e) => set("place", e.target.value)}
              placeholder="Cancha 1, Salón de baile…"
            />
          </Field>
          <Field label="Notas">
            <Textarea
              rows={3}
              placeholder="Material requerido, observaciones, cupo máximo…"
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
              {isNew ? "Crear taller" : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.WorkGrid = WorkGrid;
window.WorkSideRail = WorkSideRail;
window.WorkshopModal = WorkshopModal;
