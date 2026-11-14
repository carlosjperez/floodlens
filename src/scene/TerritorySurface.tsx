import { useMemo } from "react";
import * as THREE from "three";
import type { DemoFields } from "@/lib/demo";

export const RELIEF_EXAGGERATION = 6;
export const WORLD_SIZE = 96;

/** Territory geometry in local meters (X east, Y height, Z north). */
export function useTerrainGeometry(f: DemoFields, yOffset: number): THREE.BufferGeometry {
  return useMemo(() => {
    const geo = new THREE.PlaneGeometry(WORLD_SIZE, WORLD_SIZE, f.size - 1, f.size - 1);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = Math.round(pos.getX(i) + WORLD_SIZE / 2);
      const z = Math.round(pos.getZ(i) + WORLD_SIZE / 2);
      const h = f.height[z * f.size + x] ?? 0;
      pos.setY(i, h * RELIEF_EXAGGERATION + yOffset);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    return geo;
  }, [f, yOffset]);
}

export function TerritorySurface({ fields }: { fields: DemoFields }) {
  const geo = useTerrainGeometry(fields, 0);
  return (
    <mesh geometry={geo}>
      <meshStandardMaterial color="#e6e6e1" roughness={0.95} metalness={0} />
    </mesh>
  );
}