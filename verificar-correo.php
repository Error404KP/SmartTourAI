<?php
$titulo     = 'Verifica tu correo';
$css_extra  = ['auth.css'];
$body_class = 'pagina-auth';
require_once __DIR__ . '/includes/header.php';
$correo = htmlspecialchars($_GET['correo'] ?? '');
?>

<div class="auth-contenedor">

  <div class="auth-logo">
    <div class="icono"><i class="bi bi-envelope-check-fill"></i></div>
    <strong>SmartTour AI</strong>
  </div>

  <div class="auth-card text-center">
    <h1>Verifica tu correo</h1>
    <p class="subtitulo">
      Enviamos un código de 6 dígitos a<br>
      <strong id="correo-destino" class="text-navy"><?= $correo ?: 'tu correo' ?></strong>
    </p>

    <div id="mensaje-verificar" class="mensaje-formulario"></div>

    <form id="form-verificar" novalidate>
      <input type="hidden" id="correo" value="<?= $correo ?>">
      <div class="codigo-verificacion my-4">
        <input type="text" maxlength="1" inputmode="numeric" class="form-control digito-codigo" data-indice="0">
        <input type="text" maxlength="1" inputmode="numeric" class="form-control digito-codigo" data-indice="1">
        <input type="text" maxlength="1" inputmode="numeric" class="form-control digito-codigo" data-indice="2">
        <input type="text" maxlength="1" inputmode="numeric" class="form-control digito-codigo" data-indice="3">
        <input type="text" maxlength="1" inputmode="numeric" class="form-control digito-codigo" data-indice="4">
        <input type="text" maxlength="1" inputmode="numeric" class="form-control digito-codigo" data-indice="5">
      </div>

      <button type="submit" class="btn btn-smarttour w-100">Verificar y continuar</button>
    </form>

    <p class="mt-4 mb-0" style="font-size:0.85rem;">
      ¿No llegó el código?
      <a href="#" id="enlace-reenviar" class="auth-enlace">Reenviar código</a>
      <span id="contador-reenvio" class="text-muted"></span>
    </p>
  </div>
</div>

<?php
$js_extra = ['auth/verificar.js'];
require_once __DIR__ . '/includes/footer.php';
