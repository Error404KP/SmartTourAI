<?php
/**
 * POST /api/auth/solicitar_recuperacion.php
 * Recibe: { correo }
 *
 * Nota de seguridad: esta API SIEMPRE debe responder success:true con el
 * mismo mensaje genérico, exista o no una cuenta con ese correo, para no
 * permitir enumerar cuentas registradas.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos  = json_decode(file_get_contents('php://input'), true) ?? [];
$correo = trim($datos['correo'] ?? '');

// TODO: si el correo existe, CALL sp_crear_token_recuperacion(:correo) y
//       enviar por PHPMailer un enlace a restablecer-contrasena.php?token=...

echo json_encode([
    'success' => true,
    'message' => 'Si el correo está registrado, se enviaron instrucciones (modo diseño).',
]);
