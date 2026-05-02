import { useEffect, useId, useState, type MouseEvent } from "react";
import { useLanguage } from "../stores/languageStore";

/** Keys that match src/i18n/translations.ts (projN + _preview, _problem, _role, _features). */
type ProjI18nPrefix = "proj1" | "proj4" | "proj7" | "proj8";

type Project = {
    id: number;
    title: string;
    tags: string[];
    /** Technology badges (collapsed + expanded “Technologies” section). */
    stack: string[];
    pill: string;
    image: string;
    github: string | null;
    web: string | null;
    /** Optional case study / docs URL for “View details” (shown only when set). */
    detailsUrl: string | null;
    i18nPrefix: ProjI18nPrefix;
};

function parseFeatureList(raw: string): string[] {
    return raw
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
}

function stopToggle(e: MouseEvent) {
    e.stopPropagation();
}

type ProjectCardProps = {
    proj: Project;
    expanded: boolean;
    onToggle: (id: number) => void;
    t: (key: string) => string;
};

/**
 * Expandable project card: preview lives in a real <button> (a11y); expanded body is a sibling with height animation.
 * Action links live only in the expanded panel and do not bubble to the toggle.
 */
function ProjectCard({ proj, expanded, onToggle, t }: ProjectCardProps) {
    const panelId = useId();
    const headerId = useId();
    const strings = {
        preview: t(`${proj.i18nPrefix}_preview`),
        full: t(proj.i18nPrefix),
        problem: t(`${proj.i18nPrefix}_problem`),
        role: t(`${proj.i18nPrefix}_role`),
        features: parseFeatureList(t(`${proj.i18nPrefix}_features`)),
    };

    const hasAnyLink = Boolean(proj.web || proj.github);
    const toggle = () => onToggle(proj.id);

    return (
        <article
            className={`rounded-2xl border border-[rgba(154,201,255,0.16)] bg-gradient-to-b from-[rgba(14,30,52,0.82)] to-[rgba(8,18,32,0.72)] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.32)] motion-reduce:transform-none motion-reduce:transition-shadow`}
        >
            <button
                type="button"
                id={headerId}
                className="w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56C2FF] rounded-t-2xl"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={toggle}
            >
                <div className="relative h-36 sm:h-44 w-full overflow-hidden rounded-t-2xl bg-[rgba(0,0,0,0.25)] shrink-0">
                    <img
                        src={proj.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <div
                        className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2 transition-opacity duration-300 ${expanded ? "opacity-0" : "opacity-100"}`}
                        aria-hidden
                    >
                        <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-[#ccecff] backdrop-blur-sm">
                            <i className="fas fa-chevron-down mr-1.5 text-[10px]" aria-hidden />
                            {t("projectExpandHint")}
                        </span>
                    </div>
                </div>

                <div className="px-5 pb-4 pt-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                        <h3 className="m-0 text-lg font-semibold text-white transition-colors sm:text-xl">{proj.title}</h3>
                        <span className="shrink-0 rounded-full border border-[rgba(86,194,255,0.32)] bg-[rgba(86,194,255,0.12)] px-3 py-1 text-xs font-medium text-[#ccecff]">
                            {proj.pill}
                        </span>
                    </div>
                    <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-[#9FB2CC]">{strings.preview}</p>
                    <div className="mb-2 flex flex-wrap gap-2">
                        {proj.stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-2.5 py-1 text-xs text-[#ccecff]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-1 text-xs text-[#9FB2CC]">
                        <span>{expanded ? t("projectClickToCollapse") : t("projectClickToExpand")}</span>
                        <i
                            className={`fas fa-chevron-down text-[#56C2FF] transition-transform duration-300 motion-reduce:transition-none ${expanded ? "rotate-180" : ""}`}
                            aria-hidden
                        />
                    </div>
                </div>
            </button>

            <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="min-h-0 overflow-hidden" inert={!expanded || undefined}>
                    <div
                        className={`space-y-4 border-t border-[rgba(255,255,255,0.06)] px-5 pb-5 transition-opacity duration-400 motion-reduce:transition-none ${expanded ? "opacity-100" : "opacity-0"}`}
                    >
                        <section>
                            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#56C2FF]">
                                {t("projectLabelFull")}
                            </h4>
                            <p className="m-0 text-sm leading-relaxed text-[#9FB2CC]">{strings.full}</p>
                        </section>
                        <section>
                            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#56C2FF]">
                                {t("projectLabelProblem")}
                            </h4>
                            <p className="m-0 text-sm leading-relaxed text-[#9FB2CC]">{strings.problem}</p>
                        </section>
                        <section>
                            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#56C2FF]">
                                {t("projectLabelRole")}
                            </h4>
                            <p className="m-0 text-sm leading-relaxed text-[#9FB2CC]">{strings.role}</p>
                        </section>
                        <section>
                            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#56C2FF]">
                                {t("projectLabelTech")}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {proj.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded-full border border-[rgba(86,194,255,0.25)] bg-[rgba(86,194,255,0.08)] px-2.5 py-1 text-xs text-[#ccecff]"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </section>
                        <section>
                            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-[#56C2FF]">
                                {t("projectLabelFeatures")}
                            </h4>
                            <ul className="m-0 list-inside list-disc space-y-1 pl-1 text-sm text-[#9FB2CC] marker:text-[#56C2FF]">
                                {strings.features.map((item) => (
                                    <li key={item} className="pl-0.5">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <div
                            className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap"
                            onClick={stopToggle}
                        >
                            {proj.web ? (
                                <a
                                    href={proj.web}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[rgba(86,194,255,0.45)] bg-gradient-to-r from-[#56C2FF] to-[#7EA0FF] px-4 py-3 text-center text-sm font-semibold text-[#04101d] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56C2FF] sm:w-auto sm:flex-1"
                                    aria-label={`${proj.title} — ${t("projectLiveDemo")} (${t("projectOpenNewTab")})`}
                                >
                                    <i className="fas fa-external-link-alt" aria-hidden />
                                    {t("projectLiveDemo")}
                                </a>
                            ) : null}
                            {proj.github ? (
                                <a
                                    href={proj.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.06)] px-4 py-3 text-center text-sm font-semibold text-[#EAF2FF] transition hover:border-[rgba(86,194,255,0.35)] hover:text-[#56C2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#56C2FF] sm:w-auto sm:flex-1"
                                    aria-label={`${proj.title} — ${t("projectGitHub")} (${t("projectOpenNewTab")})`}
                                >
                                    <i className="fab fa-github" aria-hidden />
                                    {t("projectGitHub")}
                                </a>
                            ) : null}
                            {proj.detailsUrl ? (
                                <a
                                    href={proj.detailsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl border border-dashed border-[rgba(154,201,255,0.35)] bg-transparent px-4 py-3 text-center text-sm font-semibold text-[#ccecff] transition hover:border-[#56C2FF] hover:text-[#56C2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#56C2FF] sm:w-auto sm:flex-1"
                                    aria-label={`${proj.title} — ${t("projectViewDetails")} (${t("projectOpenNewTab")})`}
                                >
                                    <i className="fas fa-info-circle" aria-hidden />
                                    {t("projectViewDetails")}
                                </a>
                            ) : null}
                            {!hasAnyLink ? (
                                <p className="m-0 text-sm leading-snug text-[#9FB2CC]/90">{t("projectComingSoon")}</p>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function ProjectSection() {
    const { t } = useLanguage();
    const [filter, setFilter] = useState("all");
    const [openId, setOpenId] = useState<number | null>(null);

    useEffect(() => {
        setOpenId(null);
    }, [filter]);

    const projects: Project[] = [
        {
            id: 8,
            title: "Gestion Truck",
            tags: ["web", "java"],
            stack: ["Java", "Spring", "React", "TypeScript"],
            pill: "SaaS • Fullstack",
            image: "/images/gestion_truck.png",
            github: null,
            web: null,
            detailsUrl: null,
            i18nPrefix: "proj8",
        },
        {
            id: 7,
            title: "V y C Empresa",
            tags: ["web"],
            stack: ["React", "TypeScript", "Firebase", "CSS"],
            pill: "Web • Firebase",
            image: "/images/vyc_empresa.png",
            github: "https://github.com/Walasbrrr/vc-business-website",
            web: "https://vc-business-solutions.web.app",
            detailsUrl: null,
            i18nPrefix: "proj7",
        },
        {
            id: 1,
            title: "Hockey Manager",
            tags: ["java", "academic"],
            stack: ["Java", "CLI", "File I/O"],
            pill: "Java • CLI",
            image: "/images/hockey_manager.png",
            github: "https://github.com/Walasbrrr/University-Projects",
            web: null,
            detailsUrl: null,
            i18nPrefix: "proj1",
        },
        {
            id: 4,
            title: "Gestor de tareas",
            tags: ["java"],
            stack: ["Java", "OOP", "Files"],
            pill: "Java • OOP",
            image: "/images/gestor_tareas.png",
            github: "https://github.com/Walasbrrr/University-Projects",
            web: null,
            detailsUrl: null,
            i18nPrefix: "proj4",
        },
    ];

    const toggleCard = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

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
                        <ProjectCard
                            key={proj.id}
                            proj={proj}
                            expanded={openId === proj.id}
                            onToggle={toggleCard}
                            t={t}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
