<?php
/**
 * Pie compartido: carga JS común + JS específico de la página.
 * Variable opcional que la página puede definir antes del include:
 *   $js_extra (string[]) Scripts adicionales dentro de assets/js/.
 */
$js_extra = $js_extra ?? [];
?>
<!-- Bootstrap bundle (incluye Popper, para dropdowns/modales) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

<!-- Expone la ruta base del proyecto a JS (la usa api.js para armar las URLs) -->
<script>const APP_URL_BASE = "<?= APP_URL_BASE ?>";</script>

<!-- JS común del proyecto -->
<script src="<?= APP_URL_BASE ?>/assets/js/common/api.js"></script>
<script src="<?= APP_URL_BASE ?>/assets/js/common/utils.js"></script>

<?php foreach ($js_extra as $script): ?>
<script src="<?= APP_URL_BASE ?>/assets/js/<?= htmlspecialchars($script) ?>"></script>
<?php endforeach; ?>
</body>
</html>
