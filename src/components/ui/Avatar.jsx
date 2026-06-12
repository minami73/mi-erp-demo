const Avatar = ({ initials, size = 32, color = 'var(--brand)' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    background: 'linear-gradient(135deg, ' + color + ' 0%, color-mix(in oklab, ' + color + ', white 25%) 100%)',
    color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    fontSize: size * 0.36, fontWeight: 600, letterSpacing: '.02em',
  }}>{initials}</div>
);

const Pill = ({ color, soft, children, style }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '3px 9px', borderRadius: 999, fontSize: 11.5, fontWeight: 500,
    background: soft || 'var(--bg-sunk)', color: 'var(--ink-2)',
    border: '1px solid rgba(0,0,0,.04)',
    ...style,
  }}>
    {color && <span style={{ width: 7, height: 7, borderRadius: 999, background: color }} />}
    {children}
  </span>
);

window.Avatar = Avatar;
window.Pill = Pill;
