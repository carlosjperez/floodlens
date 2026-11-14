import { SyntheticStamp } from "@/components/Chrome";
import { DEMO_CASE } from "@/lib/demo";

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full text-left text-xs">
        <thead className="bg-muted text-ink-soft">
          <tr>
            {head.map((h) => (
              <th key={h} className="px-2 py-1.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="data">
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line/60 align-top">
              {r.map((c, j) => (
                <td key={j} className="px-2 py-1.5">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
        <Table
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
        <Table
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
                  <a href={s.url} target="_blank" rel="noreferrer" className="underline underline-offset-2">
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