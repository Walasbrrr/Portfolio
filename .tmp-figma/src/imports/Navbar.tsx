import { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';
import LanguageDropdown from './LanguageDropdown';

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [activeSection, setActiveSection] = useState("home");

    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        const phrases = ["Walen I Calderon"];

        let timeoutId: ReturnType<typeof setTimeout>;
        if (isDeleting) {
            timeoutId = setTimeout(() => {
                setText(text.slice(0, -1));
                if (text.length === 0) {
                    setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                    setDeleting(false);
                }
            }, 100);
        } else {
            timeoutId = setTimeout(() => {
                setText(phrases[phraseIndex].slice(0, text.length + 1));
                if (text.length === phrases[phraseIndex].length) {
                    setDeleting(true);
                }
            }, 150);
        }
        return () => clearTimeout(timeoutId);
    }, [text, phraseIndex, isDeleting]);

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
            <div className="nav-shell">
                <a className="brand-text" href="#home" style={{ display: 'inline-flex', alignItems: 'center', width: "240px", justifyContent: "flex-start", paddingLeft: 0, overflow: "hidden", flexShrink: 0 }}>
                    <span className="grad" style={{ textShadow: "0 0 12px rgba(86,194,255,0.4)", letterSpacing: "1px" }}>{text}</span>
                    <span className="cursor" style={{ color: "var(--brand)" }}>|</span>
                </a>

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

                </ul>
            </div>
        </nav>
    );
}
