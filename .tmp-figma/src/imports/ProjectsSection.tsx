import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

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

                <div className="filters" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    <button 
                        className={`tag-chip ${filter === "all" ? "active" : ""}`} 
                        onClick={() => setFilter("all")}
                        aria-pressed={filter === "all"}
                        style={{ cursor: "pointer", background: filter === "all" ? "rgba(255,255,255,0.1)" : "", color: filter === "all" ? "var(--text)" : "" }}
                    >{t("all")}</button>
                    <button 
                        className={`tag-chip ${filter === "java" ? "active" : ""}`} 
                        onClick={() => setFilter("java")}
                        aria-pressed={filter === "java"}
                        style={{ cursor: "pointer", background: filter === "java" ? "rgba(255,255,255,0.1)" : "", color: filter === "java" ? "var(--text)" : "" }}
                    >Java</button>
                    <button 
                        className={`tag-chip ${filter === "web" ? "active" : ""}`} 
                        onClick={() => setFilter("web")}
                        aria-pressed={filter === "web"}
                        style={{ cursor: "pointer", background: filter === "web" ? "rgba(255,255,255,0.1)" : "", color: filter === "web" ? "var(--text)" : "" }}
                    >Web</button>
                    <button 
                        className={`tag-chip ${filter === "academic" ? "active" : ""}`} 
                        onClick={() => setFilter("academic")}
                        aria-pressed={filter === "academic"}
                        style={{ cursor: "pointer", background: filter === "academic" ? "rgba(255,255,255,0.1)" : "", color: filter === "academic" ? "var(--text)" : "" }}
                    >{t("academic")}</button>
                </div>

                <div className="cards project-grid">
                    {filteredProjects.map((proj) => (
                        <article key={proj.id} className="card project-card" style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
                            <span className="pill" style={{ marginBottom: "0.5rem" }}>{proj.pill}</span>
                            <h3 style={{ margin: 0 }}>{proj.title}</h3>
                            <p style={{ margin: 0 }}>{t(proj.descKey)}</p>
                            <div style={{ marginTop: "auto", paddingTop: "1rem" }}>
                                <a className="cta-button secondary" href={proj.link} style={{ padding: "0.5rem 1rem", minWidth: "auto", fontSize: "0.9rem" }}>
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