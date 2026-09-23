import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  opacity?: number;
}

export const CyberMatrixRain: React.FC<MatrixRainProps> = ({ opacity = 0.22 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Characters: Katakana, Cyrillic, Greek, Numbers, and Hugo Keywords
    const chars = '0123456789ABCDEF01λΩΨ420HLMNINJAFREEJOLITOSアイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = [];

    const initDrops = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    initDrops();

    const handleResize = () => {
      initDrops();
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Clear with dark cyber fade
      ctx.fillStyle = 'rgba(5, 8, 12, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Leading char is bright cyan/white, tail is matrix green
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#00f0ff'; // GitS Cyan
        } else if (Math.random() > 0.7) {
          ctx.fillStyle = '#ffffff'; // White phosphor
        } else {
          ctx.fillStyle = '#00ff66'; // Matrix Green
        }

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity }}
    />
  );
};
