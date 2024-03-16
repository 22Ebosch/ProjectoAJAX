function eliminarCliente(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este cliente?")) {
        fetch(`/api/customer/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar el cliente');
            }
            return response.json();
        })
        .then(data => {
            alert(data.message); // Manejar la respuesta del servidor
            location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar el cliente:', error);
            // Manejar el error de eliminación del cliente
        });
    }
}
function añadirCliente(){
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Realizar una solicitud POST al servidor
    fetch('/api/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            store_id: document.getElementById('store_id').value,
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            address_id: document.getElementById('address_id').value
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al procesar la solicitud.');
    });
};
function actualizarCliente(){
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    // Realizar una solicitud PUT al servidor
    fetch('/api/customer', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            customer_id: document.getElementById('customer_idA').value,
            store_id: document.getElementById('store_idA').value,
            first_name: document.getElementById('first_nameA').value,
            last_name: document.getElementById('last_nameA').value,
            email: document.getElementById('emailA').value,
            address_id: document.getElementById('address_idA').value
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al procesar la solicitud.');
    });
};
function mostrarForm(){
    form.style.display = 'flex';
}
function mostrarForm2(id){
    formAct.style.display = 'flex';
    fetch(`/api/customer/${id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al cargar los datos del miembro del personal');
                    }
                    return response.json();
                })
                .then(data => {
                    // Rellenar los campos del formulario con los datos obtenidos
                    document.getElementById('customer_idA').value = data.customer_id;
                    document.getElementById('store_idA').value = data.store_id;
                    document.getElementById('first_nameA').value = data.first_name;
                    document.getElementById('last_nameA').value = data.last_name;
                    document.getElementById('emailA').value = data.email;
                    document.getElementById('address_idA').value = data.address_id; 
                })
                .catch(error => {
                    console.error('Error al cargar los datos del cliente.', error);
                    alert('Error al cargar los datos del cliente.');
                });
    //document.getElementById('customer_idA').value = customer_id;
    //document.getElementById('store_idA').value = store_id;
    //document.getElementById('first_nameA').value = first_name;
    // document.getElementById('last_nameA').value = last_name;
    // document.getElementById('emailA').value = email;
    //document.getElementById('address_idA').value = address_id;
}
function cancelarForm(){
    let form = document.getElementById('formCrear');
    form.style.display = 'none';
}
function cancelarForm2(){
    let form = document.getElementById('formAct');
    form.style.display = 'none';
}

let boton = document.getElementById('crear');
let cancelar2 = document.getElementById('cancelar2');
let cancelar3 = document.getElementById('cancelar3');
let form = document.getElementById('formCrear');
let form2 = document.getElementById('formCrear2');
let formAct = document.getElementById('formAct');
let formAct2 = document.getElementById('formAct2');
boton.addEventListener('click',mostrarForm);
cancelar2.addEventListener('click',cancelarForm);
cancelar3.addEventListener('click',cancelarForm2);
form2.addEventListener('submit',añadirCliente);
formAct2.addEventListener('submit',actualizarCliente);

    fetch('/api/customer')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de conexion.');
            }
            return response.json();
        })
        .then(customers => {
            customers.forEach(customer => {
                let tr = document.createElement("tr");
                tr.id = customer.customer_id;
                tr.innerHTML = '<td>'+customer.customer_id+'</td>';
                tr.innerHTML += '<td>'+customer.store_id+'</td>';
                tr.innerHTML += '<td>'+customer.first_name+'</td>';
                tr.innerHTML += '<td>'+customer.last_name+'</td>';
                tr.innerHTML += '<td>'+customer.email+'</td>';
                tr.innerHTML += '<td><img src="img/borrar.png" alt="Borrar" style="width:20px;" onclick="eliminarCliente('+customer.customer_id+')"><img src="img/actualizar.png" alt="Actualizar" style="width:20px;" onclick="mostrarForm2(' + customer.customer_id + ')"></td>';
                document.getElementById('tbody').appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar los clientes:', error);
        });

        fetch('/api/store')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de conexion.');
            }
            return response.json();
        })
        .then(stores => {
            stores.forEach(store => {
                let option1 = document.createElement("option");
                let option2 = document.createElement("option");

                option1.value = store.store_id;
                option1.innerHTML = store.store_id;

                option2.value = store.store_id;
                option2.innerHTML = store.store_id;

                document.getElementById('store_id').appendChild(option1);
                document.getElementById('store_idA').appendChild(option2);
            });
        })
        .catch(error => {
            console.error('Error al cargar los clientes:', error);
        });

        fetch('/api/address')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error de conexion.');
            }
            return response.json();
        })
        .then(addresses => {
            addresses.forEach(address => {
                let option1 = document.createElement("option");
            let option2 = document.createElement("option");
            
            // Establecer los atributos value e innerHTML para cada opción
            option1.value = address.address_id;
            option1.innerHTML = address.address;
            
            option2.value = address.address_id;
            option2.innerHTML = address.address;
            
            // Agregar las opciones a los elementos select correspondientes
            document.getElementById('address_id').appendChild(option1);
            document.getElementById('address_idA').appendChild(option2);
            });
        })
        .catch(error => {
            console.error('Error al cargar los clientes:', error);
        });
    
function validarEmail(email) {
    // Patrón para validar el formato de correo electrónico
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return patron.test(email);
}
function inputEmail(e){
    const emailInput = e.target;
    const email = emailInput.value;

    // Verificar si el correo electrónico es válido
    if (!validarEmail(email)) {
        emailInput.setCustomValidity('Por favor, introduce una dirección de correo electrónico válida.');
    } else {
        emailInput.setCustomValidity('');
    }
}
document.getElementById('email').addEventListener('input', inputEmail);
document.getElementById('emailA').addEventListener('input', inputEmail);