/**
 * Módulo del Dashboard Ejecutivo
 * RF-FE-02: Vista de Dashboard con métricas en tiempo real
 */
const DashboardModule = (() => {
  const MOCK_DATA = {
    totalProducts: 248,
    lowStockAlerts: 17,
    topProduct: "Coca Cola 500ml",
    weeklyMovements: [45, 62, 38, 71, 55, 80, 67],
    categories: [
      { name: "Bebidas", value: 45, color: "#f37021" },
      { name: "Abarrotes", value: 30, color: "#008744" },
      { name: "Limpieza", value: 15, color: "#3498db" },
      { name: "Snacks", value: 10, color: "#9b59b6" },
    ],
  };

  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const loadUserInfo = () => {
    const role = sessionStorage.getItem("userRole") || "Invitado";
    const email = sessionStorage.getItem("userEmail") || "sin-correo";
    const name = sessionStorage.getItem("userName") || "Usuario";
    const avatar = sessionStorage.getItem("userAvatar") || "U";
    const color = sessionStorage.getItem("userColor") || "#f37021";

    const roleEl = document.getElementById("user-role-display");
    const emailEl = document.getElementById("user-email-display");
    if (roleEl) roleEl.textContent = role;
    if (emailEl) emailEl.textContent = email;

    const avatarElement = document.querySelector(".user-avatar");
    if (avatarElement) {
      avatarElement.textContent = avatar;
      avatarElement.style.background = `linear-gradient(135deg, ${color}, #005a2b)`;
    }

    const titleElement = document.querySelector(".header-title h1");
    if (titleElement) {
      titleElement.textContent = `Hola, ${name.split(" ")[0]} 👋`;
    }
  };

  const loadMetrics = () => {
    const totalEl = document.getElementById("metric-total-products");
    const stockEl = document.getElementById("metric-low-stock");
    const topEl = document.getElementById("metric-top-product");

    if (totalEl) animateValue(totalEl, 0, MOCK_DATA.totalProducts, 1000);
    if (stockEl) animateValue(stockEl, 0, MOCK_DATA.lowStockAlerts, 1000);
    if (topEl) topEl.textContent = MOCK_DATA.topProduct;
  };

  const renderBarChart = () => {
    const container = document.getElementById("bar-chart");
    if (!container) return;

    const max = Math.max(...MOCK_DATA.weeklyMovements);
    const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    container.innerHTML = MOCK_DATA.weeklyMovements
      .map((value, index) => {
        const heightPercent = (value / max) * 100;
        return `
                <div class="bar-wrapper">
                    <div class="bar-value">${value}</div>
                    <div class="bar" style="height: ${heightPercent}%"></div>
                    <div class="bar-label">${days[index]}</div>
                </div>
            `;
      })
      .join("");
  };

  const renderPieChart = () => {
    const pieChart = document.getElementById("pie-chart");
    const pieLegend = document.getElementById("pie-legend");
    if (!pieChart || !pieLegend) return;

    let cumulativePercent = 0;
    const gradientParts = MOCK_DATA.categories.map((cat) => {
      const start = cumulativePercent;
      cumulativePercent += cat.value;
      return `${cat.color} ${start}% ${cumulativePercent}%`;
    });

    pieChart.style.background = `conic-gradient(${gradientParts.join(", ")})`;

    pieLegend.innerHTML = MOCK_DATA.categories
      .map(
        (cat) => `
            <div class="legend-item">
                <span class="legend-color" style="background-color: ${cat.color}"></span>
                <span class="legend-label">${cat.name}</span>
                <span class="legend-value">${cat.value}%</span>
            </div>
        `,
      )
      .join("");
  };

  const handleLogout = () => {
    if (confirm("¿Está seguro que desea cerrar sesión?")) {
      sessionStorage.clear();
      Router.navigate("login");
    }
  };

  const init = () => {
    console.log("📊 Inicializando Dashboard...");

    const role = sessionStorage.getItem("userRole");
    const name = sessionStorage.getItem("userName");
    console.log(`👤 Usuario: ${name} | Rol: ${role}`);

    loadUserInfo();
    loadMetrics();
    renderBarChart();
    renderPieChart();

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", handleLogout);
    }

    console.log("✅ Dashboard cargado correctamente.");
  };

  return { init };
})();
