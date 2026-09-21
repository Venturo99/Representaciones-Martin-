/**
 * Módulo de Catálogo de Productos
 */
const CatalogoModule = (() => {
  const CATEGORIAS = {
    "Maderas y Tableros": [
      "Melamina",
      "Triplay",
      "Madera",
      "MDF",
      "Aglomerado",
      "OSB",
      "HDF",
    ],
    Ferretería: [
      "Bisagras",
      "Correderas",
      "Sistemas Corredizos",
      "Jaladores",
      "Soportes",
      "Pistones",
    ],
    "Herramientas y Maquinaria": [
      "Herramientas Eléctricas",
      "Herramientas Manuales",
      "Accesorios de Herramientas",
    ],
    Drywall: ["Planchas", "Perfiles y Ángulos", "Rieles"],
    Pisos: ["Laminados", "Piso Laminado", "Vinílicos"],
  };

  let PRODUCTS = [
    {
      id: 1,
      codigo: "MAD-MEL-001",
      nombre: "Melamina Blanca 18mm",
      categoria: "Maderas y Tableros",
      subcategoria: "Melamina",
      stock: 245,
      minimo: 50,
      precio: 85.5,
      unidad: "Plancha",
      zona: "A",
      pasillo: "01",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 2,
      codigo: "MAD-MEL-002",
      nombre: "Melamina Roble 18mm",
      categoria: "Maderas y Tableros",
      subcategoria: "Melamina",
      stock: 32,
      minimo: 50,
      precio: 92.0,
      unidad: "Plancha",
      zona: "A",
      pasillo: "01",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 3,
      codigo: "MAD-MDF-001",
      nombre: "MDF 15mm Crudo",
      categoria: "Maderas y Tableros",
      subcategoria: "MDF",
      stock: 180,
      minimo: 60,
      precio: 68.0,
      unidad: "Plancha",
      zona: "A",
      pasillo: "02",
      rack: "R1",
      nivel: "N2",
    },
    {
      id: 4,
      codigo: "MAD-TRI-001",
      nombre: "Triplay 4mm",
      categoria: "Maderas y Tableros",
      subcategoria: "Triplay",
      stock: 95,
      minimo: 40,
      precio: 45.0,
      unidad: "Plancha",
      zona: "B",
      pasillo: "01",
      rack: "R3",
      nivel: "N1",
    },
    {
      id: 5,
      codigo: "MAD-AGL-001",
      nombre: "Aglomerado 18mm",
      categoria: "Maderas y Tableros",
      subcategoria: "Aglomerado",
      stock: 8,
      minimo: 30,
      precio: 55.0,
      unidad: "Plancha",
      zona: "B",
      pasillo: "02",
      rack: "R1",
      nivel: "N2",
    },
    {
      id: 6,
      codigo: "MAD-OSB-001",
      nombre: "OSB 11mm",
      categoria: "Maderas y Tableros",
      subcategoria: "OSB",
      stock: 0,
      minimo: 25,
      precio: 72.0,
      unidad: "Plancha",
      zona: "B",
      pasillo: "03",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 7,
      codigo: "FER-BIS-001",
      nombre: "Bisagra Cazoleta 35mm",
      categoria: "Ferretería",
      subcategoria: "Bisagras",
      stock: 520,
      minimo: 100,
      precio: 3.5,
      unidad: "Unidad",
      zona: "C",
      pasillo: "01",
      rack: "R1",
      nivel: "N3",
    },
    {
      id: 8,
      codigo: "FER-COR-001",
      nombre: "Corredera Telescópica 45cm",
      categoria: "Ferretería",
      subcategoria: "Correderas",
      stock: 45,
      minimo: 80,
      precio: 12.0,
      unidad: "Unidad",
      zona: "C",
      pasillo: "02",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 9,
      codigo: "FER-JAL-001",
      nombre: "Jalador Acero Inox 128mm",
      categoria: "Ferretería",
      subcategoria: "Jaladores",
      stock: 210,
      minimo: 60,
      precio: 8.5,
      unidad: "Unidad",
      zona: "C",
      pasillo: "02",
      rack: "R3",
      nivel: "N2",
    },
    {
      id: 10,
      codigo: "HER-ELE-001",
      nombre: "Taladro Percutor 650W",
      categoria: "Herramientas y Maquinaria",
      subcategoria: "Herramientas Eléctricas",
      stock: 15,
      minimo: 10,
      precio: 285.0,
      unidad: "Unidad",
      zona: "D",
      pasillo: "01",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 11,
      codigo: "HER-MAN-001",
      nombre: "Martillo Carpintero 16oz",
      categoria: "Herramientas y Maquinaria",
      subcategoria: "Herramientas Manuales",
      stock: 42,
      minimo: 20,
      precio: 45.0,
      unidad: "Unidad",
      zona: "D",
      pasillo: "01",
      rack: "R2",
      nivel: "N2",
    },
    {
      id: 12,
      codigo: "DRY-PLA-001",
      nombre: "Plancha Drywall 1.2x2.4m",
      categoria: "Drywall",
      subcategoria: "Planchas",
      stock: 180,
      minimo: 50,
      precio: 32.0,
      unidad: "Plancha",
      zona: "E",
      pasillo: "01",
      rack: "R1",
      nivel: "N1",
    },
    {
      id: 13,
      codigo: "DRY-PER-001",
      nombre: "Perfil Omega 3m",
      categoria: "Drywall",
      subcategoria: "Perfiles y Ángulos",
      stock: 22,
      minimo: 40,
      precio: 15.5,
      unidad: "Unidad",
      zona: "E",
      pasillo: "02",
      rack: "R1",
      nivel: "N2",
    },
    {
      id: 14,
      codigo: "PIS-LAM-001",
      nombre: "Piso Laminado Roble 8mm",
      categoria: "Pisos",
      subcategoria: "Laminados",
      stock: 340,
      minimo: 100,
      precio: 42.0,
      unidad: "Caja",
      zona: "E",
      pasillo: "03",
      rack: "R2",
      nivel: "N1",
    },
    {
      id: 15,
      codigo: "PIS-VIN-001",
      nombre: "Piso Vinílico Gris 3mm",
      categoria: "Pisos",
      subcategoria: "Vinílicos",
      stock: 78,
      minimo: 80,
      precio: 58.0,
      unidad: "Caja",
      zona: "E",
      pasillo: "03",
      rack: "R3",
      nivel: "N2",
    },
  ];

  let nextId = 16;
  let currentFilters = { search: "", categoria: "", subcategoria: "" };
  let deleteTargetId = null;

  const getStockStatus = (stock, minimo) => {
    if (stock === 0) return { label: "Sin Stock", class: "badge-danger" };
    if (stock < minimo) return { label: "Stock Bajo", class: "badge-warning" };
    return { label: "Disponible", class: "badge-success" };
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

  const clearFormErrors = () => {
    document
      .querySelectorAll("#product-form .error-message")
      .forEach((el) => (el.textContent = ""));
  };

  const renderTable = (products) => {
    const tbody = document.getElementById("catalogo-tbody");
    const emptyState = document.getElementById("empty-state");
    const resultsCount = document.getElementById("results-count");
    if (!tbody) return;

    if (products.length === 0) {
      tbody.innerHTML = "";
      if (emptyState) emptyState.classList.remove("hidden");
      if (resultsCount) resultsCount.textContent = "0 resultados";
      return;
    }

    if (emptyState) emptyState.classList.add("hidden");
    if (resultsCount)
      resultsCount.textContent = `${products.length} resultado${products.length !== 1 ? "s" : ""}`;

    tbody.innerHTML = products
      .map((p) => {
        const status = getStockStatus(p.stock, p.minimo);
        const stockClass =
          p.stock === 0
            ? "stock-zero"
            : p.stock < p.minimo
              ? "stock-low"
              : "stock-ok";
        return `
                <tr>
                    <td><strong>${p.codigo}</strong></td>
                    <td>${p.nombre}</td>
                    <td><span class="category-tag">${p.categoria}</span></td>
                    <td><span class="subcategory-tag">${p.subcategoria}</span></td>
                    <td class="${stockClass}"><strong>${p.stock}</strong></td>
                    <td>${p.minimo}</td>
                    <td>S/ ${p.precio.toFixed(2)}</td>
                    <td>
                        <span class="location-tag">
                            <i class="fas fa-map-marker-alt"></i>
                            ${p.zona}-${p.pasillo}-${p.rack}-${p.nivel}
                        </span>
                    </td>
                    <td><span class="badge ${status.class}">${status.label}</span></td>
                    <td class="actions-cell">
                        <button class="btn-icon btn-edit" data-id="${p.id}"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon btn-delete" data-id="${p.id}"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
      })
      .join("");

    tbody.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", () =>
        openEditModal(parseInt(btn.dataset.id)),
      );
    });
    tbody.querySelectorAll(".btn-delete").forEach((btn) => {
      btn.addEventListener("click", () =>
        openDeleteModal(parseInt(btn.dataset.id)),
      );
    });
  };

  const updateSummary = (products) => {
    const set = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    set("summary-total", products.length);
    set(
      "summary-ok",
      products.filter((p) => p.stock >= p.minimo && p.stock > 0).length,
    );
    set(
      "summary-warning",
      products.filter((p) => p.stock > 0 && p.stock < p.minimo).length,
    );
    set("summary-danger", products.filter((p) => p.stock === 0).length);
  };

  const applyFilters = () => {
    const search = currentFilters.search.toLowerCase().trim();
    const cat = currentFilters.categoria;
    const subcat = currentFilters.subcategoria;

    const filtered = PRODUCTS.filter((p) => {
      const matchSearch =
        !search ||
        p.codigo.toLowerCase().includes(search) ||
        p.nombre.toLowerCase().includes(search) ||
        p.categoria.toLowerCase().includes(search) ||
        p.subcategoria.toLowerCase().includes(search);
      const matchCat = !cat || p.categoria === cat;
      const matchSubcat = !subcat || p.subcategoria === subcat;
      return matchSearch && matchCat && matchSubcat;
    });

    renderTable(filtered);
    updateSummary(filtered);
  };

  const initFilters = () => {
    const searchInput = document.getElementById("search-input");
    const catFilter = document.getElementById("filter-category");
    const subcatFilter = document.getElementById("filter-subcategory");

    // ⭐ Función para actualizar subcategorías
    const updateSubcategories = (categoria) => {
      if (!subcatFilter) return;

      // Limpiar subcategorías
      subcatFilter.innerHTML =
        '<option value="">Todas las subcategorías</option>';

      // Si hay categoría seleccionada, agregar sus subcategorías
      if (categoria && CATEGORIAS[categoria]) {
        CATEGORIAS[categoria].forEach((sub) => {
          const option = document.createElement("option");
          option.value = sub;
          option.textContent = sub;
          subcatFilter.appendChild(option);
        });
      }
    };

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentFilters.search = e.target.value;
        applyFilters();
      });
    }

    if (catFilter) {
      catFilter.addEventListener("change", (e) => {
        const selectedCat = e.target.value;
        currentFilters.categoria = selectedCat;
        currentFilters.subcategoria = "";

        // ⭐ Actualizar subcategorías según la categoría
        updateSubcategories(selectedCat);

        applyFilters();
      });
    }

    if (subcatFilter) {
      subcatFilter.addEventListener("change", (e) => {
        currentFilters.subcategoria = e.target.value;
        applyFilters();
      });
    }
  };

  const openCreateModal = () => {
    document.getElementById("modal-title").innerHTML =
      '<i class="fas fa-plus-circle"></i> Nuevo Producto';
    document.getElementById("product-form").reset();
    document.getElementById("product-id").value = "";
    const subcatSelect = document.getElementById("product-subcategoria");
    if (subcatSelect)
      subcatSelect.innerHTML =
        '<option value="">Seleccionar categoría primero...</option>';
    clearFormErrors();
    document.getElementById("product-modal").classList.remove("hidden");
  };

  const openEditModal = (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    document.getElementById("modal-title").innerHTML =
      '<i class="fas fa-edit"></i> Editar Producto';
    document.getElementById("product-id").value = product.id;
    document.getElementById("product-codigo").value = product.codigo;
    document.getElementById("product-nombre").value = product.nombre;
    document.getElementById("product-categoria").value = product.categoria;

    const subcatSelect = document.getElementById("product-subcategoria");
    subcatSelect.innerHTML = '<option value="">Seleccionar...</option>';
    if (CATEGORIAS[product.categoria]) {
      CATEGORIAS[product.categoria].forEach((sub) => {
        subcatSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
      });
    }
    subcatSelect.value = product.subcategoria;

    document.getElementById("product-stock").value = product.stock;
    document.getElementById("product-minimo").value = product.minimo;
    document.getElementById("product-precio").value = product.precio;
    document.getElementById("product-unidad").value = product.unidad;
    document.getElementById("product-zona").value = product.zona;
    document.getElementById("product-pasillo").value = product.pasillo;
    document.getElementById("product-rack").value = product.rack;
    document.getElementById("product-nivel").value = product.nivel;

    clearFormErrors();
    document.getElementById("product-modal").classList.remove("hidden");
  };

  const validateProductForm = () => {
    clearFormErrors();
    let valid = true;

    const codigo = document.getElementById("product-codigo").value.trim();
    const nombre = document.getElementById("product-nombre").value.trim();
    const categoria = document.getElementById("product-categoria").value;
    const subcategoria = document.getElementById("product-subcategoria").value;
    const stock = document.getElementById("product-stock").value;
    const minimo = document.getElementById("product-minimo").value;
    const precio = document.getElementById("product-precio").value;
    const id = document.getElementById("product-id").value;

    if (!codigo) {
      document.getElementById("codigo-error").textContent =
        "El código es obligatorio.";
      valid = false;
    } else {
      const existe = PRODUCTS.find(
        (p) =>
          p.codigo.toLowerCase() === codigo.toLowerCase() &&
          p.id !== parseInt(id),
      );
      if (existe) {
        document.getElementById("codigo-error").textContent =
          "Este código ya existe.";
        valid = false;
      }
    }

    if (!nombre) {
      document.getElementById("nombre-error").textContent =
        "El nombre es obligatorio.";
      valid = false;
    }
    if (!categoria) {
      document.getElementById("categoria-error").textContent =
        "Seleccione categoría.";
      valid = false;
    }
    if (!subcategoria) {
      document.getElementById("subcategoria-error").textContent =
        "Seleccione subcategoría.";
      valid = false;
    }
    if (stock === "" || parseInt(stock) < 0) {
      document.getElementById("stock-error").textContent = "Stock inválido.";
      valid = false;
    }
    if (minimo === "" || parseInt(minimo) < 0) {
      document.getElementById("minimo-error").textContent = "Mínimo inválido.";
      valid = false;
    }
    if (precio === "" || parseFloat(precio) < 0) {
      document.getElementById("precio-error").textContent = "Precio inválido.";
      valid = false;
    }

    return valid;
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!validateProductForm()) return;

    const id = document.getElementById("product-id").value;
    const productData = {
      codigo: document
        .getElementById("product-codigo")
        .value.trim()
        .toUpperCase(),
      nombre: document.getElementById("product-nombre").value.trim(),
      categoria: document.getElementById("product-categoria").value,
      subcategoria: document.getElementById("product-subcategoria").value,
      stock: parseInt(document.getElementById("product-stock").value),
      minimo: parseInt(document.getElementById("product-minimo").value),
      precio: parseFloat(document.getElementById("product-precio").value),
      unidad: document.getElementById("product-unidad").value,
      zona: document.getElementById("product-zona").value,
      pasillo: document.getElementById("product-pasillo").value.trim(),
      rack: document.getElementById("product-rack").value.trim(),
      nivel: document.getElementById("product-nivel").value.trim(),
    };

    if (id) {
      const index = PRODUCTS.findIndex((p) => p.id === parseInt(id));
      if (index !== -1) {
        PRODUCTS[index] = { ...PRODUCTS[index], ...productData };
        showToast("Producto actualizado correctamente", "success");
      }
    } else {
      PRODUCTS.push({ id: nextId++, ...productData });
      showToast("Producto creado correctamente", "success");
    }

    document.getElementById("product-modal").classList.add("hidden");
    applyFilters();
  };

  const openDeleteModal = (id) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;
    deleteTargetId = id;
    document.getElementById("delete-product-name").textContent = product.nombre;
    document.getElementById("delete-modal").classList.remove("hidden");
  };

  const confirmDelete = () => {
    if (deleteTargetId === null) return;
    const product = PRODUCTS.find((p) => p.id === deleteTargetId);
    PRODUCTS = PRODUCTS.filter((p) => p.id !== deleteTargetId);
    document.getElementById("delete-modal").classList.add("hidden");
    showToast(`Producto "${product.nombre}" eliminado`, "success");
    applyFilters();
    deleteTargetId = null;
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

  const initNavigation = () => {
    // ⭐ Usar el módulo de navegación centralizado
    NavModule.init("catalogo");

    const logout = document.getElementById("logout-btn");
    if (logout)
      logout.addEventListener("click", () => {
        if (confirm("¿Cerrar sesión?")) App.logout();
      });

    console.log("✅ Navegación lista.");
  };

  const init = () => {
    console.log("📦 Inicializando Catálogo de Productos...");

    loadUserInfo();
    renderTable(PRODUCTS);
    updateSummary(PRODUCTS);
    initFilters();
    initNavigation();

    const btnAdd = document.getElementById("btn-add-product");
    if (btnAdd) btnAdd.addEventListener("click", openCreateModal);

    const closeBtn = document.getElementById("close-product-modal");
    if (closeBtn)
      closeBtn.addEventListener("click", () => {
        document.getElementById("product-modal").classList.add("hidden");
      });

    const cancelBtn = document.getElementById("cancel-product");
    if (cancelBtn)
      cancelBtn.addEventListener("click", () => {
        document.getElementById("product-modal").classList.add("hidden");
      });

    const form = document.getElementById("product-form");
    if (form) form.addEventListener("submit", handleProductSubmit);

    const catSelect = document.getElementById("product-categoria");
    if (catSelect) {
      catSelect.addEventListener("change", (e) => {
        const subcatSelect = document.getElementById("product-subcategoria");
        subcatSelect.innerHTML = '<option value="">Seleccionar...</option>';
        if (CATEGORIAS[e.target.value]) {
          CATEGORIAS[e.target.value].forEach((sub) => {
            subcatSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
          });
        }
      });
    }

    const cancelDel = document.getElementById("cancel-delete");
    if (cancelDel)
      cancelDel.addEventListener("click", () => {
        document.getElementById("delete-modal").classList.add("hidden");
      });

    const confirmDel = document.getElementById("confirm-delete");
    if (confirmDel) confirmDel.addEventListener("click", confirmDelete);

    window.addEventListener("click", (e) => {
      if (e.target === document.getElementById("product-modal")) {
        document.getElementById("product-modal").classList.add("hidden");
      }
      if (e.target === document.getElementById("delete-modal")) {
        document.getElementById("delete-modal").classList.add("hidden");
      }
    });

    console.log("✅ Catálogo cargado. Total productos:", PRODUCTS.length);
  };

  return { init };
})();

console.log("🚀 catalogo.js VERSIÓN FINAL cargado");
