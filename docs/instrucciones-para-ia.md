# Cómo pedirle cambios a una IA sobre este repo (plantilla + flujo de trabajo)

Este documento es una **base** que puedes copiar, pegar y completar en Cursor, ChatGPT u otra IA. Tú revisas el diff, corres `npm run build` y apruebas el merge.

---

## ¿Es correcto trabajar así?

**Sí**, siempre que mantengas estas reglas:

1. **La IA propone, tú validas.** Nadie sustituye tu criterio en copys legales, datos personales o claims laborales (“años de experiencia”, métricas).
2. **Acota el alcance.** Una petición = una feature o un bugfix evita refactors gigantes difíciles de revisar.
3. **Pide artefactos verificables:** archivos concretos, comandos (`build`, `lint`), y que no toque lo que no pediste.
4. **No subas secretos** (API keys, tokens). Usa variables de entorno y `.env` en `.gitignore`.
5. **Revisa siempre** diferencias en UI (móvil + desktop) y accesibilidad básica (teclado, contraste).

No es “hacer trampa”: es **pair programming acelerado** con revisión humana obligatoria.

---

## Plantilla corta (copiar y pegar)

```text
Contexto del repo:
- Astro + React islands, Tailwind + CSS en src/styles/globals.css
- i18n: src/i18n/translations.ts + useLanguage() / nanostores
- No crear archivos .md nuevos salvo que lo pida explícitamente.

Tarea:
[Describe QUÉ quieres, en una frase clara]

Alcance (solo esto):
- [Lista numerada de cambios permitidos]

Restricciones:
- No eliminar ni renombrar claves de i18n que uses otros componentes sin actualizar referencias.
- Mantener el estilo visual actual (dark, acentos #56C2FF).
- Componentes: TypeScript, sin any innecesario.

Entrega:
- Lista de archivos tocados + breve resumen por archivo.
- Si añades textos, EN y ES en translations.ts.
- Confirmar que `npm run build` tiene sentido (o indicar si hace falta comando extra).
```

---

## Plantilla estilo “instrucciones ChatGPT” (más detallada)

Usa este bloque cuando quieras un resultado más estable y menos creativo.

```text
Rol: Actúa como desarrollador frontend (Astro, React, TypeScript, Tailwind).

Objetivo:
[Un párrafo: problema + resultado esperado]

Reglas de salida:
1. Responde primero con un plan en 3–5 viñetas, luego el código o los diffs.
2. Cambia solo los archivos necesarios; no refactorices fuera del alcance.
3. Si falta información crítica, haz como máximo UNA pregunta; si no, asume lo razonable y documenta la suposición.
4. Incluye strings bilingües (en/es) en translations.ts cuando afecte al usuario.
5. Prioriza accesibilidad: HTML semántico, labels, aria donde corresponda, sin depender solo del hover para información esencial.

Criterios de hecho (checklist):
- [ ] Build estático sin errores
- [ ] Sin regresiones obvias en móvil
- [ ] i18n coherente en ambos idiomas

Archivos probables a tocar:
[Lista opcional: ej. src/components/ProjectsSection.tsx]

Código existente relevante (opcional):
[Pega extractos cortos o nombres de componentes]
```

---

## Qué **no** pongas en el prompt (para evitar ruido)

- No pegues el `package-lock` entero.
- No pidas “mejora todo el portfolio” sin lista: la IA dispersará el cambio.
- No mezcles branding legal (“garantizo resultados”) sin revisión tuya.

---

## Checklist humano después de la IA

- [ ] `npm run build`
- [ ] Vista previa en pantalla pequeña y grande
- [ ] Cambiar idioma EN/ES y revisar textos nuevos
- [ ] Commits pequeños y mensaje de commit que explique el “por qué”

---

## Referencia rápida de este proyecto

| Área        | Ubicación principal |
|------------|----------------------|
| Página     | `src/pages/index.astro` |
| Layout     | `src/layouts/baseLayout.astro` |
| Proyectos  | `src/components/ProjectsSection.tsx` |
| Traducciones | `src/i18n/translations.ts` |
| Idioma     | `src/stores/languageStore.ts` |
| Estilos    | `src/styles/globals.css` |

---

*Puedes duplicar este archivo y acotar las plantillas a tu propio flujo (PR, rama `dev`, etc.).*
