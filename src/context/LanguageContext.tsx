import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// 1. Tipos de TypeScript: Nos aseguran de no cometer errores de tipeo
export type Lang = 'en' | 'es';

// 2. Diccionario que saqué de tu "scripts.js"
export const translations = {
  en: {
    typingOne: "Welcome to my Portfolio!",
    typingTwo: "Walen Calderon | Software Engineer & CS Student",
    home: "Home",
    language: "Language",
    about: "About Me",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    title: "Walen Calderon | Software Engineer & CS Student",
    subtitle: "Crafting robust systems and scalable applications with a focus on clean code. Currently specializing in the Java ecosystem and Full-Stack development.",
    description: "I'm an enthusiastic student mainly focused on Java, but I stay curious about every area of programming. I'm looking for an opportunity to learn and work on what I truly love across both software and hardware.",
    ctaProjects: "See projects",
    ctaContact: "Contact me",
    status: "Seeking internship opportunities",
    statProjects: "Projects I am actively improving",
    statFrontend: "Software and hardware curiosity",
    statInteractive: "Learning through real practice",
    aboutTag: "Learning by building, improving, and staying curious.",
    aboutJourneyTitle: "My journey",
    aboutJourneyText: "My journey in technology began with a fascination for how logical structures solve real-world problems. As a Computer Science student, I have built a strong foundation in Object-Oriented Programming and algorithms, utilizing Java as my core language to break down complex challenges into modular, efficient solutions.",
    aboutGoalTitle: "What I care about",
    aboutGoalText: "Currently, I am expanding my impact by building professional-grade applications, such as a logistics management SaaS developed with Spring Boot and Next.js. My immediate goal is to join an engineering team as an intern, where I can contribute my technical skills, my interest in software architecture, and my commitment to continuous learning in high-performance environments.",
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
    contactText: "I'm open to internship opportunities, feedback, and conversations about software, programming, or hardware-related work while I keep growing as a developer.",

    // New keys for reference portfolio features
    quickProfile: "Quick profile",
    qp1: "CS Student specialized in Backend development with Java and Spring Boot.",
    qp2: "Full-Stack Developer focused on scalable architecture and clean code.",
    qp3: "Actively seeking internship opportunities to solve complex technical challenges.",
    yearsCoding: "years coding",
    projectsDone: "projects shipped",
    availability: "availability",
    all: "All",
    academic: "Academic",
    proj1: "Applied advanced OOP principles and Java design patterns to create robust management tools, prioritizing code maintainability and logical efficiency.",
    proj2: "Accessible calculator without frameworks.",
    proj3: "Todo list with local storage.",
    proj4: "Applied advanced OOP principles and Java design patterns to create robust management tools, prioritizing code maintainability and logical efficiency.",
    proj5: "First portfolio with i18n, particles and a contact form.",
    proj6: "Tiny app that fetches a weather API.",
    proj7: "Built high-performance, responsive interfaces using React and TypeScript, focusing on accessibility and seamless user experience.",
    proj8: "Designed and developed a comprehensive logistics application using Spring Boot and Next.js, implementing JWT security and complex state management.",
    experience: "Experience",
    expHelp: "Relevant projects and roles.",
    exp1: "Academic Java projects (CLI), small web apps and Git practice.",
    exp2: "Accessible calculator, localStorage todo and bilingual portfolio.",
    education: "Education",
    eduHelp: "Academic background and courses.",
    edu1: "Rigorous academic training centered on data structures, systems architecture, and algorithmic problem-solving (Middlesex/Rutgers).",
    cert1: "Hour of Code: CS Basics (Code.org)",
    cert2: "Programming Fundamentals (Grasshopper)",
    viewWork: "View work",
    contactMe: "Contact me",
    downloadCV: "Download CV",

    // Figma hero (new)
    heroBadge: "Available for new projects",
    heroRole: "Full Stack Developer passionate about building delightful web experiences. Specialized in React, TypeScript and UI/UX.",
    heroCtaViewProjects: "View projects",
    heroCtaDownloadCv: "Download CV",
    heroStatsProjectsDoneLabel: "Projects completed",
    heroStatsGithubReposLabel: "Public GitHub repos",
    heroStatsYearsLabel: "Years of experience",
    heroStatsCodingYearsLabel: "Coding experience",
    heroStatsCodingYearsValue: "2+",
    heroStatsJourneyLabel: "Path",
    heroStatsJourneyValue: "Always learning",
    heroStatsSatisfactionLabel: "Satisfaction",
    heroSpecialtiesLabel: "Specialties"
  },

  es: {
    typingOne: "¡Bienvenido a mi Portafolio!",
    typingTwo: "Walen Calderon | Software Engineer & CS Student",
    home: "Inicio",
    language: "Idioma",
    about: "Sobre mí",
    projects: "Proyectos",
    skills: "Habilidades",
    contact: "Contacto",
    title: "Walen Calderon | Software Engineer & CS Student",
    subtitle: "Construyendo sistemas robustos y aplicaciones escalables con un enfoque en código limpio. Actualmente especializado en el ecosistema Java y desarrollo Full-Stack.",
    description: "Soy un estudiante entusiasta especializado principalmente en Java; sin embargo, tengo curiosidad por cada ámbito de la programación. Me gustaría tener una oportunidad para aprender y trabajar en lo que amo, tanto en software como en hardware.",
    ctaProjects: "Ver proyectos",
    ctaContact: "Contáctame",
    status: "Buscando oportunidades de internship",
    statProjects: "Proyectos que estoy mejorando activamente",
    statFrontend: "Curiosidad por software y hardware",
    statInteractive: "Aprendiendo con práctica real",
    aboutTag: "Aprendiendo al construir, mejorar y mantener la curiosidad.",
    aboutJourneyTitle: "Mi camino",
    aboutJourneyText: "Mi camino en la tecnología comenzó con una fascinación por cómo las estructuras lógicas resuelven problemas del mundo real. Como estudiante de Ciencias de la Computación, he consolidado una base sólida en Programación Orientada a Objetos y algoritmos, utilizando Java como mi lenguaje principal para desglosar problemas complejos en soluciones modulares y eficientes.",
    aboutGoalTitle: "Lo que me importa",
    aboutGoalText: "Actualmente, estoy expandiendo mi impacto construyendo aplicaciones de nivel profesional, como un SaaS de gestión logística desarrollado con Spring Boot y Next.js. Mi objetivo inmediato es integrar un equipo de ingeniería como pasante (Intern), donde pueda aportar mi capacidad técnica, mi interés en la arquitectura de software y mi compromiso con el aprendizaje continuo en entornos de alto rendimiento.",
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
    contactText: "Estoy abierto a oportunidades de internship, feedback y conversaciones sobre software, programación o trabajos relacionados con hardware mientras sigo creciendo como desarrollador.",

    // Nuevas llaves para las características del portfolio de referencia
    quickProfile: "Perfil rápido",
    qp1: "Estudiante de CS especializado en desarrollo Backend con Java y Spring Boot.",
    qp2: "Desarrollador Full-Stack enfocado en arquitectura escalable y código limpio.",
    qp3: "En búsqueda activa de pasantías para resolver retos técnicos complejos.",
    yearsCoding: "años de código",
    projectsDone: "proyectos hechos",
    availability: "disponibilidad",
    all: "Todos",
    academic: "Académicos",
    proj1: "Apliqué principios avanzados de OOP y patrones de diseño en Java para crear herramientas de gestión robustas, priorizando la mantenibilidad y eficiencia.",
    proj2: "Calculadora accesible sin frameworks.",
    proj3: "Lista de tareas con almacenamiento local.",
    proj4: "Apliqué principios avanzados de OOP y patrones de diseño en Java para crear herramientas de gestión robustas, priorizando la mantenibilidad y eficiencia.",
    proj5: "Primer portfolio con i18n, partículas y formulario de contacto.",
    proj6: "Widget que consume una API de clima y muestra datos básicos.",
    proj7: "Creé interfaces responsivas y de alto rendimiento utilizando React y TypeScript, enfocándome en la accesibilidad y UX.",
    proj8: "Diseñé y desarrollé un SaaS de logística utilizando Spring Boot y Next.js, implementando seguridad JWT y gestión de estados complejos.",
    experience: "Experiencia",
    expHelp: "Proyectos y roles relevantes.",
    exp1: "Proyectos académicos en Java (CLI), apps web pequeñas y prácticas de Git.",
    exp2: "Calculadora accesible, lista de tareas con localStorage y portfolio bilingüe.",
    education: "Educación",
    eduHelp: "Formación académica y cursos.",
    edu1: "Formación académica rigurosa centrada en estructuras de datos, arquitectura de sistemas y resolución de problemas algorítmicos (Middlesex/Rutgers).",
    cert1: "Hour of Code: Conceptos Básicos CS (Code.org)",
    cert2: "Fundamentos de Programación (Grasshopper)",
    viewWork: "Ver proyectos",
    contactMe: "Contactarme",
    downloadCV: "Descargar CV",

    // Figma hero (new)
    heroBadge: "Disponible para nuevos proyectos",
    heroRole: "Desarrollador Full Stack apasionado por crear experiencias web increíbles. Especializado en React, TypeScript y diseño UI/UX.",
    heroCtaViewProjects: "Ver proyectos",
    heroCtaDownloadCv: "Descargar CV",
    heroStatsProjectsDoneLabel: "Proyectos completados",
    heroStatsGithubReposLabel: "Repos públicos (GitHub)",
    heroStatsYearsLabel: "Años de experiencia",
    heroStatsCodingYearsLabel: "Experiencia programando",
    heroStatsCodingYearsValue: "2+",
    heroStatsJourneyLabel: "Camino",
    heroStatsJourneyValue: "Siempre aprendiendo",
    heroStatsSatisfactionLabel: "Satisfacción",
    heroSpecialtiesLabel: "Especialidades"
  }
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string; // Función "t" (traducir) para obtener el texto
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {

  const [lang, setLang] = useState<Lang>('en');
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang;

    if (saved === "en" || saved === "es") {
      setLang(saved);
    }

  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);

  }, [lang]);

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de un LanguageProvider");
  }
  return context;
}
