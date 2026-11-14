# Methodology

Operational transcription of the dossier (§11, §13, §14). No result is published without passing
through these stages.

## Data pipeline

| Stage | Work | Output |
|---|---|---|
| 1. Inventory | Register products, acquisitions, versions and use conditions | Case inventory |
| 2. Preparation | Read product, choose channel, subset, align, normalize visualization, propagate quality masks | Comparable layers |
| 3. Interpretation | Open-water candidates and change vs the reference; no universal preset threshold | Reference water, possible new water, exclusions, parameters |
| 4. Contrast | Review representative points, permitted independent evidence, document hits, errors and ambiguities; metrics only with an adequate reference | Validation report |
| 5. Export | Separate the analytical file (values and georeference) from the optimized visual resource | Case package |

Implementation: `pipeline/` (Phase 0 stubs carrying each stage's contract).

## Interpretation rule

```
possible new water =
    water candidate in the episode observation
  + evidence of change vs the reference
  - reference water
  - invalid or excluded zones
```

Class definitions used by the viewer and the legend:

- **Reference water** (stable blue): the permanent channel mapped in the reference observation.
- **Possible new water** (turquoise with outline): the rule above.
- **Ambiguous area** (amber hatch): water candidate without evidence of change, outside reference
  water and exclusions. Neither flooding nor absence of water is asserted.
- **Not evaluated** (gray hatch): invalid or excluded zones; the sensor offers no usable evidence.
  Not equivalent to a safe zone.

## Limits of the method

- Water thresholding has known limitations; water under vegetation can return a bright response
  in L-band and is not treated with the same rule as open water.
- Areas and statistics are computed from the **analytical file**, never by counting pixels of a
  screen texture.
- Without sufficient contrast, the result is labeled **exploratory**.

## Coordinates

The pipeline exports a local system in meters (X east, Y height, Z north, with a defined and
tested conversion) and a documented origin. Metadata preserves the original reference system and
geographic transformation.

## Visual engine (Three.js)

Three.js renders the territory, shows observations as textures, overlays masks, manages camera
and selection, and animates presentation transitions. **It does not classify floods or infer
depth.**

- The water mask is a thematic layer attached to the surface: no waves, no apparent depth, no
  physical elevation.
- Guided mode (positions per chapter) and free mode (orbit limited to the area); the user can
  interrupt any transition.
- If vertical relief is exaggerated, it is stated on screen. If no permitted relief is available,
  a georeferenced plane in perspective is used.

### Allowed and forbidden animations

| Allowed | Forbidden |
|---|---|
| Camera approaches | Water advancing street by street without a validated model |
| Progressive label reveal | Uniform level rise presented as historical |
| Transitions between layers and dates | Uncalculated depths |
| Results for selected areas | Damaged buildings or dragged vehicles without evidence |
| Schematic explanations labeled as such | Interpolations between observations presented as facts |