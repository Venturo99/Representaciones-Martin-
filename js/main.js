/**
 * Main.js - Punto de entrada simplificado
 */
const App = {
  container: null,

  loadModule: async (path, initCallback) => {
    try {
      console.log(`📥 Cargando módulo: ${path}`);
      const response = await fetch(path);
      if (!response.ok) throw new Error(`No se pudo cargar ${path}`);

      const html = await response.text();
      App.container.innerHTML = html;
      console.log(`✅ HTML de ${path} inyectado.`);

      setTimeout(() => {
        if (initCallback) initCallback();
      }, 50);
    } catch (error) {
      console.error("❌ Error al cargar módulo:", error);
      App.container.innerHTML = `<p style="text-align:center;color:red;padding:20px;">Error al cargar ${path}</p>`;
    }
  },

  goToLogin: () => {
    console.log("➡️ Navegando al LOGIN...");
    App.loadModule("./modules/login.html", () => {
      if (typeof AuthModule !== "undefined") {
        AuthModule.init();
      }
    });
  },

  goToDashboard: () => {
    console.log("➡️ Navegando al DASHBOARD...");
    App.loadModule("./modules/dashboard.html", () => {
      if (typeof DashboardModule !== "undefined") {
        DashboardModule.init();
      }
    });
  },

  logout: () => {
    sessionStorage.clear();
    App.goToLogin();
  },

  init: () => {
    App.container = document.getElementById("app-container");
    console.log("🚀 Iniciando Sistema de Inventarios Martín...");

    if (sessionStorage.getItem("userRole")) {
      App.goToDashboard();
    } else {
      App.goToLogin();
    }
  },
};

document.addEventListener("DOMContentLoaded", App.init);

console.log("🔐 Roles disponibles para prueba:");
console.log("   - superadmin@martin.com / Admin123!");
console.log("   - almacen@martin.com / Almacen123!");
console.log("   - vendedor@martin.com / Vendedor123!");
console.log("   - gerente@martin.com / Gerente123!");
