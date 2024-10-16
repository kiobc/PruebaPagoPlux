const sql = require('mssql');

// Configuración de la conexión a SQL Server (usando variables de entorno)
const sqlConfig = {
    user: process.env.DB_USER || 'sa', 
    password: process.env.DB_PASSWORD || '123', // ¡No recomendado en producción!
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
        // Aquí puedes agregar un manejo de errores más robusto
    });

module.exports = {
    sql,
    poolPromise
};