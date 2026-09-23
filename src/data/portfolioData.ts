export interface PortfolioNode {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  dimension: 'freejolitos' | 'gamedev' | 'advocacy' | 'cnnn' | 'github' | 'product_owner' | 'ideas';
  accentColor: 'cyan' | 'green' | 'amber';
  badge: string;
  summary: string;
  highlightStat: string;
  tags: string[];
  evidence: {
    type: 'link' | 'video' | 'github' | 'demo' | 'doc';
    title: string;
    url: string;
    description?: string;
  }[];
  details: {
    problemOrContext: string;
    solutionOrRole: string;
    impactOrOutcome: string;
  };
}

export interface DimensionMeta {
  id: string;
  name: string;
  code: string;
  color: 'cyan' | 'green' | 'amber';
  icon: string;
  description: string;
  nodeCount: number;
}

export const DIMENSIONS: DimensionMeta[] = [
  {
    id: 'freejolitos',
    name: 'Freejolitos Consultores',
    code: '01_OSC_TECH',
    color: 'amber',
    icon: 'Bean',
    description: 'Tecnología, auditoría y desarrollo con IA ética para Organizaciones de la Sociedad Civil sin área de sistemas.',
    nodeCount: 1,
  },
  {
    id: 'gamedev',
    name: 'GameDev & Serious Games',
    code: '02_LUDIC_CORE',
    color: 'cyan',
    icon: 'Gamepad2',
    description: 'Game design, Global Game Jams, Woman Game Jam y videojuegos con propósito e impacto legislativo.',
    nodeCount: 4,
  },
  {
    id: 'advocacy',
    name: 'Incidencia & Comuna 42',
    code: '03_POLICY_NET',
    color: 'green',
    icon: 'Scale',
    description: 'Política pública cannábica, regulación con enfoque de derechos humanos, iniciativa #Capital420, Senado y articulación comunitaria.',
    nodeCount: 4,
  },
  {
    id: 'cnnn',
    name: 'CNNN & Acervo Audiovisual',
    code: '04_MEDIA_STREAM',
    color: 'green',
    icon: 'Tv',
    description: 'Cannabis Network News Now: conducción titular, análisis legislativo, entrevistas a profundidad y coberturas.',
    nodeCount: 1,
  },
  {
    id: 'github',
    name: 'Laboratorio de Código & GitHub',
    code: '05_SOURCE_FORGE',
    color: 'cyan',
    icon: 'GitBranch',
    description: 'Repositorios públicos en GitHub (@HugoLeMoy47): redes sociales sin estigma, trackers humanitarios y scripts.',
    nodeCount: 5,
  },
  {
    id: 'product_owner',
    name: 'Product Owner & Arquitectura IT',
    code: '06_KERNEL_CORP',
    color: 'cyan',
    icon: 'Cpu',
    description: 'Liderazgo técnico híbrido: analítica de embudo B2B en fintech (ART), sistemas para ACNUR/ONU e infraestructura crítica.',
    nodeCount: 2,
  },
  {
    id: 'ideas',
    name: 'Incubadora de Ideas (WIP)',
    code: '07_NEURAL_INCUBATOR',
    color: 'amber',
    icon: 'Sparkles',
    description: 'Conceptos de software, arquitectura social y prototipos en gestación que aún no han sido liberados al público ("lo que pienso y no subo").',
    nodeCount: 2,
  },
];

