import React, { useState } from 'react';
import { MessageCircle, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  const [honeypot, setHoneypot] = useState('');
  const [mathA, setMathA] = useState(0);
  const [mathB, setMathB] = useState(0);
  const [mathAnswer, setMathAnswer] = useState('');

  React.useEffect(() => {
    setMathA(Math.floor(Math.random() * 10) + 1);
    setMathB(Math.floor(Math.random() * 10) + 1);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Honeypot check (Bot detected)
    if (honeypot) {
      console.warn("Bot detected via honeypot.");
      return; // Silent fail
    }

    // 2. Math challenge check
    if (parseInt(mathAnswer, 10) !== (mathA + mathB)) {
      alert("La suma matemática es incorrecta. Por favor verificá que sos humano.");
      return;
    }

    // 3. Rate limiting (1 minute cooldown)
    const lastSubmitTime = localStorage.getItem('fam_last_contact_submit');
    if (lastSubmitTime && (Date.now() - parseInt(lastSubmitTime, 10) < 60000)) {
      alert("Por favor esperá un minuto antes de enviar otro mensaje.");
      return;
    }

    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone,
            message: formData.message 
          }
        ]);

      if (error) throw error;

      localStorage.setItem('fam_last_contact_submit', Date.now().toString());
      setStatus('success');
      // Reset form after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setMathAnswer('');
        setMathA(Math.floor(Math.random() * 10) + 1);
        setMathB(Math.floor(Math.random() * 10) + 1);
      }, 3000);
    } catch (error) {
      console.error('Error saving contact to Supabase:', error);
      setStatus('error');
      alert('Hubo un error al enviar el mensaje. Por favor intentá de nuevo.');
      setStatus('idle');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contacto" className="w-full max-w-7xl mx-auto py-32 px-4">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">Contanos tu idea y nosotros la hacemos realidad.</h2>
        <p className="text-xl text-gray-400 font-light">Elegí el canal que te resulte más cómodo. Hablá directo con nosotros por WhatsApp para una respuesta rápida o dejanos los detalles de tu proyecto y armamos una propuesta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 lg:gap-12 relative">
        {/* Background glow behind the entire section */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent -z-10 blur-3xl pointer-events-none"></div>

        {/* Left Column: WhatsApp / Direct Contact (2 columns wide) */}
        <div className="md:col-span-2 flex flex-col justify-between space-y-8">
          <div className="bg-gradient-to-b from-green-500/10 to-transparent border border-green-500/20 rounded-3xl p-8 lg:p-10 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 text-green-500/10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none">
              <MessageCircle size={150} />
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-6 border border-green-500/30">
                <MessageCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Chat Rápido</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                ¿Tenés una duda rápida o querés contarnos tu idea por audio? Escribinos directo a nuestro WhatsApp corporativo y te contestamos al instante.
              </p>
              
              {/* WhatsApp Link */}
              <a href="https://wa.me/5493482277706" target="_blank" rel="noreferrer" className="w-full inline-flex justify-center items-center gap-3 bg-[#25D366] text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#20b858] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)]">
                Escribinos por WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 flex-grow flex flex-col justify-center">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2"><Zap size={18} className="text-yellow-400" /> Sin compromisos</h4>
            <p className="text-gray-400 text-sm">
              Toda primera consulta, auditoría de tu código actual o estimación inicial es 100% gratuita. Analizamos tu problema y te decimos honestamente si podemos sumar valor.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form (3 columns wide) */}
        <div className="md:col-span-3 bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 relative overflow-hidden shadow-[0_20px_60px_rgba(255,255,255,0.05)]">

          
          <h3 className="text-2xl font-bold mb-2 relative z-10 text-black">Contanos los detalles</h3>
          <p className="text-gray-500 text-sm mb-8 relative z-10">Completá este formulario y nos pondremos en contacto con vos en menos de 24 horas.</p>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Honeypot hidden field */}
            <div className="hidden" aria-hidden="true" style={{ opacity: 0, position: 'absolute', zIndex: -10 }}>
              <label htmlFor="bot_field">No llenar este campo</label>
              <input 
                type="text" 
                id="bot_field" 
                name="bot_field" 
                tabIndex="-1" 
                autoComplete="off"
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)} 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email de contacto</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="juan@empresa.com"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de WhatsApp</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ej: +54 9 11 2345 6789"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
              />
            </div>

            {/* Project Details */}
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">¿De qué trata tu proyecto?</label>
              <textarea 
                id="message" 
                name="message" 
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Contanos un poco sobre tu idea, qué problema querés resolver o qué tecnología estás buscando implementar..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
              ></textarea>
            </div>

            {/* Math Challenge */}
            <div className="space-y-2 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label htmlFor="math_answer" className="text-sm font-medium text-gray-700">
                Para verificar que sos humano: <strong>¿Cuánto es {mathA} + {mathB}?</strong>
              </label>
              <input 
                type="text" 
                inputMode="numeric"
                pattern="[0-9]*"
                id="math_answer" 
                name="math_answer" 
                required
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                placeholder="Resultado"
                className="w-32 bg-white border border-gray-200 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-cyan-500 transition-all text-center font-bold"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={status !== 'idle'}
              className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] ${
                status === 'success' ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'bg-cyan-500 hover:bg-cyan-400 hover:scale-[1.02]'
              } ${status === 'submitting' ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {status === 'idle' && (
                <>Enviar Solicitud <ArrowRight size={20} /></>
              )}
              {status === 'submitting' && (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              )}
              {status === 'success' && (
                <>¡Mensaje Enviado! <CheckCircle2 size={20} /></>
              )}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
}
