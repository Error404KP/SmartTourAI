-- =========================================================
--  SmartTour AI — Esquema de base de datos (MySQL / phpMyAdmin)
--  Etapa: DISEÑO. Las tablas y procedimientos aquí son el punto de partida
--  para cuando se implemente el backend; ninguna API los ejecuta todavía.
-- =========================================================

CREATE DATABASE IF NOT EXISTS smarttour_ai
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE smarttour_ai;

-- ---------------------------------------------------------
-- Tabla: usuarios (rol único: Turista, acceso por correo)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario       INT AUTO_INCREMENT PRIMARY KEY,
    nombre           VARCHAR(150)      NOT NULL,
    correo           VARCHAR(190)      NOT NULL UNIQUE,
    contrasena_hash  VARCHAR(255)      NOT NULL,
    correo_verificado TINYINT(1)       NOT NULL DEFAULT 0,
    fecha_registro   DATETIME          NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Códigos de verificación de correo (registro) y tokens de recuperación
CREATE TABLE IF NOT EXISTS codigos_verificacion (
    id_codigo    INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario   INT NOT NULL,
    codigo       CHAR(6) NOT NULL,
    expira_en    DATETIME NOT NULL,
    usado        TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS tokens_recuperacion (
    id_token     INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario   INT NOT NULL,
    token        VARCHAR(100) NOT NULL UNIQUE,
    expira_en    DATETIME NOT NULL,
    usado        TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- ---------------------------------------------------------
-- Sitios turísticos (alcance: Jalpan de Serra, Qro.)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS sitios_turisticos (
    id_sitio      INT AUTO_INCREMENT PRIMARY KEY,
    nombre        VARCHAR(150) NOT NULL,
    categoria     VARCHAR(80)  NOT NULL,   -- Misiones, Ecoturismo, Historia, etc.
    descripcion   TEXT,
    ubicacion     VARCHAR(255),
    latitud       DECIMAL(10,7),
    longitud      DECIMAL(10,7),
    tiempo_visita_min INT DEFAULT 30
);

CREATE TABLE IF NOT EXISTS recomendaciones_sitio (
    id_recomendacion INT AUTO_INCREMENT PRIMARY KEY,
    id_sitio          INT NOT NULL,
    titulo            VARCHAR(150) NOT NULL,
    descripcion       TEXT,
    FOREIGN KEY (id_sitio) REFERENCES sitios_turisticos(id_sitio)
);

-- ---------------------------------------------------------
-- Itinerarios generados y guardados
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS itinerarios (
    id_itinerario  INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario     INT NOT NULL,
    nombre         VARCHAR(150),
    estrategia     VARCHAR(80),   -- estrategia de generación usada (para el reto avanzado)
    duracion_min   INT,
    distancia_km   DECIMAL(6,2),
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE IF NOT EXISTS itinerario_sitios (
    id_itinerario INT NOT NULL,
    id_sitio      INT NOT NULL,
    orden         INT NOT NULL,
    PRIMARY KEY (id_itinerario, id_sitio),
    FOREIGN KEY (id_itinerario) REFERENCES itinerarios(id_itinerario),
    FOREIGN KEY (id_sitio) REFERENCES sitios_turisticos(id_sitio)
);

-- =========================================================
--  Stored procedures (borrador / esqueleto)
--  Cada uno queda como punto de partida: el cuerpo real se
--  completa cuando se implemente la lógica de negocio.
-- =========================================================

DELIMITER $$

CREATE PROCEDURE sp_crear_usuario (
    IN p_nombre VARCHAR(150),
    IN p_correo VARCHAR(190),
    IN p_contrasena_hash VARCHAR(255)
)
BEGIN
    -- TODO: validar que el correo no exista antes de insertar
    INSERT INTO usuarios (nombre, correo, contrasena_hash)
    VALUES (p_nombre, p_correo, p_contrasena_hash);
END $$

CREATE PROCEDURE sp_login_usuario (
    IN p_correo VARCHAR(190)
)
BEGIN
    -- Devuelve el usuario (incluido el hash) para que PHP valide con password_verify()
    SELECT id_usuario, nombre, correo, contrasena_hash, correo_verificado
    FROM usuarios
    WHERE correo = p_correo;
END $$

CREATE PROCEDURE sp_crear_codigo_verificacion (
    IN p_id_usuario INT,
    IN p_codigo CHAR(6),
    IN p_expira_en DATETIME
)
BEGIN
    INSERT INTO codigos_verificacion (id_usuario, codigo, expira_en)
    VALUES (p_id_usuario, p_codigo, p_expira_en);
END $$

CREATE PROCEDURE sp_verificar_codigo (
    IN p_id_usuario INT,
    IN p_codigo CHAR(6)
)
BEGIN
    -- TODO: validar vigencia (expira_en) y marcar usado = 1
    UPDATE usuarios SET correo_verificado = 1 WHERE id_usuario = p_id_usuario;
END $$

CREATE PROCEDURE sp_guardar_itinerario_usuario (
    IN p_id_usuario INT,
    IN p_id_itinerario INT
)
BEGIN
    -- TODO: marcar el itinerario como guardado/asociado al usuario
    SELECT p_id_usuario, p_id_itinerario;
END $$

CREATE PROCEDURE sp_listar_itinerarios_usuario (
    IN p_id_usuario INT
)
BEGIN
    SELECT id_itinerario, nombre, duracion_min, distancia_km, fecha_creacion
    FROM itinerarios
    WHERE id_usuario = p_id_usuario
    ORDER BY fecha_creacion DESC;
END $$

CREATE PROCEDURE sp_obtener_perfil_usuario (
    IN p_id_usuario INT
)
BEGIN
    SELECT id_usuario, nombre, correo, fecha_registro
    FROM usuarios
    WHERE id_usuario = p_id_usuario;
END $$

CREATE PROCEDURE sp_actualizar_perfil_usuario (
    IN p_id_usuario INT,
    IN p_nombre VARCHAR(150)
)
BEGIN
    UPDATE usuarios SET nombre = p_nombre WHERE id_usuario = p_id_usuario;
END $$

DELIMITER ;
