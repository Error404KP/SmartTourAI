<?php
$titulo     = 'Crea tu cuenta';
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
    <h1>Crea tu cuenta</h1>
    <p class="subtitulo">Comienza a planear tus recorridos por Jalpan.</p>

    <div id="mensaje-registro" class="mensaje-formulario"></div>

    <form id="form-registro" novalidate>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre completo</label>
        <div class="input-con-icono">
          <i class="bi bi-person icono-izq"></i>
          <input type="text" class="form-control" id="nombre" name="nombre" placeholder="Tu nombre y apellidos" required>
        </div>
      </div>

      <div class="mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <div class="input-con-icono">
          <i class="bi bi-envelope icono-izq"></i>
          <input type="email" class="form-control" id="correo" name="correo" placeholder="tucorreo@ejemplo.com" required>
        </div>
      </div>

      <div class="mb-3">
        <label for="contrasena" class="form-label">Contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-lock icono-izq"></i>
          <input type="password" class="form-control" id="contrasena" name="contrasena" placeholder="Mínimo 8 caracteres" required minlength="8">
        </div>
      </div>

      <div class="mb-3">
        <label for="confirmar_contrasena" class="form-label">Confirmar contraseña</label>
        <div class="input-con-icono">
          <i class="bi bi-lock-fill icono-izq"></i>
          <input type="password" class="form-control" id="confirmar_contrasena" name="confirmar_contrasena" placeholder="Repite tu contraseña" required>
        </div>
      </div>

      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="acepto_terminos" required>
        <label class="form-check-label" for="acepto_terminos" style="font-size:0.82rem;">
          Acepto los términos y la política de privacidad de SmartTour AI.
        </label>
      </div>

      <button type="submit" class="btn btn-smarttour w-100">Crear cuenta</button>
    </form>

    <div class="separador-o">o regístrate con</div>

    <!-- Botón visual únicamente (decisión del equipo: sin lógica todavía, fuera del alcance de FPT-2) -->
    <button type="button" class="btn btn-google w-100" disabled title="Próximamente">
      <i class="bi bi-google me-2"></i> Continuar con Google
    </button>

    <p class="text-center mt-4 mb-0" style="font-size:0.9rem;">
      ¿Ya tienes cuenta?
      <a href="login.php" class="auth-enlace">Inicia sesión</a>
    </p>
  </div>
</div>

<?php
$js_extra = ['auth/registro.js'];
require_once __DIR__ . '/includes/footer.php';
