const Version2Modal = ({ docente2Name, onClose, onSave }) => {
  const [text, setText] = useState("");
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          width: 480,
          padding: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            Versión de {docente2Name}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink-4)",
              padding: 4,
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: "var(--ink-3)" }}>
          Describe el conflicto desde tu perspectiva. Esta versión quedará
          registrada junto a la del otro docente.
        </p>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tu versión de los hechos..."
          rows={5}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "9px 12px",
            fontSize: 13,
            borderRadius: 8,
            border: "1px solid var(--line)",
            background: "var(--bg)",
            color: "var(--ink)",
            outline: "none",
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 10,
            marginTop: 16,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "1px solid var(--line)",
              background: "transparent",
              color: "var(--ink-2)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={() => text.trim() && onSave(text.trim())}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              background: "var(--brand)",
              color: "var(--brand-ink)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              opacity: text.trim() ? 1 : 0.5,
            }}
          >
            Guardar versión
          </button>
        </div>
      </div>
    </div>
  );
};

window.Version2Modal = Version2Modal;
