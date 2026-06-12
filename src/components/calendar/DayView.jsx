const DayView = ({ cursor, eventsByDate, primarySection, onEventClick }) => {
  const key = window.fmtDate(cursor);
  const evs = eventsByDate[key] || [];
  return (
    <div style={{
      flex: 1, padding: 24, border: '1px solid var(--line)',
      borderRadius: 'var(--radius-lg)', background: 'var(--surface)',
    }}>
      <div style={{ fontSize: 12, color: 'var(--ink-4)', textTransform: 'capitalize' }}>
        {window.DOWS_LONG[cursor.getDay()]}
      </div>
      <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-.02em' }}>
        {cursor.getDate()} de {window.MONTHS[cursor.getMonth()]}
      </div>
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {evs.length === 0 && <div style={{ color: 'var(--ink-4)', fontSize: 13 }}>Sin eventos.</div>}
        {evs.map(ev => {
          const sec = primarySection(ev);
          return (
            <button key={ev.id} onClick={() => onEventClick(ev)}
              style={{
                display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 10,
                background: 'var(--surface-2)', border: '1px solid var(--line)',
                cursor: 'pointer', textAlign: 'left',
                borderLeft: '4px solid ' + sec.color,
              }}>
              <div style={{ minWidth: 110, fontSize: 12.5, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
                {ev.time}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 500 }}>{ev.title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 3 }}>{ev.desc}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

window.DayView = DayView;
