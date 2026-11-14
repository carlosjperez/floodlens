# Procedencia de datos

Reglas de trazabilidad del dossier (§14) y recursos permitidos del reto (§2). Restricción adoptada: se trabaja únicamente con los recursos listados en la pestaña Resources del reto y los catálogos a los que enlazan, respetando las condiciones de uso de cada sitio. El caso de la DANA de Valencia queda descartado.

## Manifiesto del caso

Plantilla sin datos ficticios: [`public/cases/case-pending.manifest.json`](../public/cases/case-pending.manifest.json). Cada paquete de caso versionado incluye capas + manifiesto + contenido + metodología.

- **Cada observación:** ID interno, ID del producto original, misión, tipo de producto, adquisición, versión, canal, fuente, recursos visuales derivados, máscara válida.
- **Cada capa derivada:** método, entradas, parámetros, fecha de procesamiento, versión del código, archivo de salida, limitaciones.
- **Cada afirmación del contenido:** una o más referencias mediante `sourceIds`; el contenido interpretativo propio se marca como tal.

## Recursos del reto y uso previsto

| Recurso del reto | Uso previsto en FloodLens | Prioridad |
|---|---|---|
| ASF Data Search (Vertex) | Localizar y acceder a productos radar del caso | Principal |
| NISAR Data User Guide | Elegir productos, niveles y flujo de procesamiento | Principal |
| NASA Earthdata Search | Datos complementarios permitidos, si hacen falta | Según necesidad |
| Intro a teledetección y a SAR | Base de los textos educativos | Principal |
| NASA ARSET | Fundamentar método y limitaciones | Principal |
| NISAR StoryMaps y White Papers | Contexto de aplicaciones y narrativa | Apoyo |
| UAVSAR Postcards | Material visual de referencia, si aporta | Opcional |
| CSA (RCM, RADARSAT-1, tutorial SAR Python) | Referencia de implementación; datos solo si son necesarios | Opcional |
| CONAE SAOCOM | Datos complementarios con registro, solo si aportan | Opcional |

URLs oficiales en [docs/challenges/05-dancing-with-the-sars.md](challenges/05-dancing-with-the-sars.md).

## Acceso y condiciones de uso

- Descarga requiere **Earthdata Login** gratuito. Las credenciales permanecen fuera del navegador y del repositorio (ver `.gitignore`).
- Condiciones de uso e información de versión registradas en el inventario del caso (Fase 0).
- Los productos originales voluminosos no se suben al repositorio; solo capas derivadas optimizadas y el archivo analítico del paquete de caso.

## Condición crítica (HOLD)

NISAR debe aparecer en una interacción sustantiva con datos reales, no como mención decorativa. Si no se localiza un caso NISAR adecuado, hay que revisar la admisibilidad del proyecto antes de continuar y no sustituir silenciosamente el sensor. La página oficial del reto no pudo recuperarse completa durante la preparación; las condiciones definitivas deben confirmarse en ella.

## Criterios de aceptación de un caso (§7)

- Observaciones NISAR disponibles antes y durante la inundación, o mientras el agua siga siendo detectable.
- Productos comparables en geometría y canales.
- Zona pequeña y procesable en el tiempo del hackathon.
- Cambio visual interpretable (preferiblemente agua abierta).
- Alguna referencia dentro de los recursos permitidos para contrastar.
- Condiciones de uso e información de versión registradas.

Si no hay una catástrofe bien documentada, el caso se presenta como **cambio hidrológico observado**, no como desastre reconstruido.