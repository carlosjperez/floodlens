/**
 * Interpretation logic from dossier §13, pure and testable.
 * possible new water = water candidate in the episode observation
 *   + evidence of change vs the reference
 *   - reference water
 *   - invalid or excluded zones
 * Statistics are computed from analytical arrays, never from pixels.
 */

export interface MaskFields {
  size: number;
  candidate: Uint8Array;
  change: Uint8Array;
  reference: Uint8Array;
  invalid: Uint8Array;
}

export function possibleNewWater(f: MaskFields): Uint8Array {
  const out = new Uint8Array(f.size * f.size);
  for (let i = 0; i < out.length; i++) {
    out[i] =
      f.candidate[i] === 1 && f.change[i] === 1 && f.reference[i] === 0 && f.invalid[i] === 0
        ? 1
        : 0;
  }
  return out;
}

export function ambiguousWater(f: MaskFields): Uint8Array {
  const out = new Uint8Array(f.size * f.size);
  for (let i = 0; i < out.length; i++) {
    out[i] =
      f.candidate[i] === 1 &&
      f.change[i] === 0 &&
      f.reference[i] === 0 &&
      f.invalid[i] === 0
        ? 1
        : 0;
  }
  return out;
}

export interface MaskStats {
  cells: number;
  referenceCells: number;
  newWaterCells: number;
  ambiguousCells: number;
  invalidCells: number;
}

export function maskStats(f: MaskFields, newWater: Uint8Array, ambiguous: Uint8Array): MaskStats {
  let referenceCells = 0;
  let invalidCells = 0;
  for (let i = 0; i < f.size * f.size; i++) {
    if (f.reference[i] === 1) referenceCells++;
    if (f.invalid[i] === 1) invalidCells++;
  }
  let newWaterCells = 0;
  let ambiguousCells = 0;
  for (let i = 0; i < newWater.length; i++) {
    if (newWater[i] === 1) newWaterCells++;
    if (ambiguous[i] === 1) ambiguousCells++;
  }
  return {
    cells: f.size * f.size,
    referenceCells,
    newWaterCells,
    ambiguousCells,
    invalidCells,
  };
}

/** Area in m² from analytical resolution (not from screen pixels). */
export function areaM2(cells: number, cellSizeM: number): number {
  return cells * cellSizeM * cellSizeM;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}