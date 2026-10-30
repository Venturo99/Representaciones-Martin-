/**
 * Módulo de Bitácora de Auditoría
 */
const BitacoraModule = (() => {
  // ============================================
  // DATOS SIMULADOS (Registros de auditoría)
  // ============================================
  const LOGS = [
    {
      id: 1,
      fecha: "2026-10-30 08:00:15",
      usuario: "Carlos Mendoza",
      modulo: "Auth",
      accion: "Login",
      detalle: "Inició sesión exitosamente",
      ip: "192.168.1.10",
    },
    {
      id: 2,
      fecha: "2026-10-30 08:15:30",
      usuario: "Luis Ramírez",
      modulo: "Movimientos",
      accion: "Crear",
      detalle: "Registró Entrada de 100 unid. de Melamina Blanca 18mm",
      ip: "192.168.1.15",
    },
    {
      id: 3,
      fecha: "2026-10-30 08:30:00",
      usuario: "María Torres",
      modulo: "Clientes",
      accion: "Crear",
      detalle: "Registró al cliente Constructora XYZ S.A.C.",
      ip: "192.168.1.20",
    },
    {
      id: 4,
      fecha: "2026-10-30 09:00:45",
      usuario: "Carlos Mendoza",
      modulo: "Usuarios",
      accion: "Editar",
      detalle: "Cambió el rol de Luis Ramírez a Almacenero",
      ip: "192.168.1.10",
    },
    {
      id: 5,
      fecha: "2026-10-30 09:15:10",
      usuario: "Ana Gutiérrez",
      modulo: "Auth",
      accion: "Login",
      detalle: "Inició sesión exitosamente",
      ip: "192.168.1.25",
    },
    {
      id: 6,
      fecha: "2026-10-30 09:20:00",
      usuario: "Luis Ramírez",
      modulo: "Catálogo",
      accion: "Editar",
      detalle: "Actualizó el precio de MDF 15mm a S/ 68.00",
      ip: "192.168.1.15",
    },
    {
      id: 7,
      fecha: "2026-10-30 10:00:00",
      usuario: "María Torres",
      modulo: "Movimientos",
      accion: "Crear",
      detalle: "Registró Salida de 25 unid. de Melamina Blanca",
      ip: "192.168.1.20",
    },
    {
      id: 8,
      fecha: "2026-10-29 16:30:00",
      usuario: "Carlos Mendoza",
      modulo: "Proveedores",
      accion: "Crear",
      detalle: "Registró al proveedor MASISA PERÚ S.A.",
      ip: "192.168.1.10",
    },
    {
      id: 9,
      fecha: "2026-10-29 15:00:00",
      usuario: "Luis Ramírez",
      modulo: "Mermas",
      accion: "Crear",
      detalle: "Registró merma de 2 planchas dañadas",
      ip: "192.168.1.15",
    },
    {
      id: 10,
      fecha: "2026-10-29 11:00:00",
      usuario: "María Torres",
      modulo: "Clientes",
      accion: "Eliminar",
      detalle: "Eliminó al cliente Juan Pérez",
      ip: "192.168.1.20",
    },
    {
      id: 11,
      fecha: "2026-10-28 09:00:00",
      usuario: "Carlos Mendoza",
      modulo: "Auth",
      accion: "Login",
      detalle: "Inició sesión exitosamente",
      ip: "192.168.1.10",
    },
    {
      id: 12,
      fecha: "2026-10-28 08:00:00",
      usuario: "Ana Gutiérrez",
      modulo: "Auth",
      accion: "Login",
      detalle: "Inició sesión exitosamente",
      ip: "192.168.1.25",
    },
  ];

  let currentPage = 1;
  const itemsPerPage = 8;
  let filteredLogs = [...LOGS];
  let filters = { search: "", user: "", module: "", action: "" };

  // ============================================
  // UTILIDADES
  // ============================================
  const loadUserInfo = () => {
    const role = sessionStorage.getItem("userRole") || "Invitado";
    const name = sessionStorage.getItem("userName") || "Usuario";
    const avatar = sessionStorage.getItem("userAvatar") || "U";
    const color = sessionStorage.getItem("userColor") || "#f37021";

    document.getElementById("user-name-display").textContent = name;
    document.getElementById("user-role-display").textContent = role.includes(
      "Super",
    )
      ? "Administrador"
      : role;

    const avatarEl = document.getElementById("user-avatar-display");
    if (avatarEl) {
      avatarEl.textContent = avatar;
      avatarEl.style.background = `linear-gradient(135deg, ${color}, #005a2b)`;
    }
  };

  const showToast = (message, type = "success") => {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    if (!toast) return;
    toastMsg.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
  };

  // ============================================
  // FILTRADO Y RENDERIZADO
  // ============================================
  const applyFilters = () => {
    filteredLogs = LOGS.filter((log) => {
      // Filtro de búsqueda
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !log.usuario.toLowerCase().includes(q) &&
          !log.detalle.toLowerCase().includes(q)
        )
          return false;
      }
      // Filtro de usuario
      if (filters.user && log.usuario !== filters.user) return false;
      // Filtro de módulo
      if (filters.module && log.modulo !== filters.module) return false;
      // Filtro de acción
      if (filters.action && log.accion !== filters.action) return false;

      return true;
    });

    // Reiniciar página si los filtros cambian
    if (currentPage > Math.ceil(filteredLogs.length / itemsPerPage)) {
      currentPage = 1;
    }

    renderTable();
    renderPagination();
  };

  const renderTable = () => {
    const tbody = document.getElementById("bitacora-tbody");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");

    if (filteredLogs.length === 0) {
      tbody.innerHTML = "";
      emptyState.classList.remove("hidden");
      resultsCount.textContent = "0 resultados";
      document.getElementById("pagination-container").style.display = "none";
      return;
    }

    emptyState.classList.add("hidden");
    document.getElementById("pagination-container").style.display = "flex";
    resultsCount.textContent = `${filteredLogs.length} resultados`;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredLogs.slice(startIndex, endIndex);

    tbody.innerHTML = pageData
      .map((log) => {
        // Íconos y colores según la acción
        let actionIcon = "";
        let actionClass = "";

        if (log.accion === "Login") {
          actionIcon = "fa-sign-in-alt";
          actionClass = "action-login";
        } else if (log.accion === "Crear") {
          actionIcon = "fa-plus";
          actionClass = "action-create";
        } else if (log.accion === "Editar") {
          actionIcon = "fa-edit";
          actionClass = "action-edit";
        } else if (log.accion === "Eliminar") {
          actionIcon = "fa-trash";
          actionClass = "action-delete";
        }

        return `
        <tr>
          <td><span class="log-date">${log.fecha}</span></td>
          <td><strong>${log.usuario}</strong></td>
          <td><span class="category-tag">${log.modulo}</span></td>
          <td>
            <span class="action-badge ${actionClass}">
              <i class="fas ${actionIcon}"></i> ${log.accion}
            </span>
          </td>
          <td><div class="log-detail">${log.detalle}</div></td>
          <td><span class="log-ip">${log.ip}</span></td>
        </tr>
      `;
      })
      .join("");
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
    const info = document.getElementById("pagination-info");
    const controls = document.getElementById("pagination-controls");

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredLogs.length);
    info.textContent = `Mostrando ${start} - ${end} de ${filteredLogs.length} registros`;

    let html = "";

    html += `<button class="page-btn" ${currentPage === 1 ? "disabled" : ""} onclick="BitacoraModule.changePage(${currentPage - 1})">
        <i class="fas fa-chevron-left"></i>
    </button>`;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        html += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="BitacoraModule.changePage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<span class="page-dots">...</span>`;
      }
    }

    html += `<button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} onclick="BitacoraModule.changePage(${currentPage + 1})">
        <i class="fas fa-chevron-right"></i>
    </button>`;

    controls.innerHTML = html;
  };

  // ============================================
  // EXPORTAR A CSV
  // ============================================
  const exportToCSV = () => {
    if (filteredLogs.length === 0) {
      showToast("No hay datos para exportar", "warning");
      return;
    }

    const headers = ["Fecha", "Usuario", "Modulo", "Accion", "Detalle", "IP"];
    const rows = filteredLogs.map((log) =>
      [
        log.fecha,
        log.usuario,
        log.modulo,
        log.accion,
        `"${log.detalle}"`,
        log.ip,
      ].join(","),
    );

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Bitacora_Auditoria_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("📥 Archivo CSV descargado correctamente", "success");
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const populateUserFilter = () => {
    const select = document.getElementById("filter-user");
    const users = [...new Set(LOGS.map((log) => log.usuario))];
    users.forEach((u) => {
      const option = document.createElement("option");
      option.value = u;
      option.textContent = u;
      select.appendChild(option);
    });
  };

  const initFilters = () => {
    document.getElementById("filter-search").addEventListener("input", (e) => {
      filters.search = e.target.value;
      applyFilters();
    });
    document.getElementById("filter-user").addEventListener("change", (e) => {
      filters.user = e.target.value;
      applyFilters();
    });
    document.getElementById("filter-module").addEventListener("change", (e) => {
      filters.module = e.target.value;
      applyFilters();
    });
    document.getElementById("filter-action").addEventListener("change", (e) => {
      filters.action = e.target.value;
      applyFilters();
    });

    document
      .getElementById("btn-clear-filters")
      .addEventListener("click", () => {
        filters = { search: "", user: "", module: "", action: "" };
        document.getElementById("filter-search").value = "";
        document.getElementById("filter-user").value = "";
        document.getElementById("filter-module").value = "";
        document.getElementById("filter-action").value = "";
        currentPage = 1;
        applyFilters();
      });

    document
      .getElementById("btn-export-csv")
      .addEventListener("click", exportToCSV);
  };

  const changePage = (page) => {
    currentPage = page;
    renderTable();
    renderPagination();
  };

  const init = () => {
    console.log("📋 Inicializando Bitácora de Auditoría...");
    loadUserInfo();
    populateUserFilter();
    initFilters();
    applyFilters();

    if (typeof NavModule !== "undefined") {
      NavModule.init("bitacora");
    }
    console.log("✅ Bitácora cargada.");
  };

  return { init, changePage };
})();

console.log("🚀 bitacora.js cargado correctamente");
