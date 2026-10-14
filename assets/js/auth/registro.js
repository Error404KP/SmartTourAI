/**
 * registro.js — pantalla registro.php
 *
 * Este es el ejemplo exacto del flujo pedido:
 *   El formulario de registro dispara guardarRegistroUsuario(datos),
 *   que manda los datos por JSON (fetch, método POST) a la API en PHP
 *   api/auth/guardar_registro_usuario.php, la cual (cuando el backend
 *   esté implementado) ejecutará un stored procedure para guardarlo en MySQL.
 */

document.getElementById('form-registro')?.addEventListener('submit', async function (evento) {
  evento.preventDefault();
  ocultarMensaje('mensaje-registro');

  const datos = {
    nombre: document.getElementById('nombre').value.trim(),
    correo: document.getElementById('correo').value.trim(),
    contrasena: document.getElementById('contrasena').value,
    confirmar_contrasena: document.getElementById('confirmar_contrasena').value,
  };

  if (datos.contrasena !== datos.confirmar_contrasena) {
    mostrarMensaje('mensaje-registro', 'Las contraseñas no coinciden.', 'danger');
    return;
  }

  const boton = evento.target.querySelector('button[type="submit"]');
  const restaurarBoton = ponerBotonCargando(boton, 'Creando cuenta...');

  const resultado = await guardarRegistroUsuario(datos);

  restaurarBoton();

  if (resultado.success) {
    window.location.href = `${APP_URL_BASE}/verificar-correo.php?correo=${encodeURIComponent(datos.correo)}`;
  } else {
    mostrarMensaje('mensaje-registro', resultado.message || 'No se pudo crear la cuenta.', 'danger');
  }
});

/**
 * Función central del flujo de registro: HTML -> JS -> API -> (futuro) SP en MySQL.
 */
async function guardarRegistroUsuario(datos) {
  return await llamarAPI('auth/guardar_registro_usuario.php', datos, 'POST');
}
