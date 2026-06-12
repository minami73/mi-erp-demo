const VersionBlock = ({
  label,
  text,
  author,
  authorInitials,
  missing,
  onAdd,
}) => (
  <div style={{ marginBottom: 16 }}>
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
      {label}
    </div>
    {text ? (
      <div
        style={{
          background: "var(--bg)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          padding: "12px 14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8,
          }}
        >
          <Avatar2 initials={authorInitials} size={24} />
          <span
            style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)" }}
          >
            {author}
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            color: "var(--ink)",
            lineHeight: 1.55,
          }}
        >
          {text}
        </p>
      </div>
    ) : (
      <div
        style={{
          background: "#fffbeb",
          border: "1px dashed #f59e0b",
          borderRadius: 10,
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>⏳</span>
          <span style={{ fontSize: 13, color: "#92400e" }}>
            {missing} aún no ha registrado su versión
          </span>
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "5px 12px",
              borderRadius: 7,
              background: "#f59e0b",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Registrar versión
          </button>
        )}
      </div>
    )}
  </div>
);

window.VersionBlock = VersionBlock;
