import { LanguageProvider } from "../context/LanguageContext";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import ContactSection from "./ContactSection";


export default function PortfolioApp() {
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