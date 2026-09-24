import React, { useState } from 'react';
import { CyberHeader } from './CyberHeader';
import { CyberMatrixRain } from './CyberMatrixRain';
import { CyberJourney } from './CyberJourney';
import { CyberOperatorPanel } from './CyberOperatorPanel';
import { CyberBootLoader } from './CyberBootLoader';
import { type OperatorPersona } from '../data/operatorPersonas';
import { Bot, Layers } from 'lucide-react';

export const App: React.FC = () => {
  const [currentPersona, setCurrentPersona] = useState<OperatorPersona>('PROJECT_2501');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [externalDimension, setExternalDimension] = useState<string | null>(null);
  const [mobileTab, setMobileTab] = useState<'operator' | 'viewport'>('viewport');
  const [isBooting, setIsBooting] = useState<boolean>(true);

  const handleNodeSelectFromViewport = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  };

  const handleTriggerDimensionFromCLI = (dimId: string) => {
    setExternalDimension(dimId);
    setMobileTab('viewport'); // Switch to viewport on mobile if dimension triggered
  };

  return (
    <div className="relative min-h-screen bg-cyber-void text-cyber-textBright overflow-x-hidden flex flex-col justify-between">
      
      {/* Cinematic Ghost Dive Boot Loader */}
      {isBooting && (
        <CyberBootLoader onBootComplete={() => setIsBooting(false)} />
      )}

      {/* Background Neo-Tokyo Cyber-Ninja Rain Canvas */}
      <CyberMatrixRain opacity={0.16} />

      {/* Top HUD Telemetry Navigation */}
      <CyberHeader
        currentPersona={currentPersona}
        onPersonaChange={setCurrentPersona}
        onReplayBoot={() => setIsBooting(true)}
      />

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden sticky top-14 z-30 bg-cyber-void/90 backdrop-blur-md px-4 py-2 border-b border-cyber-border font-mono text-xs flex gap-2">
        <button
          onClick={() => setMobileTab('viewport')}
          className={`flex-1 py-1.5 rounded border flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'viewport'
              ? 'bg-ninja-crimson/20 border-ninja-crimson text-white font-bold shadow-sm'
              : 'border-cyber-border text-cyber-textMuted'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>VIEWPORT (CONSTRUCTO)</span>
        </button>

        <button
          onClick={() => setMobileTab('operator')}
          className={`flex-1 py-1.5 rounded border flex items-center justify-center gap-1.5 transition-all ${
            mobileTab === 'operator'
              ? 'bg-gits-cyan/20 border-gits-cyan text-gits-cyan font-bold shadow-sm'
              : 'border-cyber-border text-cyber-textMuted'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>OPERADOR IA ({currentPersona === 'PROJECT_2501' ? '2501' : 'HLM'})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* CYBER-DECK SPLIT-SCREEN MAIN STAGE                                        */}
      {/* ========================================================================= */}
      <main className="relative z-10 flex-1 max-w-[1600px] w-full mx-auto p-3 sm:p-5 lg:p-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Panel: AI Operator Console (4.5 of 12 cols in Desktop) */}
          <div className={`lg:col-span-5 xl:col-span-4 ${mobileTab === 'operator' ? 'block' : 'hidden lg:block'} sticky lg:top-20`}>
            <CyberOperatorPanel
              currentPersona={currentPersona}
              onPersonaChange={setCurrentPersona}
              selectedNodeId={selectedNodeId}
              onTriggerDimensionSelect={handleTriggerDimensionFromCLI}
            />
          </div>

          {/* Right Panel: Holographic Viewport & Projection Stage (7.5 of 12 cols in Desktop) */}
          <div className={`lg:col-span-7 xl:col-span-8 ${mobileTab === 'viewport' ? 'block' : 'hidden lg:block'}`}>
            <CyberJourney
              currentPersona={currentPersona}
              onNodeSelectForOperator={handleNodeSelectFromViewport}
              externalDimension={externalDimension}
              activeNodeId={selectedNodeId}
            />
          </div>

        </div>

      </main>

      {/* Cyber Footer */}
      <footer className="relative z-10 border-t border-cyber-border/80 bg-cyber-void/90 py-5 px-4 font-mono text-xs text-cyber-textMuted">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-ninja-crimson">忍</span>
            <span>hugolemoy.ninja // CYBER-DECK v2026.09</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <a href="https://github.com/HugoLeMoy47" target="_blank" rel="noopener noreferrer" className="hover:text-gits-cyan">
              GitHub
            </a>
            <a href="https://linkedin.com/in/hugolegorretamoysen" target="_blank" rel="noopener noreferrer" className="hover:text-gits-cyan">
              LinkedIn
            </a>
            <a href="https://freejolitos.consulting" target="_blank" rel="noopener noreferrer" className="text-amberGold hover:underline">
              Freejolitos
            </a>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="text-gits-cyan hover:underline">
              /llms.txt (UTF-8)
            </a>
          </div>

          <div className="text-[10px] text-cyber-textMuted/60">
            Awwwards-grade Vanity Project · AI Operator & Holographic Projection Stage
          </div>
        </div>
      </footer>

    </div>
  );
};
