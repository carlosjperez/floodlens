# Metodología

Transcripción operativa del dossier (§11, §13, §14). Ningún resultado publicado sin pasar por estas etapas.

## Pipeline de datos

| Etapa | Trabajo | Salida |
|---|---|---|
| 1. Inventario | Registrar productos, adquisiciones, versiones y condiciones | Inventario del caso |
| 2. Preparación | Leer producto, elegir canal, recortar, alinear, normalizar visualización, propagar máscaras de calidad | Capas comparables |
| 3. Interpretación | Candidatos a agua abierta y cambio respecto a la referencia; sin umbral universal prefijado | Agua de referencia, posible agua nueva, exclusiones, parámetros |
| 4. Contraste | Revisar puntos representativos, evidencia independiente permitida, documentar aciertos, errores y ambigüedades; métricas solo con referencia adecuada | Informe de validación |
| 5. Exportación | Separar archivo analítico (valores y georreferencia) y recurso visual optimizado | Paquete del caso |

Implementación: `pipeline/` (stubs de Fase 0 con los contratos de cada etapa).

## Regla de interpretación

```
Posible agua nueva =
    candidato a agua en la observación del episodio
  + evidencia de cambio respecto a la referencia
  - agua de referencia
  - zonas inválidas o excluidas
```

## Límites del método

- La umbralización de agua tiene limitaciones conocidas; el agua bajo vegetación puede dar respuesta brillante en banda L y no se trata con la misma regla que el agua abierta.
- Superficies y estadísticas se calculan desde el **archivo analítico**, nunca contando píxeles de una textura de pantalla.
- Sin contraste suficiente, el resultado se etiqueta como **exploratorio**.

## Coordenadas

El pipeline exporta un sistema local en metros (X este, Y altura, Z norte, con conversión definida y probada) y un origen documentado. Los metadatos conservan el sistema de referencia y la transformación geográfica originales.

## Motor visual (Three.js)

Three.js renderiza el territorio, muestra observaciones como texturas, superpone máscaras, gestiona cámara y selección y anima transiciones de presentación. **No clasifica inundaciones ni infiere profundidad.**

- La máscara de agua es una capa temática adherida a la superficie: sin olas, sin profundidad aparente, sin cota física.
- Modo guiado (posiciones por capítulo) y modo libre (órbita limitada al área); el usuario puede interrumpir cualquier transición.
- Si se exagera el relieve vertical, se indica en pantalla. Si no hay relieve permitido, se usa un plano georreferenciado en perspectiva.

### Animaciones permitidas y prohibidas

| Sí | No |
|---|---|
| Acercamientos de cámara | Agua avanzando calle a calle sin modelo validado |
| Aparición progresiva de etiquetas | Subida uniforme de nivel presentada como histórica |
| Transiciones entre capas y fechas | Profundidades no calculadas |
| Resultado de áreas seleccionadas | Edificios dañados o vehículos arrastrados sin evidencia |
| Explicaciones esquemáticas etiquetadas como tales | Interpolaciones entre observaciones presentadas como hechos |