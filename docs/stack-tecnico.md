   # Stack Técnico — Portfolio de Walen Calderon

> [!info] Propósito de este documento
> Explicación exhaustiva de cada tecnología que conforma este portfolio: qué es, por qué existe, cómo se integra con las demás y qué fragmentos de código la demuestran.

#portfolio #astro #react #typescript #tailwind #nanostores #islands #vercel #frontend

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
10. [[#Nanostores (estado global)]]
11. [[#localStorage]]
12. [[#Google Fonts]]
13. [[#Font Awesome]]
14. [[#ESLint (Flat Config)]]
15. [[#npm y el ecosistema de módulos]]
16. [[#Git]]
17. [[#Vercel y Speed Insights]]
18. [[#Cómo se conecta todo]]

---

## Visión general del stack

```
┌──────────────────────────────────────────────────────────────┐
│                        Astro 5 (SSG + Islands)               │
│   baseLayout.astro · index.astro · <script> bundleados       │
│                                                              │
│   ┌─────────────────────────────┐  ┌─────────────────────┐   │
│   │  React 19 Islands           │  │  Tailwind 3          │  │
│   │  Navbar, Hero, *Section     │  │  + globals.css       │  │
│   │  (client:load / client:idle)│  │  + tokens CSS vars   │  │
│   └─────────────────────────────┘  └──────────────────────┘  │
│              │                                               │
│   ┌──────────▼─────────────┐                                 │
│   │  nanostores            │                                 │
│   │  $lang atom singleton  │ ← cruza islands sin Provider    │
│   └────────────────────────┘                                 │
│                                                              │
│   ┌──────────────────────────────────────────────────────┐   │
│   │         PostCSS + Autoprefixer                        │  │
│   └──────────────────────────────────────────────────────┘   │
│                                                              │
│   TypeScript · ESLint · npm · Git · Vercel + Speed Insights  │
└──────────────────────────────────────────────────────────────┘
```

El código fuente vive en `src/`. Astro compila todo a HTML + JS + CSS estático que Vercel sirve desde su CDN global. Los islands se hidratan **independientemente**, no como un solo árbol React.

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
import BaseLayout from "../layouts/baseLayout.astro";
import LangInit          from "../components/LangInit";
import Navbar            from "../components/Navbar";
import Hero              from "../components/Hero";
import AboutSection      from "../components/AboutSection";
import ProjectsSection   from "../components/ProjectsSection";
import SkillsSection     from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection  from "../components/EducationSection";
import ContactSection    from "../components/ContactSection";
---

<!-- Zona de template — cada sección es un island independiente -->
<BaseLayout>
  <LangInit client:load />              <!-- invisible, sincroniza localStorage -->
  <Navbar   client:load />              <!-- interactivo inmediato -->
  <Hero     client:load />              <!-- tipeo animado -->

  <AboutSection      client:idle />     <!-- hidratan cuando el browser está libre -->
  <ProjectsSection   client:idle />
  <SkillsSection     client:idle />
  <ExperienceSection client:idle />
  <EducationSection  client:idle />
  <ContactSection    client:idle />
</BaseLayout>
```

La parte entre `---` no llega al navegador. Es código que corre durante la compilación.

### Directivas `client:*` — el corazón de Islands

Cada island es un bundle JS **independiente**. Astro solo envía al navegador el JS de los componentes que llevan una directiva `client:*`:

| Directiva        | Cuándo hidrata                       | Uso en este portfolio                       |
| ---------------- | ------------------------------------ | ------------------------------------------- |
| `client:load`    | Inmediatamente al cargar la página   | `Navbar`, `Hero`, `LangInit`                |
| `client:idle`    | Cuando el browser está en idle       | Todas las secciones estáticas con i18n      |
| `client:visible` | Cuando el elemento entra en viewport | (no usado aún, candidato para secciones)    |
| `client:only`    | Solo en cliente, sin SSR             | (no usado; rompe el SEO)                    |

**Por qué importa el split**: si todo fuera `client:load`, el browser descargaría y parsearía todo el JavaScript de React antes de pintar la página → LCP alto. Con `client:idle` las secciones estáticas esperan a que el navegador termine lo urgente y luego se hidratan sin bloquear el primer paint.

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

    <!-- Vercel Speed Insights: Core Web Vitals en producción -->
    <script>
      import { injectSpeedInsights } from "@vercel/speed-insights";
      injectSpeedInsights();
    </script>

    <!-- Animaciones de scroll: vanilla JS, cero overhead de React -->
    <script>
      // IntersectionObserver fuera de React → no aumenta ningún bundle
    </script>
  </body>
</html>
```

Nota importante: los `<script>` sin atributos en Astro son procesados por Vite y **se bundlean automáticamente** — resuelven imports de paquetes npm, se minifican y se cachean. No son lo mismo que un `<script>` inline tradicional.

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

Cada uno es un **island independiente** con su propio bundle JS:

| Componente          | Directiva       | Responsabilidad                                                  |
| ------------------- | --------------- | ---------------------------------------------------------------- |
| `LangInit`          | `client:load`   | Lee `localStorage.lang` y sincroniza el nanostore en el mount    |
| `Navbar`            | `client:load`   | Barra sticky con scroll spy, menú hamburguesa, click-outside     |
| `Hero`              | `client:load`   | Tipeo animado con `requestAnimationFrame`                        |
| `AboutSection`      | `client:idle`   | Sección "sobre mí" traducida                                     |
| `ProjectsSection`   | `client:idle`   | Grid de proyectos con filtros                                    |
| `SkillsSection`     | `client:idle`   | Barras de habilidades y chips                                    |
| `ExperienceSection` | `client:idle`   | Timeline de experiencia                                          |
| `EducationSection`  | `client:idle`   | Formación académica                                              |
| `ContactSection`    | `client:idle`   | Links de contacto                                                |
| `LanguageDropdown`  | (dentro Navbar) | Selector de idioma con glassmorphism y rotación del caret        |

> [!note] `PortfolioApp.tsx` fue eliminado
> En la primera versión del proyecto existía un único componente raíz `PortfolioApp` con `client:load` que envolvía todo con `<LanguageProvider>`. Esto convertía el portfolio en un SPA de React disfrazado. Se eliminó durante el refactoring a islands. Ver [[refactoring-islands-nanostores]].

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

### Implementación en `baseLayout.astro` (vanilla JS)

Originalmente estaba en `PortfolioApp.tsx` dentro de un `useEffect`, lo que forzaba hidratar React solo para escuchar scroll. Después del refactoring vive en un `<script>` de Astro en `baseLayout.astro` — es **vanilla JS** que Vite bundlea pero que no pertenece a ningún island de React:

```astro
<script>
  // Respeta prefers-reduced-motion (accesibilidad)
  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const setup = () => {
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
            // 4. Cuando el elemento es visible, añade .is-visible
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
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

## Nanostores (estado global)

### ¿Qué es y por qué no usamos React Context?

**Nanostores** es una librería de estado global **agnóstica de framework** con un bundle de solo ~300 bytes. Usa el patrón *atom* (inspirado en Jotai/Recoil): un átomo es un contenedor de valor con un API mínimo de `get()`/`set()`/`subscribe()`.

> [!warning] Por qué Context no servía aquí
> React Context requiere que todos los consumidores estén dentro de un `<Provider>`. Pero en arquitectura **Islands** cada sección es un island independiente sin padre React común. Si quisiéramos compartir idioma con Context, tendríamos que envolver todo en un solo island → volver al SPA → perder todo el beneficio de Astro.
>
> Nanostores resuelve esto porque el átomo **vive en el scope del módulo JavaScript**, no en un árbol React. Cualquier código (React o vanilla) que importe `$lang` lee y escribe el mismo valor.

### Implementación en `src/stores/languageStore.ts`

```ts
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { useCallback } from 'react';
import { translations, type Lang } from '../i18n/translations';

// 1. El átomo: un singleton a nivel de módulo
export const $lang = atom<Lang>('en');

export type { Lang };

// 2. Setter con side-effect (persiste en localStorage)
export function setLang(lang: Lang): void {
    $lang.set(lang);
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lang', lang);
    }
}

// 3. Hook con la misma API que el Context anterior — migración 1:1
export function useLanguage() {
    const lang = useStore($lang); // suscribe React al átomo

    const t = useCallback(
        (key: string) => translations[lang][key as keyof typeof translations['en']] || key,
        [lang]
    );

    return { lang, setLang, t };
}
```

### El componente invisible `LangInit`

Como el átomo se instancia con `'en'`, necesitamos sincronizar con `localStorage` al cargar la página. Esto lo hace un island diminuto que no renderiza nada:

```tsx
import { useEffect } from 'react';
import { setLang, type Lang } from '../stores/languageStore';

export default function LangInit() {
    useEffect(() => {
        const saved = localStorage.getItem('lang') as Lang;
        if (saved === 'en' || saved === 'es') {
            setLang(saved);
        }
    }, []);

    return null;
}
```

En `index.astro`: `<LangInit client:load />`. Se hidrata inmediato, lee localStorage, y todos los demás islands (aunque vivan en árboles React separados) reaccionan al cambio porque usan el mismo átomo `$lang`.

### Flujo de datos

```
src/stores/languageStore.ts
  └── export const $lang = atom('en')   ← singleton a nivel módulo
        ▲                ▲
        │ useStore($lang)│ useStore($lang)   ← cada island lee el mismo átomo
        │                │
 ┌──────┴──────┐  ┌──────┴──────┐  ┌──────┴──────┐
 │  Navbar     │  │  Hero       │  │  About...   │   ← islands INDEPENDIENTES
 │  (island 1) │  │  (island 2) │  │  (island 3) │
 └─────────────┘  └─────────────┘  └─────────────┘
        ▲
        │ click en "ES" → setLang('es')
        │ $lang.set('es') → todos los subscribers re-renderizan
```

> [!tip] Otras funciones de nanostores para explorar
> - `persistentAtom` — reemplaza `LangInit.tsx` + localStorage con una sola línea
> - `computed()` — átomos derivados (ej: `$isSpanish = computed($lang, l => l === 'es')`)
> - `map()` — para estado estructurado en lugar de primitivos
> - `task()` — para acciones asíncronas con tracking de loading

---

## localStorage

### ¿Qué es?

`localStorage` es una API del navegador que permite guardar pares clave-valor de forma **persistente** (sobrevive al cierre del tab y del navegador). Los datos no tienen fecha de expiración y solo son accesibles desde el mismo origen (dominio + puerto).

### Uso en el proyecto

El acceso a `localStorage` está centralizado en dos lugares:

```ts
// src/stores/languageStore.ts — escritura
export function setLang(lang: Lang): void {
    $lang.set(lang);
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lang', lang);
    }
}
```

```tsx
// src/components/LangInit.tsx — lectura única al cargar la página
useEffect(() => {
    const saved = localStorage.getItem('lang') as Lang;
    if (saved === 'en' || saved === 'es') {
        setLang(saved);
    }
}, []);
```

Resultado: si el usuario elige español, recarga la página y vuelve, sigue viendo el sitio en español.

> [!warning] SSR y localStorage
> `localStorage` solo existe en el navegador, no en Node.js (donde corre el servidor de Astro durante el build). Por eso hay un guard `typeof localStorage !== 'undefined'` y el acceso inicial está dentro de `useEffect`, que solo se ejecuta en el cliente después del render.

> [!tip] Mejora futura: `persistentAtom`
> `@nanostores/persistent` sincroniza automáticamente el átomo con `localStorage` y elimina la necesidad de `LangInit.tsx`. Queda como TODO.

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

### Estado actual del repo (Abril 2026)

Después del refactoring a Islands + nanostores + deploy en Vercel:

- `astro.config.mjs`, `package.json`, `package-lock.json` → Astro 5 + React 19 + Tailwind 3 + nanostores + Vercel Speed Insights
- `src/components/*.tsx` → cada sección es un island independiente
- `src/stores/languageStore.ts` → átomo de nanostore para i18n (reemplaza Context)
- `src/i18n/translations.ts` → single source of truth para textos EN/ES
- `src/components/LangInit.tsx` → island invisible que sincroniza `localStorage` → store
- `src/layouts/baseLayout.astro` → layout base con IntersectionObserver vanilla + Speed Insights
- `src/pages/index.astro` → 9 islands con mix de `client:load` y `client:idle`
- `src/styles/globals.css` → Tailwind + tokens CSS + animaciones
- `src/context/LanguageContext.tsx` → **huérfano** (sin uso), candidato a borrar
- `.tmp-figma/` → archivos de referencia de Figma (eliminados del tracking)

### Branching

- `main` → branch de producción; cada push dispara deploy automático en Vercel
- `dev` → branch de trabajo; se mergea a `main` con fast-forward cuando está listo

---

## Vercel y Speed Insights

### Vercel como hosting

[Vercel](https://vercel.com) es una plataforma de hosting especializada en sitios front-end y edge functions. Para un proyecto Astro puro funciona perfecto porque:

- CDN global con cacheo agresivo del HTML estático
- Preview deploys por cada PR (URL única por branch)
- HTTPS automático y gratuito
- Build automático al hacer `git push origin main`

No hay configuración específica de Astro — Vercel detecta el framework y corre `npm run build`, sirviendo `dist/` automáticamente.

### `@vercel/speed-insights`

Librería cliente que captura las **Core Web Vitals** reales de cada visitante y las envía al dashboard de Vercel. Instalación:

```bash
npm install @vercel/speed-insights
```

Uso en `baseLayout.astro`:

```astro
<script>
  import { injectSpeedInsights } from "@vercel/speed-insights";
  injectSpeedInsights();
</script>
```

> [!note] Por qué no usamos el componente oficial
> El paquete exporta un componente `SpeedInsights.astro` a través de un archivo `.ts` intermedio. El Astro Language Server no puede resolver esa cadena y marca un falso error. Usamos `injectSpeedInsights()` directamente — Vite bundlea el script igual y el comportamiento es idéntico.

### Métricas que mide

| Métrica  | Qué mide                                              | Bueno si |
| -------- | ----------------------------------------------------- | -------- |
| **LCP**  | Largest Contentful Paint: cuánto tarda el elemento más grande | < 2.5s |
| **INP**  | Interaction to Next Paint: respuesta a clics/teclado  | < 200ms  |
| **CLS**  | Cumulative Layout Shift: saltos de layout al cargar   | < 0.1    |
| **FCP**  | First Contentful Paint: primer pixel visible          | < 1.8s   |
| **TTFB** | Time to First Byte: velocidad del servidor            | < 800ms  |

La métrica agregada es **RES (Real Experience Score)** de 0–100. Sobre 90 = experiencia "great".

### Resultados actuales (primeras visitas)

| Dispositivo | RES  | Nota                                             |
| ----------- | ---- | ------------------------------------------------ |
| Mobile      | 93   | Great. INP 336ms es el único punto mejorable.    |
| Desktop     | 83   | Needs improvement. LCP 3s y INP 392ms a reducir. |

### Cosas a mejorar

1. **Reducir INP**: sustituir más `client:load` por `client:idle` donde la interactividad no sea crítica
2. **Mejorar LCP**: convertir secciones estáticas a `.astro` puro (sin hidratación de React)
3. **Precargar fuentes**: añadir `<link rel="preload" as="font">` para las fuentes de `<h1>` del hero
4. **Optimizar imágenes**: usar `<Image />` de Astro con `format="avif"` + `loading="lazy"`
5. **Content Collections**: mover los datos de proyectos de TSX a markdown (mejora DX y permite lazy-loading)

---

## Cómo se conecta todo

### Pipeline completo: del código al navegador

```
1. npm run dev / npm run build  (o git push → Vercel dispara build)
        │
        ▼
2. Astro lee src/pages/index.astro
        │  ↪ importa baseLayout.astro
        │  ↪ importa cada island (LangInit, Navbar, Hero, ...Section)
        │
        ▼
3. Astro procesa baseLayout.astro
        │  ↪ genera el <html>, <head>, <body>
        │  ↪ importa globals.css → pasa por PostCSS
        │  ↪ bundlea los <script> inline (IntersectionObserver, SpeedInsights)
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
5. Astro compila cada island por separado
        │  ↪ TypeScript transpila TSX → JavaScript
        │  ↪ Cada island produce SU PROPIO bundle (code-splitting)
        │  ↪ nanostores queda en un chunk compartido
        │
        ▼
6. Output en dist/
        │  ↪ index.html (HTML estático con el markup inicial de los 9 islands)
        │  ↪ _astro/globals.css (CSS compilado)
        │  ↪ _astro/Navbar.*.js, Hero.*.js, LangInit.*.js (client:load)
        │  ↪ _astro/AboutSection.*.js, ...Section.*.js (client:idle)
        │  ↪ _astro/languageStore.*.js (chunk compartido por todos)
        │  ↪ _astro/client.*.js (runtime de React compartido)
        │
        ▼
7. Vercel sube dist/ a su CDN global
        │  ↪ HTTPS + invalidación automática del caché
        │
        ▼
8. Navegador recibe y procesa
        │  ↪ HTML renderiza la estructura (navbar, hero, secciones) — LCP rápido
        │  ↪ CSS aplica estilos y tema oscuro — FCP rápido
        │  ↪ Scripts no-render (Speed Insights, IntersectionObserver) se cargan
        │  ↪ React hidrata los islands con client:load (Navbar, Hero, LangInit)
        │  ↪ LangInit lee localStorage y hace $lang.set(saved)
        │  ↪ Hero inicia el efecto de tipeo
        │  ↪ Navbar activa el scroll spy
        │  ↪ En el próximo idle del browser → hidrata secciones client:idle
        │  ↪ Speed Insights empieza a medir CWV y las envía a Vercel
```

### Flujo de cambio de idioma (con nanostores)

```
Usuario hace clic en "ES" en el LanguageDropdown (dentro del island Navbar)
        │
        ▼
setLang("es")
        │  ↪ $lang.set('es')
        │  ↪ localStorage.setItem('lang', 'es')
        │
        ▼
Nanostores notifica a todos los subscribers (useStore) — cruza los islands
        │  ↪ island Navbar → links en español
        │  ↪ island Hero → subtitle en español → reinicia el typeo
        │  ↪ island AboutSection, ProjectsSection, ... → textos en español
        │
        ▼
Si el usuario recarga → LangInit useEffect([]) lee localStorage → setLang('es')
        │  ↪ Esto ocurre DESPUÉS del SSR en inglés → hay un flash breve
        │  ↪ Candidato a mejorar con persistentAtom o cookie-based SSR
```

---

> [!success] Resumen ejecutivo
> Este portfolio combina **Astro 5** con arquitectura real de **Islands** (cada sección es un bundle JS separado) + **React 19** solo donde hace falta interactividad, escrito en **TypeScript**. El estado global de i18n usa **nanostores** en lugar de React Context para funcionar entre islands independientes. Los estilos usan **Tailwind 3** sobre un sistema de **CSS Custom Properties**. Las animaciones de scroll son **vanilla JS** fuera de React (`IntersectionObserver` directo en `baseLayout.astro`). Deploy automático en **Vercel** con **Speed Insights** midiendo Core Web Vitals reales. **PostCSS + Autoprefixer** aseguran compatibilidad cross-browser. Todo el proyecto se lintea con **ESLint 9** y se gestiona con **npm** y **Git**.
>
> La filosofía del proyecto es **"exploit the stack"**: priorizar la adopción de las características avanzadas de cada tecnología sobre la simplicidad. El resultado: ~3 KB de JS inicial en lugar del bundle de React completo, y Real Experience Score de 93 en mobile.
