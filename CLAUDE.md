# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es esto

Demo interactivo de un ERP escolar (Colegio Victoria) para 5 secciones (maternal,
preescolar, primaria, secundaria, bachillerato). **100% frontend, sin build step ni
backend**: React 18 + Babel standalone cargados vía CDN directo en `index.html`, JSX
transpilado en el navegador en tiempo real. Todos los datos son mock, viven en
`src/data/data.js`. Demo en vivo: https://minami73.github.io/mi-erp-demo/

El sistema real (en desarrollo, en otro repo) es Node + Express + Prisma + PostgreSQL
en backend y Next.js 15 en frontend, con validación de permisos del lado del servidor.
Este demo replica su modelo de permisos solo con fines de presentación — no hay
seguridad real (todo el RBAC corre en el cliente).

## Correr / probar cambios

No hay build ni bundler ni tests. Para ver cambios:

```
python -m http.server
```

y abrir `http://localhost:8000` (o el puerto que indique). **No abrir con `file://`**:
los `<script>` de módulos fallan por CORS/carga de archivos locales. No hay linter
configurado; los únicos "checks" son abrir el navegador y revisar la consola por
errores de Babel/React.

## Arquitectura

**Carga de scripts, no imports.** No hay bundler: cada archivo es un `<script>` tag en
`index.html`, en orden de dependencia (utilidades antes que componentes que las usan,
componentes antes que módulos que los usan). Los `.jsx` llevan `type="text/babel"` y se
transpilan en el navegador; los `.js` planos (constants, data, helpers) se cargan
normal. **Todo vive en `window`**: no hay imports/exports de ES modules. Un componente
`Foo` definido como `const Foo = ...` en un archivo queda global vía scope de script y
se usa directo en JSX de otros archivos. Datos y funciones compartidas cuelgan de
namespaces explícitos en `window` (`window.CV_DATA`, `window.CV_VIEWS`,
`window.CV_ALUMNOS`, `window.CV_PERSONAL`, `window.fmtDate`).

**Agregar un módulo nuevo = dos pasos:**
1. Un `<script>` tag en `index.html` (orden importa: si el módulo tiene sub-componentes,
   ve después de ellos).
2. Una entrada en el registro central `src/views.jsx` (`window.CV_VIEWS`), con
   `title`, `subtitle`, `breadcrumbs` y `render(ctx)`. `ctx` trae `openEvent`, `openNew`,
   `events`, `isReadOnly`, `modules`, `setModules`, `currentUser` — cada módulo toma
   solo lo que necesita.

`src/components/layout/App.jsx` hace el lookup en `CV_VIEWS` por el id de módulo
actual (`current`) y solo renderiza; no tiene lógica de negocio por módulo. Módulos
sin registro propio (ids `personal-*`/`alumnos-*` de secciones no implementadas, o
cualquier módulo activo sin vista) caen en fallbacks dentro de `App.jsx` que muestran
`src/pages/Construction.jsx` ("en preparación").

**RBAC con scope por sección** (`window.CV_DATA`, función `editableSectionsFor`):
- El calendario es visible completo para todos — la restricción es solo de
  **escritura**. `editableSectionsFor(user)` devuelve las secciones donde el usuario
  puede crear/editar: vacío si `user.readOnly`, todas si `user.admin`, si no
  `user.sections`.
- Eventos multisección requieren que el usuario tenga scope en *todas* sus secciones
  para poder editarlos (ver lógica de permisos en `EventModal.jsx`).
- `user.restrictedModules` oculta módulos enteros del sidebar para ese usuario
  (independiente del scope de secciones) — p. ej. "alumnos-especiales" restringido a
  casi todos los directores de sección.
- Persistencia de sesión y preferencias vía `localStorage` (`cv_logged_in`,
  `cv_user_id`, `cv_modules` para orden/activación de módulos del admin,
  `cv_sidebar_collapsed`).

**Estructura por módulo:** cada carpeta bajo `src/modules/<nombre>/` sigue el mismo
patrón: un componente principal (`<Nombre>.jsx`) que orquesta, un `components/`
con piezas de UI, y `constants.js`/`helpers.js`/`data-*.js` para datos y lógica sin
JSX. Los módulos con datos mock específicos por sección (alumnos, personal) usan
archivos `data-<seccion>.js` separados en vez de meter todo en `data.js`.

**Módulos con flujos particulares a tener en cuenta:**
- `horarios/`: detección de choques de horario entre Academic y Workshop
  (`place-lanes.js` calcula posicionamiento en carriles para evitar solapamientos
  visuales).
- `incidencias/`: semáforo disciplinario (badges de severidad acumulada por alumno).
- `incidencias-docentes/`: flujo de dos versiones (`VersionBlock`, `Version2Modal`)
  para registrar y contrastar la versión de cada docente involucrado.
- `components/admin/ModulesAdmin.jsx`: reordenar (drag & drop) y activar/desactivar
  módulos del sidebar; persiste en `localStorage` vía el mismo estado `modules` que
  vive en `App.jsx`.

## Convenciones

- Todo el copy de UI está en español (México) — mantener ese idioma en textos nuevos.
- Sin TypeScript, sin PropTypes: los componentes no validan tipos de props.
- Sin CSS-in-JS ni módulos CSS: estilos inline en JSX + una única hoja global
  `src/css/base.css` con variables CSS por sección (`--sec-<seccion>`,
  `--sec-<seccion>-soft>`) reusadas para colorear badges/eventos por sección.
