"""Stage 5 — Export.

Contract (dossier §13):
    Input:  validated results (or labeled exploratory).
    Output: versioned case package: analytical file (values and
            georeference) separated from the optimized visual resource,
            plus manifest, content and methodology.

The manifest follows the public/cases/case-pending.manifest.json template:
every observation, derived layer and claim is traced to its source.
"""


def export_case(analysis: dict, validation: dict) -> dict:
    """Separate analytical file and visual resource; emit the case package."""
    raise NotImplementedError("Phase 1: implement after the data viability gate")


if __name__ == "__main__":
    export_case({}, {})