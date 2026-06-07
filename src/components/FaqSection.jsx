import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "¿Cuánto tiempo demora el desarrollo de un proyecto?",
    answer: "El tiempo de entrega se ajusta a la complejidad y urgencia de cada proyecto. Diseñamos un plan de trabajo estructurado para cumplir con las fechas que tu negocio necesite, priorizando siempre la calidad del producto final."
  },
  {
    question: "¿Ofrecen servicio de mantenimiento y hosting?",
    answer: "¡Sí! Nos encargamos de toda la infraestructura Cloud, seguridad de bases de datos y monitoreo continuo para que vos solo te preocupes por hacer crecer tu negocio."
  },
  {
    question: "¿Qué tecnologías utilizan para el desarrollo?",
    answer: "Cada proyecto es único, por eso seleccionamos las herramientas tecnológicas que mejor se adapten a tus necesidades reales. Utilizamos plataformas modernas, seguras y de alto rendimiento para garantizar que tu sistema sea rápido, fácil de usar y capaz de crecer junto a tu negocio."
  },
  {
    question: "¿Tengo que pagar una licencia mensual por el software a medida?",
    answer: "No. Si el desarrollo es a medida, el producto es tuyo. Solamente abonarás los costos reales de los servidores y un plan opcional de soporte técnico continuo."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full max-w-3xl mx-auto py-24 px-4 relative z-10">
      <div className="mb-12 text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Preguntas Frecuentes</h2>
        <p className="text-gray-400 text-lg">Resolvemos tus dudas principales antes de dar el primer paso.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            data-aos="fade-up" 
            data-aos-delay={index * 100}
            className="border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-xl overflow-hidden"
          >
            <button 
              onClick={() => toggleFaq(index)}
              className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none group"
            >
              <h3 className="font-semibold text-lg text-white pr-8">
                {faq.question}
              </h3>
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-white/5 group-hover:bg-white/10 transition-colors">
                <ChevronDown 
                  className={`text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </div>
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${openIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-gray-400 text-base leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
