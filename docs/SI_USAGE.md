# Super Intelligence (SI) usage log

Log for the NASA Space Apps Challenge 2026 submission form. The event rules require declaring AI
("Super Intelligence") use; SI does not conceive the solution (see
[rules](resources/space-apps-reglas-entrega-jurado.md)).

| Date | Tool | Use | Scope |
|---|---|---|---|
| 2026-11-14 | Qoder (agentic assistant) | Public repository generation: folder structure, documentation organization from the human-authored dossier, reference documents from the MIT template, pipeline stubs with the dossier's contracts | Infrastructure and documentation. The solution, product design and decisions (case, method, vocabulary, scope) are human-authored and recorded in `docs/FloodLens_Dossier_Proyecto.pdf` |
| 2026-11-14 | Qoder (agentic assistant) | App implementation assistance: React/Three.js scaffolding, unit and e2e test writing, English localization, README and submission kit drafting, under human direction and review | Code and texts. Interpretation method, editorial content and design direction come from the dossier and the team |

## Declarations

- No AI-generated images or videos are shipped in this repository. All shipped rasters are
  procedural canvas renders generated in code (`src/lib/textures.ts`, `src/lib/demo.ts`) and
  labeled “Synthetic demonstration data” in the UI and manifest. If AI imagery is generated
  later, it will carry a visible watermark per the rules.
- No NASA logos or brand elements are used.
- No published datum, figure or result is an AI-generated finding: the synthetic case is labeled
  `demo-synthetic`, and the real-case manifest is an empty template (`case-pending`) until
  Phase 0 verification.
- This log must be updated with any further SI use during the hackathon (code, texts, assets)
  before submission.