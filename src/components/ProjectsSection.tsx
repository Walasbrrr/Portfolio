import { useState } from "react";
import { useLanguage } from "../stores/languageStore";

export default function ProjectSection() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("all");

    const projects = [
        { id: 8, title: "Gestion Truck", tags: ["web", "java"], pill: "SaaS • Fullstack", descKey: "proj8", link: "#", image: "/images/gestion_truck.png", github: null, web: null },
        { id: 7, title: "V y C Empresa", tags: ["web"], pill: "Web • Firebase", descKey: "proj7", link: "#", image: "/images/vyc_empresa.png", github: "https://github.com/Walasbrrr/V-y-C-empresa", web: "https://vyc-empresa.vercel.app" },
        { id: 1, title: "Hockey Manager", tags: ["java", "academic"], pill: "Java • CLI", descKey: "proj1", link: "https://github.com/Walasbrrr/University-Projects", image: "/images/hockey_manager.png", github: "https://github.com/Walasbrrr/University-Projects", web: null },
        { id: 4, title: "Gestor de tareas", tags: ["java"], pill: "Java • OOP", descKey: "proj4", link: "https://github.com/Walasbrrr/University-Projects", image: "/images/gestor_tareas.png", github: "https://github.com/Walasbrrr/University-Projects", web: null },
    ];

    const filteredProjects = projects.filter(p => filter === "all" || p.tags.includes(filter));

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
                    >{t("all")}</button>
                    <button 
                        className={`tag-chip ${filter === "java" ? "active" : ""}`} 
                        onClick={() => setFilter("java")}
                        aria-pressed={filter === "java"}
                    >Java</button>
                    <button 
                        className={`tag-chip ${filter === "web" ? "active" : ""}`} 
                        onClick={() => setFilter("web")}
                        aria-pressed={filter === "web"}
                    >Web</button>
                    <button 
                        className={`tag-chip ${filter === "academic" ? "active" : ""}`} 
                        onClick={() => setFilter("academic")}
                        aria-pressed={filter === "academic"}
                    >{t("academic")}</button>
                </div>

                <div className="cards project-grid">
                    {filteredProjects.map((proj) => (
                        <article key={proj.id} className="relative flex flex-col gap-0 p-0 rounded-2xl group hover:shadow-[0_24px_60px_rgba(0,0,0,0.32)] duration-300 bg-gradient-to-b from-[rgba(14,30,52,0.82)] to-[rgba(8,18,32,0.72)] border border-[rgba(154,201,255,0.16)] overflow-hidden">
                            <div className="relative overflow-hidden w-full h-52 sm:h-60">
                                <a href={proj.web || proj.github || "#"} target="_blank" rel="noreferrer">
                                    <img
                                        src={proj.image}
                                        alt={proj.title}
                                        className="w-full h-full object-cover group-hover:brightness-50 group-hover:scale-110 transition duration-500 ease-out"
                                    />
                                </a>
                                {/* Overlay Icons on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    {proj.web && (
                                        <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                                            <i className="fas fa-external-link-alt text-lg"></i>
                                        </div>
                                    )}
                                    {proj.github && (
                                        <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                                            <i className="fab fa-github text-xl"></i>
                                        </div>
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
                                
                                <p className="text-[#9FB2CC] text-sm leading-relaxed mb-6 m-0 flex-grow">
                                    {t(proj.descKey)}
                                </p>

                                <div className="mt-auto flex gap-6 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                                    {proj.web && (
                                        <a href={proj.web} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#9FB2CC] hover:text-[#56C2FF] transition-colors font-medium">
                                            <i className="fas fa-external-link-alt"></i> Web
                                        </a>
                                    )}
                                    {proj.github && (
                                        <a href={proj.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#9FB2CC] hover:text-[#56C2FF] transition-colors font-medium">
                                            <i className="fab fa-github"></i> GitHub
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
