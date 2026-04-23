   # Stack Técnico — Portfolio de Walen Calderon

> [!info] Propósito de este documento
> Explicación exhaustiva de cada tecnología que conforma este portfolio: qué es, por qué existe, cómo se integra con las demás y qué fragmentos de código la demuestran.

#portfolio #astro #react #typescript #tailwind #frontend

---

## Tabla de contenido

1. [[#Visión general del stack]]
2. [[#Astro]]
3. [[#React]]
4. [[#TypeScript]]
5. [[#Tailwind CSS]]
6. [[#PostCSS y Autoprefixer]]
7. [[#CSS Custom Properties (Design Tokens)]]
8. [[#CSS @layer]]
9. [[#IntersectionObserver API]]
10. [[#Context API de React]]
11. [[#localStorage]]
12. [[#Google Fonts]]
13. [[#Font Awesome]]
14. [[#ESLint (Flat Config)]]
15. [[#npm y el ecosistema de módulos]]
16. [[#Git]]
17. [[#Cómo se conecta todo]]

---

## Visión general del stack

```
┌─────────────────────────────────────────────────────────┐
│                      Astro 5                            │
│  (motor de build, enrutamiento, layout .astro)          │
│                                                         │
│   ┌──────────────────┐   ┌────────────────────────┐    │
│   │  React 19 (TSX)  │   │  Tailwind CSS 3         │   │
│   │  Componentes UI  │   │  + globals.css          │   │
│   └──────────────────┘   └────────────────────────┘    │
│           │                         │                   │
│   ┌───────▼─────────────────────────▼──────────────┐   │
│   │         PostCSS + Autoprefixer                  │   │
│   │         (procesa el CSS final)                  │   │
│   └─────────────────────────────────────────────────┘   │
│                                                         │
│   TypeScript · ESLint · npm · Git                       │
└─────────────────────────────────────────────────────────┘
```

El código fuente vive en `src/`. Astro compila todo a HTML + JS + CSS estático que el navegador puede cargar sin servidor.

---

## Astro

### ¿Qué es?

Astro es un framework de **generación de sitios estáticos (SSG)** con una arquitectura llamada **"Islands"** (islas). La idea central es: envía el **mínimo JavaScript posible** al navegador. Todo lo que pueda ser HTML puro, lo es. Solo las partes interactivas se "hidratan" con JavaScript.

### ¿Por qué Astro en este proyecto?

- El portfolio es principalmente contenido estático (secciones de presentación, proyectos, contacto).
- Astro permite mezclar componentes React solo donde hacen falta (navbar con estado, hero con tipeo animado, context de idioma).
- El resultado es un sitio muy rápido con carga mínima de JavaScript.

### Archivos `.astro`

Un archivo `.astro` tiene dos zonas separadas por `---`:

```astro
---
// Zona de "frontmatter" — se ejecuta SOLO en build time (Node.js)
// Aquí se hacen imports, fetch de datos, lógica de servidor
import PortfolioApp from "../components/PortfolioApp";
import BaseLayout from "../layouts/baseLayout.astro";
---

<!-- Zona de template — HTML + componentes -->
<BaseLayout>
  <PortfolioApp client:load />
</BaseLayout>
```

La parte entre `---` no llega al navegador. Es código que corre durante la compilación.

### Directiva `client:load`

```astro
<PortfolioApp client:load />
```

Esta directiva le dice a Astro: *"Este componente de React necesita JavaScript en el cliente; hidrátaló tan pronto como la página cargue."*

Astro tiene varias directivas:

| Directiva | Cuándo hidrata |
|-----------|----------------|
| `client:load` | Inmediatamente al cargar |
| `client:idle` | Cuando el browser esté libre |
| `client:visible` | Cuando el elemento sea visible |
| `client:only` | Solo en cliente, nunca server-side |

Se usó `client:load` porque la navbar, el hero con tipeo y el context de idioma necesitan estar listos desde el primer momento.

### Layout (`baseLayout.astro`)

```astro
---
import "../styles/globals.css";
---

<html lang="en" class="dark">
  <head>
    <!-- meta, fuentes, favicons -->
  </head>
  <body>
    <main class="page-fade">
      <slot />   <!-- aquí se inyecta el contenido de cada página -->
    </main>
    <footer>...</footer>
  </body>
</html>
```

`<slot />` es el equivalente de `{children}` en React. Todo lo que esté dentro de `<BaseLayout>` en `index.astro` se renderiza donde está el `<slot />`.

### `astro.config.mjs`

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()]
});
```

Las **integraciones** son plugins oficiales que extienden Astro:
- `@astrojs/react` → habilita componentes `.tsx`/`.jsx`
- `@astrojs/tailwind` → conecta Tailwind al pipeline de CSS de Astro

---

## React

### ¿Qué es?

React es una **biblioteca de JavaScript** para construir interfaces de usuario mediante componentes. Un componente es una función que recibe datos (props) y devuelve JSX (una sintaxis parecida a HTML que describe qué se debe renderizar).

### Versión usada: React 19

```json
"react": "^19.2.4",
"react-dom": "^19.2.4"
```

React 19 es la versión más reciente. Trae mejoras en el compilador y en el manejo de async, aunque para este portfolio los hooks básicos son lo principal.

### JSX / TSX

JSX es azúcar sintáctica que Babel/TypeScript convierte a llamadas `React.createElement(...)`. Por eso en `tsconfig.json` se configura:

```json
"jsx": "react-jsx",
"jsxImportSource": "react"
```

Con `react-jsx` no necesitas importar React en cada archivo; el compilador lo hace solo.

### Componentes usados

| Componente | Responsabilidad |
|-----------|----------------|
| `PortfolioApp` | Raíz React; monta todo, registra el IntersectionObserver |
| `Navbar` | Barra de navegación sticky con scroll spy |
| `Hero` | Sección principal con tipeo animado y estadísticas |
| `AboutSection` | Sección sobre mí |
| `ProjectsSection` | Grid de proyectos con filtros |
| `SkillsSection` | Barras de habilidades y chips |
| `ExperienceSection` | Timeline de experiencia |
| `EducationSection` | Formación académica |
| `ContactSection` | Links de contacto |
| `LanguageDropdown` | Selector de idioma |

### Hooks utilizados

#### `useState`

Guarda un valor reactivo. Cuando cambia, React re-renderiza el componente.

```tsx
// En Navbar.tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState("home");

// En Hero.tsx
const [typedSubtitle, setTypedSubtitle] = useState("");
```

#### `useEffect`

Ejecuta código con **efectos secundarios** (eventos, timers, subscripciones) después de que el componente se monta o cuando cambian sus dependencias.

```tsx
// Hero.tsx — efecto del typeo animado
useEffect(() => {
  setTypedSubtitle("");
  let i = 0;
  const id = window.setInterval(() => {
    i += 1;
    setTypedSubtitle(subtitle.slice(0, i));
    if (i >= subtitle.length) window.clearInterval(id);
  }, 22);

  return () => window.clearInterval(id); // cleanup: para el timer si el componente desmonta
}, [subtitle, lang]); // se re-ejecuta si cambia el idioma
```

El **array de dependencias** `[subtitle, lang]` controla cuándo corre el efecto:
- `[]` → solo al montar
- `[x, y]` → al montar y cuando `x` o `y` cambien
- Sin array → en cada render (peligroso, casi nunca deseable)

#### `useMemo`

Memoriza el resultado de un cálculo caro para no recalcularlo en cada render.

```tsx
// Hero.tsx
const subtitle = useMemo(() => t("subtitle"), [t]);
```

Aquí `t("subtitle")` busca una cadena en el diccionario de traducciones. `useMemo` garantiza que esa búsqueda solo se repite cuando cambia `t` (es decir, cuando cambia el idioma).

#### `useContext`

Permite leer un valor del Context sin pasarlo como prop.

```tsx
// Hero.tsx, Navbar.tsx, etc.
const { t, lang } = useLanguage(); // internamente llama useContext
```

---

## TypeScript

### ¿Qué es?

TypeScript es un **superset de JavaScript** que añade tipado estático. El código TypeScript se compila (transpila) a JavaScript puro antes de ejecutarse. El compilador (`tsc`) puede detectar errores de tipo en tiempo de desarrollo, antes de que el código llegue al navegador.

### Configuración (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "target": "ES2022",         // genera JS compatible con navegadores modernos
    "module": "ESNext",         // usa import/export nativos
    "moduleResolution": "Bundler", // resolución optimizada para bundlers (Vite/Rollup)
    "allowJs": true,            // permite mezclar .js y .ts
    "checkJs": true,            // también chequea archivos .js
    "strict": false,            // modo estricto desactivado (más permisivo)
    "noEmit": true,             // solo chequea tipos, no genera archivos (Astro hace el build)
    "skipLibCheck": true,       // no chequea tipos en node_modules (más rápido)
    "jsx": "react-jsx",         // modo JSX moderno (sin import React)
    "jsxImportSource": "react"  // origen del runtime JSX
  }
}
```

### Tipos en el proyecto

```tsx
// Tipo unión: solo puede ser "en" o "es", nunca otro string
export type Lang = 'en' | 'es';

// Interface: define la forma del objeto que provee el Context
interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

// Genérico en createContext: TypeScript sabe qué tipo tiene el contexto
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ReactNode: tipo para cualquier cosa que React pueda renderizar (JSX, string, null...)
export function LanguageProvider({ children }: { children: ReactNode }) { ... }
```

### `keyof typeof`

```tsx
const t = (key: string) => {
  return translations[lang][key as keyof typeof translations['en']] || key;
};
```

`keyof typeof translations['en']` genera el tipo unión de todas las claves del objeto de traducciones en inglés (e.g. `"home" | "about" | "projects" | ...`). Así TypeScript verifica que solo se acceden claves válidas.

---

## Tailwind CSS

### ¿Qué es?

Tailwind es un framework de CSS **utility-first**: en lugar de escribir clases semánticas como `.button-primary`, usas clases utilitarias que aplican una sola propiedad CSS: `px-4`, `flex`, `text-sm`, `bg-blue-500`.

### Versión usada: Tailwind CSS 3

```json
"tailwindcss": "^3.4.19"
```

### Configuración (`tailwind.config.mjs`)

```js
export default {
  darkMode: ["class"],           // el modo oscuro se activa con la clase .dark en <html>
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],  // qué archivos escanear para purgar CSS no usado
  theme: {
    extend: {
      colors: {
        // Los colores apuntan a variables CSS en lugar de valores fijos
        // Esto permite cambiar toda la paleta cambiando las variables en :root o .dark
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        // ...etc
      },
      borderRadius: {
        xl: "var(--radius)",     // radio de borde también viene de una variable
      },
      boxShadow: {
        glass: "0 24px 60px rgba(0, 0, 0, 0.32)",
      },
      fontFamily: {
        heading: ["Sora", "Segoe UI", "sans-serif"],
        body: ["Source Sans 3", "Segoe UI", "sans-serif"],
      },
    },
  },
};
```

### CSS variables + Tailwind: el patrón clave

Este proyecto usa un patrón avanzado: **los tokens de diseño viven en variables CSS**, y Tailwind las consume. Esto permite:

1. Cambiar el tema completo (claro/oscuro) con solo añadir/quitar la clase `dark` en `<html>`.
2. Usar clases de Tailwind (`bg-background`, `text-foreground`) que se adaptan automáticamente al tema.

```css
/* En globals.css */
:root {
  --background: #ffffff;   /* tema claro */
  --foreground: oklch(0.145 0 0);
}

.dark {
  --background: #050C16;   /* tema oscuro */
  --foreground: #EAF2FF;
}
```

```js
// En tailwind.config.mjs
colors: {
  background: "var(--background)",  // clase bg-background usa la variable
}
```

```astro
<!-- En baseLayout.astro -->
<html class="dark">   <!-- Tailwind ve .dark y usa los valores oscuros -->
```

### ¿Por qué el CSS del portfolio está en `globals.css` y no en clases de Tailwind directamente?

El proyecto tiene componentes con clases personalizadas (`.card`, `.hero-panel`, `.cta-button`, etc.) definidas en `@layer components`. Esto es porque:

1. El diseño se originó en Figma con un sistema visual específico.
2. Las clases de utilidad de Tailwind son suficientes para layout simple, pero para componentes complejos con múltiples propiedades es más claro tener una clase semántica.
3. Al estar en `@layer components`, Tailwind puede purgarlo si no se usa (tree-shaking de CSS).

---

## PostCSS y Autoprefixer

### PostCSS

PostCSS es un **procesador de CSS**. No es un lenguaje nuevo (como Sass/SCSS), sino una herramienta que transforma CSS con plugins.

```js
// postcss.config.mjs
export default {
  plugins: {
    tailwindcss: {},   // plugin que genera las utilidades de Tailwind
    autoprefixer: {},  // plugin que añade prefijos de vendor automáticamente
  },
};
```

Cuando Astro compila el CSS, lo pasa por PostCSS. PostCSS ejecuta Tailwind primero (genera el CSS de utilidades) y luego Autoprefixer (añade prefijos).

### Autoprefixer

Autoprefixer lee el CSS y añade automáticamente los prefijos de vendor necesarios según la lista de navegadores a soportar. Por ejemplo:

```css
/* Lo que escribes */
background-clip: text;

/* Lo que Autoprefixer genera */
-webkit-background-clip: text;
background-clip: text;
```

Esto es especialmente útil para propiedades como `backdrop-filter`, `clip-path` y animaciones que aún requieren `-webkit-` en Safari.

---

## CSS Custom Properties (Design Tokens)

### ¿Qué son las Custom Properties?

Las CSS Custom Properties (variables CSS) son propiedades que defines con `--nombre` y lees con `var(--nombre)`. A diferencia de las variables de Sass/Less, estas **viven en el DOM en tiempo de ejecución** y pueden cambiar dinámicamente.

### El sistema de tokens de este proyecto

```css
/* Paleta base (tema claro, aunque se usa .dark por defecto) */
:root {
  --brand: #56C2FF;          /* color primario de marca (azul eléctrico) */
  --brand-strong: #7EA0FF;   /* variante más violácea para gradientes */
  --glow: rgba(86, 194, 255, 0.28); /* resplandor para sombras y bars */

  --background: #ffffff;
  --foreground: oklch(0.145 0 0);

  /* Semánticos para componentes */
  --card: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --muted-foreground: #717182;

  --radius: 0.625rem;  /* radio global de bordes */

  /* Tipografía */
  --font-heading: "Sora", Segoe UI, sans-serif;
  --font-body: "Source Sans 3", "Segoe UI", sans-serif;
}

/* Tema oscuro: redefine las mismas variables */
.dark {
  --background: #050C16;
  --foreground: #EAF2FF;
  --card: linear-gradient(180deg, rgba(14, 30, 52, 0.82), rgba(8, 18, 32, 0.72));
  --border: rgba(154, 201, 255, 0.16);
  --radius: 24px;  /* bordes más redondeados en dark mode */
}
```

### Ventajas de este enfoque

1. **Un solo punto de cambio**: modificar `--brand` en `:root` cambia el color en todo el sitio.
2. **Theming dinámico**: cambiar la clase `.dark` en `<html>` actualiza todas las variables sin JavaScript.
3. **Compatibilidad con Tailwind**: Tailwind puede usar `var(--background)` como valor de color.
4. **Componentes legibles**: `.card { background: var(--card); }` es más semántico que un color hardcodeado.

---

## CSS `@layer`

### ¿Qué es `@layer`?

`@layer` es una característica de CSS moderna para organizar estilos en **capas de cascada**. Las capas tienen una jerarquía de especificidad predefinida, lo que hace que los estilos sean más predecibles y menos propensos a conflictos.

Tailwind define tres capas: `base`, `components`, `utilities`.

```css
@tailwind base;       /* Resets, estilos globales de HTML (h1, body, etc.) */
@tailwind components; /* Clases de componentes (.card, .btn, etc.) */
@tailwind utilities;  /* Clases de utilidad (flex, p-4, text-sm, etc.) */
```

### Cómo se usa en el proyecto

```css
@layer base {
  /* Estilos globales que se aplican a elementos HTML */
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); }
  a { color: inherit; text-decoration: none; }
}

@layer components {
  /* Clases de componentes reutilizables */
  .card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
  }

  .cta-button {
    display: inline-flex;
    padding: 0.9rem 1.35rem;
    border-radius: 999px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  /* Keyframes también van aquí */
  @keyframes shine {
    to { background-position: 300% center; }
  }
}
```

### Jerarquía de especificidad

Las utilidades siempre ganan sobre los componentes, y los componentes sobre la base. Esto significa que puedes escribir `class="card p-8"` y `p-8` (utilidad) sobreescribirá cualquier padding del `.card` (componente) sin necesidad de `!important`.

---

## IntersectionObserver API

### ¿Qué es?

`IntersectionObserver` es una API nativa del navegador que detecta cuándo un elemento **entra o sale del viewport** (la parte visible de la pantalla). Es la manera moderna y eficiente de hacer animaciones al hacer scroll.

### Implementación en `PortfolioApp.tsx`

```tsx
useEffect(() => {
  // Respeta prefers-reduced-motion (accesibilidad)
  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  // 1. Selecciona todos los elementos que se van a animar
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(
      ".section-head, .card, .hero-badge, .hero-actions, .hero-social"
    )
  );

  // 2. Añade la clase .reveal (los hace invisibles con opacity:0 + translateY)
  targets.forEach((el) => el.classList.add("reveal"));

  // 3. Crea el Observer
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 4. Cuando el elemento es visible, añade .is-visible (anima a opacity:1)
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target); // deja de observarlo (la animación es de una vez)
        }
      });
    },
    {
      threshold: 0.12,       // el elemento debe estar 12% visible para dispararse
      rootMargin: "0px 0px -10% 0px"  // el trigger es 10% antes del borde inferior
    }
  );

  targets.forEach((el) => io.observe(el));

  return () => io.disconnect(); // cleanup cuando el componente desmonta
}, []);
```

### El CSS complementario

```css
/* Estado inicial: invisible y desplazado hacia abajo */
.reveal {
  opacity: 0;
  transform: translate3d(0, 14px, 0);
  transition: opacity 520ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 520ms cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform;  /* le dice al browser que prepare la GPU */
}

/* Estado final: visible y en posición original */
.reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* Stagger: las tarjetas aparecen 40ms más tarde que los títulos */
.card.reveal       { transition-delay: 40ms; }
.section-head.reveal { transition-delay: 0ms; }

/* Accesibilidad: si el usuario prefiere no ver animaciones */
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

> [!tip] `cubic-bezier(0.22, 1, 0.36, 1)`
> Esta curva se conoce como "ease out expo". La animación empieza rápido y desacelera suavemente al final, dando una sensación física y natural.

---

## Context API de React

### ¿Qué problema resuelve?

Sin Context, pasar el idioma actual a todos los componentes requeriría "prop drilling": pasar `lang` y `setLang` de `PortfolioApp` → `Navbar` → `LanguageDropdown`, y también de `PortfolioApp` → `Hero`, `AboutSection`, `ProjectsSection`, etc. Con 8+ componentes, esto se vuelve inmanejable.

Context crea un "almacén global" que cualquier componente descendiente puede leer directamente.

### Implementación en `LanguageContext.tsx`

```tsx
// 1. Definir el tipo del contexto
interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

// 2. Crear el contexto (con undefined como valor inicial)
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// 3. El Provider: envuelve la app y provee el valor
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  // Leer el idioma guardado al montar
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  // Guardar cuando cambia
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  // Función de traducción
  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 4. Hook personalizado para consumir el contexto (con guard de error)
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}
```

### Flujo de datos

```
PortfolioApp
  └── <LanguageProvider>          ← almacena lang + t() en el contexto
        ├── <Navbar>
        │     └── useLanguage()  ← lee del contexto directamente
        │     └── <LanguageDropdown>
        │           └── useLanguage() → llama setLang()
        ├── <Hero>
        │     └── useLanguage()  ← obtiene t() y lang
        ├── <AboutSection>
        │     └── useLanguage()
        └── ...etc
```

---

## localStorage

### ¿Qué es?

`localStorage` es una API del navegador que permite guardar pares clave-valor de forma **persistente** (sobrevive al cierre del tab y del navegador). Los datos no tienen fecha de expiración y solo son accesibles desde el mismo origen (dominio + puerto).

### Uso en el proyecto

```tsx
// Leer al montar (solo una vez, array vacío como dependencia)
useEffect(() => {
  const saved = localStorage.getItem("lang") as Lang;
  if (saved === "en" || saved === "es") {
    setLang(saved);
  }
}, []);

// Escribir cada vez que cambia el idioma
useEffect(() => {
  localStorage.setItem("lang", lang);
}, [lang]);
```

Resultado: si el usuario elige español, recarga la página y vuelve, sigue viendo el sitio en español.

> [!warning] SSR y localStorage
> `localStorage` solo existe en el navegador, no en Node.js (donde corre el servidor de Astro durante el build). Por eso el acceso está dentro de `useEffect`, que solo se ejecuta en el cliente después del render.

---

## Google Fonts

### Cómo se cargan

```html
<!-- En baseLayout.astro -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Fuentes usadas

| Fuente | Rol | Pesos |
|--------|-----|-------|
| **Sora** | Títulos, navbar, botones | 500, 600, 700, 800 |
| **Source Sans 3** | Cuerpo de texto, párrafos | 400, 500, 600, 700 |

### Optimizaciones aplicadas

1. **`preconnect`**: establece la conexión TCP con Google Fonts antes de que se necesite, reduciendo la latencia.
2. **`display=swap`**: el navegador muestra texto con una fuente del sistema primero, y cuando Sora/Source Sans carga, hace un swap. Esto evita el FOIT (Flash of Invisible Text).
3. **Solo los pesos necesarios**: cargar `wght@500;600;700;800` en lugar de todos los pesos posibles reduce el peso del recurso.

### Cómo se aplican en CSS

```css
:root {
  --font-heading: "Sora", Segoe UI, sans-serif;
  --font-body: "Source Sans 3", "Segoe UI", sans-serif;
}

h1, h2, h3, .brand-text, .cta-button {
  font-family: var(--font-heading);
}

body {
  font-family: var(--font-body);
}
```

El `Segoe UI` y `sans-serif` son **fallbacks**: si Google Fonts no carga (sin internet, bloqueado), el texto sigue siendo legible.

---

## Font Awesome

### ¿Qué es?

Font Awesome es una biblioteca de iconos que se cargan como una fuente (o SVG). Al ser una fuente, los iconos escalan perfectamente a cualquier tamaño y se colorean con `color`.

### Carga en el proyecto

```html
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
/>
```

Se carga desde una CDN (Cloudflare), que es muy rápida y probablemente ya esté en caché en el navegador del usuario.

### Uso en React

```tsx
// Íconos en Hero.tsx
<i className="fas fa-sparkles" aria-hidden="true"></i>
<i className="fas fa-external-link-alt" aria-hidden="true"></i>
<i className="fas fa-download" aria-hidden="true"></i>

// Íconos de redes sociales
<i className="fab fa-github" aria-hidden="true"></i>
<i className="fab fa-linkedin-in" aria-hidden="true"></i>
<i className="fas fa-envelope" aria-hidden="true"></i>

// Menú hamburguesa
<i className="fas fa-bars" aria-hidden="true"></i>
```

> [!info] `aria-hidden="true"`
> Los iconos decorativos se marcan con `aria-hidden` para que los lectores de pantalla los ignoren. El texto o `aria-label` circundante provee el contexto semántico.

**Prefijos de Font Awesome 5:**
- `fas` = Font Awesome Solid
- `fab` = Font Awesome Brands (logos de GitHub, LinkedIn, etc.)
- `far` = Font Awesome Regular (contornos)

---

## ESLint (Flat Config)

### ¿Qué es?

ESLint es un **linter**: analiza el código estático en busca de errores, malas prácticas y violaciones de estilo, sin ejecutarlo.

### Configuración usada: Flat Config (ESLint 9)

```js
// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".astro/**", "dist/**", "node_modules/**"],
  },
  js.configs.recommended,         // reglas básicas de JS (no-unused-vars, etc.)
  ...tseslint.configs.recommended, // reglas de TypeScript
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,       // variables globales de browser (window, document...)
        particlesJS: "readonly",  // variable de particles.js (comentado pero declarado)
      },
    },
  },
];
```

### ¿Por qué "Flat Config"?

ESLint 9 introdujo un nuevo formato de configuración (Flat Config) que reemplaza al antiguo `.eslintrc.json`. Es más simple: un array de objetos en lugar de una estructura jerárquica con `extends` y `overrides`.

### Comandos disponibles

```json
"scripts": {
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "typecheck": "tsc --noEmit"
}
```

- `npm run lint` → reporta errores
- `npm run lint:fix` → corrige automáticamente los que puede
- `npm run typecheck` → chequea tipos de TypeScript sin compilar

---

## npm y el ecosistema de módulos

### `package.json`

El archivo central que define el proyecto:

```json
{
  "name": "my-portfolio",
  "version": "1.0.0",
  "scripts": { ... },
  "devDependencies": {
    // Herramientas usadas solo durante el desarrollo/build
    "@astrojs/tailwind": "^6.0.2",
    "astro": "^5.18.1",
    "tailwindcss": "^3.4.19",
    "typescript": "^5.9.3",
    "eslint": "^9.39.4",
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.10"
  },
  "dependencies": {
    // Dependencias que van al bundle de producción
    "@astrojs/react": "^5.0.3",
    "react": "^19.2.4",
    "react-dom": "^19.2.4"
  }
}
```

### `^` (caret) en versiones

`"react": "^19.2.4"` significa: instala `19.2.4` o cualquier versión compatible (`19.x.x` posterior), pero **no** `20.0.0` (cambio de major).

### `package-lock.json`

Archivo generado automáticamente que "congela" las versiones exactas instaladas. Garantiza que `npm install` produzca el mismo resultado en cualquier máquina y momento.

### ESModules (`.mjs`)

Los archivos de configuración usan extensión `.mjs` (o `type: "module"` en package.json) para poder usar `import`/`export` en lugar del antiguo `require()`/`module.exports` de CommonJS.

---

## Git

### Estructura del repositorio

```
.gitignore:
  node_modules/  ← dependencias (se reinstalan con npm install)
  debug.log
  .astro/        ← caché de build de Astro
  dist/          ← output compilado
```

### Estado actual del repo

El proyecto tiene cambios en staging de una migración importante:

- `astro.config.mjs`, `package.json`, `package-lock.json` → actualizados para Astro + React + Tailwind
- `src/components/Hero.tsx`, `Navbar.tsx`, `PortfolioApp.tsx` → reescritos en React/TSX
- `src/context/LanguageContext.tsx` → nuevo Context de i18n
- `src/layouts/baseLayout.astro` → layout base de Astro
- `src/pages/index.astro` → página raíz
- `src/styles/globals.css` → nuevo sistema de estilos con Tailwind
- `tailwind.config.mjs`, `postcss.config.mjs` → configuración del pipeline CSS
- `.tmp-figma/` → archivos de referencia de Figma (eliminados del tracking)

---

## Cómo se conecta todo

### Pipeline completo: del código al navegador

```
1. npm run dev / npm run build
        │
        ▼
2. Astro lee src/pages/index.astro
        │  ↪ importa baseLayout.astro (layout HTML base)
        │  ↪ importa PortfolioApp.tsx (componente React)
        │
        ▼
3. Astro procesa baseLayout.astro
        │  ↪ genera el <html>, <head>, <body>
        │  ↪ importa globals.css → pasa por PostCSS
        │
        ▼
4. PostCSS procesa globals.css
        │  ↪ Tailwind escanea los archivos del content[] config
        │  ↪ genera solo las clases de utilidad usadas (purging)
        │  ↪ añade las capas @layer base, components, utilities
        │  ↪ Autoprefixer añade prefijos -webkit- donde necesario
        │  ↪ Resultado: un único CSS minificado
        │
        ▼
5. Astro compila PortfolioApp.tsx y sus importaciones (React)
        │  ↪ TypeScript transpila TSX → JavaScript
        │  ↪ Genera un bundle JS mínimo para el "island"
        │
        ▼
6. Output en dist/
        │  ↪ index.html (HTML estático con el markup inicial)
        │  ↪ _astro/globals.css (CSS compilado)
        │  ↪ _astro/PortfolioApp.js (bundle React)
        │
        ▼
7. Navegador recibe y procesa
        │  ↪ HTML renderiza la estructura (navbar, hero, secciones)
        │  ↪ CSS aplica estilos y tema oscuro
        │  ↪ React hidrata PortfolioApp (añade interactividad)
        │  ↪ IntersectionObserver observa elementos para animaciones
        │  ↪ LanguageContext lee localStorage y establece idioma
        │  ↪ Hero inicia el efecto de tipeo
        │  ↪ Navbar activa el scroll spy
```

### Flujo de cambio de idioma

```
Usuario hace clic en "ES" en el LanguageDropdown
        │
        ▼
setLang("es")  ←  Context actualiza el estado
        │
        ▼
useEffect([lang]) dispara localStorage.setItem("lang", "es")
        │
        ▼
React re-renderiza todos los consumidores de useLanguage()
        │  ↪ Navbar → links en español
        │  ↪ Hero → subtitle en español → reinicia el typeo
        │  ↪ Todas las secciones → textos en español
        │
        ▼
Si el usuario recarga → useEffect([]) lee localStorage → setLang("es")
```

---

> [!success] Resumen ejecutivo
> Este portfolio combina **Astro** (que entrega HTML estático ultra-rápido con mínimo JS) con **React** (para las partes interactivas como el navbar, el typeo y el i18n), escrito en **TypeScript** para seguridad de tipos. Los estilos usan **Tailwind** como capa de utilidades sobre un sistema de **CSS Custom Properties** que hace el theming oscuro trivial. **PostCSS + Autoprefixer** aseguran compatibilidad cross-browser. Todo el proyecto se lintea con **ESLint 9** y se gestiona con **npm** y **Git**.
