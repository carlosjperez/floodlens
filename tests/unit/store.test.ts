import { beforeEach, describe, expect, it } from "vitest";
import { useFloodStore, CHAPTER_ORDER } from "@/state/store";

beforeEach(() => {
  useFloodStore.getState().restart();
});

describe("global journey state", () => {
  it("entering lands on context and state survives navigation", () => {
    const s = useFloodStore.getState();
    s.enter();
    expect(useFloodStore.getState().chapter).toBe("contexto");
    useFloodStore.getState().answer("ex-1", "b");
    useFloodStore.getState().go("fuentes");
    useFloodStore.getState().go("aprende");
    expect(useFloodStore.getState().answers["ex-1"]).toBe("b");
  });

  it("next/prev respect the bounds", () => {
    const s = useFloodStore.getState();
    s.prev();
    expect(useFloodStore.getState().chapter).toBe("portada");
    for (let i = 0; i < 10; i++) useFloodStore.getState().next();
    expect(useFloodStore.getState().chapter).toBe(CHAPTER_ORDER[CHAPTER_ORDER.length - 1]);
  });

  it("layers toggle and point selection works", () => {
    useFloodStore.getState().toggleLayer("exclusion");
    expect(useFloodStore.getState().visibleLayers.exclusion).toBe(false);
    useFloodStore.getState().selectPoint("ev-2");
    expect(useFloodStore.getState().selectedPoint).toBe("ev-2");
  });

  it("blend derives the active observation", () => {
    useFloodStore.getState().setBlend(0.2);
    expect(useFloodStore.getState().activeObservation).toBe("A");
    useFloodStore.getState().setObservation("B");
    expect(useFloodStore.getState().blend).toBe(1);
  });

  it("restart clears answers and layers", () => {
    useFloodStore.getState().answer("ex-1", "a");
    useFloodStore.getState().toggleLayer("reference");
    useFloodStore.getState().restart();
    const s = useFloodStore.getState();
    expect(s.answers).toEqual({});
    expect(s.visibleLayers.reference).toBe(true);
    expect(s.chapter).toBe("portada");
  });
});