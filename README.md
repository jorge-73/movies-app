# 🎬 MovieDB

Aplicación web estilo Netflix para descubrir películas y series, construida con **Next.js 14**, **TypeScript** y **Tailwind CSS**. Los datos se obtienen en tiempo real desde la API de **The Movie Database (TMDB)**.

🌐 **Demo:** [moviedb.vercel.app](https://moviedb.vercel.app)

---

## ✨ Características

- **Hero carrusel** con contenido destacado en tendencia semanal, auto-rotación y reproductor de tráiler (YouTube)
- **Secciones curadas** en la homepage: películas populares, series populares, mejores valoradas, próximos estrenos, en emisión
- **Páginas de exploración** con pestañas para Películas (`/movies`) y Series (`/tv`) con scroll infinito
- **Detalle de película** con backdrop, póster, metadatos, géneros, tráiler y contenido en pestañas (resumen / videos)
- **Detalle de serie** con información de temporadas, episodios, cadenas de TV y tráiler
- **Búsqueda global** desde la barra de navegación
- **Diseño responsive** con menú hamburguesa en móvil y grids adaptativos (2–6 columnas)
- **Skeletons** de carga para hero, tarjetas, grids y página de detalle
- **SEO optimizado** con metadatos dinámicos, Open Graph, Twitter Cards y JSON-LD
- **UI en español** con configuración regional `es-ES`
- **Temática oscura** estilo Netflix con acentos rojos

---

## 🛠️ Tech Stack

| Categoría | Tecnología |
|---|---|
| **Framework** | Next.js 14.1.3 (App Router) |
| **Lenguaje** | TypeScript |
| **Estilos** | Tailwind CSS 3.3 + DaisyUI 4.7 |
| **Estado** | Zustand 4.5 |
| **HTTP** | Axios 1.6 (cliente) / Fetch nativo con ISR (servidor) |
| **Iconos** | react-icons 5.0 |
| **Notificaciones** | react-hot-toast 2.4 |
| **Scroll infinito** | react-intersection-observer 9.8 |
| **Animaciones** | AOS 2.3 |
| **Utilidades CSS** | clsx 2.1 |

---

## 📁 Estructura del proyecto

```
src/
├── app/                          # App Router
│   ├── globals.css               # Estilos globales + Tailwind
│   ├── layout.tsx                # Layout raíz
│   ├── page.tsx                  # Homepage
│   ├── movies/page.tsx           # Exploración de películas
│   ├── tv/page.tsx               # Exploración de series
│   └── [tvId]/
│       ├── page.tsx          # Server component (datos + metadata)
│       └── TVShowDetailsClient.tsx  # Client component (UI interactiva)
│   └── movie/[movieId]/
│       ├── page.tsx              # Server component (datos + metadata)
│       └── MovieDetailsClient.tsx # Client component (UI interactiva)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Navegación fija
│   │   └── Footer.tsx            # Pie de página
│   ├── media/
│   │   ├── MediaCard.tsx         # Tarjeta de contenido
│   │   ├── MediaGrid.tsx         # Grid con scroll infinito y búsqueda
│   │   └── MediaHero.tsx         # Hero carrusel destacado
│   ├── ui/
│   │   └── Skeleton.tsx          # Componentes de carga
│   └── features/                 # (pendiente)
├── hooks/
│   ├── useMedia.ts               # Hooks para datos (películas, series, búsqueda, tendencias)
│   └── useDebounce.ts            # Debounce y throttle
├── lib/
│   ├── types.ts                  # Interfaces TypeScript
│   ├── constants.ts              # Constantes TMDB, rutas, géneros
│   └── utils.ts                  # Utilidades (cn, getImageUrl, formatDate, etc.)
├── providers/                    # (pendiente)
├── store/                        # (pendiente - Zustand)
└── services/
    └── tmdb/
        ├── client.ts             # Cliente Axios (llamadas desde el navegador)
        └── server.ts             # Funciones con fetch nativo (SSR/ISR)
```

---

## 🚀 Comenzar

### Requisitos

- Node.js 18+
- npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jorge-73/movies-app.git
cd moviedb-nextjs

# Instalar dependencias
npm install
```

### Variables de entorno

Crea un archivo `.env.local` en la raíz con las credenciales de TMDB:

```env
NEXT_PUBLIC_TMDB_ACCESS_TOKEN=tu_token_de_acceso
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key
```

> Puedes obtener ambas credenciales registrándote en [themoviedb.org](https://www.themoviedb.org/settings/api).

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 📜 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm start` | Inicia servidor de producción |
| `npm run lint` | Ejecuta ESLint |

---

## 🔌 API — TMDB

El proyecto se integra con la [API de The Movie Database (TMDB v3)](https://developer.themoviedb.org/reference) mediante dos capas:

- **Cliente (Axios):** `src/services/tmdb/client.ts` — usado en componentes del lado del cliente. Incluye un interceptor para logging de errores.
- **Servidor (Fetch):** `src/services/tmdb/server.ts` — usado en Server Components con revalidación ISR (`next: { revalidate: 3600 }`).

### Endpoints implementados

| Endpoint | Uso |
|---|---|
| `/trending/movie/week` | Hero de homepage |
| `/movie/popular`, `/tv/popular` | Secciones de homepage |
| `/movie/top_rated`, `/movie/upcoming` | Secciones de homepage |
| `/tv/top_rated`, `/tv/on_the_air`, `/tv/airing_today` | Secciones de homepage |
| `/discover/movie`, `/discover/tv` | Páginas de exploración |
| `/movie/{id}`, `/movie/{id}/videos` | Página de detalle |
| `/search/movie`, `/search/tv` | Búsqueda |
| `/genre/movie/list`, `/genre/tv/list` | Listado de géneros |

---

## 📦 Estado del proyecto

### ✅ Implementado

- [x] Homepage con hero carrusel y 6 secciones de contenido
- [x] Páginas de exploración de películas y series con scroll infinito
- [x] Página de detalle de película (híbrida server + client)
- [x] Página de detalle de serie (híbrida server + client)
- [x] Barra de navegación responsive con búsqueda
- [x] Footer completo con enlaces y atribución
- [x] Skeletons de carga para todos los componentes
- [x] SEO dinámico (metadatos, Open Graph, Twitter Cards)
- [x] UI en español con configuración regional
- [x] Temática oscura estilo Netflix
- [x] Despliegue en Vercel

### 🚧 Pendiente

- [ ] Página de resultados de búsqueda (`/search`)
- [ ] Página de resultados de búsqueda (`/search`)
- [ ] Páginas de autenticación (`/login`, `/register`)
- [ ] Stores de Zustand (`src/store/`)
- [ ] Providers de React context (`src/providers/`)
- [ ] Componentes de features (`src/components/features/`)

---

## 🌍 Despliegue

El proyecto está configurado para desplegarse en **Vercel** con configuración incluida en `.vercel/`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jorge-73/movies-app)

---

## 📄 Licencia

Este proyecto es de uso personal y educativo. Los datos son proporcionados por **TMDB** y sujetos a sus términos de uso.

---

## 📬 Contacto

- GitHub: [@jorge-73](https://github.com/jorge-73)
- Email: jorge_ap_73@hotmail.com
