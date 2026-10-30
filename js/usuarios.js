/**
 * Módulo de Usuarios y Accesos
 */
const UsuariosModule = (() => {
  // ============================================
  // BASE DE DATOS SIMULADA
  // ============================================
  let USERS = [
    {
      id: 1,
      name: "Carlos Mendoza",
      email: "superadmin@martin.com",
      password: "Admin123!",
      role: "Administrador",
      status: "Activo",
    },
    {
      id: 2,
      name: "Luis Ramírez",
      email: "almacen@martin.com",
      password: "Almacen123!",
      role: "Almacenero",
      status: "Activo",
    },
    {
      id: 3,
      name: "María Torres",
      email: "vendedor@martin.com",
      password: "Vendedor123!",
      role: "Vendedor",
      status: "Activo",
    },
    {
      id: 4,
      name: "Ana Gutiérrez",
      email: "gerente@martin.com",
      password: "Gerente123!",
      role: "Gerente",
      status: "Activo",
    },
  ];

  let nextId = USERS.length + 1;
  let currentFilter = "";
  let deleteTargetId = null;

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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // ============================================
  // RENDERIZADO
  // ============================================
  const renderTable = () => {
    const tbody = document.getElementById("users-tbody");
    const resultsCount = document.getElementById("results-count");

    let filtered = [...USERS];
    if (currentFilter) {
      const q = currentFilter.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q),
      );
    }

    resultsCount.textContent = `${filtered.length} resultados`;

    tbody.innerHTML = filtered
      .map((u) => {
        const isActive = u.status === "Activo";
        const statusBadge = isActive
          ? '<span class="badge badge-success">Activo</span>'
          : '<span class="badge badge-danger">Inactivo</span>';

        // Colores para los avatares según el rol
        let roleColor = "#3498db"; // Vendedor (azul)
        if (u.role === "Administrador")
          roleColor = "#f37021"; // Admin (naranja)
        else if (u.role === "Almacenero")
          roleColor = "#008744"; // Almacenero (verde)
        else if (u.role === "Gerente") roleColor = "#9b59b6"; // Gerente (morado)

        return `
        <tr>
          <td>
            <div class="user-cell-wrapper">
              <div class="user-avatar-small" style="background: linear-gradient(135deg, ${roleColor}, #0a2540)">
                ${getInitials(u.name)}
              </div>
              <div class="user-info-text">
                <strong>${u.name}</strong>
              </div>
            </div>
          </td>
          <td>${u.email}</td>
          <td><span class="role-tag">${u.role}</span></td>
          <td>${statusBadge}</td>
          <td>
            <div class="actions-wrapper">
              <button class="btn-icon btn-edit" onclick="UsuariosModule.openModal(${u.id})" title="Editar"><i class="fas fa-edit"></i></button>
              <button class="btn-icon btn-delete" onclick="UsuariosModule.openDeleteModal(${u.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
            </div>
          </td>
        </tr>
      `;
      })
      .join("");
  };

  const updateKPIs = () => {
    const total = USERS.length;
    const active = USERS.filter((u) => u.status === "Activo").length;
    const inactive = USERS.filter((u) => u.status === "Inactivo").length;

    document.getElementById("kpi-total-users").textContent = total;
    document.getElementById("kpi-active-users").textContent = active;
    document.getElementById("kpi-inactive-users").textContent = inactive;
  };

  // ============================================
  // MODALES
  // ============================================
  const openModal = (id = null) => {
    const form = document.getElementById("user-form");
    form.reset();
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    const passwordField = document.getElementById("user-password");
    const passwordLabel = passwordField.previousElementSibling;

    if (id) {
      // Editar
      const user = USERS.find((u) => u.id === id);
      document.getElementById("modal-title").textContent = "Editar Usuario";
      document.getElementById("user-id").value = user.id;
      document.getElementById("user-name").value = user.name;
      document.getElementById("user-email").value = user.email;
      document.getElementById("user-role").value = user.role;
      document.getElementById("user-status").value = user.status;

      // Contraseña opcional al editar
      passwordField.value = "";
      passwordField.placeholder = "Dejar en blanco para mantener";
      passwordLabel.textContent = "Nueva Contraseña (Opcional)";
    } else {
      // Crear
      document.getElementById("modal-title").textContent =
        "Registrar Nuevo Usuario";
      document.getElementById("user-id").value = "";
      passwordField.placeholder = "••••••••";
      passwordLabel.textContent = "Contraseña *";
    }

    document.getElementById("user-modal").classList.remove("hidden");
  };

  const handleSave = (e) => {
    e.preventDefault();
    document
      .querySelectorAll(".error-message")
      .forEach((el) => (el.textContent = ""));

    const id = document.getElementById("user-id").value;
    const name = document.getElementById("user-name").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const password = document.getElementById("user-password").value;
    const role = document.getElementById("user-role").value;
    const status = document.getElementById("user-status").value;

    let isValid = true;

    if (!name) {
      document.getElementById("name-error").textContent =
        "El nombre es obligatorio.";
      isValid = false;
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      document.getElementById("email-error").textContent =
        "El correo es obligatorio.";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      document.getElementById("email-error").textContent =
        "Ingrese un correo válido.";
      isValid = false;
    } else {
      // Verificar si el correo ya existe
      const exists = USERS.find(
        (u) => u.email === email && u.id !== parseInt(id),
      );
      if (exists) {
        document.getElementById("email-error").textContent =
          "Este correo ya está registrado.";
        isValid = false;
      }
    }

    if (!id && !password) {
      document.getElementById("password-error").textContent =
        "La contraseña es obligatoria.";
      isValid = false;
    } else if (password && password.length < 6) {
      document.getElementById("password-error").textContent =
        "Mínimo 6 caracteres.";
      isValid = false;
    }

    if (!isValid) return;

    if (id) {
      // Actualizar
      const index = USERS.findIndex((u) => u.id === parseInt(id));
      USERS[index] = {
        ...USERS[index],
        name,
        email,
        role,
        status,
        password: password ? password : USERS[index].password, // Solo actualizar si se escribió una nueva
      };
      showToast("Usuario actualizado correctamente", "success");
    } else {
      // Crear
      USERS.push({ id: nextId++, name, email, password, role, status });
      showToast("Usuario registrado correctamente", "success");
    }

    document.getElementById("user-modal").classList.add("hidden");
    renderTable();
    updateKPIs();
  };

  // ============================================
  // ELIMINAR
  // ============================================
  const openDeleteModal = (id) => {
    const user = USERS.find((u) => u.id === id);
    if (!user) return;

    // Evitar que el admin se elimine a sí mismo
    const currentEmail = sessionStorage.getItem("userEmail");
    if (user.email === currentEmail) {
      showToast("No puedes eliminar tu propio usuario activo.", "warning");
      return;
    }

    deleteTargetId = id;
    document.getElementById("delete-user-name").textContent = user.name;
    document.getElementById("delete-modal").classList.remove("hidden");
  };

  const handleDelete = () => {
    if (deleteTargetId === null) return;
    USERS = USERS.filter((u) => u.id !== deleteTargetId);
    document.getElementById("delete-modal").classList.add("hidden");
    showToast("Usuario eliminado", "success");
    deleteTargetId = null;
    renderTable();
    updateKPIs();
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const init = () => {
    console.log("👤 Inicializando Usuarios y Accesos...");
    loadUserInfo();
    renderTable();
    updateKPIs();

    // Filtros
    document.getElementById("search-user").addEventListener("input", (e) => {
      currentFilter = e.target.value;
      renderTable();
    });

    // Eventos de modales
    document
      .getElementById("close-user-modal")
      .addEventListener("click", () =>
        document.getElementById("user-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-user")
      .addEventListener("click", () =>
        document.getElementById("user-modal").classList.add("hidden"),
      );
    document.getElementById("user-form").addEventListener("submit", handleSave);

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

    if (typeof NavModule !== "undefined") {
      NavModule.init("usuarios");
    }
    console.log("✅ Usuarios cargado.");
  };

  // Exponer funciones
  return { init, openModal, openDeleteModal };
})();

console.log("🚀 usuarios.js cargado correctamente");
