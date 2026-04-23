import { useLanguage } from "../stores/languageStore";

export default function ExperienceSection() {
    const { t } = useLanguage();

    return (
        <section id="experience" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("experience")}</h2>
                    <p className="muted" style={{ margin: 0 }}>{t("expHelp")}</p>
                </div>
                <div className="timeline" style={{ display: "grid", gap: "14px" }}>
                    <div className="tl-item" style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: "12px" }}>
                        <div className="tl-dot" style={{ width: "12px", height: "12px", marginTop: "6px", borderRadius: "50%", background: "linear-gradient(180deg, var(--brand), var(--brand-strong))", boxShadow: "0 0 0 4px rgba(86,194,255,0.18)" }}></div>
                        <div className="tl-card card" style={{ padding: "14px" }}>
                            <strong>Student Developer</strong> <span className="muted">· 2024 – 2025</span>
                            <p className="muted" style={{ margin: "8px 0 0" }}>{t("exp1")}</p>
                        </div>
                    </div>
                    <div className="tl-item" style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: "12px" }}>
                        <div className="tl-dot" style={{ width: "12px", height: "12px", marginTop: "6px", borderRadius: "50%", background: "linear-gradient(180deg, var(--brand), var(--brand-strong))", boxShadow: "0 0 0 4px rgba(86,194,255,0.18)" }}></div>
                        <div className="tl-card card" style={{ padding: "14px" }}>
                            <strong>Personal Projects</strong> <span className="muted">· 2023 – 2025</span>
                            <p className="muted" style={{ margin: "8px 0 0" }}>{t("exp2")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
