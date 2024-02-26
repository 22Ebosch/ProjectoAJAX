# indice
1. Introducción
2. CRUD
3. Headers
4. CORS
5. Promesas
6. Async/Await


# 1. Introducción a Fetch
### Qué es Fetch y su propósito.
  
Fetch es una API (Interfaz de Programación de Aplicaciones, por sus siglas en inglés) de JavaScript que proporciona una forma moderna y más flexible de realizar solicitudes HTTP desde un navegador web o desde un entorno de ejecución de JavaScript, como Node.js. Su propósito principal es permitir a los desarrolladores realizar peticiones de recursos a través de la red, como archivos, datos JSON, o cualquier otro tipo de datos disponibles en servidores remotos.

Fetch se diseñó para reemplazar las antiguas APIs de XMLHttpRequest (XHR), ofreciendo una sintaxis más sencilla y promesas nativas de JavaScript, lo que facilita la gestión de solicitudes asíncronas y la manipulación de respuestas. Permite enviar diferentes tipos de datos, como texto, JSON, blob (Binary Large Object), ArrayBuffer, FormData, etc., y trabajar con encabezados personalizados y opciones de configuración avanzadas.
 
El propósito de Fetch es mejorar la eficiencia y la facilidad de uso en la comunicación entre el cliente y el servidor en aplicaciones web y aplicaciones basadas en JavaScript, ofreciendo una interfaz más moderna y flexible para manejar solicitudes y respuestas HTTP.


# 2.CRUD

### Crear (Create)
````JAVASCRIPT
// Definición de la URL de la API
const url = 'https://api.example.com/usuarios';

// Definición de los datos del nuevo usuario
const nuevoUsuario = {
  nombre: 'Juan',
  apellido: 'Pérez',
  edad: 30
};

// Realización de una solicitud POST a la URL especificada
fetch(url, {
  method: 'POST', // Método de la solicitud: POST (creación de un nuevo recurso)
  headers: {
    'Content-Type': 'application/json' // Encabezados de la solicitud, indicando que el cuerpo es JSON
  },
  body: JSON.stringify(nuevoUsuario) // Cuerpo de la solicitud, convertido a JSON
})
// Manejo de la respuesta de la solicitud
.then(response => response.json()) // Convertir la respuesta a JSON
.then(data => console.log('Usuario creado:', data)) // Imprimir los datos del usuario creado en la consola
// Manejo de errores
.catch(error => console.error('Error al crear usuario:', error)); // Imprimir errores en la consola
````
### Leer (Read)
````JAVASCRIPT
const url = 'https://api.example.com/usuarios';

fetch(url)
.then(response => response.json())
.then(data => console.log('Usuarios:', data))
.catch(error => console.error('Error al obtener usuarios:', error));
````

### Actualizar (Update)
````JAVASCRIPT

const usuarioId = 123;
const url = `https://api.example.com/usuarios/${usuarioId}`;

const datosActualizados = {
  nombre: 'Carlos',
  apellido: 'Gómez',
  edad: 35
};

fetch(url, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(datosActualizados)
})
.then(response => response.json())
.then(data => console.log('Usuario actualizado:', data))
.catch(error => console.error('Error al actualizar usuario:', error));
````

### Eliminar (Delete)
````JAVASCRIPT

const usuarioId = 123;
const url = `https://api.example.com/usuarios/${usuarioId}`;

fetch(url, {
  method: 'DELETE'
})
.then(response => {
  if (response.ok) {
    console.log('Usuario eliminado exitosamente');
  } else {
    console.error('Error al eliminar usuario:', response.status);
  }
})
.catch(error => console.error('Error al eliminar usuario:', error));
````

# 3.HEADERS

Las cabeceras de los fetch son parte de las solicitudes HTTP que un cliente (como un navegador web) envía a un servidor para obtener recursos, como páginas web o archivos. Estas cabeceras son metadatos que proporcionan información adicional sobre la solicitud o el recurso solicitado. 

