/**
 * Navegación centralizada - Todos los módulos usan esto
 */
const NavModule = (() => {
  // Mapa de todas las rutas disponibles
  const routes = {
    dashboard: () => App.goToDashboard(),
    catalogo: () => App.goToCatalogo(),
    inventario: () => App.goToInventario(),
    // Próximos módulos:
    "consulta-stock": () => App.goToConsultaRapida(),
    movimientos: () => App.goToMovimientos(),
    historico: null,
    "consulta-rapida": () => App.goToConsultaRapida(),
    cortes: null,
    mermas: null,
    rotacion: null,
    "corte-inventario": null,
    reportes: null,
    clientes: null,
    proveedores: null,
    usuarios: () => App.goToUsuarios(),
    bitacora: null,
    cierre: null,
  };

  /**
   * Inicializa la navegación del sidebar
   * @param {string} activeRoute - Ruta actualmente activa
   */
  const init = (activeRoute = "") => {
    console.log(`🧭 Inicializando navegación (activa: ${activeRoute})`);

    const navItems = document.querySelectorAll(".nav-item[data-route]");

    navItems.forEach((btn) => {
      // Remover listeners previos clonando el nodo
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const route = newBtn.dataset.route;
        console.log(`🖱️ Clic en: "${route}"`);

        // Caso especial: si ya estás en esa ruta, no hacer nada
        if (route === activeRoute) {
          console.log(`✅ Ya estás en "${route}"`);
          return;
        }

        // Actualizar clase active
        document
          .querySelectorAll(".nav-item")
          .forEach((b) => b.classList.remove("active"));
        newBtn.classList.add("active");

        // Ejecutar la función de navegación
        if (routes[route]) {
          routes[route]();
        } else {
          // Módulos no implementados aún
          const name = newBtn.querySelector("span")?.textContent || route;
          alert(
            `🚧 Módulo "${name}" en desarrollo.\n\nSe implementará próximamente.`,
          );

          // Restaurar active al botón actual
          document
            .querySelectorAll(".nav-item")
            .forEach((b) => b.classList.remove("active"));
          const activeBtn = document.querySelector(
            `.nav-item[data-route="${activeRoute}"]`,
          );
          if (activeBtn) activeBtn.classList.add("active");
        }
      });
    });

    // Cerrar sesión
    const logout = document.getElementById("logout-btn");
    if (logout) {
      const newLogout = logout.cloneNode(true);
      logout.parentNode.replaceChild(newLogout, logout);
      newLogout.addEventListener("click", () => {
        if (confirm("¿Cerrar sesión?")) App.logout();
      });
    }

    console.log("✅ Navegación lista.");
  };

  return { init };
})();

console.log("🚀 nav.js cargado");
