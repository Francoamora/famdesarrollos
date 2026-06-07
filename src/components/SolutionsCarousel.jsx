import React, { useRef, useState } from 'react';
import { ShoppingBag, Store, Building2, LayoutTemplate, Settings, Briefcase, Users, HeartPulse, Home, Utensils, Dumbbell, Bot, Sparkles, Code } from 'lucide-react';

const solutionsEs = [
  {
    icon: ShoppingBag, color: 'cyan', title: 'Tu Tienda Online',
    desc: 'Vendé las 24 horas con una plataforma rápida, moderna y optimizada para generar más ventas.'
  },
  {
    icon: Store, color: 'orange', title: 'Locales Comerciales',
    desc: 'Controlá ventas, stock, proveedores, gastos y movimientos desde un único lugar.'
  },
  {
    icon: Bot, color: 'indigo', title: 'Automatización de Procesos',
    desc: 'Reducí tareas repetitivas y eliminá errores operativos automatizando procesos clave de tu negocio.'
  },
  {
    icon: Users, color: 'red', title: 'Clubes y Asociaciones',
    desc: 'Gestioná socios, cuotas, reservas, actividades y documentación de manera simple y organizada.'
  },
  {
    icon: Dumbbell, color: 'lime', title: 'Gimnasios y Centros Deportivos',
    desc: 'Administrá membresías, pagos, asistencia y acceso de alumnos desde cualquier dispositivo.'
  },
  {
    icon: Building2, color: 'emerald', title: 'Instituciones y Organismos Públicos',
    desc: 'Soluciones para administración financiera, compras, gestión documental y trazabilidad de procesos.'
  },
  {
    icon: HeartPulse, color: 'rose', title: 'Clínicas y Consultorios',
    desc: 'Turnos online, historias clínicas digitales, recordatorios automáticos y gestión integral de pacientes.'
  },
  {
    icon: Sparkles, color: 'pink', title: 'Barberías y Estética',
    desc: 'Gestioná turnos, agenda, clientes, recordatorios automáticos y servicios desde una plataforma simple y moderna.'
  },
  {
    icon: LayoutTemplate, color: 'purple', title: 'Landing Pages',
    desc: 'Diseñadas para captar atención, generar confianza y convertir visitantes en clientes.'
  },
  {
    icon: Home, color: 'teal', title: 'Inmobiliarias',
    desc: 'Gestión de propiedades, alquileres, contratos y clientes en una única plataforma.'
  },
  {
    icon: Utensils, color: 'yellow', title: 'Gastronomía',
    desc: 'Menús digitales, pedidos, control de mesas y herramientas para optimizar la operación diaria.'
  },
  {
    icon: Briefcase, color: 'blue', title: 'Profesionales Independientes',
    desc: 'Herramientas para contadores, abogados, arquitectos, consultores y especialistas que buscan ordenar su trabajo.'
  },
  {
    icon: Code, color: 'cyan', title: 'Software a Medida',
    desc: 'Si ninguna solución existente resuelve exactamente lo que necesitás, construimos una desde cero.'
  }
];

const solutionsEn = [
  {
    icon: ShoppingBag, color: 'cyan', title: 'Your Online Store',
    desc: 'Sell 24/7 with a fast, modern platform optimized to generate more sales.'
  },
  {
    icon: Store, color: 'orange', title: 'Retail Stores',
    desc: 'Control sales, inventory, suppliers, expenses, and movements all from one place.'
  },
  {
    icon: Bot, color: 'indigo', title: 'Process Automation',
    desc: 'Reduce repetitive tasks and eliminate operational errors by automating key business processes.'
  },
  {
    icon: Users, color: 'red', title: 'Clubs and Associations',
    desc: 'Manage members, fees, bookings, activities, and documentation in a simple and organized way.'
  },
  {
    icon: Dumbbell, color: 'lime', title: 'Gyms & Sports Centers',
    desc: 'Manage memberships, payments, attendance, and student access from any device.'
  },
  {
    icon: Building2, color: 'emerald', title: 'Institutions & Public Agencies',
    desc: 'Solutions for financial administration, purchasing, document management, and process traceability.'
  },
  {
    icon: HeartPulse, color: 'rose', title: 'Clinics & Practices',
    desc: 'Online appointments, digital medical records, automatic reminders, and comprehensive patient management.'
  },
  {
    icon: Sparkles, color: 'pink', title: 'Barbershops & Beauty Salons',
    desc: 'Manage appointments, schedule, clients, automatic reminders, and services from a simple and modern platform.'
  },
  {
    icon: LayoutTemplate, color: 'purple', title: 'Landing Pages',
    desc: 'Designed to capture attention, build trust, and turn visitors into customers.'
  },
  {
    icon: Home, color: 'teal', title: 'Real Estate',
    desc: 'Property management, rentals, contracts, and clients on a single platform.'
  },
  {
    icon: Utensils, color: 'yellow', title: 'Gastronomy',
    desc: 'Digital menus, orders, table control, and tools to optimize daily operations.'
  },
  {
    icon: Briefcase, color: 'blue', title: 'Independent Professionals',
    desc: 'Tools for accountants, lawyers, architects, consultants, and specialists looking to organize their work.'
  },
  {
    icon: Code, color: 'cyan', title: 'Custom Software',
    desc: 'If no existing solution exactly solves what you need, we build one from scratch.'
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
  const title = lang === 'en' ? "SOLUTIONS ADAPTED TO EVERY REALITY" : "SOLUCIONES ADAPTADAS A CADA REALIDAD";
  const desc = lang === 'en' 
    ? "It doesn't matter if you have a startup, an SME, an institution or a public agency. We design tools that adapt to the way you work." 
    : "No importa si tenés un emprendimiento, una pyme, una institución o un organismo público. Diseñamos herramientas que se adaptan a tu forma de trabajar.";

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -350 : 350;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="servicios" className="w-full pt-24 pb-12 border-y border-white/5 bg-[#030303] relative">
      <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="text-left">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white uppercase tracking-tight">
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
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>

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

      <div className="md:hidden text-center mt-2 px-4 mb-12">
        <p className="text-cyan-400 text-xs tracking-wide uppercase bg-white/5 border border-white/10 py-3 rounded-xl mx-auto inline-block px-6 opacity-80">
          {lang === 'en' 
            ? "← Swipe to explore | Tap a card to contact us →" 
            : "← Deslizá para explorar | Tocá una tarjeta para contactarnos →"}
        </p>
      </div>

      {/* Excel Banner */}
      <div className="max-w-4xl mx-auto px-4 mt-8 pb-12" data-aos="fade-up">
        <div className="bg-gradient-to-br from-cyan-900/30 to-[#111] border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} className="text-cyan-400" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10 uppercase tracking-tight">
            {lang === 'en' ? "ALREADY HAVE INFO IN EXCEL?" : "¿YA TENÉS INFORMACIÓN EN EXCEL?"}
          </h3>
          <p className="text-cyan-400 font-bold mb-4 relative z-10">
            {lang === 'en' ? "Don't worry." : "No te preocupes."}
          </p>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed relative z-10 max-w-2xl mx-auto">
            {lang === 'en' 
              ? "We take care of migrating your data so you can start using your new platform from day one, keeping clients, products, history, and important records."
              : "Nos encargamos de migrar tus datos para que puedas comenzar a utilizar tu nueva plataforma desde el primer día, conservando clientes, productos, historial y registros importantes."}
          </p>
        </div>
      </div>

    </section>
  );
}
