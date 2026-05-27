import { useLanguage } from "../stores/languageStore";

export default function SkillsSection() {
    const { t } = useLanguage();

    const skillGroups = [
        {
            title: t("skillBackendTitle"),
            icon: "fas fa-server",
            skills: [
                "Java",
                "Spring Boot",
                "REST APIs",
                "PostgreSQL",
                "Flyway",
                "Gradle",
                "Docker",
                "Integration Testing",
            ],
        },
        {
            title: t("skillFrontendTitle"),
            icon: "fas fa-code",
            skills: [
                "React",
                "TypeScript",
                "Next.js",
                "Tailwind CSS",
                "Responsive Design",
                "Dashboard UI",
            ],
        },
        {
            title: t("skillInfrastructureTitle"),
            icon: "fas fa-network-wired",
            skills: [
                "Docker Compose",
                "Linux",
                "Raspberry Pi",
                "SSH",
                "Portainer",
                "Environment Configuration",
            ],
        },
        {
            title: t("skillProductTitle"),
            icon: "fas fa-truck",
            skills: [
                "Fleet Management",
                "Driver Management",
                "Shipment Tracking",
                "Route Planning",
                "Role-Based Workflows",
                "Technical Documentation",
            ],
        },
    ];

    const stackHighlights = [
        "Java",
        "Spring Boot",
        "PostgreSQL",
        "Docker",
        "React",
        "TypeScript",
        "Tailwind",
        "GitHub",
        "Linux",
        "Raspberry Pi",
    ];

    return (
        <section id="skills" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("skills")}</h2>
                    <p>{t("skillsTag")}</p>
                </div>

                <div className="skill-stack-strip mb-5">
                    <span className="skill-stack-label">{t("skillStackTitle")}</span>
                    <div className="tag-list">
                        {stackHighlights.map((skill) => (
                            <span key={skill} className="tag-chip skill-highlight-chip">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="cards skill-grid">
                    {skillGroups.map((group) => (
                        <article className="card skill-card skill-category-card" key={group.title}>
                            <div className="skill-category-head">
                                <span className="skill-category-icon" aria-hidden>
                                    <i className={group.icon}></i>
                                </span>
                                <h3>{group.title}</h3>
                            </div>
                            <div className="tag-list">
                                {group.skills.map((skill) => (
                                    <span key={skill} className="tag-chip">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <article className="card skill-card logistics-summary">
                    <div>
                        <h3>{t("skillPlatformTitle")}</h3>
                        <p>{t("skillPlatformText")}</p>
                    </div>
                    <a className="cta-button secondary" href="#projects">
                        <i className="fas fa-arrow-up-right-from-square" aria-hidden></i>
                        {t("projectViewDetails")}
                    </a>
                </article>
            </div>
        </section>
    );
}
