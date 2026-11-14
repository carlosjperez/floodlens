import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExerciseCard } from "@/components/Cards";
import { DEMO_CASE } from "@/lib/demo";
import { useFloodStore } from "@/state/store";
import { ArrowRight } from "lucide-react";

export function Aprende() {
  const [idx, setIdx] = useState(0);
  const answers = useFloodStore((s) => s.answers);
  const go = useFloodStore((s) => s.go);
  const selectPoint = useFloodStore((s) => s.selectPoint);
  const next = useFloodStore((s) => s.next);
  const ex = DEMO_CASE.exercises[idx];
  const answered = answers[ex.id] !== undefined;
  const last = idx === DEMO_CASE.exercises.length - 1;
  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-bold">Learn</h2>
      <p className="text-xs tabular-nums text-ink-soft">
        Exercise {idx + 1} of {DEMO_CASE.exercises.length}
      </p>
      <ExerciseCard
        exercise={ex}
        index={idx}
        onSeeMap={() => {
          selectPoint(DEMO_CASE.evidencePoints[idx]?.id ?? null);
          go("evidencia");
        }}
      />
      <div className="flex flex-wrap gap-2">
        {!last && (
          <Button onClick={() => setIdx(idx + 1)} disabled={!answered}>
            Next exercise <ArrowRight />
          </Button>
        )}
        {last && (
          <Button onClick={next} disabled={!answered}>
            Go to summary <ArrowRight />
          </Button>
        )}
        {idx > 0 && (
          <Button variant="outline" onClick={() => setIdx(idx - 1)}>
            Previous exercise
          </Button>
        )}
      </div>
      {!answered && (
        <p className="text-sm text-ink-soft">
          Choose an answer to see the explanation and why the others are not supported.
        </p>
      )}
    </div>
  );
}