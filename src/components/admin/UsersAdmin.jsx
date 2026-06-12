const UsersAdmin = () => {
  const { USERS, SECTIONS } = window.CV_DATA;
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('todos');

  const sectionOf = (id) => SECTIONS.find(s => s.id === id);

  const filtered = USERS.filter(u =>
    (roleFilter === 'todos' || u.role === roleFilter) &&
    (search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
  );

  const roleColors = {
    'Director General':     'var(--brand)',
    'Director de Sección':  'oklch(0.55 0.14 245)',
    'Desarrollo Académico': 'oklch(0.55 0.14 160)',
    'Vinculación':          'oklch(0.55 0.14 305)',
    'Administración':       'oklch(0.55 0.04 260)',
  };

  const uniqueRoles = [...new Set(USERS.map(u => u.role))];

  return (
    <div data-screen-label="05 Usuarios" style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: 340 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)' }}>
            <Icon name="search" size={16} />
          </span>
          <Input placeholder="Buscar por nombre o correo…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 36 }} />
        </div>
        <Select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ width: 220 }}>
          <option value="todos">Todos los roles</option>
          {uniqueRoles.map(r => <option key={r} value={r}>{r}</option>)}
        </Select>

        <div style={{ flex: 1 }} />

        <Button variant="secondary" size="md" icon="download">Exportar lista</Button>
        <Button variant="primary"   size="md" icon="plus">Nuevo usuario</Button>
      </div>

      <div style={{
        background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.6fr 1.4fr 1.2fr 1.6fr 90px 80px',
          padding: '12px 20px', background: 'var(--surface-2)',
          borderBottom: '1px solid var(--line)',
          fontSize: 11, fontWeight: 600, color: 'var(--ink-4)',
          textTransform: 'uppercase', letterSpacing: '.07em',
        }}>
          <div>Nombre</div>
          <div>Correo</div>
          <div>Rol</div>
          <div>Secciones asignadas</div>
          <div>Estado</div>
          <div style={{ textAlign: 'right' }}></div>
        </div>

        {filtered.map((u, i) => (
          <div key={u.id} style={{
            display: 'grid',
            gridTemplateColumns: '1.6fr 1.4fr 1.2fr 1.6fr 90px 80px',
            alignItems: 'center', padding: '14px 20px',
            borderBottom: i < filtered.length - 1 ? '1px solid var(--line)' : 'none',
            transition: 'background .12s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar initials={u.initials} size={36} color={roleColors[u.role] || 'var(--brand)'} />
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500 }}>{u.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-4)', marginTop: 1 }}>ID #{String(u.id).padStart(4,'0')}</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)', fontSize: 12.5 }}>
              {u.email}
            </div>
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '4px 10px', borderRadius: 999, fontSize: 12,
                background: 'var(--bg-sunk)', color: 'var(--ink-2)',
                fontWeight: 500,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: 999, background: roleColors[u.role] || 'var(--brand)' }} />
                {u.role}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {u.sections.map(sid => {
                const s = sectionOf(sid);
                if (!s) return null;
                return (
                  <span key={sid} title={s.label} style={{
                    fontSize: 11, fontWeight: 500,
                    padding: '2px 7px', borderRadius: 999,
                    background: s.soft, color: 'var(--ink-2)',
                    border: '1px solid rgba(0,0,0,.04)',
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: 999, background: s.color }} />
                    {s.label}
                  </span>
                );
              })}
            </div>
            <div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '3px 9px', borderRadius: 999, fontSize: 11.5, fontWeight: 500,
                background: u.active ? 'oklch(0.95 0.06 150)' : 'var(--bg-sunk)',
                color: u.active ? 'oklch(0.42 0.12 150)' : 'var(--ink-4)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999,
                  background: u.active ? 'oklch(0.62 0.16 150)' : 'var(--ink-5)' }} />
                {u.active ? 'Activo' : 'Inactivo'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton icon="settings" title="Editar usuario" />
            </div>
          </div>
        ))}
      </div>

      <div style={{
        padding: 20, background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <h3 style={{ margin: 0, fontSize: 11.5, fontWeight: 600, color: 'var(--ink-4)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Roles del sistema
        </h3>
        <div style={{
          marginTop: 14, display: 'grid', gap: 12,
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}>
          {[
            { name: 'Director General',     desc: 'Acceso total al sistema y a todos los módulos.' },
            { name: 'Director de Sección',  desc: 'Gestión de su sección y sus eventos.' },
            { name: 'Desarrollo Académico', desc: 'Planeaciones, capacitación, evaluación docente.' },
            { name: 'Vinculación',          desc: 'Comunicación con SEP, padres y aliados externos.' },
          ].map(r => (
            <div key={r.name} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: roleColors[r.name], marginTop: 6 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-4)', marginTop: 2, lineHeight: 1.45 }}>{r.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

window.UsersAdmin = UsersAdmin;
