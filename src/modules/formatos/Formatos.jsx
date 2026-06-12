/* ─── Módulo Formatos ────────────────────────────────────────────────────── */

const MOCK_FORMATOS = [
  {
    id: "f1",
    nombre: "Lista de Asistencia Oficial.xlsx",
    tipo: "xlsx",
    size: "18 KB",
    fecha: "2026-05-10",
    subidoPor: "Ing. Andrés Federico",
    objectUrl: null,
  },
  {
    id: "f2",
    nombre: "Formato de Planeación NEM.docx",
    tipo: "docx",
    size: "34 KB",
    fecha: "2026-05-12",
    subidoPor: "Ing. Andrés Federico",
    objectUrl: null,
  },
  {
    id: "f3",
    nombre: "Presentación Inicio de Ciclo.pptx",
    tipo: "pptx",
    size: "1.2 MB",
    fecha: "2026-05-15",
    subidoPor: "Lic. Paulina Ortega",
    objectUrl: null,
  },
];

const TIPO_META = {
  pdf: { label: "PDF", color: "#DC2626", bg: "#FEF2F2" },
  xlsx: { label: "Excel", color: "#15803D", bg: "#F0FDF4" },
  xls: { label: "Excel", color: "#15803D", bg: "#F0FDF4" },
  docx: { label: "Word", color: "#1D4ED8", bg: "#EFF6FF" },
  doc: { label: "Word", color: "#1D4ED8", bg: "#EFF6FF" },
  pptx: { label: "PPT", color: "#C2410C", bg: "#FFF7ED" },
  ppt: { label: "PPT", color: "#C2410C", bg: "#FFF7ED" },
};

const ROLES_UPLOAD = [
  "Director General",
  "Director de Sección",
  "Desarrollo Académico",
];

const ACCEPT = ".xlsx,.xls,.docx,.doc,.pptx,.ppt,.pdf";

const fmtFecha = (iso) => {
  const [y, m, d] = iso.split("-");
  const meses = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  return `${Number(d)} ${meses[Number(m) - 1]} ${y}`;
};

const TipoChip = ({ tipo }) => {
  const meta = TIPO_META[tipo] || {
    label: tipo.toUpperCase(),
    color: "#64748B",
    bg: "#F1F5F9",
  };
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: ".05em",
        color: meta.color,
        background: meta.bg,
      }}
    >
      {meta.label}
    </span>
  );
};

