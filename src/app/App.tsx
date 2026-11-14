import { Component, lazy, Suspense, useMemo, useRef, type ReactNode } from "react";
import { useFloodStore } from "@/state/store";
import { TopBar, BottomBar, TextAlternative, SyntheticStamp } from "@/components/Chrome";
import { Portada } from "@/screens/Portada";
import { Contexto } from "@/screens/Contexto";
import { Comparacion } from "@/screens/Comparacion";
import { Evidencia } from "@/screens/Evidencia";
import { Aprende } from "@/screens/Aprende";
import { Resumen } from "@/screens/Resumen";
import { Fuentes } from "@/screens/Fuentes";
import { previewDataUrl } from "@/lib/textures";
import { buildDemoFields } from "@/lib/demo";
import { cn } from "@/lib/utils";

const SceneCanvas = lazy(() => import("@/scene/SceneCanvas"));

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="p-6">
          <p className="mb-4 text-sm text-ink-soft">
            The 3D viewer is not available on this device. The full journey still works with the
            text alternative.
          </p>
          <TextAlternative />
        </div>
      );
    }
    return this.props.children;
  }
}

function SceneArea() {
  const chapter = useFloodStore((s) => s.chapter);
  const preview = useMemo(() => previewDataUrl(buildDemoFields()), []);
  // Stable portal for the 3D evidence markers: keeps drei <Html> cleanup safe
  // across chapter changes (avoids removeChild races on unmount).
  const markerPortal = useRef<HTMLDivElement>(null);
  const isFuentes = chapter === "fuentes";
  return (
    <div className="relative h-64 sm:h-80 lg:h-full">
      <div className={cn("h-full", isFuentes && "hidden")}>
        <SceneBoundary>
          <Suspense
            fallback={
              <div className="p-6">
                <p className="text-sm text-ink-soft">Loading territory viewer…</p>
              </div>
            }
          >
            <SceneCanvas markerPortal={markerPortal} />
          </Suspense>
        </SceneBoundary>
      </div>
      <div
        ref={markerPortal}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", isFuentes && "hidden")}
      />
      {isFuentes ? (
        <div className="flex h-full flex-col gap-3 p-4">
          <img
            src={preview}
            alt="Demonstration cartographic plate with the interpretation layers"
            className="w-full rounded-card border border-line object-cover"
          />
          <SyntheticStamp />
        </div>
      ) : (
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1">
          <SyntheticStamp />
          <span className="data rounded-chip border border-line bg-panel/90 px-2 py-0.5 text-xs text-ink-soft">
            Relief exaggerated ×6
          </span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const chapter = useFloodStore((s) => s.chapter);
  if (chapter === "portada") return <Portada />;
  return (
    <div className="flex min-h-screen flex-col lg:h-screen">
      <TopBar />
      <main className="grid flex-1 pb-28 lg:min-h-0 lg:grid-cols-[1fr_440px] lg:grid-rows-[minmax(0,1fr)] lg:pb-0">
        <section
          aria-label="Territory viewer"
          className="border-b border-line lg:overflow-y-auto lg:border-b-0 lg:border-r"
        >
          <SceneArea />
          <div className="border-t border-line p-4">
            <TextAlternative />
          </div>
        </section>
        <aside aria-label="Chapter content" className="overflow-y-auto p-5 lg:p-6">
          {chapter === "contexto" && <Contexto />}
          {chapter === "comparacion" && <Comparacion />}
          {chapter === "evidencia" && <Evidencia />}
          {chapter === "aprende" && <Aprende />}
          {chapter === "resumen" && <Resumen />}
          {chapter === "fuentes" && <Fuentes />}
        </aside>
      </main>
      <BottomBar />
    </div>
  );
}