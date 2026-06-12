const Button = ({ variant = 'secondary', size = 'md', icon, iconRight, children, style, ...props }) => {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: 'var(--font-sans)', fontWeight: 500,
    border: '1px solid transparent', borderRadius: 'var(--radius)',
    cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'background .12s, border-color .12s, color .12s, transform .05s',
    userSelect: 'none',
  };
  const sizes = {
    sm: { padding: '6px 10px',  fontSize: 12, height: 30 },
    md: { padding: '8px 14px',  fontSize: 14, height: 36 },
    lg: { padding: '10px 18px', fontSize: 16, height: 42 },
  };
  const variants = {
    primary: { background: 'var(--brand)',    color: 'var(--brand-ink)', borderColor: 'var(--brand)' },
    secondary: { background: 'var(--surface)', color: 'var(--ink)',      borderColor: 'var(--line-strong)' },
    ghost:   { background: 'transparent',     color: 'var(--ink-3)',     borderColor: 'transparent' },
    soft:    { background: 'var(--bg-sunk)',  color: 'var(--ink-2)',     borderColor: 'transparent' },
    danger:  { background: '#fff',            color: '#b3261e',          borderColor: '#f1d5d2' },
  };
  return (
    <button {...props} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 14 : 16} />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 14 : 16} />}
    </button>
  );
};

const IconButton = ({ icon, size = 36, title, onClick, style }) => (
  <button onClick={onClick} title={title}
    style={{
      width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: 'transparent', border: '1px solid transparent', borderRadius: 8,
      color: 'var(--ink-3)', cursor: 'pointer', transition: 'background .12s, color .12s',
      ...style,
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-sunk)'; e.currentTarget.style.color = 'var(--ink)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--ink-3)'; }}
  >
    <Icon name={icon} size={18} />
  </button>
);

window.Button = Button;
window.IconButton = IconButton;
