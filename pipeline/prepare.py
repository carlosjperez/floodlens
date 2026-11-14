"""Etapa 2 — Preparación.

Contrato (dossier §13):
    Entrada:  productos originales + inventario del caso.
    Salida:   capas comparables en geometría y canales: recorte, alineación,
              normalización de visualización y propagación de máscaras de calidad.

Exporta sistema local en metros (X este, Y altura, Z norte) con origen
documentado; los metadatos conservan CRS y transformación originales.
"""


def prepare_layers(inventory: dict) -> dict:
    """Lee producto, elige canal, recorta, alinea, normaliza y propaga máscaras."""
    raise NotImplementedError("Fase 1: implementar tras la puerta de viabilidad de datos")


if __name__ == "__main__":
    prepare_layers({})