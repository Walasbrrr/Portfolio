import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../stores/languageStore";

export default function Hero() {
    const { t, lang } = useLanguage();
    const [typedSubtitle, setTypedSubtitle] = useState("");

    const subtitle = useMemo(() => t("subtitle"), [t]);

    useEffect(() => {
        // Type once (non-looping). Respect reduced motion.
        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) {
            setTypedSubtitle(subtitle);
            return;
        }

        setTypedSubtitle("");
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setTypedSubtitle(subtitle.slice(0, i));
            if (i >= subtitle.length) {
                window.clearInterval(id);
            }
        }, 22);

        return () => window.clearInterval(id);
    }, [subtitle, lang]);

    return (
        <section id="home" className="home">
            <div className="container hero-layout hero-figma">

                <div className="hero-copy card hero-panel">
                    <div className="hero-badge">
                        <i className="fas fa-sparkles" aria-hidden="true"></i>
                        <span>{t("heroBadge")}</span>
                    </div>

                    <p className="eyebrow">
                        <span>{typedSubtitle}</span>
                        <span className="type-cursor" aria-hidden="true">
                            |
                        </span>
                    </p>

                    <h1>
                        <span className="hero-pretitle">
                            {lang === "es" ? "Hola, soy" : "Hi, I'm"}
                        </span>
                        <span className="hero-title animated-gradient">Walen Calderon</span>
                    </h1>

                    <p className="hero-role">
                        {t("heroRole")}
                    </p>

                    <div className="hero-actions hero-actions-figma">
                        <a className="cta-button primary" href="#projects">
                            {t("heroCtaViewProjects")}
                            <i className="fas fa-external-link-alt" aria-hidden="true" style={{ marginLeft: 10, fontSize: 12 }}></i>
                        </a>
                        <a className="cta-button secondary" href="#">
                            <i className="fas fa-download" aria-hidden="true" style={{ marginRight: 10, fontSize: 12 }}></i>
                            {t("heroCtaDownloadCv")}
                        </a>
                    </div>

                    <div className="hero-social">
                        <a className="social-btn" href="https://github.com/Walasbrrr" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <i className="fab fa-github" aria-hidden="true"></i>
                        </a>
                        <a className="social-btn" href="https://www.linkedin.com/in/walen-calderon-a017b42a4/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                        </a>
                        <a className="social-btn" href="mailto:walenculd@gmail.com" aria-label="Email">
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

                <aside className="card hero-panel hero-side hero-side-figma">
                    <div className="stat-hero stat-hero-wide">
                        <div className="stat-hero-top">
                            <div>
                                <div className="stat-hero-label">{t("heroStatsProjectsDoneLabel")}</div>
                                <div className="stat-hero-value">13+</div>
                            </div>
                            <div className="stat-hero-icon" aria-hidden="true">
                                <i className="fas fa-sparkles"></i>
                            </div>
                        </div>
                        <div className="stat-hero-bar">
                            <i style={{ width: "78%" }}></i>
                        </div>
                    </div>

                    <div className="stat-hero-grid">
                        <div className="stat-hero">
                            <div className="stat-hero-label">{t("heroStatsYearsLabel")}</div>
                            <div className="stat-hero-value">8+</div>
                        </div>
                        <div className="stat-hero">
                            <div className="stat-hero-label">{t("heroStatsSatisfactionLabel")}</div>
                            <div className="stat-hero-value">100%</div>
                        </div>
                    </div>

                    <div className="stat-hero stat-hero-wide">
                        <div className="stat-hero-label">{t("heroSpecialtiesLabel")}</div>
                        <div className="hero-chips">
                            <span className="chip">React</span>
                            <span className="chip">TypeScript</span>
                            <span className="chip">Node.js</span>
                            <span className="chip">UI/UX</span>
                            <span className="chip">APIs</span>
                        </div>
                    </div>
                </aside>

            </div>
        </section>
    );
}
