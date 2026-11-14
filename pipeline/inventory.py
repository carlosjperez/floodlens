"""Stage 1 — Inventory.

Contract (dossier §13):
    Input:  candidate products located in ASF Data Search (Vertex)
            or NASA Earthdata Search.
    Output: case inventory with original product IDs, acquisitions and
            covered area, level/version/polarization, use conditions and
            required credentials (Earthdata Login).

The inventory registers each datum's use conditions before downloading.
"""


def build_inventory(products: list[dict]) -> dict:
    """Register products, acquisitions, versions and use conditions."""
    raise NotImplementedError("Phase 1: implement after the data viability gate")


if __name__ == "__main__":
    build_inventory([])