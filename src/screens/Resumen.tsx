import { Button } from "@/components/ui/button";
import { DEMO_CASE } from "@/lib/demo";
import { useFloodStore } from "@/state/store";
import { BookOpen, RotateCcw } from "lucide-react";

const CONCEPTS = [
  "Two images do not reconstruct the intermediate moments: an observation is a snapshot, not a film.",
  "Absence of detected water does not guarantee safety: radar has limitations and invalidity masks.",
  "A classification is not equivalent to confirmed damage: exposure is not damage.",
];

export function Resumen() {
  const answers = useFloodStore((s) => s.answers);
  const go = useFloodStore((s) => s.go);
  const restart = useFloodStore((s) => s.restart);
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">Learning summary</h2>
      <p className="text-sm text-ink-soft">No personal risk score.</p>
      <section aria-label="Concepts practiced" className="space-y-2">
        <h3 className="font-display text-sm font-semibold">Concepts practiced</h3>
        <ul className="list-disc space-y-1 pl-4 text-sm text-ink-soft">
          {CONCEPTS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
      <section aria-label="Corrected answers" className="space-y-2">
        <h3 className="font-display text-sm font-semibold">Corrected answers</h3>
        {DEMO_CASE.exercises.map((ex, i) => {
          const chosen = answers[ex.id];
          const ok = chosen === ex.correctOptionId;
          const chosenLabel = ex.options.find((o) => o.id === chosen)?.label;
          const correctLabel = ex.options.find((o) => o.id === ex.correctOptionId)?.label;
          return (
            <div key={ex.id} className="rounded-card border border-line bg-panel p-3 text-sm">
              <p className="font-semibold">
                {i + 1}. {ex.question}
              </p>
              <p className="mt-1 text-ink-soft">
                {chosen === undefined
                  ? "Unanswered."
                  : ok
                    ? `Correct: ${chosenLabel}`
                    : `Your answer: ${chosenLabel}. Supported answer: ${correctLabel}.`}
              </p>
            </div>
          );
        })}
      </section>
      <section aria-label="Open questions" className="space-y-2">
        <h3 className="font-display text-sm font-semibold">Open questions</h3>
        <ul className="list-disc space-y-1 pl-4 text-sm text-ink-soft">
          <li>Which verified NISAR scene will replace the synthetic demo? (Phase 0, HOLD)</li>
          <li>Which independent reference will allow contrasting the interpretation?</li>
          <li>Which permitted elevation source will add real relief?</li>
        </ul>
      </section>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => go("fuentes")}>
          <BookOpen /> View sources and method
        </Button>
        <Button variant="outline" onClick={restart}>
          <RotateCcw /> Restart journey
        </Button>
      </div>
    </div>
  );
}