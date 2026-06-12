/* ─── Datos ──────────────────────────────────────────────────────────────── */

const STUDENTS = [
  // 1°A — niñas
  { id: "1a01", name: "Sofía Reyes Torres", grade: "1°A" },
  { id: "1a02", name: "Valentina Cruz Mendoza", grade: "1°A" },
  { id: "1a03", name: "Isabella Martínez Rojas", grade: "1°A" },
  { id: "1a04", name: "Camila Torres Vega", grade: "1°A" },
  { id: "1a05", name: "Lucía Hernández López", grade: "1°A" },
  { id: "1a06", name: "Fernanda López García", grade: "1°A" },
  { id: "1a07", name: "Daniela García Sánchez", grade: "1°A" },
  { id: "1a08", name: "Mariana Sánchez Ramírez", grade: "1°A" },
  { id: "1a09", name: "Gabriela Ramírez Flores", grade: "1°A" },
  { id: "1a10", name: "Andrea Flores Jiménez", grade: "1°A" },
  { id: "1a11", name: "Paola Jiménez Morales", grade: "1°A" },
  { id: "1a12", name: "Valeria Morales Castro", grade: "1°A" },
  { id: "1a13", name: "Natalia Castro Vargas", grade: "1°A" },
  { id: "1a14", name: "Carolina Vargas Ortiz", grade: "1°A" },
  { id: "1a15", name: "Jimena Ortiz Herrera", grade: "1°A" },
  // 1°B — niños
  { id: "1b01", name: "Carlos Mendoza Díaz", grade: "1°B" },
  { id: "1b02", name: "Diego Luna Reyes", grade: "1°B" },
  { id: "1b03", name: "Mateo García Cruz", grade: "1°B" },
  { id: "1b04", name: "Sebastián López Herrera", grade: "1°B" },
  { id: "1b05", name: "Alejandro Díaz Torres", grade: "1°B" },
  { id: "1b06", name: "Miguel Reyes Castro", grade: "1°B" },
  { id: "1b07", name: "Emilio Herrera Flores", grade: "1°B" },
  { id: "1b08", name: "Andrés Torres Morales", grade: "1°B" },
  { id: "1b09", name: "Rodrigo Castro Vargas", grade: "1°B" },
  { id: "1b10", name: "Pablo Flores Ortiz", grade: "1°B" },
  { id: "1b11", name: "Eduardo Morales Jiménez", grade: "1°B" },
  { id: "1b12", name: "Ricardo Vargas Sánchez", grade: "1°B" },
  { id: "1b13", name: "Fernando Ortiz Ramírez", grade: "1°B" },
  { id: "1b14", name: "Javier Jiménez Luna", grade: "1°B" },
  { id: "1b15", name: "Antonio Sánchez García", grade: "1°B" },
  // 2°A — niñas
  { id: "2a01", name: "Regina Mendoza Paredes", grade: "2°A" },
  { id: "2a02", name: "Alejandra Rojas Cabrera", grade: "2°A" },
  { id: "2a03", name: "Constanza Vega Espinoza", grade: "2°A" },
  { id: "2a04", name: "Diana Herrera Montes", grade: "2°A" },
  { id: "2a05", name: "Paula Gutiérrez Sandoval", grade: "2°A" },
  { id: "2a06", name: "Ximena Peña Campos", grade: "2°A" },
  { id: "2a07", name: "Karla Álvarez Luna", grade: "2°A" },
  { id: "2a08", name: "Rebeca Delgado Fuentes", grade: "2°A" },
  { id: "2a09", name: "Ariana Ruiz Domínguez", grade: "2°A" },
  { id: "2a10", name: "Sara Navarro Cervantes", grade: "2°A" },
  { id: "2a11", name: "Michelle Salinas Maldonado", grade: "2°A" },
  { id: "2a12", name: "Brenda Cortés Contreras", grade: "2°A" },
  { id: "2a13", name: "Mónica Medina Serrano", grade: "2°A" },
  { id: "2a14", name: "Liliana Aguilar Muñoz", grade: "2°A" },
  { id: "2a15", name: "Claudia Ramos Peña", grade: "2°A" },
  // 2°B — niños
  { id: "2b01", name: "Marco Ramírez Vega", grade: "2°B" },
  { id: "2b02", name: "David Cruz Gutiérrez", grade: "2°B" },
  { id: "2b03", name: "Iván Gutiérrez Peña", grade: "2°B" },
  { id: "2b04", name: "Héctor Vega Álvarez", grade: "2°B" },
  { id: "2b05", name: "Adrián Ruiz Delgado", grade: "2°B" },
  { id: "2b06", name: "Óscar Peña Navarro", grade: "2°B" },
  { id: "2b07", name: "Roberto Álvarez Salinas", grade: "2°B" },
  { id: "2b08", name: "Manuel Navarro Cortés", grade: "2°B" },
  { id: "2b09", name: "Ernesto Delgado Medina", grade: "2°B" },
  { id: "2b10", name: "Raúl Cortés Aguilar", grade: "2°B" },
  { id: "2b11", name: "Enrique Medina Ramos", grade: "2°B" },
  { id: "2b12", name: "Alfredo Aguilar Fuentes", grade: "2°B" },
  { id: "2b13", name: "Jorge Ramos Domínguez", grade: "2°B" },
  { id: "2b14", name: "Víctor Salinas Luna", grade: "2°B" },
  { id: "2b15", name: "Mauricio Luna Paredes", grade: "2°B" },
  // 3°A — niñas
  { id: "3a01", name: "Verónica Muñoz Cabrera", grade: "3°A" },
  { id: "3a02", name: "Patricia Serrano Espinoza", grade: "3°A" },
  { id: "3a03", name: "Luciana Paredes Montes", grade: "3°A" },
  { id: "3a04", name: "Renata Cabrera Sandoval", grade: "3°A" },
  { id: "3a05", name: "Itzel Espinoza Campos", grade: "3°A" },
  { id: "3a06", name: "Frida Montes Fuentes", grade: "3°A" },
  { id: "3a07", name: "Yadira Sandoval Domínguez", grade: "3°A" },
  { id: "3a08", name: "Anahí Torres Cervantes", grade: "3°A" },
  { id: "3a09", name: "Dulce Campos Maldonado", grade: "3°A" },
  { id: "3a10", name: "Estefanía Luna Contreras", grade: "3°A" },
  { id: "3a11", name: "Yolanda Fuentes Serrano", grade: "3°A" },
  { id: "3a12", name: "Rocío Domínguez Muñoz", grade: "3°A" },
  { id: "3a13", name: "Nadia Cervantes Vega", grade: "3°A" },
  { id: "3a14", name: "Alicia Maldonado Ruiz", grade: "3°A" },
  { id: "3a15", name: "Beatriz Contreras Reyes", grade: "3°A" },
  // 3°B — niños
  { id: "3b01", name: "Daniel Paredes Gutiérrez", grade: "3°B" },
  { id: "3b02", name: "Luis Cabrera Álvarez", grade: "3°B" },
  { id: "3b03", name: "Arturo Espinoza Navarro", grade: "3°B" },
  { id: "3b04", name: "Guillermo Montes Salinas", grade: "3°B" },
  { id: "3b05", name: "Bernardo Sandoval Cortés", grade: "3°B" },
  { id: "3b06", name: "Julio Campos Medina", grade: "3°B" },
  { id: "3b07", name: "Ismael Fuentes Aguilar", grade: "3°B" },
  { id: "3b08", name: "Gerardo Domínguez Ramos", grade: "3°B" },
  { id: "3b09", name: "Horacio Cervantes López", grade: "3°B" },
  { id: "3b10", name: "Joaquín Maldonado Cruz", grade: "3°B" },
  { id: "3b11", name: "Leandro Contreras García", grade: "3°B" },
  { id: "3b12", name: "Rubén Serrano Herrera", grade: "3°B" },
  { id: "3b13", name: "Sergio Muñoz Torres", grade: "3°B" },
  { id: "3b14", name: "Ignacio Vega Flores", grade: "3°B" },
  { id: "3b15", name: "Tomás Herrera Jiménez", grade: "3°B" },
];

