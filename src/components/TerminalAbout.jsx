import React, { useState, useEffect } from 'react';

const terminalLinesEs = [
  { text: "Inicializando FAM_OS...", delay: 500, type: "system" },
  { text: "Estableciendo conexión segura...", delay: 800, type: "system" },
  { text: "Conexión verificada.", delay: 400, type: "success" },
  { text: "Cargando experiencia profesional...", delay: 600, type: "system" },
  { text: " ", delay: 200, type: "empty" },
  { text: "✓ Sistemas de gestión y administración", delay: 400, type: "success" },
  { text: "✓ Plataformas SaaS escalables", delay: 400, type: "success" },
  { text: "✓ Automatización de procesos", delay: 400, type: "success" },
  { text: "✓ Aplicaciones web modernas", delay: 400, type: "success" },
  { text: "✓ Integraciones inteligentes", delay: 400, type: "success" },
  { text: " ", delay: 200, type: "empty" },
  { text: "ESTADO: DISPONIBLE PARA NUEVOS DESAFÍOS", delay: 600, type: "success" },
  { text: " ", delay: 200, type: "empty" },
  { text: "> ¿QUIÉNES SOMOS?", delay: 1000, type: "command" },
  { text: "Entendemos negocios antes que código.", delay: 800, type: "output" },
  { text: "Trabajamos junto a cada cliente para identificar problemas reales, optimizar procesos y construir herramientas digitales que generen resultados concretos.", delay: 800, type: "output" },
  { text: "La tecnología es el medio.", delay: 600, type: "output" },
  { text: "El objetivo es ayudarte a trabajar mejor.", delay: 600, type: "output" },
  { text: " ", delay: 300, type: "empty" },
  { text: "> ¿QUÉ HACEMOS?", delay: 1000, type: "command" },
  { text: "[*] Sistemas de gestión a medida", delay: 400, type: "output" },
  { text: "[*] Plataformas SaaS", delay: 400, type: "output" },
  { text: "[*] Automatización de procesos", delay: 400, type: "output" },
  { text: "[*] Aplicaciones web modernas", delay: 400, type: "output" },
  { text: "[*] Integraciones con WhatsApp y servicios externos", delay: 400, type: "output" },
  { text: "[*] Infraestructura cloud segura y escalable", delay: 400, type: "output" },
  { text: " ", delay: 300, type: "empty" },
  { text: "> ESTADO?", delay: 800, type: "command" },
  { text: "SISTEMA OPERATIVO.", delay: 600, type: "success" },
  { text: "LISTO PARA CONSTRUIR TU PRÓXIMO PROYECTO.", delay: 600, type: "success" }
];

const terminalLinesEn = [
  { text: "Initializing FAM_OS...", delay: 500, type: "system" },
  { text: "Establishing secure connection...", delay: 800, type: "system" },
  { text: "Connection verified.", delay: 400, type: "success" },
  { text: "Loading professional experience...", delay: 600, type: "system" },
  { text: " ", delay: 200, type: "empty" },
  { text: "✓ Management and administration systems", delay: 400, type: "success" },
  { text: "✓ Scalable SaaS platforms", delay: 400, type: "success" },
  { text: "✓ Process automation", delay: 400, type: "success" },
  { text: "✓ Modern web applications", delay: 400, type: "success" },
  { text: "✓ Smart integrations", delay: 400, type: "success" },
  { text: " ", delay: 200, type: "empty" },
  { text: "STATUS: AVAILABLE FOR NEW CHALLENGES", delay: 600, type: "success" },
  { text: " ", delay: 200, type: "empty" },
  { text: "> WHO ARE WE?", delay: 1000, type: "command" },
  { text: "We understand business before code.", delay: 800, type: "output" },
  { text: "We work with each client to identify real problems, optimize processes, and build digital tools that generate concrete results.", delay: 800, type: "output" },
  { text: "Technology is the medium.", delay: 600, type: "output" },
  { text: "The goal is to help you work better.", delay: 600, type: "output" },
  { text: " ", delay: 300, type: "empty" },
  { text: "> WHAT DO WE DO?", delay: 1000, type: "command" },
  { text: "[*] Custom management systems", delay: 400, type: "output" },
  { text: "[*] SaaS Platforms", delay: 400, type: "output" },
  { text: "[*] Process automation", delay: 400, type: "output" },
  { text: "[*] Modern web applications", delay: 400, type: "output" },
  { text: "[*] WhatsApp and third-party integrations", delay: 400, type: "output" },
  { text: "[*] Secure and scalable cloud infrastructure", delay: 400, type: "output" },
  { text: " ", delay: 300, type: "empty" },
  { text: "> STATUS?", delay: 800, type: "command" },
  { text: "SYSTEM OPERATIONAL.", delay: 600, type: "success" },
  { text: "READY TO BUILD YOUR NEXT PROJECT.", delay: 600, type: "success" }
];

export default function TerminalAbout({ lang = 'es' }) {
  const [lines, setLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState("");

  const terminalLines = lang === 'en' ? terminalLinesEn : terminalLinesEs;

  useEffect(() => {
    if (currentIndex >= terminalLines.length) return;

    const currentLineData = terminalLines[currentIndex];
    
    let timer;
    if (currentLineData.type === 'command' || currentLineData.type === 'system') {
      setIsTyping(true);
      let charIndex = 0;
      timer = setInterval(() => {
        setCurrentText(currentLineData.text.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentLineData.text.length) {
          clearInterval(timer);
          setIsTyping(false);
          setTimeout(() => {
            setLines(prev => [...prev, { text: currentLineData.text, type: currentLineData.type }]);
            setCurrentText("");
            setCurrentIndex(prev => prev + 1);
          }, currentLineData.delay);
        }
      }, 30);
    } else {
      timer = setTimeout(() => {
        setLines(prev => [...prev, { text: currentLineData.text, type: currentLineData.type }]);
        setCurrentIndex(prev => prev + 1);
      }, currentLineData.delay);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex, lang]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12" style={{ perspective: '1000px' }}>
      <div className="relative group bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)] transition-transform duration-1000 min-h-[400px] flex flex-col font-mono text-sm sm:text-base hover:shadow-[0_0_80px_rgba(6,182,212,0.3)]">
        
        {/* Terminal Header */}
        <div className="bg-[#111] border-b border-white/10 px-4 py-3 flex items-center gap-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="mx-auto text-gray-500 text-xs tracking-widest">root@fam-mainframe:~</div>
        </div>

        {/* Terminal Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {lines.map((line, i) => (
            <div key={i} className={`mb-1 ${
              line.type === 'system' ? 'text-gray-500' :
              line.type === 'command' ? 'text-cyan-400 font-bold' :
              line.type === 'success' ? 'text-green-400' :
              'text-gray-300'
            }`}>
              {line.type === 'command' && <span className="text-green-400 mr-2">❯</span>}
              {line.text}
            </div>
          ))}
          
          {/* Current typing line */}
          {isTyping && (
            <div className="text-cyan-400 font-bold mb-1">
              {terminalLines[currentIndex]?.type === 'command' && <span className="text-green-400 mr-2">❯</span>}
              {currentText}<span className="inline-block w-2 h-4 bg-white/70 ml-1 animate-pulse"></span>
            </div>
          )}
          
          {/* Blinking cursor at the end */}
          {!isTyping && currentIndex >= terminalLines.length && (
            <div className="text-gray-300 mt-2">
              <span className="text-green-400 mr-2">❯</span><span className="inline-block w-2 h-4 bg-white/70 animate-pulse"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
