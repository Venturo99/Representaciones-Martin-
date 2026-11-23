require("dotenv").config();
const mysql = require("mysql2/promise");

(async () => {
  const db = await mysql.createConnection({
    host: process.env.TIDB_HOST,
    port: process.env.TIDB_PORT,
    user: process.env.TIDB_USER,
    password: process.env.TIDB_PASSWORD,
    database: process.env.TIDB_DATABASE,
    ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },
  });
  const [rows] = await db.query("SHOW TABLES");
  console.log("Conexión OK. Tablas:", rows);
  await db.end();
})().catch((e) => console.error("Error:", e.message));
