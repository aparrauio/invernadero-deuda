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

### Pendientes

- **Verificación de CA-09.2 (2026-11-25):** con la API y el cliente en marcha, un script de Playwright de un solo uso escribió «tres» y «2,5» en «Riego cada (días)», en el riego rápido y en «Cantidad (ml)» del detalle. Los tres formularios enviaron `"tres"` y `2.5`, y mostraron bajo el campo el mensaje de número entero de la API. Todas las respuestas fueron 400, así que no se guardó nada.
- **Falso positivo de `proteger-main.js`:** el hook mira la rama antes de ejecutar el comando. `git switch -c x && git commit` lanzado desde `main` se bloquea aunque el commit acabaría en otra rama. Basta con separar los dos comandos.
- **El hook usa `git branch --show-current`** y no `git rev-parse --abbrev-ref HEAD`, que falla en un repositorio sin commits y dejaba pasar el commit.
- **`test/dominio/validaciones.test.js` no pasa `prettier --check`** desde la spec 08. No se toca aquí porque la spec prohíbe modificar los tests existentes.
- **Capturas de la spec 07:** con el nuevo patrón de `.gitignore`, `docs/specs/07-riego-rapido/capturas/` aparece como carpeta sin seguimiento. No se añade aquí (D-19).
- **Números de línea de D-14** en `docs/deuda-tecnica.md`: ya no apuntan a las tarjetas que citan.
- **El hook de revisión no se disparó (D-20):** al cambiar `.gitignore`, `docs/specs/07-riego-rapido/capturas/` quedó sin seguimiento, y `revision-adversarial.js:57-61` lo tomó como trabajo pendiente y salió sin avisar. Se desbloqueó excluyendo esa carpeta solo en la copia local (`.git/info/exclude`), y el fallo queda anotado como D-20 en `docs/deuda-tecnica.md`.
