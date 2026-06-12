/* ─── SortTh ────────────────────────────────────────────────────────────────── */

const SortTh = ({ field, label, sortField, sortDir, onSort, center }) => {
  const active = sortField === field;
  return (
    <div
      onClick={() => onSort(field)}
      style={{
        textAlign: center ? "center" : "left",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 3,
        justifyContent: center ? "center" : "flex-start",
        color: active ? "var(--ink)" : "var(--ink-4)",
        userSelect: "none",
      }}
    >
      {label}
      {active && (sortDir === "asc" ? " \u25b2" : " \u25bc")}
    </div>
  );
};

window.SortTh = SortTh;
