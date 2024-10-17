
const axios = require('axios'); 

const createPaymentLink = async (req, res) => {
    const { montoCero, monto12, whatsapp, descripcion, ci, direccion, nombrePago, emailPago, telefono } = req.body;

    try {
        const response = await axios.post(
            'https://sandbox-api.pagoplux.com/intv1/integrations/createTransactionWhatsappResource',
            {
                montoCero,
                monto12,
                whatsapp,
                descripcion,
                ci,
                direccion,
                nombrePago,
                emailPago,
                telefono
            },
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('o3NXHGmfujN3Tyzp1cyCDu3xst:TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT').toString('base64'),
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el enlace de pago', error: error.message });
    }
};

const checkTransactionStatus = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const response = await axios.get(
            `https://sandbox-api.pagoplux.com/intv1/integrations/getTransactionByIdStateResource?idTransaction=${transactionId}`,
            {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from('o3NXHGmfujN3Tyzp1cyCDu3xst:TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT').toString('base64'),
                    'Content-Type': 'application/json'
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar el estado de la transacción', error: error.message });
    }
};

module.exports = { createPaymentLink, checkTransactionStatus };
