import { useState } from "react";
import { useLanguage } from "../stores/languageStore";

export default function ProjectSection() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("all");

    const projects = [
        { id: 1, title: "Hockey Manager", tags: ["java", "academic"], pill: "Java • CLI", descKey: "proj1", link: "#" },
        { id: 2, title: "Calculadora accesible", tags: ["web"], pill: "Web • HTML/CSS", descKey: "proj2", link: "#" },
        { id: 3, title: "To-Do", tags: ["web"], pill: "Web • JS", descKey: "proj3", link: "#" },
        { id: 4, title: "Gestor de tareas", tags: ["java"], pill: "Java • OOP", descKey: "proj4", link: "#" },
        { id: 5, title: "Portfolio v1", tags: ["web", "academic"], pill: "Web • JS", descKey: "proj5", link: "#" },
        { id: 6, title: "Clima simple", tags: ["web"], pill: "Web • API", descKey: "proj6", link: "#" },
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
                        <article key={proj.id} className="card project-card">
                            <span className="pill">{proj.pill}</span>
                            <h3>{proj.title}</h3>
                            <p>{t(proj.descKey)}</p>
                            <div className="project-card-actions">
                                <a className="cta-button secondary project-card-cta" href={proj.link}>
                                    {t("viewWork")}
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>

    );
}
