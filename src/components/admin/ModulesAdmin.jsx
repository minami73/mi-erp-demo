const ModulesAdmin = ({ modules, setModules }) => {
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);

  const toggle = (id) => setModules(ms => ms.map(m => m.id === id ? { ...m, active: !m.active } : m));

  const handleDrop = () => {
    if (!dragId || !overId || dragId === overId) { setDragId(null); setOverId(null); return; }
    const next = [...modules];
    const from = next.findIndex(m => m.id === dragId);
    const to   = next.findIndex(m => m.id === overId);
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setModules(next);
    setDragId(null); setOverId(null);
  };

  const activeCount = modules.filter(m => m.active).length;

  return (
    <div data-screen-label="04 Modulos" style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.55, maxWidth: 640 }}>
            Activa o desactiva módulos según las necesidades del colegio. Arrastra para cambiar el orden en el que aparecen en la barra lateral.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Stat label="Módulos activos" value={activeCount} />
          <Stat label="Disponibles"     value={modules.length} />
        </div>
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '52px 64px 1.2fr 2fr 110px 100px',
          padding: '12px 18px', background: 'var(--surface-2)',
          borderBottom: '1px solid var(--line)',
          fontSize: 11, fontWeight: 600, color: 'var(--ink-4)',
          textTransform: 'uppercase', letterSpacing: '.07em',
        }}>
          <div />
          <div>Orden</div>
          <div>Módulo</div>
          <div>Descripción</div>
          <div>Estado</div>
          <div style={{ textAlign: 'right' }}>Acciones</div>
        </div>

        {modules.map((m, i) => {
          const isDragging = dragId === m.id;
          const isOver = overId === m.id && dragId && dragId !== m.id;
          return (
            <div key={m.id}
              draggable
              onDragStart={() => setDragId(m.id)}
              onDragOver={(e) => { e.preventDefault(); setOverId(m.id); }}
              onDrop={handleDrop}
              onDragEnd={() => { setDragId(null); setOverId(null); }}
              style={{
                display: 'grid', gridTemplateColumns: '52px 64px 1.2fr 2fr 110px 100px',
                alignItems: 'center', padding: '14px 18px',
                borderBottom: i < modules.length - 1 ? '1px solid var(--line)' : 'none',
                opacity: isDragging ? 0.4 : 1,
                background: isOver ? 'var(--accent-soft)' : 'var(--surface)',
                borderTop: isOver ? '2px solid var(--brand)' : '2px solid transparent',
                transition: 'background .12s',
                cursor: 'grab',
              }}>
              <div style={{ color: 'var(--ink-5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Arrastra para reordenar">
                <Icon name="grip" size={16} />
              </div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-4)',
                background: 'var(--bg-sunk)', padding: '3px 8px', borderRadius: 999,
                display: 'inline-flex', justifyContent: 'center', minWidth: 32,
                width: 'fit-content',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9,
                  background: 'var(--accent-soft)', color: 'var(--brand)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon name={m.icon} size={18} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{m.label}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45, paddingRight: 12 }}>
                {m.desc}
              </div>
              <div>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '3px 9px', borderRadius: 999, fontSize: 11.5, fontWeight: 500,
                  background: m.active ? 'oklch(0.95 0.06 150)' : 'var(--bg-sunk)',
                  color: m.active ? 'oklch(0.42 0.12 150)' : 'var(--ink-4)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: 999,
                    background: m.active ? 'oklch(0.62 0.16 150)' : 'var(--ink-5)' }} />
                  {m.active ? 'Activo' : 'Inactivo'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                <Toggle checked={m.active} onChange={() => toggle(m.id)} />
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '14px 18px', background: 'var(--surface-2)',
        border: '1px dashed var(--line-strong)', borderRadius: 'var(--radius)',
        display: 'flex', alignItems: 'center', gap: 12,
        fontSize: 13, color: 'var(--ink-3)',
      }}>
        <Icon name="sparkle" size={16} style={{ color: 'var(--brand)' }} />
        <span>
          ¿Necesitas un módulo nuevo? El sistema es modular: podemos integrar módulos a medida (Tesorería, Becas, Egresados…) sin afectar la operación.
        </span>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div style={{
    padding: '10px 16px', background: 'var(--surface)',
    border: '1px solid var(--line)', borderRadius: 'var(--radius)',
    minWidth: 120,
  }}>
    <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-.01em' }}>{value}</div>
    <div style={{ fontSize: 11.5, color: 'var(--ink-4)', marginTop: 2 }}>{label}</div>
  </div>
);

window.ModulesAdmin = ModulesAdmin;
