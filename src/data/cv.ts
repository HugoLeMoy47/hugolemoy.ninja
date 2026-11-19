// Currículum de Hugo Legorreta Moysén: UNA sola fuente de datos.
// De aquí salen /cv/ (vista para personas e impresión), /cv.json (formato JSON Resume),
// /llms-full.txt (para modelos de lenguaje) y la ficha Schema.org de la portada.
//
// Reglas (CLAUDE.md del repo): cero clientes con nombre (solo sector), empresas bajo
// acuerdo de confidencialidad sin nombre, productos con su estado real y nada de datos
// privados (no se publica el motivo de salida de ningún empleo).

export interface CvPuesto {
  puesto: string;
  organizacion: string;
  /** Sector o giro, para cuando la organización no se puede nombrar. */
  sector: string;
  sitio?: string;
  lugar: string;
  inicio?: string; // AAAA o AAAA-MM; vacío = sin fecha confirmada
  fin?: string; // vacío = actual
  resumen: string;
  logros: string[];
  habilidades?: string[];
}

export interface CvFormacion {
  institucion: string;
  titulo: string;
  area: string;
  inicio?: string;
  fin?: string;
  estado: string;
}

export interface CvCertificacion {
  nombre: string;
  emisor?: string;
  fecha?: string; // AAAA-MM
  /** Liga pública de verificación (Credly, Coursera, Atlassian…). Pendiente de que Hugo las pase. */
  verificacion?: string;
}

export interface CvProyecto {
  nombre: string;
  rol: string;
  estado: string;
  descripcion: string;
  url?: string;
  inicio?: string;
  palabras: string[];
}

export interface CvGrupoHabilidades {
  nombre: string;
  nivel?: string;
  palabras: string[];
}

/**
 * Bloque de incidencia (La Comuna 420, CNNN). Sigue abierta en Jarvis la decisión
 * sobre cómo mostrar esta actividad mientras exista la misión electoral (MP-08).
 * Cambiar a false lo saca de /cv, cv.json y llms-full.txt de un solo golpe.
 */
export const MOSTRAR_INCIDENCIA = true;

