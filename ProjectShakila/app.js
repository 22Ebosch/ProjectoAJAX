//import express from 'express';
const express = require('express');
const app = express();
const PORT = 3306;
const {Client} = require('pg'); 

app.listen(PORT,()=>{
    console.log('listening on port' + PORT);
});
app.disable('x-powered-by');
app.get('/', (req, res) => {
    res.send('hola');
});

const client = new Client({
    host:'localhost',
    user:'postgres',
    port:'5433',
    password:'Alubbdd',
    database:'sakila'
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));
