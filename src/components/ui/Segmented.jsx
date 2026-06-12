const Segmented = ({ value, onChange, options }) => (
  <div style={{
    display: 'inline-flex', padding: 3, background: 'var(--bg-sunk)',
    borderRadius: 'var(--radius)', border: '1px solid var(--line)',
  }}>
    {options.map(opt => {
      const active = value === opt.value;
      return (
        <button key={opt.value} onClick={() => onChange(opt.value)}
          style={{
            padding: '6px 12px', fontSize: 13, fontWeight: 500,
            background: active ? 'var(--surface)' : 'transparent',
            color: active ? 'var(--ink)' : 'var(--ink-3)',
            border: 0, borderRadius: 7, cursor: 'pointer',
            boxShadow: active ? 'var(--shadow-sm)' : 'none',
            transition: 'background .15s',
          }}>
          {opt.label}
        </button>
      );
    })}
  </div>
);

window.Segmented = Segmented;
