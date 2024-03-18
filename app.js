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


let dbConnection = fs.readFileSync('dbConnection.json');
const client = new Client(JSON.parse(dbConnection));


client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL', err));


app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
app.disable('x-powered-by');

app.get('/api/films', (req, res) => {
    client.query('SELECT * FROM film')
        .then(result => res.json(result.rows))
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).send('Error executing query');
        });
});

app.get('/api/films/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM film WHERE film_id = $1';

    client.query(query, [id])
        .then(result => {
            if (result.rows.length === 0) {
                
                res.status(404).json({ error: 'Película no encontrada.' });
            } else {
                
                res.json(result.rows[0]);
            }
        })
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error executing query' });
        });
});


app.delete('/api/films/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM film WHERE film_id = $1';

    client.query(query, [id])
        .then(() => {
            res.json({ message: 'Película eliminada correctamente.', status: 'success' });
            
        })
        .catch(err => {
            console.error('Error executing query', err);
            res.json({ error: 'Error al eliminar la película.' });
            
        });
});


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


    const query = 'UPDATE film SET title = $1, description = $2, release_year = $3, language_id = $4, rental_rate = $5, length = $6, replacement_cost = $7, rating = $8 WHERE film_id = $9';
    const values = [title, description, release_year, language_id, rental_rate, length, replacement_cost, rating, film_id];

    client.query(query, values)
        .then(result => {
            res.json({ message: 'Película actualizada exitosamente.', status: 'success' });
        })
        .catch(error => {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar la película.' });
        });
});



