/**
 * Módulo de Reportes
 */
const ReportesModule = (() => {
  // ============================================
  // DATOS SIMULADOS
  // ============================================
  const DATA_INVENTARIO = [
    {
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      categoria: "Maderas",
      stock: 245,
      minimo: 50,
      precio: 85.5,
      ubicacion: "A-01-R1-N1",
    },
    {
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      categoria: "Maderas",
      stock: 32,
      minimo: 50,
      precio: 92.0,
      ubicacion: "A-01-R2-N1",
    },
    {
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      categoria: "Ferretería",
      stock: 520,
      minimo: 100,
      precio: 3.5,
      ubicacion: "C-01-R1-N3",
    },
    {
      codigo: "MAD-OSB-001",
      nombre: "OSB 11mm",
      categoria: "Maderas",
      stock: 0,
      minimo: 25,
      precio: 72.0,
      ubicacion: "B-03-R2-N1",
    },
  ];

  const DATA_MOVIMIENTOS = [
    {
      fecha: "2026-09-21",
      hora: "09:15",
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      tipo: "entrada",
      cantidad: 100,
      motivo: "Compra",
      usuario: "Luis Ramírez",
    },
    {
      fecha: "2026-09-20",
      hora: "17:30",
      codigo: "MAD-MDF-001",
      producto: "MDF 15mm Crudo",
      tipo: "salida",
      cantidad: 40,
      motivo: "Venta",
      usuario: "María Torres",
    },
    {
      fecha: "2026-09-20",
      hora: "16:00",
      codigo: "MAD-AGL-001",
      producto: "Aglomerado 18mm",
      tipo: "ajuste",
      cantidad: 8,
      motivo: "Daño",
      usuario: "Carlos Mendoza",
    },
  ];

  const DATA_MERMAS = [
    {
      fecha: "2026-09-21",
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      cantidad: 2,
      motivo: "Daño",
      costo: 171.0,
      usuario: "Luis Ramírez",
    },
    {
      fecha: "2026-09-20",
      codigo: "FER-COR-001",
      producto: "Corredera Telescópica",
      cantidad: 5,
      motivo: "Robo",
      costo: 60.0,
      usuario: "Carlos Mendoza",
    },
  ];

  let currentReportType = "inventario";
  let currentDataForExport = [];

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

  const updateDateText = () => {
    const now = new Date();
    document.getElementById("report-date").textContent =
      now.toLocaleString("es-PE");
  };

  // ============================================
  // GENERADORES DE REPORTES
  // ============================================
  const generateInventarioReport = () => {
    document.getElementById("report-title").innerHTML =
      '<i class="fas fa-boxes"></i> Inventario Actual (Stock)';
    document.getElementById("report-thead").innerHTML = `
      <tr>
        <th>Código</th>
        <th>Producto</th>
        <th>Categoría</th>
        <th>Stock Actual</th>
        <th>Stock Mín.</th>
        <th>Precio (S/)</th>
        <th>Ubicación</th>
        <th>Estado</th>
      </tr>
    `;

    document.getElementById("report-tbody").innerHTML = DATA_INVENTARIO.map(
      (item) => {
        let estado = `<span class="badge badge-success">Disponible</span>`;
        if (item.stock === 0)
          estado = `<span class="badge badge-danger">Sin Stock</span>`;
        else if (item.stock < item.minimo)
          estado = `<span class="badge badge-warning">Stock Bajo</span>`;

        return `
        <tr>
          <td><span class="code-tag">${item.codigo}</span></td>
          <td>${item.nombre}</td>
          <td>${item.categoria}</td>
          <td><strong>${item.stock}</strong></td>
          <td>${item.minimo}</td>
          <td>S/ ${item.precio.toFixed(2)}</td>
          <td><span class="location-tag"><i class="fas fa-map-marker-alt"></i> ${item.ubicacion}</span></td>
          <td>${estado}</td>
        </tr>
      `;
      },
    ).join("");

    currentDataForExport = DATA_INVENTARIO.map((item) => ({
      Codigo: item.codigo,
      Producto: item.nombre,
      Categoria: item.categoria,
      Stock_Actual: item.stock,
      Stock_Minimo: item.minimo,
      Precio: item.precio,
      Ubicacion: item.ubicacion,
    }));
  };

  const generateMovimientosReport = () => {
    document.getElementById("report-title").innerHTML =
      '<i class="fas fa-exchange-alt"></i> Historial de Movimientos';
    document.getElementById("report-thead").innerHTML = `
      <tr>
        <th>Fecha</th>
        <th>Hora</th>
        <th>Código</th>
        <th>Producto</th>
        <th>Tipo</th>
        <th>Cantidad</th>
        <th>Motivo</th>
        <th>Usuario</th>
      </tr>
    `;

    document.getElementById("report-tbody").innerHTML = DATA_MOVIMIENTOS.map(
      (item) => {
        const isEntrada = item.tipo === "entrada";
        const badgeClass = isEntrada
          ? "badge-success"
          : item.tipo === "salida"
            ? "badge-danger"
            : "badge-warning";
        const signo = isEntrada ? "+" : "-";

        return `
        <tr>
          <td>${item.fecha}</td>
          <td>${item.hora}</td>
          <td><span class="code-tag">${item.codigo}</span></td>
          <td>${item.producto}</td>
          <td><span class="badge ${badgeClass}">${item.tipo.toUpperCase()}</span></td>
          <td><strong>${signo}${item.cantidad}</strong></td>
          <td>${item.motivo}</td>
          <td>${item.usuario}</td>
        </tr>
      `;
      },
    ).join("");

    currentDataForExport = DATA_MOVIMIENTOS.map((item) => ({
      Fecha: item.fecha,
      Hora: item.hora,
      Codigo: item.codigo,
      Producto: item.producto,
      Tipo: item.tipo,
      Cantidad: item.cantidad,
      Motivo: item.motivo,
      Usuario: item.usuario,
    }));
  };

  const generateMermasReport = () => {
    document.getElementById("report-title").innerHTML =
      '<i class="fas fa-exclamation-triangle"></i> Reporte de Mermas';
    document.getElementById("report-thead").innerHTML = `
      <tr>
        <th>Fecha</th>
        <th>Código</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Motivo</th>
        <th>Costo Pérdida (S/)</th>
        <th>Usuario</th>
      </tr>
    `;

    document.getElementById("report-tbody").innerHTML = DATA_MERMAS.map(
      (item) => {
        return `
        <tr>
          <td>${item.fecha}</td>
          <td><span class="code-tag">${item.codigo}</span></td>
          <td>${item.producto}</td>
          <td><span class="cantidad-perdida">-${item.cantidad}</span></td>
          <td>${item.motivo}</td>
          <td><strong>S/ ${item.costo.toFixed(2)}</strong></td>
          <td>${item.usuario}</td>
        </tr>
      `;
      },
    ).join("");

    currentDataForExport = DATA_MERMAS.map((item) => ({
      Fecha: item.fecha,
      Codigo: item.codigo,
      Producto: item.producto,
      Cantidad: item.cantidad,
      Motivo: item.motivo,
      Costo_Perdida: item.costo,
      Usuario: item.usuario,
    }));
  };

  // ============================================
  // EXPORTACIÓN Y ACCIONES
  // ============================================
  const handleGenerate = () => {
    const type = document.getElementById("report-type").value;
    currentReportType = type;

    if (type === "inventario") generateInventarioReport();
    else if (type === "movimientos") generateMovimientosReport();
    else if (type === "mermas") generateMermasReport();

    updateDateText();
    showToast("📊 Reporte generado correctamente", "success");
  };

  const exportToCSV = () => {
    if (currentDataForExport.length === 0) {
      showToast("No hay datos para exportar", "warning");
      return;
    }

    const headers = Object.keys(currentDataForExport[0]);
    const csvContent = [
      headers.join(","),
      ...currentDataForExport.map((row) =>
        headers.map((h) => `"${row[h]}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Reporte_${currentReportType}_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("📥 Archivo Excel/CSV descargado", "success");
  };

  const printReport = () => {
    window.print(); // Abre el diálogo de impresión del navegador (aquí pueden guardar como PDF)
  };

  const init = () => {
    console.log("📄 Inicializando Reportes...");
    loadUserInfo();

    // Generar el reporte inicial
    generateInventarioReport();
    updateDateText();

    // Eventos
    document
      .getElementById("btn-generate")
      .addEventListener("click", handleGenerate);
    document
      .getElementById("btn-export-csv")
      .addEventListener("click", exportToCSV);
    document.getElementById("btn-print").addEventListener("click", printReport);

    // Mostrar/Ocultar filtros de fecha según el reporte
    document.getElementById("report-type").addEventListener("change", (e) => {
      const dateFilters = document.querySelectorAll(".date-filter-group");
      if (e.target.value === "inventario") {
        dateFilters.forEach((el) => el.classList.add("hidden"));
      } else {
        dateFilters.forEach((el) => el.classList.remove("hidden"));
      }
    });

    if (typeof NavModule !== "undefined") {
      NavModule.init("reportes");
    }
    console.log("✅ Reportes cargado.");
  };

  return { init };
})();

console.log("🚀 reportes.js cargado correctamente");
