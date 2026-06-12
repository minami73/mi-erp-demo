const Calendar = ({ openEvent, openNew, events, readOnly = false }) => {
  const { SECTIONS, EVENT_TYPES } = window.CV_DATA;

  const [cursor, setCursor] = useState(new Date());

  const [view, setView] = useState("mes");
  const [filterSections, setFilterSections] = useState(
    SECTIONS.map((s) => s.id),
  );
  const [filterTypes, setFilterTypes] = useState(EVENT_TYPES.map((t) => t.id));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const today = new Date();

  const firstOfMonth = new Date(year, month, 1);
  const startOffset = firstOfMonth.getDay();
  const gridStart = new Date(year, month, 1 - startOffset);
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    cells.push(d);
  }

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (e) =>
          e.sections.some((s) => filterSections.includes(s)) &&
          filterTypes.includes(e.type),
      ),
    [events, filterSections, filterTypes],
  );

  const eventsByDate = useMemo(() => {
    const map = {};
    filteredEvents.forEach((e) => {
      const start = window.parseDate(e.start),
        end = window.parseDate(e.end);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const key = window.fmtDate(d);
        (map[key] ||= []).push(e);
      }
    });
    return map;
  }, [filteredEvents]);

  const monthEvents = filteredEvents
    .filter((e) => {
      const d = window.parseDate(e.start);
      return d.getFullYear() === year && d.getMonth() === month;
    })
    .sort((a, b) => a.start.localeCompare(b.start));

  const navigate = (delta) => {
    if (view === "mes") {
      setCursor((d) => new Date(d.getFullYear(), d.getMonth() + delta, 1));
    } else if (view === "semana") {
      setCursor((d) => {
        const c = new Date(d);
        c.setDate(c.getDate() + delta * 7);
        return c;
      });
    } else {
      setCursor((d) => {
        const c = new Date(d);
        c.setDate(c.getDate() + delta);
        return c;
      });
    }
  };
  const goToday = () => setCursor(new Date());

  const sectionOf = (id) => SECTIONS.find((s) => s.id === id);
  const primarySection = (ev) =>
    sectionOf(ev.sections[0]) || sectionOf("general");

  const exportPDF = () => {
    if (!window.jspdf) return;
    const { jsPDF } = window.jspdf;

    const SEC_RGB = {
      general: [107, 114, 128],
      maternal: [236, 72, 153],
      preescolar: [139, 92, 246],
      primaria: [59, 130, 246],
      secundaria: [16, 185, 129],
      bachillerato: [245, 158, 11],
    };

    const pdf = new jsPDF("l", "mm", "letter");
    const PW = 279.4,
      PH = 215.9;
    const ML = 10,
      MT = 8,
      MR = 10,
      MB = 12;
    const AW = PW - ML - MR;
    const COL = AW / 7;

    // ── Header ──────────────────────────────────────────────
    pdf.setFontSize(7.5);
    pdf.setTextColor(150, 150, 150);
    pdf.text("COLEGIO VICTORIA A.C.", ML, MT + 4);

    const titleStr =
      window.MONTHS[month].charAt(0).toUpperCase() +
      window.MONTHS[month].slice(1) +
      " " +
      year;
    pdf.setFontSize(15);
    pdf.setTextColor(25, 25, 25);
    pdf.setFont("helvetica", "bold");
    pdf.text(titleStr, PW / 2, MT + 5.5, { align: "center" });

    pdf.setFontSize(7);
    pdf.setTextColor(150, 150, 150);
    pdf.setFont("helvetica", "normal");
    pdf.text("Sistema de Gestión Directiva", PW - MR, MT + 4, {
      align: "right",
    });

    pdf.setDrawColor(210, 210, 210);
    pdf.setLineWidth(0.3);
    pdf.line(ML, MT + 8, PW - MR, MT + 8);

    // ── DOW row ──────────────────────────────────────────────
    const DOW_Y = MT + 8;
    const DOW_H = 7;
    const GRID_TOP = DOW_Y + DOW_H;
    const GRID_H = PH - GRID_TOP - MB;
    const ROW_H = GRID_H / 6;

    const dows = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    dows.forEach((d, i) => {
      const x = ML + i * COL;
      pdf.setFillColor(247, 248, 250);
      pdf.rect(x, DOW_Y, COL, DOW_H, "F");
      pdf.setFontSize(7);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(100, 100, 100);
      pdf.text(d, x + COL / 2, DOW_Y + 4.7, { align: "center" });
    });

    // ── Grid lines ───────────────────────────────────────────
    pdf.setDrawColor(220, 220, 220);
    pdf.setLineWidth(0.2);
    for (let c = 0; c <= 7; c++) {
      pdf.line(ML + c * COL, DOW_Y, ML + c * COL, PH - MB);
    }
    for (let r = 0; r <= 6; r++) {
      pdf.line(ML, GRID_TOP + r * ROW_H, ML + AW, GRID_TOP + r * ROW_H);
    }

    // ── Cells ────────────────────────────────────────────────
    cells.forEach((d, i) => {
      const row = Math.floor(i / 7);
      const col = i % 7;
      const cx = ML + col * COL;
      const cy = GRID_TOP + row * ROW_H;
      const key = window.fmtDate(d);
      const inMonth = d.getMonth() === month;

      // Day number
      const gray = inMonth ? 30 : 185;
      pdf.setFontSize(8);
      pdf.setFont("helvetica", inMonth ? "bold" : "normal");
      pdf.setTextColor(gray, gray, gray);
      pdf.text(String(d.getDate()), cx + COL - 3, cy + 5.5, {
        align: "right",
      });

      // Events (max 3)
      const evs = eventsByDate[key] || [];
      evs.slice(0, 3).forEach((ev, ei) => {
        const sec = ev.sections[0] || "general";
        const rgb = SEC_RGB[sec] || [100, 100, 100];
        const ey = cy + 10 + ei * 5.2;
        pdf.setFillColor(...rgb);
        pdf.circle(cx + 2.8, ey - 1.3, 1.3, "F");
        pdf.setFontSize(5.8);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(45, 45, 45);
        const label =
          ev.title.length > 26 ? ev.title.slice(0, 24) + "…" : ev.title;
        pdf.text(label, cx + 5.5, ey);
      });
      if (evs.length > 3) {
        const ey = cy + 10 + 3 * 5.2;
        pdf.setFontSize(5.5);
        pdf.setTextColor(130, 130, 130);
        pdf.text(`+${evs.length - 3} más`, cx + 5.5, ey);
      }
    });

    // ── Legend ───────────────────────────────────────────────
    const LEG_Y = PH - MB + 5;
    let lx = ML;
    pdf.setFontSize(6);
    pdf.setFont("helvetica", "normal");
    window.CV_DATA.SECTIONS.forEach((s) => {
      const rgb = SEC_RGB[s.id] || [120, 120, 120];
      pdf.setFillColor(...rgb);
      pdf.circle(lx + 1.5, LEG_Y - 0.8, 1.5, "F");
      pdf.setTextColor(80, 80, 80);
      pdf.text(s.label, lx + 4.5, LEG_Y);
      lx += pdf.getTextWidth(s.label) + 9;
    });

    const now = new Date();
    pdf.setTextColor(180, 180, 180);
    pdf.text(
      `Exportado el ${now.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" })}`,
      PW - MR,
      LEG_Y,
      { align: "right" },
    );

    pdf.save(`calendario-${window.MONTHS[month]}-${year}.pdf`);
  };

  const toggleSection = (id) =>
    setFilterSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );

  return (
    <div
      data-screen-label="03 Calendario"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: 0,
      }}
    >
      <div
        style={{
          padding: "20px 28px",
          borderBottom: "1px solid var(--line)",
          background: "var(--surface)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconButton
              icon="chevron-left"
              onClick={() => navigate(-1)}
              title="Mes anterior"
            />
            <IconButton
              icon="chevron-right"
              onClick={() => navigate(1)}
              title="Mes siguiente"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={goToday}
              style={{ marginLeft: 4 }}
            >
              Hoy
            </Button>
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-.02em",
              display: "flex",
              alignItems: "baseline",
              gap: 8,
            }}
          >
            <span style={{ textTransform: "capitalize" }}>
              {window.MONTHS[month]}
            </span>
            <span style={{ color: "var(--ink-4)", fontWeight: 400 }}>
              {year}
            </span>
          </h2>

          <div style={{ flex: 1 }} />

          <Segmented
            value={view}
            onChange={setView}
            options={[
              { value: "mes", label: "Mes" },
              { value: "semana", label: "Semana" },
              { value: "dia", label: "Día" },
            ]}
          />

          <Button
            variant="secondary"
            size="md"
            icon="download"
            onClick={exportPDF}
          >
            Exportar PDF
          </Button>
          {!readOnly && (
            <Button variant="primary" size="md" icon="plus" onClick={openNew}>
              Nuevo evento
            </Button>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                color: "var(--ink-4)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              Secciones
            </span>
            <div
              style={{
                display: "flex",
                gap: 6,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => {
                  if (filterSections.length === SECTIONS.length) {
                    setFilterSections([]);
                  } else {
                    setFilterSections(SECTIONS.map((s) => s.id));
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 10px",
                  borderRadius: 999,
                  cursor: "pointer",
                  border: "1px solid var(--line-strong)",
                  background: "transparent",
                  color:
                    filterSections.length === SECTIONS.length
                      ? "var(--brand)"
                      : "var(--ink-4)",
                  fontSize: 11.5,
                  fontWeight: 500,
                }}
              >
                <Icon
                  name={
                    filterSections.length === SECTIONS.length
                      ? "check"
                      : "close"
                  }
                  size={12}
                />
                Todas
              </button>
              {SECTIONS.map((s) => {
                const on = filterSections.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleSection(s.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 7,
                      padding: "5px 11px",
                      borderRadius: 999,
                      cursor: "pointer",
                      border:
                        "1px solid " +
                        (on ? "transparent" : "var(--line-strong)"),
                      background: on ? s.soft : "transparent",
                      color: on ? "var(--ink)" : "var(--ink-4)",
                      fontSize: 12,
                      fontWeight: 500,
                      opacity: on ? 1 : 0.7,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        background: s.color,
                      }}
                    />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ width: 1, height: 22, background: "var(--line)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontSize: 11.5,
                fontWeight: 500,
                color: "var(--ink-4)",
                letterSpacing: ".06em",
                textTransform: "uppercase",
              }}
            >
              Tipo
            </span>
            <Select
              value={
                filterTypes.length === EVENT_TYPES.length
                  ? "todos"
                  : filterTypes[0]
              }
              onChange={(e) => {
                const val = e.target.value;
                setFilterTypes(
                  val === "todos" ? EVENT_TYPES.map((t) => t.id) : [val],
                );
              }}
              style={{ height: 30, fontSize: 12.5, width: 160 }}
            >
              <option value="todos">Todos los tipos</option>
              {EVENT_TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </Select>
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12.5,
              color: "var(--ink-3)",
            }}
          >
            <Icon name="calendar" size={14} />
            <span>
              <strong style={{ color: "var(--ink)", fontWeight: 600 }}>
                {monthEvents.length}
              </strong>{" "}
              eventos este mes
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) 320px",
          gap: 0,
        }}
      >
        <div
          style={{
            padding: 24,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          {view === "mes" && (
            <MonthGrid
              cells={cells}
              month={month}
              today={today}
              eventsByDate={eventsByDate}
              sectionOf={sectionOf}
              primarySection={primarySection}
              onEventClick={openEvent}
              onDayClick={
                readOnly ? undefined : (d) => openNew(window.fmtDate(d))
              }
            />
          )}
          {view === "semana" && (
            <WeekView
              cursor={cursor}
              today={today}
              eventsByDate={eventsByDate}
              primarySection={primarySection}
              onEventClick={openEvent}
            />
          )}
          {view === "dia" && (
            <DayView
              cursor={cursor}
              eventsByDate={eventsByDate}
              primarySection={primarySection}
              onEventClick={openEvent}
            />
          )}
        </div>

        <SidePanel
          monthEvents={monthEvents}
          today={today}
          primarySection={primarySection}
          eventTypes={EVENT_TYPES}
          onEventClick={openEvent}
        />
      </div>
    </div>
  );
};

window.Calendar = Calendar;
