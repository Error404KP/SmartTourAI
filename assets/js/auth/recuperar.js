/**
 * recuperar.js — recuperar-contrasena.php (paso 1) y restablecer-contrasena.php (paso 2)
 */

// Paso 1: pedir el correo
document.getElementById('form-recuperar')?.addEventListener('submit', async function (evento) {
  evento.preventDefault();
  ocultarMensaje('mensaje-recuperar');

  const datos = { correo: document.getElementById('correo').value.trim() };
  const boton = evento.target.querySelector('button[type="submit"]');
  const restaurarBoton = ponerBotonCargando(boton, 'Enviando...');

  await solicitarRecuperacion(datos);
  restaurarBoton();

  // Mensaje genérico a propósito, exista o no una cuenta con ese correo (anti enumeración de cuentas)
  mostrarMensaje(
    'mensaje-recuperar',
    'Si el correo está registrado, te enviamos instrucciones para restablecer tu contraseña.',
    'success'
  );
  evento.target.reset();
});

// Paso 2: definir la nueva contraseña (se llega aquí desde el enlace del correo)
document.getElementById('form-restablecer')?.addEventListener('submit', async function (evento) {
  evento.preventDefault();
  ocultarMensaje('mensaje-restablecer');

  const nueva = document.getElementById('nueva_contrasena').value;
  const confirmar = document.getElementById('confirmar_contrasena').value;

  if (nueva !== confirmar) {
    mostrarMensaje('mensaje-restablecer', 'Las contraseñas no coinciden.', 'danger');
    return;
  }

  const datos = {
    token: document.getElementById('token').value,
    nueva_contrasena: nueva,
  };

  const boton = evento.target.querySelector('button[type="submit"]');
  const restaurarBoton = ponerBotonCargando(boton, 'Guardando...');

  const resultado = await restablecerContrasena(datos);
  restaurarBoton();

  if (resultado.success) {
    window.location.href = `${APP_URL_BASE}/login.php`;
  } else {
    mostrarMensaje('mensaje-restablecer', resultado.message || 'No se pudo restablecer la contraseña.', 'danger');
  }
});

async function solicitarRecuperacion(datos) {
  return await llamarAPI('auth/solicitar_recuperacion.php', datos, 'POST');
}

async function restablecerContrasena(datos) {
  return await llamarAPI('auth/restablecer_contrasena.php', datos, 'POST');
}
