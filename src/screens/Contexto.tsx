import { Button } from "@/components/ui/button";
import { SyntheticStamp } from "@/components/Chrome";
import { useFloodStore } from "@/state/store";
import { ArrowRight, Pause } from "lucide-react";

export function Contexto() {
  const next = useFloodStore((s) => s.next);
  const setReducedMotion = useFloodStore((s) => s.setReducedMotion);
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">Territorial context</h2>
      <SyntheticStamp />
      <p className="text-sm text-ink-soft">
        The viewer shows a synthetically generated demonstration plain, with a permanent channel
        and a water expansion zone. The area is bounded and the relief is presented exaggerated
        ×6 for readability; there is no physical elevation or depth.
      </p>
      <p className="text-sm text-ink-soft">
        In a verified case, this chapter locates the real territory with checked labels and the
        study area registered in the manifest. Here the labels describe the generator, not a real
        place.
      </p>
      <ul className="list-disc space-y-1 pl-4 text-sm text-ink-soft">
        <li>Local coordinates in meters: X east, Y height, Z north.</li>
        <li>Analytical resolution of 30 m per cell (demo).</li>
        <li>3D is not required: the text alternative describes the same content.</li>
      </ul>
      <div className="flex flex-wrap gap-2">
        <Button onClick={next}>
          Continue <ArrowRight />
        </Button>
        <Button variant="outline" onClick={() => setReducedMotion(true)}>
          <Pause /> Skip animation
        </Button>
      </div>
    </div>
  );
}