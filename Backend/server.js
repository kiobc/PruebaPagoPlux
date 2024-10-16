// /server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment'); 

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
  });
  
