"""Stage 4 — Contrast.

Contract (dossier §13):
    Input:  derived layers + permitted independent evidence.
    Output: validation report with hits, errors and ambiguities.

Metrics only with an adequate reference. Without sufficient contrast, the
result is labeled exploratory.
"""


def validate_results(analysis: dict, references: list[dict]) -> dict:
    """Review representative points and document hits, errors and ambiguities."""
    raise NotImplementedError("Phase 1: implement after the data viability gate")


if __name__ == "__main__":
    validate_results({}, [])