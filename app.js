// SIMULACIÓN DE BASE DE DATOS LOCAL EN MEMORIA (REGLAS DE NEGOCIO Y MODELO)
let productos = [
    { sku: "MEL-CED-18MM", nombre: "Tablero Melamina Cedro 18mm 2.14x2.44", categoria: "Melaminas", ubicacion: "Zona A - P01 - R02 - N1", stock: 35, stockMin: 10, precio: 185.00 },
    { sku: "MEL-BLA-15MM", nombre: "Tablero Melamina Blanco 15mm 2.14x2.44", categoria: "Melaminas", ubicacion: "Zona A - P01 - R01 - N3", stock: 4, stockMin: 8, precio: 145.00 },
    { sku: "HER-BIS-35MM", nombre: "Bisagra Cazoleta 35mm Clip-On (Par)", categoria: "Herrajes", ubicacion: "Zona B - P03 - R01 - N2", stock: 120, stockMin: 30, precio: 6.50 },
    { sku: "HER-COR-45CM", nombre: "Corredera Telescópica 45cm Cierre Suave", categoria: "Herrajes", ubicacion: "Zona B - P03 - R02 - N1", stock: 3, stockMin: 15, precio: 22.00 }
];

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
    renderizarTabla(productos);
    actualizarMetricas();
});

// 1. RENDERIZAR TABLA DE PRODUCTOS
function renderizarTabla(lista) {
    const tbody = document.getElementById("inventoryBody");
    tbody.innerHTML = "";

    lista.forEach(prod => {
        // Regla de negocio: Evaluación de Alerta de Stock Mínimo
        const enAlerta = prod.stock <= prod.stockMin;
        const badgeClass = enAlerta ? "badge-alert" : "badge-normal";
        const estadoTexto = enAlerta ? "¡REABASTECER!" : "ÓPTIMO";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${prod.sku}</strong></td>
            <td>${prod.nombre}</td>
            <td>${prod.categoria}</td>
            <td><i class="fa-solid fa-location-dot"></i> ${prod.ubicacion}</td>
            <td><strong>${prod.stock}</strong></td>
            <td>${prod.stockMin}</td>
            <td><span class="badge ${badgeClass}">${estadoTexto}</span></td>
            <td>
                <button class="btn btn-primary" onclick="eliminarProducto('${prod.sku}')" style="padding: 4px 8px;"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// 2. ACTUALIZACIÓN DE INDICADORES (DASHBOARD)
function actualizarMetricas() {
    document.getElementById("metric-total").innerText = productos.length;
    
    // Contar alertas de reabastecimiento
    const alertas = productos.filter(p => p.stock <= p.stockMin).length;
    document.getElementById("metric-alertas").innerText = alertas;
}

// 3. FILTRADO Y BÚSQUEDA RÁPIDA
function filtrarProductos() {
    const texto = document.getElementById("searchInput").value.toLowerCase();
    const filtrados = productos.filter(p => 
        p.sku.toLowerCase().includes(texto) ||
        p.nombre.toLowerCase().includes(texto) ||
        p.ubicacion.toLowerCase().includes(texto)
    );
    renderizarTabla(filtrados);
}

// 4. MÓDULO DE AGREGAR PRODUCTO
function abrirModalProducto() {
    document.getElementById("modalProducto").style.display = "flex";
}
function cerrarModalProducto() {
    document.getElementById("modalProducto").style.display = "none";
}

function guardarProducto(e) {
    e.preventDefault();
    
    const sku = document.getElementById("sku").value.trim().toUpperCase();
    
    // Regla de negocio: Unicidad de SKU
    if (productos.some(p => p.sku === sku)) {
        alert(" Error: El código SKU ingresado ya existe en el sistema.");
        return;
    }

    const nuevo = {
        sku: sku,
        nombre: document.getElementById("nombre").value,
        categoria: document.getElementById("categoria").value,
        precio: parseFloat(document.getElementById("precio").value),
        stock: parseInt(document.getElementById("stock").value),
        stockMin: parseInt(document.getElementById("stockMin").value),
        ubicacion: document.getElementById("ubicacion").value
    };

    productos.push(nuevo);
    renderizarTabla(productos);
    actualizarMetricas();
    cerrarModalProducto();
    document.getElementById("formProducto").reset();
    alert("Producto registrado correctamente en el catálogo maestro.");
}

// 5. MÓDULO DE MOVIMIENTOS Y KARDEX
function abrirModalMovimiento() {
    const select = document.getElementById("selectProducto");
    select.innerHTML = "";
    
    productos.forEach(p => {
        const option = document.createElement("option");
        option.value = p.sku;
        option.text = `${p.sku} - ${p.nombre} (Stock actual: ${p.stock})`;
        select.appendChild(option);
    });

    document.getElementById("modalMovimiento").style.display = "flex";
}

function cerrarModalMovimiento() {
    document.getElementById("modalMovimiento").style.display = "none";
}

function procesarMovimiento(e) {
    e.preventDefault();
    
    const sku = document.getElementById("selectProducto").value;
    const tipo = document.getElementById("tipoMovimiento").value;
    const cantidad = parseInt(document.getElementById("cantidadMov").value);
    
    const producto = productos.find(p => p.sku === sku);

    // Regla de negocio: Bloqueo si la salida excede el stock disponible
    if ((tipo === "SALIDA" || tipo === "AJUSTE") && cantidad > producto.stock) {
        alert(` Transacción Rechazada: No hay suficiente stock para realizar la salida. Stock disponible: ${producto.stock}`);
        return;
    }

    // Actualización sincrónica de stock
    if (tipo === "ENTRADA") {
        producto.stock += cantidad;
    } else {
        producto.stock -= cantidad;
    }

    renderizarTabla(productos);
    actualizarMetricas();
    cerrarModalMovimiento();
    document.getElementById("formMovimiento").reset();
    alert(`Movimiento (${tipo}) registrado exitosamente. Nuevo stock para ${producto.sku}: ${producto.stock}`);
}

// ELIMINAR PRODUCTO
function eliminarProducto(sku) {
    if (confirm(`¿Está seguro de eliminar el producto ${sku} del catálogo?`)) {
        productos = productos.filter(p => p.sku !== sku);
        renderizarTabla(productos);
        actualizarMetricas();
    }
}