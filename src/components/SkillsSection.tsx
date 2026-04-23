import { useLanguage } from "../stores/languageStore";

export default function SkillsSection() {
    const { t } = useLanguage();
    return (
        <section id="skills" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("skills")}</h2>
                    <p>{t("skillsTag")}
                    </p>
                </div>

                <div className="cards two-columns">
                    <article className="card skill-card">
                        <h3>{t("skillTechTitle")}</h3>
                        <div className="skill-row">
                            <span>Java</span>
                            <div className="bar"><i style={{ width: "84%" }}></i></div>
                        </div>
                        <div className="skill-row">
                            <span>HTML</span>
                            <div className="bar"><i style={{ width: "88%" }}></i></div>
                        </div>
                        <div className="skill-row">
                            <span>CSS</span>
                            <div className="bar"><i style={{ width: "72%" }}></i></div>
                        </div>
                        <div className="skill-row">
                            <span>JavaScript</span>
                            <div className="bar"><i style={{ width: "68%" }}></i></div>
                        </div>
                        <div className="skill-row">
                            <span>Git</span>
                            <div className="bar"><i style={{ width: "70%" }}></i></div>
                        </div>
                    </article>

                    <article className="card skill-card">
                        <h3>{t("skillSoftTitle")}</h3>
                        <div className="tag-list">
                            <span className="tag-chip">{t("skillOne")}</span>
                            <span className="tag-chip">{t("skillTwo")}</span>
                            <span className="tag-chip">{t("skillFive")}</span>
                            <span className="tag-chip">{t("skillSix")}</span>
                            <span className="tag-chip">{t("skillThree")}</span>
                            <span className="tag-chip">{t("skillFour")}</span>
                        </div>
                    </article>
                </div>
            </div>
        </section>


    );
}
