/**
 * home.js — pages/home.php
 */

document.getElementById('btn-generar-itinerario')?.addEventListener('click', async function () {
  const datos = {
    busqueda: document.getElementById('campo-busqueda').value.trim(),
    categoria: document.getElementById('filtro-categoria').value,
    tiempo_disponible: document.getElementById('filtro-tiempo').value,
  };

  const restaurarBoton = ponerBotonCargando(this, 'Generando...');
  const resultado = await generarItinerario(datos);
  restaurarBoton();

  if (resultado.success) {
    window.location.href = `${APP_URL_BASE}/pages/resultado.php`;
  } else {
    alert(resultado.message || 'No se pudo generar el itinerario.');
  }
});

/**
 * Pide al backend que genere un itinerario con el componente de IA
 * (grafos + búsqueda heurística). Por ahora responde con datos simulados.
 */
async function generarItinerario(datos) {
  return await llamarAPI('itinerarios/generar_itinerario.php', datos, 'POST');
}
