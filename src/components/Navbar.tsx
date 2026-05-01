import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../stores/languageStore";
import LanguageDropdown from "./LanguageDropdown";

const CV_MAILTO =
    "mailto:walenculd@gmail.com?subject=CV%20request%20%E2%80%94%20portfolio&body=Hi%20Walen%2C%0A%0A";

export default function Navbar() {
    const { t } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [activeSection, setActiveSection] = useState("home");
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isMenuOpen) return;
        const handler = (e: PointerEvent) => {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("pointerdown", handler);
        return () => document.removeEventListener("pointerdown", handler);
    }, [isMenuOpen]);

    useEffect(() => {
        const sections = Array.from(document.querySelectorAll("main section[id]")) as HTMLElement[];
        if (!sections.length) return;

        const markBottom = () => {
            const nearBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
            if (nearBottom) {
                setActiveSection(sections[sections.length - 1].id);
            }
        };

        const io = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting && e.intersectionRatio > 0)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]?.target?.id) {
                    setActiveSection(visible[0].target.id);
                }
                markBottom();
            },
            { rootMargin: "-42% 0px -48% 0px", threshold: [0, 0.05, 0.1, 0.25, 0.5, 0.75, 1] }
        );

        sections.forEach((s) => io.observe(s));
        window.addEventListener("scroll", markBottom, { passive: true });
        markBottom();

        return () => {
            sections.forEach((s) => io.unobserve(s));
            io.disconnect();
            window.removeEventListener("scroll", markBottom);
        };
    }, []);

    return (
        <nav>
            <div className="nav-shell" ref={navRef}>
                <a className="brand-text" href="#home" onClick={closeMenu}>
                    <span
                        className="grad"
                        style={{ textShadow: "0 0 12px rgba(86,194,255,0.4)", letterSpacing: "1px" }}
                    >
                        Walen I Calderon
                    </span>
                </a>

                <button
                    type="button"
                    className={`menu-btn${isMenuOpen ? " is-open" : ""}`}
                    onClick={() => setIsMenuOpen((v) => !v)}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                    aria-controls="primary-navigation"
                >
                    <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`} aria-hidden="true"></i>
                </button>

                <ul id="primary-navigation" className={isMenuOpen ? "is-open" : ""}>
                    <LanguageDropdown />

                    <li>
                        <a
                            className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                            href="#home"
                            onClick={closeMenu}
                        >
                            {t("home")}
                        </a>
                    </li>
                    <li>
                        <a
                            className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                            href="#about"
                            onClick={closeMenu}
                        >
                            {t("about")}
                        </a>
                    </li>
                    <li>
                        <a
                            className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
                            href="#projects"
                            onClick={closeMenu}
                        >
                            {t("projects")}
                        </a>
                    </li>
                    <li>
                        <a
                            className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
                            href="#skills"
                            onClick={closeMenu}
                        >
                            {t("skills")}
                        </a>
                    </li>
                    <li>
                        <a
                            className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
                            href="#experience"
                            onClick={closeMenu}
                        >
                            {t("experience")}
                        </a>
                    </li>
                    <li>
                        <a
                            className={`nav-link ${activeSection === "education" ? "active" : ""}`}
                            href="#education"
                            onClick={closeMenu}
                        >
                            {t("education")}
                        </a>
                    </li>
                    <li>
                        <a
                            className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                            href="#contact"
                            onClick={closeMenu}
                        >
                            {t("contact")}
                        </a>
                    </li>
                    <li className="nav-cta">
                        <a className="cta-button secondary nav-cv" href={CV_MAILTO} onClick={closeMenu}>
                            <i className="fas fa-download" aria-hidden="true" style={{ marginRight: 8 }}></i>
                            {t("downloadCV")}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
