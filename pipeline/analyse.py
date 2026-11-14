"""Stage 3 — Interpretation.

Contract (dossier §13):
    Input:  comparable layers.
    Output: reference water, possible new water, exclusions and parameters.

Rule: possible new water = water candidate in the episode observation
+ evidence of change vs the reference - reference water
- invalid or excluded zones. No universal preset threshold; water under
vegetation (bright response in L-band) does not use the open-water rule.
"""


def analyse_change(layers: dict) -> dict:
    """Open-water candidates and change vs the reference."""
    raise NotImplementedError("Phase 1: implement after the data viability gate")


if __name__ == "__main__":
    analyse_change({})