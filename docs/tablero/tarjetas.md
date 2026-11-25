# Tarjetas del tablero «Invernadero Encantado»

Archivo de carga para la skill `/tablero`. Cada tarjeta empieza con `## ` y una línea `Lista:`. En «Por hacer», el orden es la prioridad.

## Spec 09 · Saldar la deuda de prioridad «pagar ya»
Lista: Por hacer

- **Historia:** ninguna (solo deuda técnica). **Deuda:** D-5, D-9, D-10, D-11, D-14, D-15 y D-17 (`docs/deuda-tecnica.md`).
- **Objetivo:** que los formularios conviertan los números con una sola función, que las capturas de las specs lleguen a git, que el harness deje de contradecirse y vigile `main`, `.env` y las diferencias del tablero, y que el backlog y AGENTS.md vuelvan a decir la verdad sobre el código.

### Reglas

- **DEBE** crear `leerNumero(texto)` en `client/src/formato.js`. La función recorta los espacios y devuelve `undefined` si el texto queda vacío. Si no, cambia la coma decimal por un punto y devuelve el número si es finito; si no lo es, devuelve el texto recortado para que la API responda con su mensaje de número entero (D-5).
- **DEBE** usar `leerNumero` para la cantidad en `RiegoRapido.jsx` y en `DetallePlanta.jsx`, y para el intervalo en `Plantas.jsx`. También debe eliminar `leerCantidad` y las conversiones con `Number(...)` de esos campos (D-5).
- **DEBE** cambiar «Cantidad (ml)» en `DetallePlanta.jsx` y «Riego cada (días)» en `Plantas.jsx` a `type="text"` con `inputMode="numeric"`, como el campo de `RiegoRapido.jsx`, para que «2,5» y «tres» lleguen a `leerNumero` y no lleguen vacíos (D-5).
- **DEBE** agregar tests de `leerNumero` en `test/client/formato.test.mjs`, que `npm test` ejecuta (D-5).
- **DEBE** cambiar en `.gitignore` el patrón `capturas/` por `/capturas/`, para que solo ignore la carpeta de la raíz (D-9).
- **DEBE** reescribir el paso 13 de `.claude/skills/siguiente-spec/SKILL.md` para que diga que se agreguen con `git add` solo los archivos de la spec y de `docs/specs/` (incluidas las capturas), y que después se sigan los pasos de `.claude/skills/commit/SKILL.md` (D-10).
- **DEBE** cambiar el paso 2 de `.claude/skills/commit/SKILL.md` para que la prohibición de hacer `git add` tenga una sola excepción: que otra skill diga exactamente qué archivos agregar (D-10).
- **DEBE** añadir a `.claude/settings.json` un `permissions.deny` con `Read(./.env)`, `Edit(./.env)` y `Write(./.env)` (D-11).
- **DEBE** crear `.claude/hooks/proteger-main.js`, registrado como hook `PreToolUse` con matcher `Bash`. El hook bloquea con código 2 y un mensaje en stderr un `git commit` cuando la rama actual es `main`. La decisión se toma en la función pura `debeBloquear(comando, rama)`, que se exporta y tiene tests en `test/hooks/proteger-main.test.js`. Ante cualquier otro caso o error, termina con código 0 (D-11).
- **DEBE** cambiar el paso 4 de `.claude/skills/tablero/SKILL.md`: si una tarjeta ya existe en una lista distinta de la del archivo, no se mueve, pero la tabla final la muestra con las dos listas en una columna «Lista distinta» (D-14).
- **DEBE** actualizar `docs/backlog/E1-plantas-y-riegos.md` (D-15) así:
  - T-02: marcar la casilla del dominio y poner el estado «hecho (spec 04)».
  - T-05: marcar la casilla del dominio y poner el estado «pendiente solo por la unidad: la DoD pide litros con decimales y D6 fijó ml enteros».
  - HU-1.8: poner el estado «implementada (spec 07)» y añadirla al «Estado de entrega».
  - Sección «Deuda técnica»: quitar la viñeta de T-02 y T-05 y la de AGENTS.md.
