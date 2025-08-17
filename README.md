<div align="center">
  <img src="public/img/escama-logo.svg" alt="escama" width="96" />
  
  <h1>escama</h1>
  <p>Gestión de finanzas personales • Laravel + React (Vite + Tailwind v4, PWA)</p>
</div>

---

## 🚀 Características

- API en Laravel 11 con Sanctum
- Frontend React + Vite + Tailwind v4 (variables CSS, dark mode)
- PWA lista para instalar (banner de instalación iOS/Android)
- Autenticación con sesión persistente (localStorage)
- CRUD de Movimientos, Categorías y Agrupadores
- Estadísticas, gráficos y balance mensual
- Recuperación de contraseña (solicitud + restablecimiento)

## 📦 Requisitos

- PHP 8.2+
- Composer
- Node.js 20+
- SQLite/MySQL/PostgreSQL (según tu `.env`)

## 🛠️ Instalación

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate

npm install
npm run dev
```

En otra terminal, levanta el servidor PHP:

```bash
php artisan serve
```

Accede al frontend en `http://localhost:5173/app` (Vite) o al backend en `http://localhost:8000`.

## 🔐 Autenticación

- Login y registro desde `/app/login` y `/app/register`.
- El token se gestiona vía interceptores y se guarda en `localStorage`.
- Logout disponible desde el sidebar.

## 🔄 Recuperación de contraseña

Endpoints:

- `POST /api/forgot-password` → envía instrucciones (placeholder listo para integrar Mail)
- `POST /api/reset-password` → `email`, `password`, `password_confirmation`

Frontend:

- Página solicitud: `/app/forgot-password`
- Página restablecer: `/app/reset-password`

Email:

- Mailable: `app/Mail/PasswordRecovery.php`
- Vista: `resources/views/emails/password-recovery.blade.php`

## 📱 PWA

- Registro del Service Worker en `resources/js/main.tsx`
- Banner de instalación: `resources/js/components/ui/pwa-install-banner.tsx`
- Para iOS, muestra instrucciones de “Agregar a inicio”.

## 🧱 Estructura

- Backend: `app/`, `routes/`, `database/`
- Frontend: `resources/js/`
  - `components/` (UI, páginas y contenedores)
  - `contexts/` (tema, notificaciones, auth)
  - `service/` (HTTP, endpoints)

## 🧪 Scripts

```bash
# desarrollo
npm run dev

# build producción
npm run build

# backend
php artisan serve
php artisan migrate
```

## ⚙️ Configuración rápida

- Ajusta CORS y Sanctum según tu entorno.
- Configura `MAIL_*` en `.env` para enviar el correo real de recuperación.

## 📝 Licencia

MIT
