const sql = require('mssql');

// Configuración de la conexión a SQL Server
const sqlConfig = {
    user: process.env.DB_USER || 'sa', 
    password: process.env.DB_PASSWORD || '123', 
    database: process.env.DB_NAME || 'LoginPP',
    server: process.env.DB_SERVER || 'ADMIN_CYBER\\FACTURACION',
    options: {
        encrypt: true, 
        trustServerCertificate: true  
    }
};

// Conectar a la base de datos
const poolPromise = new sql.ConnectionPool(sqlConfig)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar a SQL Server:', err);
    });

module.exports = {
    sql,
    poolPromise
};