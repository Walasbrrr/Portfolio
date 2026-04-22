import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// 1. Tipos de TypeScript: Nos aseguran de no cometer errores de tipeo
export type Lang = 'en' | 'es';

// 2. Diccionario que saqué de tu "scripts.js"
export const translations = {
  en: {
    typingOne: "Welcome to my Portfolio!",
    typingTwo: "I'm Walen I Calderon, Computer Science Student",
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
    contactText: "I'm open to internship opportunities, feedback, and conversations about software, programming, or hardware-related work while I keep growing as a developer.",

    // New keys for reference portfolio features
    quickProfile: "Quick profile",
    qp1: "CS student (Java, Web)",
    qp2: "Open to internship",
    qp3: "Accessibility focused",
    yearsCoding: "years coding",
    projectsDone: "projects shipped",
    availability: "availability",
    all: "All",
    academic: "Academic",
    proj1: "Console app for teams and stats (parsing, FileWriter, Scanner).",
    proj2: "Accessible calculator without frameworks.",
    proj3: "Todo list with local storage.",
    proj4: "Console app to create, edit and list tasks (OOP, files).",
    proj5: "First portfolio with i18n, particles and a contact form.",
    proj6: "Tiny app that fetches a weather API.",
    experience: "Experience",
    expHelp: "Relevant projects and roles.",
    exp1: "Academic Java projects (CLI), small web apps and Git practice.",
    exp2: "Accessible calculator, localStorage todo and bilingual portfolio.",
    education: "Education",
    eduHelp: "Academic background and courses.",
    edu1: "Courses in Java, data structures, calculus and web basics.",
    cert1: "Git & version control",
    cert2: "Web accessibility",
    cert3: "Networking basics",
    viewWork: "View work",
    contactMe: "Contact me",
    downloadCV: "Download CV"
  },

  es: {
    typingOne: "¡Bienvenido a mi Portafolio!",
    typingTwo: "Soy Walen I Calderon, Estudiante de Ciencias de la Computación",
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
    contactText: "Estoy abierto a oportunidades de internship, feedback y conversaciones sobre software, programación o trabajos relacionados con hardware mientras sigo creciendo como desarrollador.",

    // Nuevas llaves para las características del portfolio de referencia
    quickProfile: "Perfil rápido",
    qp1: "CS student (Java, Web)",
    qp2: "Disponible para pasantía",
    qp3: "Enfocado en accesibilidad",
    yearsCoding: "años de código",
    projectsDone: "proyectos hechos",
    availability: "disponibilidad",
    all: "Todos",
    academic: "Académicos",
    proj1: "App de consola para equipos y estadísticas (parsing, FileWriter, Scanner).",
    proj2: "Calculadora accesible sin frameworks.",
    proj3: "Lista de tareas con almacenamiento local.",
    proj4: "Aplicación de consola para crear, editar y listar tareas (POO, archivos).",
    proj5: "Primer portfolio con i18n, partículas y formulario de contacto.",
    proj6: "Widget que consume una API de clima y muestra datos básicos.",
    experience: "Experiencia",
    expHelp: "Proyectos y roles relevantes.",
    exp1: "Proyectos académicos en Java (CLI), apps web pequeñas y prácticas de Git.",
    exp2: "Calculadora accesible, lista de tareas con localStorage y portfolio bilingüe.",
    education: "Educación",
    eduHelp: "Formación académica y cursos.",
    edu1: "Cursos de Java, estructura de datos, cálculo y fundamentos web.",
    cert1: "Git y control de versiones",
    cert2: "Accesibilidad web",
    cert3: "Fundamentos de redes",
    viewWork: "Ver proyectos",
    contactMe: "Contactarme",
    downloadCV: "Descargar CV"
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
