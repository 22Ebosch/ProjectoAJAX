const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3334;
const { Client } = require('pg');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('bhumlu-lite'));

// Lee la configuración de la base de datos desde el archivo
let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));

// Conecta el cliente a la base de datos
client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));

// Escucha en el puerto especificado
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
app.disable('x-powered-by');

// Ruta para obtener todos los films
app.get('/api/films', (req, res) => {
    client.query('SELECT * FROM film')
        .then(result => res.json(result.rows))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});
// Ruta para obtener una sola película por ID
app.get('/api/films/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM film WHERE film_id = $1';

    client.query(query, [id])
        .then(result => {
            if (result.rows.length === 0) {
                // Si no se encuentra la película, devolver un 404
                res.status(404).json({ error: 'Película no encontrada.' });
            } else {
                // Si se encuentra la película, devolverla como JSON
                res.json(result.rows[0]);
            }
        })
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error executing query' });
        });
});

// Ruta para eliminar un film por ID
app.delete('/api/films/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM film WHERE film_id = $1';

    client.query(query, [id])
        .then(() => res.redirect('/films'))
        .catch(err => console.error('Error executing query', err));
});

// Ruta para agregar un film
app.post('/api/films', (req, res) => {
    const { title, description, release_year, language_id, rental_rate, length, replacement_cost, rating, special_features } = req.body;

    const query = `
        INSERT INTO film (title, description, release_year, language_id, rental_rate, length, replacement_cost, rating, special_features)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    `;
    const values = [title, description, release_year, language_id, rental_rate, length, replacement_cost, rating, special_features];

    client.query(query, values)
        .then(() => res.json({ message: 'Película añadida exitosamente.', status: 'success' }))
        .catch(error => {
            console.error('Error executing query', error);
            res.json({ error: 'Error al añadir la película.' });
        });
});

// Ruta para servir el archivo HTML de films
app.get('/films', (req, res) => {
    res.sendFile(path.join(__dirname, '/bhumlu-lite/films.html'));
});

app.put('/api/films', (req, res) => {
    const film_id = req.body.film_id;
    const title = req.body.title;
    const description = req.body.description;
    const release_year = req.body.release_year;
    const language_id = req.body.language_id;
    const rental_rate = req.body.rental_rate;
    const length = req.body.length;
    const replacement_cost = req.body.replacement_cost;
    const rating = req.body.rating;
    const special_features = req.body.special_features;

    const query = 'UPDATE film SET film_id = $1, title = $2, description = $3, release_year = $4, language_id = $5, rental_rate = $6, length = $7, replacement_cost = $8, rating = $9, special_features = $10 WHERE film_id = $1';
    const values = [ film_id,title, description, release_year, language_id, rental_rate, length, replacement_cost, rating, special_features];

    client.query(query, values)
        .then(result => {
            res.json({ message: 'Película actualizada exitosamente.', status: 'success' });
        })
        .catch(error => {
            console.error('Error executing query', error);
            res.json({ error: 'Error al actualizar la película.'});
        });
});