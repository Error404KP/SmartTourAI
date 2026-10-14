<?php
$titulo     = 'Tu itinerario';
$css_extra  = ['app.css'];
require_once __DIR__ . '/../includes/header.php';
?>

<div class="app-contenedor">

  <header class="encabezado-app">
    <div class="d-flex align-items-center gap-2">
      <a href="<?= APP_URL_BASE ?>/pages/home.php" class="text-white"><i class="bi bi-arrow-left fs-5"></i></a>
      <h1 class="h6 fw-bold mb-0">3 sitios en Jalpan</h1>
    </div>

    <div class="resumen-metricas mt-3">
      <div class="metrica">
        <div class="valor">40 min</div>
        <div class="etiqueta">Duración</div>
      </div>
      <div class="metrica">
        <div class="valor">14.2 km</div>
        <div class="etiqueta">Distancia</div>
      </div>
      <div class="metrica">
        <div class="valor">$0</div>
        <div class="etiqueta">Costo est.</div>
      </div>
    </div>
  </header>

  <section class="seccion mt-3">
    <div class="mapa-placeholder" style="min-height:140px;">
      <i class="bi bi-map me-2"></i> Mapa con la ruta (pendiente de integrar)
    </div>
  </section>

  <section class="seccion">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <h2 class="mb-0">Estrategia seleccionada</h2>
      <span class="badge-pill-navy">Para 1 día</span>
    </div>
    <p class="text-muted" style="font-size:0.82rem;">
      Enfoque: itinerario continuo basado en cercanía y tiempo disponible.
      <a href="#" id="enlace-ruta-alternativa" class="text-navy fw-semibold">Ver ruta alternativa</a>
    </p>
  </section>

  <section class="seccion">
    <h2>Itinerario</h2>

    <div class="tarjeta-smarttour mb-2">
      <div class="tarjeta-sitio">
        <img src="" alt="">
        <div class="flex-grow-1">
          <div class="fw-semibold" style="font-size:0.88rem;">1. Misión Santiago Apóstol</div>
          <div class="text-muted" style="font-size:0.78rem;">9:00 AM · 20 min de visita</div>
        </div>
        <i class="bi bi-chevron-down text-muted"></i>
      </div>
    </div>

    <div class="tarjeta-smarttour mb-2">
      <div class="tarjeta-sitio">
        <img src="" alt="">
        <div class="flex-grow-1">
          <div class="fw-semibold" style="font-size:0.88rem;">2. Plaza Pérgola</div>
          <div class="text-muted" style="font-size:0.78rem;">9:35 AM · 15 min de visita</div>
        </div>
        <i class="bi bi-chevron-down text-muted"></i>
      </div>
    </div>

    <div class="tarjeta-smarttour mb-2">
      <div class="tarjeta-sitio">
        <img src="" alt="">
        <div class="flex-grow-1">
          <div class="fw-semibold" style="font-size:0.88rem;">3. Presa Jalpan</div>
          <div class="text-muted" style="font-size:0.78rem;">10:10 AM · 25 min de visita</div>
        </div>
        <i class="bi bi-chevron-down text-muted"></i>
      </div>
    </div>
  </section>

  <section class="seccion d-grid gap-2">
    <button id="btn-iniciar-navegacion" class="btn btn-smarttour"><i class="bi bi-compass me-1"></i> Iniciar navegación en vivo</button>
    <div class="d-flex gap-2">
      <button id="btn-guardar-itinerario" class="btn btn-smarttour-outline flex-fill"><i class="bi bi-bookmark me-1"></i> Guardar itinerario</button>
      <button id="btn-descargar-itinerario" class="btn btn-smarttour-outline flex-fill"><i class="bi bi-download me-1"></i> Descargar offline</button>
    </div>
  </section>

  <?php $seccion_activa = 'itinerario'; require __DIR__ . '/../includes/nav.php'; ?>
</div>

<?php
$js_extra = ['pages/resultado.js'];
require_once __DIR__ . '/../includes/footer.php';
