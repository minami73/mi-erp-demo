/* ─── TabInformacion — expediente del alumno ────────────────────────────────
   Campos según docs/contexto-modulo-personal-alumnos.md §3.2: nombre
   completo, edad, fecha de nacimiento, tutor y su teléfono, más "otras
   indicaciones" — ese último campo sigue sin definirse con dirección
   (§4.2), así que se muestra como pendiente en vez de inventar contenido. */

const InfoField = ({ label, valor }) => (
  <div>
    <div
      style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: ".04em",
        textTransform: "uppercase",
        color: "var(--ink-4)",
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 14, color: "var(--ink)" }}>{valor || "—"}</div>
  </div>
);

const TabInformacion = ({ alumno }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 10,
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--ink-4)",
          marginBottom: 16,
        }}
      >
        Datos del alumno
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <InfoField label="Nombre completo" valor={alumno.nombreCompleto} />
        <InfoField label="Matrícula" valor={alumno.matricula} />
        <InfoField
          label="Grado y grupo"
          valor={`${alumno.grado}° ${alumno.grupo} — Bachillerato`}
        />
        <InfoField label="Edad" valor={`${alumno.edad} años`} />
        <InfoField label="Fecha de nacimiento" valor={alumno.fechaNacimiento} />
        <InfoField label="Correo" valor={alumno.correo} />
      </div>
    </div>

    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--line)",
        borderRadius: 10,
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--ink-4)",
          marginBottom: 16,
        }}
      >
        Padre, madre o tutor
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <InfoField label="Nombre del tutor" valor={alumno.tutor} />
        <InfoField label="Teléfono del tutor" valor={alumno.telTutor} />
      </div>

      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: ".04em",
            textTransform: "uppercase",
            color: "var(--ink-4)",
            marginBottom: 6,
          }}
        >
          Otras indicaciones
        </div>
        <div
          style={{
            fontSize: 12.5,
            color: "var(--ink-4)",
            fontStyle: "italic",
            background: "var(--bg-sunk)",
            borderRadius: 8,
            padding: "10px 12px",
          }}
        >
          Campo pendiente de definir con dirección (alergias, contacto de
          emergencia, tipo de sangre u otros candidatos a evaluar).
        </div>
      </div>
    </div>
  </div>
);

window.TabInformacion = TabInformacion;
