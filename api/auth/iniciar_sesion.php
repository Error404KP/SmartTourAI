<?php
/**
 * POST /api/auth/iniciar_sesion.php
 * Recibe: { correo, contrasena }
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos = json_decode(file_get_contents('php://input'), true) ?? [];
$correo     = trim($datos['correo'] ?? '');
$contrasena = $datos['contrasena'] ?? '';

if ($correo === '' || $contrasena === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Correo y contraseña son obligatorios.']);
    exit;
}

/*
 * TODO: $pdo = obtenerConexion();
 *       CALL sp_login_usuario(:correo) -> traer hash guardado
 *       password_verify($contrasena, $hash) -> si coincide, iniciar sesión real
 *       (session_start() + $_SESSION['id_usuario'] = ...)
 *
 * Por seguridad: ante correo inexistente o contraseña incorrecta, responder
 * siempre con el MISMO mensaje genérico (evita que alguien adivine qué
 * correos están registrados).
 */

echo json_encode([
    'success' => true,
    'message' => 'Inicio de sesión simulado (modo diseño — backend aún no implementado).',
]);
