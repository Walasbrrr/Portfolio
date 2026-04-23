# Refactoring: Islands Architecture + Nanostores

> [!success] Sesión de refactoring — Abril 2026
> Migración completa de un único island React a arquitectura real de Astro Islands, reemplazando React Context con nanostores y eliminando JavaScript innecesario del critical path.

#astro #nanostores #refactoring #islands #performance #arquitectura

---

## Por qué era un problema

Antes del refactoring, `index.astro` era básicamente esto:

```astro
<PortfolioApp client:load />
```

Y `PortfolioApp.tsx` era:

```tsx
export default function PortfolioApp() {
    // IntersectionObserver en React (innecesario)
    useEffect(() => { ... }, []);

    return (
        <LanguageProvider>
            <Navbar />
            <Hero />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ExperienceSection />
            <EducationSection />
            <ContactSection />
        </LanguageProvider>
    );
}
```

**El problema arquitectónico**: Astro fue diseñado para la arquitectura Islands — enviar el mínimo JavaScript posible al navegador, convirtiendo en islands solo las partes interactivas. Tener `<PortfolioApp client:load />` convierte Astro en un SPA de React disfrazado. El `<LanguageProvider>` fuerza que TODO sea un único árbol React, lo que significa que todo se hidrata de golpe, aunque el 80% del contenido sea texto estático.

### Comparativa antes/después

| Aspecto                 | Antes                                | Después                          |
| ----------------------- | ------------------------------------ | -------------------------------- |
| Islands                 | 1 (todo)                             | 9 separados                      |
| Hidratación             | `client:load` todo                   | `client:load` solo Navbar + Hero |
| IntersectionObserver    | En React (JS)                        | Vanilla JS (cero overhead)       |
| Estado compartido       | React Context + Provider             | Nanostore singleton              |
| Dependencia de Provider | Todo necesitaba `<LanguageProvider>` | Ninguna, átomo de módulo         |

---

## Nanostores — La pieza clave

### ¿Qué es nanostores?

Nanostores es una librería de estado **framework-agnostic** de solo 265 bytes (gzip). Funciona con React, Preact, Vue, Svelte, Solid, y vanilla JS. La idea central: el estado vive en un módulo JavaScript, no en un árbol de componentes.

### El problema que resuelve aquí

React Context necesita un **Provider** que envuelva a todos los consumers. Esto encadena todos los componentes en un único árbol React:

```
<LanguageProvider>         ← árbol React único
  <Navbar />              ← todos son consumers del mismo contexto
  <Hero />
  <AboutSection />
  ...
</LanguageProvider>
```

Si quieres que `<AboutSection />` sepa el idioma actual, **debe** estar dentro del Provider. Eso significa que todos los islands deben ser parte del mismo árbol. El resultado: un único island gigante.

Nanostores rompe este requisito porque el estado es un singleton de módulo:

```ts
// languageStore.ts
export const $lang = atom<Lang>('en');
```

Cualquier componente que importe `$lang` comparte la **misma instancia** del átomo, sin importar si están en el mismo árbol de React o no. Dos islands completamente separados pueden leer y escribir el mismo átomo porque están importando el mismo módulo.

### Cómo funciona en JavaScript

El patrón de singleton de módulo es fundamental en JS/Node. Cuando importas:

```ts
// Componente A (island 1)
import { $lang } from '../stores/languageStore';

// Componente B (island 2 completamente separado)
import { $lang } from '../stores/languageStore';
```

Node.js (y el bundler en el cliente) **cachea el módulo**. La segunda importación devuelve exactamente la misma referencia de objeto que la primera. No hay dos instancias de `$lang`, hay una sola. Esto es el Module Singleton Pattern.

### Tipos de átomos en nanostores

```ts
import { atom, computed, map, task } from 'nanostores';

// atom: valor primitivo reactivo
const $count = atom(0);
$count.set(1);
$count.get(); // 1

// computed: derivado de otros átomos, se recalcula automáticamente
const $doubled = computed($count, n => n * 2);

// map: objeto reactivo (como useState para objetos)
const $user = map({ name: 'Walen', lang: 'en' });
$user.setKey('lang', 'es'); // actualiza solo esa clave

// task: async con estado (loading, error, data)
const fetchUser = task(async () => {
    const data = await fetch('/api/user').then(r => r.json());
    $user.set(data);
});
```

### El store de este proyecto

```ts
// src/stores/languageStore.ts
import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';
import { useCallback } from 'react';
import { translations, type Lang } from '../i18n/translations';

export const $lang = atom<Lang>('en');

export function setLang(lang: Lang): void {
    $lang.set(lang);
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('lang', lang);
    }
}

export function useLanguage() {
    const lang = useStore($lang);           // suscripción reactiva al átomo
    const t = useCallback(
        (key: string) => translations[lang][key as keyof typeof translations['en']] || key,
        [lang]
    );
    return { lang, setLang, t };
}
```

