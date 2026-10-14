<?php
/**
 * POST /api/auth/guardar_registro_usuario.php
 * Recibe: { nombre, correo, contrasena, confirmar_contrasena }
 *
 * Este archivo es el ejemplo de referencia del patrón que sigue TODA la API:
 *   1. Leer el JSON que mandó el JS por fetch().
 *   2. Validar la forma de los datos.
 *   3. (Backend pendiente) Conectar a MySQL y ejecutar el stored procedure.
 *   4. Responder en JSON.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos = json_decode(file_get_contents('php://input'), true) ?? [];

$nombre     = trim($datos['nombre'] ?? '');
$correo     = trim($datos['correo'] ?? '');
$contrasena = $datos['contrasena'] ?? '';

if ($nombre === '' || $correo === '' || $contrasena === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Faltan datos obligatorios.']);
    exit;
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El correo no tiene un formato válido.']);
    exit;
}

/*
 * TODO (desarrollo funcional pendiente):
 *   $hash = password_hash($contrasena, PASSWORD_DEFAULT);
 *   $pdo  = obtenerConexion();
 *   $stmt = $pdo->prepare('CALL sp_crear_usuario(:nombre, :correo, :hash)');
 *   $stmt->execute(['nombre' => $nombre, 'correo' => $correo, 'hash' => $hash]);
 *   -> luego generar el código de verificación de 6 dígitos y enviarlo
 *      por correo con PHPMailer (ver database/smarttour_ai.sql: tabla
 *      codigos_verificacion y sp_crear_codigo_verificacion).
 */

echo json_encode([
    'success' => true,
    'message' => 'Registro recibido (modo diseño — backend aún no implementado).',
]);
