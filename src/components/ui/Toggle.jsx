const Toggle = ({ checked, onChange }) => (
  <button onClick={() => onChange(!checked)}
    style={{
      width: 38, height: 22, borderRadius: 999, position: 'relative', cursor: 'pointer',
      border: '1px solid ' + (checked ? 'var(--brand)' : 'var(--line-strong)'),
      background: checked ? 'var(--brand)' : '#fff',
      transition: 'all .15s', padding: 0,
    }}>
    <span style={{
      position: 'absolute', top: 2, left: checked ? 18 : 2,
      width: 16, height: 16, borderRadius: 999,
      background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.15)',
      transition: 'left .15s',
    }} />
  </button>
);

window.Toggle = Toggle;
