import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useFloodStore, type ChapterId } from "@/state/store";

const PRESETS: Record<ChapterId, [number, number, number]> = {
  portada: [0, 70, 78],
  contexto: [0, 64, 66],
  comparacion: [0, 52, 50],
  evidencia: [8, 40, 44],
  aprende: [0, 58, 58],
  resumen: [0, 72, 74],
  fuentes: [0, 72, 74],
};

/** Guided mode: one damped camera settle per chapter.
 *  Free mode: orbit limited to the area. The user interrupts any transition. */
export function CameraDirector() {
  const chapter = useFloodStore((s) => s.chapter);
  const mode = useFloodStore((s) => s.mode);
  const reducedMotion = useFloodStore((s) => s.reducedMotion);
  const target = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    if (mode !== "guided") return;
    const [x, y, z] = PRESETS[chapter];
    target.current.set(x, y, z);
    if (reducedMotion) {
      state.camera.position.copy(target.current);
    } else {
      const k = 1 - Math.exp(-2.5 * delta);
      state.camera.position.lerp(target.current, k);
    }
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <OrbitControls
      enabled={mode === "free"}
      makeDefault
      minDistance={24}
      maxDistance={140}
      maxPolarAngle={Math.PI / 2.15}
      target={[0, 0, 0]}
    />
  );
}