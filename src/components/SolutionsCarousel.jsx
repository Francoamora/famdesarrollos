import React, { useRef, useState } from 'react';
import { ShoppingBag, Store, Building2, LayoutTemplate, Settings, Briefcase, Users, HeartPulse, Home, Utensils, Dumbbell, Bot } from 'lucide-react';

const solutionsEs = [
  {
    icon: ShoppingBag, color: 'cyan', title: 'Tu tienda 24/7',
    desc: 'Vendé en piloto automático. E-commerce rápido, carrito de compras optimizado y pasarelas de pago integradas.'
  },
  {
    icon: Store, color: 'orange', title: 'Locales Comerciales',
    desc: 'Tené el control total de tu negocio. Gestión de stock en tiempo real, alertas de inventario y facturación fácil para que nada se te escape.'
  },
  {
    icon: Bot, color: 'indigo', title: 'Automatización de Procesos',
    desc: 'Olvidate de las tareas repetitivas. Sincronizamos tus herramientas y automatizamos respuestas frecuentes para que tu equipo se enfoque en lo importante.'
  },
  {
    icon: Users, color: 'red', title: 'Clubes y Asociaciones',
    desc: '¿Tenés un club? Administrá el alta de socios, cobro de cuotas, reserva de turnos y gestión de inversiones en un solo lugar.'
  },
  {
    icon: Dumbbell, color: 'lime', title: 'Gimnasios y Centros',
    desc: 'Controlá membresías, cobros mensuales, rutinas y los accesos de tus alumnos de forma 100% automatizada.'
  },
  {
    icon: Building2, color: 'emerald', title: 'Instituciones y Finanzas',
    desc: 'Sistemas robustos para mantener en orden instituciones, municipios y la gestión de finanzas complejas.'
  },
  {
    icon: HeartPulse, color: 'rose', title: 'Clínicas y Consultorios',
    desc: 'Gestión inteligente de turnos médicos, historias clínicas digitales y recordatorios automáticos para pacientes.'
  },
  {
    icon: LayoutTemplate, color: 'purple', title: 'Landing Pages',
    desc: 'Diseño de alto impacto enfocado 100% en conversión. Transformamos visitas fugaces en clientes fieles.'
  },
  {
    icon: Home, color: 'teal', title: 'Inmobiliarias',
    desc: 'Catálogos dinámicos de propiedades, gestión integral de alquileres y automatización de contratos para tu agencia.'
  },
  {
    icon: Utensils, color: 'yellow', title: 'Gastronomía Moderna',
    desc: 'Menú digital con QR, toma de pedidos ágil, integración con cocina y control de mesas en tiempo real.'
  },
  {
    icon: Briefcase, color: 'pink', title: 'Profesionales Independientes',
    desc: '¿Sos contador, abogado o especialista? Desarrollamos herramientas a medida para ordenar tu información y gestionar a tus clientes.'
  },
  {
    icon: Settings, color: 'blue', title: 'Lo imaginás, lo armamos',
    desc: 'Sistemas a medida adaptados al 100% a las reglas de tu negocio. Arquitectura escalable y sin límites.'
  }
];

const solutionsEn = [
  {
    icon: ShoppingBag, color: 'cyan', title: 'Your 24/7 Store',
    desc: 'Sell on autopilot. Fast e-commerce, optimized shopping cart, and integrated payment gateways.'
  },
  {
    icon: Store, color: 'orange', title: 'Retail Stores',
    desc: 'Take full control of your business. Real-time inventory management, stock alerts, and easy billing so nothing slips away.'
  },
  {
    icon: Bot, color: 'indigo', title: 'Process Automation',
    desc: 'Forget repetitive tasks. We sync your tools and automate frequent responses so your team focuses on what matters.'
  },
  {
    icon: Users, color: 'red', title: 'Clubs and Associations',
    desc: 'Running a club? Manage member registration, fee collection, bookings, and investments all in one place.'
  },
  {
    icon: Dumbbell, color: 'lime', title: 'Gyms & Fitness Centers',
    desc: 'Control memberships, monthly payments, routines, and student access in a 100% automated way.'
  },
  {
    icon: Building2, color: 'emerald', title: 'Institutions & Finance',
    desc: 'Robust systems to keep institutions, municipalities, and complex financial management in perfect order.'
  },
  {
    icon: HeartPulse, color: 'rose', title: 'Clinics & Practices',
    desc: 'Smart medical appointment management, digital health records, and automated patient reminders.'
  },
  {
    icon: LayoutTemplate, color: 'purple', title: 'Landing Pages',
    desc: 'High-impact design focused 100% on conversion. We transform brief visits into loyal customers.'
  },
  {
    icon: Home, color: 'teal', title: 'Real Estate',
    desc: 'Dynamic property catalogs, comprehensive rental management, and automated contracts for your agency.'
  },
  {
    icon: Utensils, color: 'yellow', title: 'Modern Gastronomy',
    desc: 'Digital QR menus, agile ordering, kitchen integration, and real-time table control.'
  },
  {
    icon: Briefcase, color: 'pink', title: 'Independent Professionals',
    desc: 'Are you an accountant, lawyer, or specialist? We develop custom tools to organize your info and manage clients.'
  },
  {
    icon: Settings, color: 'blue', title: 'You Imagine It, We Build It',
    desc: 'Custom systems adapted 100% to your business rules. Scalable architecture with no limits.'
  }
];

