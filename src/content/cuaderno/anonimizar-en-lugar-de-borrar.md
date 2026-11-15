---
titulo: "Anonimizar en lugar de borrar"
resumen: "La persona tiene derecho a que sus datos se cancelen. La organización tiene que rendir cuentas años después. Cómo decidí entre las dos cosas, y qué sigue abierto."
fecha: 2026-11-15
producto:
  nombre: "Bitácora Viva"
  url: "https://freejolitos.consulting/bitacora-viva"
  estado: "Bitácora Viva es una prueba de concepto funcional y trabaja solo con datos de prueba."
---

Bitácora Viva es un expediente digital único para albergues y organizaciones que atienden a personas en movilidad. Hoy es una prueba de concepto funcional y trabaja solo con datos de prueba. Aun así, hay decisiones que conviene tomar antes del primer dato real. Esta es una: qué hace el sistema cuando una persona pide que sus datos se cancelen.

## El dilema

La persona tiene derecho a que sus datos se cancelen. La ley, además, pide no guardar datos personales de más. Y aquí el dato pesa: el expediente de una persona en movilidad, en las manos equivocadas, le puede costar muy caro.

Del otro lado está la organización. Quien la financia pide cuentas, a veces años después: cuántas personas atendió, con qué perfil, con qué resultado. Si borro el expediente, el informe del año pasado deja de cuadrar. Si conservo los nombres «por si acaso», acumulo riesgo cada día.

Hay un tercer problema, menos obvio. Un sistema que permite borrar permite también desaparecer el rastro de la propia actuación. Borrar la prueba de que borraste no se distingue de borrar para encubrir.

## La decisión

En Bitácora Viva no existe el borrado de expedientes, para ningún rol. Cuando una persona ejerce su derecho de cancelación, el sistema quita de forma irreversible lo que la identifica y conserva las cifras.

Se van el nombre, los apellidos, el contacto, el domicilio y los documentos. Quedan el año de nacimiento, el sexo, la nacionalidad, el año de ingreso y los estatus con sus fechas. Queda también una constancia: quién ejecutó la cancelación, cuándo y con qué motivo.

Los identificadores se destruyen, no se cifran. Consideré cifrarlos y destruir la llave. Lo descarté: si la llave sobrevive por error, la persona reaparece. Es justo el riesgo que no quiero correr.

El costo es claro. La operación no tiene vuelta atrás. Por eso solo la dirección de la organización puede ejecutarla, y tiene que escribir el motivo.

## Qué cuenta como identificador

Aquí empezó lo difícil. El nombre es obvio. Lo demás, no tanto.

La fecha de nacimiento completa identifica; el año, mucho menos. Al anonimizar, la fecha se reduce al año. Las terceras personas también cuentan: quien firmó un consentimiento como tutor, o quien presentó una solicitud a nombre de alguien más. Sus nombres se sustituyen por un seudónimo que no se puede revertir. El registro se queda como evidencia de que el trámite existió.

Y la lista se mueve. A principios de noviembre agregué al expediente un segundo teléfono y los documentos con que la persona se identifica. La anonimización se había escrito antes. Al preparar los datos de prueba vi que una persona anonimizada conservaba su segundo teléfono. Fue un defecto mío. Lo corregí, y la anonimización ya limpia también esos campos.

## El texto libre

Los campos con estructura se pueden enumerar. El texto libre no avisa. Un motivo de cierre, una referencia, el detalle de una tarea: en cualquiera puede aparecer un nombre.

La regla que adopté: toda columna de texto libre ligada a una persona o a un expediente tiene que estar declarada. O se limpia al anonimizar, o se conserva con su razón por escrito, o se borra junto con su fila, o queda diferida y a la vista.

Las notas del expediente tienen su propia tensión. En la operación diaria no se editan ni se borran: se corrigen con una fe de erratas. Al anonimizar, en cambio, el diseño es retirar su contenido y dejar solo quién actuó, cuándo y desde qué área.

## El registro de auditoría

El registro de auditoría es inmutable. Eso lo hace confiable y también delicado: lo que entra, se queda.

En una revisión de seguridad a principios de noviembre encontré que ese registro guardaba la fila completa de algunas tablas, con sus textos libres. Una persona podía quedar anonimizada en su expediente y seguir legible en el registro del sistema.

La corrección fue de fondo. El registro ya no guarda textos libres. Anota quién hizo el cambio y qué campo cambió, no lo que se escribió. El precio es deliberado: ese registro no sirve para reconstruir el valor anterior de un dato personal.

## Cómo se prueba

No confío en mi memoria para esto. Lo sostienen pruebas automáticas.

Una descubre en la base de datos todas las columnas de texto libre ligadas a una persona o a un expediente. Si alguien agrega una columna y no declara qué pasa con ella al anonimizar, la prueba falla. Otra siembra un texto centinela en el expediente, anonimiza y lo busca en las tablas y en el registro de auditoría. No debe quedar.

Son parte de una batería de más de 1,800 pruebas automáticas de seguridad, todas aprobadas. Además anonimicé un expediente de prueba y revisé el resultado en las tablas y en el registro de auditoría.

Tiene límites. La comprobación de que una columna se limpia revisa que la función la toque; que el valor quede vacío solo se prueba donde se sembró el centinela. Y el expediente que anonimicé no tenía notas, tareas ni archivos. Esas ramas solo las cubren las pruebas automáticas.

## Lo que no está resuelto

Varias cosas.

Las tareas ligadas a un expediente. Su título y su detalle pueden nombrar a la persona, y hoy la anonimización no los toca. Hay opciones sobre la mesa. No he decidido.

Los archivos. Anonimizar todavía no borra los archivos guardados. Hoy el sistema no captura fotografías de las personas, y no debería hacerlo hasta que ese borrado esté construido y probado.

Las cifras también señalan. En un albergue pequeño, una nacionalidad poco frecuente y un año de ingreso pueden bastar para reconocer a alguien. Los reportes hacia afuera ocultan los grupos de menos de cinco casos. Eso reduce el riesgo. No lo elimina.

Lo legal. Este diseño parte de mi lectura de la ley. No es asesoría legal ni un cumplimiento certificado. Antes del primer dato real lo tiene que revisar una persona abogada.

Y el dilema de fondo sigue ahí. Conservar las cifras es decidir que la memoria de la organización pesa junto al deseo de una persona de desaparecer por completo de un registro. Creo que es la decisión correcta: sin cifras, la organización no puede demostrar lo que hace. Pero la tomé yo, no la persona. Lo mínimo que le debo es que la decisión esté dicha con claridad y que se pueda verificar.
