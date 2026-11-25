
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
