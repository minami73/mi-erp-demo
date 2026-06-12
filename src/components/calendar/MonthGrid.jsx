const MonthGrid = ({
  cells,
  month,
  today,
  eventsByDate,
  sectionOf,
  primarySection,
  onEventClick,
  onDayClick,
}) => {
  const todayKey = window.fmtDate(today);
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-lg)",
        background: "var(--surface)",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          background: "var(--surface-2)",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {window.DOWS.map((d) => (
          <div
            key={d}
            style={{
              padding: "10px 12px",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--ink-4)",
              textTransform: "uppercase",
              letterSpacing: ".08em",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          minWidth: 0,
        }}
      >
        {cells.map((d, i) => {
          const inMonth = d.getMonth() === month;
          const key = window.fmtDate(d);
          const isToday = key === todayKey;
          const evs = eventsByDate[key] || [];
          const visible = evs.slice(0, 3);
          const overflow = evs.length - visible.length;

          return (
            <div
              key={i}
              onClick={onDayClick ? () => onDayClick(d) : undefined}
              style={{
                borderRight: i % 7 !== 6 ? "1px solid var(--line)" : "none",
                borderBottom: i < 35 ? "1px solid var(--line)" : "none",
                minWidth: 0,
                padding: 6,
                aspectRatio: 1,
                background: inMonth ? "var(--surface)" : "var(--surface-2)",
                opacity: inMonth ? 1 : 0.55,
                cursor: onDayClick ? "pointer" : "default",
                display: "flex",
                flexDirection: "column",
                gap: 3,
                position: "relative",
                transition: "background .12s",
              }}
              onMouseEnter={(e) => {
                if (inMonth)
                  e.currentTarget.style.background = "var(--surface-2)";
              }}
              onMouseLeave={(e) => {
                if (inMonth)
                  e.currentTarget.style.background = "var(--surface)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "2px 4px",
                }}
              >
                {isToday ? (
                  <span
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "var(--brand)",
                      color: "#fff",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11.5,
                      fontWeight: 600,
                    }}
                  >
                    {d.getDate()}
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: inMonth ? "var(--ink-2)" : "var(--ink-5)",
                      padding: "2px 6px",
                    }}
                  >
                    {d.getDate()}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {visible.map((ev) => {
                  const sec = primarySection(ev);
                  return (
                    <button
                      key={ev.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(ev);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "2px 6px",
                        borderRadius: 4,
                        background: sec.soft,
                        color: "var(--ink-2)",
                        border: 0,
                        cursor: "pointer",
                        textAlign: "left",
                        fontSize: 11.5,
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        borderLeft: "3px solid " + sec.color,
                      }}
                    >
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {ev.title}
                      </span>
                    </button>
                  );
                })}
                {overflow > 0 && (
                  <button
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      padding: "1px 6px",
                      background: "transparent",
                      border: 0,
                      fontSize: 11,
                      color: "var(--ink-4)",
                      textAlign: "left",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    + {overflow} más
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

window.MonthGrid = MonthGrid;
