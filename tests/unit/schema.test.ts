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