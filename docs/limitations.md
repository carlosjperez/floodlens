# Limitaciones y alcance

## Alcance preventivo

La prevención se aborda mediante educación y preparación informativa. FloodLens **no** es un sistema de alerta, predicción, navegación segura ni diagnóstico de viviendas, y no afirma que reduzca daños sin una evaluación posterior.

## Vocabulario obligatorio (§5)

| Usar | Evitar sin respaldo |
|---|---|
| Posible agua nueva | Zona definitivamente inundada |
| Cambio observado | Causa demostrada |
| Área no evaluada | Zona segura |
| Comparación de fechas | Reconstrucción completa |
| Ejercicio educativo | Recomendación operativa |

Principios: evidencia antes que espectacularidad; fechas de las observaciones siempre visibles; datos originales y resultados derivados claramente separados; la incertidumbre forma parte de la interfaz; ninguna animación insinúa hechos no observados; ninguna instrucción de seguridad generada sin revisión oficial.

## Fuera del MVP (§6)

Simulación del avance del agua; profundidades no medidas; predicción; alertas y rutas de evacuación; estimación de daños; búsqueda de cualquier dirección; procesamiento bajo demanda; chat generativo; autenticación; edificios y carreteras sin fuente permitida.

## Límites del método

Ver [methodology.md](methodology.md): umbralización con limitaciones conocidas (agua bajo vegetación en banda L), estadísticas solo desde archivo analítico, etiqueta **exploratorio** sin contraste suficiente.

## Riesgos y respuesta (§20)

| Riesgo | Respuesta |
|---|---|
| No hay pareja NISAR adecuada | Cambiar de caso antes de desarrollar la historia; revisar admisibilidad |
| Procesamiento demasiado complejo | Elegir producto o alcance más manejable |
| Referencia insuficiente | Presentar el análisis como exploratorio |
| Sin elevación permitida | Plano georreferenciado |
| 3D lento | Simplificar geometría, texturas y efectos |
| Animaciones engañosas | Limitarse a transiciones de presentación |
| Prevención poco concreta | Definir y evaluar aprendizajes específicos |
| Exceso de alcance | Un caso, tres puntos, tres ejercicios |
| Condiciones de uso de datos | Registrarlas en el inventario y respetarlas |

## Accesibilidad (§17)

- El recorrido no depende exclusivamente del 3D; alternativa textual al contenido esencial.
- Ejercicios en HTML, navegación por teclado, foco visible, botón para omitir animaciones y respeto de la preferencia de movimiento reducido.
- El color no es el único identificador: tramas, bordes y etiquetas (agua de referencia azul estable; posible agua nueva turquesa con contorno; área ambigua trama ámbar; no evaluado trama gris; selección contorno de alto contraste).
- Interfaz utilizable antes de cargar todos los recursos; carga diferida de capas; demo de respaldo sin dependencias de red.

## Pendientes abiertos (anexo del dossier)

| Pendiente | Estado |
|---|---|
| Texto oficial completo de la pestaña Resources y reglas de datos | Sin verificar (página no recuperable en la extracción) |
| Caso NISAR concreto y escenas | Pendiente |
| Fuente permitida de elevación | Pendiente |
| Referencia independiente para contraste | Pendiente |
| Contenido oficial de preparación para enlazar | Pendiente de selección y revisión |