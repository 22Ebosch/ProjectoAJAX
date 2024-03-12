//import express from 'express';
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3334;
const {Client} = require('pg'); 
const path = require('path');


app.use(express.static('bhumlu-lite')); 

app.listen(PORT,()=>{
    console.log('listening on port ' + PORT);
});
app.disable('x-powered-by');

//GET

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/bhumlu-lite/index.html'));
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'bhumlu-lite'));
app.get('/films', (req, res) => {
    client.query('SELECT * FROM film')
    .then(result => res.render('films', { film: result.rows }))
    .catch(error => {
        console.error('Error ejecutando la consulta', error);
        res.status(500).send('Error ejecutando la consulta');
    });
});

//DELETE

app.get('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM film_actor WHERE film_id = $1';
    const query2 = 'DELETE FROM film_category WHERE film_id = $1';
    const query3 = 'DELETE FROM inventory WHERE film_id = $1';
    const query4 = 'DELETE FROM film WHERE film_id = $1';

    client.query(query, [id])
        .then()
        .catch(err => console.error('Error ejecutando la consulta', err));

        client.query(query2, [id])
        .then()
        .catch(err => console.error('Error ejecutando la consulta', err));
        client.query(query3, [id])
        .then()
        .catch(err => console.error('Error ejecutando la consulta', err));
        client.query(query4, [id])
        .then(() => res.redirect('/films'))
        .catch(err => console.error('Error ejecutando la consulta', err));
});

let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));