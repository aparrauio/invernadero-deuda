const MESES = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

// «28 oct 2026», en hora local.
export function fechaCorta(valor) {
  const fecha = new Date(valor);
  return `${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`;
}

// Texto de un campo numérico → valor para la API (spec 09).
// Vacío → undefined; «2,5» → 2.5; un texto que no es un número se envía tal cual
// para que la API responda con su mensaje de «número entero».
export function leerNumero(texto) {
  const limpio = texto.trim();
  if (limpio === "") return undefined;
  const numero = Number(limpio.replace(",", "."));
  return Number.isFinite(numero) ? numero : limpio;
}

// «AAAA-MM-DD» de hoy en hora local, para el máximo del campo de fecha.
export function hoyIso() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}
