---
title: Creación de tarjetas Anki con el atajo de iOS
draft: false
ignore: false
topics:
  - anki
  - ios
  - shortcut
date: 2024-12-08T12:45
created_at: 2024-12-08T12:45
last_modified: 2024-12-24T10:55
lang: spa
---

Este artículo ha sido traducido por AI. [Vea el artículo original escrito en inglés aquí](/creating-anki-cards-using-ios-shortcut)

[Anki, ¿qué es esto?](https://apps.ankiweb.net/) es un enfoque moderno de las tarjetas flash clásicas. [repetición espaciada](https://en.wikipedia.org/wiki/Spaced_repetition) No lo sé.

En lugar de tomar una baraja de cartas y estudiarla de arriba a abajo, Anki proporciona una manera de sacar a la superficie las cartas son el momento correcto justo cuando está a punto de dejar su banco de memoria.

Esto ha demostrado ser una forma muy poderosa de estudio, y se está volviendo cada vez más popular en campos como la medicina y el lenguaje donde la memorización es esencial.

El objetivo aquí es crear un atajo de Apple que me permita extraer contenido de la aplicación nativa de Libros, creando tarjetas Anki que me ayuden a estudiar el contenido que estoy leyendo.

Aquí hay un ejemplo del atajo de iOS en ejecución:

![Converting copied Books text to Anki card](https://i.imgur.com/EVpwhVY.gif)

## Los desafíos

Hubo algunos desafíos sorprendentes que vinieron junto con este atajo.

1. iOS no permite un atajo dentro de la hoja de compartición de Libros
2. La copia de contenido de Libros añade una cadena que dice "Extrato de \<BOOK\_NAME>. Este material puede estar protegido por derechos de autor".

Esperaba usar una hoja de intercambio con este atajo. Hace que el envío de entrada a un atajo sea rápido y fácil. Pero, no he encontrado una solución al problema de la hoja de intercambio.

Así que decidí que simplemente tendría que limpiar el texto "Experto ..." que viene junto a una copia antes de insertar el contenido en las tarjetas Anki.

### Limpieza del texto de la aplicación Libro

He dividido la limpieza de texto en su propio atajo. [el enlace](https://www.icloud.com/shortcuts/9f9cfa9c71e24dee901590d185951323) Si desea instalarlo.

Consiste en recibir la entrada de texto, separando la cadena "Excerpt"... usando una`Split`acción, y luego limpiar piezas adicionales del texto como`\n`, el`" "`, el`"`, y`“`No lo sé.

Luego la URL codifica el texto debido a la naturaleza de nuestra solución Anki.

### La creación de la tarjeta Anki

Aquí hay una[el enlace](https://www.icloud.com/shortcuts/29bb096aaed54e0ca4236f8c1008d9d9) a este atajo si desea instalarlo.

Dado la limitación de la hoja de intercambio, decidí usar el portapapeles para la entrada.

Cuando se ejecuta la acción, tomará el contenido de su portapapeles y lo guardará en el`Front`variable, que será la tarjeta frontal de su nueva tarjeta Anki.

La acción volverá a abrir la aplicación Libros. La próxima vez que abra su atajo, el atajo aceptará cualquier valor que haya en su portapapeles para el`Back`variable que será el valor colocado en la parte de atrás de su nueva tarjeta Anki.

Así que, en este caso, recomiendo copiar un nuevo valor del libro que está leyendo y regresar a la aplicación de atajos.

En este punto, se limpiará a ambos`Front`y`Back`cadenas, y añadiendo estos valores al siguiente valor de texto:

```
anki://x-callback-url/addnote?profile=bonteq&type=Basic&deck=shortcut&fldFront=CleanedFront&fldBack=CleanedBack
```

La acción abrirá esta URL, que abrirá a Anki, añadiendo la carta a la baraja.

En este caso, mi nombre de perfil es`bonteq`y tengo una cubierta llamada`shortcut`No lo sé.**Usted querrá adaptar esta cadena a sus configuraciones personales.**

Todavía no me he encontrado necesitando algo más que un`Basic`tipo de tarjeta, así que eso también está establecido dentro de esta URL.

## Conclusiones

Estos valores podrían ajustarse para ser un poco más dinámicos, pero, personalmente, no quiero tener que administrar los campos de entrada cada vez que quiero crear una tarjeta.

Esta configuración de atajos es lo que he encontrado que funciona mejor para mí: crear tarjetas Anki a partir del contenido que estoy leyendo con la menor interrupción posible en mi lectura.

Espero que encuentre esto valioso y que pueda ayudarle! Por favor, no dude en sugerir cambios en el atajo. Soy bastante nuevo en crearlos y me gusta pensar que hay una mejor manera.
