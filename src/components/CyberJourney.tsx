import React, { useState, useEffect, useRef } from 'react';
import { 
  DIMENSIONS, 
  PORTFOLIO_NODES,
  FREEJOLITOS_CONTACT,
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
  X,
  Maximize2,
  Grid,
  Radio,
  Zap,
  RefreshCw,
  Users,
  Mail,
  MessageSquare,
  MonitorPlay
} from 'lucide-react';
import gsap from 'gsap';

interface CyberJourneyProps {
  currentPersona: OperatorPersona;
  onNodeSelectForOperator: (nodeId: string) => void;
  externalDimension?: string | null;
  activeNodeId?: string | null;
  theme?: 'light' | 'dark';
}

const KANJI_NUMERALS = ['壱', '弐', '参', '四', '伍', '六', '七', '八', '九', '拾', '十一', '十二'];

export const CyberJourney: React.FC<CyberJourneyProps> = ({ 
  currentPersona,
  onNodeSelectForOperator,
  externalDimension,
  activeNodeId,
  theme = 'dark',
}) => {
  const [selectedDimension, setSelectedDimension] = useState<string>('all');
  const [focusedNode, setFocusedNode] = useState<PortfolioNode>(PORTFOLIO_NODES[0]);
  const [viewMode, setViewMode] = useState<'hologram' | 'matrix'>('hologram');
  const [visitedNodes, setVisitedNodes] = useState<Set<string>>(new Set([PORTFOLIO_NODES[0].id]));
  const [activeModalNode, setActiveModalNode] = useState<PortfolioNode | null>(null);
  
  // Guided Expedition State
  const [isExpeditionActive, setIsExpeditionActive] = useState<boolean>(false);
  const [expeditionIndex, setExpeditionIndex] = useState<number>(0);

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanPercent, setScanPercent] = useState<number>(100);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const scanlineRef = useRef<HTMLDivElement | null>(null);
  const stageContentRef = useRef<HTMLDivElement | null>(null);
  const matrixGridRef = useRef<HTMLDivElement | null>(null);
  const stageContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync external dimension if triggered from Operator CLI
  useEffect(() => {
    if (externalDimension) {
      setSelectedDimension(externalDimension);
      const match = PORTFOLIO_NODES.find((n) => n.dimension === externalDimension);
      if (match) {
        setFocusedNode(match);
        setVisitedNodes((prev) => new Set(prev).add(match.id));
      }
      triggerHolographicRepaint();
    }
  }, [externalDimension]);

  // Sync external node if selected from Chatbot / Operator
  useEffect(() => {
    if (activeNodeId) {
      const match = PORTFOLIO_NODES.find((n) => n.id === activeNodeId);
      if (match && match.id !== focusedNode.id) {
        setFocusedNode(match);
        setSelectedDimension(match.dimension);
        setVisitedNodes((prev) => new Set(prev).add(match.id));
        triggerHolographicRepaint();
      }
    }
  }, [activeNodeId]);

  // Progressive Holographic Wireframe Reconstruction (1.35s deliberate unroll, NO flashazos)
  const triggerHolographicRepaint = () => {
    setIsScanning(true);
    setScanPercent(0);
    cyberAudio.playHoloRepaint(1.35);

    const tl = gsap.timeline({
      onComplete: () => {
        setIsScanning(false);
        setScanPercent(100);
        if (stageContentRef.current) {
          gsap.set(stageContentRef.current, { clearProps: 'clipPath' });
        }
      },
    });

    // 1. Scanning Laser Beam sweeps top to bottom over 1.35s
    if (scanlineRef.current) {
      tl.fromTo(
        scanlineRef.current,
        { top: '-2%', opacity: 1 },
        {
          top: '102%',
          opacity: 1,
          duration: 1.35,
          ease: 'power1.inOut',
          onUpdate: function () {
            const prog = Math.round(this.progress() * 100);
            setScanPercent(prog);
          },
        },
        0
      ).to(scanlineRef.current, { opacity: 0, duration: 0.15 }, '-=0.1');
    }

    // 2. Stage content smoothly unrolls following the laser curtain
    if (stageContentRef.current) {
      tl.fromTo(
        stageContentRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%)',
          opacity: 0.95,
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.35,
          ease: 'power1.inOut',
        },
        0
      );
    }

    // 3. Matrix grid stagger animation
    if (matrixGridRef.current && viewMode === 'matrix') {
      tl.fromTo(
        matrixGridRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.45, ease: 'power2.out' },
        0.25
      );
    }
  };

  const handleSelectDimension = (dimId: string) => {
    cyberAudio.playClick(750);
    setSelectedDimension(dimId);
    
    // Auto-select first node of this dimension if in hologram mode
    if (dimId !== 'all') {
      const firstInDim = PORTFOLIO_NODES.find((n) => n.dimension === dimId);
      if (firstInDim) {
        setFocusedNode(firstInDim);
        setVisitedNodes((prev) => new Set(prev).add(firstInDim.id));
        onNodeSelectForOperator(firstInDim.id);
      }
    }
    triggerHolographicRepaint();
  };

  const handleFocusNode = (node: PortfolioNode) => {
    cyberAudio.playNodeSelect(node.accentColor);
    setFocusedNode(node);
    setVisitedNodes((prev) => new Set(prev).add(node.id));
    onNodeSelectForOperator(node.id);
    setViewMode('hologram');
    triggerHolographicRepaint();
  };

  const startExpedition = () => {
    cyberAudio.playClick(900);
    setIsExpeditionActive(true);
    setExpeditionIndex(0);
    const firstNode = PORTFOLIO_NODES[0];
    if (firstNode) {
      setFocusedNode(firstNode);
      setSelectedDimension(firstNode.dimension);
      setVisitedNodes((prev) => new Set(prev).add(firstNode.id));
      onNodeSelectForOperator(firstNode.id);
      setViewMode('hologram');
      triggerHolographicRepaint();
    }
  };

  const nextExpeditionNode = () => {
    cyberAudio.playClick(850);
    const nextIdx = (expeditionIndex + 1) % PORTFOLIO_NODES.length;
    setExpeditionIndex(nextIdx);
    const nextNode = PORTFOLIO_NODES[nextIdx];
    if (nextNode) {
      setFocusedNode(nextNode);
      setSelectedDimension(nextNode.dimension);
      setVisitedNodes((prev) => new Set(prev).add(nextNode.id));
      onNodeSelectForOperator(nextNode.id);
      triggerHolographicRepaint();
    }
  };

  const prevExpeditionNode = () => {
    cyberAudio.playClick(800);
    const prevIdx = (expeditionIndex - 1 + PORTFOLIO_NODES.length) % PORTFOLIO_NODES.length;
    setExpeditionIndex(prevIdx);
    const prevNode = PORTFOLIO_NODES[prevIdx];
    if (prevNode) {
      setFocusedNode(prevNode);
      setSelectedDimension(prevNode.dimension);
      setVisitedNodes((prev) => new Set(prev).add(prevNode.id));
      onNodeSelectForOperator(prevNode.id);
      triggerHolographicRepaint();
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
        return <Scale className="w-4 h-4 text-ninja-crimson" />;
      case 'weedtown':
        return <Users className="w-4 h-4 text-emerald-500" />;
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

  const getDimensionKanji = (dimId: string) => {
    switch (dimId) {
      case 'freejolitos': return '社'; // Society/Consulting
      case 'gamedev': return '術';     // Art/Technique
      case 'advocacy': return '義';    // Justice/Rights
      case 'weedtown': return '網';    // Net/Web/Sovereign Network
      case 'cnnn': return '聞';        // News/Listen
      case 'github': return '構';      // Construct/Architecture
      case 'product_owner': return '統'; // Lead/Kernel
      case 'ideas': return '創';       // Create/Vision
      default: return '忍';            // Shinobi
    }
  };

  const currentExpeditionNode = PORTFOLIO_NODES[expeditionIndex];
  const syncPercentage = Math.round((visitedNodes.size / PORTFOLIO_NODES.length) * 100);

  return (
    <div ref={containerRef} className="space-y-6">
      
      {/* ========================================================================= */}
      {/* HERO CONSTRUCT WITH 3D SHURIKEN WIREFRAME CORE                            */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden rounded-xl bg-white/95 dark:bg-cyber-card/90 border border-slate-200 dark:border-cyber-border p-5 sm:p-6 shadow-xl backdrop-blur-md transition-colors duration-250">
        
        {/* Subtle Corner Crest */}
        <div className="absolute top-2 right-3 text-[10px] font-mono text-ninja-crimson/70 dark:text-ninja-crimson/50 select-none">
          忍 [SHINOBI_NET // .NINJA]
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Identity & Core Info */}
          <div className="flex-1 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-ninja-crimson/10 border border-ninja-crimson/30 text-ninja-crimson text-[11px] font-mono">
              <span className="inline-block w-2 h-2 rounded-full bg-ninja-crimson animate-pulse"></span>
              <span>TARJETA MULTIDIMENSIONAL // hugolemoy.ninja</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-slate-900 dark:text-white">
              Hugo Legorreta <span className="text-ninja-crimson glow-crimson">Moysén</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-cyber-textBright font-mono leading-relaxed">
              <strong className="text-sky-700 dark:text-gits-cyan">Product Owner</strong> · Consultor Tecnológico · Creador de Contenido Digital & Desarrollador de Videojuegos. Fundador de <strong className="text-amber-700 dark:text-amberGold">Freejolitos</strong>, activista cannábico en <strong className="text-ninja-crimson">La Comuna 420</strong> (#Capital420 / Senado) y creador de <strong className="text-emerald-600 dark:text-matrix-green">weedtown.social</strong>.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <button
                onClick={startExpedition}
                className="py-1.5 px-3 rounded-lg bg-ninja-crimson/15 hover:bg-ninja-crimson/25 border border-ninja-crimson/60 text-slate-900 dark:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md group"
              >
                <Compass className="w-3.5 h-3.5 text-ninja-crimson group-hover:rotate-45 transition-transform" />
                <span>{isExpeditionActive ? 'MODO EXPEDICIÓN ACTIVO' : 'EXPEDICIÓN GUIADA'}</span>
              </button>

              <button
                onClick={() => {
                  setViewMode(viewMode === 'hologram' ? 'matrix' : 'hologram');
                  triggerHolographicRepaint();
                }}
                className={`py-1.5 px-3 rounded-lg border text-xs font-bold font-mono flex items-center gap-1.5 transition-all ${
                  viewMode === 'hologram'
                    ? 'bg-sky-500/15 border-sky-500 dark:border-gits-cyan text-sky-800 dark:text-gits-cyan'
                    : 'bg-slate-100 dark:bg-cyber-void border-slate-300 dark:border-cyber-border text-slate-800 dark:text-cyber-textBright hover:border-red-500 dark:hover:border-gits-cyan'
                }`}
              >
                {viewMode === 'hologram' ? (
                  <>
                    <Radio className="w-3.5 h-3.5 text-sky-600 dark:text-gits-cyan animate-pulse" />
                    <span>VER MATRIZ (2x2)</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-3.5 h-3.5 text-ninja-crimson" />
                    <span>VER HOLOGRAMA ENFOCADO</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3D Wireframe Core */}
          <div className="shrink-0">
            <CyberWireframeCore 
              accentColor={currentPersona === 'PROJECT_2501' ? 'crimson' : 'amber'}
              syncPercent={syncPercentage}
              theme={theme}
              onCoreClick={() => {
                triggerHolographicRepaint();
              }}
            />
          </div>

        </div>

      </section>

      {/* ========================================================================= */}
      {/* EXPEDITION SPOTLIGHT BANNER                                               */}
      {/* ========================================================================= */}
      {isExpeditionActive && currentExpeditionNode && (
        <section className="relative rounded-xl bg-cyber-card/95 border-2 border-ninja-crimson p-5 space-y-4 shadow-2xl box-glow-crimson font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyber-border pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ninja-crimson animate-ping"></span>
              <span className="text-ninja-crimson font-bold text-xs tracking-wider">
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
                className="p-1 px-2.5 rounded bg-ninja-crimson/20 border border-ninja-crimson text-white text-xs font-bold flex items-center gap-1"
              >
                <span>SIG</span>
                <ChevronRight className="w-3 h-3 text-ninja-crimson" />
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
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-ninja-crimson/20 text-ninja-crimson border border-ninja-crimson/40">
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
                  setFocusedNode(n);
                  setSelectedDimension(n.dimension);
                  setVisitedNodes((prev) => new Set(prev).add(n.id));
                  onNodeSelectForOperator(n.id);
                  triggerHolographicRepaint();
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === expeditionIndex 
                    ? 'w-5 bg-ninja-crimson' 
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
        <div className="flex items-center justify-between font-mono text-xs text-slate-500 dark:text-cyber-textMuted">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-ninja-crimson" />
            <span className="text-slate-800 dark:text-cyber-textBright font-bold">DIMENSIONES DEL CONSTRUCTO:</span>
          </div>
          <span>({filteredNodes.length} NODOS ACTIVOS)</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 font-mono text-xs">
          <button
            onClick={() => handleSelectDimension('all')}
            className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
              selectedDimension === 'all'
                ? 'bg-red-500/15 border-red-500 text-slate-900 dark:text-white shadow-md box-glow-crimson font-bold'
                : 'bg-white dark:bg-cyber-card border-slate-200 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted hover:border-red-400 hover:text-slate-900 dark:hover:text-cyber-textBright'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <Layers className="w-3.5 h-3.5 text-ninja-crimson" />
              <span className="text-[10px] font-bold text-ninja-crimson">{PORTFOLIO_NODES.length}</span>
            </div>
            <div>
              <div className="font-bold text-slate-800 dark:text-white text-[11px]">TODAS</div>
              <div className="text-[9px] text-slate-500 dark:text-cyber-textMuted">Ecosistema</div>
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
                      ? 'bg-amber-500/15 border-amber-500 text-amber-900 dark:text-white box-glow-amber font-bold'
                      : dim.color === 'green'
                      ? 'bg-emerald-500/15 border-emerald-500 text-emerald-900 dark:text-white box-glow-matrix font-bold'
                      : 'bg-sky-500/15 border-sky-500 text-sky-900 dark:text-white box-glow-cyan font-bold'
                    : 'bg-white dark:bg-cyber-card border-slate-200 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted hover:border-red-400 hover:text-slate-900 dark:hover:text-cyber-textBright'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  {getDimensionIcon(dim.id)}
                  <span className="text-[10px] font-bold text-slate-400 dark:text-cyber-textMuted">
                    {PORTFOLIO_NODES.filter((n) => n.dimension === dim.id).length}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 dark:text-white truncate text-[11px]">{dim.name}</div>
                  <div className="text-[9px] text-slate-500 dark:text-cyber-textMuted truncate">{dim.code}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* HOLOGRAPHIC STAGE CONTAINER (WITH LASER SCANLINE REPAINT)                  */}
      {/* ========================================================================= */}
      <div ref={stageContainerRef} className="relative overflow-hidden rounded-xl border border-cyber-border/80 scroll-mt-28 lg:scroll-mt-20">
        
        {/* Underlying Blueprint Wireframe Matrix Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#00f0ff07_1px,transparent_1px),linear-gradient(to_bottom,#00f0ff07_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0"
        />

        {/* Holographic Laser Emitter Beam with Trailing Curtain & Floating Telemetry */}
        <div
          ref={scanlineRef}
          className="absolute left-0 right-0 pointer-events-none z-30 opacity-0"
          style={{ top: '0%' }}
        >
          {/* Main Laser Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-ninja-crimson to-gits-cyan shadow-[0_0_25px_#ff0055,0_0_15px_#00f0ff]" />
          {/* Soft Emitter Curtain */}
          <div className="h-16 w-full bg-gradient-to-t from-transparent to-gits-cyan/10" />
          {/* Floating Telemetry HUD Badge */}
          <div className="absolute right-4 -top-6 text-[10px] font-mono text-gits-cyan bg-cyber-void/95 px-2.5 py-0.5 border border-gits-cyan/50 rounded flex items-center gap-1.5 shadow-xl backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gits-cyan animate-ping" />
            <span className="font-bold">REDIBUJANDO HOLOGRAMA: {scanPercent}%</span>
          </div>
        </div>

        <div ref={stageContentRef} className="space-y-6 relative z-10">

          {/* ===================================================================== */}
          {/* MODE A: EXPANSIVE HOLOGRAPHIC PROJECTION FOCUS                        */}
          {/* ===================================================================== */}
          {viewMode === 'hologram' && focusedNode && (
            <section className="relative rounded-xl bg-white/95 dark:bg-cyber-card/95 border border-slate-300 dark:border-ninja-crimson/50 p-5 sm:p-7 space-y-6 shadow-xl backdrop-blur-md font-mono text-xs overflow-hidden transition-colors duration-250">
              
              {/* Giant Japanese Kanji Holographic Watermark */}
              <div className="absolute right-4 top-2 text-8xl sm:text-9xl font-serif text-slate-900/[0.04] dark:text-white/[0.03] select-none pointer-events-none">
                {getDimensionKanji(focusedNode.dimension)}
              </div>

              {/* Holographic Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-cyber-border pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-ninja-crimson animate-ping" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-ninja-crimson font-bold text-xs tracking-wider">
                        PROYECCIÓN HOLOGRÁFICA // [{focusedNode.code}]
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-cyber-textMuted">
                        KANJI: {getDimensionKanji(focusedNode.dimension)}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-cyber-textMuted">
                      DIMENSIÓN: {focusedNode.dimension.toUpperCase()} · SINCRONIZADO
                    </span>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* Redraw Hologram Button */}
                  <button
                    onClick={() => triggerHolographicRepaint()}
                    disabled={isScanning}
                    className="px-3 py-1.5 rounded bg-ninja-crimson/15 border border-ninja-crimson/60 hover:bg-ninja-crimson/25 text-slate-900 dark:text-white text-xs flex items-center gap-1.5 transition-all shadow-sm group"
                    title="Redibujar proyección holográfica con barrido láser visible"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-ninja-crimson group-hover:rotate-180 transition-transform ${isScanning ? 'animate-spin' : ''}`} />
                    <span>{isScanning ? `REDIBUJANDO (${scanPercent}%)` : 'REDIBUJAR HOLOGRAMA'}</span>
                  </button>

                  {/* Switch to Matrix Button */}
                  <button
                    onClick={() => {
                      setViewMode('matrix');
                      triggerHolographicRepaint();
                    }}
                    className="px-3 py-1.5 rounded bg-slate-100 dark:bg-cyber-void border border-slate-300 dark:border-cyber-border hover:border-sky-500 dark:hover:border-gits-cyan text-slate-800 dark:text-cyber-textBright text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Grid className="w-3.5 h-3.5 text-sky-600 dark:text-gits-cyan" />
                    <span>VER MATRIZ (2x2)</span>
                  </button>
                </div>
              </div>

              {/* Main Focused Dossier Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start relative z-10">
                
                {/* Left Column: Title, Subtitle, Highlights & Evidence (7 Cols) */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-ninja-crimson/15 text-ninja-crimson border border-ninja-crimson/40 inline-block mb-2">
                      {focusedNode.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-slate-900 dark:text-white">
                      {focusedNode.title}
                    </h2>
                    <p className="text-xs text-sky-700 dark:text-gits-cyan font-mono mt-1">
                      {focusedNode.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-cyber-textBright leading-relaxed">
                    {focusedNode.summary}
                  </p>

                  {/* Highlight Metric Pill */}
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-cyber-void border border-ninja-crimson/30 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-ninja-crimson shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 dark:text-cyber-textMuted font-bold block">MÉTRICA / IMPACTO CLAVE:</span>
                      <span className="text-xs text-slate-900 dark:text-white font-bold">{focusedNode.highlightStat}</span>
                    </div>
                  </div>

                  {/* Context, Solution & Impact Tabs/Blocks */}
                  <div className="space-y-2 pt-1">
                    <div className="p-3 rounded bg-slate-50 dark:bg-cyber-void/80 border border-slate-200 dark:border-cyber-border space-y-1">
                      <span className="text-amber-700 dark:text-amberGold font-bold text-[11px] uppercase tracking-wider block">
                        01 // Contexto y Problema:
                      </span>
                      <p className="text-slate-700 dark:text-cyber-textBright text-xs leading-relaxed">
                        {focusedNode.details.problemOrContext}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 dark:bg-cyber-void/80 border border-slate-200 dark:border-cyber-border space-y-1">
                      <span className="text-sky-700 dark:text-gits-cyan font-bold text-[11px] uppercase tracking-wider block">
                        02 // Rol y Ejecución de Hugo:
                      </span>
                      <p className="text-slate-700 dark:text-cyber-textBright text-xs leading-relaxed">
                        {focusedNode.details.solutionOrRole}
                      </p>
                    </div>

                    <div className="p-3 rounded bg-slate-50 dark:bg-cyber-void/80 border border-slate-200 dark:border-cyber-border space-y-1">
                      <span className="text-emerald-700 dark:text-matrix-green font-bold text-[11px] uppercase tracking-wider block">
                        03 // {focusedNode.impactIsProjected ? 'Impacto Proyectado:' : 'Impacto y Resultado:'}
                      </span>
                      <p className="text-slate-700 dark:text-cyber-textBright text-xs leading-relaxed">
                        {focusedNode.details.impactOrOutcome}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Cockpit & Evidence Links (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  
                  {/* Specialized Interactive Cockpit for weedtown.social */}
                  {focusedNode.dimension === 'weedtown' && (
                    <div className="p-4 sm:p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/40 space-y-3 font-mono shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                          <span className="font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                            weedtown.social // RED SOBERANA
                          </span>
                        </div>
                        <a
                          href="https://weedtown.social"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 font-bold"
                        >
                          <span>Entrar a la red</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-emerald-100/90 leading-relaxed">
                        Red comunitaria soberana creada con <strong>vibe-coding</strong>. Espacio libre de censura comercial ni algoritmos de extracción para compartir cultura cannábica y debate abierto.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="p-2 rounded bg-white/90 dark:bg-cyber-void/80 border border-emerald-500/20">
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold block">✓ CERO CENSURA</span>
                          <span className="text-slate-600 dark:text-cyber-textMuted">Comunidad autónoma</span>
                        </div>
                        <div className="p-2 rounded bg-white/90 dark:bg-cyber-void/80 border border-emerald-500/20">
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold block">✓ SOBERANÍA</span>
                          <span className="text-slate-600 dark:text-cyber-textMuted">Control de datos</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <a
                          href="https://weedtown.social"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                        >
                          <span>Abrir weedtown.social</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href="https://github.com/HugoLeMoy47/weedtown_trial_101"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded bg-white hover:bg-slate-100 dark:bg-cyber-void dark:hover:border-gits-cyan border border-slate-300 dark:border-cyber-border text-slate-700 dark:text-cyber-textBright text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                          title="Ver repositorio en GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Repo</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Specialized Interactive Cockpit for CNNN */}
                  {focusedNode.dimension === 'cnnn' && (
                    <div className="space-y-3">
                      <span className="text-emerald-700 dark:text-matrix-green font-bold text-xs block">// TRANSMISIÓN EN VIVO PREVIEW:</span>
                      <div className="aspect-video w-full rounded-xl overflow-hidden border border-emerald-500/40 dark:border-matrix-green/50 shadow-xl bg-black">
                        <iframe
                          className="w-full h-full"
                          src="https://www.youtube-nocookie.com/embed/S9Y0MEct5pE"
                          title="CNNN Video Preview"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </div>
                  )}

                  {/* Specialized Interactive Cockpit for Freejolitos */}
                  {focusedNode.dimension === 'freejolitos' && (
                    <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amberGold/10 border border-amber-300 dark:border-amberGold/40 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-800 dark:text-amberGold text-xs">🫘 FREEJOLITOS CONSULTORES</span>
                        <a
                          href="https://freejolitos.consulting"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-amber-700 dark:text-amberGold hover:underline flex items-center gap-1"
                        >
                          <span>freejolitos.consulting</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      
                      <blockquote className="border-l-2 border-amber-500 dark:border-amberGold pl-3 text-xs italic text-slate-700 dark:text-cyber-textBright leading-relaxed">
                        “{FREEJOLITOS_CONTACT.quote}”
                      </blockquote>

                      <ul className="space-y-1.5 text-[11px]">
                        {FREEJOLITOS_CONTACT.services.map((service) => (
                          <li
                            key={service}
                            className="flex items-center gap-2 p-1.5 rounded bg-white dark:bg-cyber-void/60 border border-slate-200 dark:border-cyber-border text-slate-800 dark:text-cyber-textBright"
                          >
                            <span className="text-amber-700 dark:text-amberGold font-bold">✓</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <a
                          href={FREEJOLITOS_CONTACT.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md group"
                          title="Vía rápida por WhatsApp"
                        >
                          <MessageSquare className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          <span>WhatsApp (Rápido)</span>
                        </a>
                        <a
                          href={FREEJOLITOS_CONTACT.diagnosticMailto}
                          className="py-2 px-3 rounded bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md group"
                          title="Vía institucional por correo"
                        >
                          <Mail className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                          <span>Por Correo</span>
                        </a>
                      </div>
                      <p className="text-[10px] text-center text-slate-500 dark:text-cyber-textMuted flex items-center justify-center gap-2">
                        <span>{FREEJOLITOS_CONTACT.phoneDisplay}</span>
                        <span>·</span>
                        <span>{FREEJOLITOS_CONTACT.email}</span>
                      </p>
                    </div>
                  )}

                  {/* Specialized Evidence List */}
                  <div className="space-y-2">
                    <span className="text-sky-700 dark:text-gits-cyan font-bold text-xs block">// ENLACES Y EVIDENCIA DIRECTA:</span>
                    <div className="space-y-1.5">
                      {focusedNode.evidence.map((ev, idx) => (
                        <a
                          key={idx}
                          href={ev.url}
                          {...(ev.url.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className="flex items-center justify-between p-2.5 rounded bg-white dark:bg-cyber-void border border-slate-200 dark:border-cyber-border hover:border-red-500 dark:hover:border-ninja-crimson hover:text-red-600 dark:hover:text-white transition-colors group shadow-sm"
                        >
                          <div className="flex items-center gap-2 truncate">
                            {ev.type === 'github' && <Github className="w-3.5 h-3.5 text-sky-600 dark:text-gits-cyan" />}
                            {ev.type === 'video' && <Play className="w-3.5 h-3.5 text-red-500" />}
                            {ev.type === 'demo' && <MonitorPlay className="w-3.5 h-3.5 text-ninja-crimson" />}
                            {ev.type === 'link' && <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-matrix-green" />}
                            {ev.type === 'doc' && <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amberGold" />}
                            <span className="truncate font-semibold text-xs text-slate-800 dark:text-cyber-textBright">{ev.title}</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-cyber-textMuted group-hover:translate-x-1 group-hover:text-ninja-crimson transition-all" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {focusedNode.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-cyber-void border border-slate-200 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted text-[10px]">
                        #{tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>

              {/* Related Nodes Quick Navigator inside Dimension */}
              <div className="pt-4 border-t border-slate-200 dark:border-cyber-border flex flex-wrap items-center justify-between gap-3 text-[11px]">
                <div className="text-slate-500 dark:text-cyber-textMuted">
                  EXPLORAR MÁS EN ESTA CATEGORÍA ({filteredNodes.length} NODOS):
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {filteredNodes.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => handleFocusNode(n)}
                      className={`px-2.5 py-1 rounded border text-[10px] font-mono transition-all ${
                        n.id === focusedNode.id
                          ? 'bg-ninja-crimson text-white border-ninja-crimson font-bold shadow-sm'
                          : 'bg-slate-100 dark:bg-cyber-void border-slate-200 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted hover:border-sky-500 dark:hover:border-gits-cyan hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      {n.code}
                    </button>
                  ))}
                </div>
              </div>

            </section>
          )}

          {/* ===================================================================== */}
          {/* MODE B: TACTICAL MATRIX (RESPONSIVE 2x2 ARRANGEMENT)                  */}
          {/* ===================================================================== */}
          {viewMode === 'matrix' && (
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-cyber-border pb-2.5 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-ninja-crimson font-bold">// MATRIZ TÁCTICA (ARREGLO 2x2):</span>
                  <span className="text-slate-500 dark:text-cyber-textMuted">[{filteredNodes.length} NODOS ACTIVOS]</span>
                </div>
                <button
                  onClick={() => {
                    setViewMode('hologram');
                    triggerHolographicRepaint();
                  }}
                  className="text-sky-700 dark:text-gits-cyan hover:underline flex items-center gap-1 font-semibold"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Volver a Holograma</span>
                </button>
              </div>

              {/* 2x2 Grid */}
              <div ref={matrixGridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNodes.map((node, index) => {
                  const isVisited = visitedNodes.has(node.id);
                  const isCurrent = node.id === focusedNode.id;
                  const kanjiNumeral = KANJI_NUMERALS[index % KANJI_NUMERALS.length];

                  return (
                    <div
                      key={node.id}
                      onClick={() => handleFocusNode(node)}
                      className={`group relative bg-white/95 dark:bg-cyber-card/90 rounded-xl border p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm ${
                        isCurrent
                          ? 'border-ninja-crimson shadow-md dark:box-glow-crimson'
                          : 'border-slate-200 dark:border-cyber-border hover:border-red-400 dark:hover:border-gits-cyan'
                      }`}
                    >
                      {/* Top Card HUD */}
                      <div className="flex items-center justify-between mb-2 font-mono text-xs">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${isCurrent ? 'bg-ninja-crimson animate-ping' : isVisited ? 'bg-sky-500 dark:bg-gits-cyan' : 'bg-slate-300 dark:bg-cyber-textMuted group-hover:bg-ninja-crimson'}`}></span>
                          <span className="text-slate-500 dark:text-cyber-textMuted font-bold">{node.code}</span>
                          <span className="text-[10px] font-serif text-ninja-crimson/80 ml-1">[{kanjiNumeral}]</span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold border bg-ninja-crimson/10 text-ninja-crimson border-ninja-crimson/30">
                          {node.badge}
                        </span>
                      </div>

                      {/* Title & Summary */}
                      <div className="space-y-1.5 mb-3">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-gits-cyan transition-colors font-display">
                          {node.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-cyber-textMuted font-mono">
                          {node.subtitle}
                        </p>
                        <p className="text-xs text-slate-700 dark:text-cyber-textBright leading-relaxed line-clamp-3">
                          {node.summary}
                        </p>
                      </div>

                      {/* Stat */}
                      <div className="p-2 mb-3 rounded bg-slate-50 dark:bg-cyber-void/80 border border-slate-200 dark:border-cyber-border font-mono text-[10px] text-slate-800 dark:text-cyber-textBright">
                        <span className="text-ninja-crimson font-bold">⚡ </span>
                        {node.highlightStat}
                      </div>

                      {/* Bottom Footer Action */}
                      <div className="pt-2.5 border-t border-slate-200 dark:border-cyber-border/60 flex items-center justify-between font-mono text-[10px]">
                        <div className="flex flex-wrap gap-1 max-w-[65%]">
                          {node.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="text-slate-500 dark:text-cyber-textMuted">#{t}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-sky-700 dark:text-gits-cyan font-bold group-hover:translate-x-1 transition-transform">
                          <span>PROYECTAR</span>
                          <ChevronRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: TELEMETRY DETAILS (IF EXPLICITLY OPENED)                           */}
      {/* ========================================================================= */}
      {activeModalNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-void/80 backdrop-blur-md">
          <div className="w-full max-w-2xl bg-cyber-card border border-ninja-crimson/50 rounded-xl shadow-2xl p-5 sm:p-7 space-y-5 max-h-[90vh] overflow-y-auto box-glow-crimson font-mono text-xs sm:text-sm">
            
            <div className="flex items-start justify-between border-b border-cyber-border pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-ninja-crimson font-bold">[{activeModalNode.code}]</span>
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
                <span className="text-ninja-crimson font-bold text-xs uppercase tracking-wider block">
                  03 // {activeModalNode.impactIsProjected ? 'Impacto Proyectado' : 'Impacto'}
                </span>
                <p className="text-cyber-textBright text-xs leading-relaxed">{activeModalNode.details.impactOrOutcome}</p>
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
