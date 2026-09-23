/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          void: '#05080c',
          card: '#0a0f18',
          cardHover: '#0e1724',
          border: '#1a273a',
          borderGlow: '#00f0ff',
          textMuted: '#64748b',
          textBright: '#e2e8f0',
        },
        matrix: {
          green: '#00ff66',
          dim: '#00aa44',
          dark: '#003314',
          glow: 'rgba(0, 255, 102, 0.4)',
        },
        gits: {
          cyan: '#00f0ff',
          dim: '#0099b8',
          dark: '#002533',
          glow: 'rgba(0, 240, 255, 0.4)',
        },
        amberGold: {
          DEFAULT: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.4)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
};
