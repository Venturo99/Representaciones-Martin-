/**
 * Módulo de Historial de Movimientos (Auditoría)
 */
const HistorialModule = (() => {
  // ============================================
  // DATOS DE PRUEBA (35 movimientos simulados)
  // ============================================
  const MOVIMIENTOS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      tipo: "entrada",
      cantidad: 100,
      motivo: "Compra a proveedor",
      observaciones: "Factura F001-2345",
      fecha: "2026-09-21 09:15",
      usuario: "Luis Ramírez",
    },
    {
      id: 2,
      codigo: "FER-BIS-001",
      producto: "Bisagra Cazoleta 35mm",
      tipo: "entrada",
      cantidad: 500,
      motivo: "Compra a proveedor",
      observaciones: "Boleta B001-1123",
      fecha: "2026-09-21 08:30",
      usuario: "Luis Ramírez",
    },
    {
      id: 3,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      tipo: "salida",
      cantidad: 25,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Venta según Boleta N° 102",
      fecha: "2026-09-21 08:00",
      usuario: "María Torres",
    },
    {
      id: 4,
      codigo: "MAD-MDF-001",
      producto: "MDF 15mm Crudo",
      tipo: "salida",
      cantidad: 40,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Factura N° 045",
      fecha: "2026-09-20 17:30",
      usuario: "María Torres",
    },
    {
      id: 5,
      codigo: "MAD-AGL-001",
      producto: "Aglomerado 18mm",
      tipo: "ajuste",
      cantidad: 8,
      motivo: "Ajuste por daño",
      observaciones: "Tabla dañada",
      fecha: "2026-09-20 16:00",
      usuario: "Carlos Mendoza",
    },
    {
      id: 6,
      codigo: "HER-MAN-001",
      producto: "Martillo Carpintero 16oz",
      tipo: "entrada",
      cantidad: 20,
      motivo: "Compra a proveedor",
      observaciones: "Compra semanal",
      fecha: "2026-09-20 14:20",
      usuario: "Luis Ramírez",
    },
    {
      id: 7,
      codigo: "PIS-LAM-001",
      producto: "Piso Laminado Roble 8mm",
      tipo: "salida",
      cantidad: 60,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Constructora XYZ",
      fecha: "2026-09-20 11:45",
      usuario: "María Torres",
    },
    {
      id: 8,
      codigo: "MAD-OSB-001",
      producto: "OSB 11mm",
      tipo: "salida",
      cantidad: 25,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Venta última unidad",
      fecha: "2026-09-19 15:30",
      usuario: "María Torres",
    },
    {
      id: 9,
      codigo: "DRY-PLA-001",
      producto: "Plancha Drywall 1.2x2.4m",
      tipo: "entrada",
      cantidad: 200,
      motivo: "Compra a proveedor",
      observaciones: "Lote nuevo",
      fecha: "2026-09-19 10:00",
      usuario: "Luis Ramírez",
    },
    {
      id: 10,
      codigo: "FER-COR-001",
      producto: "Corredera Telescópica 45cm",
      tipo: "salida",
      cantidad: 15,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 099",
      fecha: "2026-09-18 16:20",
      usuario: "María Torres",
    },
    {
      id: 11,
      codigo: "MAD-TRI-001",
      producto: "Triplay 4mm",
      tipo: "ajuste",
      cantidad: 5,
      motivo: "Inventario físico",
      observaciones: "Cuadre de stock",
      fecha: "2026-09-18 09:00",
      usuario: "Carlos Mendoza",
    },
    {
      id: 12,
      codigo: "HER-ELE-001",
      producto: "Taladro Percutor 650W",
      tipo: "salida",
      cantidad: 2,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Venta mostrador",
      fecha: "2026-09-17 14:00",
      usuario: "María Torres",
    },
    {
      id: 13,
      codigo: "MAD-HDF-001",
      producto: "HDF 3mm",
      tipo: "entrada",
      cantidad: 50,
      motivo: "Compra a proveedor",
      observaciones: "Reposición",
      fecha: "2026-09-17 11:30",
      usuario: "Luis Ramírez",
    },
    {
      id: 14,
      codigo: "FER-SOP-001",
      producto: "Soporte Estante 20cm",
      tipo: "salida",
      cantidad: 30,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 095",
      fecha: "2026-09-16 17:00",
      usuario: "María Torres",
    },
    {
      id: 15,
      codigo: "PIS-VIN-001",
      producto: "Piso Vinílico Gris 3mm",
      tipo: "ajuste",
      cantidad: 2,
      motivo: "Ajuste por daño",
      observaciones: "Caja rota",
      fecha: "2026-09-16 10:15",
      usuario: "Carlos Mendoza",
    },
    // ... Agregamos más para que haya paginación ...
    {
      id: 16,
      codigo: "MAD-MEL-002",
      producto: "Melamina Roble 18mm",
      tipo: "entrada",
      cantidad: 80,
      motivo: "Compra a proveedor",
      observaciones: "Factura F001-2200",
      fecha: "2026-09-15 09:00",
      usuario: "Luis Ramírez",
    },
    {
      id: 17,
      codigo: "MAD-MEL-002",
      producto: "Melamina Roble 18mm",
      tipo: "salida",
      cantidad: 10,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 080",
      fecha: "2026-09-15 15:30",
      usuario: "María Torres",
    },
    {
      id: 18,
      codigo: "FER-JAL-001",
      producto: "Jalador Acero Inox 128mm",
      tipo: "salida",
      cantidad: 50,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Factura 040",
      fecha: "2026-09-14 11:00",
      usuario: "María Torres",
    },
    {
      id: 19,
      codigo: "DRY-PER-001",
      producto: "Perfil Omega 3m",
      tipo: "entrada",
      cantidad: 100,
      motivo: "Compra a proveedor",
      observaciones: "Ingreso semanal",
      fecha: "2026-09-14 08:30",
      usuario: "Luis Ramírez",
    },
    {
      id: 20,
      codigo: "MAD-MDF-001",
      producto: "MDF 15mm Crudo",
      tipo: "entrada",
      cantidad: 50,
      motivo: "Compra a proveedor",
      observaciones: "Lote 4",
      fecha: "2026-09-13 10:00",
      usuario: "Luis Ramírez",
    },
    {
      id: 21,
      codigo: "FER-BIS-001",
      producto: "Bisagra Cazoleta 35mm",
      tipo: "salida",
      cantidad: 200,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Cliente mayorista",
      fecha: "2026-09-13 16:45",
      usuario: "María Torres",
    },
    {
      id: 22,
      codigo: "DRY-RIE-001",
      producto: "Riel 3m Galvanizado",
      tipo: "ajuste",
      cantidad: 10,
      motivo: "Inventario físico",
      observaciones: "Ajuste positivo",
      fecha: "2026-09-12 09:00",
      usuario: "Carlos Mendoza",
    },
    {
      id: 23,
      codigo: "HER-ACC-001",
      producto: "Set Brocas HSS 20pz",
      tipo: "salida",
      cantidad: 3,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 075",
      fecha: "2026-09-12 14:15",
      usuario: "María Torres",
    },
    {
      id: 24,
      codigo: "PIS-LAM-001",
      producto: "Piso Laminado Roble 8mm",
      tipo: "entrada",
      cantidad: 150,
      motivo: "Compra a proveedor",
      observaciones: "Factura 033",
      fecha: "2026-09-11 10:30",
      usuario: "Luis Ramírez",
    },
    {
      id: 25,
      codigo: "MAD-AGL-001",
      producto: "Aglomerado 18mm",
      tipo: "salida",
      cantidad: 5,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 072",
      fecha: "2026-09-11 15:00",
      usuario: "María Torres",
    },
    {
      id: 26,
      codigo: "FER-PIS-001",
      producto: "Pistón Hidráulico 100N",
      tipo: "entrada",
      cantidad: 40,
      motivo: "Compra a proveedor",
      observaciones: "Reposición",
      fecha: "2026-09-10 09:20",
      usuario: "Luis Ramírez",
    },
    {
      id: 27,
      codigo: "MAD-OSB-001",
      producto: "OSB 11mm",
      tipo: "entrada",
      cantidad: 60,
      motivo: "Compra a proveedor",
      observaciones: "Ingreso",
      fecha: "2026-09-10 08:00",
      usuario: "Luis Ramírez",
    },
    {
      id: 28,
      codigo: "PIS-VIN-001",
      producto: "Piso Vinílico Gris 3mm",
      tipo: "salida",
      cantidad: 20,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Cliente final",
      fecha: "2026-09-09 16:00",
      usuario: "María Torres",
    },
    {
      id: 29,
      codigo: "MAD-TRI-001",
      producto: "Triplay 4mm",
      tipo: "salida",
      cantidad: 15,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 065",
      fecha: "2026-09-09 11:00",
      usuario: "María Torres",
    },
    {
      id: 30,
      codigo: "DRY-PLA-001",
      producto: "Plancha Drywall 1.2x2.4m",
      tipo: "ajuste",
      cantidad: 2,
      motivo: "Ajuste por daño",
      observaciones: "Plancha rota",
      fecha: "2026-09-08 15:30",
      usuario: "Carlos Mendoza",
    },
    {
      id: 31,
      codigo: "MAD-HDF-001",
      producto: "HDF 3mm",
      tipo: "salida",
      cantidad: 10,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 060",
      fecha: "2026-09-08 10:00",
      usuario: "María Torres",
    },
    {
      id: 32,
      codigo: "FER-COR-001",
      producto: "Corredera Telescópica 45cm",
      tipo: "entrada",
      cantidad: 30,
      motivo: "Compra a proveedor",
      observaciones: "Factura 029",
      fecha: "2026-09-07 09:00",
      usuario: "Luis Ramírez",
    },
    {
      id: 33,
      codigo: "HER-MAN-001",
      producto: "Martillo Carpintero 16oz",
      tipo: "salida",
      cantidad: 5,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Boleta 055",
      fecha: "2026-09-07 14:00",
      usuario: "María Torres",
    },
    {
      id: 34,
      codigo: "FER-SOP-001",
      producto: "Soporte Estante 20cm",
      tipo: "entrada",
      cantidad: 100,
      motivo: "Compra a proveedor",
      observaciones: "Factura 028",
      fecha: "2026-09-06 10:00",
      usuario: "Luis Ramírez",
    },
    {
      id: 35,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      tipo: "ajuste",
      cantidad: 1,
      motivo: "Inventario físico",
      observaciones: "Cuadre",
      fecha: "2026-09-06 08:30",
      usuario: "Carlos Mendoza",
    },
  ];

  // Variables de estado
  let currentPage = 1;
  const itemsPerPage = 10;
  let filteredData = [...MOVIMIENTOS];
  let filters = { from: "", to: "", user: "", type: "", search: "" };

  // ============================================
  // UTILIDADES
  // ============================================
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const mins = String(date.getMinutes()).padStart(2, "0");
    return { date: `${day}/${month}/${year}`, time: `${hours}:${mins}` };
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
  // LÓGICA DE FILTRADO
  // ============================================
  const applyFilters = () => {
    filteredData = MOVIMIENTOS.filter((m) => {
      // Filtro por fecha (Desde)
      if (filters.from) {
        const mDate = m.fecha.split(" ")[0];
        if (mDate < filters.from) return false;
      }
      // Filtro por fecha (Hasta)
      if (filters.to) {
        const mDate = m.fecha.split(" ")[0];
        if (mDate > filters.to) return false;
      }
      // Filtro por usuario
      if (filters.user && m.usuario !== filters.user) return false;
      // Filtro por tipo
      if (filters.type && m.tipo !== filters.type) return false;
      // Búsqueda general
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !m.codigo.toLowerCase().includes(q) &&
          !m.producto.toLowerCase().includes(q) &&
          !m.motivo.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });

    // Reiniciar a la página 1 si los filtros cambian
    if (currentPage > Math.ceil(filteredData.length / itemsPerPage)) {
      currentPage = 1;
    }

    renderTable();
    renderPagination();
  };

  // ============================================
  // RENDERIZADO DE TABLA
  // ============================================
  const renderTable = () => {
    const tbody = document.getElementById("historial-tbody");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");

    if (filteredData.length === 0) {
      tbody.innerHTML = "";
      emptyState.classList.remove("hidden");
      resultsCount.textContent = "0 resultados";
      document.getElementById("pagination-container").style.display = "none";
      return;
    }

    emptyState.classList.add("hidden");
    document.getElementById("pagination-container").style.display = "flex";
    resultsCount.textContent = `${filteredData.length} resultados`;

    // Paginación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    tbody.innerHTML = pageData
      .map((m) => {
        const { date, time } = formatDate(m.fecha);
        const isEntrada = m.tipo === "entrada";
        const isSalida = m.tipo === "salida";
        const badgeClass = isEntrada
          ? "badge-success"
          : isSalida
            ? "badge-danger"
            : "badge-warning";
        const tipoLabel = isEntrada
          ? "Entrada"
          : isSalida
            ? "Salida"
            : "Ajuste";
        const tipoIcon = isEntrada
          ? "fa-arrow-down"
          : isSalida
            ? "fa-arrow-up"
            : "fa-balance-scale";
        const cantidadClass = isEntrada
          ? "text-success"
          : isSalida
            ? "text-danger"
            : "text-warning";
        const cantidadPrefix = isEntrada ? "+" : isSalida ? "-" : "±";

        return `
        <tr>
          <td>
            <div class="date-cell">
                <i class="fas fa-calendar-day"></i>
                <div class="date-cell-info">
                    <strong>${date}</strong>
                    <span class="date-time"><i class="fas fa-clock"></i> ${time}</span>
                </div>
            </div>
          </td>
          <td><span class="code-tag">${m.codigo}</span></td>
          <td>${m.producto}</td>
          <td>
              <span class="badge ${badgeClass}">
                  <i class="fas ${tipoIcon}"></i> ${tipoLabel}
              </span>
          </td>
          <td class="${cantidadClass}"><strong>${cantidadPrefix}${m.cantidad}</strong></td>
          <td>
              <div class="motivo-cell">
                  <strong>${m.motivo}</strong>
                  ${m.observaciones ? `<small>${m.observaciones}</small>` : ""}
              </div>
          </td>
          <td>
              <span class="user-cell"><i class="fas fa-user-circle"></i> ${m.usuario}</span>
          </td>
        </tr>
      `;
      })
      .join("");
  };

  // ============================================
  // RENDERIZADO DE PAGINACIÓN
  // ============================================
  const renderPagination = () => {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const info = document.getElementById("pagination-info");
    const controls = document.getElementById("pagination-controls");

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, filteredData.length);
    info.textContent = `Mostrando ${start} - ${end} de ${filteredData.length} registros`;

    let html = "";

    // Botón Anterior
    html += `<button class="page-btn" ${currentPage === 1 ? "disabled" : ""} onclick="HistorialModule.changePage(${currentPage - 1})">
        <i class="fas fa-chevron-left"></i>
    </button>`;

    // Números de página
    for (let i = 1; i <= totalPages; i++) {
      // Mostrar solo 5 botones alrededor de la página actual
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        html += `<button class="page-btn ${i === currentPage ? "active" : ""}" onclick="HistorialModule.changePage(${i})">${i}</button>`;
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        html += `<span class="page-dots">...</span>`;
      }
    }

    // Botón Siguiente
    html += `<button class="page-btn" ${currentPage === totalPages ? "disabled" : ""} onclick="HistorialModule.changePage(${currentPage + 1})">
        <i class="fas fa-chevron-right"></i>
    </button>`;

    controls.innerHTML = html;
  };

  // ============================================
  // EXPORTACIÓN REAL A CSV
  // ============================================
  const exportToCSV = () => {
    if (filteredData.length === 0) {
      showToast("No hay datos para exportar", "warning");
      return;
    }

    // Encabezados
    const headers = [
      "Fecha",
      "Hora",
      "Código",
      "Producto",
      "Tipo",
      "Cantidad",
      "Motivo",
      "Observaciones",
      "Usuario",
    ];

    // Filas
    const rows = filteredData.map((m) => {
      const { date, time } = formatDate(m.fecha);
      return [
        date,
        time,
        m.codigo,
        `"${m.producto}"`,
        m.tipo,
        m.cantidad,
        `"${m.motivo}"`,
        `"${m.observaciones}"`,
        m.usuario,
      ].join(",");
    });

    // Unir todo
    const csvContent = [headers.join(","), ...rows].join("\n");

    // Crear archivo y descargar
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    }); // \uFEFF es para que Excel lea bien los acentos
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Historial_Movimientos_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("📥 Archivo CSV descargado correctamente", "success");
  };

  // ============================================
  // INICIALIZACIÓN
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

  const populateUserFilter = () => {
    const select = document.getElementById("filter-user");
    const users = [...new Set(MOVIMIENTOS.map((m) => m.usuario))];
    users.forEach((u) => {
      const option = document.createElement("option");
      option.value = u;
      option.textContent = u;
      select.appendChild(option);
    });
  };

  const initFilters = () => {
    document.getElementById("filter-from").addEventListener("change", (e) => {
      filters.from = e.target.value;
      applyFilters();
    });
    document.getElementById("filter-to").addEventListener("change", (e) => {
      filters.to = e.target.value;
      applyFilters();
    });
    document.getElementById("filter-user").addEventListener("change", (e) => {
      filters.user = e.target.value;
      applyFilters();
    });
    document.getElementById("filter-type").addEventListener("change", (e) => {
      filters.type = e.target.value;
      applyFilters();
    });
    document.getElementById("filter-search").addEventListener("input", (e) => {
      filters.search = e.target.value;
      applyFilters();
    });

    document
      .getElementById("btn-clear-filters")
      .addEventListener("click", () => {
        filters = { from: "", to: "", user: "", type: "", search: "" };
        document.getElementById("filter-from").value = "";
        document.getElementById("filter-to").value = "";
        document.getElementById("filter-user").value = "";
        document.getElementById("filter-type").value = "";
        document.getElementById("filter-search").value = "";
        currentPage = 1;
        applyFilters();
      });

    document
      .getElementById("btn-export-csv")
      .addEventListener("click", exportToCSV);
  };

  const init = () => {
    console.log("📜 Inicializando Historial de Movimientos...");
    loadUserInfo();
    populateUserFilter();
    initFilters();
    applyFilters();

    if (typeof NavModule !== "undefined") {
      NavModule.init("historico");
    }

    console.log("✅ Historial cargado.");
  };

  // Exponer changePage para la paginación
  const changePage = (page) => {
    currentPage = page;
    renderTable();
    renderPagination();
  };

  return { init, changePage };
})();

console.log("🚀 historial.js cargado correctamente");
