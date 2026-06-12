const NuevaIncidenciaModal = ({ teachers, onClose, onSave }) => {
  const [form, setForm] = useState({
    tipo: "en_aula",
    titulo: "",
    fecha: new Date().toISOString().slice(0, 10),
    docente1Id: teachers[0]?.id || "",
    docente2Id: teachers[1]?.id || "",
    version1: "",
    registradoPor: "",
    grupo: "",
    materia: "",
    medio: "verbal",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.titulo.trim()) e.titulo = true;
    if (!form.version1.trim()) e.version1 = true;
    if (!form.fecha) e.fecha = true;
    if (!form.docente1Id) e.docente1Id = true;
    if (!form.docente2Id) e.docente2Id = true;
    if (form.docente1Id === form.docente2Id) e.docente2Id = true;
    if (!form.registradoPor.trim()) e.registradoPor = true;
    if (form.tipo === "en_aula" && !form.grupo.trim()) e.grupo = true;
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const d = {
      tipo: form.tipo,
      titulo: form.titulo.trim(),
      fecha: form.fecha,
      docente1Id: form.docente1Id,
      docente2Id: form.docente2Id,
      version1: form.version1.trim(),
      registradoPor: form.registradoPor.trim(),
    };
    if (form.tipo === "en_aula") {
      d.grupo = form.grupo.trim();
      d.materia = form.materia.trim();
    } else {
      d.medio = form.medio;
    }
    onSave(d);
  };

  const fieldStyle = (err) => ({
    width: "100%",
    boxSizing: "border-box",
    padding: "7px 10px",
    fontSize: 13,
    borderRadius: 8,
    border: "1px solid " + (err ? "#ef4444" : "var(--line)"),
    background: "var(--bg)",
    color: "var(--ink)",
    outline: "none",
  });

  const label = (text, req) => (
    <div
      style={{
        fontSize: 12,
        fontWeight: 500,
        color: "var(--ink-3)",
        marginBottom: 4,
      }}
    >
      {text}
      {req && <span style={{ color: "#ef4444" }}> *</span>}
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          width: 560,
          maxHeight: "90vh",
          overflow: "auto",
          padding: 28,
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
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>
            Nueva incidencia
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--ink-4)",
              padding: 4,
            }}
          >
            <Icon name="close" size={18} />
          </button>
        </div>

        {/* Tipo */}
        <div style={{ marginBottom: 16 }}>
          {label("Tipo de incidencia", true)}
          <div style={{ display: "flex", gap: 8 }}>
            {["en_aula", "interpersonal"].map((t) => (
              <button
                key={t}
                onClick={() => set("tipo", t)}
                style={{
                  flex: 1,
                  padding: "7px 0",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  border:
                    "1px solid " +
                    (form.tipo === t ? "var(--brand)" : "var(--line)"),
                  background:
                    form.tipo === t ? "var(--accent-soft)" : "var(--bg)",
                  color: form.tipo === t ? "var(--brand)" : "var(--ink-3)",
                  cursor: "pointer",
                }}
              >
                {window.TIPO_LABELS[t]}
              </button>
            ))}
          </div>
        </div>

        {/* Título */}
        <div style={{ marginBottom: 14 }}>
          {label("Título del conflicto", true)}
          <input
            value={form.titulo}
            onChange={(e) => set("titulo", e.target.value)}
            placeholder="Descripción breve del conflicto"
            style={fieldStyle(errors.titulo)}
          />
        </div>

        {/* Fecha + Registrado por */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div>
            {label("Fecha del incidente", true)}
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => set("fecha", e.target.value)}
              style={fieldStyle(errors.fecha)}
            />
          </div>
          <div>
            {label("Registrado por", true)}
            <input
              value={form.registradoPor}
              onChange={(e) => set("registradoPor", e.target.value)}
              placeholder="Nombre de quien registra"
              style={fieldStyle(errors.registradoPor)}
            />
          </div>
        </div>

        {/* Docente 1 + Docente 2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <div>
            {label("Docente 1 (quien reporta)", true)}
            <select
              value={form.docente1Id}
              onChange={(e) => set("docente1Id", e.target.value)}
              style={fieldStyle(errors.docente1Id)}
            >
              {teachers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            {label("Docente 2 (otro involucrado)", true)}
            <select
              value={form.docente2Id}
              onChange={(e) => set("docente2Id", e.target.value)}
              style={fieldStyle(errors.docente2Id)}
            >
              {teachers
                .filter((t) => t.id !== form.docente1Id)
                .map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
            </select>
            {errors.docente2Id && form.docente1Id === form.docente2Id && (
              <div style={{ fontSize: 11, color: "#ef4444", marginTop: 3 }}>
                Debe ser diferente al Docente 1
              </div>
            )}
          </div>
        </div>

        {/* Campos condicionales */}
        {form.tipo === "en_aula" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginBottom: 14,
            }}
          >
            <div>
              {label("Grupo", true)}
              <input
                value={form.grupo}
                onChange={(e) => set("grupo", e.target.value)}
                placeholder="ej. 5B Primaria"
                style={fieldStyle(errors.grupo)}
              />
            </div>
            <div>
              {label("Materia / asignatura")}
              <input
                value={form.materia}
                onChange={(e) => set("materia", e.target.value)}
                placeholder="ej. Matemáticas"
                style={fieldStyle(false)}
              />
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 14 }}>
            {label("Medio del conflicto")}
            <select
              value={form.medio}
              onChange={(e) => set("medio", e.target.value)}
              style={fieldStyle(false)}
            >
              <option value="whatsapp">WhatsApp</option>
              <option value="verbal">Verbal</option>
              <option value="correo">Correo</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        )}

        {/* Versión del docente 1 */}
        <div style={{ marginBottom: 20 }}>
          {label("Versión del Docente 1", true)}
          <textarea
            value={form.version1}
            onChange={(e) => set("version1", e.target.value)}
            placeholder="Descripción del conflicto desde la perspectiva de quien reporta..."
            rows={4}
            style={{
              ...fieldStyle(errors.version1),
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "1px solid var(--line)",
              background: "transparent",
              color: "var(--ink-2)",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Cancelar
          </button>
          <button
            onClick={submit}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              background: "var(--brand)",
              color: "var(--brand-ink)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
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
