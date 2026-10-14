/**
 * utils.js — helpers de interfaz reutilizados por las distintas pantallas
 * (mensajes de error/éxito, estado de "cargando" en botones, etc.)
 */

/**
 * Muestra un mensaje dentro de un contenedor con clase .mensaje-formulario
 * @param {string} idContenedor  id del <div class="mensaje-formulario">
 * @param {string} texto
 * @param {'danger'|'success'} tipo
 */
function mostrarMensaje(idContenedor, texto, tipo = 'danger') {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;
  contenedor.textContent = texto;
  contenedor.classList.remove('danger', 'success');
  contenedor.classList.add('visible', tipo);
}

function ocultarMensaje(idContenedor) {
  const contenedor = document.getElementById(idContenedor);
  if (!contenedor) return;
  contenedor.classList.remove('visible');
}

/**
 * Pone un botón en estado "cargando" (deshabilitado + texto temporal)
 * y devuelve una función para restaurarlo.
 */
function ponerBotonCargando(boton, textoCargando = 'Procesando...') {
  const textoOriginal = boton.textContent;
  boton.disabled = true;
  boton.dataset.textoOriginal = textoOriginal;
  boton.textContent = textoCargando;
  return () => {
    boton.disabled = false;
    boton.textContent = boton.dataset.textoOriginal || textoOriginal;
  };
}

/** Alterna mostrar/ocultar un input tipo password */
function alternarVisibilidadPassword(idInput, idIcono) {
  const input = document.getElementById(idInput);
  const icono = document.getElementById(idIcono);
  if (!input || !icono) return;
  const esPassword = input.type === 'password';
  input.type = esPassword ? 'text' : 'password';
  icono.classList.toggle('bi-eye', !esPassword);
  icono.classList.toggle('bi-eye-slash', esPassword);
}

/** Lee un parámetro de la query string actual, ej. obtenerParametro('correo') */
function obtenerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre);
}
