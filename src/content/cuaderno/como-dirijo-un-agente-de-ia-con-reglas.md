---
titulo: "Cómo dirijo un agente de IA con reglas"
resumen: "Un agente de IA escribe el código de mis productos. Yo escribo las reglas, reviso cada cambio y decido qué se publica. Así funciona el método, y esto es lo que todavía falla."
fecha: 2026-11-19
producto:
  nombre: "Freejolitos Consultores"
  url: "https://freejolitos.consulting"
  estado: "El método se usa hoy en Bitácora Viva, SutraMind, El Chalán y en este sitio. Los productos son pruebas de concepto."
---

Llevo varios productos a la vez con un solo par de manos. No es porque programe rápido. Es porque casi todo el código lo escribe un agente de IA, y mi trabajo es otro: decidir qué se construye, poner las reglas y revisar.

Suena a atajo. En la práctica es una disciplina, y la aprendí a base de errores.

## El dilema

Un agente de IA programa más rápido que yo. También se equivoca con mucha seguridad. Si le pides «agrega esta pantalla», la agrega, y de paso puede inventar un dato de ejemplo con el nombre de un cliente real, publicar algo que nadie autorizó o cerrar una tarea que no está terminada.

El problema no es la velocidad, es la memoria. Cada sesión empieza desde cero. Lo que se decidió ayer, por qué se descartó una opción y qué quedó pendiente se pierde si no está escrito en algún lado. Sin eso, el agente vuelve a proponer lo que ya descarté.

## Las reglas viven en el repositorio

Cada repositorio tiene un archivo de reglas que el agente lee antes de tocar nada. Son pocas y no se negocian:

- **Cero clientes con nombre.** Solo el sector: «una casa de acogida», «una distribuidora». Aplica también a capturas, nombres de archivo y mensajes de commit.
- **Cada producto con su estado real.** Si es prueba de concepto, se dice. Nunca datos de personas reales.
- **Fusionar es publicar, y eso lo autorizo yo.** El agente puede trabajar en ramas y abrir propuestas de cambio. Publicar, tocar la base de datos o migrar datos requiere mi visto bueno cada vez.
- **Nunca reescribir la historia.** Nada de forzar cambios sobre lo ya publicado.
- **Pruebas primero.** El agente escribe la prueba, la ve fallar y después escribe el código.

## La memoria vive fuera del agente

Construí un segundo cerebro: una base de datos con mis proyectos, pendientes, decisiones y bitácoras. El agente se conecta a ella con un protocolo estándar (MCP) y tiene tres obligaciones.

Al empezar, consulta el estado del proyecto: qué sigue, qué está pendiente, qué decidí en los últimos días. Al terminar, registra lo que realmente hizo, en una sola operación. Y en medio, si algo solo lo puedo resolver yo, abre una decisión en lugar de resolverla por su cuenta.

Hay dos reglas que me costó aprender. La primera: **un pendiente solo se cierra con evidencia**, ya sea un commit, un archivo con fecha o mi confirmación. Sin evidencia se queda abierto. La segunda: **los resúmenes son fotos**. Cada estado se escribe «al corte de» una fecha, porque un resumen viejo leído como actual es la forma más fácil de engañarse.

## Verificar en lugar de creer

Un ejemplo de este mismo sitio. Cada versión publicada expone un pequeño archivo que dice qué commit está en línea. Gracias a eso, el agente detectó que el servicio de publicación no estaba compilando solo al fusionar: los cambios aprobados llevaban horas sin aparecer. No lo supe porque alguien me avisara. Lo supe porque había forma de comprobarlo.

Ahora todo lo que se puede verificar se verifica, y lo que no se pudo verificar se dice. «Probado en 375 y 1366 píxeles; no probado en un teléfono físico» es más útil que «listo».

## Un error que sigue a la vista

Las reglas también fallan. En una ocasión, un mensaje de commit mencionó un proyecto que no debía aparecer en un repositorio público. El cambio se corrigió, pero el mensaje quedó en el historial. Sacarlo exigiría reescribir la historia, que es justo lo que la regla prohíbe. Me quedé con el error a la vista y con una regla más clara: lo que no se publica tampoco se escribe en los mensajes.

## Lo que no está resuelto

El cuello de botella soy yo. El agente produce más de lo que alcanzo a revisar con calma, y una revisión apresurada es peor que ninguna. También veo que el agente copia patrones sin cuestionarlos: si una decisión vieja era mala, la replica con entusiasmo.

Y queda la pregunta que más me importa como consultor: cuánto de este método se puede enseñar a un equipo que no programa. Las reglas se escriben en español, no en código. Esa es la parte que creo que se puede llevar a otras organizaciones.
