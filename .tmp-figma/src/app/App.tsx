import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <div className="size-full overflow-y-auto scroll-smooth bg-slate-950">
      <Navigation />

      <div id="inicio">
        <Hero />
      </div>

      <div id="habilidades">
        <Skills />
      </div>

      <div id="proyectos">
        <Projects />
      </div>

      <div id="contacto">
        <Contact />
      </div>
    </div>
  );
}