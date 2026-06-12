/* ─── Incidencias — Helper Functions ── */

function calcSemaforo(alumnoId, incidents) {
  const mine = incidents.filter((i) => i.alumnoId === alumnoId);
  const active = mine.filter((i) => i.estado === "activa");
  if (active.some((i) => i.gravedad === "grave") || active.length >= 3)
    return "rojo";
  if (active.length >= 1 || mine.length >= 3) return "amarillo";
  return "verde";
}

function fmtFecha(str) {
  const [y, m, d] = str.split("-");
  return `${+d} ${window.MONTHS[+m - 1].slice(0, 3)} ${y}`;
}

window.calcSemaforo = calcSemaforo;
window.fmtFecha = fmtFecha;
