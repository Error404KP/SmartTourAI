<?php
/**
 * Barra de navegación inferior para las pantallas internas (requieren sesión).
 * $seccion_activa: 'explorar' | 'itinerario' | 'guardados' | 'perfil'
 */
$seccion_activa = $seccion_activa ?? '';

$items = [
    'explorar'   => ['icono' => 'bi-compass',    'texto' => 'Explorar',   'href' => APP_URL_BASE . '/pages/home.php'],
    'itinerario' => ['icono' => 'bi-signpost-2',  'texto' => 'Itinerario', 'href' => APP_URL_BASE . '/pages/resultado.php'],
    'guardados'  => ['icono' => 'bi-bookmark',    'texto' => 'Guardados',  'href' => APP_URL_BASE . '/pages/perfil.php#itinerarios-guardados'],
    'perfil'     => ['icono' => 'bi-person',      'texto' => 'Perfil',     'href' => APP_URL_BASE . '/pages/perfil.php'],
];
?>
<nav class="nav-inferior">
    <?php foreach ($items as $clave => $item): ?>
        <a href="<?= $item['href'] ?>" class="nav-inferior__item <?= $seccion_activa === $clave ? 'activo' : '' ?>">
            <i class="bi <?= $item['icono'] ?>"></i>
            <span><?= $item['texto'] ?></span>
        </a>
    <?php endforeach; ?>
</nav>
