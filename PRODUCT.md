# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Confirmed by dossier §12 (explicit user brief, not inferred): React + TypeScript + Vite; Three.js + React Three Fiber + Drei; Zustand; Zod; Python (NumPy, rasterio, h5py, GeoPandas, Shapely) for the pipeline; Vitest + Playwright; static hosting with no backend for the MVP.

## Users

Primary (MVP): secondary teachers and students in a guided 5–8 minute activity (design target, not measured). Secondary: interested citizens and organizations that want to communicate territorial information. Out of design: professional emergency tools, municipal dashboards, classroom accounts, a worldwide episode catalog.

## Product Purpose

FloodLens turns radar observations of floods into an interactive, educational territorial journey: the user explores the data, understands its limitations and practices how to interpret information before an emergency. Prototype success: a user completes the journey and can explain that (1) two images do not reconstruct the intermediate moments, (2) absence of detected water does not guarantee safety, and (3) a classification is not equivalent to confirmed damage.

## Positioning

Traceable evidence before spectacle: every content claim references its source (`sourceIds`), exclusions and uncertainty are visible in the interface, and the 3D never classifies or simulates: it only presents layers derived from a versioned analytical pipeline. No neighboring product can honestly copy that traceability chain without doing the data work.

## Operating Context

NASA Space Apps Challenge 2026, "Dancing with the SARs" challenge (14–15 Nov 2026). Submission: demo ≤30 s or ≤7 slides, everything in English; at least one NASA resource cited; OSI license; AI use declared (docs/SI_USAGE.md). Data is obtained from ASF Vertex / Earthdata Search with Earthdata Login; credentials live outside the browser and the repository. The geographic case and concrete NISAR scenes are pending verification (Phase 0).

## Capabilities and Constraints

- Guided journey of 7 screens: Cover, Context, Comparison, Evidence, Learn (3 exercises), Summary, Sources and method; freely explorable with global state preserved (case, chapter, active observation, visible layers, selected point, guided/free mode, reduced motion, answers).
- P0: one real case; central use of NISAR; two comparable observations; territory viewer; before/after comparison; one interpretation layer; three evidence points; three exercises; methodology-and-sources screen; final summary.
- The visual engine (Three.js) renders territory, observation textures, masks, camera and presentation transitions. It does not classify floods, infer depth, or simulate water advance.
- Required vocabulary: "possible new water", "observed change", "not-evaluated area", "date comparison", "educational exercise". Forbidden without support: "definitely flooded zone", "demonstrated cause", "safe zone", "complete reconstruction", "operational recommendation".
- Not an alert, prediction, safe-navigation or home-diagnosis system.
- HOLD: NISAR must appear in a substantive interaction with real data; without a suitable NISAR case, review admissibility before continuing; do not silently substitute the sensor.
- Without sufficient contrast, the result is labeled "exploratory". Statistics only from the analytical file, never from screen pixels.
- Bulky original products and credentials outside the repository.

## Brand Commitments

Name: FloodLens. The former tagline was removed by user direction; the heading carries the voice. Aesthetics pinned by dossier §10: documentary and cartographic — neutral grounds, legible typography, few simultaneous layers, colors coherent across map, legend and exercises, brief functional animation, no dramatization. Pinned color treatments: reference water stable blue; possible new water turquoise with outline; ambiguous area amber hatch; not evaluated gray hatch; selection high-contrast outline. Color is never the only identifier (hatches, borders, labels). Permanent user directives: near-square corners on product surfaces (8/4/3/2 px), sentence case, no taglines or helper text the layout must carry, no invented chrome on pills. Project language: English.

## Evidence on Hand

- docs/FloodLens_Dossier_Proyecto.pdf: complete human-authored specification (source of truth; original Spanish brief).
- docs/challenges/05-dancing-with-the-sars.md and docs/resources/space-apps-reglas-entrega-jurado.md: English renderings of the MIT template marcosferr/nasa-space-apps-starter-template reference material.
- public/cases/case-pending.manifest.json: manifest template without fictitious data.
- Absences future work must not fabricate: no verified NISAR scenes yet, no real derived layers, no independent contrast reference, no permitted elevation source. Any demonstration material must be labeled synthetic wherever a visitor could mistake it for real.

## Product Principles

1. Evidence before spectacle; uncertainty is part of the interface.
2. Observation dates always visible; original and derived data separated.
3. No animation insinuates unobserved facts; no safety instruction without official review.
4. One complete story before adding more cases; one case, three points, three exercises.
5. The journey does not depend on 3D to learn.

## Accessibility & Inclusion

Exercises in HTML with keyboard navigation and visible focus; a button to skip animations and respect for prefers-reduced-motion; text alternative to the observations and essential content; color never the only identifier (hatches, borders, labels); interface usable before all resources load; simplified scene on mobile; offline fallback demo with no network dependencies.