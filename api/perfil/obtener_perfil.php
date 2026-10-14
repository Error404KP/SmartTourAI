<?php
/**
 * GET /api/perfil/obtener_perfil.php
 * Devuelve los datos del usuario en sesión.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

// TODO: CALL sp_obtener_perfil_usuario(:id_usuario)

echo json_encode([
    'success' => true,
    'usuario' => [
        'nombre' => 'Carlos Mendoza',
        'correo' => 'carlos.mendoza@correo.com',
        'rutas'  => 2,
        'sitios' => 5,
    ],
]);
