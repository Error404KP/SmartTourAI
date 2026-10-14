<?php
$titulo     = 'Recuperar contraseña';
$css_extra  = ['auth.css'];
$body_class = 'pagina-auth';
require_once __DIR__ . '/includes/header.php';
?>

<div class="auth-contenedor">

  <div class="auth-logo">
    <div class="icono"><i class="bi bi-key-fill"></i></div>
    <strong>SmartTour AI</strong>
  </div>

  <div class="auth-card">
    <h1>Recuperar contraseña</h1>
    <p class="subtitulo">
      Ingresa el correo asociado a tu cuenta y te enviaremos instrucciones para restablecerla.
    </p>

    <div id="mensaje-recuperar" class="mensaje-formulario"></div>

    <form id="form-recuperar" novalidate>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <div class="input-con-icono">
          <i class="bi bi-envelope icono-izq"></i>
          <input type="email" class="form-control" id="correo" name="correo" placeholder="tucorreo@ejemplo.com" required>
        </div>
      </div>

      <button type="submit" class="btn btn-smarttour w-100">Enviar instrucciones</button>
    </form>

    <div class="alert mt-3" style="background: var(--card-bg); font-size:0.78rem; color: var(--text-muted); border-radius: var(--radius-sm);">
      <i class="bi bi-shield-check me-1"></i>
      Por seguridad, siempre mostramos el mismo mensaje de confirmación, exista o no una cuenta con ese correo.
    </div>

    <p class="text-center mt-4 mb-0" style="font-size:0.9rem;">
      <a href="login.php" class="auth-enlace"><i class="bi bi-arrow-left me-1"></i>Volver a iniciar sesión</a>
    </p>
  </div>
</div>

<?php
$js_extra = ['auth/recuperar.js'];
require_once __DIR__ . '/includes/footer.php';
