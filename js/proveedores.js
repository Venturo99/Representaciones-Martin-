/**
 * Módulo de Proveedores y Compras
 */
const ProveedoresModule = (() => {
  // ============================================
  // BASE DE DATOS SIMULADA
  // ============================================
  let PROVEEDORES = [
    {
      id: 1,
      ruc: "20123456789",
      razon: "MASISA PERÚ S.A.",
      contacto: "Carlos Slim",
      telefono: "987654321",
      categoria: "Maderas y Tableros",
    },
    {
      id: 2,
      ruc: "20987654321",
      razon: "Ferretería Industrial SAC",
      contacto: "Ana María",
      telefono: "912345678",
      categoria: "Ferretería",
    },
  ];

  let COMPRAS = [
    {
      id: 1,
      fecha: "2026-10-25",
      proveedor: "MASISA PERÚ S.A.",
      producto: "Melamina Blanca 18mm",
      cantidad: 100,
      total: 8550.0,
    },
  ];

  // Simulamos la base de productos para actualizarles el stock
  let PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      stock: 245,
    },
    { id: 2, codigo: "MAD-MEL-002", nombre: "Melamina Roble 18mm", stock: 32 },
    { id: 3, codigo: "MAD-MDF-001", nombre: "MDF 15mm Crudo", stock: 180 },
    {
      id: 8,
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      stock: 520,
    },
  ];

  let nextProvId = PROVEEDORES.length + 1;
  let nextCompraId = COMPRAS.length + 1;
  let currentFilter = "";

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
  // RENDERIZADO
  // ============================================
  const renderProveedores = () => {
    const tbody = document.getElementById("prov-tbody");
    const results = document.getElementById("results-prov");

    let filtered = [...PROVEEDORES];
    if (currentFilter) {
      const q = currentFilter.toLowerCase();
      filtered = filtered.filter(
        (p) => p.razon.toLowerCase().includes(q) || p.ruc.includes(q),
      );
    }

    results.textContent = `${filtered.length} resultados`;

    tbody.innerHTML = filtered
      .map(
        (p) => `
      <tr>
        <td><span class="code-tag">${p.ruc}</span></td>
        <td><strong>${p.razon}</strong></td>
        <td>${p.contacto || "-"}</td>
        <td>${p.telefono || "-"}</td>
        <td><span class="category-tag">${p.categoria}</span></td>
        <td>
          <div class="actions-wrapper">
            <button class="btn-icon btn-edit" onclick="ProveedoresModule.openProvModal(${p.id})"><i class="fas fa-edit"></i></button>
            <button class="btn-icon btn-delete" onclick="ProveedoresModule.deleteProv(${p.id})"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      </tr>
    `,
      )
      .join("");
  };

  const renderCompras = () => {
    const tbody = document.getElementById("compras-tbody");
    tbody.innerHTML = COMPRAS.map(
      (c) => `
      <tr>
        <td>${c.fecha}</td>
        <td><strong>${c.proveedor}</strong></td>
        <td>${c.producto}</td>
        <td><span class="badge badge-success">+${c.cantidad}</span></td>
        <td><strong>S/ ${c.total.toFixed(2)}</strong></td>
      </tr>
    `,
    ).join("");
  };

  const updateKPIs = () => {
    const totalProv = PROVEEDORES.length;
    const totalMes = COMPRAS.reduce((sum, c) => sum + c.total, 0);

    document.getElementById("kpi-total-prov").textContent = totalProv;
    document.getElementById("kpi-compras-mes").textContent =
      `S/ ${totalMes.toFixed(2)}`;
  };

  // ============================================
  // MODALES
  // ============================================
  const openProvModal = (id = null) => {
    document.getElementById("prov-form").reset();
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    if (id) {
      const prov = PROVEEDORES.find((p) => p.id === id);
      document.getElementById("prov-modal-title").textContent =
        "Editar Proveedor";
      document.getElementById("prov-id").value = prov.id;
      document.getElementById("prov-ruc").value = prov.ruc;
      document.getElementById("prov-razon").value = prov.razon;
      document.getElementById("prov-contacto").value = prov.contacto || "";
      document.getElementById("prov-telefono").value = prov.telefono || "";
      document.getElementById("prov-categoria").value = prov.categoria;
    } else {
      document.getElementById("prov-modal-title").textContent =
        "Registrar Proveedor";
      document.getElementById("prov-id").value = "";
    }

    document.getElementById("prov-modal").classList.remove("hidden");
  };

  const handleSaveProv = (e) => {
    e.preventDefault();
    const id = document.getElementById("prov-id").value;
    const ruc = document.getElementById("prov-ruc").value.trim();
    const razon = document.getElementById("prov-razon").value.trim();
    const contacto = document.getElementById("prov-contacto").value.trim();
    const telefono = document.getElementById("prov-telefono").value.trim();
    const categoria = document.getElementById("prov-categoria").value;

    if (ruc.length !== 11) {
      document.getElementById("ruc-error").textContent =
        "El RUC debe tener 11 dígitos.";
      return;
    }

    if (id) {
      const index = PROVEEDORES.findIndex((p) => p.id === parseInt(id));
      PROVEEDORES[index] = {
        ...PROVEEDORES[index],
        ruc,
        razon,
        contacto,
        telefono,
        categoria,
      };
      showToast("Proveedor actualizado", "success");
    } else {
      PROVEEDORES.push({
        id: nextProvId++,
        ruc,
        razon,
        contacto,
        telefono,
        categoria,
      });
      showToast("Proveedor registrado", "success");
    }

    document.getElementById("prov-modal").classList.add("hidden");
    renderProveedores();
    updateKPIs();
    updateCompraSelects();
  };

  const openCompraModal = () => {
    document.getElementById("compra-form").reset();
    updateCompraSelects();
    document.getElementById("compra-modal").classList.remove("hidden");
  };

  const updateCompraSelects = () => {
    const provSelect = document.getElementById("compra-prov");
    const prodSelect = document.getElementById("compra-producto");

    provSelect.innerHTML =
      '<option value="">Seleccione un proveedor...</option>' +
      PROVEEDORES.map(
        (p) => `<option value="${p.id}">${p.razon}</option>`,
      ).join("");

    prodSelect.innerHTML =
      '<option value="">Seleccione un producto...</option>' +
      PRODUCTS.map(
        (p) =>
          `<option value="${p.id}">${p.nombre} (Stock: ${p.stock})</option>`,
      ).join("");
  };

  const handleSaveCompra = (e) => {
    e.preventDefault();
    const provId = parseInt(document.getElementById("compra-prov").value);
    const prodId = parseInt(document.getElementById("compra-producto").value);
    const cantidad = parseInt(document.getElementById("compra-cantidad").value);
    const total = parseFloat(document.getElementById("compra-total").value);

    const prov = PROVEEDORES.find((p) => p.id === provId);
    const prod = PRODUCTS.find((p) => p.id === prodId);

    if (!prov || !prod) return;

    // 1. Registrar la compra
    const now = new Date();
    COMPRAS.unshift({
      id: nextCompraId++,
      fecha: now.toISOString().split("T")[0],
      proveedor: prov.razon,
      producto: prod.nombre,
      cantidad: cantidad,
      total: total,
    });

    // 2. Aumentar el stock del producto
    prod.stock += cantidad;

    document.getElementById("compra-modal").classList.add("hidden");
    showToast(
      `✅ Compra registrada. Stock de ${prod.nombre} aumentó a ${prod.stock}`,
      "success",
    );

    renderCompras();
    updateKPIs();
  };

  // ============================================
  // ELIMINAR
  // ============================================
  const deleteProv = (id) => {
    if (confirm("¿Estás seguro de eliminar este proveedor?")) {
      PROVEEDORES = PROVEEDORES.filter((p) => p.id !== id);
      showToast("Proveedor eliminado", "success");
      renderProveedores();
      updateKPIs();
      updateCompraSelects();
    }
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const init = () => {
    console.log("🏢 Inicializando Proveedores y Compras...");
    loadUserInfo();
    renderProveedores();
    renderCompras();
    updateKPIs();

    // Validación de solo números para RUC
    const rucInput = document.getElementById("prov-ruc");
    if (rucInput) {
      rucInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "");
      });
    }

    // Filtros y eventos
    document.getElementById("search-prov").addEventListener("input", (e) => {
      currentFilter = e.target.value;
      renderProveedores();
    });

    // Eventos de cierre de modales
    document
      .getElementById("close-prov-modal")
      .addEventListener("click", () =>
        document.getElementById("prov-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-prov")
      .addEventListener("click", () =>
        document.getElementById("prov-modal").classList.add("hidden"),
      );
    document
      .getElementById("prov-form")
      .addEventListener("submit", handleSaveProv);

    document
      .getElementById("close-compra-modal")
      .addEventListener("click", () =>
        document.getElementById("compra-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-compra")
      .addEventListener("click", () =>
        document.getElementById("compra-modal").classList.add("hidden"),
      );
    document
      .getElementById("compra-form")
      .addEventListener("submit", handleSaveCompra);

    if (typeof NavModule !== "undefined") {
      NavModule.init("proveedores");
    }
    console.log("✅ Proveedores cargado.");
  };

  // ⭐ IMPORTANTE: Exponer las funciones para que el HTML pueda usarlas
  return { init, openProvModal, deleteProv, openCompraModal };
})();

console.log("🚀 proveedores.js cargado correctamente");
