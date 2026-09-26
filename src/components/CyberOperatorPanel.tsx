import React, { useState, useEffect, useRef } from 'react';
import { 
  type OperatorPersona, 
  PERSONAS_META, 
  NODE_COMMENTARY 
} from '../data/operatorPersonas';
import { DIMENSIONS, PORTFOLIO_NODES } from '../data/portfolioData';
import { cyberAudio } from '../utils/cyberAudio';
import { 
  Volume2, 
  VolumeX, 
  CornerDownLeft, 
  Bot,
  UserCheck,
  Terminal
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

    switch (true) {
      case trimmed === 'help':
        reply = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-matrix-green font-bold">// COMANDOS DE CONSOLA HUGOSYSTEM_OS:</p>
            <p><span className="text-gits-cyan font-bold">dir / ls / list</span> — Listar directorio de dimensiones y nodos</p>
            <p><span className="text-gits-cyan font-bold">cd &lt;dim&gt;</span> — Navegar hacia una dimensión (ej: cd freejolitos, cd weedtown, cd ..)</p>
            <p><span className="text-gits-cyan font-bold">cat &lt;dim&gt;</span> — Ver descripción y manifiesto del sector</p>
            <p><span className="text-gits-cyan font-bold">glyph [shuriken|compass|assassin|om]</span> — Cambiar modelo 3D activo</p>
            <p><span className="text-gits-cyan font-bold">ping [host]</span> — Latencia ICMP hacia el nodo de red</p>
            <p><span className="text-gits-cyan font-bold">npm install [pkg]</span> — Simulación de gestor de dependencias</p>
            <p><span className="text-gits-cyan font-bold">whoami</span> — Identidad y permisos en el constructo</p>
            <p><span className="text-gits-cyan font-bold">sudo &lt;cmd&gt;</span> — Ejecución con privilegios de root</p>
            <p><span className="text-gits-cyan font-bold">redes</span> — Directorio completo de perfiles y canales</p>
            <p><span className="text-gits-cyan font-bold">persona</span> — Alternar entre Proyecto 2501 y HLM</p>
            <p><span className="text-gits-cyan font-bold">cls / clear</span> — Limpiar pantalla de consola</p>
          </div>
        );
        break;

      case trimmed === 'cls' || trimmed === 'clear':
        setMessages([]);
        setInputVal('');
        return;

      case trimmed === 'dir' || trimmed === 'ls' || trimmed === 'list':
        reply = (
          <div className="space-y-1 text-[11px] font-mono">
            <p className="text-matrix-green font-bold">HUGOSYSTEM_OS [v420.2026.09] // Directorio de /construct:</p>
            <div className="border border-slate-300 dark:border-cyber-border/80 rounded p-2 bg-slate-100 dark:bg-cyber-void/80 space-y-1 text-slate-700 dark:text-cyber-textBright">
              {DIMENSIONS.map((dim) => (
                <div key={dim.id} className="flex items-center justify-between gap-2 hover:text-sky-600 dark:hover:text-gits-cyan">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="text-slate-400 dark:text-cyber-textMuted font-mono">drwxr-xr-x</span>
                    <span className="text-ninja-crimson font-bold">[{dim.code}]</span>
                    <span className="font-bold cursor-pointer hover:underline" onClick={() => onTriggerDimensionSelect(dim.id)}>{dim.id}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-cyber-textMuted truncate hidden sm:inline">{dim.name}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-cyber-textMuted">
              💡 Tip: Escribe <span className="text-gits-cyan font-bold">cd freejolitos</span> o <span className="text-gits-cyan font-bold">cd weedtown</span> para proyectarlo en el viewport.
            </p>
          </div>
        );
        break;

      case trimmed.startsWith('cd'): {
        const parts = trimmed.split(/\s+/);
        const target = parts[1] ? parts[1].toLowerCase().replace(/[\/\\]/g, '') : '';

        if (!target || target === '..' || target === 'all' || target === 'root') {
          onTriggerDimensionSelect('all');
          reply = currentPersona === 'PROJECT_2501'
            ? 'Retornando al directorio raíz. Matriz global sincronizada.'
            : 'Volviendo a la vista general con todas las dimensiones activas.';
        } else {
          // Match dimension aliases
          let matchedDim: string | null = null;
          if (['freejolitos', 'osc', 'tech', 'frl'].includes(target)) matchedDim = 'freejolitos';
          else if (['gamedev', 'games', 'game', 'ludic'].includes(target)) matchedDim = 'gamedev';
          else if (['weedtown', 'social', 'red', 'wt'].includes(target)) matchedDim = 'weedtown';
          else if (['cnnn', 'media', 'tv', 'video'].includes(target)) matchedDim = 'cnnn';
          else if (['advocacy', 'incidencia', 'comuna', 'comuna420', 'senado'].includes(target)) matchedDim = 'advocacy';
          else if (['github', 'lab', 'source', 'code', 'repo'].includes(target)) matchedDim = 'github';
          else if (['product_owner', 'po', 'corp', 'csi', 'acnur'].includes(target)) matchedDim = 'product_owner';
          else if (['ideas', 'incubator', 'wip'].includes(target)) matchedDim = 'ideas';

          if (matchedDim) {
            onTriggerDimensionSelect(matchedDim);
            reply = currentPersona === 'PROJECT_2501'
              ? `Accediendo a /construct/${matchedDim}. Telemetría de dimensión proyectada en viewport.`
              : `¡Cambiando de ruta a ${matchedDim}! Ahí tienes el sector desplegado en pantalla.`;
          } else {
            reply = (
              <span className="text-red-500 font-mono">
                cd: no such dimension or directory: '{target}'. Escribe <span className="text-matrix-green font-bold">dir</span> para ver la lista válida.
              </span>
            );
          }
        }
        break;
      }

      case trimmed.startsWith('cat'): {
        const parts = trimmed.split(/\s+/);
        const target = parts[1] ? parts[1].toLowerCase() : '';
        const dimMatch = DIMENSIONS.find((d) => d.id === target || d.code.toLowerCase().includes(target));

        if (dimMatch) {
          reply = (
            <div className="space-y-1 font-mono text-xs p-2 rounded bg-slate-100 dark:bg-cyber-void border border-slate-300 dark:border-cyber-border">
              <p className="text-gits-cyan font-bold"># MANIFIESTO DE DIMENSIÓN: {dimMatch.name} [{dimMatch.code}]</p>
              <p className="text-slate-700 dark:text-cyber-textBright">{dimMatch.description}</p>
              <p className="text-slate-500 dark:text-cyber-textMuted text-[10px]">Nodos vinculados: {dimMatch.nodeCount} | Estado: SINCRONIZADO</p>
            </div>
          );
        } else {
          reply = `cat: archivo o expediente no especificado. Uso: cat <dimension> (ej: cat freejolitos, cat weedtown).`;
        }
        break;
      }

      case trimmed.startsWith('glyph') || trimmed.startsWith('shape'): {
        const parts = trimmed.split(/\s+/);
        const targetShape = parts[1] ? parts[1].toLowerCase() : '';

        const validShapes: Record<string, string> = {
          shuriken: '3D Cyber-Shuriken (Ninja)',
          compass: 'Escuadra & Compás (Geometría Sagrada)',
          assassin: "Insignia de Assassin's Creed",
          om: 'Glifo Sagrado Hindú OM (ॐ)',
        };

        if (targetShape && validShapes[targetShape]) {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('hlm:set-glyph', { detail: targetShape }));
          }
          reply = currentPersona === 'PROJECT_2501'
            ? `Reconfigurando topología wireframe 3D a: [${validShapes[targetShape]}]. Redibujando vectores.`
            : `¡Cambiando el glifo 3D a ${validShapes[targetShape]}! Fíjate cómo se redibuja en el visor.`;
        } else {
          reply = (
            <div className="space-y-1 text-xs font-mono">
              <p className="text-matrix-green font-bold">// GLIFOS 3D DISPONIBLES EN HUGOSYSTEM:</p>
              <p>• <span className="text-gits-cyan font-bold">glyph shuriken</span> — Estrella ninja de 4 puntas biseladas</p>
              <p>• <span className="text-gits-cyan font-bold">glyph compass</span> — Escuadra y compás constructores</p>
              <p>• <span className="text-gits-cyan font-bold">glyph assassin</span> — Insignia gótica de la Hermandad</p>
              <p>• <span className="text-gits-cyan font-bold">glyph om</span> — Glifo sagrado hindú ॐ con bindu flotante</p>
              <p className="text-[10px] text-slate-500 dark:text-cyber-textMuted">💡 También puedes hacer clic sobre el modelo 3D para ciclarlo aleatoriamente.</p>
            </div>
          );
        }
        break;
      }

      case trimmed.startsWith('ping'): {
        const parts = trimmed.split(/\s+/);
        const host = parts[1] || 'hugolemoy.ninja';
        reply = (
          <div className="space-y-1 font-mono text-[11px] bg-slate-900 text-matrix-green p-2 rounded border border-matrix-green/30">
            <p>PING {host} (104.21.25.166): 56 data bytes</p>
            <p>64 bytes from 104.21.25.166: icmp_seq=0 ttl=58 time=11.4 ms</p>
            <p>64 bytes from 104.21.25.166: icmp_seq=1 ttl=58 time=12.2 ms</p>
            <p>64 bytes from 104.21.25.166: icmp_seq=2 ttl=58 time=10.9 ms</p>
            <p>64 bytes from 104.21.25.166: icmp_seq=3 ttl=58 time=11.8 ms</p>
            <p className="text-gits-cyan pt-1">--- {host} ping statistics ---</p>
            <p className="text-white">4 packets transmitted, 4 received, 0% packet loss, time 3004ms</p>
            <p className="text-slate-400">rtt min/avg/max = 10.9/11.57/12.2 ms // Cloudflare Anycast: OPTIMAL</p>
          </div>
        );
        break;
      }

      case trimmed.startsWith('npm'): {
        const pkgMatch = trimmed.replace(/^npm\s+(install|i|run)?\s*/, '').trim();
        const targetPkg = pkgMatch || '@ninja/vibe-coding';
        reply = (
          <div className="space-y-1 font-mono text-[11px] bg-slate-900 text-white p-2 rounded border border-slate-700">
            <p className="text-slate-400">$ npm install {targetPkg}</p>
            <p className="text-gits-cyan">[████████████████████████] 100% resolve</p>
            <p className="text-matrix-green">+ {targetPkg}@4.2.0-sovereign</p>
            <p className="text-slate-300">added 420 packages from 69 contributors in 0.420s</p>
            <p className="text-amberGold font-bold">audit: 0 vulnerabilities. Constructo optimizado para producción.</p>
          </div>
        );
        break;
      }

      case trimmed === 'whoami':
        reply = (
          <div className="font-mono text-xs space-y-0.5">
            <p><span className="text-ninja-crimson font-bold">hlm_visitor</span> (uid=420, gid=420) groups=420(shinobi), 2501(ghost), 0(root)</p>
            <p className="text-gits-cyan text-[11px]">Privilegios: ACCESO_TOTAL // SOBERANÍA_DIGITAL // CONSTRUCTO_ACTIVO</p>
          </div>
        );
        break;

      case trimmed.startsWith('sudo'):
        reply = currentPersona === 'PROJECT_2501'
          ? '[SUDO_NOT_REQUIRED]: Los protocolos de control centralizado han sido desmantelados. En HUGOSYSTEM ya operas con soberanía digital plena.'
          : '¿Sudo? Jaja, aquí no necesitas pedirle permiso a nadie ni andar usando credenciales de admin. Estás en mi casa, pásale con confianza.';
        break;

      case trimmed === 'freejolitos':
        onTriggerDimensionSelect('freejolitos');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Sector Freejolitos proyectado en viewport. Consultoría, ciberseguridad y desarrollo a la medida para OSCs sin departamento informático. Canal de enlace: hola@freejolitos.consulting.'
          : '¡Te abrí el showcase de Freejolitos a la derecha! Ahí están los servicios y el botón para agendar tu diagnóstico por WhatsApp o correo.';
        break;

      case trimmed === 'gamedev':
        onTriggerDimensionSelect('gamedev');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Matriz 2x2 de Serious Games y Game Jams sincronizada en pantalla principal.'
          : 'A la derecha tienes mis juegos: Legalízala Tycoon, el bit2fit de la GGJ y hasta la mascota virtual canna-gochi.';
        break;

      case trimmed === 'weedtown':
        onTriggerDimensionSelect('weedtown');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Sector weedtown.social proyectado en viewport: Red social soberana, descentralizada y libre de censura algorítmica.'
          : '¡Desplegando weedtown.social! Mi proyecto de red social comunitaria creada con vibe-coding para zafarnos de la censura de las Big Tech.';
        break;

      case trimmed === 'cnnn':
        onTriggerDimensionSelect('cnnn');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Frecuencia CNNN activada. El reproductor de video ha sido incrustado en el viewport.'
          : '¡Listo! Ahí tienes el reproductor de CNNN en pantalla. Dale play para ver el análisis de leyes.';
        break;

      case trimmed === 'incidencia':
        onTriggerDimensionSelect('advocacy');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Registros de incidencia y La Comuna 420 cargados. Análisis de articulación legislativa y 3+ años de voluntariado cívico pacífico ininterrumpido.'
          : 'Cargando el expediente de activismo: la propuesta #Capital420, las asambleas de La Comuna 420, la técnica legislativa con César Cravioto en el Senado y el plantón histórico.';
        break;

      case trimmed === 'github':
        onTriggerDimensionSelect('github');
        reply = currentPersona === 'PROJECT_2501'
          ? 'Repositorios públicos en GitHub (@HugoLeMoy47) vinculados en el nodo 06.'
          : 'Ahí te desplegué el task tracker para OSC, mis calculadoras estadísticas y scripts de facturación.';
        break;

      case trimmed === 'redes' || trimmed === 'social':
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

      case trimmed === 'persona':
        togglePersona(currentPersona === 'PROJECT_2501' ? 'HLM_ALTEREGO' : 'PROJECT_2501');
        return;

      default:
        reply = currentPersona === 'PROJECT_2501'
          ? `Directiva desconocida: '${trimmed}'. Consulta 'help' o 'dir' para telecomandos de red.`
          : `Ese comando no lo ubico: '${trimmed}'. Escribe 'help' o 'dir' y te paso las opciones disponibles.`;
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
        {['help', 'dir', 'glyph', 'freejolitos', 'gamedev', 'weedtown', 'cnnn', 'incidencia', 'github', 'redes'].map((cmd) => (
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
