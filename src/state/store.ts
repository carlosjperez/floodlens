import { create } from "zustand";

export type ChapterId =
  | "portada"
  | "contexto"
  | "comparacion"
  | "evidencia"
  | "aprende"
  | "resumen"
  | "fuentes";

export const CHAPTER_ORDER: ChapterId[] = [
  "portada",
  "contexto",
  "comparacion",
  "evidencia",
  "aprende",
  "resumen",
  "fuentes",
];

export type LayerId = "reference" | "newwater" | "ambiguous" | "exclusion";

interface FloodState {
  entered: boolean;
  chapter: ChapterId;
  mode: "guided" | "free";
  activeObservation: "A" | "B";
  blend: number;
  visibleLayers: Record<LayerId, boolean>;
  selectedPoint: string | null;
  reducedMotion: boolean;
  answers: Record<string, string>;
  compareAck: boolean;
  enter: () => void;
  go: (c: ChapterId) => void;
  next: () => void;
  prev: () => void;
  setMode: (m: "guided" | "free") => void;
  setObservation: (o: "A" | "B") => void;
  setBlend: (v: number) => void;
  toggleLayer: (l: LayerId) => void;
  selectPoint: (id: string | null) => void;
  setReducedMotion: (v: boolean) => void;
  answer: (exerciseId: string, optionId: string) => void;
  ackCompare: () => void;
  restart: () => void;
}

const initialLayers: Record<LayerId, boolean> = {
  reference: true,
  newwater: true,
  ambiguous: true,
  exclusion: true,
};

export const useFloodStore = create<FloodState>((set, get) => ({
  entered: false,
  chapter: "portada",
  mode: "guided",
  activeObservation: "B",
  blend: 1,
  visibleLayers: { ...initialLayers },
  selectedPoint: null,
  reducedMotion:
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  answers: {},
  compareAck: false,
  enter: () => set({ entered: true, chapter: "contexto" }),
  go: (c) => set({ chapter: c }),
  next: () => {
    const i = CHAPTER_ORDER.indexOf(get().chapter);
    if (i < CHAPTER_ORDER.length - 1) set({ chapter: CHAPTER_ORDER[i + 1] });
  },
  prev: () => {
    const i = CHAPTER_ORDER.indexOf(get().chapter);
    if (i > 0) set({ chapter: CHAPTER_ORDER[i - 1] });
  },
  setMode: (m) => set({ mode: m }),
  setObservation: (o) => set({ activeObservation: o, blend: o === "A" ? 0 : 1 }),
  setBlend: (v) => set({ blend: v, activeObservation: v < 0.5 ? "A" : "B" }),
  toggleLayer: (l) =>
    set((s) => ({ visibleLayers: { ...s.visibleLayers, [l]: !s.visibleLayers[l] } })),
  selectPoint: (id) => set({ selectedPoint: id }),
  setReducedMotion: (v) => set({ reducedMotion: v }),
  answer: (exerciseId, optionId) =>
    set((s) => ({ answers: { ...s.answers, [exerciseId]: optionId } })),
  ackCompare: () => set({ compareAck: true }),
  restart: () =>
    set({
      entered: false,
      chapter: "portada",
      mode: "guided",
      activeObservation: "B",
      blend: 1,
      visibleLayers: { ...initialLayers },
      selectedPoint: null,
      answers: {},
      compareAck: false,
    }),
}));