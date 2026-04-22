import { useLanguage } from "../context/LanguageContext";


export default function AboutSection() {
    const { t } = useLanguage();
    return (
        <section id="about" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("about")}</h2>
                    <p>{t("aboutTag")}</p>
                </div>

                <div className="cards two-columns">
                    <article className="card">
                        <h3>{t("aboutJourneyTitle")}</h3>
                        <p>{t("aboutJourneyText")}</p>
                    </article>

                    <article className="card">
                        <h3>{t("aboutGoalTitle")}</h3>
                        <p>{t("aboutGoalText")}</p>
                    </article>
                </div>
            </div>
        </section>
    );
}