- **DEBE** cambiar el ejemplo de rutas de `AGENTS.md` para que nombre `/api/plantas/:id/riegos` como historial y `POST /api/riegos` como registro de un riego (D-17).
- **NO DEBE** tocar `src/` ni cambiar ningún mensaje de la API ni ningún texto visible del cliente (etiquetas, ayudas y mensajes).
- **NO DEBE** modificar los tests que ya existen.
- **NO DEBE** hacer que `proteger-main.js` bloquee algo distinto de `git commit` en `main`.
- **NO DEBE** añadir las capturas de la spec 07 (eso es D-19) ni pagar otros ítems del registro.
- **NO DEBE** mover tarjetas en Trello.

### Criterios de aceptación

- **CA-09.1:** DADO los textos `"2,5"`, `" 500 "`, `""`, `"   "` y `"tres"`, CUANDO se pasan a `leerNumero`, ENTONCES devuelve `2.5`, `500`, `undefined`, `undefined` y `"tres"`.
- **CA-09.2:** DADO el formulario «Registrar un riego» del detalle o el formulario «Registrar una planta», CUANDO el cuidador escribe «tres» o «2,5» en el campo numérico y envía, ENTONCES ve bajo el campo el mensaje de número entero de la API, el mismo que da el riego rápido, y no «es obligatorio».
- **CA-09.3:** DADO `docs/specs/07-riego-rapido/capturas/x.png` y `capturas/x.png`, CUANDO se pasan a `git check-ignore`, ENTONCES el primero no está ignorado y el segundo sí.
- **CA-09.4:** DADO `siguiente-spec/SKILL.md` y `commit/SKILL.md`, CUANDO se leen juntas, ENTONCES ninguna prohíbe lo que la otra manda: `siguiente-spec` dice qué archivos agregar y `commit` admite esa excepción.
- **CA-09.5:** DADO la rama `main`, CUANDO el comando es `git commit -m "x"`, ENTONCES `debeBloquear` devuelve verdadero; DADO la rama `spec/09-pagar-ya` con el mismo comando, o `main` con `git status`, ENTONCES devuelve falso.
- **CA-09.6:** DADO `.claude/settings.json`, CUANDO se lee, ENTONCES `permissions.deny` incluye `Read(./.env)`, `Edit(./.env)` y `Write(./.env)`, y hay un hook `PreToolUse` con matcher `Bash` que ejecuta `proteger-main.js`.
- **CA-09.7:** DADO una tarjeta que en Trello está en «Hecho» y en `tarjetas.md` está en «Por hacer», CUANDO se ejecuta `/tablero`, ENTONCES no la mueve y la tabla final la muestra en «Lista distinta» con las dos listas.
- **CA-09.8:** DADO el backlog de E1, CUANDO se lee, ENTONCES:
  - T-02 está hecho.
  - T-05 está pendiente solo por la unidad.
  - HU-1.8 figura como implementada en la spec 07 y en el «Estado de entrega».
  - «Deuda técnica» ya no dice que las validaciones estén en los modelos ni menciona AGENTS.md.
- **CA-09.9:** DADO `AGENTS.md`, CUANDO se lee la convención de rutas, ENTONCES nombra `POST /api/riegos` como registro de un riego.
- **CA-09.10:** DADO los tests que ya existen, CUANDO se ejecuta `npm test` sin modificarlos, ENTONCES todos pasan junto con los nuevos.

### Verificación

| Criterio | Cómo se comprueba |
| --- | --- |
| CA-09.1 | Tests en `test/client/formato.test.mjs` |
| CA-09.2 | En el navegador con la API: «tres» y «2,5» en los dos formularios y en el riego rápido muestran el mismo mensaje |
| CA-09.3 | `git check-ignore -v docs/specs/07-riego-rapido/capturas/x.png capturas/x.png` solo imprime el segundo |
| CA-09.4 | Revisión del diff de las dos skills |
| CA-09.5 | Tests en `test/hooks/proteger-main.test.js` |
| CA-09.6 | Revisión del diff de `.claude/settings.json` |
| CA-09.7 | Revisión del diff de `tablero/SKILL.md` |
| CA-09.8 y CA-09.9 | `grep -n "están en los modelos de Mongoose" docs/backlog/E1-plantas-y-riegos.md` no encuentra nada en «Deuda técnica», y `grep -n "/api/riegos" AGENTS.md` encuentra la convención |
| CA-09.10 | `npm test` pasa, y `git diff main -- test/` solo añade archivos nuevos |

