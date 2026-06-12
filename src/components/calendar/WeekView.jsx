const WeekView = ({ cursor, today, eventsByDate, primarySection, onEventClick }) => {
  const dow = cursor.getDay();
  const weekStart = new Date(cursor);
  weekStart.setDate(cursor.getDate() - ((dow + 6) % 7));
  const days = Array.from({length:7}, (_,i) => { const d = new Date(weekStart); d.setDate(weekStart.getDate()+i); return d; });
  const todayKey = window.fmtDate(today);

  return (
    <div style={{
      flex: 1, display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
      border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
      background: 'var(--surface)', overflow: 'hidden', minWidth: 0,
    }}>
      {days.map((d, i) => {
        const key = window.fmtDate(d);
        const evs = eventsByDate[key] || [];
        const isToday = key === todayKey;
        return (
          <div key={i} style={{
            borderRight: i < 6 ? '1px solid var(--line)' : 'none',
            minWidth: 0,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              padding: '12px 14px', borderBottom: '1px solid var(--line)',
              background: isToday ? 'var(--accent-soft)' : 'var(--surface-2)',
            }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {window.DOWS[d.getDay()]}
              </div>
              <div style={{ fontSize: 22, fontWeight: 600, color: isToday ? 'var(--brand)' : 'var(--ink)', marginTop: 2 }}>
                {d.getDate()}
              </div>
            </div>
            <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
              {evs.map(ev => {
                const sec = primarySection(ev);
                return (
                  <button key={ev.id} onClick={() => onEventClick(ev)}
                    style={{
                      textAlign: 'left', padding: '8px 10px', borderRadius: 8,
                      background: sec.soft, border: 0, cursor: 'pointer',
                      borderLeft: '3px solid ' + sec.color,
                    }}>
                    <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--ink-3)' }}>{ev.time}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, marginTop: 2 }}>{ev.title}</div>
                  </button>
                );
              })}
              {evs.length === 0 && (
                <div style={{ fontSize: 11.5, color: 'var(--ink-5)', textAlign: 'center', padding: 20 }}>—</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

window.WeekView = WeekView;
