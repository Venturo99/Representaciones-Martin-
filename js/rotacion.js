/**
 * Módulo de Rotación de Productos
 */
const RotacionModule = (() => {
  // Base de datos combinando Stock y "Ventas" (Salidas simuladas)
  let DATA = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      producto: "Melamina Blanca 18mm",
      categoria: "Maderas y Tableros",
      stock: 245,
      salidas: 850,
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      producto: "Melamina Roble 18mm",
      categoria: "Maderas y Tableros",
      stock: 32,
      salidas: 420,
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      producto: "MDF 15mm Crudo",
      categoria: "Maderas y Tableros",
      stock: 180,
      salidas: 600,
    },
    {
      id: 4,
      codigo: "MAD-TRI-001",
      producto: "Triplay 4mm",
      categoria: "Maderas y Tableros",
      stock: 95,
      salidas: 150,
    },
    {
      id: 5,
      codigo: "MAD-AGL-001",
      producto: "Aglomerado 18mm",
      categoria: "Maderas y Tableros",
      stock: 8,
      salidas: 50,
    },
    {
      id: 6,
      codigo: "FER-BIS-001",
      producto: "Bisagra Cazoleta 35mm",
      categoria: "Ferretería",
      stock: 520,
      salidas: 3000,
    },
    {
      id: 7,
      codigo: "FER-COR-001",
      producto: "Corredera Telescópica 45cm",
      categoria: "Ferretería",
      stock: 45,
      salidas: 320,
    },
    {
      id: 8,
      codigo: "HER-ELE-001",
      producto: "Taladro Percutor 650W",
      categoria: "Herramientas y Maquinaria",
      stock: 15,
      salidas: 5,
    }, // Estancado
    {
      id: 9,
      codigo: "PIS-LAM-001",
      producto: "Piso Laminado Roble 8mm",
      categoria: "Pisos",
      stock: 340,
      salidas: 1200,
    },
    {
      id: 10,
      codigo: "DRY-PLA-001",
      producto: "Plancha Drywall 1.2x2.4m",
      categoria: "Drywall",
      stock: 180,
      salidas: 400,
    },
  ];

  let currentPeriod = "month";

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

  const calculateRotation = () => {
    // ⭐ Creamos un multiplicador según el periodo seleccionado
    let multiplier = 1;
    if (currentPeriod === "day")
      multiplier = 1 / 30; // 1 mes ≈ 30 días
    else if (currentPeriod === "week")
      multiplier = 1 / 4; // 1 mes ≈ 4 semanas
    else if (currentPeriod === "month")
      multiplier = 1; // Base
    else if (currentPeriod === "year") multiplier = 12; // 1 año = 12 meses

    const dataToProcess = DATA.map((item) => {
      // Calculamos las salidas reales según el periodo
      const salidasReales = Math.round(item.salidas * multiplier);

      // La rotación se calcula: Salidas / (Stock + Salidas) * 100
      const totalMovido = salidasReales + item.stock;
      const porcentaje =
        totalMovido === 0 ? 0 : Math.round((salidasReales / totalMovido) * 100);

      return {
        ...item,
        salidasReales,
        porcentajeRotacion: porcentaje,
      };
    });

    // Ordenar de mayor a menor rotación
    return dataToProcess.sort((a, b) => b.salidasReales - a.salidasReales);
  };

  const renderKPIs = (data) => {
    const topProduct = data[0];
    const slowProduct = data[data.length - 1];
    const totalSalidas = data.reduce(
      (sum, item) => sum + item.salidasReales,
      0,
    );

    document.getElementById("kpi-top-producto").textContent =
      topProduct.producto;
    document.getElementById("kpi-top-cantidad").textContent =
      `${topProduct.salidasReales} unidades despachadas`;

    document.getElementById("kpi-slow-producto").textContent =
      slowProduct.producto;
    document.getElementById("kpi-slow-cantidad").textContent =
      `${slowProduct.salidasReales} unidades despachadas`;

    document.getElementById("kpi-total-salidas").textContent =
      totalSalidas.toLocaleString("es-PE");
  };

  const renderBarChart = (data) => {
    const container = document.getElementById("top-chart-container");
    const top5 = data.slice(0, 5);
    const maxSalidas = top5[0].salidasReales; // El número 1 será el 100% de la barra

    container.innerHTML = top5
      .map((item, index) => {
        const widthPercent = (item.salidasReales / maxSalidas) * 100;

        return `
        <div class="chart-row">
          <div class="chart-label">
            <span class="rank">${index + 1}</span>
            <span class="name">${item.producto}</span>
          </div>
          <div class="chart-bar-wrapper">
            <div class="chart-bar-fill" style="width: ${widthPercent}%"></div>
          </div>
          <div class="chart-value">${item.salidasReales}</div>
        </div>
      `;
      })
      .join("");
  };

  const renderTable = (data) => {
    const tbody = document.getElementById("rotacion-tbody");
    const resultsCount = document.getElementById("results-count");

    resultsCount.textContent = `${data.length} productos`;

    tbody.innerHTML = data
      .map((item) => {
        let rotacionClass = "rot-alta";
        if (item.porcentajeRotacion < 30) rotacionClass = "rot-baja";
        else if (item.porcentajeRotacion < 60) rotacionClass = "rot-media";

        return `
        <tr>
          <td>
            <div class="motivo-cell">
              <strong>${item.producto}</strong>
              <small>${item.codigo}</small>
            </div>
          </td>
          <td><span class="category-tag">${item.categoria}</span></td>
          <td><strong>${item.salidasReales}</strong> unid.</td>
          <td><strong>${item.stock}</strong> unid.</td>
          <td>
            <div class="rotacion-cell">
              <div class="rotacion-bar-bg">
                <div class="rotacion-bar-fill ${rotacionClass}" style="width: ${item.porcentajeRotacion}%"></div>
              </div>
              <span class="rotacion-text ${rotacionClass}">${item.porcentajeRotacion}%</span>
            </div>
          </td>
        </tr>
      `;
      })
      .join("");
  };

  const updateView = () => {
    const processedData = calculateRotation();
    renderKPIs(processedData);
    renderBarChart(processedData);
    renderTable(processedData);
  };

  const init = () => {
    console.log("📈 Inicializando Rotación de Productos...");
    loadUserInfo();
    updateView();

    document.getElementById("filter-period").addEventListener("change", (e) => {
      currentPeriod = e.target.value;
      updateView();
    });

    if (typeof NavModule !== "undefined") {
      NavModule.init("rotacion");
    }
    console.log("✅ Rotación cargada.");
  };

  return { init };
})();

console.log("🚀 rotacion.js cargado correctamente");
