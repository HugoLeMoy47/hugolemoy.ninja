import React, { useState, useEffect, useRef } from 'react';
import { CyberWireframeCore } from './CyberWireframeCore';
import { cyberAudio } from '../utils/cyberAudio';
import gsap from 'gsap';
import { FastForward, Terminal } from 'lucide-react';

interface CyberBootLoaderProps {
  onBootComplete: () => void;
}

const BOOT_LOGS = [
  'BIOS // NEURAL INTERFACE ONLINE (hugolemoy.ninja)',
  'INITIALIZING GHOST_DIVE PROTOCOLS [SEC-09]...',
  'ALLOCATING DUAL-CORE AI OPERATOR (2501 / HLM)... [OK]',
  'SYNCHRONIZING 3D SHINOBI SHURIKEN TELEMETRY... [OK]',
  'LOADING KNOWLEDGE VAULT: Freejolitos · GameDev · CNNN · Comuna 42...',
  'CALIBRATING HOLOGRAPHIC PROJECTION STAGE... [OK]',
  'GHOST DIVE COMPLETE // ACCESS GRANTED.',
];

export const CyberBootLoader: React.FC<CyberBootLoaderProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const topSliceRef = useRef<HTMLDivElement | null>(null);
  const bottomSliceRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isFinishing, setIsFinishing] = useState(false);

  useEffect(() => {
    // Play subtle boot sound arpeggio
    cyberAudio.playBootGlitch();

    // Progress interval (reaches 100% in ~3.2s, giving time to read logs and appreciate the shuriken)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 4) + 2;
        const next = Math.min(100, prev + step);
        
        // Advance log lines proportionally
        const logIdx = Math.min(BOOT_LOGS.length - 1, Math.floor((next / 100) * BOOT_LOGS.length));
        setCurrentLogIndex(logIdx);
        
        if (Math.random() > 0.45) {
          cyberAudio.playTypingChirp();
        }

        return next;
      });
    }, 95);

    return () => clearInterval(interval);
  }, []);

  // When progress hits 100%, trigger slice exit after brief pause
  useEffect(() => {
    if (progress >= 100 && !isFinishing) {
      const timer = setTimeout(() => {
        triggerCyberSliceExit();
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, isFinishing]);

  const triggerCyberSliceExit = () => {
    if (isFinishing) return;
    setIsFinishing(true);

    cyberAudio.playShurikenWhoosh();
    cyberAudio.playHoloRepaint(1.2);

    const tl = gsap.timeline({
      onComplete: () => {
        onBootComplete();
      },
    });

    // Content smooth fade & slight scale
    if (contentRef.current) {
      tl.to(contentRef.current, {
        scale: 1.02,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }

    // Split slice diagonal transition (0.85s smooth slide)
    if (topSliceRef.current && bottomSliceRef.current) {
      tl.to(
        topSliceRef.current,
        {
          x: '-105%',
          opacity: 0,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        '-=0.2'
      );
      tl.to(
        bottomSliceRef.current,
        {
          x: '105%',
          opacity: 0,
          duration: 0.85,
          ease: 'power2.inOut',
        },
        '<'
      );
    }

    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.3,
          ease: 'none',
        },
        '-=0.2'
      );
    }
  };

  const handleSkip = () => {
    triggerCyberSliceExit();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 overflow-hidden bg-cyber-void flex items-center justify-center font-mono select-none"
    >
      {/* Background Slices for GSAP Cyber-Katana diagonal split */}
      <div
        ref={topSliceRef}
        className="absolute inset-0 bg-cyber-void border-b-2 border-ninja-crimson/80 shadow-[0_0_30px_rgba(255,0,85,0.4)] pointer-events-none"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 55%)',
        }}
      />
      <div
        ref={bottomSliceRef}
        className="absolute inset-0 bg-cyber-void border-t-2 border-gits-cyan/80 shadow-[0_0_30px_rgba(0,240,255,0.4)] pointer-events-none"
        style={{
          clipPath: 'polygon(0 55%, 100% 50%, 100% 100%, 0 100%)',
        }}
      />

      {/* Subtle Matrix Scanlines */}
      <div className="absolute inset-0 scanlines-overlay opacity-70 pointer-events-none z-10" />

      {/* Main Boot Visual Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-lg mx-auto p-6 flex flex-col items-center text-center space-y-6"
      >
        {/* Top Kanji Crest & Status */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ninja-crimson/15 border border-ninja-crimson/50 text-ninja-crimson text-xs font-bold tracking-widest box-glow-crimson">
            <span className="text-base font-serif">忍</span>
            <span>GHOST_DIVE // INICIALIZANDO</span>
          </div>

          <div className="text-[10px] text-cyber-textMuted tracking-widest pt-1">
            CONSTRUCTO VIRTUAL: <span className="text-gits-cyan font-bold">HUGOSYSTEM_OS</span>
          </div>
        </div>

        {/* 3D Wireframe Shuriken Spinning fast */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-full bg-radial from-ninja-crimson/20 via-transparent to-transparent blur-xl pointer-events-none" />
          <CyberWireframeCore
            size={220}
            accentColor="crimson"
            syncPercent={progress}
            label="SHURIKEN // GHOST LINK"
            isSpinningFast={false}
          />
        </div>

        {/* Telemetry Log Feed */}
        <div className="w-full bg-cyber-card/90 border border-cyber-border rounded-lg p-3 text-left space-y-1.5 shadow-xl">
          <div className="flex items-center justify-between text-[10px] text-cyber-textMuted border-b border-cyber-border pb-1">
            <div className="flex items-center gap-1.5 text-gits-cyan font-bold">
              <Terminal className="w-3 h-3" />
              <span>TERMINAL TELEMETRÍA</span>
            </div>
            <span className="text-matrix-green">STATUS: 200_OK</span>
          </div>

          <div className="h-14 overflow-hidden flex flex-col justify-end text-[11px]">
            <p className="text-cyber-textMuted truncate">
              {BOOT_LOGS[Math.max(0, currentLogIndex - 1)]}
            </p>
            <p className="text-white font-bold truncate flex items-center gap-1">
              <span className="text-ninja-crimson">❯</span>
              <span>{BOOT_LOGS[currentLogIndex]}</span>
              <span className="inline-block w-1.5 h-3 bg-gits-cyan animate-pulse" />
            </p>
          </div>
        </div>

        {/* Progress Bar & Checksum */}
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-gits-cyan">CARGANDO RECURSOS</span>
            <span className="text-ninja-crimson font-mono text-sm tracking-wider">{progress}%</span>
          </div>

          <div className="h-2 w-full bg-cyber-card rounded-full overflow-hidden border border-cyber-border p-0.5">
            <div
              className="h-full bg-gradient-to-r from-ninja-crimson via-purple-600 to-gits-cyan rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(255,0,85,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between text-[9px] text-cyber-textMuted">
            <span>MEM: 0x420FF89 // SHA256: 7F0A</span>
            <span>TLD: HUGOLMOY.NINJA</span>
          </div>
        </div>

        {/* Skip Dive Button */}
        <button
          onClick={handleSkip}
          className="group px-4 py-1.5 rounded-lg border border-cyber-border hover:border-ninja-crimson/70 bg-cyber-card/80 hover:bg-ninja-crimson/10 text-xs font-mono text-cyber-textMuted hover:text-white transition-all flex items-center gap-2"
        >
          <span>SALTAR GHOST DIVE</span>
          <FastForward className="w-3.5 h-3.5 text-ninja-crimson group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
