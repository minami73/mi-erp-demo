# MI-ERP Escolar — Demo interactivo

Prototipo de un ERP escolar modular para un colegio privado con 5 secciones
(maternal, preescolar, primaria, secundaria y bachillerato). Es un demo
**100% frontend** (React 18 + Babel standalone vía CDN, sin build step ni
backend): todos los datos son mock y viven en `src/data/data.js`.

**▶ Demo en vivo:** https://minami73.github.io/mi-erp-demo/

## Qué evaluar

- **RBAC con scope por sección:** todos los usuarios ven todo el calendario,
  pero solo pueden crear/editar en sus secciones asignadas. Los eventos
  multisección requieren scope en todas sus secciones.
- **Modularidad:** registro central de vistas en `src/views.jsx`; agregar un
  módulo = un script tag en `index.html` + una entrada en el registro.
- **Módulos:** Calendario (mensual/semanal/diario, filtros, export PDF),
  Horarios (detección de choques), Incidencias con semáforo disciplinario,
  Incidencias docentes (flujo de dos versiones), Personal (UI genérica +
  data por sección), Organigrama, Reportes, y módulos restringidos por usuario.
- **Admin:** reordenar/activar módulos (drag & drop, persiste en localStorage)
  y gestión de usuarios.

## Credenciales de prueba

| Usuario                  | Email                           | Contraseña         | Perfil                                 |
| ------------------------ | ------------------------------- | ------------------ | -------------------------------------- |
| Director General         | `fmendoza@colegiovictoria.com`  | `director2026`     | Admin global, ve y edita todo          |
| Dir. Bachillerato        | `rtadeo@colegiovictoria.com`    | `bachillerato2026` | Edita solo bachillerato                |
| Dir. Primaria            | `vpaulino@colegiovictoria.com`  | `primaria2026`     | Edita solo primaria                    |
| Dir. Preescolar/Maternal | `abonilla@colegiovictoria.com`  | `preescolar2026`   | Edita preescolar y maternal            |
| Dir. Secundaria          | `fcamacho@colegiovictoria.com`  | `secundaria2026`   | Edita solo secundaria                  |
| Desarrollo Académico     | `jgonzalez@colegiovictoria.com` | `academico2026`    | Edita primaria/secundaria/bachillerato |
| Vinculación              | `jmolina@colegiovictoria.com`   | `vinculacion2026`  | Solo lectura en todo                   |

> Sugerencia: entra primero como Director General para ver el sistema completo,
> y luego como un director de sección para ver las restricciones de escritura
> en acción (los eventos fuera de su scope se abren en modo consulta).

## Correr local

No requiere instalación: servir la carpeta con cualquier servidor estático,
p. ej. `python -m http.server` o la extensión Live Server de VSCode, y abrir
`index.html`. (Abrirlo con `file://` no funciona por las cargas de scripts.)

## Nota

El sistema real (en desarrollo) es un monolito modular: Node + Express +
Prisma + PostgreSQL en backend y Next.js 15 en frontend, con validación de
permisos siempre del lado del servidor. Este demo replica su modelo de
permisos solo con fines de presentación.