export const CV = {
  actualizado: '2026-11-19',
  basicos: {
    nombre: 'Hugo Legorreta Moysén',
    alias: ['Hugo LeMoy', 'HLM', 'HugoLeMoy47'],
    titular: 'Product Owner · Consultor en Tecnología e IA',
    correo: 'hugo.legorreta@gmail.com',
    correoNegocio: 'hola@freejolitos.consulting',
    telefono: '+52 55 3344 4852',
    sitio: 'https://hugolemoy.ninja',
    ciudad: 'Ciudad de México',
    region: 'CDMX',
    pais: 'MX',
    resumen:
      'Product Owner con perfil híbrido técnico-negocio. Más de 10 años gestionando producto y proyectos —juegos serios, sistemas humanitarios, consultoría y banca B2B— sobre más de 15 años en tecnología (desarrollo back-end, redes e infraestructura). Lideré como PO una plataforma de onboarding para banca, seguros y fintech con equipos de hasta 12 desarrolladores, y el sistema de registro de personas migrantes de una agencia de la ONU. Hoy dirijo Freejolitos Consultores y construyo productos propios con agentes de IA bajo reglas duras: privacidad por diseño, IA que cita sus fuentes y cada producto con su estado real.',
    perfiles: [
      { red: 'LinkedIn', usuario: 'hugolegorretamoysen', url: 'https://www.linkedin.com/in/hugolegorretamoysen/' },
      { red: 'GitHub', usuario: 'HugoLeMoy47', url: 'https://github.com/HugoLeMoy47' },
      { red: 'X', usuario: 'HugoLeMoy', url: 'https://x.com/HugoLeMoy' },
      { red: 'Facebook', usuario: 'HugoLeMoy', url: 'https://www.facebook.com/HugoLeMoy' },
      { red: 'Instagram', usuario: 'hugolemoy', url: 'https://www.instagram.com/hugolemoy' },
      { red: 'Global Game Jam', usuario: 'hugolemoy', url: 'https://globalgamejam.org/users/hugolemoy' },
    ],
  },

  experiencia: [
    {
      puesto: 'Fundador y Consultor Principal',
      organizacion: 'Freejolitos Consultores',
      sector: 'Consultoría en TI e IA para organizaciones de la sociedad civil y negocios pequeños',
      sitio: 'https://freejolitos.consulting',
      lugar: 'Ciudad de México',
      inicio: '2026-07',
      resumen:
        'Regreso de tiempo completo a la práctica que fundé en 2019: consultoría en tecnología, ciberseguridad y desarrollo a la medida, más tres productos propios en etapa de prueba de concepto.',
      logros: [
        'Consultoría integral de TI para una organización de atención humanitaria: migración a Google Workspace, diagnóstico de infraestructura, respuesta a un incidente de seguridad, lineamientos de gobierno de datos y una plataforma interna de seguimiento de tareas.',
        'Bitácora Viva (Product Owner): gestión de casos de atención humanitaria con custodia, consentimiento por tipo, anonimización en lugar de borrado y auditoría de cada acción; más de 700 pruebas negativas de seguridad. Prueba de concepto con datos simulados.',
        'SutraMind (Product Owner y arquitecto): tablero y asesor con IA para empresas medianas donde la IA interpreta la pregunta, la base de datos calcula la cifra y cada respuesta cita su fuente; 34 preguntas de referencia para medir exactitud y fugas entre roles. Prueba de concepto sobre una empresa ficticia.',
        'El Chalán (Product Owner): web app instalable, sin conexión y sin cuenta, para que un negocio pequeño sepa cuánto tiene, si ganó y cuánto le deben; 134 pruebas automáticas que comparan cada cifra al centavo. Prueba de concepto publicada.',
        'Método propio de desarrollo dirigido con agentes de IA: reglas por repositorio, pruebas primero, aprobación humana para publicar o tocar datos y un segundo cerebro (servidor MCP) que registra decisiones y bitácoras de cada sesión.',
      ],
      habilidades: ['Consultoría TI', 'Product Owner', 'Agentes de IA', 'Ciberseguridad', 'Gobierno de datos'],
    },
    {
      puesto: 'Product Owner (antes Project Manager)',
      organizacion: 'Empresa de software B2B (confidencial)',
      sector: 'Banca, seguros y fintech (B2B)',
      lugar: 'Ciudad de México',
      inicio: '2023',
      fin: '2026-05',
      resumen:
        'Product Owner del producto principal de la compañía: plataforma de onboarding cuyo núcleo es un tablero de analítica de embudo para que las instituciones clientes vean su proceso de punta a punta y detecten dónde pierden usuarios. Nombre de la empresa y cifras bajo acuerdo de confidencialidad.',
      logros: [
        'Definí requerimientos y criterios de aceptación de los componentes analíticos: volumen de entrada, tiempo de permanencia por etapa, abandono por fase y conversión de punta a punta.',
        'Convertí la analítica observada en recomendaciones de mejora del proceso de onboarding y en decisiones de priorización del backlog.',
        'Expandí el producto a verticales nuevas (inmobiliaria y seguros) y a segmentos de inclusión financiera, gestionando módulos y flujos interdependientes.',
        'Lideré backlog en Jira y ceremonias Scrum con un equipo de 9 a 12 desarrolladores back-end y front-end; reporte directo a la Dirección de Producto.',
        'Usé reportes y tableros de Jira para anticipar cuellos de botella de entrega y resolver indefiniciones técnicas antes de que afectaran el sprint.',
        'Entregué las primeras versiones del producto en inglés, además de mejoras de diseño y experiencia.',
        'Diseñé un producto interno derivado para perfilar usuarios con datos no convencionales para productos financieros.',
      ],
      habilidades: ['Product Owner', 'Scrum', 'Jira', 'Analítica de embudo', 'Fintech'],
    },
    {
      puesto: 'Fundador, Product Owner y Project Manager',
      organizacion: 'Freejolitos Consultores',
      sector: 'Organismos internacionales, organizaciones humanitarias, sector financiero y comercio',
      sitio: 'https://freejolitos.consulting',
      lugar: 'Remoto / Ciudad de México',
      inicio: '2019',
      fin: '2023',
      resumen:
        'Freejolitos nace como idea en 2019 y desde entonces construye sistemas a la medida. Gestión integral de cada proyecto (levantamiento, marco legal, requerimientos, coordinación del equipo de programación y entrega al cliente) bajo marcos ágiles.',
      logros: [
        'ACNUR / UNHCR · sistema MAP: aplicación de escritorio para Windows, sin conexión, con la que personal de la agencia y de misiones aliadas levanta datos de identidad y documentales de personas en movilidad y mide indicadores. Diseñamos una sincronización aditiva por lotes que no sobrescribe registros, cifrado de la base desde el origen y exportación en formato genérico para integrarse a sus bases institucionales. Tres versiones: levantamiento, sincronización y visualización de indicadores. Arrancó en la frontera sur y su uso se extendió a otras misiones.',
        'Sector financiero (cliente confidencial, 2020–2023): sistema para administrar cuentas y pagos de distintos montos de inversión de un fondo, con reglas de negocio y datos estructurados.',
        'Organización de atención a personas refugiadas (confidencial): desarrollo de soluciones a la medida para su operación.',
        'OIM / IOM: gestión de Global Game Jams con enfoque educativo.',
        'Sitios web, mantenimiento para clientes pequeños y soluciones a la medida para comercio minorista.',
      ],
      habilidades: ['Product Owner', 'Project Management', 'Offline-first', 'Gobierno de datos', 'Agile'],
    },
    {
      puesto: 'Project Manager y Business Developer',
      organizacion: 'Big-Monster',
      sector: 'Estudio de videojuegos serios y educativos',
      sitio: 'https://big-monster.net',
      lugar: 'Ciudad de México',
      inicio: '2018',
      fin: '2020',
      resumen: 'Responsable de los juegos serios del estudio desde el requerimiento hasta la entrega, para gobierno y organismos internacionales.',
      logros: [
        'Gestión de proyectos con equipos de programación y arte (unas 5 personas a cargo), coordinando entregables con clientes institucionales como ONU Mujeres, SACMEX y Fundación Gonzalo Río Arronte.',
        'Para el sistema de aguas de la Ciudad de México: colección de cuatro juegos hipercasuales sobre el cuidado del agua, producidos a partir del concepto ganador de una convocatoria pública. Aportamos estructura, mecánicas pulidas y curva de dificultad; se publicó en tiendas, se mantuvo unos tres años y se difundió en las boletas de agua de la ciudad.',
        'Desarrollo de negocio: levantamiento de requerimientos, negociación y cierre de contratos con stakeholders institucionales.',
      ],
      habilidades: ['Serious Games', 'Project Management', 'Desarrollo de negocio'],
    },
    {
      puesto: 'Gerente de TI, co-gerente de seguridad y redes, desarrollador back-end',
      organizacion: 'Archer Troy · CISI · TV Nichos · Grupo LAHE · Computech',
      sector: 'Agencias, consultoras de TI y medios',
      lugar: 'Ciudad de México',
      inicio: '2008',
      fin: '2017',
      resumen: 'Una década de base técnica: infraestructura, redes, telefonía IP y desarrollo back-end.',
      logros: [
        'IT Manager y Digital Supervisor (Archer Troy): equipo de 3 personas, gestión de proveedores y migración de telefonía analógica a VoIP hasta 45 extensiones.',
        'IT Co-manager (CISI): seguridad y redes para un cliente de gobierno federal del sector hídrico.',
        'Desarrollo back-end (TV Nichos): GeoPromos, streaming y video bajo demanda sobre Raspberry Pi para transporte público, en fase piloto.',
        'Infraestructura de servidores y telefonía IP en etapas iniciales de carrera.',
      ],
      habilidades: ['Redes', 'VoIP', 'Seguridad', 'Back-end'],
    },
  ] satisfies CvPuesto[],

  voluntariado: [
    {
      puesto: 'Coordinador de voluntariado cívico',
      organizacion: 'Plantón 420 → La Comuna 420',
      sector: 'Voluntariado cívico y espacio público',
      lugar: 'Ciudad de México',
      inicio: '2020',
      resumen:
        'Inicia en 2020 como Plantón 420 y continúa desde 2023 como La Comuna 420. Coordinación de cientos de personas voluntarias durante años continuos, sin nómina ni contratos: comisiones de seguridad comunitaria, diálogo con autoridades y logística de marchas pacíficas.',
      logros: [],
    },
    {
      puesto: 'Conductor titular y guionista',
      organizacion: 'CNNN (Cannabis Network News Now)',
      sector: 'Contenido audiovisual, en alianza con Jotvox',
      sitio: 'https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7',
      lugar: 'Ciudad de México',
      resumen: 'Una temporada de seis meses: análisis en video de resoluciones judiciales, seguimiento legislativo y entrevistas.',
      logros: [],
    },
  ] satisfies CvPuesto[],

  formacion: [
    {
      institucion: 'Universidad Nacional Autónoma de México (UNAM), Facultad de Contaduría y Administración',
      titulo: 'Licenciatura en Informática Administrativa',
      area: 'Informática',
      estado: 'Trunca',
    },
    {
      institucion: 'Instituto Politécnico Nacional (IPN), CECyT No. 9',
      titulo: 'Técnico Programador',
      area: 'Programación',
      inicio: '2005',
      fin: '2008',
      estado: 'Concluido',
    },
  ] satisfies CvFormacion[],

  certificaciones: [
    { nombre: 'Scrum Fundamentals Certified (SFC)', emisor: 'SCRUMstudy' },
    { nombre: 'Jira Fundamentals Badge', emisor: 'Atlassian' },
    { nombre: 'Certificado de Gestión de Proyectos de Google (Fundamentos, Iniciación, Planificación, Ejecución y Agile)', emisor: 'Google' },
    { nombre: 'Introducción a la Ciencia de Datos' },
    { nombre: 'Transformación Digital' },
    { nombre: 'Protección de Datos y Privacidad' },
    { nombre: 'Liderazgo y Comunicación Efectiva' },
    { nombre: 'Capacitador Experto', emisor: 'SICAD' },
  ] satisfies CvCertificacion[],

  habilidades: [
    {
      nombre: 'Producto',
      palabras: ['Gestión y priorización de backlog', 'Roadmap', 'Requerimientos y criterios de aceptación', 'Descubrimiento', 'Negociación con stakeholders', 'Investigación de mercado'],
    },
    {
      nombre: 'Datos y analítica',
      palabras: ['Analítica de embudo', 'Diseño de tableros', 'Capa semántica y catálogo de métricas', 'Gobierno de datos', 'Requerimientos de datos estructurados'],
    },
    {
      nombre: 'IA aplicada',
      palabras: ['Desarrollo dirigido con agentes de IA (Claude Code)', 'Servidores MCP', 'Asistentes con fuentes citadas', 'Evaluación con preguntas de referencia', 'Privacidad por diseño'],
    },
    {
      nombre: 'Metodologías',
      palabras: ['Scrum', 'Kanban', 'Agile', 'DevOps', 'ITIL', 'CMMI'],
    },
    {
      nombre: 'Tecnología',
      palabras: ['TypeScript', 'React', 'Svelte', 'Astro', 'Python', 'PostgreSQL / Supabase', 'C#', 'Godot', 'Unity', 'Cloudflare', 'Redes y VoIP'],
    },
    {
      nombre: 'Herramientas',
      palabras: ['Jira', 'Confluence', 'Azure DevOps', 'Git / GitHub', 'Postman', 'Trello', 'Google Workspace', 'Microsoft 365'],
    },
    {
      nombre: 'Sectores',
      palabras: ['Banca, seguros y fintech', 'Organismos internacionales', 'Sociedad civil', 'Sector público', 'Educación', 'Videojuegos serios', 'Comercio minorista'],
    },
  ] satisfies CvGrupoHabilidades[],

  idiomas: [
    { idioma: 'Español', nivel: 'Nativo' },
    { idioma: 'Inglés', nivel: 'B2 profesional' },
  ],

  proyectos: [
    {
      nombre: 'Bitácora Viva',
      rol: 'Product Owner',
      estado: 'Prueba de concepto con datos simulados',
      descripcion: 'Gestión de casos de atención humanitaria con custodia, anonimización y auditoría.',
      url: 'https://freejolitos.consulting/bitacora-viva',
      inicio: '2026',
      palabras: ['React', 'TypeScript', 'Supabase', 'RLS'],
    },
    {
      nombre: 'SutraMind',
      rol: 'Product Owner y arquitecto',
      estado: 'Prueba de concepto sobre una empresa ficticia',
      descripcion: 'Tablero y asesor con IA para empresas medianas: cada cifra la calcula la base de datos y cita su fuente.',
      inicio: '2026',
      palabras: ['Python', 'PostgreSQL', 'Capa semántica', 'IA'],
    },
    {
      nombre: 'El Chalán',
      rol: 'Product Owner',
      estado: 'Prueba de concepto publicada',
      descripcion: 'Libreta de cuentas para negocios pequeños: sin conexión, sin cuenta, datos en el teléfono.',
      url: 'https://elchalan.hugolemoy.ninja',
      inicio: '2026',
      palabras: ['Svelte', 'TypeScript', 'IndexedDB', 'PWA'],
    },
    {
      nombre: 'weedtown.social',
      rol: 'Creador',
      estado: 'En vivo',
      descripcion: 'Red social comunitaria independiente, con privacidad por diseño.',
      url: 'https://weedtown.social',
      palabras: ['Vibe-coding', 'Comunidad', 'Privacidad'],
    },
    {
      nombre: 'Legalízala Tycoon',
      rol: 'Creador y game designer',
      estado: 'Jugable; desarrollo en pausa hasta marzo de 2027',
      descripcion: 'Serious game de simulación del proceso legislativo mexicano.',
      url: 'https://legalizala.weedtown.social',
      palabras: ['TypeScript', 'Game design'],
    },
    {
      nombre: 'bit2fit',
      rol: 'Programador y diseñador de niveles',
      estado: 'Archivado (Global Game Jam 2020)',
      descripcion: 'Videojuego creado en 48 horas con Godot Engine.',
      url: 'https://github.com/HugoLeMoy47/bit2fit',
      inicio: '2020',
      palabras: ['Godot', 'GDScript'],
    },
    {
      nombre: 'hugolemoy.ninja',
      rol: 'Diseñador y desarrollador',
      estado: 'En vivo',
      descripcion: 'Este sitio: portafolio, Cuaderno de construcción y currículum legible por personas y por modelos de lenguaje.',
      url: 'https://hugolemoy.ninja',
      palabras: ['Astro', 'React', 'llms.txt', 'JSON Resume'],
    },
  ] satisfies CvProyecto[],

  docencia: [
    'Charla «Y tú, ¿a qué le entras?» sobre sustancias, reducción de riesgos y marco legal, en un plantel CONALEP (2023).',
    'Taller de realidad aumentada en Unity en los foros Ciencia para Todos y STEAM (2019): cada participante armó un producto mínimo viable con piezas prefabricadas, con temática de Día de Muertos.',
    'Coordinación de game jams con enfoque educativo junto a la OIM, y participación en Global Game Jam y Woman Game Jam.',
  ],
};

