import React from 'react';
import { Shield, ExternalLink, BookOpen, Bot, UserCheck, RefreshCw } from 'lucide-react';
import { type OperatorPersona, PERSONAS_META } from '../data/operatorPersonas';
import { cyberAudio } from '../utils/cyberAudio';

interface CyberHeaderProps {
  currentPersona: OperatorPersona;
  onPersonaChange: (persona: OperatorPersona) => void;
  onReplayBoot?: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  currentPersona,
  onPersonaChange,
  onReplayBoot,
  theme,
  onThemeToggle,
}) => {
  const meta = PERSONAS_META[currentPersona];

  const handleToggle = () => {
    cyberAudio.playClick(900);
    onPersonaChange(currentPersona === 'PROJECT_2501' ? 'HLM_ALTEREGO' : 'PROJECT_2501');
  };

  const handleReplayBoot = () => {
    cyberAudio.playClick(1100);
    if (onReplayBoot) {
      onReplayBoot();
    }
  };

  return (
    <header className="sticky top-0 z-40 h-[52px] bg-[#fafafa]/90 dark:bg-cyber-void/85 backdrop-blur-md supports-[backdrop-filter]:backdrop-saturate-150 border-b border-slate-200 dark:border-cyber-border px-3 sm:px-4 transition-colors duration-250">
      <div className="max-w-[1600px] h-full mx-auto flex flex-nowrap items-center justify-between gap-2 sm:gap-3 text-xs font-mono">
        
        {/* System Identifier & .ninja TLD Badge */}
        <div className="flex items-center gap-3 min-w-0">
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="hugolemoy.ninja, inicio">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ninja-crimson opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ninja-crimson"></span>
            </span>
            <span className="font-bold tracking-wider text-ninja-crimson glow-crimson flex items-center gap-1.5">
              <span className="text-sm font-serif">忍</span>
              <span className="hidden xs:inline">hugolemoy.ninja</span>
              <span className="xs:hidden">HLM</span>
            </span>
          </a>
          <span className="hidden md:inline-block text-slate-400 dark:text-cyber-textMuted" aria-hidden="true">|</span>
          <span className={`hidden md:inline-flex items-center gap-1.5 ${theme === 'light' ? 'text-sky-700' : 'text-gits-cyan'}`}>
            <Shield className="w-3.5 h-3.5" />
            <span>NEURAL_LINK: ACTIVE</span>
          </span>
        </div>

        {/* Global Action HUD */}
        <nav aria-label="Principal" className="flex flex-nowrap items-center justify-end gap-1.5 sm:gap-2.5">
          
          {/* Theme Toggle: Modo Blanco Tinta (Sumi-e / Washi) vs Modo Oscuro Vacío (Cyberpunk) */}
          <button
            onClick={() => {
              cyberAudio.playClick(1050);
              onThemeToggle();
            }}
            aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            className={`flex items-center justify-center gap-1.5 h-8 min-w-8 px-2 sm:px-2.5 rounded-md border text-[11px] font-bold transition-all duration-200 shadow-sm ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 hover:border-red-600'
                : 'bg-cyber-card hover:bg-cyber-cardHover border-cyber-border text-cyber-textBright hover:border-ninja-crimson'
            }`}
            title={theme === 'light' ? 'Cambiar a Modo Oscuro (Vacío / Cyberpunk)' : 'Cambiar a Modo Blanco Japonés (Tinta / Sumi-e Washi)'}
          >
            <span className="text-sm font-serif text-red-600 dark:text-ninja-crimson">☯</span>
            <span className="hidden sm:inline">
              {theme === 'light' ? 'TINTA (BLANCO)' : 'VACÍO (OSCURO)'}
            </span>
          </button>

          {/* Replay Boot Sequence Button */}
          {onReplayBoot && (
            <button
              onClick={handleReplayBoot}
              className="hidden md:flex items-center gap-1 h-8 px-2.5 rounded-md border border-slate-300 dark:border-cyber-border hover:border-ninja-crimson/60 bg-white dark:bg-cyber-card text-slate-700 dark:text-cyber-textMuted hover:text-ninja-crimson dark:hover:text-white transition-colors"
              title="Volver a ejecutar secuencia cinematográfica Ghost Dive"
            >
              <RefreshCw className="w-3 h-3 text-ninja-crimson" />
              <span className="hidden md:inline text-[11px]">GHOST DIVE</span>
            </button>
          )}

          {/* Quick Persona A/B Toggle Button */}
          <button
            onClick={handleToggle}
            aria-label={`Operador de IA: ${meta.name}. Cambiar personalidad`}
            className={`flex items-center gap-1.5 h-8 px-2 sm:px-3 rounded-md border transition-all duration-200 ${
              currentPersona === 'PROJECT_2501'
                ? 'bg-sky-50 dark:bg-gits-cyan/15 border-sky-400 dark:border-gits-cyan text-sky-700 dark:text-gits-cyan shadow-sm box-glow-cyan'
                : 'bg-amber-50 dark:bg-amberGold/15 border-amber-400 dark:border-amberGold text-amber-800 dark:text-amberGold shadow-sm box-glow-amber'
            }`}
            title="Alternar personalidad del Operador de IA (A/B Testing)"
          >
            {currentPersona === 'PROJECT_2501' ? (
              <Bot className="w-3.5 h-3.5" />
            ) : (
              <UserCheck className="w-3.5 h-3.5" />
            )}
            <span className="hidden lg:inline">OPERADOR:</span>
            <span className="font-bold hidden sm:inline">{meta.name}</span>
          </button>

          {/* Cuaderno de construcción (páginas estáticas del sitio) */}
          <a
            href="/cuaderno/"
            className="flex items-center gap-1 h-8 text-sky-700 dark:text-gits-cyan hover:underline underline-offset-4 px-1.5 font-semibold"
          >
            <span>Cuaderno</span>
          </a>

          {/* Direct weedtown.social link */}
          <a
            href="https://weedtown.social"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 h-8 text-emerald-600 dark:text-matrix-green hover:underline underline-offset-4 px-1.5 font-semibold"
            title="Red social autónoma y soberana"
          >
            <span>weedtown</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Direct Freejolitos Link */}
          <a
            href="https://freejolitos.consulting"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Freejolitos Consultores (abre en otra pestaña)"
            className="flex items-center gap-1 h-8 text-amber-600 dark:text-amberGold hover:underline underline-offset-4 px-1.5 font-semibold"
          >
            <span className="hidden sm:inline">Freejolitos</span>
            <span aria-hidden="true">🫘</span>
            <ExternalLink className="w-3 h-3 hidden sm:block" />
          </a>

          {/* LLMs.txt Direct Link */}
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden xl:flex items-center gap-1 h-8 text-slate-500 dark:text-cyber-textMuted hover:text-sky-700 dark:hover:text-gits-cyan transition-colors px-1.5 py-1"
            title="Especificación llms.txt para Agentes de IA"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>/llms.txt</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
