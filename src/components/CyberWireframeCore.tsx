import React, { useEffect, useRef, useState } from 'react';
import { cyberAudio } from '../utils/cyberAudio';
import gsap from 'gsap';

import { GEOMETRIES, SHAPE_ORDER, type GeometryData, type WireframeShapeId } from './glyphGeometry';

export type { WireframeShapeId };

interface WireframeCoreProps {
  accentColor?: 'cyan' | 'amber' | 'crimson';
  onCoreClick?: () => void;
  syncPercent?: number;
  size?: number;
  label?: string;
  isSpinningFast?: boolean;
  theme?: 'light' | 'dark';
  initialShape?: WireframeShapeId;
}

export const CyberWireframeCore: React.FC<WireframeCoreProps> = ({
  accentColor = 'crimson',
  onCoreClick,
  syncPercent = 100,
  size = 260,
  label,
  isSpinningFast = false,
  theme = 'dark',
  initialShape,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawProgressRef = useRef<{ value: number }>({ value: 1 });
  const angleZRef = useRef<number>(0);
  const [isRedrawing, setIsRedrawing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // El servidor y el navegador deben pintar la misma figura al hidratar (si no, React
  // lanza el error #418 y regenera el árbol). El azar se aplica ya montado el componente.
  const tieneInicial = !!initialShape && SHAPE_ORDER.includes(initialShape);
  const [activeShapeId, setActiveShapeId] = useState<WireframeShapeId>(
    tieneInicial ? (initialShape as WireframeShapeId) : SHAPE_ORDER[0]
  );

  const geoDataRef = useRef<GeometryData>(GEOMETRIES[activeShapeId]());

  useEffect(() => {
    if (tieneInicial) return;
    const azar = SHAPE_ORDER[Math.floor(Math.random() * SHAPE_ORDER.length)];
    setActiveShapeId(azar);
    geoDataRef.current = GEOMETRIES[azar]();
  }, []);

  // Listen for terminal CLI event to change shape
  useEffect(() => {
    const handleGlyphEvent = (e: Event) => {
      const customEvent = e as CustomEvent<WireframeShapeId>;
      if (customEvent.detail && SHAPE_ORDER.includes(customEvent.detail)) {
        changeShape(customEvent.detail);
      }
    };
    window.addEventListener('hlm:set-glyph', handleGlyphEvent);
    return () => window.removeEventListener('hlm:set-glyph', handleGlyphEvent);
  }, []);

  const changeShape = (nextId: WireframeShapeId) => {
    setActiveShapeId(nextId);
    geoDataRef.current = GEOMETRIES[nextId]();
    startWireframeTrace();
  };

  const cycleNextShape = () => {
    const idx = SHAPE_ORDER.indexOf(activeShapeId);
    const nextIdx = (idx + 1) % SHAPE_ORDER.length;
    changeShape(SHAPE_ORDER[nextIdx]);
  };

  // Trigger smooth wireframe trace animation
  const startWireframeTrace = () => {
    setIsRedrawing(true);
    cyberAudio.playShurikenWhoosh();

    drawProgressRef.current.value = 0;
    gsap.to(drawProgressRef.current, {
      value: 1,
      duration: 1.4,
      ease: 'power2.out',
      onComplete: () => {
        setIsRedrawing(false);
      },
    });

    if (geoDataRef.current.rotationMode !== 'upright') {
      gsap.to(angleZRef, {
        current: angleZRef.current + Math.PI * 2,
        duration: 1.4,
        ease: 'power2.out',
      });
    }
  };

  useEffect(() => {
    drawProgressRef.current.value = 0;
    gsap.to(drawProgressRef.current, {
      value: 1,
      duration: 1.6,
      ease: 'power2.out',
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let angleX = 0.22;
    let angleY = 0;
    let targetAngleX = 0.22;
    let targetAngleY = 0;
    let swayPhase = Math.random() * Math.PI * 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const multiplier = isHovered ? 1.2 : 0.35;
      // Limitado para que la figura nunca quede de canto ni de espaldas por el cursor
      targetAngleY = Math.max(-0.45, Math.min(0.45, (x / rect.width) * multiplier));
      targetAngleX = 0.22 + Math.max(-0.4, Math.min(0.4, (y / rect.height) * multiplier));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const FOV = 260;
    const CAM = 240;
    // Bandas de profundidad: cerca = trazo pleno, lejos = tenue (lectura 3D inmediata)
    const BANDS = 4;
    const paths: Path2D[][] = [];

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      const { vertices, edges, edgeKinds, tipIndices, apexIndices, rotationMode } = geoDataRef.current;

      const lerp = isHovered ? 0.1 : 0.05;
      angleX += (targetAngleX - angleX) * lerp;
      const vel = reducido ? 0 : 1;

      if (rotationMode === 'upright') {
        // Vaivén tipo talismán: oscila ±25° y siempre vuelve de frente; el total nunca pasa de ±43°
        swayPhase += (isHovered ? 0.006 : 0.012) * vel;
        const sway = Math.sin(swayPhase) * 0.44;
        const objetivo = Math.max(-0.75, Math.min(0.75, sway + targetAngleY));
        angleY += (objetivo - angleY) * lerp;
        angleZRef.current = Math.sin(swayPhase * 1.7) * 0.03;
      } else {
        // Shuriken: giro continuo en su plano con ligera inclinación
        swayPhase += 0.008 * vel;
        angleY += (Math.sin(swayPhase) * 0.45 + targetAngleY - angleY) * lerp;
        angleZRef.current -= (isSpinningFast ? 0.03 : isHovered ? 0.012 : 0.006) * vel;
      }

      const angleZ = angleZRef.current;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      const projected = vertices.map((v) => {
        const xz = v.x * cosZ - v.y * sinZ;
        const yz = v.x * sinZ + v.y * cosZ;
        const zz = v.z;
        const x1 = xz * cosY + zz * sinY;
        const z1 = -xz * sinY + zz * cosY;
        const y2 = yz * cosX - z1 * sinX;
        const z2 = yz * sinX + z1 * cosX;
        // z2 > 0 = hacia el espectador
        const scale = FOV / (CAM - z2);
        // La geometría tiene Y hacia arriba; el canvas, hacia abajo: se invierte aquí
        return { x: x1 * scale + size / 2, y: -y2 * scale + size / 2, z: z2, scale };
      });

      const isDark = theme === 'dark';
      let main: [number, number, number] = isDark ? [0, 240, 255] : [15, 23, 42];
      let accent: [number, number, number] = isDark ? [255, 0, 85] : [220, 38, 38];

      if (accentColor === 'crimson') {
        main = isDark ? [255, 0, 85] : [220, 38, 38];
        accent = isDark ? [0, 240, 255] : [15, 23, 42];
      } else if (accentColor === 'amber') {
        main = isDark ? [245, 158, 11] : [217, 119, 6];
        accent = isDark ? [255, 0, 85] : [220, 38, 38];
      }

      const progress = drawProgressRef.current.value;
      const visibleEdgesCount = Math.floor(edges.length * progress);

      // Se agrupan las aristas por tipo y banda de profundidad: pocas llamadas a stroke()
      for (let k = 0; k < 3; k++) {
        paths[k] = [];
        for (let bnd = 0; bnd < BANDS; bnd++) paths[k][bnd] = new Path2D();
      }
      for (let i = 0; i < visibleEdgesCount; i++) {
        const [a, b2] = edges[i];
        const pA = projected[a];
        const pB = projected[b2];
        if (!pA || !pB) continue;
        const zm = (pA.z + pB.z) / 2;
        const t = Math.max(0, Math.min(0.999, (zm + 80) / 160)); // 0 = lejos, 1 = cerca
        const band = Math.floor(t * BANDS);
        const path = paths[edgeKinds[i] ?? 0][band];
        path.moveTo(pA.x, pA.y);
        path.lineTo(pB.x, pB.y);
      }

      const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (let bnd = 0; bnd < BANDS; bnd++) {
        const near = (bnd + 0.5) / BANDS; // 0..1
        const fade = 0.22 + near * 0.78;
        // Estructura (silueta y cara trasera)
        ctx.strokeStyle = rgba(main, (isDark ? 0.62 : 0.7) * fade);
        ctx.lineWidth = 0.9 + near * 0.5;
        ctx.stroke(paths[0][bnd]);
        // Aristas de profundidad: más finas
        ctx.strokeStyle = rgba(main, (isDark ? 0.38 : 0.45) * fade);
        ctx.lineWidth = 0.7;
        ctx.stroke(paths[2][bnd]);
        // Cara frontal en color de acento, con resplandor solo en lo más cercano
        ctx.strokeStyle = rgba(accent, (isDark ? 0.85 : 0.9) * fade);
        ctx.lineWidth = 1 + near * 0.6;
        if (isDark && bnd === BANDS - 1) {
          ctx.shadowColor = rgba(accent, 0.6);
          ctx.shadowBlur = 6;
        }
        ctx.stroke(paths[1][bnd]);
        ctx.shadowBlur = 0;
      }

      // Puntos solo en puntas y ápices (los vértices intermedios se leen en las líneas)
      if (progress > 0.05) {
        ctx.globalAlpha = Math.min(1, progress * 1.5);
        const drawDot = (idx: number, color: string, r: number) => {
          const p = projected[idx];
          if (!p) return;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1.4, p.scale * r), 0, Math.PI * 2);
          ctx.fill();
        };
        tipIndices.forEach((i) => drawDot(i, isDark ? '#ff0055' : '#dc2626', 2.3));
        apexIndices.forEach((i) => drawDot(i, isDark ? '#ffffff' : '#0f172a', 1.9));
        ctx.globalAlpha = 1;
      }

      // Telemetry Ring
      ctx.strokeStyle = isDark ? 'rgba(255, 0, 85, 0.2)' : 'rgba(220, 38, 38, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 88, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [accentColor, size, isSpinningFast, theme, isHovered]);

  const handleClick = () => {
    cycleNextShape();
    if (onCoreClick) {
      onCoreClick();
    }
  };

  const currentGeo = geoDataRef.current;
  const displayLabel = label || currentGeo.name;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all cursor-pointer group select-none ${
        theme === 'light'
          ? 'bg-white/95 border border-slate-300 hover:border-red-600 shadow-md hover:shadow-lg'
          : 'bg-cyber-void/85 border border-ninja-crimson/40 hover:border-ninja-crimson hover:box-glow-crimson'
      }`}
      title={`${currentGeo.name} // Clic: Cambiar y redibujar glifo 3D`}
    >
      {/* Top Telemetry Header */}
      <div className="absolute top-2 left-2 text-[10px] font-mono text-ninja-crimson font-bold flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full bg-ninja-crimson ${isRedrawing ? 'animate-ping' : 'animate-pulse'}`}></span>
        <span>{currentGeo.kanji} [{activeShapeId.toUpperCase()}_3D]</span>
      </div>

      <div className={`absolute top-2 right-2 text-[10px] font-mono ${theme === 'light' ? 'text-sky-700' : 'text-gits-cyan'}`}>
        <span>{isRedrawing ? 'REDIBUJANDO...' : `SYNC: ${syncPercent}%`}</span>
      </div>

      {/* Halo behind canvas */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,0,85,0.18)_0%,transparent_70%)] pointer-events-none"
        />
        <canvas ref={canvasRef} className="relative block cursor-grab active:cursor-grabbing" />
      </div>

      {/* Bottom Telemetry Footer */}
      <div className="absolute bottom-2 text-center font-mono">
        <span className={`text-xs font-bold tracking-widest block transition-colors ${theme === 'light' ? 'text-slate-900 group-hover:text-red-600' : 'text-white group-hover:text-ninja-crimson'}`}>
          {displayLabel}
        </span>
        <span className={`text-[11px] transition-colors ${theme === 'light' ? 'text-slate-500 group-hover:text-slate-800' : 'text-cyber-textMuted group-hover:text-gits-cyan'}`}>
          [Clic: Ciclar Glifo 3D ({activeShapeId})]
        </span>
      </div>
    </div>
  );
};
