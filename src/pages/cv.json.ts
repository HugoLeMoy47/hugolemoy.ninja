import type { APIRoute } from 'astro';
import { aJsonResume } from '../data/cv';

// Currículum en formato JSON Resume v1 (https://jsonresume.org/schema).
// Lo leen herramientas de CV y asistentes de IA: «lee hugolemoy.ninja/cv.json y adáptalo a esta vacante».
export const GET: APIRoute = () =>
  new Response(JSON.stringify(aJsonResume(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