Para ello, aparte del método .set() podemos utilizar varios otros para trabajar con cabeceras, comprobar su existencia, obtener o cambiar los valores o incluso eliminarlos:

| Método           | Descripción                                           |
|------------------|-------------------------------------------------------|
| `BOOLEAN.has(STRING name)`     | Comprueba si la cabecera `name` está definida.       |
| `STRING.get(STRING name)`     | Obtiene el valor de la cabecera `name`.               |
| `STRING.set(STRING name, STRING value)` | Establece o modifica el valor `value` a la cabecera `name`. |
| `STRING.append(STRING name, STRING value)` | Añade un nuevo valor `value` a la cabecera `name`.  |
| `STRING.delete(STRING name)`  | Elimina la cabecera `name`.                           |

### Algunos ejemplos comunes de cabeceras de fetch incluyen:

User-Agent: Identifica el software del cliente que hace la solicitud, como el navegador web y su versión.
Accept: Indica al servidor qué tipo de contenido puede aceptar el cliente, como HTML, JSON, imágenes, etc.
Authorization: Se utiliza para enviar credenciales de autenticación al servidor, como un token de acceso o credenciales de usuario.
Content-Type: Especifica el tipo de medio del cuerpo de la solicitud, lo que permite al servidor saber cómo procesar los datos enviados por el cliente.
Cookie: Contiene información de seguimiento y estado de sesión que el cliente envía al servidor.
Estas cabeceras son fundamentales para la comunicación entre el cliente y el servidor, ya que proporcionan información importante que ayuda a ambos lados a entender y procesar correctamente las solicitudes y respuestas HTTP.

# 4.CORS

CORS (Cross-Origin Resource Sharing) es una política de seguridad que regula las solicitudes HTTP asíncronas desde un navegador a un servidor con un dominio diferente al de la página original. Aunque los navegadores permiten enlazar documentos de distintos dominios en el HTML o mediante la API DOM, las solicitudes asíncronas a través de XMLHttpRequest, fetch u otras librerías similares no tienen esta libertad por defecto. Esta restricción, conocida como protección CORS, busca prevenir posibles vulnerabilidades al dificultar la inclusión de recursos externos en un sitio web, salvaguardando así la seguridad y la integridad de los datos.

Si intentamos realizar una petición asíncrona hacia otro dominio diferente, probablemente obtendremos un error de CORS similar al siguiente:

<blockquote style="background-color: red; padding: 10px;">
Access to fetch at 'https://otherdomain.com/file.json' from origin 'https://domain.com/' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
</blockquote>

### SOLUCION DE ERROR:


La cabecera Access-Control-Allow-Origin permite habilitar peticiones HTTP asíncronas de origen cruzado al incluir el dominio al que se le concede permiso en la respuesta de la petición. Si coincide con el dominio de origen, el navegador permitirá la solicitud. Además, el valor '*' indica que se permiten solicitudes desde cualquier dominio, útil para API públicas. Estas cabeceras se pueden verificar fácilmente en la pestaña Network de las herramientas de desarrollo del navegador.

Por ejemplo, en Node.js con Express, podríamos configurar el servidor para que responda a las solicitudes con esta cabecera:

````JAVASCRIPT
const express = require('express');
const app = express();

app.get('/file.json', (req, res) => {
  // Lógica para obtener el archivo JSON
  const jsonData = {
    message: "Contenido del archivo JSON"
  };

  // Establecer la cabecera Access-Control-Allow-Origin para permitir acceso desde https://domain.com/
  res.setHeader('Access-Control-Allow-Origin', 'https://domain.com/');
  
  // Enviar el archivo JSON como respuesta
  res.json(jsonData);
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});

````

## 4.1 CORS en entornos de desarrollo
Otra opción sencilla y rápida para no tener que lidiar con CORS temporalmente es la de instalar la extensión Allow CORS, disponible tanto Allow CORS para Chrome como Allow CORS para Firefox. Esta extensión deshabilita la política CORS mientras está instalada y activada.

