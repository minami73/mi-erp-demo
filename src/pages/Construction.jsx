const Construction = ({ module }) => {
  const presets = {
    horarios: {
      icon: 'clock',
      tagline: 'Carga horaria visual y libre de conflictos.',
      features: [
        { t: 'Constructor visual', d: 'Asigna materias, docentes y aulas con arrastrar y soltar.' },
        { t: 'Detección de empalmes', d: 'El sistema avisa cuando un docente o aula tiene conflicto.' },
        { t: 'Vista por grupo, docente o aula', d: 'Filtra y exporta el horario desde cualquier perspectiva.' },
        { t: 'Publicación al alumnado', d: 'Una vez aprobado, se publica al portal de padres y a Outlook.' },
      ],
    },
    planeaciones: {
      icon: 'doc',
      tagline: 'Planeaciones didácticas con flujo de aprobación.',
      features: [
        { t: 'Plantillas por sección', d: 'Formatos predefinidos según los lineamientos de la NEM y SEP.' },
        { t: 'Revisión y comentarios', d: 'El jefe de academia revisa, comenta y aprueba en línea.' },
        { t: 'Versionado', d: 'Histórico completo de cambios y aprobaciones por bimestre.' },
        { t: 'Banco de evidencias', d: 'Cada planeación liga sus evidencias, rúbricas y actividades.' },
      ],
    },
    personal: {
      icon: 'users',
      tagline: 'Directorio, contratos e incidencias del personal.',
      features: [
        { t: 'Expediente digital', d: 'Datos personales, contratos, títulos y constancias en un solo lugar.' },
        { t: 'Incidencias y permisos', d: 'Solicitudes con flujo de aprobación de jefe directo.' },
        { t: 'Cumpleaños y aniversarios', d: 'Recordatorios automáticos al equipo directivo.' },
        { t: 'Evaluación de desempeño', d: 'Bitácora bimestral con metas y observaciones.' },
      ],
    },
    estacionamiento: {
      icon: 'car',
      tagline: 'Control de accesos y lugares asignados.',
      features: [
        { t: 'Lugares asignados', d: 'Cada colaborador tiene su lugar registrado y visible en plano.' },
        { t: 'Permisos temporales', d: 'Genera pases QR para proveedores y visitas.' },
        { t: 'Bitácora de accesos', d: 'Registro de entradas y salidas con hora y placa.' },
        { t: 'Reportes mensuales', d: 'Uso de cupo y reincidencias en lugares ajenos.' },
      ],
    },
  };
  const data = presets[module.id] || { icon: module.icon, tagline: module.desc, features: [] };

  return (
    <div data-screen-label={`02 ${module.label}`} style={{ padding: '40px 32px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ maxWidth: 760, width: '100%', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <div style={{
          padding: '36px 40px', borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)',
          color: 'var(--brand-ink)', position: 'relative', overflow: 'hidden',
        }}>
          <svg viewBox="0 0 400 200" style={{
            position: 'absolute', right: -20, top: -10, width: 320, height: 200, opacity: .13,
          }}>
            <circle cx="320" cy="40" r="120" fill="none" stroke="white" strokeWidth="1"/>
            <circle cx="320" cy="40" r="170" fill="none" stroke="white" strokeWidth=".5"/>
            <circle cx="320" cy="40" r="220" fill="none" stroke="white" strokeWidth=".5"/>
          </svg>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 12, background: 'rgba(255,255,255,.12)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,.18)',
            }}>
              <Icon name={data.icon} size={24} />
            </div>
            <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
              <Pill style={{ background: 'rgba(255,255,255,.15)', color: '#fff', border: 0 }}>
                <Icon name="wrench" size={11} /> En construcción
              </Pill>
              <span style={{ fontSize: 12, opacity: .7 }}>Disponible próximamente</span>
            </div>
            <h1 style={{
              margin: '12px 0 6px', fontSize: 34, fontWeight: 600,
              fontFamily: 'var(--font-serif)', letterSpacing: '-.01em',
            }}>
              {module.label}
            </h1>
            <p style={{ margin: 0, fontSize: 15, opacity: .85, maxWidth: 480, lineHeight: 1.5 }}>
              {data.tagline}
            </p>
          </div>
        </div>

        <section>
          <h2 style={{ margin: 0, fontSize: 11.5, fontWeight: 600, color: 'var(--ink-4)', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            Qué incluirá este módulo
          </h2>
          <div style={{
            marginTop: 14, display: 'grid', gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            background: 'var(--line)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--radius-lg)', overflow: 'hidden',
          }}>
            {data.features.map(f => (
              <div key={f.t} style={{
                background: 'var(--surface)', padding: '18px 20px',
                display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="check" size={14} style={{ color: 'var(--brand)' }} />
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{f.t}</div>
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.5 }}>{f.d}</div>
              </div>
            ))}
          </div>
        </section>

        <div style={{
          padding: '18px 22px', background: 'var(--surface)',
          border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)',
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>¿Te interesa este módulo?</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-4)', marginTop: 2 }}>
              Podemos priorizarlo en el siguiente ciclo de desarrollo.
            </div>
          </div>
          <Button variant="secondary" size="md">Ver hoja de ruta</Button>
          <Button variant="primary"   size="md" icon="bell">Avisarme cuando esté listo</Button>
        </div>
      </div>
    </div>
  );
};

window.Construction = Construction;
