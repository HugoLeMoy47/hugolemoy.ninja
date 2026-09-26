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
  Share2 
} from 'lucide-react';

export const App: React.FC = () => {
  const [currentPersona, setCurrentPersona] = useState<OperatorPersona>('PROJECT_2501');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [externalDimension, setExternalDimension] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'operator' | 'viewport'>('viewport');
  const [isBooting, setIsBooting] = useState<boolean>(true);

  // Japanese Sumi-e Light Theme vs Obsidian Dark Theme
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'linkedin': return <Linkedin className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'x': return <Twitter className="w-4 h-4 text-slate-800 dark:text-slate-300" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-600 dark:text-pink-400" />;
      case 'github': return <Github className="w-4 h-4 text-slate-900 dark:text-slate-100" />;
      case 'weedtown': return <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'freejolitos': return <span className="text-base">🫘</span>;
      default: return <ExternalLink className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-cyber-void text-slate-900 dark:text-cyber-textBright overflow-x-hidden flex flex-col justify-between transition-colors duration-250 font-sans">
      
      {/* Cinematic Ghost Dive Boot Loader */}
      {isBooting && (
        <CyberBootLoader onBootComplete={() => setIsBooting(false)} />
      )}

      {/* Background Neo-Tokyo Cyber-Ninja / Sumi-e Rain Canvas */}
      <CyberMatrixRain theme={theme} />

      {/* Top HUD Telemetry Navigation */}
      <CyberHeader
        currentPersona={currentPersona}
        onPersonaChange={setCurrentPersona}
        onReplayBoot={() => setIsBooting(true)}
        theme={theme}
        onThemeToggle={handleToggleTheme}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-14 z-30 bg-[#fafafa]/95 dark:bg-cyber-void/90 backdrop-blur-md px-4 py-2 border-b border-slate-200 dark:border-cyber-border font-mono text-xs flex gap-2">
        <button
          onClick={() => setMobileTab('viewport')}
          className={`flex-1 py-1.5 rounded border flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'viewport'
              ? 'bg-ninja-crimson/15 border-ninja-crimson text-red-600 dark:text-white font-bold shadow-sm'
              : 'border-slate-300 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>VIEWPORT (CONSTRUCTO)</span>
        </button>

        <button
          onClick={() => setMobileTab('operator')}
          className={`flex-1 py-1.5 rounded border flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'operator'
              ? 'bg-sky-500/15 border-sky-500 text-sky-700 dark:text-gits-cyan font-bold shadow-sm'
              : 'border-slate-300 dark:border-cyber-border text-slate-600 dark:text-cyber-textMuted'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>OPERADOR IA ({currentPersona === 'PROJECT_2501' ? '2501' : 'HLM'})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CYBER-DECK SPLIT-SCREEN MAIN STAGE                                        */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-5 lg:p-6 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: AI Operator Console (4.5 of 12 cols in Desktop) */}
          <div className={`lg:col-span-5 xl:col-span-4 ${mobileTab === 'operator' ? 'block' : 'hidden lg:block'} sticky lg:top-20`}>
            <CyberOperatorPanel
              currentPersona={currentPersona}
              onPersonaChange={setCurrentPersona}
              selectedNodeId={selectedNodeId}
              onTriggerDimensionSelect={handleTriggerDimensionFromCLI}
              theme={theme}
            />
          </div>

          {/* Right Panel: Holographic Viewport & Projection Stage (7.5 of 12 cols in Desktop) */}
          <div className={`lg:col-span-7 xl:col-span-8 ${mobileTab === 'viewport' ? 'block' : 'hidden lg:block'}`}>
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
        {/* SOCIAL PROFILES & DIRECTORY HUB (TARJETA TOTAL DE PRESENTACIÓN)          */}
        {/* ========================================================================= */}
        <section className="rounded-xl bg-white/95 dark:bg-cyber-card/90 border border-slate-200 dark:border-cyber-border p-5 sm:p-6 shadow-xl backdrop-blur-md font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-cyber-border pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-ninja-crimson" />
              <span className="font-bold text-xs text-slate-800 dark:text-white uppercase tracking-wider">
                DIRECTORIO DE CANALES & IDENTIDAD DIGITAL // TARJETA TOTAL
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-cyber-textMuted">
              [CONEXIÓN DIRECTA CON HUGO LEGORRETA MOYSÉN]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {SOCIAL_PROFILES.map((profile) => (
              <a
                key={profile.id}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3.5 rounded-lg border border-slate-200 dark:border-cyber-border bg-slate-50/80 dark:bg-cyber-void/80 hover:border-ninja-crimson dark:hover:border-ninja-crimson transition-all duration-200 flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      {getSocialIcon(profile.id)}
                      <span className="font-bold text-slate-900 dark:text-white text-xs font-display">
                        {profile.name}
                      </span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-ninja-crimson transition-colors" />
                  </div>
                  <div className="text-[11px] text-sky-700 dark:text-gits-cyan font-bold truncate">
                    {profile.handle}
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-cyber-textBright leading-relaxed">
                  {profile.context}
                </p>
              </a>
            ))}
          </div>
        </section>

      </main>

      {/* Cyber Footer */}
      <footer className="relative z-10 border-t border-slate-200 dark:border-cyber-border/80 bg-white/95 dark:bg-cyber-void/90 py-5 px-4 font-mono text-xs text-slate-600 dark:text-cyber-textMuted transition-colors duration-250">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-ninja-crimson font-serif font-bold text-sm">忍</span>
            <span className="text-slate-800 dark:text-cyber-textBright font-semibold">hugolemoy.ninja // CYBER-DECK v2026.09</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a href="https://linkedin.com/in/hugolegorretamoysen/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-gits-cyan">
              LinkedIn
            </a>
            <a href="https://github.com/HugoLeMoy47" target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-gits-cyan">
              GitHub
            </a>
            <a href="https://weedtown.social" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              weedtown.social
            </a>
            <a href="https://freejolitos.consulting" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amberGold hover:underline">
              Freejolitos 🫘
            </a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-sky-600 dark:text-gits-cyan hover:underline">
              /llms.txt (UTF-8)
            </a>
          </div>

          <div className="text-[10px] text-slate-400 dark:text-cyber-textMuted/60">
            Tarjeta Multidimensional · Modo Tinta (Sumi-e) & Modo Vacío (Cyberpunk)
          </div>
        </div>
      </footer>

    </div>
  );
};
