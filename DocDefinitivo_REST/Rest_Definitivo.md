# TECNOLOGIA REST

- [REST](#REST) 

- [Endpoints y CRUD](#Endpoints-y-CRUD)

- [Header HTTP](#Header-HTTP)

- [Body HTTP](#Body-HTTP)

- [Métodos HTTP](#Métodos-HTTP)

- [Respuesta HTTP](#Respuesta-HTTP)

- [Herramientas](#herramientas) 

  - [Postman](#postman) 
  - [Rest Client](#rest-client) 


- [Propuesta de ejercicio](#Ejercicio-práctico)

## REST  

REST (Representational State Transfer) es un estilo arquitectónico para definir servicios web que sean simples, escalables y eficientes. En el contexto de la web, REST utiliza URIs (Identificadores de Recursos Uniformes) para identificar recursos y el protocolo HTTP para realizar llamadas sobre esos recursos(GET, POST, PUT y DELETE,principalmente). Esto permite una comunicación cliente-servidor donde el cliente puede solicitar y manipular datos al servidor de manera uniforme. 


Resumiendo, REST sería la tecnología con la que vamos a desarrollar las APIs que estén preparadas para recibir las solicitudes que necesitemos.

## Endpoints y CRUD

En una API de lista de tareas, los **endpoints** son identificadores que representan diferentes recursos y operaciones que se pueden realizar en la API. Estos también involucran el **CRUD** (_Create Read Update Delete_), que son las operaciones básicas para gestionar los datos de los recursos. 

Los endpoints son la interfaz principal a través de la cual los clientes interactúan con una API REST, y proporcionan una forma estructurada y uniforme de acceder y manipular recursos en el servidor.

Aquí se puede ver un ejemplo de cada uno de ellos

#### LEER (_GET_)

 `https://jsonplaceholder.typicode.com/posts`: Endpoint para obtener todos los _posts_.

 `https://jsonplaceholder.typicode.com/posts/{id}`: Endpoint para obtener un _post_ en específico.

#### CREAR (_POST_)

 `https://jsonplaceholder.typicode.com/posts`: Endpoint para agregar un nuevo _post_.

 Body:
 ```json
 {
    "userId": 3,
    "title": "Example",
    "body": "this is an example"
}
 ```

#### MODIFICAR (_PUT_/_FETCH_)

 `https://jsonplaceholder.typicode.com/posts/{id}`: Endpoint para modificar total o parcialmente un _post_.

 Body (_PUT_):
 ```json
 {
   "userId": 3,
    "title": "Example",
    "body": "this is an example"
}
 ```

 Body (_PATCH_):
 ```json
 {
   "title": "Example",
}
 ```

> En caso de _PUT_ será necessario especificar el valor de todos los campos, aunque estos no varien
> En caso de _PATCH_ **NO** será necessario especificar el valor de todos los campos, solo aquellos a modificar

#### ELIMINAR (_DELETE_)

 `https://jsonplaceholder.typicode.com/posts/{id}`: Endpoint para eliminar un _post_.

## Header HTTP
Son componentes que se intercambian cliente y servidor. Proporcionan información sobre los datos que están recibiendo o enviando.

#### Solicitud
Se envian por parte del cliente al servidor

- **Accept** - Indica el formato de respuesta que recibirá _aplication/json_

- **Content-Type** - Indica el formato de los datos que está enviando el cliente _aplication/json_

- **Authorization** - Sirve para enviar las credenciales de autentificación del servidor.

#### Respuesta
Se envian por parte del servidor al cliente

- **Status** - Indica el estado de la solicitud

- **Content-Type** - Indica el formato de los datos que se le estan enviando al cliente _aplication/json_

## Body HTTP
El cuerpo (body) de una solicitud HTTP contiene datos adicionales enviados al servidor, como parámetros de formulario o carga útil de JSON.

#### form-data
En este formato, los datos se envían como pares clave-valor, similar a cómo se envían los datos de un formulario HTML. Es útil para enviar archivos binarios junto con otros datos de formulario.

```plaintext
Nombre: Juan
Email: juan@example.com
Archivo: [archivo adjunto]
```

#### x-www-form-urlencoded
En este formato, los datos se envían como una cadena de consulta codificada en URL, donde los valores están codificados en formato clave=valor y separados por "&". Es útil para enviar datos de formulario simples.

```plaintext
nombre=Juan&email=juan%40example.com
```

#### raw
En este formato, los datos se envían en su forma bruta, sin ningún tipo de codificación adicional. Se puede usar para enviar datos en formato JSON, XML u otros formatos de carga útil personalizados. Es útil cuando se necesita control total sobre el formato de los datos enviados.

```json
{
  "nombre": "Juan",
  "email": "juan@example.com"
}

```

## Métodos HTTP

- **GET**: Recupera una información para el cliente.
```bash
GET /api/users
```

```bash
GET /api/users/{id}
```
- **POST**: Crea un recurso dentro del servidor. (Agrega un registro en) (Agregar un registre a la base de dades)

```bash
POST /api/users
Content-Type: application/json

{
  "nombre": "Example",
  "email": "ejemplo@example.com",
  "edad": 30
}
```
- **PUT**: Actualiza un recurso ya existente dentro del servidor.
```bash
POST /api/users/{id}
Content-Type: application/json

{
  "nombre": "Example",
  "email": "ejemplo@example.com",
  "edad": 30
}
```
- **PATCH**: Actualiza un campo sin tener que rreemplazarlo entero

```bash
PATCH /api/users/{id}
Content-Type: application/json

{
  "nombre": "Example v2",
}
  ```
- **DELETE**: Elimina un recurs.
```bash
DELETE /api/users/{id}
```

## Respuesta HTTP
Son las respuestas que da la pagina para informar sobre el resultado de la operación:

- **200** - OK
- **201** - Created
- **204** - No Content
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **500** - Internal Server Error

# Herramientas
 Las siguientes herramientas nos van a servir para comprobar el correcto funcionamiento de nuestras APIs o Endpoints. Desde ellas podremos hacer todos los tipos de solicitudes, explicados anteriormente, junto con algunas otras funciones.

| Extensió|Descripció|Ventatges|Desventatges|
|-|-|-|-|
| Postman | Es una herramienta para probar y desarrollar APIs. La extensión permiete acceder a las funciones principales desde el editor. | - Permite crear y enviar solicitudes HTTP. <br>- Facilita la definición y organización de colecciones de solicitudes. <br>- Permite escribir y ejecutar pruebas automatizadas por APIs. | - Requiere conocimeintos previos sobre el uso de Postman. <br>- Puede tener una curba de aprendizaje inicial. |
| REST Client    | Es una extensión que permite enviar solicitudes HTTP y ver la respuesta directamente en el editor, por medio de un archivo de texto. | - Permite definir y ejecutar solicitudes HTTP directamente des de un archivo. <br>- Facilita la documentación y prueba de APIs cerca del codigo fuente. | - Puede ser menos intuitivo para usuarios nuevos en escritura de archivos de texto estructurado. <br>- No ofrece tantas caracteristicas como avanzadas como Postman. |

  ## Postman

Aplicación y extensión de _Visual Studio Code_
  

Uso práctico:

- Instalar Postman o hacerte una cuenta en la versión web, puedes crear una nueva solicitud HTTP (GET, POST, PUT, DELETE, etc.) y definir los parámetros, encabezados y cuerpo de la solicitud.

- Enviar la solicitud y recibir la respuesta directamente en la interfaz de Postman, lo que te permite ver el resultado y analizar los datos.

- Organizar tus solicitudes en colecciones, compartir colecciones con otros usuarios y colaborar en el desarrollo de APIs.

  ## Rest Client

Extensión de _Visual Studio Code_
  

Uso práctico:

- Instalar la extensión REST Client en VSCode, puedes crear un archivo con extensión *.http* o *.rest*.

- En el archivo con esa extensión, puedes escribir tus solicitudes HTTP utilizando una sintaxis específica, como por ejemplo: GET https://api.example.com.
Luego, puedes enviar la solicitud desde el propio archivo, y la respuesta se mostrará directamente en el editor.

# Ejercicio práctico

## Objetivo
Familiarizarse con las solicitudes HTTP GET, POST, PUT i DELETE.

## Enunciado

1. Obtener posts (GET):

	1.1 Haz la consulta necesaria para conseguir todos los _posts_
		- Imprime por consola el estado de la consulta y si devuelve alguna cosa
	
	1.2 Haz la consulta necesaria para conseguir el _post_ con _ID_ 1
		- Imprime por consola el estado de la consulta y si devuelve alguna cosa.

2. Agregar post (POST):
	- Crea un nuevo _post_: 
		- _userId_ = 1
		- _title_ = "Nombre y apellido" 
		- _body_ = "Esto es un post de prueba"
	- Imprime por consola el estado de la consulta y si devuelve alguna cosa.
	
3. Actualitzar post (PUT):
	-  Actualiza los datos del _post_ con _ID_ 1: 
		- _title_ = "Apellido y Nombre" 
		- _body_ = "Este es un post actualizado"
	- Imprime por consola el estado de la consulta y si devuelve alguna cosa.

4. Eliminar post (DELETE):
	- Elimina el usuario con _ID_ 1
	- Imprime por consola el estado de la consulta y si devuelve alguna cosa.

## Herramientas
- **Aplicaciones**: Para poder realizar este ejercicio se tendrá que hacer uso de de uno de los plugins mencionados anteriormente, o de sus respectivas aplicaciones.

- **API**: la API necesaria para poder hacer los ejercicios es la siguiente:
	https://jsonplaceholder.typicode.com/posts/