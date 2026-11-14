# Dancing with the SARs
> Bailando con los SAR (radares de apertura sintética)

- **URL oficial:** https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/
- **Dificultad:** Advanced, Intermediate
- **Temas:** Earth Science

## Resumen
La superficie de la Tierra es una danza interminable de procesos naturales y actividades humanas, pero estos cambios suelen ser difíciles de visualizar, entender y comunicar. Desde la pérdida de humedales hasta incendios forestales, terremotos, actividades agrícolas, movimiento de glaciares y más, la Tierra está en un vals constante de cambios en su superficie. El desafío es construir una aplicación interactiva que use datos de teledetección por radar de la misión NASA-ISRO Synthetic Aperture Radar (NISAR) para seguir y visualizar uno o más tipos de cambio superficial en lugares de todo el mundo.

## Objetivos / qué piden
Contexto (Background):
- La mayoría de los instrumentos hace teledetección **pasiva** (energía del Sol reflejada; firma espectral para identificar agua, rocas, vegetación). El radar hace teledetección **activa**: emite y recibe su propia energía en microondas.
- El radar sirve para estructura forestal, humedad del suelo, humedales, topografía oceánica, hielo marino y más. El SAR "sintetiza" una antena larga combinando adquisiciones sucesivas de una antena corta, y puede observar de día, de noche y con nubes (clave en desastres: derrames de petróleo, incendios, huracanes).
- El radar es sensible sobre todo a **la rugosidad y la constante dieléctrica**: la retrodispersión y las distintas polarizaciones informan sobre estructura, geometría y materiales; el agua (alta constante dieléctrica) resalta cuerpos de agua, inundaciones y humedad del suelo; además mide movimientos de superficie a escala centimétrica (terremotos, subsidencia).

Objetivos:
- **Construir una aplicación interactiva que use datos de radar de NISAR para seguir y visualizar uno o más tipos de cambio superficial** en lugares del mundo (humedales y llanuras de inundación, deforestación e incendios, cultivos, humedad del suelo, glaciares y hielo marino, deformación por terremotos y subsidencia costera).
- Diseñar herramientas intuitivas y visualizaciones innovadoras: **mapas interactivos de detección de cambios, animaciones de series temporales o dashboards**.
- Resultado deseado: **"an open-source, user-friendly solution that translates complex radar observations into actionable insights"** para científicos, gestores de recursos, educadores, tomadores de decisión y el público.
- Pasos sugeridos:
  1. Elegir un área de estudio interesante (tu ciudad, un humedal tropical, una capa de hielo, un incendio, un barrio inundado, una erupción volcánica...).
  2. Descargar datos NISAR gratuitos usando los recursos listados; opcionalmente datos suplementarios (imágenes ópticas, capas GIS) para contextualizar.
  3. Presentar los hallazgos en un medio digital interactivo a elección (informe, video, diapositivas, story map, "even an interpretive dance?").
- **Formular hipótesis sobre los factores físicos** detrás de lo que se ve (o no) en los datos SAR: ¿por qué cambia la vegetación en el Amazonas? ¿Qué polarizaciones resaltan esos cambios en tierra y hielo? ¿Qué aplicaciones futuras de NISAR son posibles?

## Consideraciones potenciales
- Analizar datos NISAR con distintas polarizaciones y/o frecuencias (de otros sensores). Descargar datos de distintas fechas para mostrar una serie temporal, y datasets auxiliares (población, tipo de vegetación, etc.) para contextualizar.
- Mostrar cómo factores humanos (agricultura, industria, etc.) impactan los recursos naturales de la Tierra.
- Priorizar el storytelling a través de visualizaciones de datos; el resumen puede ser en cualquier medio digital (informe, video, diapositivas, story map, etc.).
- Si conocen el área (p. ej. su ciudad), aportar contexto e historias personales a las imágenes SAR.
- Considerar hacer el resumen interactivo (sliders de imágenes, mapas web, etc.).

