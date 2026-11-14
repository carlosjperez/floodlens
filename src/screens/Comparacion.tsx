import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { DEMO_CASE } from "@/lib/demo";
import { useFloodStore } from "@/state/store";
import { cn } from "@/lib/utils";

const [obsA, obsB] = DEMO_CASE.observations;

export function Comparacion() {
  const blend = useFloodStore((s) => s.blend);
  const setBlend = useFloodStore((s) => s.setBlend);
  const reducedMotion = useFloodStore((s) => s.reducedMotion);
  const compareAck = useFloodStore((s) => s.compareAck);
  const ackCompare = useFloodStore((s) => s.ackCompare);
  const raf = useRef(0);

  const transitionTo = (target: 0 | 1) => {
    cancelAnimationFrame(raf.current);
    if (reducedMotion) {
      setBlend(target);
      return;
    }
    const from = useFloodStore.getState().blend;
    const t0 = performance.now();
    const dur = 600;
    const step = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      const e = 1 - Math.pow(2, -10 * p);
      setBlend(from + (target - from) * (p === 1 ? 1 : e));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
  };

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">Date comparison</h2>
      <div
        role="note"
        className={cn(
          "rounded-control border px-3 py-2 text-sm font-semibold transition-colors",
          compareAck
            ? "border-line bg-muted text-ink-soft"
            : "border-alert bg-alert/10 text-alert",
        )}
      >
        Comparison between observations. It does not represent the advance of water between the
        two dates.
        {!compareAck && (
          <Button variant="outline" size="sm" className="ml-2" onClick={ackCompare}>
            Understood
          </Button>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={blend < 0.5 ? "default" : "outline"}
          aria-pressed={blend < 0.5}
          onClick={() => transitionTo(0)}
          className="h-auto flex-col items-start gap-0 py-2"
        >
          <span className="text-xs opacity-80">Observation A</span>
          <span className="data text-sm">{obsA.acquisition}</span>
        </Button>
        <Button
          variant={blend >= 0.5 ? "default" : "outline"}
          aria-pressed={blend >= 0.5}
          onClick={() => transitionTo(1)}
          className="h-auto flex-col items-start gap-0 py-2"
        >
          <span className="text-xs opacity-80">Observation B</span>
          <span className="data text-sm">{obsB.acquisition}</span>
        </Button>
      </div>
      <div className="space-y-1">
        <label htmlFor="blend" className="text-sm font-semibold">
          Controlled transition A ↔ B
        </label>
        <Slider
          id="blend"
          min={0}
          max={100}
          step={1}
          value={[Math.round(blend * 100)]}
          onValueChange={(v) => {
            cancelAnimationFrame(raf.current);
            setBlend(v[0] / 100);
          }}
          thumbLabel="Transition between observation A and observation B"
        />
        <p className="data text-xs text-ink-soft">
          A {obsA.acquisition} · B {obsB.acquisition} · blend {Math.round(blend * 100)}%
        </p>
      </div>
      <details className="rounded-card border border-line bg-panel p-3 text-sm">
        <summary className="cursor-pointer font-semibold">Observation metadata</summary>
        <table className="mt-2 w-full text-left text-xs">
          <thead>
            <tr className="border-b border-line text-ink-soft">
              <th className="py-1 pr-2">Field</th>
              <th className="py-1 pr-2">A</th>
              <th className="py-1">B</th>
            </tr>
          </thead>
          <tbody className="data">
            {(["productId", "mission", "productType", "version", "channel", "validMask"] as const).map(
              (k) => (
                <tr key={k} className="border-b border-line/60">
                  <td className="py-1 pr-2 font-sans font-semibold">{k}</td>
                  <td className="py-1 pr-2">{obsA[k]}</td>
                  <td className="py-1">{obsB[k]}</td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </details>
      <p className="text-sm text-ink-soft">
        The two images are snapshots: between {obsA.acquisition} and {obsB.acquisition} there are
        no observations. The comparison shows observed change, not a film of the episode.
      </p>
    </div>
  );
}