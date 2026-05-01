# Review — Correcciones y hardening del portfolio

Documento para **code review**: qué se corrigió, por qué, y qué revisar tú mismo en local o en el deploy.

---

## Resumen

Se eliminó código muerto y duplicado, se unificó i18n, se robustecieron formulario/navbar/hero y se redujo JS innecesario. El objetivo era **menos sorpresas en producción** y **menos confusión al mantener el proyecto**.

---

## Bugs y problemas corregidos

### Duplicación y archivos sin uso

| Qué | Acción |
|-----|--------|
| `src/context/LanguageContext.tsx` | **Eliminado.** Nadie lo importaba; duplicaba `translations` y desincronizaba textos respecto a `languageStore` + `i18n/translations.ts`. |
| `backup.txt` | **Eliminado.** Copia HTML antigua, no usada en el build. |
| `public/style.css` (si existía en tu rama) | Legacy; el sitio usa solo `src/styles/globals.css`. |
| Segundo `IntersectionObserver` en `index.astro` | **Eliminado.** Ya hay animaciones de reveal en `baseLayout.astro`; dos observers duplicaban trabajo y podían competir. |

### Navbar

| Qué | Acción |
|-----|--------|
| Cierre fuera del menú / idioma solo con `mousedown` | **`pointerdown`** en Navbar y `LanguageDropdown` para mejor comportamiento táctil. |
| Scroll spy frágil (secciones / “home”) | **`IntersectionObserver`** con margen vertical + regla al llegar al **final de página** (`nearBottom`). |
| “Download CV” con `href="#"` | **`mailto:`** con asunto/cuerpo (Hero + Navbar) hasta que subas un PDF real. |
| **Nombre truncado** (`WALEN I CAL…`) | En `≤1050px`, `.brand-text` tenía `flex: 1 1 0` + `ellipsis`. Ahora **`flex: 0 1 auto`**, **`white-space: normal`** y ancho máximo razonable para que **“Walen I Calderon”** se vea completo (en 1–2 líneas si hace falta). En desktop: **`flex-shrink: 0`** y sin ellipsis forzado. |

### Proyectos (`ProjectsSection`)

| Qué | Acción |
|-----|--------|
| `onClick={(e) => e.stopPropagation()}` en enlaces | **Quitado.** El `article` no tenía listener; era ruido. |

### Hero / GitHub

| Qué | Acción |
|-----|--------|
| Límite de la API de GitHub (60 req/h) | **Caché en `localStorage`** (`gh_public_repos_v1`, TTL ~6 h). No se lee caché en el estado inicial de React (evita mismatch de hidratación). |
| Estadística “Satisfaction / 100%” poco defendible | Sustituido por **“Stack focus” / “Java • Web”** (`heroStatsStackLabel` / `heroStatsStackValue`). |

### Contacto (`ContactSection`)

| Qué | Acción |
|-----|--------|
| Spam bots | Campo honeypot **`botcheck`** (oculto, `sr-only`, Web3Forms). |
| Campos sin límites | **`maxLength`** en nombre/mensaje; **`pattern`** en email. |
| Fetch colgado | **`AbortController`** + timeout (~18 s). |

### Skills

| Qué | Acción |
|-----|--------|
| Dependencia `framer-motion` solo para barras | **Eliminada.** Animación con **CSS** (`.skill-bar-fill`, `@keyframes`, `prefers-reduced-motion`). |

### i18n y `<html lang>`

| Qué | Acción |
|-----|--------|
| Traducciones huérfanas / mezcla de fuentes | **`translations.ts`** depurado a claves usadas; una sola fuente de verdad. |
| `lang="en"` fijo mientras el contenido cambia a ES | En `baseLayout.astro`, script cliente: **`document.documentElement.lang`** al cargar y en cada cambio de `$lang`. |

### CSS

| Qué | Acción |
|-----|--------|
| Reglas no usadas | Eliminados bloques como **`.stat-list` / `.stat-item`**, **`.project-card-actions` / `.project-card-cta`**, **`.reveal-up`** (el script asociado ya no existía). |
| Selector con **`.hero-description`** inexistente | Quitado de la lista de selectores de tipografía. |
| Bug de sintaxis `.pill` duplicado | Corregido en `globals.css`. |

### Proyecto npm

| Qué | Acción |
|-----|--------|
| `"main": "scripts.js"` inexistente | **Quitado**; añadido **`"private": true`**. |
| ESLint: `particlesJS` global | **Quitado** (no hay `particles.js` en el repo). |

---

## Cómo validar en tu review

1. **`npm install`** (si no lo hiciste tras quitar `framer-motion`).
2. **`npm run build`** y **`npm run preview`**.
3. **Navbar:** en ventana estrecha (~≤1050px), el nombre debe verse **completo** (puede ocupar dos líneas).
4. **Idioma ES/EN:** título `data-i18n`, secciones Astro y atributo **`lang`** del documento.
5. **Formulario:** envío ok, timeout si cortas red, honeypot sin tocar.
6. **Hero:** número de repos tras recarga (caché) y tras esperar TTL o borrar `localStorage`.

---

## Pendientes opcionales (no bloquean)

- Sustituir **mailto** de CV por **`/cv.pdf`** en `public/` cuando lo tengas.
- **`npm audit`** / actualizar dependencias con vulnerabilidades moderadas.
- Meta **Open Graph** / **Twitter cards** en `baseLayout.astro` para al compartir el enlace.

---

## Archivos que tocaste más a menudo

- `src/components/Navbar.tsx`, `Hero.tsx`, `ContactSection.tsx`, `SkillsSection.tsx`, `ProjectsSection.tsx`
- `src/layouts/baseLayout.astro`, `src/pages/index.astro`
- `src/i18n/translations.ts`, `src/styles/globals.css`
- `package.json`, `eslint.config.mjs`

---

*Última actualización: alineado con el estado del repo tras el hardening descrito arriba.*
