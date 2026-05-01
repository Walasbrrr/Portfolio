import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../stores/languageStore";

const GITHUB_USER = "Walasbrrr";
const GH_CACHE_KEY = "gh_public_repos_v1";
const GH_CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const CV_MAILTO =
    "mailto:walenculd@gmail.com?subject=CV%20request%20%E2%80%94%20portfolio&body=Hi%20Walen%2C%0A%0A";

type RepoFetchState =
    | { status: "loading" }
    | { status: "ok"; count: number }
    | { status: "error" };

function readCachedPublicRepos(): number | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(GH_CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw) as { count?: number; at?: number };
        if (typeof parsed.count !== "number" || typeof parsed.at !== "number") return null;
        if (Date.now() - parsed.at > GH_CACHE_TTL_MS) return null;
        return parsed.count;
    } catch {
        return null;
    }
}

function publicRepoBarPercent(count: number): string {
    const pct = Math.round((count / 40) * 100);
    return `${Math.min(100, Math.max(16, pct))}%`;
}

export default function Hero() {
    const { t, lang } = useLanguage();
    const [typedSubtitle, setTypedSubtitle] = useState("");
    const [repoState, setRepoState] = useState<RepoFetchState>({ status: "loading" });

    const subtitle = useMemo(() => t("subtitle"), [t]);

    useEffect(() => {
        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) {
            setTypedSubtitle(subtitle);
            return;
        }

        setTypedSubtitle("");
        let i = 0;
        const id = window.setInterval(() => {
            i += 1;
            setTypedSubtitle(subtitle.slice(0, i));
            if (i >= subtitle.length) {
                window.clearInterval(id);
            }
        }, 22);

        return () => window.clearInterval(id);
    }, [subtitle, lang]);

    useEffect(() => {
        const fresh = readCachedPublicRepos();
        if (fresh !== null) {
            setRepoState({ status: "ok", count: fresh });
            return;
        }

        const ac = new AbortController();
        setRepoState({ status: "loading" });

        fetch(`https://api.github.com/users/${GITHUB_USER}`, { signal: ac.signal })
            .then((r) => {
                if (!r.ok) throw new Error("github user");
                return r.json() as Promise<{ public_repos?: number }>;
            })
            .then((data) => {
                if (typeof data.public_repos !== "number") throw new Error("public_repos");
                try {
                    localStorage.setItem(
                        GH_CACHE_KEY,
                        JSON.stringify({ count: data.public_repos, at: Date.now() })
                    );
                } catch {
                    /* ignore quota */
                }
                setRepoState({ status: "ok", count: data.public_repos });
            })
            .catch((e: unknown) => {
                if (e instanceof DOMException && e.name === "AbortError") return;
                setRepoState({ status: "error" });
            });

        return () => ac.abort();
    }, []);

    const repoDisplay =
        repoState.status === "ok"
            ? String(repoState.count)
            : repoState.status === "loading"
              ? "…"
              : "—";

    const barWidth =
        repoState.status === "ok" ? publicRepoBarPercent(repoState.count) : "22%";

    return (
        <section id="home" className="home">
            <div className="container hero-layout hero-figma">
                <div className="hero-copy card hero-panel">
                    <div className="hero-badge">
                        <i className="fas fa-sparkles" aria-hidden="true"></i>
                        <span>{t("heroBadge")}</span>
                    </div>

                    <p className="eyebrow">
                        <span>{typedSubtitle}</span>
                        <span className="type-cursor" aria-hidden="true">
                            |
                        </span>
                    </p>

                    <h1>
                        <span className="hero-pretitle">{lang === "es" ? "Hola, soy" : "Hi, I'm"}</span>
                        <span className="hero-title animated-gradient">Walen Calderon</span>
                    </h1>

                    <p className="hero-role">{t("heroRole")}</p>

                    <div className="hero-actions hero-actions-figma">
                        <a className="cta-button primary" href="#projects">
                            {t("heroCtaViewProjects")}
                            <i
                                className="fas fa-external-link-alt"
                                aria-hidden="true"
                                style={{ marginLeft: 10, fontSize: 12 }}
                            ></i>
                        </a>
                        <a className="cta-button secondary" href={CV_MAILTO}>
                            <i
                                className="fas fa-download"
                                aria-hidden="true"
                                style={{ marginRight: 10, fontSize: 12 }}
                            ></i>
                            {t("heroCtaDownloadCv")}
                        </a>
                    </div>

                    <div className="hero-social">
                        <a
                            className="social-btn"
                            href={`https://github.com/${GITHUB_USER}`}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="GitHub"
                        >
                            <i className="fab fa-github" aria-hidden="true"></i>
                        </a>
                        <a
                            className="social-btn"
                            href="https://www.linkedin.com/in/walen-calderon-a017b42a4/"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="LinkedIn"
                        >
                            <i className="fab fa-linkedin-in" aria-hidden="true"></i>
                        </a>
                        <a className="social-btn" href="mailto:walenculd@gmail.com" aria-label="Email">
                            <i className="fas fa-envelope" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>

                <aside className="card hero-panel hero-side hero-side-figma">
                    <div
                        className="stat-hero stat-hero-wide"
                        title={
                            lang === "es"
                                ? "Total de repos públicos según la API de GitHub."
                                : "Total public repositories from the GitHub API."
                        }
                        aria-busy={repoState.status === "loading"}
                    >
                        <div className="stat-hero-top">
                            <div>
                                <div className="stat-hero-label">{t("heroStatsGithubReposLabel")}</div>
                                <div className="stat-hero-value tabular-nums" aria-live="polite">
                                    {repoDisplay}
                                </div>
                            </div>
                            <div className="stat-hero-icon" aria-hidden="true">
                                <i className="fab fa-github"></i>
                            </div>
                        </div>
                        <div className="stat-hero-bar">
                            <i style={{ width: barWidth }}></i>
                        </div>
                    </div>

                    <div className="stat-hero-grid">
                        <div className="stat-hero">
                            <div className="stat-hero-label">{t("heroStatsCodingYearsLabel")}</div>
                            <div className="stat-hero-value tabular-nums">{t("heroStatsCodingYearsValue")}</div>
                        </div>
                        <div className="stat-hero">
                            <div className="stat-hero-label">{t("heroStatsStackLabel")}</div>
                            <div className="stat-hero-value stat-hero-value-text">{t("heroStatsStackValue")}</div>
                        </div>
                    </div>

                    <div className="stat-hero stat-hero-wide">
                        <div className="stat-hero-label">{t("heroSpecialtiesLabel")}</div>
                        <div className="hero-chips">
                            <span className="chip">React</span>
                            <span className="chip">TypeScript</span>
                            <span className="chip">Node.js</span>
                            <span className="chip">UI/UX</span>
                            <span className="chip">APIs</span>
                        </div>
                    </div>
                </aside>
            </div>
        </section>
    );
}
