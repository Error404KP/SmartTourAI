<?php
/**
 * POST /api/auth/restablecer_contrasena.php
 * Recibe: { token, nueva_contrasena }
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos            = json_decode(file_get_contents('php://input'), true) ?? [];
$token            = trim($datos['token'] ?? '');
$nueva_contrasena = $datos['nueva_contrasena'] ?? '';

if ($token === '' || strlen($nueva_contrasena) < 8) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Token inválido o contraseña demasiado corta.']);
    exit;
}

// TODO: validar vigencia del token -> CALL sp_restablecer_contrasena(:token, :hash)

echo json_encode([
    'success' => true,
    'message' => 'Contraseña restablecida (modo diseño — backend aún no implementado).',
]);
