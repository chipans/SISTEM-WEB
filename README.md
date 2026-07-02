<div align="center">

# 🌐 SISTEM-WEB

### Frontend del sistema SISTEM-DATE, construido con Angular

[![Angular](https://img.shields.io/badge/Angular-18.2.21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.9-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev/)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)

</div>

---

## 📋 Tabla de contenidos

- [Acerca del proyecto](#-acerca-del-proyecto)
- [Stack tecnológico](#-stack-tecnológico)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Servidor de desarrollo](#-servidor-de-desarrollo)
- [Scaffolding de código](#-scaffolding-de-código)
- [Build](#-build)
- [Tests](#-tests)
- [Variables de entorno](#-variables-de-entorno)
- [Conexión con el backend](#-conexión-con-el-backend)
- [Ramas del repositorio](#-ramas-del-repositorio)
- [Despliegue](#-despliegue)

---

## 📖 Acerca del proyecto

**SISTEM-WEB** es el frontend del sistema **SISTEM-DATE**, desarrollado con **Angular 18** usando **standalone components** (sin NgModules, sin SSR). Se comunica con el backend [SISTEM-API](../SISTEM-API) mediante peticiones HTTP, usando un contrato de respuesta estandarizado (`ApiResponse<T>`) y manejo centralizado de errores vía interceptores.

> 🚧 **Estado actual:** en desarrollo activo. Aún no se ha creado la estructura de `domain/`, `application/`, `infrastructure/` — se irá construyendo por feature a medida que se porten los módulos del sistema.

---

## 🛠 Stack tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-original.svg" width="20"/> Angular | 18.2.21 | Framework principal (standalone components) |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="20"/> TypeScript | ~5.5.2 | Lenguaje base |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" width="20"/> Tailwind CSS | 3.4.9 | Estilos utility-first |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" width="20"/> SCSS | — | Preprocesador CSS |
| PostCSS | ^8.4.41 | Procesamiento de CSS |
| Autoprefixer | ^10.4.20 | Compatibilidad entre navegadores |
| <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" width="20"/> npm | — | Gestor de paquetes |

---

## 📁 Estructura del proyecto

```
SISTEM-WEB/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── models/          # Interfaces y contratos (ApiResponse<T>, etc.)
│   │   │   ├── interceptors/    # Interceptores HTTP (manejo de errores, auth)
│   │   │   ├── guards/          # Route guards
│   │   │   └── services/        # Servicios core (auth, etc.)
│   │   ├── features/            # Módulos de negocio (login, register, dashboard...)
│   │   ├── app.config.ts        # Configuración de la app (providers)
│   │   └── app.routes.ts        # Definición de rutas
│   ├── environments/            # environment.ts / environment.development.ts
│   └── styles.scss              # Estilos globales + directivas Tailwind
├── angular.json
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## ✅ Requisitos previos

- [Node.js](https://nodejs.org/) (LTS recomendado)
- [Angular CLI](https://angular.dev/tools/cli) v18
  ```bash
  npm install -g @angular/cli@18
  ```

---

## 📦 Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/chipans/SISTEM-WEB.git
cd SISTEM-WEB
npm install
```

---

## 🚀 Servidor de desarrollo

Ejecuta:

```bash
ng serve
```

Luego navega a **`http://localhost:4200/`**. La aplicación se recarga automáticamente al modificar los archivos fuente.

---

## 🧩 Scaffolding de código

Angular CLI incluye herramientas de generación de código. Para crear un componente nuevo:

```bash
ng generate component component-name
```

También puedes generar otros artefactos:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

---

## 🏗 Build

Para compilar el proyecto:

```bash
ng build
```

Los artefactos de build se guardan en el directorio `dist/`. El build de producción optimiza la aplicación para rendimiento y velocidad.

---

## 🧪 Tests

**Unit tests** (vía [Karma](https://karma-runner.github.io/)):

```bash
ng test
```

**Tests end-to-end:**

```bash
ng e2e
```

> Para e2e necesitas primero agregar un paquete que implemente esa capacidad (por ejemplo Cypress o Playwright).

---

## 🔐 Variables de entorno

Configuradas en `src/environments/`, conectadas vía `fileReplacements` en `angular.json`:

| Archivo | Uso | apiUrl actual |
|---|---|---|
| `environment.ts` | Producción | *(pendiente de configurar con URL de Render)* |
| `environment.development.ts` | Desarrollo local | `http://localhost:5246/api` |

---

## 🔗 Conexión con el backend

Este frontend consume la API de [**SISTEM-API**](../SISTEM-API) (ASP.NET Core + Neon PostgreSQL).

- Contrato de respuesta: `ApiResponse<T>` (`isSuccess`, `data`, `errors`)
- Manejo de errores: interceptor centralizado (`api-response.interceptor.ts`)
- CORS habilitado en el backend para `http://localhost:4200` en desarrollo

```
[SISTEM-WEB] --HTTP--> [SISTEM-API] --Npgsql--> [Neon PostgreSQL]
   Netlify                 Render
```

---

## 🌿 Ramas del repositorio

| Rama | Propósito |
|---|---|
| `main` | Código estable / producción |
| `dev` | Desarrollo activo |
| `testdev` | Pruebas antes de pasar a `main` |

Flujo de trabajo: `feature/*` → `dev` → `testdev` → `main`

---

## ☁️ Despliegue

Este proyecto se despliega en **[Netlify](https://www.netlify.com/)**, configurado para desplegar automáticamente desde la rama `main`.

---

## 📚 Más ayuda

Para más información sobre Angular CLI, usa `ng help` o visita la [documentación oficial](https://angular.dev/tools/cli).

<div align="center">

---

Hecho con 💜 usando Angular

</div>