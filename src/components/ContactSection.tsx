import { useLanguage } from "../context/LanguageContext";

export default function ContactSection() {
    const { t } = useLanguage();
    return (
        <section id="contact" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("contact")}</h2>
                    <p>{t("contactTag")}
                    </p>
                </div>

                <div className="card contact-card">
                    <p>{t("contactText")}</p>

                    <div className="hero-actions">
                        <a className="cta-button secondary" href="mailto:walenculd@gmail.com"
                        >walenculd@gmail.com</a
                        >
                        <a
                            className="cta-button secondary"
                            href="https://github.com/Walasbrrr"
                            target="_blank"
                            rel="noreferrer">GitHub</a
                        >
                        <a
                            className="cta-button secondary"
                            href="https://www.linkedin.com/in/walen-calderon-a017b42a4/"
                            target="_blank"
                            rel="noreferrer">LinkedIn</a
                        >
                    </div>
                </div>
            </div>
        </section>
    );
}