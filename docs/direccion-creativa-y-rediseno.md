# Dirección Creativa y Rediseño del Portfolio

Documento de registro para el rediseño del portfolio en la rama `redesign/layered-systems`.

---

## 1. El punto de inflexión: Superar la "estética IA"

Durante la primera iteración del rediseño se identificó un problema crítico en las bases creativas:
* **El síntoma:** Fondos con gradientes borrosos (*mesh gradients* azules/morados con `blur(14px)` y animación `drift`), textos con degradados multicolores (`.animated-gradient`), orbes brillantes y botones de plantilla genérica.
* **El diagnóstico:** Es la estética cliché de las herramientas y plantillas generadas por IA de 2023–2024. Se siente genérica, artificial y sin criterio de autor.
* **La regla establecida:** Erradicar todo gradiente decorativo innecesario, brillos difusos y efectos de "humo digital". Reemplazarlos por principios de diseño gráfico, industrial y tipográfico real.

---

## 2. Direcciones Creativas Evaluadas

### Opción A: "Precisión Industrial & Hardware" (Oscuro mate, técnico y táctil)
* **Inspiración:** *Teenage Engineering*, *Linear*, *Ghostty*, consolas de ingeniería y hardware de precisión.
* **Superficies:** Carbono mate / Ink sólido (`#111215` o `#141311`), sin halos morados ni gradientes de fondo.
* **Estructura:** Líneas de 1px milimétricas (`#24262C`), retícula visible funcional, tarjetas sin bordes de neón.
* **Tipografía:** `Geist` para lectura limpia, `Geist Mono` para metadatos y números tabulares.
* **Acento:** **Ember industrial (`#F0542B`)** o blanco hueso de alto contraste.
* **Interacciones:** Físicas, táctiles y secas (botones con biseles mecánicos, interruptores de estado, cero blur).

### Opción B: "Editorial Craft / The Printed System" (La dualidad Cream & Ink)
* **Inspiración:** *Shopify Editions (Winter '26)*, diseño editorial suizo, el espécimen de tokens de ComfyByte (`tokens.css`).
* **Superficies:** Alternancia intencional:
  * **Cream suave (`#F3EEE5`):** Tramos de lectura pausada tipo papel impreso.
  * **Ink profundo (`#141311`):** Escenas de impacto para los sistemas y proyectos técnicos.
* **Tipografía:** `Fraunces` con eje variable `SOFT` para titulares con peso editorial + `Geist Mono` para etiquetas técnicas.
* **Estructura:** Grilla de 12 columnas visible al 6% en momentos clave, márgenes amplios y ritmo editorial (*calma → impacto*).
* **Muestra en local:** Accesible en `http://localhost:4005/specimen.html`.

---

## 3. Estado de la Rama `redesign/layered-systems`

Trabajo implementado y commiteado en el commit `bdc71dd`:

| Capa | Componente | Descripción |
|---|---|---|
| **Capa 0** | `ReactiveCanvas.tsx` | Malla interactiva 2D con física elástica (en proceso de ajuste según la base elegida). |
| **Capa 1** | `Navbar.tsx` | Micro-HUD superior con radar verde pulsante, disponibilidad para roles y reloj en tiempo real sincronizado con New Jersey (`America/New_York`). |
| **Capa 1 & 2** | `Hero.tsx` | Nodo técnico `[SYS:00]`, posicionamiento como **Systems Builder & Software Engineer • Founder @ ComfyByte**, chips de stack técnico y contador en vivo de repos de GitHub. |
| **Capa 2** | `ProjectsSection.tsx` | Tarjetas con efecto spotlight y **Dual-Layer Inspection** (pestaña de *Resumen Producto* vs. *Radiografía Técnica de Arquitectura*). |
| **Capa 3** | `CommandPalette.tsx` | Menú de comandos (`⌘K` / `Ctrl+K`) accesible por teclado para navegación rápida, cambio de idioma (EN/ES) y copia de email al portapapeles. |
| **i18n** | `translations.ts` | Traducciones bilingües actualizadas con el nuevo tono de ingeniería y los 4 proyectos reales. |

---

## 4. Los 4 Proyectos Canónicos del Portfolio

1. **Gestion Truck Platform**
   * *Stack:* Java, Spring Boot, PostgreSQL, React, TypeScript, Docker.
   * *Enfoque:* SaaS de flotas y logística, APIs REST, transacciones ACID y telemetría de conductores.
2. **ComfyByte Studio**
   * *Stack:* Next.js, TypeScript, Tailwind CSS, Design Tokens, Editorial UI.
   * *Enfoque:* Estudio de software independiente, dirección de arte, tokens y web de alto rendimiento.
3. **V&C Soluciones Financieras**
   * *Stack:* React, TypeScript, Tailwind CSS, Módulos Financieros, Seguridad.
   * *Enfoque:* Plataforma fintech dominicana, calendario modular de cuotas y bases de privacidad/seguridad.
4. **WalenOS & Systems Homelab**
   * *Stack:* Linux (Arch/Debian), Obsidian, Docker, Shell Scripting, Self-Hosting.
   * *Enfoque:* Sistema operativo de conocimiento, servidores homelab, automatización y dotfiles.

---

## 5. Próximos pasos acordados

- [ ] Definir entre **Opción A (Industrial/Hardware)** u **Opción B (Editorial Cream/Ink)**.
- [ ] Purgar de `src/styles/globals.css` los estilos heredados con look IA (`@keyframes drift`, gradientes radiales de fondo con `blur(14px)`, clases `.animated-gradient`).
- [ ] Conectar la paleta de tokens definitiva (`tokens.css`) a los componentes principales.
- [ ] Validación de compilación: `pnpm typecheck` y `pnpm build`.