const Formatos = () => {
  const currentUser = (() => {
    const id = Number(localStorage.getItem("cv_user_id")) || 1;
    return (
      window.CV_DATA.USERS.find((u) => u.id === id) || window.CV_DATA.USERS[0]
    );
  })();

  const canUpload = ROLES_UPLOAD.includes(currentUser.role);

  const [archivos, setArchivos] = React.useState(MOCK_FORMATOS);
  const [aviso, setAviso] = React.useState(null);
  const fileInputRef = React.useRef(null);

  const mostrarAviso = (msg, tipo = "info") => {
    setAviso({ msg, tipo });
    setTimeout(() => setAviso(null), 3000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const ext = file.name.split(".").pop().toLowerCase();
    if (!Object.keys(TIPO_META).includes(ext)) {
      mostrarAviso("Tipo de archivo no permitido.", "error");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    const nuevo = {
      id: `f${Date.now()}`,
      nombre: file.name,
      tipo: ext,
      size:
        file.size < 1024 * 1024
          ? `${Math.round(file.size / 1024)} KB`
          : `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      fecha: new Date().toISOString().slice(0, 10),
      subidoPor: currentUser.name.split(" ").slice(0, 2).join(" "),
      objectUrl,
    };
    setArchivos((prev) => [nuevo, ...prev]);
    mostrarAviso(`"${file.name}" subido correctamente.`, "ok");
    e.target.value = "";
  };

  const handleDescargar = (archivo) => {
    if (!archivo.objectUrl) {
      mostrarAviso(
        "En el sistema real, aquí descargarías el archivo desde el servidor.",
        "info",
      );
      return;
    }
    const a = document.createElement("a");
    a.href = archivo.objectUrl;
    a.download = archivo.nombre;
    a.click();
  };

  const handleEliminar = (id) => {
    const archivo = archivos.find((a) => a.id === id);
    if (archivo?.objectUrl) URL.revokeObjectURL(archivo.objectUrl);
    setArchivos((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div style={{ padding: "28px 32px", maxWidth: 860, margin: "0 auto" }}>
      {/* Aviso */}
      {aviso && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            padding: "12px 20px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            color: "#fff",
            background:
              aviso.tipo === "ok"
                ? "#15803D"
                : aviso.tipo === "error"
                  ? "#B91C1C"
                  : "#1D4ED8",
            boxShadow: "0 4px 16px rgba(0,0,0,.15)",
            zIndex: 999,
            maxWidth: 360,
          }}
        >
          {aviso.msg}
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "var(--ink)",
              margin: 0,
            }}
          >
            Formatos oficiales
          </h2>
          <p style={{ fontSize: 13, color: "var(--ink-3)", margin: "4px 0 0" }}>
            {archivos.length}{" "}
            {archivos.length === 1
              ? "archivo disponible"
              : "archivos disponibles"}
          </p>
        </div>
        {canUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                height: 36,
                padding: "0 16px",
                background: "var(--accent, #2563EB)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ↑ Subir formato
            </button>
          </>
        )}
      </div>

      {/* Lista */}
      {archivos.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 0",
            color: "var(--ink-4)",
            fontSize: 14,
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
          }}
        >
          No hay formatos subidos aún.
        </div>
      ) : (
        <div
          style={{
            background: "var(--surface)",
            border: "1px solid var(--line)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {/* Encabezado tabla */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "60px 1fr 90px 130px 140px 80px",
              padding: "9px 20px",
              background: "var(--bg-sunk, #F8F9FB)",
              borderBottom: "1px solid var(--line)",
              fontSize: 11.5,
              fontWeight: 600,
              color: "var(--ink-4)",
              letterSpacing: ".06em",
              textTransform: "uppercase",
            }}
          >
            <span>Tipo</span>
            <span>Nombre</span>
            <span style={{ textAlign: "center" }}>Tamaño</span>
            <span>Subido por</span>
            <span>Fecha</span>
            <span></span>
          </div>

          {archivos.map((a, i) => (
            <div
              key={a.id}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 90px 130px 140px 80px",
                padding: "12px 20px",
                borderBottom:
                  i < archivos.length - 1 ? "1px solid var(--line)" : "none",
                alignItems: "center",
              }}
            >
              <TipoChip tipo={a.tipo} />

              <div style={{ paddingRight: 12 }}>
                <div
                  style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}
                >
                  {a.nombre}
                </div>
                {!a.objectUrl && (
                  <div
                    style={{
                      fontSize: 11,
                      color: "var(--ink-4)",
                      marginTop: 2,
                    }}
                  >
                    Formato de muestra
                  </div>
                )}
              </div>

              <div
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "var(--ink-3)",
                }}
              >
                {a.size}
              </div>

              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
                {a.subidoPor}
              </div>

              <div style={{ fontSize: 12, color: "var(--ink-3)" }}>
                {fmtFecha(a.fecha)}
              </div>

              <div
                style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}
              >
                <button
                  onClick={() => handleDescargar(a)}
                  title="Descargar"
                  style={{
                    background: "none",
                    border: "1px solid var(--line)",
                    borderRadius: 6,
                    cursor: "pointer",
                    padding: "4px 9px",
                    fontSize: 13,
                    color: "var(--ink-3)",
                  }}
                >
                  ↓
                </button>
                {canUpload && (
                  <button
                    onClick={() => handleEliminar(a.id)}
                    title="Eliminar"
                    style={{
                      background: "none",
                      border: "1px solid var(--line)",
                      borderRadius: 6,
                      cursor: "pointer",
                      padding: "4px 9px",
                      fontSize: 13,
                      color: "#B91C1C",
                    }}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Nota tipos aceptados */}
      <p style={{ fontSize: 11.5, color: "var(--ink-4)", marginTop: 12 }}>
        Formatos aceptados: Excel (.xlsx, .xls) · Word (.docx, .doc) ·
        PowerPoint (.pptx, .ppt) · PDF
      </p>
    </div>
  );
};

window.Formatos = Formatos;
