<?php
/**
 * POST /api/auth/reenviar_codigo.php
 * Recibe: { correo }
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos  = json_decode(file_get_contents('php://input'), true) ?? [];
$correo = trim($datos['correo'] ?? '');

// TODO: CALL sp_crear_codigo_verificacion(:correo) -> generar nuevo código y reenviar con PHPMailer.

echo json_encode([
    'success' => true,
    'message' => 'Código reenviado (modo diseño — backend aún no implementado).',
]);
