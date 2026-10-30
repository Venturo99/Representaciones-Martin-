/**
 * Main.js - Enrutador principal
 */
const App = {
  container: null,
  VERSION: Date.now(), // ⭐ Caché busting

  loadModule: async (path, initCallback) => {
    try {
      // ⭐ Añadir versión para romper caché
      const url = `${path}?v=${App.VERSION}`;
      console.log(`📥 Cargando módulo: ${url}`);
      const response = await fetch(url);
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
    document.body.classList.remove("dashboard-active");
    App.loadModule("./modules/login.html", () => {
      if (typeof AuthModule !== "undefined") AuthModule.init();
    });
  },

  goToDashboard: () => {
    console.log("➡️ Navegando al DASHBOARD...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/dashboard.html", () => {
      if (typeof DashboardModule !== "undefined") DashboardModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },

  goToCatalogo: () => {
    console.log("➡️ Navegando al CATÁLOGO...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/catalogo.html", () => {
      if (typeof CatalogoModule !== "undefined") CatalogoModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToInventario: () => {
    console.log("➡️ Navegando al INVENTARIO...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/inventario.html", () => {
      if (typeof InventarioModule !== "undefined") InventarioModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToConsultaRapida: () => {
    console.log("➡️ Navegando a CONSULTA RÁPIDA...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/consulta-rapida.html", () => {
      if (typeof ConsultaRapidaModule !== "undefined")
        ConsultaRapidaModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToMovimientos: () => {
    console.log("➡️ Navegando a ENTRADAS Y SALIDAS...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/movimientos.html", () => {
      if (typeof MovimientosModule !== "undefined") MovimientosModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToHistorial: () => {
    console.log("➡️ Navegando al HISTORIAL...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/historial.html", () => {
      if (typeof HistorialModule !== "undefined") HistorialModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToCortes: () => {
    console.log("➡️ Navegando a CORTES DE TABLEROS...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/cortes.html", () => {
      if (typeof CortesModule !== "undefined") CortesModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToMermas: () => {
    console.log("➡️ Navegando a AJUSTES DE MERMAS...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/mermas.html", () => {
      if (typeof MermasModule !== "undefined") MermasModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToRotacion: () => {
    console.log("➡️ Navegando a ROTACIÓN DE PRODUCTOS...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/rotacion.html", () => {
      if (typeof RotacionModule !== "undefined") RotacionModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToCorteInventario: () => {
    console.log("➡️ Navegando a CORTES DE INVENTARIO...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/corte-inventario.html", () => {
      if (typeof CorteInventarioModule !== "undefined")
        CorteInventarioModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToReportes: () => {
    console.log("➡️ Navegando a REPORTES...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/reportes.html", () => {
      if (typeof ReportesModule !== "undefined") ReportesModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToClientes: () => {
    console.log("➡️ Navegando a CLIENTES...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/clientes.html", () => {
      if (typeof ClientesModule !== "undefined") ClientesModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToProveedores: () => {
    console.log("➡️ Navegando a PROVEEDORES Y COMPRAS...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/proveedores.html", () => {
      if (typeof ProveedoresModule !== "undefined") ProveedoresModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToUsuarios: () => {
    console.log("➡️ Navegando a USUARIOS...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/usuarios.html", () => {
      if (typeof UsuariosModule !== "undefined") UsuariosModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToBitacora: () => {
    console.log("➡️ Navegando a BITÁCORA...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/bitacora.html", () => {
      if (typeof BitacoraModule !== "undefined") BitacoraModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToCierre: () => {
    console.log("➡️ Navegando a CIERRE DIARIO...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/cierre.html", () => {
      if (typeof CierreModule !== "undefined") CierreModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  goToVentas: () => {
    console.log("➡️ Navegando a VENTAS...");
    document.body.classList.add("dashboard-active");
    App.loadModule("./modules/ventas.html", () => {
      if (typeof VentasModule !== "undefined") VentasModule.init();
      if (typeof NotificationsModule !== "undefined")
        NotificationsModule.init();
      if (typeof ThemeModule !== "undefined") ThemeModule.init();
    });
  },
  logout: () => {
    sessionStorage.clear();
    App.goToLogin();
  },

  init: () => {
    App.container = document.getElementById("app-container");
    console.log("🚀 Iniciando Sistema Martín...");

    if (sessionStorage.getItem("userRole")) {
      App.goToDashboard();
    } else {
      App.goToLogin();
    }
  },
};

document.addEventListener("DOMContentLoaded", App.init);
