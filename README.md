# FloodLens

**Reading flood water with radar.** FloodLens is an interactive educational web app that turns
synthetic-aperture radar (SAR) observations into a traceable territorial journey: you compare two
dated acquisitions on a 3D territory, read the evidence with its method and limitations, and
practice interpretation in three corrected exercises.

Built for the **NASA Space Apps Challenge 2026** —
[Dancing with the SARs](https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/).

## Demo

- **Live app:** https://floodlens-ev27apvmvw9.qoder.website (public, static hosting)
- **Demo video (27 s):** [docs/demo/floodlens-demo.webm](docs/demo/floodlens-demo.webm)
- **Slide deck (7 slides):** [docs/demo/floodlens-deck.pdf](docs/demo/floodlens-deck.pdf) ·
  editable [PPTX](docs/demo/floodlens-deck.pptx) · [HTML mirror](docs/demo/deck.html)

## What FloodLens is

A guided 5–8 minute activity for secondary teachers, students and the curious public, structured
as a documentary cartographic dossier. It teaches what radar observation shows, what it cannot
conclude, and why: two images are snapshots, not a film; absence of detected water is not absence
of danger; exposure is not confirmed damage.

The app is a static site with no backend. Every claim in the interface carries its sources, and
the full data package (observations, derived layers, method, limitations) is inspectable in the
final chapter.

## What it consists of

Seven chapters, navigable in guided or free mode, with global state preserved across the journey:

1. **Cover** — what the experience offers, a prepared 2D cartographic plate with legend, and the
   educational notice.
2. **Territorial context** — the demonstration plain, local coordinates, 30 m analytical
   resolution, and the stated ×6 relief exaggeration.
3. **Date comparison** — a registered A/B crossfade between two dated observations with a
   controlled transition slider, full metadata table, and a persistent notice that the comparison
   does not represent the advance of water between the dates.
4. **Evidence** — toggleable interpretation layers (reference water, possible new water, ambiguous
   area, not evaluated) rendered with color **and** hatch, plus three evidence cards: what is
   observed, interpretation, method, limitations, sources.
5. **Learn** — three interpretation exercises with corrected answers, explanations, and why the
   other options are not supported.
6. **Learning summary** — concepts practiced, corrected answers, open questions. No personal risk
   score.
7. **Sources and method** — the complete package manifest: observations and products, derived
   layers with provenance, cited sources with licenses, the interpretation formula, and package
   limitations.

The 3D viewer (Three.js) offers a damped guided camera per chapter and a free-orbit mode. Learning
never depends on 3D: a full text alternative describes the same territory, and every control works
by keyboard. Reduced motion is respected and can be toggled in the top bar.

## How it works

The interpretation rule (dossier §13) is pure, tested TypeScript:

```
possible new water = water candidate (episode)
                   + change vs reference
                   − reference water
                   − invalid or excluded zones
```

Statistics are computed from analytical arrays (30 m per cell in the demo), never from screen
pixels. Case packages are Zod-validated manifests (`src/schemas/case.ts`); every evidence point
and exercise must reference existing sources (`sourceIds`). The Python pipeline
(`pipeline/`) defines the five production stages — inventory → preparation → interpretation →
contrast → export — with versioned outputs; without sufficient independent contrast, results are
labeled exploratory.

## Scope

Delivered in this MVP: the seven-chapter journey, guided/free modes, persistent state, the
registered A/B comparison, three traceable evidence cards, three corrected exercises, the full
sources-and-method chapter, keyboard/reduced-motion/text-alternative accessibility, unit and
end-to-end tests, and a labeled synthetic demonstration case that runs offline.

Next milestones: a verified NISAR scene processed through the pipeline (Phase 0), an independent
contrast reference, and a permitted real elevation source. The shipped demonstration case is
synthetic and labeled as such everywhere; see [docs/limitations.md](docs/limitations.md).

## Tech stack

