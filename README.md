# SmartTour AI — Maquetado (HTML + PHP + JS)

Proyecto integrador "Formulación de Proyectos de Tecnología" / "Fundamentos de
IA" — UT San Juan del Río. Equipo: Isaac Mendoza Ramírez y Diego Ahmed Olvera
Martínez.

## Estado actual

Esta carpeta contiene **solo el maquetado/diseño** de las pantallas que ya se
definieron en Figma (login, registro, verificación de correo, recuperar/
restablecer contraseña, pantalla principal, resultado del itinerario, detalle
de destino y perfil). **No hay lógica de negocio real todavía**: las APIs en
PHP responden con datos simulados y traen comentarios `TODO` marcando
exactamente qué falta conectar a MySQL.

## Cómo está organizado

```
SmartTourAI/
├── index.php                  Redirige a login.php
├── login.php, registro.php,   Pantallas de autenticación
│   verificar-correo.php,
│   recuperar-contrasena.php,
│   restablecer-contrasena.php
├── includes/                  Partials PHP compartidos (header, footer, nav)
├── config/                    Constantes y conexión a MySQL (PDO)
├── pages/                     Pantallas internas (requieren sesión):
│                               home.php, resultado.php, detalle-destino.php, perfil.php
├── assets/
│   ├── css/                   variables.css, base.css, auth.css, app.css, componentes.css
│   └── js/
│       ├── common/            api.js (wrapper de fetch) y utils.js
│       ├── auth/              login.js, registro.js, verificar.js, recuperar.js
│       └── pages/             home.js, resultado.js, detalle.js, perfil.js
├── api/                       Endpoints PHP (reciben y responden JSON)
│   ├── auth/                  registro, login, verificación, recuperación de contraseña
│   ├── itinerarios/           generar, guardar, listar
│   ├── destinos/              detalle de un sitio
│   └── perfil/                obtener/actualizar perfil
└── database/
    └── smarttour_ai.sql       Tablas + stored procedures (borrador, listos para completar)
```

## Cómo se conecta todo (el patrón que sigue cada pantalla)

1. Un formulario o botón en el HTML (ej. `registro.php`) dispara una función
   de JS (ej. `guardarRegistroUsuario()` en `assets/js/auth/registro.js`).
2. Esa función arma un objeto con los datos y llama a `llamarAPI(endpoint, datos)`
   (definida en `assets/js/common/api.js`), que hace un `fetch` por **HTTP POST**
   mandando los datos como **JSON**.
3. El endpoint en `api/` (ej. `api/auth/guardar_registro_usuario.php`) lee ese
   JSON con `json_decode(file_get_contents('php://input'), true)`, valida la
   forma de los datos y —cuando se implemente— ejecuta el **stored procedure**
   correspondiente contra MySQL usando la conexión de `config/db.php`
   (ej. `CALL sp_crear_usuario(...)`, definido en `database/smarttour_ai.sql`).
4. La API responde en JSON (`{ success, message, ... }`) y el JS actualiza la
   pantalla (muestra un error, redirige a la siguiente pantalla, etc.).

Ese mismo patrón —**HTML → función JS → `llamarAPI()` → endpoint PHP → (futuro)
stored procedure**— se repite en las demás pantallas, solo cambia el nombre de
la función y el endpoint.

## Siguientes pasos (backend funcional)

- [ ] Importar `database/smarttour_ai.sql` en phpMyAdmin (crea la BD `smarttour_ai`).
- [ ] Completar la lógica real en cada archivo de `api/` (ahora mismo todos
      responden con datos simulados; los `TODO` marcan exactamente qué falta).
- [ ] Agregar manejo de sesión PHP (`session_start()`) para login/logout real.
- [ ] Integrar PHPMailer para el envío del código de verificación y el enlace
      de recuperación de contraseña.
- [ ] Decidir formalmente si se mantiene el botón "Continuar con Google" (por
      ahora es solo visual, sin funcionalidad, ya que no estaba en el alcance
      original de FPT-2) o se retira del diseño.

## Cómo probarlo localmente

1. Esta carpeta ya vive en `C:\xampp\htdocs\SmartTourAI`.
2. Inicia Apache desde el panel de XAMPP (MySQL no es necesario todavía, ya
   que ninguna API lo usa en este punto).
3. Abre `http://localhost/SmartTourAI/` en el navegador — te llevará a `login.php`.