## Datos y recursos de NASA
| Recurso | Qué es | Tipo de acceso | URL |
|---|---|---|---|
| NASA Earthdata Search | Descubrimiento, búsqueda, comparación, visualización y acceso a los datos de ciencias de la Tierra de la NASA | Visor web / dataset en catálogo (descarga requiere Earthdata Login; API CMR) | https://search.earthdata.nasa.gov/search |
| ASF Data Search Vertex | La Alaska Satellite Facility opera el archivo NASA de datos SAR y presta servicios al proyecto ESDIS | Visor web + API REST (descarga requiere Earthdata Login) | https://search.asf.alaska.edu/ |
| NISAR Data User Guide | Guía de ASF con toda la información para acceder y trabajar con datos NISAR | Documento | https://nisar-docs.asf.alaska.edu/ |
| Intro to Remote Sensing | Fundamentos de datos de teledetección: características de instrumentos, tipos de resolución, procesamiento y análisis | Documento | https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/remote-sensing |
| Intro to Synthetic Aperture Radar (SAR) | Fundamentos de SAR: frecuencia y longitud de onda, polarización y mecanismos de dispersión | Documento | https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/sar |
| NASA ARSET Trainings | Capacitaciones online para principiantes y avanzados (desastres, ecología, agricultura, salud pública, calidad del aire, agua); incluye material introductorio de teledetección, SAR y NISAR en inglés y español | Documento / cursos web | https://appliedsciences.nasa.gov/get-involved/training |
| NISAR StoryMaps | StoryMaps interactivos sobre aplicaciones SAR en inundaciones, incendios, subsidencia, manchas de petróleo y movimiento glaciar | Visor web | https://nisar.jpl.nasa.gov/applications/arcgis-storymaps/ |
| NISAR Applications White Papers | Resúmenes de 2 páginas sobre aplicaciones de NISAR con beneficio social, identificadas en NISAR Applications Workshops | Documento | https://nisar.jpl.nasa.gov/applications/societal-benefit/ |
| UAVSAR Postcards | Composiciones en falso color de datos aerotransportados UAVSAR que muestran distintos procesos terrestres | Visor web / imágenes | https://uavsar.jpl.nasa.gov/education/postcards.html |

## Recursos de agencias socias
| Recurso | Qué es | Tipo de acceso | URL |
|---|---|---|---|
| CSA: Radarsat Constellation Mission (RCM) - Data | Trío de satélites canadienses de observación terrestre (día/noche, todo clima) para vigilancia marítima, gestión de desastres y monitoreo de ecosistemas | Dataset en catálogo | https://donnees-data.asc-csa.gc.ca/en/dataset/rcm |
| CSA: Synthetic Aperture Radar python Tutorial | Tutorial para trabajar imágenes SAR con Python y QGIS, con pasos prácticos de acceso y visualización | Repositorio GitHub | https://github.com/asc-csa/Synthetic_Aperture_Radar_Tutorial |
| CSA: RADARSAT 1 - Data | Satélite radar lanzado en noviembre de 1995; todo el archivo canadiense de RADARSAT-1 está liberado bajo licencia abierta | Dataset en catálogo | https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1 |
| CONAE: SAOCOM Catalogue | Catálogo e información general de SAOCOM, la misión SAR más reciente de CONAE (Argentina); registro, descarga, tutoriales de descarga y procesamiento; perfil ONE CLICK Login | Dataset en catálogo (requiere registro) | https://catalogos.conae.gov.ar/catalogo/catalogoSatSaocomInfo.html |
| CONAE: SAOCOM Catalogue Registration | Protocolo de registro para acceder al catálogo SAOCOM con perfil ONE CLICK | Documento | https://www.argentina.gob.ar/noticias/la-informacion-saocom-cada-vez-mas-accesible |

## Otros recursos
No especificado en la página oficial.

## Acceso a los datos (notas del repo)

> Por la regla oficial, no se puede trabajar en un challenge antes del hackathon, ni usar SI (IA) para idear la solución. Por eso esta sección solo trae notas de acceso a los datos, no enfoques de solución. La idea la pone el equipo.

*No es parte de la página oficial. Las URLs y endpoints que no están en la página son sugerencias adicionales: verificalos.*

- **Acceso programático:** ASF expone una Search API y la librería Python `asf_search` (sugerencia adicional) para buscar NISAR por área, fecha y tipo de producto; `earthaccess` (sugerencia adicional) también funciona vía CMR. Ambos requieren **Earthdata Login** gratuito; crear cuentas el primer día.
- **Formatos:** los productos NISAR se distribuyen en HDF5 (estructura de grupos por frecuencia L/S y polarización HH/HV/VV...). Leer con `h5py`/`xarray` y convertir a GeoTIFF/COG con `rasterio`/GDAL para el visor web. Consultar la NISAR Data User Guide para elegir producto: los geocodificados (p. ej. GCOV para retrodispersión, GUNW para interferogramas) evitan tener que geocodificar.
- **Tamaño:** una escena puede pesar varios GB. Elegir 1 área de estudio y 2-4 fechas, recortar (subset) y remuestrear a ~30-100 m antes de publicar; servir COGs desde Supabase Storage o generar tiles PNG estáticos.
- **Disponibilidad:** NISAR es una misión reciente; verificar temprano qué fechas y productos hay para el área elegida en Vertex. Si la cobertura es escasa, complementar con Sentinel-1 en ASF o con RCM / RADARSAT-1 / SAOCOM (listados en la página), indicándolo con claridad.
- **Skills del repo aplicables:** space-apps-challenge, earth-geospatial-data, nasa-data-apis, maps-and-dataviz, frontend-design, ai-features (asistente que explica la imagen), deploy-vercel-supabase, pitch-and-submission, hackathon-sprint.
