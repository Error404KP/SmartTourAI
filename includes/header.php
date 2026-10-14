<?php
/**
 * Encabezado HTML compartido por todas las páginas.
 * Variables que la página que lo incluye puede definir ANTES del include:
 *   $titulo    (string)   Título de la pestaña del navegador.
 *   $css_extra (string[]) Hojas de estilo adicionales dentro de assets/css/.
 *   $body_class (string)  Clase extra en <body> (ej. 'pagina-auth').
 */
require_once __DIR__ . '/../config/constantes.php';

$titulo     = $titulo ?? APP_NOMBRE;
$css_extra  = $css_extra ?? [];
$body_class = $body_class ?? '';
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?= htmlspecialchars($titulo) ?> · <?= APP_NOMBRE ?></title>

<!-- Bootstrap 5 (vía CDN, solo para maquetado) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<!-- Estilos propios del proyecto -->
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/variables.css">
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/base.css">
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/componentes.css">
<?php foreach ($css_extra as $hoja): ?>
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/<?= htmlspecialchars($hoja) ?>">
<?php endforeach; ?>
</head>
<body class="<?= htmlspecialchars($body_class) ?>">
