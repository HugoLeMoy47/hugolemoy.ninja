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

    // Characters: Katakana, Kanji (Shinobi, Jutsu, Ghost, Net, Cyber), Numbers, and Hex
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン忍術魂電影道網鬼0123456789ABCDEFλΨ420';
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
      ctx.fillStyle = 'rgba(6, 9, 14, 0.09)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Neo-Tokyo Chromatic Distribution:
        // - 10%: Ninja Crimson / Vermilion (#ff0055)
        // - 40%: GitS Cyan (#00f0ff)
        // - 15%: Ghost White phosphor (#ffffff)
        // - 35%: Deep cyber slate cyan (#006680)
        const rand = Math.random();
        if (rand > 0.90) {
          ctx.fillStyle = '#ff0055'; // Ninja Crimson
        } else if (rand > 0.50) {
          ctx.fillStyle = '#00f0ff'; // GitS Cyan
        } else if (rand > 0.35) {
          ctx.fillStyle = '#ffffff'; // Ghost White
        } else {
          ctx.fillStyle = 'rgba(0, 160, 200, 0.45)'; // Dim Cyber Cyan tail
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
