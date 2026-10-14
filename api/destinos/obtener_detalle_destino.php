<?php
/**
 * GET /api/destinos/obtener_detalle_destino.php?id=...
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$id_sitio = $_GET['id'] ?? null;

// TODO: CALL sp_obtener_sitio_turistico(:id_sitio)

echo json_encode([
    'success' => true,
    'sitio'   => [
        'id'          => $id_sitio,
        'nombre'      => 'Misión Santiago Apóstol de Jalpan',
        'ubicacion'   => 'Calle Flores, Jalpan de Serra, Qro.',
        'descripcion' => 'Datos simulados — backend aún no implementado.',
    ],
]);
