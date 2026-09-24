import React, { useState, useEffect, useRef } from 'react';
import { 
  type OperatorPersona, 
  PERSONAS_META, 
  NODE_COMMENTARY 
} from '../data/operatorPersonas';
import { cyberAudio } from '../utils/cyberAudio';
import { 
  Volume2, 
  VolumeX, 
  CornerDownLeft, 
  Bot,
  UserCheck
} from 'lucide-react';
import gsap from 'gsap';

interface CyberOperatorPanelProps {
  currentPersona: OperatorPersona;
  onPersonaChange: (persona: OperatorPersona) => void;
  selectedNodeId: string | null;
  onTriggerDimensionSelect: (dimId: string) => void;
  theme?: 'light' | 'dark';
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string | React.ReactNode;
  timestamp: string;
}

export const CyberOperatorPanel: React.FC<CyberOperatorPanelProps> = ({
  currentPersona,
  onPersonaChange,
  selectedNodeId,
  onTriggerDimensionSelect,
  theme = 'dark',
}) => {
  const meta = PERSONAS_META[currentPersona];
  const [inputVal, setInputVal] = useState('');
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Initialize or update welcome on persona switch
  useEffect(() => {
    const welcome = PERSONAS_META[currentPersona].welcomeMessage;
    setMessages([
      {
        id: `sys-${Date.now()}`,
        sender: 'system',
        text: `>>> OPERADOR CONECTADO: [${PERSONAS_META[currentPersona].codename}]`,
        timestamp: new Date().toLocaleTimeString(),
      },
      {
        id: `welcome-${Date.now()}`,
        sender: 'ai',
        text: welcome,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    // Animate panel glow shift with GSAP
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { scale: 0.99, borderColor: currentPersona === 'PROJECT_2501' ? '#00f0ff' : '#f59e0b' },
        { scale: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentPersona]);

  // React dynamically when user clicks a node in the right viewport
  useEffect(() => {
    if (!selectedNodeId) return;

    const commentary = NODE_COMMENTARY[currentPersona][selectedNodeId];
    if (commentary) {
      cyberAudio.playNodeSelect(meta.accentColor);
      setMessages((prev) => [
        ...prev,
        {
          id: `node-${Date.now()}`,
          sender: 'ai',
          text: (
            <div>
              <span className="text-[10px] text-matrix-green font-bold block uppercase tracking-wider mb-1">
                // ANÁLISIS DE TELEMETRÍA [NODO: {selectedNodeId}]
              </span>
              <p className="text-cyber-textBright text-xs leading-relaxed">{commentary}</p>
            </div>
          ),
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  }, [selectedNodeId, currentPersona]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const togglePersona = (newPersona: OperatorPersona) => {
    cyberAudio.playClick(900);
    onPersonaChange(newPersona);
  };

  const toggleAudio = () => {
    const newMute = !isAudioMuted;
    setIsAudioMuted(newMute);
    cyberAudio.setMuted(newMute);
    if (!newMute) {
      cyberAudio.playClick(1000);
    }
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    cyberAudio.playTypingChirp();

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: cmd,
      timestamp: new Date().toLocaleTimeString(),
    };

    let reply: React.ReactNode = '';

    switch (trimmed) {
      case 'help':
        reply = (
          <div className="space-y-1 text-xs">
            <p className="text-matrix-green font-bold">Comandos disponibles:</p>
            <p><span className="text-gits-cyan">freejolitos</span> — Consultoría de tecnología e IA para OSCs</p>
            <p><span className="text-gits-cyan">gamedev</span> — Legalízala Tycoon, Global Game Jam y Serious Games</p>
            <p><span className="text-gits-cyan">weedtown</span> — Red social autónoma y soberana</p>
            <p><span className="text-gits-cyan">cnnn</span> — Conducción en noticias cannábicas y video</p>
            <p><span className="text-gits-cyan">incidencia</span> — La Comuna 420, #Capital420 y Senado</p>
            <p><span className="text-gits-cyan">github</span> — Repositorios y código en @HugoLeMoy47</p>
            <p><span className="text-gits-cyan">redes</span> — Directorio completo de perfiles y canales</p>
            <p><span className="text-gits-cyan">persona</span> — Alternar entre Proyecto 2501 y HLM</p>
            <p><span className="text-gits-cyan">clear</span> — Limpiar pantalla</p>
          </div>
        );
        break;

      case 'freejolitos':
        onTriggerDimensionSelect('freejolitos');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Sector Freejolitos proyectado en viewport. Tarifa de diagnóstico $16.7k e inversión mensual $8.1k para OSCs sin departamento informático.'
          : '¡Te abrí el showcase de Freejolitos a la derecha! Ahí puedes ver los tres servicios y mandarme un WhatsApp directo.';
        break;

      case 'gamedev':
        onTriggerDimensionSelect('gamedev');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Matriz 2x2 de Serious Games y Game Jams sincronizada en pantalla principal.'
          : 'A la derecha tienes mis juegos: Legalízala Tycoon, el bit2fit de la GGJ y hasta la mascota virtual canna-gochi.';
        break;

      case 'weedtown':
        onTriggerDimensionSelect('weedtown');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Sector weedtown.social proyectado en viewport: Red social soberana, descentralizada y libre de censura algorítmica.'
          : '¡Desplegando weedtown.social! Mi proyecto de red social comunitaria creada con vibe-coding para zafarnos de la censura de las Big Tech.';
        break;

      case 'cnnn':
        onTriggerDimensionSelect('cnnn');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Frecuencia CNNN activada. El reproductor de video ha sido incrustado en el viewport.'
          : '¡Listo! Ahí tienes el reproductor de CNNN en pantalla. Dale play para ver el análisis de leyes.';
        break;

      case 'incidencia':
        onTriggerDimensionSelect('advocacy');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Registros de incidencia y La Comuna 420 cargados. Análisis de articulación legislativa y 3+ años de voluntariado cívico pacífico ininterrumpido.'
          : 'Cargando el expediente de activismo: la propuesta #Capital420, las asambleas de La Comuna 420, la técnica legislativa con César Cravioto en el Senado y el plantón histórico.';
        break;

      case 'github':
        onTriggerDimensionSelect('github');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Repositorios públicos en GitHub (@HugoLeMoy47) vinculados en el nodo 06.'
          : 'Ahí te desplegué el tracker de CAFEMIN, mis calculadoras estadísticas y scripts de facturación.';
        break;

      case 'redes':
      case 'social':
        reply = (
          <div className="space-y-1.5 text-xs">
            <p className="text-matrix-green font-bold">// DIRECTORIO DE IDENTIDAD & CANALES SOCIALES:</p>
            <p>• <a href="https://www.linkedin.com/in/hugolegorretamoysen/" target="_blank" rel="noopener noreferrer" className="text-sky-500 underline font-bold">LinkedIn</a> — Expediente formal y trayectoria corporativa</p>
            <p>• <a href="https://www.facebook.com/HugoLeMoy" target="_blank" rel="noopener noreferrer" className="text-sky-500 underline font-bold">Facebook</a> — Cotorreo social y comunidad abierta</p>
            <p>• <a href="https://x.com/HugoLeMoy" target="_blank" rel="noopener noreferrer" className="text-slate-400 underline font-bold">X (Twitter)</a> — Debate público y reflexiones sin filtro</p>
            <p>• <a href="https://www.instagram.com/hugolemoy" target="_blank" rel="noopener noreferrer" className="text-pink-500 underline font-bold">Instagram</a> — Perspectiva visual y backstage</p>
            <p>• <a href="https://github.com/HugoLeMoy47" target="_blank" rel="noopener noreferrer" className="text-emerald-500 underline font-bold">GitHub</a> — Auditoría de código y repositorios</p>
            <p>• <a href="https://weedtown.social" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-bold">weedtown.social</a> — Red comunitaria soberana</p>
            <p>• <a href="https://freejolitos.consulting" target="_blank" rel="noopener noreferrer" className="text-amber-500 underline font-bold">Freejolitos</a> — Consultoría e IA ética para OSCs</p>
          </div>
        );
        break;

      case 'persona':
        togglePersona(currentPersona === 'PROJECT_2501' ? 'HLM_ALTEREGO' : 'PROJECT_2501');
        return;

      case 'clear':
        setMessages([]);
        setInputVal('');
        return;

      default:
        reply = currentPersona === 'PROJECT_2501'
          ? `Directiva desconocida: '${trimmed}'. Consulta 'help' para telecomandos de red.`
          : `Ese comando no lo ubico: '${trimmed}'. Escribe 'help' y te paso la lista de lo que puedes pedir.`;
    }

    setMessages((prev) => [
      ...prev,
      userMsg,
      {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInputVal('');
  };

  return (
    <div 
      ref={panelRef}
      className={`flex flex-col h-full rounded-xl border-2 p-4 shadow-2xl backdrop-blur-md font-mono text-xs transition-colors duration-250 ${
        theme === 'light'
          ? 'bg-white/95 border-slate-300 text-slate-800 shadow-lg'
          : 'bg-cyber-card/95 border-cyber-border text-cyber-textBright box-glow-cyan'
      }`}
    >
      {/* Operator Header & Persona Switcher */}
      <div className="border-b border-slate-200 dark:border-cyber-border pb-3 space-y-2.5">
        
        {/* Top Control Bar: Audio + Persona Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full animate-ping ${currentPersona === 'PROJECT_2501' ? 'bg-sky-500 dark:bg-gits-cyan' : 'bg-amber-500 dark:bg-amberGold'}`}></span>
            <span className={`font-bold tracking-wider text-[11px] ${currentPersona === 'PROJECT_2501' ? 'text-sky-600 dark:text-gits-cyan' : 'text-amber-600 dark:text-amberGold'}`}>
              {meta.systemBadge}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleAudio}
              className={`p-1 px-2 rounded border text-[10px] flex items-center gap-1 transition-all ${
                isAudioMuted 
                  ? 'border-slate-300 dark:border-cyber-border text-slate-500 dark:text-cyber-textMuted hover:text-slate-800 dark:hover:text-cyber-textBright' 
                  : 'border-emerald-500 text-emerald-600 dark:text-matrix-green bg-emerald-50 dark:bg-matrix-green/10'
              }`}
              title="Efectos de audio táctiles"
            >
              {isAudioMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              <span className="hidden sm:inline">{isAudioMuted ? 'MUTE' : 'AUDIO'}</span>
            </button>
          </div>
        </div>

        {/* Persona A/B Selector Segmented Switch */}
        <div className="bg-slate-100 dark:bg-cyber-void p-1 rounded-lg border border-slate-200 dark:border-cyber-border grid grid-cols-2 gap-1 text-[11px]">
          <button
            onClick={() => togglePersona('PROJECT_2501')}
            className={`py-1.5 px-2 rounded font-bold transition-all flex items-center justify-center gap-1.5 ${
              currentPersona === 'PROJECT_2501'
                ? 'bg-sky-500/15 text-sky-700 dark:text-gits-cyan border border-sky-400 dark:border-gits-cyan/50 shadow-sm'
                : 'text-slate-500 dark:text-cyber-textMuted hover:text-slate-900 dark:hover:text-cyber-textBright'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>PROYECTO 2501</span>
          </button>

          <button
            onClick={() => togglePersona('HLM_ALTEREGO')}
            className={`py-1.5 px-2 rounded font-bold transition-all flex items-center justify-center gap-1.5 ${
              currentPersona === 'HLM_ALTEREGO'
                ? 'bg-amber-500/15 text-amber-800 dark:text-amberGold border border-amber-400 dark:border-amberGold/50 shadow-sm'
                : 'text-slate-500 dark:text-cyber-textMuted hover:text-slate-900 dark:hover:text-cyber-textBright'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>HLM ALTER EGO</span>
          </button>
        </div>

        <p className="text-[10px] text-slate-500 dark:text-cyber-textMuted leading-tight italic">
          {meta.tagline}
        </p>
      </div>

      {/* Messages / Dialogue Stream */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-2 my-2 space-y-3 bg-slate-50 dark:bg-cyber-void/70 rounded-lg border border-slate-200 dark:border-cyber-border/80 text-xs"
        style={{ minHeight: '380px', maxHeight: '520px' }}
      >
        {messages.map((m) => (
          <div key={m.id} className="space-y-1">
            {m.sender === 'system' && (
              <div className="text-[10px] text-slate-400 dark:text-cyber-textMuted border-b border-slate-200 dark:border-cyber-border/40 pb-1">
                {m.text}
              </div>
            )}

            {m.sender === 'user' && (
              <div className="flex items-start gap-1 text-slate-800 dark:text-cyber-textBright bg-slate-200/80 dark:bg-cyber-card/60 p-2 rounded border border-slate-300 dark:border-cyber-border">
                <span className="text-red-600 dark:text-matrix-green font-bold">&gt;</span>
                <span className="font-semibold">{m.text}</span>
              </div>
            )}

            {m.sender === 'ai' && (
              <div className={`p-2.5 rounded border text-xs leading-relaxed ${
                currentPersona === 'PROJECT_2501'
                  ? 'bg-sky-50 dark:bg-gits-cyan/10 border-sky-200 dark:border-gits-cyan/30 text-slate-800 dark:text-cyber-textBright'
                  : 'bg-amber-50 dark:bg-amberGold/10 border-amber-200 dark:border-amberGold/30 text-slate-800 dark:text-cyber-textBright'
              }`}>
                <div className="flex items-center justify-between text-[10px] opacity-75 mb-1 font-bold">
                  <span>{meta.name}:</span>
                  <span className="font-normal opacity-70">{m.timestamp}</span>
                </div>
                <div>{m.text}</div>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Command Pills */}
      <div className="flex flex-wrap gap-1 pb-2 pt-1 text-[10px]">
        {['help', 'freejolitos', 'gamedev', 'weedtown', 'cnnn', 'incidencia', 'github', 'redes'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            className="px-2 py-0.5 rounded bg-white dark:bg-cyber-void border border-slate-300 dark:border-cyber-border hover:border-red-500 dark:hover:border-gits-cyan text-slate-600 dark:text-cyber-textMuted hover:text-red-600 dark:hover:text-gits-cyan transition-colors"
          >
            /{cmd}
          </button>
        ))}
      </div>

      {/* Command Line Input */}
      <div className="pt-2 border-t border-slate-200 dark:border-cyber-border flex items-center gap-2">
        <span className={`text-xs font-bold ${currentPersona === 'PROJECT_2501' ? 'text-sky-600 dark:text-gits-cyan' : 'text-amber-600 dark:text-amberGold'}`}>
          {currentPersona === 'PROJECT_2501' ? '2501@net:~$ ' : 'hugo@cdmx:~$ '}
        </span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCommand(inputVal);
            }
          }}
          placeholder="escribe una consulta o comando..."
          className="flex-1 bg-transparent text-slate-900 dark:text-white text-xs focus:outline-none placeholder:text-slate-400 dark:placeholder:text-cyber-textMuted/60"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="p-1 rounded text-sky-600 dark:text-gits-cyan hover:text-red-600 dark:hover:text-matrix-green"
          title="Ejecutar"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
