/**
 * Módulo de Cortes de Tableros
 */
const CortesModule = (() => {
  // ============================================
  // BASE DE PRODUCTOS (Mismos del inventario)
  // ============================================
  const PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      stock: 245,
      unidad: "Plancha",
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      stock: 32,
      unidad: "Plancha",
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      nombre: "MDF 15mm Crudo",
      stock: 180,
      unidad: "Plancha",
    },
    {
      id: 4,
      codigo: "MAD-TRI-001",
      nombre: "Triplay 4mm",
      stock: 95,
      unidad: "Plancha",
    },
    {
      id: 5,
      codigo: "MAD-AGL-001",
      nombre: "Aglomerado 18mm",
      stock: 8,
      unidad: "Plancha",
    },
    {
      id: 6,
      codigo: "MAD-OSB-001",
      nombre: "OSB 11mm",
      stock: 0,
      unidad: "Plancha",
    },
    {
      id: 7,
      codigo: "MAD-HDF-001",
      nombre: "HDF 3mm",
      stock: 12,
      unidad: "Plancha",
    },
  ];

  // Historial de Cortes simulado
  let CORTES = [
    {
      id: 1,
      productoId: 1,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      ancho: 60,
      largo: 120,
      piezas: 4,
      tableros: 1,
      fecha: "2026-09-21 10:15",
      usuario: "Luis Ramírez",
    },
    {
      id: 2,
      productoId: 3,
      codigo: "MAD-MDF-001",
      producto: "MDF 15mm Crudo",
      ancho: 80,
      largo: 200,
      piezas: 2,
      tableros: 2,
      fecha: "2026-09-20 16:30",
      usuario: "Carlos Mendoza",
    },
    {
      id: 3,
      productoId: 1,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      ancho: 40,
      largo: 40,
      piezas: 10,
      tableros: 1,
      fecha: "2026-09-20 09:00",
      usuario: "Luis Ramírez",
    },
    {
      id: 4,
      productoId: 2,
      codigo: "MAD-MEL-002",
      producto: "Melamina Roble 18mm",
      ancho: 100,
      largo: 150,
      piezas: 1,
      tableros: 1,
      fecha: "2026-09-19 15:45",
      usuario: "María Torres",
    },
  ];

  let nextId = CORTES.length + 1;
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

  const isToday = (dateStr) => {
    const d = new Date(dateStr);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };

  const isThisWeek = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    return Math.floor((now - d) / (1000 * 60 * 60 * 24)) <= 7;
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
  // FILTRADO Y RENDERIZADO
  // ============================================
  const filterCortes = () => {
    let filtered = [...CORTES];
    if (currentFilters.date === "today")
      filtered = filtered.filter((c) => isToday(c.fecha));
    else if (currentFilters.date === "week")
      filtered = filtered.filter((c) => isThisWeek(c.fecha));
    else if (currentFilters.date === "month")
      filtered = filtered.filter((c) => isThisMonth(c.fecha));

    if (currentFilters.search) {
      const q = currentFilters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.codigo.toLowerCase().includes(q) ||
          c.producto.toLowerCase().includes(q) ||
          c.usuario.toLowerCase().includes(q),
      );
    }
    return filtered;
  };

  const renderTable = () => {
    const filtered = filterCortes();
    const tbody = document.getElementById("cortes-tbody");
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
      .map((c) => {
        const { date, time } = formatDate(c.fecha);
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
                <strong>${c.producto}</strong>
                <small>${c.codigo}</small>
            </div>
          </td>
          <td><span class="medida-badge">${c.ancho} x ${c.largo} cm</span></td>
          <td><strong>${c.piezas}</strong> piezas</td>
          <td><strong>${c.tableros}</strong> plancha(s)</td>
          <td>
              <span class="user-cell"><i class="fas fa-user-circle"></i> ${c.usuario}</span>
          </td>
        </tr>
      `;
      })
      .join("");
  };

  const updateKPIs = () => {
    const hoy = CORTES.filter((c) => isToday(c.fecha));
    const cortesHoy = hoy.length;
    const tablerosHoy = hoy.reduce((sum, c) => sum + c.tableros, 0);
    // La merma es un cálculo estimado (ej: 5% de los tableros usados)
    const mermaHoy = Math.round(tablerosHoy * 0.05);

    document.getElementById("kpi-cortes-hoy").textContent = cortesHoy;
    document.getElementById("kpi-tableros-hoy").textContent = tablerosHoy;
    document.getElementById("kpi-merma-hoy").textContent = mermaHoy;
  };

  // ============================================
  // MODAL Y VALIDACIONES
  // ============================================
  const updateModalValidation = () => {
    const tablerosInput =
      parseInt(document.getElementById("corte-tableros").value) || 0;
    const warning = document.getElementById("stock-warning");
    const warningMsg = document.getElementById("stock-warning-message");
    const saveBtn = document.getElementById("btn-save-corte");
    const errorSpan = document.getElementById("cantidades-error");

    if (!selectedProduct) {
      saveBtn.disabled = true;
      saveBtn.classList.add("btn-disabled");
      return;
    }

    if (tablerosInput > selectedProduct.stock) {
      warning.classList.remove("hidden");
      warningMsg.textContent = `Solo hay ${selectedProduct.stock} planchas de ${selectedProduct.nombre} en stock. No puedes usar ${tablerosInput}.`;
      errorSpan.textContent = "Stock insuficiente.";
      saveBtn.disabled = true;
      saveBtn.classList.add("btn-disabled");
    } else {
      warning.classList.add("hidden");
      errorSpan.textContent = "";
      saveBtn.disabled = false;
      saveBtn.classList.remove("btn-disabled");
    }
  };

  const openModal = () => {
    selectedProduct = null;
    document.getElementById("corte-form").reset();

    // Reset buscador
    const selectText = document.getElementById("select-text");
    selectText.textContent = "Seleccione un tablero...";
    selectText.classList.remove("selected");
    document.getElementById("selected-product").classList.add("hidden");
    document.getElementById("custom-product-select").classList.remove("open");
    document.getElementById("select-options").classList.add("hidden");

    document.getElementById("stock-warning").classList.add("hidden");
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    const saveBtn = document.getElementById("btn-save-corte");
    saveBtn.disabled = true;
    saveBtn.classList.add("btn-disabled");

    document.getElementById("corte-modal").classList.remove("hidden");
  };

  const handleSaveCorte = (e) => {
    e.preventDefault();
    if (!selectedProduct) {
      document.getElementById("producto-error").textContent =
        "Seleccione un producto.";
      return;
    }

    const tablerosUsados = parseInt(
      document.getElementById("corte-tableros").value,
    );
    if (tablerosUsados > selectedProduct.stock) {
      showToast("No hay suficiente stock", "error");
      return;
    }

    const ancho = parseInt(document.getElementById("corte-ancho").value);
    const largo = parseInt(document.getElementById("corte-largo").value);
    const piezas = parseInt(document.getElementById("corte-piezas").value);
    const userName = sessionStorage.getItem("userName") || "Usuario";

    const now = new Date();
    const fechaStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // 1. Registrar el corte
    CORTES.unshift({
      id: nextId++,
      productoId: selectedProduct.id,
      codigo: selectedProduct.codigo,
      producto: selectedProduct.nombre,
      ancho,
      largo,
      piezas,
      tableros: tablerosUsados,
      fecha: fechaStr,
      usuario: userName,
    });

    // 2. Descontar del stock del producto
    selectedProduct.stock -= tablerosUsados;

    document.getElementById("corte-modal").classList.add("hidden");
    showToast(
      `✅ Corte registrado: ${piezas} piezas de ${selectedProduct.nombre}`,
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

      // Filtrar solo productos que sean tableros (que tengan stock > 0)
      const filtered = PRODUCTS.filter(
        (p) =>
          p.stock > 0 &&
          (p.codigo.toLowerCase().includes(q) ||
            p.nombre.toLowerCase().includes(q)),
      );

      if (filtered.length === 0) {
        listContainer.innerHTML =
          '<div class="no-results-msg">No hay tableros disponibles</div>';
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
                            <strong>${p.stock} planchas</strong>
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
    console.log("✂️ Inicializando Cortes de Tableros...");
    loadUserInfo();
    renderTable();
    updateKPIs();
    initBuscador();

    // Filtros
    document.getElementById("search-input").addEventListener("input", (e) => {
      currentFilters.search = e.target.value;
      renderTable();
    });
    document.getElementById("filter-date").addEventListener("change", (e) => {
      currentFilters.date = e.target.value;
      renderTable();
    });

    // Eventos del modal
    document.getElementById("btn-new-cut").addEventListener("click", openModal);
    document
      .getElementById("close-corte-modal")
      .addEventListener("click", () =>
        document.getElementById("corte-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-corte")
      .addEventListener("click", () =>
        document.getElementById("corte-modal").classList.add("hidden"),
      );
    document
      .getElementById("corte-form")
      .addEventListener("submit", handleSaveCorte);

    // Validación en tiempo real
    document
      .getElementById("corte-tableros")
      .addEventListener("input", updateModalValidation);
    document
      .getElementById("corte-piezas")
      .addEventListener("input", updateModalValidation);

    if (typeof NavModule !== "undefined") {
      NavModule.init("cortes");
    }
    console.log("✅ Cortes de Tableros cargado.");
  };

  return { init };
})();

console.log("🚀 cortes.js cargado correctamente");
