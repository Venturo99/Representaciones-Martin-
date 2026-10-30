-- ==========================================
-- CREACIÓN DE LA BASE DE DATOS
-- ==========================================
CREATE DATABASE IF NOT EXISTS representaciones_martin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE representaciones_martin;

-- 1. USUARIOS (Login, Roles, Accesos, Bitácora)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol ENUM('Super Administrador', 'Encargado de Almacén', 'Vendedor', 'Gerente General') NOT NULL,
    avatar VARCHAR(5),
    color VARCHAR(20),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. CLIENTES (Validación RUC/DNI, Ventas)
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento ENUM('DNI', 'RUC') NOT NULL,
    numero_documento VARCHAR(11) UNIQUE NOT NULL,
    nombre_razon_social VARCHAR(200) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(150),
    direccion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. PROVEEDORES (Compras)
CREATE TABLE proveedores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ruc VARCHAR(11) UNIQUE NOT NULL,
    razon_social VARCHAR(200) NOT NULL,
    contacto VARCHAR(100),
    telefono VARCHAR(20),
    categoria VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. PRODUCTOS (Catálogo, Inventario, Consulta Rápida, Rotación)
-- Añadido 'costo' para calcular márgenes de ganancia
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    subcategoria VARCHAR(100),
    costo DECIMAL(10,2) NOT NULL DEFAULT 0.00, 
    precio DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    stock INT NOT NULL DEFAULT 0,
    stock_minimo INT NOT NULL DEFAULT 5,
    unidad_medida VARCHAR(50) DEFAULT 'Unidad',
    zona VARCHAR(10),
    pasillo VARCHAR(10),
    rack VARCHAR(10),
    nivel VARCHAR(10),
    estado ENUM('Activo', 'Inactivo') DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. MOVIMIENTOS (Entradas y Salidas, Historial, Auditoría de Stock)
CREATE TABLE movimientos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    tipo ENUM('entrada', 'salida', 'ajuste') NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    observaciones TEXT,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 6. CORTES DE TABLEROS (Descuento automático de planchas)
CREATE TABLE cortes_tableros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    ancho_cm INT NOT NULL,
    largo_cm INT NOT NULL,
    cantidad_piezas INT NOT NULL,
    tableros_usados INT NOT NULL,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 7. MERMAS (Control de pérdidas)
CREATE TABLE mermas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    motivo VARCHAR(255) NOT NULL,
    observaciones TEXT,
    costo_total DECIMAL(10,2) NOT NULL,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 8. COMPRAS CABECERA (Aumento de stock desde Proveedores)
CREATE TABLE compras (
    id INT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id INT NOT NULL,
    numero_factura VARCHAR(50),
    total DECIMAL(10,2) NOT NULL,
    usuario_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (proveedor_id) REFERENCES proveedores(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 9. COMPRAS DETALLE (Los múltiples productos de una compra)
CREATE TABLE compra_detalles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compra_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    costo_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (compra_id) REFERENCES compras(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 10. VENTAS CABECERA (POS - Factura / Boleta)
-- Incluye datos del cliente, descuentos, IGV y métodos de pago (Yape/Tarjeta/Efectivo)
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT, -- Puede ser NULL si es "Consumidor Final"
    usuario_id INT NOT NULL,
    tipo_comprobante ENUM('Boleta', 'Factura') NOT NULL,
    numero_comprobante VARCHAR(50) NOT NULL, -- Ej: B001-0001
    subtotal DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) DEFAULT 0.00,
    igv DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago ENUM('efectivo', 'tarjeta', 'yape') NOT NULL,
    banco_tarjeta VARCHAR(50), -- Si pagó con tarjeta (BCP, BBVA, etc.)
    codigo_yape VARCHAR(50), -- Código de operación
    estado ENUM('Pagado', 'Anulado') DEFAULT 'Pagado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE SET NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 11. VENTAS DETALLE (Los productos exactos de la factura)
CREATE TABLE venta_detalles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venta_id INT NOT NULL,
    producto_id INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (venta_id) REFERENCES ventas(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 12. TOMA DE INVENTARIO CABECERA (Cortes de Inventario)
CREATE TABLE inventario_tomas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    total_ajustes INT NOT NULL,
    costo_total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 13. TOMA DE INVENTARIO DETALLE (Conteo físico vs sistema)
CREATE TABLE inventario_toma_detalles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    toma_id INT NOT NULL,
    producto_id INT NOT NULL,
    stock_sistema INT NOT NULL,
    stock_fisico INT NOT NULL,
    diferencia INT NOT NULL,
    costo_ajuste DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (toma_id) REFERENCES inventario_tomas(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id)
);

-- 14. BITÁCORA (Auditoría de todo el sistema)
CREATE TABLE bitacora (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    modulo VARCHAR(50) NOT NULL, -- Ej: 'Ventas', 'Login', 'Productos'
    accion VARCHAR(50) NOT NULL, -- Ej: 'Crear', 'Editar', 'Eliminar'
    detalle TEXT, -- Ej: 'Venta emitida B001-0005 por S/ 150.00'
    ip_simulada VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- 15. CIERRE DIARIO (Bloqueo de caja y reapertura)
CREATE TABLE cierres_diarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_cierre DATE NOT NULL,
    hora_cierre TIME NOT NULL,
    total_ventas DECIMAL(10,2) NOT NULL,
    estado ENUM('Cerrado', 'Reabierto') DEFAULT 'Cerrado',
    motivo_reapertura TEXT, -- Obligatorio si se reabre
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- ==========================================
-- 16. INSERTAR DATOS INICIALES (Para que funcione el Login)
-- ==========================================
INSERT INTO usuarios (nombre, email, password, rol, avatar, color) VALUES
('Carlos Mendoza', 'superadmin@martin.com', 'Admin123!', 'Super Administrador', 'CM', '#f37021'),
('Luis Ramírez', 'almacen@martin.com', 'Almacen123!', 'Encargado de Almacén', 'LR', '#008744'),
('María Torres', 'vendedor@martin.com', 'Vendedor123!', 'Vendedor', 'MT', '#3498db'),
('Ana Gutiérrez', 'gerente@martin.com', 'Gerente123!', 'Gerente General', 'AG', '#9b59b6');

-- Insertar algunos productos iniciales
INSERT INTO productos (codigo, nombre, categoria, subcategoria, precio, stock, stock_minimo, unidad_medida, zona, pasillo, rack, nivel) VALUES
('MAD-MEL-001', 'Melamina Blanca 18mm', 'Maderas y Tableros', 'Melamina', 85.50, 245, 50, 'Plancha', 'A', '01', 'R1', 'N1'),
('MAD-MDF-001', 'MDF 15mm Crudo', 'Maderas y Tableros', 'MDF', 68.00, 180, 60, 'Plancha', 'A', '02', 'R1', 'N2'),
('FER-BIS-001', 'Bisagra Cazoleta 35mm', 'Ferretería', 'Bisagras', 3.50, 520, 100, 'Unidad', 'C', '01', 'R1', 'N3');
