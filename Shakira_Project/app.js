const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3334;
const { Client } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');

// Configuración del motor de plantillas EJS
app.use(express.static('bhumlu-lite')); // La carpeta donde se encuentran tus vistas

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
app.disable('x-powered-by');
//vista del inidex
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/bhumlu-lite/index.html'));
});
//vista de clientes
app.get('/customer', (req, res) => {
    res.sendFile(path.join(__dirname + '/bhumlu-lite/customers.html'));
});
//obtener todos los clientes
const itemsPerPage = 15;
app.get('/api/customer', (req, res) => {
    const page = req.query.page || 1;
    const offset = (page - 1) * itemsPerPage;
    const query = {
        text: 'SELECT * FROM customer OFFSET $1 LIMIT $2',
        values: [offset, itemsPerPage]
    };

    client.query(query)
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});
app.get('/api/customer/count', (req, res) => {
    // Consulta SQL para contar el número total de registros
    client.query('SELECT COUNT(*) FROM customer')
        .then(result => {
            const count = parseInt(result.rows[0].count); // Obtener el recuento de la respuesta y convertirlo a entero
            res.json({ count }); // Devolver el recuento en formato JSON
        })
        .catch(error => {
            console.error('Error executing query', error); // Manejar errores de consulta
            res.status(500).send('Error executing query'); // Devolver un error HTTP 500 si hay un problema
        });
});
//obtener datos de cliente
app.get('/api/customer/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM customer WHERE customer_id = $1';
    client.query(query, [id])
        .then((result => res.json(result.rows[0])))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});
//obtener tiendas
app.get('/api/store', (req, res) => {
    client.query('SELECT * FROM store')
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});
//obtener direcciones
app.get('/api/address', (req, res) => {
    client.query('SELECT * FROM address')
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//crear cliente
app.post('/api/customer', (req, res) => {
    const store_id = req.body.store_id;
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const email = req.body.email;
    const address_id = req.body.address_id;

    const query = 'INSERT INTO customer (store_id, first_name, last_name, email, address_id, active) VALUES ($1, $2, $3, $4, $5, 1)';
    const values = [store_id, firstname, lastname, email, address_id];

    client.query(query, values)
    .then((result => res.json({ message: 'Cliente añadido exitosamente.', status: 'succes' })))
        .catch(error => {
            console.error('Error executing query', error);
            res.json({ error: 'Error al añadir.'});
        });
});
//actualizar cliente
app.put('/api/customer', (req, res) => {
    const customer_id = req.body.customer_id;
    const store_id = req.body.store_id;
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const email = req.body.email;
    const address_id = req.body.address_id;

    const query = 'UPDATE customer SET customer_id = $1, store_id = $2, first_name = $3, last_name = $4, email = $5, address_id = $6 WHERE customer_id = $1';
    const values = [customer_id, store_id, firstname, lastname, email, address_id];

    client.query(query, values)
    .then((result => res.json({ message: 'Cliente actualizado exitosamente.', status: 'succes' })))
        .catch(error => {
            console.error('Error executing query', error);
            res.json({ error: 'Error al añadir.'});
        });
});
//eliminar cliente
app.delete('/api/customer/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT FROM rental WHERE customer_id = $1';
    const query2 = 'DELETE FROM customer WHERE customer_id = $1';

    client.query(query, [id])
        .then(result => {
            if (result.rows.length > 0) {
                res.json({ message: 'No se puede eliminar porque tiene compras registradas.', status: 'error' });
            } else {
                client.query(query2, [id])
                    .catch(err => console.error('Error ejecutando la consulta.', err))
                    .finally(() => {
                        res.json({ message: 'El cliente ha sido eliminado correctamente.', status: 'success' });
                    });
            }
        })
        .catch(err => {
            console.error('Error ejecutando la consulta', err)
            res.json({ error: 'Error al eliminar.'})
        });
});
//conexion BBDD
let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));