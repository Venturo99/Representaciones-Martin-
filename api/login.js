const db = require("./db");

module.exports = async (req, res) => {
  // 1. Configurar CORS para que tu HTML pueda conectarse
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 2. Manejar la petición preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 3. Solo permitir POST
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Método no permitido" });
  }

  const { email, password } = req.body;

  try {
    // 4. Buscar al usuario en MySQL
    // NOTA: En producción real, las contraseñas deben estar encriptadas (bcrypt).
    // Por ahora usamos texto plano porque así las guardamos en nuestro script SQL.
    const [rows] = await db.query(
      'SELECT id, nombre, email, rol, avatar, color FROM usuarios WHERE email = ? AND password = ? AND estado = "Activo"',
      [email, password],
    );

    if (rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Credenciales incorrectas o cuenta inactiva",
      });
    }

    const user = rows[0];

    // 5. Devolver el éxito
    return res.status(200).json({
      success: true,
      message: "Login exitoso",
      user: user,
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};
