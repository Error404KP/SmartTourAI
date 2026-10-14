<?php
$titulo     = 'Mi perfil';
$css_extra  = ['app.css'];
require_once __DIR__ . '/../includes/header.php';

// Datos de ejemplo solo para maquetado — vendrán de la sesión/API cuando exista backend.
$usuario = [
    'nombre' => 'Carlos Mendoza',
    'correo' => 'carlos.mendoza@correo.com',
    'rutas'  => 2,
    'sitios' => 5,
];
$iniciales = 'CM';
?>

<div class="app-contenedor">

  <header class="encabezado-app text-center">
    <div class="avatar-iniciales mx-auto"><?= $iniciales ?></div>
    <h1 class="h6 fw-bold mt-2 mb-0"><?= htmlspecialchars($usuario['nombre']) ?></h1>
    <p class="mb-2" style="font-size:0.8rem; opacity:0.85;"><?= htmlspecialchars($usuario['correo']) ?></p>
    <div class="d-flex justify-content-center gap-4">
      <div><div class="fw-bold"><?= $usuario['rutas'] ?></div><div style="font-size:0.7rem;opacity:.8;">Rutas</div></div>
      <div><div class="fw-bold"><?= $usuario['sitios'] ?></div><div style="font-size:0.7rem;opacity:.8;">Sitios</div></div>
    </div>
  </header>

  <section class="seccion mt-3">
    <h2>Datos de la cuenta</h2>
    <div class="tarjeta-smarttour p-3">
      <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
        <span style="font-size:0.85rem;">Nombre completo</span>
        <a href="#" class="text-navy" style="font-size:0.8rem;"><i class="bi bi-pencil"></i> Editar</a>
      </div>
      <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
        <span style="font-size:0.85rem;">Correo electrónico</span>
        <span class="text-muted" style="font-size:0.8rem;"><?= htmlspecialchars($usuario['correo']) ?></span>
      </div>
      <div class="d-flex justify-content-between align-items-center py-2">
        <span style="font-size:0.85rem;">Contraseña</span>
        <a href="#" id="enlace-cambiar-contrasena" class="text-navy" style="font-size:0.8rem;">Cambiar</a>
      </div>
    </div>
  </section>

  <section class="seccion" id="itinerarios-guardados">
    <h2>Mis itinerarios guardados</h2>
    <div class="tarjeta-smarttour mb-2 p-3">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <strong style="font-size:0.85rem;">Jalpan — Misiones &amp; Historia</strong>
          <div class="text-muted" style="font-size:0.75rem;">3 sitios · 12 oct 2026</div>
        </div>
        <a href="<?= APP_URL_BASE ?>/pages/resultado.php" class="text-navy" style="font-size:0.8rem;">Ver</a>
      </div>
    </div>
    <div class="tarjeta-smarttour mb-2 p-3">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <strong style="font-size:0.85rem;">Ruta Ecoturismo y Presa</strong>
          <div class="text-muted" style="font-size:0.75rem;">2 sitios · 30 sep 2026</div>
        </div>
        <a href="<?= APP_URL_BASE ?>/pages/resultado.php" class="text-navy" style="font-size:0.8rem;">Ver</a>
      </div>
    </div>
  </section>

  <section class="seccion">
    <div class="alert" style="background: var(--card-bg); font-size:0.75rem; color: var(--text-muted); border-radius: var(--radius-sm);">
      <i class="bi bi-shield-check me-1"></i>
      Tu cuenta se verificó por correo electrónico al registrarte.
    </div>
  </section>

  <section class="seccion">
    <button id="btn-cerrar-sesion" class="btn btn-smarttour-outline w-100"><i class="bi bi-box-arrow-right me-1"></i> Cerrar sesión</button>
  </section>

  <?php $seccion_activa = 'perfil'; require __DIR__ . '/../includes/nav.php'; ?>
</div>

<?php
$js_extra = ['pages/perfil.js'];
require_once __DIR__ . '/../includes/footer.php';
