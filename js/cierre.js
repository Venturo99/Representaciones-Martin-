/**
 * Módulo de Cierre Diario
 */
const CierreModule = (() => {
  let isJornadaAbierta = true;

  const RESUMEN_HOY = {
    ventas: 1500.0,
    ingresos: 250,
    salidas: 45,
    mermas: 3,
  };

  let CIERRES = [
    {
      id: 1,
      fecha: "2026-10-29",
      hora: "18:00:00",
      usuario: "Carlos Mendoza",
      ventas: 2450.0,
      estado: "Cerrado",
    },
    {
      id: 2,
      fecha: "2026-10-28",
      hora: "18:15:00",
      usuario: "Carlos Mendoza",
      ventas: 1800.5,
      estado: "Cerrado",
    },
  ];

  let nextId = CIERRES.length + 1;

  const loadUserInfo = () => {
    const role = sessionStorage.getItem("userRole") || "Invitado";
    const name = sessionStorage.getItem("userName") || "Usuario";
    const avatar = sessionStorage.getItem("userAvatar") || "U";
    const color = sessionStorage.getItem("userColor") || "#f37021";

    const nameEl = document.getElementById("user-name-display");
    const roleEl = document.getElementById("user-role-display");

    if (nameEl) nameEl.textContent = name;
    if (roleEl)
      roleEl.textContent = role.includes("Super") ? "Administrador" : role;

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

  const updateUI = () => {
    const statusCard = document.getElementById("status-card");
    const statusTitle = document.getElementById("status-title");
    const statusDesc = document.getElementById("status-desc");
    const statusIcon = document.getElementById("status-icon");
    const actionCard = document.getElementById("action-card");
    const btnReabrir = document.getElementById("btn-reabrir"); // ⭐ NUEVO

    if (isJornadaAbierta) {
      statusCard.className = "status-card status-open";
      statusTitle.textContent = "Jornada Abierta";
      statusDesc.textContent =
        "El sistema está operando con normalidad. Puedes realizar cierres al final del día.";
      statusIcon.innerHTML = '<i class="fas fa-lock-open"></i>';

      if (actionCard) actionCard.classList.remove("hidden");
      if (btnReabrir) btnReabrir.classList.add("hidden"); // Ocultar botón de reabrir

      document.getElementById("kpi-ventas").textContent =
        `S/ ${RESUMEN_HOY.ventas.toFixed(2)}`;
      document.getElementById("kpi-ingresos").textContent =
        RESUMEN_HOY.ingresos;
      document.getElementById("kpi-salidas").textContent = RESUMEN_HOY.salidas;
      document.getElementById("kpi-mermas").textContent = RESUMEN_HOY.mermas;
    } else {
      statusCard.className = "status-card status-closed";
      statusTitle.textContent = "Jornada Cerrada";
      statusDesc.textContent =
        "El día de hoy ya ha sido cerrado. No se pueden realizar más movimientos.";
      statusIcon.innerHTML = '<i class="fas fa-lock"></i>';

      if (actionCard) actionCard.classList.add("hidden");
      if (btnReabrir) btnReabrir.classList.remove("hidden"); // Mostrar botón de reabrir
    }

    // Actualizar fecha
    const now = new Date();
    const dateEl = document.getElementById("current-date");
    if (dateEl) {
      dateEl.textContent = now.toLocaleDateString("es-PE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const renderTable = () => {
    const tbody = document.getElementById("cierres-tbody");
    if (!tbody) return;
    const resultsCount = document.getElementById("results-count");

    if (resultsCount) resultsCount.textContent = `${CIERRES.length} cierres`;

    tbody.innerHTML = CIERRES.map(
      (c) => `
      <tr>
        <td><strong>${c.fecha}</strong></td>
        <td>${c.hora}</td>
        <td><span class="user-cell"><i class="fas fa-user-circle"></i> ${c.usuario}</span></td>
        <td><strong>S/ ${c.ventas.toFixed(2)}</strong></td>
        <td><span class="badge badge-success"><i class="fas fa-check-circle"></i> ${c.estado}</span></td>
      </tr>
    `,
    ).join("");
  };

  const abrirModalCierre = () => {
    if (!isJornadaAbierta) return;
    document.getElementById("cierre-modal").classList.remove("hidden");
  };

  const ejecutarCierre = () => {
    const now = new Date();
    const userName = sessionStorage.getItem("userName") || "Usuario";

    CIERRES.unshift({
      id: nextId++,
      fecha: now.toISOString().split("T")[0],
      hora: now.toLocaleTimeString("es-PE", { hour12: false }),
      usuario: userName,
      ventas: RESUMEN_HOY.ventas,
      estado: "Cerrado",
    });

    isJornadaAbierta = false;
    document.getElementById("cierre-modal").classList.add("hidden");

    updateUI();
    renderTable();
    showToast("🔒 Cierre diario ejecutado. Jornada bloqueada.", "success");
  };

  // ⭐ NUEVA FUNCIÓN PARA REABRIR
  const reabrirJornada = () => {
    if (
      confirm(
        "⚠️ ADVERTENCIA: Reabrir la jornada permitirá modificar los movimientos del día. ¿Estás seguro de continuar?",
      )
    ) {
      isJornadaAbierta = true;
      updateUI();
      showToast("🔓 Jornada reabierta correctamente.", "warning");
    }
  };

  const init = () => {
    console.log("🔒 Inicializando Cierre Diario...");
    loadUserInfo();
    updateUI();
    renderTable();

    document
      .getElementById("close-cierre-modal")
      ?.addEventListener("click", () =>
        document.getElementById("cierre-modal").classList.add("hidden"),
      );
    document
      .getElementById("cancel-cierre")
      ?.addEventListener("click", () =>
        document.getElementById("cierre-modal").classList.add("hidden"),
      );
    document
      .getElementById("confirm-cierre")
      ?.addEventListener("click", ejecutarCierre);

    if (typeof NavModule !== "undefined") {
      NavModule.init("cierre");
    }
  };

  // ⭐ EXPORTAMOS LA FUNCIÓN reabrirJornada
  return { init, abrirModalCierre, reabrirJornada };
})();

console.log("🚀 cierre.js cargado correctamente");
