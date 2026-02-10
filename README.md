Frontend - Prueba Técnica Gatos
================================

Este frontend está construido con Angular y consume el backend de la prueba.

Estructura principal:

- `src/main.ts`: bootstrap de la aplicación.
- `src/app/app.routes.ts`: definición de rutas principales.
- `src/app/core/`: servicios compartidos (`CatService`, `AuthService`, `AuthGuard`).
- `src/app/features/cats/`: componentes para listar razas, tabla y carrusel.
- `src/app/features/auth/`: login y registro.
- `src/app/features/user/`: vista protegida con datos del usuario.

Rutas principales:

- `/cats` (Vistas 1 y 2)
- `/login` (Vista 3)
- `/register` (Vista 4)
- `/profile` (Vista 5, protegida por `AuthGuard`)

Desarrollo:

- Servidor de desarrollo: `ng serve` (o `npm start`) en la carpeta `frontendCat`, luego abrir `http://localhost:4200`.
- Build de producción: `ng build` (genera artefactos en `dist/`).

El frontend asume que el backend está disponible en `http://localhost:3000`.

