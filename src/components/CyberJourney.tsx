import React, { useState } from 'react';
import { 
  DIMENSIONS, 
  PORTFOLIO_NODES, 
  type PortfolioNode, 
  type DimensionMeta 
} from '../data/portfolioData';
import { 
  Gamepad2, 
  Scale, 
  Tv, 
  GitBranch, 
  Cpu, 
  Sparkles, 
  ExternalLink, 
  Github, 
  Play, 
  FileText, 
  ChevronRight, 
  ChevronLeft,
  Layers, 
  Compass,
  X
} from 'lucide-react';

interface CyberJourneyProps {
  viewMode: 'journey' | 'continuous' | 'expedition';
  onSetViewMode?: (mode: 'journey' | 'continuous' | 'expedition') => void;
}

export const CyberJourney: React.FC<CyberJourneyProps> = ({ 
  viewMode: initialViewMode,
  onSetViewMode
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [activeModalNode, setActiveModalNode] = useState<PortfolioNode | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  
  // Guided Expedition State
  const [isExpeditionActive, setIsExpeditionActive] = useState<boolean>(initialViewMode === 'expedition');
  const [expeditionIndex, setExpeditionIndex] = useState<number>(0);

  const handleSelectNode = (node: PortfolioNode) => {
    setActiveModalNode(node);
    setVisitedNodes((prev) => new Set(prev).add(node.id));
  };

  const startExpedition = () => {
    setIsExpeditionActive(true);
    setExpeditionIndex(0);
    const firstNode = PORTFOLIO_NODES[0];
    if (firstNode) {
      setVisitedNodes((prev) => new Set(prev).add(firstNode.id));
    }
  };

  const nextExpeditionNode = () => {
    const nextIdx = (expeditionIndex + 1) % PORTFOLIO_NODES.length;
    setExpeditionIndex(nextIdx);
    const nextNode = PORTFOLIO_NODES[nextIdx];
    if (nextNode) {
      setVisitedNodes((prev) => new Set(prev).add(nextNode.id));
    }
  };

  const prevExpeditionNode = () => {
    const prevIdx = (expeditionIndex - 1 + PORTFOLIO_NODES.length) % PORTFOLIO_NODES.length;
    setExpeditionIndex(prevIdx);
    const prevNode = PORTFOLIO_NODES[prevIdx];
    if (prevNode) {
      setVisitedNodes((prev) => new Set(prev).add(prevNode.id));
    }
  };

  const filteredNodes = selectedDimension === 'all'
    ? PORTFOLIO_NODES
    : PORTFOLIO_NODES.filter((n) => n.dimension === selectedDimension);

  const getDimensionIcon = (dimId: string) => {
    switch (dimId) {
      case 'freejolitos':
        return <span className="text-base">🫘</span>;
      case 'gamedev':
        return <Gamepad2 className="w-4 h-4 text-gits-cyan" />;
      case 'advocacy':
        return <Scale className="w-4 h-4 text-matrix-green" />;
      case 'cnnn':
        return <Tv className="w-4 h-4 text-matrix-green" />;
      case 'github':
        return <GitBranch className="w-4 h-4 text-gits-cyan" />;
      case 'product_owner':
        return <Cpu className="w-4 h-4 text-gits-cyan" />;
      case 'ideas':
        return <Sparkles className="w-4 h-4 text-amberGold" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  // Determine dynamic grid columns based on item count
  const getGridClasses = (count: number) => {
    if (count === 1) return 'grid grid-cols-1';
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-6';
    if (count === 4) return 'grid grid-cols-1 md:grid-cols-2 gap-6'; // 2x2 Clean Layout
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'; // Default 3 columns
  };

  const currentExpeditionNode = PORTFOLIO_NODES[expeditionIndex];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-12">
      
      {/* ========================================================================= */}
      {/* CENTRAL KERNEL / HERO CONSTRUCT (GHOST IN THE SHELL / MATRIX CORE)        */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-xl bg-cyber-card/90 border border-cyber-border p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        
        {/* Decorative corner brackets */}
        <div className="absolute top-2 left-2 text-cyber-textMuted/40 font-mono text-[10px]">┌ [SYS_CORE:HLM]</div>
        <div className="absolute top-2 right-2 text-cyber-textMuted/40 font-mono text-[10px]">[MATRIX_GRID] ┐</div>
        <div className="absolute bottom-2 left-2 text-cyber-textMuted/40 font-mono text-[10px]">└ [SYNC:100%]</div>
        <div className="absolute bottom-2 right-2 text-cyber-textMuted/40 font-mono text-[10px]">[LOC:CDMX] ┘</div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Avatar & Central Identity HUD */}
          <div className="flex-1 text-center lg:text-left space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gits-cyan/10 border border-gits-cyan/30 text-gits-cyan text-xs font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-gits-cyan animate-pulse"></span>
              <span>IDENTITY KERNEL // MULTIDIMENSIONAL PROFILE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white">
              Hugo Legorreta <span className="text-gits-cyan glow-cyan">Moysén</span>
            </h1>

            <p className="text-sm sm:text-base text-cyber-textBright font-mono leading-relaxed max-w-2xl">
              <strong className="text-matrix-green">Product Owner</strong> & Consultor Tecnológico híbrido. Fundador de <strong className="text-amberGold">Freejolitos</strong>, activista cannábico en <strong className="text-matrix-green">La Comuna 42</strong> (#Capital420 / Senado), anfitrión de <strong className="text-matrix-green">CNNN</strong>, creador de <strong className="text-gits-cyan">Legalízala Tycoon</strong> y entusiasta del desarrollo de videojuegos.
            </p>

            {/* Quick Badges Telemetry */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded bg-cyber-void border border-cyber-border text-cyber-textBright">
                📍 CDMX / Remoto
              </span>
              <span className="px-2.5 py-1 rounded bg-cyber-void border border-matrix-green/30 text-matrix-green">
                🛡️ Base: Tech + Negocio + Derechos
              </span>
              <span className="px-2.5 py-1 rounded bg-cyber-void border border-gits-cyan/30 text-gits-cyan">
                🌐 GitHub: @HugoLeMoy47
              </span>
              <span className="px-2.5 py-1 rounded bg-cyber-void border border-amberGold/30 text-amberGold">
                🫘 freejolitos.consulting
              </span>
            </div>

          </div>

          {/* Holographic Radar / Orbital Core */}
          <div className="relative flex flex-col items-center justify-center p-6 bg-cyber-void/80 rounded-xl border border-cyber-border box-glow-cyan w-full lg:w-88">
            
            {/* Radar Center Graphic */}
            <div className="relative w-36 h-36 rounded-full border-2 border-gits-cyan/30 flex items-center justify-center">
              {/* Concentric rings */}
              <div className="absolute inset-2 rounded-full border border-dashed border-matrix-green/40 animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-6 rounded-full border border-gits-cyan/20"></div>
              
              {/* Radar Sweeper */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gits-cyan/20 via-transparent to-transparent animate-radar-sweep"></div>
              
              {/* Center Glyph */}
              <div className="z-10 text-center">
                <span className="text-2xl font-bold font-mono text-matrix-green glow-matrix">HLM</span>
                <span className="block text-[10px] font-mono text-gits-cyan">NINJA.CORE</span>
              </div>
            </div>

            {/* Journey Progress and Expedition Trigger Button */}
            <div className="w-full mt-4 space-y-2 text-center font-mono text-xs">
              <div className="flex justify-between text-cyber-textMuted">
                <span>EXPEDICIÓN:</span>
                <span className="text-matrix-green font-bold">
                  {visitedNodes.size} / {PORTFOLIO_NODES.length} SINTONIZADOS
                </span>
              </div>
              <div className="w-full h-1.5 bg-cyber-border rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-matrix-green to-gits-cyan transition-all duration-500"
                  style={{ width: `${(visitedNodes.size / PORTFOLIO_NODES.length) * 100}%` }}
                ></div>
              </div>

              {/* Action Button: Iniciar Expedición */}
              <button
                onClick={startExpedition}
                className="w-full mt-3 py-2 px-3 rounded-lg bg-matrix-green/15 hover:bg-matrix-green/25 border border-matrix-green/50 hover:border-matrix-green text-matrix-green font-bold flex items-center justify-center gap-2 transition-all shadow-md group"
              >
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>{isExpeditionActive ? 'MODO EXPEDICIÓN ACTIVO' : 'INICIAR EXPEDICIÓN GUIADA'}</span>
              </button>
            </div>

          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* EXPEDITION SPOTLIGHT MODE (IF ACTIVE)                                     */}
      {/* ========================================================================= */}
      {isExpeditionActive && currentExpeditionNode && (
        <section className="relative rounded-xl bg-cyber-card/95 border-2 border-matrix-green p-6 sm:p-8 space-y-6 shadow-2xl box-glow-matrix font-mono">
          
          {/* Header of Expedition Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-border pb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matrix-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-matrix-green"></span>
              </span>
              <span className="text-matrix-green font-bold text-sm tracking-wider">
                EXPEDICIÓN EN VIVO // NODO [{expeditionIndex + 1} DE {PORTFOLIO_NODES.length}]: {currentExpeditionNode.code}
              </span>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevExpeditionNode}
                className="p-1.5 px-3 rounded bg-cyber-void border border-cyber-border hover:border-gits-cyan text-cyber-textBright flex items-center gap-1 text-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>ANTERIOR</span>
              </button>

              <button
                onClick={nextExpeditionNode}
                className="p-1.5 px-3 rounded bg-matrix-green/20 border border-matrix-green hover:bg-matrix-green/30 text-matrix-green flex items-center gap-1 text-xs font-bold"
              >
                <span>SIGUIENTE</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpeditionActive(false)}
                className="p-1.5 px-2.5 rounded bg-cyber-void border border-cyber-border hover:border-red-400 text-cyber-textMuted hover:text-red-400 text-xs ml-2"
                title="Salir del modo expedición guiada"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expedition Spotlight Body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left 2 Cols: Main Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-matrix-green/20 text-matrix-green border border-matrix-green/40">
                    {currentExpeditionNode.badge}
                  </span>
                  <span className="text-xs text-cyber-textMuted">DIMENSIÓN: {currentExpeditionNode.dimension.toUpperCase()}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {currentExpeditionNode.title}
                </h2>
                <p className="text-sm text-gits-cyan">{currentExpeditionNode.subtitle}</p>
              </div>

              <p className="text-sm text-cyber-textBright leading-relaxed bg-cyber-void/80 p-4 rounded-lg border border-cyber-border">
                {currentExpeditionNode.summary}
              </p>

              {/* Problem / Solution / Impact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 rounded bg-cyber-void/60 border border-cyber-border space-y-1">
                  <span className="text-amberGold font-bold text-[11px] block">01 // CONTEXTO</span>
                  <p className="text-cyber-textMuted line-clamp-4">{currentExpeditionNode.details.problemOrContext}</p>
                </div>
                <div className="p-3 rounded bg-cyber-void/60 border border-cyber-border space-y-1">
                  <span className="text-gits-cyan font-bold text-[11px] block">02 // ROL DE HUGO</span>
                  <p className="text-cyber-textMuted line-clamp-4">{currentExpeditionNode.details.solutionOrRole}</p>
                </div>
                <div className="p-3 rounded bg-cyber-void/60 border border-cyber-border space-y-1">
                  <span className="text-matrix-green font-bold text-[11px] block">03 // IMPACTO</span>
                  <p className="text-cyber-textMuted line-clamp-4">{currentExpeditionNode.details.impactOrOutcome}</p>
                </div>
              </div>
            </div>

            {/* Right Col: Evidence & Actions */}
            <div className="space-y-4 bg-cyber-void/90 p-5 rounded-lg border border-cyber-border">
              <span className="text-matrix-green font-bold text-xs block">
                ⚡ EVIDENCIAS VINCULADAS:
              </span>

              <div className="space-y-2">
                {currentExpeditionNode.evidence.map((ev, idx) => (
                  <a
                    key={idx}
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded bg-cyber-card border border-cyber-border hover:border-matrix-green hover:text-matrix-green text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {ev.type === 'github' && <Github className="w-3.5 h-3.5 text-gits-cyan" />}
                      {ev.type === 'video' && <Play className="w-3.5 h-3.5 text-red-400" />}
                      {ev.type === 'link' && <ExternalLink className="w-3.5 h-3.5 text-matrix-green" />}
                      <span className="truncate font-semibold">{ev.title}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </a>
                ))}
              </div>

              <button
                onClick={() => handleSelectNode(currentExpeditionNode)}
                className="w-full py-2 rounded bg-gits-cyan/15 hover:bg-gits-cyan/25 border border-gits-cyan/50 text-gits-cyan text-xs font-bold transition-all"
              >
                VER TELEMETRÍA COMPLETA [POPUP]
              </button>
            </div>

          </div>

          {/* Stepper dots at bottom */}
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {PORTFOLIO_NODES.map((n, i) => (
              <button
                key={n.id}
                onClick={() => {
                  setExpeditionIndex(i);
                  setVisitedNodes((prev) => new Set(prev).add(n.id));
                }}
                className={`h-2 rounded-full transition-all ${
                  i === expeditionIndex 
                    ? 'w-6 bg-matrix-green' 
                    : visitedNodes.has(n.id) 
                    ? 'w-2 bg-gits-cyan/60' 
                    : 'w-2 bg-cyber-border'
                }`}
                title={`${i + 1}. ${n.title}`}
              />
            ))}
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* ORBITAL DIMENSIONS SELECTOR                                               */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        
        <div className="flex items-center justify-between font-mono text-xs text-cyber-textMuted">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-gits-cyan" />
            <span className="text-cyber-textBright font-bold">FILTRAR POR DIMENSIÓN:</span>
          </div>
          <span>SELECCIONA PARA ADAPTAR EL ESPACIO</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-xs">
          
          {/* All dimensions button */}
          <button
            onClick={() => setSelectedDimension('all')}
            className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
              selectedDimension === 'all'
                ? 'bg-gits-cyan/15 border-gits-cyan text-white shadow-lg box-glow-cyan'
                : 'bg-cyber-card border-cyber-border text-cyber-textMuted hover:border-cyber-borderGlow/40 hover:text-cyber-textBright'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Layers className="w-4 h-4 text-gits-cyan" />
              <span className="text-[10px] font-bold text-matrix-green">{PORTFOLIO_NODES.length}</span>
            </div>
            <div>
              <div className="font-bold text-white">TODAS</div>
              <div className="text-[10px] text-cyber-textMuted">Ecosistema</div>
            </div>
          </button>

          {/* Individual dimensions */}
          {DIMENSIONS.map((dim) => {
            const isSelected = selectedDimension === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => setSelectedDimension(dim.id)}
                className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? dim.color === 'amber'
                      ? 'bg-amberGold/15 border-amberGold text-white box-glow-amber'
                      : dim.color === 'green'
                      ? 'bg-matrix-green/15 border-matrix-green text-white box-glow-matrix'
                      : 'bg-gits-cyan/15 border-gits-cyan text-white box-glow-cyan'
                    : 'bg-cyber-card border-cyber-border text-cyber-textMuted hover:border-cyber-borderGlow/40 hover:text-cyber-textBright'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  {getDimensionIcon(dim.id)}
                  <span className="text-[10px] font-bold text-cyber-textMuted">{dim.nodeCount}</span>
                </div>
                <div>
                  <div className="font-bold text-white truncate text-[11px]">{dim.name}</div>
                  <div className="text-[9px] text-cyber-textMuted truncate">{dim.code}</div>
                </div>
              </button>
            );
          })}

        </div>

      </section>

      {/* ========================================================================= */}
      {/* ADAPTIVE LAYOUT: FREEJOLITOS EXPANSIVE SHOWCASE (WHEN SELECTED)           */}
      {/* ========================================================================= */}
      {selectedDimension === 'freejolitos' && (
        <section className="rounded-xl bg-cyber-card/90 border border-amberGold/50 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md font-mono">
          <div className="flex items-center justify-between border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🫘</span>
              <span className="text-amberGold font-bold text-sm tracking-wider">SHOWCASE EXPANDIDO // FREEJOLITOS CONSULTORES</span>
            </div>
            <a
              href="https://freejolitos.consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amberGold hover:underline flex items-center gap-1"
            >
              <span>freejolitos.consulting</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Vision & Identity */}
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Tecnología para Organizaciones de la Sociedad Civil
              </h2>
              <p className="text-sm text-cyber-textBright leading-relaxed">
                Diagnóstico, acompañamiento mensual y desarrollo a la medida para organizaciones sin área de sistemas en todo México, con base en la Zona Metropolitana del Valle de México.
              </p>

              {/* Ethical AI Manifesto */}
              <div className="p-4 rounded-lg bg-amberGold/10 border border-amberGold/30 space-y-2">
                <span className="text-amberGold font-bold text-xs uppercase tracking-wider block">
                  🛡️ Política Ética de Inteligencia Artificial:
                </span>
                <p className="text-xs text-cyber-textBright leading-relaxed italic">
                  "Uso inteligencia artificial, y lo digo. Uso IA para producir buena parte de mi trabajo: análisis, documentación y revisión. Nunca con datos de las personas que atiende tu organización — para eso trabajo con esquemas equivalentes y datos de prueba."
                </p>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://wa.me/525533444852"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-matrix-green/20 hover:bg-matrix-green/30 border border-matrix-green text-matrix-green font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <span>Escribir por WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/HugoLeMoy47/freejolitosConsultingWeb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-cyber-void border border-cyber-border hover:border-gits-cyan text-cyber-textBright text-xs flex items-center gap-2 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-gits-cyan" />
                  <span>Código Fuente</span>
                </a>
              </div>
            </div>

            {/* Right Column: Pricing & Services Grid */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-cyber-textMuted block">
                // CATÁLOGO DE SERVICIOS Y TARIFAS INSTITUCIONALES:
              </span>

              <div className="p-4 rounded-lg bg-cyber-void/80 border border-cyber-border space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">01. Diagnóstico y ruta crítica</h4>
                  <span className="text-xs font-bold text-amberGold">$16,704 MXN</span>
                </div>
                <p className="text-xs text-cyber-textMuted">
                  Ruta crítica priorizada para consejo o financiadores. Con costos, riesgos y lo que no se pudo averiguar dicho de frente. (Descuento para OSCs disponible).
                </p>
              </div>

              <div className="p-4 rounded-lg bg-cyber-void/80 border border-cyber-border space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">02. Acompañamiento mensual</h4>
                  <span className="text-xs font-bold text-amberGold">Desde $8,120 MXN/mes</span>
                </div>
                <p className="text-xs text-cyber-textMuted">
                  Alguien que conoce tu operación, responde cuando algo se descompone y te avisa de lo que viene antes de que te caiga encima.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-cyber-void/80 border border-cyber-border space-y-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-sm">03. Desarrollo a la medida</h4>
                  <span className="text-xs font-bold text-gits-cyan">Por proyecto</span>
                </div>
                <p className="text-xs text-cyber-textMuted">
                  El sistema que necesitas, probado en pequeño antes de que inviertas en construirlo completo.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* ADAPTIVE LAYOUT: CNNN EXPANSIVE MEDIA SHOWCASE (WHEN SELECTED)            */}
      {/* ========================================================================= */}
      {selectedDimension === 'cnnn' && (
        <section className="rounded-xl bg-cyber-card/90 border border-matrix-green/50 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-md font-mono">
          <div className="flex items-center justify-between border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <Tv className="w-5 h-5 text-matrix-green" />
              <span className="text-matrix-green font-bold text-sm tracking-wider">SHOWCASE EXPANDIDO // CNNN (CANNABIS NETWORK NEWS NOW)</span>
            </div>
            <a
              href="https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-matrix-green hover:underline flex items-center gap-1"
            >
              <span>Ver Playlist Completa</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 5 Cols: Editorial Context */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                Noticiero & Análisis Cannábico en México
              </h2>
              <p className="text-xs sm:text-sm text-cyber-textBright leading-relaxed">
                Conducción titular a cargo de <strong className="text-matrix-green">Hugo Legorreta Moysén</strong> en alianza con Jotvox.mx. Análisis profundo de iniciativas de ley, litigio estratégico ante la SCJN, eventos de la industria y la voz de la comunidad activista.
              </p>

              <div className="p-3 rounded bg-cyber-void border border-cyber-border space-y-1 text-xs">
                <span className="text-matrix-green font-bold block">⚡ TEMAS COBIJADOS EN EL NOTICIERO:</span>
                <ul className="list-disc list-inside text-cyber-textMuted space-y-0.5">
                  <li>Seguimiento a sentencias de la Suprema Corte de Justicia</li>
                  <li>Avance de iniciativas en Cámara de Diputados y Senado</li>
                  <li>Cultura de reducción de daños y cultivo responsable</li>
                  <li>Entrevistas exclusivas a activistas y voceros del movimiento</li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded bg-matrix-green/20 hover:bg-matrix-green/30 border border-matrix-green text-matrix-green font-bold text-xs flex items-center gap-2"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Playlist en YouTube</span>
                </a>
              </div>
            </div>

            {/* Right 7 Cols: Embedded YouTube Video Player directly */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border-2 border-matrix-green/40 shadow-2xl bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/S9Y0MEct5pE"
                  title="CNNN Noticiero Cannábico - Hugo Legorreta"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-[11px] text-cyber-textMuted text-center pt-2">
                Reproductor embebido de CNNN :: Cápsula destacada
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STANDARD / ADAPTIVE NODES MATRIX (FOR GAMEDEV 2x2, INCIDENCIA, GITHUB)     */}
      {/* (Oculta si ya se mostró el showcase individual de Freejolitos o CNNN)      */}
      {/* ========================================================================= */}
      {selectedDimension !== 'freejolitos' && selectedDimension !== 'cnnn' && (
        <section className="space-y-6">
          
          <div className="flex items-center justify-between border-b border-cyber-border pb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="text-matrix-green font-bold">// NODOS DE EVIDENCIA ACTIVOS:</span>
              <span className="text-cyber-textMuted">({filteredNodes.length} registrados)</span>
            </div>
            <div className="text-cyber-textMuted hidden sm:block">
              Haz clic en cualquier tarjeta para abrir telemetría
            </div>
          </div>

          <div className={getGridClasses(filteredNodes.length)}>
            {filteredNodes.map((node) => {
              const isVisited = visitedNodes.has(node.id);
              const borderColor = node.accentColor === 'amber'
                ? 'hover:border-amberGold'
                : node.accentColor === 'green'
                ? 'hover:border-matrix-green'
                : 'hover:border-gits-cyan';

              const badgeBg = node.accentColor === 'amber'
                ? 'bg-amberGold/10 text-amberGold border-amberGold/30'
                : node.accentColor === 'green'
                ? 'bg-matrix-green/10 text-matrix-green border-matrix-green/30'
                : 'bg-gits-cyan/10 text-gits-cyan border-gits-cyan/30';

              return (
                <div
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  className={`group relative bg-cyber-card/90 rounded-xl border border-cyber-border ${borderColor} p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm`}
                >
                  {/* Node Status Dot */}
                  <div className="flex items-center justify-between mb-3 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${isVisited ? 'bg-matrix-green' : 'bg-cyber-textMuted group-hover:bg-gits-cyan'}`}></span>
                      <span className="text-cyber-textMuted font-bold">{node.code}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeBg}`}>
                      {node.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-gits-cyan transition-colors font-display">
                      {node.title}
                    </h3>
                    <p className="text-xs text-cyber-textMuted font-mono">
                      {node.subtitle}
                    </p>
                    <p className="text-xs text-cyber-textBright leading-relaxed line-clamp-3 pt-1">
                      {node.summary}
                    </p>
                  </div>

                  {/* Highlight Stat Banner */}
                  <div className="p-2.5 mb-4 rounded bg-cyber-void/80 border border-cyber-border font-mono text-[11px] text-cyber-textBright">
                    <span className="text-matrix-green font-bold">⚡ </span>
                    {node.highlightStat}
                  </div>

                  {/* Footer Tags & Evidence Count */}
                  <div className="pt-3 border-t border-cyber-border/60 flex items-center justify-between font-mono text-[10px]">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {node.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-cyber-textMuted">#{t}</span>
                      ))}
                      {node.tags.length > 2 && (
                        <span className="text-cyber-textMuted">+{node.tags.length - 2}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-gits-cyan font-bold group-hover:translate-x-1 transition-transform">
                      <span>TELEMETRÍA</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </section>
      )}

      {/* ========================================================================= */}
      {/* MODAL: NODE TELEMETRY & FULL EVIDENCE VIEWER                              */}
      {/* ========================================================================= */}
      {activeModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-void/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-cyber-card border border-gits-cyan/50 rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto box-glow-cyan font-mono text-xs sm:text-sm">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-cyber-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gits-cyan font-bold">[{activeModalNode.code}]</span>
                  <span className="text-cyber-textMuted">// TELEMETRY INSPECTOR</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                  {activeModalNode.title}
                </h2>
                <p className="text-xs text-cyber-textMuted">
                  {activeModalNode.subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveModalNode(null)}
                className="text-cyber-textMuted hover:text-white p-1 rounded hover:bg-cyber-void"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Deep Breakdown Sections */}
            <div className="space-y-4">
              
              <div className="bg-cyber-void/70 p-4 rounded-lg border border-cyber-border space-y-1">
                <span className="text-amberGold font-bold text-xs uppercase tracking-wider">
                  01 // Contexto & Desafío
                </span>
                <p className="text-cyber-textBright text-xs sm:text-sm leading-relaxed">
                  {activeModalNode.details.problemOrContext}
                </p>
              </div>

              <div className="bg-cyber-void/70 p-4 rounded-lg border border-cyber-border space-y-1">
                <span className="text-gits-cyan font-bold text-xs uppercase tracking-wider">
                  02 // Solución & Rol de Hugo
                </span>
                <p className="text-cyber-textBright text-xs sm:text-sm leading-relaxed">
                  {activeModalNode.details.solutionOrRole}
                </p>
              </div>

              <div className="bg-cyber-void/70 p-4 rounded-lg border border-cyber-border space-y-1">
                <span className="text-matrix-green font-bold text-xs uppercase tracking-wider">
                  03 // Impacto & Métrica Verificable
                </span>
                <p className="text-cyber-textBright text-xs sm:text-sm leading-relaxed">
                  {activeModalNode.details.impactOrOutcome}
                </p>
              </div>

            </div>

            {/* Evidence Links & Embedded Player */}
            <div className="space-y-3 pt-2">
              <span className="text-matrix-green font-bold text-xs">
                // EVIDENCIA RECUPERABLE DIRECTA:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalNode.evidence.map((ev, i) => (
                  <a
                    key={i}
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded bg-cyber-void border border-cyber-border hover:border-gits-cyan hover:text-gits-cyan transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {ev.type === 'github' && <Github className="w-4 h-4 text-gits-cyan shrink-0" />}
                      {ev.type === 'video' && <Play className="w-4 h-4 text-red-400 shrink-0" />}
                      {ev.type === 'link' && <ExternalLink className="w-4 h-4 text-matrix-green shrink-0" />}
                      {ev.type === 'doc' && <FileText className="w-4 h-4 text-amberGold shrink-0" />}
                      <span className="truncate font-bold text-xs">{ev.title}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            {/* Embedded YouTube preview for CNNN if opened inside modal */}
            {activeModalNode.dimension === 'cnnn' && (
              <div className="pt-2">
                <span className="text-cyber-textMuted font-mono text-xs block mb-2">
                  // VISOR INTEGRADO CNNN:
                </span>
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-cyber-border bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/S9Y0MEct5pE"
                    title="CNNN Video Preview"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-3 border-t border-cyber-border flex justify-end">
              <button
                onClick={() => setActiveModalNode(null)}
                className="px-4 py-2 rounded bg-cyber-void border border-cyber-border text-cyber-textBright hover:border-cyber-borderGlow text-xs font-bold"
              >
                CERRAR TELEMETRÍA [ESC]
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
