import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { parseCaseManifest } from "@/schemas/case";
import { DEMO_CASE } from "@/lib/demo";

describe("case manifest", () => {
  it("the synthetic demo validates against the schema", () => {
    const parsed = parseCaseManifest(DEMO_CASE);
    expect(parsed.status).toBe("demo-synthetic");
    expect(parsed.exercises).toHaveLength(3);
    expect(parsed.evidencePoints).toHaveLength(3);
  });

  it("the case-pending template (no fictitious data) validates", () => {
    const raw = JSON.parse(
      readFileSync("public/cases/case-pending.manifest.json", "utf8"),
    );
    const parsed = parseCaseManifest(raw);
    expect(parsed.id).toBe("case-pending");
    expect(parsed.observations).toHaveLength(0);
  });

  it("rejects disallowed statuses", () => {
    expect(() => parseCaseManifest({ ...DEMO_CASE, status: "verified" })).not.toThrow();
    expect(() => parseCaseManifest({ ...DEMO_CASE, status: "made-up" })).toThrow();
  });

  it("requires sourceIds on every evidence claim", () => {
    const bad = {
      ...DEMO_CASE,
      evidencePoints: [{ ...DEMO_CASE.evidencePoints[0], sourceIds: [] }],
    };
    expect(() => parseCaseManifest(bad)).toThrow();
  });

  it("every evidence and exercise reference exists in sources", () => {
    const ids = new Set(DEMO_CASE.sources.map((s) => s.id));
    for (const p of DEMO_CASE.evidencePoints)
      for (const s of p.sourceIds) expect(ids.has(s)).toBe(true);
    for (const e of DEMO_CASE.exercises)
      for (const s of e.sourceIds) expect(ids.has(s)).toBe(true);
  });
});

describe("manifest schema edge cases", () => {
  it("rejects exercises with fewer than two options", () => {
    const bad = {
      ...DEMO_CASE,
      exercises: [{ ...DEMO_CASE.exercises[0], options: [DEMO_CASE.exercises[0].options[0]] }],
    };
    expect(() => parseCaseManifest(bad)).toThrow();
  });

  it("rejects evidence positions that are not 3-tuples", () => {
    const bad = {
      ...DEMO_CASE,
      evidencePoints: [{ ...DEMO_CASE.evidencePoints[0], position: [1, 2] }],
    };
    expect(() => parseCaseManifest(bad)).toThrow();
  });

  it("rejects unknown layer and source kinds", () => {
    expect(() =>
      parseCaseManifest({
        ...DEMO_CASE,
        layers: [{ ...DEMO_CASE.layers[0], kind: "depth-map" }],
      }),
    ).toThrow();
    expect(() =>
      parseCaseManifest({
        ...DEMO_CASE,
        sources: [{ ...DEMO_CASE.sources[0], kind: "blog" }],
      }),
    ).toThrow();
  });

  it("rejects empty identifiers and missing limitation lists", () => {
    expect(() =>
      parseCaseManifest({
        ...DEMO_CASE,
        observations: [{ ...DEMO_CASE.observations[0], id: "" }],
      }),
    ).toThrow();
    const { limitations, ...without } = DEMO_CASE;
    expect(() => parseCaseManifest(without)).toThrow();
  });

  it("accepts draft status for work-in-progress cases", () => {
    expect(parseCaseManifest({ ...DEMO_CASE, status: "draft" }).status).toBe("draft");
  });
});