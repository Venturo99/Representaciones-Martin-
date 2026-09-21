/**
 * Módulo de Entradas y Salidas
 * RF-FE-06: Formulario Modal de Movimientos
 * Incluye: Motivo obligatorio + Validación visual de Stock Insuficiente (RN-03)
 */
const MovimientosModule = (() => {
  // ============================================
  // BASE DE PRODUCTOS
  // ============================================
  const PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      categoria: "Maderas y Tableros",
      stock: 245,
      minimo: 50,
      unidad: "Plancha",
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      categoria: "Maderas y Tableros",
      stock: 32,
      minimo: 50,
      unidad: "Plancha",
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      nombre: "MDF 15mm Crudo",
      categoria: "Maderas y Tableros",
      stock: 180,
      minimo: 60,
      unidad: "Plancha",
    },
    {
      id: 4,
      codigo: "MAD-TRI-001",
      nombre: "Triplay 4mm",
      categoria: "Maderas y Tableros",
      stock: 95,
      minimo: 40,
      unidad: "Plancha",
    },
    {
      id: 5,
      codigo: "MAD-AGL-001",
      nombre: "Aglomerado 18mm",
      categoria: "Maderas y Tableros",
      stock: 8,
      minimo: 30,
      unidad: "Plancha",
    },
    {
      id: 6,
      codigo: "MAD-OSB-001",
      nombre: "OSB 11mm",
      categoria: "Maderas y Tableros",
      stock: 0,
      minimo: 25,
      unidad: "Plancha",
    },
    {
      id: 7,
      codigo: "MAD-HDF-001",
      nombre: "HDF 3mm",
      categoria: "Maderas y Tableros",
      stock: 12,
      minimo: 40,
      unidad: "Plancha",
    },
    {
      id: 8,
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      categoria: "Ferretería",
      stock: 520,
      minimo: 100,
      unidad: "Unidad",
    },
    {
      id: 9,
      codigo: "FER-COR-001",
      nombre: "Corredera Telescópica 45cm",
      categoria: "Ferretería",
      stock: 45,
      minimo: 80,
      unidad: "Unidad",
    },
    {
      id: 10,
      codigo: "FER-JAL-001",
      nombre: "Jalador Acero Inox 128mm",
      categoria: "Ferretería",
      stock: 210,
      minimo: 60,
      unidad: "Unidad",
    },
    {
      id: 11,
      codigo: "FER-SOP-001",
      nombre: "Soporte Estante 20cm",
      categoria: "Ferretería",
      stock: 18,
      minimo: 50,
      unidad: "Unidad",
    },
    {
      id: 12,
      codigo: "FER-PIS-001",
      nombre: "Pistón Hidráulico 100N",
      categoria: "Ferretería",
      stock: 0,
      minimo: 30,
      unidad: "Unidad",
    },
    {
      id: 13,
      codigo: "HER-ELE-001",
      nombre: "Taladro Percutor 650W",
      categoria: "Herramientas y Maquinaria",
      stock: 15,
      minimo: 10,
      unidad: "Unidad",
    },
    {
      id: 14,
      codigo: "HER-MAN-001",
      nombre: "Martillo Carpintero 16oz",
      categoria: "Herramientas y Maquinaria",
      stock: 42,
      minimo: 20,
      unidad: "Unidad",
    },
    {
      id: 15,
      codigo: "HER-ACC-001",
      nombre: "Set Brocas HSS 20pz",
      categoria: "Herramientas y Maquinaria",
      stock: 6,
      minimo: 15,
      unidad: "Set",
    },
    {
      id: 16,
      codigo: "DRY-PLA-001",
      nombre: "Plancha Drywall 1.2x2.4m",
      categoria: "Drywall",
      stock: 180,
      minimo: 50,
      unidad: "Plancha",
    },
    {
      id: 17,
      codigo: "DRY-PER-001",
      nombre: "Perfil Omega 3m",
      categoria: "Drywall",
      stock: 22,
      minimo: 40,
      unidad: "Unidad",
    },
    {
      id: 18,
      codigo: "DRY-RIE-001",
      nombre: "Riel 3m Galvanizado",
      categoria: "Drywall",
      stock: 0,
      minimo: 30,
      unidad: "Unidad",
    },
    {
      id: 19,
      codigo: "PIS-LAM-001",
      nombre: "Piso Laminado Roble 8mm",
      categoria: "Pisos",
      stock: 340,
      minimo: 100,
      unidad: "Caja",
    },
    {
      id: 20,
      codigo: "PIS-VIN-001",
      nombre: "Piso Vinílico Gris 3mm",
      categoria: "Pisos",
      stock: 78,
      minimo: 80,
      unidad: "Caja",
    },
  ];

  // Historial de movimientos
  let MOVIMIENTOS = [
    {
      id: 1,
      productoId: 1,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      tipo: "entrada",
      cantidad: 100,
      motivo: "Compra a proveedor",
      observaciones: "Factura F001-2345",
      fecha: "2026-09-21 09:15",
      usuario: "Luis Ramírez",
      stockAntes: 145,
      stockDespues: 245,
    },
    {
      id: 2,
      productoId: 8,
      codigo: "FER-BIS-001",
      producto: "Bisagra Cazoleta 35mm",
      tipo: "entrada",
      cantidad: 500,
      motivo: "Compra a proveedor",
      observaciones: "Boleta B001-1123",
      fecha: "2026-09-21 08:30",
      usuario: "Luis Ramírez",
      stockAntes: 20,
      stockDespues: 520,
    },
    {
      id: 3,
      productoId: 1,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      tipo: "salida",
      cantidad: 25,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Venta según Boleta N° 102",
      fecha: "2026-09-21 08:00",
      usuario: "María Torres",
      stockAntes: 270,
      stockDespues: 245,
    },
    {
      id: 4,
      productoId: 3,
      codigo: "MAD-MDF-001",
      producto: "MDF 15mm Crudo",
      tipo: "salida",
      cantidad: 40,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Venta según Factura N° 045",
      fecha: "2026-09-20 17:30",
      usuario: "María Torres",
      stockAntes: 220,
      stockDespues: 180,
    },
    {
      id: 5,
      productoId: 5,
      codigo: "MAD-AGL-001",
      producto: "Aglomerado 18mm",
      tipo: "ajuste",
      cantidad: 8,
      motivo: "Ajuste por daño",
      observaciones: "Ajuste por tabla dañada",
      fecha: "2026-09-20 16:00",
      usuario: "Carlos Mendoza",
      stockAntes: 15,
      stockDespues: 8,
    },
    {
      id: 6,
      productoId: 14,
      codigo: "HER-MAN-001",
      producto: "Martillo Carpintero 16oz",
      tipo: "entrada",
      cantidad: 20,
      motivo: "Compra a proveedor",
      observaciones: "Compra semanal",
      fecha: "2026-09-20 14:20",
      usuario: "Luis Ramírez",
      stockAntes: 22,
      stockDespues: 42,
    },
    {
      id: 7,
      productoId: 19,
      codigo: "PIS-LAM-001",
      producto: "Piso Laminado Roble 8mm",
      tipo: "salida",
      cantidad: 60,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Venta a Constructora XYZ",
      fecha: "2026-09-20 11:45",
      usuario: "María Torres",
      stockAntes: 400,
      stockDespues: 340,
    },
    {
      id: 8,
      productoId: 6,
      codigo: "MAD-OSB-001",
      producto: "OSB 11mm",
      tipo: "salida",
      cantidad: 25,
      motivo: "Venta según Boleta/Factura",
      observaciones: "Venta última unidad",
      fecha: "2026-09-19 15:30",
      usuario: "María Torres",
      stockAntes: 25,
      stockDespues: 0,
    },
  ];

  let nextId = MOVIMIENTOS.length + 1;
  let currentFilters = { search: "", type: "", date: "today" };
  let selectedProduct = null;

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

  const isToday = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };

  const isThisWeek = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const isThisMonth = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
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
  // FILTRADO
  // ============================================
  const filterMovimientos = () => {
    let filtered = [...MOVIMIENTOS];

    // Filtro por tipo
    if (currentFilters.type) {
      filtered = filtered.filter((m) => m.tipo === currentFilters.type);
    }

    // Filtro por fecha
    if (currentFilters.date === "today") {
      filtered = filtered.filter((m) => isToday(m.fecha));
    } else if (currentFilters.date === "week") {
      filtered = filtered.filter((m) => isThisWeek(m.fecha));
    } else if (currentFilters.date === "month") {
      filtered = filtered.filter((m) => isThisMonth(m.fecha));
    }

    // Búsqueda
    if (currentFilters.search) {
      const q = currentFilters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (m) =>
          m.codigo.toLowerCase().includes(q) ||
          m.producto.toLowerCase().includes(q) ||
          m.motivo.toLowerCase().includes(q) ||
          m.usuario.toLowerCase().includes(q),
      );
    }

    return filtered;
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  const renderTable = () => {
    const filtered = filterMovimientos();
    const tbody = document.getElementById("movimientos-tbody");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");

    if (!tbody) return;

    if (filtered.length === 0) {
      tbody.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      if (resultsCount) resultsCount.textContent = "0 resultados";
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    if (resultsCount)
      resultsCount.textContent = `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}`;

    tbody.innerHTML = filtered
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
                        <strong>${date}</strong>
                        <br><small class="text-muted">${time}</small>
                    </td>
                    <td><span class="code-tag">${m.codigo}</span></td>
                    <td>${m.producto}</td>
                    <td>
                        <span class="badge ${badgeClass}">
                            <i class="fas ${tipoIcon}"></i> ${tipoLabel}
                        </span>
                    </td>
                    <td class="${cantidadClass}">
                        <strong>${cantidadPrefix}${m.cantidad}</strong>
                    </td>
                    <td>
                        <div class="motivo-cell">
                            <strong>${m.motivo}</strong>
                            ${m.observaciones ? `<small>${m.observaciones}</small>` : ""}
                        </div>
                    </td>
                    <td>
                        <span class="user-cell">
                            <i class="fas fa-user-circle"></i> ${m.usuario}
                        </span>
                    </td>
                    <td>
                        <button class="btn-icon btn-detail-mov" data-id="${m.id}" title="Ver detalle">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");

    // Eventos
    tbody.querySelectorAll(".btn-detail-mov").forEach((btn) => {
      btn.addEventListener("click", () =>
        openDetailModal(parseInt(btn.dataset.id)),
      );
    });
  };

  const updateKPIs = () => {
    const hoy = MOVIMIENTOS.filter((m) => isToday(m.fecha));

    const entradas = hoy
      .filter((m) => m.tipo === "entrada")
      .reduce((sum, m) => sum + m.cantidad, 0);
    const salidas = hoy
      .filter((m) => m.tipo === "salida")
      .reduce((sum, m) => sum + m.cantidad, 0);
    const ajustes = hoy
      .filter((m) => m.tipo === "ajuste")
      .reduce((sum, m) => sum + m.cantidad, 0);
    const total = hoy.length;

    document.getElementById("kpi-entradas").textContent = entradas;
    document.getElementById("kpi-salidas").textContent = salidas;
    document.getElementById("kpi-ajustes").textContent = ajustes;
    document.getElementById("kpi-total").textContent = total;
  };

  // ============================================
  // BÚSQUEDA DE PRODUCTOS
  // ============================================
  const searchProducts = (query) => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.codigo.toLowerCase().includes(q) ||
        p.nombre.toLowerCase().includes(q),
    ).slice(0, 8);
  };

  const renderProductResults = (products) => {
    const resultsContainer = document.getElementById("product-results");
    if (!resultsContainer) return;

    if (products.length === 0) {
      resultsContainer.classList.add("hidden");
      return;
    }

    resultsContainer.classList.remove("hidden");
    resultsContainer.innerHTML = products
      .map(
        (p) => `
            <div class="product-result-item" data-id="${p.id}">
                <div class="product-result-icon">
                    <i class="fas fa-box"></i>
                </div>
                <div class="product-result-info">
                    <strong>${p.nombre}</strong>
                    <small>${p.codigo} · ${p.categoria}</small>
                </div>
                <div class="product-result-stock">
                    <strong>${p.stock}</strong>
                    <small>${p.unidad}</small>
                </div>
            </div>
        `,
      )
      .join("");

    resultsContainer
      .querySelectorAll(".product-result-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          const id = parseInt(item.dataset.id);
          selectProduct(id);
        });
      });
  };

  const selectProduct = (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    selectedProduct = product;

    // Ocultar búsqueda y mostrar producto seleccionado
    document.getElementById("product-results").classList.add("hidden");
    document.getElementById("product-search").value = "";

    const selectedDiv = document.getElementById("selected-product");
    selectedDiv.classList.remove("hidden");
    selectedDiv.innerHTML = `
            <div class="selected-product-card">
                <div class="selected-product-info">
                    <span class="selected-product-code">${product.codigo}</span>
                    <strong>${product.nombre}</strong>
                    <small>${product.categoria}</small>
                </div>
                <div class="selected-product-stock">
                    <span>Stock actual</span>
                    <strong>${product.stock} ${product.unidad}</strong>
                </div>
                <button type="button" class="btn-change-product" id="btn-change-product">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

    document
      .getElementById("btn-change-product")
      .addEventListener("click", () => {
        selectedProduct = null;
        selectedDiv.classList.add("hidden");
        document.getElementById("product-search").focus();
        updatePreview();
      });

    // Actualizar preview y validación
    updatePreview();
  };

  // ============================================
  // PREVIEW Y VALIDACIÓN DE STOCK (RN-03)
  // ============================================
  const updatePreview = () => {
    const cantidadInput = document.getElementById("mov-cantidad");
    const cantidad = parseInt(cantidadInput?.value) || 0;
    const tipo =
      document.querySelector('input[name="mov-tipo"]:checked')?.value ||
      "entrada";
    const preview = document.getElementById("mov-preview-value");
    const warning = document.getElementById("stock-warning");
    const warningMsg = document.getElementById("stock-warning-message");
    const saveBtn = document.getElementById("btn-save-movement");
    const cantidadError = document.getElementById("cantidad-error");

    if (!selectedProduct) {
      if (preview) preview.textContent = "0";
      if (warning) warning.classList.add("hidden");
      if (saveBtn) saveBtn.disabled = false;
      return;
    }

    let nuevoStock = selectedProduct.stock;

    // ⚠️ VALIDACIÓN RN-03: STOCK INSUFICIENTE
    if (tipo === "salida") {
      if (cantidad > selectedProduct.stock) {
        // Mostrar warning ROJO
        if (warning) {
          warning.classList.remove("hidden");
          warningMsg.textContent = `No puedes despachar ${cantidad} ${selectedProduct.unidad}. Stock disponible: ${selectedProduct.stock} ${selectedProduct.unidad}.`;
        }
        if (cantidadError) {
          cantidadError.textContent = `Stock insuficiente. Máximo: ${selectedProduct.stock}`;
        }
        // ⚠️ BLOQUEAR BOTÓN DE GUARDADO
        if (saveBtn) {
          saveBtn.disabled = true;
          saveBtn.classList.add("btn-disabled");
        }
        nuevoStock = selectedProduct.stock - cantidad; // Muestra el cálculo negativo
      } else {
        // Stock OK
        if (warning) warning.classList.add("hidden");
        if (cantidadError) cantidadError.textContent = "";
        if (saveBtn) {
          saveBtn.disabled = false;
          saveBtn.classList.remove("btn-disabled");
        }
        nuevoStock = selectedProduct.stock - cantidad;
      }
    } else if (tipo === "entrada") {
      if (warning) warning.classList.add("hidden");
      if (cantidadError) cantidadError.textContent = "";
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.classList.remove("btn-disabled");
      }
      nuevoStock = selectedProduct.stock + cantidad;
    } else {
      // Ajuste
      if (warning) warning.classList.add("hidden");
      if (cantidadError) cantidadError.textContent = "";
      if (saveBtn) {
        saveBtn.disabled = false;
        saveBtn.classList.remove("btn-disabled");
      }
      nuevoStock = cantidad;
    }

    // Actualizar preview
    if (preview) {
      preview.textContent = `${nuevoStock} ${selectedProduct.unidad}`;
      preview.className = "mov-preview-value";
      if (nuevoStock < 0) preview.classList.add("preview-danger");
      else if (nuevoStock === 0) preview.classList.add("preview-danger");
      else if (nuevoStock < selectedProduct.minimo)
        preview.classList.add("preview-warning");
      else preview.classList.add("preview-success");
    }
  };

  // ============================================
  // MODAL DE NUEVO MOVIMIENTO
  // ============================================
  const openMovimientoModal = () => {
    selectedProduct = null;

    // Reset form
    document.getElementById("movimiento-form").reset();
    document.getElementById("product-search").value = "";
    document.getElementById("product-results").classList.add("hidden");
    document.getElementById("selected-product").classList.add("hidden");
    document.getElementById("stock-warning").classList.add("hidden");
    document.getElementById("mov-cantidad").value = "";
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));
    document.querySelector('input[name="mov-tipo"][value="entrada"]').checked =
      true;

    const saveBtn = document.getElementById("btn-save-movement");
    saveBtn.disabled = false;
    saveBtn.classList.remove("btn-disabled");

    updatePreview();
    document.getElementById("movimiento-modal").classList.remove("hidden");

    setTimeout(() => document.getElementById("product-search").focus(), 200);
  };

  // ============================================
  // SUBMIT DEL MOVIMIENTO
  // ============================================
  const handleMovimientoSubmit = (e) => {
    e.preventDefault();

    // Limpiar errores
    document
      .querySelectorAll("#movimiento-form .error-message")
      .forEach((el) => (el.textContent = ""));

    // Validaciones
    let isValid = true;

    if (!selectedProduct) {
      document.getElementById("producto-error").textContent =
        "Debes seleccionar un producto.";
      isValid = false;
    }

    const cantidad =
      parseInt(document.getElementById("mov-cantidad").value) || 0;
    if (cantidad <= 0) {
      document.getElementById("cantidad-error").textContent =
        "La cantidad debe ser mayor a 0.";
      isValid = false;
    }

    const motivo = document.getElementById("mov-motivo-tipo").value;
    const observaciones = document
      .getElementById("mov-observaciones")
      .value.trim();

    if (!motivo) {
      document.getElementById("motivo-error").textContent =
        "Debes seleccionar un motivo.";
      isValid = false;
    }
    if (!observaciones || observaciones.length < 5) {
      document.getElementById("motivo-error").textContent =
        "Debes escribir una observación (mínimo 5 caracteres).";
      isValid = false;
    }

    if (!isValid) return;

    const tipo = document.querySelector('input[name="mov-tipo"]:checked').value;

    // ⚠️ VALIDACIÓN FINAL RN-03
    if (tipo === "salida" && cantidad > selectedProduct.stock) {
      document.getElementById("cantidad-error").textContent =
        `Stock insuficiente. Máximo: ${selectedProduct.stock}`;
      return;
    }

    // Aplicar movimiento
    const stockAntes = selectedProduct.stock;
    let stockDespues = stockAntes;

    if (tipo === "entrada") stockDespues += cantidad;
    else if (tipo === "salida") stockDespues -= cantidad;
    else if (tipo === "ajuste") stockDespues = cantidad;

    selectedProduct.stock = stockDespues;

    // Registrar movimiento
    const userName = sessionStorage.getItem("userName") || "Usuario";
    const now = new Date();
    const fechaStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    MOVIMIENTOS.unshift({
      id: nextId++,
      productoId: selectedProduct.id,
      codigo: selectedProduct.codigo,
      producto: selectedProduct.nombre,
      tipo,
      cantidad,
      motivo,
      observaciones,
      fecha: fechaStr,
      usuario: userName,
      stockAntes,
      stockDespues,
    });

    document.getElementById("movimiento-modal").classList.add("hidden");

    const tipoLabel =
      tipo === "entrada" ? "Entrada" : tipo === "salida" ? "Salida" : "Ajuste";
    showToast(
      `✅ ${tipoLabel} registrada: ${cantidad} ${selectedProduct.unidad} de ${selectedProduct.nombre}`,
      "success",
    );

    renderTable();
    updateKPIs();
  };

  // ============================================
  // MODAL DE DETALLE
  // ============================================
  const openDetailModal = (id) => {
    const mov = MOVIMIENTOS.find((m) => m.id === id);
    if (!mov) return;

    const { date, time } = formatDate(mov.fecha);
    const isEntrada = mov.tipo === "entrada";
    const isSalida = mov.tipo === "salida";
    const tipoLabel = isEntrada ? "Entrada" : isSalida ? "Salida" : "Ajuste";
    const tipoIcon = isEntrada
      ? "fa-arrow-down"
      : isSalida
        ? "fa-arrow-up"
        : "fa-balance-scale";
    const tipoClass = isEntrada
      ? "detail-entrada"
      : isSalida
        ? "detail-salida"
        : "detail-ajuste";

    document.getElementById("detail-mov-body").innerHTML = `
            <div class="detail-mov-header ${tipoClass}">
                <i class="fas ${tipoIcon}"></i>
                <div>
                    <span class="detail-mov-type">${tipoLabel}</span>
                    <span class="detail-mov-date">${date} a las ${time}</span>
                </div>
            </div>
            
            <div class="detail-mov-grid">
                <div class="detail-mov-field">
                    <span class="detail-mov-label">Código</span>
                    <span class="detail-mov-value code-tag">${mov.codigo}</span>
                </div>
                <div class="detail-mov-field detail-mov-full">
                    <span class="detail-mov-label">Producto</span>
                    <span class="detail-mov-value">${mov.producto}</span>
                </div>
                <div class="detail-mov-field">
                    <span class="detail-mov-label">Cantidad</span>
                    <span class="detail-mov-value">${mov.cantidad}</span>
                </div>
                <div class="detail-mov-field">
                    <span class="detail-mov-label">Usuario</span>
                    <span class="detail-mov-value">${mov.usuario}</span>
                </div>
                <div class="detail-mov-field detail-mov-full">
                    <span class="detail-mov-label">Motivo</span>
                    <span class="detail-mov-value">${mov.motivo}</span>
                </div>
                <div class="detail-mov-field detail-mov-full">
                    <span class="detail-mov-label">Observaciones</span>
                    <span class="detail-mov-value">${mov.observaciones || "Sin observaciones"}</span>
                </div>
            </div>

            <div class="detail-mov-stock-flow">
                <div class="stock-flow-item">
                    <span class="stock-flow-label">Stock Antes</span>
                    <span class="stock-flow-value">${mov.stockAntes}</span>
                </div>
                <i class="fas fa-arrow-right stock-flow-arrow"></i>
                <div class="stock-flow-item stock-flow-result">
                    <span class="stock-flow-label">Stock Después</span>
                    <span class="stock-flow-value">${mov.stockDespues}</span>
                </div>
            </div>
        `;

    document.getElementById("detail-modal").classList.remove("hidden");
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const loadUserInfo = () => {
    const role = sessionStorage.getItem("userRole") || "Invitado";
    const name = sessionStorage.getItem("userName") || "Usuario";
    const avatar = sessionStorage.getItem("userAvatar") || "U";
    const color = sessionStorage.getItem("userColor") || "#f37021";

    const nameEl = document.getElementById("user-name-display");
    const roleEl = document.getElementById("user-role-display");
    const avatarEl = document.getElementById("user-avatar-display");

    if (nameEl) nameEl.textContent = name;
    if (roleEl) {
      let shortRole = role;
      if (role.includes("Super")) shortRole = "Administrador";
      else if (role.includes("Almacén")) shortRole = "Almacenero";
      roleEl.textContent = shortRole;
    }
    if (avatarEl) {
      avatarEl.textContent = avatar;
      avatarEl.style.background = `linear-gradient(135deg, ${color}, #005a2b)`;
    }
  };

  const initFilters = () => {
    const searchInput = document.getElementById("search-input");
    const typeFilter = document.getElementById("filter-type");
    const dateFilter = document.getElementById("filter-date");

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentFilters.search = e.target.value;
        renderTable();
      });
    }
    if (typeFilter) {
      typeFilter.addEventListener("change", (e) => {
        currentFilters.type = e.target.value;
        renderTable();
      });
    }
    if (dateFilter) {
      dateFilter.addEventListener("change", (e) => {
        currentFilters.date = e.target.value;
        renderTable();
      });
    }

    const btnExport = document.getElementById("btn-export");
    if (btnExport) {
      btnExport.addEventListener("click", () => {
        showToast("📄 Reporte exportado correctamente", "success");
      });
    }

    const btnNew = document.getElementById("btn-new-movement");
    if (btnNew) {
      btnNew.addEventListener("click", openMovimientoModal);
    }
  };

  const initModal = () => {
    // Cerrar modales
    document
      .getElementById("close-movimiento-modal")
      ?.addEventListener("click", () => {
        document.getElementById("movimiento-modal").classList.add("hidden");
      });
    document
      .getElementById("cancel-movimiento")
      ?.addEventListener("click", () => {
        document.getElementById("movimiento-modal").classList.add("hidden");
      });
    document
      .getElementById("close-detail-modal")
      ?.addEventListener("click", () => {
        document.getElementById("detail-modal").classList.add("hidden");
      });

    // Cerrar al hacer clic fuera
    window.addEventListener("click", (e) => {
      ["movimiento-modal", "detail-modal"].forEach((id) => {
        const modal = document.getElementById(id);
        if (e.target === modal) modal.classList.add("hidden");
      });
    });

    // Búsqueda de productos
    const productSearch = document.getElementById("product-search");
    if (productSearch) {
      productSearch.addEventListener("input", (e) => {
        const results = searchProducts(e.target.value);
        renderProductResults(results);
      });

      productSearch.addEventListener("blur", () => {
        setTimeout(() => {
          document.getElementById("product-results")?.classList.add("hidden");
        }, 200);
      });
    }

    // Tipo de movimiento
    document.querySelectorAll('input[name="mov-tipo"]').forEach((radio) => {
      radio.addEventListener("change", updatePreview);
    });

    // Cantidad
    const cantidadInput = document.getElementById("mov-cantidad");
    if (cantidadInput) {
      cantidadInput.addEventListener("input", updatePreview);
    }

    // Botones +/-
    document.getElementById("qty-minus")?.addEventListener("click", () => {
      const input = document.getElementById("mov-cantidad");
      const val = parseInt(input.value) || 0;
      if (val > 1) {
        input.value = val - 1;
        updatePreview();
      }
    });
    document.getElementById("qty-plus")?.addEventListener("click", () => {
      const input = document.getElementById("mov-cantidad");
      const val = parseInt(input.value) || 0;
      input.value = val + 1;
      updatePreview();
    });

    // Submit del form
    document
      .getElementById("movimiento-form")
      ?.addEventListener("submit", handleMovimientoSubmit);
  };

  const init = () => {
    console.log("📥 Inicializando Entradas y Salidas...");

    loadUserInfo();
    renderTable();
    updateKPIs();
    initFilters();
    initModal();

    if (typeof NavModule !== "undefined") {
      NavModule.init("movimientos");
    }

    console.log(
      "✅ Entradas y Salidas cargado. Total movimientos:",
      MOVIMIENTOS.length,
    );
  };

  return { init };
})();

console.log("🚀 movimientos.js cargado correctamente");
