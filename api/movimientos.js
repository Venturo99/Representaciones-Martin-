const db = require("./db");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    if (req.method === "GET") {
      const [rows] = await db.query(
        "SELECT m.*, p.nombre as producto FROM movimientos m JOIN productos p ON m.producto_id = p.id ORDER BY m.created_at DESC",
      );
      return res.status(200).json(rows);
    }

    if (req.method === "POST") {
      const { producto_id, tipo, cantidad, motivo, observaciones, usuario_id } =
        req.body;

      const conn = await db.getConnection();
      await conn.beginTransaction();

      // 1. Registrar Movimiento
      await conn.query(
        "INSERT INTO movimientos (producto_id, tipo, cantidad, motivo, observaciones, usuario_id) VALUES (?, ?, ?, ?, ?, ?)",
        [producto_id, tipo, cantidad, motivo, observaciones, usuario_id],
      );

      // 2. Actualizar Stock
      if (tipo === "entrada") {
        await conn.query(
          "UPDATE productos SET stock = stock + ? WHERE id = ?",
          [cantidad, producto_id],
        );
      } else if (tipo === "salida") {
        await conn.query(
          "UPDATE productos SET stock = stock - ? WHERE id = ?",
          [cantidad, producto_id],
        );
      } else if (tipo === "ajuste") {
        await conn.query("UPDATE productos SET stock = ? WHERE id = ?", [
          cantidad,
          producto_id,
        ]);
      }

      await conn.commit();
      conn.release();
      return res
        .status(201)
        .json({ success: true, message: "Movimiento registrado" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
