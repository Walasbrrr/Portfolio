# Rediseño de la Sección de Proyectos (ProjectsSection)

**Fecha:** 24 de Abril de 2026
**Componente Modificado:** `src/components/ProjectsSection.tsx`

---

## 1. ¿Para qué se hizo? (El Propósito)
El objetivo principal era mejorar el atractivo visual y la experiencia de usuario (UX) del portafolio. Las tarjetas de proyectos anteriores eran estáticas y no mostraban previsualizaciones visuales de los trabajos. Se buscaba implementar un diseño premium, moderno e interactivo (inspirado en Shadcn UI) que captara la atención del usuario inmediatamente, permitiendo además acceso rápido a los enlaces de **Web** y **GitHub**.

## 2. ¿Por qué se hizo así? (La Justificación Técnica)

- **Mantenerse en `.tsx` (React):** Dado que la sección de proyectos posee lógica de filtrado dinámico (estado a través de `useState` para filtrar por "All", "Java", "Web", "Academic"), la arquitectura de Astro (Islands Architecture) dicta que este componente **debe** permanecer en React. Si fuera puramente estático, se habría convertido a `.astro`.
- **Uso de Tailwind CSS:** Se optó por usar las clases utilitarias de Tailwind en lugar de añadir más clases al archivo `style.css`. Tailwind permite iterar rápidamente el diseño y manejar efectos de hover y diseño responsivo (`sm:h-60`, `group-hover:scale-110`) directamente en la estructura, asegurando que el diseño coincida exactamente con la inspiración solicitada.
- **Reutilización de FontAwesome:** En lugar de instalar dependencias externas como `lucide-react`, se analizó el código existente y se descubrió que el proyecto ya incluía **FontAwesome**. Para mantener el *bundle* ligero y el proyecto optimizado, se reutilizaron esos iconos.

## 3. ¿Cómo se hizo? (La Implementación)

1. **Estructura de Datos:** Se amplió el arreglo `projects` dentro de `ProjectsSection.tsx` para incluir tres nuevas propiedades por proyecto:
   - `image`: URL de la imagen del proyecto (actualmente usando placeholders de *placehold.co*).
   - `github`: Enlace al repositorio.
   - `web`: Enlace a la demostración en vivo (si aplica).

2. **Estructuración de la UI (Card):**
   - Se reemplazó la etiqueta antigua por un `<article>` estilizado con Tailwind CSS.
   - Se configuró el contenedor principal como `group` para poder aplicar animaciones simultáneas a sus hijos al hacer *hover*.
   - Se añadió un contenedor de imagen (`overflow-hidden`) que contiene la etiqueta `<img>`. Esta imagen tiene las clases `group-hover:scale-110` y `group-hover:brightness-50` para crear el efecto de zoom y oscurecimiento al pasar el ratón.

3. **Integración de Enlaces (Links):**
   - **Sobre la imagen:** Se crearon botones con estilo *glassmorphism* (cristal) ocultos por defecto (`opacity-0`), que se revelan suavemente al interactuar con la tarjeta (`group-hover:opacity-100`).
   - **Debajo del contenido:** Se añadió una sección en la parte inferior (alineada dinámicamente con `mt-auto`) que contiene enlaces textuales acompañados de sus respectivos iconos (`<i className="fab fa-github"></i>` y `<i className="fas fa-external-link-alt"></i>`), cumpliendo la directiva de colocar los enlaces debajo si es un proyecto web.
