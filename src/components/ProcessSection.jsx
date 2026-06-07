import React from 'react';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

export default function ProcessSection({ lang = 'es' }) {
  const t = {
    es: {
      title: "Nuestro Proceso",
      subtitle: "Trabajamos con una metodología ágil y transparente para garantizar resultados increíbles, sin sorpresas.",
      steps: [
        {
          id: "01",
          icon: <Search className="w-6 h-6" />,
          title: "Descubrimiento",
          desc: "Analizamos tu negocio, detectamos oportunidades de mejora y definimos la mejor solución para tus necesidades."
        },
        {
          id: "02",
          icon: <PenTool className="w-6 h-6" />,
          title: "Diseño",
          desc: "Diseñamos experiencias intuitivas y prototipos para validar cada idea antes del desarrollo."
        },
        {
          id: "03",
          icon: <Code2 className="w-6 h-6" />,
          title: "Desarrollo",
          desc: "Construimos una plataforma segura, rápida y preparada para crecer junto a tu organización."
        },
        {
          id: "04",
          icon: <Rocket className="w-6 h-6" />,
          title: "Implementación",
          desc: "Realizamos pruebas, puesta en producción y acompañamiento para que todo funcione correctamente desde el primer día."
        }
      ]
    },
    en: {
      title: "Our Process",
      subtitle: "We use an agile and transparent methodology to guarantee incredible results, with no surprises.",
      steps: [
        {
          id: "01",
          icon: <Search className="w-6 h-6" />,
          title: "Discovery",
          desc: "We analyze your business, identify opportunities for improvement, and define the best solution for your needs."
        },
        {
          id: "02",
          icon: <PenTool className="w-6 h-6" />,
          title: "Design",
          desc: "We design intuitive experiences and prototypes to validate every idea before development."
        },
        {
          id: "03",
          icon: <Code2 className="w-6 h-6" />,
          title: "Development",
          desc: "We build a secure, fast platform ready to grow alongside your organization."
        },
        {
          id: "04",
          icon: <Rocket className="w-6 h-6" />,
          title: "Implementation",
          desc: "We handle testing, deployment, and support so everything works perfectly from day one."
        }
      ]
    }
  };

  const current = t[lang] || t['es'];

  return (
    <section id="proceso" className="w-full max-w-7xl mx-auto py-24 px-4 relative z-10">
      <div className="mb-16 text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">{current.title}</h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">{current.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {current.steps.map((step, index) => (
          <div 
            key={index} 
            data-aos="fade-up" 
            data-aos-delay={index * 100}
            className="relative group bg-white border border-gray-200 hover:border-cyan-300 rounded-3xl p-8 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)] overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            {/* Step Number Background */}
            <div className="absolute top-4 right-6 text-6xl font-black text-black/[0.03] pointer-events-none group-hover:text-cyan-600/[0.05] transition-colors duration-500">
              {step.id}
            </div>

            <div className="w-12 h-12 bg-cyan-50 border border-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-sm">
              {step.icon}
            </div>

            <h3 className="text-xl font-bold text-black mb-4 relative z-10">{step.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed relative z-10 transition-colors">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