export const PORTFOLIO_NODES: PortfolioNode[] = [
  // 01 // FREEJOLITOS
  {
    id: 'freejolitos-core',
    code: 'FRL-01',
    title: 'Freejolitos Consultores',
    subtitle: 'Tecnología para el Tercer Sector y OSCs en México',
    dimension: 'freejolitos',
    accentColor: 'amber',
    badge: 'PRÁCTICA ACTIVA',
    summary: 'Diagnóstico tecnológico, acompañamiento mensual y desarrollo a la medida para organizaciones sin área de sistemas en todo México. "Uso IA, y lo digo".',
    highlightStat: 'Tarifa Institucional OSC: Diagnóstico $16.7k · Mensual $8.1k',
    tags: ['Consultoría TI', 'Sociedad Civil', 'IA Ética', 'Gobierno de Datos', 'Google Workspace'],
    evidence: [
      {
        type: 'link',
        title: 'Sitio Web Oficial',
        url: 'https://freejolitos.consulting',
        description: 'Página oficial de servicios, tarifas y manifiesto de IA',
      },
      {
        type: 'github',
        title: 'Repositorio Frontend',
        url: 'https://github.com/HugoLeMoy47/freejolitosConsultingWeb',
        description: 'Código fuente del sitio institucional',
      },
      {
        type: 'link',
        title: 'Contacto Directo WhatsApp',
        url: 'https://wa.me/525533444852',
        description: 'Canal de atención institucional para organizaciones (+52 55 3344 4852)',
      }
    ],
    details: {
      problemOrContext: 'Las organizaciones de la sociedad civil crecen y la tecnología con ellas sin planificación. Financiadores y auditores exigen estándares de empresas multinacionales sin presupuestos de corporativo.',
      solutionOrRole: 'Fundador y Consultor Principal. Traduzco los estándares de agencias internacionales a la escala real de una OSC: orden, procesos, seguridad y desarrollo ágil sin sobrecostos de licencias innecesarias.',
      impactOrOutcome: 'Acompañamiento tecnológico continuo, protección estricta de datos de personas beneficiarias y fortalecimiento de capacidades instaladas.',
    }
  },

  // 02 // GAMEDEV
  {
    id: 'legalizala-tycoon',
    code: 'GM-01',
    title: 'Legalízala Tycoon',
    subtitle: 'Serious game de simulación legislativa mexicana',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'EN DESARROLLO',
    summary: 'Lleva una iniciativa ciudadana cannábica desde el cabildo municipal hasta el Diario Oficial de la Federación en 100 semanas sin desgastar a tu colectivo.',
    highlightStat: '100 semanas de simulación · Mecánicas de incidencia real',
    tags: ['TypeScript', 'Game Design', 'Serious Games', 'Política Pública', 'Simulación'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/LegalizalaTycoon',
        description: 'Motor y mecánicas en TypeScript',
      },
      {
        type: 'doc',
        title: 'GDD & Bitácora de Diseño',
        url: 'https://github.com/HugoLeMoy47/LegalizalaTycoon',
        description: 'Documento de diseño de juego con reglas, narrativa y recursos',
      }
    ],
    details: {
      problemOrContext: 'La educación cívica y la comprensión del proceso legislativo mexicano suelen ser densas, burocráticas y ajenas a la ciudadanía activa.',
      solutionOrRole: 'Creador y Game Designer. Diseño de sistemas de recursos (capital político, energía comunitaria, alianzas con bancadas, presión mediática y contención de operativos).',
      impactOrOutcome: 'Herramienta lúdico-pedagógica para activistas, estudiantes de ciencias políticas y defensores de derechos.',
    }
  },
  {
    id: 'bit2fit-ggj',
    code: 'GM-02',
    title: 'bit2fit (Global Game Jam 2020)',
    subtitle: 'Videojuego en Godot Engine creado en 48 horas',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'GGJ ARCHIVE',
    summary: 'Desarrollado durante la edición presencial de Global Game Jam 2020 con Godot Engine bajo la temática de adaptación e integración.',
    highlightStat: 'Global Game Jam 2020 · Godot Engine · GDScript',
    tags: ['Godot Engine', 'GDScript', 'Game Jam', '48 Hours Challenge'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio bit2fit',
        url: 'https://github.com/HugoLeMoy47/bit2fit',
        description: 'Código abierto y assets en Godot',
      },
      {
        type: 'link',
        title: 'Perfil Global Game Jam',
        url: 'https://globalgamejam.org/users/hugolemoy',
        description: 'Ficha de jammer oficial en GGJ',
      }
    ],
    details: {
      problemOrContext: 'Crear una experiencia interactiva completa de principio a fin en un fin de semana bajo alta presión creativa y técnica.',
      solutionOrRole: 'Programador y diseñador de niveles. Implementación de mecánicas de ajuste y sincronización rítmica en Godot.',
      impactOrOutcome: 'Proyecto publicado y archivado en el registro histórico mundial de Global Game Jam.',
    }
  },
  {
    id: 'canna-gochi',
    code: 'GM-03',
    title: 'canna-gochi',
    subtitle: 'Mascota virtual botánica y cuidados digitales',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'PROTOTIPO',
    summary: 'Un experimento lúdico interactivo tipo Tamagotchi donde cuidas los ciclos circadianos, pH, nutrientes y estrés de una planta cannábica digital.',
    highlightStat: 'TypeScript · Estado reactivo · Ciclos botánicos',
    tags: ['TypeScript', 'Virtual Pet', 'Tamagotchi', 'Simulación Botánica'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/canna-gochi',
        description: 'Lógica TypeScript del estado y necesidades de la planta',
      }
    ],
    details: {
      problemOrContext: 'Explorar mecánicas de cuidado pasivo (idle game) aplicadas al aprendizaje del autocultivo responsable y botánica cannábica.',
      solutionOrRole: 'Desarrollador en solitario. Modelado de variables de humedad, luz, nutrición y respuestas al cuidado.',
      impactOrOutcome: 'Base para un simulador móvil liviano y educativo.',
    }
  },
  {
    id: 'big-monster-serious-games',
    code: 'GM-04',
    title: 'Big-Monster Serious Games',
    subtitle: 'Producción de videojuegos para ONU Mujeres y SACMEX',
    dimension: 'gamedev',
    accentColor: 'cyan',
    badge: 'TRAYECTORIA',
    summary: 'Gestión de proyectos y desarrollo de negocio en estudio especializado en videojuegos serios y educativos para organismos multilaterales y gobierno.',
    highlightStat: 'Equipos de 5+ personas · Clientes internacionales (ONU Mujeres, SACMEX)',
    tags: ['Serious Games', 'Project Management', 'ONU Mujeres', 'SACMEX', 'Educación'],
    evidence: [
      {
        type: 'link',
        title: 'Perfil Profesional LinkedIn',
        url: 'https://linkedin.com/in/hugolegorretamoysen',
        description: 'Detalle de entregables y gestión institucional',
      }
    ],
    details: {
      problemOrContext: 'Traducir problemáticas críticas (igualdad de género, cuidado hídrico y prevención de adicciones) en mecánicas de juego atractivas para audiencias jóvenes.',
      solutionOrRole: 'Project Manager & Business Developer. Negociación y cierre de contratos, levantamiento de requerimientos y coordinación de equipos de arte y programación.',
      impactOrOutcome: 'Juegos educativos desplegados con ONU Mujeres, SACMEX y Fundación Gonzalo Río Arronte.',
    }
  },

  // 03 // ADVOCACY & COMUNA 42
  {
    id: 'capital-420-iniciativa',
    code: 'ADV-01',
    title: 'Iniciativa #Capital420 & Propuesta Técnica HLM',
    subtitle: 'Propuesta técnica de política pública y regulación local CDMX',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'INCIDENCIA LEGISLATIVA',
    summary: 'Elaboración de paquete entregable integral para el Congreso de la CDMX en colaboración con organizaciones como MUCD, enfocado en derechos de usuarios, trazabilidad y reducción de daños.',
    highlightStat: 'Propuesta técnica formal entregada a diputaciones CDMX',
    tags: ['Política Pública', 'Derechos Humanos', 'Reducción de Daños', 'CDMX', 'Regulación'],
    evidence: [
      {
        type: 'link',
        title: 'Postura Comunitaria Telediario',
        url: 'https://youtu.be/S9Y0MEct5pE',
        description: 'Cobertura televisiva y postura pública',
      }
    ],
    details: {
      problemOrContext: 'La criminalización persistente del consumo y la falta de protocolos claros de convivencia en el espacio público de la Ciudad de México.',
      solutionOrRole: 'Co-autor y redactor técnico. Análisis comparativo de marcos jurídicos, reducción de riesgos y daños, y diseño de lineamientos de coexistencia ciudadana.',
      impactOrOutcome: 'Presentación formal en el Congreso de la CDMX e interlocución directa con tomadores de decisiones.',
    }
  },
  {
    id: 'la-comuna-42-asambleas',
    code: 'ADV-02',
    title: 'La Comuna 42: Asambleas y Coexistencia',
    subtitle: 'Organización de base, pacificación comunitaria y mediación',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'COMUNIDAD ACTIVA',
    summary: 'Facilitación de asambleas ciudadanas, vocería frente a autoridades locales y defensa del derecho a la ciudad para personas consumidoras responsables mediante autorregulación.',
    highlightStat: 'Asambleas periódicas · Protocolos de convivencia pacífica',
    tags: ['Asambleas', 'Paz Urbana', 'Mediación', 'Comuna 42', 'Autocultivo'],
    evidence: [
      {
        type: 'video',
        title: 'Cobertura de Medios',
        url: 'https://youtu.be/S9Y0MEct5pE',
        description: 'Debate público en televisión abierta',
      }
    ],
    details: {
      problemOrContext: 'Conflictos vecinales y desinformación en torno a los puntos de encuentro y tolerancia para usuarios en la vía pública.',
      solutionOrRole: 'Vocero y facilitador comunitario. Implementación de reglas de convivencia interna, limpieza comunitaria y diálogo con autoridades de la alcaldía.',
      impactOrOutcome: 'Reducción de incidentes de violencia y consolidación de un espacio con autorregulación comunitaria.',
    }
  },
  {
    id: 'senado-cravioto-iniciativa',
    code: 'ADV-03',
    title: 'Iniciativa en el Senado (César Cravioto)',
    subtitle: 'Articulación federal para la ley general de regulación cannábica',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'EN BITÁCORA / SEGUIMIENTO',
    summary: 'Trabajo de interlocución e impulso de iniciativas con la bancada senatorial encabezada por César Cravioto para destrabar el marco regulatorio del cannabis a nivel nacional.',
    highlightStat: 'Interlocución directa en el Senado de la República',
    tags: ['Senado de la República', 'César Cravioto', 'Regulación Federal', 'Incidencia'],
    evidence: [
      {
        type: 'link',
        title: 'Registro de Seguimiento en Bitácora',
        url: '#',
        description: 'Documentación archivada en el ecosistema HLM',
      }
    ],
    details: {
      problemOrContext: 'El congelamiento legislativo federal en el Congreso de la Unión tras las sentencias de inconstitucionalidad de la Suprema Corte.',
      solutionOrRole: 'Interlocutor y ponente ciudadano. Presentación de argumentos técnicos sobre justicia social, derechos de los campesinos y autocultivo no comercial.',
      impactOrOutcome: 'Construcción de puentes con senadores para la defensa del articulado enfocado en derechos de usuarios.',
    }
  },
  {
    id: 'planton-420-memoria',
    code: 'ADV-04',
    title: 'El Plantón 420: Memoria y Resistencia',
    subtitle: 'Presencia, defensa del espacio público y derechos humanos',
    dimension: 'advocacy',
    accentColor: 'green',
    badge: 'MEMORIA HISTÓRICA',
    summary: 'Participación y acompañamiento durante el histórico Plantón 420 frente al Senado: reducción de riesgos y daños, cultivo demostrativo y resistencia pacífica.',
    highlightStat: 'Hito histórico del activismo cannábico en México',
    tags: ['Plantón 420', 'Senado', 'Resistencia Pacífica', 'Derechos', 'Memoria'],
    evidence: [
      {
        type: 'link',
        title: 'Playlist CNNN con Cobertura',
        url: 'https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7',
        description: 'Crónica audiovisual del movimiento',
      }
    ],
    details: {
      problemOrContext: 'La necesidad de visibilizar que el consumo y el autocultivo pacífico en el espacio público no representan una amenaza de seguridad.',
      solutionOrRole: 'Activista participante. Acompañamiento, pedagogía comunitaria sobre derechos constitucionales y cultivo in situ.',
      impactOrOutcome: 'El plantón cannábico más longevo de Latinoamérica y epicentro de debate legislativo.',
    }
  },

  // 04 // CNNN
  {
    id: 'cnnn-noticias',
    code: 'MED-01',
    title: 'CNNN (Cannabis Network News Now)',
    subtitle: 'Conducción y análisis en noticiero cannábico digital',
    dimension: 'cnnn',
    accentColor: 'green',
    badge: 'MEDIA HOST & ANALISTA',
    summary: 'Serie de programas y cápsulas audiovisuales conducidas por Hugo Legorreta analizando el avance legislativo en la SCJN, eventos de la industria, políticas públicas y cultura comunitaria.',
    highlightStat: 'Temporada completa en YouTube · Conductor titular · Alianza con Jotvox',
    tags: ['Periodismo', 'YouTube', 'Análisis Político', 'CNNN', 'Jotvox', 'SCJN'],
    evidence: [
      {
        type: 'video',
        title: 'Playlist Oficial CNNN en YouTube',
        url: 'https://www.youtube.com/playlist?list=PLfSXXT0u4t5RG5iac7Fe9WkqCtlcFJt-7',
        description: 'Todos los episodios y cápsulas de noticias producidos',
      },
      {
        type: 'video',
        title: 'Episodio Destacado CNNN',
        url: 'https://youtu.be/S9Y0MEct5pE?si=e30emsnA9TeAMJIx',
        description: 'Edición con debate técnico y cobertura legislativa',
      }
    ],
    details: {
      problemOrContext: 'Falta de cobertura periodística rigurosa, no sensacionalista e informada sobre los litigios estratégicos, derechos y la industria del cáñamo en México.',
      solutionOrRole: 'Conductor titular y guionista. Desglose didáctico de resoluciones judiciales, entrevistas a activistas y seguimiento legislativo.',
      impactOrOutcome: 'Espacio de referencia informativa para la comunidad usuaria y tomadores de decisiones.',
    }
  },

  // 05 // GITHUB LAB
  {
    id: 'weedtown-app',
    code: 'GIT-01',
    title: 'WeedTown Social Network',
    subtitle: 'Red social comunitaria cannábica creada con vibe-coding',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'VIBE CODING',
    summary: 'Espacio digital seguro y de respeto donde la comunidad puede compartir conocimientos de cultivo, conectar y debatir sin las restricciones y censura algorítmica de redes convencionales.',
    highlightStat: 'Stack JavaScript moderno · Temática sin estigma',
    tags: ['JavaScript', 'Social Network', 'Vibe-Coding', 'Cannabis App', 'Community'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/weedtown_trial_101',
        description: 'Código abierto y prototipo interactivo',
      }
    ],
    details: {
      problemOrContext: 'Las plataformas hegemónicas (Instagram, Facebook) banean cuentas, censuran publicaciones de autocultivo y estigmatizan a las personas usuarias.',
      solutionOrRole: 'Desarrollador y diseñador de experiencia. Creación de una red orientada a privacidad, intercambio de conocimiento botánico y respeto mutuo.',
      impactOrOutcome: 'Prototipo funcional activo con tracción comunitaria.',
    }
  },
  {
    id: 'cafemin-tracker',
    code: 'GIT-02',
    title: 'CAFEMIN Task Tracker',
    subtitle: 'POC de seguimiento de tareas para albergue de personas migrantes',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'IMPACTO SOCIAL',
    summary: 'Herramienta de software liviana para la coordinación del equipo operativo en CAFEMIN, facilitando la asignación de turnos y atención humanitaria.',
    highlightStat: 'Diseñado para operación real sin fricción técnica',
    tags: ['JavaScript', 'Task Tracker', 'Migración', 'Humanitario', 'CAFEMIN'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/cafemin-task-tracker',
        description: 'Código y arquitectura del gestor de tareas',
      }
    ],
    details: {
      problemOrContext: 'Los albergues de asistencia a migrantes operan con alta rotación y escasos recursos informáticos, dependiendo de notas físicas propensas a perderse.',
      solutionOrRole: 'Desarrollador voluntario. Sistema minimalista para registrar necesidades urgentes (médicas, alimentación, trámites) por persona acogida.',
      impactOrOutcome: 'Optimización de turnos y reducción de omisiones en la atención diaria.',
    }
  },
  {
    id: 'calculadora-regresion',
    code: 'GIT-03',
    title: 'Calculadora Web de Regresión Lineal',
    subtitle: 'Herramienta estadística interactiva en TypeScript',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'DATA TOOL',
    summary: 'Calculadora web de alta precisión para modelar correlaciones lineales, cálculo de pendiente, intercepto y coeficiente de determinación (R²).',
    highlightStat: 'TypeScript puro · Sin dependencias pesadas',
    tags: ['TypeScript', 'Estadística', 'Regresión Lineal', 'Data Analysis'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/CalculadoraWebRegresLineal',
        description: 'Algoritmo y UI matemática interactiva',
      }
    ],
    details: {
      problemOrContext: 'Necesidad de contar con una herramienta web inmediata para proyectar conversiones de métricas de embudo sin abrir software estadístico pesado.',
      solutionOrRole: 'Desarrollador. Implementación del algoritmo de mínimos cuadrados con gráficos dinámicos en navegador.',
      impactOrOutcome: 'Herramienta utilitaria reutilizable en análisis de producto y negocio.',
    }
  },
  {
    id: 'descargador-facturas-sat',
    code: 'GIT-04',
    title: 'Descargador Automatizado de Facturas (XML / PDF)',
    subtitle: 'Script en Python para scraping y archivística fiscal',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'AUTOMATIZACIÓN',
    summary: 'Automatización en Python para parsear tablas complejas de facturación en HTML y extraer en lote documentos XML y PDF clasificados según reglas contables.',
    highlightStat: 'Python · Automatización de tareas repetitivas',
    tags: ['Python', 'Web Scraping', 'Facturación SAT', 'Productividad'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/descargador_facturas',
        description: 'Script de descarga y organización por directorios',
      }
    ],
    details: {
      problemOrContext: 'Proceso manual agotador de descarga individual de cientos de comprobantes fiscales desde portales con interfaces obsoletas.',
      solutionOrRole: 'Desarrollador. Script que procesa el HTML guardado, extrae los enlaces de descarga y guarda los comprobantes con nomenclatura estructurada.',
      impactOrOutcome: 'Ahorro de horas hombre mensuales en conciliación contable.',
    }
  },
  {
    id: 'cedula-checker',
    code: 'GIT-05',
    title: 'CedulaChecker (C#)',
    subtitle: 'Validador utilitario de cédulas profesionales',
    dimension: 'github',
    accentColor: 'cyan',
    badge: 'C# UTILITY',
    summary: 'Herramienta ligera desarrollada en C# para la validación y verificación automatizada de folios de cédulas profesionales emitidas por la SEP.',
    highlightStat: 'C# · Verificación rápida de credenciales',
    tags: ['C#', '.NET', 'Validación', 'Herramienta'],
    evidence: [
      {
        type: 'github',
        title: 'Repositorio en GitHub',
        url: 'https://github.com/HugoLeMoy47/CedulaChecker',
        description: 'Código en C#',
      }
    ],
    details: {
      problemOrContext: 'Verificación masiva de credenciales técnicas y profesionales en procesos de selección.',
      solutionOrRole: 'Desarrollador. Algoritmo de consulta y saneamiento de cadenas.',
      impactOrOutcome: 'Herramienta compacta de validación.',
    }
  },

  // 06 // PRODUCT OWNER & IT ARCHITECTURE
  {
    id: 'grupo-csi-art-platform',
    code: 'PO-01',
    title: 'Plataforma ART — Onboarding B2B & Analítica de Embudo',
    subtitle: 'Product Owner en Fintech, Banca y Seguros',
    dimension: 'product_owner',
    accentColor: 'cyan',
    badge: 'ENTERPRISE B2B',
    summary: 'Liderazgo como Product Owner del producto estandarte de Grupo CSI: plataforma de onboarding bancario cuyo núcleo es un dashboard de analítica de embudo para detectar abandono y cuellos de botella.',
    highlightStat: 'Equipo de 9–12 devs · Expansión a verticales inmobiliario y seguros',
    tags: ['Product Owner', 'Scrum / Agile', 'Fintech', 'Funnel Analytics', 'Jira'],
    evidence: [
      {
        type: 'link',
        title: 'Perfil LinkedIn Hugo Legorreta',
        url: 'https://linkedin.com/in/hugolegorretamoysen',
        description: 'Validaciones de rol, metodología y recomendaciones',
      }
    ],
    details: {
      problemOrContext: 'Las instituciones financieras perdían usuarios en procesos de onboarding sin saber en qué paso ocurría la fricción regulatoria o técnica.',
      solutionOrRole: 'Product Owner titular. Definición de requerimientos y criterios de aceptación para métricas de tiempo de permanencia, tasas de abandono y conversión punta a punta. Liderazgo de ceremonias Scrum.',
      impactOrOutcome: 'Incremento en conversión de clientes bancarios, entrega de las primeras versiones en inglés del software y fork de innovación ArtGaming.',
    }
  },
  {
    id: 'acnur-onu-sistema-map',
    code: 'PO-02',
    title: 'Sistema MAP — ACNUR / UNHCR México',
    subtitle: 'Consultor Digital y Gestión de Proyecto Humanitario',
    dimension: 'product_owner',
    accentColor: 'cyan',
    badge: 'HUMANITARIO ONU',
    summary: 'Liderazgo en el desarrollo del sistema MAP para el registro ordenado, seguro y digno de personas migrantes y solicitantes de refugio en territorio mexicano.',
    highlightStat: 'Piloto validado en campo que derivó en segunda fase contratada',
    tags: ['ACNUR', 'UNHCR', 'Gobierno de Datos', 'Human Rights', 'IT Project Manager'],
    evidence: [
      {
        type: 'link',
        title: 'Perfil Profesional LinkedIn',
        url: 'https://linkedin.com/in/hugolegorretamoysen',
        description: 'Detalle de la contratación y metodología en campo',
      }
    ],
    details: {
      problemOrContext: 'La necesidad crítica de registrar a personas en tránsito migratorio con estrictos estándares de protección de datos sensibles y operación sin conexión estable.',
      solutionOrRole: 'Consultor Digital y Project Manager. Definición de estructura de datos, diseño de interfaz intuitiva para operadores en territorio y coordinación ágil.',
      impactOrOutcome: 'Despliegue exitoso en frontera sur y norte, contratándose una segunda iteración mayor para el sistema de Naciones Unidas.',
    }
  },

  // 07 // IDEAS LAB (WIP)
  {
    id: 'idea-simulador-asambleario',
    code: 'LAB-01',
    title: 'ConsensoDigital: Motor de Votación Cuadrática y Deliberación',
    subtitle: 'Plataforma para asambleas comunitarias sin intermediarios',
    dimension: 'ideas',
    accentColor: 'amber',
    badge: 'INCUBADORA // IDEA 01',
    summary: 'Sistema para asambleas de colectivos que implementa votación cuadrática y reputación basada en aportes reales a la comunidad, evitando el secuestro de debates por mayorías ruidosas ("lo que pienso y no subo").',
    highlightStat: 'Arquitectura descentralizada · Votación cuadrática cívica',
    tags: ['Democracia Líquida', 'Votación Cuadrática', 'Comunidad', 'Ideas Lab'],
    evidence: [
      {
        type: 'doc',
        title: 'Ficha Conceptual HLM',
        url: '#',
        description: 'Documento en la recámara para prototipar',
      }
    ],
    details: {
      problemOrContext: 'Las asambleas comunitarias tradicionales sufren por desgaste de tiempo y polarización emocional.',
      solutionOrRole: 'Diseñador de protocolos. Mecanismo de ponderación de prioridades colectivas con verificación criptográfica simple.',
      impactOrOutcome: 'Propuesta lista para prototipar en un hackathon cívico.',
    }
  },
  {
    id: 'idea-auditor-ia-fiscal',
    code: 'LAB-02',
    title: 'Freejolito Bot: Auditor de Subsidios y Donatarias',
    subtitle: 'Agente autónomo para cumplimiento normativo de OSCs',
    dimension: 'ideas',
    accentColor: 'amber',
    badge: 'INCUBADORA // IDEA 02',
    summary: 'Agente inteligente que coteja automáticamente los gastos, CFDI y comprobantes de una asociación civil contra las reglas de operación de donatarias autorizadas del SAT.',
    highlightStat: 'Agente IA preventivo para resguardar estatus de Donataria',
    tags: ['Agentes IA', 'SAT', 'Donatarias', 'Compliance', 'Python'],
    evidence: [
      {
        type: 'link',
        title: 'Freejolitos Labs',
        url: 'https://freejolitos.consulting',
        description: 'Expansión de la práctica de consultoría',
      }
    ],
    details: {
      problemOrContext: 'Cientos de asociaciones civiles pierden su autorización para recibir donativos deducibles por errores administrativos menores en sus reportes anuales.',
      solutionOrRole: 'Arquitecto de solución. Modelo de verificación de metadatos y alertas preventivas antes de presentar la declaración informativa.',
      impactOrOutcome: 'Cero multas y resguardo institucional para causas sociales.',
    }
  }
];
