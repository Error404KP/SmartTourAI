<?php
$titulo     = 'Detalle del destino';
$css_extra  = ['app.css'];
require_once __DIR__ . '/../includes/header.php';
// id del sitio vendría por querystring, ej. detalle-destino.php?id=12
$id_sitio = $_GET['id'] ?? null;
?>

<div class="app-contenedor">

  <header class="encabezado-app" style="border-radius:0;">
    <div class="d-flex justify-content-between align-items-center">
      <a href="javascript:history.back()" class="text-white"><i class="bi bi-arrow-left fs-5"></i></a>
      <div class="d-flex gap-3">
        <i class="bi bi-bookmark fs-5"></i>
        <i class="bi bi-share fs-5"></i>
      </div>
    </div>
  </header>

  <div class="mapa-placeholder m-3" style="min-height:180px;">
    <i class="bi bi-image me-2"></i> Foto principal del sitio
  </div>

  <section class="seccion">
    <span class="badge-pill-navy mb-2 d-inline-block">Misiones Franciscanas</span>
    <h1 class="h5 fw-bold">Misión Santiago Apóstol de Jalpan</h1>
    <p class="text-muted" style="font-size:0.85rem;">
      <i class="bi bi-geo-alt me-1"></i> Calle Flores, Jalpan de Serra, Qro.
    </p>
    <p class="text-muted" style="font-size:0.82rem;">
      <i class="bi bi-clock me-1"></i> 20 min recomendados · Abierto hoy
    </p>
  </section>

  <section class="seccion">
    <h2><i class="bi bi-stars text-gold me-1"></i> Reseña de SmartTour AI</h2>
    <p style="font-size:0.85rem; color: var(--text-dark);">
      Construida entre 1751 y 1758, esta misión forma parte del conjunto de
      Misiones Franciscanas de la Sierra Gorda, declarado Patrimonio de la
      Humanidad por la UNESCO. Su fachada churrigueresca combina elementos
      indígenas y barrocos únicos en la región.
    </p>
  </section>

  <section class="seccion">
    <h2>Recomendaciones para tu visita</h2>
    <div class="tarjeta-smarttour p-3 mb-2">
      <strong style="font-size:0.85rem;"><i class="bi bi-sun me-1 text-gold"></i> Mejor horario de visita</strong>
      <p class="mb-0 text-muted" style="font-size:0.8rem;">Entre 9:00 AM y 11:00 AM, antes de que aumente el calor.</p>
    </div>
    <div class="tarjeta-smarttour p-3 mb-2">
      <strong style="font-size:0.85rem;"><i class="bi bi-info-circle me-1 text-gold"></i> Normas recomendadas</strong>
      <p class="mb-0 text-muted" style="font-size:0.8rem;">Vestimenta respetuosa; se permite tomar fotografías sin flash.</p>
    </div>
  </section>

  <section class="seccion">
    <h2>Galería</h2>
    <div class="galeria-destino">
      <div></div><div></div><div></div>
    </div>
  </section>

  <section class="seccion">
    <button id="btn-agregar-itinerario" class="btn btn-smarttour w-100" data-id-sitio="<?= htmlspecialchars($id_sitio ?? '') ?>">
      <i class="bi bi-plus-circle me-1"></i> Agregar a mi itinerario
    </button>
  </section>

  <?php $seccion_activa = 'explorar'; require __DIR__ . '/../includes/nav.php'; ?>
</div>

<?php
$js_extra = ['pages/detalle.js'];
require_once __DIR__ . '/../includes/footer.php';
