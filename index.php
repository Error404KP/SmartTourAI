<?php
/**
 * Punto de entrada del proyecto.
 * Por ahora (sin backend funcional todavía) siempre manda a login.php.
 * Cuando exista manejo real de sesión, aquí se decidirá:
 *   si hay sesión activa -> pages/home.php
 *   si no -> login.php
 */
header('Location: login.php');
exit;