| Layer | Technology | Role |
|---|---|---|
| UI | React 19 + TypeScript + Vite 7 | Interface and navigation |
| 3D scene | Three.js 0.180 + React Three Fiber 9 + drei 10 | Territory, layers, markers, camera |
| State | Zustand 5 | Shared journey state |
| Validation | Zod 4 | Case manifest contracts |
| Styling | Tailwind CSS 4 + vendored shadcn/ui primitives | Design tokens and controls |
| Type | Archivo Variable (display) + Source Sans 3 Variable (body), self-hosted | Typography |
| Tests | Vitest 3 + Playwright | Logic and full journeys |
| Data pipeline | Python (NumPy, rasterio, h5py, GeoPandas, Shapely) | Production stages for real cases |
| Delivery | Static hosting, no backend | App and prepared case packages |

Earthdata Login credentials stay outside the browser and the repository. Bulky original products
are never committed.

## Quickstart

```bash
npm install
npm run dev        # development server
npm run build      # typecheck + production build
npm run preview    # serve the production build
npm test           # 34 unit tests (schema, interpretation, state)
npm run test:e2e   # 18 end-to-end tests (desktop + mobile Chromium)
```

## Project structure

```
floodlens/
├── src/
│   ├── app/            # shell, chapter routing, 3D error boundary
│   ├── screens/        # the seven chapters
│   ├── components/     # chrome, legend, evidence/exercise cards, ui primitives
│   ├── scene/          # TerritorySurface, ObservationLayers, FloodOverlay,
│   │                   # EvidenceMarkers, CameraDirector, SceneCanvas
│   ├── state/          # Zustand store (chapter, mode, blend, layers, answers)
│   ├── schemas/        # Zod case-manifest contract
│   ├── lib/            # interpretation rule, synthetic demo generator, textures
│   └── styles/         # design tokens (Tailwind v4 @theme)
├── public/cases/       # versioned case manifests (case-pending template)
├── pipeline/           # inventory → prepare → analyse → validate → export
├── tests/unit/         # Vitest
├── tests/e2e/          # Playwright journeys
└── docs/               # dossier, methodology, provenance, limitations, SI usage
```

## Testing

- **Unit (34):** manifest validation and referential integrity; the §13 interpretation truth
  table; statistics from analytical arrays; deterministic generator; store navigation, answers,
  layer toggles and blend derivation.
- **End-to-end (18):** the complete seven-chapter journey on desktop and mobile (including the
  three exercises and the sources chapter), no horizontal overflow on mobile, reduced motion with
  the text alternative, and keyboard navigation with visible focus.

## Accessibility

Keyboard-operable controls with visible focus; `aria-pressed`/`aria-current` state; reduced-motion
support (system preference and manual toggle); a complete text alternative to the 3D viewer;
color plus hatch so no state is encoded by hue alone; sentence-case copy; no learning step depends
on 3D.

## Data provenance and SI use

The shipped case is generated procedurally in `src/lib/demo.ts` and stamped
**“Synthetic demonstration data”** across the interface; it represents no real place or episode.
NASA educational resources (Earthdata SAR introduction, ARSET trainings, NISAR Data User Guide)
are cited in the Sources chapter and below. AI (“Super Intelligence”) assistance is declared in
[docs/SI_USAGE.md](docs/SI_USAGE.md): implementation was AI-assisted, the concept and method are
the team's, and all shipped rasters are procedural canvas renders labeled synthetic. The project
uses no NASA logos or brand elements.

## NASA Space Apps 2026 — submission kit

