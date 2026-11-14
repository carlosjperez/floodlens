"""Etapa 3 — Interpretación.

Contrato (dossier §13):
    Entrada:  capas comparables.
    Salida:   agua de referencia, posible agua nueva, exclusiones y parámetros.

Regla: posible agua nueva = candidato a agua en la observación del episodio
+ evidencia de cambio respecto a la referencia - agua de referencia
- zonas inválidas o excluidas. Sin umbral universal prefijado; el agua bajo
vegetación (respuesta brillante en banda L) no usa la regla de agua abierta.
"""


def analyse_change(layers: dict) -> dict:
    """Candidatos a agua abierta y cambio respecto a la referencia."""
    raise NotImplementedError("Fase 1: implementar tras la puerta de viabilidad de datos")


if __name__ == "__main__":
    analyse_change({})