### Archivos

`client/src/formato.js` · `client/src/componentes/RiegoRapido.jsx` · `client/src/pantallas/DetallePlanta.jsx` · `client/src/pantallas/Plantas.jsx` · `test/client/formato.test.mjs` (nuevo) · `.gitignore` · `.claude/skills/siguiente-spec/SKILL.md` · `.claude/skills/commit/SKILL.md` · `.claude/skills/tablero/SKILL.md` · `.claude/settings.json` · `.claude/hooks/proteger-main.js` (nuevo) · `test/hooks/proteger-main.test.js` (nuevo) · `docs/backlog/E1-plantas-y-riegos.md` · `AGENTS.md`

## Spec 08 · Unificar la validación de identificadores
Lista: Hecho

- **Historia:** HU-1.2 · Registrar un riego. **Deuda:** D-1 (`docs/deuda-tecnica.md`).
- **Objetivo:** el identificador de la planta de un riego se comprueba con `esIdValido`, y en `src/` queda una sola expresión regular para los identificadores.

### Reglas

- **DEBE** hacer que `validarIdPlanta` de `src/dominio/validaciones.js` use `esIdValido` en lugar de su propia expresión regular.
- **DEBE** dejar una sola expresión regular para los identificadores en `src/` y eliminar `ID_PLANTA`.
- **DEBE** mantener los mensajes «La planta es obligatoria» y «La planta no tiene un identificador válido», y el orden en que se comprueban.
- **DEBE** agregar a `test/dominio/validaciones.test.js` un test que demuestre que `validarRiego` rechaza la planta exactamente con los valores que `esIdValido` considera no válidos.
- **NO DEBE** cambiar ningún mensaje de error ni ninguna respuesta de la API.
- **NO DEBE** modificar los tests que ya existen.
- **NO DEBE** tocar `src/routes/` ni `client/`.

### Criterios de aceptación

- **CA-08.1:** DADO el código de `src/`, CUANDO se buscan expresiones regulares de identificadores, ENTONCES solo hay una, la que usa `esIdValido`.
- **CA-08.2:** DADO un conjunto de valores (`"665f1c2a9b1e8a0012345678"`, `"665F1C2A9B1E8A0012345678"`, `"123"`, `"665f1c2a9b1e8a001234567z"`, `" 665f1c2a9b1e8a0012345678"`, `123`, `{ $gt: "" }`, `undefined`, `null`, `""`, `"   "`), CUANDO se valida un riego con cada uno como `planta`, ENTONCES `validarRiego` devuelve un detalle en `planta` si y solo si `esIdValido` devuelve falso para ese valor.
- **CA-08.3:** DADO `planta: "123"`, CUANDO se valida el riego, ENTONCES el mensaje sigue siendo «La planta no tiene un identificador válido»; y DADO `planta` vacía o con solo espacios, ENTONCES sigue siendo «La planta es obligatoria».
- **CA-08.4:** DADO los tests que ya existen, CUANDO se ejecuta `npm test` sin modificarlos, ENTONCES todos pasan.

### Verificación

| Criterio | Cómo se comprueba |
| --- | --- |
| CA-08.1 | `grep -rnE "\[0-9a-f\]\{24\}" src/` devuelve una sola línea |
| CA-08.2 | Test nuevo en `test/dominio/validaciones.test.js` |
| CA-08.3 y CA-08.4 | `npm test` pasa, y `git diff main -- test/` solo añade líneas, sin cambiar ni borrar ninguna |
| Alcance | `git diff main --stat` solo muestra `src/dominio/validaciones.js`, `test/dominio/validaciones.test.js` y `docs/specs/` |