const MATERIAS = [
  { id: "matematicas", label: "Matemáticas" },
  { id: "espanol", label: "Español" },
  { id: "ciencias", label: "Ciencias" },
  { id: "historia", label: "Historia" },
  { id: "ingles", label: "Inglés" },
];

// Totales base por tipo y trimestre
const BASE_TOTALS = {
  tareas: { 1: 10, 2: 8, 3: 3 },
  actividades: { 1: 12, 2: 9, 3: 4 },
};

// Hash determinístico para generar datos consistentes sin hardcodear 2700 filas
const hash = (s) => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h << 5) + h + s.charCodeAt(i);
  return Math.abs(h);
};

// Pendientes máximos por trimestre: t1 casi todos entregan, t2 algunos rezagados, t3 recién inicia
const MAX_PENDING = { 1: 1, 2: 4, 3: 2 };

const buildReportData = () => {
  const data = {};
  for (const tipo of ["tareas", "actividades"]) {
    data[tipo] = {};
    for (const t of ["1", "2", "3"]) {
      data[tipo][t] = {};
      for (const m of MATERIAS.map((x) => x.id)) {
        data[tipo][t][m] = STUDENTS.map((s) => {
          const gh = hash(`${tipo}-${t}-${m}-${s.grade}`);
          const total = Math.max(5, BASE_TOTALS[tipo][t] - 2 + (gh % 5));
          const sh = hash(`${tipo}-${t}-${m}-${s.id}`);
          const pending = sh % (MAX_PENDING[t] + 1);
          const entregadas = Math.max(0, total - pending);
          return { alumnoId: s.id, total, entregadas };
        });
      }
    }
  }
  return data;
};

