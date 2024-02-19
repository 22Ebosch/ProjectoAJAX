# Javascript AJAX: REST

- [REST](#rest) 

- [Javascript - AJAX](#javascript-ajax) 

- [Current State](#current-state) 

- [Data for decision support](#data-for-decision-support) 

- [Options considered](#options-considered) 

- [POC](#poc) 

- [References](#references) 

- [Follow-up action items](#follow-up-action-items) 

##REST  

REST (Representational State Transfer) es un estilo arquitectónico para definir servicios web que sean simples, escalables y eficientes. En el contexto de la web, REST utiliza URIs (Identificadores de Recursos Uniformes) para identificar recursos y el protocolo HTTP para realizar llamadas sobre esos recursos(GET, POST, PUT y DELETE,principalmente). Esto permite una comunicación cliente-servidor donde el cliente puede solicitar y manipular datos al servidor de manera uniforme. 

Resumiendo, REST sería la tecnología con la que vamos a dessarrollar las APIs que estén preparadas para recibir las solicitudes que necesitemos.

## Javascript - AJAX 

JavaScript y AJAX (JavaScript asíncrono y XML) están estrechamente relacionados con REST en el desarrollo de aplicaciones web. JavaScript es un lenguaje de programación que se ejecuta en el navegador del cliente, lo que le permite interactuar con los recursos en un servidor a través de solicitudes HTTP.

AJAX no es un lenguaje de programación, es una técnica que utiliza JavaScript para realizar solicitudes HTTP asíncronas desde el navegador hacia el servidor sin necesidad de recargar la página completa. Esto permite que las aplicaciones web actualicen dinámicamente el contenido sin interrumpir la experiencia del usuario, ya que cuando hacemos una solicitud esperamos una respuesta, y esta respuesta puede tardar en llegar. Si no hacemos que nuestro código sea asíncrono, bloquearíamos durante todo ese rato nuestra página, ya que no permitiríamos más de un hilo de ejecución y no podría continuar leyendo nuestro código hasta recibir la respuesta que espera.

Normalmente se utiliza AJAX también acompañado de frameworks como Vue y React para aprovechar el dinamismo que le da la asincronía a la página, y permitiéndonos por ejemplo con estos dos frameworks que usan componentes, hacer que cada componente de la página cargue independientemente del otro.

A continuación, muestro un ejemplo básico de uso de AJAX en Javascript.
El siguiente código realiza una solicitud GET asíncrona a la ruta "https://api.example.com/data", espera a que la solicitud se complete, analiza la respuesta JSON del servidor y la muestra en la consola del navegador:

![Codigo](img/1.jpg)


## Current State 

## Data for decision support 

## Options considered 
