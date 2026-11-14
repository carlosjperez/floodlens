"""Etapa 4 — Contraste.

Contrato (dossier §13):
    Entrada:  capas derivadas + evidencia independiente permitida.
    Salida:   informe de validación con aciertos, errores y ambigüedades.

Métricas solo con referencia adecuada. Sin contraste suficiente, el resultado
se etiqueta como exploratorio.
"""


def validate_results(analysis: dict, references: list[dict]) -> dict:
    """Revisa puntos representativos y documenta aciertos, errores y ambigüedades."""
    raise NotImplementedError("Fase 1: implementar tras la puerta de viabilidad de datos")


if __name__ == "__main__":
    validate_results({}, [])