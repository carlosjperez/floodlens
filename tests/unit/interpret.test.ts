import { describe, expect, it } from "vitest";
import {
  possibleNewWater,
  ambiguousWater,
  maskStats,
  areaM2,
  mulberry32,
  type MaskFields,
} from "@/lib/interpret";
import { buildDemoFields, DEMO_CELL_M } from "@/lib/demo";

function fields(firstRow: number[][]): MaskFields {
  const size = firstRow.length;
  const total = size * size;
  const candidate = new Uint8Array(total);
  const change = new Uint8Array(total);
  const reference = new Uint8Array(total);
  const invalid = new Uint8Array(total);
  firstRow.forEach((r, i) => {
    candidate[i] = r[0];
    change[i] = r[1];
    reference[i] = r[2];
    invalid[i] = r[3];
  });
  return { size, candidate, change, reference, invalid };
}

describe("interpretation rule §13", () => {
  it("possible new water = candidate + change - reference - invalid", () => {
    const f = fields([
      [1, 1, 0, 0], // new water
      [1, 1, 1, 0], // reference: subtracted
      [1, 1, 0, 1], // invalid: subtracted
      [1, 0, 0, 0], // no change: ambiguous, not new
      [0, 1, 0, 0], // no candidate: nothing
      [1, 0, 1, 0], // reference without change: reference, not ambiguous
    ]);
    expect(Array.from(possibleNewWater(f)).slice(0, 6)).toEqual([1, 0, 0, 0, 0, 0]);
    expect(Array.from(ambiguousWater(f)).slice(0, 6)).toEqual([0, 0, 0, 1, 0, 0]);
  });

  it("statistics from analytical arrays, not pixels", () => {
    const f = buildDemoFields();
    const nw = possibleNewWater(f);
    const amb = ambiguousWater(f);
    const s = maskStats(f, nw, amb);
    expect(s.cells).toBe(f.size * f.size);
    expect(s.newWaterCells).toBeGreaterThan(0);
    expect(s.referenceCells).toBeGreaterThan(0);
    expect(s.ambiguousCells).toBeGreaterThan(0);
    expect(areaM2(s.newWaterCells, DEMO_CELL_M)).toBe(s.newWaterCells * 900);
  });

  it("reference water is never counted as new or ambiguous", () => {
    const f = buildDemoFields();
    const nw = possibleNewWater(f);
    const amb = ambiguousWater(f);
    for (let i = 0; i < nw.length; i++) {
      if (f.reference[i] === 1) {
        expect(nw[i]).toBe(0);
        expect(amb[i]).toBe(0);
      }
      if (f.invalid[i] === 1) expect(nw[i]).toBe(0);
    }
  });

  it("deterministic rng", () => {
    const a = mulberry32(7);
    const b = mulberry32(7);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });
});