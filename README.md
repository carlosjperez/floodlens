# FloodLens

> Aprender de inundaciones pasadas para prepararnos mejor.

Aplicación web educativa que transforma observaciones radar de inundaciones en un recorrido territorial interactivo. El usuario explora datos reales, comprende sus limitaciones y practica cómo interpretar información antes de una emergencia.

**NASA Space Apps Challenge 2026 · Reto [«Dancing with the SARs»](https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/)** · 14–15 de noviembre de 2026.

## Estado del proyecto

**Fase 0 — caso pendiente de selección.** Este repositorio contiene la especificación, los contratos de datos y el esqueleto de implementación. Ningún dato, cifra o resultado aquí publicado es un hallazgo: son especificaciones de lo que se construirá y comprobará. El caso geográfico, las escenas NISAR concretas y el uso permitido de cada dato están **pendientes de verificación** (ver [docs/limitations.md](docs/limitations.md) y el anexo del dossier).

**Condición crítica (HOLD):** NISAR debe aparecer en una interacción sustantiva con datos reales, no como mención decorativa. Si no se localiza un caso NISAR adecuado, hay que revisar la admisibilidad del proyecto antes de continuar y no sustituir silenciosamente el sensor.

## Qué es y qué no es

- **Es:** un recorrido educativo guiado (contexto territorial → comparación de fechas → evidencia → tres ejercicios → resumen), con trazabilidad completa hasta los productos originales.
- **No es:** un sistema de alerta, predicción, navegación segura ni diagnóstico de viviendas. No afirma que reduzca daños sin una evaluación posterior. La prevención se aborda mediante educación y preparación informativa.

## Stack previsto (dossier §12)

| Capa | Tecnología | Responsabilidad |
|---|---|---|
| Aplicación | React + TypeScript + Vite | Interfaz y navegación |
| Escena | Three.js + React Three Fiber | Renderizado |
| Utilidades 3D | Drei | Controles y componentes auxiliares |
| Estado | Zustand | Estado compartido |
| Validación | Zod | Comprobación de manifiestos |
| Procesamiento | Python (NumPy, rasterio, h5py según producto) | Lectura y transformación |
| Vectores | GeoPandas y Shapely | Geometrías |
| Pruebas | Vitest y Playwright | Lógica y recorridos |
| Entrega | Hosting estático | Aplicación y datos preparados |

**Backend:** no se necesita para el MVP. Las credenciales de descarga (Earthdata Login) permanecen fuera del navegador y del repositorio.

## Estructura del repositorio (dossier §15)

```
floodlens/
├── src/
│   ├── app/ components/ story/ learning/ state/ schemas/ styles/
│   └── scene/            # TerritorySurface, ObservationLayers, FloodOverlay,
│                         # EvidenceMarkers, CameraDirector (Fase 1)
├── public/cases/         # paquetes de caso versionados (capas + manifiesto + contenido)
├── pipeline/             # inventory → prepare → analyse → validate → export
├── tests/
├── docs/                 # dossier, methodology, data-provenance, limitations, SI_USAGE
└── README.md
```

Los productos originales voluminosos y las credenciales **no se suben** al repositorio.

## Pipeline de datos

Cinco etapas con salidas versionadas (detalle en [docs/methodology.md](docs/methodology.md)):

1. **Inventario** — productos, adquisiciones, versiones y condiciones de uso.
2. **Preparación** — recorte, alineación, normalización y máscaras de calidad → capas comparables.
3. **Interpretación** — candidatos a agua abierta y cambio respecto a la referencia → agua de referencia, posible agua nueva, exclusiones, parámetros.
4. **Contraste** — puntos representativos y evidencia independiente permitida → informe de validación.
5. **Exportación** — archivo analítico separado del recurso visual optimizado → paquete del caso.

Sin contraste suficiente, el resultado se etiqueta como **exploratorio**.

## Documentación

| Documento | Contenido |
|---|---|
| [docs/FloodLens_Dossier_Proyecto.pdf](docs/FloodLens_Dossier_Proyecto.pdf) | Dossier completo de proyecto, producto e implementación (fuente de verdad) |
| [docs/methodology.md](docs/methodology.md) | Pipeline, coordenadas, fórmula de interpretación y límites del método |
| [docs/data-provenance.md](docs/data-provenance.md) | Reglas de trazabilidad del manifiesto y recursos permitidos del reto |
| [docs/limitations.md](docs/limitations.md) | Alcance preventivo, vocabulario, fuera del MVP y riesgos |
| [docs/SI_USAGE.md](docs/SI_USAGE.md) | Registro de uso de IA para el formulario de entrega |
| [docs/challenges/05-dancing-with-the-sars.md](docs/challenges/05-dancing-with-the-sars.md) | Reto oficial documentado (objetivos, datos y recursos) |
| [docs/resources/space-apps-reglas-entrega-jurado.md](docs/resources/space-apps-reglas-entrega-jurado.md) | Reglas de entrega, criterios del jurado y free tiers |

## Reglas del evento (resumen)

- Envío desde el sáb 14 nov 9:00 hasta el **dom 15 nov 23:59 hora local** («Submit for Judging»).
- Demo: video de **30 s o menos** o **7 slides como máximo**, todo en **inglés**.
- Al menos un dato o recurso de NASA citado; todas las fuentes citadas con licencia.
- Licencia OSI (este repo: MIT). Uso de IA declarado en [docs/SI_USAGE.md](docs/SI_USAGE.md).
- Sin logos de NASA; imágenes y videos generados con marca de agua; sin menores en imagen ni voz.

## Orden de prioridad

**Datos → evidencia → aprendizaje → acabado visual.** El calendario se fija tras la Fase 0: los datos son la principal incertidumbre. Una historia completa antes de añadir más casos.

## Licencia y atribución

[MIT](LICENSE). Los documentos `docs/challenges/05-dancing-with-the-sars.md` y `docs/resources/space-apps-reglas-entrega-jurado.md` se transcriben del template MIT [marcosferr/nasa-space-apps-starter-template](https://github.com/marcosferr/nasa-space-apps-starter-template).