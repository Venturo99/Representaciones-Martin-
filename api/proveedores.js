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
        "SELECT * FROM proveedores ORDER BY razon_social ASC",
      );
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { ruc, razon_social, contacto, telefono, categoria } = req.body;
      await db.query(
        "INSERT INTO proveedores (ruc, razon_social, contacto, telefono, categoria) VALUES (?, ?, ?, ?, ?)",
        [ruc, razon_social, contacto, telefono, categoria],
      );
      return res.status(201).json({ success: true });
    }

    // Aquí irían PUT y DELETE de forma similar...
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
