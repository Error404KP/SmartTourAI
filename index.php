<?php
/**
 * Punto de entrada del proyecto.
 * Las pantallas ahora viven en la app de React (código en frontend/, compilada en app/).
 * Cuando exista manejo real de sesión, la app decidirá si mostrar login o inicio.
 */
header('Location: app/');
exit;
