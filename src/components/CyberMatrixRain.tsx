import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  opacity?: number;
  theme?: 'light' | 'dark';
}

export const CyberMatrixRain: React.FC<MatrixRainProps> = ({ opacity = 1, theme = 'dark' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // Characters: Katakana, Kanji (Shinobi, Jutsu, Ghost, Net, Cyber), Numbers, and Hex
    const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン忍術魂電影道網鬼0123456789ABCDEFλΨ420';
    // En pantallas chicas: glifos más grandes = menos columnas = menos trabajo por cuadro
    let fontSize = window.innerWidth < 640 ? 18 : 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    const initDrops = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      fontSize = width < 640 ? 18 : 14;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    initDrops();

    // Solo se reinicia si cambia el ancho: en móvil la barra del navegador cambia el alto al desplazarse
    let lastW = window.innerWidth;
    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth !== lastW) {
          lastW = window.innerWidth;
          initDrops();
        }
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const isDark = theme === 'dark';
    const spotRadius = 240;
    const spotRadiusSq = spotRadius * spotRadius;

    // ~30 cuadros por segundo: el efecto de lluvia se ve igual y cuesta la mitad
    const FRAME_MS = 1000 / 30;
    let lastFrame = 0;

    const render = (now: number = performance.now()) => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      if (now - lastFrame < FRAME_MS) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;
      // Clear with background fade: obsidian in dark mode, washi paper in light mode
      ctx.fillStyle = isDark ? 'rgba(6, 9, 14, 0.14)' : 'rgba(250, 250, 250, 0.16)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mActive = mouseRef.current.active;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Proximity calculation relative to cursor
        let proximity = 0;
        if (mActive) {
          const dx = x - mx;
          const dy = y - my;
          const distSq = dx * dx + dy * dy;
          if (distSq < spotRadiusSq) {
            proximity = 1 - Math.sqrt(distSq) / spotRadius;
          }
        }

        const rand = Math.random();

        if (isDark) {
          // Neo-Tokyo Chromatic Distribution (Dark mode):
          // Ambient base alpha is ~0.15, boosted up to 0.95 in mouse spotlight
          const baseAlpha = 0.16 + proximity * 0.78;

          if (proximity > 0.35) {
            // Hot aura around mouse: bright electric neon
            if (rand > 0.80) {
              ctx.fillStyle = `rgba(255, 0, 85, ${Math.min(baseAlpha + 0.1, 1)})`; // Vivid Crimson
            } else if (rand > 0.30) {
              ctx.fillStyle = `rgba(0, 240, 255, ${Math.min(baseAlpha + 0.1, 1)})`; // Electric Cyan
            } else {
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(baseAlpha + 0.15, 1)})`; // Flash White
            }
          } else {
            // Ambient faint background
            if (rand > 0.90) {
              ctx.fillStyle = `rgba(255, 0, 85, ${baseAlpha})`;
            } else if (rand > 0.50) {
              ctx.fillStyle = `rgba(0, 240, 255, ${baseAlpha})`;
            } else if (rand > 0.35) {
              ctx.fillStyle = `rgba(255, 255, 255, ${baseAlpha})`;
            } else {
              ctx.fillStyle = `rgba(0, 160, 200, ${baseAlpha * 0.7})`;
            }
          }
        } else {
          // Sumi-e Japanese Ink on Washi Paper Distribution (Light mode):
          // Ambient base alpha is ~0.14, boosted up to 0.90 in mouse spotlight
          const baseAlpha = 0.15 + proximity * 0.75;

          if (proximity > 0.35) {
            // Near cursor: deep dense carbon calligraphy ink
            if (rand > 0.85) {
              ctx.fillStyle = `rgba(220, 38, 38, ${Math.min(baseAlpha + 0.1, 1)})`; // Vermilion seal
            } else if (rand > 0.30) {
              ctx.fillStyle = `rgba(15, 23, 42, ${Math.min(baseAlpha + 0.1, 1)})`; // Deep sumi ink
            } else {
              ctx.fillStyle = `rgba(2, 132, 199, ${Math.min(baseAlpha + 0.1, 1)})`; // Indigo accent
            }
          } else {
            // Ambient faint graphite
            if (rand > 0.90) {
              ctx.fillStyle = `rgba(220, 38, 38, ${baseAlpha})`;
            } else if (rand > 0.45) {
              ctx.fillStyle = `rgba(15, 23, 42, ${baseAlpha})`;
            } else if (rand > 0.30) {
              ctx.fillStyle = `rgba(2, 132, 199, ${baseAlpha})`;
            } else {
              ctx.fillStyle = `rgba(100, 116, 139, ${baseAlpha * 0.6})`;
            }
          }
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (reducido) {
      // Movimiento reducido: un solo cuadro estático con la textura de fondo
      for (let k = 0; k < 40; k++) {
        lastFrame = -Infinity;
        render();
        cancelAnimationFrame(animationFrameId);
      }
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