Ready-to-paste content for the project submission form (official guides:
[Project Submission](https://www.spaceappschallenge.org/resources/project-submission-guide/),
[Judging & Awards](https://www.spaceappschallenge.org/resources/judging-awards-guide/)).

| Form field | Content |
|---|---|
| Project Name | FloodLens |
| High-Level Project Summary | FloodLens is an open-source educational web app for the “Dancing with the SARs” challenge. It turns NISAR-style SAR observations into a guided territorial journey: a registered two-date comparison on a 3D territory, traceable evidence cards with method and limitations, and three corrected interpretation exercises. It teaches the public what radar can and cannot conclude about flood water, with full source traceability and accessibility. |
| Link to Project Demo | [Demo video, 27 s](https://github.com/carlosjperez/floodlens/blob/main/docs/demo/floodlens-demo.webm) and [7-slide deck (PDF)](https://github.com/carlosjperez/floodlens/blob/main/docs/demo/floodlens-deck.pdf), in English, hosted publicly in this repository. |
| Link to Final Project | https://github.com/carlosjperez/floodlens (public repository) · live app: https://floodlens-ev27apvmvw9.qoder.website |
| Detailed Project Description | The sections above: what it is, what it consists of, how it works, scope, stack, testing and accessibility. |
| Use of Super Intelligence (SI) | AI tools assisted implementation (code scaffolding, translation, test writing) under human direction. The project concept, interpretation method and editorial decisions are the team's. Synthetic demonstration data is generated procedurally in code and labeled as synthetic in the UI and manifest; no AI-generated images or video are shipped. See docs/SI_USAGE.md. |
| NASA Data | NISAR Data User Guide (ASF); NASA Earthdata “Intro to Synthetic Aperture Radar”; NASA ARSET trainings. The interpretation contract and case manifest are built around NISAR L-band SAR products (GCOV-style backscatter, two-date change); a verified NISAR scene is the next pipeline milestone. |
| Space Agency Partner Data and Other References | The full reference list below (libraries, fonts, guides, template). |

### Submission checklist

- [ ] All submission material and linked content in English.
- [ ] Demo within limits: ≤30 s video or ≤7 slides; hosted externally; public link tested in a
      private window.
- [ ] At least one NASA data or resource genuinely used and named in “NASA Data”.
- [ ] References list every dataset, library, font, image and API, with licenses.
- [ ] OSI license present (MIT, `LICENSE`).
- [ ] SI use declared; generated content marked (synthetic stamps in UI, docs/SI_USAGE.md).
- [ ] No NASA logos or brand elements; no imagery or voices of minors.
- [ ] All team members confirmed in the same Local Event (or Universal Event), ≤6 members.
- [ ] “Submit for Judging” clicked before Sunday 15 Nov, 11:59 p.m. local time, confirmation
      banner visible.

### How the project meets the judging criteria

| Criterion | FloodLens |
|---|---|
| Impact | Flood literacy for the general public: teaches interpretation limits that prevent false safety claims, reusable in classrooms. |
| Creativity | A documentary cartographic dossier instead of a disaster dashboard; registered A/B comparison with an explicit “not a film” contract. |
| Validity | Tested interpretation rule, Zod-validated manifests, source traceability on every claim, honest synthetic labeling, e2e-verified journeys. |
| Relevance | Built around the NISAR SAR data model and the challenge's storytelling goal; NASA resources cited and used. |
| Presentation | A complete guided story with a sources-and-method chapter; the demo can walk the journey in 30 seconds. |

## References

**NASA and challenge resources**

- [Dancing with the SARs — challenge page](https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/)
- [NASA Earthdata — Intro to Synthetic Aperture Radar (SAR)](https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/sar) (public educational use)
- [NASA ARSET trainings](https://appliedsciences.nasa.gov/get-involved/training) (public educational use)
- [NISAR Data User Guide (ASF)](https://nisar-docs.asf.alaska.edu/) (NASA/ASF public use)
- [ASF Data Search Vertex](https://search.asf.alaska.edu/) · [NASA Earthdata Search](https://search.earthdata.nasa.gov/search)
- [Project Submission Guide](https://www.spaceappschallenge.org/resources/project-submission-guide/) · [Judging & Awards Guide](https://www.spaceappschallenge.org/resources/judging-awards-guide/) · [Participant FAQ](https://www.spaceappschallenge.org/resources/participant-faqs/)

**Software and fonts (all open source)**

- React, React DOM (MIT) · TypeScript (Apache-2.0) · Vite (MIT)
- Three.js (MIT) · @react-three/fiber (MIT) · @react-three/drei (MIT)
- Zustand (MIT) · Zod (MIT) · Tailwind CSS (MIT)
- shadcn/ui primitives (MIT, vendored as source) · Radix UI (MIT) · lucide-react (ISC)
- clsx, tailwind-merge, class-variance-authority, cn (MIT)
- Vitest (MIT) · Playwright (Apache-2.0)
- Archivo Variable & Source Sans 3 Variable (SIL OFL, via @fontsource)
- Python pipeline: NumPy (BSD), rasterio (BSD), h5py (BSD), GeoPandas (BSD), Shapely (BSD)
- Starter template [marcosferr/nasa-space-apps-starter-template](https://github.com/marcosferr/nasa-space-apps-starter-template) (MIT); the challenge and rules documents in `docs/` are English renderings of its reference material.

## License

[MIT](LICENSE).