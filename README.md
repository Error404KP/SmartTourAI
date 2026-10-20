# SmartTour AI — Maquetado (React + PHP)

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

## Frontend en React

Las pantallas ahora están hechas con **React + Vite** (carpeta `frontend/`) y se
compilan a `app/`, que Apache sirve en `http://localhost/SmartTourAI/app/`.
Siguen hablando con las mismas APIs PHP de `api/` mediante `llamarAPI()`
(`frontend/src/api.js`).

```
frontend/
├── src/pages/        Login, Registro, Verificar, Recuperar, Restablecer,
│                     Inicio, Itinerario, Destino, Perfil
├── src/components/   AuthLayout, AppLayout (nav inferior), Formulario, Mapa, Contornos
├── src/styles/       tokens.css (paleta, tipografía y tiempos de animación), base, auth, app,
│                     responsive (tablet/escritorio) y movimiento (animaciones, ver skill ui-animation)
├── src/datos.js      Sitios e itinerario de ejemplo (hasta que exista backend)
└── src/estado.jsx    Itinerario actual y avisos compartidos entre pantallas
```

- `cd frontend && npm install` (solo la primera vez).
- `npm run dev`: servidor de desarrollo con recarga en vivo en
  `http://localhost:5173/SmartTourAI/app/` (las llamadas a `/SmartTourAI/api`
  se reenvían a Apache, así que XAMPP debe estar encendido).
- `npm run build`: genera `app/`. Hazlo después de cada cambio para verlo en XAMPP.

Los archivos `.php` de pantallas y `assets/` son el maquetado anterior en
HTML + Bootstrap; ya no se usan (`index.php` redirige a `app/`).

## Cómo está organizado (maquetado anterior)

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
3. Abre `http://localhost/SmartTourAI/` en el navegador; te llevará a la app de React
   (`app/`). Si `app/` no existe, primero corre `npm run build` dentro de `frontend/`.

## Trabajar en la nube (GitHub Codespaces)

El repositorio trae el archivo `.devcontainer.json`, así que se puede abrir un
entorno completo en el navegador, sin instalar nada:

1. En GitHub abre el repositorio → botón verde **Code** → pestaña **Codespaces**
   → **Create codespace on main**.
2. Espera a que termine de preparar el entorno (instala PHP 8.2, Node 20 y
   corre `npm install` en `frontend/`).
3. La app se abre sola en la pestaña del puerto **8080** (`/SmartTourAI/`).
   Si no se abre, ve a la pestaña **Ports** y abre el 8080.
4. Para editar con recarga en vivo: en la terminal corre
   `cd frontend && npm run dev` y abre el puerto **5173** en
   `/SmartTourAI/app/`. Al terminar, `npm run build` para actualizar `app/`.
5. Guarda tus cambios con **Source Control** (commit + push). En la PC solo
   haz **Pull** en GitHub Desktop para traerlos.

Notas: MySQL no está incluido todavía (las APIs aún responden datos
simulados). El plan gratis de GitHub incluye un número limitado de horas de
Codespaces al mes; detén el Codespace cuando no lo uses.