Esta elección es equivalente a que todas las respuestas a las peticiones asíncronas realizadas tengan la mencionada cabecera con el valor *. Obviamente, es importante recalcar que es una opción que sólo nos funcionará en nuestro equipo y navegador, pero puede ser muy práctica para simplificar el trabajo en desarrollo.

# 5.PROMESAS

En el primer .then() tenemos un objeto response. Se trata de la respuesta que nos llega del servidor web al momento de recibir nuestra petición:

````JAVASCRIPT
fetch("/robots.txt", options)
  .then(response => response.text())
  .then(data => {
    /** Procesar los datos **/
  });
````

La instancia response también tiene algunos métodos interesantes, la mayoría de ellos para procesar mediante una promesa los datos recibidos y facilitar el trabajo con ellos:



| Método          | Descripción                                                            |
|-----------------|------------------------------------------------------------------------|
| STRING.text()         | Devuelve una promesa con el texto plano de la respuesta.              |
| OBJECT.json()         | Idem, pero con un objeto json. Equivale a usar JSON.parse().          |
| OBJECT.blob()         | Idem, pero con un objeto Blob (binary large object).                  |
| OBJECT.arrayBuffer()  | Idem, pero con un objeto ArrayBuffer (buffer binario puro).           |
|OBJECT .formData()     | Idem, pero con un objeto FormData (datos de formulario).               |
| OBJECT.clone()        | Crea y devuelve un clon de la instancia en cuestión.                  |
|OBJECT Response.error()| Devuelve un nuevo objeto Response con un error de red asociado.       |
|OBJECT Response.redirect(url, code) | Redirige a una url, opcionalmente con un code de error.           |


# 6. Async/Await
ASYNC/AWAIT es una característica de JavaScript que simplifica la escritura y lectura de código asíncrono. 

Cuando se marca una función con la palabra clave async, esta función se vuelve asíncrona y devuelve una promesa. Dentro de esta función asíncrona, se puede utilizar la palabra clave await antes de una llamada a una función asíncrona para esperar a que esa función se complete y devuelva un resultado antes de continuar con la ejecución del código.
````javascript
async function obtenerDatosUsuario(id) {
  // Supongamos que esta función realiza una solicitud asíncrona para obtener datos de un usuario
  // Esta solicitud podría ser una solicitud HTTP a un servidor
  return await fetch(`https://api.example.com/usuarios/${id}`);
}

async function mostrarDatosUsuario(id) {
  try {
    const response = await obtenerDatosUsuario(id);
    const userData = await response.json();
    console.log(userData);
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
  }
}

mostrarDatosUsuario(123);

````
 En este ejemplo, obtenerDatosUsuario es una función asíncrona que realiza una solicitud para obtener los datos de un usuario. La función mostrarDatosUsuario utiliza await para esperar a que la solicitud de datos se complete antes de continuar con el procesamiento de esos datos. Esto hace que el código sea más fácil de leer y entender, en comparación con el uso de callbacks o promesas sin async/await. 


## EJERCICIO:


Escribe una aplicación web que utilice la API pública de GitHub para buscar información de un usuario ingresado por el usuario. La aplicación debe mostrar el nombre de usuario, su avatar y la cantidad de repositorios públicos que tiene. Utiliza la función fetch de JavaScript para realizar la solicitud a la API de GitHub.

````javascript
    <script>
        function fetchUserInfo() {
            const username = document.getElementById('usernameInput').value;

            fetch(`https://api.github.com/users/${username}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    const userInfoDiv = document.getElementById('userInfo');
                    userInfoDiv.innerHTML = `
                        <h2>${data.login}</h2>
                        <img src="${data.avatar_url}" alt="Avatar" style="width: 100px; height: 100px;">
                        <p>Public Repositories: ${data.public_repos}</p>
                    `;
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    </script>

````