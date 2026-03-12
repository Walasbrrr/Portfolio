const translations = {
    en: {
        home: "Home",
        language: "Language",
        about: "About Me",
        projects: "Projects",
        skills: "Skills",
        contact: "Contact",
        title: "Portfolio Walen Calderon",
        subtitle: "Using only HTML & CSS",
        welcome: "Welcome to my Portfolio!",
        description: "Hi, I'm Walen Calderon, a passionate web developer. This portfolio showcases my skills and projects. Feel free to explore and connect with me!",
    },
    es: {
        home: "Inicio",
        language: "Lenguaje",
        about: "Sobre mí",
        projects: "Proyectos",
        skills: "Habilidades",
        contact: "Contacto",
        title: "Portfolio Walen Calderon",
        subtitle: "Usando solo HTML y CSS",
        welcome: "¡Bienvenido a mi Portafolio!",
        description: "Hola, soy Walen Calderon, un apasionado desarrollador web. Este portafolio muestra mis habilidades y proyectos. ¡Siéntete libre de explorar y conectarte conmigo!",
    },
};

function setLang(lang) {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    document.querySelector(".lang-dropdown")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);

    const typingElement = document.getElementById("typing");
    const phrases = [
        "Welcome to my Portfolio!",
        "¡Bienvenido a mi Portafolio!",
        "I'm Walen Calderon, Computer Science Student",
        "Soy Walen Calderon, Estudiante de Ciencias de la Computación",
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingElement) return;

        const currentPhrase = phrases[currentPhraseIndex];
        const displayedText = currentPhrase.substring(0, currentCharIndex);
        typingElement.textContent = displayedText;

        if (!isDeleting && currentCharIndex < currentPhrase.length) {
            currentCharIndex++;
            typingSpeed = 100;
        } else if (isDeleting && currentCharIndex > 0) {
            currentCharIndex--;
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

    if (langToggle && langDropdown) {
        langToggle.addEventListener("click", function (e) {
            e.stopPropagation();
            langDropdown.classList.toggle("open");
        });

        document.addEventListener("click", function (e) {
            if (!langDropdown.contains(e.target)) {
                langDropdown.classList.remove("open");
            }
        });
    }
});
