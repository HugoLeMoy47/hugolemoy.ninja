import { getCollection, type CollectionEntry } from 'astro:content';

export type Pieza = CollectionEntry<'cuaderno'>;

export const CUADERNO = {
  nombre: 'Cuaderno de construcción',
  ruta: '/cuaderno/',
  resumen:
    'Relato en primera persona de los retos técnicos y los dilemas éticos de construir mis productos con agentes de IA.',
};

/** Piezas publicadas, de la más reciente a la más antigua. */
export async function obtenerPiezas(): Promise<Pieza[]> {
  const piezas = await getCollection('cuaderno', ({ data }) => !data.borrador);
  return piezas.sort((a, b) => b.data.fecha.getTime() - a.data.fecha.getTime());
}

export function rutaDePieza(pieza: Pieza): string {
  return `${CUADERNO.ruta}${pieza.id}/`;
}

const formato = new Intl.DateTimeFormat('es-MX', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
});

/** «15 de noviembre de 2026» */
export function fechaLarga(fecha: Date): string {
  return formato.format(fecha);
}

/** «2026-11-15», para el atributo datetime. */
export function fechaISO(fecha: Date): string {
  return fecha.toISOString().slice(0, 10);
}
