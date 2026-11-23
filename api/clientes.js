const db = require("./db");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const [rows] = await db.query(
        "SELECT * FROM clientes ORDER BY nombre_razon_social ASC",
      );
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const {
        tipo_documento,
        numero_documento,
        nombre_razon_social,
        telefono,
        email,
        direccion,
      } = req.body;
      await db.query(
        "INSERT INTO clientes (tipo_documento, numero_documento, nombre_razon_social, telefono, email, direccion) VALUES (?, ?, ?, ?, ?, ?)",
        [
          tipo_documento,
          numero_documento,
          nombre_razon_social,
          telefono,
          email,
          direccion,
        ],
      );
      return res.status(201).json({ success: true });
    }

    if (req.method === "PUT") {
      const {
        id,
        tipo_documento,
        numero_documento,
        nombre_razon_social,
        telefono,
        email,
        direccion,
      } = req.body;
      await db.query(
        "UPDATE clientes SET tipo_documento=?, numero_documento=?, nombre_razon_social=?, telefono=?, email=?, direccion=? WHERE id=?",
        [
          tipo_documento,
          numero_documento,
          nombre_razon_social,
          telefono,
          email,
          direccion,
          id,
        ],
      );
      return res.status(200).json({ success: true });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      await db.query("DELETE FROM clientes WHERE id = ?", [id]);
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