export function voluntariadoVisible(): CvPuesto[] {
  return MOSTRAR_INCIDENCIA ? CV.voluntariado : [];
}

/** "2023-05" -> "may 2023"; "2023" -> "2023"; vacío -> "Actualidad". */
export function fechaCorta(fecha?: string): string {
  if (!fecha) return 'Actualidad';
  const [anio, mes] = fecha.split('-');
  if (!mes) return anio;
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${meses[Number(mes) - 1]} ${anio}`;
}

/** Formato JSON Resume v1 (https://jsonresume.org/schema), en español. */
export function aJsonResume() {
  const b = CV.basicos;
  const puesto = (p: CvPuesto) => ({
    name: p.organizacion,
    position: p.puesto,
    description: p.sector,
    url: p.sitio,
    location: p.lugar,
    startDate: p.inicio,
    endDate: p.fin,
    summary: p.resumen,
    highlights: p.logros,
  });
  return {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: b.nombre,
      label: b.titular,
      email: b.correo,
      phone: b.telefono,
      url: b.sitio,
      summary: b.resumen,
      location: { city: b.ciudad, region: b.region, countryCode: b.pais },
      profiles: b.perfiles.map((p) => ({ network: p.red, username: p.usuario, url: p.url })),
    },
    work: CV.experiencia.map(puesto),
    volunteer: voluntariadoVisible().map((p) => ({
      organization: p.organizacion,
      position: p.puesto,
      url: p.sitio,
      startDate: p.inicio,
      endDate: p.fin,
      summary: p.resumen,
      highlights: p.logros,
    })),
    education: CV.formacion.map((f) => ({
      institution: f.institucion,
      studyType: f.titulo,
      area: f.area,
      startDate: f.inicio,
      endDate: f.fin,
      score: f.estado,
    })),
    certificates: CV.certificaciones.map((c) => ({
      name: c.nombre,
      issuer: c.emisor,
      date: c.fecha,
      url: c.verificacion,
    })),
    skills: CV.habilidades.map((h) => ({ name: h.nombre, level: h.nivel, keywords: h.palabras })),
    languages: CV.idiomas.map((i) => ({ language: i.idioma, fluency: i.nivel })),
    projects: CV.proyectos.map((p) => ({
      name: p.nombre,
      description: `${p.descripcion} Estado: ${p.estado}.`,
      roles: [p.rol],
      url: p.url,
      startDate: p.inicio,
      keywords: p.palabras,
    })),
    meta: {
      canonical: 'https://hugolemoy.ninja/cv.json',
      version: 'v1.0.0',
      lastModified: CV.actualizado,
      language: 'es-MX',
      note: 'Clientes y empresas bajo acuerdo de confidencialidad se nombran solo por sector. Vista para personas: https://hugolemoy.ninja/cv/',
    },
  };
}
