const express = require('express');
const router = express.Router();
const { createPaymentLink, checkTransactionStatus } = require('../controllers/paymentController');

router.post('/create-payment-link', createPaymentLink);

router.get('/transaction-status/:transactionId', checkTransactionStatus);

module.exports = router;
