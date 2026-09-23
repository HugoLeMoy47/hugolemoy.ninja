import React, { useEffect, useRef } from 'react';

interface WireframeCoreProps {
  accentColor?: 'cyan' | 'amber';
  onCoreClick?: () => void;
  syncPercent?: number;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const CyberWireframeCore: React.FC<WireframeCoreProps> = ({
  accentColor = 'cyan',
  onCoreClick,
  syncPercent = 100,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const size = 260;
    canvas.width = size;
    canvas.height = size;

    // Define 3D Polyhedron (Icosahedron vertices)
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices: Point3D[] = [
      { x: -1, y: phi, z: 0 },
      { x: 1, y: phi, z: 0 },
      { x: -1, y: -phi, z: 0 },
      { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi },
      { x: 0, y: 1, z: phi },
      { x: 0, y: -1, z: -phi },
      { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 },
      { x: phi, y: 0, z: 1 },
      { x: -phi, y: 0, z: -1 },
      { x: -phi, y: 0, z: 1 },
    ];

    // Normalize and scale vertices
    const radius = 68;
    const vertices: Point3D[] = rawVertices.map((v) => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
      return {
        x: (v.x / len) * radius,
        y: (v.y / len) * radius,
        z: (v.z / len) * radius,
      };
    });

    // Edges connecting vertices with distance < threshold
    const edges: [number, number][] = [];
    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        const dx = vertices[i].x - vertices[j].x;
        const dy = vertices[i].y - vertices[j].y;
        const dz = vertices[i].z - vertices[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < radius * 1.15) {
          edges.push([i, j]);
        }
      }
    }

    let angleX = 0;
    let angleY = 0;
    let targetAngleX = 0;
    let targetAngleY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      targetAngleY = (x / rect.width) * 1.5;
      targetAngleX = (-y / rect.height) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, size, size);

      // Smooth rotation toward mouse + continuous idle rotation
      angleX += (targetAngleX - angleX) * 0.05 + 0.004;
      angleY += (targetAngleY - angleY) * 0.05 + 0.007;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project vertices to 2D
      const projected = vertices.map((v) => {
        // Rotate Y
        const x1 = v.x * cosY + v.z * sinY;
        const z1 = -v.x * sinY + v.z * cosY;

        // Rotate X
        const y2 = v.y * cosX - z1 * sinX;
        const z2 = v.y * sinX + z1 * cosX;

        // Perspective
        const fov = 200;
        const pz = z2 + 200;
        const scale = fov / pz;
        const x2D = x1 * scale + size / 2;
        const y2D = y2 * scale + size / 2;

        return { x: x2D, y: y2D, z: z2, scale };
      });

      // Colors based on current accent
      const strokeColor = accentColor === 'amber' ? 'rgba(245, 158, 11, 0.45)' : 'rgba(0, 240, 255, 0.45)';
      const dotColor = accentColor === 'amber' ? '#fbbf24' : '#00ff66';

      // Draw wireframe edges
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = strokeColor;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw vertex nodes
      projected.forEach((p) => {
        const nodeSize = Math.max(1.5, p.scale * 2);
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Central core pulsing circle
      ctx.strokeStyle = accentColor === 'amber' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(0, 255, 102, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, 85 + Math.sin(Date.now() * 0.003) * 4, 0, Math.PI * 2);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [accentColor]);

  return (
    <div 
      onClick={onCoreClick}
      className="relative flex flex-col items-center justify-center p-3 rounded-xl bg-cyber-void/85 border border-cyber-border/80 hover:border-gits-cyan/50 transition-all cursor-pointer group"
      title="Núcleo 3D interactivo — Haz clic para reiniciar telemetría"
    >
      <div className="absolute top-2 left-2 text-[9px] font-mono text-cyber-textMuted/60 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-matrix-green animate-pulse"></span>
        <span>HOLO_CORE::3D</span>
      </div>

      <div className="absolute top-2 right-2 text-[9px] font-mono text-cyber-textMuted/60">
        <span>SYNC: {syncPercent}%</span>
      </div>

      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]" />

      <div className="absolute bottom-2 text-center font-mono">
        <span className="text-xs font-bold text-white tracking-widest block group-hover:text-gits-cyan transition-colors">
          HLM // GHOST KERNEL
        </span>
        <span className="text-[10px] text-cyber-textMuted">
          [Parallax 3D Activo]
        </span>
      </div>
    </div>
  );
};
