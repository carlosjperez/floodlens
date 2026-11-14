"""Stage 2 — Preparation.

Contract (dossier §13):
    Input:  original products + case inventory.
    Output: layers comparable in geometry and channels: subsetting,
            alignment, visualization normalization and quality-mask
            propagation.

Exports a local system in meters (X east, Y height, Z north) with a
documented origin; metadata preserves the original CRS and transformation.
"""


def prepare_layers(inventory: dict) -> dict:
    """Read product, choose channel, subset, align, normalize and propagate masks."""
    raise NotImplementedError("Phase 1: implement after the data viability gate")


if __name__ == "__main__":
    prepare_layers({})