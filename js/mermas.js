/**
 * Módulo de Ajustes de Mermas
 */
const MermasModule = (() => {
  // Base de datos con precios para calcular la pérdida
  const PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      stock: 245,
      precio: 85.5,
      unidad: "Plancha",
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      stock: 32,
      precio: 92.0,
      unidad: "Plancha",
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      nombre: "MDF 15mm Crudo",
      stock: 180,
      precio: 68.0,
      unidad: "Plancha",
    },
    {
      id: 8,
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      stock: 520,
      precio: 3.5,
      unidad: "Unidad",
    },
    {
      id: 9,
      codigo: "FER-COR-001",
      nombre: "Corredera Telescópica 45cm",
      stock: 45,
      precio: 12.0,
      unidad: "Unidad",
    },
  ];

  let MERMAS = [
    {
      id: 1,
      productoId: 1,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      cantidad: 2,
      motivo: "Producto dañado / roto",
      observaciones: "Tablero quebrado al descargar",
      fecha: "2026-09-21 11:30",
      usuario: "Luis Ramírez",
      costo: 171.0,
    },
    {
      id: 2,
      productoId: 9,
      codigo: "FER-COR-001",
      producto: "Corredera Telescópica 45cm",
      cantidad: 5,
      motivo: "Pérdida / robo",
      observaciones: "Faltante en inventario físico",
      fecha: "2026-09-20 16:00",
      usuario: "Carlos Mendoza",
      costo: 60.0,
    },
  ];

  let nextId = MERMAS.length + 1;
  let currentFilters = { search: "", date: "all" };
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

  const isToday = (dateStr) =>
    new Date(dateStr).toDateString() === new Date().toDateString();
  const isThisWeek = (dateStr) =>
    Math.floor((new Date() - new Date(dateStr)) / (1000 * 60 * 60 * 24)) <= 7;
  const isThisMonth = (dateStr) =>
    new Date(dateStr).getMonth() === new Date().getMonth();

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
  const filterMermas = () => {
    let filtered = [...MERMAS];
    if (currentFilters.date === "today")
      filtered = filtered.filter((m) => isToday(m.fecha));
    else if (currentFilters.date === "week")
      filtered = filtered.filter((m) => isThisWeek(m.fecha));
    else if (currentFilters.date === "month")
      filtered = filtered.filter((m) => isThisMonth(m.fecha));

    if (currentFilters.search) {
      const q = currentFilters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (m) =>
          m.codigo.toLowerCase().includes(q) ||
          m.producto.toLowerCase().includes(q) ||
          m.motivo.toLowerCase().includes(q),
      );
    }
    return filtered;
  };

  const renderTable = () => {
    const filtered = filterMermas();
    const tbody = document.getElementById("mermas-tbody");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");

    if (filtered.length === 0) {
      tbody.innerHTML = "";
      emptyState.classList.remove("hidden");
      resultsCount.textContent = "0 resultados";
      return;
    }

    emptyState.classList.add("hidden");
    resultsCount.textContent = `${filtered.length} resultados`;

    tbody.innerHTML = filtered
      .map((m) => {
        const { date, time } = formatDate(m.fecha);
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
          <td>
            <div class="motivo-cell">
                <strong>${m.producto}</strong>
                <small>${m.codigo}</small>
            </div>
          </td>
          <td><span class="cantidad-perdida">-${m.cantidad}</span></td>
          <td><span class="badge badge-danger">${m.motivo}</span></td>
          <td><div class="motivo-cell"><small>${m.observaciones}</small></div></td>
          <td>
              <span class="user-cell"><i class="fas fa-user-circle"></i> ${m.usuario}</span>
          </td>
        </tr>
      `;
      })
      .join("");
  };

  const updateKPIs = () => {
    const hoy = MERMAS.filter((m) => isToday(m.fecha));
    const mermasHoy = hoy.length;
    const unidadesHoy = hoy.reduce((sum, m) => sum + m.cantidad, 0);
    const costoHoy = hoy.reduce((sum, m) => sum + m.costo, 0);

    document.getElementById("kpi-mermas-hoy").textContent = mermasHoy;
    document.getElementById("kpi-unidades-hoy").textContent = unidadesHoy;
    document.getElementById("kpi-costo-hoy").textContent =
      `S/ ${costoHoy.toFixed(2)}`;
  };

  // ============================================
  // MODAL Y VALIDACIONES
  // ============================================
  const updateModalValidation = () => {
    const cantidadInput =
      parseInt(document.getElementById("merma-cantidad").value) || 0;
    const warning = document.getElementById("stock-warning");
    const warningMsg = document.getElementById("stock-warning-message");
    const saveBtn = document.getElementById("btn-save-merma");

    if (!selectedProduct) {
      saveBtn.disabled = true;
      saveBtn.classList.add("btn-disabled");
      return;
    }

    if (cantidadInput > selectedProduct.stock) {
      warning.classList.remove("hidden");
      warningMsg.textContent = `Solo hay ${selectedProduct.stock} unidades en stock. No puedes descartar ${cantidadInput}.`;
      saveBtn.disabled = true;
      saveBtn.classList.add("btn-disabled");
    } else {
      warning.classList.add("hidden");
      saveBtn.disabled = false;
      saveBtn.classList.remove("btn-disabled");
    }
  };

  const openModal = () => {
    selectedProduct = null;
    document.getElementById("merma-form").reset();

    const selectText = document.getElementById("select-text");
    selectText.textContent = "Seleccione un producto...";
    selectText.classList.remove("selected");
    document.getElementById("selected-product").classList.add("hidden");
    document.getElementById("custom-product-select").classList.remove("open");
    document.getElementById("select-options").classList.add("hidden");

    document.getElementById("stock-warning").classList.add("hidden");
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    const saveBtn = document.getElementById("btn-save-merma");
    saveBtn.disabled = true;
    saveBtn.classList.add("btn-disabled");

    document.getElementById("merma-modal").classList.remove("hidden");
  };

  const handleSaveMerma = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      document.getElementById("producto-error").textContent =
        "Seleccione un producto.";
      return;
    }

    const cantidad = parseInt(document.getElementById("merma-cantidad").value);
    const motivo = document.getElementById("merma-motivo").value;
    const observaciones = document
      .getElementById("merma-observaciones")
      .value.trim();

    if (cantidad > selectedProduct.stock) return;

    if (!observaciones || observaciones.length < 5) {
      document.getElementById("observaciones-error").textContent =
        "Escriba una observación (mínimo 5 caracteres).";
      return;
    }

    const costoTotal = selectedProduct.precio * cantidad;
    const userName = sessionStorage.getItem("userName") || "Usuario";
    const now = new Date();
    const fechaStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // 1. Registrar la merma
    MERMAS.unshift({
      id: nextId++,
      productoId: selectedProduct.id,
      codigo: selectedProduct.codigo,
      producto: selectedProduct.nombre,
      cantidad,
      motivo,
      observaciones,
      fecha: fechaStr,
      usuario: userName,
      costo: costoTotal,
    });

    // 2. Descontar del stock
    selectedProduct.stock -= cantidad;

    document.getElementById("merma-modal").classList.add("hidden");
    showToast(
      `✅ Merma registrada: ${cantidad} de ${selectedProduct.nombre}`,
      "success",
    );

    renderTable();
    updateKPIs();
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const initBuscador = () => {
    const wrapper = document.getElementById("custom-product-select");
    const trigger = document.getElementById("select-trigger");
    const optionsBox = document.getElementById("select-options");
    const searchInput = document.getElementById("select-search-input");
    const listContainer = document.getElementById("select-list");
    const selectText = document.getElementById("select-text");

    const renderOptions = (query = "") => {
      listContainer.innerHTML = "";
      const q = query.toLowerCase().trim();

      // Filtrar solo productos con stock > 0
      const filtered = PRODUCTS.filter(
        (p) =>
          p.stock > 0 &&
          (p.codigo.toLowerCase().includes(q) ||
            p.nombre.toLowerCase().includes(q)),
      );

      if (filtered.length === 0) {
        listContainer.innerHTML =
          '<div class="no-results-msg">No hay productos con stock</div>';
        return;
      }

      filtered.forEach((p) => {
        const div = document.createElement("div");
        div.className = `custom-select-option ${selectedProduct?.id === p.id ? "selected" : ""}`;
        div.innerHTML = `
                <div class="option-info">
                    <strong>${p.nombre}</strong>
                    <small>${p.codigo}</small>
                </div>
                <div class="option-stock">Stock: ${p.stock}</div>
            `;
        div.addEventListener("click", () => {
          selectedProduct = p;
          selectText.textContent = `${p.codigo} - ${p.nombre}`;
          selectText.classList.add("selected");
          wrapper.classList.remove("open");
          optionsBox.classList.add("hidden");

          document
            .getElementById("selected-product")
            .classList.remove("hidden");
          document.getElementById("selected-product").innerHTML = `
                    <div class="selected-product-card">
                        <div class="selected-product-info">
                            <span class="selected-product-code">${p.codigo}</span>
                            <strong>${p.nombre}</strong>
                        </div>
                        <div class="selected-product-stock">
                            <span>Stock</span>
                            <strong>${p.stock} ${p.unidad}</strong>
                        </div>
                    </div>
                `;
          updateModalValidation();
        });
        listContainer.appendChild(div);
      });
    };

    if (trigger) {
      trigger.addEventListener("click", () => {
        if (wrapper.classList.contains("open")) {
          wrapper.classList.remove("open");
          optionsBox.classList.add("hidden");
        } else {
          wrapper.classList.add("open");
          optionsBox.classList.remove("hidden");
          searchInput.value = "";
          renderOptions();
          setTimeout(() => searchInput.focus(), 100);
        }
      });
    }

    if (searchInput)
      searchInput.addEventListener("input", (e) =>
        renderOptions(e.target.value),
      );
    document.addEventListener("click", (e) => {
      if (wrapper && !wrapper.contains(e.target)) {
        wrapper.classList.remove("open");
        optionsBox.classList.add("hidden");
      }
    });
  };

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

  const init = () => {
    console.log("⚠️ Inicializando Ajustes de Mermas...");
    loadUserInfo();
    renderTable();
    updateKPIs();
    initBuscador();

    document.getElementById("search-input").addEventListener("input", (e) => {
      currentFilters.search = e.target.value;
      renderTable();
    });
    document.getElementById("filter-date").addEventListener("change", (e) => {
      currentFilters.date = e.target.value;
      renderTable();
    });

    document
      .getElementById("btn-new-merma")
      .addEventListener("click", openModal);
    document
      .getElementById("close-merma-modal")
      .addEventListener("click", () =>
        document.getElementById("merma-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-merma")
      .addEventListener("click", () =>
        document.getElementById("merma-modal").classList.add("hidden"),
      );
    document
      .getElementById("merma-form")
      .addEventListener("submit", handleSaveMerma);

    document
      .getElementById("merma-cantidad")
      .addEventListener("input", updateModalValidation);

    if (typeof NavModule !== "undefined") {
      NavModule.init("mermas");
    }
    console.log("✅ Ajustes de Mermas cargado.");
  };

  return { init };
})();

console.log("🚀 mermas.js cargado correctamente");
