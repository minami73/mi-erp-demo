const App = () => {
  const [loggedIn, setLoggedIn] = useState(
    () => localStorage.getItem("cv_logged_in") === "1",
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("cv_sidebar_collapsed") === "1",
  );
  const [current, setCurrent] = useState("calendario");
  const [modules, setModules] = useState(() => {
    // Restaura orden/activación guardados, sin perder módulos agregados
    // después de que se guardó (merge por id contra CV_DATA.MODULES)
    try {
      const saved = JSON.parse(localStorage.getItem("cv_modules"));
      if (Array.isArray(saved) && saved.length) {
        const byId = new Map(window.CV_DATA.MODULES.map((m) => [m.id, m]));
        const restored = saved
          .filter((s) => byId.has(s.id))
          .map((s) => ({ ...byId.get(s.id), ...s }));
        const restoredIds = new Set(restored.map((m) => m.id));
        const added = window.CV_DATA.MODULES.filter(
          (m) => !restoredIds.has(m.id),
        );
        return [...restored, ...added];
      }
    } catch {
      /* JSON corrupto: caer al default */
    }
    return window.CV_DATA.MODULES;
  });
  const [events, setEvents] = useState(window.CV_DATA.EVENTS);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    localStorage.setItem("cv_modules", JSON.stringify(modules));
  }, [modules]);

  const currentUser = (() => {
    const id = Number(localStorage.getItem("cv_user_id")) || 1;
    return (
      window.CV_DATA.USERS.find((u) => u.id === id) || window.CV_DATA.USERS[0]
    );
  })();

  const visibleModules = modules.filter(
    (m) => !currentUser.restrictedModules?.includes(m.id),
  );

  // El calendario es general: todos ven todos los eventos.
  // Secciones donde el usuario puede crear/editar. Vacío = solo consulta
  const editableSections = window.CV_DATA.editableSectionsFor(currentUser);
  const isReadOnly = editableSections.length === 0;

  useEffect(() => {
    if (currentUser.restrictedModules?.includes(current)) {
      setCurrent("calendario");
    }
  }, [current, loggedIn]);

  const openEvent = (event) => setModal({ event, isNew: false });
  const openNew = (start) => {
    if (isReadOnly) return;
    // El botón "Nuevo evento" pasa el click event como argumento: ignorarlo
    const today =
      typeof start === "string" ? start : window.fmtDate(new Date());
    setModal({
      event: {
        id: Date.now(),
        title: "",
        desc: "",
        start: today,
        end: today,
        time: "09:00 – 10:00",
        type: "reunion",
        sections: [currentUser.admin ? "general" : editableSections[0]],
      },
      isNew: true,
    });
  };
  const closeModal = () => setModal(null);
  const saveEvent = (ev) => {
    if (isReadOnly) return;
    setEvents((es) => {
      const exists = es.find((e) => e.id === ev.id);
      if (exists) return es.map((e) => (e.id === ev.id ? ev : e));
      return [...es, ev];
    });
    setModal(null);
  };
  const deleteEvent = (id) => {
    if (isReadOnly) return;
    setEvents((es) => es.filter((e) => e.id !== id));
    setModal(null);
  };

  // Lookup en el registro central de vistas (src/views.jsx).
  // Fallbacks: secciones de Personal sin módulo propio y módulos en preparación
  let body, title, subtitle, breadcrumbs;
  const view = window.CV_VIEWS[current];

  if (view) {
    title = view.title;
    subtitle = view.subtitle;
    breadcrumbs = view.breadcrumbs;
    body = view.render({
      openEvent,
      openNew,
      events,
      isReadOnly,
      modules,
      setModules,
      currentUser,
    });
  } else if (current.startsWith("personal-")) {
    const labels = {
      "personal-maternal": "Personal Maternal",
      "personal-preescolar": "Personal Preescolar",
      "personal-secundaria": "Personal Secundaria",
    };
    const seccion = labels[current] || "Personal";
    const personalMod = modules.find((m) => m.id === "personal");
    title = seccion;
    subtitle = "Módulo en preparación · " + seccion;
    breadcrumbs = ["Personal", seccion.replace("Personal ", "")];
    body = <Construction module={{ ...personalMod, label: seccion }} />;
  } else if (current.startsWith("alumnos-")) {
    const labels = {
      "alumnos-maternal": "Alumnos Maternal",
      "alumnos-preescolar": "Alumnos Preescolar",
      "alumnos-primaria": "Alumnos Primaria",
      "alumnos-secundaria": "Alumnos Secundaria",
    };
    const seccion = labels[current] || "Alumnos";
    const alumnosMod = modules.find((m) => m.id === "alumnos");
    title = seccion;
    subtitle = "Módulo en preparación · " + seccion;
    breadcrumbs = ["Alumnos", seccion.replace("Alumnos ", "")];
    body = <Construction module={{ ...alumnosMod, label: seccion }} />;
  } else {
    const currentModule = modules.find((m) => m.id === current);
    if (currentModule) {
      title = currentModule.label;
      subtitle = "Módulo en preparación";
      breadcrumbs = ["Módulos", currentModule.label];
      body = <Construction module={currentModule} />;
    }
  }

  if (!loggedIn)
    return (
      <Login
        onLogin={(userId) => {
          localStorage.setItem("cv_logged_in", "1");
          localStorage.setItem("cv_user_id", String(userId));
          setLoggedIn(true);
        }}
      />
    );

  return (
    <div
      data-screen-label="02 App"
      style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}
    >
      <Sidebar
        current={current}
        onNavigate={setCurrent}
        modules={visibleModules}
        setModules={setModules}
        collapsed={sidebarCollapsed}
      />

      <main
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Header
          title={title}
          subtitle={subtitle}
          breadcrumbs={breadcrumbs}
          user={currentUser}
          onToggleSidebar={() => {
            const next = !sidebarCollapsed;
            setSidebarCollapsed(next);
            localStorage.setItem("cv_sidebar_collapsed", next ? "1" : "0");
          }}
          onLogout={() => {
            localStorage.removeItem("cv_logged_in");
            localStorage.removeItem("cv_user_id");
            setLoggedIn(false);
          }}
        />
        <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>{body}</div>
      </main>

      {modal && (
        <EventModal
          event={modal.event}
          isNew={modal.isNew}
          onClose={closeModal}
          onSave={saveEvent}
          onDelete={deleteEvent}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
