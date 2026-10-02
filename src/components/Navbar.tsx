import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../stores/languageStore";
import LanguageDropdown from "./LanguageDropdown";

const CV_MAILTO =
    "mailto:walenculd@gmail.com?subject=CV%20request%20%E2%80%94%20portfolio&body=Hi%20Walen%2C%0A%0A";

export default function Navbar() {
    const { t, lang } = useLanguage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = () => setIsMenuOpen(false);
    const [activeSection, setActiveSection] = useState("home");
    const [timeString, setTimeString] = useState("");
    const navRef = useRef<HTMLDivElement>(null);

    // Live clock for New Jersey (America/New_York)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("en-US", {
                timeZone: "America/New_York",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTimeString(formatted);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

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

    const triggerCommandPalette = () => {
        window.dispatchEvent(
            new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
        );
    };

    return (
        <nav>
            {/* Top Micro-HUD / Telemetry Bar */}
            <div className="w-full border-b border-[rgba(154,201,255,0.08)] bg-[#050C16]/85 px-4 py-1.5 backdrop-blur-md">
                <div className="container mx-auto flex items-center justify-between text-[11px] font-mono text-[#9FB2CC]/80">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                            <span className="text-white/90 font-medium">
                                {lang === "es" ? "Disponible para Roles" : "Available for Roles"}
                            </span>
                        </span>
                        <span className="hidden sm:inline text-white/30">•</span>
                        <span className="hidden sm:inline text-[#9FB2CC]/70">
                            {lang === "es" ? "Ingeniería de Software & Sistemas" : "Software & Systems Engineering"}
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        {timeString && (
                            <span className="hidden md:inline tabular-nums text-white/80">
                                NJ, US • {timeString}
                            </span>
                        )}
                        <button
                            type="button"
                            onClick={triggerCommandPalette}
                            className="hidden sm:flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/70 hover:border-[#56C2FF]/40 hover:text-white transition"
                        >
                            <span>Search</span>
                            <kbd className="rounded bg-white/10 px-1 text-[9px]">⌘K</kbd>
                        </button>
                    </div>
                </div>
            </div>

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
                    aria-label={isMenuOpen ? t("navMenuClose") : t("navMenuOpen")}
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
