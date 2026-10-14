<?php
$titulo     = 'Iniciar sesión';
$css_extra  = ['auth.css'];
$body_class = 'pagina-auth';
require_once __DIR__ . '/includes/header.php';
?>

<div class="auth-contenedor">

  <div class="auth-logo">
    <div class="icono"><i class="bi bi-compass-fill"></i></div>
    <strong>SmartTour AI</strong>
  </div>

  <div class="auth-card">
    <h1>Inicia sesión</h1>
    <p class="subtitulo">Accede a tu cuenta para seguir explorando Sierra Gorda.</p>

    <div id="mensaje-login" class="mensaje-formulario"></div>

    <form id="form-login" novalidate>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <div class="input-con-icono">
          <i class="bi bi-envelope icono-izq"></i>
          <input type="email" class="form-control" id="correo" name="correo" placeholder="tucorreo@ejemplo.com" required>
        </div>
      </div>

      <div class="mb-2">
        <label for="contrasena" class="form-label">Contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-lock icono-izq"></i>
          <input type="password" class="form-control" id="contrasena" name="contrasena" placeholder="••••••••" required>
          <button type="button" class="icono-der" onclick="alternarVisibilidadPassword('contrasena','icono-ojo-login')">
            <i class="bi bi-eye" id="icono-ojo-login"></i>
          </button>
        </div>
      </div>

      <div class="text-end mb-3">
        <a href="recuperar-contrasena.php" class="auth-enlace" style="font-size:0.85rem;">¿Olvidaste tu contraseña?</a>
      </div>

      <button type="submit" class="btn btn-smarttour w-100">Iniciar sesión</button>
    </form>

    <div class="separador-o">o continúa con</div>

    <!-- Botón visual únicamente (decisión del equipo: sin lógica todavía, fuera del alcance de FPT-2) -->
    <button type="button" class="btn btn-google w-100" disabled title="Próximamente">
      <i class="bi bi-google me-2"></i> Continuar con Google
    </button>

    <p class="text-center mt-4 mb-0" style="font-size:0.9rem;">
      ¿No tienes cuenta?
      <a href="registro.php" class="auth-enlace">Regístrate</a>
    </p>
  </div>

  <p class="text-center text-white mt-4" style="font-size:0.75rem; opacity:0.75;">
    Cobertura actual: <?= APP_ZONA_COBERTURA ?>
  </p>
</div>

<?php
$js_extra = ['auth/login.js'];
require_once __DIR__ . '/includes/footer.php';
