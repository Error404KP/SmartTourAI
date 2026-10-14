<?php
/**
 * POST /api/itinerarios/generar_itinerario.php
 * Recibe: { busqueda, categoria, tiempo_disponible }
 *
 * Aquí es donde, cuando se implemente, se invocará el componente de IA del
 * proyecto (grafos + espacio de búsqueda + búsqueda heurística/local o
 * algoritmo genético) para generar y comparar estrategias de ruta.
 */

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';

$datos = json_decode(file_get_contents('php://input'), true) ?? [];

/*
 * TODO:
 *   1. Interpretar $datos['busqueda'] (lenguaje natural) para extraer intención.
 *   2. Construir el grafo de sitios en Jalpan (nodos = sitios, aristas = distancias/tiempos).
 *   3. Ejecutar la búsqueda heurística y, en el reto avanzado, comparar contra
 *      una segunda estrategia (búsqueda local / algoritmo genético).
 *   4. CALL sp_guardar_itinerario_generado(...) para persistirlo.
 */

echo json_encode([
    'success'    => true,
    'message'    => 'Itinerario generado (datos simulados — backend aún no implementado).',
    'itinerario' => [
        'id'        => 'demo-001',
        'duracion'  => '40 min',
        'distancia' => '14.2 km',
    ],
]);
