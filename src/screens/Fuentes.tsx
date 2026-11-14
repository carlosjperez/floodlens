import { SyntheticStamp } from "@/components/Chrome";
import { DEMO_CASE } from "@/lib/demo";

function RecordList({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <ul className="space-y-2">
      {rows.map((r, i) => (
        <li key={i} className="rounded-card border border-line bg-panel p-3">
          <dl className="grid grid-cols-[6.5rem_1fr] gap-x-3 gap-y-1 text-sm">
            {head.map((h, j) => (
              <div key={h} className="contents">
                <dt className="text-xs font-semibold text-ink-soft">{h}</dt>
                <dd className="break-words">{r[j]}</dd>
              </div>
            ))}
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function Fuentes() {
  return (
    <div className="space-y-5">
      <h2 className="font-display text-2xl font-bold">Sources and method</h2>
      <div className="flex flex-wrap items-center gap-2">
        <SyntheticStamp />
        <span className="data rounded-chip border border-line bg-panel px-2 py-0.5 text-xs text-ink-soft">
          Package {DEMO_CASE.id} · v{DEMO_CASE.version} · status {DEMO_CASE.status}
        </span>
      </div>
      <section className="space-y-2" aria-label="Observations">
        <h3 className="font-display text-sm font-semibold">Observations and products</h3>
        <RecordList
          head={["ID", "Product", "Mission", "Acquisition", "Version", "Channel"]}
          rows={DEMO_CASE.observations.map((o) => [
            o.id,
            o.productId,
            o.mission,
            o.acquisition,
            o.version,
            o.channel,
          ])}
        />
      </section>
      <section className="space-y-2" aria-label="Derived layers">
        <h3 className="font-display text-sm font-semibold">Derived layers and provenance</h3>
        <RecordList
          head={["Layer", "Method", "Inputs", "Processed", "Code", "Limitations"]}
          rows={DEMO_CASE.layers.map((l) => [
            l.id,
            l.method,
            l.inputs.join(", "),
            l.processedAt,
            l.codeVersion,
            l.limitations.join(" "),
          ])}
        />
      </section>
      <section className="space-y-2" aria-label="Sources">
        <h3 className="font-display text-sm font-semibold">Cited sources</h3>
        <ul className="space-y-2 text-sm">
          {DEMO_CASE.sources.map((s) => (
            <li key={s.id} className="rounded-card border border-line bg-panel p-3">
              <p className="font-semibold">
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                    {s.title}
                  </a>
                ) : (
                  s.title
                )}
              </p>
              <p className="data mt-1 text-xs text-ink-soft">
                {s.kind} · {s.license}
              </p>
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-2" aria-label="Method">
        <h3 className="font-display text-sm font-semibold">Interpretation method</h3>
        <p className="data rounded-control border border-line bg-muted p-3 text-xs">
          possible new water = water candidate (episode) + change vs reference − reference water
          − invalid or excluded zones
        </p>
        <p className="text-sm text-ink-soft">
          Pipeline: inventory → preparation → interpretation → contrast → export. Statistics come
          from the analytical file (30 m/cell in the demo), never from screen pixels. Without
          sufficient contrast, the result is exploratory. Local coordinates in meters (X east, Y
          height, Z north); the visual relief is exaggerated ×6 and stated on screen.
        </p>
      </section>
      <section className="space-y-2" aria-label="Limitations">
        <h3 className="font-display text-sm font-semibold">Package limitations</h3>
        <ul className="list-disc space-y-1 pl-4 text-sm text-ink-soft">
          {DEMO_CASE.limitations.map((l) => (
            <li key={l.id}>{l.text}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}