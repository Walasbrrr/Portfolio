    // ===== Year =====
    document.getElementById('year').textContent = new Date().getFullYear();

    // ===== i18n =====
    const T = {
        es: {
        title: "Portfolio – Walen Calderon",
        home: "Inicio", about: "Sobre mí", projects: "Proyectos", skills: "Skills", experience: "Experiencia", education: "Educación", contact: "Contacto",
        kicker: "Desarrollador en formación", greeting: "Hola, soy", viewWork: "Ver proyectos", contactMe: "Contactarme", downloadCV: "Descargar CV",
        quickProfile: "Perfil rápido", qp1: "CS student (Java, Web)", qp2: "Disponible para pasantía", qp3: "Enfocado en accesibilidad",
        yearsCoding: "años de código", projectsDone: "proyectos hechos", availability: "disponibilidad",
        aboutHelp: "Resumen, enfoque y valores.", a11y: "Accesibilidad (A11y)", cleanCode: "Código limpio y probado", teamwork: "Trabajo en equipo y feedback",
        projectsHelp: "Algunos ejemplos de lo que he construido.", all: "Todos", academic: "Académicos",
        proj1: "App de consola para equipos y estadísticas (parsing, FileWriter, Scanner).",
        proj2: "Calculadora accesible sin frameworks.",
        proj3: "Lista de tareas con almacenamiento local.",
        proj4: "Aplicación de consola para crear, editar y listar tareas (POO, archivos).",
        proj5: "Primer portfolio con i18n, partículas y formulario de contacto.",
        proj6: "Widget que consume una API de clima y muestra datos básicos.",
        skillsHelp: "Niveles aproximados y herramientas de trabajo.", javaDesc: "POO, colecciones, I/O, CLI",
        experience: "Experiencia", expHelp: "Proyectos y roles relevantes.", exp1: "Proyectos académicos en Java (CLI), apps web pequeñas y prácticas de Git.", exp2: "Calculadora accesible, lista de tareas con localStorage y portfolio bilingüe.",
        education: "Educación", eduHelp: "Formación académica y cursos.", edu1: "Cursos de Java, estructura de datos, cálculo y fundamentos web.", cert1: "Git y control de versiones", cert2: "Accesibilidad web", cert3: "Fundamentos de redes",
        testimonials: "Testimonios", testiHelp: "Qué dicen profesores o colegas.",
        contact: "Contacto", contactHelp: "¿Tienes una oportunidad o feedback? Escríbeme.", nameLabel: "Nombre", msgLabel: "Mensaje", send: "Enviar", built: "Hecho con HTML/CSS/JS",
        type: [
            "Construyo experiencias web limpias y rápidas.",
            "Me enfoco en Java y desarrollo web.",
            "Busco una pasantía para aprender y aportar."
        ]
        },
        en: {
        title: "Portfolio – Walen Calderon",
        home: "Home", about: "About", projects: "Projects", skills: "Skills", experience: "Experience", education: "Education", contact: "Contact",
        kicker: "Developer in training", greeting: "Hi, I'm", viewWork: "View work", contactMe: "Contact me", downloadCV: "Download CV",
        quickProfile: "Quick profile", qp1: "CS student (Java, Web)", qp2: "Open to internship", qp3: "Accessibility focused",
        yearsCoding: "years coding", projectsDone: "projects shipped", availability: "availability",
        aboutHelp: "Summary, focus and values.", a11y: "Accessibility (A11y)", cleanCode: "Clean, tested code", teamwork: "Teamwork & feedback",
        projectsHelp: "A few things I have built.", all: "All", academic: "Academic",
        proj1: "Console app for teams and stats (parsing, FileWriter, Scanner).",
        proj2: "Accessible calculator without frameworks.",
        proj3: "Todo list with local storage.",
        proj4: "Console app to create, edit and list tasks (OOP, files).",
        proj5: "First portfolio with i18n, particles and a contact form.",
        proj6: "Tiny app that fetches a weather API.",
        skillsHelp: "Approximate levels and toolset.", javaDesc: "OOP, collections, I/O, CLI",
        experience: "Experience", expHelp: "Relevant projects and roles.", exp1: "Academic Java projects (CLI), small web apps and Git practice.", exp2: "Accessible calculator, localStorage todo and bilingual portfolio.",
        education: "Education", eduHelp: "Academic background and courses.", edu1: "Courses in Java, data structures, calculus and web basics.", cert1: "Git & version control", cert2: "Web accessibility", cert3: "Networking basics",
        testimonials: "Testimonials", testiHelp: "What professors or peers say.",
        contact: "Contact", contactHelp: "Have an opportunity or feedback? Write me.", nameLabel: "Name", msgLabel: "Message", send: "Send", built: "Built with HTML/CSS/JS",
        type: [
            "I build clean, fast web experiences.",
            "I focus on Java and web dev.",
            "I'm looking for an internship to learn and contribute."
        ]
        
    };

    let currentLang = localStorage.getItem('lang') || 'es';
    const langLabel = document.getElementById('langLabel');
    const langToggleBtn = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');

    function setLang(lang){
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (T[lang][key]) el.textContent = T[lang][key];
        });
        document.title = T[lang].title;
        langLabel.textContent = lang.toUpperCase();
        queueTyping(T[lang].type);
    }

    langToggleBtn?.addEventListener('click', () => {
        const open = !langMenu.hasAttribute('hidden');
        if (open){ langMenu.setAttribute('hidden',''); langToggleBtn.setAttribute('aria-expanded','false'); }
        else { langMenu.removeAttribute('hidden'); langToggleBtn.setAttribute('aria-expanded','true'); }
    });
    langMenu?.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-lang]');
        if (!btn) return;
        setLang(btn.dataset.lang);
        langMenu.setAttribute('hidden','');
        langToggleBtn.setAttribute('aria-expanded','false');
    });

    // ===== Typing effect =====
    const typeTarget = document.getElementById('typeTarget');
    let typingQueue = []; let typingIndex = 0; let charIndex = 0; let typingTimer;
    function typeNext(){
        if (!typingQueue.length) return;
        const text = typingQueue[typingIndex % typingQueue.length];
        if (charIndex <= text.length){
        typeTarget.textContent = text.slice(0, charIndex);
        charIndex++;
        typingTimer = setTimeout(typeNext, 38);
        } else {
        setTimeout(() => { charIndex = 0; typingIndex++; typeNext(); }, 1200);
        }
    }
    function queueTyping(lines){
        clearTimeout(typingTimer);
        typingQueue = lines.slice(); typingIndex = 0; charIndex = 0; typeNext();
    }

    // ===== Project filters =====
    const grid = document.getElementById('projectGrid');
    const filterBtns = document.querySelectorAll('.chip[data-filter]');
    filterBtns.forEach(btn => btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.setAttribute('aria-pressed','false'));
        btn.setAttribute('aria-pressed','true');
        const f = btn.dataset.filter;
        grid.querySelectorAll('.project').forEach(card => {
        const tags = card.dataset.tags || '';
        const show = f === 'all' || tags.includes(f);
        card.style.display = show ? 'grid' : 'none';
        });
    }));

    // ===== Contact form (client-only demo) =====
    const form = document.getElementById('contactForm');
    const formMsg = document.getElementById('formMsg');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!form.checkValidity()){
        formMsg.textContent = currentLang === 'es' ? 'Por favor completa los campos requeridos.' : 'Please fill in the required fields.';
        return;
        }
        const data = Object.fromEntries(new FormData(form));
      console.log('Form data:', data); // Aquí iría un fetch() a un backend o servicio de correo
        form.reset();
        formMsg.textContent = currentLang === 'es' ? '¡Gracias! Te responderé pronto.' : 'Thanks! I will get back to you soon.';
    });

    // ===== Fake CV download (reemplaza el enlace con tu PDF real) =====
    document.getElementById('downloadCV').addEventListener('click', (e) => {
        e.preventDefault();
        alert(currentLang === 'es' ? 'Conecta tu PDF del CV en este botón.' : 'Attach your CV PDF to this button.');
    });

    // ===== Active link on scroll =====
    const links = document.querySelectorAll('.menu a[href^="#"]');
    const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const obs = new IntersectionObserver((entries)=>{
        entries.forEach(entry => {
        const id = '#' + entry.target.id;
        const link = document.querySelector(`.menu a[href="${id}"]`);
        if (link){ link.classList.toggle('active', entry.isIntersecting); }
        )
    }, { rootMargin: '-50% 0px -45% 0px', threshold: 0 });
    sections.forEach(s => obs.observe(s));

    // ===== Init =====
    setLang(currentLang);