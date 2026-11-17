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
  'LOADING KNOWLEDGE VAULT: Freejolitos · GameDev · CNNN · La Comuna 420 · weedtown.social...',
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

  // Duración total de la carga simulada. Se mide con el reloj (no con ticks de intervalo)
  // para que dure lo mismo en un teléfono lento que en escritorio.
  const BOOT_MS = 1600;

  useEffect(() => {
    cyberAudio.playBootGlitch();

    let frame = 0;
    let lastPct = -1;
    let lastChirp = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / BOOT_MS);
      // easeOutCubic: arranca rápido y se asienta al final
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.round(eased * 100);

      if (pct !== lastPct) {
        lastPct = pct;
        setProgress(pct);
        setCurrentLogIndex(Math.min(BOOT_LOGS.length - 1, Math.floor((pct / 100) * BOOT_LOGS.length)));
        if (now - lastChirp > 160) {
          lastChirp = now;
          cyberAudio.playTypingChirp();
        }
      }

      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    // Si la pestaña está en segundo plano rAF se pausa: este respaldo garantiza que el arranque termine.
    const respaldo = window.setTimeout(() => setProgress(100), BOOT_MS + 600);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(respaldo);
    };
  }, []);

  // Al llegar a 100% se abre el corte diagonal tras una pausa breve
  useEffect(() => {
    if (progress >= 100 && !isFinishing) {
      const timer = setTimeout(() => {
        triggerCyberSliceExit();
      }, 180);
      return () => clearTimeout(timer);
    }
  }, [progress, isFinishing]);

  const triggerCyberSliceExit = () => {
    if (isFinishing) return;
    setIsFinishing(true);
    try {
      sessionStorage.setItem('hlm_boot_visto', '1');
    } catch {
      /* almacenamiento bloqueado: el arranque simplemente se repetirá */
    }

    cyberAudio.playShurikenWhoosh();
    cyberAudio.playHoloRepaint(1.2);

    let terminado = false;
    const terminar = () => {
      if (terminado) return;
      terminado = true;
      onBootComplete();
    };
    // Respaldo: si la animación no corre (pestaña en segundo plano, rAF pausado), igual se entra al sitio
    window.setTimeout(terminar, 1200);

    const tl = gsap.timeline({ onComplete: terminar });

    // Content smooth fade & slight scale
    if (contentRef.current) {
      tl.to(contentRef.current, {
        scale: 1.02,
        opacity: 0,
        duration: 0.3,
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
          duration: 0.55,
          ease: 'power2.inOut',
        },
        '-=0.15'
      );
      tl.to(
        bottomSliceRef.current,
        {
          x: '105%',
          opacity: 0,
          duration: 0.55,
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
          duration: 0.2,
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
      role="status"
      aria-label="Cargando hugolemoy.ninja"
      className="hlm-boot-overlay fixed inset-0 z-50 overflow-hidden bg-cyber-void flex items-center justify-center font-mono select-none"
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

          <div className="text-[11px] text-cyber-textMuted tracking-widest pt-1">
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
          <div className="flex items-center justify-between text-[11px] text-cyber-textMuted border-b border-cyber-border pb-1">
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

          <div className="flex justify-between text-[11px] text-cyber-textMuted">
            <span>MEM: 0x420FF89 // SHA256: 7F0A</span>
            <span>TLD: HUGOLMOY.NINJA</span>
          </div>
        </div>

        {/* Skip Dive Button */}
        <button
          onClick={handleSkip}
          className="hlm-tap group px-4 py-1.5 rounded-lg border border-cyber-border hover:border-ninja-crimson/70 bg-cyber-card/80 hover:bg-ninja-crimson/10 text-xs font-mono text-cyber-textMuted hover:text-white transition-all flex items-center gap-2"
        >
          <span>SALTAR GHOST DIVE</span>
          <FastForward className="w-3.5 h-3.5 text-ninja-crimson group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
