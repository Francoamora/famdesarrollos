import React from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

export default function ProcessSection({ lang = 'es' }) {
  const t = {
    es: {
      title: "Nuestro Proceso",
      subtitle: "Trabajamos con una metodología ágil y transparente para garantizar resultados sin sorpresas.",
      steps: [
        {
          id: "01",
          icon: <Search className="w-6 h-6" />,
          title: "Discovery",
          desc: "Entendemos tu modelo de negocio, analizamos a tus competidores y definimos la arquitectura exacta que necesitas."
        },
        {
          id: "02",
          icon: <PenTool className="w-6 h-6" />,
          title: "Design",
          desc: "Creamos interfaces modernas y prototipos interactivos para que veas el producto antes de programar una sola línea."
        },
        {
          id: "03",
          icon: <Code2 className="w-6 h-6" />,
          title: "Development",
          desc: "Escribimos código limpio, seguro y escalable utilizando las mejores herramientas tecnológicas del mercado."
        },
        {
          id: "04",
          icon: <Rocket className="w-6 h-6" />,
          title: "Launch",
          desc: "Desplegamos tu plataforma en servidores de alta disponibilidad y nos encargamos del monitoreo continuo."
        }
      ]
    },
    en: {
      title: "How We Work",
      subtitle: "We use an agile and transparent methodology to guarantee high-quality results without surprises.",
      steps: [
        {
          id: "01",
          icon: <Search className="w-6 h-6" />,
          title: "Discovery",
          desc: "We understand your business model, analyze competitors, and define the exact architecture you need."
        },
        {
          id: "02",
          icon: <PenTool className="w-6 h-6" />,
          title: "Design",
          desc: "We craft modern interfaces and interactive prototypes so you can see the product before we write any code."
        },
        {
          id: "03",
          icon: <Code2 className="w-6 h-6" />,
          title: "Development",
          desc: "We write clean, secure, and scalable code using the best technological tools available in the market."
        },
        {
          id: "04",
          icon: <Rocket className="w-6 h-6" />,
          title: "Launch",
          desc: "We deploy your platform on high-availability servers and handle continuous monitoring and maintenance."
        }
      ]
    }
  };

  const current = t[lang] || t['es'];

  return (
    <section id="proceso" className="w-full max-w-7xl mx-auto py-24 px-4 relative z-10">
      <div className="mb-16 text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{current.title}</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{current.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {current.steps.map((step, index) => (
          <div 
            key={index} 
            data-aos="fade-up" 
            data-aos-delay={index * 100}
            className="relative group bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 rounded-2xl p-8 transition-all duration-500 hover:bg-white/[0.04] overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Step Number Background */}
            <div className="absolute top-4 right-6 text-6xl font-black text-white/[0.03] pointer-events-none group-hover:text-cyan-500/[0.05] transition-colors duration-500">
              {step.id}
            </div>

            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
              {step.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-4 relative z-10">{step.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
