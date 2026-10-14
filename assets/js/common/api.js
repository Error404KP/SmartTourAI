/**
 * api.js — Wrapper único para hablar con el backend en PHP.
 *
 * Así es como se conecta todo el flujo, de extremo a extremo:
 *   1) Un formulario/botón del HTML dispara una función JS (ej. registro.js).
 * 2) Esa función arma un objeto "datos" y llama a llamarAPI(endpoint, datos).
 *   3) llamarAPI hace fetch() al archivo PHP correspondiente dentro de /api,
 *      mandando los datos como JSON por el método HTTP indicado.
 *   4) La API en PHP lee el JSON (file_get_contents('php://input')) y,
 *      cuando el backend esté implementado, ejecutará el stored procedure
 *      correspondiente en MySQL y devolverá también JSON.
 *
 * Por ahora (etapa de diseño) cada API responde con datos simulados, pero
 * la conexión HTML -> JS -> API ya queda completamente armada.
 */

const API_BASE_URL = `${APP_URL_BASE}/api`;

/**
 * Llama a un endpoint de la API.
 * @param {string} endpoint  Ruta relativa dentro de /api, ej. 'auth/guardar_registro_usuario.php'
 * @param {object|null} datos  Objeto que se envía como JSON en el body.
 * @param {string} metodo  Método HTTP ('POST', 'GET', etc.)
 * @returns {Promise<object>} Respuesta JSON de la API ({ success, message, ... })
 */
async function llamarAPI(endpoint, datos = null, metodo = 'POST') {
  try {
    const opciones = {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
    };
    if (datos !== null && metodo !== 'GET') {
      opciones.body = JSON.stringify(datos);
    }

    const respuesta = await fetch(`${API_BASE_URL}/${endpoint}`, opciones);
    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error(`Error al llamar ${endpoint}:`, error);
    return {
      success: false,
      message: 'No se pudo conectar con el servidor. Intenta de nuevo.',
    };
  }
}
