import { useState } from "react";
import { useLanguage } from "../stores/languageStore";

type Project = {
    id: number;
    title: string;
    tags: string[];
    pill: string;
    descKey: "proj1" | "proj4" | "proj7" | "proj8";
    link: string;
    image: string;
    github: string | null;
    web: string | null;
};

function ProjectCard({ proj, t }: { proj: Project; t: (key: string) => string }) {
    const desc = t(proj.descKey);
    const [descExpanded, setDescExpanded] = useState(false);
    const descIsLong = desc.length > 130;

    const iconBtnBase =
        "w-12 h-12 rounded-full flex items-center justify-center text-white border backdrop-blur-md transition-all duration-300 pointer-events-auto " +
        "opacity-80 scale-100 border-white/25 bg-black/45 " +
        "group-hover:opacity-100 group-hover:scale-110 group-hover:border-[rgba(86,194,255,0.55)] group-hover:shadow-[0_0_22px_rgba(86,194,255,0.42)] " +
        "hover:bg-black/55 hover:scale-[1.14] focus-visible:opacity-100 focus-visible:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56C2FF]";

    return (
        <article className="relative flex flex-col gap-0 p-0 rounded-2xl group hover:shadow-[0_24px_60px_rgba(0,0,0,0.32)] duration-300 bg-gradient-to-b from-[rgba(14,30,52,0.82)] to-[rgba(8,18,32,0.72)] border border-[rgba(154,201,255,0.16)] overflow-hidden transition-transform hover:-translate-y-0.5">
            <div className="relative overflow-hidden w-full h-52 sm:h-60">
                <a href={proj.web || proj.github || "#"} target="_blank" rel="noreferrer">
                    <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover transition duration-500 ease-out brightness-100 scale-100 group-hover:brightness-[0.82] group-hover:scale-105"
                    />
                </a>
                <div className="absolute inset-0 flex items-center justify-center gap-3 sm:gap-4 pointer-events-none opacity-70 transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                    {proj.web && (
                        <a
                            href={proj.web}
                            target="_blank"
                            rel="noreferrer"
                            className={iconBtnBase}
                            aria-label={`${proj.title} — live site`}
                        >
                            <i className="fas fa-external-link-alt text-lg" aria-hidden />
                        </a>
                    )}
                    {proj.github && (
                        <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className={iconBtnBase}
                            aria-label={`${proj.title} — GitHub`}
                        >
                            <i className="fab fa-github text-xl" aria-hidden />
                        </a>
                    )}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div>
                        <a href={proj.web || proj.github || "#"} target="_blank" rel="noreferrer">
                            <h3 className="text-xl font-semibold m-0 group-hover:text-[#56C2FF] transition-colors duration-300">
                                {proj.title}
                            </h3>
                        </a>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-[rgba(86,194,255,0.12)] text-[#ccecff] border border-[rgba(86,194,255,0.32)] whitespace-nowrap">
                        {proj.pill}
                    </span>
                </div>

                <p
                    className={
                        "text-[#9FB2CC] text-sm leading-relaxed m-0 flex-grow " +
                        (descIsLong && !descExpanded ? "line-clamp-4" : "")
                    }
                >
                    {desc}
                </p>

                {descIsLong && (
                    <button
                        type="button"
                        className="mt-2 mb-4 self-start text-sm font-medium text-[#56C2FF] hover:text-[#7ad0ff] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56C2FF] rounded"
                        onClick={() => setDescExpanded((v) => !v)}
                        aria-expanded={descExpanded}
                    >
                        {descExpanded ? t("projectShowLess") : t("projectReadMore")}
                    </button>
                )}

                {!descIsLong && <div className="mb-2" />}

                <div className="mt-auto flex gap-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    {proj.web && (
                        <a
                            href={proj.web}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm text-[#9FB2CC] hover:text-[#56C2FF] transition-colors font-medium"
                        >
                            <i className="fas fa-external-link-alt" /> Web
                        </a>
                    )}
                    {proj.github && (
                        <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm text-[#9FB2CC] hover:text-[#56C2FF] transition-colors font-medium"
                        >
                            <i className="fab fa-github" /> GitHub
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}

export default function ProjectSection() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("all");

    const projects: Project[] = [
        { id: 8, title: "Gestion Truck", tags: ["web", "java"], pill: "SaaS • Fullstack", descKey: "proj8", link: "#", image: "/images/gestion_truck.png", github: null, web: null },
        { id: 7, title: "V y C Empresa", tags: ["web"], pill: "Web • Firebase", descKey: "proj7", link: "#", image: "/images/vyc_empresa.png", github: "https://github.com/Walasbrrr/vc-business-website", web: "https://vc-business-solutions.web.app" },
        { id: 1, title: "Hockey Manager", tags: ["java", "academic"], pill: "Java • CLI", descKey: "proj1", link: "https://github.com/Walasbrrr/University-Projects", image: "/images/hockey_manager.png", github: "https://github.com/Walasbrrr/University-Projects", web: null },
        { id: 4, title: "Gestor de tareas", tags: ["java"], pill: "Java • OOP", descKey: "proj4", link: "https://github.com/Walasbrrr/University-Projects", image: "/images/gestor_tareas.png", github: "https://github.com/Walasbrrr/University-Projects", web: null },
    ];

    const filteredProjects = projects.filter((p) => filter === "all" || p.tags.includes(filter));

    return (
        <section id="projects" className="section-block projects-section">
            <div className="container">
                <div className="section-head">
                    <h2>{t("projects")}</h2>
                    <p>{t("projectsTag")}</p>
                </div>

                <div className="filters">
                    <button
                        className={`tag-chip ${filter === "all" ? "active" : ""}`}
                        onClick={() => setFilter("all")}
                        aria-pressed={filter === "all"}
                    >
                        {t("all")}
                    </button>
                    <button
                        className={`tag-chip ${filter === "java" ? "active" : ""}`}
                        onClick={() => setFilter("java")}
                        aria-pressed={filter === "java"}
                    >
                        Java
                    </button>
                    <button
                        className={`tag-chip ${filter === "web" ? "active" : ""}`}
                        onClick={() => setFilter("web")}
                        aria-pressed={filter === "web"}
                    >
                        Web
                    </button>
                    <button
                        className={`tag-chip ${filter === "academic" ? "active" : ""}`}
                        onClick={() => setFilter("academic")}
                        aria-pressed={filter === "academic"}
                    >
                        {t("academic")}
                    </button>
                </div>

                <div className="cards project-grid">
                    {filteredProjects.map((proj) => (
                        <ProjectCard key={proj.id} proj={proj} t={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}
