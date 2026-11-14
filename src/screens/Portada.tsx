import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Legend, SyntheticStamp } from "@/components/Chrome";
import { buildDemoFields } from "@/lib/demo";
import { previewDataUrl } from "@/lib/textures";
import { useFloodStore } from "@/state/store";
import { BookOpen, ArrowRight } from "lucide-react";

export function Portada() {
  const enter = useFloodStore((s) => s.enter);
  const go = useFloodStore((s) => s.go);
  const preview = useMemo(() => previewDataUrl(buildDemoFields()), []);
  return (
    <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-6 py-10 lg:grid-cols-2">
      <section className="space-y-6">
        <h1 className="font-display text-5xl font-bold tracking-tight">FloodLens</h1>
        <p className="max-w-prose text-ink-soft">
          An interactive journey through a territory observed by radar: compare two dates and
          practice what the data shows — and what it cannot conclude. A guided 5–8 minute
          activity.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-line bg-panel p-4">
            <h2 className="mb-2 font-display text-sm font-semibold">What it offers</h2>
            <ul className="list-disc space-y-1 pl-4 text-sm text-ink-soft">
              <li>Observation comparison with visible dates.</li>
              <li>Evidence with method, limitations and sources.</li>
              <li>Three interpretation exercises with explanations.</li>
            </ul>
          </div>
          <div className="rounded-card border border-line bg-panel p-4">
            <h2 className="mb-2 font-display text-sm font-semibold">What it is not</h2>
            <ul className="list-disc space-y-1 pl-4 text-sm text-ink-soft">
              <li>Not an alert or prediction system.</li>
              <li>Does not confirm damage or declare safe zones.</li>
              <li>Does not reconstruct what happened between two dates.</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={enter}>
            Explore the story <ArrowRight />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              enter();
              go("fuentes");
            }}
          >
            <BookOpen /> View sources and method
          </Button>
        </div>
        <p role="note" className="rounded-control border border-ambiguous bg-ambiguous/10 px-3 py-2 text-sm font-semibold text-ambiguous">
          Educational experience. Not an alert system.
        </p>
      </section>
      <section aria-label="Demonstration plate" className="space-y-3">
        <img
          src={preview}
          alt="Synthetic cartographic plate: reference channel in blue and possible new water in turquoise with outline, amber and gray hatches"
          className="w-full rounded-card border border-line"
        />
        <Legend />
        <SyntheticStamp />
      </section>
    </div>
  );
}