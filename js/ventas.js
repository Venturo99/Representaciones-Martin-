/**
 * Módulo de Punto de Venta (POS) Profesional
 */
const VentasModule = (() => {
  let PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      precio: 85.5,
      stock: 245,
      unidad: "Plancha",
      categoria: "Melaminas",
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      precio: 92.0,
      stock: 32,
      unidad: "Plancha",
      categoria: "Melaminas",
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      nombre: "MDF 15mm Crudo",
      precio: 68.0,
      stock: 180,
      unidad: "Plancha",
      categoria: "Tableros",
    },
    {
      id: 4,
      codigo: "MAD-TRI-001",
      nombre: "Triplay 4mm",
      precio: 45.0,
      stock: 8,
      unidad: "Plancha",
      categoria: "Tableros",
    },
    {
      id: 8,
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      precio: 3.5,
      stock: 520,
      unidad: "Unidad",
      categoria: "Ferretería",
    },
    {
      id: 9,
      codigo: "FER-COR-001",
      nombre: "Corredera Telescópica 45cm",
      precio: 12.0,
      stock: 45,
      unidad: "Unidad",
      categoria: "Ferretería",
    },
    {
      id: 10,
      codigo: "FER-JAL-001",
      nombre: "Jalador Acero Inox 128mm",
      precio: 8.5,
      stock: 210,
      unidad: "Unidad",
      categoria: "Ferretería",
    },
    {
      id: 11,
      codigo: "REV-CAN-001",
      nombre: "Canto PVC Blanco 22mm",
      precio: 2.5,
      stock: 1500,
      unidad: "Metro",
      categoria: "Revestimientos",
    },
  ];

  let cart = [];
  let searchQuery = "";
  let currentTotal = 0;
  let currentPaymentMethod = "efectivo";
  let currentClient = { type: "DNI", doc: "", name: "" };

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
  // RENDERIZADO DE PRODUCTOS
  // ============================================
  const renderInventoryAlert = () => {
    const lowStock = PRODUCTS.filter((p) => p.stock > 0 && p.stock <= 10);
    const outOfStock = PRODUCTS.filter((p) => p.stock === 0);
    const alertEl = document.getElementById("inventory-alert");
    const alertText = document.getElementById("alert-text");

    if (outOfStock.length > 0) {
      alertEl.className = "pos-inventory-alert danger";
      alertText.textContent = `${outOfStock.length} productos AGOTADOS. Revisar con almacén.`;
    } else if (lowStock.length > 0) {
      alertEl.className = "pos-inventory-alert warning";
      alertText.textContent = `${lowStock.length} productos con stock BAJO (menos de 10 unid).`;
    } else {
      alertEl.className = "pos-inventory-alert success";
      alertText.textContent = `Todos los productos tienen stock suficiente.`;
    }
  };

  const renderProducts = () => {
    const grid = document.getElementById("product-grid");
    if (!grid) return;

    const filtered = PRODUCTS.filter(
      (p) =>
        p.nombre.toLowerCase().includes(searchQuery) ||
        p.codigo.toLowerCase().includes(searchQuery) ||
        p.categoria.toLowerCase().includes(searchQuery),
    );

    if (filtered.length === 0) {
      grid.innerHTML = `<div class="no-results">No se encontraron productos.</div>`;
      return;
    }

    grid.innerHTML = filtered
      .map((p) => {
        const isOutOfStock = p.stock === 0;
        const isLowStock = p.stock > 0 && p.stock <= 10;

        let stockClass = "p-stock";
        if (isOutOfStock) stockClass += " text-danger";
        else if (isLowStock) stockClass += " text-warning";

        return `
        <div class="product-card ${isOutOfStock ? "out-of-stock" : ""}" onclick="${isOutOfStock ? "" : `VentasModule.addToCart(${p.id})`}">
          <div class="p-card-header">
            <span class="p-code">${p.codigo}</span>
            <span class="${stockClass}">Stock: ${p.stock}</span>
          </div>
          <h4 class="p-name">${p.nombre}</h4>
          <span class="p-category">${p.categoria}</span>
          <div class="p-footer">
            <span class="p-price">S/ ${p.precio.toFixed(2)}</span>
            <button class="btn-add-cart" ${isOutOfStock ? "disabled" : ""}>
              <i class="fas fa-plus"></i>
            </button>
          </div>
        </div>
      `;
      })
      .join("");
  };

  // ============================================
  // LÓGICA DEL CARRITO
  // ============================================
  const addToCart = (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const existingItem = cart.find((item) => item.product.id === id);

    if (existingItem) {
      if (existingItem.qty < product.stock) {
        existingItem.qty++;
      } else {
        showToast("No hay más stock disponible", "warning");
        return;
      }
    } else {
      if (product.stock > 0) {
        cart.push({ product, qty: 1 });
      }
    }
    renderCart();
  };

  const updateQty = (id, delta) => {
    const item = cart.find((i) => i.product.id === id);
    if (!item) return;

    const newQty = item.qty + delta;

    if (newQty <= 0) {
      removeItem(id);
    } else if (newQty > item.product.stock) {
      showToast("Stock máximo alcanzado", "warning");
    } else {
      item.qty = newQty;
      renderCart();
    }
  };

  const removeItem = (id) => {
    cart = cart.filter((i) => i.product.id !== id);
    renderCart();
  };

  const renderCart = () => {
    const container = document.getElementById("cart-items");
    const countBadge = document.getElementById("cart-count");
    const subtotalDisplay = document.getElementById("cart-subtotal");
    const igvDisplay = document.getElementById("cart-igv");
    const totalDisplay = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("btn-checkout");

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-box-open"></i>
          <p>Agrega productos al carrito</p>
        </div>
      `;
      countBadge.textContent = "0 ítems";
      subtotalDisplay.textContent = "S/ 0.00";
      igvDisplay.textContent = "S/ 0.00";
      totalDisplay.textContent = "S/ 0.00";
      checkoutBtn.disabled = true;
      return;
    }

    let subtotal = 0;
    let totalItems = 0;

    container.innerHTML = cart
      .map((item) => {
        const lineTotal = item.product.precio * item.qty;
        subtotal += lineTotal;
        totalItems += item.qty;

        return `
        <div class="cart-item">
          <div class="ci-info">
            <strong>${item.product.nombre}</strong>
            <span>S/ ${item.product.precio.toFixed(2)} / ${item.product.unidad}</span>
          </div>
          <div class="ci-controls">
            <button onclick="VentasModule.updateQty(${item.product.id}, -1)"><i class="fas fa-minus"></i></button>
            <span>${item.qty}</span>
            <button onclick="VentasModule.updateQty(${item.product.id}, 1)"><i class="fas fa-plus"></i></button>
          </div>
          <div class="ci-subtotal">S/ ${lineTotal.toFixed(2)}</div>
          <button class="btn-remove" onclick="VentasModule.removeItem(${item.product.id})" title="Eliminar"><i class="fas fa-trash"></i></button>
        </div>
      `;
      })
      .join("");

    const igv = subtotal * 0.18;
    currentTotal = subtotal + igv;

    countBadge.textContent = `${totalItems} ítems`;
    subtotalDisplay.textContent = `S/ ${subtotal.toFixed(2)}`;
    igvDisplay.textContent = `S/ ${igv.toFixed(2)}`;
    totalDisplay.textContent = `S/ ${currentTotal.toFixed(2)}`;
    checkoutBtn.disabled = false;
  };

  // ============================================
  // LÓGICA DE PAGO Y MODAL
  // ============================================
  const openPaymentModal = () => {
    if (cart.length === 0) return;

    currentClient.type = document.getElementById("client-doc-type").value;
    currentClient.doc = document.getElementById("client-doc").value.trim();
    currentClient.name =
      document.getElementById("client-name").value.trim() || "Consumidor Final";

    if (!currentClient.doc) {
      showToast(
        `Ingrese el número de ${currentClient.type} del cliente`,
        "warning",
      );
      return;
    }

    currentPaymentMethod = document.querySelector(
      'input[name="payment"]:checked',
    ).value;

    document.getElementById("modal-total-pay").textContent =
      `S/ ${currentTotal.toFixed(2)}`;

    const fieldsContainer = document.getElementById("dynamic-payment-fields");

    if (currentPaymentMethod === "efectivo") {
      fieldsContainer.innerHTML = `
        <div class="form-field">
          <label>Efectivo Recibido (S/)</label>
          <input type="number" id="cash-received" min="${currentTotal.toFixed(2)}" step="0.10" placeholder="0.00">
          <div id="change-due" class="change-due hidden">Vuelto: <strong>S/ 0.00</strong></div>
          <span class="error-message" id="cash-error"></span>
        </div>
      `;
      document
        .getElementById("cash-received")
        .addEventListener("input", (e) => {
          const received = parseFloat(e.target.value) || 0;
          const changeEl = document.getElementById("change-due");
          if (received >= currentTotal) {
            const change = received - currentTotal;
            changeEl.innerHTML = `Vuelto: <strong>S/ ${change.toFixed(2)}</strong>`;
            changeEl.classList.remove("hidden");
          } else {
            changeEl.classList.add("hidden");
          }
        });
    } else if (currentPaymentMethod === "tarjeta") {
      fieldsContainer.innerHTML = `
        <div class="form-field">
          <label>Banco de la Tarjeta</label>
          <select id="card-bank" class="filter-input">
            <option value="">Seleccione un banco...</option>
            <option value="BCP">BCP</option>
            <option value="BBVA">BBVA</option>
            <option value="Interbank">Interbank</option>
            <option value="Scotiabank">Scotiabank</option>
            <option value="Banco de la Nación">Banco de la Nación</option>
          </select>
          <span class="error-message" id="card-error"></span>
        </div>
      `;
    } else if (currentPaymentMethod === "yape") {
      fieldsContainer.innerHTML = `
        <div class="form-field">
          <label>Código de Operación / Yape</label>
          <input type="text" id="yape-code" placeholder="Ej: 12345678">
          <div class="qr-placeholder">
            <i class="fas fa-qrcode"></i>
            <span>Escanear QR (Simulado)</span>
          </div>
          <span class="error-message" id="yape-error"></span>
        </div>
      `;
    }

    document.getElementById("payment-modal").classList.remove("hidden");
  };

  const closePaymentModal = () => {
    document.getElementById("payment-modal").classList.add("hidden");
  };

  // ============================================
  // GENERACIÓN DE ARCHIVO TXT Y PROCESAMIENTO
  // ============================================
  const confirmPayment = () => {
    let paymentDetail = "";
    let isValid = true;

    // Validar según método
    if (currentPaymentMethod === "efectivo") {
      const received =
        parseFloat(document.getElementById("cash-received").value) || 0;
      if (received < currentTotal) {
        document.getElementById("cash-error").textContent =
          "El efectivo recibido es menor al total.";
        isValid = false;
      } else {
        paymentDetail = `EFECTIVO (Recibido: S/ ${received.toFixed(2)}, Vuelto: S/ ${(received - currentTotal).toFixed(2)})`;
      }
    } else if (currentPaymentMethod === "tarjeta") {
      const bank = document.getElementById("card-bank").value;
      if (!bank) {
        document.getElementById("card-error").textContent =
          "Seleccione un banco.";
        isValid = false;
      } else {
        paymentDetail = `TARJETA - BANCO: ${bank}`;
      }
    } else if (currentPaymentMethod === "yape") {
      const code = document.getElementById("yape-code").value.trim();
      if (!code) {
        document.getElementById("yape-error").textContent =
          "Ingrese el código de operación.";
        isValid = false;
      } else {
        paymentDetail = `YAPE/PLIN - OP: ${code}`;
      }
    }

    if (!isValid) return;

    // 1. Generar Contenido del TXT (Simulación de Boleta/Factura)
    const date = new Date().toLocaleString("es-PE");
    const receiptType =
      currentClient.type === "RUC"
        ? "FACTURA ELECTRÓNICA"
        : "BOLETA DE VENTA ELECTRÓNICA";
    const receiptNumber = `${currentClient.type === "RUC" ? "F001" : "B001"}-${Math.floor(
      Math.random() * 10000,
    )
      .toString()
      .padStart(5, "0")}`;

    let txtContent = "";
    txtContent += "=========================================\n";
    txtContent += "    REPRESENTACIONES MARTÍN S.A.C.\n";
    txtContent += "      RUC: 20123456789\n";
    txtContent += "   Av. Industrial 123, Lima - Perú\n";
    txtContent += "=========================================\n";
    txtContent += `${receiptType}\n`;
    txtContent += `N°: ${receiptNumber}\n`;
    txtContent += `Fecha: ${date}\n`;
    txtContent += "-----------------------------------------\n";
    txtContent += `CLIENTE: ${currentClient.name}\n`;
    txtContent += `${currentClient.type}: ${currentClient.doc}\n`;
    txtContent += "-----------------------------------------\n";
    txtContent += "CANT  DESCRIPCIÓN                 TOTAL\n";
    txtContent += "-----------------------------------------\n";

    cart.forEach((item) => {
      const lineTotal = item.product.precio * item.qty;
      const name = item.product.nombre.substring(0, 22).padEnd(22);
      txtContent += `${item.qty.toString().padEnd(5)} ${name} S/ ${lineTotal.toFixed(2)}\n`;
    });

    txtContent += "-----------------------------------------\n";
    const subtotal = currentTotal / 1.18;
    const igv = currentTotal - subtotal;
    txtContent += `SUBTOTAL:                    S/ ${subtotal.toFixed(2)}\n`;
    txtContent += `IGV (18%):                   S/ ${igv.toFixed(2)}\n`;
    txtContent += `TOTAL A PAGAR:               S/ ${currentTotal.toFixed(2)}\n`;
    txtContent += "-----------------------------------------\n";
    txtContent += `FORMA DE PAGO: ${paymentDetail}\n`;
    txtContent += "=========================================\n";
    txtContent += "     ¡Gracias por su preferencia!\n";
    txtContent += "=========================================\n";

    // 2. Crear archivo y descargar
    const blob = new Blob([txtContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${receiptType.replace(/ /g, "_")}_${receiptNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 3. Actualizar Stock
    cart.forEach((item) => {
      const productInDB = PRODUCTS.find((p) => p.id === item.product.id);
      if (productInDB) productInDB.stock -= item.qty;
    });

    // 4. Limpiar y cerrar
    showToast(`✅ ${receiptType} generada y stock actualizado.`, "success");
    cart = [];
    document.getElementById("client-doc").value = "";
    document.getElementById("client-name").value = "";
    closePaymentModal();

    renderCart();
    renderProducts();
    renderInventoryAlert();
  };

  // ============================================
  // INICIALIZACIÓN
  // ============================================
  const init = () => {
    console.log("🛒 Inicializando Punto de Venta...");
    loadUserInfo();
    renderInventoryAlert();
    renderProducts();
    renderCart();

    document.getElementById("search-product").addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });

    document
      .getElementById("btn-checkout")
      .addEventListener("click", openPaymentModal);
    document
      .getElementById("close-payment-modal")
      .addEventListener("click", closePaymentModal);
    document
      .getElementById("cancel-payment")
      .addEventListener("click", closePaymentModal);
    document
      .getElementById("confirm-payment")
      .addEventListener("click", confirmPayment);

    document.querySelectorAll('input[name="payment"]').forEach((radio) => {
      radio.addEventListener("change", (e) => {
        document
          .querySelectorAll(".payment-method")
          .forEach((lbl) => lbl.classList.remove("active"));
        e.target.closest(".payment-method").classList.add("active");
      });
    });

    if (typeof NavModule !== "undefined") NavModule.init("ventas");
    if (typeof NotificationsModule !== "undefined") NotificationsModule.init();
    if (typeof ThemeModule !== "undefined") ThemeModule.init();

    console.log("✅ Punto de Venta cargado.");
  };

  return { init, addToCart, updateQty, removeItem };
})();

console.log("🚀 ventas.js cargado correctamente");
