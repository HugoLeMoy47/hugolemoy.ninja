import React from 'react';
import { Shield, ExternalLink, BookOpen, Bot, UserCheck, RefreshCw } from 'lucide-react';
import { type OperatorPersona, PERSONAS_META } from '../data/operatorPersonas';
import { cyberAudio } from '../utils/cyberAudio';

interface CyberHeaderProps {
  currentPersona: OperatorPersona;
  onPersonaChange: (persona: OperatorPersona) => void;
  onReplayBoot?: () => void;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  currentPersona,
  onPersonaChange,
  onReplayBoot,
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
    <header className="sticky top-0 z-40 bg-cyber-void/90 backdrop-blur-md border-b border-cyber-border px-4 py-2.5">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        
        {/* System Identifier & .ninja TLD Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ninja-crimson opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-ninja-crimson"></span>
            </span>
            <span className="font-bold tracking-wider text-ninja-crimson glow-crimson flex items-center gap-1.5">
              <span className="text-sm font-serif">忍</span>
              <span>hugolemoy.ninja</span>
            </span>
          </div>
          <span className="hidden sm:inline-block text-cyber-textMuted">|</span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-gits-cyan">
            <Shield className="w-3.5 h-3.5 text-gits-cyan" />
            <span>NEURAL_LINK: ACTIVE</span>
          </span>
        </div>

        {/* Global Action HUD */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Replay Boot Sequence Button */}
          {onReplayBoot && (
            <button
              onClick={handleReplayBoot}
              className="flex items-center gap-1 px-2.5 py-1 rounded border border-cyber-border hover:border-ninja-crimson/60 bg-cyber-card text-cyber-textMuted hover:text-white transition-colors"
              title="Volver a ejecutar secuencia cinematográfica Ghost Dive"
            >
              <RefreshCw className="w-3 h-3 text-ninja-crimson" />
              <span className="hidden sm:inline text-[11px]">GHOST DIVE</span>
            </button>
          )}

          {/* Quick Persona A/B Toggle Button */}
          <button
            onClick={handleToggle}
            className={`flex items-center gap-1.5 px-3 py-1 rounded border transition-all ${
              currentPersona === 'PROJECT_2501'
                ? 'bg-gits-cyan/15 border-gits-cyan text-gits-cyan shadow-sm box-glow-cyan'
                : 'bg-amberGold/15 border-amberGold text-amberGold shadow-sm box-glow-amber'
            }`}
            title="Alternar personalidad del Operador de IA (A/B Testing)"
          >
            {currentPersona === 'PROJECT_2501' ? (
              <Bot className="w-3.5 h-3.5" />
            ) : (
              <UserCheck className="w-3.5 h-3.5" />
            )}
            <span className="hidden xs:inline">OPERADOR:</span>
            <span className="font-bold">{meta.name}</span>
          </button>

          {/* LLMs.txt Direct Link */}
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1 text-cyber-textMuted hover:text-gits-cyan transition-colors px-2 py-1"
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
            className="flex items-center gap-1 text-amberGold hover:underline px-2 py-1 font-semibold"
          >
            <span>Freejolitos 🫘</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
