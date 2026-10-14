<?php
/**
 * GET /api/itinerarios/listar_itinerarios.php
 * Devuelve los itinerarios guardados del usuario en sesión.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

// TODO: CALL sp_listar_itinerarios_usuario(:id_usuario)

echo json_encode([
    'success'     => true,
    'itinerarios' => [
        ['id' => 'demo-001', 'nombre' => 'Jalpan — Misiones & Historia', 'sitios' => 3],
        ['id' => 'demo-002', 'nombre' => 'Ruta Ecoturismo y Presa', 'sitios' => 2],
    ],
]);
