import { Canvas } from "@react-three/fiber";
import type { RefObject } from "react";
import { buildDemoFields } from "@/lib/demo";
import { TerritorySurface } from "@/scene/TerritorySurface";
import { ObservationLayers } from "@/scene/ObservationLayers";
import { FloodOverlay } from "@/scene/FloodOverlay";
import { EvidenceMarkers } from "@/scene/EvidenceMarkers";
import { CameraDirector } from "@/scene/CameraDirector";
import { useMemo } from "react";

export default function SceneCanvas({
  markerPortal,
}: {
  markerPortal: RefObject<HTMLDivElement | null>;
}) {
  const fields = useMemo(() => buildDemoFields(), []);
  return (
    <Canvas
      camera={{ position: [0, 64, 66], fov: 45 }}
      dpr={1}
      gl={{ antialias: false, powerPreference: "low-power" }}
      aria-label="Demonstration 3D territory viewer with synthetic data"
    >
      <color attach="background" args={["#f4f4f2"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[40, 60, 20]} intensity={1.1} />
      <TerritorySurface fields={fields} />
      <ObservationLayers fields={fields} />
      <FloodOverlay fields={fields} />
      <EvidenceMarkers markerPortal={markerPortal} />
      <CameraDirector />
    </Canvas>
  );
}