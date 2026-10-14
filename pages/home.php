<?php
$titulo     = 'Inicio';
$css_extra  = ['app.css'];
require_once __DIR__ . '/../includes/header.php';

// Dato de ejemplo solo para maquetado — cuando exista sesión real vendrá de ahí.
$nombre_usuario = 'Carlos';
?>

<div class="app-contenedor">

  <header class="encabezado-app">
    <div class="ubicacion"><i class="bi bi-geo-alt-fill"></i> <?= APP_ZONA_COBERTURA ?></div>
    <h1 class="h5 fw-bold mt-1 mb-0">¡Hola, <?= htmlspecialchars($nombre_usuario) ?>!</h1>
    <p class="mb-0" style="font-size:0.8rem; opacity:0.85;">¿A dónde quieres ir hoy?</p>
  </header>

  <div class="buscador-flotante">
    <i class="bi bi-search text-muted"></i>
    <input type="text" id="campo-busqueda" placeholder='Ej. "Quiero visitar 3 sitios en Jalpan"'>
    <i class="bi bi-mic text-muted"></i>
  </div>

  <section class="seccion">
    <div class="panel-ajustes-algoritmo">
      <div class="d-flex justify-content-between align-items-center">
        <strong style="font-size:0.9rem;"><i class="bi bi-sliders me-1"></i> Ajustes para el algoritmo</strong>
        <span class="badge-pill-navy">Para 1 día</span>
      </div>
      <div class="row g-2 mt-1">
        <div class="col-6">
          <label class="form-label" style="font-size:0.75rem;">Categoría</label>
          <select class="form-select form-select-sm" id="filtro-categoria">
            <option>Todas</option>
            <option>Misiones</option>
            <option>Ecoturismo</option>
            <option>Historia</option>
          </select>
        </div>
        <div class="col-6">
          <label class="form-label" style="font-size:0.75rem;">Tiempo disponible</label>
          <select class="form-select form-select-sm" id="filtro-tiempo">
            <option>Medio día</option>
            <option>Día completo</option>
            <option>Fin de semana</option>
          </select>
        </div>
      </div>
      <button id="btn-generar-itinerario" class="btn btn-smarttour w-100 mt-3">
        <i class="bi bi-magic me-1"></i> Generar mi itinerario
      </button>
    </div>
  </section>

  <section class="seccion">
    <h2>Sitios destacados de Jalpan</h2>
    <div class="carrusel-scroll">
      <div class="tarjeta-destino">
        <div class="imagen"></div>
        <div class="info">
          <div class="nombre">Misión Santiago Apóstol</div>
          <div class="meta"><i class="bi bi-star-fill text-gold"></i> 4.8 · Misiones</div>
        </div>
      </div>
      <div class="tarjeta-destino">
        <div class="imagen"></div>
        <div class="info">
          <div class="nombre">Presa Jalpan</div>
          <div class="meta"><i class="bi bi-star-fill text-gold"></i> 4.6 · Ecoturismo</div>
        </div>
      </div>
      <div class="tarjeta-destino">
        <div class="imagen"></div>
        <div class="info">
          <div class="nombre">Plaza Pérgola</div>
          <div class="meta"><i class="bi bi-star-fill text-gold"></i> 4.5 · Centro</div>
        </div>
      </div>
    </div>
  </section>

  <section class="seccion">
    <h2>Mapa de proximidad</h2>
    <div class="mapa-placeholder">
      <i class="bi bi-map me-2"></i> Vista previa del mapa (pendiente de integrar)
    </div>
  </section>

  <?php $seccion_activa = 'explorar'; require __DIR__ . '/../includes/nav.php'; ?>
</div>

<?php
$js_extra = ['pages/home.js'];
require_once __DIR__ . '/../includes/footer.php';
