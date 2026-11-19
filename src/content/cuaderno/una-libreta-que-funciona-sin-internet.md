---
titulo: "Una libreta que funciona sin internet"
resumen: "Quien atiende un changarro no va a crear una cuenta ni a esperar a que cargue una página. Por qué El Chalán funciona sin conexión, sin registro y aceptando datos incompletos."
fecha: 2026-11-19
producto:
  nombre: "El Chalán"
  url: "https://elchalan.hugolemoy.ninja"
  estado: "El Chalán es una prueba de concepto publicada: se instala en Android y arranca con datos de ejemplo."
---

El Chalán es una aplicación para que un negocio pequeño anote lo que entra y sale y sepa tres cosas: cuánto tiene, si ganó y cuánto le deben. Hoy es una prueba de concepto. Se puede instalar en un teléfono Android y arranca con datos de ejemplo. Todavía no la usa ningún negocio real todos los días.

La pensé para quien lleva sus cuentas en un cuaderno, en la memoria o en un Excel que alguien le armó y que ya nadie entiende. Y antes de escribir una línea de código tuve que aceptar algo incómodo: casi todo el software de gestión está diseñado para quien ya es ordenado.

## El dilema

Las apps de gestión piden lo mismo el primer día: crear cuenta, verificar correo, dar de alta el catálogo, elegir un régimen fiscal. Cada paso tiene sentido para un contador. Para quien vende con la fila esperando, cada paso es una razón para cerrar la app y volver al cuaderno.

El otro problema es la conexión. Un local con mala señal, un mercado sobre ruedas, un teléfono con los datos acabados a mitad de mes. Si la app necesita internet para anotar una venta, esa venta no se anota.

Y el tercero: el negocio que más necesita orden es justo el que menos datos completos tiene. Vendió algo, sabe cuánto cobró, pero no recuerda cuánto le costó. ¿Se rechaza el registro? ¿Se le obliga a inventar un número?

## La decisión

Tomé tres decisiones que se refuerzan entre sí.

**Sin conexión, de forma obligatoria.** La nube nunca es requisito para operar. Los datos viven en el teléfono y la app se instala desde el navegador como si fuera nativa. Respaldar es opcional: hoy se exporta un archivo, y más adelante se podrá guardar en el Drive de la propia persona.

**Sin cuenta al empezar.** Abres la app y anotas. No hay registro ni contraseña. La identidad solo se pide cuando quieres activar el respaldo en la nube, y entonces sirve también como llave para recuperar tus datos.

**Lo incompleto se guarda y se marca.** Todo es un movimiento: algo que entra o algo que sale, con fecha, monto y lo que se sepa del resto. Si falta el costo, el registro se guarda igual y queda «por completar». La app avisa y ofrece cómo resolverlo, pero no castiga. Un registro imperfecto vale más que uno que nunca se hizo.

## El lenguaje de la pantalla

Las pantallas no dicen «ingresos», «egresos» ni «inventario». Dicen «Vendí», «Gasté» y «Tengo». Por dentro los datos tienen nombres técnicos alineados con SutraMind, el otro producto que construyo, para que algún día puedan conectarse. Un diccionario traduce entre los dos.

Esa traducción sacó a la luz una distinción que yo no había visto: no es lo mismo «Compré» que «Gasté». Comprar mercancía para revender no es un gasto; es dinero que se convirtió en producto y que va a regresar. Pagar la luz sí es un gasto. Para un contador es obvio. En una libreta, las dos cosas salen del mismo bolsillo. La app explica la diferencia la primera vez que aparece.

## El dinero en centavos

Una decisión pequeña que evita errores grandes: el dinero se guarda en centavos enteros y las cantidades en milésimas enteras. Nunca en números con decimales. Las computadoras suman mal los decimales, y una diferencia de un centavo que se repite mil veces termina en una cuenta que no cuadra y en alguien que deja de confiar en la app.

Para comprobarlo, un generador crea negocios de ejemplo con sus ventas, compras y fiados de varios meses, y calcula por su cuenta cuánto debería dar cada cifra. Las pruebas comparan lo que muestra la app contra ese cálculo, al centavo. Hoy son 134 pruebas automáticas.

## Lo que dejé fuera

Quería que se pudiera anotar hablando o tomándole foto a un ticket. Lo dejé para después. La transcripción en el teléfono es un reto técnico pesado y, hecha en la nube, puede salir cara para un negocio que apenas empieza. También pospuse la conexión con WhatsApp. Prefiero una aplicación que funcione sola a una que dependa de tres servicios.

## Lo que no está resuelto

El criterio de éxito de esta prueba es simple: que un comerciante real le vea valor. Todavía no lo sé. El siguiente paso es un piloto con una persona que hoy lleva su negocio en Excel, y antes una revisión legal del aviso de privacidad. Aunque los datos se queden en el teléfono, el negocio anota nombres de clientes que le deben, y eso también son datos personales.

Quedan pendientes las pruebas de audio, cámara y almacenamiento en teléfonos reales, y una pregunta de fondo: cuánto puede crecer una libreta antes de convertirse en el sistema complicado que quería evitar.
