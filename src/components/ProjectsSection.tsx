import { useLanguage } from "../context/LanguageContext";

export default function ProjectSection() {
    const { t } = useLanguage();
    return (
        <section id="projects" className="section-block projects-section">
            <div className="container">
                <div className="section-head">
                    <h2>{t("projects")}</h2>
                    <p>{t("projectsTag")}
                    </p>
                </div>

                <div className="cards project-grid">
                    <article className="card project-card">
                        <span className="pill">HTML / CSS / JS</span>
                        <h3>{t("projectOneTitle")}</h3>
                        <p>{t("projectOneText")}</p>
                    </article>

                    <article className="card project-card">
                        <span className="pill">UI Practice</span>
                        <h3>{t("projectTwoTitle")}</h3>
                        <p>{t("projectTwoText")}</p>
                    </article>

                    <article className="card project-card">
                        <span className="pill">Learning</span>
                        <h3>{t("projectThreeTitle")}</h3>
                        <p>{t("projectThreeText")}</p>
                    </article>
                </div>
            </div>
        </section>

    );
}