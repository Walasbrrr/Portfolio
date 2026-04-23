import { useLanguage } from "../stores/languageStore";

export default function EducationSection() {
    const { t } = useLanguage();

    return (
        <section id="education" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("education")}</h2>
                    <p className="muted" style={{ margin: 0 }}>{t("eduHelp")}</p>
                </div>
                <div className="cards two-columns">
                    <article className="card">
                        <strong>Middlesex College</strong> <span className="muted">· A.S. Computer Science</span>
                        <p className="muted" style={{ margin: "8px 0 0" }}>{t("edu1")}</p>
                    </article>
                    <article className="card">
                        <strong>Certificados / Cursos</strong>
                        <ul className="muted" style={{ margin: "8px 0 0", paddingLeft: "18px" }}>
                            <li>{t("cert1")}</li>
                            <li>{t("cert2")}</li>
                            <li>{t("cert3")}</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}