const REPORT_DATA = buildReportData();

/* ─── Componente ─────────────────────────────────────────────────────────── */

const Reportes = () => {
  const GRUPOS = [
    "todos",
    ...Array.from(new Set(STUDENTS.map((s) => s.grade))).sort(),
  ];

  const [tipo, setTipo] = useState("tareas");
  const [trimestre, setTrimestre] = useState("2");
  const [materia, setMateria] = useState("matematicas");
  const [grupo, setGrupo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const toggleSort = (col) => {
    if (sortCol === col) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortCol(col);
      setSortDir("asc");
    }
  };

  const rows = (REPORT_DATA[tipo][trimestre][materia] || [])
    .map((r) => {
      const alumno = STUDENTS.find((s) => s.id === r.alumnoId);
      const pendientes = r.total - r.entregadas;
      const pct = r.total > 0 ? Math.round((r.entregadas / r.total) * 100) : 0;
      return { ...r, alumno, pendientes, pct };
    })
    .filter((r) => grupo === "todos" || r.alumno.grade === grupo)
    .filter(
      (r) =>
        !busqueda ||
        r.alumno.name.toLowerCase().includes(busqueda.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortCol) return 0;
      const va = sortCol === "alumno" ? a.alumno.name : a[sortCol];
      const vb = sortCol === "alumno" ? b.alumno.name : b[sortCol];
      const cmp = typeof va === "string" ? va.localeCompare(vb, "es") : va - vb;
      return sortDir === "asc" ? cmp : -cmp;
    });

  const promedio = rows.length
    ? Math.round(rows.reduce((acc, r) => acc + r.pct, 0) / rows.length)
    : 0;

  const rowBg = (pendientes, total) => {
    if (total === 0) return "transparent";
    if (pendientes > 3) return "#FEF2F2";
    if (pendientes > 1) return "#FFFBEB";
    return "transparent";
  };

  const tipoOpts = [
    { value: "tareas", label: "Tareas" },
    { value: "actividades", label: "Actividades" },
  ];
  const trimestreOpts = [
    { value: "1", label: "1er Trimestre" },
    { value: "2", label: "2do Trimestre" },
    { value: "3", label: "3er Trimestre" },
  ];

  return (
    <div style={{ padding: "28px 32px", maxWidth: 900, margin: "0 auto" }}>
      {/* Filtros */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <Segmented value={tipo} onChange={setTipo} options={tipoOpts} />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}
          >
            Trimestre
          </span>
          <Segmented
            value={trimestre}
            onChange={setTrimestre}
            options={trimestreOpts}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}
          >
            Materia
          </span>
          <Select
            value={materia}
            onChange={(e) => setMateria(e.target.value)}
            style={{
              height: 34,
              fontSize: 13,
              paddingLeft: 10,
              paddingRight: 28,
            }}
          >
            {MATERIAS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </Select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}
          >
            Grupo
          </span>
          <Select
            value={grupo}
            onChange={(e) => setGrupo(e.target.value)}
            style={{
              height: 34,
              fontSize: 13,
              paddingLeft: 10,
              paddingRight: 28,
            }}
          >
            {GRUPOS.map((g) => (
              <option key={g} value={g}>
                {g === "todos" ? "Todos" : g}
              </option>
            ))}
          </Select>
        </div>

        <div style={{ position: "relative", marginLeft: "auto" }}>
          <span
            style={{
              position: "absolute",
              left: 10,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 13,
              color: "var(--ink-4)",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Buscar alumno…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              height: 34,
              paddingLeft: 30,
              paddingRight: busqueda ? 28 : 12,
              fontSize: 13,
              border: "1px solid var(--line)",
              borderRadius: 8,
              background: "var(--surface)",
              color: "var(--ink)",
              outline: "none",
              width: 200,
            }}
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda("")}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                color: "var(--ink-4)",
                padding: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Tabla */}
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 100px 100px 140px",
            padding: "10px 20px",
            background: "var(--bg-sunk, #F8F9FB)",
            borderBottom: "1px solid var(--line)",
            fontSize: 11.5,
            fontWeight: 600,
            color: "var(--ink-4)",
            letterSpacing: ".06em",
            textTransform: "uppercase",
          }}
        >
          {["alumno", "entregadas", "pendientes"].includes("alumno") &&
            (() => {
              const SortBtn = ({ col, label, align }) => {
                const active = sortCol === col;
                const arrow = active ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕";
                return (
                  <button
                    onClick={() => toggleSort(col)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: active ? "var(--ink-2)" : "var(--ink-4)",
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                      textAlign: align || "left",
                      width: "100%",
                    }}
                  >
                    {label}
                    {arrow}
                  </button>
                );
              };
              return (
                <>
                  <SortBtn col="alumno" label="Alumno" />
                  <span
                    style={{
                      textAlign: "center",
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Total
                  </span>
                  <SortBtn col="entregadas" label="Entregadas" align="center" />
                  <SortBtn col="pendientes" label="Pendientes" align="center" />
                  <span
                    style={{
                      textAlign: "center",
                      fontSize: 11.5,
                      fontWeight: 600,
                      letterSpacing: ".06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Avance
                  </span>
                </>
              );
            })()}
        </div>

        {rows.map((r, i) => (
          <div
            key={r.alumnoId}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 100px 100px 140px",
              padding: "10px 20px",
              borderBottom:
                i < rows.length - 1 ? "1px solid var(--line)" : "none",
              background: rowBg(r.pendientes, r.total),
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--line-strong)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10.5,
                  fontWeight: 700,
                  color: "var(--ink-3)",
                  flexShrink: 0,
                }}
              >
                {r.alumno.name
                  .split(" ")
                  .slice(0, 2)
                  .map((w) => w[0])
                  .join("")}
              </div>
              <div>
                <div
                  style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}
                >
                  {r.alumno.name}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-4)" }}>
                  {r.alumno.grade}
                </div>
              </div>
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
                color: "var(--ink-2)",
              }}
            >
              {r.total}
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
                color: "#15803D",
              }}
            >
              {r.entregadas}
            </div>

            <div
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: 600,
                color:
                  r.pendientes > 3
                    ? "#B91C1C"
                    : r.pendientes > 1
                      ? "#B45309"
                      : "var(--ink-4)",
              }}
            >
              {r.pendientes}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  flex: 1,
                  height: 6,
                  borderRadius: 999,
                  background: "var(--line-strong)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${r.pct}%`,
                    borderRadius: 999,
                    background:
                      r.pct === 100
                        ? "#15803D"
                        : r.pct >= 75
                          ? "#2563EB"
                          : r.pct >= 50
                            ? "#D97706"
                            : "#DC2626",
                    transition: "width .3s",
                  }}
                />
              </div>
              <span
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  minWidth: 32,
                  textAlign: "right",
                  color:
                    r.pct === 100
                      ? "#15803D"
                      : r.pct >= 75
                        ? "#2563EB"
                        : r.pct >= 50
                          ? "#D97706"
                          : "#DC2626",
                }}
              >
                {r.pct}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resumen */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 14,
          padding: "11px 20px",
          background: "var(--surface)",
          border: "1px solid var(--line)",
          borderRadius: 10,
          fontSize: 13,
          color: "var(--ink-3)",
        }}
      >
        <span>
          <strong style={{ color: "var(--ink)" }}>{rows.length}</strong> alumnos
        </span>
        <span>
          Promedio:{" "}
          <strong
            style={{
              color:
                promedio >= 90
                  ? "#15803D"
                  : promedio >= 70
                    ? "#2563EB"
                    : promedio >= 50
                      ? "#D97706"
                      : "#DC2626",
            }}
          >
            {promedio}%
          </strong>
        </span>
        <span>
          Con rezago:{" "}
          <strong style={{ color: "#B91C1C" }}>
            {rows.filter((r) => r.pendientes > 1).length}
          </strong>
        </span>
      </div>
    </div>
  );
};

window.Reportes = Reportes;
