const EstadoPill = ({ estado }) => {
  const s = window.ESTADO_STYLE[estado] || window.ESTADO_STYLE.pendiente;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: "2px 9px",
        borderRadius: 999,
        background: s.bg,
        color: s.color,
        whiteSpace: "nowrap",
      }}
    >
      {s.label}
    </span>
  );
};

window.EstadoPill = EstadoPill;
