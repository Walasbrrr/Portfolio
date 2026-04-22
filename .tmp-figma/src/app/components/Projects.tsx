import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Hockey Manager",
    category: ["java", "academic"],
    pill: "Java • CLI",
    description: "Aplicación web completa para gestión de equipos de hockey con estadísticas en tiempo real.",
    tags: ["Java", "OOP", "CLI"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 2,
    title: "Calculadora accesible",
    category: ["web"],
    pill: "Web • HTML/CSS",
    description: "Calculadora web con diseño accesible y API REST para operaciones matemáticas.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 3,
    title: "To-Do",
    category: ["web"],
    pill: "Web • JS",
    description: "Aplicación de tareas local con diseño minimalista.",
    tags: ["JavaScript", "LocalStorage"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 4,
    title: "Gestor de tareas",
    category: ["java"],
    pill: "Java • OOP",
    description: "Sistema de gestión de tareas con patrones de diseño orientado a objetos.",
    tags: ["Java", "OOP", "Design Patterns"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 5,
    title: "Portfolio v1",
    category: ["web", "academic"],
    pill: "Web • JS",
    description: "Primera versión de mi portfolio con 130+ prácticas y diseño limpio.",
    tags: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: 6,
    title: "Clima simple",
    category: ["web"],
    pill: "Web • API",
    description: "Aplicación meteorológica simple y elegante.",
    tags: ["JavaScript", "Weather API"],
    github: "https://github.com",
    demo: "https://demo.com"
  }
];

export function Projects() {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category.includes(filter)
  );

  return (
    <section className="min-h-screen px-6 py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            <p className="text-cyan-400 tracking-wide">Mi trabajo</p>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">Proyectos</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Una selección de proyectos que reflejan mi pasión por el desarrollo y la resolución de problemas.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 mb-12"
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("java")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "java"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            Java
          </button>
          <button
            onClick={() => setFilter("web")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "web"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            Web
          </button>
          <button
            onClick={() => setFilter("academic")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === "academic"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
                : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
            }`}
          >
            Academic
          </button>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500" />

              <div className="relative p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs">
                    {project.pill}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Github className="w-4 h-4 text-slate-300" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ExternalLink className="w-4 h-4 text-slate-300" />
                    </a>
                  </div>
                </div>

                <h3 className="text-white text-xl mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
