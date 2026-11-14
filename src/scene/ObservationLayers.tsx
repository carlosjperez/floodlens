import { useMemo } from "react";
import * as THREE from "three";
import type { DemoFields } from "@/lib/demo";
import { observationCanvas } from "@/lib/textures";
import { useTerrainGeometry } from "@/scene/TerritorySurface";
import { useFloodStore } from "@/state/store";

/** Observations A/B as textures over the same registered territory. */
export function ObservationLayers({ fields }: { fields: DemoFields }) {
  const blend = useFloodStore((s) => s.blend);
  const geo = useTerrainGeometry(fields, 0.12);
  const [texA, texB] = useMemo(() => {
    const a = new THREE.CanvasTexture(observationCanvas(fields, "A"));
    const b = new THREE.CanvasTexture(observationCanvas(fields, "B"));
    a.colorSpace = THREE.SRGBColorSpace;
    b.colorSpace = THREE.SRGBColorSpace;
    return [a, b];
  }, [fields]);
  return (
    <>
      <mesh geometry={geo} renderOrder={1}>
        <meshBasicMaterial map={texA} transparent opacity={0.92 * (1 - blend)} depthWrite={false} />
      </mesh>
      <mesh geometry={geo} renderOrder={2}>
        <meshBasicMaterial map={texB} transparent opacity={0.92 * blend} depthWrite={false} />
      </mesh>
    </>
  );
}