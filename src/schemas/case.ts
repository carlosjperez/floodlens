import { z } from "zod";

export const studyAreaSchema = z.object({
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]).nullable(),
  crs: z.string().nullable(),
  localOrigin: z.object({ x: z.number(), y: z.number(), z: z.number() }).nullable(),
});

export const observationSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  mission: z.string().min(1),
  productType: z.string().min(1),
  acquisition: z.string().min(1),
  version: z.string().min(1),
  channel: z.string().min(1),
  sourceUrl: z.string(),
  visualResources: z.array(z.string()),
  validMask: z.string(),
});

export const layerSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["reference-water", "possible-new-water", "exclusion", "observation"]),
  method: z.string().min(1),
  inputs: z.array(z.string()),
  params: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
  processedAt: z.string().min(1),
  codeVersion: z.string().min(1),
  outputArch: z.string().min(1),
  limitations: z.array(z.string()),
});

export const evidencePointSchema = z.object({
  id: z.string().min(1),
  position: z.tuple([z.number(), z.number(), z.number()]),
  title: z.string().min(1),
  observed: z.string().min(1),
  interpretation: z.string().min(1),
  method: z.string().min(1),
  limitations: z.array(z.string()),
  sourceIds: z.array(z.string()).min(1),
});

export const chapterSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
});

export const exerciseSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  options: z.array(z.object({ id: z.string(), label: z.string() })).min(2),
  correctOptionId: z.string(),
  explanation: z.string().min(1),
  whyOthersUnsupported: z.string().min(1),
  sourceIds: z.array(z.string()).min(1),
});

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string(),
  license: z.string().min(1),
  kind: z.enum(["nasa", "partner", "derived", "synthetic", "educational"]),
});

export const caseManifestSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  status: z.enum(["draft", "demo-synthetic", "verified"]),
  version: z.string().min(1),
  studyArea: studyAreaSchema,
  observations: z.array(observationSchema),
  layers: z.array(layerSchema),
  evidencePoints: z.array(evidencePointSchema),
  chapters: z.array(chapterSchema),
  exercises: z.array(exerciseSchema),
  sources: z.array(sourceSchema),
  limitations: z.array(z.object({ id: z.string(), text: z.string() })),
});

export type CaseManifest = z.infer<typeof caseManifestSchema>;
export type Observation = z.infer<typeof observationSchema>;
export type EvidencePoint = z.infer<typeof evidencePointSchema>;
export type Exercise = z.infer<typeof exerciseSchema>;
export type Source = z.infer<typeof sourceSchema>;

export function parseCaseManifest(raw: unknown): CaseManifest {
  return caseManifestSchema.parse(raw);
}