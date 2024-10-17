
const express = require('express');
const { poolPromise } = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { usuario, contrasenia } = req.body;

    try {
        const pool = await poolPromise;

        const query = `SELECT * FROM LoginPp WHERE usuario = @usuario`;
        const result = await pool.request()
            .input('usuario', usuario)
            .query(query);

        const user = result.recordset[0];

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (contrasenia !== user.contrasenia) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Inicio de sesión exitoso' });
    } catch (err) {
        console.error('Error al iniciar sesión:', err);
        res.status(500).json({ message: 'Error al iniciar sesión', error: err.message });
    }
});

module.exports = router;
