const translations = {
    en: {
        home: "Home",
        language: "Language",
        about: "About Me",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
        title: "Portfolio Walen I Calderon",
        subtitle: "Computer Science student seeking internships",
        description: "I'm an enthusiastic student mainly focused on Java, but I stay curious about every area of programming. I'm looking for an opportunity to learn and work on what I truly love across both software and hardware.",
        ctaProjects: "See projects",
        ctaContact: "Contact me",
        status: "Seeking internship opportunities",
        statProjects: "Projects I am actively improving",
        statFrontend: "Software and hardware curiosity",
        statInteractive: "Learning through real practice",
        aboutTag: "Learning by building, improving, and staying curious.",
        aboutJourneyTitle: "My journey",
        aboutJourneyText: "I'm a Computer Science student growing through hands-on projects and continuous learning. Java is my strongest foundation right now, but I enjoy exploring different areas of programming and technology.",
        aboutGoalTitle: "What I care about",
        aboutGoalText: "I'm looking for an internship where I can keep learning, contribute with curiosity and discipline, and gain real experience in software or hardware-related work.",
        projectsTag: "A few things I'm building and refining as part of my learning process.",
        projectOneTitle: "This portfolio",
        projectOneText: "A personal site focused on responsive layout, animation, and clearer presentation while I keep improving my frontend fundamentals.",
        projectTwoTitle: "Landing page experiments",
        projectTwoText: "Small interface exercises where I test layout ideas, color combinations, hover states, and cleaner content structure.",
        projectThreeTitle: "Frontend study workflow",
        projectThreeText: "A growing collection of mini builds that help me practice JavaScript interactions, accessibility basics, and responsive behavior.",
        skillsTag: "Tools and technologies I currently work with.",
        skillTechTitle: "Technical skills",
        skillSoftTitle: "Strengths",
        skillOne: "Problem solving",
        skillTwo: "Curiosity across tech",
        skillFive: "Java foundation",
        skillSix: "Software and hardware interest",
        skillThree: "Continuous learning",
        skillFour: "Git workflow",
        contactTag: "You can reach me through email, GitHub, or LinkedIn.",
        contactText: "I'm open to internship opportunities, feedback, and conversations about software, programming, or hardware-related work while I keep growing as a developer."
    },
    es: {
        home: "Inicio",
        language: "Idioma",
        about: "Sobre mí",
        projects: "Proyectos",
        skills: "Habilidades",
        contact: "Contacto",
        title: "Portfolio Walen I Calderon",
        subtitle: "Estudiante de Ciencias de la Computación en busca de internships",
        description: "Soy un estudiante entusiasta especializado principalmente en Java; sin embargo, tengo curiosidad por cada ámbito de la programación. Me gustaría tener una oportunidad para aprender y trabajar en lo que amo, tanto en software como en hardware.",
        ctaProjects: "Ver proyectos",
        ctaContact: "Contáctame",
        status: "Buscando oportunidades de internship",
        statProjects: "Proyectos que estoy mejorando activamente",
        statFrontend: "Curiosidad por software y hardware",
        statInteractive: "Aprendiendo con práctica real",
        aboutTag: "Aprendiendo al construir, mejorar y mantener la curiosidad.",
        aboutJourneyTitle: "Mi camino",
        aboutJourneyText: "Soy estudiante de Ciencias de la Computación y estoy creciendo a través de proyectos prácticos y aprendizaje continuo. Java es mi base más fuerte por ahora, pero disfruto explorar distintas áreas de la programación y la tecnología.",
        aboutGoalTitle: "Lo que me importa",
        aboutGoalText: "Estoy buscando una internship donde pueda seguir aprendiendo, aportar con curiosidad y disciplina, y ganar experiencia real en trabajos relacionados con software o hardware.",
        projectsTag: "Algunas cosas que estoy construyendo y mejorando como parte de mi proceso de aprendizaje.",
        projectOneTitle: "Este portfolio",
        projectOneText: "Un sitio personal enfocado en diseño responsive, animación y una presentación más clara mientras sigo mejorando mis bases de frontend.",
        projectTwoTitle: "Experimentos de landing page",
        projectTwoText: "Pequeños ejercicios de interfaz donde pruebo ideas de layout, combinaciones de color, estados hover y mejor estructura de contenido.",
        projectThreeTitle: "Rutina de estudio frontend",
        projectThreeText: "Una colección creciente de mini proyectos que me ayudan a practicar interacciones con JavaScript, accesibilidad básica y comportamiento responsive.",
        skillsTag: "Herramientas y tecnologías con las que trabajo actualmente.",
        skillTechTitle: "Habilidades técnicas",
        skillSoftTitle: "Fortalezas",
        skillOne: "Resolución de problemas",
        skillTwo: "Curiosidad por la tecnología",
        skillFive: "Base en Java",
        skillSix: "Interés en software y hardware",
        skillThree: "Aprendizaje continuo",
        skillFour: "Flujo con Git",
        contactTag: "Puedes contactarme por email, GitHub o LinkedIn.",
        contactText: "Estoy abierto a oportunidades de internship, feedback y conversaciones sobre software, programación o trabajos relacionados con hardware mientras sigo creciendo como desarrollador."

    }
};

