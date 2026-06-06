import React, { useState, useEffect } from 'react';

const terminalLines = [
  { text: "FAM_OS v2.4.1 inicializando...", delay: 500, type: "system" },
  { text: "Estableciendo conexión segura...", delay: 800, type: "system" },
  { text: "Conexión establecida. Acceso concedido.", delay: 400, type: "success" },
  { text: "Cargando perfil: FAM Desarrollos", delay: 600, type: "system" },
  { text: " ", delay: 200, type: "empty" },
  { text: "> ¿QUIÉNES SOMOS?", delay: 1000, type: "command" },
  { text: "Somos un equipo apasionado por la tecnología.", delay: 800, type: "output" },
  { text: "Transformamos tus ideas en productos digitales de primer nivel.", delay: 800, type: "output" },
  { text: " ", delay: 300, type: "empty" },
  { text: "> ¿QUÉ HACEMOS?", delay: 1000, type: "command" },
  { text: "[*] Tiendas online listas para vender", delay: 400, type: "output" },
  { text: "[*] Sistemas de stock y finanzas a medida", delay: 400, type: "output" },
  { text: "[*] Páginas web ultrarrápidas y modernas", delay: 400, type: "output" },
  { text: " ", delay: 300, type: "empty" },
  { text: "> ESTADO?", delay: 800, type: "command" },
  { text: "SISTEMA LISTO. ESPERANDO NUEVOS DESAFÍOS...", delay: 600, type: "success" }
];

export default function TerminalAbout() {
  const [lines, setLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    if (currentIndex >= terminalLines.length) return;

    const currentLineData = terminalLines[currentIndex];
    
    let timer;
    if (currentLineData.type === 'command' || currentLineData.type === 'system') {
      // Typewriter effect for commands
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
      // Instant print for output/success/empty
      timer = setTimeout(() => {
        setLines(prev => [...prev, { text: currentLineData.text, type: currentLineData.type }]);
        setCurrentIndex(prev => prev + 1);
      }, currentLineData.delay);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (timer) clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 perspective-1000 group">
      <div className="relative bg-[#050505] border border-white/10 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.15)] transform rotate-x-12 group-hover:rotate-x-0 transition-transform duration-1000 min-h-[400px] flex flex-col font-mono text-sm sm:text-base">
        
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
