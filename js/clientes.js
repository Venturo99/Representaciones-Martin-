/**
 * Módulo de Clientes
 */
const ClientesModule = (() => {
  // Base de datos simulada
  let CLIENTS = [
    {
      id: 1,
      docType: "RUC",
      docNum: "20123456789",
      name: "Constructora XYZ S.A.C.",
      phone: "987654321",
      email: "contacto@xyz.com",
      address: "Av. Industrial 123, Lima",
    },
    {
      id: 2,
      docType: "DNI",
      docNum: "45678912",
      name: "Juan Carlos Pérez",
      phone: "912345678",
      email: "juan.perez@gmail.com",
      address: "Calle Los Pinos 456, Surco",
    },
    {
      id: 3,
      docType: "RUC",
      docNum: "20987654321",
      name: "Maderas del Norte E.I.R.L.",
      phone: "999888777",
      email: "ventas@maderasnorte.pe",
      address: "Av. Grau 789, Callao",
    },
    {
      id: 4,
      docType: "DNI",
      docNum: "12345678",
      name: "María Rodríguez",
      phone: "955444333",
      email: "maria.rdz@hotmail.com",
      address: "Jr. Puno 101, Cercado",
    },
  ];

  let nextId = CLIENTS.length + 1;
  let currentFilters = { search: "", docType: "" };
  let deleteTargetId = null;

  // ============================================
  // UTILIDADES
  // ============================================
  const showToast = (message, type = "success") => {
    const toast = document.getElementById("toast");
    const toastMsg = document.getElementById("toast-message");
    if (!toast) return;
    toastMsg.textContent = message;
    toast.className = `toast toast-${type}`;
    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("hidden"), 3000);
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

  // ============================================
  // RENDERIZADO Y FILTRADO
  // ============================================
  const filterClients = () => {
    let filtered = [...CLIENTS];
    if (currentFilters.docType) {
      filtered = filtered.filter((c) => c.docType === currentFilters.docType);
    }
    if (currentFilters.search) {
      const q = currentFilters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.docNum.includes(q) ||
          (c.phone && c.phone.includes(q)),
      );
    }
    return filtered;
  };

  const renderTable = () => {
    const filtered = filterClients();
    const tbody = document.getElementById("clientes-tbody");
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
        const docClass = c.docType === "RUC" ? "tag-ruc" : "tag-dni";
        return `
        <tr>
          <td>
            <span class="doc-badge ${docClass}">${c.docType}</span>
            <strong style="margin-left: 6px; font-size: 0.85rem; font-family: monospace;">${c.docNum}</strong>
          </td>
          <td><strong>${c.name}</strong></td>
          <td>${c.phone || "-"}</td>
          <td>${c.email || "-"}</td>
          <td><span class="address-text">${c.address || "-"}</span></td>
                    <td>
            <div class="actions-wrapper">
              <button class="btn-icon btn-edit" data-id="${c.id}" title="Editar"><i class="fas fa-edit"></i></button>
              <button class="btn-icon btn-delete" data-id="${c.id}" title="Eliminar"><i class="fas fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
      })
      .join("");

    // Asignar eventos a los botones
    tbody.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () => openModal(parseInt(btn.dataset.id)));
    });
    tbody.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () =>
        openDeleteModal(parseInt(btn.dataset.id)),
      );
    });
  };

  const updateKPIs = () => {
    const total = CLIENTS.length;
    const rucs = CLIENTS.filter((c) => c.docType === "RUC").length;
    const dnis = CLIENTS.filter((c) => c.docType === "DNI").length;

    document.getElementById("kpi-total-clientes").textContent = total;
    document.getElementById("kpi-total-ruc").textContent = rucs;
    document.getElementById("kpi-total-dni").textContent = dnis;
  };

  const refreshView = () => {
    renderTable();
    updateKPIs();
  };

  // ============================================
  // MODAL CREAR/EDITAR
  // ============================================
  const openModal = (id = null) => {
    const form = document.getElementById("client-form");
    form.reset();
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    if (id) {
      // Editar
      const client = CLIENTS.find((c) => c.id === id);
      if (!client) return;

      document.getElementById("modal-title").textContent = "Editar Cliente";
      document.getElementById("client-id").value = client.id;
      document.getElementById("client-doc-type").value = client.docType;
      document.getElementById("client-doc-num").value = client.docNum;
      document.getElementById("client-name").value = client.name;
      document.getElementById("client-phone").value = client.phone || "";
      document.getElementById("client-email").value = client.email || "";
      document.getElementById("client-address").value = client.address || "";

      updateLabelText();
    } else {
      // Crear
      document.getElementById("modal-title").textContent =
        "Registrar Nuevo Cliente";
      document.getElementById("client-id").value = "";
    }

    document.getElementById("client-modal").classList.remove("hidden");
  };

  const updateLabelText = () => {
    const type = document.getElementById("client-doc-type").value;
    const label = document.getElementById("label-name");
    const inputDoc = document.getElementById("client-doc-num");

    if (type === "RUC") {
      label.textContent = "Razón Social *";
      inputDoc.maxLength = 11;
      inputDoc.placeholder = "Ej: 20123456789 (11 dígitos)";
    } else {
      label.textContent = "Nombre Completo *";
      inputDoc.maxLength = 8;
      inputDoc.placeholder = "Ej: 45678912 (8 dígitos)";
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    const id = document.getElementById("client-id").value;
    const docType = document.getElementById("client-doc-type").value;
    const docNum = document.getElementById("client-doc-num").value.trim();
    const name = document.getElementById("client-name").value.trim();
    const phone = document.getElementById("client-phone").value.trim();
    const email = document.getElementById("client-email").value.trim();
    const address = document.getElementById("client-address").value.trim();

    // Validaciones
    if (docType === "RUC" && docNum.length !== 11) {
      document.getElementById("doc-error").textContent =
        "El RUC debe tener 11 dígitos.";
      return;
    }
    if (docType === "DNI" && docNum.length !== 8) {
      document.getElementById("doc-error").textContent =
        "El DNI debe tener 8 dígitos.";
      return;
    }
    if (!name) {
      document.getElementById("name-error").textContent =
        "El nombre o razón social es obligatorio.";
      return;
    }

    // Verificar que no exista el documento
    const exists = CLIENTS.find(
      (c) => c.docNum === docNum && c.id !== parseInt(id),
    );
    if (exists) {
      document.getElementById("doc-error").textContent =
        "Este número de documento ya está registrado.";
      return;
    }

    const clientData = { docType, docNum, name, phone, email, address };

    if (id) {
      // Actualizar
      const index = CLIENTS.findIndex((c) => c.id === parseInt(id));
      if (index !== -1) {
        CLIENTS[index] = { ...CLIENTS[index], ...clientData };
        showToast("✅ Cliente actualizado correctamente", "success");
      }
    } else {
      // Crear
      CLIENTS.push({ id: nextId++, ...clientData });
      showToast("✅ Cliente registrado correctamente", "success");
    }

    document.getElementById("client-modal").classList.add("hidden");
    refreshView();
  };

  // ============================================
  // MODAL ELIMINAR
  // ============================================
  const openDeleteModal = (id) => {
    const client = CLIENTS.find((c) => c.id === id);
    if (!client) return;

    deleteTargetId = id;
    document.getElementById("delete-client-name").textContent = client.name;
    document.getElementById("delete-modal").classList.remove("hidden");
  };

  const handleDelete = () => {
    if (deleteTargetId === null) return;
    const client = CLIENTS.find((c) => c.id === deleteTargetId);
    CLIENTS = CLIENTS.filter((c) => c.id !== deleteTargetId);

    document.getElementById("delete-modal").classList.add("hidden");
    showToast(`Cliente "${client.name}" eliminado`, "success");
    deleteTargetId = null;
    refreshView();
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const init = () => {
    console.log("👥 Inicializando Clientes...");
    loadUserInfo();
    refreshView();

    // Filtros
    document.getElementById("search-input").addEventListener("input", (e) => {
      currentFilters.search = e.target.value;
      renderTable();
    });
    document.getElementById("filter-doc").addEventListener("change", (e) => {
      currentFilters.docType = e.target.value;
      renderTable();
    });

    // Eventos del Modal
    document
      .getElementById("btn-new-client")
      .addEventListener("click", () => openModal());
    document
      .getElementById("close-client-modal")
      .addEventListener("click", () =>
        document.getElementById("client-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-client")
      .addEventListener("click", () =>
        document.getElementById("client-modal").classList.add("hidden"),
      );
    document
      .getElementById("client-form")
      .addEventListener("submit", handleSave);
    document
      .getElementById("client-doc-type")
      .addEventListener("change", updateLabelText);

    // Eventos de Eliminación
    document
      .getElementById("close-delete-modal")
      .addEventListener("click", () =>
        document.getElementById("delete-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-delete")
      .addEventListener("click", () =>
        document.getElementById("delete-modal").classList.add("hidden"),
      );
    document
      .getElementById("confirm-delete")
      .addEventListener("click", handleDelete);

    // Cerrar modales al hacer clic fuera
    window.addEventListener("click", (e) => {
      if (e.target === document.getElementById("client-modal"))
        document.getElementById("client-modal").classList.add("hidden");
      if (e.target === document.getElementById("delete-modal"))
        document.getElementById("delete-modal").classList.add("hidden");
    });

    if (typeof NavModule !== "undefined") {
      NavModule.init("clientes");
    }
    console.log("✅ Clientes cargado.");
  };

  return { init };
})();

console.log("🚀 clientes.js cargado correctamente");
