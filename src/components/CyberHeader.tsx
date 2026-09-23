import React from 'react';
import { Terminal, Shield, ExternalLink, Cpu, BookOpen, Compass } from 'lucide-react';

interface CyberHeaderProps {
  onOpenTerminal: () => void;
  viewMode: 'journey' | 'expedition';
  onToggleViewMode: () => void;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  onOpenTerminal,
  viewMode,
  onToggleViewMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-cyber-void/85 backdrop-blur-md border-b border-cyber-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        
        {/* System Identifier */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matrix-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-matrix-green"></span>
            </span>
            <span className="font-bold tracking-wider text-matrix-green glow-matrix">
              HUGOSYSTEM_OS::v2026.09
            </span>
          </div>
          <span className="hidden sm:inline-block text-cyber-textMuted">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-gits-cyan">
            <Shield className="w-3.5 h-3.5 text-gits-cyan" />
            <span>NEURAL_LINK: ENCRYPTED</span>
          </span>
        </div>

        {/* Global Action HUD */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Expedition Mode Switcher */}
          <button
            onClick={onToggleViewMode}
            className={`flex items-center gap-1.5 px-3 py-1 rounded border transition-all ${
              viewMode === 'expedition'
                ? 'bg-matrix-green/20 border-matrix-green text-matrix-green shadow-sm'
                : 'bg-cyber-card border-cyber-border hover:border-gits-cyan text-cyber-textBright hover:text-gits-cyan'
            }`}
            title="Activar o pausar el modo de expedición guiada paso a paso"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">EXPEDICIÓN:</span>
            <span className="font-bold">
              {viewMode === 'expedition' ? 'ACTIVA' : 'INICIAR'}
            </span>
          </button>

          {/* AI / Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-matrix-green/10 border border-matrix-green/40 hover:border-matrix-green text-matrix-green hover:bg-matrix-green/20 transition-all shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="font-bold">AI_TERMINAL</span>
          </button>

          {/* LLMs.txt Direct Link */}
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-cyber-textMuted hover:text-matrix-green transition-colors px-2 py-1"
            title="Especificación llms.txt para Agentes de IA"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>/llms.txt</span>
          </a>

          {/* Direct Freejolitos Link */}
          <a
            href="https://freejolitos.consulting"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-amberGold hover:underline px-2 py-1"
          >
            <span>Freejolitos 🫘</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
