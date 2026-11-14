# FloodLens data pipeline

Phase 0 skeleton. Each module declares its stage's contract (dossier §13);
implementation lands in Phase 1 after the data viability gate.

## Stages

| Module | Input | Output |
|---|---|---|
| `inventory.py` | Candidate products (ASF Vertex / Earthdata Search) | Case inventory: IDs, acquisitions, versions, use conditions |
| `prepare.py` | Original products + inventory | Comparable layers: subsetting, alignment, normalization, quality masks |
| `analyse.py` | Comparable layers | Reference water, possible new water, exclusions, parameters |
| `validate.py` | Derived layers + permitted independent evidence | Validation report (hits, errors, ambiguities) |
| `export.py` | Validated results | Case package: analytical file + visual resource + manifest + methodology |

## Rules

- No universal preset threshold for open water.
- Statistics from the analytical file, never from screen pixels.
- Without sufficient contrast → `exploratory` label.
- Earthdata Login credentials outside the repo and the browser (environment variables or local `~/.netrc`).
- Bulky original products outside the repo (`data/raw/`, git-ignored).

## Usage

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r pipeline/requirements.txt
python -m pipeline.inventory   # NotImplementedError until Phase 1
```