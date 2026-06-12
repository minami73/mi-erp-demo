/* ─── NuevoAlumnoModal ─────────────────────────────────────────────────────── */

const NuevoAlumnoModal = ({ onSave, onClose }) => {
  const sections = window.CV_DATA.SECTIONS.filter((s) => s.id !== "general");
  const users = window.CV_DATA.USERS.filter((u) => u.active);

  const [alumnoForm, setAlumnoForm] = useState({
    nombre: "",
    apellido: "",
    seccion: "",
    grado: "",
    grupo: "",
  });
  const [incForm, setIncForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    gravedad: "leve",
    fecha: new Date().toISOString().slice(0, 10),
    registradoPor: users[0]?.name || "",
  });
  const [errors, setErrors] = useState({});

  const setA = (k, v) => {
    setAlumnoForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: null }));
  };
  const setI = (k, v) => {
    setIncForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: null }));
  };

  const handleSave = () => {
    const e = {};
    if (!alumnoForm.nombre.trim()) e.nombre = "Requerido";
    if (!alumnoForm.apellido.trim()) e.apellido = "Requerido";
    if (!alumnoForm.seccion) e.seccion = "Requerido";
    if (!alumnoForm.grado.trim()) e.grado = "Requerido";
    if (!alumnoForm.grupo.trim()) e.grupo = "Requerido";
    if (!incForm.titulo.trim()) e.titulo = "Requerido";
    if (!incForm.categoria) e.categoria = "Selecciona una categor\u00eda";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSave({ alumnoData: alumnoForm, incData: incForm });
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
          width: 580,
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
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)" }}>
            Nuevo alumno + incidencia
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

        {/* Datos del alumno */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--ink-4)",
            letterSpacing: ".05em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Datos del alumno
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <div>
              <label style={lbl}>Nombre *</label>
              <input
                type="text"
                placeholder="Ej. Diego"
                value={alumnoForm.nombre}
                onChange={(e) => setA("nombre", e.target.value)}
                style={inp(errors.nombre)}
              />
              {errors.nombre && <div style={err}>{errors.nombre}</div>}
            </div>
            <div>
              <label style={lbl}>Apellido(s) *</label>
              <input
                type="text"
                placeholder="Ej. Ram\u00edrez Luna"
                value={alumnoForm.apellido}
                onChange={(e) => setA("apellido", e.target.value)}
                style={inp(errors.apellido)}
              />
              {errors.apellido && <div style={err}>{errors.apellido}</div>}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <div>
              <label style={lbl}>Secci\u00f3n *</label>
              <select
                value={alumnoForm.seccion}
                onChange={(e) => setA("seccion", e.target.value)}
                style={inp(errors.seccion)}
              >
                <option value="">Seleccionar&hellip;</option>
                {sections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
              {errors.seccion && <div style={err}>{errors.seccion}</div>}
            </div>
            <div>
              <label style={lbl}>Grado *</label>
              <input
                type="text"
                placeholder="Ej. 2\u00b0"
                value={alumnoForm.grado}
                onChange={(e) => setA("grado", e.target.value)}
                style={inp(errors.grado)}
              />
              {errors.grado && <div style={err}>{errors.grado}</div>}
            </div>
            <div>
              <label style={lbl}>Grupo *</label>
              <input
                type="text"
                placeholder="Ej. A"
                value={alumnoForm.grupo}
                onChange={(e) => setA("grupo", e.target.value)}
                style={inp(errors.grupo)}
                maxLength={3}
              />
              {errors.grupo && <div style={err}>{errors.grupo}</div>}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{ borderTop: "1px solid var(--line)", margin: "0 0 16px" }}
        />

        {/* Primera incidencia */}
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: "var(--ink-4)",
            letterSpacing: ".05em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Primera incidencia
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={lbl}>T\u00edtulo *</label>
            <input
              type="text"
              placeholder="Ej. Falta de respeto a docente"
              value={incForm.titulo}
              onChange={(e) => setI("titulo", e.target.value)}
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
                value={incForm.categoria}
                onChange={(e) => setI("categoria", e.target.value)}
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
                value={incForm.gravedad}
                onChange={(e) => setI("gravedad", e.target.value)}
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
              <label style={lbl}>Fecha del incidente</label>
              <input
                type="date"
                value={incForm.fecha}
                onChange={(e) => setI("fecha", e.target.value)}
                style={inp(false)}
              />
            </div>
            <div>
              <label style={lbl}>Registrado por</label>
              <select
                value={incForm.registradoPor}
                onChange={(e) => setI("registradoPor", e.target.value)}
                style={inp(false)}
              >
                {users.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label style={lbl}>Descripci\u00f3n</label>
            <textarea
              placeholder="Detalles del incidente&hellip;"
              value={incForm.descripcion}
              onChange={(e) => setI("descripcion", e.target.value)}
              rows={2}
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
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

window.NuevoAlumnoModal = NuevoAlumnoModal;
