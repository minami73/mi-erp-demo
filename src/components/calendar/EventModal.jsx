const EventModal = ({
  event,
  onClose,
  onSave,
  onDelete,
  isNew,
  currentUser,
}) => {
  const { SECTIONS, EVENT_TYPES, editableSectionsFor } = window.CV_DATA;
  const allowedSections = editableSectionsFor(currentUser);
  // Solo consulta si: el usuario no edita nada (Vinculación), o el evento
  // tiene secciones fuera de su scope (multisección = scope en TODAS)
  const readOnly =
    allowedSections.length === 0 ||
    (!isNew && !event.sections.every((s) => allowedSections.includes(s)));
  const [draft, setDraft] = useState(event);
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (k, v) => {
    setError(null); // el error se limpia en cuanto el usuario corrige algo
    setDraft((d) => ({ ...d, [k]: v }));
  };

  const validate = () => {
    if (!draft.title.trim()) return "El título es obligatorio.";
    if (!draft.start || !draft.end) return "Indica fecha de inicio y fin.";
    if (draft.end < draft.start)
      return "La fecha de fin no puede ser anterior a la de inicio.";
    if (draft.sections.length === 0) return "Selecciona al menos una sección.";
    return null;
  };

  const handleSave = () => {
    const err = validate();
    if (err) return setError(err);
    onSave({ ...draft, title: draft.title.trim() });
  };

  const toggleSection = (id) => {
    set(
      "sections",
      draft.sections.includes(id)
        ? draft.sections.filter((s) => s !== id)
        : [...draft.sections, id],
    );
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const sectionObjects = SECTIONS.filter((s) => draft.sections.includes(s.id));
  const primary = sectionObjects[0] || SECTIONS[0];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(20,22,28,.36)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "overlayIn .15s ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(640px, 100%)",
          maxHeight: "calc(100vh - 48px)",
          background: "var(--surface)",
          borderRadius: "var(--radius-xl)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          animation: "modalIn .18s ease-out",
          overflow: "hidden",
        }}
      >
        <div style={{ height: 6, background: primary.color }} />

        <div
          style={{
            padding: "20px 24px 4px",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              {isNew
                ? "Nuevo evento"
                : readOnly
                  ? "Detalle del evento"
                  : "Editar evento"}
            </div>
            <input
              autoFocus={isNew}
              disabled={readOnly}
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Título del evento"
              style={{
                width: "100%",
                border: 0,
                outline: "none",
                background: "transparent",
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-.015em",
                padding: "4px 0",
                marginTop: 4,
                color: "var(--ink)",
              }}
            />
          </div>
          <IconButton icon="close" onClick={onClose} title="Cerrar" />
        </div>

        <div
          style={{
            padding: "12px 24px 20px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <Field label="Fecha de inicio">
              <Input
                type="date"
                disabled={readOnly}
                value={draft.start}
                onChange={(e) => set("start", e.target.value)}
              />
            </Field>
            <Field label="Fecha de fin">
              <Input
                type="date"
                disabled={readOnly}
                value={draft.end}
                onChange={(e) => set("end", e.target.value)}
              />
            </Field>
            <Field label="Horario">
              <Input
                type="text"
                disabled={readOnly}
                value={draft.time}
                onChange={(e) => set("time", e.target.value)}
                placeholder="09:00 – 11:00"
              />
            </Field>
          </div>

          <Field label="Tipo de evento">
            <Select
              disabled={readOnly}
              value={draft.type}
              onChange={(e) => set("type", e.target.value)}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field
            label="Secciones a las que aplica"
            hint={
              readOnly
                ? "Solo consulta: no tienes permisos de edición sobre este evento."
                : allowedSections.length === SECTIONS.length
                  ? "Selecciona una o más. El color principal se toma de la primera sección."
                  : "Tu acceso está limitado a tu(s) sección(es) asignada(s)."
            }
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 2,
              }}
            >
              {SECTIONS.filter((s) =>
                readOnly
                  ? draft.sections.includes(s.id)
                  : allowedSections.includes(s.id),
              ).map((s) => {
                const selected = draft.sections.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    disabled={readOnly}
                    onClick={readOnly ? undefined : () => toggleSection(s.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px",
                      borderRadius: 999,
                      cursor: readOnly ? "default" : "pointer",
                      border:
                        "1px solid " +
                        (selected ? "transparent" : "var(--line-strong)"),
                      background: selected ? s.color : "var(--surface)",
                      color: selected ? "#fff" : "var(--ink-2)",
                      fontSize: 12.5,
                      fontWeight: 500,
                      transition: "all .12s",
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: selected
                          ? "rgba(255,255,255,.85)"
                          : s.color,
                      }}
                    />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field label="Descripción">
            <Textarea
              disabled={readOnly}
              value={draft.desc}
              onChange={(e) => set("desc", e.target.value)}
              rows={3}
              placeholder="Añade notas, responsables, lugar..."
            />
          </Field>
        </div>

        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "var(--surface-2)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              minWidth: 0,
            }}
          >
            {!isNew && !readOnly && (
              <Button
                variant="danger"
                size="md"
                style={
                  confirmDelete
                    ? { background: "#b3261e", color: "#fff" }
                    : undefined
                }
                onClick={() =>
                  confirmDelete ? onDelete(draft.id) : setConfirmDelete(true)
                }
                onMouseLeave={() => setConfirmDelete(false)}
              >
                {confirmDelete ? "¿Confirmar eliminación?" : "Eliminar"}
              </Button>
            )}
            {error && (
              <span
                style={{
                  fontSize: 12.5,
                  color: "#b3261e",
                  fontWeight: 500,
                }}
              >
                {error}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <Button variant="secondary" size="md" onClick={onClose}>
              {readOnly ? "Cerrar" : "Cancelar"}
            </Button>
            {!readOnly && (
              <Button
                variant="primary"
                size="md"
                icon="check"
                onClick={handleSave}
              >
                {isNew ? "Crear evento" : "Guardar cambios"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

window.EventModal = EventModal;
