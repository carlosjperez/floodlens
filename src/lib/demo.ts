import type { CaseManifest } from "@/schemas/case";
import { mulberry32, ambiguousWater, type MaskFields } from "@/lib/interpret";

/**
 * DEMONSTRATION case with SYNTHETIC data, labeled as such in the manifest
 * (status: "demo-synthetic") and across the whole interface. It is not a
 * finding or a real observation: it is the offline fallback demo of
 * dossier §17. The verified NISAR case remains pending (Phase 0, HOLD).
 */

export const DEMO_SIZE = 96;
export const DEMO_CELL_M = 30;

function valueNoise(seed: number, size: number): (x: number, y: number) => number {
  const rnd = mulberry32(seed);
  const g = 12;
  const grid: number[] = [];
  for (let i = 0; i < (g + 1) * (g + 1); i++) grid.push(rnd());
  const at = (ix: number, iy: number) => grid[iy * (g + 1) + ix];
  const smooth = (t: number) => t * t * (3 - 2 * t);
  return (x, y) => {
    const fx = (x / size) * g;
    const fy = (y / size) * g;
    const ix = Math.floor(fx);
    const iy = Math.floor(fy);
    const tx = smooth(fx - ix);
    const ty = smooth(fy - iy);
    const a = at(ix, iy) * (1 - tx) + at(ix + 1, iy) * tx;
    const b = at(ix, iy + 1) * (1 - tx) + at(ix + 1, iy + 1) * tx;
    return a * (1 - ty) + b * ty;
  };
}

export interface DemoFields extends MaskFields {
  height: Float32Array;
  episode: Uint8Array;
}

export function buildDemoFields(): DemoFields {
  const size = DEMO_SIZE;
  const n = valueNoise(7, size);
  const n2 = valueNoise(21, size);
  const height = new Float32Array(size * size);
  const reference = new Uint8Array(size * size);
  const episode = new Uint8Array(size * size);
  const candidate = new Uint8Array(size * size);
  const change = new Uint8Array(size * size);
  const invalid = new Uint8Array(size * size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = y * size + x;
      const riverCenter = size * 0.5 + Math.sin(y / 14) * 7 + (n2(x, y) - 0.5) * 6;
      const distRiver = Math.abs(x - riverCenter);
      const plain = n(x, y) * 0.5;
      height[i] = plain + Math.min(distRiver / 40, 1) * 0.5;
      const riverW = 3.2;
      const floodW = 11 + n2(x, y) * 6;
      // Wet margin beyond the flood edge: water candidate without change evidence.
      const wetMargin =
        distRiver >= floodW && distRiver < floodW + 3 && y > size * 0.3 && y < size * 0.8;
      reference[i] = distRiver < riverW ? 1 : 0;
      episode[i] = distRiver < floodW && y > size * 0.25 && y < size * 0.85 ? 1 : 0;
      candidate[i] = episode[i] === 1 || reference[i] === 1 || wetMargin ? 1 : 0;
      change[i] = episode[i] === 1 && reference[i] === 0 ? 1 : 0;
      invalid[i] = n(x, y) > 0.82 && distRiver > floodW ? 1 : 0;
    }
  }
  return { size, candidate, change, reference, invalid, height, episode };
}

