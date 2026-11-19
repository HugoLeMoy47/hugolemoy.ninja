import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://astro.build/config
export default defineConfig({
  site: 'https://hugolemoy.ninja',
  integrations: [react()],
  // Tailwind 3 por PostCSS, igual que hacía @astrojs/tailwind (que no soporta Astro 6+).
  // Sus estilos base no se inyectan: global.css ya trae @tailwind base.
  vite: {
    // Vite 8 apunta por omisión a navegadores de 2023 en adelante (p. ej. escribe @media (width>=640px),
    // que Safari < 16.4 ignora). Se conserva el objetivo de Vite 6 para no perder navegadores.
    // (Astro ya fija el nivel de ECMAScript; aquí solo van los navegadores.)
    build: { target: ['edge88', 'firefox78', 'chrome87', 'safari14'] },
    css: {
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
  },
  // Astro 7 cambió dos valores por omisión; se dejan los de Astro 5 para que el HTML salga igual.
  compressHTML: true,
  markdown: { processor: unified() },
});
