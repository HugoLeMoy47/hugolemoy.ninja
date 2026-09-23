import React, { useState, useEffect, useRef } from 'react';
import { 
  DIMENSIONS, 
  PORTFOLIO_NODES, 
  type PortfolioNode, 
  type DimensionMeta 
} from '../data/portfolioData';
import { type OperatorPersona } from '../data/operatorPersonas';
import { CyberWireframeCore } from './CyberWireframeCore';
import { cyberAudio } from '../utils/cyberAudio';
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
import gsap from 'gsap';

interface CyberJourneyProps {
  currentPersona: OperatorPersona;
  onNodeSelectForOperator: (nodeId: string) => void;
  externalDimension?: string | null;
}

export const CyberJourney: React.FC<CyberJourneyProps> = ({ 
  currentPersona,
  onNodeSelectForOperator,
  externalDimension,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [activeModalNode, setActiveModalNode] = useState<PortfolioNode | null>(null);
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set());
  
  // Guided Expedition State
  const [isExpeditionActive, setIsExpeditionActive] = useState<boolean>(false);
  const [expeditionIndex, setExpeditionIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync external dimension if triggered from Operator CLI
  useEffect(() => {
    if (externalDimension) {
      setSelectedDimension(externalDimension);
      animateCards();
    }
  }, [externalDimension]);

  const animateCards = () => {
    if (cardsContainerRef.current) {
      gsap.fromTo(
        cardsContainerRef.current.children,
        { opacity: 0, y: 15, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.35, ease: 'power2.out' }
      );
    }
  };

  const handleSelectDimension = (dimId: string) => {
    cyberAudio.playClick(750);
    setSelectedDimension(dimId);
    setTimeout(animateCards, 10);
  };

  const handleSelectNode = (node: PortfolioNode) => {
    cyberAudio.playNodeSelect(node.accentColor);
    setActiveModalNode(node);
    setVisitedNodes((prev) => new Set(prev).add(node.id));
    onNodeSelectForOperator(node.id);
  };

  const startExpedition = () => {
    cyberAudio.playClick(900);
    setIsExpeditionActive(true);
    setExpeditionIndex(0);
    const firstNode = PORTFOLIO_NODES[0];
    if (firstNode) {
      setVisitedNodes((prev) => new Set(prev).add(firstNode.id));
      onNodeSelectForOperator(firstNode.id);
    }
  };

  const nextExpeditionNode = () => {
    cyberAudio.playClick(850);
    const nextIdx = (expeditionIndex + 1) % PORTFOLIO_NODES.length;
    setExpeditionIndex(nextIdx);
    const nextNode = PORTFOLIO_NODES[nextIdx];
    if (nextNode) {
      setVisitedNodes((prev) => new Set(prev).add(nextNode.id));
      onNodeSelectForOperator(nextNode.id);
    }
  };

  const prevExpeditionNode = () => {
    cyberAudio.playClick(800);
    const prevIdx = (expeditionIndex - 1 + PORTFOLIO_NODES.length) % PORTFOLIO_NODES.length;
    setExpeditionIndex(prevIdx);
    const prevNode = PORTFOLIO_NODES[prevIdx];
    if (prevNode) {
      setVisitedNodes((prev) => new Set(prev).add(prevNode.id));
      onNodeSelectForOperator(prevNode.id);
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

  const getGridClasses = (count: number) => {
    if (count === 1) return 'grid grid-cols-1';
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 gap-5';
    if (count === 4) return 'grid grid-cols-1 md:grid-cols-2 gap-5';
    return 'grid grid-cols-1 md:grid-cols-2 gap-4';
  };

  const currentExpeditionNode = PORTFOLIO_NODES[expeditionIndex];
  const syncPercentage = Math.round((visitedNodes.size / PORTFOLIO_NODES.length) * 100);

  return (
    <div ref={containerRef} className="space-y-6">
      
      {/* ========================================================================= */}
      {/* HERO CONSTRUCT WITH 3D POLYHEDRON WIREFRAME CORE                         */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-xl bg-cyber-card/90 border border-cyber-border p-5 sm:p-6 shadow-2xl backdrop-blur-md">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Identity & Core Info */}
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gits-cyan/10 border border-gits-cyan/30 text-gits-cyan text-[11px] font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-gits-cyan animate-pulse"></span>
              <span>CONSTRUCTO MULTIDIMENSIONAL // HLM</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white">
              Hugo Legorreta <span className="text-gits-cyan glow-cyan">Moysén</span>
            </h1>

            <p className="text-xs sm:text-sm text-cyber-textBright font-mono leading-relaxed">
              <strong className="text-matrix-green">Product Owner</strong> & Consultor Tecnológico. Fundador de <strong className="text-amberGold">Freejolitos</strong>, activista cannábico en <strong className="text-matrix-green">La Comuna 42</strong> (#Capital420 / Senado), anfitrión de <strong className="text-matrix-green">CNNN</strong> y desarrollador de videojuegos.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={startExpedition}
                className="py-1.5 px-3 rounded-lg bg-matrix-green/15 hover:bg-matrix-green/25 border border-matrix-green/50 text-matrix-green text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                <span>{isExpeditionActive ? 'MODO EXPEDICIÓN ACTIVO' : 'EXPEDICIÓN GUIADA'}</span>
              </button>
            </div>
          </div>

          {/* 3D Wireframe Core */}
          <div className="shrink-0">
            <CyberWireframeCore 
              accentColor={currentPersona === 'PROJECT_2501' ? 'cyan' : 'amber'}
              syncPercent={syncPercentage}
              onCoreClick={() => {
                cyberAudio.playClick(1100);
                startExpedition();
              }}
            />
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* EXPEDITION SPOTLIGHT BANNER                                               */}
      {/* ========================================================================= */}
      {isExpeditionActive && currentExpeditionNode && (
        <section className="relative rounded-xl bg-cyber-card/95 border-2 border-matrix-green p-5 space-y-4 shadow-2xl box-glow-matrix font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-matrix-green animate-ping"></span>
              <span className="text-matrix-green font-bold text-xs tracking-wider">
                EXPEDICIÓN [{expeditionIndex + 1}/{PORTFOLIO_NODES.length}]: {currentExpeditionNode.code}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevExpeditionNode}
                className="p-1 px-2.5 rounded bg-cyber-void border border-cyber-border hover:border-gits-cyan text-cyber-textBright text-xs flex items-center gap-1"
              >
                <ChevronLeft className="w-3 h-3" />
                <span>ANT</span>
              </button>
              <button
                onClick={nextExpeditionNode}
                className="p-1 px-2.5 rounded bg-matrix-green/20 border border-matrix-green text-matrix-green text-xs font-bold flex items-center gap-1"
              >
                <span>SIG</span>
                <ChevronRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => setIsExpeditionActive(false)}
                className="p-1 px-2 rounded bg-cyber-void border border-cyber-border text-cyber-textMuted hover:text-red-400 text-xs ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-matrix-green/20 text-matrix-green border border-matrix-green/40">
                {currentExpeditionNode.badge}
              </span>
              <span className="text-xs font-bold text-white">{currentExpeditionNode.title}</span>
            </div>
            <p className="text-xs text-cyber-textBright leading-relaxed">
              {currentExpeditionNode.summary}
            </p>
          </div>

          {/* Stepper dots */}
          <div className="flex items-center justify-center gap-1 pt-1">
            {PORTFOLIO_NODES.map((n, i) => (
              <button
                key={n.id}
                onClick={() => {
                  setExpeditionIndex(i);
                  setVisitedNodes((prev) => new Set(prev).add(n.id));
                  onNodeSelectForOperator(n.id);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === expeditionIndex 
                    ? 'w-5 bg-matrix-green' 
                    : visitedNodes.has(n.id) 
                    ? 'w-1.5 bg-gits-cyan/60' 
                    : 'w-1.5 bg-cyber-border'
                }`}
              />
            ))}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* DIMENSIONS SELECTOR BUTTONS                                               */}
      {/* ========================================================================= */}
      <section className="space-y-3">
        <div className="flex items-center justify-between font-mono text-xs text-cyber-textMuted">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-gits-cyan" />
            <span className="text-cyber-textBright font-bold">DIMENSIONES DEL CONSTRUCTO:</span>
          </div>
          <span>({filteredNodes.length} NODOS)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 font-mono text-xs">
          <button
            onClick={() => handleSelectDimension('all')}
            className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
              selectedDimension === 'all'
                ? 'bg-gits-cyan/15 border-gits-cyan text-white shadow-lg box-glow-cyan'
                : 'bg-cyber-card border-cyber-border text-cyber-textMuted hover:border-cyber-borderGlow/40 hover:text-cyber-textBright'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Layers className="w-3.5 h-3.5 text-gits-cyan" />
              <span className="text-[10px] font-bold text-matrix-green">{PORTFOLIO_NODES.length}</span>
            </div>
            <div>
              <div className="font-bold text-white text-[11px]">TODAS</div>
              <div className="text-[9px] text-cyber-textMuted">Ecosistema</div>
            </div>
          </button>

          {DIMENSIONS.map((dim) => {
            const isSelected = selectedDimension === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => handleSelectDimension(dim.id)}
                className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? dim.color === 'amber'
                      ? 'bg-amberGold/15 border-amberGold text-white box-glow-amber'
                      : dim.color === 'green'
                      ? 'bg-matrix-green/15 border-matrix-green text-white box-glow-matrix'
                      : 'bg-gits-cyan/15 border-gits-cyan text-white box-glow-cyan'
                    : 'bg-cyber-card border-cyber-border text-cyber-textMuted hover:border-cyber-borderGlow/40 hover:text-cyber-textBright'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
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
      {/* SHOWCASE: FREEJOLITOS (EXPANSIVE 2-COLUMNS)                               */}
      {/* ========================================================================= */}
      {selectedDimension === 'freejolitos' && (
        <section className="rounded-xl bg-cyber-card/90 border border-amberGold/50 p-5 sm:p-6 space-y-4 shadow-2xl backdrop-blur-md font-mono text-xs">
          <div className="flex items-center justify-between border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🫘</span>
              <span className="text-amberGold font-bold text-xs tracking-wider">SHOWCASE EXPANDIDO // FREEJOLITOS CONSULTORES</span>
            </div>
            <a
              href="https://freejolitos.consulting"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amberGold hover:underline flex items-center gap-1"
            >
              <span>freejolitos.consulting</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <h2 className="text-xl font-bold font-display text-white">
                Tecnología para Organizaciones de la Sociedad Civil
              </h2>
              <p className="text-cyber-textBright leading-relaxed">
                Diagnóstico, acompañamiento mensual y desarrollo a la medida para organizaciones sin área de sistemas en todo México.
              </p>

              <div className="p-3 rounded-lg bg-amberGold/10 border border-amberGold/30 space-y-1">
                <span className="text-amberGold font-bold text-[11px] block">
                  🛡️ Política Ética de IA:
                </span>
                <p className="text-[11px] text-cyber-textBright italic leading-relaxed">
                  "Uso IA para producir buena parte de mi trabajo: análisis, documentación y revisión. Nunca con datos de las personas que atiende tu organización."
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href="https://wa.me/525533444852"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded bg-matrix-green/20 hover:bg-matrix-green/30 border border-matrix-green text-matrix-green font-bold text-xs flex items-center gap-1.5"
                >
                  <span>Escribir por WhatsApp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://github.com/HugoLeMoy47/freejolitosConsultingWeb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded bg-cyber-void border border-cyber-border hover:border-gits-cyan text-cyber-textBright text-xs flex items-center gap-1.5"
                >
                  <Github className="w-3 h-3 text-gits-cyan" />
                  <span>Código Fuente</span>
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-cyber-textMuted block">
                // SERVICIOS Y TARIFAS INSTITUCIONALES:
              </span>

              <div className="p-3 rounded bg-cyber-void/80 border border-cyber-border space-y-0.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white">01. Diagnóstico y ruta crítica</h4>
                  <span className="font-bold text-amberGold">$16,704 MXN</span>
                </div>
                <p className="text-cyber-textMuted text-[11px]">Priorización clara de costos y riesgos para tu consejo o financiadores.</p>
              </div>

              <div className="p-3 rounded bg-cyber-void/80 border border-cyber-border space-y-0.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white">02. Acompañamiento mensual</h4>
                  <span className="font-bold text-amberGold">Desde $8,120 MXN/mes</span>
                </div>
                <p className="text-cyber-textMuted text-[11px]">Soporte técnico continuo, supervisión y respuesta a incidentes.</p>
              </div>

              <div className="p-3 rounded bg-cyber-void/80 border border-cyber-border space-y-0.5">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white">03. Desarrollo a la medida</h4>
                  <span className="font-bold text-gits-cyan">Por proyecto</span>
                </div>
                <p className="text-cyber-textMuted text-[11px]">Software probado en pequeño antes de invertir en grande.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* SHOWCASE: CNNN (EXPANSIVE MEDIA WITH YOUTUBE PLAYER)                      */}
      {/* ========================================================================= */}
      {selectedDimension === 'cnnn' && (
        <section className="rounded-xl bg-cyber-card/90 border border-matrix-green/50 p-5 sm:p-6 space-y-4 shadow-2xl backdrop-blur-md font-mono text-xs">
          <div className="flex items-center justify-between border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <Tv className="w-4 h-4 text-matrix-green" />
              <span className="text-matrix-green font-bold text-xs tracking-wider">SHOWCASE EXPANDIDO // CNNN (CANNABIS NETWORK NEWS NOW)</span>
            </div>
            <a
              href="https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-matrix-green hover:underline flex items-center gap-1"
            >
              <span>Ver Playlist Completa</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xl font-bold font-display text-white">
                Noticiero & Análisis Cannábico en México
              </h2>
              <p className="text-cyber-textBright leading-relaxed">
                Conducción titular de <strong className="text-matrix-green">Hugo Legorreta Moysén</strong> en alianza con Jotvox.mx. Análisis profundo de iniciativas de ley, litigio en la SCJN y cultura de derechos.
              </p>

              <div className="p-2.5 rounded bg-cyber-void border border-cyber-border space-y-1 text-[11px]">
                <span className="text-matrix-green font-bold block">⚡ TEMAS COBIJADOS:</span>
                <p className="text-cyber-textMuted">Sentencias de la SCJN · Senado & Diputados · Reducción de daños · Autocultivo.</p>
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href="https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded bg-matrix-green/20 hover:bg-matrix-green/30 border border-matrix-green text-matrix-green font-bold text-xs flex items-center gap-1.5"
                >
                  <Play className="w-3 h-3" />
                  <span>Playlist en YouTube</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-matrix-green/40 shadow-xl bg-black">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/S9Y0MEct5pE"
                  title="CNNN Video Preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* STANDARD / ADAPTIVE NODES GRID (GAMEDEV 2x2, INCIDENCIA, GITHUB, ALL)     */}
      {/* ========================================================================= */}
      {selectedDimension !== 'freejolitos' && selectedDimension !== 'cnnn' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-cyber-border pb-2.5 font-mono text-xs">
            <span className="text-matrix-green font-bold">// NODOS DE EVIDENCIA:</span>
            <span className="text-cyber-textMuted">Haz clic para telemetría & análisis del Operador</span>
          </div>

          <div ref={cardsContainerRef} className={getGridClasses(filteredNodes.length)}>
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
                  className={`group relative bg-cyber-card/90 rounded-xl border border-cyber-border ${borderColor} p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between mb-2 font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${isVisited ? 'bg-matrix-green' : 'bg-cyber-textMuted group-hover:bg-gits-cyan'}`}></span>
                      <span className="text-cyber-textMuted font-bold">{node.code}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${badgeBg}`}>
                      {node.badge}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gits-cyan transition-colors font-display">
                      {node.title}
                    </h3>
                    <p className="text-xs text-cyber-textMuted font-mono">
                      {node.subtitle}
                    </p>
                    <p className="text-xs text-cyber-textBright leading-relaxed line-clamp-3">
                      {node.summary}
                    </p>
                  </div>

                  <div className="p-2 mb-3 rounded bg-cyber-void/80 border border-cyber-border font-mono text-[10px] text-cyber-textBright">
                    <span className="text-matrix-green font-bold">⚡ </span>
                    {node.highlightStat}
                  </div>

                  <div className="pt-2.5 border-t border-cyber-border/60 flex items-center justify-between font-mono text-[10px]">
                    <div className="flex flex-wrap gap-1 max-w-[70%]">
                      {node.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-cyber-textMuted">#{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-gits-cyan font-bold group-hover:translate-x-1 transition-transform">
                      <span>INSPECCIONAR</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TELEMETRY DETAILS                                                  */}
      {/* ========================================================================= */}
      {activeModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-void/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-cyber-card border border-gits-cyan/50 rounded-xl shadow-2xl p-5 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto box-glow-cyan font-mono text-xs sm:text-sm">
            
            <div className="flex items-start justify-between border-b border-cyber-border pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gits-cyan font-bold">[{activeModalNode.code}]</span>
                  <span className="text-cyber-textMuted">// TELEMETRY INSPECTOR</span>
                </div>
                <h2 className="text-lg sm:text-2xl font-bold font-display text-white">
                  {activeModalNode.title}
                </h2>
                <p className="text-xs text-cyber-textMuted">{activeModalNode.subtitle}</p>
              </div>
              <button
                onClick={() => setActiveModalNode(null)}
                className="text-cyber-textMuted hover:text-white p-1 rounded hover:bg-cyber-void"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-cyber-void/70 p-3.5 rounded-lg border border-cyber-border space-y-1">
                <span className="text-amberGold font-bold text-xs uppercase tracking-wider block">01 // Contexto</span>
                <p className="text-cyber-textBright text-xs leading-relaxed">{activeModalNode.details.problemOrContext}</p>
              </div>
              <div className="bg-cyber-void/70 p-3.5 rounded-lg border border-cyber-border space-y-1">
                <span className="text-gits-cyan font-bold text-xs uppercase tracking-wider block">02 // Rol de Hugo</span>
                <p className="text-cyber-textBright text-xs leading-relaxed">{activeModalNode.details.solutionOrRole}</p>
              </div>
              <div className="bg-cyber-void/70 p-3.5 rounded-lg border border-cyber-border space-y-1">
                <span className="text-matrix-green font-bold text-xs uppercase tracking-wider block">03 // Impacto</span>
                <p className="text-cyber-textBright text-xs leading-relaxed">{activeModalNode.details.impactOrOutcome}</p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <span className="text-matrix-green font-bold text-xs block">// EVIDENCIAS DIRECTAS:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalNode.evidence.map((ev, i) => (
                  <a
                    key={i}
                    href={ev.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded bg-cyber-void border border-cyber-border hover:border-gits-cyan hover:text-gits-cyan text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {ev.type === 'github' && <Github className="w-3.5 h-3.5 text-gits-cyan" />}
                      {ev.type === 'video' && <Play className="w-3.5 h-3.5 text-red-400" />}
                      {ev.type === 'link' && <ExternalLink className="w-3.5 h-3.5 text-matrix-green" />}
                      {ev.type === 'doc' && <FileText className="w-3.5 h-3.5 text-amberGold" />}
                      <span className="truncate font-semibold">{ev.title}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-cyber-border flex justify-end">
              <button
                onClick={() => setActiveModalNode(null)}
                className="px-3.5 py-1.5 rounded bg-cyber-void border border-cyber-border text-cyber-textBright text-xs font-bold"
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
