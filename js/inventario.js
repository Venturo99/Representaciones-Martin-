/**
 * Módulo de Inventario
 * RF-FE-03, RF-FE-04, RF-FE-06, RF-FE-07
 * Incluye: Filtro rápido por estado + Acceso directo a Registrar Movimiento
 */
const InventarioModule = (() => {
  const CATEGORIAS = [
    "Maderas y Tableros",
    "Ferretería",
    "Herramientas y Maquinaria",
    "Drywall",
    "Pisos",
  ];

  // ============================================
  // PRODUCTOS CON STOCK Y UBICACIÓN
  // ============================================
  let PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      categoria: "Maderas y Tableros",
      stock: 245,
      minimo: 50,
      unidad: "Plancha",
      zona: "A",
      pasillo: "01",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      categoria: "Maderas y Tableros",
      stock: 32,
      minimo: 50,
      unidad: "Plancha",
      zona: "A",
      pasillo: "01",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      nombre: "MDF 15mm Crudo",
      categoria: "Maderas y Tableros",
      stock: 180,
      minimo: 60,
      unidad: "Plancha",
      zona: "A",
      pasillo: "02",
      rack: "R1",
      nivel: "N2",
    },
    {
      id: 4,
      codigo: "MAD-TRI-001",
      nombre: "Triplay 4mm",
      categoria: "Maderas y Tableros",
      stock: 95,
      minimo: 40,
      unidad: "Plancha",
      zona: "B",
      pasillo: "01",
      rack: "R3",
      nivel: "N1",
    },
    {
      id: 5,
      codigo: "MAD-AGL-001",
      nombre: "Aglomerado 18mm",
      categoria: "Maderas y Tableros",
      stock: 8,
      minimo: 30,
      unidad: "Plancha",
      zona: "B",
      pasillo: "02",
      rack: "R1",
      nivel: "N2",
    },
    {
      id: 6,
      codigo: "MAD-OSB-001",
      nombre: "OSB 11mm",
      categoria: "Maderas y Tableros",
      stock: 0,
      minimo: 25,
      unidad: "Plancha",
      zona: "B",
      pasillo: "03",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 7,
      codigo: "MAD-HDF-001",
      nombre: "HDF 3mm",
      categoria: "Maderas y Tableros",
      stock: 12,
      minimo: 40,
      unidad: "Plancha",
      zona: "B",
      pasillo: "03",
      rack: "R3",
      nivel: "N1",
    },
    {
      id: 8,
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      categoria: "Ferretería",
      stock: 520,
      minimo: 100,
      unidad: "Unidad",
      zona: "C",
      pasillo: "01",
      rack: "R1",
      nivel: "N3",
    },
    {
      id: 9,
      codigo: "FER-COR-001",
      nombre: "Corredera Telescópica 45cm",
      categoria: "Ferretería",
      stock: 45,
      minimo: 80,
      unidad: "Unidad",
      zona: "C",
      pasillo: "02",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 10,
      codigo: "FER-JAL-001",
      nombre: "Jalador Acero Inox 128mm",
      categoria: "Ferretería",
      stock: 210,
      minimo: 60,
      unidad: "Unidad",
      zona: "C",
      pasillo: "02",
      rack: "R3",
      nivel: "N2",
    },
    {
      id: 11,
      codigo: "FER-SOP-001",
      nombre: "Soporte Estante 20cm",
      categoria: "Ferretería",
      stock: 18,
      minimo: 50,
      unidad: "Unidad",
      zona: "C",
      pasillo: "03",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 12,
      codigo: "FER-PIS-001",
      nombre: "Pistón Hidráulico 100N",
      categoria: "Ferretería",
      stock: 0,
      minimo: 30,
      unidad: "Unidad",
      zona: "C",
      pasillo: "03",
      rack: "R2",
      nivel: "N2",
    },
    {
      id: 13,
      codigo: "HER-ELE-001",
      nombre: "Taladro Percutor 650W",
      categoria: "Herramientas y Maquinaria",
      stock: 15,
      minimo: 10,
      unidad: "Unidad",
      zona: "D",
      pasillo: "01",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 14,
      codigo: "HER-MAN-001",
      nombre: "Martillo Carpintero 16oz",
      categoria: "Herramientas y Maquinaria",
      stock: 42,
      minimo: 20,
      unidad: "Unidad",
      zona: "D",
      pasillo: "01",
      rack: "R2",
      nivel: "N2",
    },
    {
      id: 15,
      codigo: "HER-ACC-001",
      nombre: "Set Brocas HSS 20pz",
      categoria: "Herramientas y Maquinaria",
      stock: 6,
      minimo: 15,
      unidad: "Set",
      zona: "D",
      pasillo: "02",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 16,
      codigo: "DRY-PLA-001",
      nombre: "Plancha Drywall 1.2x2.4m",
      categoria: "Drywall",
      stock: 180,
      minimo: 50,
      unidad: "Plancha",
      zona: "E",
      pasillo: "01",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 17,
      codigo: "DRY-PER-001",
      nombre: "Perfil Omega 3m",
      categoria: "Drywall",
      stock: 22,
      minimo: 40,
      unidad: "Unidad",
      zona: "E",
      pasillo: "02",
      rack: "R1",
      nivel: "N2",
    },
    {
      id: 18,
      codigo: "DRY-RIE-001",
      nombre: "Riel 3m Galvanizado",
      categoria: "Drywall",
      stock: 0,
      minimo: 30,
      unidad: "Unidad",
      zona: "E",
      pasillo: "02",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 19,
      codigo: "PIS-LAM-001",
      nombre: "Piso Laminado Roble 8mm",
      categoria: "Pisos",
      stock: 340,
      minimo: 100,
      unidad: "Caja",
      zona: "E",
      pasillo: "03",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 20,
      codigo: "PIS-VIN-001",
      nombre: "Piso Vinílico Gris 3mm",
      categoria: "Pisos",
      stock: 78,
      minimo: 80,
      unidad: "Caja",
      zona: "E",
      pasillo: "03",
      rack: "R3",
      nivel: "N2",
    },
  ];

  let currentFilters = { search: "", categoria: "", stockStatus: "" };
  let currentMovProduct = null;

  // ============================================
  // UTILIDADES
  // ============================================
  const getStockStatus = (stock, minimo) => {
    if (stock === 0)
      return { label: "Sin Stock", class: "badge-danger", type: "zero" };
    if (stock < minimo * 0.5)
      return {
        label: "Stock Crítico",
        class: "badge-danger",
        type: "critical",
      };
    if (stock < minimo)
      return { label: "Stock Bajo", class: "badge-warning", type: "low" };
    return { label: "Disponible", class: "badge-success", type: "ok" };
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
  // RENDERIZADO
  // ============================================
  const renderTable = (products) => {
    const tbody = document.getElementById("inventario-tbody");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");
    if (!tbody) return;

    if (products.length === 0) {
      tbody.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      if (resultsCount) resultsCount.textContent = "0 resultados";
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    if (resultsCount)
      resultsCount.textContent = `${products.length} resultado${products.length !== 1 ? "s" : ""}`;

    tbody.innerHTML = products
      .map((p) => {
        const status = getStockStatus(p.stock, p.minimo);
        const stockClass =
          p.stock === 0
            ? "stock-zero"
            : p.stock < p.minimo
              ? "stock-low"
              : "stock-ok";

        return `
                <tr>
                    <td><strong>${p.codigo}</strong></td>
                    <td>${p.nombre}</td>
                    <td><span class="category-tag">${p.categoria}</span></td>
                    <td class="${stockClass}"><strong>${p.stock}</strong> <small>${p.unidad}</small></td>
                    <td>${p.minimo}</td>
                    <td><strong>${p.stock - p.minimo}</strong></td>
                    <td>
                        <span class="location-tag">
                            <i class="fas fa-map-marker-alt"></i>
                            ${p.zona}-${p.pasillo}-${p.rack}-${p.nivel}
                        </span>
                    </td>
                    <td><span class="badge ${status.class}">${status.label}</span></td>
                    <td class="actions-cell">
                        <button class="btn-icon btn-movimiento" data-id="${p.id}" title="Registrar Movimiento">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                        <button class="btn-icon btn-edit" data-id="${p.id}" title="Editar producto">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
      })
      .join("");

    // ⭐ ACCESO DIRECTO A REGISTRAR MOVIMIENTO
    tbody.querySelectorAll(".btn-movimiento").forEach((btn) => {
      btn.addEventListener("click", () =>
        openMovimientoModal(parseInt(btn.dataset.id)),
      );
    });

    tbody.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => {
        alert("🚧 Edición rápida en desarrollo. Use el Catálogo de Productos.");
      });
    });
  };

  const updateSummary = (products) => {
    const total = products.length;
    const ok = products.filter(
      (p) => p.stock >= p.minimo && p.stock > 0,
    ).length;
    const warning = products.filter(
      (p) => p.stock > 0 && p.stock < p.minimo,
    ).length;
    const danger = products.filter((p) => p.stock === 0).length;

    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set("summary-total", total);
    set("summary-ok", ok);
    set("summary-warning", warning);
    set("summary-danger", danger);

    // Actualizar contadores de botones rápidos
    set(
      "critical-count",
      products.filter((p) => p.stock > 0 && p.stock < p.minimo * 0.5).length +
        danger,
    );
    set("low-count", warning);
    set("ok-count", ok);
  };

  // ============================================
  // FILTROS
  // ============================================
  const applyFilters = () => {
    const search = currentFilters.search.toLowerCase().trim();
    const cat = currentFilters.categoria;
    const status = currentFilters.stockStatus;

    const filtered = PRODUCTS.filter((p) => {
      const matchSearch =
        !search ||
        p.codigo.toLowerCase().includes(search) ||
        p.nombre.toLowerCase().includes(search) ||
        p.categoria.toLowerCase().includes(search) ||
        p.zona.toLowerCase().includes(search);
      const matchCat = !cat || p.categoria === cat;

      let matchStatus = true;
      if (status) {
        const st = getStockStatus(p.stock, p.minimo);
        if (status === "critical") {
          matchStatus = st.type === "critical" || st.type === "zero";
        } else {
          matchStatus = st.type === status;
        }
      }

      return matchSearch && matchCat && matchStatus;
    });

    renderTable(filtered);
    updateSummary(filtered);
  };

  const initFilters = () => {
    const searchInput = document.getElementById("search-input");
    const catFilter = document.getElementById("filter-category");
    const stockFilter = document.getElementById("filter-stock-status");

    // Llenar categorías
    if (catFilter) {
      CATEGORIAS.forEach((cat) => {
        const opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        catFilter.appendChild(opt);
      });

      catFilter.addEventListener("change", (e) => {
        currentFilters.categoria = e.target.value;
        applyFilters();
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentFilters.search = e.target.value;
        applyFilters();
      });
    }

    if (stockFilter) {
      stockFilter.addEventListener("change", (e) => {
        currentFilters.stockStatus = e.target.value;
        applyFilters();
      });
    }

    // ⭐ BOTONES DE ACCIÓN RÁPIDA (con data-filter)
    const quickButtons = document.querySelectorAll(".quick-btn[data-filter]");

    quickButtons.forEach((btn) => {
      // Remover listeners previos clonando
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);

      newBtn.addEventListener("click", () => {
        const filterValue = newBtn.dataset.filter;
        console.log(`🔘 Filtro rápido: "${filterValue}"`);

        // Actualizar clases activas
        document
          .querySelectorAll(".quick-btn")
          .forEach((b) => b.classList.remove("active"));
        newBtn.classList.add("active");

        // Actualizar filtro
        currentFilters.stockStatus = filterValue;
        if (stockFilter) stockFilter.value = filterValue;

        applyFilters();
      });
    });

    // Exportar (simulado)
    const btnExport = document.getElementById("btn-export");
    if (btnExport) {
      btnExport.addEventListener("click", () => {
        showToast("📄 Reporte exportado correctamente", "success");
      });
    }
  };

  // ============================================
  // MODAL REGISTRAR MOVIMIENTO
  // ============================================
  const openMovimientoModal = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    currentMovProduct = product;

    // Info del producto
    document.getElementById("mov-codigo").textContent = product.codigo;
    document.getElementById("mov-nombre").textContent = product.nombre;
    document.getElementById("mov-stock-display").textContent =
      `Stock actual: ${product.stock} ${product.unidad}`;
    document.getElementById("mov-ubicacion").textContent =
      `${product.zona}-${product.pasillo}-${product.rack}-${product.nivel}`;
    document.getElementById("mov-product-id").value = product.id;
    document.getElementById("mov-stock-actual").value = product.stock;

    // Reset form
    document.getElementById("movimiento-form").reset();
    document.querySelector('input[name="mov-tipo"][value="entrada"]').checked =
      true;
    document.getElementById("cantidad-error").textContent = "";

    // Preview
    updatePreview();

    document.getElementById("movimiento-modal").classList.remove("hidden");
  };

  const updatePreview = () => {
    const cantidad =
      parseInt(document.getElementById("mov-cantidad").value) || 0;
    const stockActual =
      parseInt(document.getElementById("mov-stock-actual").value) || 0;
    const tipo =
      document.querySelector('input[name="mov-tipo"]:checked')?.value ||
      "entrada";

    let nuevoStock = stockActual;
    if (tipo === "entrada") nuevoStock = stockActual + cantidad;
    else if (tipo === "salida")
      nuevoStock = Math.max(0, stockActual - cantidad);
    else if (tipo === "ajuste") nuevoStock = cantidad;

    const preview = document.getElementById("mov-preview-value");
    if (preview) {
      preview.textContent = `${nuevoStock} ${currentMovProduct ? currentMovProduct.unidad : "unidades"}`;
      preview.className = "mov-preview-value";
      if (nuevoStock === 0) preview.classList.add("preview-danger");
      else if (currentMovProduct && nuevoStock < currentMovProduct.minimo)
        preview.classList.add("preview-warning");
      else preview.classList.add("preview-success");
    }
  };

  const handleMovimientoSubmit = (e) => {
    e.preventDefault();

    const productId = parseInt(document.getElementById("mov-product-id").value);
    const cantidad = parseInt(document.getElementById("mov-cantidad").value);
    const tipo = document.querySelector('input[name="mov-tipo"]:checked').value;
    const motivo = document.getElementById("mov-motivo").value;
    const observaciones = document.getElementById("mov-observaciones").value;

    // Validaciones
    if (!cantidad || cantidad <= 0) {
      document.getElementById("cantidad-error").textContent =
        "La cantidad debe ser mayor a 0.";
      return;
    }

    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    if (tipo === "salida" && cantidad > product.stock) {
      document.getElementById("cantidad-error").textContent =
        `No hay suficiente stock. Disponible: ${product.stock}`;
      return;
    }

    // Aplicar movimiento
    let nuevoStock = product.stock;
    if (tipo === "entrada") nuevoStock += cantidad;
    else if (tipo === "salida") nuevoStock -= cantidad;
    else if (tipo === "ajuste") nuevoStock = cantidad;

    product.stock = nuevoStock;

    // Registrar en historial (simulado)
    console.log("📝 Movimiento registrado:", {
      producto: product.nombre,
      tipo,
      cantidad,
      motivo,
      observaciones,
      stockAntes: product.stock - (tipo === "entrada" ? cantidad : -cantidad),
      stockDespues: product.stock,
      usuario: sessionStorage.getItem("userName") || "Usuario",
    });

    document.getElementById("movimiento-modal").classList.add("hidden");

    const tipoLabel =
      tipo === "entrada" ? "Entrada" : tipo === "salida" ? "Salida" : "Ajuste";
    showToast(`✅ ${tipoLabel} registrada: ${product.nombre}`, "success");

    applyFilters();
  };

  // ============================================
  // NAVEGACIÓN Y USUARIO
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

  const initNavigation = () => {
    // ⭐ Usar el módulo de navegación centralizado
    NavModule.init("inventario");
  };
  const logout = document.getElementById("logout-btn");
  if (logout)
    logout.addEventListener("click", () => {
      if (confirm("¿Cerrar sesión?")) App.logout();
    });

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const init = () => {
    console.log("📦 Inicializando Inventario...");

    loadUserInfo();
    renderTable(PRODUCTS);
    updateSummary(PRODUCTS);
    initFilters();
    initNavigation();

    // ⭐ Asegurar que "Ver Todos" esté activo al inicio
    const btnAll = document.getElementById("btn-show-all");
    if (btnAll) btnAll.classList.add("active");

    // Modal movimiento
    const closeMov = document.getElementById("close-movimiento-modal");
    if (closeMov)
      closeMov.addEventListener("click", () => {
        document.getElementById("movimiento-modal").classList.add("hidden");
      });

    const cancelMov = document.getElementById("cancel-movimiento");
    if (cancelMov)
      cancelMov.addEventListener("click", () => {
        document.getElementById("movimiento-modal").classList.add("hidden");
      });

    const movForm = document.getElementById("movimiento-form");
    if (movForm) movForm.addEventListener("submit", handleMovimientoSubmit);

    // Actualizar preview al cambiar cantidad o tipo
    const cantidadInput = document.getElementById("mov-cantidad");
    if (cantidadInput) cantidadInput.addEventListener("input", updatePreview);

    document.querySelectorAll('input[name="mov-tipo"]').forEach((radio) => {
      radio.addEventListener("change", updatePreview);
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener("click", (e) => {
      if (e.target === document.getElementById("movimiento-modal")) {
        document.getElementById("movimiento-modal").classList.add("hidden");
      }
    });

    console.log("✅ Inventario cargado. Total productos:", PRODUCTS.length);
  };

  return { init };
})();

console.log("🚀 inventario.js cargado correctamente");
