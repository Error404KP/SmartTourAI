/**
 * verificar.js — pantalla verificar-correo.php (código de 6 dígitos)
 */

const camposCodigo = document.querySelectorAll('.digito-codigo');

// Mover el foco automáticamente al siguiente dígito
camposCodigo.forEach((campo, indice) => {
  campo.addEventListener('input', () => {
    campo.value = campo.value.replace(/[^0-9]/g, '');
    if (campo.value && indice < camposCodigo.length - 1) {
      camposCodigo[indice + 1].focus();
    }
  });
  campo.addEventListener('keydown', (evento) => {
    if (evento.key === 'Backspace' && !campo.value && indice > 0) {
      camposCodigo[indice - 1].focus();
    }
  });
});

document.getElementById('form-verificar')?.addEventListener('submit', async function (evento) {
  evento.preventDefault();
  ocultarMensaje('mensaje-verificar');

  const codigo = Array.from(camposCodigo).map((c) => c.value).join('');
  const correo = document.getElementById('correo').value;

  if (codigo.length < 6) {
    mostrarMensaje('mensaje-verificar', 'Ingresa los 6 dígitos del código.', 'danger');
    return;
  }

  const boton = evento.target.querySelector('button[type="submit"]');
  const restaurarBoton = ponerBotonCargando(boton, 'Verificando...');

  const resultado = await verificarCodigo({ correo, codigo });

  restaurarBoton();

  if (resultado.success) {
    // Auto-login propuesto tras verificar: lleva directo a la pantalla principal
    window.location.href = `${APP_URL_BASE}/pages/home.php`;
  } else {
    mostrarMensaje('mensaje-verificar', resultado.message || 'Código incorrecto o expirado.', 'danger');
  }
});

document.getElementById('enlace-reenviar')?.addEventListener('click', async function (evento) {
  evento.preventDefault();
  const correo = document.getElementById('correo').value;
  await reenviarCodigo({ correo });
  mostrarMensaje('mensaje-verificar', 'Enviamos un nuevo código a tu correo.', 'success');
});

async function verificarCodigo(datos) {
  return await llamarAPI('auth/verificar_codigo.php', datos, 'POST');
}

async function reenviarCodigo(datos) {
  return await llamarAPI('auth/reenviar_codigo.php', datos, 'POST');
}
