# hugolemoy.ninja · instrucciones para agentes

**Estado, pendientes y decisiones: en Jarvis, clave `MP-08`** (conector MCP `jarvis`).
Al empezar: `consultar_proyecto`. Al terminar: `cerrar_sesion` con liga al commit o PR.
Sin conector: anota en `BITACORA.md` (raíz; créalo si no existe) con encabezado `## AAAA-MM-DD · título`.

## Dónde está cada cosa
- Reglas duras: este archivo.
- Código: Astro 5 + Tailwind + React 19 (`src/`); arranque y despliegue en `README.md`.
- Contenido, bitácora de evolución, evidencias y especificación de `/llms.txt`: carpeta de OneDrive `01_MarcaPersonal/08_HubWeb_hugolemoy.ninja/`.

## Reglas duras
- **Repo y sitio públicos: cero clientes con nombre.** Solo sectores o áreas de industria («una distribuidora», «una casa de acogida»), también en capturas, nombres de archivo, textos alternativos y commits.
- **Nada de proyectos restringidos ni de actividad política**, ni directo ni insinuado, ni en sitios a los que se enlaza.
- **Productos con su estado real:** lo que es prueba de concepto se dice así; nunca datos de personas atendidas.
- Nunca secretos ni datos personales en el repo.

## Cómo trabajar aquí
- **Git:** commits y push de ramas sin preguntar; cambios por rama y PR hacia `main`. Cloudflare Pages publica desde `main`, así que fusionar es desplegar: solo con autorización explícita de Hugo, cada vez. Nunca `--force` ni reescribir historial.
- Antes del PR: `npm run build` sin errores. Una tarea pesada a la vez (equipo limitado).
