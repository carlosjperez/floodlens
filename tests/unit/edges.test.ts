import { beforeEach, describe, expect, it } from "vitest";
import { useFloodStore, CHAPTER_ORDER } from "@/state/store";
import {
  possibleNewWater,
  ambiguousWater,
  maskStats,
  areaM2,
  mulberry32,
  type MaskFields,
} from "@/lib/interpret";
import { buildDemoFields, DEMO_CASE, DEMO_SIZE } from "@/lib/demo";

function blank(size: number): MaskFields {
  const total = size * size;
  return {
    size,
    candidate: new Uint8Array(total),
    change: new Uint8Array(total),
    reference: new Uint8Array(total),
    invalid: new Uint8Array(total),
  };
}

beforeEach(() => {
  useFloodStore.getState().restart();
});

describe("store edge cases", () => {
  it("blend threshold at 0.5 derives observation B", () => {
    const s = useFloodStore.getState();
    s.setBlend(0.5);
    expect(useFloodStore.getState().activeObservation).toBe("B");
    s.setBlend(0.49);
    expect(useFloodStore.getState().activeObservation).toBe("A");
    s.setObservation("A");
    expect(useFloodStore.getState().blend).toBe(0);
  });

  it("toggling a layer twice restores it without touching the others", () => {
    const s = useFloodStore.getState();
    s.toggleLayer("newwater");
    s.toggleLayer("newwater");
    const v = useFloodStore.getState().visibleLayers;
    expect(v).toEqual({ reference: true, newwater: true, ambiguous: true, exclusion: true });
  });

  it("selection clears with null and answers are independent per exercise", () => {
    const s = useFloodStore.getState();
    s.selectPoint("ev-1");
    s.selectPoint(null);
    expect(useFloodStore.getState().selectedPoint).toBeNull();
    s.answer("ex-1", "a");
    s.answer("ex-2", "b");
    s.answer("ex-1", "b");
    const a = useFloodStore.getState().answers;
    expect(a["ex-1"]).toBe("b");
    expect(a["ex-2"]).toBe("b");
  });

  it("restart keeps the user's reduced-motion preference", () => {
    const s = useFloodStore.getState();
    s.setReducedMotion(true);
    s.enter();
    s.restart();
    expect(useFloodStore.getState().reducedMotion).toBe(true);
    expect(useFloodStore.getState().entered).toBe(false);
  });

  it("free mode and guided mode do not reset the chapter", () => {
    const s = useFloodStore.getState();
    s.enter();
    s.go("evidencia");
    s.setMode("free");
    expect(useFloodStore.getState().chapter).toBe("evidencia");
    s.setMode("guided");
    expect(useFloodStore.getState().chapter).toBe("evidencia");
  });

  it("chapter order covers the seven dossier screens exactly once", () => {
    expect(CHAPTER_ORDER).toEqual([
      "portada",
      "contexto",
      "comparacion",
      "evidencia",
      "aprende",
      "resumen",
      "fuentes",
    ]);
    expect(new Set(CHAPTER_ORDER).size).toBe(7);
  });
});

