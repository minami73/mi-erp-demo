/* ─── TabIncidencias — panel de detalle del módulo Incidencias, sin el
   directorio lateral ─────────────────────────────────────────────────────
   Reusa tal cual los componentes y helpers del módulo Incidencias
   (window.SemaforoBadge, window.IncidenciaItem, window.calcSemaforo,
   window.NuevaIncidenciaModal) — cero componentes nuevos de incidencias.

   Adaptador: NuevaIncidenciaModal espera alumno.apellido y alumno.grado como
   texto (formato del módulo Incidencias), pero el alumno de bachillerato usa
   apP/apM y grado numérico. Se le pasa un objeto adaptado en vez de tocar el
   modal compartido, que el módulo Incidencias original sigue usando tal cual. */

const TabIncidencias = ({ alumno, incidencias, onAdd, onResolver }) => {
  const [showModal, setShowModal] = useState(false);
  const semaforo = window.calcSemaforo(alumno.id, incidencias);
  const activas = incidencias.filter((i) => i.estado === "activa");
  const resueltas = incidencias.filter((i) => i.estado === "resuelta");

  const alumnoParaModal = {
    ...alumno,
    apellido: `${alumno.apP} ${alumno.apM}`,
    grado: `${alumno.grado}°`,
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <window.SemaforoBadge estado={semaforo} />
          <span
            style={{
              fontSize: 13,
              color: activas.length > 0 ? "#b91c1c" : "var(--ink-4)",
              fontWeight: activas.length > 0 ? 500 : 400,
            }}
          >
            {activas.length} incidencia{activas.length !== 1 ? "s" : ""} activa
            {activas.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button
          variant="primary"
          size="sm"
          icon="plus"
          onClick={() => setShowModal(true)}
        >
          Registrar incidencia
        </Button>
      </div>

      {incidencias.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            gap: 8,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 10,
            color: "var(--ink-4)",
          }}
        >
          <Icon name="check" size={32} style={{ color: "#15803d" }} />
          <div style={{ fontSize: 14, fontWeight: 500, color: "#15803d" }}>
            Sin incidencias registradas
          </div>
          <div style={{ fontSize: 12 }}>
            Este alumno no tiene antecedentes disciplinarios
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {activas.length > 0 && (
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--ink-4)",
                letterSpacing: ".05em",
                textTransform: "uppercase",
              }}
            >
              Activas
            </div>
          )}
          {activas.map((inc) => (
            <window.IncidenciaItem
              key={inc.id}
              inc={inc}
              onResolver={(id, texto) => onResolver(alumno.id, id, texto)}
            />
          ))}

          {resueltas.length > 0 && (
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "var(--ink-4)",
                letterSpacing: ".05em",
                textTransform: "uppercase",
                marginTop: 6,
              }}
            >
              Resueltas
            </div>
          )}
          {resueltas.map((inc) => (
            <window.IncidenciaItem
              key={inc.id}
              inc={inc}
              onResolver={(id, texto) => onResolver(alumno.id, id, texto)}
            />
          ))}
        </div>
      )}

      {showModal && (
        <window.NuevaIncidenciaModal
          alumno={alumnoParaModal}
          onClose={() => setShowModal(false)}
          onSave={(form) => {
            onAdd(alumno.id, form);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

window.TabIncidencias = TabIncidencias;
