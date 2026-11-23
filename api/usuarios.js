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
        "SELECT id, nombre, email, rol, estado FROM usuarios",
      );
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { nombre, email, password, rol, avatar, color } = req.body;
      await db.query(
        "INSERT INTO usuarios (nombre, email, password, rol, avatar, color) VALUES (?, ?, ?, ?, ?, ?)",
        [nombre, email, password, rol, avatar, color],
      );
      return res.status(201).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
