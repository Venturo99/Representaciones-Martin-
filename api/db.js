const mysql = require("mysql2");

// Configuramos la conexión usando las variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // ⭐ MUY IMPORTANTE: La mayoría de bases de datos en la nube requieren SSL
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool.promise();
