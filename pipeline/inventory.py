"""Etapa 1 — Inventario.

Contrato (dossier §13):
    Entrada:  productos candidatos localizados en ASF Data Search (Vertex)
              o NASA Earthdata Search.
    Salida:   inventario del caso con IDs de productos originales,
              adquisiciones y área cubierta, nivel/versión/polarización,
              condiciones de uso y credenciales necesarias (Earthdata Login).

El inventario registra las condiciones de uso de cada dato antes de descargar.
"""


def build_inventory(products: list[dict]) -> dict:
    """Registra productos, adquisiciones, versiones y condiciones de uso."""
    raise NotImplementedError("Fase 1: implementar tras la puerta de viabilidad de datos")


if __name__ == "__main__":
    build_inventory([])