<?php
$titulo     = 'Restablecer contraseña';
$css_extra  = ['auth.css'];
$body_class = 'pagina-auth';
require_once __DIR__ . '/includes/header.php';
// En el flujo real este token llega en el enlace que se envía por correo.
$token = htmlspecialchars($_GET['token'] ?? '');
?>

<div class="auth-contenedor">

  <div class="auth-logo">
    <div class="icono"><i class="bi bi-shield-lock-fill"></i></div>
    <strong>SmartTour AI</strong>
  </div>

  <div class="auth-card">
    <h1>Restablecer contraseña</h1>
    <p class="subtitulo">Elige tu nueva contraseña para continuar.</p>

    <div id="mensaje-restablecer" class="mensaje-formulario"></div>

    <form id="form-restablecer" novalidate>
      <input type="hidden" id="token" value="<?= $token ?>">

      <div class="mb-3">
        <label for="nueva_contrasena" class="form-label">Nueva contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-lock icono-izq"></i>
          <input type="password" class="form-control" id="nueva_contrasena" name="nueva_contrasena" placeholder="Mínimo 8 caracteres" required minlength="8">
        </div>
      </div>

      <div class="mb-3">
        <label for="confirmar_contrasena" class="form-label">Confirmar nueva contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-lock-fill icono-izq"></i>
          <input type="password" class="form-control" id="confirmar_contrasena" name="confirmar_contrasena" placeholder="Repite la contraseña" required>
        </div>
      </div>

      <button type="submit" class="btn btn-smarttour w-100">Guardar nueva contraseña</button>
    </form>

    <div class="alert mt-3" style="background: var(--card-bg); font-size:0.78rem; color: var(--text-muted); border-radius: var(--radius-sm);">
      <i class="bi bi-shield-check me-1"></i>
      Protocolo de seguridad: este enlace es válido por tiempo limitado y de un solo uso.
    </div>
  </div>
</div>

<?php
$js_extra = ['auth/recuperar.js'];
require_once __DIR__ . '/includes/footer.php';
