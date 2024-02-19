# Índice

1. Introducción
2. ¿Qué es Fetch?
3. ¿Qué es la carga asíncrona con Fetch?
4. Elementos necesarios para desarrollar un mantenimiento completo (CRUD) de la BBDD

## Introducción

En este documento, explicaré qué es fetch y los elementos necesarios para desarrollar un mantenimiento completo de la base de datos utilizando la tecnología de Carga asíncrona con Fetch.

## ¿Qué es Fetch?

En JavaScript, `fetch()` es una función incorporada que se utiliza para realizar solicitudes de red y obtener recursos de manera asíncrona a través de la red, como datos JSON, imágenes, archivos o HTML. Esta función permite realizar solicitudes HTTP a servidores y recuperar respuestas para su posterior manipulación.

## ¿Qué es la carga asíncrona con Fetch?

La carga asíncrona con `fetch()` en JavaScript se refiere a la capacidad de realizar solicitudes de red y obtener recursos sin bloquear la ejecución del resto del código. Esto significa que puedes solicitar datos y seguir ejecutando otras tareas mientras esperas la respuesta. Fetch es una API moderna y flexible proporcionada por los navegadores web para realizar solicitudes HTTP y manipular respuestas.

## Elementos necesarios para desarrollar un mantenimiento completo (CRUD) de la BBDD

- **Servidor Backend:** Un servidor backend que proporcione una API RESTful para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos.
- **Conexión a la BBDD:** Necesitarás una forma de conectarte a la base de datos. Esto podría ser a través de un servidor de base de datos o una API que te permita interactuar con la base de datos.
- **Cliente Frontend (Request):** Una interfaz de usuario que permita a los usuarios interactuar con la aplicación. 
- **Respuesta:** Los datos que obtienes del servidor después de una solicitud exitosa o fallida.
- **Encabezados:** Metadatos adicionales que se mandan a la API para ayudar al servidor a comprender qué tipo de solicitud se está mandando, por ejemplo, “content-type” (tipo de contenido).
- **Manejo de errores:** Deberás tener en cuenta cómo manejarás los errores que puedan surgir durante las solicitudes de fetch().
- **Promesas y asincronía:** Dado que fetch() trabaja con promesas, necesitarás entender cómo trabajar con ellas para manejar las respuestas de las solicitudes de manera asíncrona.
