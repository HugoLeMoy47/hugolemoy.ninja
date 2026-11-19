---
titulo: "Tres cifras distintas para la misma venta"
resumen: "El tablero dice una cifra, el contador otra y el asistente de IA una tercera. Nadie miente: cada uno define «venta» a su manera. Cómo lo resolví en SutraMind."
fecha: 2026-11-19
producto:
  nombre: "SutraMind"
  url: "https://freejolitos.consulting"
  estado: "SutraMind es una prueba de concepto sobre una empresa ficticia; no usa datos de clientes."
---

SutraMind es un tablero de indicadores con un asesor de IA para empresas medianas. Hoy es una prueba de concepto montada sobre una empresa ficticia, con sus sucursales, ventas y devoluciones inventadas. La construí para responder una pregunta que me hacía desde que trabajaba con tableros de analítica: ¿por qué nadie confía en las cifras?

## El dilema

En muchas empresas el tablero dice una cifra de ventas, el reporte del contador dice otra y el asistente de IA que acaban de instalar dice una tercera. Nadie miente a propósito. Cada uno calcula con su propia definición.

¿La venta incluye IVA? ¿Se restan las devoluciones del mes o las del mes en que se vendió? ¿Una venta cancelada cuenta como venta y luego como devolución, o no cuenta? Cada respuesta es razonable. El problema es que hay tres respuestas.

La IA lo empeora. Un modelo de lenguaje al que le das una hoja de cálculo y le preguntas «¿cuánto vendimos?» te da un número verosímil, bien redactado y sin decirte cómo lo calculó. Verosímil no es exacto.

## La decisión

En SutraMind la IA no calcula cifras. Nunca.

El tablero y el asesor leen de la misma capa semántica: un catálogo de métricas donde cada cifra tiene una sola definición, escrita y revisada. Cuando alguien pregunta, el modelo hace solo dos cosas. Primero, traduce la pregunta a una consulta sobre ese catálogo: qué métrica, qué periodo, qué sucursal. Después, la base de datos calcula y el modelo redacta la respuesta con lo que recibió.

Por eso el tablero y el asesor no se pueden contradecir: no tienen dos formas de calcular.

## La definición viaja con la cifra

Un ejemplo de la demo. Cuando el asesor responde cuánto se vendió en agosto, no solo da el número. Aclara qué incluye: ventas sin IVA, ya restadas las devoluciones y sin contar las canceladas. Esa aclaración no la inventa el modelo; viene del catálogo, junto con la cifra.

Y cada dato llega con tres etiquetas: su fuente, su fecha de corte y su nivel de confiabilidad. Si un dato viene de una carga incompleta, la respuesta lo dice.

## Cómo se prueba

Escribí 34 preguntas de referencia con su respuesta correcta. Unas piden cifras exactas. Otras intentan que una persona vea lo que su rol no le permite ver. Y otras no tienen respuesta en los datos, y lo correcto es que el asesor diga «no sé».

Esa última categoría es la que más me importa. Un asesor que contesta todo no es confiable. Uno que reconoce hasta dónde llega, sí.

## Lo que no está resuelto

La parte técnica es la fácil. La difícil es de gobierno: ¿quién define qué es una «venta» en una empresa real? Si esa definición no está escrita y acordada entre Dirección, Finanzas y Ventas, ninguna IA puede ser confiable, porque ni las personas se ponen de acuerdo.

SutraMind obliga a tener esa conversación antes de mostrar la primera cifra. Todavía no sé si las empresas medianas van a querer tenerla, o si van a preferir un número rápido aunque no cuadre.
