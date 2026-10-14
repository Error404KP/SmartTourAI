/**
 * perfil.js — pages/perfil.php
 */

document.getElementById('btn-cerrar-sesion')?.addEventListener('click', function () {
  // Cuando exista manejo real de sesión, esto llamará a una API que la destruya.
  window.location.href = `${APP_URL_BASE}/login.php`;
});

document.getElementById('enlace-cambiar-contrasena')?.addEventListener('click', function (evento) {
  evento.preventDefault();
  window.location.href = `${APP_URL_BASE}/recuperar-contrasena.php`;
});

async function obtenerPerfil() {
  return await llamarAPI('perfil/obtener_perfil.php', null, 'GET');
}

async function actualizarPerfil(datos) {
  return await llamarAPI('perfil/actualizar_perfil.php', datos, 'POST');
}
