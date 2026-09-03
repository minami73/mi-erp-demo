/* ─── FichaAlumno — header + pestañas ────────────────────────────────────────
   Mismo patrón que la ficha de Personal.jsx: header con avatar, chip de
   estado académico, navegación anterior/siguiente dentro de la lista
   filtrada, y barra de pestañas. El promedio del header usa el trimestre
   más reciente con datos completos (2°) como referencia rápida; dentro de
   la pestaña Desempeño se puede cambiar de trimestre. */

const FichaAlumno = ({
  alumno,
  listaNavegacion,
  materias,
  desempeno,
  entrevistas,
  incidencias,
  onAddEntrevista,
  onAddIncidencia,
  onResolverIncidencia,
  tabs,
  tabInicial,
  onSelect,
  onBack,
}) => {
  const [tabActivo, setTabActivo] = useState(tabInicial || "informacion");

  const idx = listaNavegacion.findIndex((a) => a.id === alumno.id);
  const prevAlumno = idx > 0 ? listaNavegacion[idx - 1] : null;
  const nextAlumno =
    idx < listaNavegacion.length - 1 ? listaNavegacion[idx + 1] : null;

  const desTrimestre = desempeno[alumno.id]?.["2"] || {};
  const promedio = promedioGeneral(materias, desTrimestre);
  const estado = estadoAcademico(promedio);

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1000, margin: "0 auto" }}>
      <Button variant="ghost" size="sm" icon="chevron-left" onClick={onBack}>
        Volver a Alumnos
      </Button>

      {/* Header card */}
      <div
        style={{
          marginTop: 16,
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 12,
          padding: "24px 28px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 4,
        }}
      >
        <Avatar
          initials={(alumno.nombre[0] + alumno.apP[0]).toUpperCase()}
          size={56}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)" }}>
            {alumno.nombreCompleto}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: 7,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
              {alumno.grado}° {alumno.grupo} · Bachillerato
            </span>
            <span style={{ fontSize: 13, color: "var(--ink-4)" }}>·</span>
            <span style={{ fontSize: 13, color: "var(--ink-3)" }}>
              {alumno.matricula}
            </span>
            {promedio !== null && (
              <>
                <span style={{ fontSize: 13, color: "var(--ink-4)" }}>·</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    color: SEMAFORO_ACADEMICO[estado]?.color,
                  }}
                >
                  Promedio {promedio}
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: 999,
                      background: SEMAFORO_ACADEMICO[estado]?.color,
                    }}
                  />
                  {SEMAFORO_ACADEMICO[estado]?.label}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Navegación prev/next dentro de la lista filtrada */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button
            onClick={() => prevAlumno && onSelect(prevAlumno)}
            disabled={!prevAlumno}
            title={prevAlumno ? prevAlumno.nombreCompleto : ""}
            style={{
              background: "none",
              border: "1px solid var(--line)",
              borderRadius: 6,
              cursor: prevAlumno ? "pointer" : "not-allowed",
              opacity: prevAlumno ? 1 : 0.35,
              padding: "4px 6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon name="chevron-left" size={15} stroke={2} />
          </button>
          <span
            style={{
              fontSize: 12,
              color: "var(--ink-4)",
              minWidth: 40,
              textAlign: "center",
            }}
          >
            {idx + 1} / {listaNavegacion.length}
          </span>
          <button
            onClick={() => nextAlumno && onSelect(nextAlumno)}
            disabled={!nextAlumno}
            title={nextAlumno ? nextAlumno.nombreCompleto : ""}
            style={{
              background: "none",
              border: "1px solid var(--line)",
              borderRadius: 6,
              cursor: nextAlumno ? "pointer" : "not-allowed",
              opacity: nextAlumno ? 1 : 0.35,
              padding: "4px 6px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Icon name="chevron-right" size={15} stroke={2} />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--line)",
          margin: "20px 0 20px",
          overflowX: "auto",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTabActivo(t.id)}
            style={{
              padding: "10px 16px",
              background: "none",
              border: "none",
              borderBottom:
                tabActivo === t.id
                  ? "2px solid var(--brand)"
                  : "2px solid transparent",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: tabActivo === t.id ? 600 : 400,
              color: tabActivo === t.id ? "var(--brand)" : "var(--ink-3)",
              marginBottom: -1,
              whiteSpace: "nowrap",
              flexShrink: 0,
              transition: "color .15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tabActivo === "informacion" && <TabInformacion alumno={alumno} />}
      {tabActivo === "desempeno" && (
        <TabDesempeno
          materias={materias}
          desempeno={desempeno[alumno.id] || {}}
        />
      )}
      {tabActivo === "entrevistas" && (
        <TabEntrevistas
          alumno={alumno}
          entrevistas={entrevistas}
          onAdd={onAddEntrevista}
        />
      )}
      {tabActivo === "incidencias" && (
        <TabIncidencias
          alumno={alumno}
          incidencias={incidencias}
          onAdd={onAddIncidencia}
          onResolver={onResolverIncidencia}
        />
      )}
    </div>
  );
};

window.FichaAlumno = FichaAlumno;
