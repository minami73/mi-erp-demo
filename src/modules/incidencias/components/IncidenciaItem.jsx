/* ─── IncidenciaItem ───────────────────────────────────────────────────────── */

const IncidenciaItem = ({ inc, onResolver }) => {
  const [expandResolv, setExpandResolv] = useState(false);
  const [texto, setTexto] = useState("");
  const activa = inc.estado === "activa";

  const GRAVEDAD = window.GRAVEDAD;
  const CAT_LABEL = window.CAT_LABEL;
  const fmtFecha = window.fmtFecha;
  const GravedadBadge = window.GravedadBadge;

  return (
    <div
      style={{
        border: "1px solid var(--line)",
        borderLeft: `3px solid ${GRAVEDAD[inc.gravedad].color}`,
        borderRadius: 8,
        padding: 14,
        background: "var(--surface)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          flexWrap: "wrap",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink)",
            flex: 1,
            minWidth: 0,
          }}
        >
          {inc.titulo}
        </span>
        <GravedadBadge gravedad={inc.gravedad} />
        {!activa && (
          <span
            style={{
              fontSize: 11,
              color: "#15803d",
              background: "#dcfce7",
              padding: "2px 8px",
              borderRadius: 10,
              fontWeight: 500,
            }}
          >
            Resuelta
          </span>
        )}
      </div>
      <div style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 6 }}>
        {fmtFecha(inc.fecha)} &middot;{" "}
        {CAT_LABEL[inc.categoria] || inc.categoria} &middot; {inc.registradoPor}
      </div>
      {inc.descripcion && (
        <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.55 }}>
          {inc.descripcion}
        </div>
      )}
      {!activa && inc.resolucion && (
        <div
          style={{
            marginTop: 8,
            padding: "8px 10px",
            background: "var(--surface-2)",
            borderRadius: 6,
            fontSize: 12,
            color: "var(--ink-3)",
          }}
        >
          <span style={{ fontWeight: 500, color: "var(--ink-2)" }}>
            Resoluci&oacute;n:{" "}
          </span>
          {inc.resolucion}
        </div>
      )}

      {activa && !expandResolv && (
        <button
          onClick={() => setExpandResolv(true)}
          style={{
            marginTop: 10,
            fontSize: 12,
            color: "var(--ink-3)",
            background: "none",
            border: "1px solid var(--line)",
            borderRadius: 5,
            padding: "4px 10px",
            cursor: "pointer",
          }}
        >
          Marcar como resuelta
        </button>
      )}

      {activa && expandResolv && (
        <div style={{ marginTop: 10 }}>
          <textarea
            placeholder="&iquest;C&oacute;mo se resolvi&oacute;? (opcional)"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            rows={2}
            style={{
              width: "100%",
              padding: "7px 10px",
              border: "1px solid var(--line)",
              borderRadius: 6,
              background: "var(--surface)",
              color: "var(--ink)",
              fontSize: 12,
              resize: "vertical",
              fontFamily: "inherit",
              boxSizing: "border-box",
              outline: "none",
            }}
          />
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <button
              onClick={() => {
                setExpandResolv(false);
                setTexto("");
              }}
              style={{
                fontSize: 12,
                color: "var(--ink-3)",
                background: "none",
                border: "1px solid var(--line)",
                borderRadius: 5,
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
            <button
              onClick={() =>
                onResolver(inc.id, texto || "Resuelta sin comentarios.")
              }
              style={{
                fontSize: 12,
                color: "#15803d",
                background: "#dcfce7",
                border: "1px solid #86efac",
                borderRadius: 5,
                padding: "4px 10px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

window.IncidenciaItem = IncidenciaItem;
