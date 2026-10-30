/**
 * Navegación centralizada con Control de Acceso Basado en Roles (RBAC)
 */
const NavModule = (() => {
  const routes = {
    //Principal
    dashboard: () => App.goToDashboard(),

    //Operaciones
    catalogo: () => App.goToCatalogo(),
    inventario: () => App.goToInventario(),
    "consulta-stock": () => App.goToConsultaRapida(),
    movimientos: () => App.goToMovimientos(),
    historico: () => App.goToHistorial(),
    cortes: () => App.goToCortes(),
    mermas: () => App.goToMermas(),
    ventas: () => App.goToVentas(),

    //Analisis y reportes
    rotacion: () => App.goToRotacion(),
    "corte-inventario": () => App.goToCorteInventario(),
    reportes: () => App.goToReportes(),

    //Administración
    clientes: () => App.goToClientes(),
    proveedores: () => App.goToProveedores(),
    usuarios: () => App.goToUsuarios(),
    bitacora: () => App.goToBitacora(),
    cierre: () => App.goToCierre(),
  };

  // PERMISOS POR ROL
  const PERMISSIONS = {
    "Super Administrador": [
      "dashboard",
      "catalogo",
      "ventas",
      "inventario",
      "consulta-stock",
      "movimientos",
      "historico",
      "cortes",
      "mermas",
      "rotacion",
      "corte-inventario",
      "reportes",
      "clientes",
      "proveedores",
      "usuarios",
      "bitacora",
      "cierre",
    ],
    "Encargado de Almacén": [
      "dashboard",
      "catalogo",
      "inventario",
      "consulta-stock",
      "movimientos",
      "historico",
      "cortes",
      "mermas",
      "corte-inventario",
      "reportes",
    ],
    Vendedor: ["dashboard", "catalogo", "ventas", "consulta-stock", "clientes"],
    "Gerente General": [
      "dashboard",
      "consulta-stock",
      "historico",
      "rotacion",
      "corte-inventario",
      "reportes",
      "bitacora",
    ],
  };

  const init = (activeRoute = "") => {
    console.log(`🧭 Inicializando navegación (activa: ${activeRoute})`);

    const userRole = sessionStorage.getItem("userRole") || "Invitado";
    const allowedRoutes = PERMISSIONS[userRole] || [];

    // 1. Ocultar TODOS los botones primero
    document.querySelectorAll(".nav-item[data-route]").forEach((btn) => {
      btn.style.display = "none";
    });

    // 2. Mostrar solo los permitidos
    document.querySelectorAll(".nav-item[data-route]").forEach((btn) => {
      const route = btn.dataset.route;

      if (allowedRoutes.includes(route)) {
        btn.style.display = "flex";
      }
    });

    // 3. Ocultar secciones que se quedaron vacías (sin botones visibles)
    document.querySelectorAll(".nav-section").forEach((section) => {
      const visibleButtons = section.querySelectorAll(
        '.nav-item[style*="display: flex"]',
      );
      if (visibleButtons.length === 0) {
        section.style.display = "none";
      } else {
        section.style.display = "block";
      }
    });

    // 4. Lógica de clics
    document.querySelectorAll(".nav-item[data-route]").forEach((btn) => {
      const route = btn.dataset.route;
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (route === activeRoute) return;

        document
          .querySelectorAll(".nav-item")
          .forEach((b) => b.classList.remove("active"));
        newBtn.classList.add("active");

        if (routes[route]) {
          routes[route]();
        } else {
          alert(
            `🚧 Módulo "${newBtn.querySelector("span")?.textContent || route}" en desarrollo.`,
          );
          document
            .querySelectorAll(".nav-item")
            .forEach((b) => b.classList.remove("active"));
          document
            .querySelector(`.nav-item[data-route="${activeRoute}"]`)
            ?.classList.add("active");
        }
      });
    });

    // 5. Cerrar sesión
    const logout = document.getElementById("logout-btn");
    if (logout) {
      const newLogout = logout.cloneNode(true);
      logout.parentNode.replaceChild(newLogout, logout);
      newLogout.addEventListener("click", () => {
        if (confirm("¿Cerrar sesión?")) App.logout();
      });
    }

    // 6. ⭐ MOSTRAR EL MENÚ SUAVEMENTE (Esto quita el fondo en blanco)
    const sidebarNav = document.querySelector(".sidebar-nav");
    if (sidebarNav) {
      sidebarNav.classList.add("nav-ready");
    }

    console.log("✅ Navegación lista.");
  };

  return { init };
})();
