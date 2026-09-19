/**
 * Router.js - Mini enrutador para cargar módulos dinámicamente
 * Sistema web sobre inventarios para Representaciones Martin S.A.C.
 */
const Router = (() => {
  const appContainer = document.getElementById("app-container");

  const routes = {
    login: {
      html: "./modules/login.html",
      init: () => {
        // Llamar DIRECTAMENTE a AuthModule (sin window.)
        if (typeof AuthModule !== "undefined" && AuthModule.init) {
          AuthModule.init();
        } else {
          console.error("❌ AuthModule no está disponible.");
        }
      },
    },
    dashboard: {
      html: "./modules/dashboard.html",
      init: () => {
        if (typeof DashboardModule !== "undefined" && DashboardModule.init) {
          DashboardModule.init();
        } else {
          console.error("❌ DashboardModule no está disponible.");
        }
      },
    },
  };

  const navigate = async (routeName) => {
    const route = routes[routeName];
    if (!route) {
      console.error(`❌ Ruta "${routeName}" no encontrada.`);
      return;
    }

    try {
      appContainer.innerHTML = '<div class="loader">Cargando...</div>';

      const response = await fetch(route.html);
      if (!response.ok) throw new Error(`No se pudo cargar ${route.html}`);

      const html = await response.text();
      appContainer.innerHTML = html;

      console.log(`📥 HTML de "${routeName}" inyectado. Ejecutando init...`);
      route.init();
      console.log(`✅ Módulo "${routeName}" cargado correctamente.`);
    } catch (error) {
      console.error("❌ Error al cargar el módulo:", error);
      appContainer.innerHTML = `<p style="text-align:center; color:red; padding:20px;">Error al cargar el módulo. Verifique Live Server.</p>`;
    }
  };

  const init = () => {
    const userRole = sessionStorage.getItem("userRole");
    if (userRole) {
      navigate("dashboard");
    } else {
      navigate("login");
    }
  };

  return { init, navigate };
})();

console.log("✅ Router.js cargado correctamente.");
