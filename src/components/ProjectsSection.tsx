import { useEffect, useId, useState, useRef, type MouseEvent } from "react";
import { useLanguage } from "../stores/languageStore";
import {
    ExternalLink,
    Layers,
    Cpu,
    Database,
    Shield,
    ChevronDown,
    Sparkles,
} from "lucide-react";

/** Keys that match src/i18n/translations.ts (projN + _preview, _problem, _role, _features). */
type ProjI18nPrefix = "proj1" | "proj4" | "proj7" | "proj8";

interface ArchitectureSpecs {
    pattern: string;
    persistence: string;
    infrastructure: string;
    highlights: string[];
}

type Project = {
    id: number;
    title: string;
    tags: string[];
    stack: string[];
    pill: string;
    image: string;
    github: string | null;
    web: string | null;
    detailsUrl: string | null;
    i18nPrefix: ProjI18nPrefix;
    specs: ArchitectureSpecs;
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
    lang: string;
};

/**
 * Enhanced Layered Project Card:
 * - Reactive Spotlight cursor effect on border & background
 * - Dual-layer tab: [Product View] vs [Architecture Radiography]
 */
function ProjectCard({ proj, expanded, onToggle, t, lang }: ProjectCardProps) {
    const cardRef = useRef<HTMLElement>(null);
    const panelId = useId();
    const headerId = useId();
    const [activeTab, setActiveTab] = useState<"overview" | "architecture">("overview");

    const strings = {
        preview: t(`${proj.i18nPrefix}_preview`),
        full: t(proj.i18nPrefix),
        problem: t(`${proj.i18nPrefix}_problem`),
        role: t(`${proj.i18nPrefix}_role`),
        features: parseFeatureList(t(`${proj.i18nPrefix}_features`)),
    };

    const toggle = () => onToggle(proj.id);

    // Mouse proximity spotlight effect
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    };

    return (
        <article
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group relative rounded-2xl border border-[rgba(154,201,255,0.16)] bg-gradient-to-b from-[rgba(14,30,52,0.85)] to-[rgba(8,18,32,0.78)] shadow-[0_8px_32px_rgba(0,0,0,0.25)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_64px_rgba(0,0,0,0.45)] hover:border-[#56C2FF]/40 motion-reduce:transform-none"
        >
            {/* Spotlight Radial Background Glow */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(86, 194, 255, 0.12), transparent 75%)",
                }}
                aria-hidden="true"
            />

            <button
                type="button"
                id={headerId}
                className="w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56C2FF] rounded-t-2xl"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={toggle}
            >
                <div className="relative h-44 sm:h-52 w-full overflow-hidden rounded-t-2xl bg-[rgba(0,0,0,0.35)] shrink-0">
                    <img
                        src={proj.image}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081220] via-transparent to-transparent opacity-80" />

                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs font-mono text-[#ccecff] backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#56C2FF]" />
                        <span>{proj.pill}</span>
                    </div>

                    {/* Expand hint */}
                    <div
                        className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-2 transition-opacity duration-300 ${expanded ? "opacity-0" : "opacity-100"}`}
                        aria-hidden
                    >
                        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-[#ccecff] backdrop-blur-sm border border-white/10">
                            <ChevronDown className="inline mr-1 h-3 w-3" />
                            {t("projectExpandHint")}
                        </span>
                    </div>
                </div>

                <div className="px-5 pb-4 pt-4">
                    <div className="mb-2 flex items-start justify-between gap-3">
                        <h3 className="m-0 text-lg font-semibold text-white transition-colors group-hover:text-[#56C2FF] sm:text-xl">
                            {proj.title}
                        </h3>
                    </div>
                    <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-[#9FB2CC]">
                        {strings.preview}
                    </p>
                    <div className="mb-2 flex flex-wrap gap-1.5">
                        {proj.stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-md border border-[rgba(255,255,255,0.08)] bg-white/5 px-2 py-0.5 text-[11px] font-mono text-[#ccecff]"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center justify-between gap-2 pt-2 text-xs font-mono text-[#9FB2CC]/80">
                        <span>{expanded ? t("projectClickToCollapse") : t("projectClickToExpand")}</span>
                        <ChevronDown
                            className={`h-4 w-4 text-[#56C2FF] transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                        />
                    </div>
                </div>
            </button>

            {/* Expandable Layer Panel */}
            <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
                <div className="min-h-0 overflow-hidden" inert={!expanded || undefined}>
                    <div
                        className={`border-t border-[rgba(255,255,255,0.08)] px-5 pb-5 pt-3 transition-opacity duration-400 ${expanded ? "opacity-100" : "opacity-0"}`}
                    >
                        {/* Dual-Layer Tabs: Overview vs Architecture */}
                        <div
                            className="mb-4 flex items-center gap-1 rounded-xl border border-white/10 bg-black/40 p-1"
                            onClick={stopToggle}
                        >
                            <button
                                type="button"
                                onClick={() => setActiveTab("overview")}
                                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition ${
                                    activeTab === "overview"
                                        ? "bg-[#56C2FF]/20 text-white shadow-sm border border-[#56C2FF]/30"
                                        : "text-[#9FB2CC] hover:text-white"
                                }`}
                            >
                                <Sparkles className="h-3.5 w-3.5 text-[#56C2FF]" />
                                <span>{lang === "es" ? "Resumen Producto" : "Product Overview"}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("architecture")}
                                className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition ${
                                    activeTab === "architecture"
                                        ? "bg-[#56C2FF]/20 text-white shadow-sm border border-[#56C2FF]/30"
                                        : "text-[#9FB2CC] hover:text-white"
                                }`}
                            >
                                <Cpu className="h-3.5 w-3.5 text-[#56C2FF]" />
                                <span>{lang === "es" ? "Radiografía Técnica" : "Architecture Specs"}</span>
                            </button>
                        </div>

                        {/* TAB 1: PRODUCT OVERVIEW */}
                        {activeTab === "overview" && (
                            <div className="space-y-3 animate-in fade-in duration-200">
                                <section>
                                    <h4 className="mb-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#56C2FF]">
                                        {t("projectLabelFull")}
                                    </h4>
                                    <p className="m-0 text-sm leading-relaxed text-[#9FB2CC]">
                                        {strings.full}
                                    </p>
                                </section>
                                <section>
                                    <h4 className="mb-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#56C2FF]">
                                        {t("projectLabelProblem")}
                                    </h4>
                                    <p className="m-0 text-sm leading-relaxed text-[#9FB2CC]">
                                        {strings.problem}
                                    </p>
                                </section>
                                <section>
                                    <h4 className="mb-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#56C2FF]">
                                        {t("projectLabelRole")}
                                    </h4>
                                    <p className="m-0 text-sm leading-relaxed text-[#9FB2CC]">
                                        {strings.role}
                                    </p>
                                </section>
                                <section>
                                    <h4 className="mb-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#56C2FF]">
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
                            </div>
                        )}

                        {/* TAB 2: ARCHITECTURE RADIOGRAPHY */}
                        {activeTab === "architecture" && (
                            <div className="space-y-3 rounded-xl border border-white/5 bg-black/25 p-3.5 font-mono text-xs animate-in fade-in duration-200">
                                <div>
                                    <div className="flex items-center gap-1.5 text-[#56C2FF] font-semibold mb-1">
                                        <Layers className="h-3.5 w-3.5" />
                                        <span>SYSTEM PATTERN:</span>
                                    </div>
                                    <p className="text-[#EAF2FF] pl-5 leading-relaxed">
                                        {proj.specs.pattern}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-[#56C2FF] font-semibold mb-1">
                                        <Database className="h-3.5 w-3.5" />
                                        <span>DATA & PERSISTENCE:</span>
                                    </div>
                                    <p className="text-[#EAF2FF] pl-5 leading-relaxed">
                                        {proj.specs.persistence}
                                    </p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-1.5 text-[#56C2FF] font-semibold mb-1">
                                        <Shield className="h-3.5 w-3.5" />
                                        <span>INFRASTRUCTURE & OPS:</span>
                                    </div>
                                    <p className="text-[#EAF2FF] pl-5 leading-relaxed">
                                        {proj.specs.infrastructure}
                                    </p>
                                </div>
                                <div className="border-t border-white/10 pt-2 mt-2">
                                    <span className="text-[#9FB2CC]/80">HIGHLIGHTS:</span>
                                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                                        {proj.specs.highlights.map((h) => (
                                            <span
                                                key={h}
                                                className="rounded bg-[#56C2FF]/10 border border-[#56C2FF]/20 px-2 py-0.5 text-[10px] text-[#56C2FF]"
                                            >
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div
                            className="flex flex-col gap-2 pt-4 sm:flex-row sm:flex-wrap"
                            onClick={stopToggle}
                        >
                            {proj.web ? (
                                <a
                                    href={proj.web}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full min-h-[42px] items-center justify-center gap-2 rounded-xl border border-[rgba(86,194,255,0.45)] bg-gradient-to-r from-[#56C2FF] to-[#7EA0FF] px-4 py-2.5 text-center text-sm font-semibold text-[#04101d] transition hover:opacity-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#56C2FF] sm:w-auto sm:flex-1"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    <span>{t("projectLiveDemo")}</span>
                                </a>
                            ) : null}
                            {proj.github ? (
                                <a
                                    href={proj.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-center text-sm font-semibold text-[#EAF2FF] transition hover:border-[#56C2FF]/40 hover:text-[#56C2FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#56C2FF] sm:w-auto sm:flex-1"
                                >
                                    <i className="fab fa-github" aria-hidden="true"></i>
                                    <span>{t("projectGitHub")}</span>
                                </a>
                            ) : null}
                            {proj.detailsUrl ? (
                                <a
                                    href={proj.detailsUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex w-full min-h-[42px] items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 bg-transparent px-4 py-2.5 text-center text-sm font-semibold text-[#ccecff] transition hover:border-[#56C2FF] hover:text-[#56C2FF] sm:w-auto sm:flex-1"
                                >
                                    {t("projectViewDetails")}
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function ProjectSection() {
    const { t, lang } = useLanguage();
    const [filter, setFilter] = useState("all");
    const [openId, setOpenId] = useState<number | null>(null);

    useEffect(() => {
        setOpenId(null);
    }, [filter]);

    const projects: Project[] = [
        {
            id: 8,
            title: "Gestion Truck Platform",
            tags: ["web", "java", "backend"],
            stack: ["Java", "Spring Boot", "PostgreSQL", "React", "Docker", "TypeScript"],
            pill: "Logistics SaaS",
            image: "/images/gestion_truck.png",
            github: null,
            web: "https://gestion-truck-app.vercel.app/",
            detailsUrl: null,
            i18nPrefix: "proj8",
            specs: {
                pattern: "Domain-Driven Service Architecture with RESTful API endpoints.",
                persistence: "PostgreSQL with connection pooling, transactional integrity, and normalized schema for fleet, routes, and shipments.",
                infrastructure: "Dockerized container orchestration; multi-stage builds; Vercel edge deployment for the frontend dashboard.",
                highlights: ["Fleet telemetry", "Driver workflow engine", "Document persistence", "ACID transactions"],
            },
        },
        {
            id: 1,
            title: "ComfyByte Studio",
            tags: ["web", "design"],
            stack: ["Next.js", "TypeScript", "Tailwind CSS", "Design Tokens", "Editorial UI"],
            pill: "Studio & Systems",
            image: "/images/comfybyte_studio.png",
            github: "https://github.com/Walasbrrr/comfybyte-website",
            web: "https://comfybyte.dev",
            detailsUrl: null,
            i18nPrefix: "proj1",
            specs: {
                pattern: "Editorial multi-scene design system ('Serious software. Soft edges.').",
                persistence: "Static-site generation with localized token specimens and automated build pipelines.",
                infrastructure: "Edge CDN hosting with instant cache revalidation; zero-runtime layout shift.",
                highlights: ["Tokens system", "Variable typography", "Custom scroll choreography", "High FPS"],
            },
        },
        {
            id: 7,
            title: "V&C Soluciones Financieras",
            tags: ["web", "fintech"],
            stack: ["React", "TypeScript", "Tailwind CSS", "Financial Modules", "Security"],
            pill: "Fintech Platform",
            image: "/images/vc_financiera.png",
            github: "https://github.com/Walasbrrr/financiera-platform",
            web: null,
            detailsUrl: null,
            i18nPrefix: "proj7",
            specs: {
                pattern: "Modular payment schedule matrix (5 weeks x 7 days) tied to client installment logic.",
                persistence: "Encapsulated ledger model ensuring deterministic payment calculation and verification.",
                infrastructure: "Hardened security checklist, zero sensitive client-side credentials, TLS-enforced endpoints.",
                highlights: ["Payment calendar module", "Security foundations", "Bilingual customer experience", "Responsive grid"],
            },
        },
        {
            id: 4,
            title: "WalenOS & Systems Homelab",
            tags: ["systems", "academic"],
            stack: ["Linux (Arch/Debian)", "Obsidian", "Docker", "Shell", "Self-Hosting"],
            pill: "Knowledge & Homelab",
            image: "/images/gestor_tareas.png",
            github: "https://github.com/Walasbrrr/WalenOS",
            web: null,
            detailsUrl: null,
            i18nPrefix: "proj4",
            specs: {
                pattern: "Canonical knowledge graph linking technical research, systems operations, and active tasks.",
                persistence: "Distributed Git-backed Markdown vault with atomic frontmatter metadata and automated backups.",
                infrastructure: "Arch & Debian homelab servers running self-hosted containerized services, SSH keys, and dotfiles.",
                highlights: ["Atomic knowledge linking", "Reproducible dotfiles", "Automated backup scripts", "Linux server ops"],
            },
        },
    ];

    const toggleCard = (id: number) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    const filteredProjects = projects.filter((p) => filter === "all" || p.tags.includes(filter));

    return (
        <section id="projects" className="section-block projects-section relative">
            <div className="container">
                <div className="section-head">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-mono text-[#56C2FF] tracking-wider uppercase">
                            [LAYER:02 // SELECTED SYSTEMS]
                        </span>
                    </div>
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
                        Backend & Java
                    </button>
                    <button
                        className={`tag-chip ${filter === "web" ? "active" : ""}`}
                        onClick={() => setFilter("web")}
                        aria-pressed={filter === "web"}
                    >
                        Web & Systems
                    </button>
                    <button
                        className={`tag-chip ${filter === "systems" ? "active" : ""}`}
                        onClick={() => setFilter("systems")}
                        aria-pressed={filter === "systems"}
                    >
                        Homelab & OS
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
                            lang={lang}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
