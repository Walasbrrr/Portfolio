import { useLanguage } from "../stores/languageStore";

export default function SkillsSection() {
    const { t } = useLanguage();

    const technicalSkills = [
        { name: "Java", width: "84%" },
        { name: "HTML", width: "88%" },
        { name: "CSS", width: "72%" },
        { name: "JavaScript", width: "68%" },
        { name: "Git", width: "70%" },
    ];

    const softSkills = [
        { key: "skillOne" as const, icon: "fas fa-puzzle-piece" },
        { key: "skillTwo" as const, icon: "fas fa-lightbulb" },
        { key: "skillFive" as const, icon: "fab fa-java" },
        { key: "skillSix" as const, icon: "fas fa-microchip" },
        { key: "skillThree" as const, icon: "fas fa-book-open" },
        { key: "skillFour" as const, icon: "fab fa-git-alt" },
    ];

    return (
        <section id="skills" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("skills")}</h2>
                    <p>{t("skillsTag")}</p>
                </div>

                <div className="cards two-columns items-stretch">
                    <article className="card skill-card flex flex-col justify-center h-full">
                        <h3 className="mb-6">{t("skillTechTitle")}</h3>
                        <div className="flex flex-col gap-5">
                            {technicalSkills.map((skill, index) => (
                                <div className="skill-row" key={skill.name}>
                                    <span>{skill.name}</span>
                                    <div className="bar relative overflow-hidden bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                                        <span
                                            className="skill-bar-fill absolute left-0 top-0 h-full bg-[#56C2FF] rounded-full shadow-[0_0_10px_rgba(86,194,255,0.8)]"
                                            style={
                                                {
                                                    "--skill-bar-target": skill.width,
                                                    "--skill-bar-delay": `${index * 0.1}s`,
                                                } as React.CSSProperties
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article className="card skill-card flex flex-col h-full">
                        <div className="mb-6">
                            <h3 className="m-0 mb-1">{t("skillSoftTitle")}</h3>
                        </div>

                        <div className="tag-list flex-grow flex flex-wrap content-start gap-3">
                            {softSkills.map((skill) => (
                                <span
                                    key={skill.key}
                                    className="tag-chip flex items-center gap-2 px-4 py-2 hover:bg-[rgba(86,194,255,0.1)] transition-colors duration-300"
                                >
                                    <i className={`${skill.icon} text-[#56C2FF]`}></i>
                                    {t(skill.key)}
                                </span>
                            ))}
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
