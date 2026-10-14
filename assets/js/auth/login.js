/**
 * login.js — pantalla login.php
 * Flujo: botón "Iniciar sesión" -> iniciarSesion() -> llamarAPI('auth/iniciar_sesion.php')
 */

document.getElementById('form-login')?.addEventListener('submit', async function (evento) {
  evento.preventDefault();
  ocultarMensaje('mensaje-login');

  const datos = {
    correo: document.getElementById('correo').value.trim(),
    contrasena: document.getElementById('contrasena').value,
  };

  const boton = evento.target.querySelector('button[type="submit"]');
  const restaurarBoton = ponerBotonCargando(boton, 'Entrando...');

  const resultado = await iniciarSesion(datos);

  restaurarBoton();

  if (resultado.success) {
    window.location.href = `${APP_URL_BASE}/pages/home.php`;
  } else {
    // Mensaje genérico a propósito: no revelar si el correo existe o no (buena práctica de seguridad)
    mostrarMensaje('mensaje-login', resultado.message || 'Correo o contraseña incorrectos.', 'danger');
  }
});

/**
 * Envía las credenciales a la API de login.
 * Cuando el backend esté implementado, auth/iniciar_sesion.php ejecutará
 * el SP correspondiente (ej. sp_login_usuario) contra MySQL.
 */
async function iniciarSesion(datos) {
  return await llamarAPI('auth/iniciar_sesion.php', datos, 'POST');
}