const colorVariants = {
  cyan: 'text-cyan-400 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.2)]',
  orange: 'text-orange-400 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.2)]',
  indigo: 'text-indigo-400 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.2)]',
  red: 'text-red-400 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.2)]',
  lime: 'text-lime-400 bg-lime-500/10 shadow-[0_0_15px_rgba(132,204,22,0.2)]',
  emerald: 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]',
  rose: 'text-rose-400 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.2)]',
  purple: 'text-purple-400 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]',
  teal: 'text-teal-400 bg-teal-500/10 shadow-[0_0_15px_rgba(20,184,166,0.2)]',
  yellow: 'text-yellow-400 bg-yellow-500/10 shadow-[0_0_15px_rgba(234,179,8,0.2)]',
  pink: 'text-pink-400 bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.2)]',
  blue: 'text-blue-400 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.2)]',
};

function SolutionCard({ item, lang }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const hoverTimer = useRef(null);

  const tFront = lang === 'en' ? { interest: 'Interested?', subtitle: 'We can adapt this solution exactly to your business model.', cta: 'Contact us on WhatsApp' } 
                                : { interest: '¿Te interesa?', subtitle: 'Podemos adaptar esta solución exactamente a tu modelo de negocio.', cta: 'Contactanos por WhatsApp' };

  const handleMouseEnter = () => {
    if (isFlipped) return;
    hoverTimer.current = setTimeout(() => {
      setIsFlipped(true);
    }, 1500); 
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    setIsFlipped(false);
  };

  return (
    <div 
      className="snap-center shrink-0 w-[85vw] md:w-[350px] h-[340px] group cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className="relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:-translate-y-3"
        style={{ 
          transformStyle: 'preserve-3d', 
          transform: isFlipped ? 'rotateY(180deg) translateY(-12px)' : 'rotateY(0deg) translateY(0px)'
        }}
      >
        
        {/* Cara Frontal */}
        <div 
          className="absolute inset-0 bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 text-left transition-all duration-300 group-hover:bg-[#111] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:border-white/10 flex flex-col justify-start"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colorVariants[item.color]}`}>
            <item.icon size={24} />
          </div>
          <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{item.title}</h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
        </div>

        {/* Cara Trasera */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#0a0a0a] p-8 rounded-[2rem] border border-cyan-500/30 text-center flex flex-col justify-center items-center shadow-[0_0_40px_rgba(6,182,212,0.15)]"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${colorVariants[item.color]} animate-pulse`}>
            <item.icon size={32} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-white">{tFront.interest}</h3>
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">{tFront.subtitle}</p>
          <a 
            href={`https://wa.me/5493482277706?text=${lang === 'en' ? 'Hi, I am interested in the solution: ' : 'Hola, estoy interesado en la solución: '}${encodeURIComponent(item.title)}`}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3.5 bg-[#25D366] text-black font-bold rounded-xl hover:bg-[#20b858] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]"
            onClick={(e) => e.stopPropagation()}
          >
            {tFront.cta}
          </a>
        </div>

      </div>
    </div>
  );
}

export default function SolutionsCarousel({ lang = 'es' }) {
  const scrollRef = useRef(null);

  const solutions = lang === 'en' ? solutionsEn : solutionsEs;
  const title = lang === 'en' ? "Tailor-Made Solutions" : "Soluciones a tu Medida";
  const desc = lang === 'en' 
    ? "From your neighborhood store to municipalities and institutions. We build the exact platform you need to scale." 
    : "Desde el kiosco de tu barrio hasta municipios e instituciones. Construimos la plataforma exacta que necesitas para escalar.";

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="w-full py-24 border-y border-white/5 bg-[#030303] relative">
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white">
            {title}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl">
            {desc}
          </p>
        </div>
        
        {/* Navigation Controls */}
        <div className="hidden md:flex gap-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 cursor-pointer transition-all active:scale-95"
          >
            ←
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 hover:bg-white/5 cursor-pointer transition-all active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative w-full max-w-[1400px] mx-auto">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-12 pb-16 pt-12 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {solutions.map((item, index) => (
            <SolutionCard key={index} item={item} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
