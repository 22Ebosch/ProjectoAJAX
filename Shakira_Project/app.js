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


let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));

// COSAS PARA STAFF    
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'bhumlu-lite'));
app.get('/staff', (req, res) => {
    client.query('SELECT * FROM staff')
        .then(result => res.render('staff', { staff: result.rows }))
        .catch(error => {
            console.error('Error ejecutando la consulta', error);
            res.status(500).send('Error ejecutando la consulta');
        });
});

app.get('/eliminarStaff/:id', (req, res) => {
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
        .catch(err => console.error('Error ejecutando la consulta', err));
});