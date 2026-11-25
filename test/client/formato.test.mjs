import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { leerNumero } from "../../client/src/formato.js";

describe("leerNumero (spec 09)", () => {
  test("CA-09.1: convierte los textos de los formularios", () => {
    assert.equal(leerNumero("2,5"), 2.5);
    assert.equal(leerNumero(" 500 "), 500);
    assert.equal(leerNumero(""), undefined);
    assert.equal(leerNumero("   "), undefined);
    assert.equal(leerNumero("tres"), "tres");
  });

  test("un número escrito con punto o sin decimales se convierte", () => {
    assert.equal(leerNumero("500"), 500);
    assert.equal(leerNumero("2.5"), 2.5);
  });
});
