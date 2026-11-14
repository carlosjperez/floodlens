# Dancing with the SARs

- **Official URL:** https://www.spaceappschallenge.org/2026/challenges/dancing-with-the-sars/
- **Difficulty:** Advanced, Intermediate
- **Themes:** Earth Science

> English rendering of the challenge reference document for this repository. The official
> challenge page prevails.

## Summary

Earth's surface is an endless dance of natural processes and human activities, but these changes
are often hard to visualize, understand and communicate. From wetland loss to wildfires,
earthquakes, agricultural activity, glacier motion and more, the Earth is in a constant waltz of
surface change. The challenge is to build an interactive application that uses radar remote
sensing data from the NASA-ISRO Synthetic Aperture Radar (NISAR) mission to track and visualize
one or more types of surface change in places around the world.

## Objectives

Background:

- Most instruments perform **passive** remote sensing (reflected sunlight; spectral signatures to
  identify water, rocks, vegetation). Radar performs **active** remote sensing: it emits and
  receives its own microwave energy.
- Radar serves forest structure, soil moisture, wetlands, ocean topography, sea ice and more. SAR
  "synthesizes" a long antenna by combining successive acquisitions of a short antenna, and can
  observe day, night and through clouds (key in disasters: oil spills, fires, hurricanes).
- Radar is sensitive above all to **roughness and the dielectric constant**: backscatter and the
  different polarizations inform about structure, geometry and materials; water (high dielectric
  constant) highlights water bodies, floods and soil moisture; it also measures centimeter-scale
  surface motion (earthquakes, subsidence).

Objectives:

- **Build an interactive application that uses NISAR radar data to track and visualize one or
  more types of surface change** in places around the world (wetlands and floodplains,
  deforestation and fires, crops, soil moisture, glaciers and sea ice, earthquake deformation and
  coastal subsidence).
- Design intuitive tools and innovative visualizations: **interactive change-detection maps,
  time-series animations or dashboards**.
- Desired outcome: **"an open-source, user-friendly solution that translates complex radar
  observations into actionable insights"** for scientists, resource managers, educators,
  decision-makers and the public.
- Suggested steps:
  1. Choose an interesting study area (your city, a tropical wetland, an ice sheet, a fire, a
     flooded neighborhood, a volcanic eruption...).
  2. Download free NISAR data using the listed resources; optionally supplementary data (optical
     imagery, GIS layers) for context.
  3. Present the findings in a digital interactive medium of your choice (report, video, slides,
     story map, "even an interpretive dance?").
- **Form hypotheses about the physical factors** behind what is seen (or not) in SAR data: why
  does vegetation change in the Amazon? Which polarizations highlight those changes on land and
  ice? What future NISAR applications are possible?

## Potential considerations

- Analyze NISAR data with different polarizations and/or frequencies (from other sensors).
  Download data from different dates to show a time series, and auxiliary datasets (population,
  vegetation type, etc.) for context.
- Show how human factors (agriculture, industry, etc.) impact Earth's natural resources.
- Prioritize storytelling through data visualizations; the summary can be in any digital medium.
- If you know the area (e.g. your city), bring context and personal stories to the SAR images.
- Consider making the summary interactive (image sliders, web maps, etc.).

## NASA data and resources

| Resource | What it is | Access type | URL |
|---|---|---|---|
| NASA Earthdata Search | Discovery, search, comparison, visualization and access to NASA Earth science data | Web viewer / catalog dataset (download requires Earthdata Login; CMR API) | https://search.earthdata.nasa.gov/search |
| ASF Data Search Vertex | The Alaska Satellite Facility operates NASA's SAR data archive and provides services to ESDIS | Web viewer + REST API (download requires Earthdata Login) | https://search.asf.alaska.edu/ |
| NISAR Data User Guide | ASF guide with all information to access and work with NISAR data | Document | https://nisar-docs.asf.alaska.edu/ |
| Intro to Remote Sensing | Remote sensing fundamentals: instrument characteristics, resolution types, processing and analysis | Document | https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/remote-sensing |
| Intro to Synthetic Aperture Radar (SAR) | SAR fundamentals: frequency and wavelength, polarization and scattering mechanisms | Document | https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/sar |
| NASA ARSET Trainings | Online trainings for beginners and advanced (disasters, ecology, agriculture, public health, air quality, water); includes introductory remote sensing, SAR and NISAR material | Document / web courses | https://appliedsciences.nasa.gov/get-involved/training |
| NISAR StoryMaps | Interactive StoryMaps on SAR applications in floods, fires, subsidence, oil slicks and glacier motion | Web viewer | https://nisar.jpl.nasa.gov/applications/arcgis-storymaps/ |
| NISAR Applications White Papers | Two-page summaries of NISAR applications with societal benefit, identified in NISAR Applications Workshops | Document | https://nisar.jpl.nasa.gov/applications/societal-benefit/ |
| UAVSAR Postcards | False-color compositions of UAVSAR airborne data showing different land processes | Web viewer / images | https://uavsar.jpl.nasa.gov/education/postcards.html |

## Space agency partner resources

| Resource | What it is | Access type | URL |
|---|---|---|---|
| CSA: Radarsat Constellation Mission (RCM) - Data | Trio of Canadian Earth observation satellites (day/night, all-weather) for maritime surveillance, disaster management and ecosystem monitoring | Catalog dataset | https://donnees-data.asc-csa.gc.ca/en/dataset/rcm |
| CSA: Synthetic Aperture Radar python Tutorial | Tutorial to work with SAR images in Python and QGIS, with practical access and visualization steps | GitHub repository | https://github.com/asc-csa/Synthetic_Aperture_Radar_Tutorial |
| CSA: RADARSAT 1 - Data | Radar satellite launched in November 1995; the entire Canadian RADARSAT-1 archive is released under an open license | Catalog dataset | https://donnees-data.asc-csa.gc.ca/en/dataset/radarsat1 |
| CONAE: SAOCOM Catalogue | Catalog and general information on SAOCOM, CONAE's (Argentina) most recent SAR mission; registration, download, tutorials; ONE CLICK Login profile | Catalog dataset (registration required) | https://catalogos.conae.gov.ar/catalogo/catalogoSatSaocomInfo.html |
| CONAE: SAOCOM Catalogue Registration | Registration protocol to access the SAOCOM catalog with a ONE CLICK profile | Document | https://www.argentina.gob.ar/noticias/la-informacion-saocom-cada-vez-mas-accesible |

## Data access notes (repository notes, not part of the official page)

- **Programmatic access:** ASF exposes a Search API and the Python library `asf_search` to search
  NISAR by area, date and product type; `earthaccess` also works via CMR. Both require a free
  **Earthdata Login**.
- **Formats:** NISAR products are distributed in HDF5 (group structure per L/S frequency and
  HH/HV/VV polarization). Read with `h5py`/`xarray` and convert to GeoTIFF/COG with
  `rasterio`/GDAL for the web viewer. Consult the NISAR Data User Guide to choose the product:
  geocoded ones (e.g. GCOV for backscatter, GUNW for interferograms) avoid geocoding.
- **Size:** a scene can weigh several GB. Choose one study area and 2–4 dates, subset and
  resample to ~30–100 m before publishing; serve static COGs or PNG tiles.
- **Availability:** NISAR is a recent mission; verify early which dates and products exist for
  the chosen area in Vertex. If coverage is scarce, complement with Sentinel-1 at ASF or with
  RCM / RADARSAT-1 / SAOCOM (listed on the page), stating it clearly.