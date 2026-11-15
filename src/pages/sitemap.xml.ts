import type { APIRoute } from 'astro';
import { CUADERNO, obtenerPiezas, rutaDePieza } from '../lib/cuaderno';

// Sitemap generado en el build: las piezas del Cuaderno entran solas.
// Sustituye al public/sitemap.xml escrito a mano (mismas dos entradas de antes).
const SITIO = 'https://hugolemoy.ninja';

interface Entrada {
  ruta: string;
  lastmod: string;
  changefreq: 'weekly' | 'monthly';
  priority: string;
}

export const GET: APIRoute = async () => {
  const piezas = await obtenerPiezas();
  const ultima = (pieza: (typeof piezas)[number]) =>
    (pieza.data.actualizado ?? pieza.data.fecha).toISOString();

  const entradas: Entrada[] = [
    { ruta: '/', lastmod: '2026-11-15T00:00:00.000Z', changefreq: 'weekly', priority: '1.0' },
    { ruta: '/llms.txt', lastmod: '2026-11-15T00:00:00.000Z', changefreq: 'monthly', priority: '0.8' },
  ];

  if (piezas.length > 0) {
    entradas.push({
      ruta: CUADERNO.ruta,
      lastmod: piezas.map(ultima).sort().at(-1)!,
      changefreq: 'monthly',
      priority: '0.8',
    });
    for (const pieza of piezas) {
      entradas.push({
        ruta: rutaDePieza(pieza),
        lastmod: ultima(pieza),
        changefreq: 'monthly',
        priority: '0.7',
      });
    }
  }

  const cuerpo = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entradas.map(
      (e) =>
        `  <url>\n    <loc>${SITIO}${e.ruta}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    ),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(cuerpo, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
