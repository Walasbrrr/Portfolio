import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";

const technicalSkills = [
  { name: "Java", level: 90 },
  { name: "Python", level: 85 },
  { name: "CSS", level: 80 },
  { name: "JavaScript", level: 75 },
  { name: "TypeScript", level: 70 }
];

const strengths = [
  "Problem solving",
  "Curiosity (Asks \"Why?\")",
  "Java foundation",
  "Software architecture mastery",
  "Constructive listening",
  "IT agile/lean"
];

export function Skills() {
  return (
    <section className="min-h-screen px-6 py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full" />
            <p className="text-cyan-400 tracking-wide">Experiencia</p>
          </div>
          <h2 className="text-4xl md:text-5xl text-white mb-4">Skills</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Herramientas y tecnologías con las que trabajo actualmente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technical Skills with Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-2xl text-white mb-6">Habilidades Técnicas</h3>

            <div className="space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300">{skill.name}</span>
                    <span className="text-cyan-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ delay: index * 0.1, duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm mb-1">En constante aprendizaje</p>
                  <p className="text-slate-400 text-xs">
                    Actualmente mejorando habilidades en arquitectura de software y patrones de diseño.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-2xl text-white mb-6">Fortalezas</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.map((strength, index) => (
                <motion.div
                  key={strength}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/50 transition-all cursor-default"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <p className="text-slate-300 text-sm group-hover:text-white transition-colors">
                      {strength}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <p className="text-purple-300 text-sm mb-1">Metodologías</p>
                <p className="text-white">Agile • Scrum • Lean</p>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                <p className="text-green-300 text-sm mb-1">Herramientas</p>
                <p className="text-white">Git • Docker • CI/CD • Figma</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Experience & Education Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-2xl text-white mb-6">Experiencia</h3>

            <div className="space-y-6">
              <div className="relative pl-6 border-l-2 border-cyan-500/30">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="mb-1">
                  <h4 className="text-white">Student Developer</h4>
                  <p className="text-sm text-cyan-400">2021 - 2025</p>
                </div>
                <p className="text-sm text-slate-400">
                  Desarrollo académico de proyectos web con enfoque en prácticas profesionales.
                </p>
              </div>

              <div className="relative pl-6 border-l-2 border-white/10">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white/20" />
                <div className="mb-1">
                  <h4 className="text-white">Personal Projects</h4>
                  <p className="text-sm text-slate-400">2021 - 2025</p>
                </div>
                <p className="text-sm text-slate-400">
                  Creación de portafolios personalizados e inteligencia artificial.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <h3 className="text-2xl text-white mb-6">Educación</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-2">Middlesex College • B.S Computer Science</h4>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• Cursado de grado, matemáticas, cálculo y más básicos.</li>
                  <li>• HTML, CSS, JavaScript, TypeScript</li>
                  <li>• Networking basics</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h4 className="text-white mb-2">Certificaciones / Cursos</h4>
                <ul className="space-y-1 text-sm text-slate-400">
                  <li>• B2-1 Certification</li>
                  <li>• Full-Stack Web Development</li>
                  <li>• Networking basics</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
