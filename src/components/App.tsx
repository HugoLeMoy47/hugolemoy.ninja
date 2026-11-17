import React, { useState, useEffect } from 'react';
import { CyberHeader } from './CyberHeader';
import { CyberMatrixRain } from './CyberMatrixRain';
import { CyberJourney } from './CyberJourney';
import { CyberOperatorPanel } from './CyberOperatorPanel';
import { CyberBootLoader } from './CyberBootLoader';
import { type OperatorPersona } from '../data/operatorPersonas';
import { SOCIAL_PROFILES } from '../data/portfolioData';
import { 
  Bot, 
  Layers, 
  ExternalLink, 
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  Users, 
  Share2,
  NotebookPen
} from 'lucide-react';

export interface CuadernoResumen {
  nombre: string;
  ruta: string;
  ultima?: {
    titulo: string;
    resumen: string;
    ruta: string;
    fecha: string;
    fechaISO: string;
  };
}

interface AppProps {
  cuaderno?: CuadernoResumen;
}

export const App: React.FC<AppProps> = ({ cuaderno }) => {
  const [currentPersona, setCurrentPersona] = useState<OperatorPersona>('PROJECT_2501');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [externalDimension, setExternalDimension] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'operator' | 'viewport'>('viewport');
  const [isBooting, setIsBooting] = useState<boolean>(true);

  // Japanese Sumi-e Light Theme vs Obsidian Dark Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // El script del <head> marca hlm-booted en visitas repetidas o con movimiento reducido.
    if (document.documentElement.classList.contains('hlm-booted')) {
      setIsBooting(false);
    }
  }, []);

  const handleReplayBoot = () => {
    document.documentElement.classList.remove('hlm-booted');
    setIsBooting(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hlm_theme');
      if (saved === 'light' || saved === 'dark') {
        setTheme(saved);
        if (saved === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
      }
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('hlm_theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleNodeSelectFromViewport = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleTriggerDimensionFromCLI = (dimId: string) => {
    setExternalDimension(dimId);
    setMobileTab('viewport'); // Switch to viewport on mobile if dimension triggered
  };

  const iconCls = 'w-4 h-4 text-sky-700 dark:text-gits-cyan group-hover:text-ninja-crimson transition-colors duration-200';
  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'linkedin': return <Linkedin className={iconCls} />;
      case 'facebook': return <Facebook className={iconCls} />;
      case 'x': return <Twitter className={iconCls} />;
      case 'instagram': return <Instagram className={iconCls} />;
      case 'github': return <Github className={iconCls} />;
      case 'weedtown': return <Users className="w-4 h-4 text-emerald-600 dark:text-matrix-green" />;
      case 'freejolitos': return <span className="text-base leading-none">🫘</span>;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-cyber-void text-slate-900 dark:text-cyber-textBright overflow-x-hidden flex flex-col justify-between transition-colors duration-250 font-sans">
      
      {/* Cinematic Ghost Dive Boot Loader */}
      {isBooting && (
        <CyberBootLoader
          onBootComplete={() => {
            document.documentElement.classList.add('hlm-booted');
            setIsBooting(false);
          }}
        />
      )}

      {/* Background Neo-Tokyo Cyber-Ninja / Sumi-e Rain Canvas */}
      <CyberMatrixRain theme={theme} />

      {/* Top HUD Telemetry Navigation */}
      <CyberHeader
        currentPersona={currentPersona}
        onPersonaChange={setCurrentPersona}
        onReplayBoot={handleReplayBoot}
        theme={theme}
        onThemeToggle={handleToggleTheme}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-[var(--hlm-header-h,52px)] z-30 bg-[#fafafa]/90 dark:bg-cyber-void/85 backdrop-blur-md px-3 py-2 border-b border-slate-200 dark:border-cyber-border font-mono text-[11px] flex gap-1.5" role="tablist" aria-label="Vista">
        <button
          onClick={() => setMobileTab('viewport')}
          role="tab"
          aria-selected={mobileTab === 'viewport'}
          className={`hlm-tap flex-1 py-2 rounded-md border duration-200 flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'viewport'
              ? 'bg-ninja-crimson/15 border-ninja-crimson text-red-600 dark:text-white font-bold shadow-sm'
              : 'border-slate-300 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>CONSTRUCTO</span>
        </button>

        <button
          onClick={() => setMobileTab('operator')}
          role="tab"
          aria-selected={mobileTab === 'operator'}
          className={`hlm-tap flex-1 py-2 rounded-md border duration-200 flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'operator'
              ? 'bg-sky-500/15 border-sky-500 dark:border-gits-cyan text-sky-700 dark:text-gits-cyan font-bold shadow-sm'
              : 'border-slate-300 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>OPERADOR · {currentPersona === 'PROJECT_2501' ? '2501' : 'HLM'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CYBER-DECK SPLIT-SCREEN MAIN STAGE                                        */}
      {/* ========================================================================= */}
      <main id="contenido" className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto px-3 py-4 sm:p-5 lg:p-6 space-y-6 sm:space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: AI Operator Console (4.5 of 12 cols in Desktop) */}
          <div className={`lg:col-span-5 xl:col-span-4 ${mobileTab === 'operator' ? 'block' : 'hidden lg:block'} lg:sticky lg:top-20 hlm-rise`}>
            <CyberOperatorPanel
              currentPersona={currentPersona}
              onPersonaChange={setCurrentPersona}
              selectedNodeId={selectedNodeId}
              onTriggerDimensionSelect={handleTriggerDimensionFromCLI}
              theme={theme}
            />
          </div>

          {/* Right Panel: Holographic Viewport & Projection Stage (7.5 of 12 cols in Desktop) */}
          <div className={`lg:col-span-7 xl:col-span-8 ${mobileTab === 'viewport' ? 'block' : 'hidden lg:block'} hlm-rise`}>
            <CyberJourney
              currentPersona={currentPersona}
              onNodeSelectForOperator={handleNodeSelectFromViewport}
              externalDimension={externalDimension}
              activeNodeId={selectedNodeId}
              theme={theme}
            />
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CUADERNO DE CONSTRUCCIÓN (relato en primera persona; páginas estáticas)   */}
        {/* ========================================================================= */}
        {cuaderno && (
          <section
            aria-labelledby="cuaderno-titulo"
            className="rounded-xl bg-white/95 dark:bg-cyber-card/90 border border-slate-200 dark:border-cyber-border p-5 sm:p-6 shadow-xl backdrop-blur-md"
          >
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-cyber-border pb-3 mb-4 font-mono">
              <NotebookPen className="w-4 h-4 text-red-700 dark:text-ninja-crimson" aria-hidden="true" />
              <h2 id="cuaderno-titulo" className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                {cuaderno.nombre}
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 text-sm leading-relaxed">
              <div className="space-y-3 text-slate-700 dark:text-cyber-textBright">
                <p>
                  Construyo Bitácora Viva, un expediente digital para albergues y organizaciones que atienden a
                  personas en movilidad. Es una prueba de concepto y trabaja solo con datos de prueba.
                </p>
                <p>
                  En el cuaderno cuento, en primera persona, los retos técnicos y los dilemas éticos de construirlo.
                </p>
                <p>
                  <a
                    href={cuaderno.ruta}
                    className="font-bold text-sky-700 hover:text-sky-900 dark:text-gits-cyan dark:hover:text-white underline underline-offset-4"
                  >
                    Leer el {cuaderno.nombre}
                  </a>
                </p>
              </div>

              {cuaderno.ultima && (
                <div className="p-4 rounded-lg border border-slate-200 dark:border-cyber-border bg-slate-50 dark:bg-cyber-void">
                  <p className="font-mono text-xs text-slate-600 dark:text-slate-400 mb-1.5">
                    Pieza más reciente · <time dateTime={cuaderno.ultima.fechaISO}>{cuaderno.ultima.fecha}</time>
                  </p>
                  <h3 className="font-display font-bold text-base sm:text-lg leading-snug">
                    <a
                      href={cuaderno.ultima.ruta}
                      className="text-slate-900 dark:text-white underline underline-offset-4 decoration-1 hover:decoration-red-700 dark:hover:decoration-ninja-crimson"
                    >
                      {cuaderno.ultima.titulo}
                    </a>
                  </h3>
                  <p className="mt-2 text-slate-700 dark:text-cyber-textBright">{cuaderno.ultima.resumen}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* SOCIAL PROFILES & DIRECTORY HUB (TARJETA TOTAL DE PRESENTACIÓN)          */}
        {/* ========================================================================= */}
        <section className="rounded-xl bg-white/95 dark:bg-cyber-card/90 border border-slate-200 dark:border-cyber-border p-5 sm:p-6 shadow-xl backdrop-blur-md font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-cyber-border pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-ninja-crimson" />
              <h2 className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                DIRECTORIO DE CANALES <span className="hidden sm:inline">&amp; IDENTIDAD DIGITAL // TARJETA TOTAL</span>
              </h2>
            </div>
            <span className="hidden sm:inline text-[11px] text-slate-500 dark:text-cyber-textMuted">
              [CONEXIÓN DIRECTA CON HUGO LEGORRETA MOYSÉN]
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 text-xs">
            {SOCIAL_PROFILES.map((profile) => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hlm-tap group p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-cyber-border bg-slate-50/80 dark:bg-cyber-void/80 hover:border-ninja-crimson/70 dark:hover:border-ninja-crimson/70 transition-all duration-300 ease-cyber flex flex-col justify-between gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(255,0,85,0.45)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2 min-w-0">
                      {getSocialIcon(profile.id)}
                      <span className="font-bold text-slate-900 dark:text-white text-sm font-display truncate">
                        {profile.name}
                      </span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-ninja-crimson transition-colors" />
                  </div>
                  <div className="text-xs text-sky-700 dark:text-gits-cyan font-bold truncate">
                    {profile.handle}
                  </div>
                </div>

                <p className="hidden sm:block text-xs text-slate-600 dark:text-cyber-textBright/85 leading-relaxed">
                  {profile.context}
                </p>
              </a>
            ))}
          </div>
        </section>

      </main>

      {/* Cyber Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-cyber-border/80 bg-white/95 dark:bg-cyber-void/90 py-6 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] font-mono text-xs text-slate-600 dark:text-cyber-textMuted transition-colors duration-250">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-ninja-crimson font-serif font-bold text-sm">忍</span>
            <span className="text-slate-800 dark:text-cyber-textBright font-semibold">hugolemoy.ninja // CYBER-DECK v2026.09</span>
          </div>

          <nav aria-label="Pie de página" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
            <a href="/cuaderno/" className="text-sky-700 dark:text-gits-cyan hover:underline">
              Cuaderno de construcción
            </a>
            <a href="https://linkedin.com/in/hugolegorretamoysen/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-gits-cyan">
              LinkedIn
            </a>
            <a href="https://github.com/HugoLeMoy47" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-gits-cyan">
              GitHub
            </a>
            <a href="https://weedtown.social" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-matrix-green hover:underline">
              weedtown.social
            </a>
            <a href="https://freejolitos.consulting" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amberGold hover:underline">
              Freejolitos 🫘
            </a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-gits-cyan hover:underline">
              /llms.txt
            </a>
          </nav>

          <div className="text-[11px] text-slate-500 dark:text-cyber-textMuted">
            Tarjeta Multidimensional · Modo Tinta (Sumi-e) & Modo Vacío (Cyberpunk)
          </div>
        </div>
      </footer>

    </div>
  );
};
