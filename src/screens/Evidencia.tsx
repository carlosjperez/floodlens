import { Button } from "@/components/ui/button";
import { EvidenceCard } from "@/components/Cards";
import { DEMO_CASE } from "@/lib/demo";
import { useFloodStore, type LayerId } from "@/state/store";
import { cn } from "@/lib/utils";

const LAYERS: { id: LayerId; label: string; swatch: string }[] = [
  { id: "reference", label: "Reference water", swatch: "bg-reference" },
  { id: "newwater", label: "Possible new water", swatch: "bg-newwater ring-1 ring-[#064a52]" },
  { id: "ambiguous", label: "Ambiguous area", swatch: "hatch-amber bg-ambiguous/20" },
  { id: "exclusion", label: "Not evaluated", swatch: "hatch-gray bg-noteval/20" },
];

export function Evidencia() {
  const visible = useFloodStore((s) => s.visibleLayers);
  const toggleLayer = useFloodStore((s) => s.toggleLayer);
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">Evidence</h2>
      <p className="text-sm text-ink-soft">
        Interpretation layers over the active observation. Exclusions and not-evaluated areas
        remain visible: what was not evaluated is not declared safe.
      </p>
      <div role="group" aria-label="Visible layers" className="flex flex-wrap gap-2">
        {LAYERS.map((l) => (
          <Button
            key={l.id}
            variant="outline"
            size="sm"
            aria-pressed={visible[l.id]}
            onClick={() => toggleLayer(l.id)}
            className={cn(!visible[l.id] && "border-dashed opacity-60")}
          >
            <span aria-hidden className={cn("swatch", l.swatch)} />
            {l.label}
            <span className="sr-only">{visible[l.id] ? "visible" : "hidden"}</span>
          </Button>
        ))}
      </div>
      {(!visible.ambiguous || !visible.exclusion) && (
        <p
          role="status"
          className="rounded-control border border-alert bg-alert/10 px-3 py-2 text-sm font-semibold text-alert"
        >
          Uncertainty layers hidden. Not evaluated is not declared safe.
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => {
              if (!visible.ambiguous) toggleLayer("ambiguous");
              if (!visible.exclusion) toggleLayer("exclusion");
            }}
          >
            Show them
          </Button>
        </p>
      )}
      <details open className="space-y-3">
        <summary className="cursor-pointer font-display text-sm font-semibold">
          Evidence cards ({DEMO_CASE.evidencePoints.length})
        </summary>
        <div className="mt-3 space-y-3">
          {DEMO_CASE.evidencePoints.map((p, i) => (
            <EvidenceCard key={p.id} point={p} index={i} />
          ))}
        </div>
      </details>
    </div>
  );
}