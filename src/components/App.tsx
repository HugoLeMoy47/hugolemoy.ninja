import React, { useState } from 'react';
import { CyberHeader } from './CyberHeader';
import { CyberMatrixRain } from './CyberMatrixRain';
import { CyberJourney } from './CyberJourney';
import { CyberTerminalModal } from './CyberTerminalModal';

export const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'journey' | 'expedition'>('journey');
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'journey' ? 'expedition' : 'journey'));
  };

  return (
    <div className="relative min-h-screen bg-cyber-void text-cyber-textBright overflow-hidden flex flex-col justify-between">
      
      {/* Background Matrix/GitS Rain */}
      <CyberMatrixRain opacity={0.18} />

      {/* Top HUD Telemetry Navigation */}
      <CyberHeader
        onOpenTerminal={() => setIsTerminalOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={toggleViewMode}
      />

      {/* Main Interactive Journey Area */}
      <main className="flex-1 pb-16">
        <CyberJourney 
          viewMode={viewMode} 
          onSetViewMode={(mode) => setViewMode(mode === 'expedition' ? 'expedition' : 'journey')} 
        />
      </main>

      {/* Terminal Modal for AI & Hacker Interaction */}
      <CyberTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      {/* Cyber Footer */}
      <footer className="relative z-10 border-t border-cyber-border/80 bg-cyber-void/90 py-6 px-4 font-mono text-xs text-cyber-textMuted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-matrix-green">■</span>
            <span>hugolemoy.ninja // CONSTRUCTO MULTIDIMENSIONAL</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a href="https://github.com/HugoLeMoy47" target="_blank" rel="noopener noreferrer" className="hover:text-gits-cyan">
              GitHub
            </a>
            <a href="https://linkedin.com/in/hugolegorretamoysen" target="_blank" rel="noopener noreferrer" className="hover:text-gits-cyan">
              LinkedIn
            </a>
            <a href="https://freejolitos.consulting" target="_blank" rel="noopener noreferrer" className="text-amberGold hover:underline">
              Freejolitos
            </a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-matrix-green hover:underline">
              /llms.txt
            </a>
          </div>
          <div className="text-[10px] text-cyber-textMuted/60">
            Hosted on Cloudflare Pages · AI & Human Friendly
          </div>
        </div>
      </footer>

    </div>
  );
};
