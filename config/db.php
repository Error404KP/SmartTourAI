<?php
/**
 * Configuración de conexión a MySQL (desarrollo local con XAMPP / phpMyAdmin).
 *
 * IMPORTANTE: este proyecto está, por el momento, solo en su etapa de
 * MAQUETADO/DISEÑO. Ninguna de las APIs en /api llama todavía a
 * obtenerConexion() de verdad: responden con datos simulados para que el
 * flujo HTML -> JS -> API -> (futuro SP) se pueda navegar de punta a punta.
 * Este archivo queda listo para cuando se conecte la lógica real.
 *
 * TODO: ajustar DB_USER / DB_PASS si tu XAMPP local los cambia.
 */

require_once __DIR__ . '/constantes.php';

define('DB_HOST', 'localhost');
define('DB_NAME', 'smarttour_ai');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

/**
 * Devuelve una conexión PDO a la base de datos smarttour_ai.
 * Úsala dentro de cada API cuando se implemente la lógica real, por ejemplo:
 *
 *   $pdo = obtenerConexion();
 *   $stmt = $pdo->prepare('CALL sp_crear_usuario(:nombre, :correo, :contrasena_hash)');
 *   $stmt->execute([...]);
 */
function obtenerConexion(): PDO
{
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
    $opciones = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    return new PDO($dsn, DB_USER, DB_PASS, $opciones);
}
