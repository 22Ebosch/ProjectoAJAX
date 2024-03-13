// //import express from 'express';
// const express = require('express');
// const fs = require('fs');
// const app = express();
// const PORT = 3334;
// const {Client} = require('pg'); 
// const path = require('path');

// // Configuración del motor de plantillas EJS
// app.set('view engine', 'ejs');
// app.use(express.static('bhumlu-lite')); // La carpeta donde se encuentran tus vistas

// app.listen(PORT,()=>{
//     console.log('listening on port ' + PORT);
// });
// app.disable('x-powered-by');

// app.get('/', (req, res) => {
//     client.query('SELECT * FROM film where film_id = 1')
//     .then((result => res.json(result.rows)))
//     .catch(error => {
//         console.error('Error executing query', error);
//         res.status(500).send('Error executing query');
//     });
// });

// app.get('/home', (req, res) => {
//     res.sendFile(path.join(__dirname + '/bhumlu-lite/index.html'));
// });

// app.get('/customers', (req, res) => {
//     res.sendFile(path.join(__dirname + '/bhumlu-lite/customers.html'));
// });
// app.get('/customers', (req, res) => {
//     client.query('SELECT * FROM customer') // Cambia 'customers' a 'customer' aquí
//         .then(result => {
//             const customers = result.rows;
//             res.render('customers', { customers }); // Renderiza la plantilla 'customers.html' con los datos de los clientes
//         })
//         .catch(error => {
//             console.error('Error executing query', error);
//             res.status(500).send('Error executing query');
//         });
// });


// let dbConnection = fs.readFileSync('dbConnection.json');
// const client = new Client(JSON.parse(dbConnection));

// client.connect()
//     .then(() => console.log('Connected to PostgreSQL'))
//     .catch(err => console.error('Error connecting to PostgreSQL', err));

//     app.get('/customers', (req, res) => {
//         client.query('SELECT * FROM customer')
//         .then(result => res.render('customers', { customers: result.rows }))
//         .catch(error => {
//             console.error('Error ejecutando la consulta', error);
//             res.status(500).send('Error ejecutando la consulta');
//         });
//     });

//import express from 'express';
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3334;
const { Client } = require('pg');
const path = require('path');

// Configuración del motor de plantillas EJS
app.use(express.static('bhumlu-lite')); // La carpeta donde se encuentran tus vistas

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
app.disable('x-powered-by');

app.get('/', (req, res) => {
    client.query('SELECT * FROM film where film_id = 1')
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/bhumlu-lite/index.html'));
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'bhumlu-lite'));
app.use('/styles', express.static(path.join(__dirname, 'public/styles'), { type: 'text/css' }));

app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname + '/bhumlu-lite/customers.html'));
});
app.get('/api/customer', (req, res) => {
    client.query('SELECT * FROM customer')
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});

app.delete('/api/customer/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT FROM rental WHERE customer_id = $1';
    const query2 = 'DELETE FROM customer WHERE customer_id = $1';

    client.query(query, [id])
        .then(result => {
            if (result.rows.length > 0) {
                res.json({ message: 'No se puede eliminar porque tiene compras registradas', status: 'error' });
            } else {
                client.query(query2, [id])
                    .catch(err => console.error('Error ejecutando la consulta', err))
                    .finally(() => {
                        res.json({ message: 'El cliente ha sido eliminado correctamente', status: 'success' });
                    });
            }
        })
        .catch(err => {
            console.error('Error ejecutando la consulta', err)
            res.json({ error: 'Error al eliminar.'})
        });
});

app.get('/updateC/:id', (req, res) => {
    const { id } = req.params;
    //const query = 'SELECT * FROM customer WHERE customer_id = $1'; // Agrega * para seleccionar todos los campos

    client.query('SELECT * FROM customer WHERE customer_id = $1', [id])
        //.then(() => res.redirect('/updateCustomer'))
        .then(result => res.render('updateCustomer', { customers: result.rows }))
        .catch(err => console.error('Error ejecutando la consulta', err));
    // client.query(query, [id])
    //     .then(result => {
    //         const customer = result.rows[0]; // Como se espera solo un cliente, tomamos el primer resultado
    //         res.render('updateCustomer', { customer }); // Renderiza la vista 'updateCustomer.ejs' con la información del cliente
    //     })
    //     .catch(err => console.error('Error ejecutando la consulta', err));
});

let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));