export const DEMO_CASE: CaseManifest = {
  id: "demo-synthetic",
  title: "Demonstration plain (synthetic data)",
  status: "demo-synthetic",
  version: "0.1.0",
  studyArea: {
    bbox: null,
    crs: "local-meters (X east, Y height, Z north)",
    localOrigin: { x: 0, y: 0, z: 0 },
  },
  observations: [
    {
      id: "obs-a",
      productId: "DEMO-SYNTHETIC-A",
      mission: "SYNTHETIC (fallback demo)",
      productType: "simulated backscatter",
      acquisition: "2026-01-10",
      version: "demo-1",
      channel: "simulated HH",
      sourceUrl: "",
      visualResources: ["canvas:obs-a"],
      validMask: "synthetic validity mask",
    },
    {
      id: "obs-b",
      productId: "DEMO-SYNTHETIC-B",
      mission: "SYNTHETIC (fallback demo)",
      productType: "simulated backscatter",
      acquisition: "2026-01-22",
      version: "demo-1",
      channel: "simulated HH",
      sourceUrl: "",
      visualResources: ["canvas:obs-b"],
      validMask: "synthetic validity mask",
    },
  ],
  layers: [
    {
      id: "layer-reference",
      kind: "reference-water",
      method: "permanent channel of the synthetic generator",
      inputs: ["obs-a"],
      params: { cellSizeM: DEMO_CELL_M },
      processedAt: "2026-11-14",
      codeVersion: "0.1.0",
      outputArch: "in-memory analytical array (demo)",
      limitations: ["synthetic data: does not represent a real place"],
    },
    {
      id: "layer-newwater",
      kind: "possible-new-water",
      method: "candidate + change - reference - invalid (dossier §13)",
      inputs: ["obs-a", "obs-b"],
      params: { cellSizeM: DEMO_CELL_M },
      processedAt: "2026-11-14",
      codeVersion: "0.1.0",
      outputArch: "in-memory analytical array (demo)",
      limitations: ["no independent contrast: exploratory result"],
    },
    {
      id: "layer-exclusion",
      kind: "exclusion",
      method: "invalid zones of the generator (noise > 0.82 outside the plain)",
      inputs: ["obs-b"],
      params: { threshold: 0.82 },
      processedAt: "2026-11-14",
      codeVersion: "0.1.0",
      outputArch: "in-memory analytical array (demo)",
      limitations: ["not-evaluated area, not a safe zone"],
    },
  ],
  evidencePoints: [
    {
      id: "ev-1",
      position: [-18, 0, 6],
      title: "Edge of the water sheet",
      observed: "Backscatter change consistent with new water relative to the reference.",
      interpretation: "Possible new water: candidate + change, outside the reference channel.",
      method: "Two-date comparison; no universal threshold.",
      limitations: ["Two images do not reconstruct the intermediate moments."],
      sourceIds: ["src-synthetic", "src-sar-intro"],
    },
    {
      id: "ev-2",
      position: [14, 0, -12],
      title: "Amber-hatched zone",
      observed: "Water candidate without evidence of change relative to the reference.",
      interpretation: "Ambiguous area: neither flooding nor absence of water is asserted.",
      method: "Candidate without change → ambiguous category, visible in the legend.",
      limitations: ["Absence of detected water does not guarantee safety."],
      sourceIds: ["src-synthetic", "src-arsat"],
    },
    {
      id: "ev-3",
      position: [26, 0, 20],
      title: "Gray-hatched zone",
      observed: "Invalidity mask: the sensor offers no usable evidence here.",
      interpretation: "Not-evaluated area. Not equivalent to a safe zone.",
      method: "Propagation of quality masks during preparation.",
      limitations: ["A classification is not equivalent to confirmed damage."],
      sourceIds: ["src-synthetic", "src-nisar-guide"],
    },
  ],
  chapters: [
    { id: "portada", title: "Cover", summary: "What FloodLens offers and what it does not." },
    { id: "contexto", title: "Context", summary: "Locate the demonstration territory." },
    { id: "comparacion", title: "Comparison", summary: "Two dates, not a film." },
    { id: "evidencia", title: "Evidence", summary: "Three points with method and limitations." },
    { id: "aprende", title: "Learn", summary: "Three exercises with explanation." },
    { id: "resumen", title: "Summary", summary: "Concepts and corrected answers." },
    { id: "fuentes", title: "Sources and method", summary: "Full traceability of the package." },
  ],
  exercises: [
    {
      id: "ex-1",
      question: "A zone shows no water in the image. Can it be called safe?",
      options: [
        { id: "a", label: "Yes: if no water is visible, there is no risk." },
        { id: "b", label: "No: absence of observation or detection is not absence of danger." },
        { id: "c", label: "Only if the image was acquired at night." },
      ],
      correctOptionId: "b",
      explanation:
        "Radar observes at a single instant and with limitations: vegetation, geometry or invalidity masks can hide water. A detected absence does not guarantee safety.",
      whyOthersUnsupported:
        "\"Yes\" confuses not detecting with not existing; \"only at night\" reverses radar's real advantage (it observes day and night, but it does not see everything).",
      sourceIds: ["src-sar-intro", "src-synthetic"],
    },
    {
      id: "ex-2",
      question: "An element of the territory coincides with the water footprint. Does it prove damage?",
      options: [
        { id: "a", label: "Yes: the footprint confirms damage to that element." },
        { id: "b", label: "No: exposure is not confirmed damage." },
      ],
      correctOptionId: "b",
      explanation:
        "The layer indicates possible new water, not impact. Confirming damage requires independent evidence that this package does not include.",
      whyOthersUnsupported:
        "\"Yes\" jumps from a radar classification to a damage claim with no source to support it.",
      sourceIds: ["src-synthetic", "src-nisar-guide"],
    },
    {
      id: "ex-3",
      question: "We have images from two dates. Do we know what happened every hour?",
      options: [
        { id: "a", label: "Yes: the advance of the water can be interpolated." },
        { id: "b", label: "No: an observation is a snapshot, not a film." },
        { id: "c", label: "Only if both images are from the same day." },
      ],
      correctOptionId: "b",
      explanation:
        "Between two acquisitions there are no observations: interpolating the advance would present something unobserved as fact. That is why the comparison warns that it does not represent the advance of the water.",
      whyOthersUnsupported:
        "\"Interpolate\" fabricates intermediate moments; \"same day\" adds no observations between dates.",
      sourceIds: ["src-sar-intro", "src-synthetic"],
    },
  ],
  sources: [
    {
      id: "src-synthetic",
      title: "Synthetic demonstration generator (this repository, src/lib/demo.ts)",
      url: "",
      license: "MIT",
      kind: "synthetic",
    },
    {
      id: "src-sar-intro",
      title: "NASA Earthdata — Intro to Synthetic Aperture Radar (SAR)",
      url: "https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/sar",
      license: "NASA public educational use",
      kind: "educational",
    },
    {
      id: "src-arsat",
      title: "NASA ARSET — remote sensing and SAR trainings",
      url: "https://appliedsciences.nasa.gov/get-involved/training",
      license: "NASA public educational use",
      kind: "educational",
    },
    {
      id: "src-nisar-guide",
      title: "NISAR Data User Guide (ASF)",
      url: "https://nisar-docs.asf.alaska.edu/",
      license: "NASA/ASF public use",
      kind: "nasa",
    },
  ],
  limitations: [
    { id: "lim-1", text: "Demonstration case with synthetic data: does not represent a real place or episode." },
    { id: "lim-2", text: "No independent contrast: every interpretation is exploratory." },
    { id: "lim-3", text: "The verified NISAR case is pending (Phase 0). NISAR is not silently substituted." },
    { id: "lim-4", text: "Not an alert or prediction system." },
  ],
};

// Anchor evidence point 2 on a real ambiguous cell of the generated fields so
// the card, the marker and the amber hatch always agree.
const anchorFields = buildDemoFields();
const anchorAmb = ambiguousWater(anchorFields);
let bestCell = -1;
let bestDist = Infinity;
for (let row = 28; row < 46; row++) {
  for (let col = 52; col < 76; col++) {
    const i = row * anchorFields.size + col;
    if (anchorAmb[i] !== 1) continue;
    const d = (col - 62) ** 2 + (row - 36) ** 2;
    if (d < bestDist) {
      bestDist = d;
      bestCell = i;
    }
  }
}
if (bestCell >= 0) {
  const col = bestCell % anchorFields.size;
  const row = Math.floor(bestCell / anchorFields.size);
  DEMO_CASE.evidencePoints[1].position = [col - DEMO_SIZE / 2, 0, row - DEMO_SIZE / 2];
}