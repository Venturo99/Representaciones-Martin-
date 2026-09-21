/**
 * Módulo del Dashboard - FASE 1 FINAL
 */
const DashboardModule = (() => {
  // ============================================
  // DATOS POR PERÍODO - TODO CAMBIA SEGÚN FILTRO
  // ============================================
  const DATA_BY_PERIOD = {
    diario: {
      kpis: {
        tableros: 2458,
        melaminas: 47,
        alertas: 23,
        pedidos: 8,
        cortes: 156,
      },
      movements: [45, 62, 38, 71, 55, 80, 67],
      movementLabels: ["06h", "09h", "12h", "15h", "18h", "21h", "23h"],
      chartTitle: "Movimientos por Hora (Hoy)",
      salesTrend: [
        { mes: "06h", valor: 25 },
        { mes: "09h", valor: 48 },
        { mes: "12h", valor: 65 },
        { mes: "15h", valor: 42 },
        { mes: "18h", valor: 78 },
        { mes: "21h", valor: 35 },
      ],
      categorias: [
        { name: "Tableros MDF", value: 42, color: "#f37021" },
        { name: "Melaminas", value: 25, color: "#008744" },
        { name: "Revestimientos", value: 15, color: "#3498db" },
        { name: "Accesorios", value: 10, color: "#9b59b6" },
        { name: "Ferretería", value: 8, color: "#e74c3c" },
      ],
      topProducts: [
        { nombre: "Melamina Blanca 18mm", ventas: 45 },
        { nombre: "MDF 15mm Crudo", ventas: 38 },
        { nombre: "Melamina Roble 18mm", ventas: 32 },
        { nombre: "Tablero RH 18mm", ventas: 25 },
        { nombre: "Bisagra Cazoleta 35mm", ventas: 18 },
      ],
      movimientos: [
        {
          hora: "09:15",
          codigo: "TAB-MEL-001",
          producto: "Melamina Blanca 18mm",
          categoria: "Melaminas",
          tipo: "Entrada",
          cantidad: 120,
          usuario: "Luis Ramírez",
        },
        {
          hora: "08:42",
          codigo: "TAB-MDF-015",
          producto: "MDF 15mm Crudo",
          categoria: "Tableros",
          tipo: "Salida",
          cantidad: -35,
          usuario: "María Torres",
        },
        {
          hora: "08:20",
          codigo: "ACC-BIS-045",
          producto: "Bisagra Cazoleta 35mm",
          categoria: "Accesorios",
          tipo: "Entrada",
          cantidad: 500,
          usuario: "Luis Ramírez",
        },
        {
          hora: "07:55",
          codigo: "TAB-MEL-018",
          producto: "Melamina Roble 18mm",
          categoria: "Melaminas",
          tipo: "Salida",
          cantidad: -48,
          usuario: "María Torres",
        },
        {
          hora: "07:30",
          codigo: "REV-PVC-002",
          producto: "Canto PVC Blanco 22mm",
          categoria: "Revestimientos",
          tipo: "Ajuste",
          cantidad: 15,
          usuario: "Carlos Mendoza",
        },
      ],
    },
    semanal: {
      kpis: {
        tableros: 2458,
        melaminas: 47,
        alertas: 23,
        pedidos: 8,
        cortes: 892,
      },
      movements: [180, 220, 195, 240, 210, 165, 130],
      movementLabels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
      chartTitle: "Movimientos por Semana",
      salesTrend: [
        { mes: "Lun", valor: 185 },
        { mes: "Mar", valor: 210 },
        { mes: "Mié", valor: 195 },
        { mes: "Jue", valor: 245 },
        { mes: "Vie", valor: 268 },
        { mes: "Sáb", valor: 190 },
      ],
      categorias: [
        { name: "Tableros MDF", value: 35, color: "#f37021" },
        { name: "Melaminas", value: 28, color: "#008744" },
        { name: "Revestimientos", value: 18, color: "#3498db" },
        { name: "Accesorios", value: 12, color: "#9b59b6" },
        { name: "Ferretería", value: 7, color: "#e74c3c" },
      ],
      topProducts: [
        { nombre: "Melamina Blanca 18mm", ventas: 485 },
        { nombre: "MDF 15mm Crudo", ventas: 392 },
        { nombre: "Melamina Roble 18mm", ventas: 318 },
        { nombre: "Tablero RH 18mm", ventas: 245 },
        { nombre: "Melamina Wengue 18mm", ventas: 187 },
      ],
      movimientos: [
        {
          hora: "09:15",
          codigo: "TAB-MEL-001",
          producto: "Melamina Blanca 18mm",
          categoria: "Melaminas",
          tipo: "Entrada",
          cantidad: 120,
          usuario: "Luis Ramírez",
        },
        {
          hora: "08:42",
          codigo: "TAB-MDF-015",
          producto: "MDF 15mm Crudo",
          categoria: "Tableros",
          tipo: "Salida",
          cantidad: -35,
          usuario: "María Torres",
        },
        {
          hora: "08:20",
          codigo: "ACC-BIS-045",
          producto: "Bisagra Cazoleta 35mm",
          categoria: "Accesorios",
          tipo: "Entrada",
          cantidad: 500,
          usuario: "Luis Ramírez",
        },
        {
          hora: "07:55",
          codigo: "TAB-MEL-018",
          producto: "Melamina Roble 18mm",
          categoria: "Melaminas",
          tipo: "Salida",
          cantidad: -48,
          usuario: "María Torres",
        },
        {
          hora: "07:30",
          codigo: "REV-PVC-002",
          producto: "Canto PVC Blanco 22mm",
          categoria: "Revestimientos",
          tipo: "Ajuste",
          cantidad: 15,
          usuario: "Carlos Mendoza",
        },
      ],
    },
    mensual: {
      kpis: {
        tableros: 2458,
        melaminas: 47,
        alertas: 23,
        pedidos: 8,
        cortes: 3456,
      },
      movements: [820, 950, 1120, 980, 1050, 890, 720],
      movementLabels: [
        "Sem 1",
        "Sem 2",
        "Sem 3",
        "Sem 4",
        "Sem 5",
        "Sem 6",
        "Sem 7",
      ],
      chartTitle: "Movimientos por Semana (Mes)",
      salesTrend: [
        { mes: "Sem 1", valor: 820 },
        { mes: "Sem 2", valor: 950 },
        { mes: "Sem 3", valor: 1120 },
        { mes: "Sem 4", valor: 980 },
        { mes: "Sem 5", valor: 1050 },
        { mes: "Sem 6", valor: 890 },
      ],
      categorias: [
        { name: "Tableros MDF", value: 30, color: "#f37021" },
        { name: "Melaminas", value: 32, color: "#008744" },
        { name: "Revestimientos", value: 20, color: "#3498db" },
        { name: "Accesorios", value: 11, color: "#9b59b6" },
        { name: "Ferretería", value: 7, color: "#e74c3c" },
      ],
      topProducts: [
        { nombre: "Melamina Blanca 18mm", ventas: 1245 },
        { nombre: "MDF 15mm Crudo", ventas: 1080 },
        { nombre: "Melamina Roble 18mm", ventas: 875 },
        { nombre: "Tablero RH 18mm", ventas: 620 },
        { nombre: "Melamina Wengue 18mm", ventas: 445 },
      ],
      movimientos: [
        {
          hora: "Sem 1",
          codigo: "TAB-MEL-001",
          producto: "Melamina Blanca 18mm",
          categoria: "Melaminas",
          tipo: "Entrada",
          cantidad: 850,
          usuario: "Luis Ramírez",
        },
        {
          hora: "Sem 2",
          codigo: "TAB-MDF-015",
          producto: "MDF 15mm Crudo",
          categoria: "Tableros",
          tipo: "Salida",
          cantidad: -420,
          usuario: "María Torres",
        },
        {
          hora: "Sem 3",
          codigo: "ACC-BIS-045",
          producto: "Bisagra Cazoleta 35mm",
          categoria: "Accesorios",
          tipo: "Entrada",
          cantidad: 2000,
          usuario: "Luis Ramírez",
        },
        {
          hora: "Sem 4",
          codigo: "TAB-MEL-018",
          producto: "Melamina Roble 18mm",
          categoria: "Melaminas",
          tipo: "Salida",
          cantidad: -560,
          usuario: "María Torres",
        },
        {
          hora: "Sem 5",
          codigo: "REV-PVC-002",
          producto: "Canto PVC Blanco 22mm",
          categoria: "Revestimientos",
          tipo: "Ajuste",
          cantidad: 180,
          usuario: "Carlos Mendoza",
        },
      ],
    },
    anual: {
      kpis: {
        tableros: 24580,
        melaminas: 470,
        alertas: 230,
        pedidos: 96,
        cortes: 38450,
      },
      movements: [8500, 9200, 8900, 9800, 10200, 9500, 7200],
      movementLabels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"],
      chartTitle: "Movimientos por Mes (Año)",
      salesTrend: [
        { mes: "Ene", valor: 1850 },
        { mes: "Feb", valor: 2100 },
        { mes: "Mar", valor: 1950 },
        { mes: "Abr", valor: 2450 },
        { mes: "May", valor: 2680 },
        { mes: "Jun", valor: 2900 },
      ],
      categorias: [
        { name: "Tableros MDF", value: 28, color: "#f37021" },
        { name: "Melaminas", value: 35, color: "#008744" },
        { name: "Revestimientos", value: 22, color: "#3498db" },
        { name: "Accesorios", value: 9, color: "#9b59b6" },
        { name: "Ferretería", value: 6, color: "#e74c3c" },
      ],
      topProducts: [
        { nombre: "Melamina Blanca 18mm", ventas: 14850 },
        { nombre: "MDF 15mm Crudo", ventas: 12390 },
        { nombre: "Melamina Roble 18mm", ventas: 10180 },
        { nombre: "Tablero RH 18mm", ventas: 8245 },
        { nombre: "Melamina Wengue 18mm", ventas: 6187 },
      ],
      movimientos: [
        {
          hora: "Ene",
          codigo: "TAB-MEL-001",
          producto: "Melamina Blanca 18mm",
          categoria: "Melaminas",
          tipo: "Entrada",
          cantidad: 12000,
          usuario: "Luis Ramírez",
        },
        {
          hora: "Feb",
          codigo: "TAB-MDF-015",
          producto: "MDF 15mm Crudo",
          categoria: "Tableros",
          tipo: "Salida",
          cantidad: -8500,
          usuario: "María Torres",
        },
        {
          hora: "Mar",
          codigo: "ACC-BIS-045",
          producto: "Bisagra Cazoleta 35mm",
          categoria: "Accesorios",
          tipo: "Entrada",
          cantidad: 25000,
          usuario: "Luis Ramírez",
        },
        {
          hora: "Abr",
          codigo: "TAB-MEL-018",
          producto: "Melamina Roble 18mm",
          categoria: "Melaminas",
          tipo: "Salida",
          cantidad: -9800,
          usuario: "María Torres",
        },
        {
          hora: "May",
          codigo: "REV-PVC-002",
          producto: "Canto PVC Blanco 22mm",
          categoria: "Revestimientos",
          tipo: "Ajuste",
          cantidad: 2400,
          usuario: "Carlos Mendoza",
        },
      ],
    },
  };

  let currentPeriod = "semanal";

  const animateValue = (element, start, end, duration) => {
    if (!element) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.textContent = Math.floor(
        progress * (end - start) + start,
      ).toLocaleString("es-PE");
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

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

  const loadMetrics = () => {
    const data = DATA_BY_PERIOD[currentPeriod];
    animateValue(
      document.getElementById("metric-tableros"),
      0,
      data.kpis.tableros,
      800,
    );
    animateValue(
      document.getElementById("metric-melaminas"),
      0,
      data.kpis.melaminas,
      600,
    );
    animateValue(
      document.getElementById("metric-alertas"),
      0,
      data.kpis.alertas,
      600,
    );
    animateValue(
      document.getElementById("metric-pedidos"),
      0,
      data.kpis.pedidos,
      600,
    );
    animateValue(
      document.getElementById("metric-cortes"),
      0,
      data.kpis.cortes,
      800,
    );
  };

  const renderBarChart = () => {
    const container = document.getElementById("bar-chart");
    if (!container) return;
    const data = DATA_BY_PERIOD[currentPeriod];
    const max = Math.max(...data.movements);
    container.innerHTML = data.movements
      .map((value, i) => {
        const h = (value / max) * 100;
        return `<div class="bar-wrapper" title="${data.movementLabels[i]}: ${value} movimientos">
                <div class="bar-value">${value}</div>
                <div class="bar" style="height: ${h}%"></div>
                <div class="bar-label">${data.movementLabels[i]}</div>
            </div>`;
      })
      .join("");
  };

  // ⭐ LA DONA AHORA CAMBIA CON EL FILTRO
  const renderPieChart = () => {
    const pie = document.getElementById("pie-chart");
    const legend = document.getElementById("pie-legend");
    if (!pie || !legend) return;

    const cats = DATA_BY_PERIOD[currentPeriod].categorias;
    let cum = 0;
    const parts = cats.map((c) => {
      const start = cum;
      cum += c.value;
      return `${c.color} ${start}% ${cum}%`;
    });
    pie.style.background = `conic-gradient(${parts.join(", ")})`;
    legend.innerHTML = cats
      .map(
        (c) => `
            <div class="legend-item">
                <span class="legend-color" style="background:${c.color}"></span>
                <span class="legend-label">${c.name}</span>
                <span class="legend-value">${c.value}%</span>
            </div>
        `,
      )
      .join("");
  };

  const renderLineChart = () => {
    const c = document.getElementById("line-chart");
    if (!c) return;
    const data = DATA_BY_PERIOD[currentPeriod];
    const max = Math.max(...data.salesTrend.map((s) => s.valor));
    const w = 500,
      h = 180,
      p = 30;
    const cw = w - p * 2,
      ch = h - p * 2;
    const points = data.salesTrend.map((item, i) => ({
      x: p + (i / (data.salesTrend.length - 1)) * cw,
      y: p + ch - (item.valor / max) * ch,
      ...item,
    }));
    const path = points
      .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x} ${pt.y}`)
      .join(" ");
    const area = `${path} L ${points[points.length - 1].x} ${h - p} L ${points[0].x} ${h - p} Z`;
    c.innerHTML = `<svg viewBox="0 0 ${w} ${h}" class="line-svg" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#f37021" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="#f37021" stop-opacity="0"/>
                </linearGradient>
            </defs>
            <path d="${area}" fill="url(#lg)"/>
            <path d="${path}" stroke="#f37021" stroke-width="3" fill="none" stroke-linecap="round"/>
            ${points
              .map(
                (pt) => `
                <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="white" stroke="#f37021" stroke-width="3"/>
                <text x="${pt.x}" y="${pt.y - 12}" text-anchor="middle" font-size="11" font-weight="bold" fill="#0a2540">S/${pt.valor}k</text>
                <text x="${pt.x}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#7a8699">${pt.mes}</text>
            `,
              )
              .join("")}
        </svg>`;
  };

  const renderTopProducts = () => {
    const c = document.getElementById("top-products");
    if (!c) return;
    const data = DATA_BY_PERIOD[currentPeriod];
    const max = Math.max(...data.topProducts.map((p) => p.ventas));
    c.innerHTML = data.topProducts
      .map((p, i) => {
        const pct = (p.ventas / max) * 100;
        return `<div class="top-product-item">
                <div class="top-product-rank">${i + 1}</div>
                <div class="top-product-info">
                    <div class="top-product-name">${p.nombre}</div>
                    <div class="top-product-bar"><div class="top-product-bar-fill" style="width:${pct}%"></div></div>
                </div>
                <div class="top-product-value">${p.ventas.toLocaleString("es-PE")}</div>
            </div>`;
      })
      .join("");
  };

  const renderMovimientos = () => {
    const tb = document.getElementById("movimientos-tbody");
    if (!tb) return;
    const data = DATA_BY_PERIOD[currentPeriod];
    tb.innerHTML = data.movimientos
      .map((m) => {
        const bc =
          m.tipo === "Entrada"
            ? "badge-success"
            : m.tipo === "Salida"
              ? "badge-danger"
              : "badge-warning";
        const cc = m.cantidad > 0 ? "text-success" : "text-danger";
        return `<tr>
                <td><strong>${m.hora}</strong></td>
                <td><span class="code-tag">${m.codigo}</span></td>
                <td>${m.producto}</td>
                <td><span class="category-tag">${m.categoria}</span></td>
                <td><span class="badge ${bc}">${m.tipo}</span></td>
                <td class="${cc}"><strong>${m.cantidad > 0 ? "+" : ""}${m.cantidad.toLocaleString("es-PE")}</strong></td>
                <td>${m.usuario}</td>
            </tr>`;
      })
      .join("");
  };

  const updateChartTitle = () => {
    const title = document.querySelector(".chart-card h3");
    if (title) {
      const data = DATA_BY_PERIOD[currentPeriod];
      title.innerHTML = `<i class="fas fa-chart-bar"></i> ${data.chartTitle}`;
    }
  };

  // ⭐ ACTUALIZA TODO, INCLUYENDO LA DONA
  const refreshAll = () => {
    loadMetrics();
    renderBarChart();
    renderPieChart(); // ⭐ AHORA SÍ - LA DONA CAMBIA
    renderLineChart();
    renderTopProducts();
    renderMovimientos();
    updateChartTitle();
  };

  const initFilters = () => {
    const filter = document.getElementById("period-filter");
    if (!filter) return;
    filter.addEventListener("change", (e) => {
      currentPeriod = e.target.value;
      console.log(`🔄 Cambiando a: ${currentPeriod}`);
      refreshAll();
    });
  };

  const initNavigation = () => {
    // ⭐ Usar el módulo de navegación centralizado
    NavModule.init("dashboard");
  };

  const init = () => {
    console.log("📊 Inicializando Dashboard...");
    loadUserInfo();
    refreshAll();
    initFilters();
    initNavigation();
    console.log("✅ Dashboard cargado.");
  };

  return { init };
})();
