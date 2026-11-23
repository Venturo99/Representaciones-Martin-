const db = require("./api/_db");
const bcrypt = require("bcryptjs");

(async () => {
  const [users] = await db.query("SELECT id, password FROM usuarios");
  for (const u of users) {
    if (u.password.startsWith("$2")) continue; // ya cifrada
    const hash = await bcrypt.hash(u.password, 10);
    await db.query("UPDATE usuarios SET password = ? WHERE id = ?", [
      hash,
      u.id,
    ]);
  }
  console.log("Contraseñas cifradas");
  process.exit(0);
})();
