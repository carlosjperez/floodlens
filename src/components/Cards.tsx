import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DEMO_CASE } from "@/lib/demo";
import type { EvidencePoint, Exercise } from "@/schemas/case";
import { useFloodStore } from "@/state/store";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

function sourceTitles(ids: string[]): string {
  return ids
    .map((id) => DEMO_CASE.sources.find((s) => s.id === id)?.title ?? id)
    .join(" · ");
}

export function EvidenceCard({ point, index }: { point: EvidencePoint; index: number }) {
  const selected = useFloodStore((s) => s.selectedPoint);
  const selectPoint = useFloodStore((s) => s.selectPoint);
  const isSel = selected === point.id;
  return (
    <Card className={cn("rounded-card", isSel && "ring-2 ring-select")}>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-2 text-base">
          <span className="text-sm tabular-nums text-ink-soft">{index + 1}</span>
          {point.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <dl className="space-y-2">
          <div>
            <dt className="font-semibold">What is observed</dt>
            <dd className="text-ink-soft">{point.observed}</dd>
          </div>
          <div>
            <dt className="font-semibold">Interpretation</dt>
            <dd className="text-ink-soft">{point.interpretation}</dd>
          </div>
          <div>
            <dt className="font-semibold">Method</dt>
            <dd className="text-ink-soft">{point.method}</dd>
          </div>
          <div>
            <dt className="font-semibold">Limitations</dt>
            <dd className="text-ink-soft">{point.limitations.join(" ")}</dd>
          </div>
          <div>
            <dt className="font-semibold">Sources</dt>
            <dd className="text-ink-soft">{sourceTitles(point.sourceIds)}</dd>
          </div>
        </dl>
        <Button
          variant="outline"
          size="sm"
          aria-pressed={isSel}
          onClick={() => selectPoint(isSel ? null : point.id)}
        >
          <MapPin /> {isSel ? "Clear selection" : "Select on map"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function ExerciseCard({
  exercise,
  index,
  onSeeMap,
}: {
  exercise: Exercise;
  index: number;
  onSeeMap: () => void;
}) {
  const answers = useFloodStore((s) => s.answers);
  const answer = useFloodStore((s) => s.answer);
  const chosen = answers[exercise.id];
  const answered = chosen !== undefined;
  const correct = chosen === exercise.correctOptionId;
  return (
    <Card className="rounded-card">
      <CardHeader>
        <CardTitle className="text-base">
          <span className="mr-2 text-sm tabular-nums text-ink-soft">Exercise {index + 1}</span>
          {exercise.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <fieldset className="space-y-2">
          <legend className="sr-only">{exercise.question}</legend>
          {exercise.options.map((o) => (
            <label
              key={o.id}
              className={cn(
                "flex cursor-pointer items-start gap-2 rounded-control border border-line p-2 transition-colors hover:bg-accent",
                answered && o.id === exercise.correctOptionId && "border-newwater bg-newwater/10",
                answered && chosen === o.id && !correct && o.id !== exercise.correctOptionId && "border-alert bg-alert/10",
              )}
            >
              <input
                type="radio"
                name={exercise.id}
                value={o.id}
                checked={chosen === o.id}
                onChange={() => answer(exercise.id, o.id)}
                className="mt-1 accent-[#16232e]"
              />
              <span>{o.label}</span>
            </label>
          ))}
        </fieldset>
        {answered && (
          <div role="status" className="space-y-2 rounded-control border border-line bg-muted p-3">
            <p className="font-semibold">
              {correct ? "Supported by the evidence." : "Not supported by the evidence."}
            </p>
            <p className="text-ink-soft">{exercise.explanation}</p>
            <p className="text-ink-soft">
              <strong className="text-ink">Why the others are not supported:</strong>{" "}
              {exercise.whyOthersUnsupported}
            </p>
            <Button variant="outline" size="sm" onClick={onSeeMap}>
              <MapPin /> See it on the map
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}