### Archivos

`src/dominio/validaciones.js` · `test/dominio/validaciones.test.js`

## Spec 04 · Validar la planta en el dominio
Lista: Hecho

- **Historia:** HU-1.1 · Registrar una planta. **Deuda:** T-02 (backlog de E1, sección «Deuda técnica»).
- **Objetivo:** las reglas de una planta nueva se comprueban en una función pura de `src/dominio/`, que la ruta usa antes de tocar la base de datos.

### Reglas

- **DEBE** crear `src/dominio/validaciones.js` con `validarPlanta(datos)`, que devuelve una lista de `{ campo, mensaje }`, vacía si la planta es válida.
- **DEBE** usar los mismos mensajes que el modelo `Planta` y devolverlos en el orden nombre, especie, ubicación e intervalo.
- **DEBE** tratar como vacío un texto con solo espacios.
- **DEBE** aceptar como intervalo solo números enteros mayores o iguales a 1.
- **DEBE** hacer que `POST /api/plantas` responda 400 con `{ "error": "Datos no válidos", "detalles": [...] }` si `validarPlanta` devuelve algo, sin llamar a `Planta.create`.
- **NO DEBE** quitar las validaciones del modelo: siguen como segunda barrera.
- **NO DEBE** cambiar los mensajes ni tocar `client/`.

### Criterios de aceptación

- **CA-04.1:** DADO nombre, especie, ubicación e intervalo 3, CUANDO se valida, ENTONCES la lista está vacía.
- **CA-04.2:** DADO una planta sin especie y con intervalo 0, CUANDO se valida, ENTONCES hay dos detalles: «La especie es obligatoria» y «El intervalo de riego debe ser de al menos 1 día», en ese orden.
- **CA-04.3:** DADO un nombre con solo espacios, CUANDO se valida, ENTONCES aparece «El nombre es obligatorio».
- **CA-04.4:** DADO un intervalo de 2.5 o «tres», CUANDO se valida, ENTONCES aparece «El intervalo de riego debe ser un número entero de días».
- **CA-04.5:** DADO un cuerpo sin especie, CUANDO se envía a `POST /api/plantas`, ENTONCES responde 400 con el detalle y no se crea ninguna planta.

### Verificación

| Criterio | Cómo se comprueba |
| --- | --- |
| CA-04.1 a CA-04.4 | Tests en `test/dominio/validaciones.test.js` |
| CA-04.5 | curl a la API y revisión del diff: la ruta llama a `validarPlanta` antes de `Planta.create` |

### Archivos

`src/dominio/validaciones.js` (nuevo) · `test/dominio/validaciones.test.js` (nuevo) · `src/routes/plantas.js`

## Spec 05 · Validar el riego en el dominio
Lista: Hecho

- **Historia:** HU-1.2 · Registrar un riego. **Deuda:** T-05.
- **Objetivo:** las reglas de formato de un riego se comprueban en una función pura de `src/dominio/`, antes de buscar la planta en la base de datos.

### Reglas

- **DEBE** agregar a `src/dominio/validaciones.js` la función `validarRiego(datos, ahora)`, que devuelve una lista de `{ campo, mensaje }`.
- **DEBE** exigir `planta` con un identificador de 24 caracteres hexadecimales: «La planta es obligatoria» o «La planta no tiene un identificador válido».
- **DEBE** exigir `cantidadMl` entera y mayor que 0, con los mensajes del modelo `Riego`.
- **DEBE** aceptar `fecha` vacía (será hoy). Si viene, debe ser una fecha válida y no futura, usando `interpretarFecha` y `esFechaFutura` de `src/dominio/fechas.js`.
- **DEBE** hacer que `POST /api/riegos` responda 400 con el formato de error de la API si `validarRiego` devuelve algo, antes de buscar la planta.
- **NO DEBE** mover a esta función la regla de «no anterior al registro de la planta»: necesita la base de datos y sigue en la ruta.
- **NO DEBE** importar Mongoose en `src/dominio/`.

