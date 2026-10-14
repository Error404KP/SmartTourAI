<?php
/**
 * POST /api/perfil/actualizar_perfil.php
 * Recibe: { nombre }  (por ahora solo el nombre es editable desde el perfil)
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos  = json_decode(file_get_contents('php://input'), true) ?? [];
$nombre = trim($datos['nombre'] ?? '');

if ($nombre === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'El nombre no puede estar vacío.']);
    exit;
}

// TODO: CALL sp_actualizar_perfil_usuario(:id_usuario, :nombre)

echo json_encode([
    'success' => true,
    'message' => 'Perfil actualizado (modo diseño — backend aún no implementado).',
]);
