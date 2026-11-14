# Data provenance

Traceability rules from the dossier (§14) and permitted challenge resources (§2). Adopted
restriction: work only with the resources listed in the challenge's Resources tab and the
catalogs they link to, respecting each site's use conditions.

## Case manifest

Template without fictitious data:
[`public/cases/case-pending.manifest.json`](../public/cases/case-pending.manifest.json).
Every versioned case package includes layers + manifest + content + methodology.

- **Each observation:** internal ID, original product ID, mission, product type, acquisition,
  version, channel, source, derived visual resources, valid mask.
- **Each derived layer:** method, inputs, parameters, processing date, code version, output
  file, limitations.
- **Each content claim:** one or more references via `sourceIds`; own interpretive content is
  marked as such.

## Challenge resources and intended use

| Challenge resource | Intended use in FloodLens | Priority |
|---|---|---|
| ASF Data Search (Vertex) | Locate and access the case's radar products | Primary |
| NISAR Data User Guide | Choose products, levels and processing flow | Primary |
| NASA Earthdata Search | Permitted complementary data, if needed | As needed |
| Intro to remote sensing and SAR | Basis of the educational texts | Primary |
| NASA ARSET | Ground the method and limitations | Primary |
| NISAR StoryMaps and White Papers | Application context and narrative | Support |
| UAVSAR Postcards | Reference visual material, if it adds value | Optional |
| CSA (RCM, RADARSAT-1, Python SAR tutorial) | Implementation reference; data only if needed | Optional |
| CONAE SAOCOM | Complementary data with registration, only if it adds value | Optional |

Official URLs in [docs/challenges/05-dancing-with-the-sars.md](challenges/05-dancing-with-the-sars.md).

## Access and use conditions

- Download requires a free **Earthdata Login**. Credentials stay outside the browser and the
  repository (see `.gitignore`).
- Use conditions and version information are registered in the case inventory (Phase 0).
- Bulky original products are not committed; only optimized derived layers and the case
  package's analytical file.

## Critical condition (HOLD)

NISAR must appear in a substantive interaction with real data, not as a decorative mention. If
no suitable NISAR case is located, the project's admissibility must be reviewed before
continuing, and the sensor must not be silently substituted.

## Case acceptance criteria (§7)

- NISAR observations available before and during the flood, or while the water remains
  detectable.
- Products comparable in geometry and channels.
- Small area, processable within hackathon time.
- Interpretable visual change (preferably open water).
- Some reference within the permitted resources for contrast.
- Use conditions and version information registered.

If no well-documented catastrophe exists, the case is presented as **observed hydrological
change**, not as a reconstructed disaster.