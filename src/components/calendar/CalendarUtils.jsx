const MONTHS = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const DOWS   = ['dom','lun','mar','mié','jue','vie','sáb'];
const DOWS_LONG = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];

const fmtDate = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parseDate = (s) => { const [y,m,dd] = s.split('-').map(Number); return new Date(y, m-1, dd); };

window.MONTHS = MONTHS;
window.DOWS = DOWS;
window.DOWS_LONG = DOWS_LONG;
window.fmtDate = fmtDate;
window.parseDate = parseDate;
