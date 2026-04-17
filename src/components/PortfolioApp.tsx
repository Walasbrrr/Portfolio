import { LanguageProvider } from "../context/LanguageContext";
import Navbar from "./Navbar";
import Hero from "./Hero";

export default function PortfolioApp() {
    return (
        <LanguageProvider>
            <Navbar />
            <Hero />
        </LanguageProvider>
    );
}