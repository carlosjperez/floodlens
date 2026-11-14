import type { MutableRefObject, RefObject } from "react";
import { Html } from "@react-three/drei";
import { DEMO_CASE } from "@/lib/demo";
import { useFloodStore } from "@/state/store";

export function EvidenceMarkers({
  markerPortal,
}: {
  markerPortal: RefObject<HTMLDivElement | null>;
}) {
  const selected = useFloodStore((s) => s.selectedPoint);
  const selectPoint = useFloodStore((s) => s.selectPoint);
  return (
    <>
      {DEMO_CASE.evidencePoints.map((p, i) => (
        <Html
          key={p.id}
          position={p.position}
          center
          zIndexRange={[10, 0]}
          portal={markerPortal as unknown as MutableRefObject<HTMLElement>}
        >
          <button
            type="button"
            aria-label={`Evidence point ${i + 1}: ${p.title}`}
            aria-pressed={selected === p.id}
            onClick={() => selectPoint(selected === p.id ? null : p.id)}
            className="data pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border-2 border-select bg-panel text-sm font-bold text-ink shadow-[0_2px_6px_rgb(16_24_32/0.35)] transition-transform hover:scale-110 aria-pressed:bg-select aria-pressed:text-white"
          >
            {i + 1}
          </button>
        </Html>
      ))}
    </>
  );
}