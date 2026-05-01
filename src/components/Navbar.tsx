import { useState, useEffect, useRef } from "react";
import { useLanguage } from '../stores/languageStore';
import LanguageDropdown from './LanguageDropdown';

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [activeSection, setActiveSection] = useState("home");
    const navRef = useRef<HTMLDivElement>(null);

    // Cierra el menú al hacer click fuera del nav
    useEffect(() => {
        if (!isMenuOpen) return;
        const handler = (e: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = Array.from(document.querySelectorAll("main section[id]"));
            if (!sections.length) return;
            const navOffset = 96;
            const probeY = navOffset + window.innerHeight * 0.33;
            let currentId = sections[0].id;

            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= probeY && rect.bottom > probeY) {
                    currentId = section.id;
                }
            });

            const nearBottom = window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 4;
            if (nearBottom) {
                currentId = sections[sections.length - 1].id;
            }
            setActiveSection(currentId)
        }

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    return (
        <nav>
            <div className="nav-shell" ref={navRef}>
                <a
                    className="brand-text"
                    href="#home"
                    onClick={closeMenu}
                >
                    <span className="grad" style={{ textShadow: "0 0 12px rgba(86,194,255,0.4)", letterSpacing: "1px" }}>
                        Walen I Calderon
                    </span>
                </a>

                <button
                    type="button"
                    className={`menu-btn${isMenuOpen ? ' is-open' : ''}`}
                    onClick={() => setIsMenuOpen(v => !v)}
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                >
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
                </button>

                <ul id="primary-navigation" className={isMenuOpen ? 'is-open' : ''}>

                    {<LanguageDropdown />}

                    <li>
                        <a className={`nav-link ${activeSection === "home" ? "active" : ""}`} href="#home" onClick={closeMenu}>
                            {t("home")}
                        </a>
                    </li>
                    <li>
                        <a className={`nav-link ${activeSection === "about" ? "active" : ""}`} href="#about" onClick={closeMenu}>
                            {t("about")}
                        </a>
                    </li>
                    <li>
                        <a className={`nav-link ${activeSection === "projects" ? "active" : ""}`} href="#projects" onClick={closeMenu}>
                            {t("projects")}
                        </a>
                    </li>
                    <li>
                        <a className={`nav-link ${activeSection === "skills" ? "active" : ""}`} href="#skills" onClick={closeMenu}>
                            {t("skills")}
                        </a>
                    </li>
                    <li>
                        <a className={`nav-link ${activeSection === "experience" ? "active" : ""}`} href="#experience" onClick={closeMenu}>
                            {t("experience")}
                        </a>
                    </li>
                    <li>
                        <a className={`nav-link ${activeSection === "education" ? "active" : ""}`} href="#education" onClick={closeMenu}>
                            {t("education")}
                        </a>
                    </li>
                    <li>
                        <a className={`nav-link ${activeSection === "contact" ? "active" : ""}`} href="#contact" onClick={closeMenu}>
                            {t("contact")}
                        </a>
                    </li>
                    <li className="nav-cta">
                        <a className="cta-button secondary nav-cv" href="#" onClick={closeMenu}>
                            <i className="fas fa-download" aria-hidden="true" style={{ marginRight: 8 }}></i>
                            {t("downloadCV")}
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