**`useStore($lang)`** es el binding de `@nanostores/react`. Suscribe el componente al átomo: cada vez que `$lang.set(...)` se llama desde cualquier lugar, todos los componentes que usan `useStore($lang)` se re-renderizan automáticamente. Es exactamente el mismo comportamiento que `useContext`, pero sin Provider.

---

## La nueva arquitectura de islands

### `index.astro` refactorizado

```astro
---
import BaseLayout from "../layouts/baseLayout.astro";
import LangInit      from "../components/LangInit";
import Navbar        from "../components/Navbar";
import Hero          from "../components/Hero";
import AboutSection      from "../components/AboutSection";
import ProjectsSection   from "../components/ProjectsSection";
import SkillsSection     from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import EducationSection  from "../components/EducationSection";
import ContactSection    from "../components/ContactSection";
---

<BaseLayout>
  <LangInit      client:load />   ← lee localStorage, renderiza null
  <Navbar        client:load />   ← scroll spy + menú (JS inmediato)
  <Hero          client:load />   ← tipeo animado  (JS inmediato)
  <AboutSection      client:idle />
  <ProjectsSection   client:idle />
  <SkillsSection     client:idle />
  <ExperienceSection client:idle />
  <EducationSection  client:idle />
  <ContactSection    client:idle />
</BaseLayout>
```

### Cada directiva `client:*` explicada

| Directiva | Cuándo hidrata | Por qué aquí |
|-----------|---------------|--------------|
| `client:load` | Inmediatamente al cargar el JS | Navbar y Hero necesitan estar listos al primer frame visible |
| `client:idle` | Cuando el thread principal esté libre (`requestIdleCallback`) | Secciones de contenido no necesitan responder en el primer segundo |
| `client:visible` | Cuando el elemento entra en el viewport | Alternativa para islands que están muy abajo en la página |
| `client:media="(max-width: 600px)"` | Solo si el media query aplica | Útil para componentes solo de móvil |
| `client:only="react"` | Solo cliente, sin SSR | Para componentes que usan APIs del navegador en render |

### El island invisible: `LangInit`

```tsx
// src/components/LangInit.tsx
import { useEffect } from 'react';
import { setLang, type Lang } from '../stores/languageStore';

export default function LangInit() {
    useEffect(() => {
        const saved = localStorage.getItem('lang') as Lang;
        if (saved === 'en' || saved === 'es') {
            setLang(saved);
        }
    }, []);

    return null; // no renderiza absolutamente nada
}
```

Es un island que existe solo para ejecutar un efecto secundario. `return null` significa que no produce HTML. Su único trabajo: leer `localStorage` al montar y sincronizar el nanostore. Como usa `client:load`, se ejecuta antes que los islands con `client:idle`.

### Orden de ejecución garantizado

```
1. HTML llega al navegador (SSR en inglés — valor inicial del átomo)
2. JS bundle descarga
3. client:load hidrata: LangInit → Navbar → Hero
   └── LangInit.useEffect() → setLang('es') → $lang.set('es')
   └── Navbar y Hero se re-renderizan en español
4. requestIdleCallback: hidrata AboutSection, ProjectsSection...
   └── Leen $lang que ya es 'es' → se montan directo en español
```

### La nota sobre hydration mismatch

Cuando el idioma guardado es español, existe un breve flash de inglés → español en Navbar y Hero (los `client:load`). Esto es un **hydration mismatch**: el HTML del SSR (inglés) difiere del primer render de React en el cliente (español, después de que LangInit corre).

React detecta esto, muestra un warning en desarrollo, y hace un re-render síncrono con el contenido correcto. En producción el flash es imperceptible (< 50ms). Para eliminarlo completamente se necesitaría un `<script is:inline>` en el `<head>` que lee localStorage antes de que React cargue y pone un `data-lang` en `<html>`.

---

## IntersectionObserver: sacado de React

### Por qué moverlo fue correcto

El IntersectionObserver original estaba en `PortfolioApp.tsx` dentro de un `useEffect`. Eso significa que:

1. Requería que React cargara
2. Requería que `PortfolioApp` hidratara
3. Agregaba JS al bundle de React

Las animaciones de scroll son **comportamiento de presentación**, no estado de aplicación. No necesitan React para nada.

### La implementación actual (vanilla JS)

```html
<!-- baseLayout.astro -->
<script>
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
        const setup = () => {
            const targets = Array.from(
                document.querySelectorAll('.section-head, .card, .hero-badge, .hero-actions, .hero-social')
            );

            targets.forEach(el => el.classList.add('reveal'));

            const io = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-visible');
                            io.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
            );

            targets.forEach(el => io.observe(el));
        };

        if (document.readyState === 'complete') {
            setup();
        } else {
            window.addEventListener('load', setup, { once: true });
        }
    }
</script>
```

Un `<script>` en Astro sin `is:inline` se **bundlea por Astro** (Vite lo procesa, hace tree-shaking, minifica). Se carga como módulo ES (type="module") con `defer` implícito — no bloquea el render.

---

## El error que apareció y por qué

El error fue:
```
Error: useLanguage debe usarse dentro de un LanguageProvider
  at Navbar
```

