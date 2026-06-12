/* ─── NuevaIncidenciaModal ─────────────────────────────────────────────────── */

const NuevaIncidenciaModal = ({ alumno, onSave, onClose }) => {
  const docentes = window.CV_DATA.TEACHERS;
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    gravedad: "leve",
    fecha: new Date().toISOString().slice(0, 10),
    registradoPor: docentes[0]?.name || "",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: null }));
  };

  const handleSave = () => {
    const e = {};
    if (!form.titulo.trim()) e.titulo = "Campo requerido";
    if (!form.categoria) e.categoria = "Selecciona una categor\u00eda";
    if (!form.fecha) e.fecha = "Campo requerido";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave(form);
  };

  const inp = (hasErr) => ({
    width: "100%",
    padding: "7px 10px",
    border: `1px solid ${hasErr ? "#fca5a5" : "var(--line)"}`,
    borderRadius: 6,
    background: "var(--surface)",
    color: "var(--ink)",
    fontSize: 13,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  });

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
          width: 520,
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
              Registrar incidencia
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>
              {alumno.nombre} {alumno.apellido} &middot; {alumno.grado}{" "}
              {alumno.grupo}
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
            <label style={lbl}>T\u00edtulo *</label>
            <input
              type="text"
              placeholder="Ej. Falta de respeto a docente"
              value={form.titulo}
              onChange={(e) => set("titulo", e.target.value)}
              style={inp(errors.titulo)}
            />
            {errors.titulo && <div style={err}>{errors.titulo}</div>}
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label style={lbl}>Categor\u00eda *</label>
              <select
                value={form.categoria}
                onChange={(e) => set("categoria", e.target.value)}
                style={inp(errors.categoria)}
              >
                <option value="">Seleccionar&hellip;</option>
                {window.CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              {errors.categoria && <div style={err}>{errors.categoria}</div>}
            </div>
            <div>
              <label style={lbl}>Gravedad</label>
              <select
                value={form.gravedad}
                onChange={(e) => set("gravedad", e.target.value)}
                style={inp(false)}
              >
                <option value="leve">Leve</option>
                <option value="media">Media</option>
                <option value="grave">Grave</option>
              </select>
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label style={lbl}>Fecha del incidente *</label>
              <input
                type="date"
                value={form.fecha}
                onChange={(e) => set("fecha", e.target.value)}
                style={inp(errors.fecha)}
              />
              {errors.fecha && <div style={err}>{errors.fecha}</div>}
            </div>
            <div>
              <label style={lbl}>Registrado por</label>
              <select
                value={form.registradoPor}
                onChange={(e) => set("registradoPor", e.target.value)}
                style={inp(false)}
              >
                {docentes.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={lbl}>Descripci\u00f3n</label>
            <textarea
              placeholder="Detalles del incidente&hellip;"
              value={form.descripcion}
              onChange={(e) => set("descripcion", e.target.value)}
              rows={3}
              style={{ ...inp(false), resize: "vertical" }}
            />
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
            Registrar
          </button>
        </div>
      </div>
    </div>
  );
};

window.NuevaIncidenciaModal = NuevaIncidenciaModal;
