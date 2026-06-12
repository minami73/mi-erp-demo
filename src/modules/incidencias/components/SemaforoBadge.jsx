/* ─── SemaforoBadge ────────────────────────────────────────────────────────── */

const SemaforoBadge = ({ estado }) => {
  const SEMAFORO = window.SEMAFORO;
  const cfg = SEMAFORO[estado];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 20,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        color: cfg.color,
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      <window.SemaforoDot estado={estado} size={7} />
      {cfg.label}
    </span>
  );
};

window.SemaforoBadge = SemaforoBadge;
