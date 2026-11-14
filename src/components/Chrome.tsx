import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Compass, Orbit, Pause, Play } from "lucide-react";
import { CHAPTER_ORDER, useFloodStore } from "@/state/store";
import { DEMO_CASE } from "@/lib/demo";
import { cn } from "@/lib/utils";

export function SyntheticStamp() {
  return (
    <span className="data w-fit rounded-chip border border-ambiguous bg-panel px-2 py-0.5 text-xs font-semibold text-ambiguous">
      Synthetic demonstration data
    </span>
  );
}

export function TopBar() {
  const chapter = useFloodStore((s) => s.chapter);
  const go = useFloodStore((s) => s.go);
  const mode = useFloodStore((s) => s.mode);
  const setMode = useFloodStore((s) => s.setMode);
  const reducedMotion = useFloodStore((s) => s.reducedMotion);
  const setReducedMotion = useFloodStore((s) => s.setReducedMotion);
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-panel">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
        <button
          type="button"
          onClick={() => go("portada")}
          className="font-display text-lg font-bold tracking-tight"
        >
          FloodLens
        </button>
        <nav aria-label="Chapters" className="order-3 flex w-full gap-1 overflow-x-auto lg:order-none lg:w-auto lg:flex-1 lg:flex-wrap lg:overflow-visible">
          {CHAPTER_ORDER.filter((c) => c !== "portada").map((c) => (
            <button
              key={c}
              type="button"
              aria-current={chapter === c ? "page" : undefined}
              onClick={() => go(c)}
              className={cn(
                "flex-none whitespace-nowrap rounded-control px-2.5 py-1 text-sm transition-colors",
                chapter === c
                  ? "bg-primary font-semibold text-primary-foreground"
                  : "text-ink-soft hover:bg-accent hover:text-ink",
              )}
            >
              {DEMO_CASE.chapters.find((ch) => ch.id === c)?.title}
            </button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMode(mode === "guided" ? "free" : "guided")}
            aria-pressed={mode === "free"}
            title={mode === "guided" ? "Guided: follow the chapter order with Next" : "Free: jump to any chapter from the top bar"}
          >
            {mode === "guided" ? <Compass /> : <Orbit />}
            {mode === "guided" ? "Guided mode" : "Free mode"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            aria-pressed={reducedMotion}
            title="Make transitions instant (reduced motion)"
            onClick={() => setReducedMotion(!reducedMotion)}
          >
            {reducedMotion ? <Play /> : <Pause />}
            {reducedMotion ? "Animations skipped" : "Skip animations"}
          </Button>
        </div>
      </div>
    </header>
  );
}

const LEGEND = [
  { label: "Reference water", cls: "bg-reference" },
  { label: "Possible new water", cls: "bg-newwater ring-1 ring-[#064a52]" },
  { label: "Ambiguous area", cls: "hatch-amber bg-ambiguous/20" },
  { label: "Not evaluated", cls: "hatch-gray bg-noteval/20" },
];

export function Legend() {
  return (
    <ul aria-label="Layer legend" className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {LEGEND.map((l) => (
        <li key={l.label} className="flex items-center gap-1.5 text-xs text-ink-soft">
          <span aria-hidden className={cn("swatch", l.cls)} />
          {l.label}
        </li>
      ))}
    </ul>
  );
}

export function BottomBar() {
  const chapter = useFloodStore((s) => s.chapter);
  const next = useFloodStore((s) => s.next);
  const prev = useFloodStore((s) => s.prev);
  const i = CHAPTER_ORDER.indexOf(chapter);
  return (
    <footer className="sticky bottom-0 z-20 border-t border-line bg-panel px-4 py-2">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <Legend />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs tabular-nums text-ink-soft">
            Chapter {i + 1} of {CHAPTER_ORDER.length}
          </span>
          <Button variant="outline" size="sm" onClick={prev} disabled={i <= 0}>
            <ChevronLeft /> Previous
          </Button>
          <Button size="sm" onClick={next} disabled={i >= CHAPTER_ORDER.length - 1}>
            Next <ChevronRight />
          </Button>
        </div>
      </div>
    </footer>
  );
}

export function TextAlternative() {
  return (
    <details className="rounded-card border border-line bg-panel p-3 text-sm">
      <summary className="cursor-pointer font-semibold">Text alternative to the viewer</summary>
      <div className="mt-3 max-w-[70ch] space-y-3 text-ink-soft">
        {DEMO_CASE.observations.map((o) => (
          <p key={o.id}>
            <strong className="text-ink">Observation {o.id === "obs-a" ? "A" : "B"}</strong>{" "}
            <span className="data">{o.acquisition}</span> · {o.mission} · {o.productType} ·{" "}
            {o.channel}.
          </p>
        ))}
        <p>
          The demonstration territory is a synthetic plain with a permanent channel (reference
          water, blue) and a sheet of possible new water (turquoise with outline) in observation
          B. Amber hatches mark ambiguous areas and gray hatches mark not-evaluated areas.
        </p>
        {DEMO_CASE.evidencePoints.map((p, i) => (
          <p key={p.id}>
            <strong className="text-ink">
              Point {i + 1}: {p.title}.
            </strong>{" "}
            {p.observed} {p.interpretation}
          </p>
        ))}
      </div>
    </details>
  );
}