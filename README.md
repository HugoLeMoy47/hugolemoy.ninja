# hugolemoy.ninja — Frontend Web Source

Repositorio de código fuente del sitio web personal y portafolio interactivo de Hugo Legorreta Moysén (HLM).

- **Dominio:** `hugolemoy.ninja`
- **Despliegue:** Cloudflare Pages
- **Stack:** Astro 7 + Tailwind CSS 3 (por PostCSS) + React 19 + TypeScript

---

## 🚀 Puesta en Marcha (Local)

Una vez que muevas esta carpeta a tu directorio local de repositorios de desarrollo:

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev

# 3. Compilar para producción (genera carpeta dist/)
npm run build
```

---

## Cuaderno de construcción (`/cuaderno/`)

Relato en primera persona de los retos técnicos y los dilemas éticos de construir Bitácora Viva.

Para publicar una pieza nueva, crea un archivo Markdown en `src/content/cuaderno/`. El nombre del archivo es la URL (`mi-pieza.md` → `/cuaderno/mi-pieza/`). Encabezado obligatorio:

```yaml
---
titulo: "Título de la pieza"
resumen: "Una o dos frases (máximo 200 caracteres)."
fecha: 2026-11-15
producto:
  nombre: "Bitácora Viva"
  url: "https://freejolitos.consulting/bitacora-viva"
  estado: "Bitácora Viva es una prueba de concepto funcional y trabaja solo con datos de prueba."
# borrador: true   # no se publica
---
```

El índice, el bloque de la página de inicio y `sitemap.xml` se actualizan solos en el build. En el cuerpo, los subtítulos empiezan en `##` (el `h1` es el título). `public/llms.txt` se edita a mano.

---

## 🌐 Despliegue en Cloudflare Pages

Para saber qué está publicado: `https://hugolemoy.ninja/version.json` devuelve el commit y la fecha de compilación. Si no coincide con `main`, la última fusión no se publicó.

Antes de fusionar, el flujo `CI` de GitHub comprueba que el sitio compile.

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 22.23.4+ o 24 (fijado en `.node-version`)
