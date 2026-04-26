import { useState } from "react";
import { useLanguage } from "../stores/languageStore";

export default function ContactSection() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        // Required Web3Forms key - El usuario debe reemplazar esto luego
        formData.append("access_key", "e9d3c117-6b46-4a5b-9ecd-f36d1e84792e");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section id="contact" className="section-block">
            <div className="container">
                <div className="section-head">
                    <h2>{t("contact")}</h2>
                    <p>{t("contactTag")}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Column: Info */}
                    <div className="flex flex-col gap-6 p-8 rounded-3xl bg-gradient-to-b from-[rgba(14,30,52,0.82)] to-[rgba(8,18,32,0.72)] border border-[rgba(154,201,255,0.16)] shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white m-0">
                            {t("contactText")}
                        </h3>
                        <p className="text-[#9FB2CC] m-0 leading-relaxed text-lg">
                            Si tienes una oportunidad, una idea, o simplemente quieres saludar, mi bandeja de entrada siempre está abierta. Me esforzaré por responderte lo antes posible.
                        </p>

                        <div className="flex flex-col gap-5 mt-auto pt-6 border-t border-[rgba(255,255,255,0.06)]">
                            <a href="mailto:walenculd@gmail.com" className="flex items-center gap-4 text-[#EAF2FF] hover:text-[#56C2FF] transition-colors group w-fit font-medium">
                                <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center border border-[rgba(255,255,255,0.08)] group-hover:bg-[rgba(86,194,255,0.1)] group-hover:border-[rgba(86,194,255,0.3)] transition-all">
                                    <i className="fas fa-envelope text-lg"></i>
                                </div>
                                walenculd@gmail.com
                            </a>
                            <a href="https://github.com/Walasbrrr" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#EAF2FF] hover:text-[#56C2FF] transition-colors group w-fit font-medium">
                                <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center border border-[rgba(255,255,255,0.08)] group-hover:bg-[rgba(86,194,255,0.1)] group-hover:border-[rgba(86,194,255,0.3)] transition-all">
                                    <i className="fab fa-github text-lg"></i>
                                </div>
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/walen-calderon-a017b42a4/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-[#EAF2FF] hover:text-[#56C2FF] transition-colors group w-fit font-medium">
                                <div className="w-12 h-12 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center border border-[rgba(255,255,255,0.08)] group-hover:bg-[rgba(86,194,255,0.1)] group-hover:border-[rgba(86,194,255,0.3)] transition-all">
                                    <i className="fab fa-linkedin-in text-lg"></i>
                                </div>
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 rounded-3xl bg-gradient-to-b from-[rgba(14,30,52,0.82)] to-[rgba(8,18,32,0.72)] border border-[rgba(154,201,255,0.16)] shadow-[0_24px_60px_rgba(0,0,0,0.32)]">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-semibold text-[#9FB2CC] uppercase tracking-wider">Nombre</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                required 
                                placeholder="Tu nombre"
                                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[#56C2FF] focus:ring-1 focus:ring-[#56C2FF] transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold text-[#9FB2CC] uppercase tracking-wider">Correo</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                required 
                                placeholder="tu@correo.com"
                                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[#56C2FF] focus:ring-1 focus:ring-[#56C2FF] transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="message" className="text-sm font-semibold text-[#9FB2CC] uppercase tracking-wider">Mensaje</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                required 
                                rows={4}
                                placeholder="¿En qué puedo ayudarte?"
                                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-xl px-4 py-3.5 text-white placeholder-[rgba(255,255,255,0.2)] focus:outline-none focus:border-[#56C2FF] focus:ring-1 focus:ring-[#56C2FF] transition-all resize-none"
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            disabled={status === "submitting" || status === "success"}
                            className="mt-2 w-full py-4 rounded-xl bg-gradient-to-r from-[#56C2FF] to-[#7EA0FF] text-[#04101d] font-bold text-base hover:shadow-[0_8px_24px_rgba(86,194,255,0.4)] hover:scale-[1.02] transition-all disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-2"
                        >
                            {status === "idle" && <><i className="fas fa-paper-plane"></i> Enviar mensaje</>}
                            {status === "submitting" && <><i className="fas fa-spinner fa-spin"></i> Enviando...</>}
                            {status === "success" && <><i className="fas fa-check"></i> ¡Enviado!</>}
                            {status === "error" && <><i className="fas fa-exclamation-triangle"></i> Error al enviar</>}
                        </button>
                        
                        {status === "success" && (
                            <p className="text-sm text-green-400 text-center m-0">¡Gracias por escribirme! Me pondré en contacto contigo pronto.</p>
                        )}
                        {status === "error" && (
                            <p className="text-sm text-red-400 text-center m-0">Hubo un problema. Por favor revisa la consola o intenta directamente a mi correo.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
