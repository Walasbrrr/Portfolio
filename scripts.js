const translations = {
    en: {
        home: "Home",
        language: "Language",
        about: "About Me",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
        title: "Portfolio Walen Calderon",
        subtitle: "Using only HTML, CSS and JavaScript",
        description: "Hi, I'm Walen Calderon, a passionate web developer. This portfolio showcases my skills and projects. Feel free to explore and connect with me!",
        ctaProjects: "See projects",
        ctaContact: "Contact me",
        status: "Open to opportunities",
        statProjects: "Portfolio projects in progress",
        statFrontend: "Frontend foundations",
        statInteractive: "Interactive experiences",
        aboutTag: "Learning by building real projects and polishing the details.",
        aboutJourneyTitle: "My journey",
        aboutJourneyText: "I'm a Computer Science student focused on growing as a web developer. I enjoy turning ideas into clean, interactive experiences and improving a little with every project.",
        aboutGoalTitle: "What I care about",
        aboutGoalText: "I like interfaces that feel alive, readable code, and projects that show both creativity and progress. This portfolio is part of that process.",
        projectsTag: "A few things I'm building and refining right now.",
        projectOneTitle: "This portfolio",
        projectOneText: "A personal site focused on animation, responsive layout, and a cleaner visual identity while I keep learning frontend fundamentals.",
        projectTwoTitle: "Landing page experiments",
        projectTwoText: "Small interface exercises where I test layout ideas, color combinations, hover states, and better content structure.",
        projectThreeTitle: "Frontend study workflow",
        projectThreeText: "A growing collection of mini builds that help me practice JavaScript interactions, accessibility basics, and responsive behavior.",
        skillsTag: "Tools and areas I'm actively improving.",
        skillSoftTitle: "Strengths",
        skillOne: "Problem solving",
        skillTwo: "UI curiosity",
        skillThree: "Continuous learning",
        skillFour: "Git workflow",
        contactTag: "If you want, this section can later connect to email or social links.",
        contactText: "I'm still shaping this portfolio, but I'm open to feedback, collaboration, and new ideas while I keep improving as a developer."
    },
    es: {
        home: "Inicio",
        language: "Idioma",
        about: "Sobre mí",
        projects: "Proyectos",
        skills: "Habilidades",
        contact: "Contacto",
        title: "Portfolio Walen Calderon",
        subtitle: "Usando solo HTML, CSS y JavaScript",
        description: "Hola, soy Walen Calderon, un apasionado desarrollador web. Este portafolio muestra mis habilidades y proyectos. Si quieres, explora y conectemos.",
        ctaProjects: "Ver proyectos",
        ctaContact: "Contáctame",
        status: "Disponible para oportunidades",
        statProjects: "Proyectos del portfolio en progreso",
        statFrontend: "Base de frontend",
        statInteractive: "Experiencias interactivas",
        aboutTag: "Aprendiendo al construir proyectos reales y pulir los detalles.",
        aboutJourneyTitle: "Mi camino",
        aboutJourneyText: "Soy estudiante de Ciencias de la Computación y estoy creciendo como desarrollador web. Me gusta convertir ideas en experiencias limpias e interactivas y mejorar un poco con cada proyecto.",
        aboutGoalTitle: "Lo que me importa",
        aboutGoalText: "Me gustan las interfaces con vida, el código legible y los proyectos que muestran creatividad y progreso. Este portfolio forma parte de ese proceso.",
        projectsTag: "Algunas cosas que estoy construyendo y mejorando ahora mismo.",
        projectOneTitle: "Este portfolio",
        projectOneText: "Un sitio personal enfocado en animación, diseño responsive y una identidad visual más clara mientras sigo aprendiendo frontend.",
        projectTwoTitle: "Experimentos de landing page",
        projectTwoText: "Pequeños ejercicios de interfaz donde pruebo ideas de layout, combinaciones de color, estados hover y mejor estructura de contenido.",
        projectThreeTitle: "Rutina de estudio frontend",
        projectThreeText: "Una colección creciente de mini proyectos que me ayudan a practicar interacciones con JavaScript, accesibilidad básica y comportamiento responsive.",
        skillsTag: "Herramientas y áreas que estoy mejorando activamente.",
        skillSoftTitle: "Fortalezas",
        skillOne: "Resolución de problemas",
        skillTwo: "Curiosidad por UI",
        skillThree: "Aprendizaje continuo",
        skillFour: "Flujo con Git",
        contactTag: "Si quieres, esta sección luego puede conectarse con email o redes.",
        contactText: "Todavía estoy puliendo este portfolio, pero estoy abierto a feedback, colaboración y nuevas ideas mientras sigo mejorando como desarrollador."
    }
};

function setLang(lang) {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.querySelector(".lang-dropdown")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    const typingElement = document.getElementById("typing");
    const phrases = [
        "Welcome to my Portfolio!",
        "¡Bienvenido a mi Portafolio!",
        "I'm Walen Calderon, Computer Science Student",
        "Soy Walen Calderon, Estudiante de Ciencias de la Computación"
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    setLang(savedLang);

    function typeEffect() {
        if (!typingElement) {
            return;
        }

        const currentPhrase = phrases[currentPhraseIndex];
        typingElement.textContent = currentPhrase.substring(0, currentCharIndex);

        if (!isDeleting && currentCharIndex < currentPhrase.length) {
            currentCharIndex += 1;
            typingSpeed = 100;
        } else if (isDeleting && currentCharIndex > 0) {
            currentCharIndex -= 1;
            typingSpeed = 50;
        } else {
            isDeleting = !isDeleting;
            typingSpeed = 1000;

            if (!isDeleting) {
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    const langToggle = document.getElementById("langToggle");
    const langDropdown = document.querySelector(".lang-dropdown");
    const langOptions = document.querySelectorAll(".lang-option");
    const menuCheckbox = document.getElementById("click");
    const navLinks = document.querySelectorAll("nav a");

    if (langToggle && langDropdown) {
        langToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            langDropdown.classList.toggle("open");
        });

        document.addEventListener("click", (event) => {
            if (!langDropdown.contains(event.target)) {
                langDropdown.classList.remove("open");
            }
        });
    }

    langOptions.forEach((option) => {
        option.addEventListener("click", () => {
            const selectedLang = option.dataset.lang;
            if (selectedLang) {
                setLang(selectedLang);
            }
        });
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (menuCheckbox) {
                menuCheckbox.checked = false;
            }
        });
    });
});
