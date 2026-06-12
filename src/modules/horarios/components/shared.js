/* ─── Shared sub-components ─────────────────────────────────────────── */

const HInfo = ({ icon, label, value }) => (
  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
    <div style={{ color: "var(--ink-4)", marginTop: 1 }}>
      <Icon name={icon} size={15} />
    </div>
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontSize: 10.5,
          color: "var(--ink-4)",
          textTransform: "uppercase",
          letterSpacing: ".06em",
          fontWeight: 500,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13,
          color: "var(--ink)",
          fontWeight: 500,
          marginTop: 2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

const HStat = ({ label, value }) => (
  <div
    style={{
      padding: "8px 12px",
      background: "var(--surface-2)",
      border: "1px solid var(--line)",
      borderRadius: "var(--radius)",
    }}
  >
    <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: "-.01em" }}>
      {value}
    </div>
    <div
      style={{
        fontSize: 10.5,
        color: "var(--ink-4)",
        marginTop: 2,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        fontWeight: 500,
      }}
    >
      {label}
    </div>
  </div>
);

window.HInfo = HInfo;
window.HStat = HStat;
