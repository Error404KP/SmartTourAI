/**
 * resultado.js — pages/resultado.php
 */

document.getElementById('btn-guardar-itinerario')?.addEventListener('click', async function () {
  const restaurarBoton = ponerBotonCargando(this, 'Guardando...');
  const resultado = await guardarItinerario({ id_itinerario: 'demo' });
  restaurarBoton();
  alert(resultado.message || (resultado.success ? 'Itinerario guardado.' : 'No se pudo guardar.'));
});

document.getElementById('btn-descargar-itinerario')?.addEventListener('click', function () {
  alert('Descarga offline: pendiente de implementar.');
});

document.getElementById('btn-iniciar-navegacion')?.addEventListener('click', function () {
  alert('Navegación en vivo: pendiente de implementar.');
});

document.getElementById('enlace-ruta-alternativa')?.addEventListener('click', function (evento) {
  evento.preventDefault();
  alert('Comparar estrategias de ruta (reto avanzado): pendiente de implementar.');
});

async function guardarItinerario(datos) {
  return await llamarAPI('itinerarios/guardar_itinerario.php', datos, 'POST');
}

async function listarItinerariosGuardados() {
  return await llamarAPI('itinerarios/listar_itinerarios.php', null, 'GET');
}
