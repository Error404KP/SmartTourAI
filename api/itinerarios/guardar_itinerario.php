<?php
/**
 * POST /api/itinerarios/guardar_itinerario.php
 * Recibe: { id_itinerario }
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos = json_decode(file_get_contents('php://input'), true) ?? [];

// TODO: CALL sp_guardar_itinerario_usuario(:id_usuario, :id_itinerario)

echo json_encode([
    'success' => true,
    'message' => 'Itinerario guardado en tu perfil (modo diseño — backend aún no implementado).',
]);
