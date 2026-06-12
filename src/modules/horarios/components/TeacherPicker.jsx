/* ─── Teacher picker ────────────────────────────────────────────────── */

const TeacherPicker = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const current = window.TEACHERS.find((t) => t.id === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "4px 12px 4px 4px",
          height: 38,
          borderRadius: "var(--radius)",
          background: "var(--surface)",
          border: "1px solid var(--line-strong)",
          cursor: "pointer",
          minWidth: 260,
        }}
      >
        <Avatar initials={current.initials} size={30} color="var(--brand)" />
        <div style={{ textAlign: "left", lineHeight: 1.15, flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500 }}>{current.name}</div>
          <div style={{ fontSize: 11, color: "var(--ink-4)", marginTop: 2 }}>
            {current.role}
          </div>
        </div>
        <Icon name="chevron-down" size={14} style={{ color: "var(--ink-4)" }} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            left: 0,
            minWidth: 320,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            padding: 6,
            zIndex: 30,
            animation: "fadeIn .12s ease-out",
          }}
        >
          <div
            style={{
              padding: "8px 10px 6px",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--ink-4)",
              letterSpacing: ".08em",
              textTransform: "uppercase",
            }}
          >
            Personal docente
          </div>
          {window.TEACHERS.map((t) => {
            const sel = t.id === value;
            return (
              <button
                key={t.id}
                onClick={() => {
                  onChange(t.id);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: sel ? "var(--accent-soft)" : "transparent",
                  border: 0,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!sel) e.currentTarget.style.background = "var(--bg-sunk)";
                }}
                onMouseLeave={(e) => {
                  if (!sel) e.currentTarget.style.background = "transparent";
                }}
              >
                <Avatar initials={t.initials} size={30} color="var(--brand)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{t.name}</div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--ink-4)",
                      marginTop: 1,
                    }}
                  >
                    {t.role}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "var(--ink-4)",
                    fontFamily: "var(--font-mono)",
                    background: "var(--bg-sunk)",
                    padding: "2px 8px",
                    borderRadius: 999,
                  }}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

window.TeacherPicker = TeacherPicker;
