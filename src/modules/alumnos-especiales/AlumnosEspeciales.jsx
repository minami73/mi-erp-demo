const AlumnosEspeciales = () => {
  const CONDITIONS = {
    TEA: { label: "TEA", color: "#8B5CF6", soft: "#EDE9FE" },
    TDA: { label: "TDA", color: "#3B82F6", soft: "#DBEAFE" },
    TDAH: { label: "TDAH", color: "#F59E0B", soft: "#FEF3C7" },
    "situacion-legal": {
      label: "Sit. Legal",
      color: "#EF4444",
      soft: "#FEE2E2",
    },
  };

  const STATUS = {
    activo: { label: "Activo", color: "#6B7280", soft: "#F3F4F6" },
    "en-seguimiento": {
      label: "En seguimiento",
      color: "#D97706",
      soft: "#FEF3C7",
    },
    prioritario: { label: "Prioritario", color: "#DC2626", soft: "#FEE2E2" },
    estable: { label: "Estable", color: "#059669", soft: "#D1FAE5" },
  };

  const MOCK_STUDENTS = [
    {
      id: 1,
      name: "Santiago Morales Reyes",
      shortName: "Santiago M.",
      grade: "Preescolar 3°",
      age: 5,
      section: "preescolar",
      conditions: ["TEA"],
      status: "en-seguimiento",
      tutor: "Claudia Ruiz (mamá) · Tel: 231-108-3421",
      notes:
        "Diagnóstico confirmado por neuropediatra en marzo 2026. Presenta dificultades en la interacción social y comunicación verbal. Conductas repetitivas observadas principalmente en momentos de transición de actividades. El grupo de maestros fue notificado y se realizaron ajustes en la dinámica del salón.",
      interviews: [
        {
          id: 3,
          date: "2026-05-20",
          attendees: "Mamá (Claudia Ruiz) y neuropediatra Dra. Soto",
          summary:
            "La neuropediatra indica iniciar medicamento risperidona 0.5 mg en la mañana. Se monitorearán efectos secundarios como somnolencia. La institución deberá estar atenta a cambios de conducta. Próxima cita médica en julio.",
        },
        {
          id: 2,
          date: "2026-03-10",
          attendees: "Mamá (Claudia Ruiz) y terapeuta Lic. Flores",
          summary:
            "Terapeuta recomienda continuar con terapia ABA tres veces por semana. Se comparte guía de estrategias visuales para usar en clase (horario pictográfico, señales de pausa). Mamá reporta mejoras en casa con rutinas estructuradas.",
        },
        {
          id: 1,
          date: "2026-01-22",
          attendees: "Papá y mamá (Rodrigo Morales y Claudia Ruiz)",
          summary:
            "Primera entrevista formal. Se comunica la preocupación de la institución por las dificultades observadas. Los papás comparten que tienen cita pendiente con neuropediatra para evaluación diagnóstica. Se acuerda dar seguimiento mensual.",
        },
      ],
    },
    {
      id: 2,
      name: "Valeria Fuentes Paredes",
      shortName: "Valeria F.",
      grade: "Preescolar 2°",
      age: 4,
      section: "preescolar",
      conditions: ["TDAH"],
      status: "en-seguimiento",
      tutor: "Patricia Paredes (mamá) · Tel: 231-205-9087",
      notes:
        "Dificultad para mantener la atención en actividades que requieren más de 5 minutos de concentración. Alta impulsividad, se levanta constantemente del lugar. La maestra reporta que interrumpe frecuentemente a sus compañeros.",
      interviews: [
        {
          id: 2,
          date: "2026-04-15",
          attendees: "Mamá (Patricia Paredes) y psicóloga escolar Lic. Torres",
          summary:
            "Se aplicó la escala de Conners a maestros y mamá. Puntajes elevados en subescala de hiperactividad. Se recomienda consulta con neuropediatra para descartar TDAH combinado. Mamá acepta referir a especialista y confirma agendar cita.",
        },
        {
          id: 1,
          date: "2026-02-05",
          attendees: "Mamá (Patricia Paredes)",
          summary:
            "Detección inicial. Se muestra a mamá los registros de conducta de enero. Mamá menciona que en casa también tiene dificultades para terminar actividades. Se acuerda observación durante un mes antes de tomar acciones formales.",
        },
      ],
    },
    {
      id: 3,
      name: "Emiliano Castro Vega",
      shortName: "Emiliano C.",
      grade: "Maternal B",
      age: 3,
      section: "maternal",
      conditions: ["situacion-legal"],
      status: "prioritario",
      tutor: "Contacto autorizado: mamá Fernanda Vega · Tel: 231-441-0293",
      notes:
        "Proceso de divorcio con disputa de custodia activa. Medida cautelar vigente desde febrero 2026: el padre NO puede recoger al menor sin orden judicial. La institución tiene copia del oficio. El menor NO puede ser entregado a ninguna persona no autorizada por escrito.",
      interviews: [
        {
          id: 3,
          date: "2026-05-08",
          attendees: "Mamá (Fernanda Vega) y abogado Lic. Méndez",
          summary:
            "Actualización: el juicio continúa, no hay sentencia definitiva aún. Se renueva la medida cautelar por tres meses más. Se entrega copia actualizada del oficio a dirección. Se recuerda al personal docente el protocolo de entrega del menor.",
        },
        {
          id: 2,
          date: "2026-03-01",
          attendees: "Mamá (Fernanda Vega)",
          summary:
            "Se recibe oficio judicial con medida cautelar. Se instruye a la coordinadora de maternal sobre el protocolo. Se coloca nota en el expediente escolar del menor. El padre se presentó en escuela sin previo aviso la semana pasada — se documentó el incidente.",
        },
        {
          id: 1,
          date: "2026-01-30",
          attendees: "Mamá (Fernanda Vega)",
          summary:
            "Primera comunicación formal sobre la situación legal. Mamá informa que inició proceso de divorcio con disputa de custodia. Solicita que solo ella sea contactada y que el padre no pueda recoger al menor. Se le indica que se necesita orden judicial para aplicar restricción formal.",
        },
      ],
    },
    {
      id: 4,
      name: "Isabella Reyes Montoya",
      shortName: "Isabella R.",
      grade: "Preescolar 1°",
      age: 3,
      section: "preescolar",
      conditions: ["TDA"],
      status: "activo",
      tutor: "Gabriela Montoya (mamá) · Tel: 231-307-6612",
      notes:
        "Primera observación formal en abril. Dificultad para seguir instrucciones de más de dos pasos. Se distrae con estímulos visuales del entorno. Sin impulsividad marcada. La maestra recomienda evaluación.",
      interviews: [
        {
          id: 1,
          date: "2026-04-28",
          attendees: "Mamá (Gabriela Montoya)",
          summary:
            "Primera entrevista. Se comparte observación de la maestra. Mamá menciona que la pediatra también ha comentado dificultades de atención en las consultas. Se acuerda hacer registro formal durante mayo y junio antes de remitir a especialista.",
        },
      ],
    },
    {
      id: 5,
      name: "Mateo Hernández García",
      shortName: "Mateo H.",
      grade: "Maternal A",
      age: 2,
      section: "maternal",
      conditions: ["TEA", "situacion-legal"],
      status: "prioritario",
      tutor: "Papá (Hugo Hernández) · Tel: 231-519-8834",
      notes:
        "Alarma temprana de TEA detectada a los 20 meses. Actualmente en evaluación en CRIT Puebla. Además, situación de conflicto familiar: los papás están separados de hecho (sin proceso legal formal) y existe disputa informal sobre quién recoge al menor. Se tiene nota de que solo papá Hugo o abuela materna Sra. Carmen están autorizados.",
      interviews: [
        {
          id: 3,
          date: "2026-05-14",
          attendees: "Papá (Hugo Hernández) y terapeuta del CRIT",
          summary:
            "CRIT confirma perfil de TEA de nivel 1. Inician terapia de lenguaje y ocupacional dos veces por semana. Se solicita a la institución llevar registro de conductas y comunicarlo al equipo terapéutico cada mes. Se acuerda reunión de seguimiento en agosto.",
        },
        {
          id: 2,
          date: "2026-03-20",
          attendees: "Papá (Hugo Hernández)",
          summary:
            "Papá comparte resultados de evaluación del CRIT: en proceso diagnóstico, sugieren iniciar terapia temprana sin esperar diagnóstico final. Además se aborda la situación familiar: mamá se presentó en escuela a recogerlo sin autorización. Se explica el protocolo y se solicita lista escrita de personas autorizadas.",
        },
        {
          id: 1,
          date: "2026-02-10",
          attendees: "Papá (Hugo Hernández)",
          summary:
            "Alarma temprana detectada por maestra de Maternal A: falta de contacto visual, no responde a su nombre consistentemente, juego solitario repetitivo. Se sugiere evaluación pediátrica. Papá menciona que la pediatra ya había comentado algo similar. Se refiere al CRIT Puebla.",
        },
      ],
    },
  ];

  const [selected, setSelected] = useState(MOCK_STUDENTS[0]);
  const [search, setSearch] = useState("");
  const [filterCond, setFilterCond] = useState("todos");
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState(MOCK_STUDENTS);

  const [form, setForm] = useState({
    date: window.fmtDate(new Date()),
    attendees: "",
    summary: "",
  });

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.grade.toLowerCase().includes(search.toLowerCase());
    const matchCond =
      filterCond === "todos" || s.conditions.includes(filterCond);
    return matchSearch && matchCond;
  });

  const selectedStudent =
    students.find((s) => s.id === selected?.id) || students[0];

  const saveInterview = () => {
    if (!form.date || !form.attendees.trim() || !form.summary.trim()) return;
    const newEntry = {
      id: Date.now(),
      date: form.date,
      attendees: form.attendees.trim(),
      summary: form.summary.trim(),
    };
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, interviews: [newEntry, ...s.interviews] }
          : s,
      ),
    );
    setForm({ date: window.fmtDate(new Date()), attendees: "", summary: "" });
    setShowModal(false);
  };

  const fmtDateDisplay = (iso) => {
    const [y, m, d] = iso.split("-");
    const months = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];
    return `${parseInt(d)} de ${months[parseInt(m) - 1]} de ${y}`;
  };

  return (
    <div style={{ display: "flex", height: "100%", minHeight: 0 }}>
      {/* ── Lista lateral ── */}
      <div
        style={{
          width: 320,
          flexShrink: 0,
          borderRight: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          background: "var(--surface)",
        }}
      >
        {/* Search + filter */}
        <div
          style={{
            padding: "16px 16px 12px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <div style={{ position: "relative", marginBottom: 10 }}>
            <Icon
              name="search"
              size={14}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--ink-4)",
              }}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar alumno..."
              style={{
                width: "100%",
                height: 34,
                paddingLeft: 32,
                paddingRight: 10,
                border: "1px solid var(--line-strong)",
                borderRadius: 8,
                background: "var(--bg)",
                fontSize: 13,
                color: "var(--ink)",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
          <Select
            value={filterCond}
            onChange={(e) => setFilterCond(e.target.value)}
            style={{ width: "100%", height: 32, fontSize: 12.5 }}
          >
            <option value="todos">Todas las condiciones</option>
            {Object.entries(CONDITIONS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </Select>
        </div>

        {/* Student list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filtered.length === 0 && (
            <div
              style={{
                padding: 24,
                textAlign: "center",
                color: "var(--ink-4)",
                fontSize: 13,
              }}
            >
              Sin resultados
            </div>
          )}
          {filtered.map((s) => {
            const isActive = selectedStudent?.id === s.id;
            const st = STATUS[s.status];
            return (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  border: "none",
                  borderBottom: "1px solid var(--line)",
                  background: isActive
                    ? "var(--brand-soft, #EFF6FF)"
                    : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "var(--line-strong)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--ink-3)",
                    flexShrink: 0,
                  }}
                >
                  {s.name
                    .split(" ")
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: "var(--ink)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {s.shortName}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "var(--ink-4)",
                      marginTop: 1,
                    }}
                  >
                    {s.grade}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 4,
                  }}
                >
                  {s.conditions.map((c) => {
                    const cond = CONDITIONS[c];
                    return (
                      <span
                        key={c}
                        style={{
                          fontSize: 10.5,
                          fontWeight: 600,
                          padding: "1px 7px",
                          borderRadius: 999,
                          background: cond.soft,
                          color: cond.color,
                          letterSpacing: ".02em",
                        }}
                      >
                        {cond.label}
                      </span>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Expediente ── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          background: "var(--bg)",
        }}
      >
        {!selectedStudent ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "var(--ink-4)",
              fontSize: 14,
            }}
          >
            Selecciona un alumno
          </div>
        ) : (
          <div
            style={{ maxWidth: 740, margin: "0 auto", padding: "28px 32px" }}
          >
            {/* Confidentiality banner */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 8,
                background: "#FEF3C7",
                border: "1px solid #FCD34D",
                marginBottom: 24,
                fontSize: 12.5,
                color: "#92400E",
                fontWeight: 500,
              }}
            >
              <Icon
                name="lock"
                size={13}
                style={{ color: "#B45309", flexShrink: 0 }}
              />
              Información confidencial — acceso restringido
            </div>

            {/* Header alumno */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 18,
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "var(--line-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  color: "var(--ink-3)",
                  flexShrink: 0,
                }}
              >
                {selectedStudent.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    margin: "0 0 4px",
                    fontSize: 20,
                    fontWeight: 700,
                    color: "var(--ink)",
                  }}
                >
                  {selectedStudent.name}
                </h2>
                <div
                  style={{
                    fontSize: 13.5,
                    color: "var(--ink-3)",
                    marginBottom: 10,
                  }}
                >
                  {selectedStudent.grade} · {selectedStudent.age} años
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  {selectedStudent.conditions.map((c) => {
                    const cond = CONDITIONS[c];
                    return (
                      <span
                        key={c}
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: cond.soft,
                          color: cond.color,
                          border: `1px solid ${cond.color}30`,
                        }}
                      >
                        {cond.label}
                      </span>
                    );
                  })}
                  {(() => {
                    const st = STATUS[selectedStudent.status];
                    return (
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 999,
                          background: st.soft,
                          color: st.color,
                        }}
                      >
                        ● {st.label}
                      </span>
                    );
                  })()}
                </div>
              </div>
            </div>

            {/* Tutor */}
            <div
              style={{
                padding: "12px 16px",
                background: "var(--surface)",
                borderRadius: 10,
                border: "1px solid var(--line)",
                marginBottom: 20,
                fontSize: 13,
                color: "var(--ink-3)",
              }}
            >
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                Tutor / Contacto:{" "}
              </span>
              {selectedStudent.tutor}
            </div>

            {/* Observaciones generales */}
            <div
              style={{
                padding: "16px 18px",
                background: "var(--surface)",
                borderRadius: 10,
                border: "1px solid var(--line)",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: "var(--ink-4)",
                  letterSpacing: ".07em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Observaciones generales
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  color: "var(--ink)",
                  lineHeight: 1.65,
                }}
              >
                {selectedStudent.notes}
              </p>
            </div>

            {/* Historial de entrevistas */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
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
                  Historial de entrevistas ({selectedStudent.interviews.length})
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

              {selectedStudent.interviews.length === 0 && (
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

              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {selectedStudent.interviews.map((iv, idx) => (
                  <div
                    key={iv.id}
                    style={{
                      display: "flex",
                      gap: 14,
                    }}
                  >
                    {/* Timeline dot */}
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
                          background:
                            idx === 0 ? "var(--brand)" : "var(--line-strong)",
                          marginTop: 4,
                          flexShrink: 0,
                        }}
                      />
                      {idx < selectedStudent.interviews.length - 1 && (
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
                        marginBottom:
                          idx < selectedStudent.interviews.length - 1 ? 0 : 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 6,
                        }}
                      >
                        <Icon
                          name="calendar"
                          size={13}
                          style={{ color: "var(--ink-4)" }}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: idx === 0 ? "var(--brand)" : "var(--ink)",
                          }}
                        >
                          {fmtDateDisplay(iv.date)}
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
                        style={{
                          fontSize: 12,
                          color: "var(--ink-4)",
                          marginBottom: 8,
                        }}
                      >
                        <strong style={{ color: "var(--ink-3)" }}>
                          Asistentes:
                        </strong>{" "}
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
            </div>
          </div>
        )}
      </div>

      {/* ── Modal nueva entrevista ── */}
      {showModal && (
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
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
        >
          <div
            style={{
              background: "var(--surface)",
              borderRadius: 14,
              padding: 28,
              width: 500,
              maxWidth: "calc(100vw - 40px)",
              boxShadow: "0 20px 60px rgba(0,0,0,.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>
                Nueva entrevista
              </h3>
              <button
                onClick={() => setShowModal(false)}
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

            <div
              style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 20 }}
            >
              Alumno:{" "}
              <strong style={{ color: "var(--ink)" }}>
                {selectedStudent.name}
              </strong>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <label
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink-3)",
                  }}
                >
                  Fecha
                </span>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink-3)",
                  }}
                >
                  Asistentes
                </span>
                <Input
                  type="text"
                  placeholder="Ej: Mamá (Claudia Ruiz), terapeuta Lic. Flores"
                  value={form.attendees}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, attendees: e.target.value }))
                  }
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 5 }}
              >
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: "var(--ink-3)",
                  }}
                >
                  Resumen de la entrevista
                </span>
                <Textarea
                  rows={4}
                  placeholder="¿Qué se trató? ¿Qué se acordó? ¿Próximos pasos?"
                  value={form.summary}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, summary: e.target.value }))
                  }
                />
              </label>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 22,
              }}
            >
              <Button
                variant="secondary"
                size="md"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={saveInterview}
                disabled={
                  !form.date || !form.attendees.trim() || !form.summary.trim()
                }
              >
                Guardar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

window.AlumnosEspeciales = AlumnosEspeciales;
