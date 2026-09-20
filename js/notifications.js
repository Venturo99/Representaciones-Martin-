/**
 * Módulo de Notificaciones - Con protección anti-múltiple-init
 */
const NotificationsModule = (() => {
  let isInitialized = false;

  const NOTIFICATIONS = [
    {
      tipo: "danger",
      titulo: "Melamina Wengue 18mm",
      mensaje: "Stock: 5 unidades (mínimo: 30)",
      ubicacion: "B-03-R2-N1",
    },
    {
      tipo: "danger",
      titulo: "Bisagra Cazoleta 35mm",
      mensaje: "Stock: 12 unidades (mínimo: 100)",
      ubicacion: "C-01-R1-N3",
    },
    {
      tipo: "warning",
      titulo: "MDF 15mm Crudo",
      mensaje: "Stock: 45 unidades (mínimo: 50)",
      ubicacion: "A-01-R1-N1",
    },
  ];

  const renderNotifications = () => {
    const list = document.querySelector(".notifications-list");
    if (!list) return;

    list.innerHTML = NOTIFICATIONS.map(
      (n) => `
            <div class="notification-item notif-${n.tipo}">
                <div class="notif-icon">
                    <i class="fas fa-${n.tipo === "danger" ? "exclamation-triangle" : "exclamation-circle"}"></i>
                </div>
                <div class="notif-content">
                    <strong>${n.titulo}</strong>
                    <span>${n.mensaje}</span>
                    <small>Ubicación: ${n.ubicacion}</small>
                </div>
            </div>
        `,
    ).join("");

    const badge = document.querySelector(".notification-badge");
    if (badge) badge.textContent = NOTIFICATIONS.length;
  };

  const init = () => {
    console.log("🔔 Inicializando NotificationsModule...");

    const btn = document.getElementById("btn-notifications");
    const panel = document.getElementById("notifications-panel");

    if (!btn || !panel) {
      console.warn("⚠️ No se encontró campana");
      return;
    }

    renderNotifications();

    // ⭐ Remover listeners anteriores clonando el botón
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      panel.classList.toggle("hidden");
    });

    console.log("✅ NotificationsModule listo.");
  };

  // ⭐ Delegación global para cerrar al hacer clic fuera
  if (!isInitialized) {
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".notifications-container")) {
        const panel = document.getElementById("notifications-panel");
        if (panel) panel.classList.add("hidden");
      }
    });
    isInitialized = true;
  }

  return { init };
})();
