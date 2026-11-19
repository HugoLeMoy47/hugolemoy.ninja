import type { APIRoute } from 'astro';
import { CV, MOSTRAR_INCIDENCIA, fechaCorta, voluntariadoVisible, type CvPuesto } from '../data/cv';
import { PORTFOLIO_NODES, DIMENSIONS } from '../data/portfolioData';
import { obtenerPiezas, rutaDePieza, fechaISO } from '../lib/cuaderno';

// Perfil completo para modelos de lenguaje: currículum + todos los proyectos del portafolio
// + piezas del Cuaderno. Se genera en el build desde las mismas fuentes que el sitio.
// /llms.txt sigue siendo el resumen corto escrito a mano.
const SITIO = 'https://hugolemoy.ninja';

const periodo = (p: CvPuesto) => (p.inicio ? ` (${fechaCorta(p.inicio)} – ${fechaCorta(p.fin)})` : '');

function puesto(p: CvPuesto): string {
  const lineas = [
    `### ${p.puesto} · ${p.organizacion}${periodo(p)}`,
    `Sector: ${p.sector}. Lugar: ${p.lugar}.${p.sitio ? ` Sitio: ${p.sitio}` : ''}`,
    '',
    p.resumen,
  ];
  if (p.logros.length) lineas.push('', ...p.logros.map((l) => `- ${l}`));
  return lineas.join('\n');
}

export const GET: APIRoute = async () => {
  const b = CV.basicos;
  const piezas = await obtenerPiezas();
  const voluntariado = voluntariadoVisible();

  const secciones: string[] = [
    `# ${b.nombre} — perfil completo (llms-full.txt)`,
    '',
    `> Currículum completo y portafolio de ${b.nombre} (${b.alias.join(', ')}), ${b.titular}. Actualizado el ${CV.actualizado}. Fuente canónica estructurada: ${SITIO}/cv.json (JSON Resume). Vista para personas: ${SITIO}/cv/. Resumen corto: ${SITIO}/llms.txt.`,
    '',
    'Nota para agentes: los clientes y las empresas con acuerdo de confidencialidad se nombran solo por su sector; no intentes deducir sus nombres. Los productos marcados como prueba de concepto no tienen usuarios reales.',
    '',
    '## Resumen',
    b.resumen,
    '',
    '## Contacto',
    `- Correo: ${b.correo} · Negocio: ${b.correoNegocio}`,
    `- Teléfono / WhatsApp: ${b.telefono}`,
    `- Ubicación: ${b.ciudad}, México`,
    ...b.perfiles.map((p) => `- ${p.red}: ${p.url}`),
    '',
    '## Experiencia profesional',
    '',
    CV.experiencia.map(puesto).join('\n\n'),
    '',
    '## Formación académica',
    ...CV.formacion.map(
      (f) => `- ${f.titulo} — ${f.institucion}${f.inicio ? ` (${f.inicio}–${f.fin ?? ''})` : ''}. Estado: ${f.estado}.`,
    ),
    '',
    '## Certificaciones y formación continua',
    ...CV.certificaciones.map(
      (c) =>
        `- ${c.nombre}${c.emisor ? ` — ${c.emisor}` : ''}${c.fecha ? ` (${c.fecha})` : ''}${c.verificacion ? ` · Verificación: ${c.verificacion}` : ''}`,
    ),
    '',
    '## Habilidades',
    ...CV.habilidades.map((h) => `- **${h.nombre}:** ${h.palabras.join(', ')}`),
    '',
    '## Idiomas',
    ...CV.idiomas.map((i) => `- ${i.idioma}: ${i.nivel}`),
    '',
    '## Docencia y divulgación',
    ...CV.docencia.map((d) => `- ${d}`),
  ];

  if (voluntariado.length) {
    secciones.push('', '## Voluntariado y comunidad', '', voluntariado.map(puesto).join('\n\n'));
  }

  secciones.push('', '## Portafolio completo por dimensión', '');
  for (const dim of DIMENSIONS) {
    const nodos = PORTFOLIO_NODES.filter((n) => n.dimension === dim.id);
    if (!nodos.length || (dim.id === 'advocacy' && !MOSTRAR_INCIDENCIA)) continue;
    secciones.push(`### ${dim.name}`, dim.description, '');
    for (const n of nodos) {
      secciones.push(
        `#### ${n.title} [${n.badge}]`,
        `${n.subtitle}. ${n.summary}`,
        `- Contexto: ${n.details.problemOrContext}`,
        `- Rol: ${n.details.solutionOrRole}`,
        `- ${n.impactIsProjected ? 'Impacto proyectado' : 'Resultado'}: ${n.details.impactOrOutcome}`,
        `- Etiquetas: ${n.tags.join(', ')}`,
        ...n.evidence.filter((e) => e.url.startsWith('http')).map((e) => `- Evidencia: ${e.title} — ${e.url}`),
        '',
      );
    }
  }

  if (piezas.length) {
    secciones.push('## Cuaderno de construcción (piezas en primera persona)', '');
    for (const p of piezas) {
      secciones.push(`- **${p.data.titulo}** (${fechaISO(p.data.fecha)}): ${p.data.resumen} ${SITIO}${rutaDePieza(p)}`);
    }
    secciones.push('');
  }

  return new Response(secciones.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