### Criterios de aceptación

- **CA-05.1:** DADO una planta válida y 500 ml sin fecha, CUANDO se valida, ENTONCES la lista está vacía.
- **CA-05.2:** DADO una cantidad de 0, -5 o 2.5, CUANDO se valida, ENTONCES aparece el mensaje de cantidad que corresponde.
- **CA-05.3:** DADO la fecha de mañana, CUANDO se valida, ENTONCES aparece «Un riego no puede tener fecha futura».
- **CA-05.4:** DADO hoy a las 23:59 con `ahora` a las 00:01 del mismo día, CUANDO se valida, ENTONCES no hay error de fecha.
- **CA-05.5:** DADO `planta: "123"`, CUANDO se valida, ENTONCES aparece «La planta no tiene un identificador válido».

### Verificación

| Criterio | Cómo se comprueba |
| --- | --- |
| CA-05.1 a CA-05.5 | Tests en `test/dominio/validaciones.test.js`, con `ahora` fijo |
| Uso en la ruta | Revisión del diff: `validarRiego` va antes de `Planta.findById` |

### Archivos

`src/dominio/validaciones.js` · `test/dominio/validaciones.test.js` · `src/routes/riegos.js`

## Spec 06 · Consultar una planta por su identificador
Lista: Hecho

- **Historia:** HU-1.4 · Historial de riegos (apoyo). Hoy el frontend recibe los datos de la planta desde la lista; con este endpoint, el detalle puede pedirlos solo.
- **Objetivo:** `GET /api/plantas/:id` devuelve una planta, con los mismos errores que el historial de riegos.

### Reglas

- **DEBE** agregar `esIdValido(valor)` a `src/dominio/validaciones.js`: verdadero solo para 24 caracteres hexadecimales.
- **DEBE** crear `GET /api/plantas/:id`: 400 con `{ campo: "id", mensaje: "La planta no tiene un identificador válido" }` si el id no es válido, 404 con `{ "error": "Planta no encontrada" }` si no existe y 200 con la planta si existe.
- **DEBE** usar `esIdValido` también en `GET /api/plantas/:id/riegos`, en lugar de la comprobación actual.
- **NO DEBE** cambiar el frontend en esta spec.

### Criterios de aceptación

- **CA-06.1:** DADO `"665f1c2a9b1e8a0012345678"`, CUANDO se comprueba, ENTONCES `esIdValido` es verdadero; con `"123"`, `""` o `null`, falso.
- **CA-06.2:** DADO una planta registrada, CUANDO se pide por su id, ENTONCES responde 200 con sus datos.
- **CA-06.3:** DADO un id con formato válido que no existe, CUANDO se pide, ENTONCES responde 404.
- **CA-06.4:** DADO el id `abc`, CUANDO se pide la planta o su historial, ENTONCES los dos responden 400 con el mismo detalle.

### Verificación

| Criterio | Cómo se comprueba |
| --- | --- |
| CA-06.1 | Tests en `test/dominio/validaciones.test.js` |
| CA-06.2 a CA-06.4 | curl a la API |

### Archivos

`src/dominio/validaciones.js` · `test/dominio/validaciones.test.js` · `src/routes/plantas.js`

## HU-2.1 · Ver las plantas que necesitan agua
Lista: Backlog

Como cuidador, quiero ver qué plantas necesitan agua hoy, para regarlas sin revisar el historial de cada una.

- **Alcance:** PRD §4.3, épica E2.
- **Estado:** sin spec. Falta definir la regla de «sedienta» con el cliente y escribir sus criterios. **No se implementa hasta tener spec.**

## HU-2.2 · Poner una planta en reposo
Lista: Backlog

Como cuidador, quiero marcar una planta en reposo, para que no aparezca como sedienta mientras no necesita riego.

- **Alcance:** épica E2.
- **Estado:** sin spec. El PRD todavía no define qué es el reposo ni cuánto dura (pregunta abierta). **No se implementa hasta tener spec.**

