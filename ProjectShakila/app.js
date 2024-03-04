//import express from 'express';
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3306;
const {Client} = require('pg'); 

app.listen(PORT,()=>{
    console.log('listening on port' + PORT);
});
app.disable('x-powered-by');
app.get('/', (req, res) => {
    client.query('SELECT * FROM customer where customer_id = 8')
    .then((result => res.json(result.rows)))
    .catch(error => {
        console.error('Error executing query', error);
        res.status(500).send('Error executing query');
    });
});
let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));
