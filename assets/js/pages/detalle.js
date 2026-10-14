/**
 * detalle.js — pages/detalle-destino.php
 */

document.getElementById('btn-agregar-itinerario')?.addEventListener('click', async function () {
  const idSitio = this.dataset.idSitio;
  const restaurarBoton = ponerBotonCargando(this, 'Agregando...');
  const resultado = await obtenerDetalleDestino(idSitio);
  restaurarBoton();
  alert(resultado.message || 'Sitio agregado a tu itinerario.');
});

async function obtenerDetalleDestino(idSitio) {
  return await llamarAPI(`destinos/obtener_detalle_destino.php?id=${encodeURIComponent(idSitio)}`, null, 'GET');
}
