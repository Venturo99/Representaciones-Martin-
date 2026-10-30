/**
 * Módulo de Cortes de Inventario (Toma Física)
 */
const CorteInventarioModule = (() => {
  // Base de datos con precios para calcular el ajuste
  let PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      stock: 245,
      precio: 85.5,
      unidad: "Plancha",
      conteo: null,
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      stock: 32,
      precio: 92.0,
      unidad: "Plancha",
      conteo: null,
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      nombre: "MDF 15mm Crudo",
      stock: 180,
      precio: 68.0,
      unidad: "Plancha",
      conteo: null,
    },
    {
      id: 4,
      codigo: "MAD-TRI-001",
      nombre: "Triplay 4mm",
      stock: 95,
      precio: 45.0,
      unidad: "Plancha",
      conteo: null,
    },
    {
      id: 5,
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      stock: 520,
      precio: 3.5,
      unidad: "Unidad",
      conteo: null,
    },
    {
      id: 6,
      codigo: "FER-COR-001",
      nombre: "Corredera Telescópica 45cm",
      stock: 45,
      precio: 12.0,
      unidad: "Unidad",
      conteo: null,
    },
  ];

  let isDirty = false;

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

  const updateSaveButton = () => {
    const btn = document.getElementById("btn-save-corte");
    if (isDirty) {
      btn.disabled = false;
      btn.classList.remove("btn-disabled");
    } else {
      btn.disabled = true;
      btn.classList.add("btn-disabled");
    }
  };

  const calculateDiff = (input, stockSistema, precio) => {
    const conteo = parseInt(input.value);
    const diffCell = input.closest("tr").querySelector(".diff-cell");
    const costCell = input.closest("tr").querySelector(".cost-cell");

    if (isNaN(conteo)) {
      diffCell.innerHTML = "-";
      diffCell.className = "diff-cell";
      costCell.textContent = "-";
      return;
    }

    const diff = conteo - stockSistema;
    const costo = Math.abs(diff) * precio;

    // Actualizar celda de diferencia
    if (diff > 0) {
      diffCell.innerHTML = `<span class="diff-positive">+${diff}</span>`;
    } else if (diff < 0) {
      diffCell.innerHTML = `<span class="diff-negative">${diff}</span>`;
    } else {
      diffCell.innerHTML = `<span class="diff-zero">0</span>`;
    }

    // Actualizar celda de costo
    costCell.textContent = diff !== 0 ? `S/ ${costo.toFixed(2)}` : "-";
  };

  const renderTable = () => {
    const tbody = document.getElementById("corte-tbody");
    const resultsCount = document.getElementById("results-count");

    resultsCount.textContent = `${PRODUCTS.length} productos`;

    tbody.innerHTML = PRODUCTS.map((p) => {
      // Si ya hay un conteo guardado previamente (ej. al recargar), lo mostramos
      const conteoVal = p.conteo !== null ? p.conteo : "";

      return `
        <tr data-id="${p.id}">
          <td><span class="code-tag">${p.codigo}</span></td>
          <td>${p.nombre}</td>
          <td><strong>${p.stock}</strong> ${p.unidad}</td>
          <td>
            <div class="input-conteo-wrapper">
              <input type="number" class="input-conteo" min="0" placeholder="0" value="${conteoVal}">
              <span class="unidad-label">${p.unidad}</span>
            </div>
          </td>
          <td class="diff-cell">-</td>
          <td class="cost-cell">-</td>
        </tr>
      `;
    }).join("");

    // Asignar eventos a los inputs
    tbody.querySelectorAll(".input-conteo").forEach((input) => {
      input.addEventListener("input", (e) => {
        const row = e.target.closest("tr");
        const id = parseInt(row.dataset.id);
        const product = PRODUCTS.find((p) => p.id === id);

        if (e.target.value !== "") {
          isDirty = true;
          product.conteo = parseInt(e.target.value);
        } else {
          product.conteo = null;
        }

        calculateDiff(e.target, product.stock, product.precio);
        updateSaveButton();
      });
    });
  };

  const handleSaveCorte = () => {
    if (!isDirty) return;

    let ajustesPositivos = 0;
    let ajustesNegativos = 0;
    let costoTotal = 0;

    PRODUCTS.forEach((p) => {
      if (p.conteo !== null && p.conteo !== p.stock) {
        const diff = p.conteo - p.stock;
        if (diff > 0) ajustesPositivos++;
        else ajustesNegativos++;

        costoTotal += Math.abs(diff) * p.precio;

        // ⭐ Aquí se actualiza el stock del sistema al conteo físico
        p.stock = p.conteo;
      }
      p.conteo = null; // Limpiar para el siguiente corte
    });

    isDirty = false;
    showToast(
      `✅ Corte guardado. Ajustes realizados: ${ajustesPositivos + ajustesNegativos}. Costo total: S/ ${costoTotal.toFixed(2)}`,
      "success",
    );

    // Recargar la tabla limpia
    renderTable();
    updateSaveButton();
  };

  const init = () => {
    console.log("📋 Inicializando Cortes de Inventario...");
    loadUserInfo();
    renderTable();
    updateSaveButton();

    document
      .getElementById("btn-save-corte")
      .addEventListener("click", handleSaveCorte);

    if (typeof NavModule !== "undefined") {
      NavModule.init("corte-inventario");
    }
    console.log("✅ Cortes de Inventario cargado.");
  };

  return { init };
})();

console.log("🚀 corte-inventario.js cargado correctamente");
