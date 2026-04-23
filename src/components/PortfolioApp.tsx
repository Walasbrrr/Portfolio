import { LanguageProvider } from "../stores/languageStore";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import ContactSection from "./ContactSection";
import { useEffect } from "react";


export default function PortfolioApp() {
    useEffect(() => {
        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) return;

        const targets = Array.from(
            document.querySelectorAll<HTMLElement>(
                ".section-head, .card, .hero-badge, .hero-actions, .hero-social"
            )
        );

        targets.forEach((el) => el.classList.add("reveal"));

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        (entry.target as HTMLElement).classList.add("is-visible");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
        );

        targets.forEach((el) => io.observe(el));

        return () => io.disconnect();
    }, []);

    return (
        <LanguageProvider>
            <Navbar />
            <Hero />
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ExperienceSection />
            <EducationSection />
            <ContactSection />
        </LanguageProvider>
    );
}
