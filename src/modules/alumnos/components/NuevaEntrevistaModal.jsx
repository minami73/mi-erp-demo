/* ─── NuevaEntrevistaModal ──────────────────────────────────────────────────
   Mismo patrón visual que NuevaIncidenciaModal (módulo Incidencias): overlay
   fijo, caja centrada, labels/errores propios. No existía un modal de
   entrevistas reutilizable — el de Alumnos Especiales está inline y no se
   exporta — así que se extrae aquí usando los inputs globales de ui/Form.jsx. */

const NuevaEntrevistaModal = ({ alumno, onSave, onClose }) => {
  const [form, setForm] = useState({
    date: window.fmtDate(new Date()),
    attendees: alumno.tutor || "",
    summary: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: null }));
  };

  const handleSave = () => {
    const e = {};
    if (!form.date) e.date = "Campo requerido";
    if (!form.attendees.trim()) e.attendees = "Campo requerido";
    if (!form.summary.trim()) e.summary = "Campo requerido";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave({ id: `${alumno.id}-ent-${Date.now()}`, ...form });
  };

  const lbl = {
    fontSize: 12,
    fontWeight: 500,
    color: "var(--ink-2)",
    display: "block",
    marginBottom: 4,
  };
  const err = { fontSize: 11, color: "#b91c1c", marginTop: 2 };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: 12,
          width: 480,
          maxWidth: "calc(100vw - 32px)",
          maxHeight: "calc(100vh - 64px)",
          overflow: "auto",
          boxShadow: "0 20px 60px rgba(0,0,0,.25)",
          padding: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
              Nueva entrevista
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>
              {alumno.nombreCompleto}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink-3)",
              padding: 4,
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={lbl}>Fecha *</label>
            <window.Input
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              style={{ borderColor: errors.date ? "#fca5a5" : undefined }}
            />
            {errors.date && <div style={err}>{errors.date}</div>}
          </div>

          <div>
            <label style={lbl}>Asistentes *</label>
            <window.Input
              type="text"
              placeholder="Ej. Mamá (Claudia Ruiz) y tutor académico"
              value={form.attendees}
              onChange={(e) => set("attendees", e.target.value)}
              style={{ borderColor: errors.attendees ? "#fca5a5" : undefined }}
            />
            {errors.attendees && <div style={err}>{errors.attendees}</div>}
          </div>

          <div>
            <label style={lbl}>Resumen de la entrevista *</label>
            <window.Textarea
              rows={4}
              placeholder="¿Qué se trató? ¿Qué se acordó? ¿Próximos pasos?"
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              style={{ borderColor: errors.summary ? "#fca5a5" : undefined }}
            />
            {errors.summary && <div style={err}>{errors.summary}</div>}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 8,
            marginTop: 20,
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: 7,
              border: "1px solid var(--line)",
              background: "var(--surface)",
              color: "var(--ink-2)",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "8px 16px",
              borderRadius: 7,
              border: "none",
              background: "var(--brand)",
              color: "var(--brand-ink)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

window.NuevaEntrevistaModal = NuevaEntrevistaModal;
