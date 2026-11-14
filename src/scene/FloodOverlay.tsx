import { useMemo } from "react";
import * as THREE from "three";
import type { DemoFields } from "@/lib/demo";
import { overlayCanvas } from "@/lib/textures";
import { useTerrainGeometry } from "@/scene/TerritorySurface";
import { useFloodStore } from "@/state/store";

/** Thematic mask attached to the surface: no waves, no depth, no elevation. */
export function FloodOverlay({ fields }: { fields: DemoFields }) {
  const visible = useFloodStore((s) => s.visibleLayers);
  const geo = useTerrainGeometry(fields, 0.24);
  const tex = useMemo(() => {
    const t = new THREE.CanvasTexture(overlayCanvas(fields, visible));
    t.colorSpace = THREE.SRGBColorSpace;
    t.magFilter = THREE.NearestFilter;
    return t;
  }, [fields, visible]);
  return (
    <mesh geometry={geo} renderOrder={3}>
      <meshBasicMaterial map={tex} transparent depthWrite={false} />
    </mesh>
  );
}