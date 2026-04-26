# Rediseño de la Sección de Contacto (ContactSection)

**Fecha:** 24 de Abril de 2026
**Componente Modificado:** `src/components/ContactSection.tsx`

---

## 1. ¿Para qué se hizo? (El Propósito)
La sección original era puramente informativa (texto y botones que abrían el cliente de correo o redes sociales). El propósito de esta implementación fue crear un verdadero canal de comunicación interactivo sin salir del portafolio. Se diseñó un formulario premium, intuitivo y estéticamente alineado con las tarjetas de proyectos para mejorar la tasa de contacto y la percepción profesional del sitio.

## 2. ¿Por qué se hizo así? (La Justificación Técnica)

- **Uso de Servicio Serverless (Web3Forms):** El portafolio es una aplicación estática (Frontend). Implementar un servidor Java y una base de datos exclusiva para capturar mensajes de contacto habría requerido un alojamiento VPS (con los costos y mantenimiento de seguridad asociados). Utilizar Web3Forms soluciona esto de manera gratuita y eficiente: captura los datos del formulario y los reenvía directamente al correo del desarrollador (`walenculd@gmail.com`).
- **Estado Dinámico (React `useState`):** Se transformó en un componente reactivo para manejar la experiencia de usuario (UX). El botón de envío cambia visualmente y se deshabilita para evitar dobles envíos, proporcionando retroalimentación inmediata ("Enviando..." y "¡Enviado!").
- **Grid de Dos Columnas (Tailwind):** Se separó la información de contacto (redes y texto acogedor) del formulario en sí utilizando `grid-cols-2`. Esto maximiza el uso del espacio en pantallas de escritorio, brindando un layout limpio y corporativo, y colapsa perfectamente a una sola columna en móviles.

## 3. ¿Cómo se hizo? (La Implementación)

1. **Estado del Formulario:** Se añadió `const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");` para controlar el flujo de la petición.
2. **Lógica `handleSubmit`:** Se previno el comportamiento por defecto de recarga del formulario (`e.preventDefault()`). Se usó `FormData` para capturar los inputs y se hizo una petición `fetch` asíncrona mediante el método POST a la API de Web3Forms.
3. **Estructura UI (Tailwind CSS):**
   - **Columna Izquierda:** Contenedor estilizado con `bg-gradient-to-b` y sombras para dar un efecto de profundidad. Incluye botones circulares de FontAwesome que interactúan al hacer `hover`.
   - **Columna Derecha:** Formulario con inputs que reaccionan al focus (`focus:ring-[#56C2FF]`), integrando diseño *glassmorphism* (fondos translúcidos `rgba(255,255,255,0.03)`).
   - **Botón Dinámico:** Cambia su ícono de FontAwesome (`fa-spinner`, `fa-check`) dependiendo de la variable `status`.

> **Nota para el desarrollador:** Para que los mensajes lleguen, es necesario ir a [web3forms.com](https://web3forms.com), crear una Access Key con el correo `walenculd@gmail.com` y reemplazar `"YOUR_ACCESS_KEY_HERE"` en el código de `ContactSection.tsx`.
