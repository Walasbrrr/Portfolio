import { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';
import LanguageDropdown from './LanguageDropdown';

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [activeSection, setActiveSection] = useState("home");

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
            <div className="container nav-shell">
                <a className="brand-text" href="#home">Walen I Calderon</a>

                <input
                    type="checkbox"
                    id="click"
                    checked={isMenuOpen}
                    onChange={e => setIsMenuOpen(e.target.checked)}
                    hidden
                    aria-label="Toggle Menu"
                />

                <label htmlFor="click" className="menu-btn" aria-label="Open menu">
                    <i className="fas fa-bars" aria-hidden="true"></i>
                </label>

                <ul id="primary-navigation">

                    {<LanguageDropdown />}


                    {/* Enlaces listos */}
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
                        <a className={`nav-link ${activeSection === "contact" ? "active" : ""}`} href="#contact" onClick={closeMenu}>
                            {t("contact")}
                        </a>
                    </li>

                </ul>
            </div>
        </nav>
    );
}