const particles = /** @type {any} */ (window).particlesJS;
if (typeof particles === "function" && document.getElementById("particles-js")) {
    particles("particles-js", {
        "particles": {
            "number": {
                "value": 50,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": { "value": "#00bfff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#00bfff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" }
            },
            "modes": {
                "grab": { "distance": 140 },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

/** @typedef {"en" | "es"} Lang */

/** @param {Lang} lang */
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
    const rawSavedLang = localStorage.getItem("lang");
    /** @type {Lang} */
    const savedLang = rawSavedLang === "es" ? "es" : "en";
    const typingElement = document.getElementById("typing");
    const phrases = [
        "Welcome to my Portfolio!",
        "¡Bienvenido a mi Portafolio!",
        "I'm Walen I Calderon, Computer Science Student",
        "Soy Walen I Calderon, Estudiante de Ciencias de la Computación"
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

    /** @type {HTMLButtonElement | null} */
    const langToggle = /** @type {HTMLButtonElement | null} */ (document.getElementById("langToggle"));
    const langDropdown = document.querySelector(".lang-dropdown");
    const langOptions = document.querySelectorAll(".lang-option");
    /** @type {HTMLInputElement | null} */
    const menuCheckbox = /** @type {HTMLInputElement | null} */ (document.getElementById("click"));
    const navLinks = document.querySelectorAll("nav a");

    /** @param {boolean} isExpanded */
    function setLangMenuExpanded(isExpanded) {
        if (langToggle) {
            langToggle.setAttribute("aria-expanded", String(isExpanded));
        }
    }

    if (langToggle && langDropdown) {
        langToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const willOpen = !langDropdown.classList.contains("open");
            langDropdown.classList.toggle("open");
            setLangMenuExpanded(willOpen);
        });

        document.addEventListener("click", (event) => {
            if (event.target instanceof Node && !langDropdown.contains(event.target)) {
                langDropdown.classList.remove("open");
                setLangMenuExpanded(false);
            }
        });
    }

    langOptions.forEach((option) => {
        if (!(option instanceof HTMLButtonElement)) {
            return;
        }

        option.addEventListener("click", () => {
            /** @type {Lang} */
            const selectedLang = option.dataset.lang === "es" ? "es" : "en";
            if (selectedLang) {
                setLang(selectedLang);
                setLangMenuExpanded(false);
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

    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const navSectionLinks = Array.from(document.querySelectorAll('nav a.nav-link[href^="#"]'));

    /**
     * @param {string} activeId
     */
    function setActiveNav(activeId) {
        navSectionLinks.forEach((link) => {
            const isMatch = link.getAttribute("href") === `#${activeId}`;
            link.classList.toggle("active", isMatch);
            if (isMatch) {
                link.setAttribute("aria-current", "page");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    /**
     * Picks the section that currently owns the main reading area.
     * This is more stable than raw intersection ratios near the page end.
     */
    function getCurrentSectionId() {
        if (!sections.length) return "home";

        const navOffset = 96;
        const probeY = navOffset + window.innerHeight * 0.33;
        let currentId = sections[0].id;

        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= probeY && rect.bottom > probeY) {
                currentId = section.id;
            }
        });

        const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (nearBottom) {
            currentId = sections[sections.length - 1].id;
        }

        return currentId;
    }

    function updateActiveNav() {
        setActiveNav(getCurrentSectionId());
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    window.addEventListener("resize", updateActiveNav);
    updateActiveNav();
});