## Spec 01 · Registrar plantas y riegos
Lista: Hecho

Backend de la épica E1. Ver `docs/specs/01-plantas-y-riegos.md`.

## Spec 02 · Frontend de la épica E1
Lista: Hecho

Pantallas «Plantas» y «Detalle de planta». Ver `docs/specs/02-frontend-e1.md` y `docs/AUDITORIA-frontend.md`.

## Spec 07 · Registrar un riego rápido desde la lista
Lista: Hecho

- **Historia:** HU-1.8 · Registrar un riego rápido desde la lista (backlog de E1, CA-1.8.1 a CA-1.8.7).
- **Objetivo:** desde la lista de plantas, el cuidador anota un riego de hoy en un panel dentro de la fila, sin abrir el detalle.

### Reglas

- **DEBE** añadir a cada fila (tarjeta en el móvil) un botón secundario «Registrar riego», con nombre accesible «Registrar riego para <nombre>».
- **DEBE** abrir el panel dentro de la fila: en escritorio, como una franja bajo la fila; en el móvil, dentro de la tarjeta. Mientras el panel está abierto, el panel sustituye al botón de esa fila.
- **DEBE** mostrar en el panel el título «Riego para <nombre>», el campo «Cantidad (ml)» con 500 y el foco puesto, la ayuda «Se anota con la fecha de hoy.», el botón secundario «Guardar riego» y el enlace «Cancelar».
- **DEBE** permitir un solo panel abierto: abrir otro cierra el anterior sin guardar.
- **DEBE** registrar con `registrarRiego` de `client/src/api.js` (`POST /api/riegos`), enviando solo `planta` y `cantidadMl`.
- **DEBE** tratar las respuestas así: un 400 se muestra junto al campo con `repartirErrores`; un 404 muestra «No encontramos esa planta. Puede que se haya borrado.» y oculta «Guardar riego»; cualquier otro fallo, «No pudimos guardar el riego. Revisa tu conexión y vuelve a intentarlo.»
- **DEBE** usar los componentes `Campo` y `Mensaje` que ya existen, y solo variables de `tokens.css`.
- **NO DEBE** enviar `fecha` ni `cuidador`.
- **NO DEBE** cambiar el backend.
- **NO DEBE** cambiar el formulario «Registrar una planta». Su botón «Registrar planta» sigue siendo el único botón primario de la pantalla.
- **NO DEBE** volver a pedir la lista de plantas después de guardar un riego.

### Criterios de aceptación

- **CA-07.1 · Panel abierto** (CA-1.8.1): DADO la lista con «Helecho Lunar» y «Mandrágora», CUANDO pulsa «Registrar riego» en «Helecho Lunar», ENTONCES se abre el panel de esa fila con 500 ml, el foco en el campo, la ayuda, «Guardar riego» y «Cancelar», sin campos de fecha ni de cuidador. Abrir el panel de «Mandrágora» cierra el de «Helecho Lunar», y «Cancelar» cierra el panel sin registrar nada.
- **CA-07.2 · Guardando** (CA-1.8.2): DADO el panel con 500 ml, CUANDO pulsa «Guardar riego» y la respuesta no ha llegado, ENTONCES el botón dice «Guardando…» y está desactivado, el campo y «Cancelar» también, y otra pulsación no envía un segundo riego.
- **CA-07.3 · Éxito** (CA-1.8.3): DADO el panel con 500 ml, CUANDO el riego se registra, ENTONCES el panel se cierra, la fila muestra «Riego guardado para Helecho Lunar.», la lista no se mueve y el detalle de la planta tiene al principio un riego de hoy, de 500 ml y «sin cuidador».
- **CA-07.4 · Error de validación** (CA-1.8.4): DADO el panel, CUANDO guarda con 0, con el campo vacío o con 2,5, ENTONCES el panel sigue abierto con lo escrito, el campo tiene borde de error y debajo el mensaje de la API con icono, y no se registra ningún riego.
- **CA-07.5 · Error de conexión** (CA-1.8.5): DADO el panel con 500 ml y la API apagada, CUANDO pulsa «Guardar riego», ENTONCES el panel sigue abierto con 500 ml, muestra el mensaje de conexión y «Guardar riego» vuelve a estar activo.
- **CA-07.6 · Planta no encontrada** (CA-1.8.6): DADO el panel de una planta borrada después de cargar la lista, CUANDO pulsa «Guardar riego», ENTONCES el panel muestra «No encontramos esa planta. Puede que se haya borrado.», sin «Guardar riego», y no se registra nada.
- **CA-07.7 · Móvil a 390 px** (CA-1.8.7): DADO una pantalla de 390 px, CUANDO pasa por los estados de CA-07.1 a CA-07.6, ENTONCES el panel queda dentro de la tarjeta, el campo ocupa todo el ancho y abre el teclado numérico, botones y enlaces miden al menos 44 px de alto, y no hay desplazamiento horizontal.

