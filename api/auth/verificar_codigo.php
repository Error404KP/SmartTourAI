<?php
/**
 * POST /api/auth/verificar_codigo.php
 * Recibe: { correo, codigo }
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos  = json_decode(file_get_contents('php://input'), true) ?? [];
$correo = trim($datos['correo'] ?? '');
$codigo = trim($datos['codigo'] ?? '');

if ($correo === '' || strlen($codigo) !== 6) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Código inválido.']);
    exit;
}

// TODO: CALL sp_verificar_codigo(:correo, :codigo) -> validar vigencia y marcar usuario como verificado.

echo json_encode([
    'success' => true,
    'message' => 'Correo verificado (modo diseño — backend aún no implementado).',
]);
