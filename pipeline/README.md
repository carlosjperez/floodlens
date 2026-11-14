# FloodLens data pipeline

Esqueleto de Fase 0. Cada módulo declara el contrato de su etapa (dossier §13);
la implementación llega en Fase 1 tras la puerta de viabilidad de datos.

## Etapas

| Módulo | Entrada | Salida |
|---|---|---|
| `inventory.py` | Productos candidatos (ASF Vertex / Earthdata Search) | Inventario del caso: IDs, adquisiciones, versiones, condiciones de uso |
| `prepare.py` | Productos originales + inventario | Capas comparables: recorte, alineación, normalización, máscaras de calidad |
| `analyse.py` | Capas comparables | Agua de referencia, posible agua nueva, exclusiones, parámetros |
| `validate.py` | Capas derivadas + evidencia independiente permitida | Informe de validación (aciertos, errores, ambigüedades) |
| `export.py` | Resultados validados | Paquete del caso: archivo analítico + recurso visual + manifiesto + metodología |

## Reglas

- Sin umbral universal prefijado para agua abierta.
- Estadísticas desde el archivo analítico, nunca desde píxeles de pantalla.
- Sin contraste suficiente → etiqueta `exploratorio`.
- Credenciales de Earthdata Login fuera del repo y del navegador (variables de entorno o `~/.netrc` local).
- Productos originales voluminosos fuera del repo (`data/raw/`, ignorado por git).

## Uso

```bash
python -m venv .venv && source .venv/bin/activate
pip install -r pipeline/requirements.txt
python -m pipeline.inventory   # NotImplementedError hasta Fase 1
```