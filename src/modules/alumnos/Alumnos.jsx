/* ─── Alumnos (genérico por sección) ────────────────────────────────────────
   Mismo patrón que Personal.jsx: un componente recibe `config`
   (window.CV_ALUMNOS.<seccion>) y arma lista + ficha + pestañas.
   Paso 6: switcher "Alumnos" / "Vista por grupo" (esta última absorbe lo
   que era el módulo Reportes — decisión de John). */

const VISTA_OPTS = [
  { value: "alumnos", label: "Alumnos" },
  { value: "grupo", label: "Vista por grupo" },
];

const Alumnos = ({ config }) => {
  const { ALUMNOS, MATERIAS, DESEMPENO, TABS } = config;
  const [vista, setVista] = useState("alumnos");
  const [seleccionado, setSeleccionado] = useState(null);

  // Estado editable de entrevistas/incidencias, levantado aquí (no en los
  // tabs) para que sobreviva al cambio de tab y a la navegación anterior/
  // siguiente entre alumnos. Se pierde al recargar, como el resto del demo.
  const [entrevistas, setEntrevistas] = useState(config.ENTREVISTAS);
  const [incidencias, setIncidencias] = useState(config.INCIDENCIAS);

  const addEntrevista = (alumnoId, entrevista) => {
    setEntrevistas((prev) => ({
      ...prev,
      [alumnoId]: [entrevista, ...(prev[alumnoId] || [])],
    }));
  };
  const addIncidencia = (alumnoId, form) => {
    setIncidencias((prev) => ({
      ...prev,
      [alumnoId]: [
        {
          id: `${alumnoId}-inc-${Date.now()}`,
          alumnoId,
          seccion: "bachillerato",
          estado: "activa",
          resolucion: null,
          ...form,
        },
        ...(prev[alumnoId] || []),
      ],
    }));
  };
  const resolverIncidencia = (alumnoId, incId, texto) => {
    setIncidencias((prev) => ({
      ...prev,
      [alumnoId]: (prev[alumnoId] || []).map((i) =>
        i.id === incId ? { ...i, estado: "resuelta", resolucion: texto } : i,
      ),
    }));
  };

  // Orden estable para la navegación anterior/siguiente dentro de la ficha:
  // por grado, grupo y nombre — no depende de los filtros del directorio.
  const alumnosOrdenados = [...ALUMNOS].sort(
    (a, b) =>
      a.grado - b.grado ||
      a.grupo.localeCompare(b.grupo) ||
      a.nombreCompleto.localeCompare(b.nombreCompleto, "es"),
  );

  if (seleccionado) {
    return (
      <FichaAlumno
        alumno={seleccionado.alumno}
        listaNavegacion={alumnosOrdenados}
        materias={MATERIAS}
        desempeno={DESEMPENO}
        entrevistas={entrevistas[seleccionado.alumno.id] || []}
        incidencias={incidencias[seleccionado.alumno.id] || []}
        onAddEntrevista={addEntrevista}
        onAddIncidencia={addIncidencia}
        onResolverIncidencia={resolverIncidencia}
        tabs={TABS}
        tabInicial={seleccionado.tab}
        onSelect={(alumno) =>
          setSeleccionado({ alumno, tab: seleccionado.tab })
        }
        onBack={() => setSeleccionado(null)}
      />
    );
  }

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <Segmented value={vista} onChange={setVista} options={VISTA_OPTS} />
      </div>

      {vista === "alumnos" ? (
        <ListaAlumnos
          alumnos={ALUMNOS}
          materias={MATERIAS}
          desempeno={DESEMPENO}
          onSelect={(alumno, tab) =>
            setSeleccionado({ alumno, tab: tab || "informacion" })
          }
        />
      ) : (
        <TabVistaGrupo
          alumnos={ALUMNOS}
          materias={MATERIAS}
          desempeno={DESEMPENO}
          onSelect={(alumno) => setSeleccionado({ alumno, tab: "desempeno" })}
        />
      )}
    </div>
  );
};

window.Alumnos = Alumnos;
