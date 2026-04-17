import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
    const { t, lang } = useLanguage();

    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setDeleting] = useState(false);

    useEffect(() => {
        setText("");
        setPhraseIndex(0);
        setDeleting(false);
    }, [lang]);

    useEffect(() => {
        const phrases = [t("typingOne"), t("typingTwo")];

        let timeoutId;
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
    }, [text, phraseIndex, isDeleting, t]);

    return (
        <section id="home" className="home">
            <div className="container hero-layout">

                <div className="hero-copy card hero-panel">

                    <p className="eyebrow">
                        {t("subtitle")}
                    </p>

                    <h1>
                        <span>{text}</span>
                        <span className="cursor">|</span>
                    </h1>

                    <p className="hero-description">
                        {t("description")}</p>

                    <div className="hero-actions">
                        <a className="cta-button primary" href="#projects">{t("ctaProjects")}</a>
                        <a className="cta-button secondary" href="#contact">{t("ctaContact")}</a>
                    </div>
                </div>

                <aside className="card hero-panel hero-side">
                    <span className="pill">{t("status")}</span>

                    <div className="stat-list">
                        <div className="stat-item">
                            <strong>3+</strong>
                            <span>{t("statProjects")}</span>
                        </div>

                        <div className="stat-item">
                            <strong>HTML</strong>
                            <span>{t("statFrontend")}</span>
                        </div>

                        <div className="stat-item">
                            <strong>JS</strong>
                            <span>{t("statInteractive")}</span>
                        </div>
                    </div>
                </aside>

            </div>
        </section>
    );
}
