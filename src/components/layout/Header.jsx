const Header = ({
  title,
  subtitle,
  breadcrumbs = [],
  user,
  onLogout,
  right,
  onToggleSidebar,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState(new Date());
  const [loggingOut, setLoggingOut] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    if (loggingOut) return;
    setLoggingOut(true);
    setTimeout(() => {
      setMenuOpen(false);
      onLogout();
    }, 1200);
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
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
  const da = days[clock.getDay()];
  const mo = months[clock.getMonth()];
  const num = clock.getDate();
  const hh = String(clock.getHours()).padStart(2, "0");
  const mm = String(clock.getMinutes()).padStart(2, "0");
  const ss = String(clock.getSeconds()).padStart(2, "0");

  return (
    <header
      style={{
        height: 84,
        flexShrink: 0,
        background: "var(--surface)",
        borderBottom: "1px solid var(--line)",
        display: "flex",
        alignItems: "center",
        padding: "0 28px",
        gap: 20,
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      <button
        onClick={onToggleSidebar}
        title="Menú"
        style={{
          flexShrink: 0,
          background: "none",
          border: "none",
          color: "var(--ink-3)",
          cursor: "pointer",
          padding: "6px",
          borderRadius: 8,
          display: "inline-flex",
          transition: "background .12s, color .12s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--bg-sunk)";
          e.currentTarget.style.color = "var(--ink)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "none";
          e.currentTarget.style.color = "var(--ink-3)";
        }}
      >
        <Icon name="menu" size={20} stroke={1.8} />
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        {breadcrumbs.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              color: "var(--ink-4)",
              marginBottom: 2,
            }}
          >
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span>{b}</span>
                {i < breadcrumbs.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 19,
              fontWeight: 600,
              letterSpacing: "-.01em",
              color: "var(--ink)",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <span style={{ fontSize: 13, color: "var(--ink-4)" }}>
              {subtitle}
            </span>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginRight: "auto",
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--ink-2)",
            whiteSpace: "nowrap",
          }}
        >
          {da}, {num} de {mo}
        </span>
        <span
          style={{
            width: 3,
            height: 3,
            borderRadius: 999,
            background: "var(--ink-4)",
          }}
        />
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--brand)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {hh}:{mm}:{ss}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {right}

        <IconButton icon="bell" title="Notificaciones" />

        <div
          style={{
            width: 1,
            height: 24,
            background: "var(--line)",
            margin: "0 4px",
          }}
        />

        <div ref={menuRef} style={{ position: "relative" }}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "4px 10px 4px 4px",
              borderRadius: 999,
              background: menuOpen ? "var(--bg-sunk)" : "transparent",
              border: "1px solid " + (menuOpen ? "var(--line)" : "transparent"),
              cursor: "pointer",
              transition: "background .12s",
            }}
            onMouseEnter={(e) => {
              if (!menuOpen)
                e.currentTarget.style.background = "var(--bg-sunk)";
            }}
            onMouseLeave={(e) => {
              if (!menuOpen) e.currentTarget.style.background = "transparent";
            }}
          >
            <Avatar initials={user.initials} size={30} />
            <div style={{ textAlign: "left", lineHeight: 1.1 }}>
              <div
                style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}
              >
                {user.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--ink-4)",
                  marginTop: 2,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 999,
                    background: "#22c55e",
                  }}
                />
                {user.role}
              </div>
            </div>
            <Icon
              name="chevron-down"
              size={14}
              style={{ color: "var(--ink-4)" }}
            />
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                minWidth: 240,
                background: "var(--surface)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                padding: 6,
                animation: "fadeIn .12s ease-out",
                zIndex: 40,
              }}
            >
              <div
                style={{
                  padding: "10px 12px 12px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 500 }}>{user.name}</div>
                <div
                  style={{ fontSize: 12, color: "var(--ink-4)", marginTop: 2 }}
                >
                  {user.email}
                </div>
                <div style={{ marginTop: 8 }}>
                  <Pill color="var(--brand)" soft="var(--accent-soft)">
                    {user.role}
                  </Pill>
                </div>
              </div>
              <MenuItem icon="settings" label="Preferencias" />
              <MenuItem icon="shield" label="Privacidad y accesos" />
              <div
                style={{
                  height: 1,
                  background: "var(--line)",
                  margin: "4px 0",
                }}
              />
              <MenuItem
                icon={loggingOut ? "spinner" : "logout"}
                label={loggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                disabled={loggingOut}
                danger
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const MenuItem = ({ icon, label, danger, disabled, onClick }) => (
  <button
    onClick={disabled ? undefined : onClick}
    style={{
      width: "100%",
      textAlign: "left",
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 10px",
      borderRadius: 8,
      background: "transparent",
      border: 0,
      cursor: disabled ? "not-allowed" : "pointer",
      fontSize: 13,
      color: danger ? (disabled ? "#e89a94" : "#b3261e") : "var(--ink-2)",
      opacity: disabled ? 0.6 : 1,
    }}
    onMouseEnter={(e) => {
      if (!disabled) e.currentTarget.style.background = "var(--bg-sunk)";
    }}
    onMouseLeave={(e) => {
      if (!disabled) e.currentTarget.style.background = "transparent";
    }}
  >
    <Icon name={icon} size={15} />
    {label}
  </button>
);

window.Header = Header;
