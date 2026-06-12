const Field = ({ label, children, hint, style }) => (
  <label style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
    {label && <span style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink-3)', letterSpacing: '.01em' }}>{label}</span>}
    {children}
    {hint && <span style={{ fontSize: 11.5, color: 'var(--ink-4)' }}>{hint}</span>}
  </label>
);

const inputStyle = {
  height: 40, padding: '0 12px', borderRadius: 'var(--radius)',
  border: '1px solid var(--line-strong)', background: 'var(--surface)',
  fontSize: 16, outline: 'none', width: '100%',
  transition: 'border-color .12s, box-shadow .12s',
};

const Input = (props) => (
  <input {...props} style={{ ...inputStyle, ...(props.style || {}) }}
    onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.boxShadow = '0 0 0 3px rgba(31,37,64,.08)'; props.onFocus?.(e); }}
    onBlur={e => { e.target.style.borderColor = 'var(--line-strong)'; e.target.style.boxShadow = 'none'; props.onBlur?.(e); }}
  />
);

const Textarea = (props) => (
  <textarea {...props} style={{ ...inputStyle, height: 'auto', minHeight: 80, padding: '10px 12px', resize: 'vertical', ...(props.style || {}) }}
    onFocus={e => { e.target.style.borderColor = 'var(--brand)'; e.target.style.boxShadow = '0 0 0 3px rgba(31,37,64,.08)'; }}
    onBlur={e => { e.target.style.borderColor = 'var(--line-strong)'; e.target.style.boxShadow = 'none'; }}
  />
);

const Select = (props) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <select {...props} style={{ ...inputStyle, appearance: 'none', paddingRight: 34, cursor: 'pointer', ...(props.style || {}) }}>
      {props.children}
    </select>
    <div style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--ink-4)' }}>
      <Icon name="chevron-down" size={16} />
    </div>
  </div>
);

window.Field = Field;
window.Input = Input;
window.Textarea = Textarea;
window.Select = Select;
window.inputStyle = inputStyle;
