// Hook PreToolUse (Bash): impide hacer `git commit` directamente en main (AGENTS.md).
// Bloquea con código 2 y un mensaje en stderr; ante cualquier otro caso o error, código 0.
const { execFileSync } = require("node:child_process");

// `git`, opciones opcionales de git (p. ej. `-C ruta`) y el subcomando `commit`.
const GIT_COMMIT =
  /^git(?:\s+-{1,2}[^\s]+(?:\s+(?!commit\b)[^\s-][^\s]*)?)*\s+commit(?=\s|$)/;

// Cada comando de una cadena (&&, ||, ;, |) se mira por separado.
function debeBloquear(comando, rama) {
  if (rama !== "main" || typeof comando !== "string") return false;
  return comando
    .split(/&&|\|\||;|\|/)
    .some((parte) => GIT_COMMIT.test(parte.trim()));
}

function ramaActual(dir) {
  return execFileSync("git", ["branch", "--show-current"], {
    cwd: dir,
    encoding: "utf8",
  }).trim();
}

if (require.main === module) {
  let entrada = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (trozo) => {
    entrada += trozo;
  });
  process.stdin.on("end", () => {
    try {
      const datos = JSON.parse(entrada);
      const dir = datos.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd();
      if (debeBloquear(datos?.tool_input?.command, ramaActual(dir))) {
        process.stderr.write(
          "No se hace commit directo en main (AGENTS.md). Crea la rama spec/<número>-<slug> y haz el commit allí.\n",
        );
        process.exit(2);
      }
    } catch {
      // Sin bloquear: un fallo del hook no debe interrumpir a Claude.
    }
    process.exit(0);
  });
}

module.exports = { debeBloquear };
