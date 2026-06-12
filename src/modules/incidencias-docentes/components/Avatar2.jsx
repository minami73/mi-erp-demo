const Avatar2 = ({ initials, size = 28 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: 999,
      background: "var(--brand)",
      color: "var(--brand-ink)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.36,
      fontWeight: 700,
      flexShrink: 0,
    }}
  >
    {initials}
  </div>
);

window.Avatar2 = Avatar2;
