const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("fmendoza@colegiovictoria.com");
  const [password, setPassword] = useState("director2026");
  const [remember, setRemember] = useState(true);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    setTimeout(() => {
      const creds = window.CV_DATA.DEMO_CREDENTIALS;
      const match = creds.find(
        (c) => c.email === email && c.password === password,
      );
      if (match) {
        onLogin(match.userId);
      } else {
        setLoading(false);
        setError("Correo o contraseña incorrectos.");
      }
    }, 1800);
  };

  return (
    <div
      data-screen-label="01 Login"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        background: "var(--bg)",
      }}
    >
      <aside
        style={{
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(180deg, var(--brand) 0%, var(--brand-2) 100%)",
          color: "var(--brand-ink)",
          padding: "48px 56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <img
            src="img/logo-cv.png"
            alt="Colegio Victoria"
            style={{
              height: 196,
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 2px 10px rgba(0,0,0,.35))",
            }}
          />
          <div>
            <div
              style={{ fontSize: 32, fontWeight: 600, letterSpacing: "-.01em" }}
            >
              Colegio Victoria
            </div>
            <div style={{ fontSize: 24, opacity: 0.7, marginTop: 2 }}>
              Sistema de Gestión Directiva
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 48,
              lineHeight: 1.05,
              letterSpacing: "-.02em",
            }}
          >
            Coordinar el colegio,
            <br />
            <em style={{ opacity: 0.85 }}>todo en un solo lugar.</em>
          </div>
          <p
            style={{
              marginTop: 22,
              fontSize: 18,
              lineHeight: 1.55,
              opacity: 0.8,
            }}
          >
            Plataforma interna para directivos y personal administrativo.
            Calendario institucional, planeación académica, gestión de personal
            y más, en módulos que crecen con el colegio.
          </p>
        </div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
            opacity: 0.55,
          }}
        >
          <span>v1.0 · Ciclo escolar 2025–2026</span>
          <span
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <Icon name="shield" size={13} /> Acceso restringido
          </span>
        </div>
      </aside>

      <main
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 48,
        }}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                margin: "12px 0 10px",
                fontSize: 48,
                fontWeight: 600,
                letterSpacing: "-.02em",
              }}
            >
              Bienvenido (a)
            </h1>
            <p style={{ margin: 0, fontSize: 18, color: "var(--ink-3)" }}>
              ¡Qué alegría verte de nuevo!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <Field label="Correo institucional">
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--ink-4)",
                  }}
                >
                  <Icon name="mail" size={16} />
                </span>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: 36 }}
                  placeholder="tu@colegiovictoria.com"
                />
              </div>
            </Field>

            <Field label="Contraseña">
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--ink-4)",
                  }}
                >
                  <Icon name="lock" size={16} />
                </span>
                <Input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: 36, paddingRight: 38 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  style={{
                    position: "absolute",
                    right: 6,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: 0,
                    padding: 6,
                    cursor: "pointer",
                    color: showPw ? "var(--brand)" : "var(--ink-4)",
                    display: "inline-flex",
                    transition: "color .12s",
                  }}
                >
                  <Icon name="eye" size={16} />
                </button>
              </div>
            </Field>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: -4,
              }}
            >
              <label
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  color: "var(--ink-3)",
                }}
              >
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  style={{ accentColor: "var(--brand)" }}
                />
                Mantener sesión iniciada
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                style={{
                  fontSize: 13,
                  color: "var(--brand)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={loading}
              style={{
                marginTop: 4,
                justifyContent: "center",
                width: "100%",
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <>
                  <Icon name="spinner" size={16} /> Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>

            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderRadius: "var(--radius)",
                  background: "#fef2f2",
                  border: "1px solid #fca5a5",
                  color: "#b91c1c",
                  fontSize: 13,
                }}
              >
                <Icon name="alert-triangle" size={14} />
                {error}
              </div>
            )}

            <div
              style={{
                marginTop: 16,
                padding: "12px 14px",
                borderRadius: "var(--radius)",
                background: "var(--surface-2)",
                border: "1px solid var(--line)",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <div style={{ color: "var(--ink-4)", marginTop: 1 }}>
                <Icon name="shield" size={14} />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--ink-3)",
                  lineHeight: 1.45,
                }}
              >
                Este sistema es de uso exclusivo del personal directivo y
                administrativo del Colegio Victoria. Todos los accesos quedan
                registrados.
              </div>
            </div>
          </form>

          <div
            style={{
              marginTop: 28,
              textAlign: "center",
              fontSize: 12,
              color: "var(--ink-4)",
            }}
          >
            ¿Problemas para acceder? Escribe a{" "}
            <span style={{ color: "var(--ink-2)" }}>
              soporte@colegiovictoria.com
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

window.Login = Login;
