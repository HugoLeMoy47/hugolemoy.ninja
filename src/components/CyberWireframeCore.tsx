import React, { useEffect, useRef, useState } from 'react';
import { cyberAudio } from '../utils/cyberAudio';
import gsap from 'gsap';

interface WireframeCoreProps {
  accentColor?: 'cyan' | 'amber' | 'crimson';
  onCoreClick?: () => void;
  syncPercent?: number;
  size?: number;
  label?: string;
  isSpinningFast?: boolean;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const CyberWireframeCore: React.FC<WireframeCoreProps> = ({
  accentColor = 'crimson',
  onCoreClick,
  syncPercent = 100,
  size = 260,
  label = 'SHINOBI // GHOST KERNEL',
  isSpinningFast = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawProgressRef = useRef<{ value: number }>({ value: 1 });
  const angleZRef = useRef<number>(0);
  const [isRedrawing, setIsRedrawing] = useState(false);

  // Trigger smooth wireframe trace animation
  const startWireframeTrace = () => {
    setIsRedrawing(true);
    cyberAudio.playShurikenWhoosh();

    // Reset draw progress to 0 and animate gracefully to 1 over 1.4 seconds
    drawProgressRef.current.value = 0;
    gsap.to(drawProgressRef.current, {
      value: 1,
      duration: 1.4,
      ease: 'power2.out',
      onComplete: () => {
        setIsRedrawing(false);
      },
    });

    // Elegant 360-degree rotation ease over 1.4s
    gsap.to(angleZRef, {
      current: angleZRef.current + Math.PI * 2,
      duration: 1.4,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    // Initial mount trace
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
    canvas.width = size;
    canvas.height = size;

    // =========================================================================
    // 3D WIREFRAME SHURIKEN (4-POINT BEVELED NINJA STAR)
    // =========================================================================
    const rawVertices: Point3D[] = [];
    const edges: [number, number][] = [];

    const numPoints = 4;
    const rTip = 72;        // Tip radius
    const rValley = 24;     // Inner valley radius
    const rHole = 12;       // Center hole radius
    const bevelZ = 14;      // 3D extrusion height

    // Perimeter vertices at Z = 0 (8 points: 4 tips alternating with 4 valleys)
    // Indices 0..7
    for (let i = 0; i < numPoints * 2; i++) {
      const angle = (i * Math.PI) / numPoints;
      const r = i % 2 === 0 ? rTip : rValley;
      rawVertices.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r,
        z: 0,
      });
    }

    // Outer perimeter edges
    for (let i = 0; i < 8; i++) {
      edges.push([i, (i + 1) % 8]);
    }

    // Central Top and Bottom Apex nodes for blade beveling
    // Top apex: index 8
    rawVertices.push({ x: 0, y: 0, z: bevelZ });
    // Bottom apex: index 9
    rawVertices.push({ x: 0, y: 0, z: -bevelZ });

    // Connect Top Apex (8) and Bottom Apex (9) to all tips and valleys
    for (let i = 0; i < 8; i++) {
      edges.push([8, i]);
      edges.push([9, i]);
    }

    // Inner Central Hole (Octagon ring at Z = 4 and Z = -4)
    // Indices 10..17 (Top ring) and 18..25 (Bottom ring)
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      rawVertices.push({
        x: Math.cos(angle) * rHole,
        y: Math.sin(angle) * rHole,
        z: 4,
      });
    }
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      rawVertices.push({
        x: Math.cos(angle) * rHole,
        y: Math.sin(angle) * rHole,
        z: -4,
      });
    }

    // Ring perimeter edges
    for (let i = 0; i < 8; i++) {
      edges.push([10 + i, 10 + ((i + 1) % 8)]);
      edges.push([18 + i, 18 + ((i + 1) % 8)]);
      edges.push([10 + i, 18 + i]); // Vertical struts
    }

    let angleX = 0.2;
    let angleY = 0;
    let targetAngleX = 0.2;
    let targetAngleY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      targetAngleY = (x / rect.width) * 1.1;
      targetAngleX = (-y / rect.height) * 1.1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Smooth, slow, majestic rotation dynamics (approx 4x slower so facets can be admired)
      angleX += (targetAngleX - angleX) * 0.04;
      angleY += (targetAngleY - angleY) * 0.04 + 0.003;
      angleZRef.current += isSpinningFast ? 0.015 : 0.0035;

      const angleZ = angleZRef.current;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Project vertices to 2D
      const projected = rawVertices.map((v) => {
        // Rotate Z (spin around star plane)
        const xz = v.x * cosZ - v.y * sinZ;
        const yz = v.x * sinZ + v.y * cosZ;
        const zz = v.z;

        // Rotate Y (yaw)
        const x1 = xz * cosY + zz * sinY;
        const z1 = -xz * sinY + zz * cosY;

        // Rotate X (pitch)
        const y2 = yz * cosX - z1 * sinX;
        const z2 = yz * sinX + z1 * cosX;

        // Perspective projection
        const fov = 240;
        const pz = z2 + 220;
        const scale = fov / pz;
        const x2D = x1 * scale + size / 2;
        const y2D = y2 * scale + size / 2;

        return { x: x2D, y: y2D, z: z2, scale };
      });

      // Palette
      let mainStroke = 'rgba(0, 240, 255, 0.45)';
      let apexStroke = 'rgba(255, 0, 85, 0.7)';
      let dotColor = '#00f0ff';

      if (accentColor === 'crimson') {
        mainStroke = 'rgba(255, 0, 85, 0.45)';
        apexStroke = 'rgba(0, 240, 255, 0.75)';
        dotColor = '#ff0055';
      } else if (accentColor === 'amber') {
        mainStroke = 'rgba(245, 158, 11, 0.45)';
        apexStroke = 'rgba(255, 0, 85, 0.75)';
        dotColor = '#fbbf24';
      }

      const drawFactor = Math.min(1, Math.max(0, drawProgressRef.current.value));

      // Draw wireframe edges with visible line tracing
      ctx.lineWidth = 1.3;
      edges.forEach(([i, j], edgeIdx) => {
        const p1 = projected[i];
        const p2 = projected[j];

        // Stagger edge drawing so inner core draws first, then blades extend outward
        const edgeStartThreshold = (edgeIdx / edges.length) * 0.4;
        const localFactor = Math.max(0, Math.min(1, (drawFactor - edgeStartThreshold) / (1 - edgeStartThreshold)));

        if (localFactor <= 0) return;

        // Highlight blade ridges
        if (i === 8 || i === 9 || j === 8 || j === 9) {
          ctx.strokeStyle = apexStroke;
        } else {
          ctx.strokeStyle = mainStroke;
        }

        const currentX2 = p1.x + (p2.x - p1.x) * localFactor;
        const currentY2 = p1.y + (p2.y - p1.y) * localFactor;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(currentX2, currentY2);
        ctx.stroke();
      });

      // Draw vertex nodes once line reaches them
      if (drawFactor > 0.4) {
        const nodeAlpha = Math.min(1, (drawFactor - 0.4) / 0.6);
        projected.forEach((p, idx) => {
          const isApex = idx === 8 || idx === 9;
          const isTip = idx === 0 || idx === 2 || idx === 4 || idx === 6;
          
          ctx.fillStyle = isApex ? '#ffffff' : isTip ? '#ff0055' : dotColor;
          ctx.globalAlpha = nodeAlpha;
          const nodeSize = Math.max(1.5, p.scale * (isTip ? 2.5 : isApex ? 2.2 : 1.8));

          ctx.beginPath();
          ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      // Subtle Outer Telemetry Reticle
      ctx.strokeStyle = 'rgba(255, 0, 85, 0.2)';
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
  }, [accentColor, size, isSpinningFast]);

  const handleClick = () => {
    startWireframeTrace();
    if (onCoreClick) {
      onCoreClick();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-cyber-void/85 border border-ninja-crimson/40 hover:border-ninja-crimson hover:box-glow-crimson transition-all cursor-pointer group select-none"
      title="3D Cyber-Shuriken // Haz clic para ver cómo se redibujan los vectores"
    >
      {/* Top Telemetry Header */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-ninja-crimson font-bold flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full bg-ninja-crimson ${isRedrawing ? 'animate-ping' : 'animate-pulse'}`}></span>
        <span>忍 [SHINOBI_3D]</span>
      </div>

      <div className="absolute top-2 right-2 text-[9px] font-mono text-gits-cyan">
        <span>{isRedrawing ? 'REDIBUJANDO...' : `SYNC: ${syncPercent}%`}</span>
      </div>

      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing drop-shadow-[0_0_25px_rgba(255,0,85,0.25)]" />

      {/* Bottom Telemetry Footer */}
      <div className="absolute bottom-2 text-center font-mono">
        <span className="text-xs font-bold text-white tracking-widest block group-hover:text-ninja-crimson transition-colors">
          {label}
        </span>
        <span className="text-[10px] text-cyber-textMuted group-hover:text-gits-cyan transition-colors">
          [Clic: Redibujar Vectores 3D]
        </span>
      </div>
    </div>
  );
};
