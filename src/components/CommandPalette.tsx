import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../stores/languageStore";
import {
    Command,
    Search,
    Sparkles,
    Briefcase,
    Wrench,
    User,
    GraduationCap,
    Mail,
    Copy,
    Check,
    Languages,
    FileText,
    X,
} from "lucide-react";

const GithubIcon = () => <i className="fab fa-github text-sm" aria-hidden="true" />;
const LinkedinIcon = () => <i className="fab fa-linkedin-in text-sm" aria-hidden="true" />;

const GITHUB_USER = "Walasbrrr";
const EMAIL = "walenculd@gmail.com";
const CV_MAILTO =
    "mailto:walenculd@gmail.com?subject=CV%20request%20%E2%80%94%20portfolio&body=Hi%20Walen%2C%0A%0A";

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    category: "navigation" | "actions" | "links";
    icon: any;
    onSelect: () => void;
}

export default function CommandPalette() {
    const { lang, setLang, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [copied, setCopied] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Open/Close on Command+K or Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen((prev) => !prev);
            } else if (e.key === "Escape" && isOpen) {
                e.preventDefault();
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setQuery("");
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    const navigateTo = (hash: string) => {
        setIsOpen(false);
        const el = document.querySelector(hash);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    };

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
                setIsOpen(false);
            }, 1200);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
            setIsOpen(false);
        }
    };

    const toggleLanguage = () => {
        const next = lang === "es" ? "en" : "es";
        setLang(next);
        setIsOpen(false);
    };

    const items: CommandItem[] = [
        // Navigation
        {
            id: "nav-home",
            label: lang === "es" ? "Ir al Inicio" : "Go to Home",
            category: "navigation",
            icon: Sparkles,
            onSelect: () => navigateTo("#home"),
        },
        {
            id: "nav-projects",
            label: lang === "es" ? "Ver Proyectos Seleccionados" : "View Selected Projects",
            description: "Gestion Truck, ComfyByte, V&C...",
            category: "navigation",
            icon: Briefcase,
            onSelect: () => navigateTo("#projects"),
        },
        {
            id: "nav-skills",
            label: lang === "es" ? "Stack & Habilidades Técnicas" : "Stack & Technical Skills",
            category: "navigation",
            icon: Wrench,
            onSelect: () => navigateTo("#skills"),
        },
        {
            id: "nav-about",
            label: lang === "es" ? "Sobre mí & Trayectoria" : "About Me & Journey",
            category: "navigation",
            icon: User,
            onSelect: () => navigateTo("#about"),
        },
        {
            id: "nav-education",
            label: lang === "es" ? "Educación & Enfoque" : "Education & Focus",
            category: "navigation",
            icon: GraduationCap,
            onSelect: () => navigateTo("#education"),
        },
        {
            id: "nav-contact",
            label: lang === "es" ? "Contacto" : "Contact",
            category: "navigation",
            icon: Mail,
            onSelect: () => navigateTo("#contact"),
        },
        // Actions
        {
            id: "action-copy-email",
            label: copied
                ? lang === "es"
                    ? "¡Copiado al portapapeles!"
                    : "Copied to clipboard!"
                : lang === "es"
                  ? "Copiar Email (walenculd@gmail.com)"
                  : "Copy Email (walenculd@gmail.com)",
            category: "actions",
            icon: copied ? Check : Copy,
            onSelect: copyEmail,
        },
        {
            id: "action-lang",
            label:
                lang === "es"
                    ? "Switch to English"
                    : "Cambiar a Español",
            category: "actions",
            icon: Languages,
            onSelect: toggleLanguage,
        },
        {
            id: "action-cv",
            label: lang === "es" ? "Solicitar / Descargar CV" : "Request / Download CV",
            category: "actions",
            icon: FileText,
            onSelect: () => {
                setIsOpen(false);
                window.location.href = CV_MAILTO;
            },
        },
        // Links
        {
            id: "link-github",
            label: "GitHub Profile (@Walasbrrr)",
            category: "links",
            icon: GithubIcon,
            onSelect: () => {
                setIsOpen(false);
                window.open(`https://github.com/${GITHUB_USER}`, "_blank");
            },
        },
        {
            id: "link-linkedin",
            label: "LinkedIn Profile",
            category: "links",
            icon: LinkedinIcon,
            onSelect: () => {
                setIsOpen(false);
                window.open("https://www.linkedin.com/in/walen-calderon-a017b42a4/", "_blank");
            },
        },
    ];

    const filteredItems = items.filter(
        (it) =>
            it.label.toLowerCase().includes(query.toLowerCase()) ||
            (it.description && it.description.toLowerCase().includes(query.toLowerCase()))
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev - 1 < 0 ? Math.max(filteredItems.length - 1, 0) : prev - 1
            );
        } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
            e.preventDefault();
            filteredItems[selectedIndex].onSelect();
        }
    };

    return (
        <>
            {/* Quick Trigger Button fixed at bottom right or HUD */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="fixed bottom-5 right-5 z-40 hidden md:flex items-center gap-2 rounded-full border border-[rgba(154,201,255,0.2)] bg-[#091322]/80 px-3.5 py-2 text-xs font-mono text-[#9FB2CC] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-md transition hover:border-[#56C2FF]/60 hover:text-white"
                title="Command Palette (⌘K)"
            >
                <Command className="h-3.5 w-3.5 text-[#56C2FF]" />
                <span>Command Menu</span>
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white">⌘K</kbd>
            </button>

            {/* Modal Backdrop & Palette */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] bg-black/65 backdrop-blur-sm animate-in fade-in duration-150"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="w-full max-w-xl overflow-hidden rounded-2xl border border-[rgba(154,201,255,0.25)] bg-[#0A111E] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Bar */}
                        <div className="relative flex items-center border-b border-white/10 px-4 py-3">
                            <Search className="h-4 w-4 text-[#56C2FF] mr-3 shrink-0" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                onKeyDown={handleKeyDown}
                                placeholder={
                                    lang === "es"
                                        ? "Escribe un comando o salta a una sección..."
                                        : "Type a command or jump to section..."
                                }
                                className="w-full bg-transparent text-sm text-white placeholder-[#9FB2CC]/60 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="p-1 rounded-md text-[#9FB2CC] hover:text-white hover:bg-white/10"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* List */}
                        <div className="max-h-80 overflow-y-auto p-2">
                            {filteredItems.length === 0 ? (
                                <div className="py-8 text-center text-sm text-[#9FB2CC]/70">
                                    {lang === "es"
                                        ? "No se encontraron comandos."
                                        : "No commands found."}
                                </div>
                            ) : (
                                filteredItems.map((item, idx) => {
                                    const Icon = item.icon;
                                    const isSelected = idx === selectedIndex;
                                    return (
                                        <button
                                            key={item.id}
                                            type="button"
                                            onClick={item.onSelect}
                                            onMouseEnter={() => setSelectedIndex(idx)}
                                            className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${
                                                isSelected
                                                    ? "bg-[#56C2FF]/15 text-white"
                                                    : "text-[#9FB2CC] hover:bg-white/5 hover:text-white"
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`p-1.5 rounded-lg ${
                                                        isSelected
                                                            ? "bg-[#56C2FF]/20 text-[#56C2FF]"
                                                            : "bg-white/5 text-[#9FB2CC]"
                                                    }`}
                                                >
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{item.label}</p>
                                                    {item.description && (
                                                        <p className="text-xs text-[#9FB2CC]/70">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <span className="text-[11px] font-mono text-[#56C2FF]">
                                                    ↵
                                                </span>
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer tip */}
                        <div className="flex items-center justify-between border-t border-white/5 bg-black/20 px-4 py-2 text-[11px] font-mono text-[#9FB2CC]/60">
                            <span>Navigate with ↑ ↓ • Select with ↵</span>
                            <span>Esc to close</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
