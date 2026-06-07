import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqsEs = [
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

const faqsEn = [
  {
    question: "How long does a project development take?",
    answer: "The delivery time is adjusted to the complexity and urgency of each project. We design a structured work plan to meet your business deadlines, always prioritizing the quality of the final product."
  },
  {
    question: "Do you offer maintenance and hosting services?",
    answer: "Yes! We handle all Cloud infrastructure, database security, and continuous monitoring so you can focus entirely on growing your business."
  },
  {
    question: "What technologies do you use for development?",
    answer: "Every project is unique, which is why we carefully select the technology stack that best fits your real needs. We use modern, secure, and high-performance platforms to ensure your system is fast, user-friendly, and capable of scaling with your business."
  },
  {
    question: "Do I have to pay a monthly license for custom software?",
    answer: "No. If the development is custom, the product belongs to you. You will only pay the actual server costs and an optional continuous technical support plan."
  }
];

export default function FaqSection({ lang = 'es' }) {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = lang === 'en' ? faqsEn : faqsEs;
  const title = lang === 'en' ? "Frequently Asked Questions" : "Preguntas Frecuentes";
  const subtitle = lang === 'en' ? "Resolving your main doubts before taking the first step." : "Resolvemos tus dudas principales antes de dar el primer paso.";

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full max-w-3xl mx-auto py-24 px-4 relative z-10">
      <div className="mb-12 text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{title}</h2>
        <p className="text-gray-400 text-lg">{subtitle}</p>
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
