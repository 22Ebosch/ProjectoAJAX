//import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
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


let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));

// --------COSAS PARA STAFF -------   
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'bhumlu-lite'));
app.use('/styles', express.static(path.join(__dirname, 'public/styles'), { type: 'text/css' }));
app.get('/staff', (req, res) => {
    res.sendFile(path.join(__dirname + '/bhumlu-lite/staff.html'));
});

// --------- MOSTRAR STAFF -----------
app.get('/api/staff', (req, res) => {
    client.query('SELECT * FROM staff')
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});

// -------- MOSTRAR TIENDAS -----------
app.get('/api/store', (req, res) => {
    client.query('SELECT * FROM store')
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});

// ----------- MOSTRAR DIRECCIONES ----------------
app.get('/api/address', (req, res) => {
    client.query('SELECT * FROM address')
        .then((result => res.json(result.rows)))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});

// ------- ELIMINAR STAFF ----------
app.delete('/api/staff/:id', (req, res) => {
    const { id } = req.params;
    const query1 = 'SELECT * FROM rental WHERE staff_id = $1';
    const query4 = 'DELETE FROM staff WHERE staff_id = $1';

    client.query(query1, [id])
        .then(result => {
            if(result.rows.length > 0){
                res.json({message: 'No se puede eliminar porque tiene ventas registradas', status: 'error'});
            } else {
                client.query(query4, [id])
                    .catch(err => console.error('Error ejecutando la consulta', err))
                    .finally(() => {
                        res.json({message: 'El miembro del personal ha sido eliminado correctamente', status: 'success'});
                    });
            }
        })
        .catch(err => {
            console.error('Error ejecutando la consulta', err)
            res.json({ error: 'Error al eliminar.'})
        });
});

// ------------ AÑADIR STAFF -------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/api/staff', (req, res) => {
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const address_id = req.body.address_id;
    const email = req.body.email;
    const store_id = req.body.store_id;
    const username = req.body.username;
    const password = req.body.password; // La contraseña sin hash

    // Resto del código para insertar en la base de datos
    const query = 'INSERT INTO staff (first_name, last_name, address_id, email, store_id, active, username, password) VALUES ($1, $2, $3, $4, $5, true, $6, $7)';
    const values = [firstname, lastname, address_id, email, store_id, username, password]; // Utiliza la contraseña sin hash directamente

    client.query(query, values)
        .then((result => res.json({ message: 'staff añadido exitosamente.', status: 'success' })))
        .catch(error => {
            console.error('Error ejecutando la consulta', error);
            res.json({ error: 'Error al añadir 2.'});
        });
});



// --------- TRAE LOS DATOS PARA ACTUALIZAR -----------
app.get('/api/staff/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM staff WHERE staff_id = $1';

    client.query(query, [id])
        .then(result => {
            if (result.rows.length === 0) {
                res.status(404).json({ error: 'Miembro del personal no encontrado' });
            } else {
                res.json(result.rows[0]);
            }
        })
        .catch(error => {
            console.error('Error al obtener el miembro del personal:', error);
            res.status(500).json({ error: 'Error al obtener el miembro del personal' });
        });
});


app.put('/api/staff/', (req, res) => {
    const staff_id = req.body.staff_id;
    const firstname = req.body.first_name;
    const lastname = req.body.last_name;
    const address_id = req.body.address_id;
    const email = req.body.email;
    const store_id = req.body.store_id;
    const username = req.body.username;
    // const password = req.body.password;
    // const customer_id = req.body.customer_id;
    // const store_id = req.body.store_id;
    // const firstname = req.body.first_name;
    // const lastname = req.body.last_name;
    // const email = req.body.email;
    // const address_id = req.body.address_id;

    const query = 'UPDATE staff SET staff_id = $1, first_name = $2, last_name = $3, address_id = $4, email = $5, store_id = $6, username = $7 WHERE staff_id = $1';
    const values = [staff_id, firstname, lastname, address_id, email, store_id, username];

    client.query(query, values)
    .then((result => res.json({ message: 'Cliente actualizado exitosamente.', status: 'succes' })))
        .catch(error => {
            console.error('Error executing query', error);
            res.json({ error: 'Error al añadir.'});
        });
});