**Causa**: El reemplazo automático de imports buscaba la cadena exacta `from "../context/LanguageContext"` con comillas dobles. `Navbar.tsx` y `LanguageDropdown.tsx` usaban comillas simples (`'`). El script no hizo match, los archivos quedaron con el import viejo, y cuando Astro intentó renderizarlos en el servidor (SSR), `useLanguage` del viejo contexto lanzó el error porque no había `<LanguageProvider>` en ningún lugar.

**Lección**: En refactorings que afectan muchos archivos, los reemplazos automáticos deben verificarse con `grep` antes de dar por hecho que funcionaron.

---

## La filosofía: explotar las tecnologías

Este portfolio tiene una orientación clara: **no se usa Astro para simplificar, se usa para demostrar dominio de la herramienta**. Eso define todas las decisiones:

### Lo que ya estamos usando correctamente

- **Astro Islands** con directivas específicas por responsabilidad
- **Nanostores** como estado cross-island sin Provider
- **Vanilla JS** para comportamiento que no necesita framework
- **CSS layers** (`@layer base/components/utilities`) para cascada predecible
- **CSS Custom Properties** como design tokens dinámicos
- **TypeScript** con tipos derivados (`keyof typeof`, type union)
- **PostCSS + Autoprefixer** en el pipeline de CSS

### Tecnologías que aún se pueden explotar más

#### Astro
- **View Transitions API** (`<ViewTransitions />`) — animaciones nativas entre páginas o secciones, sin JavaScript extra
- **Content Collections** — para los proyectos y experiencia definidos en Markdown/YAML con schema Zod, en lugar de hardcodearlos en TSX
- **Middleware** — para analytics, headers de seguridad, o feature flags por request
- **Image optimization** (`<Image />` de Astro) — WebP automático, lazy loading, dimension hints

#### React 19
- **`use()` hook** — consume Promises y Context directamente, sin `useEffect`
- **Server Actions** (si se habilita SSR) — formulario de contacto sin API separada
- **`useOptimistic`** — updates optimistas en UI sin esperar respuesta del servidor

#### TypeScript (modo estricto)
- `"strict": true` en `tsconfig.json` — el proyecto actualmente tiene `"strict": false`
- **Template literal types** — `type SectionId = 'home' | 'skills' | 'projects' | 'contact'`
- **Conditional types** — `type TranslationKey = keyof typeof translations['en']`
- **`satisfies` operator** — validar forma de objetos sin perder inferencia

#### Nanostores
- **`computed`** — átomos derivados: `const $isSpanish = computed($lang, l => l === 'es')`
- **`task`** — para fetch de datos con estado loading/error automático
- **`persistentAtom`** (de `@nanostores/persistent`) — localStorage integrado sin el `LangInit` manual

#### CSS
- **`@starting-style`** — animaciones de entrada nativas en CSS, sin JS (Chrome 117+)
- **Scroll-driven animations** (`animation-timeline: scroll()`) — progress bars y efectos de parallax con CSS puro
- **Container queries** (`@container`) — componentes responsive a su contenedor, no al viewport
- **CSS `color-mix()`** — ya en uso, pero se puede explotar más para theming dinámico

#### Web APIs nativas
- **Web Animations API** (`element.animate(...)`) — animaciones imperativas más performantes que CSS en casos complejos
- **Resize Observer** — detectar cambios de tamaño de elementos para layouts adaptativos
- **Performance API** (`performance.mark`, `performance.measure`) — medir tiempos reales de hidratación

---

> [!tip] Principio de diseño de este portfolio
> Cada tecnología que aparece en el stack debe estar siendo usada **en serio**, no nominalmente. Si Astro está, el código debe demostrar por qué Astro y no Vite+React a secas. Si TypeScript está, los tipos deben ser más que `any` y `string`. Si nanostores está, debe haber un motivo real por el que Context no bastaba.

---

## Estado actual del stack (post-refactoring)

```
src/
  i18n/
    translations.ts         ← fuente única de textos (sin React)
  stores/
    languageStore.ts        ← nanostore $lang + hook useLanguage
  components/
    LangInit.tsx            ← island client:load, renderiza null
    Navbar.tsx              ← client:load, scroll spy + menú
    Hero.tsx                ← client:load, tipeo animado
    LanguageDropdown.tsx    ← dentro de Navbar, cierra al click afuera
    AboutSection.tsx        ← client:idle
    ProjectsSection.tsx     ← client:idle, tiene filter state
    SkillsSection.tsx       ← client:idle
    ExperienceSection.tsx   ← client:idle
    EducationSection.tsx    ← client:idle
    ContactSection.tsx      ← client:idle
    PortfolioApp.tsx        ← obsoleto, huérfano (no importado)
  layouts/
    baseLayout.astro        ← HTML base + IntersectionObserver vanilla
  pages/
    index.astro             ← 9 islands individuales
  context/
    LanguageContext.tsx     ← obsoleto, reemplazado por nanostores
  styles/
    globals.css             ← Tailwind + CSS layers + design tokens
```
