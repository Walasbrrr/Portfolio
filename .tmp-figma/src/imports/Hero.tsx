import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t, lang } = useLanguage();

    return (
        <section id="home" className="home">
            <div className="container hero-layout">

                <div className="hero-copy card hero-panel">

                    <p className="eyebrow">
                        {t("subtitle")}
                    </p>

                    <h1>
                        <span style={{ display: "block", fontSize: "1.4rem", color: "var(--muted)", marginBottom: "0.5rem" }}>
                            {lang === 'es' ? "Hola, soy " : "Hi, I'm "}
                        </span>
                        <span className="animated-gradient">Walen Calderon</span>
                    </h1>

                    <p className="hero-description">
                        {t("description")}
                    </p>

                    <div className="hero-actions">
                        <a className="cta-button primary" href="#projects">{t("ctaProjects")}</a>
                        <a className="cta-button secondary" href="#contact">{t("ctaContact")}</a>
                        <a className="cta-button secondary" href="#">{t("downloadCV")}</a>
                    </div>
                </div>

                <aside className="card hero-panel hero-side">
                    <div>
                        <strong style={{ fontSize: "1.2rem", display: "block", marginBottom: "0.5rem" }}>{t("quickProfile")}</strong>
                        <ul className="muted" style={{ margin: 0, paddingLeft: "18px", marginBottom: "1rem", lineHeight: "1.8" }}>
                            <li>{t("qp1")}</li>
                            <li>{t("qp2")}</li>
                            <li>{t("qp3")}</li>
                        </ul>
                    </div>

                    <div className="stat-list">
                        <div className="stat-item">
                            <strong>1.5+</strong>
                            <span>{t("yearsCoding")}</span>
                        </div>

                        <div className="stat-item">
                            <strong>8+</strong>
                            <span>{t("projectsDone")}</span>
                        </div>

                        <div className="stat-item">
                            <strong>100%</strong>
                            <span>{t("availability")}</span>
                        </div>
                    </div>
                </aside>

            </div>
        </section>
    );
}
