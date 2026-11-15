import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cuaderno de construcción: una pieza = un archivo Markdown en src/content/cuaderno/.
// El nombre del archivo es la URL: mi-pieza.md -> /cuaderno/mi-pieza/
const cuaderno = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cuaderno' }),
  schema: z.object({
    titulo: z.string(),
    resumen: z.string().max(200),
    fecha: z.coerce.date(),
    actualizado: z.coerce.date().optional(),
    // Producto del que habla la pieza. La página de la pieza cierra con este enlace.
    producto: z.object({
      nombre: z.string(),
      url: z.string().url(),
      estado: z.string(),
    }),
    // true = no se publica ni aparece en el índice ni en el sitemap.
    borrador: z.boolean().default(false),
  }),
});

export const collections = { cuaderno };
