const express = require('express');
const app = express();

// Ruta raíz
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

// Ruta saludo
app.get('/saludo', (req, res) => {
    res.send('¡Hola! ¿Cómo estás?');
});

// Asignacion de puerto y metodo listen
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});