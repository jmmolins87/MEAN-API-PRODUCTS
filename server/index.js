

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// * Creamos el servidor
const app = express();

// * Conectamos a la base de datos
connectDB();
app.use( cors() );
app.use( express.json({ extended: true }));
app.use('/api/products', require('./routes/product'));

app.listen(4000, () => {
    console.log('Servidor iniciado');
});