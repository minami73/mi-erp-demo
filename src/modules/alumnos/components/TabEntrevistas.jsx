/* ─── TabEntrevistas — timeline de entrevistas con tutores ──────────────────
   Mismo timeline vertical del módulo Alumnos Especiales (dot + línea
   conectora, pill "Más reciente"), adaptado a las cards del módulo Alumnos.
   Usa window.fmtFecha (módulo Incidencias) en vez de duplicar un formateador
   de fecha local. */

const TabEntrevistas = ({ alumno, entrevistas, onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const fmtFecha = window.fmtFecha;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".07em",
            textTransform: "uppercase",
          }}
        >
          Historial de entrevistas ({entrevistas.length})
        </div>
        <Button
          variant="primary"
          size="sm"
          icon="plus"
          onClick={() => setShowModal(true)}
        >
          Nueva entrevista
        </Button>
      </div>

      {entrevistas.length === 0 && (
        <div
          style={{
            padding: 24,
            textAlign: "center",
            color: "var(--ink-4)",
            fontSize: 13,
            background: "var(--surface)",
            borderRadius: 10,
            border: "1px solid var(--line)",
          }}
        >
          Sin entrevistas registradas
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {entrevistas.map((iv, idx) => (
          <div key={iv.id} style={{ display: "flex", gap: 14 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: idx === 0 ? "var(--brand)" : "var(--line-strong)",
                  marginTop: 4,
                  flexShrink: 0,
                }}
              />
              {idx < entrevistas.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    background: "var(--line)",
                    marginTop: 4,
                    minHeight: 20,
                  }}
                />
              )}
            </div>

            <div
              style={{
                flex: 1,
                padding: "14px 18px",
                background: "var(--surface)",
                borderRadius: 10,
                border: "1px solid var(--line)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6,
                  flexWrap: "wrap",
                }}
              >
                <Icon name="calendar" size={13} style={{ color: "var(--ink-4)" }} />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: idx === 0 ? "var(--brand)" : "var(--ink)",
                  }}
                >
                  {fmtFecha(iv.date)}
                </span>
                {idx === 0 && (
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      padding: "1px 7px",
                      borderRadius: 999,
                      background: "var(--brand-soft, #EFF6FF)",
                      color: "var(--brand)",
                    }}
                  >
                    Más reciente
                  </span>
                )}
              </div>
              <div
                style={{ fontSize: 12, color: "var(--ink-4)", marginBottom: 8 }}
              >
                <strong style={{ color: "var(--ink-3)" }}>Asistentes:</strong>{" "}
                {iv.attendees}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  color: "var(--ink)",
                  lineHeight: 1.65,
                }}
              >
                {iv.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <window.NuevaEntrevistaModal
          alumno={alumno}
          onClose={() => setShowModal(false)}
          onSave={(entrevista) => {
            onAdd(alumno.id, entrevista);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

window.TabEntrevistas = TabEntrevistas;
