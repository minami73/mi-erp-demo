const SidePanel = ({ monthEvents, today, primarySection, eventTypes, onEventClick }) => {
  const { SECTIONS } = window.CV_DATA;
  const todayKey = window.fmtDate(today);
  const upcoming = monthEvents.filter(e => e.start >= todayKey).slice(0, 6);

  const counts = SECTIONS.map(s => ({
    ...s, n: monthEvents.filter(e => e.sections.includes(s.id)).length,
  }));

  return (
    <aside style={{
      borderLeft: '1px solid var(--line)', background: 'var(--surface)',
      display: 'flex', flexDirection: 'column', overflowY: 'auto',
    }}>
      <section style={{ padding: '22px 24px 18px', borderBottom: '1px solid var(--line)' }}>
        <h3 style={{ margin: 0, fontSize: 11.5, fontWeight: 600, color: 'var(--ink-4)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Colores por sección
        </h3>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {counts.map(s => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                width: 14, height: 14, borderRadius: 4, background: s.color,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,.05)',
              }} />
              <span style={{ flex: 1, fontSize: 13, color: 'var(--ink-2)' }}>{s.label}</span>
              <span style={{
                fontSize: 11.5, color: 'var(--ink-4)', fontFamily: 'var(--font-mono)',
                background: 'var(--bg-sunk)', padding: '2px 7px', borderRadius: 999,
              }}>{s.n}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '20px 24px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <h3 style={{ margin: 0, fontSize: 11.5, fontWeight: 600, color: 'var(--ink-4)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            Próximos eventos
          </h3>
          <span style={{ fontSize: 11, color: 'var(--ink-5)' }}>{upcoming.length}</span>
        </div>

        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {upcoming.map(ev => {
            const sec = primarySection(ev);
            const d = window.parseDate(ev.start);
            return (
              <button key={ev.id} onClick={() => onEventClick(ev)}
                style={{
                  display: 'flex', gap: 12, padding: '10px 0',
                  background: 'transparent', border: 0, borderBottom: '1px solid var(--line)',
                  cursor: 'pointer', textAlign: 'left',
                }}>
                <div style={{
                  width: 44, flexShrink: 0, textAlign: 'center',
                  borderLeft: '2px solid ' + sec.color, paddingLeft: 10,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1, letterSpacing: '-.01em' }}>
                    {d.getDate()}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--ink-4)', textTransform: 'uppercase', marginTop: 3, fontWeight: 500, letterSpacing: '.06em' }}>
                    {window.MONTHS[d.getMonth()].slice(0,3)}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.3,
                    overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {ev.title}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-4)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{ev.time}</span>
                    <span style={{ color: 'var(--ink-5)' }}>·</span>
                    <span style={{ textTransform: 'capitalize' }}>{(eventTypes.find(t => t.id === ev.type) || {}).label}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
};

window.SidePanel = SidePanel;
