/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          void: '#06090e',
          card: '#0b1017',
          cardHover: '#111824',
          border: '#182436',
          borderGlow: '#00f0ff',
          textMuted: '#64748b',
          textBright: '#e2e8f0',
        },
        ninja: {
          crimson: '#ff0055',
          vermilion: '#ff2a5f',
          dark: '#3d0014',
          glow: 'rgba(255, 0, 85, 0.45)',
        },
        gits: {
          cyan: '#00f0ff',
          dim: '#0099b8',
          dark: '#002533',
          glow: 'rgba(0, 240, 255, 0.45)',
        },
        amberGold: {
          DEFAULT: '#f59e0b',
          glow: 'rgba(245, 158, 11, 0.4)',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', '"Courier New"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'ninja-spin': 'ninjaSpin 12s linear infinite',
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
        },
        ninjaSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
};
