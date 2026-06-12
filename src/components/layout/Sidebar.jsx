const Sidebar = ({
  current,
  onNavigate,
  modules,
  setModules,
  collapsed,
  onToggle,
}) => {
  const [dragId, setDragId] = useState(null);
  const [overId, setOverId] = useState(null);
  const [expandedIds, setExpandedIds] = useState([]);
  const toggleExpand = (id) =>
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const activeModules = modules.filter((m) => m.active);

  const handleDragStart = (id) => setDragId(id);
  const handleDragOver = (e, id) => {
    e.preventDefault();
    setOverId(id);
  };
  const handleDrop = () => {
    if (!dragId || !overId || dragId === overId) {
      setDragId(null);
      setOverId(null);
      return;
    }
    const next = [...modules];
    const from = next.findIndex((m) => m.id === dragId);
    const to = next.findIndex((m) => m.id === overId);
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setModules(next);
    setDragId(null);
    setOverId(null);
  };

  const NavItem = ({ mod }) => {
    const active = current === mod.id;
    const dragging = dragId === mod.id;
    const over = overId === mod.id && dragId && dragId !== mod.id;
    return (
      <div
        draggable={!collapsed}
        onDragStart={() => !collapsed && handleDragStart(mod.id)}
        onDragOver={(e) => !collapsed && handleDragOver(e, mod.id)}
        onDrop={() => !collapsed && handleDrop()}
        onDragEnd={() => {
          setDragId(null);
          setOverId(null);
        }}
        onClick={() => onNavigate(mod.id)}
        title={collapsed ? mod.label : undefined}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: collapsed ? 0 : 10,
          padding: collapsed ? "9px 0" : "8px 10px 8px 8px",
          borderRadius: 8,
          cursor: "pointer",
          background: active ? "rgba(255,255,255,.10)" : "transparent",
          color: active ? "#fff" : "rgba(244,245,250,.78)",
          fontSize: 13.5,
          fontWeight: active ? 500 : 400,
          opacity: dragging ? 0.4 : 1,
          borderTop: over
            ? "2px solid rgba(255,255,255,.5)"
            : "2px solid transparent",
          transition: "background .12s, color .12s, padding .25s",
        }}
        onMouseEnter={(e) => {
          if (!active)
            e.currentTarget.style.background = "rgba(255,255,255,.05)";
        }}
        onMouseLeave={(e) => {
          if (!active) e.currentTarget.style.background = "transparent";
        }}
      >
        {active && (
          <span
            style={{
              position: "absolute",
              left: collapsed ? 0 : -16,
              top: 8,
              bottom: 8,
              width: 3,
              background: "#fff",
              borderRadius: "0 3px 3px 0",
              transition: "left .25s",
            }}
          />
        )}
        {!collapsed && (
          <span
            className="grip"
            style={{
              color: "rgba(255,255,255,.35)",
              display: "inline-flex",
              cursor: "grab",
            }}
          >
            <Icon name="grip" size={14} />
          </span>
        )}
        <Icon
          name={mod.icon}
          size={17}
          stroke={1.6}
          style={{ flexShrink: 0 }}
        />
        {!collapsed && <span style={{ flex: 1 }}>{mod.label}</span>}
      </div>
    );
  };

  const AccordionItem = ({ mod }) => {
    const expanded = expandedIds.includes(mod.id);
    const childActive = mod.children.some((c) => c.id === current);
    const highlighted = childActive || expanded;
    return (
      <div>
        <div
          onClick={() => !collapsed && toggleExpand(mod.id)}
          title={collapsed ? mod.label : undefined}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: collapsed ? 0 : 10,
            padding: collapsed ? "9px 0" : "8px 10px 8px 8px",
            borderRadius: 8,
            cursor: "pointer",
            background: highlighted ? "rgba(255,255,255,.10)" : "transparent",
            color: highlighted ? "#fff" : "rgba(244,245,250,.78)",
            fontSize: 13.5,
            fontWeight: highlighted ? 500 : 400,
            transition: "background .12s, color .12s",
          }}
          onMouseEnter={(e) => {
            if (!highlighted)
              e.currentTarget.style.background = "rgba(255,255,255,.05)";
          }}
          onMouseLeave={(e) => {
            if (!highlighted) e.currentTarget.style.background = "transparent";
          }}
        >
          {childActive && (
            <span
              style={{
                position: "absolute",
                left: collapsed ? 0 : -16,
                top: 8,
                bottom: 8,
                width: 3,
                background: "#fff",
                borderRadius: "0 3px 3px 0",
              }}
            />
          )}
          {!collapsed && (
            <span
              style={{ color: "rgba(255,255,255,.35)", display: "inline-flex" }}
            >
              <Icon name="grip" size={14} />
            </span>
          )}
          <Icon
            name={mod.icon}
            size={17}
            stroke={1.6}
            style={{ flexShrink: 0 }}
          />
          {!collapsed && (
            <>
              <span style={{ flex: 1 }}>{mod.label}</span>
              <span
                style={{
                  fontSize: 10,
                  opacity: 0.6,
                  transition: "transform .2s",
                  display: "inline-block",
                  transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                }}
              >
                ▶
              </span>
            </>
          )}
        </div>
        {!collapsed && expanded && (
          <div style={{ marginTop: 2, marginBottom: 2 }}>
            {mod.children.map((child) => {
              const childIsActive = current === child.id;
              return (
                <div
                  key={child.id}
                  onClick={() => onNavigate(child.id)}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 10px 6px 36px",
                    borderRadius: 8,
                    cursor: "pointer",
                    background: childIsActive
                      ? "rgba(255,255,255,.10)"
                      : "transparent",
                    color: childIsActive ? "#fff" : "rgba(244,245,250,.65)",
                    fontSize: 12.5,
                    fontWeight: childIsActive ? 500 : 400,
                    transition: "background .12s, color .12s",
                  }}
                  onMouseEnter={(e) => {
                    if (!childIsActive)
                      e.currentTarget.style.background =
                        "rgba(255,255,255,.05)";
                  }}
                  onMouseLeave={(e) => {
                    if (!childIsActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  {childIsActive && (
                    <span
                      style={{
                        position: "absolute",
                        left: -16,
                        top: 6,
                        bottom: 6,
                        width: 3,
                        background: "#fff",
                        borderRadius: "0 3px 3px 0",
                      }}
                    />
                  )}
                  <span style={{ fontSize: 10, marginRight: 7, opacity: 0.45 }}>
                    —
                  </span>
                  {child.label.replace("Personal ", "")}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      style={{
        width: collapsed ? 0 : 240,
        flexShrink: 0,
        height: "100vh",
        background:
          "linear-gradient(180deg, var(--brand) 0%, var(--brand-2) 100%)",
        color: "var(--brand-ink)",
        display: "flex",
        flexDirection: "column",
        padding: collapsed ? 0 : "24px 16px",
        position: "sticky",
        top: 0,
        overflow: "hidden",
        transition:
          "width .3s cubic-bezier(.4,0,.2,1), padding .3s cubic-bezier(.4,0,.2,1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: collapsed ? 0 : 10,
          padding: collapsed ? "0 0 18px" : "4px 8px 22px",
          transition: "padding .25s, gap .25s",
        }}
      >
        <img
          src="img/logo-cv.png"
          alt="Colegio Victoria"
          style={{
            height: collapsed ? 40 : 72,
            width: "auto",
            objectFit: "contain",
            transition: "height .25s",
          }}
        />
        {!collapsed && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.15 }}>
              Colegio Victoria
            </div>
            <div style={{ fontSize: 11, opacity: 0.55 }}>Gestión Directiva</div>
          </div>
        )}
      </div>

      {/* Section label */}
      {!collapsed && (
        <div
          style={{
            fontSize: 10.5,
            fontWeight: 500,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "rgba(244,245,250,.4)",
            padding: "6px 10px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span>Módulos</span>
          <span
            title="Arrastra para reordenar"
            style={{ display: "inline-flex", opacity: 0.7 }}
          >
            <Icon name="arrow-up-down" size={11} />
          </span>
        </div>
      )}

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 1,
          overflowY: "auto",
        }}
      >
        {activeModules.map((mod) =>
          mod.children ? (
            <AccordionItem key={mod.id} mod={mod} />
          ) : (
            <NavItem key={mod.id} mod={mod} />
          ),
        )}
      </nav>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.08)",
          paddingTop: 12,
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {[
          { id: "modulos", label: "Administrar módulos", icon: "settings" },
          { id: "usuarios", label: "Usuarios y roles", icon: "users" },
        ].map((item) => {
          const active = current === item.id;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              title={collapsed ? item.label : undefined}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: collapsed ? "center" : "flex-start",
                gap: collapsed ? 0 : 10,
                padding: collapsed ? "9px 0" : "8px 10px",
                borderRadius: 8,
                cursor: "pointer",
                background: active ? "rgba(255,255,255,.10)" : "transparent",
                color: active ? "#fff" : "rgba(244,245,250,.65)",
                fontSize: 13,
                fontWeight: active ? 500 : 400,
                transition: "background .12s, color .12s, padding .25s",
              }}
              onMouseEnter={(e) => {
                if (!active)
                  e.currentTarget.style.background = "rgba(255,255,255,.05)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              {active && (
                <span
                  style={{
                    position: "absolute",
                    left: collapsed ? 0 : -16,
                    top: 8,
                    bottom: 8,
                    width: 3,
                    background: "#fff",
                    borderRadius: "0 3px 3px 0",
                    transition: "left .25s",
                  }}
                />
              )}
              <Icon name={item.icon} size={16} />
              {!collapsed && <span>{item.label}</span>}
            </div>
          );
        })}

        {!collapsed && (
          <div
            style={{
              marginTop: 14,
              padding: "10px 12px",
              background: "rgba(255,255,255,.05)",
              borderRadius: 10,
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              fontSize: 11.5,
              lineHeight: 1.4,
              color: "rgba(244,245,250,.7)",
            }}
          >
            <Icon
              name="sparkle"
              size={14}
              style={{ flexShrink: 0, marginTop: 1 }}
            />
            <span>
              Arrastra los módulos del menú para acomodarlos a tu preferencia.
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};

window.Sidebar = Sidebar;