### Pantallas

La estructura sale del wireframe (qué hay, en qué orden y con qué textos), el estilo de `DESIGN.md` y el comportamiento de los criterios. Los grises y las cajas de los wireframes no son el estilo final.

| Estado | Wireframe | Criterio |
| --- | --- | --- |
| Lista | `docs/specs/07-riego-rapido/wireframes/lista-movil.svg` · `lista-escritorio.svg` | CA-07.1 |
| Panel abierto | `docs/specs/07-riego-rapido/wireframes/panel-abierto-movil.svg` · `panel-abierto-escritorio.svg` | CA-07.1 |
| Guardando | `docs/specs/07-riego-rapido/wireframes/guardando-movil.svg` | CA-07.2 |
| Éxito | `docs/specs/07-riego-rapido/wireframes/exito-movil.svg` | CA-07.3 |
| Error de validación | `docs/specs/07-riego-rapido/wireframes/error-validacion-movil.svg` | CA-07.4 |
| Error de conexión | `docs/specs/07-riego-rapido/wireframes/error-conexion-movil.svg` | CA-07.5 |
| Planta no encontrada | `docs/specs/07-riego-rapido/wireframes/planta-no-encontrada-movil.svg` | CA-07.6 |

Las decisiones que toman los wireframes están en `docs/specs/07-riego-rapido/wireframes/README.md`.

### Verificación

El frontend no tiene tests automáticos (como en la spec 02). Cada criterio se comprueba con una captura de `npm run captura` a 390 px (y a 1280 px si hay wireframe de escritorio), comparada con su wireframe, y a mano en el navegador.

| Criterio | Cómo se comprueba |
| --- | --- |
| CA-07.1 | Capturas a 390 y 1280 px tras `--clic "Registrar riego para Helecho Lunar"`, comparadas con `lista-*` y `panel-abierto-*`. En el navegador: el foco, «Cancelar» y abrir otra fila |
| CA-07.2 | En el navegador con la red ralentizada (DevTools): el botón desactivado; con doble clic, el historial gana un solo riego |
| CA-07.3 | Captura a 390 px tras guardar, comparada con `exito-movil.svg`, y luego el detalle de la planta en el navegador |
| CA-07.4 | Capturas a 390 px con `--rellenar "Cantidad (ml)=0"`, con el campo vacío y con 2,5, comparadas con `error-validacion-movil.svg` |
| CA-07.5 | API apagada después de cargar la lista; captura del panel comparada con `error-conexion-movil.svg` |
| CA-07.6 | Planta borrada en MongoDB después de cargar la lista; captura comparada con `planta-no-encontrada-movil.svg` |
| CA-07.7 | Todas las capturas a 390 px sin desplazamiento horizontal; en el navegador, el teclado numérico (modo móvil de DevTools) y las zonas de 44 px |
| Sin regresiones | `npm test` sigue pasando y el diff no toca `src/` ni el formulario «Registrar una planta» |

### Archivos

`client/src/componentes/RiegoRapido.jsx` (nuevo) · `client/src/pantallas/Plantas.jsx` · `client/src/styles/app.css`
