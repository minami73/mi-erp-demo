const Organigrama = () => {
  const { SECTIONS } = window.CV_DATA;
  const currentUserId = Number(localStorage.getItem("cv_user_id")) || 1;

  const sectionColor = (id) => {
    const s = SECTIONS.find((x) => x.id === id);
    return s ? s.color : "var(--ink-4)";
  };
  const sectionSoft = (id) => {
    const s = SECTIONS.find((x) => x.id === id);
    return s ? s.soft : "var(--surface-2)";
  };
  const sectionLabel = (id) => {
    const s = SECTIONS.find((x) => x.id === id);
    return s ? s.label : id;
  };

  const director = {
    id: 1,
    name: "Ing. Federico Mendoza",
    nickname: "el Inge",
    role: "Director General",
    initials: "FM",
    sections: ["general"],
  };

  const reports = [
    {
      id: 2,
      name: "Mtro. Rafael Tadeo",
      role: "Director de Bachillerato",
      initials: "RT",
      sections: ["bachillerato"],
    },
    {
      id: 5,
      name: "Mtro. Felipe Camacho",
      role: "Director de Secundaria",
      initials: "FC",
      sections: ["secundaria"],
    },
    {
      id: 3,
      name: "Lic. Víctor Paulino",
      role: "Director de Primaria",
      initials: "VP",
      sections: ["primaria"],
    },
    {
      id: 4,
      name: "Mtra. Araceli Bonilla",
      role: "Directora Preescolar y Maternal",
      initials: "AB",
      sections: ["preescolar", "maternal"],
    },
    {
      id: 6,
      name: "Jeanine",
      role: "Desarrollo Académico",
      initials: "JN",
      sections: ["primaria", "secundaria", "bachillerato"],
    },
    {
      id: 7,
      name: "Jessi Molina",
      role: "Vinculación",
      initials: "JM",
      sections: ["general"],
    },
  ];

  const isCurrentUser = (id) => id === currentUserId;

  const cardBase = {
    background: "var(--surface)",
    border: "1px solid var(--line)",
    borderRadius: "var(--radius-lg)",
    padding: "16px 18px",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    position: "relative",
    transition: "box-shadow .15s",
    cursor: "default",
  };

  const Avatar = ({ initials, size = 44, primary }) => (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: primary
          ? "linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)"
          : "var(--surface-2)",
        border: `1.5px solid ${primary ? "transparent" : "var(--line)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.33,
        fontWeight: 600,
        color: primary ? "var(--brand-ink)" : "var(--ink-2)",
        flexShrink: 0,
        letterSpacing: "-.02em",
      }}
    >
      {initials}
    </div>
  );

  const SectionBadge = ({ sectionId }) => (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 7px",
        borderRadius: 99,
        fontSize: 11,
        fontWeight: 600,
        background: sectionSoft(sectionId),
        color: sectionColor(sectionId),
        letterSpacing: ".02em",
      }}
    >
      {sectionLabel(sectionId)}
    </span>
  );

  const DirectorCard = ({ person }) => {
    const isCurrent = isCurrentUser(person.id);
    return (
      <div
        style={{
          ...cardBase,
          padding: "20px 24px",
          maxWidth: 380,
          width: "100%",
          borderLeft: `4px solid var(--brand)`,
          boxShadow: isCurrent
            ? "0 0 0 2px var(--brand), 0 4px 16px rgba(0,0,0,.08)"
            : "0 2px 12px rgba(0,0,0,.06)",
          background: isCurrent ? "var(--accent-soft)" : "var(--surface)",
        }}
      >
        <Avatar initials={person.initials} size={52} primary />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "var(--ink)",
              lineHeight: 1.25,
            }}
          >
            {person.name}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--ink-3)",
              marginTop: 2,
              marginBottom: 8,
            }}
          >
            {person.role}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            <SectionBadge sectionId="general" />
          </div>
        </div>
        {isCurrent && (
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              fontSize: 10,
              fontWeight: 600,
              color: "var(--brand)",
              background: "var(--accent-soft)",
              border: "1px solid var(--brand)",
              borderRadius: 99,
              padding: "1px 7px",
              letterSpacing: ".04em",
            }}
          >
            TÚ
          </div>
        )}
      </div>
    );
  };

  const ReportCard = ({ person }) => {
    const isCurrent = isCurrentUser(person.id);
    const primary = person.sections[0];
    return (
      <div
        style={{
          ...cardBase,
          width: 210,
          borderLeft: `3px solid ${sectionColor(primary)}`,
          boxShadow: isCurrent
            ? `0 0 0 2px ${sectionColor(primary)}, 0 4px 12px rgba(0,0,0,.08)`
            : "0 1px 6px rgba(0,0,0,.05)",
          background: isCurrent ? sectionSoft(primary) : "var(--surface)",
        }}
      >
        <Avatar initials={person.initials} size={38} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ink)",
              lineHeight: 1.3,
              marginBottom: 2,
            }}
          >
            {person.name}
          </div>
          <div
            style={{
              fontSize: 11,
              color: "var(--ink-3)",
              marginBottom: 8,
              lineHeight: 1.3,
            }}
          >
            {person.role}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {person.sections.map((s) => (
              <SectionBadge key={s} sectionId={s} />
            ))}
          </div>
        </div>
        {isCurrent && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 10,
              fontSize: 10,
              fontWeight: 600,
              color: sectionColor(primary),
              background: sectionSoft(primary),
              border: `1px solid ${sectionColor(primary)}`,
              borderRadius: 99,
              padding: "1px 6px",
              letterSpacing: ".04em",
            }}
          >
            TÚ
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        padding: "32px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
        gap: 0,
      }}
    >
      {/* Header */}
      <div style={{ width: "100%", maxWidth: 900, marginBottom: 32 }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".06em",
            textTransform: "uppercase",
            marginBottom: 4,
          }}
        >
          Ciclo escolar 2025–2026
        </div>
        <div style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)" }}>
          Estructura directiva del Colegio Victoria
        </div>
      </div>

      {/* Director General */}
      <DirectorCard person={director} />

      {/* Connector: vertical line */}
      <div
        style={{
          width: 2,
          height: 28,
          background: "var(--line)",
        }}
      />

      {/* Horizontal connector bar */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 900,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "calc(50% - 527px)",
            right: "calc(50% - 527px)",
            height: 2,
            background: "var(--line)",
            maxWidth: "100%",
          }}
        />
      </div>

      {/* Reports row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          justifyContent: "center",
          maxWidth: 1100,
          paddingTop: 28,
          position: "relative",
        }}
      >
        {reports.map((person) => (
          <div
            key={person.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
            }}
          >
            {/* Vertical connector to card */}
            <div
              style={{
                width: 2,
                height: 24,
                background: "var(--line)",
                marginBottom: 0,
              }}
            />
            <ReportCard person={person} />
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: 48,
          fontSize: 12,
          color: "var(--ink-4)",
          textAlign: "center",
        }}
      >
        Personal directivo y administrativo activo · Los datos de contacto se
        gestionan en el módulo de Personal.
      </div>
    </div>
  );
};

window.Organigrama = Organigrama;
