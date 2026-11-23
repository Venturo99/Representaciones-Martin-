const db = require("./_db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const [rows] = await db.query(
      "SELECT id, nombre, email, password, rol, avatar, color, estado FROM usuarios WHERE email = ?",
      [email],
    );
    const user = rows[0];
    const ok =
      user &&
      user.estado === "Activo" &&
      (await bcrypt.compare(password, user.password));

    if (!ok) {
      return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    }

    await db.query(
      "INSERT INTO bitacora (usuario_id, modulo, accion, detalle) VALUES (?, 'Login', 'Ingreso', ?)",
      [user.id, `Inicio de sesión de ${user.email}`],
    );

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      {
        expiresIn: "8h",
      },
    );
    delete user.password;
    res.json({ token, usuario: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error del servidor" });
  }
};