describe("interpretation edge cases", () => {
  it("empty fields produce empty masks and zero statistics", () => {
    const f = blank(8);
    const nw = possibleNewWater(f);
    const amb = ambiguousWater(f);
    expect(nw.every((v) => v === 0)).toBe(true);
    expect(amb.every((v) => v === 0)).toBe(true);
    const s = maskStats(f, nw, amb);
    expect(s).toEqual({
      cells: 64,
      referenceCells: 0,
      newWaterCells: 0,
      ambiguousCells: 0,
      invalidCells: 0,
    });
    expect(areaM2(0, 30)).toBe(0);
  });

  it("invalid and reference outrank candidate plus change", () => {
    const f = blank(4);
    // row 0: candidate+change+invalid; row 1: candidate+change+reference
    f.candidate[0] = 1; f.change[0] = 1; f.invalid[0] = 1;
    f.candidate[4] = 1; f.change[4] = 1; f.reference[4] = 1;
    // row 2: change without candidate is nothing; row 3: candidate alone is ambiguous
    f.change[8] = 1;
    f.candidate[12] = 1;
    expect(Array.from(possibleNewWater(f)).slice(0, 16)).toEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]);
    expect(Array.from(ambiguousWater(f)).slice(0, 16)).toEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    ]);
  });

  it("statistics recount the masks cell by cell", () => {
    const f = buildDemoFields();
    const nw = possibleNewWater(f);
    const amb = ambiguousWater(f);
    const s = maskStats(f, nw, amb);
    let ref = 0;
    let inv = 0;
    let n = 0;
    let a = 0;
    for (let i = 0; i < f.size * f.size; i++) {
      if (f.reference[i]) ref++;
      if (f.invalid[i]) inv++;
      if (nw[i]) n++;
      if (amb[i]) a++;
    }
    expect(s.referenceCells).toBe(ref);
    expect(s.invalidCells).toBe(inv);
    expect(s.newWaterCells).toBe(n);
    expect(s.ambiguousCells).toBe(a);
  });

  it("rng stays in [0,1) and seeds differ", () => {
    const r = mulberry32(1234);
    for (let i = 0; i < 1000; i++) {
      const v = r();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
    expect(mulberry32(1)()).not.toBe(mulberry32(2)());
  });
});

describe("synthetic demo invariants", () => {
  it("the generator is deterministic", () => {
    const a = buildDemoFields();
    const b = buildDemoFields();
    expect(Array.from(a.candidate)).toEqual(Array.from(b.candidate));
    expect(Array.from(a.change)).toEqual(Array.from(b.change));
    expect(Array.from(a.reference)).toEqual(Array.from(b.reference));
    expect(Array.from(a.invalid)).toEqual(Array.from(b.invalid));
    expect(Array.from(a.height)).toEqual(Array.from(b.height));
  });

  it("the permanent channel continues outside the episode window", () => {
    const f = buildDemoFields();
    let outside = 0;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < f.size; x++) {
        if (f.reference[y * f.size + x] === 1) outside++;
      }
    }
    expect(outside).toBeGreaterThan(0);
  });

  it("the ambiguous margin touches the possible-new-water sheet", () => {
    const f = buildDemoFields();
    const nw = possibleNewWater(f);
    const amb = ambiguousWater(f);
    let touching = 0;
    for (let y = 1; y < f.size - 1; y++) {
      for (let x = 1; x < f.size - 1; x++) {
        const i = y * f.size + x;
        if (amb[i] !== 1) continue;
        if (nw[i - 1] || nw[i + 1] || nw[i - f.size] || nw[i + f.size]) touching++;
      }
    }
    expect(touching).toBeGreaterThan(0);
  });

  it("evidence point 2 sits on an ambiguous cell inside world bounds", () => {
    const f = buildDemoFields();
    const amb = ambiguousWater(f);
    for (const p of DEMO_CASE.evidencePoints) {
      expect(Math.abs(p.position[0])).toBeLessThanOrEqual(DEMO_SIZE / 2);
      expect(Math.abs(p.position[2])).toBeLessThanOrEqual(DEMO_SIZE / 2);
    }
    const [x, , z] = DEMO_CASE.evidencePoints[1].position;
    const col = x + DEMO_SIZE / 2;
    const row = z + DEMO_SIZE / 2;
    expect(amb[row * f.size + col]).toBe(1);
  });

  it("manifest content stays consistent with the journey contract", () => {
    expect(DEMO_CASE.chapters.map((c) => c.id)).toEqual(CHAPTER_ORDER);
    expect(DEMO_CASE.observations).toHaveLength(2);
    expect(DEMO_CASE.evidencePoints).toHaveLength(3);
    expect(DEMO_CASE.exercises).toHaveLength(3);
    for (const e of DEMO_CASE.exercises) {
      const ids = e.options.map((o) => o.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids).toContain(e.correctOptionId);
      expect(e.whyOthersUnsupported.length).toBeGreaterThan(0);
    }
    for (const o of DEMO_CASE.observations) {
      expect(o.acquisition).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});