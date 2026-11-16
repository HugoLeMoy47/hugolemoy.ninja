import type { APIRoute } from 'astro';
import { execSync } from 'node:child_process';

// Marcador de versión: dice qué commit está publicado y cuándo se compiló.
// Sirve para comprobar, sin entrar al panel de Cloudflare, si el sitio en vivo
// corresponde a `main` (https://hugolemoy.ninja/version.json).
function commit(): string {
  // Cloudflare Pages y Workers Builds exponen el commit que compilan; GitHub Actions, el suyo.
  const declarado =
    process.env.BUILD_COMMIT ||
    process.env.CF_PAGES_COMMIT_SHA ||
    process.env.WORKERS_CI_COMMIT_SHA ||
    process.env.GITHUB_SHA;
  // Solo se acepta un SHA: si el entorno trae otra cosa (p. ej. el nombre de la rama), se usa git.
  if (declarado && /^[0-9a-f]{7,40}$/i.test(declarado)) return declarado.slice(0, 7);
  try {
    return execSync('git rev-parse --short=7 HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
      .toString()
      .trim();
  } catch {
    return 'local';
  }
}

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ commit: commit(), built: new Date().toISOString() }), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
