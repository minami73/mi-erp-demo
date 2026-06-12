/* ─── GravedadBadge ────────────────────────────────────────────────────────── */

const GravedadBadge = ({ gravedad }) => {
  const GRAVEDAD = window.GRAVEDAD;
  const cfg = GRAVEDAD[gravedad];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 10,
        background: cfg.bg,
        color: cfg.color,
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {cfg.label}
    </span>
  );
};

window.GravedadBadge = GravedadBadge;
