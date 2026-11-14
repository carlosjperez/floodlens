"""Etapa 5 — Exportación.

Contrato (dossier §13):
    Entrada:  resultados validados (o etiquetados exploratorios).
    Salida:   paquete del caso versionado: archivo analítico (valores y
              georreferencia) separado del recurso visual optimizado,
              más manifiesto, contenido y metodología.

El manifiesto sigue la plantilla de public/cases/case-pending.manifest.json:
cada observación, capa derivada y afirmación queda trazada a su fuente.
"""


def export_case(analysis: dict, validation: dict) -> dict:
    """Separa archivo analítico y recurso visual; emite el paquete del caso."""
    raise NotImplementedError("Fase 1: implementar tras la puerta de viabilidad de datos")


if __name__ == "__main__":
    export_case({}, {})