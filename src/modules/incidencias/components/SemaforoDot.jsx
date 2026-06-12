/* ─── SemaforoDot ──────────────────────────────────────────────────────────── */

const SemaforoDot = ({ estado, size = 10 }) => {
  const SEMAFORO = window.SEMAFORO;
  return (
    <span
      style={{
        display: "inline-block",
        width: size,
        height: size,
        borderRadius: "50%",
        background: SEMAFORO[estado].color,
        flexShrink: 0,
        boxShadow: `0 0 0 2px ${SEMAFORO[estado].bg}`,
      }}
    />
  );
};

window.SemaforoDot = SemaforoDot;
