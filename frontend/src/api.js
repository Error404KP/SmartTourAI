/**
 * api.js — Wrapper único para hablar con el backend en PHP.
 *
 * Mismo flujo que en el maquetado original:
 *   componente React -> llamarAPI(endpoint, datos) -> fetch JSON -> /api/*.php
 *   -> (futuro) stored procedure en MySQL -> respuesta { success, message, ... }
 */

export const API_BASE_URL = '/SmartTourAI/api';

/**
 * @param {string} endpoint  Ruta dentro de /api, ej. 'auth/iniciar_sesion.php'
 * @param {object|null} datos  Objeto que se manda como JSON en el body.
 * @param {'POST'|'GET'} metodo
 * @returns {Promise<{success: boolean, message?: string}>}
 */
export async function llamarAPI(endpoint, datos = null, metodo = 'POST') {
  try {
    const opciones = { method: metodo, headers: { 'Content-Type': 'application/json' } };
    if (datos !== null && metodo !== 'GET') opciones.body = JSON.stringify(datos);

    const respuesta = await fetch(`${API_BASE_URL}/${endpoint}`, opciones);
    return await respuesta.json();
  } catch (error) {
    console.error(`Error al llamar ${endpoint}:`, error);
    return { success: false, message: 'No se pudo conectar con el servidor. Revisa que Apache esté encendido e intenta de nuevo.' };
  }
}
