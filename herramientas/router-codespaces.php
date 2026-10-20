<?php
/**
 * Router para el servidor de PHP en Codespaces (php -S no lee .htaccess).
 * Hace lo mismo que Apache en XAMPP:
 *  - "/" lleva a /SmartTourAI/
 *  - los archivos que existen (PHP, CSS, JS, APIs) se sirven normal
 *  - cualquier ruta de React (ej. /SmartTourAI/app/perfil) devuelve app/index.html
 */
$raiz = $_SERVER['DOCUMENT_ROOT'];
$ruta = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

if ($ruta === '/') {
    header('Location: /SmartTourAI/');
    exit;
}
if (file_exists($raiz . $ruta)) {
    return false;
}
if (strpos($ruta, '/SmartTourAI/app/') === 0) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($raiz . '/SmartTourAI/app/index.html');
    return true;
}
return false;
