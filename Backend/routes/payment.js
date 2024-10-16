// routes/payment.js
const express = require('express');
const router = express.Router();
const { createPaymentLink, checkTransactionStatus } = require('../controllers/paymentController');

// Ruta para crear el link de pago
router.post('/create-payment-link', createPaymentLink);

// Ruta para consultar el estado de la transacción
router.get('/transaction-status/:transactionId', checkTransactionStatus);

module.exports = router;
