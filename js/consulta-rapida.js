/**
 * Módulo de Consulta Rápida Inteligente
 */
const ConsultaRapidaModule = (() => {
  // ============================================
  // BASE DE PRODUCTOS
  // ============================================
  let PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      categoria: "Maderas y Tableros",
      subcategoria: "Melamina",
      stock: 245,
      minimo: 50,
      precio: 85.5,
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
      subcategoria: "Melamina",
      stock: 32,
      minimo: 50,
      precio: 92.0,
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
      subcategoria: "MDF",
      stock: 180,
      minimo: 60,
      precio: 68.0,
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
      subcategoria: "Triplay",
      stock: 95,
      minimo: 40,
      precio: 45.0,
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
      subcategoria: "Aglomerado",
      stock: 8,
      minimo: 30,
      precio: 55.0,
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
      subcategoria: "OSB",
      stock: 0,
      minimo: 25,
      precio: 72.0,
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
      subcategoria: "HDF",
      stock: 12,
      minimo: 40,
      precio: 48.0,
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
      subcategoria: "Bisagras",
      stock: 520,
      minimo: 100,
      precio: 3.5,
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
      subcategoria: "Correderas",
      stock: 45,
      minimo: 80,
      precio: 12.0,
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
      subcategoria: "Jaladores",
      stock: 210,
      minimo: 60,
      precio: 8.5,
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
      subcategoria: "Soportes",
      stock: 18,
      minimo: 50,
      precio: 6.0,
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
      subcategoria: "Pistones",
      stock: 0,
      minimo: 30,
      precio: 22.0,
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
      subcategoria: "Herramientas Eléctricas",
      stock: 15,
      minimo: 10,
      precio: 285.0,
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
      subcategoria: "Herramientas Manuales",
      stock: 42,
      minimo: 20,
      precio: 45.0,
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
      subcategoria: "Accesorios de Herramientas",
      stock: 6,
      minimo: 15,
      precio: 55.0,
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
      subcategoria: "Planchas",
      stock: 180,
      minimo: 50,
      precio: 32.0,
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
      subcategoria: "Perfiles y Ángulos",
      stock: 22,
      minimo: 40,
      precio: 15.5,
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
      subcategoria: "Rieles",
      stock: 0,
      minimo: 30,
      precio: 18.0,
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
      subcategoria: "Laminados",
      stock: 340,
      minimo: 100,
      precio: 42.0,
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
      subcategoria: "Vinílicos",
      stock: 78,
      minimo: 80,
      precio: 58.0,
      unidad: "Caja",
      zona: "E",
      pasillo: "03",
      rack: "R3",
      nivel: "N2",
    },
  ];

  // Historial simulado de movimientos
  const MOVIMIENTOS = [
    {
      id: 1,
      productoId: 1,
      tipo: "entrada",
      cantidad: 100,
      fecha: "2026-09-20 09:15",
      usuario: "Luis Ramírez",
      motivo: "Compra a proveedor",
    },
    {
      id: 2,
      productoId: 1,
      tipo: "salida",
      cantidad: 25,
      fecha: "2026-09-19 15:30",
      usuario: "María Torres",
      motivo: "Venta",
    },
    {
      id: 3,
      productoId: 1,
      tipo: "entrada",
      cantidad: 170,
      fecha: "2026-09-18 11:00",
      usuario: "Luis Ramírez",
      motivo: "Reposición",
    },
    {
      id: 4,
      productoId: 2,
      tipo: "salida",
      cantidad: 18,
      fecha: "2026-09-20 14:20",
      usuario: "María Torres",
      motivo: "Venta",
    },
    {
      id: 5,
      productoId: 2,
      tipo: "entrada",
      cantidad: 50,
      fecha: "2026-09-19 08:00",
      usuario: "Luis Ramírez",
      motivo: "Compra",
    },
    {
      id: 6,
      productoId: 3,
      tipo: "entrada",
      cantidad: 200,
      fecha: "2026-09-18 16:45",
      usuario: "Luis Ramírez",
      motivo: "Compra a proveedor",
    },
  ];

  let currentFilter = "all";
  let currentQuery = "";
  let currentDetailProduct = null;

  // ============================================
  // UTILIDADES
  // ============================================
  const getStockStatus = (stock, minimo) => {
    if (stock === 0)
      return {
        label: "Sin Stock",
        class: "badge-danger",
        type: "zero",
        icon: "fa-times-circle",
      };
    if (stock < minimo * 0.5)
      return {
        label: "Stock Crítico",
        class: "badge-danger",
        type: "critical",
        icon: "fa-exclamation-triangle",
      };
    if (stock < minimo)
      return {
        label: "Stock Bajo",
        class: "badge-warning",
        type: "warning",
        icon: "fa-exclamation-circle",
      };
    return {
      label: "Disponible",
      class: "badge-success",
      type: "ok",
      icon: "fa-check-circle",
    };
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

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    try {
      const regex = new RegExp(
        `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
        "gi",
      );
      return text.replace(regex, "<mark>$1</mark>");
    } catch (e) {
      return text;
    }
  };

  // ============================================
  // FILTRADO
  // ============================================
  const filterProducts = () => {
    let filtered = PRODUCTS;

    // 1. Aplicar filtro de estado
    if (currentFilter !== "all") {
      filtered = filtered.filter((p) => {
        const status = getStockStatus(p.stock, p.minimo);
        if (currentFilter === "critical")
          return status.type === "critical" || status.type === "zero";
        if (currentFilter === "warning") return status.type === "warning";
        if (currentFilter === "zero") return status.type === "zero";
        return true;
      });
    }

    // 2. Aplicar búsqueda
    if (currentQuery) {
      const q = currentQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.codigo.toLowerCase().includes(q) ||
          p.nombre.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.subcategoria.toLowerCase().includes(q) ||
          p.zona.toLowerCase().includes(q) ||
          p.pasillo.toLowerCase().includes(q) ||
          p.rack.toLowerCase().includes(q) ||
          p.nivel.toLowerCase().includes(q),
      );
    }

    return filtered;
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  const updateCounters = () => {
    const all = PRODUCTS.length;
    const critical = PRODUCTS.filter((p) => {
      const s = getStockStatus(p.stock, p.minimo);
      return s.type === "critical" || s.type === "zero";
    }).length;
    const warning = PRODUCTS.filter(
      (p) => getStockStatus(p.stock, p.minimo).type === "warning",
    ).length;
    const zero = PRODUCTS.filter((p) => p.stock === 0).length;

    document.getElementById("count-all").textContent = all;
    document.getElementById("count-critical").textContent = critical;
    document.getElementById("count-warning").textContent = warning;
    document.getElementById("count-zero").textContent = zero;
  };

  const renderResults = () => {
    const filtered = filterProducts();
    const emptyState = document.getElementById("empty-state");
    const resultsContainer = document.getElementById("results-container");
    const resultsGrid = document.getElementById("results-grid");
    const resultsBadge = document.getElementById("results-badge");

    // Si no hay query ni filtro activo, mostrar estado inicial
    if (!currentQuery && currentFilter === "all") {
      emptyState.classList.remove("hidden");
      resultsContainer.classList.add("hidden");
      return;
    }

    if (filtered.length === 0) {
      // Solo mostrar "no encontrados" si hay búsqueda o filtro activo
      if (currentQuery || currentFilter !== "all") {
        emptyState.classList.remove("hidden");
        resultsContainer.classList.add("hidden");
        emptyState.innerHTML = `
            <div class="empty-icon empty-icon-error">
                <i class="fas fa-search-minus"></i>
            </div>
            <h2>No se encontraron productos</h2>
            <p>Intenta con otro término o cambia los filtros</p>
        `;
      } else {
        // Estado inicial con tips
        emptyState.classList.remove("hidden");
        resultsContainer.classList.add("hidden");
      }
      return;
    }

    emptyState.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
    resultsBadge.textContent = `${filtered.length} producto${filtered.length !== 1 ? "s" : ""}`;

    resultsGrid.innerHTML = filtered
      .map((p) => {
        const status = getStockStatus(p.stock, p.minimo);
        const disponible = p.stock - p.minimo;

        return `
                <div class="result-card" data-id="${p.id}">
                    <div class="result-card-header">
                        <span class="result-code">${highlightText(p.codigo, currentQuery)}</span>
                        <span class="badge ${status.class}">
                            <i class="fas ${status.icon}"></i> ${status.label}
                        </span>
                    </div>
                    <h4 class="result-name">${highlightText(p.nombre, currentQuery)}</h4>
                    <div class="result-meta">
                        <span class="result-cat">${p.categoria}</span>
                        <span class="result-sub">${p.subcategoria}</span>
                    </div>
                    <div class="result-body">
                        <div class="result-stock-block">
                            <span class="result-stock-label">Stock Físico</span>
                            <div class="result-stock-value">
                                <strong>${p.stock}</strong>
                                <small>${p.unidad}</small>
                            </div>
                        </div>
                        <div class="result-location-block">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${p.zona}-${p.pasillo}-${p.rack}-${p.nivel}</span>
                        </div>
                    </div>
                    <div class="result-footer">
                        <span class="result-price">S/ ${p.precio.toFixed(2)}</span>
                        <button class="result-detail-btn">
                            Ver Ficha <i class="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            `;
      })
      .join("");

    // Eventos de tarjetas
    resultsGrid.querySelectorAll(".result-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = parseInt(card.dataset.id);
        openDetailModal(id);
      });
    });
  };

  // ============================================
  // MODAL DE DETALLE
  // ============================================
  const openDetailModal = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    currentDetailProduct = product;
    const status = getStockStatus(product.stock, product.minimo);
    const disponible = Math.max(0, product.stock - product.minimo);

    // Encabezado
    document.getElementById("detail-codigo").textContent = product.codigo;
    document.getElementById("detail-nombre").textContent = product.nombre;
    document.getElementById("detail-categoria").textContent =
      `${product.categoria} › ${product.subcategoria}`;

    const statusEl = document.getElementById("detail-status");
    statusEl.textContent = status.label;
    statusEl.className = `detail-express-status badge ${status.class}`;

    // Stock grande
    document.getElementById("detail-stock-big").textContent = product.stock;
    document.getElementById("detail-stock-unit").textContent =
      product.unidad + "s";
    document.getElementById("detail-minimo").textContent =
      `${product.minimo} ${product.unidad}`;

    // Ubicación
    document.getElementById("detail-zona").textContent = product.zona;
    document.getElementById("detail-pasillo").textContent = product.pasillo;
    document.getElementById("detail-rack").textContent = product.rack;
    document.getElementById("detail-nivel").textContent = product.nivel;

    // Precio y disponible
    document.getElementById("detail-precio").textContent =
      `S/ ${product.precio.toFixed(2)}`;
    document.getElementById("detail-disponible").textContent =
      `${disponible} ${product.unidad}`;

    document.getElementById("detail-modal").classList.remove("hidden");
  };

  // ============================================
  // MODAL DE HISTORIAL
  // ============================================
  const openHistorialModal = () => {
    if (!currentDetailProduct) return;

    document.getElementById("historial-codigo").textContent =
      currentDetailProduct.codigo;
    document.getElementById("historial-nombre").textContent =
      currentDetailProduct.nombre;

    // Filtrar movimientos del producto (últimos 3)
    const movs = MOVIMIENTOS.filter(
      (m) => m.productoId === currentDetailProduct.id,
    ).slice(0, 3);

    const list = document.getElementById("historial-list");

    if (movs.length === 0) {
      list.innerHTML = `
                <div class="historial-empty">
                    <i class="fas fa-inbox"></i>
                    <p>Sin movimientos registrados</p>
                </div>
            `;
    } else {
      list.innerHTML = movs
        .map((m) => {
          const isEntrada = m.tipo === "entrada";
          return `
                    <div class="historial-item ${isEntrada ? "historial-entrada" : "historial-salida"}">
                        <div class="historial-icon">
                            <i class="fas fa-arrow-${isEntrada ? "down" : "up"}"></i>
                        </div>
                        <div class="historial-info">
                            <div class="historial-header">
                                <strong>${isEntrada ? "Entrada" : "Salida"}</strong>
                                <span class="historial-date">${m.fecha}</span>
                            </div>
                            <div class="historial-detail">
                                <span class="historial-qty ${isEntrada ? "qty-entrada" : "qty-salida"}">
                                    ${isEntrada ? "+" : "-"}${m.cantidad}
                                </span>
                                <span class="historial-motivo">${m.motivo}</span>
                            </div>
                            <div class="historial-user">
                                <i class="fas fa-user"></i> ${m.usuario}
                            </div>
                        </div>
                    </div>
                `;
        })
        .join("");
    }

    document.getElementById("historial-modal").classList.remove("hidden");
  };

  // ============================================
  // MODAL DE RESERVA/DESPACHO
  // ============================================
  const openReservaModal = () => {
    if (!currentDetailProduct) return;

    document.getElementById("reserva-product-id").value =
      currentDetailProduct.id;
    document.getElementById("reserva-codigo").textContent =
      currentDetailProduct.codigo;
    document.getElementById("reserva-nombre").textContent =
      currentDetailProduct.nombre;
    document.getElementById("reserva-stock").textContent =
      `${currentDetailProduct.stock} ${currentDetailProduct.unidad}`;

    document.getElementById("reserva-form").reset();
    document.getElementById("reserva-error").textContent = "";
    document.getElementById("reserva-cantidad").max =
      currentDetailProduct.stock;

    document.getElementById("reserva-modal").classList.remove("hidden");
  };

  const handleReservaSubmit = (e) => {
    e.preventDefault();
    const productId = parseInt(
      document.getElementById("reserva-product-id").value,
    );
    const cantidad = parseInt(
      document.getElementById("reserva-cantidad").value,
    );
    const cliente = document.getElementById("reserva-cliente").value.trim();
    const observaciones = document
      .getElementById("reserva-observaciones")
      .value.trim();

    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    if (!cantidad || cantidad <= 0) {
      document.getElementById("reserva-error").textContent =
        "Ingresa una cantidad válida";
      return;
    }

    if (cantidad > product.stock) {
      document.getElementById("reserva-error").textContent =
        `Stock insuficiente. Máximo: ${product.stock}`;
      return;
    }

    // Actualizar stock
    product.stock -= cantidad;

    // Registrar movimiento
    MOVIMIENTOS.unshift({
      id: MOVIMIENTOS.length + 1,
      productoId: productId,
      tipo: "salida",
      cantidad,
      fecha: new Date().toLocaleString("es-PE"),
      usuario: sessionStorage.getItem("userName") || "Usuario",
      motivo: cliente ? `Venta a ${cliente}` : "Venta",
    });

    document.getElementById("reserva-modal").classList.add("hidden");
    document.getElementById("detail-modal").classList.add("hidden");

    showToast(
      `✅ Salida registrada: ${cantidad} ${product.unidad} de ${product.nombre}`,
      "success",
    );
    renderResults();
    updateCounters();
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

  const initSearch = () => {
    const input = document.getElementById("smart-search-input");
    const clearBtn = document.getElementById("btn-clear-search");
    const scanBtn = document.getElementById("btn-scan");

    if (input) {
      input.addEventListener("input", (e) => {
        currentQuery = e.target.value;

        if (currentQuery.length > 0) {
          clearBtn.classList.remove("hidden");
        } else {
          clearBtn.classList.add("hidden");
        }

        renderResults();
      });

      setTimeout(() => input.focus(), 200);
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        currentQuery = "";
        clearBtn.classList.add("hidden");
        input.focus();
        renderResults();
      });
    }

    if (scanBtn) {
      scanBtn.addEventListener("click", () => {
        const fakeCode = "MAD-MEL-001";
        input.value = fakeCode;
        currentQuery = fakeCode;
        clearBtn.classList.remove("hidden");
        renderResults();
        showToast("📷 Código escaneado: " + fakeCode, "success");
      });
    }
  };

  const initFilters = () => {
    document.querySelectorAll(".filter-chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        const filter = chip.dataset.filter;
        currentFilter = filter;

        document
          .querySelectorAll(".filter-chip")
          .forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");

        renderResults();
      });
    });
  };

  const initModals = () => {
    // Cerrar modales
    document
      .getElementById("close-detail-modal")
      ?.addEventListener("click", () => {
        document.getElementById("detail-modal").classList.add("hidden");
      });
    document
      .getElementById("close-historial-modal")
      ?.addEventListener("click", () => {
        document.getElementById("historial-modal").classList.add("hidden");
      });
    document
      .getElementById("close-reserva-modal")
      ?.addEventListener("click", () => {
        document.getElementById("reserva-modal").classList.add("hidden");
      });
    document.getElementById("cancel-reserva")?.addEventListener("click", () => {
      document.getElementById("reserva-modal").classList.add("hidden");
    });

    // Botones de acción
    document
      .getElementById("btn-historial")
      ?.addEventListener("click", openHistorialModal);
    document
      .getElementById("btn-reservar")
      ?.addEventListener("click", openReservaModal);

    // Form de reserva
    document
      .getElementById("reserva-form")
      ?.addEventListener("submit", handleReservaSubmit);

    // Cerrar al hacer clic fuera
    window.addEventListener("click", (e) => {
      ["detail-modal", "historial-modal", "reserva-modal"].forEach((id) => {
        const modal = document.getElementById(id);
        if (e.target === modal) modal.classList.add("hidden");
      });
    });

    // ESC para cerrar
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        ["detail-modal", "historial-modal", "reserva-modal"].forEach((id) => {
          document.getElementById(id)?.classList.add("hidden");
        });
      }
    });
  };

  const init = () => {
    console.log("🔍 Inicializando Consulta Rápida...");

    loadUserInfo();
    updateCounters();
    renderResults();
    initSearch();
    initFilters();
    initModals();

    if (typeof NavModule !== "undefined") {
      NavModule.init("consulta-stock");
    }

    console.log("✅ Consulta Rápida cargada. Productos:", PRODUCTS.length);
  };

  return { init };
})();

console.log("🚀 consulta-rapida.js cargado correctamente");
