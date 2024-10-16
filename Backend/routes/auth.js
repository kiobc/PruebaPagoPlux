// /routes/auth.js
const express = require('express');
const { poolPromise } = require('../config/db');
const router = express.Router();

// Iniciar sesión sin token
router.post('/login', async (req, res) => {
    const { usuario, contrasenia } = req.body;

    try {
        // Verificar que el pool de conexiones esté funcionando
        const pool = await poolPromise;

        // Buscar el usuario en la base de datos
        const query = `SELECT * FROM LoginPp WHERE usuario = @usuario`;
        const result = await pool.request()
            .input('usuario', usuario)
            .query(query);

        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña comparando en texto plano (sin bcrypt)
        if (contrasenia !== user.contrasenia) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, se devuelve un mensaje de éxito
        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
    }
});

module.exports = router;
