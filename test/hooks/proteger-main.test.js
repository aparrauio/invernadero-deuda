const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const { debeBloquear } = require("../../.claude/hooks/proteger-main");

describe("debeBloquear (spec 09)", () => {
  test("CA-09.5: bloquea git commit en main", () => {
    assert.equal(debeBloquear('git commit -m "x"', "main"), true);
  });

  test("CA-09.5: no bloquea git commit en otra rama", () => {
    assert.equal(debeBloquear('git commit -m "x"', "spec/09-pagar-ya"), false);
  });

  test("CA-09.5: no bloquea otros comandos en main", () => {
    assert.equal(debeBloquear("git status", "main"), false);
  });

  test("bloquea git commit con opciones de git antes del subcomando", () => {
    assert.equal(debeBloquear("git -C . commit -m x", "main"), true);
  });

  test("bloquea git commit encadenado con otros comandos", () => {
    assert.equal(debeBloquear("git add a.js && git commit -m x", "main"), true);
  });

  test("no confunde commit-tree ni textos que solo mencionan commit", () => {
    assert.equal(debeBloquear("git commit-tree abc", "main"), false);
    assert.equal(debeBloquear('echo "git commit"', "main"), false);
  });
});
