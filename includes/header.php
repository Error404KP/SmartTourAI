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

<!-- Tipografía Plus Jakarta Sans (mismo diseño de referencia "Fitness") -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">

<!-- Bootstrap 5 (vía CDN, solo para maquetado) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">

<!-- Estilos propios del proyecto
     (?v=<?= APP_CSS_VERSION ?> evita que el navegador sirva una versión
     vieja desde la caché cuando cambiamos estos archivos) -->
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/variables.css?v=<?= APP_CSS_VERSION ?>">
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/base.css?v=<?= APP_CSS_VERSION ?>">
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/componentes.css?v=<?= APP_CSS_VERSION ?>">
<?php foreach ($css_extra as $hoja): ?>
<link rel="stylesheet" href="<?= APP_URL_BASE ?>/assets/css/<?= htmlspecialchars($hoja) ?>?v=<?= APP_CSS_VERSION ?>">
<?php endforeach; ?>
</head>
<body class="<?= htmlspecialchars($body_class) ?>">
