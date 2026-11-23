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
    // GET: Listar todos los productos
    if (req.method === "GET") {
      const [rows] = await db.query(
        "SELECT * FROM productos ORDER BY nombre ASC",
      );
      return res.status(200).json(rows);
    }

    // POST: Crear un nuevo producto
    if (req.method === "POST") {
      const {
        codigo,
        nombre,
        categoria,
        precio,
        stock,
        stock_minimo,
        unidad_medida,
      } = req.body;
      const [result] = await db.query(
        "INSERT INTO productos (codigo, nombre, categoria, precio, stock, stock_minimo, unidad_medida) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [codigo, nombre, categoria, precio, stock, stock_minimo, unidad_medida],
      );
      return res.status(201).json({ success: true, id: result.insertId });
    }

    // PUT: Editar un producto existente
    if (req.method === "PUT") {
      const {
        id,
        codigo,
        nombre,
        categoria,
        precio,
        stock,
        stock_minimo,
        unidad_medida,
      } = req.body;
      await db.query(
        "UPDATE productos SET codigo=?, nombre=?, categoria=?, precio=?, stock=?, stock_minimo=?, unidad_medida=? WHERE id=?",
        [
          codigo,
          nombre,
          categoria,
          precio,
          stock,
          stock_minimo,
          unidad_medida,
          id,
        ],
      );
      return res
        .status(200)
        .json({ success: true, message: "Producto actualizado" });
    }

    // DELETE: Eliminar un producto
    if (req.method === "DELETE") {
      const { id } = req.query; // Se pasa como ?id=1
      await db.query("DELETE FROM productos WHERE id = ?", [id]);
      return res
        .status(200)
        .json({ success: true, message: "Producto eliminado" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
