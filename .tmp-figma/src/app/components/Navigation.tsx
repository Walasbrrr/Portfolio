import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, FileDown } from "lucide-react";

const navItems = [
  { name: "Inicio", href: "#inicio" },
  { name: "Skills", href: "#habilidades" },
  { name: "Proyectos", href: "#proyectos" },
  { name: "Contacto", href: "#contacto" }
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrases = ["WALEN I CALDERON"];

    let timeoutId: ReturnType<typeof setTimeout>;
    if (isDeleting) {
      timeoutId = setTimeout(() => {
        setText(text.slice(0, -1));
        if (text.length === 0) {
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
          setDeleting(false);
        }
      }, 100);
    } else {
      timeoutId = setTimeout(() => {
        setText(phrases[phraseIndex].slice(0, text.length + 1));
        if (text.length === phrases[phraseIndex].length) {
          setDeleting(true);
        }
      }, 150);
    }
    return () => clearTimeout(timeoutId);
  }, [text, phraseIndex, isDeleting]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/80 backdrop-blur-lg border-b border-white/10 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="#inicio"
            className="inline-flex items-center gap-0.5"
            style={{ width: "240px", justifyContent: "flex-start" }}
          >
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent" style={{ textShadow: "0 0 12px rgba(86,194,255,0.4)", letterSpacing: "1px" }}>
              {text}
            </span>
            <span className="text-xl font-bold text-cyan-400">|</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-slate-300 hover:text-cyan-400 transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <button className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/10 hover:border-cyan-500/50 transition-all flex items-center gap-2 group">
              <FileDown className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
              CV
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-[73px] left-0 right-0 bg-slate-950/95 backdrop-blur-lg border-b border-white/10 z-40 md:hidden"
        >
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm text-slate-300 hover:text-cyan-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-300 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              <FileDown className="w-4 h-4" />
              Descargar CV
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
