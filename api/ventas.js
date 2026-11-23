const db = require("./db");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ success: false, message: "Método no permitido" });

  const {
    cliente_id,
    usuario_id,
    tipo_comprobante,
    numero_comprobante,
    subtotal,
    igv,
    total,
    metodo_pago,
    detalles,
  } = req.body;

  let conn;
  try {
    conn = await db.getConnection();
    await conn.beginTransaction(); // Iniciar transacción

    // 1. Insertar Cabecera de Venta
    const [ventaResult] = await conn.query(
      "INSERT INTO ventas (cliente_id, usuario_id, tipo_comprobante, numero_comprobante, subtotal, igv, total, metodo_pago) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        cliente_id || null,
        usuario_id,
        tipo_comprobante,
        numero_comprobante,
        subtotal,
        igv,
        total,
        metodo_pago,
      ],
    );
    const ventaId = ventaResult.insertId;

    // 2. Insertar Detalles y Descontar Stock
    for (let item of detalles) {
      // Guardar detalle
      await conn.query(
        "INSERT INTO venta_detalles (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)",
        [
          ventaId,
          item.producto_id,
          item.cantidad,
          item.precio_unitario,
          item.cantidad * item.precio_unitario,
        ],
      );

      // Descontar stock (Validando que no quede negativo)
      const [stockRows] = await conn.query(
        "SELECT stock FROM productos WHERE id = ? FOR UPDATE",
        [item.producto_id],
      );
      if (stockRows[0].stock < item.cantidad) {
        throw new Error(
          `Stock insuficiente para el producto ID ${item.producto_id}`,
        );
      }
      await conn.query("UPDATE productos SET stock = stock - ? WHERE id = ?", [
        item.cantidad,
        item.producto_id,
      ]);
    }

    await conn.commit(); // Guardar cambios
    res
      .status(201)
      .json({ success: true, message: "Venta registrada con éxito", ventaId });
  } catch (error) {
    if (conn) await conn.rollback(); // Cancelar todo si hay error
    res.status(500).json({ success: false, message: error.message });
  } finally {
    if (conn) conn.release();
  }
};
